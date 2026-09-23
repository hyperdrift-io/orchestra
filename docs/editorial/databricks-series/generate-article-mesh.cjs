// Export the actual WebGL scene geometry to SVG for loading/no-JS/GPU-failure states.
// Run from the repository root; no screenshot or parallel drawing is maintained.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const THREE = require('three');
const cache = new Map();
function load(file) {
  const filename = path.resolve(file);
  if (cache.has(filename)) return cache.get(filename).exports;
  const loaded = new Module(filename, module);
  cache.set(filename, loaded);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const original = loaded.require.bind(loaded);
  loaded.require = id => id.startsWith('.') && fs.existsSync(path.resolve(path.dirname(filename), id + '.ts')) ? load(path.resolve(path.dirname(filename), id + '.ts')) : original(id);
  loaded._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, filename);
  return loaded.exports;
}
const { articleArtwork } = load('src/components/mesh-artwork-scene.ts');
const definitions = require('../../../src/data/article-mesh.json');
fs.mkdirSync('public/articles/mesh', { recursive: true });
for (const [slug, symbols] of Object.entries(definitions)) {
  const artwork = articleArtwork(slug);
  artwork.group.updateMatrixWorld(true);
  let drawing = '';
  artwork.group.traverse(object => {
    if (!object.isLineSegments && !object.isPoints) return;
    const positions = object.geometry.getAttribute('position');
    const material = object.material;
    const colour = '#' + material.color.getHexString();
    const point = index => {
      const p = new THREE.Vector3().fromBufferAttribute(positions, index).applyMatrix4(object.matrixWorld);
      return [(600 + p.x).toFixed(2), (80 - p.y).toFixed(2)];
    };
    if (object.isLineSegments) {
      let d = '';
      for (let i = 0; i < positions.count; i += 2) d += `M${point(i).join(' ')}L${point(i+1).join(' ')}`;
      drawing += `<path d="${d}" stroke="${colour}" stroke-width="1" stroke-opacity="${material.opacity}"/>`;
    } else {
      for (let i = 0; i < positions.count; i++) {
        const [x, y] = point(i);
        drawing += `<circle cx="${x}" cy="${y}" r="${material.size / 2}" fill="${colour}" opacity="${material.opacity}"/>`;
      }
    }
  });
  fs.writeFileSync(`public/articles/mesh/${slug}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="160" viewBox="0 0 1200 160" fill="none"><title>Orchestra wireframe: ${symbols.join(', ')}</title>${drawing}</svg>`);
  artwork.dispose();
}
const catalogueFile = 'src/data/articles.json';
const catalogue = JSON.parse(fs.readFileSync(catalogueFile, 'utf8'));
for (const article of catalogue) {
  const symbols = definitions[article.slug];
  if (!symbols) continue;
  article.headerImage = { src: `/articles/mesh/${article.slug}.svg`, alt: `Connected wireframe ${symbols.join(', ')} forms in Orchestra's mesh style.`, width: 1200, height: 160 };
  article.image = { ...article.headerImage, caption: 'Editorial mesh illustration · Explore the workflow in the article.' };
}
fs.writeFileSync(catalogueFile, JSON.stringify(catalogue, null, 2) + '\n');
