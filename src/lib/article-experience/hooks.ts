'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleLink, type ArticleEntry } from './model';
import { emitArticleInteraction, observeArticle, type ArticleInteraction } from './browser';
export function useArticlePosition(bodyId: string, entries: ArticleEntry[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => observeArticle(bodyId, entries, setActive), [bodyId, entries]);
  return active;
}
export function useAnchorCopy(canonical: string, anchor: string, placement?: string) {
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
    emitArticleInteraction({ action: anchor ? 'article_anchor_copy_requested' : 'article_link_copy_requested', anchor: anchor || undefined, placement });
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      emitArticleInteraction({ action: anchor ? 'article_anchor_copied' : 'article_link_copied', anchor: anchor || undefined, placement });
      timer.current = setTimeout(() => setStatus('idle'), 2500);
    } catch { setStatus('manual'); }
  }
  const reset = useCallback(() => { clearTimeout(timer.current); setStatus('idle'); }, []);
  return { copy, status, field, url, reset };
}
export function useArticleShare(canonical: string, title: string, text?: string, placement?: string) {
  const link = useAnchorCopy(canonical, '', placement);
  const { reset } = link;
  const [ready, setReady] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pending = useRef(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setReady(true);
    try { setCanShare(typeof navigator.share === 'function' && (!navigator.canShare || navigator.canShare({ title, text, url: canonical }))); }
    catch { setCanShare(false); }
  }, [canonical, title, text]);
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const syncOpen = (opened: boolean) => {
      setExpanded(opened);
      if (opened) {
        reset();
        element.querySelector<HTMLElement>('[data-article-share-actions] :is(a,button)')?.focus({ preventScroll: true });
        emitArticleInteraction({ action: 'article_share_options_opened', placement });
      }
    };
    const onToggle = (event: Event) => syncOpen((event as Event & { newState: string }).newState === 'open');
    element.addEventListener('toggle', onToggle);
    // Native popovers can open before hydration attaches the listener.
    if ('showPopover' in element && element.matches(':popover-open')) syncOpen(true);
    return () => element.removeEventListener('toggle', onToggle);
  }, [placement, reset]);
  const close = () => { panel.current?.hidePopover(); trigger.current?.focus({ preventScroll: true }); };
  const chosen = (source: string, download: boolean) => emitArticleInteraction({ action: download ? 'article_share_asset_requested' : 'article_share_destination_opened', source, placement });
  const share = async () => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    reset();
    try {
      emitArticleInteraction({ action: 'article_native_share_requested', placement });
      await navigator.share({ title, ...(text && { text }), url: link.url });
    } catch (error) {
      if ((error as { name?: string })?.name !== 'AbortError') await link.copy();
    } finally { pending.current = false; setBusy(false); }
  };
  return { ...link, ready, canShare, share, busy, panel, trigger, close, expanded, chosen };
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
