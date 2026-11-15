import posthog from 'posthog-js';
import { campaignAttribution } from './campaign';
import { measurementAllowed } from './journey';
import { analyticsPath } from './analytics-clean';

export { analyticsPath };

export function analyticsEnabled() {
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    && window.location.hostname === 'orchestra.hyperdrift.io' && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY) && measurementAllowed();
}


export function trackEvent(event: string, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (!analyticsEnabled()) return;
  try { posthog.capture(event, { ...campaignAttribution(), ...properties, path: analyticsPath(window.location.pathname) }); }
  catch { /* Analytics must never interrupt an interaction or enquiry. */ }
}
