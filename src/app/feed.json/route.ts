import { articles, articleUrl } from '@/lib/article-catalogue';

export const dynamic = 'force-static';

/**
 * Published articles as a JSON Feed (jsonfeed.org/version/1.1), newest first and a day in reading
 * order. `summary` is the share line: hyperdrift.io's field notes quote it. Drafts never appear,
 * preview mode included.
 */
export function GET() {
  const published = articles.filter((article) => article.publishedAt && Date.parse(article.publishedAt) <= Date.now());
  const items = published
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!) || a.order - b.order)
    .map((article) => ({
      id: articleUrl(article.slug),
      url: articleUrl(article.slug),
      title: article.title,
      summary: article.shareLine,
      content_text: article.excerpt,
      date_published: article.publishedAt,
      ...(article.updatedAt ? { date_modified: article.updatedAt } : {}),
      tags: [article.topic],
      authors: [{ name: 'Yann VR' }],
    }));

  return Response.json(
    {
      version: 'https://jsonfeed.org/version/1.1',
      title: 'Orchestra AI by Hyperdrift',
      home_page_url: 'https://ai.hyperdrift.io/articles',
      feed_url: 'https://ai.hyperdrift.io/feed.json',
      language: 'en-GB',
      authors: [{ name: 'Yann VR' }],
      items,
    },
    { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } },
  );
}
