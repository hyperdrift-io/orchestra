import { describe, expect, it } from 'vitest';
import { highlight, normalise, searchArticles, tokens, type SearchEntry } from './article-search';

const entry = (slug: string, title: string, tags: string[] = [], extra = ''): SearchEntry => ({
  slug, title, excerpt: '', topic: '', example: '', exampleStatus: '', order: 0,
  tags: tags.map((tag) => ({ slug: tag, label: tag, description: '' })),
  haystack: normalise(`${title} ${extra}`),
});
const catalogue = [
  entry('a', 'AI agent permissions: how much authority should you delegate?', ['agents', 'permissions'], 'Completion needs a read-back'),
  entry('b', 'Lakebase vs MongoDB and Cosmos DB: which approach fits?', ['databricks'], 'How do their transactions differ?'),
  entry('c', 'Web accessibility: can people finish the job?', ['accessibility', 'voice']),
];
const slugs = (list: SearchEntry[]) => list.map((item) => item.slug);

describe('searchArticles', () => {
  it('matches word starts in any order, without accents or punctuation', () => {
    expect(slugs(searchArticles(catalogue, 'acc', null))).toEqual(['c']);
    expect(slugs(searchArticles(catalogue, 'read-back author', null))).toEqual(['a']);
    expect(slugs(searchArticles(catalogue, 'Mongo', null))).toEqual(['b']);
  });

  it('never matches the middle of a word', () => {
    expect(slugs(searchArticles(catalogue, 'base', null))).toEqual([]);
  });

  it('combines a tag with the query and keeps catalogue order', () => {
    expect(slugs(searchArticles(catalogue, '', 'agents'))).toEqual(['a']);
    expect(slugs(searchArticles(catalogue, 'job', 'voice'))).toEqual(['c']);
    expect(slugs(searchArticles(catalogue, 'job', 'agents'))).toEqual([]);
    expect(slugs(searchArticles(catalogue, '', null))).toEqual(['a', 'b', 'c']);
  });
});

describe('highlight', () => {
  it('marks only the words a query starts', () => {
    const runs = highlight('Lakebase vs MongoDB: which fits?', tokens('mongo fit'));
    expect(runs.filter((run) => run.hit).map((run) => run.text)).toEqual(['MongoDB', 'fits']);
    expect(runs.map((run) => run.text).join('')).toBe('Lakebase vs MongoDB: which fits?');
  });

  it('returns the text untouched without a query', () => {
    expect(highlight('Plain', [])).toEqual([{ text: 'Plain', hit: false }]);
  });
});
