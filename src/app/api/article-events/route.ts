import { articleEventSchema } from '@/lib/article-events';
import { recordArticleEvent } from '@/lib/enquiry-storage';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  // Next's internal request URL can use localhost behind a proxy; Host is the public request authority.
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get('host')) return new Response(null, { status: 403 });
    } catch { return new Response(null, { status: 403 }); }
  }
  const text = await request.text();
  if (text.length > 1024) return new Response(null, { status: 413 });
  let payload: unknown;
  try { payload = JSON.parse(text); } catch { return new Response(null, { status: 400 }); }
  const parsed = articleEventSchema.safeParse(payload);
  if (!parsed.success) return new Response(null, { status: 400 });
  try {
    await recordArticleEvent(parsed.data);
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 503 }); }
}
