/**
 * The Traction offer: Traction is the board, the Traction Partnership is the work done with a founder on it.
 * Shared offer facts and the board film. A first read comes with every free board.
 */

/** The block on /traction that says how the free board continues; a free board links here with `?from=<app id>`. */
export const continueHref = '/traction#continue';
/** How we work with a founder: the page that answers the question prospects ask first. */
export const partnershipHref = '/traction/partnership';
export const continuedUseHref = '/traction?situation=subscription#enquire';
/** Traction itself; TRACTION_URL points a local preview at a local Traction. */
export const tractionOrigin = () => process.env.TRACTION_URL || 'https://traction.hyperdrift.io';
/**
 * Free sign-up on Traction. From an invitation, its opaque reference rides along with the app's public address and name,
 * so the form arrives filled in and the board opens on the read the founder saw. Never a person's name or email.
 * TRACTION_START_URL still overrides the whole address for a local preview.
 */
export const startHref = (from?: string, app?: { url: string; product: string }) => {
  const query = new URLSearchParams({ ...(from ? { from } : {}), ...(app ? { app: app.url, product: app.product } : {}) }).toString();
  return `${process.env.TRACTION_START_URL || `${tractionOrigin()}/start`}${query ? `?${query}` : ''}`;
};
/** A founder's own board, by its app id, validated before it gets here. */
export const boardHref = (app: string) => `${tractionOrigin()}/app/${app}`;

/**
 * The offer after day one, defined once for the home card, /traction, the invitation page and llms.txt.
 * The first read and search are free. Continued use and partnership start with a conversation.
 */
export const freeBoard = {
  text: 'The trial gives you a review of your website, your first search with its email drafts and one read of your market.',
};
export interface WayOn { slug: 'subscription' | 'partnership'; name: string; text: string; link?: { href: string; label: string } }
export const waysOn: WayOn[] = [
  { slug: 'subscription', name: 'Keep using Traction', text: 'Your mailbox connected, so replies land on each person’s record. A market read each day you ask. Analytics on your own app. We’re happy to give you a quote for the level of integration you want.', link: { href: continuedUseHref, label: 'Ask for a quote →' } },
  { slug: 'partnership', name: 'Work with us', text: 'We can do the customer research and outreach with you. We’ll start with the people you want to reach and agree who does what.', link: { href: partnershipHref, label: 'Explore the partnership →' } },
];

/** The board film: the product doing the work, on Traction's own launch records. */
export const boardFilm = {
  src: '/recordings/traction-board.mp4',
  poster: '/recordings/traction-board-poster.jpg',
  captions: '/recordings/traction-board.vtt',
  label: 'Traction’s board, 47 seconds, narrated, captions on screen: evidence, the next move, a kept promise, the count',
  caption: 'The board at work · 47 s · Traction’s own launch board, real records. Voice and score made with ElevenLabs.',
  text: 'Your app is live. Your customers are real. Here’s how it grows from here. One board holds your evidence, names the one thing in the way, and proposes your next customer move. You decide. It becomes a promise, with an owner and a time. Kept promises carry their result. A missed promise stays in view until it’s recovered. Nothing waits on memory. Gates open on evidence. Never on a date. That’s what moves the count: one kept move at a time. An AI operator prepares every move. You sign it. We run our own launch on this board. From zero. In public. Yours starts with a first read. Ask for one.',
};


/** What Orchestra offers, Traction first. One list for the home. */
/** A link with `introduce` opens the shared enquiry dialog as the Traction door, asking for the app. */
export interface Service { slug: string; eyebrow: string; name: string; text: string; links: { href: string; label: string; primary?: boolean; situation?: string; introduce?: boolean }[] }
export const services: Service[] = [
  { slug: 'traction', eyebrow: '01 · Traction', name: 'Find your next customers.', text: 'A growth team for your app. Start with a trial: a first impression of your app, your own board and an AI Growth Manager proposing your first customer move. Continue with a subscription, or bring us in for the customer work.', links: [{ href: '/traction', label: 'Explore Traction', primary: true }, { href: partnershipHref, label: 'How we work with you' }] },
  { slug: 'orchestra-os', eyebrow: '02 · Orchestra OS', name: 'Embed your app on Orchestra OS.', text: 'Bring your app, or build it with us. Connect engineering, hosting, security maintenance and customer support, with growth work coordinated through Traction. We agree the scope and verify each connection with you.', links: [{ href: '/os', label: 'Explore Orchestra OS', primary: true }] },
];
