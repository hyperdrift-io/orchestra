import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("Our work","Inspect Hyperdrift’s work in Traction, NextRole and open source, with the evidence and limits visible.","/work");
export default function Page(){return <StaticPage name="work" styles={["/assets/about.css"]} scripts={[]}/>}
