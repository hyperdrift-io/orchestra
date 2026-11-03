import { z } from 'zod';

const tag = z.string().regex(/^[a-z0-9_.:-]{1,100}$/i).optional();
export const campaignSchema = z.object({
  utm_source: tag, utm_medium: tag, utm_campaign: tag, utm_content: tag,
  validation_run: tag,
  /** A personal invitation's opaque reference and page version, read from the page itself. */
  invite_ref: z.string().regex(/^c-[a-f0-9]{8}$/).optional(),
  page_variant: z.string().regex(/^[a-z0-9_]{1,40}$/).optional(),
});
export type Campaign = z.infer<typeof campaignSchema>;

let memorySession: string | undefined;
export function visitorSession() {
  if (memorySession) return memorySession;
  try {
    const saved = sessionStorage.getItem('ai-article-session');
    memorySession = saved && z.string().uuid().safeParse(saved).success ? saved : crypto.randomUUID();
    sessionStorage.setItem('ai-article-session', memorySession);
  } catch { memorySession = crypto.randomUUID(); }
  return memorySession;
}

/** Keep the first campaign in this tab across navigation, never form contents. */
export function campaignAttribution(): Campaign {
  try {
    const saved = sessionStorage.getItem('ai-campaign');
    const campaign: Campaign = saved ? campaignSchema.parse(JSON.parse(saved)) : {};
    if (!saved) {
      const query = new URLSearchParams(window.location.search);
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'validation_run'] as const) {
        const value = query.get(key === 'validation_run' ? 'analytics_check' : key);
        if (value && tag.safeParse(value).success) campaign[key] = value;
      }
    }
    // The invitation an earlier page in this tab didn't know about still counts for the rest of the visit.
    const invitation = document.querySelector<HTMLElement>('[data-page-variant]')?.dataset;
    if (!campaign.page_variant && invitation) {
      const found = campaignSchema.safeParse({ invite_ref: invitation.inviteRef, page_variant: invitation.pageVariant });
      if (found.success) Object.assign(campaign, found.data);
    }
    sessionStorage.setItem('ai-campaign', JSON.stringify(campaign));
    return campaign;
  } catch { return {}; }
}
