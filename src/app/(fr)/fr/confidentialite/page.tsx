import {pageMetadata} from '@/lib/site-metadata';

const base = pageMetadata('Confidentialité','Données utilisées par Hyperdrift pour son site, les invitations à découvrir Traction et les demandes de contact.','/fr/confidentialite');

export const metadata = {
  ...base,
  alternates:{canonical:'/fr/confidentialite',languages:{en:'/privacy',fr:'/fr/confidentialite'}},
  openGraph: {...base.openGraph, locale: 'fr_FR'},
};

export default function Page() {
  return <main className="pilot-fr pilot-privacy">
    <h1>Confidentialité</h1>
    <h2>Une invitation à découvrir Traction</h2>
    <p>Pour ce pilote, nous écrivons à l’adresse de contact générale publiée sur le site de chaque entreprise. Le message nomme la personne à qui il est destiné. Nous utilisons des informations publiques sur son rôle et son produit pour déterminer si Traction pourrait lui être utile. Notre prospection repose sur cet intérêt légitime.</p>
    <p>Hyperdrift garde dans Traction les noms, les fonctions, les adresses de contact, leurs sources et le suivi des échanges. Traction est hébergé par Hostinger à Manchester, au Royaume-Uni. La Commission européenne a reconnu l’adéquation de la protection des données au Royaume-Uni.</p>
    <p>Nous utilisons OpenAI pour nous aider à préparer les invitations. Notre messagerie professionnelle passe par Hostinger Mail, qui indique héberger les boîtes et leurs sauvegardes en France et en Allemagne. <a href="https://www.hostinger.com/support/hostinger-mail-data-location-backups-and-subprocessors/">Hébergement et sous-traitants de la messagerie</a>.</p>
    <p>Chaque destinataire reçoit le même lien vers Traction. Ce lien ne contient aucun identifiant personnel. Les e-mails du pilote ne contiennent pas de pixel de suivi.</p>
    <p>Une réponse à l’e-mail suffit pour refuser tout nouveau message. Nous conservons cette opposition pour la respecter. Pour connaître la source de vos coordonnées, exercer vos droits d’accès, de rectification, de limitation ou d’effacement, ou vous opposer à leur utilisation, écrivez à <a href="mailto:privacy@hyperdrift.io">privacy@hyperdrift.io</a>. Vous pouvez aussi <a href="https://www.cnil.fr/fr/plaintes">adresser une réclamation à la CNIL</a>.</p>
    <h2>Sur ce site</h2>
    <p>L’adresse du site saisie sur la page Traction sert à lire ses pages publiques et à préparer le premier avis demandé. L’événement qui comptabilise cette demande ne contient pas cette adresse.</p>
    <p>Ce site fonctionne sans cookies. Les pages vues sont comptées avec PostHog, hébergé dans l’Union européenne. Les sessions ne sont pas enregistrées en vidéo.</p>
    <p>Pendant la visite, l’onglet conserve un identifiant aléatoire et l’origine de la visite pour regrouper les pages consultées et retrouver l’origine d’une demande. Ces données sont effacées à la fermeture de l’onglet.</p>
    <p>Un lien vers ce site depuis un tableau Traction peut contenir le nom de l’application pour rattacher la demande au bon tableau. Lorsqu’une personne nous écrit via le formulaire, son nom, son adresse et son message arrivent dans la boîte de Yann. Une copie reste sur notre serveur pour le suivi. La réception d’un message est enregistrée dans les événements du site.</p>
    <h2>Responsable du traitement</h2>
    <p>Hyperdrift Limited, société n° 16638188, 4 Rope Street, Londres SE16 7TE, Royaume-Uni. Pour toute question sur vos données, écrivez à <a href="mailto:privacy@hyperdrift.io">privacy@hyperdrift.io</a>.</p>
  </main>;
}
