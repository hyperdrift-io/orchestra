const en = {
  title: 'Contact Hyperdrift',
  description: 'Talk to Hyperdrift about your app, growth or an AI workflow.',
  heading: 'What would move your business forward?',
  lede: 'Tell us about your app, your customers or a workflow you want to improve. We’ll work out a useful next step together.',
  contact: 'Contact us', close: 'Close', dialog: 'Get in touch',
  paused: 'This form is paused for review. No enquiry can be sent from this preview.',
  website: 'Website', appWebsite: 'Your app’s website', app: 'Your app', appHint: 'The link, who it’s for and what you want next',
  quoteField: 'What you’d like Traction to do', optional: 'Optional', message: 'Message',
  name: 'Name', email: 'Email', company: 'Company', sending: 'Sending…',
  firstRead: 'Ask for a first impression', intro: 'Introduce your app', sendIntro: 'Introduce my app', quote: 'Ask for a quote', send: 'Send message',
  purpose: 'We’ll use these details to reply to your enquiry.',
  sent: 'Received. We’ll reply within one working day.', preview: 'Preview enquiry saved locally. No email was sent.',
  retry: 'Please try sending your enquiry again.', rate: 'Too many messages. Please try again in a few minutes.',
  invalid: 'Check the fields and try again.', unavailable: 'Your enquiry could not be sent. Please try again.',
  board: 'Your message will mention the Traction board you came from. It does not grant access.',
  from: 'Continuing from', context: 'The page you came from will accompany your enquiry.',
  workflow: (example: string) => `About the ${example === 'crm' ? 'customer conversations' : example} workflow. You can add context in your message.`,
};

const fr: typeof en = {
  title: 'Contacter Hyperdrift',
  description: 'Échangez avec Hyperdrift au sujet de votre application, de vos clients ou d’un projet d’automatisation.',
  heading: 'Comment pouvons-nous vous aider ?',
  lede: 'Parlez-nous de votre application, des clients que vous souhaitez toucher ou du travail que vous aimeriez automatiser.',
  contact: 'Contacter Hyperdrift', close: 'Fermer', dialog: 'Nous contacter',
  paused: 'Les demandes sont suspendues dans cet aperçu.',
  website: 'Site web', appWebsite: 'Site web de votre application', app: 'Votre application', appHint: 'Son adresse, son public et votre objectif',
  quoteField: 'Ce que vous souhaitez faire avec Traction', optional: 'Facultatif', message: 'Message',
  name: 'Nom', email: 'E-mail', company: 'Entreprise', sending: 'Envoi…',
  firstRead: 'Demander un premier avis', intro: 'Présenter votre application', sendIntro: 'Présenter mon application', quote: 'Demander un devis', send: 'Envoyer le message',
  purpose: 'Ces coordonnées serviront à répondre à votre demande.',
  sent: 'Message reçu. Nous vous répondrons sous un jour ouvré.', preview: 'Demande enregistrée dans cet aperçu. Aucun e-mail envoyé.',
  retry: 'L’envoi a échoué. Veuillez réessayer.', rate: 'Trop de messages ont été envoyés. Veuillez réessayer dans quelques minutes.',
  invalid: 'Vérifiez les champs avant de réessayer.', unavailable: 'L’envoi a échoué. Veuillez réessayer.',
  board: 'Le nom du tableau Traction sera joint au message. Son contenu reste privé.',
  from: 'Depuis', context: 'La page d’origine sera jointe au message.',
  workflow: (example: string) => {
    const names: Record<string, string> = {pipeline: 'suivi commercial', crm: 'échanges clients', delivery: 'livraison', market: 'veille', learning: 'apprentissage'};
    return `Votre message concerne le processus « ${names[example]} ».`;
  },
};

export const enquiryCopy = { en, fr };
export type EnquiryLanguage = keyof typeof enquiryCopy;
