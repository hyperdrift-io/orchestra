// Export the Operating week visual from its own component, never a second drawing:
//   public/articles/orchestra-os/operating-week.png           article download, 900 CSS px wide at 2x
//   public/articles/orchestra-os/operating-week-linkedin.png  1080 x 1350 portrait card for a LinkedIn post
// Run from the app root: node docs/editorial/orchestra-os-series/operating-week-export.cjs
// The site's own CSS and the brand faces (Cormorant Garamond, IBM Plex) render through headless Chrome.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const fonts = path.resolve('docs/editorial/ui-accessibility-series/fonts');
const out = path.resolve('public/articles/orchestra-os');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const flags = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=2', '--virtual-time-budget=3000'];

function load(file) {
  const filename = path.resolve(file);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}

const { OperatingWeek } = load('src/components/visuals/OperatingWeek.tsx');
const visual = renderToStaticMarkup(React.createElement(OperatingWeek));
const css = ['src/app/globals.css', 'src/app/articles.css', 'src/app/visual-operating-week.css'].map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const font = (name) => `url('file://${path.join(fonts, name)}')`;
const head = (title, extra) => `<!doctype html><html lang="en"><meta charset="utf-8"><title>${title}</title><style>
@font-face{font-family:'Cormorant Garamond';font-weight:500 600;src:${font('cormorant-medium.ttf')}}
@font-face{font-family:'Cormorant Garamond';font-weight:500 600;font-style:italic;src:${font('cormorant-medium-italic.ttf')}}
@font-face{font-family:'IBM Plex Sans';font-weight:400 600;src:${font('plex-regular.ttf')}}
@font-face{font-family:'IBM Plex Mono';font-weight:400 500;src:${font('IBMPlexMono-Regular.ttf')}}
:root{--nf-display:'Cormorant Garamond';--nf-body:'IBM Plex Sans';--nf-mono:'IBM Plex Mono'}
${css}
html,body{min-height:0;background:#14120e}
[data-visual] button{pointer-events:none}
${extra}
</style>`;
// Each page reports its rendered height after the faces load, so the screenshot crops to the content.
const measure = `<script>document.fonts.ready.then(()=>{const b=document.body;const end=Math.max(...[...b.children].map((e)=>e.getBoundingClientRect().bottom));b.dataset.height=Math.ceil(end+parseFloat(getComputedStyle(b).paddingBottom))})</script>`;

const pages = [
  {
    name: 'operating-week',
    width: 900,
    html: head('Who carries this week? Orchestra OS', `body{padding:24px}
body>p{margin:14px 2px 0;font:12px/1.5 var(--font-body);color:var(--cream-3)}
body>p b{font-weight:400;color:var(--cream)}`) + `<body>${visual}<p><b>Keep the decisions. Hand over the jobs.</b> Orchestra AI · orchestra.hyperdrift.io/articles · interactive version and sources in the article</p>${measure}</body></html>`,
  },
  {
    name: 'operating-week-linkedin',
    width: 1080,
    height: 1350,
    html: head('Keep the decisions. Hand over the jobs.', `body{box-sizing:border-box;width:1080px;height:1350px;margin:0;padding:56px 60px 44px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(ellipse at 85% 0,#3a2c1a 0,transparent 55%),#14120e}
body>h1{margin:0;font:500 70px/1.02 var(--font-display);letter-spacing:-.01em;color:var(--cream)}
body>h1 em{color:var(--gold-light)}
body>[data-visual]{zoom:1.08}
body>p{margin:0;font:18px/1 var(--font-mono);letter-spacing:.06em;color:var(--cream-3)}`) + `<body><h1>Keep the decisions.<br><em>Hand over the jobs.</em></h1>${visual}<p>orchestra.hyperdrift.io/articles</p>${measure}</body></html>`,
  },
];

fs.mkdirSync(out, { recursive: true });
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'operating-week-'));
for (const page of pages) {
  const html = path.join(scratch, `${page.name}.html`);
  fs.writeFileSync(html, page.html);
  const url = `file://${html}`;
  const dom = execFileSync(chrome, [...flags, '--window-size=' + page.width + ',2000', '--dump-dom', url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const measured = Number(dom.match(/data-height="(\d+)"/)?.[1]);
  if (!measured) throw new Error(`${page.name}: no measured height; did the fonts load?`);
  if (page.height && measured > page.height) throw new Error(`${page.name}: content is ${measured}px tall, the card is ${page.height}px`);
  const height = page.height ?? measured;
  const png = path.join(out, `${page.name}.png`);
  execFileSync(chrome, [...flags, `--window-size=${page.width},${height}`, `--screenshot=${png}`, url], { stdio: 'ignore' });
  console.log(`${path.relative(process.cwd(), png)}  ${page.width}x${height} CSS px (content ${measured}px)`);
}
fs.rmSync(scratch, { recursive: true, force: true });
