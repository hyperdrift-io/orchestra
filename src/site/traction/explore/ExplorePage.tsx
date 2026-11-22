import {EmbedResize} from '@/site/EmbedResize';
import {OperatingSystem} from './Example';
import type {Language} from '../routes';

export type ExploreProps = {searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function ExplorePage({searchParams,lang}:{lang:Language}&ExploreProps) {
  const panel=(await searchParams).panel!==undefined;
  const fr=lang==='fr';
  return <><EmbedResize panel={panel}/>
    {!panel&&<nav className="preview-nav" aria-label="Navigation"><a href="/">← Hyperdrift</a><a href={fr?'/fr/os':'/os'}>{fr?'À propos du système HD OS →':'About HD OS →'}</a></nav>}
    <main><OperatingSystem lang={lang}/>
      <noscript><p>{fr?'Cet exemple illustre comment Traction relie la veille marché, les agents, le CRM, le développement et les statistiques autour d’une application de réservation.':'This illustrative example follows a Traction team using HD OS to connect Market pulse, Agent team, Prospect CRM, Initiative delivery and Analytics around a booking app.'}</p></noscript>
      <p className="next-step">{fr?'Cet exemple est illustratif. Nous convenons du périmètre et des connexions avec chaque fondateur. ':'Illustrative example. Scope and connections are agreed with each founder. '}<a href={fr?'/fr/os':'/os'}>{fr?'Revenir à Traction →':'Back to Traction →'}</a></p>
    </main></>;
}
