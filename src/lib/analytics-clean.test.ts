import { describe, expect, it } from 'vitest';
import { analyticsOptions, analyticsPath, cleanProperties, ctaDestination, ctaPlacement } from './analytics-clean';

const token = 'a'.repeat(64);
const page = `https://orchestra.hyperdrift.io/traction/invitation/${token}`;

describe('what PostHog may receive from a personal invitation', () => {
  it('makes none of the script’s own start-up requests, which carry the page’s full address', () => {
    expect(analyticsOptions.advanced_disable_flags).toBe(true);
  });

  it('reports the shared path, never the token', () => {
    expect(analyticsPath(`/traction/invitation/${token}`)).toBe('/traction/invitation');
    expect(analyticsPath('/traction')).toBe('/traction');
  });

  it('cleans every address the script attaches to an event', () => {
    const sent = cleanProperties({
      $current_url: `${page}?utm_source=mail#journey=1`, $pathname: `/traction/invitation/${token}`, $referrer: page,
      $session_entry_url: page, $session_entry_pathname: `/traction/invitation/${token}`, $prev_pageview_pathname: `/traction/invitation/${token}`,
      $initial_current_url: page, utm_source: 'mail', $initial_utm_campaign: 'x', title: 'Your invitation to Traction',
      $set_once: { $initial_current_url: page, $initial_pathname: `/traction/invitation/${token}`, $initial_referrer: '$direct' },
      $set: { $current_url: page },
    });
    expect(JSON.stringify(sent)).not.toContain(token);
    expect(sent).toMatchObject({
      $current_url: 'https://orchestra.hyperdrift.io/traction/invitation', $pathname: '/traction/invitation',
      $set_once: { $initial_current_url: 'https://orchestra.hyperdrift.io/traction/invitation', $initial_pathname: '/traction/invitation' },
      title: 'Your invitation to Traction',
    });
    expect(sent).not.toHaveProperty('utm_source');
    expect(sent).not.toHaveProperty('$initial_utm_campaign');
    expect(sent.$set_once).not.toHaveProperty('$initial_referrer');
  });

  it('cleans an address under a name it does not know', () => {
    const sent = cleanProperties({ $some_new_property: `seen at ${page}?x=1`, nested: { deeper: { where: `/traction/invitation/${token}` } } });
    expect(JSON.stringify(sent)).not.toContain(token);
    expect(sent.$some_new_property).toBe('seen at https://orchestra.hyperdrift.io/traction/invitation?x=1');
  });

  it('keeps other pages’ paths and drops their queries', () => {
    expect(cleanProperties({ $current_url: 'https://orchestra.hyperdrift.io/traction?from=olatti&email=ada@example.com', $pathname: '/traction' }))
      .toEqual({ $current_url: 'https://orchestra.hyperdrift.io/traction', $pathname: '/traction' });
  });
});

/** A link inside the named ancestors, as `closest` would answer in a page. */
const inside = (ancestors: Record<string, unknown>) => ({ closest: (selector: string) => ancestors[selector] ?? null });

describe('where a counted link sits', () => {
  it('names the invitation’s door, though it sits in the article’s header', () => {
    expect(ctaPlacement(inside({ header: {}, '[data-placement]': { dataset: { placement: 'invitation_door' } } }))).toBe('invitation_door');
  });

  it('names the Traction page’s door, though it sits in a footer', () => {
    expect(ctaPlacement(inside({ footer: {}, '[data-placement]': { dataset: { placement: 'page_door' } } }))).toBe('page_door');
  });

  it('keeps header, footer and body for every other link, and ignores a name that is not a plain tag', () => {
    expect(ctaPlacement(inside({ header: {} }))).toBe('header');
    expect(ctaPlacement(inside({ footer: {} }))).toBe('footer');
    expect(ctaPlacement(inside({}))).toBe('body');
    expect(ctaPlacement(inside({ '[data-placement]': { dataset: { placement: 'Ada Lovelace <ada@example.com>' } } }))).toBe('body');
  });
});

describe('the door a link opens', () => {
  const origin = 'https://orchestra.hyperdrift.io';
  const link = (href: string) => { const url = new URL(href, origin); return { origin: url.origin, hostname: url.hostname, pathname: url.pathname, hash: url.hash }; };

  it('counts Traction’s sign-up as start_free, from production and from a local preview', () => {
    expect(ctaDestination(link('https://traction.hyperdrift.io/start?from=c-0a11ce01#journey=x'), origin)).toBe('start_free');
    expect(ctaDestination(link('http://localhost:3192/start'), origin)).toBe('start_free');
    expect(ctaDestination(link('https://traction.hyperdrift.io/app/olatti'), origin)).toBe('board');
  });

  it('keeps the site’s own doors and counts nothing else', () => {
    expect(ctaDestination(link('/traction?situation=subscription#enquire'), origin)).toBe('enquiry');
    expect(ctaDestination(link('/traction#continue'), origin)).toBe('continue');
    expect(ctaDestination(link('/traction/partnership'), origin)).toBe('partnership');
    expect(ctaDestination(link('/traction'), origin)).toBe('traction');
    expect(ctaDestination(link('/articles'), origin)).toBeNull();
    expect(ctaDestination(link('https://example.com/start'), origin)).toBeNull();
  });
});
