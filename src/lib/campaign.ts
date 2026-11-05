import { z } from 'zod';
import { journeyId, measurementAllowed } from './journey';

const tag = z.string().regex(/^[a-z0-9_.:-]{1,100}$/i).optional();
export const campaignSchema = z.object({
  utm_source: tag, utm_medium: tag, utm_campaign: tag, utm_content: tag,
  validation_run: tag,
  /** A personal invitation's opaque reference and page version, read from the page itself. */
  invite_ref: z.string().regex(/^c-[a-f0-9]{8}$/).optional(),
  page_variant: z.string().regex(/^[a-z0-9_]{1,40}$/).optional(),
  /** The free Traction board a founder came from (`/traction?from=<app id>`), bounded as Traction bounds its app ids; never a name or an email. */
  trial_app: z.string().regex(/^[a-z0-9][a-z0-9-]{0,40}$/).optional(),
  journey_id: z.string().uuid().optional(),
  journey_schema: z.literal('invitation_signup_v1').optional(),
  identity_basis: z.literal('browser_journey').optional(),
});
export type Campaign = z.infer<typeof campaignSchema>;

/** The app id a free board put in `?from=`, or nothing: anything outside Traction's own id shape is dropped before it reaches a page or an event. */
export function trialAppFrom(value: string | string[] | undefined) {
  const parsed = campaignSchema.shape.trial_app.safeParse(Array.isArray(value) ? value[0] : value);
  return parsed.success ? parsed.data : undefined;
}

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
  if (!measurementAllowed()) return {};
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
    // The free board a founder came from, read from the page the same way, so the rest of the visit and an enquiry carry it.
    const trial = trialAppFrom(document.querySelector<HTMLElement>('[data-trial-app]')?.dataset.trialApp);
    if (!campaign.trial_app && trial) campaign.trial_app = trial;
    if (window.location.pathname === '/traction' || window.location.pathname.startsWith('/traction/')) {
      const journey = journeyId();
      if (journey) Object.assign(campaign, { journey_id: journey, journey_schema: 'invitation_signup_v1', identity_basis: 'browser_journey' });
    }
    sessionStorage.setItem('ai-campaign', JSON.stringify(campaign));
    return campaign;
  } catch { return {}; }
}
