/**
 * What may leave the page for PostHog, kept free of the browser client so it can be tested on its own.
 * A personal invitation's address holds its token, and the token is the page's key: nothing sent may carry it.
 */
const INVITATION = /\/traction\/invitation\/[^/?#\s"'\\]+/g;

/** An invitation's token is its key, so analytics only ever sees the shared path. */
export function analyticsPath(pathname: string) {
  return pathname.startsWith('/traction/invitation/') ? '/traction/invitation' : pathname;
}

/**
 * The client's fixed settings. `advanced_disable_flags` stops the two requests the script makes on its own as it
 * starts: the project's remote settings and `/flags`. The flags request carries the page's full address as
 * `$initial_current_url` and `$initial_pathname`, and `before_send` never sees it. Orchestra uses no flag, survey or
 * remote setting, so nothing is lost; turn it off again only with another way of keeping the address out.
 */
export const analyticsOptions = {
  api_host: '/ingest', ui_host: 'https://eu.posthog.com',
  defaults: '2026-01-30',
  advanced_disable_flags: true,
  persistence: 'memory', person_profiles: 'never',
  autocapture: false, capture_dead_clicks: false, capture_exceptions: false,
  disable_session_recording: true, capture_pageview: 'history_change',
} as const;

/** URL queries can contain personal information. Keep paths and bounded campaign tags only. */
export function cleanProperties(properties: Record<string, unknown>) {
  for (const key of Object.keys(properties)) {
    const value = properties[key];
    if (/url|referrer/i.test(key) && typeof value === 'string') {
      try { const url = new URL(value); properties[key] = url.origin + analyticsPath(url.pathname); }
      catch { delete properties[key]; continue; }
    }
    if (/utm_|initial_utm_|search_keyword/i.test(key)) { delete properties[key]; continue; }
    if (/pathname/i.test(key) && typeof value === 'string') properties[key] = analyticsPath(value);
    // Whatever name a later version of the script gives a property, an invitation's address never leaves whole.
    const kept = properties[key];
    if (typeof kept === 'string') properties[key] = kept.replace(INVITATION, '/traction/invitation');
    else if (kept && typeof kept === 'object' && !Array.isArray(kept)) cleanProperties(kept as Record<string, unknown>);
  }
  return properties;
}

type Link = { origin: string; hostname: string; pathname: string; hash: string };
/** The door a link opens, or nothing for a link we do not count. */
export function ctaDestination(link: Link, pageOrigin: string) {
  if (link.origin === pageOrigin) {
    if (link.hash === '#first-read') return 'first_read';
    if (['#contact', '#enquire'].includes(link.hash)) return 'enquiry';
    if (link.pathname === '/partnership' || link.pathname === '/traction/partnership' || (link.pathname === '/traction' && link.hash === '#partnership')) return 'partnership';
    if (link.pathname === '/work') return 'work';
    if (link.pathname === '/traction') return link.hash === '#continue' ? 'continue' : 'traction';
    return link.pathname === '/articles/traction-from-zero' ? 'launch_log' : null;
  }
  if (link.hostname === 'nextrole.site') return 'nextrole';
  if (!(link.hostname === 'traction.hyperdrift.io' || link.hostname === 'localhost')) return null;
  return link.pathname === '/start' ? 'start_free' : link.pathname.startsWith('/app/') ? 'board' : null;
}

/**
 * Where on the page a counted link sits. A door names itself with `data-placement` (`invitation_door`, `page_door`,
 * `tour_door`), because the element it happens to sit in says nothing: the invitation's door is inside the article's
 * `<header>` and the Traction page's door inside its `<footer>`. Other links keep header, footer or body.
 */
export function ctaPlacement(link: { closest(selector: string): unknown }) {
  const named = (link.closest('[data-placement]') as { dataset?: { placement?: string } } | null)?.dataset?.placement;
  if (named && /^[a-z][a-z_]{0,39}$/.test(named)) return named;
  return link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'body';
}
