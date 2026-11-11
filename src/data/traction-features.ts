/**
 * How Traction works, told in the order a founder lives it, which is the order of the film on the start page: day one
 * (the review, the people, the emails), then every week after (the plan, the market, the results). The first five steps
 * carry the film's chapter ids and titles, so the picture and the words tell one story; Results is the one step the
 * film does not show yet.
 *
 * Each line was checked against the Traction app and its engine. The review in the HD workspace
 * (.growth/content/reviews/2026-11-11-traction-features-review.md) says what each one rests on and where a board a
 * founder starts today falls short of it. A step's own text is true for every reader and what only the subscription
 * does stays on its subscription line; Results is the exception, since Analytics runs on a connected board only.
 * No price, no term, no trial length. The search prepares outreach; only a reply confirms interest, so nothing here
 * says a business needs the app or would buy it.
 *
 * Each `id` is an address on the page that answers how Traction works: /traction/how-it-works#<id>. A door on the board
 * can open the step it stands beside, so the ids only change together with those doors. The words live on their own
 * page, because a section behind an anchor has no title or snippet of its own in search.
 */
export interface Step { id: string; name: string; title: string; text: string; free?: string; subscription?: string }

export const tiers = { free: 'Free to start', subscription: 'With the subscription' };
export const howItWorksHref = '/traction/how-it-works';

/** Day one, free: what a founder has on their board within minutes of signing up. */
export const dayOne: Step[] = [
  {
    id: 'read',
    name: 'Fresh eyes',
    title: 'It reads your app like a new customer.',
    text: 'Your Growth Manager reads your public pages and says what works, what’s in the way and the move to make first. Each finding links to the pages it came from, so you can check it. It also names your market and the audience your pages point to.',
    free: 'A review of your website, the day you sign up.',
  },
  {
    id: 'customers',
    name: 'Customers',
    title: 'It finds people your app could help.',
    text: 'Ask your Growth Manager for possible buyers or for investors. It reads their own pages and comes back with up to five, each with the public evidence that they may fit. A public page suggests a fit; only a reply confirms interest.',
    free: 'Your first search: up to five prospects or investors.',
  },
  {
    id: 'email',
    name: 'Email',
    title: 'It writes to each, in your voice.',
    text: 'A first email for each, signed with your name, opening on a line from their own page. You read each one and decide. Approve them and they go to the CRM on your board with their drafts. Nothing leaves without your click.',
    free: 'Each draft opens in your own mail app, or copies in one click. You send it yourself.',
    subscription: 'Your mailbox connected to the board: each email leaves from your address on your click, a reply lands on that person’s record, and a follow-up comes due a week later if they don’t answer.',
  },
];

/** Every week after: the work that keeps going once the first emails are out. */
export const after: Step[] = [
  {
    id: 'plan',
    name: 'Plan',
    title: 'Ask in a sentence. Get a plan.',
    text: 'Tell your Growth Manager what you want, with a date. It comes back with a plan to your date and waits for your yes. Tell it what happened, and it works out what comes next from what’s on your board.',
  },
  {
    id: 'market',
    name: 'Market',
    title: 'It keeps up with your market.',
    text: 'Intel reads about fifteen sources for the market your pages named. You get each story once, with the outlets that carry it, beside your own work. Your Growth Manager then proposes up to three moves, each answering one story, with why now, your part and what will show it’s done. Take one and it becomes an initiative on your board.',
    free: 'One read of your market.',
    subscription: 'One fresh read a day.',
  },
  {
    id: 'results',
    name: 'Results',
    title: 'Analytics matches your numbers to your initiatives.',
    text: 'Visitors, trials and paying customers, each with its source and how fresh it is. Every initiative is marked on the same line, so you can measure the return on each one and put your effort where it pays.',
    subscription: 'Analytics connected to your own app.',
  },
];

export const steps: Step[] = [...dayOne, ...after];

export const featuresIntro = {
  label: 'What it does',
  title: 'The growth team your app doesn’t have yet.',
  line: 'Dedicated to the growth of your app.',
  text: 'A whole team comes together around your app, to propose each move and track it on your board. Each proposal starts from what your own pages say and what moved in your market. It’s an AI team and you lead it: you decide each move, and nothing is sent without you. We run Traction’s own launch on it.',
  dayOne: 'Day one',
  after: 'Every week after',
  again: 'Then the next move, from what you learned.',
};

/** The page that answers one question: how does Traction work? Its title and first heading say so. */
export const howItWorks = {
  eyebrow: 'Traction · How it works',
  title: 'How Traction works',
  lead: 'Traction reviews your website on day one, finds people it could help and drafts your first emails. Then it works with you every week: a plan, your market, your results. Each step says what the free start includes and what the subscription adds.',
  all: 'How Traction works, step by step →',
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
