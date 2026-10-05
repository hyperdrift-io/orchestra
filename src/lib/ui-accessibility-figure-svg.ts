import { readFileSync } from 'node:fs';
import path from 'node:path';
import { interfaceFigure } from './ui-accessibility-figures';

export interface FigureSvg { desktop: string; mobile: string }

const dir = path.join(process.cwd(), 'public/articles/ui-accessibility');

// Inlined rather than linked: the figures then use the page's own fonts and the lead
// figure can highlight one route with CSS. The files stay the editable downloads.
export function interfaceFigureSvg(slug: string): FigureSvg | undefined {
  const figure = interfaceFigure(slug);
  if (!figure) return undefined;
  const read = (name: string) => readFileSync(path.join(dir, `${name}.svg`), 'utf8');
  return { desktop: read(figure.asset), mobile: read(`${figure.asset}-mobile`) };
}
