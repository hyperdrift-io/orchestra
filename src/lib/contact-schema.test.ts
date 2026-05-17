import { describe, expect, it } from 'vitest';
import { contactSchema } from './contact-schema';

describe('contactSchema', () => {
  it('accepts a well-formed submission', () => {
    const result = contactSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      message: 'We need agent orchestration for our SaaS.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing email', () => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: '',
      message: 'Hi',
    });
    expect(result.success).toBe(false);
  });

  it('rejects messages that are too short', () => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'hi',
    });
    expect(result.success).toBe(false);
  });

  it('treats company as optional', () => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'A reasonable length message.',
    });
    expect(result.success).toBe(true);
  });
});
