import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { unstable_noStore as noStore } from 'next/cache';

export type TractionInvitation = { firstName: string; product: string; welcome: string };

/** Reviewed welcome copy only. This registry never grants access to a Traction account. */
export async function tractionInvitation(token: string): Promise<TractionInvitation | undefined> {
  noStore();
  const path = process.env.TRACTION_INVITATIONS_FILE;
  if (!path || !/^[a-f0-9]{64}$/.test(token)) return;
  try {
    const entries: unknown = JSON.parse(await readFile(path, 'utf8'));
    if (!entries || typeof entries !== 'object' || Array.isArray(entries)) return;
    const key = createHash('sha256').update(token).digest('hex');
    const value = (entries as Record<string, unknown>)[key];
    if (!value || typeof value !== 'object') return;
    const { firstName, product, welcome } = value as Record<string, unknown>;
    if (typeof firstName !== 'string' || !firstName || firstName.length > 80
      || typeof product !== 'string' || !product || product.length > 120
      || typeof welcome !== 'string' || !welcome || welcome.length > 600) return;
    return { firstName, product, welcome };
  } catch { return; }
}
