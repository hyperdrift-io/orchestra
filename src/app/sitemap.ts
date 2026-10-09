import type { MetadataRoute } from 'next';
import { publishedArticles, articleUrl } from '@/lib/article-catalogue';
import { indexableTags, tagUrl } from '@/lib/article-tags';

export default function sitemap(): MetadataRoute.Sitemap {
  const published = publishedArticles();
  return [
    {
      url: 'https://orchestra.hyperdrift.io',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...['how-it-works','work','about','partnership','traction','traction/first-read','articles/traction-from-zero'].map(path=>({url:`https://orchestra.hyperdrift.io/${path}`,changeFrequency:'monthly' as const,priority:path==='how-it-works'?.9:.8})),
    ...(published.length ? [{ url: 'https://orchestra.hyperdrift.io/articles', changeFrequency: 'weekly' as const, priority: 0.8 }] : []),
    ...(published.some((article) => article.series === 'ui-accessibility') ? [{ url: 'https://orchestra.hyperdrift.io/articles/ui-accessibility', changeFrequency: 'monthly' as const, priority: 0.8 }] : []),
    ...published.map((article) => ({ url: articleUrl(article.slug), lastModified: new Date(article.updatedAt ?? article.publishedAt!), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...indexableTags(published).map((tag) => ({ url: tagUrl(tag.slug), changeFrequency: 'weekly' as const, priority: 0.6 })),
  ];
}
