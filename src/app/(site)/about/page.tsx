import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("About Hyperdrift","Meet Hyperdrift: the experience, team and purpose behind Traction and our AI engineering work.","/about");
export default function Page(){return <StaticPage name="about" styles={["/assets/about.css?v=3", "/assets/carousel.css?v=3"]} scripts={["/assets/about.js?v=2"]}/>}
