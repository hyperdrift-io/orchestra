import '@/app/fonts.css';
import '@/site/styles/style.css';
import '@/site/styles/pages.css';
import '@/site/styles/migration.css';
import './pilot.css';
import {SiteHeader,SiteFooter,PreviewNotice} from '@/site/Chrome';
import {Compatibility} from '@/site/Compatibility';
import {SiteEnquiryDialog} from '@/components/SiteEnquiryDialog';
import {organisation} from '@/site/metadata';
export {metadata} from '@/site/metadata';

export default function FrenchLayout({children}: {children:React.ReactNode}) {
  return <html lang="fr"><head><link rel="alternate" type="application/rss+xml" href="/articles/feed.xml" hrefLang="en"/><link rel="alternate" type="application/feed+json" href="/feed.json" hrefLang="en"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:organisation}}/></head>
    <body><PreviewNotice language="fr"/><SiteHeader language="fr"/><Compatibility/>{children}<SiteEnquiryDialog paused={process.env.MIGRATION_PREVIEW==='true'}/><SiteFooter language="fr"/></body></html>;
}
