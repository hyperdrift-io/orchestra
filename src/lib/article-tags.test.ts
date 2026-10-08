import { describe, expect, it } from 'vitest';
import vocabulary from '@/data/article-tags.json';
import { articles, publishedArticles } from './article-catalogue';
import { INDEXABLE_FROM, indexableTags, isTagIndexable, tagBySlug, tagsIn, tagsOf } from './article-tags';

describe('article tags', () => {
  it('only uses slugs from the vocabulary, and every article carries at least one', () => {
    for (const article of articles) {
      expect(article.tags.length, article.slug).toBeGreaterThan(0);
      for (const tag of article.tags) expect(tagBySlug(tag), `${article.slug} → ${tag}`).not.toBeNull();
    }
  });

  it('reads tags back in vocabulary order with their labels', () => {
    const order = Object.keys(vocabulary);
    const labels = tagsOf({ tags: ['permissions', 'agents'] });
    expect(labels.map((tag) => tag.slug)).toEqual(['agents', 'permissions']);
    expect(order.indexOf(labels[0].slug)).toBeLessThan(order.indexOf(labels[1].slug));
    expect(tagsOf({ tags: ['missing'] })).toEqual([]);
  });

  it('indexes a tag page only once enough published articles carry it', () => {
    const published = publishedArticles(articles, Date.parse('2026-10-08T00:00:00Z'));
    for (const tag of tagsIn(published)) expect(isTagIndexable(tag.slug, published)).toBe(tag.count >= INDEXABLE_FROM);
    expect(indexableTags(published).every((tag) => tag.count >= INDEXABLE_FROM)).toBe(true);
    expect(tagsIn([])).toEqual([]);
  });
});
