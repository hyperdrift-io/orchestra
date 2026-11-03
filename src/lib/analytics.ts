import posthog from 'posthog-js';
import { campaignAttribution } from './campaign';

export function analyticsEnabled() {
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    && window.location.hostname === 'orchestra.hyperdrift.io' && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

/** An invitation's token is its key, so analytics only ever sees the shared path. */
export function analyticsPath(pathname: string) {
  return pathname.startsWith('/traction/invitation/') ? '/traction/invitation' : pathname;
}

export function trackEvent(event: string, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (!analyticsEnabled()) return;
  try { posthog.capture(event, { ...campaignAttribution(), ...properties, path: analyticsPath(window.location.pathname) }); }
  catch { /* Analytics must never interrupt an interaction or enquiry. */ }
}
