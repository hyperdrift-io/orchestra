'use client';
import { useEffect, useRef, useState } from 'react';
import { articleLink, type ArticleEntry } from './model';
import { emitArticleInteraction, observeArticle, type ArticleInteraction } from './browser';
export function useArticlePosition(bodyId: string, entries: ArticleEntry[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => observeArticle(bodyId, entries, setActive), [bodyId, entries]);
  return active;
}
export function useAnchorCopy(canonical: string, anchor: string) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const field = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const url = articleLink(canonical, anchor);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (status === 'manual') { field.current?.focus({ preventScroll: true }); field.current?.select(); } }, [status]);
  async function copy(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      emitArticleInteraction({ action: 'article_anchor_copied', anchor });
      timer.current = setTimeout(() => setStatus('idle'), 2500);
    } catch { setStatus('manual'); }
  }
  return { copy, status, field, url };
}
export function useSourcePreview(source: string) {
  const panel = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const onToggle = (event: Event) => {
      const opened = (event as Event & { newState: string }).newState === 'open';
      emitArticleInteraction({ action: opened ? 'article_source_preview_opened' : 'article_source_preview_closed', source });
    };
    element.addEventListener('toggle', onToggle);
    return () => element.removeEventListener('toggle', onToggle);
  }, [source]);
  const close = () => { panel.current?.hidePopover(); trigger.current?.focus({ preventScroll: true }); };
  return { panel, trigger, close };
}
export function useArticleEvents(track: (detail: ArticleInteraction) => void) {
  useEffect(() => {
    const listener = (event: Event) => track((event as CustomEvent<ArticleInteraction>).detail);
    document.addEventListener('article:interaction', listener);
    return () => document.removeEventListener('article:interaction', listener);
  }, [track]);
}
