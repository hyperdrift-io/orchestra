import { z } from 'zod';
import { articleBySlug } from './article-catalogue';

export const articleSlugSchema = z.string().max(100).refine((slug) => Boolean(articleBySlug(slug)), 'Unknown article');
export const articleEventSchema = z.object({
  article: articleSlugSchema,
  event: z.enum(['article_viewed', 'article_engaged', 'article_cta_clicked', 'article_proof_opened', 'enquiry_started']),
  session: z.string().uuid(),
}).strict();
export type ArticleEvent = z.infer<typeof articleEventSchema>;
