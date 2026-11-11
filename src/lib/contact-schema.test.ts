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

  it('takes a quote request with no message, and still asks a conversation for one', () => {
    const quote = contactSchema.safeParse({ name: 'Ada', email: 'ada@example.com', situation: 'Continued use of Traction' });
    expect(quote.success && quote.data.message).toBe('');
    expect(contactSchema.safeParse({ name: 'Ada', email: 'ada@example.com', situation: 'Continued use of Traction', message: 'Mailbox' }).success).toBe(true);
    expect(contactSchema.safeParse({ name: 'Ada', email: 'ada@example.com', situation: 'The Traction Partnership' }).success).toBe(false);
    expect(contactSchema.safeParse({ name: 'Ada', email: 'ada@example.com' }).success).toBe(false);
  });

  it('treats company as optional', () => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'A reasonable length message.',
    });
    expect(result.success).toBe(true);
  });

  it('accepts an optional situation label', () => {
    const result = contactSchema.safeParse({
      name: 'Ada',
      email: 'ada@example.com',
      situation: 'Taking a prototype live',
      message: 'A reasonable length message.',
    });
    expect(result.success).toBe(true);
  });
});
