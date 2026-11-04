import { tractionInvitation } from '@/lib/traction-invitations';
import { liveRead } from '@/lib/traction-read';

export const dynamic = 'force-dynamic';

/** Where an invited founder's live first read stands. The page asks with its own token; the address stays on the server. */
export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'no-store' };
  const invitation = await tractionInvitation(new URL(request.url).searchParams.get('invitation') ?? '');
  if (!invitation?.url) return Response.json({ ok: false }, { status: 404, headers });
  const read = await liveRead(invitation.url);
  return read ? Response.json(read, { headers }) : Response.json({ ok: false }, { status: 503, headers });
}
