import {notFound} from 'next/navigation';
export const metadata={title:'Trial handoff preview',robots:{index:false,follow:false}};
export default function Page(){if(process.env.MIGRATION_PREVIEW!=='true')notFound();return <main><section className="page-intro"><p className="eyebrow">Private preview</p><h1>Your Traction trial starts here after launch.</h1><p>The published link opens the sign-up page on traction.hyperdrift.io. Account creation is paused in this preview.</p><a className="button" href="/traction">Back to Traction →</a></section></main>}
