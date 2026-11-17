import {metadata as siteMetadata} from '@/site/metadata';
import {SystemGraph} from '@/home/components/SystemGraph';
import '@/../public/assets/home.css';
export const metadata={openGraph:{...siteMetadata.openGraph,url:'https://hyperdrift.io/'},alternates:{canonical:'/'}};
export default function Page(){return <main><section className="home-experience"><div id="home-root"><SystemGraph/></div></section></main>}
