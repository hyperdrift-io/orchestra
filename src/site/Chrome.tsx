import {archiveOrigin} from './archive';
import {LanguageLink} from './LanguageLink';
import {frenchHref,type Language} from './traction/routes';

type NavEntry = readonly [string,string,string];
const header:NavEntry[]=[['/traction','Traction','Traction'],['/workflows','AI workflows','Solutions IA'],['/articles','Blog','Blog'],['/about','About','À propos']];
const footer:NavEntry[]=[['/about','About Hyperdrift','À propos d’Hyperdrift'],['/work','Our work','Nos réalisations'],['/os','HD OS','HD OS'],[archiveOrigin,'Projects & writing','Projets et publications'],['/contact','Contact','Contact'],['/privacy','Privacy','Confidentialité']];

function NavLinks({items,language}:{items:NavEntry[];language:Language}) {
  return items.map(([href,en,fr])=>{
    const target=language==='fr'?frenchHref(href):href;
    const englishOnly=language==='fr' && target===href;
    return <a key={href} href={target} hrefLang={englishOnly?'en':undefined}>
      {language==='fr'?fr:en}{englishOnly && <span className="link-language"> (EN)</span>}
    </a>;
  });
}

export function SiteHeader({language='en'}:{language?:Language}) {
  return <header className="preview-header"><a className="brand preview-brand" href="/" hrefLang={language==='fr'?'en':undefined}><img src="/assets/hyperdrift-logo.svg" alt="" width="40" height="40"/>Hyperdrift</a>
    <nav aria-label={language==='fr'?'Navigation principale':'Main'}><NavLinks items={header} language={language}/><LanguageLink language={language}/></nav></header>;
}
export function SiteFooter({language='en'}:{language?:Language}) {
  return <footer className="site-footer"><nav aria-label={language==='fr'?'Pied de page':'Footer'}><NavLinks items={footer} language={language}/></nav>
    <p>© {new Date().getFullYear()} Hyperdrift Limited · {language==='fr'?'Société immatriculée en Angleterre et au pays de Galles sous le numéro 16638188.':'Registered in England and Wales, company 16638188.'}</p></footer>;
}
export function PreviewNotice({language='en'}:{language?:Language}) {
  return process.env.MIGRATION_PREVIEW==='true'?<aside className="preview-notice">{language==='fr'?'Aperçu privé. Les demandes et les actions sur le compte sont suspendues.':'Private preview · Enquiries and account actions are paused.'}</aside>:null;
}
