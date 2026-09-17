import type { MetadataRoute } from 'next';

const SITE = 'https://ai.hyperdrift.io';

/**
 * Every public route and the day its content last changed. A new page adds a line here;
 * a date moves only when that page's content does, never on a rebuild.
 */
const ROUTES: { path: string; lastModified: string }[] = [{ path: '', lastModified: '2026-08-31' }];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified }) => ({ url: `${SITE}${path}`, lastModified }));
}
