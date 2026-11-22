import { visitorAddress, visitorRead } from '@/lib/traction-read';

export const dynamic = 'force-dynamic';

const headers = { 'Cache-Control': 'no-store' };

/**
 * The first read a visitor asks for with their own app's address, from the Traction page. Traction keeps one read
 * per site, bounds new ones and refuses anything but a public site; asking again says where the read stands. Only
 * this site's own pages may ask. The address is never logged or sent to analytics.
 */
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin && request.headers.get('sec-fetch-site') !== 'same-origin')
    return Response.json({ state: 'refused', reason: 'unavailable' }, { status: 403, headers });
  const text = await request.text();
  let input: unknown;
  try { input = text.length <= 1024 ? JSON.parse(text || '{}') : undefined; } catch { input = undefined; }
  const url = visitorAddress(input && typeof input === 'object' ? (input as { url?: unknown }).url : undefined);
  if (!url) return Response.json({ state: 'refused', reason: 'address' }, { status: 400, headers });
  const language = input && typeof input === 'object' && 'language' in input && input.language === 'fr' ? 'fr' : undefined;
  const read = await visitorRead(url,language);
  return Response.json(read, { status: read.state === 'refused' ? (read.reason === 'paused' ? 429 : read.reason === 'address' ? 400 : 503) : 200, headers });
}
