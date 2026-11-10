/**
 * What Traction does, as one loop: the first read of the founder's website, then six steps that end where they began.
 * Each line was checked against the Traction app and its engine. The review in the HD workspace
 * (.growth/content/reviews/2026-11-11-traction-features-review.md) says what each one rests on and where a board a
 * founder starts today falls short of it. A step's own text is true for every reader and what only the subscription
 * does stays on its subscription line; step 05 is the exception, since Analytics runs on a connected board only.
 * No price, no term, no trial length. The search prepares outreach; only a reply
 * confirms interest, so nothing here says a business needs the app or would buy it.
 *
 * Each `id` is an address on the page that answers how Traction works: /traction/how-it-works#<id>. A door on the board
 * can open the step it stands beside, so the ids only change together with those doors. The start page shows the same
 * steps as pictures, under the same names and in the same order (`name`, `picture`); the words live on their own page,
 * because a section behind an anchor has no title or snippet of its own in search.
 */
/** What the start page shows for a step: a clip of the board, a still, or nothing yet. `kept` says where it came from. */
export interface StepPicture { clip?: string; poster?: string; kept: string }
export interface LoopStep { id: string; name: string; title: string; text: string; free?: string; subscription?: string; picture: StepPicture }

export const howItWorksHref = '/traction/how-it-works';
const example = 'Example data', still = 'Preview still', toRecord = 'To record on our own board';

export const tiers = { free: 'Free to start', subscription: 'With the subscription' };

/** Before the loop: the read every other part starts from. */
export const firstRead: LoopStep = {
  id: 'first-read',
  name: 'First read',
  picture: { poster: '/traction/in-action/preview/first-read.jpg', kept: still },
  title: 'It reads your website like a new customer.',
  text: 'Your first read says what works, what’s in the way and the move to make first. Each finding links to the pages it came from, so you can check it. It also names your market and the audience your pages point to. The loop starts from there.',
  free: 'A first read of your website.',
};

export const loop: LoopStep[] = [
  {
    id: 'intel',
    name: 'Intel',
    picture: { poster: '/traction/in-action/preview/intel.jpg', kept: still },
    title: 'Intel reads your market.',
    text: 'It reads about fifteen sources. You get each story once, with the outlets that carry it, on your board beside your own work.',
    free: 'One read of your market.',
    subscription: 'One fresh read a day.',
  },
  {
    id: 'growth-manager',
    name: 'The move',
    picture: { poster: '/traction/in-action/preview/intel.jpg', kept: still },
    title: 'Your Growth Manager turns a story into a move.',
    text: 'After each market read it proposes up to three moves, with your first read in hand. Each answers one story and comes with why now, your part and what will show it’s done. Take one and it becomes an initiative on your board. When no story calls for a move, it says so.',
  },
  {
    id: 'research',
    name: 'Research',
    picture: { clip: '/traction/in-action/customers.mp4', poster: '/traction/in-action/customers.jpg', kept: example },
    title: 'It researches who to reach and drafts the first email.',
    text: 'Ask your Growth Manager for possible buyers or for investors. It reads their own pages and comes back with up to five, each with the public evidence that they may fit and a first email, signed with your name, that opens on a line from their page. Approve them and they go to the CRM on your board with their drafts. A public page suggests a fit; only a reply confirms interest.',
    free: 'Your first search: up to five prospects or investors, each with a draft.',
  },
  {
    id: 'mailbox',
    name: 'Your email',
    picture: { kept: toRecord },
    title: 'You send each email, from your own address.',
    text: 'You read each draft and decide. Nothing leaves without your click.',
    free: 'Each draft opens in your own mail, ready to send.',
    subscription: 'Your mailbox connected to the board: each email leaves from your address on your click, a reply lands on that person’s record, and a follow-up comes due a week later if they don’t answer.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    picture: { clip: '/traction/in-action/value.mp4', poster: '/traction/in-action/value.jpg', kept: example },
    title: 'Analytics matches your numbers to your initiatives.',
    text: 'Visitors, trials and paying customers, each with its source and how fresh it is. Every initiative is marked on the same line, so you can measure the return on each one and put your effort where it pays.',
    subscription: 'Analytics connected to your own app.',
  },
  {
    id: 'next-move',
    name: 'Next move',
    picture: { clip: '/traction/in-action/firstuse.mp4', poster: '/traction/in-action/firstuse.jpg', kept: example },
    title: 'Then the next move.',
    text: 'Tell your Growth Manager what happened, ask what comes next, and it answers from what’s on your board.',
  },
];

export const featuresIntro = {
  label: 'What it does',
  title: 'The growth team your app doesn’t have yet.',
  line: 'Dedicated to the growth of your app.',
  text: 'A whole team comes together around your app, to propose each move and track it on your board. Each proposal starts from what your own pages say and what moved in your market. It’s an AI team and you lead it: you decide each move, and nothing is sent without you. We run Traction’s own launch on it.',
  start: 'The start',
  loop: 'The loop',
  again: 'Back to 01, with what you learned.',
};

/** The page that answers one question: how does Traction work? Its title and first heading say so. */
export const howItWorks = {
  eyebrow: 'Traction · How it works',
  title: 'How Traction works',
  lead: 'Traction reads your website, then works in a loop of six steps, from your market to your next move. Each step says what the free start includes and what the subscription adds.',
  more: 'How this step works →',
  all: 'How Traction works, step by step →',
  steps: 'How Traction works, step by step',
  pause: 'Pause',
  play: 'Play',
  door: 'Make Traction work for you, now.',
  doorNote: 'Your first search is free. Sign up with your name, website and email, then a passkey. Your board opens in a minute.',
  back: 'Back to your board →',
  discuss: 'Discuss the next step →',
};

/** The three pages about Traction, shown as one row on each of them. */
export const tractionPages = [
  { id: 'overview', label: 'Overview', href: '/traction' },
  { id: 'how', label: 'How it works', href: howItWorksHref },
  { id: 'partnership', label: 'Work with us', href: '/traction/partnership' },
] as const;

