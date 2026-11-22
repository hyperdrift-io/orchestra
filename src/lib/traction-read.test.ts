import { afterEach, describe, expect, it, vi } from 'vitest';
import { visitorAddress, visitorRead } from './traction-read';

const finding = (label: string) => ({ label, headline: `${label} headline`, detail: `${label} detail, kept for the board`, sources: [{ label: 'example.com', href: 'https://example.com/' }] });
const answer = (body: unknown, status = 200) => vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), { status })));

afterEach(() => vi.unstubAllGlobals());

describe('a visitor’s own read', () => {
  it('takes a public site name and nothing else', () => {
    expect(visitorAddress('Example.com/pricing/')).toBe('https://example.com/pricing');
    expect(visitorAddress('http://www.example.com')).toBe('https://www.example.com');
    for (const refused of ['', 'abc', 'localhost', '127.0.0.1', 'https://user:pass@example.com', 'https://example.com:8443', 'ftp://example.com', 'x'.repeat(301), 42])
      expect(visitorAddress(refused), String(refused)).toBeUndefined();
  });

  it('shows each finding’s one line before a sign-up and keeps the rest for the board', async () => {
    answer({ ok: true, state: 'ready', on: '20 November 2026', site: { title: 'Example' }, findings: ['Strength', 'In the way', 'Next customer move'].map(finding) });
    const read = await visitorRead('https://example.com');
    expect(read).toEqual({ state: 'ready', site: { title: 'Example' }, lines: [
      { label: 'Strength', headline: 'Strength headline' }, { label: 'In the way', headline: 'In the way headline' }, { label: 'Next customer move', headline: 'Next customer move headline' }] });
    expect(JSON.stringify(read)).not.toContain('kept for the board');
  });

  it('says where a read under way stands, by the pages read', async () => {
    answer({ ok: true, state: 'running', reading: ['https://example.com/', 'https://example.com/pricing/'] });
    expect(await visitorRead('https://example.com')).toEqual({ state: 'running', reading: ['example.com', '/pricing'] });
  });

  it('requests a French first read when the visitor uses the French offer', async () => {
    answer({state:'queued', reading:[]});
    await visitorRead('https://example.fr','fr');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/read'),expect.objectContaining({
      body: JSON.stringify({url:'https://example.fr',language:'fr'}),
    }));
  });

  it('tells a paused day from an address that is not a site and from an outage', async () => {
    answer({ ok: false, error: 'reads_paused' }, 429);
    expect(await visitorRead('https://example.com')).toEqual({ state: 'refused', reason: 'paused' });
    answer({ ok: false, error: 'app_address_required' }, 400);
    expect(await visitorRead('https://example.com')).toEqual({ state: 'refused', reason: 'address' });
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('down'); }));
    expect(await visitorRead('https://example.com')).toEqual({ state: 'refused', reason: 'unavailable' });
  });
});
