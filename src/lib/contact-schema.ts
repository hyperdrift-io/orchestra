import { z } from 'zod';
import { campaignSchema } from './campaign';
import { enquiryHandoffSchema } from './enquiry-handoff';
import { articleSlugSchema } from './article-events';

export const contactSchema = z.object({
  name: z.string().trim().max(120).default(''),
  email: z.string().trim().email('Valid email required'),
  company: z.string().trim().max(200).optional(),
  product_url: z.string().trim().url().max(2000).refine(value => /^https?:\/\//i.test(value), 'Use an http or https link').optional(),
  /** The situation the visitor chose on the front door, as its label. Optional and editable. */
  situation: z.string().trim().max(80).optional(),
  article: articleSlugSchema.optional(),
  session: z.string().uuid().optional(),
  campaign: campaignSchema.optional(),
  handoff: enquiryHandoffSchema.optional(),
  /** Visitor-supplied board context; never proof of membership or a subscription. */
  traction_board: z.string().regex(/^[a-z0-9][a-z0-9-]{0,63}$/).optional(),
  message: z.string().trim().min(10, 'Tell us a bit more').max(5000),
  /** Honeypot: hidden from people, so any value means an automated filler. */
  website: z.string().max(2000).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export const contactPrefillSchema = contactSchema.pick({ name: true, email: true, company: true }).partial();
export type ContactPrefill = z.infer<typeof contactPrefillSchema>;
