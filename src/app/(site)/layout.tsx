import '@/app/fonts.css';
import '@/site/styles/style.css';
import {Compatibility} from '@/site/Compatibility';
import '@/site/styles/pages.css';
import '@/site/styles/migration.css';
import {SiteHeader,SiteFooter,PreviewNotice} from '@/site/Chrome';
import {organisation} from '@/site/metadata';
export {metadata} from '@/site/metadata';
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><head><link rel="alternate" type="application/rss+xml" href="/articles/feed.xml"/><link rel="alternate" type="application/feed+json" href="/feed.json"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:organisation}}/></head><body><PreviewNotice/><SiteHeader/><Compatibility/>{children}<SiteFooter/></body></html>}
