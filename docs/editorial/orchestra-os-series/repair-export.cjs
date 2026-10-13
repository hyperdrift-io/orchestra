// Export the repair visual from its own component: no second drawing, no copied data.
// Run from the app root:
//   node docs/editorial/orchestra-os-series/repair-export.cjs
//     → public/articles/orchestra-os/repair-survival.png (900 CSS px wide, 2× pixels, the default state)
//     → public/articles/orchestra-os/repair-survival-linkedin.png (1080 × 1350 portrait card)
//   node docs/editorial/orchestra-os-series/repair-export.cjs --state 4-order --out <dir>
//     → one review render of another step / gate rule ("1", "2", "3", "4-fixes", "4-order", "5-fixes", "5-order")
// Fonts come from the dev build's next/font files when present, else the series fonts beside the UI figures.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = process.cwd();
const args = process.argv.slice(2);
const option = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : undefined; };
const state = option('--state');
const outDir = path.resolve(option('--out') ?? 'public/articles/orchestra-os');
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const takeaway = 'A security fix is finished when it survives the next release.';

// Compile the TSX with the installed TypeScript. A review state presets the two useState calls (step, then gate rule).
function loadVisual() {
  const file = path.resolve('src/components/visuals/RepairSurvival.tsx');
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const loaded = new Module(file, module);
  loaded.filename = file;
  loaded.paths = Module._nodeModulePaths(path.dirname(file));
  if (state) {
    const [step, check = 'fixes'] = state.split('-');
    const preset = [Number(step), check];
    let call = 0;
    const react = { ...React, useState: () => [preset[call++ % 2], () => {}] };
    const load = loaded.require.bind(loaded);
    loaded.require = (id) => (id === 'react' ? react : load(id));
  }
  loaded._compile(compiled.outputText, file);
  return renderToStaticMarkup(React.createElement(loaded.exports.RepairSurvival));
}

function fontFaces() {
  const built = path.resolve('.next/static/css/app/layout.css');
  if (fs.existsSync(built)) {
    const faces = (fs.readFileSync(built, 'utf8').match(/@font-face\s*{[^}]*}/g) ?? []).filter((face) => face.includes('U+0000-00FF'));
    if (faces.length) return faces.map((face) => face.replace(/url\(\/_next\/static\/media\//g, `url(file://${path.resolve('.next/static/media')}/`)).join('\n');
  }
  const fonts = path.resolve('docs/editorial/ui-accessibility-series/fonts');
  return [
    `@font-face{font-family:'Cormorant Garamond';font-weight:500 600;src:url('file://${fonts}/cormorant-medium.ttf')}`,
    `@font-face{font-family:'Cormorant Garamond';font-weight:500 600;font-style:italic;src:url('file://${fonts}/cormorant-medium-italic.ttf')}`,
    `@font-face{font-family:'IBM Plex Sans';font-weight:400 600;src:url('file://${fonts}/plex-regular.ttf')}`,
    `@font-face{font-family:'IBM Plex Mono';font-weight:400 500;src:url('file://${fonts}/IBMPlexMono-Regular.ttf')}`,
  ].join('\n');
}

const tokens = fs.readFileSync('src/app/globals.css', 'utf8').match(/:root\s*{[^}]*}/)[0];
const styles = `${fontFaces()}
${tokens}
:root { --nf-display: 'Cormorant Garamond'; --nf-body: 'IBM Plex Sans'; --nf-mono: 'IBM Plex Mono'; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #14120e; color: var(--cream); font: 16px/1.5 var(--font-body); -webkit-font-smoothing: antialiased; }
p, h2 { margin: 0; }
${fs.readFileSync('src/app/articles.css', 'utf8')}
${fs.readFileSync('src/app/visual-repair.css', 'utf8')}
#article-proof[data-article-visual] { margin: 0; }
[data-visual=repair] * { transition: none !important; }`;

const visual = `<figure id="article-proof" data-article-visual="">${loadVisual()}</figure>`;
const measure = '<script>document.fonts.ready.then(() => { document.body.dataset.height = Math.ceil(document.documentElement.getBoundingClientRect().height); });</script>';

const download = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Will the repair survive the next release?</title><style>${styles}
body { width: 900px; padding: 24px; }
body > p { margin-top: 16px; font: 13px/1.55 var(--font-body); color: var(--cream-3); }
body > p b { font-weight: 500; color: var(--gold-light); }
</style><body>${visual}<p><b>${takeaway}</b><br>Orchestra · orchestra.hyperdrift.io/articles · interactive version and primary sources in the article</p>${measure}</body></html>`;

const card = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Will the repair survive the next release?</title><style>${styles}
html, body { width: 1080px; height: 1350px; overflow: hidden; }
body { display: flex; flex-direction: column; justify-content: space-between; padding: 64px 90px 70px; background: radial-gradient(ellipse at 50% 0, #2a2117 0, #14120e 70%); }
body > p { font: 500 15px var(--font-mono); letter-spacing: .2em; color: var(--gold); }
#article-proof[data-article-visual] { width: 720px; zoom: 1.25; }
body > div { display: grid; gap: 22px; }
body > div h2 { font: 500 54px/1.08 var(--font-display); color: var(--cream); letter-spacing: -.005em; }
body > div h2 em { color: var(--gold-light); }
body > div p { font: 17px var(--font-mono); letter-spacing: .04em; color: var(--cream-3); }
</style><body><p>ORCHESTRA · FIELD NOTES</p>${visual}<div><h2>A security fix is finished when it <em>survives the next release.</em></h2><p>orchestra.hyperdrift.io/articles</p></div></body></html>`;

function render(html, name, width, fixedHeight) {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'repair-export-'));
  const page = path.join(scratch, `${name}.html`);
  fs.writeFileSync(page, html);
  const flags = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=2', '--virtual-time-budget=3000'];
  let height = fixedHeight;
  if (!height) {
    const dom = execFileSync(chrome, [...flags, `--window-size=${width},3000`, '--dump-dom', `file://${page}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    height = Number(dom.match(/data-height="(\d+)"/)?.[1]);
    if (!height) throw new Error(`Could not measure ${name}`);
  }
  const out = path.join(outDir, `${name}.png`);
  execFileSync(chrome, [...flags, `--window-size=${width},${height}`, `--screenshot=${out}`, `file://${page}`], { stdio: 'ignore' });
  fs.rmSync(scratch, { recursive: true, force: true });
  console.log(`${path.relative(root, out)} · ${width} × ${height} CSS px`);
  return out;
}

fs.mkdirSync(outDir, { recursive: true });
if (state) {
  render(download, `repair-survival-${state}`, 900);
} else {
  render(download, 'repair-survival', 900);
  const linkedin = render(card, 'repair-survival-linkedin', 1080, 1350);
  // Rendered at 2× for clean type, delivered at LinkedIn's 1080 × 1350.
  execFileSync('sips', ['--resampleHeightWidth', '1350', '1080', linkedin], { stdio: 'ignore' });
}
