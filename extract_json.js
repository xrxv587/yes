// 从 app-config.json 生成 app.json + 各页面 .json
const fs = require('fs');
const path = require('path');

const cfgPath = process.argv[2] || 'unpacked/app-config.json';
const outRoot = process.argv[3] || 'decompiled';

// app-config.json 行首有 ; 需去掉；末尾可能缺 } 自动补全
let raw = fs.readFileSync(cfgPath, 'utf8').replace(/^\s*;\s*/, '').trim();
let cfg;
try { cfg = JSON.parse(raw); }
catch (e) {
  // 尝试补全缺失的右括号
  let opens = (raw.match(/{/g) || []).length;
  let closes = (raw.match(/}/g) || []).length;
  let fixed = raw + '}'.repeat(Math.max(0, opens - closes));
  cfg = JSON.parse(fixed);
  console.log('(patched: added ' + (opens - closes) + ' missing "}")');
}

// app.json
const appJson = {
  entryPagePath: cfg.entryPagePath,
  pages: cfg.pages,
  window: (cfg.global && cfg.global.window) || {},
};
if (cfg.ext) appJson.ext = cfg.ext;
fs.mkdirSync(outRoot, { recursive: true });
fs.writeFileSync(path.join(outRoot, 'app.json'), JSON.stringify(appJson, null, 2));
console.log('OK app.json');

// 各页面 .json
if (cfg.page) {
  for (const [htmlPath, info] of Object.entries(cfg.page)) {
    // htmlPath 形如 pages/index/index.html
    const jsonPath = htmlPath.replace(/\.html$/, '.json');
    const out = path.join(outRoot, jsonPath);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify((info.window) || {}, null, 2));
    console.log('OK', jsonPath);
  }
}
