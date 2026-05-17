import { Resend } from 'resend';

let cached: Resend | null = null;

export function getResendClient(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');
  cached = new Resend(key);
  return cached;
}

export function getContactRoutes() {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) throw new Error('CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must be set');
  return { to, from };
}
