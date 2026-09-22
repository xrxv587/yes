// 从 app-service.pretty.js 按 __wxRoute 标记拆分各页面/组件 JS
const fs = require('fs');
const path = require('path');

const srcPath = process.argv[2] || 'decompiled/app-service.pretty.js';
const outRoot = process.argv[3] || 'decompiled';

const code = fs.readFileSync(srcPath, 'utf8');
const lines = code.split('\n');

// 找到所有 __wxRoute = 'xxx' 的行号
const routes = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^__wxRoute\s*=\s*'([^']+)'/);
  if (m) {
    routes.push({ name: m[1], start: i });
  }
}

// 公共前缀：第一个 __wxRoute 之前的所有内容
const firstRouteLine = routes.length > 0 ? routes[0].start : lines.length;
const preamble = lines.slice(0, firstRouteLine).join('\n');
fs.writeFileSync(path.join(outRoot, 'common.runtime.js'), preamble);
console.log('OK common.runtime.js (' + firstRouteLine + ' lines)');

// 每个路由的内容：从该 __wxRoute 行到下一个 __wxRoute 行（或文件末尾）
for (let i = 0; i < routes.length; i++) {
  const start = routes[i].start;
  const end = i + 1 < routes.length ? routes[i + 1].start : lines.length;
  const content = lines.slice(start, end).join('\n');
  const routeName = routes[i].name; // 例如 pages/index/index
  const outPath = path.join(outRoot, routeName + '.js');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content);
  console.log('OK ' + routeName + '.js (' + (end - start) + ' lines)');
}
console.log('done: ' + routes.length + ' route files');
