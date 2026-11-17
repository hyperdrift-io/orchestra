import {getArticle} from '@/lib/articles';
import {publishedArticles} from '@/lib/article-catalogue';
export function allArticles(){return [
 ...publishedArticles().map(p=>({guid:'https://orchestra.hyperdrift.io/articles/'+p.slug,id:'article-'+p.slug,title:p.title,excerpt:p.excerpt,href:'/articles/'+p.slug,date:p.publishedAt!,updated:p.updatedAt||p.publishedAt!,tags:p.tags,image:p.heroImage||p.image,minutes:getArticle(p.slug)!.minutes}))
 ].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));}
export type CatalogueEntry=ReturnType<typeof allArticles>[number];
