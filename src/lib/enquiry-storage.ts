import { mkdir, appendFile, writeFile, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import type { ContactInput } from './contact-schema';

// Keep sales records outside replaceable release checkouts.
const dataRoot = () => process.env.ENQUIRY_DATA_DIR || join(homedir(), '.local', 'share', 'hyperdrift', 'orchestra', 'enquiries');

export async function recordArticleEvent(event: Record<string, string>) {
  const root = dataRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  await appendFile(join(root, 'events.jsonl'), `${JSON.stringify({ ...event, at: new Date().toISOString(), environment: process.env.NODE_ENV === 'production' ? 'production' : 'preview' })}\n`, { mode: 0o600 });
}

export async function saveEnquiry(id: string, enquiry: ContactInput, delivery: 'pending' | 'sent' | 'failed' | 'preview') {
  const root = dataRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const file = join(root, `${id}.json`);
  const temporary = `${file}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify({ id, receivedAt: new Date().toISOString(), ...enquiry, delivery, qualification: 'unreviewed' }, null, 2), { mode: 0o600 });
  await rename(temporary, file);
}
