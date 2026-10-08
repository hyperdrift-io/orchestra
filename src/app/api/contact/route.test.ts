import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const fetchMock = vi.fn();
let enquiryDir: string;

beforeEach(async () => {
  // The route saves every enquiry; keep test records out of the real store under ~/.local/share.
  enquiryDir = await mkdtemp(join(tmpdir(), 'orchestra-enquiries-'));
  vi.stubEnv('ENQUIRY_DATA_DIR', enquiryDir);
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(async () => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  await rm(enquiryDir, { recursive: true, force: true });
});

async function callRoute(body: unknown) {
  const { POST } = await import('./route');
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return POST(req);
}

function relayed() {
  const [, init] = fetchMock.mock.calls[0]! as [string, RequestInit];
  return JSON.parse(String(init.body)) as { name: string; email: string; message: string; source: string };
}

describe('POST /api/contact', () => {
  it('relays a valid submission, folding situation and company into the message', async () => {
    const res = await callRoute({
      name: 'Ada',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      situation: 'Automating a workflow',
      message: 'A reasonable length message about agents.',
    });
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(relayed()).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Where you are: Automating a workflow\nCompany: Analytical Engines\n\nA reasonable length message about agents.',
      source: 'orchestra_ai',
    });
    const [file] = await readdir(enquiryDir);
    expect(JSON.parse(await readFile(join(enquiryDir, file!), 'utf8'))).toMatchObject({ email: 'ada@example.com', delivery: 'sent' });
  });

  it('sends the message untouched when no context was given', async () => {
    await callRoute({ name: 'Ada', email: 'ada@example.com', message: 'A reasonable length message.' });
    expect(relayed().message).toBe('A reasonable length message.');
  });

  it('returns 400 for an invalid submission without calling the relay', async () => {
    const res = await callRoute({ name: '', email: 'nope', message: 'x' });
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 502 when the relay fails', async () => {
    fetchMock.mockResolvedValue(new Response('nope', { status: 500 }));
    const res = await callRoute({ name: 'Ada', email: 'ada@example.com', message: 'A reasonable length message.' });
    expect(res.status).toBe(502);
  });
});
