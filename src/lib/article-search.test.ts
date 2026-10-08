import { describe, expect, it } from 'vitest';
import { highlight, indexEntries, plainText, searchArticles, snippet, tokens, type SearchEntry } from './article-search';

const entry = (slug: string, title: string, tags: string[] = [], text = ''): SearchEntry => ({
  slug, title, excerpt: '', topic: '', example: '', exampleStatus: '', order: 0,
  tags: tags.map((tag) => ({ slug: tag, label: tag, description: '' })),
  text,
});
const catalogue = indexEntries([
  entry('a', 'AI agent permissions: how much authority should you delegate?', ['agents', 'permissions'], 'Completion needs a read-back.'),
  entry('b', 'Lakebase vs MongoDB and Cosmos DB: which approach fits?', ['databricks'], 'How do their transactions differ?'),
  entry('c', 'The dashboard that speaks first', ['voice'], 'First Officer is built with AssemblyAI.\nIt listens, then reads the agenda back.'),
]);
const slugs = (list: SearchEntry[]) => list.map((item) => item.slug);

describe('searchArticles', () => {
  it('matches word starts anywhere in the prose, in any order', () => {
    expect(slugs(searchArticles(catalogue, 'assembly', null))).toEqual(['c']);
    expect(slugs(searchArticles(catalogue, 'read-back author', null))).toEqual(['a']);
    expect(slugs(searchArticles(catalogue, 'Mongo', null))).toEqual(['b']);
  });

  it('never matches the middle of a word', () => {
    expect(slugs(searchArticles(catalogue, 'base', null))).toEqual([]);
  });

  it('combines a tag with the query and keeps catalogue order', () => {
    expect(slugs(searchArticles(catalogue, '', 'agents'))).toEqual(['a']);
    expect(slugs(searchArticles(catalogue, 'agenda', 'voice'))).toEqual(['c']);
    expect(slugs(searchArticles(catalogue, 'agenda', 'agents'))).toEqual([]);
    expect(slugs(searchArticles(catalogue, '', null))).toEqual(['a', 'b', 'c']);
  });
});

describe('plainText', () => {
  it('keeps link labels and sentences, drops images and markdown marks', () => {
    expect(plainText('## Heading\n\nSee [the demo](https://youtu.be/x) now.\n\n![alt](/img.png)\n\n> A quote.')).toBe('Heading\nSee the demo now.\nA quote.');
  });
});

describe('highlight and snippet', () => {
  it('marks only the words a query starts', () => {
    const runs = highlight('Lakebase vs MongoDB: which fits?', tokens('mongo fit'));
    expect(runs.filter((run) => run.hit).map((run) => run.text)).toEqual(['MongoDB', 'fits']);
    expect(runs.map((run) => run.text).join('')).toBe('Lakebase vs MongoDB: which fits?');
    expect(highlight('Plain', [])).toEqual([{ text: 'Plain', hit: false }]);
  });

  it('returns the first sentence that carries a query word, shortened on a word boundary', () => {
    expect(snippet(catalogue[2].text, tokens('assembly'))).toBe('First Officer is built with AssemblyAI.');
    expect(snippet(catalogue[2].text, tokens('agenda'))).toBe('It listens, then reads the agenda back.');
    expect(snippet(catalogue[2].text, tokens('nothing'))).toBeNull();
    expect(snippet('one two three four five six', tokens('one'), 12)).toBe('one two…');
  });
});
