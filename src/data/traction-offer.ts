/**
 * The Traction offer: Traction is the board, the Traction Partnership is the work done with a founder on it.
 * Shared offer facts and the board film. A first read comes with every free board.
 */

/** The block on /traction that says how the free board continues; a free board links here with `?from=<app id>`. */
export const continueHref = '/traction#continue';
/** How we work with a founder: the page that answers the question prospects ask first. */
export const partnershipHref = '/traction/partnership';
/** Traction itself; TRACTION_URL points a local preview at a local Traction. */
const tractionOrigin = () => process.env.TRACTION_URL || 'https://traction.hyperdrift.io';
/** Free sign-up on Traction; an invitation's opaque reference rides along. TRACTION_START_URL still overrides the whole address for a local preview. */
export const startHref = (from?: string) => `${process.env.TRACTION_START_URL || `${tractionOrigin()}/start`}${from ? `?from=${from}` : ''}`;
/** A founder's own board, by its app id, validated before it gets here. */
export const boardHref = (app: string) => `${tractionOrigin()}/app/${app}`;

/**
 * The offer after day one, defined once for the home card, /traction, the invitation page and llms.txt.
 * Day one is free; then two ways on. Neither is sold on a page: the subscription is taken inside Traction, where its price is shown;
 * the Partnership starts with a conversation. No price, term or count anywhere here.
 */
export const freeBoard = {
  text: 'Day one: a first read of your app, your own board, and the Growth Manager proposing your first customer move. Free.',
};
export interface WayOn { slug: 'subscription' | 'partnership'; name: string; text: string; link?: { href: string; label: string } }
export const waysOn: WayOn[] = [
  { slug: 'subscription', name: 'A subscription', text: 'The Growth Manager works your board every day: moves prepared and sent from your mailbox with your yes, replies and readings back on the board, and the next move from what happened. You see the price on your board before you pay anything.' },
  { slug: 'partnership', name: 'The Traction Partnership', text: 'We do the customer work with you, move by move, to paying customers, on the same board. It starts with a conversation.', link: { href: partnershipHref, label: 'How we work with you →' } },
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
  { slug: 'traction', eyebrow: '01 · Traction', name: 'Find your next customers.', text: 'A growth partner for your app. Start free: a first read of your app, your own board and an AI Growth Manager proposing your first customer move. Continue with a subscription, or bring us in for the customer work.', links: [{ href: '/traction', label: 'Explore Traction', primary: true }, { href: partnershipHref, label: 'How we work with you' }] },
  { slug: 'orchestra-os', eyebrow: '02 · Orchestra OS', name: 'Embed your app on Orchestra OS.', text: 'Bring your app, or build it with us. Connect engineering, hosting, security maintenance and customer support, with growth work coordinated through Traction. We agree the scope and verify each connection with you.', links: [{ href: '/os', label: 'Explore Orchestra OS', primary: true }] },
];
