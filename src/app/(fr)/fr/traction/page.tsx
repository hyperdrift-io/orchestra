import type {Metadata} from 'next';
import {startHref} from '@/data/traction-offer';
import {pageMetadata} from '@/lib/site-metadata';
import {TrialForm} from './trial-form';

const title = 'Traction, une équipe pour trouver les prochains clients de votre application';
const description = 'À partir du site de votre application, Traction repère des clients potentiels et prépare un premier e-mail pour chacun. L’essai dure sept jours.';
const base = pageMetadata(title, description, '/fr/traction');
export const metadata: Metadata = {...base,
  alternates: {canonical: '/fr/traction', languages: {fr:'/fr/traction', en:'/traction'}},
  openGraph: {...base.openGraph, locale: 'fr_FR', images: ['/brand/traction/og-dark.jpg']},
  twitter: {...base.twitter, images: ['/brand/traction/og-dark.jpg']},
};

export default function Page() {
  return <main className="pilot-fr">
    <section className="pilot-offer">
      <div><p className="eyebrow">Traction</p>
        <h1>Une équipe pour trouver vos prochains clients.</h1>
        <p>Traction commence par un avis sur votre site, avant toute inscription. Pendant l’essai, votre équipe IA repère jusqu’à cinq clients potentiels, explique pourquoi votre application pourrait leur servir et prépare un premier e-mail pour chacun.</p>
        <TrialForm action={startHref()}/>
        <details><summary>Que comprend l’essai ?</summary>
          <p>Traction donne un premier avis sur votre site, puis propose une recherche de clients potentiels et des brouillons d’e-mails. Vous choisissez qui contacter et envoyez vous-même les messages.</p>
          <p>Selon la couverture de votre marché, vous pouvez aussi demander jusqu’à trois points d’actualité, à raison d’un par jour. Après sept jours, votre tableau reste consultable.</p>
          <p>Pour continuer, l’abonnement permet de relier votre messagerie au suivi des prospects et de mesurer les résultats de votre application. Nous pouvons aussi travailler avec vous sur la recherche et la prise de contact. La suite se discute selon vos besoins.</p>
        </details>
      </div>
      <figure><video controls playsInline preload="none" width="1920" height="1080" poster="/assets/traction.jpg" aria-label="Présentation de Traction, sous-titrée en français">
        <source src="/traction/growth-film.mp4" type="video/mp4"/>
        <track kind="captions" src="/assets/traction-film.fr.vtt" srcLang="fr" label="Français" default/>
      </video><figcaption>Traction sur l’une de nos applications, renommée « Yourapp ». Vidéo en anglais, sous-titrée en français. Les chiffres à l’écran sont des exemples.</figcaption></figure>
    </section>
  </main>;
}
