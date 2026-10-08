import type { ArticleTag } from './article-tags';

/** What the finder needs per article, built once on the server; `haystack` is the normalised text it searches. */
export type SearchEntry = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  example: string;
  exampleStatus: string;
  order: number;
  tags: ArticleTag[];
  haystack: string;
};

export const normalise = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export const tokens = (query: string) => normalise(query).split(' ').filter(Boolean);

/** Every query word must start a word in the entry, so a reader typing "acc" already sees accessibility. */
export function matches(entry: Pick<SearchEntry, 'haystack'>, words: string[]) {
  const text = ` ${entry.haystack}`;
  return words.every((word) => text.includes(` ${word}`));
}

/** Catalogue order is kept on purpose: the numbered list never reshuffles under the reader's eyes. */
export function searchArticles(entries: SearchEntry[], query: string, tag: string | null) {
  const words = tokens(query);
  return entries.filter((entry) => (!tag || entry.tags.some((item) => item.slug === tag)) && (!words.length || matches(entry, words)));
}

/** Splits text into plain and matched runs so the view can wrap the matches in <mark>. */
export function highlight(text: string, words: string[]): { text: string; hit: boolean }[] {
  if (!words.length) return [{ text, hit: false }];
  return text
    .split(/([A-Za-z0-9À-ɏ]+)/)
    .filter(Boolean)
    .map((run) => ({ text: run, hit: words.some((word) => normalise(run).startsWith(word)) }));
}
