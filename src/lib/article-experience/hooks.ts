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
  async function copy(event?: React.MouseEvent<HTMLElement>) {
    if (event && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    event?.preventDefault();
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      emitArticleInteraction({ action: anchor ? 'article_anchor_copied' : 'article_link_copied', anchor: anchor || undefined });
      timer.current = setTimeout(() => setStatus('idle'), 2500);
    } catch { setStatus('manual'); }
  }
  return { copy, status, field, url };
}
export function useArticleShare(canonical: string, title: string) {
  const link = useAnchorCopy(canonical, '');
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator.share === 'function'), []);
  const share = async () => {
    try {
      emitArticleInteraction({ action: 'article_native_share_requested' });
      await navigator.share({ title, url: link.url });
    } catch (error) {
      if ((error as { name?: string })?.name !== 'AbortError') await link.copy();
    }
  };
  return { ...link, canShare, share, email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(link.url)}` };
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
