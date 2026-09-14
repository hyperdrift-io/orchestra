import { describe, expect, it } from 'vitest';
import { formatDay, pickLatestIntel, pickLatestWriting } from './feeds';

const today = new Date('2026-09-14T10:00:00Z');

describe('pickLatestIntel', () => {
  it('returns the newest published edition with its archive URL and real date', () => {
    const payload = {
      posts: [
        { slug: 'daily-intel-2026-09-12', title: 'Intel Daily — 12', date: '2026-09-12' },
        { slug: 'daily-intel-2026-09-13', title: 'Intel Daily — 13', date: '2026-09-13' },
      ],
    };
    expect(pickLatestIntel(payload, today)).toEqual({
      title: 'Intel Daily — 13',
      date: '2026-09-13',
      url: 'https://intel.hyperdrift.io/daily/2026-09-13',
    });
  });

  it('never surfaces a future-dated edition', () => {
    const payload = { posts: [{ slug: 'daily-intel-2026-09-15', title: 'Tomorrow', date: '2026-09-15' }] };
    expect(pickLatestIntel(payload, today)).toBeNull();
  });

  it('returns null for malformed or empty payloads', () => {
    expect(pickLatestIntel(null, today)).toBeNull();
    expect(pickLatestIntel({ posts: 'nope' }, today)).toBeNull();
    expect(pickLatestIntel({ posts: [{ slug: 'x', title: '', date: '2026-01-01' }] }, today)).toBeNull();
  });
});

describe('pickLatestWriting', () => {
  it('picks the newest published article and skips DeFi promotion and Intel', () => {
    const payload = {
      posts: [
        { slug: 'defi-roadmap', title: 'DeFi', date: '2026-09-13', tags: ['Web3'] },
        { slug: 'daily-intel-2026-09-13', title: 'Intel', date: '2026-09-13', tags: [] },
        { slug: 'one-evening', title: 'You have one evening', date: '2026-09-11T08:00:00Z', tags: ['agents'] },
        { slug: 'older', title: 'Older', date: '2026-09-01', tags: [] },
        { slug: 'scheduled', title: 'Scheduled', date: '2026-09-20', tags: [] },
      ],
    };
    expect(pickLatestWriting(payload, today)).toEqual({
      title: 'You have one evening',
      date: '2026-09-11',
      url: 'https://hyperdrift.io/blog/one-evening',
    });
  });

  it('returns null when nothing qualifies', () => {
    expect(pickLatestWriting({ posts: [] }, today)).toBeNull();
    expect(pickLatestWriting(undefined, today)).toBeNull();
  });
});

describe('formatDay', () => {
  it('formats a UTC day for reading', () => {
    expect(formatDay('2026-09-13')).toBe('13 September 2026');
  });
});
