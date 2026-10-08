import { PostHog } from 'posthog-node';
import type { ContactInput } from './contact-schema';
import { enquiryChoices } from '@/data/situations';

let client: PostHog | undefined;
/** Delivery is already decided before analytics runs; telemetry must never cause a resend. */
export async function trackEnquiry(event: 'enquiry_submitted' | 'enquiry_failed', input: ContactInput, id: string, stage: string) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || process.env.NODE_ENV !== 'production' || process.env.CONTACT_DELIVERY === 'preview') return;
  try {
    client ??= new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      flushAt: 1, flushInterval: 0, requestTimeout: 1500, fetchRetryCount: 0,
    });
    await client.captureImmediate({
      distinctId: input.session || id, event,
      properties: { ...input.campaign, app: 'orchestra', env: 'production', hostname: 'orchestra.hyperdrift.io', article: input.article, situation: enquiryChoices.find((choice) => choice.label === input.situation)?.value, enquiry_id: id, stage, $process_person_profile: false },
    });
  } catch { console.warn('Enquiry analytics unavailable', id); }
}
