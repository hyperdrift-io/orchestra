import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';
import definitions from '@/data/article-mesh.json';

/** Server-only, repository-owned SVGs. Inline them so the first paint needs no image request. */
export const meshFallbackSvg = cache((kind: 'logo' | 'article', slug = '') => {
  if (kind === 'article' && !Object.hasOwn(definitions, slug)) throw new Error('Unknown article mesh');
  const file = kind === 'logo' ? 'brand/orchestra-mesh-compact.svg' : `articles/mesh/${slug}.svg`;
  return readFileSync(join(process.cwd(), 'public', file), 'utf8');
});
