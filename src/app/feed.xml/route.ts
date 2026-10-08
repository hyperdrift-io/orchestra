import { articles } from '@/lib/article-catalogue';
import { buildRssXml } from '@/lib/discovery-feeds';

// Articles publish by date; a scheduled piece joins the feed within a minute, without a deploy.
export const revalidate = 60;

export function GET(): Response {
  return new Response(buildRssXml(articles), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
