import posthog from 'posthog-js';
import { campaignAttribution } from './campaign';

export function analyticsEnabled() {
  return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
    && window.location.hostname === 'ai.hyperdrift.io' && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

export function trackEvent(event: string, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (!analyticsEnabled()) return;
  try { posthog.capture(event, { ...campaignAttribution(), ...properties, path: window.location.pathname }); }
  catch { /* Analytics must never interrupt an interaction or enquiry. */ }
}
