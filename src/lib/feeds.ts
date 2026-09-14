import { z } from 'zod';

/**
 * "Now playing": the latest Intel edition and the latest published article,
 * read server-side from public feeds and cached briefly. Anything that fails
 * validation renders the permanent fallback link instead of a stale "latest".
 */

const INTEL_LIST_URL = 'https://intel.hyperdrift.io/api/daily-intel/list';
const INTEL_DAILY_URL = 'https://intel.hyperdrift.io/daily';
const BLOG_LIST_URL = 'https://hyperdrift.io/api/blog/list';
const BLOG_URL = 'https://hyperdrift.io/blog';

export const FEED_REVALIDATE_SECONDS = 15 * 60;
const FETCH_TIMEOUT_MS = 5_000;

/** Legacy DeFi promotion stays out of the front door. */
const EXCLUDED_TAGS = new Set(['web3', 'defi', 'crypto', 'intel']);
const DAILY_INTEL_SLUG = /^daily-intel-(\d{4}-\d{2}-\d{2})$/;

const postSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).optional(),
});
const listSchema = z.object({ posts: z.array(postSchema) });
type Post = z.infer<typeof postSchema>;

export interface FeedItem {
  title: string;
  /** Publication day, YYYY-MM-DD (UTC). */
  date: string;
  url: string;
}

function dayOf(iso: string): string | null {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

/** Valid, already-published posts, newest first. Future dates never show. */
function published(payload: unknown, today: Date): (Post & { day: string })[] {
  const parsed = listSchema.safeParse(payload);
  if (!parsed.success) return [];
  const limit = today.toISOString().slice(0, 10);
  return parsed.data.posts
    .flatMap((p) => {
      const day = dayOf(p.date);
      return day && day <= limit ? [{ ...p, day }] : [];
    })
    .sort((a, b) => (a.day < b.day ? 1 : a.day > b.day ? -1 : 0));
}

export function pickLatestIntel(payload: unknown, today = new Date()): FeedItem | null {
  const post = published(payload, today).find((p) => DAILY_INTEL_SLUG.test(p.slug));
  if (!post) return null;
  const day = post.slug.match(DAILY_INTEL_SLUG)![1];
  return { title: post.title, date: day, url: `${INTEL_DAILY_URL}/${day}` };
}

export function pickLatestWriting(payload: unknown, today = new Date()): FeedItem | null {
  const post = published(payload, today).find(
    (p) => !DAILY_INTEL_SLUG.test(p.slug) && !(p.tags ?? []).some((t) => EXCLUDED_TAGS.has(t.toLowerCase()))
  );
  return post ? { title: post.title, date: post.day, url: `${BLOG_URL}/${post.slug}` } : null;
}

export function formatDay(day: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${day}T00:00:00Z`)
  );
}

async function fetchJson(url: string): Promise<unknown> {
  try {
    const res = await fetch(url, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function getLatestIntel(): Promise<FeedItem | null> {
  return pickLatestIntel(await fetchJson(INTEL_LIST_URL));
}

export async function getLatestWriting(): Promise<FeedItem | null> {
  return pickLatestWriting(await fetchJson(BLOG_LIST_URL));
}
