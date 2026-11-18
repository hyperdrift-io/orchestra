import {NextRequest,NextResponse} from 'next/server';
import { isArticlePreview, isScheduledArticle } from '@/lib/article-catalogue';

export function middleware(request:NextRequest){
 const articlePath = /^\/articles\/([^/]+)(?:\/opengraph-image)?\/?$/.exec(request.nextUrl.pathname);
 if (articlePath && !isArticlePreview() && isScheduledArticle(articlePath[1])) {
  // A pre-release fetch must not create a cached 404 for the launch.
  return new NextResponse('Not found', { status: 404, headers: { 'Cache-Control': 'private, no-store' } });
 }
 if(request.nextUrl.pathname==='/' && request.nextUrl.searchParams.has('article')){const target=request.nextUrl.clone();target.pathname='/contact';return NextResponse.redirect(target,308)}
 if(process.env.MIGRATION_PREVIEW !== 'true') return NextResponse.next();
 if(request.nextUrl.pathname.startsWith('/api/') && (!['GET','HEAD','OPTIONS'].includes(request.method) || ['/api/subscribe/confirm','/api/unsubscribe','/api/cron/weekly-ml','/api/traction/read'].includes(request.nextUrl.pathname))) return NextResponse.json({error:'This preview is paused. No submission was sent.'},{status:503,headers:{'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'}});
 const response=NextResponse.next();response.headers.set('X-Robots-Tag','noindex, nofollow');response.headers.set('Cache-Control','no-store');return response;
}
export const config={matcher:['/((?!_next/static|_next/image).*)']};
