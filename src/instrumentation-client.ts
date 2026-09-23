import posthog from 'posthog-js';
import { analyticsEnabled, trackEvent } from './lib/analytics';
import { campaignAttribution, visitorSession } from './lib/campaign';

if (analyticsEnabled()) {
  // Only explicit engagement events; no replay, form autocapture or person profiles.
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest', ui_host: 'https://eu.posthog.com',
    defaults: '2026-01-30',
    bootstrap: { distinctID: visitorSession(), isIdentifiedID: false },
    persistence: 'memory', person_profiles: 'never',
    autocapture: false, capture_dead_clicks: false, capture_exceptions: false,
    disable_session_recording: true, capture_pageview: 'history_change',
    before_send: (event) => {
      if (!event) return null;
      // URL queries can contain personal information. Keep paths and bounded campaign tags only.
      const clean = (properties: Record<string, unknown>) => {
        for (const key of Object.keys(properties)) {
          if (/url|referrer/i.test(key) && typeof properties[key] === 'string') {
            try { const url = new URL(properties[key] as string); properties[key] = url.origin + url.pathname; }
            catch { delete properties[key]; }
          }
          if (/utm_|initial_utm_|search_keyword/i.test(key)) delete properties[key];
        }
      };
      clean(event.properties);
      for (const key of ['$set', '$set_once']) {
        const value = event.properties[key];
        if (value && typeof value === 'object') clean(value);
      }
      Object.assign(event.properties, campaignAttribution(), { app: 'orchestra', env: 'production', hostname: 'ai.hyperdrift.io' });
      return event;
    },
  });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.origin !== window.location.origin) return;
    const destination = link.hash === '#contact' ? 'enquiry' : link.pathname === '/partnership' ? 'partnership' : link.pathname === '/work' ? 'work' : null;
    if (destination) trackEvent('cta_clicked', { destination, placement: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'body' });
  });
}
