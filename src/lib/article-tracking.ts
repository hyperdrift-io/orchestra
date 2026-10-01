import type { ArticleEvent } from './article-events';

import { visitorSession } from './campaign';
import { trackEvent } from './analytics';
export const articleSession = visitorSession;

export function trackArticle(article: string, event: ArticleEvent['event']) {
  if (event !== 'enquiry_started') trackEvent(event, { article });
  const payload = JSON.stringify({ article, event, session: articleSession() });
  const blob = new Blob([payload], { type: 'application/json' });
  if (navigator.sendBeacon?.('/api/article-events', blob)) return;
  void fetch('/api/article-events', { method: 'POST', body: payload, headers: { 'content-type': 'application/json' }, keepalive: true }).catch(() => {});
}

/** The share of the body that has scrolled past before a reader counts as committed. */
const COMMITTED_AT = 0.3;

export function observeArticle(slug: string) {
  trackArticle(slug, 'article_viewed');
  const article = document.getElementById('article');
  const body = document.getElementById('article-body');
  let committed = false;
  const onScroll = () => {
    if (committed || !body) return;
    const rect = body.getBoundingClientRect();
    if ((window.innerHeight - rect.top) / rect.height < COMMITTED_AT) return;
    committed = true; trackArticle(slug, 'article_committed');
    if (article && !article.dataset.read) article.dataset.read = 'engaged';
    window.removeEventListener('scroll', onScroll);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  let engaged = false;
  const observer = new IntersectionObserver((entries) => {
    if (!engaged && entries.some((entry) => entry.isIntersecting)) {
      engaged = true; trackArticle(slug, 'article_engaged');
      article?.setAttribute('data-read', 'done');
    }
  });
  const end = document.getElementById('article-end');
  if (end) observer.observe(end);
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('a[data-enquiry]')) trackArticle(slug, 'article_cta_clicked');
    if (event.target.closest('[data-proof-link], #article-proof summary')) trackArticle(slug, 'article_proof_opened');
  };
  // Preserve the existing funnel signal for an explicit share action, never opening its panel.
  const onShare = (event: Event) => {
    const action = (event as CustomEvent<{ action: string }>).detail.action;
    if (['article_link_copied', 'article_share_destination_opened', 'article_native_share_requested', 'article_share_asset_requested'].includes(action)) trackArticle(slug, 'article_shared');
  };
  document.addEventListener('article:interaction', onShare);
  document.addEventListener('click', onClick);
  return () => { document.removeEventListener('article:interaction', onShare); observer.disconnect(); document.removeEventListener('click', onClick); window.removeEventListener('scroll', onScroll); };
}
