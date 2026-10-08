import { articleUrl, publishedArticles, type ArticleSummary } from './article-catalogue';
import { articleShareImage } from './share-metadata';

const BASE_URL = 'https://ai.hyperdrift.io';

const escapeXml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** RSS 2.0 for the articles, newest first. Filters the catalogue itself, so a draft can never reach a reader. */
export function buildRssXml(catalogue: ArticleSummary[], now = Date.now()): string {
  const live = publishedArticles(catalogue, now)
    .map((article) => ({ article, date: new Date(article.publishedAt!) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const items = live.map(({ article, date }) => {
    const url = articleUrl(article.slug);
    const image = articleShareImage(article);
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
      <category>${escapeXml(article.topic)}</category>
      <enclosure url="${escapeXml(image.url)}" type="${image.type}" length="0" />
    </item>`;
  });
  const newest = (live[0]?.date ?? new Date(0)).toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Orchestra AI by Hyperdrift</title>
    <link>${BASE_URL}/articles</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>AI engineering for founders with customers, active users or clear demand. We connect AI to existing business workflows and measure what changes.</description>
    <language>en-gb</language>
    <lastBuildDate>${newest}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`;
}
