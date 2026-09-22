import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ArticleSummary } from './article-catalogue';

// A logo or card-copy change produces a fresh image URL for social-preview caches.
const identity = ['orchestra-mesh.svg', 'orchestra-mesh-compact.svg']
  .map((name) => readFileSync(join(process.cwd(), 'public/brand', name), 'utf8')).join('');
const digest = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 12);
const brandAlt = 'Orchestra AI by Hyperdrift. Grow your business. Keep more of the upside.';
const brandUrl = `https://ai.hyperdrift.io/opengraph-image?v=${digest(identity + brandAlt)}`;

export const brandShareImage = {
  url: brandUrl,
  secureUrl: brandUrl,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: brandAlt,
};

export function articleShareImage(article: ArticleSummary) {
  const version = digest(identity + JSON.stringify([article.title, article.shareLine, article.order, article.steps, article.example, article.exampleStatus]));
  const url = `https://ai.hyperdrift.io/articles/${article.slug}/opengraph-image?v=${version}`;
  return { url, secureUrl: url, width: 1200, height: 630, type: 'image/png', alt: `${article.title}. ${article.shareLine}` };
}

export const websiteOpenGraph = {
  type: 'website' as const,
  siteName: 'Orchestra AI by Hyperdrift',
  locale: 'en_GB',
  images: [brandShareImage],
};

export const homepageOpenGraph = {
  ...websiteOpenGraph,
  title: 'Orchestra AI by Hyperdrift — AI for business growth',
  description: 'Grow your business. Keep more of the upside. AI engineering for founders with customers, active users or clear demand.',
  url: 'https://ai.hyperdrift.io',
};
