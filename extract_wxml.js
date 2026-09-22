// 从 page-frame.html 静态提取所有 _mz/_m 调用，重建 wxml 标签结构
// 形式：_mz(z,'tag',['attr',opIndex,...],generics,e,s,gg)
//       _m('tag',[...],generics,e,s,gg)
const fs = require('fs');
const path = require('path');

const framePath = process.argv[2] || 'unpacked/page-frame.html';
const outRoot = process.argv[3] || 'decompiled';
const html = fs.readFileSync(framePath, 'utf8');

// 匹配 _m(z,'tag',[...]) 或 _mz(z,'tag',[...])，提取 tag 和 attrs 数组
const re = /_m[z]?\(\s*z?\s*,\s*'([^']+)'\s*,\s*(\[[^\]]*\])/g;
let m;
const tags = {};
while ((m = re.exec(html)) !== null) {
  const tag = m[1];
  let attrsSrc = m[2];
  let attrs;
  try { attrs = (new Function('return ' + attrsSrc))(); }
  catch (e) { continue; }
  // attrs 是 [name, num, name, num, ...]，提取属性名
  const attrNames = [];
  for (let i = 0; i < attrs.length; i += 2) {
    if (typeof attrs[i] === 'string') attrNames.push(attrs[i]);
  }
  if (!tags[tag]) tags[tag] = new Set();
  attrNames.forEach(a => tags[tag].add(a));
}

// 输出每个标签的属性清单
let report = '# WXML 标签结构（从 page-frame.html 静态提取）\n\n';
report += '> 注：此小程序基于 Taro 框架编译，wxml 由动态模板（taro_tmpl + tmpl_0_X）生成。\n';
report += '> 完整 wxml 源码无法从编译产物 100% 还原，下面是各标签用到的属性清单。\n\n';
for (const [tag, attrs] of Object.entries(tags).sort()) {
  report += `## <${tag}>\n`;
  report += '属性: ' + Array.from(attrs).map(a => `\`${a}\``).join(', ') + '\n\n';
}
fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(path.join(outRoot, 'WXML_TAGS.md'), report);
console.log('OK WXML_TAGS.md');
console.log('tags found:', Object.keys(tags).sort().join(', '));
