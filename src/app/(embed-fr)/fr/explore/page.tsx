import {ExplorePage,type ExploreProps} from '@/site/traction/explore/ExplorePage';
import {pageMetadata} from '@/lib/site-metadata';
const base=pageMetadata('Explorer HD OS','Suivez cinq situations dans une application de réservation pour voir comment l’équipe décide de la suite.','/fr/os');
export const metadata={...base,openGraph:{...base.openGraph,locale:'fr_FR'}};
export default function Page(props:ExploreProps){return <ExplorePage {...props} lang="fr"/>;}
