import {indexableTags,tagUrl} from '@/lib/article-tags';
import {publishedArticles} from '@/lib/article-catalogue';
export const revalidate=60;
const origin='https://hyperdrift.io';
export default function sitemap(){return [
 ...['/','/articles','/about','/work','/workflows','/os','/traction','/traction/how-it-works','/traction/partnership','/how-it-works?view=business','/contact','/privacy','/articles/ui-accessibility','/articles/traction-from-zero'].map(path=>({url:origin+path,lastModified:new Date('2026-11-17')})),
 ...indexableTags().map(tag=>({url:tagUrl(tag.slug)})),
 ...publishedArticles().map(article=>({url:origin+'/articles/'+article.slug,lastModified:new Date(article.updatedAt||article.publishedAt!)})),
]}
