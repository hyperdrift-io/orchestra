// Compile the existing TSX with installed TypeScript and export its default React state.
// Run from the repo root. No alternate drawing or duplicated factual content.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const filename = path.resolve('src/components/ArticleVisualization.tsx');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = Module._nodeModulePaths(path.dirname(filename));
loaded._compile(compiled.outputText, filename);
const css = fs.readFileSync('src/app/articles.css', 'utf8');
const catalogue = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
for (const article of catalogue.filter((entry) => entry.visualization)) {
  const html = renderToStaticMarkup(React.createElement(loaded.exports.ArticleVisualization, { article }));
  const visual = html.match(/<section data-visual=[\s\S]*<\/section>/)[0];
  const page = `<!doctype html><meta charset="utf-8"><title>${article.title}</title><style>
:root{--ink:#14120e;--cream:#f6eee1;--cream-2:#e2d8c8;--cream-3:#c8beae;--gold:#e3a857;--gold-light:#f4cd92;--gold-soft:#e3a85716;--gold-line:#e3a85766;--line-hair:#c8beae33;--line-soft:#c8beae44;--font-display:Georgia,serif;--font-body:Arial,sans-serif;--font-mono:Menlo,monospace;}
*{box-sizing:border-box}body{margin:0;padding:24px;background:#14120e;color:#f6eee1;font:16px/1.5 Arial,sans-serif}p{margin:0} ${css}
#article-proof[data-article-visual]{margin:0;max-width:none}body>p{font:12px Arial;color:#c8beae;margin-top:14px;line-height:1.5} [data-visual] button{pointer-events:none}
</style><figure id="article-proof" data-article-visual>${visual}</figure><p>${article.visualization.takeaway}<br>Orchestra AI · ai.hyperdrift.io/articles · Primary sources and interactive version in the article</p>`;
  fs.writeFileSync(`docs/editorial/databricks-series/${article.visualization.kind}-visual.html`, page);
}
