import { describe, expect, it } from 'vitest';
import { campaignSchema, trialAppFrom } from './campaign';
import { contactSchema } from './contact-schema';

describe('the free board behind a visit', () => {
  it('accepts a Traction app id and nothing shaped like a person', () => {
    expect(trialAppFrom('slotbloom')).toBe('slotbloom');
    expect(trialAppFrom('studio-example')).toBe('studio-example');
    expect(trialAppFrom(['olatti', 'other'])).toBe('olatti');
    for (const value of ['ada@example.com', 'Ada Lovelace', 'Olatti', '-olatti', 'a'.repeat(42), '', undefined]) expect(trialAppFrom(value)).toBeUndefined();
  });

  it('travels as a bounded campaign tag with an enquiry, never free text', () => {
    expect(campaignSchema.parse({ trial_app: 'olatti' })).toEqual({ trial_app: 'olatti' });
    expect(campaignSchema.safeParse({ trial_app: 'ada@example.com' }).success).toBe(false);
    const input = contactSchema.parse({ email: 'preview@example.com', message: 'Continuing from the free board.', situation: 'The Traction Partnership', campaign: { trial_app: 'olatti' } });
    expect(input.campaign?.trial_app).toBe('olatti');
  });
});
