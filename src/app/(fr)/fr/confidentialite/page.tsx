import {pageMetadata} from '@/lib/site-metadata';

const base = pageMetadata('Confidentialité','Données utilisées par Hyperdrift pour son site, les invitations à découvrir Traction et les demandes de contact.','/fr/confidentialite');

export const metadata = {
  ...base,
  openGraph: {...base.openGraph, locale: 'fr_FR'},
};

export default function Page() {
  return <main className="pilot-fr pilot-privacy">
    <h1>Confidentialité</h1>
    <h2>Une invitation à découvrir Traction</h2>
    <p>Pour ce pilote, nous utilisons des coordonnées professionnelles publiées par les entreprises. Nous sélectionnons les personnes selon leur rôle et le produit présenté sur leur site. Notre intérêt légitime est de faire connaître Traction aux équipes pour lesquelles il pourrait être utile.</p>
    <p>Les noms, fonctions, coordonnées professionnelles, sources et échanges sont utilisés par Hyperdrift dans Traction et dans sa messagerie professionnelle pour préparer les invitations et suivre les réponses.</p>
    <p>Une réponse à l’e-mail suffit pour refuser tout nouveau message. Nous conservons cette opposition pour la respecter. Pour connaître la source de vos coordonnées, exercer vos droits d’accès, de rectification, de limitation ou d’effacement, ou vous opposer à leur utilisation, écrivez à <a href="mailto:privacy@hyperdrift.io">privacy@hyperdrift.io</a>. Vous pouvez aussi <a href="https://www.cnil.fr/fr/plaintes">adresser une réclamation à la CNIL</a>.</p>
    <h2>Sur ce site</h2>
    <p>L’adresse du site saisie sur la page Traction sert à lire ses pages publiques et à préparer le premier avis demandé. L’événement qui comptabilise cette demande ne contient pas cette adresse.</p>
    <p>Ce site fonctionne sans cookies. Les pages vues sont comptées avec PostHog, hébergé dans l’Union européenne. Les sessions ne sont pas enregistrées en vidéo.</p>
    <p>Pendant la visite, l’onglet conserve un identifiant aléatoire et l’origine de la visite pour regrouper les pages consultées et retrouver l’origine d’une demande. Ces données sont effacées à la fermeture de l’onglet. Une invitation personnelle peut contenir une référence sans nom qui permet de compter une visite et un début d’essai.</p>
    <p>Un lien vers ce site depuis un tableau Traction peut contenir le nom de l’application pour rattacher la demande au bon tableau. Lorsqu’une personne nous écrit via le formulaire, son nom, son adresse et son message arrivent dans la boîte de Yann. Une copie reste sur notre serveur pour le suivi. La réception d’un message est enregistrée dans les événements du site.</p>
    <h2>Responsable du traitement</h2>
    <p>Hyperdrift Limited, société n° 16638188, 4 Rope Street, Londres SE16 7TE, Royaume-Uni. Contact pour les données personnelles : <a href="mailto:privacy@hyperdrift.io">privacy@hyperdrift.io</a>.</p>
  </main>;
}
