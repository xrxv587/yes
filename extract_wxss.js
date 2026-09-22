// 从 page-frame.html 提取所有 wxss，还原为 .wxss 源文件
// 形式1：__wxAppCode__['<path>']=setCssToHead(<tokens>, <2ndArg>, {path:"<path2>"});
// 形式2：setCssToHead(<tokens>, "warning", {path:"./app.wxss"})();
// tokens 中：
//   字符串  -> CSS 文本
//   [0, N]  -> rpx 数值（N 为编译时 rpx*2，还原为 N/2 rpx）
//   [1]     -> scoped class 前缀，用空字符串替代
const fs = require('fs');
const path = require('path');

const framePath = process.argv[2] || 'unpacked/page-frame.html';
const outRoot = process.argv[3] || 'decompiled';
const html = fs.readFileSync(framePath, 'utf8');

// 找到所有 'setCssToHead(' 出现位置，再用括号配对提取参数字符串
function findCalls(src) {
  const out = [];
  const needle = 'setCssToHead(';
  let i = 0;
  while (true) {
    i = src.indexOf(needle, i);
    if (i < 0) break;
    const start = i + needle.length;
    const end = matchParen(src, start - 1); // 找到 '(' 对应的 ')'
    if (end < 0) break;
    out.push({ args: src.slice(start, end), callEnd: end + 1 });
    i = end + 1;
  }
  return out;
}

// 从某位置开始（src[pos]='('），找到配对的 ')' 的位置
function matchParen(src, pos) {
  let depth = 0;
  let inStr = false, strCh = '';
  for (let i = pos; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === strCh) inStr = false;
    } else {
      if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
      if (c === '(') depth++;
      else if (c === ')') { depth--; if (depth === 0) return i; }
    }
  }
  return -1;
}

// 把参数字符串按顶层逗号分割（不进入嵌套括号/字符串）
function splitArgs(s) {
  const out = [];
  let depth = 0, inStr = false, strCh = '', cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === '\\') { cur += s[++i]; continue; }
      if (c === strCh) inStr = false;
    } else {
      if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; cur += c; continue; }
      if (c === '(' || c === '[' || c === '{') depth++;
      else if (c === ')' || c === ']' || c === '}') depth--;
      if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
      cur += c;
    }
  }
  if (cur.trim() !== '') out.push(cur);
  return out;
}

const calls = findCalls(html);
const seen = new Set();
let count = 0;
for (const { args } of calls) {
  const parts = splitArgs(args);
  if (parts.length < 3) continue;
  const tokensSrc = parts[0].trim();
  const third = parts[2].trim();
  // 从第三参数 {path:"./xxx.wxss"} 中提取 path
  const pm = third.match(/path:\s*['"]([^'"]+\.wxss)['"]/);
  if (!pm) continue;
  const wxssPath = pm[1];
  if (seen.has(wxssPath)) continue;
  seen.add(wxssPath);

  let tokens;
  try { tokens = (new Function('return ' + tokensSrc))(); }
  catch (e) { console.error('parse tokens failed for', wxssPath, e.message); continue; }

  let css = '';
  for (const t of tokens) {
    if (typeof t === 'string') css += t;
    else if (Array.isArray(t)) {
      if (t[0] === 0) css += (t[1] / 2) + 'rpx';
      else if (t[0] === 1) css += '';
    }
  }
  const rel = wxssPath.replace(/^\.\//, '');
  const outPath = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, css);
  count++;
  console.log('OK', rel, '(' + css.length + ' bytes)');
}
console.log('done: ' + count + ' wxss files -> ' + outRoot);
