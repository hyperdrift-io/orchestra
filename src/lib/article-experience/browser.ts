/** Canonical source: Hyperdrift packages/article-experience. */
import type { ArticleEntry } from './model';
export interface ArticleInteraction { action: string; anchor?: string; source?: string }
export function emitArticleInteraction(detail: ArticleInteraction) {
  document.dispatchEvent(new CustomEvent<ArticleInteraction>('article:interaction', { detail }));
}
export function observeArticle(bodyId: string, entries: ArticleEntry[], onActive: (id: string | null) => void) {
  const body = document.getElementById(bodyId);
  if (!body) return () => {};
  const sections = entries.flatMap(entry => {
    const element = document.getElementById(entry.id);
    return element ? [{ ...entry, element }] : [];
  });
  let frame = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let userScroll = false;
  let resumePending = false;
  const update = () => {
    frame = 0;
    const anchorOffset = sections.reduce((offset, section) => Math.max(offset, parseFloat(getComputedStyle(section.element).scrollMarginTop) || 0), 0);
    const line = Math.max(Math.min(120, window.innerHeight * .2), anchorOffset + 2);
    const current = sections.filter(section => section.element.getBoundingClientRect().top <= line).at(-1);
    onActive(current?.id || null);
    clearTimeout(timer);
    if (!userScroll || !current || body.getBoundingClientRect().bottom <= line) return;
    timer = setTimeout(() => {
      if (!userScroll) return;
      const url = new URL(window.location.href);
      url.hash = current.id;
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
      if (resumePending) { emitArticleInteraction({ action: 'article_reading_resumed', anchor: current.id }); resumePending = false; }
      userScroll = false;
    }, 180);
  };
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
  const onIntent = (event: Event) => {
    if ((event.target as Element)?.closest?.('[popover], input, textarea, select, [contenteditable=true]')) return;
    if (event instanceof KeyboardEvent && !['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return;
    userScroll = true;
  };
  const onNavigation = () => { userScroll = false; clearTimeout(timer); schedule(); };
  const onPointerIntent = (event: PointerEvent) => {
    // Scrollbars can emit scroll without wheel/touch/key events. Keep ordinary clicks inert.
    const root = document.documentElement;
    if (event.buttons === 1 && event.target === root && event.clientX >= root.clientWidth - 18) userScroll = true;
  };
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element).closest?.('a[href^="#"]');
    if (link) onNavigation();
  };
  const onPreview = (event: Event) => {
    if ((event as CustomEvent<ArticleInteraction>).detail.action === 'article_source_preview_closed') resumePending = true;
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onNavigation);
  window.addEventListener('hashchange', onNavigation);
  window.addEventListener('popstate', onNavigation);
  window.addEventListener('wheel', onIntent, { passive: true });
  window.addEventListener('touchmove', onIntent, { passive: true });
  window.addEventListener('keydown', onIntent);
  window.addEventListener('pointerdown', onPointerIntent, { passive: true });
  window.addEventListener('pointermove', onPointerIntent, { passive: true });
  document.addEventListener('click', onClick);
  document.addEventListener('article:interaction', onPreview);
  const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(onNavigation) : null;
  observer?.observe(body);
  schedule();
  return () => {
    cancelAnimationFrame(frame); clearTimeout(timer); observer?.disconnect();
    window.removeEventListener('scroll', schedule); window.removeEventListener('resize', onNavigation);
    window.removeEventListener('hashchange', onNavigation); window.removeEventListener('popstate', onNavigation);
    window.removeEventListener('wheel', onIntent); window.removeEventListener('touchmove', onIntent);
    window.removeEventListener('keydown', onIntent); document.removeEventListener('click', onClick);
    window.removeEventListener('pointerdown', onPointerIntent); window.removeEventListener('pointermove', onPointerIntent);
    document.removeEventListener('article:interaction', onPreview);
  };
}
