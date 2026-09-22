// 美化 app-service.js：备份 -> 修掉开头孤立的 } -> prettier
const fs = require('fs');
const prettier = require('prettier');

const src = String(process.argv[2] || 'decompiled/app-service.js');
const out = String(process.argv[3] || 'decompiled/app-service.pretty.js');
const bak = src + '.bak';

let code = fs.readFileSync(src, 'utf8');
fs.writeFileSync(bak, code); // 备份原文件

// 去掉开头的孤立 }（wechat 编译产物，IIFE 残留），以及一些前导空白/制表符
code = code.replace(/^\s*\}\s*/, '');
// 去掉每行行首的多余 tab
code = code.replace(/^\t+/gm, '');

(async () => {
  try {
    const pretty = await prettier.format(code, {
      parser: 'babel',
      printWidth: 120,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'none',
      arrowParens: 'avoid',
    });
    fs.writeFileSync(out, pretty);
    console.log('OK ->', out, pretty.length, 'bytes');
  } catch (e) {
    console.error('prettier failed:', e.message);
    // 失败时回退：写出去掉开头 } 的版本
    fs.writeFileSync(out, code);
    console.log('fallback (no format) ->', out, code.length, 'bytes');
    process.exit(2);
  }
})();
