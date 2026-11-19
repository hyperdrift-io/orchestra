import posthog from 'posthog-js';

const KEY = 'traction-journey';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
let transient: string | undefined;

/** A visit correlation, never a person identifier or access credential. */
export function measurementAllowed() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return false;
  try { return !posthog.has_opted_out_capturing(); } catch { return false; }
}

export function journeyId(): string | undefined {
  if (!measurementAllowed()) {
    transient = undefined;
    try { sessionStorage.removeItem(KEY); } catch { /* Storage may be unavailable. */ }
    return undefined;
  }
  try {
    const saved = sessionStorage.getItem(KEY);
    const id = saved && UUID.test(saved) ? saved : transient ?? crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
    return transient = id;
  } catch { return transient ??= crypto.randomUUID(); }
}

/** Fragments stay out of request logs. A forwarded link still proves no identity. */
export function journeyStartHref(href: string, invite?: string): string {
  if (!/^https?:/.test(href)) return href;
  const url = new URL(href);
  if (url.pathname !== '/start' || !['traction.hyperdrift.io', 'localhost', '127.0.0.1'].includes(url.hostname)) return href;
  const id = journeyId();
  // A personal invitation's own token rides in the fragment too: Traction then knows who it was written for and asks
  // for nothing but a passkey. It only ever goes to Traction's sign-up, never into a request log.
  url.hash = new URLSearchParams({ ...(id ? { journey: id } : { measurement: 'off' }), ...(invite && /^[a-f0-9]{64}$/.test(invite) ? { invite } : {}) }).toString();
  return url.toString();
}
