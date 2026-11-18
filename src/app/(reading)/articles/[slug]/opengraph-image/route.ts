import Image from '@/components/ArticleOg';
import { unstable_noStore as noStore } from 'next/cache';
import { isArticlePreview, isScheduledArticle } from '@/lib/article-catalogue';
export const revalidate=86400;
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!isArticlePreview() && isScheduledArticle((await context.params).slug)) {
    noStore();
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
  }
  return Image(context);
}
