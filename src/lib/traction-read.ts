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

type Asked = { refused: 'paused' | 'address' | 'unavailable' } | { read: LiveRead };

/** One request to Traction's read, with why it was refused when it was: a paused day, an address that is not a site. */
async function ask(url: string, language?: 'fr'): Promise<Asked> {
  if (process.env.MIGRATION_PREVIEW === 'true') return { refused: 'unavailable' };
  try {
    const response = await fetch(`${tractionOrigin()}/api/read`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, ...(language ? {language} : {}) }),
      cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    const body: unknown = await response.json();
    const error = body && typeof body === 'object' && (body as { ok?: unknown }).ok === false ? String((body as { error?: unknown }).error ?? '') : '';
    if (response.status === 429 || error === 'reads_paused') return { refused: 'paused' };
    if (error === 'app_address_required') return { refused: 'address' };
    const parsed = siteReadSchema.safeParse(body);
    if (error || !parsed.success) return { refused: 'unavailable' };
    const { state, site, reading = [], on, findings, error: failure } = parsed.data;
    const complete = state === 'ready' ? readSchema.safeParse({ on, findings }) : undefined;
    return { read: {
      state: state === 'ready' && !complete?.success ? 'failed' : state,
      ...(site ? { site } : {}),
      reading: reading.map((href) => { const { hostname, pathname } = new URL(href); return pathname === '/' ? hostname.replace(/^www\./, '') : pathname.replace(/\/+$/, ''); }),
      ...(complete?.success ? { read: complete.data } : {}),
      ...(state === 'failed' && failure === 'site_unreachable' ? { blocked: true } : {}),
    } };
  } catch {
    return { refused: 'unavailable' };
  }
}

export async function liveRead(url: string): Promise<LiveRead | undefined> {
  const asked = await ask(url);
  return 'read' in asked ? asked.read : undefined;
}

/**
 * The read a visitor asks for from the Traction page, with their own app's address. What goes back to the page is
 * what it shows before a sign-up: where the read stands and, once ready, each finding's one line. The findings in
 * full, with their sources, open on the board.
 */
export type VisitorRead =
  | { state: 'refused'; reason: 'paused' | 'address' | 'unavailable' }
  | { state: 'queued' | 'running' | 'failed'; site?: LiveRead['site']; reading: string[]; blocked?: boolean }
  | { state: 'ready'; site?: LiveRead['site']; lines: { label: string; headline: string }[] };

/** A visitor's address as Traction will take it: a public https name, never credentials, a port or a bare number. */
export function visitorAddress(raw: unknown): string | undefined {
  if (typeof raw !== 'string' || raw.trim().length < 4 || raw.length > 300) return;
  try {
    const url = new URL(raw.includes('://') ? raw.trim() : `https://${raw.trim()}`);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port || !url.hostname.includes('.') || /^[\d.]+$/.test(url.hostname)) return;
    return `https://${url.hostname.toLowerCase()}${url.pathname.replace(/\/+$/, '')}`;
  } catch { return; }
}

export async function visitorRead(url: string, language?: 'fr'): Promise<VisitorRead> {
  const asked = await ask(url, language);
  if ('refused' in asked) return { state: 'refused', reason: asked.refused };
  const { state, site, reading, read, blocked } = asked.read;
  if (state === 'ready' && read) return { state, ...(site ? { site } : {}), lines: read.findings.map(({ label, headline }) => ({ label, headline })) };
  return { state: state === 'ready' ? 'failed' : state, ...(site ? { site } : {}), reading, ...(blocked ? { blocked } : {}) };
}
