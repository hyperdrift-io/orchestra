import type { ArticleTag } from './article-tags';

/** What the finder needs per article, built once on the server; `text` is the whole article as plain prose. */
export type SearchEntry = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  example: string;
  exampleStatus: string;
  order: number;
  tags: ArticleTag[];
  text: string;
};

export type IndexedEntry = SearchEntry & { haystack: string };

export const normalise = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export const tokens = (query: string) => normalise(query).split(' ').filter(Boolean);

/** Markdown source to prose: images dropped, links kept by their label, headings and quotes kept as sentences. */
export function plainText(source: string) {
  return source
    .replace(/^!\[[^\]]*\]\([^)]*\)\s*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^(## |> )/gm, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/** One deduplicated word list per article, so each keystroke scans a few kilobytes rather than the prose. */
export function indexEntries(entries: SearchEntry[]): IndexedEntry[] {
  return entries.map((entry) => ({
    ...entry,
    haystack: Array.from(new Set(normalise([entry.title, entry.excerpt, entry.topic, entry.example, ...entry.tags.map((tag) => tag.label), entry.text].join(' ')).split(' '))).join(' '),
  }));
}

/** Every query word must start a word in the entry, so a reader typing "acc" already sees accessibility. */
export function matches(entry: Pick<IndexedEntry, 'haystack'>, words: string[]) {
  const text = ` ${entry.haystack}`;
  return words.every((word) => text.includes(` ${word}`));
}

/** Catalogue order is kept on purpose: the numbered list never reshuffles under the reader's eyes. */
export function searchArticles(entries: IndexedEntry[], query: string, tag: string | null) {
  const words = tokens(query);
  return entries.filter((entry) => (!tag || entry.tags.some((item) => item.slug === tag)) && (!words.length || matches(entry, words)));
}

const wordRun = /([A-Za-z0-9À-ɏ]+)/;
const startsAny = (run: string, words: string[]) => words.some((word) => normalise(run).startsWith(word));

/** Splits text into plain and matched runs so the view can wrap the matches in <mark>. */
export function highlight(text: string, words: string[]): { text: string; hit: boolean }[] {
  if (!words.length) return [{ text, hit: false }];
  return text.split(wordRun).filter(Boolean).map((run) => ({ text: run, hit: startsAny(run, words) }));
}

/** The first sentence of the prose that carries a query word, so a match the title does not show still explains itself. */
export function snippet(text: string, words: string[], limit = 180) {
  if (!words.length) return null;
  const sentence = text.split(/(?<=[.!?])\s+|\n/).find((candidate) => candidate.split(wordRun).some((run) => startsAny(run, words)));
  if (!sentence) return null;
  return sentence.length <= limit ? sentence : `${sentence.slice(0, sentence.lastIndexOf(' ', limit))}…`;
}
