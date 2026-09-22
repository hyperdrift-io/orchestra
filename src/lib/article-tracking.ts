import type { ArticleEvent } from './article-events';

let memorySession: string | undefined;
export function articleSession() {
  if (memorySession) return memorySession;
  try {
    const saved = sessionStorage.getItem('ai-article-session');
    memorySession = saved && /^[0-9a-f-]{36}$/i.test(saved) ? saved : crypto.randomUUID();
    sessionStorage.setItem('ai-article-session', memorySession);
  } catch { memorySession = crypto.randomUUID(); }
  return memorySession;
}

export function trackArticle(article: string, event: ArticleEvent['event']) {
  const payload = JSON.stringify({ article, event, session: articleSession() });
  const blob = new Blob([payload], { type: 'application/json' });
  if (navigator.sendBeacon?.('/api/article-events', blob)) return;
  void fetch('/api/article-events', { method: 'POST', body: payload, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {});
}

export function observeArticle(slug: string) {
  trackArticle(slug, 'article_viewed');
  let engaged = false;
  const observer = new IntersectionObserver((entries) => {
    if (!engaged && entries.some((entry) => entry.isIntersecting)) {
      engaged = true; trackArticle(slug, 'article_engaged');
      document.getElementById('article')?.setAttribute('data-read', 'done');
    }
  });
  const end = document.getElementById('article-end');
  if (end) observer.observe(end);
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('a[data-enquiry]')) trackArticle(slug, 'article_cta_clicked');
    if (event.target.closest('#article-share nav :is(a, button), [data-share-line]')) trackArticle(slug, 'article_shared');
    if (event.target.closest('[data-proof-link], #article-proof summary')) trackArticle(slug, 'article_proof_opened');
  };
  document.addEventListener('click', onClick);
  return () => { observer.disconnect(); document.removeEventListener('click', onClick); };
}
