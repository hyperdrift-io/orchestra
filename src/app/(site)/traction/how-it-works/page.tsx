import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("How Traction works","Explore how Traction connects customer research, conversations, growth plans, market evidence and delivery.","/traction/how-it-works");
export default function Page(){return <StaticPage name="traction-how-it-works" styles={["/assets/traction-page.css?v=10"]} scripts={["/assets/traction-page.js?v=7"]}/>}
