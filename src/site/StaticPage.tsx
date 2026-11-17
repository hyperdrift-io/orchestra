import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import Script from 'next/script';
/** Approved, trusted HTML snapshots; visitor input never enters this renderer. */
export function StaticPage({name,styles=[],scripts=[]}:{name:string;styles?:string[];scripts?:string[]}){
 let html=readFileSync(join(process.cwd(),'src/site/content',name+'.html'),'utf8');
 if(process.env.MIGRATION_PREVIEW === 'true') html=html.replaceAll('https://traction.hyperdrift.io/start','/preview/trial');
 return <>{styles.map(href=><link rel="stylesheet" href={href} key={href}/>)}<div dangerouslySetInnerHTML={{__html:html}}/>{scripts.map(src=><Script src={src} key={src} strategy="afterInteractive"/>)}</>;
}
