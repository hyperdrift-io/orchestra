import { describe, expect, it } from 'vitest';
import { articles, type ArticleSummary } from './article-catalogue';
import { buildRssXml } from './discovery-feeds';

const now = Date.parse('2026-10-08T12:00:00Z');
const entry = (slug: string, publishedAt: string | null, title = slug): ArticleSummary => ({ ...articles[0], slug, title, publishedAt });
const slugs = (xml: string) => Array.from(xml.matchAll(/<guid isPermaLink="true">https:\/\/orchestra\.hyperdrift\.io\/articles\/([^<]+)<\/guid>/g), (match) => match[1]);

describe('buildRssXml', () => {
  it('lists published articles only, newest first', () => {
    const xml = buildRssXml([
      entry('older', '2026-09-23T00:00:00Z'),
      entry('draft', null),
      entry('scheduled', '2026-10-09T00:00:00Z'),
      entry('newer', '2026-10-06T00:00:00Z'),
    ], now);
    expect(slugs(xml)).toEqual(['newer', 'older']);
    expect(xml).toContain('<pubDate>Tue, 06 Oct 2026 00:00:00 GMT</pubDate>');
    expect(xml).toContain('<lastBuildDate>Tue, 06 Oct 2026 00:00:00 GMT</lastBuildDate>');
  });

  it('escapes text and carries the article share image', () => {
    const xml = buildRssXml([entry('escaped', '2026-10-01T00:00:00Z', 'Agents & <tools>')], now);
    expect(xml).toContain('<title>Agents &amp; &lt;tools&gt;</title>');
    expect(xml).toMatch(/<enclosure url="https:\/\/orchestra\.hyperdrift\.io\/articles\/escaped\/opengraph-image\?v=[0-9a-f]{12}" type="image\/png" length="0" \/>/);
  });

  it('never lists a catalogue entry without a past publication date', () => {
    const listed = slugs(buildRssXml(articles, now));
    const live = articles.filter((article) => article.publishedAt && Date.parse(article.publishedAt) <= now).map((article) => article.slug);
    expect(listed.sort()).toEqual(live.sort());
  });
});
