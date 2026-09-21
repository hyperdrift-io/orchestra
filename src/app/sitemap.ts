import type { MetadataRoute } from 'next';
import { visibleArticles, articleUrl } from '@/lib/article-catalogue';

export default function sitemap(): MetadataRoute.Sitemap {
  const published = visibleArticles().filter((article) => article.publishedAt && Date.parse(article.publishedAt) <= Date.now());
  return [
    {
      url: 'https://ai.hyperdrift.io',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...(published.length ? [{ url: 'https://ai.hyperdrift.io/articles', changeFrequency: 'weekly' as const, priority: 0.8 }] : []),
    ...published.map((article) => ({ url: articleUrl(article.slug), lastModified: new Date(article.publishedAt!), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
