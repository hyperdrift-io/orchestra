import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { contactPrefillSchema, type ContactPrefill } from './contact-schema';

const text = (max: number) => z.string().trim().min(1).max(max);
const source = z.object({ label: text(80), href: z.string().url().max(500).refine((href) => href.startsWith('https://'), 'https only') });

/** A first read of the founder's own product, prepared and checked before the invitation goes out. */
const readSchema = z.object({
  /** When the public pages were read, as written on the page. */
  on: text(40),
  findings: z.array(z.object({
    label: z.enum(['Strength', 'In the way', 'Next customer move']),
    headline: text(160),
    detail: text(600),
    sources: z.array(source).max(4).default([]),
  })).length(3),
});

export type FirstRead = z.infer<typeof readSchema>;
export type TractionInvitation = {
  firstName: string; product: string; welcome: string; contact?: ContactPrefill;
  /** Who the product is for, in the invitation email's own words ("the small teams it’s made for"). */
  audience?: string;
  read?: FirstRead;
  /** Opaque per-person analytics reference (`c-` and eight hex digits); never a name. */
  ref?: string;
  /** Which page this invitation shows, for comparing versions fairly. */
  variant: string;
};

const optional = {
  audience: text(80).optional(),
  read: readSchema.optional(),
  ref: z.string().regex(/^c-[a-f0-9]{8}$/).optional(),
  variant: z.string().regex(/^[a-z0-9_]{1,40}$/).optional(),
};

/** Reviewed invitation details only. This registry never grants access to a Traction account. */
export async function tractionInvitation(token: string): Promise<TractionInvitation | undefined> {
  noStore();
  const path = process.env.TRACTION_INVITATIONS_FILE;
  if (!path || !/^[a-f0-9]{64}$/.test(token)) return;
  try {
    const entries: unknown = JSON.parse(await readFile(path, 'utf8'));
    if (!entries || typeof entries !== 'object' || Array.isArray(entries)) return;
    const key = createHash('sha256').update(token).digest('hex');
    const value = (entries as Record<string, unknown>)[key];
    return parseInvitation(value);
  } catch { return; }
}

/** Older entries carry only the welcome fields; an invalid optional field is dropped, never shown half-checked. */
export function parseInvitation(value: unknown): TractionInvitation | undefined {
  if (!value || typeof value !== 'object') return;
  const { firstName, product, welcome, contact, ...rest } = value as Record<string, unknown>;
  if (typeof firstName !== 'string' || !firstName || firstName.length > 80
    || typeof product !== 'string' || !product || product.length > 120
    || typeof welcome !== 'string' || !welcome || welcome.length > 600) return;
  const prefill = contactPrefillSchema.safeParse(contact ?? {});
  const field = <K extends keyof typeof optional>(key: K) => {
    const parsed = optional[key].safeParse(rest[key]);
    return parsed.success ? parsed.data as z.infer<(typeof optional)[K]> : undefined;
  };
  const read = field('read');
  return {
    firstName, product, welcome, contact: prefill.success ? prefill.data : undefined,
    audience: field('audience'), read, ref: field('ref'),
    variant: field('variant') ?? (read ? 'first_read_v1' : 'proposition_v1'),
  };
}
