import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("HD OS","Connect engineering, hosting, security and support around your app, with growth coordinated through Traction.","/os");
export default function Page(){return <StaticPage name="os" styles={["/assets/traction-page.css?v=10"]} scripts={["/assets/traction-page.js?v=8", "/assets/traction-site-read.js?v=1"]}/>}
