import {allArticles} from '@/site/catalogue';
export const revalidate=60;
export function GET(){return Response.json({version:'https://jsonfeed.org/version/1.1',title:'Hyperdrift',home_page_url:'https://hyperdrift.io/articles',feed_url:'https://hyperdrift.io/feed.json',items:allArticles().map(a=>({id:a.guid,url:'https://hyperdrift.io'+a.href,title:a.title,summary:a.excerpt,content_text:a.excerpt,date_published:a.date,date_modified:new Date(a.updated).toISOString(),tags:a.tags,...(a.image?{image:'https://hyperdrift.io'+a.image.src}:{})}))})}
