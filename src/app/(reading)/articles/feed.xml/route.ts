import {articles} from '@/lib/article-catalogue';
import {buildRssXml} from '@/lib/discovery-feeds';
export const revalidate=60;
export function GET(){return new Response(buildRssXml(articles),{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}})}
