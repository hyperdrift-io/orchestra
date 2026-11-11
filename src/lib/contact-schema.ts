import { z } from 'zod';
import { campaignSchema } from './campaign';
import { enquiryHandoffSchema } from './enquiry-handoff';
import { articleSlugSchema } from './article-events';

/** The label of the enquiry form's quote choice: a quote request needs no message. */
export const quoteSituation = 'Continued use of Traction';

const contactFields = z.object({
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
  /** Required for a conversation; a quote request may leave it empty. */
  message: z.string().trim().max(5000).default(''),
  /** Honeypot: hidden from people, so any value means an automated filler. */
  website: z.string().max(2000).optional(),
});
export const contactSchema = contactFields.superRefine((input, context) => {
  if (input.message.length < 10 && input.situation !== quoteSituation) context.addIssue({ code: z.ZodIssueCode.custom, path: ['message'], message: 'Tell us a bit more' });
});

export type ContactInput = z.infer<typeof contactSchema>;
export const contactPrefillSchema = contactFields.pick({ name: true, email: true, company: true }).partial();
export type ContactPrefill = z.infer<typeof contactPrefillSchema>;
