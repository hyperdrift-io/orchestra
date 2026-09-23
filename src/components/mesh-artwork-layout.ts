export type MeshLayout = 'cover' | 'stripe' | 'title';

/** Identical camera framing for the server SVG and the first GPU frame. */
export function meshArtworkFrame(layout: MeshLayout) {
  const width = layout === 'title' ? 400 : 1200;
  const height = layout === 'title' ? 200 : 160;
  return { width, height, viewBox: `${600 - width / 2} ${80 - height / 2} ${width} ${height}` };
}
