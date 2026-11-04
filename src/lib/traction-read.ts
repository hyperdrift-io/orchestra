import { z } from 'zod';
import { tractionOrigin } from '@/data/traction-offer';
import { readSchema } from '@/lib/traction-invitations';

/**
 * The live first read of an invited founder's app, asked of Traction's server (`POST /api/read`). Traction keeps one
 * read per site and bounds new ones per day, so asking again returns the read under way or the one already made.
 * Server only: the address comes from the invitation, never from the browser.
 */
const siteReadSchema = z.object({
  state: z.enum(['queued', 'running', 'ready', 'failed']),
  host: z.string().max(253).optional(),
  site: z.object({ title: z.string().max(300).optional(), description: z.string().max(300).optional() }).optional(),
  reading: z.array(z.string().url().max(500)).max(6).optional(),
  on: z.string().max(40).optional(),
  findings: z.unknown().optional(),
  error: z.string().max(60).optional(),
});

export type LiveRead = {
  state: 'queued' | 'running' | 'ready' | 'failed';
  site?: { title?: string; description?: string };
  /** Paths read so far, as the page shows them. */
  reading: string[];
  /** Set only when the read is complete and every source is https. */
  read?: z.infer<typeof readSchema>;
  /** A failed read the site itself refused, as opposed to one that failed on our side. */
  blocked?: boolean;
};

export async function liveRead(url: string): Promise<LiveRead | undefined> {
  try {
    const response = await fetch(`${tractionOrigin()}/api/read`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }),
      cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    const parsed = siteReadSchema.safeParse(await response.json());
    if (!parsed.success) return;
    const { state, site, reading = [], on, findings, error } = parsed.data;
    const complete = state === 'ready' ? readSchema.safeParse({ on, findings }) : undefined;
    return {
      state: state === 'ready' && !complete?.success ? 'failed' : state,
      ...(site ? { site } : {}),
      reading: reading.map((href) => { const { hostname, pathname } = new URL(href); return pathname === '/' ? hostname.replace(/^www\./, '') : pathname.replace(/\/+$/, ''); }),
      ...(complete?.success ? { read: complete.data } : {}),
      ...(state === 'failed' && error === 'site_unreachable' ? { blocked: true } : {}),
    };
  } catch {
    return;
  }
}
