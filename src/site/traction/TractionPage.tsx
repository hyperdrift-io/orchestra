import Script from 'next/script';
import {pageMetadata} from '@/lib/site-metadata';
import {tractionHtml} from './render';
import {frenchHref,panels,type Language,type Panel} from './routes';

const metadataCopy: Record<Panel,Record<Language,[string,string]>> = {
  traction:{en:['Traction','A growth team for your app. A seven-day trial includes your website review, one customer search and email drafts.'],fr:['Traction','Une équipe pour faire grandir votre application. En sept jours, découvrez un premier avis sur votre site, une recherche de clients potentiels et un e-mail pour chacun.']},
  'how-it-works':{en:['How Traction works','Explore how Traction connects customer research, conversations, growth plans, market evidence and delivery.'],fr:['Comment fonctionne Traction','Découvrez comment Traction recherche des clients, prépare les e-mails et suit votre marché.']},
  partnership:{en:['Traction Partnership','Work with Hyperdrift on your app’s growth. Agree the customer work, scope and decisions together.'],fr:['Le partenariat Traction','Travaillez avec Hyperdrift sur la croissance de votre application. Ensemble, convenons des clients à approcher, du travail à mener et du rôle de chacun.']},
  'hd-os-example':{en:['HD OS','Connect engineering, hosting, security and support around your app, with growth coordinated through Traction.'],fr:['HD OS','Découvrez comment Traction utilise HD OS pour relier la relation client, le développement et les opérations.']},
};

export function tractionMetadata(panel:Panel,lang:Language) {
  const en=panels[panel],fr=frenchHref(en);
  const path=lang==='fr'?fr:en;
  const [title,description]=metadataCopy[panel][lang];
  const base=pageMetadata(title,description,path);
  return {...base,alternates:{canonical:path,languages:{en,fr}},openGraph:{...base.openGraph,locale:lang==='fr'?'fr_FR':'en_GB'}};
}
export function TractionPage({panel,lang}: {panel:Panel;lang:Language}) {
  return <>
    <link rel="stylesheet" href="/assets/traction-page.css?v=10"/>
    <div dangerouslySetInnerHTML={{__html:tractionHtml(panel,lang)}}/>
    <Script src="/assets/traction-page.js?v=9" strategy="afterInteractive"/>
    <Script src="/assets/traction-site-read.js?v=2" strategy="afterInteractive"/>
  </>;
}
