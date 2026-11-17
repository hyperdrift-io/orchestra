import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("Traction","A growth team for your app. A seven-day trial includes your website review, one customer search and email drafts.","/traction");
export default function Page(){return <StaticPage name="traction" styles={["/assets/traction-page.css?v=1"]} scripts={["/assets/traction-page.js?v=4"]}/>}
