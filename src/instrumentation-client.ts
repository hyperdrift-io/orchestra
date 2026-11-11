import posthog from 'posthog-js';
import { analyticsEnabled, trackEvent } from './lib/analytics';
import { analyticsOptions, cleanProperties, ctaDestination, ctaPlacement } from './lib/analytics-clean';
import { campaignAttribution, visitorSession } from './lib/campaign';

if (analyticsEnabled()) {
  // Only explicit engagement events; no replay, form autocapture or person profiles.
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    ...analyticsOptions,
    bootstrap: { distinctID: visitorSession(), isIdentifiedID: false },
    before_send: (event) => {
      if (!event || !analyticsEnabled()) return null;
      cleanProperties(event.properties);
      Object.assign(event.properties, campaignAttribution(), { app: 'orchestra', env: 'production', hostname: 'orchestra.hyperdrift.io' });
      return event;
    },
  });
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!link) return;
    const destination = ctaDestination(link, window.location.origin);
    if (destination) trackEvent('cta_clicked', { destination, offer: link.dataset.offer === 'mcp' ? 'mcp' : undefined, placement: ctaPlacement(link) });
  });
}
