import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Share images use the approved vector master, keeping its negative space intact. */
export async function apertureImage() {
  const svg = await readFile(join(process.cwd(), 'public/brand/orchestra-aperture.svg'));
  return `data:image/svg+xml;base64,${svg.toString('base64')}`;
}

export async function shareFonts() {
  const directory = join(process.cwd(), 'src/assets/share-fonts');
  const [display, italic, body] = await Promise.all([
    readFile(join(directory, 'cormorant-medium.ttf')),
    readFile(join(directory, 'cormorant-medium-italic.ttf')),
    readFile(join(directory, 'plex-regular.ttf')),
  ]);
  return [
    { name: 'Cormorant', data: display, weight: 500 as const, style: 'normal' as const },
    { name: 'Cormorant', data: italic, weight: 500 as const, style: 'italic' as const },
    { name: 'Plex', data: body, weight: 400 as const, style: 'normal' as const },
  ];
}
