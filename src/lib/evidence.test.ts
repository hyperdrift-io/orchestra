import { describe, expect, it } from 'vitest';
import { resolveEvidence } from './evidence';
import { situations } from '@/data/situations';
import type { CaseStudy } from '@/data/case-studies';

const catalogue: CaseStudy[] = [
  {
    slug: 'demo',
    name: 'Demo',
    outcome: '',
    problem: '',
    capability: '',
    stack: [],
    link: 'https://demo.example',
    linkLabel: 'Try it',
    article: 'https://hyperdrift.io/blog/demo',
    challenge: { organiser: 'Google', name: 'An Event', url: 'https://event.example', stage: 'Submitted' },
  },
  { slug: 'quiet', name: 'Quiet', outcome: '', problem: '', capability: '', stack: [], repo: 'https://github.com/x/y' },
];

describe('resolveEvidence', () => {
  it('takes name, attribution and public actions from the catalogue, summary from the situation', () => {
    const r = resolveEvidence({ caseStudy: 'demo', summary: 'One line.' }, catalogue);
    expect(r).toEqual({
      name: 'Demo',
      summary: 'One line.',
      relation: 'Built for Google · An Event',
      actions: [
        { label: 'Try it', href: 'https://demo.example' },
        { label: 'Read the build', href: 'https://hyperdrift.io/blog/demo' },
      ],
    });
  });

  it('falls back to the repository when there is no article, and omits relation without a challenge', () => {
    const r = resolveEvidence({ caseStudy: 'quiet', summary: 's' }, catalogue);
    expect(r.relation).toBeUndefined();
    expect(r.actions).toEqual([{ label: 'Source', href: 'https://github.com/x/y' }]);
  });

  it('passes linked evidence through unchanged', () => {
    const item = { name: 'N', summary: 's', relation: 'r', actions: [{ label: 'a', href: 'https://a' }] };
    expect(resolveEvidence(item, catalogue)).toBe(item);
  });

  it('throws on an unknown slug so a typo fails the build, not the visitor', () => {
    expect(() => resolveEvidence({ caseStudy: 'nope', summary: '' }, catalogue)).toThrow(/nope/);
  });

  it('every shipped situation resolves against the real catalogue with at least one action each', () => {
    for (const s of situations) {
      for (const e of s.evidence) {
        expect(resolveEvidence(e).actions.length).toBeGreaterThan(0);
      }
    }
  });
});
