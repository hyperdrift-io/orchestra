import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ArticleSummary } from './article-catalogue';
import { isTractionArticle } from './traction-brand';

// A logo or card-copy change produces a fresh image URL for social-preview caches.
const identity = readFileSync(join(process.cwd(), 'public/assets/hyperdrift-logo.svg'), 'utf8');
const digest = (value: string) => createHash('sha256').update(value).digest('hex').slice(0, 12);
const tractionIdentity = readFileSync(join(process.cwd(), 'public/brand/traction/lockup-share.png')).toString('base64');
export const tractionIcons = {
  icon: [{ url: '/brand/traction/favicon.svg?v=20261113', type: 'image/svg+xml' }, { url: '/brand/traction/favicon-32.png?v=20261113', type: 'image/png', sizes: '32x32' }],
  shortcut: '/brand/traction/favicon.ico?v=20261113',
  apple: { url: '/brand/traction/apple-touch-icon.png?v=20261113', sizes: '180x180' },
};
export const tractionShareImage = {
  url: `/brand/traction/og-dark.jpg?v=${digest(readFileSync(join(process.cwd(), 'public/brand/traction/og-dark.jpg')).toString('base64'))}`,
  width: 1200, height: 630, alt: 'Traction: a sail with a T in negative space and a flowing wordmark.',
};
const brandAlt = 'Hyperdrift. A team behind your app.';
const brandUrl = `https://hyperdrift.io/opengraph-image?v=${digest(identity + brandAlt)}`;

export const brandShareImage = {
  url: brandUrl,
  secureUrl: brandUrl,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: brandAlt,
};

export function articleShareImage(article: ArticleSummary) {
  const artwork = article.heroImage ? article.topic + JSON.stringify(article.heroImage) + readFileSync(join(process.cwd(), 'public', article.heroImage.src)).toString('base64') : '';
  const version = digest(identity + (isTractionArticle(article.slug) ? tractionIdentity : '') + JSON.stringify(['article-card-v3', article.shareArtworkOnly, article.title, article.shareLine, article.steps, article.example, article.exampleStatus]) + artwork);
  const url = `https://hyperdrift.io/articles/${article.slug}/opengraph-image?v=${version}`;
  return { url, secureUrl: url, width: 1200, height: 630, type: 'image/png', alt: `${article.title}. ${article.heroImage?.alt ?? article.shareLine}` };
}

export const websiteOpenGraph = {
  type: 'website' as const,
  siteName: 'Hyperdrift',
  locale: 'en_GB',
  images: [brandShareImage],
};

export const homepageOpenGraph = {
  ...websiteOpenGraph,
  title: 'Hyperdrift — Customer growth and AI engineering',
  description: 'Connect customer insight, distribution and AI engineering. Start with one measurable opportunity to reach customers, help them use your product or improve delivery.',
  url: 'https://hyperdrift.io',
};
