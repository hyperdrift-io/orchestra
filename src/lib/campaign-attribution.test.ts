import { afterEach, describe, expect, it, vi } from 'vitest';
const { allowed } = vi.hoisted(() => ({ allowed: vi.fn(() => true) }));
vi.mock('./journey', () => ({ measurementAllowed: allowed, journeyId: () => undefined }));
import { campaignAttribution } from './campaign';
const memory = new Map<string, string>();
function visit(search: string) {
  vi.stubGlobal('window', { location: { search, pathname: '/contact' } });
  vi.stubGlobal('document', { querySelector: () => null });
  vi.stubGlobal('sessionStorage', { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) });
}
afterEach(() => { memory.clear(); allowed.mockReturnValue(true); vi.unstubAllGlobals(); });
describe('first campaign attribution', () => {
  it('captures the first tagged arrival after a direct visit in the same tab', () => {
    visit(''); expect(campaignAttribution()).toEqual({});
    visit('?utm_source=migration-check&utm_medium=internal&utm_campaign=hd-rebrand-20261117');
    expect(campaignAttribution()).toEqual({ utm_source: 'migration-check', utm_medium: 'internal', utm_campaign: 'hd-rebrand-20261117' });
    visit(''); expect(campaignAttribution().utm_source).toBe('migration-check');
  });
  it('preserves the original campaign without mixing later tags', () => {
    visit('?utm_source=original'); campaignAttribution();
    visit('?utm_source=later&utm_campaign=later'); expect(campaignAttribution()).toEqual({ utm_source: 'original' });
  });
  it('rejects unbounded query values and respects measurement refusal', () => {
    visit('?utm_source=not%20a%20valid%20tag'); expect(campaignAttribution()).toEqual({});
    visit('?utm_source=valid'); allowed.mockReturnValue(false);
    expect(campaignAttribution()).toEqual({}); expect(memory.get('ai-campaign')).toBe('{}');
  });
});
