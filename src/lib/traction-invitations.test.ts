import { describe, expect, it } from 'vitest';
import { parseInvitation } from './traction-invitations';
import { analyticsPath } from './analytics';

const base = { firstName: 'Ada', product: 'Example', welcome: 'Older welcome text, kept but not shown.' };
const finding = (label: string) => ({ label, headline: `${label} headline`, detail: `${label} detail`, sources: [{ label: 'example.com', href: 'https://example.com/' }] });
const read = { on: '3 November 2026', findings: [finding('Strength'), finding('In the way'), finding('Next customer move')] };

describe('invitation registry', () => {
  it('keeps older entries working and labels them as the proposition page', () => {
    expect(parseInvitation(base)).toMatchObject({ firstName: 'Ada', read: undefined, ref: undefined, variant: 'proposition_v1' });
  });

  it('shows a complete first read and labels the page by it', () => {
    const invitation = parseInvitation({ ...base, read, ref: 'c-50b91edd', audience: 'small teams' });
    expect(invitation?.read?.findings.map((item) => item.label)).toEqual(['Strength', 'In the way', 'Next customer move']);
    expect(invitation).toMatchObject({ ref: 'c-50b91edd', audience: 'small teams', variant: 'first_read_v1' });
  });

  it('drops a read that is incomplete or links anywhere but https, never showing half of it', () => {
    expect(parseInvitation({ ...base, read: { ...read, findings: read.findings.slice(0, 2) } })?.read).toBeUndefined();
    const insecure = { ...read, findings: [{ ...finding('Strength'), sources: [{ label: 'x', href: 'http://example.com/' }] }, ...read.findings.slice(1)] };
    expect(parseInvitation({ ...base, read: insecure })).toMatchObject({ read: undefined, variant: 'proposition_v1' });
  });

  it('accepts only an opaque reference, never a name or email', () => {
    expect(parseInvitation({ ...base, ref: 'ada@example.com' })?.ref).toBeUndefined();
    expect(parseInvitation({ ...base, ref: 'c-50B91EDD' })?.ref).toBeUndefined();
  });

  it('refuses entries without the welcome fields', () => {
    expect(parseInvitation({ ...base, firstName: '' })).toBeUndefined();
    expect(parseInvitation('Ada')).toBeUndefined();
  });
});

describe('invitation analytics', () => {
  it('reports every invitation under one shared path, so a token never reaches analytics', () => {
    expect(analyticsPath('/traction/invitation/f2307b61073d6af414b3686a4f695263540e3f136fa3bac6352a7f6c02af0e6f')).toBe('/traction/invitation');
    expect(analyticsPath('/traction')).toBe('/traction');
  });
});
