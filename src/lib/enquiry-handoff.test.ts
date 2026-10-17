import { describe, it, expect } from 'vitest';
import { parseEnquiryHandoff, enquiryHandoffSchema } from './enquiry-handoff';
import { contactSchema } from './contact-schema';

describe('HD enquiry context', () => {
  it('retains the public article and external referring domain alongside the original campaign', () => {
    const handoff = parseEnquiryHandoff(new URLSearchParams('from=hyperdrift&source_path=%2Fblog%2Fthe-agent-is-the-session&source_referrer=www.google.com'));
    const input = contactSchema.parse({ name: 'Preview', email: 'preview@example.com', message: 'An isolated preview enquiry.', handoff, campaign: { utm_source: 'google', utm_campaign: 'original' } });
    expect(input.handoff?.source_path).toBe('/blog/the-agent-is-the-session');
    expect(input.handoff?.referring_domain).toBe('www.google.com');
    expect(input.campaign?.utm_source).toBe('google');
  });
  it('rejects private paths, arbitrary URLs and full external referring URLs', () => {
    for (const source_path of ['/admin/customers', 'https://other.example/', '//other.example/', '/blog/story?email=private']) {
      expect(enquiryHandoffSchema.safeParse({ source_site: 'hyperdrift', source_path }).success).toBe(false);
    }
    expect(parseEnquiryHandoff(new URLSearchParams('from=hyperdrift&source_path=/apps&source_referrer=https://example.com/private'))).toBeUndefined();
  });
  it('leaves existing direct and Orchestra article enquiries valid', () => {
    expect(parseEnquiryHandoff(new URLSearchParams('article=is-ui-holding-us-back'))).toBeUndefined();
    expect(contactSchema.safeParse({ name: 'Preview', email: 'preview@example.com', message: 'An existing direct enquiry.' }).success).toBe(true);
  });
});
