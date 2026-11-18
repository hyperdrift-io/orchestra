import {NextRequest,NextResponse} from 'next/server';
export function middleware(request:NextRequest){
 if(request.nextUrl.pathname==='/' && request.nextUrl.searchParams.has('article')){const target=request.nextUrl.clone();target.pathname='/contact';return NextResponse.redirect(target,308)}
 if(process.env.MIGRATION_PREVIEW !== 'true') return NextResponse.next();
 if(request.nextUrl.pathname.startsWith('/api/') && (!['GET','HEAD','OPTIONS'].includes(request.method) || ['/api/subscribe/confirm','/api/unsubscribe','/api/cron/weekly-ml','/api/traction/read'].includes(request.nextUrl.pathname))) return NextResponse.json({error:'This preview is paused. No submission was sent.'},{status:503,headers:{'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store'}});
 const response=NextResponse.next();response.headers.set('X-Robots-Tag','noindex, nofollow');response.headers.set('Cache-Control','no-store');return response;
}
export const config={matcher:['/((?!_next/static|_next/image).*)']};
