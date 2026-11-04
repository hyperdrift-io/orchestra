/**
 * The Traction offer: Traction is the board, the Traction Partnership is the work done with a founder on it.
 * Shared offer facts, sample read and recordings. A first read comes with every free board.
 */

/** The public example board on Traction: Slotbloom, an invented startup, opened on its tour's intro card. */
export const exampleBoardHref = 'https://traction.hyperdrift.io/example/studio-example?tour';
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

/** `headline` is the finding in one sentence, also shown beside the offer; `detail` is the rest as the founder receives it. */
export interface Finding { label: string; headline: string; detail: string; evidence: string[] }

/**
 * A real first read, run on Hyperdrift's own portal so no partner data goes public.
 * Public surface only, exactly what an outside founder's read starts from.
 */
export const sampleRead = {
  app: 'orchestra.hyperdrift.io',
  readOn: '6 October 2026',
  readFrom: 'Public pages only, as a new visitor meets them',
  findings: [
    {
      label: 'Strength',
      headline: 'A stranger can check everything you show.',
      detail: 'The NextRole card puts a real tool call on your homepage, with its raw inputs and result one click away, and the examples on /work say plainly what they prove and what they don’t. A founder deciding who to trust with their product can check your work before they write to you.',
      evidence: [
        'The homepage NextRole card labels its excerpt “live MCP check, 4 October 2026 · fictional CV and job” and links the full record: endpoint, deployed commit, timings, synthetic inputs and its known limits.',
        '/work names its own limits in place: “This is our own commercial product, not a commissioned client result.” Three of NextRole’s five tools are marked as listed but not exercised.',
        'Four examples on /work can be tried live: Standup, Helm, Radar and Unanswered all answered, each with a public source repository and a build write-up.',
      ],
    },
    {
      label: 'Constraint',
      headline: 'The way in is a written brief and a wait, and a visitor only learns that at the foot of the page.',
      detail: 'On a phone the enquiry form sits five and a half screens down, below the illustrated scenario. Next step: put the first exchange in the first screen, what a visitor sends and what comes back, and make the ask as small as a link to their product.',
      evidence: [
        'First screen, laptop: the headline, an illustrative scenario and one header link, “Discuss your next stage”. Nothing in view says what happens after a visitor acts.',
        'Phone, 390 px wide: the first call to action in the page body sits at 1,450 px; the form heading at 4,644 px, on an 844 px screen.',
        'Reply time and engagement length (“One working day”, “2 to 4 weeks, scoped concretely”) appear only beside the form.',
        'The path: name, email and an open brief, all required, then up to a working day’s wait. Before writing it, a visitor gets nothing back about their own business.',
      ],
    },
    {
      label: 'Next customer move',
      headline: 'Offer ten founders who run a live product a written read of it, asking only for the link.',
      detail: 'Do it yourself, with founders you already know: one strength, one constraint and the next customer move, then an offer to scope that move together. It has worked when 3 of the first 10 founders who receive a read ask to take the next step with you.',
      evidence: [
        'Why this move: it tests the constraint with people. Does a smaller ask bring founders in where an open brief doesn’t?',
        'Reading a miss: if fewer than 5 of 10 send their link, reword the offer before anything else. If links arrive but fewer than 3 ask for a next step, their replies say which part of the read to sharpen.',
        'A second signal: one founder agrees to have their read published by name, the first outside result on a portal whose proof is, by its own label, all in-house.',
        'Measured as one row per founder: offered, link sent, read delivered, next step asked for.',
      ],
    },
  ] as Finding[],
  unseen: 'This read never saw the numbers. The site sends analytics events, but they’re private, so it can’t say how many people arrive, start the form or finish it. If most people who start the form finish it and very few arrive at all, the constraint moves to being found. The search check used a public index, not Google’s own data. With read-only access to the funnel and Search Console, the next read gets sharper.',
  note: 'We ran this read the day before first reads went public, knowing what we were about to launch. Weigh the third finding with that in mind. The evidence behind the first two stands on its own.',
};

/** What every first read looks at, in this order. */
export const readMethod: { name: string; question: string }[] = [
  { name: 'The promise', question: 'In five seconds on a laptop and a phone: who is it for, what can I do now, what happens when I act?' },
  { name: 'The path to value', question: 'Every step from arrival to the first useful result, and what each step asks of the visitor.' },
  { name: 'The proof', question: 'What a stranger can inspect for themselves, and whether each claim is backed where it is made.' },
  { name: 'Being found', question: 'How people, search engines, answer engines and agents reach it and describe it.' },
  { name: 'Measurement', question: 'Whether the next move could be measured with what the app already collects.' },
  { name: 'Reliability', question: 'Errors, broken links, slow media and phone layouts that stop someone halfway.' },
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
