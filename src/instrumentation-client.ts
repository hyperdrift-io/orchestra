import posthog from 'posthog-js';
import { analyticsEnabled, trackEvent } from './lib/analytics';
import { analyticsOptions, cleanProperties, ctaDestination, ctaPlacement } from './lib/analytics-clean';
import { campaignAttribution, visitorSession } from './lib/campaign';
import { journeyStartHref } from './lib/journey';

// A trial link written into a page's own HTML carries the visit to Traction's sign-up like the React links do, or
// says the visitor refused measurement. Set as the link is pressed, whether or not analytics runs here.
for (const kind of ['pointerdown', 'click', 'contextmenu'] as const) document.addEventListener(kind, (event) => {
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
  if (link && ctaDestination(link, window.location.origin) === 'start_free') link.href = journeyStartHref(link.href);
}, true);

if (analyticsEnabled()) {
  // Only explicit engagement events; no replay, form autocapture or person profiles.
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    ...analyticsOptions,
    bootstrap: { distinctID: visitorSession(), isIdentifiedID: false },
    before_send: (event) => {
      if (!event || !analyticsEnabled()) return null;
      cleanProperties(event.properties);
      Object.assign(event.properties, campaignAttribution(), { app: 'orchestra', env: 'production', hostname: 'hyperdrift.io' });
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
  // A page's own script reports a step by name alone: which event and which step are both from a fixed list.
  const STEPS: Record<string, string[]> = { site_read: ['asked', 'ready', 'failed', 'paused', 'refused'] };
  window.addEventListener('hd:track', (event) => {
    const { event: name, step } = (event as CustomEvent<{ event?: unknown; step?: unknown }>).detail ?? {};
    if (typeof name === 'string' && typeof step === 'string' && STEPS[name]?.includes(step)) trackEvent(name, { step });
  });
}
