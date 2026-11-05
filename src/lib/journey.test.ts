import { afterEach, describe, expect, it, vi } from 'vitest';
const { optedOut } = vi.hoisted(() => ({ optedOut: vi.fn(() => false) }));
vi.mock('posthog-js', () => ({ default: { has_opted_out_capturing: optedOut } }));
import { journeyId, journeyStartHref, measurementAllowed } from './journey';

const memory = new Map<string, string>();
function browser(privacy: Record<string, unknown> = {}) {
  vi.stubGlobal('window', {});
  vi.stubGlobal('navigator', privacy);
  vi.stubGlobal('sessionStorage', { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value), removeItem: (key: string) => memory.delete(key) });
}
afterEach(() => { browser({ doNotTrack: '1' }); journeyId(); memory.clear(); optedOut.mockReturnValue(false); vi.unstubAllGlobals(); });

describe('journey correlation', () => {
  it('keeps one opaque tab visit across page reads and the signup link, never in the query', () => {
    browser();
    const id = journeyId();
    expect(id).toMatch(/^[a-f0-9-]{36}$/);
    expect(journeyId()).toBe(id);
    const url = new URL(journeyStartHref('https://traction.hyperdrift.io/start?from=c-1234abcd'));
    expect(url.search).toBe('?from=c-1234abcd');
    expect(new URLSearchParams(url.hash.slice(1)).get('journey')).toBe(id);
    expect(journeyStartHref('https://foreign.example/start')).toBe('https://foreign.example/start');
  });
  it.each([{ doNotTrack: '1' }, { globalPrivacyControl: true }])('respects browser refusal and forwards it without an identifier', privacy => {
    browser(privacy);
    expect(measurementAllowed()).toBe(false);
    expect(journeyId()).toBeUndefined();
    expect(journeyStartHref('https://traction.hyperdrift.io/start')).toBe('https://traction.hyperdrift.io/start#measurement=off');
  });
  it('removes correlation when the SDK has opted out', () => {
    browser();
    expect(journeyId()).toBeDefined();
    optedOut.mockReturnValue(true);
    expect(journeyId()).toBeUndefined();
    expect(memory.has('traction-journey')).toBe(false);
  });
});
