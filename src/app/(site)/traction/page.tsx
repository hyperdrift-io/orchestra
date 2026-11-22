import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';

export const metadata = {
  ...pageMetadata('Traction', 'A growth team for your app. A seven-day trial includes your website review, one customer search and email drafts.', '/traction'),
  alternates: {canonical: '/traction', languages: {en:'/traction', fr:'/fr/traction'}},
};

export default function Page() {
  return <>
    <StaticPage name="traction" styles={['/assets/traction-page.css?v=10']} scripts={['/assets/traction-page.js?v=8', '/assets/traction-site-read.js?v=1']}/>
    <nav className="traction-languages" aria-label="Language"><a href="/fr/traction" hrefLang="fr" lang="fr">Français</a></nav>
  </>;
}
