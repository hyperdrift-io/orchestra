import { z } from 'zod';

/** Only public HD paths and a referring domain travel between the two sites. */
export const enquiryHandoffSchema = z.object({
  source_site: z.literal('hyperdrift'),
  source_path: z.string().regex(/^\/(?:blog\/(?:[a-z0-9-]+|tag\/[a-z0-9-]+|page\/[0-9]+)|apps|playground|blog|one|southwark-lambeth-quote-check)?$/).max(200),
  source_project: z.string().regex(/^[a-z0-9-]{1,100}$/).optional(),
  referring_domain: z.string().regex(/^[a-z0-9.-]{1,253}$/i).optional(),
});
export type EnquiryHandoff = z.infer<typeof enquiryHandoffSchema>;

export function parseEnquiryHandoff(query: URLSearchParams): EnquiryHandoff | undefined {
  if (query.get('from') !== 'hyperdrift') return undefined;
  const parsed = enquiryHandoffSchema.safeParse({
    source_site: 'hyperdrift', source_path: query.get('source_path') || '/',
    source_project: query.get('source_project') || undefined,
    referring_domain: query.get('source_referrer') || undefined,
  });
  return parsed.success ? parsed.data : undefined;
}

export function enquiryHandoff(): EnquiryHandoff | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const incoming = parseEnquiryHandoff(new URLSearchParams(window.location.search));
    if (incoming) { sessionStorage.setItem('orchestra-handoff', JSON.stringify(incoming)); return incoming; }
    const saved = sessionStorage.getItem('orchestra-handoff');
    const parsed = saved ? enquiryHandoffSchema.safeParse(JSON.parse(saved)) : undefined;
    return parsed?.success ? parsed.data : undefined;
  } catch { return parseEnquiryHandoff(new URLSearchParams(window.location.search)); }
}
