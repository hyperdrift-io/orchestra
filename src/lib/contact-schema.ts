import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required'),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, 'Tell us a bit more').max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
