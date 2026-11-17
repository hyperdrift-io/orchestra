import {SystemGraph} from '@/home/components/SystemGraph';
import '@/../public/assets/home.css';
import {HomeTrust} from '@/site/HomeTrust';
export const metadata={alternates:{canonical:'/'}};
export default function Page(){return <main><section className="home-experience"><div id="home-root"><SystemGraph/></div></section><HomeTrust/></main>}
