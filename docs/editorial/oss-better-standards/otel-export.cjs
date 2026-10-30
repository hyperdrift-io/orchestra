// Export the OpenTelemetry #556 visuals from their own components, never a second drawing:
//   public/articles/opentelemetry/conversation-trace.png   the trace with the rule applied
//   public/articles/opentelemetry/conventions-reach.png    writers, the conventions and readers, all spans
//   public/articles/opentelemetry/review-timeline.png      thirty days of review
// Run from the app root: node docs/editorial/oss-better-standards/otel-export.cjs
// Each image is the server-rendered default at 900 CSS px wide, 2x, through headless Chrome with the brand faces.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const Module = require('node:module');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const fonts = path.resolve('docs/editorial/ui-accessibility-series/fonts');
const out = path.resolve('public/articles/opentelemetry');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const flags = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=2', '--virtual-time-budget=3000'];

// The timeline's source link is an interactive preview in the article; in the image it is plain text.
const stubs = { '@/components/LinkPreview': { LinkPreview: ({ href, children }) => React.createElement('a', { href }, children) } };

function load(file) {
  const filename = path.resolve(file);
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const original = loaded.require.bind(loaded);
  loaded.require = (id) => stubs[id] ?? original(id);
  loaded._compile(compiled.outputText, filename);
  return loaded.exports;
}

const visuals = [
  { name: 'conversation-trace', file: 'ConversationTrace', css: 'visual-conversation-trace.css', takeaway: 'One conversation ID, carried from the agent into the model and tool calls nested inside it.' },
  { name: 'conventions-reach', file: 'ConventionsReach', css: 'visual-conventions-reach.css', takeaway: 'Thirty reference libraries write to the same conventions. Six record the conversation ID today.' },
  { name: 'review-timeline', file: 'ReviewTimeline', css: 'visual-review-timeline.css', takeaway: 'Review turned a summary of two attributes into four rules for one.' },
];

const font = (name) => `url('file://${path.join(fonts, name)}')`;
const measure = `<script>document.fonts.ready.then(()=>{const b=document.body;const end=Math.max(...[...b.children].map((e)=>e.getBoundingClientRect().bottom));b.dataset.height=Math.ceil(end+parseFloat(getComputedStyle(b).paddingBottom))})</script>`;

fs.mkdirSync(out, { recursive: true });
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'otel-visuals-'));
for (const visual of visuals) {
  const Component = load(`src/components/visuals/${visual.file}.tsx`)[visual.file];
  const markup = renderToStaticMarkup(React.createElement(Component));
  const css = ['src/app/globals.css', 'src/app/articles.css', `src/app/${visual.css}`].map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${visual.name}</title><style>
@font-face{font-family:'Cormorant Garamond';font-weight:500 600;src:${font('cormorant-medium.ttf')}}
@font-face{font-family:'Cormorant Garamond';font-weight:500 600;font-style:italic;src:${font('cormorant-medium-italic.ttf')}}
@font-face{font-family:'IBM Plex Sans';font-weight:400 600;src:${font('plex-regular.ttf')}}
@font-face{font-family:'IBM Plex Mono';font-weight:400 500;src:${font('IBMPlexMono-Regular.ttf')}}
:root{--nf-display:'Cormorant Garamond';--nf-body:'IBM Plex Sans';--nf-mono:'IBM Plex Mono'}
${css}
html,body{min-height:0;background:#14120e}
body{padding:24px}
body>p{margin:14px 2px 0;font:12px/1.5 var(--font-body);color:var(--cream-3)}
body>p b{font-weight:400;color:var(--cream)}
[data-visual] button{pointer-events:none}
[data-visual] *{animation-play-state:paused!important}
</style><body>${markup}<p><b>${visual.takeaway}</b> Orchestra AI · orchestra.hyperdrift.io/articles · interactive version and sources in the article</p>${measure}</body></html>`;
  const page = path.join(scratch, `${visual.name}.html`);
  fs.writeFileSync(page, html);
  const url = `file://${page}`;
  const dom = execFileSync(chrome, [...flags, '--window-size=900,4000', '--dump-dom', url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const height = Number(dom.match(/data-height="(\d+)"/)?.[1]);
  if (!height) throw new Error(`${visual.name}: no measured height; did the fonts load?`);
  const png = path.join(out, `${visual.name}.png`);
  execFileSync(chrome, [...flags, `--window-size=900,${height}`, `--screenshot=${png}`, url], { stdio: 'ignore' });
  console.log(`${path.relative(process.cwd(), png)}  900x${height} CSS px`);
}
fs.rmSync(scratch, { recursive: true, force: true });
