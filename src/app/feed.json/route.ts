import { articles, articleUrl, publishedArticles } from '@/lib/article-catalogue';
import { articleShareImage } from '@/lib/share-metadata';

// Same catalogue and publication gate as RSS, for HD's digest and agent consumers.
export const revalidate = 60;

export function GET(): Response {
  const items = publishedArticles(articles)
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!))
    .map((article) => ({
      id: articleUrl(article.slug),
      url: articleUrl(article.slug),
      title: article.title,
      summary: article.shareLine || article.excerpt,
      content_text: article.excerpt,
      date_published: article.publishedAt,
      image: articleShareImage(article).url,
      tags: article.tags ?? [],
    }));
  return Response.json({
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Orchestra AI by Hyperdrift',
    home_page_url: 'https://orchestra.hyperdrift.io/articles',
    feed_url: 'https://orchestra.hyperdrift.io/feed.json',
    items,
  }, { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } });
}
