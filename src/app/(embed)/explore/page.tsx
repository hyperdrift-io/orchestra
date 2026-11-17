import {StaticPage} from '@/site/StaticPage';
import {EmbedResize} from '@/site/EmbedResize';
export const metadata={title:'Explore HD OS',alternates:{canonical:'/os'}};
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const panel=(await searchParams).panel!==undefined;return <><EmbedResize panel={panel}/>{!panel&&<nav className="preview-nav" aria-label="Navigation"><a href="/">← Hyperdrift</a><a href="/os">About HD OS →</a></nav>}<StaticPage name="explore" scripts={['/assets/mesh.js']}/></>}
