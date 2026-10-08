'use client';

import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { ArticleTags } from '@/components/ArticleTags';
import { trackEvent } from '@/lib/analytics';
import { highlight, indexEntries, searchArticles, snippet, tokens, type SearchEntry } from '@/lib/article-search';
import type { ArticleTag } from '@/lib/article-tags';

type Props = { entries: SearchEntry[]; tags: (ArticleTag & { count: number })[]; initialTag?: string | null; children?: ReactNode };

/**
 * The list is server-rendered in full; typing or choosing a topic narrows it in place.
 * The URL follows the filter without touching Back history, so a narrowed view can be shared and survives a reload.
 */
export function ArticleFinder({ entries, tags, initialTag = null, children }: Props) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(initialTag);
  const [ready, setReady] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const words = tokens(query);
  const active = Boolean(words.length || tag);
  const indexed = useMemo(() => indexEntries(entries), [entries]);
  const results = useMemo(() => searchArticles(indexed, query, tag), [indexed, query, tag]);
  const current = tags.find((item) => item.slug === tag) ?? null;
  const listed = active ? results : children ? entries.slice(1) : entries;

  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get('q');
    if (shared) setQuery(shared);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const trimmed = query.trim();
    const target = `${tag ? `/articles/tag/${tag}` : '/articles'}${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ''}`;
    if (window.location.pathname + window.location.search !== target) window.history.replaceState(window.history.state, '', target);
    if (!active) return;
    const timer = setTimeout(() => trackEvent('article_search', { query: trimmed.slice(0, 80), tag: tag ?? '', results: results.length }), 900);
    return () => clearTimeout(timer);
  }, [ready, query, tag, active, results.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || (event.target instanceof HTMLElement && event.target.matches('input, textarea, select, [contenteditable]'))) return;
      event.preventDefault();
      input.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function onTagClick(event: MouseEvent) {
    const link = (event.target as Element).closest('a[data-tag]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
    event.preventDefault();
    const slug = link.getAttribute('data-tag');
    setTag(tag === slug ? null : slug);
  }

  function clear() {
    setQuery('');
    setTag(null);
    input.current?.focus();
  }

  const mark = (text: string) => highlight(text, words).map((run, index) => (run.hit ? <mark key={index}>{run.text}</mark> : run.text));
  // A match the title and excerpt do not show gets the sentence that carries it.
  const reason = (entry: SearchEntry) => (words.length && !highlight(`${entry.title} ${entry.excerpt}`, words).some((run) => run.hit) ? snippet(entry.text, words) : null);

  return <>
    <form role="search" action="/articles" method="get" onSubmit={(event) => event.preventDefault()} onClick={onTagClick}>
      <label htmlFor="article-search">Find an article</label>
      <input ref={input} id="article-search" type="search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setQuery(''); }} placeholder="Try “voice” or “Lakebase”" autoComplete="off" spellCheck={false} enterKeyHint="search" />
      <ArticleTags tags={tags} current={tag} />
      <p role="status" aria-live="polite">
        {active
          ? <>{results.length ? `${results.length} of ${entries.length}` : 'No match yet'}{current ? ` · ${current.label}` : ''} · <button type="button" onClick={clear}>Show all</button></>
          : <>{entries.length} articles<span data-shortcut=""> · press / to search</span></>}
      </p>
      {current && <p>{current.description}</p>}
    </form>
    {!active && children}
    <ol start={active || !children ? 1 : 2} onClick={onTagClick}>{listed.map((entry) => <li key={entry.slug}>
      <span>{String(entry.order).padStart(2, '0')}</span><div><p>{entry.topic} / {entry.example}</p><h2><a href={`/articles/${entry.slug}`}>{mark(entry.title)}</a></h2><p>{mark(entry.excerpt)}</p>{reason(entry) && <p data-snippet="">{mark(reason(entry)!)}</p>}<ArticleTags tags={entry.tags} current={tag} /><small>{entry.exampleStatus}</small></div><a href={`/articles/${entry.slug}`} aria-label={`Read ${entry.title}`}>Read →</a>
    </li>)}</ol>
  </>;
}
