import { freeBoard } from '@/data/traction-offer';

/**
 * The tour beside the promise on /traction, from real runs on 4 November 2026.
 *
 * Day one is Traction on Next Role, one of our own apps: the read of nextrole.site, the businesses the customer
 * search found and the email it drafted, word for word as the engine wrote them. The plan and the market are records
 * from Traction's own board the same day. The businesses found are real people and firms, so their names stay out
 * of this file: `{name}` marks each place one was taken out, and no other name stands in for it. The send is
 * simulated, and the tour says so.
 *
 * `board` holds Traction's own interface words (commander `src/lib/day-one-copy.ts`); keep them in step.
 * A rerun replaces the run's lines and counts together; the method is in `.growth/traction/launch/tour/`.
 */

export const board = {
  addressLabel: 'Your app’s address',
  reading: (product: string) => `Reading ${product}`,
  readTitle: (product: string) => `A first read of ${product}`,
  readSources: 'Read on',
  gmOpening: (product: string, headline: string) => `I’ve read ${product}. The move I’d make first: ${headline.replace(/[.\s]+$/, '')}.`,
  gmBuyer: (buyer: string) => `Who buys: ${buyer.replace(/[.\s]+$/, '')}.`,
  gmOffer: 'Two moves I can run now. Each finds five from their own pages, with the line that shows why, and writes the first email in your voice. Nothing leaves without your click.',
  offers: {
    customers: { button: 'Find five customers', line: 'Businesses that show the need on their own pages.' },
    investors: { button: 'Find five investors', line: 'Funds whose own pages back your market and stage.' },
  },
  progress: {
    plan: 'Working out who to look for.',
    search: (query: string) => `Searching for “${query}”.`,
    rank: (n: number) => `Read ${n} pages. Choosing the ones that show the need.`,
    addresses: (n: number) => `${n} chosen. Finding the address each one publishes.`,
  },
  pipeline: { found: 'Found', onBoard: 'In your CRM', sent: 'Sent', replied: 'Replied', yes: 'Said yes' },
  approve: 'Approve: put them in my CRM',
  gmApproved: (withAddress: number) => `In your CRM. ${withAddress} have a public address: send the first email from your own mailbox. Nothing leaves without this click.`,
  send: (n: number) => `Send ${n} from my mailbox`,
  gmSent: (n: number) => `Sent ${n} from your mailbox. Each follow-up is due on your board in a week if they don’t reply; replies land on their record and move them along.`,
  sentLabel: 'Sent',
  draft: 'First email, in your voice',
  trialBadge: 'Free trial',
  planReady: 'Ready to start?',
  approveStart: 'Approve and start',
  notNow: 'Not now',
  intelTitle: 'Intel reads your market every day',
  replyClasses: ['Interested', 'Question', 'Not now', 'No', 'Referral'],
};

export type TourChapter = {
  id: 'read' | 'customers' | 'email' | 'send' | 'plan' | 'market';
  board: 'trial' | 'continued';
  name: string;
  title: string;
  line: string;
};

export const tour = {
  app: { name: 'Next Role', address: 'nextrole.site' },
  boards: {
    trial: { name: 'Next Role', badge: board.trialBadge },
    continued: { name: 'Traction', badge: '' },
  },
  groups: [
    { label: 'Day one, free', board: 'trial' as const },
    { label: 'Continued', board: 'continued' as const },
  ],
  chapters: [
    { id: 'read', board: 'trial', name: 'Read', title: 'It reads your app like a new customer.', line: 'About a minute later: what works, what’s in the way, and the move to make first, each from your own pages.' },
    { id: 'customers', board: 'trial', name: 'Customers', title: 'One tap finds who needs it now.', line: 'Businesses that show the need on their own pages, each with the line that proves it.' },
    { id: 'email', board: 'trial', name: 'Email', title: 'The first email, in your voice.', line: 'It opens on something from their own page. Nothing leaves without your click.' },
    { id: 'send', board: 'trial', name: 'Send', title: 'Sent from your own address.', line: 'Replies land on each person’s record. If they don’t reply, the follow-up is due a week later.' },
    { id: 'plan', board: 'continued', name: 'Plan', title: 'Ask in a sentence. Get a plan with dates.', line: 'The Growth Manager drafts the work. It starts when you approve it.' },
    { id: 'market', board: 'continued', name: 'Market', title: 'Your market, read every day.', line: 'Each story once, with its source, so you see what changed.' },
  ] satisfies TourChapter[],
  end: { title: 'Yours is next.', line: freeBoard.text },
  labels: {
    trial: 'A real run on Next Role, one of our apps · 4 November 2026 · businesses’ names hidden',
    continued: 'Real records from Traction’s own board · 4 November 2026',
    end: 'Every count is from these runs',
    fromTheirPage: 'From their page',
    simulated: 'Simulated send',
    replies: 'Replies are sorted',
    you: 'You',
    yourPart: 'Your part',
    itsPart: 'Traction’s part',
    play: 'Play the tour',
    pause: 'Pause the tour',
    again: 'Watch again',
    chapters: 'Chapters of the tour',
  },
  read: {
    seconds: 33,
    pages: ['nextrole.site', 'nextrole.site/about', 'nextrole.site/faq'],
    buyer: 'Job seekers with an existing CV, when they need to reshape their experience for a specific role.',
    findings: [
      { label: 'Strength', headline: 'Tailoring that keeps your experience true', sources: ['nextrole.site/faq'] },
      { label: 'In the way', headline: 'The home page hides the first try', sources: ['nextrole.site', 'nextrole.site/faq'] },
      { label: 'Next customer move', headline: 'Make the free preview the home page’s first action', sources: ['nextrole.site', 'nextrole.site/faq'] },
    ],
  },
  customers: {
    seconds: 80,
    query: 'career coaches London',
    pagesRead: 8,
    found: [
      { who: 'Head of outplacement services', nameLength: 12, address: true, why: 'The page offers paid support packages covering CV writing, interview preparation and job hunting, making it a potential buyer of tools for its consultants and clients.' },
      { who: 'Career coach', nameLength: 10, why: 'Her page describes clients facing lengthy applications and applying for jobs for months without success.' },
      { who: 'Career coach', nameLength: 11, why: '{name} offers a one-to-one career change programme with a concrete action plan, making her a potential buyer of tools that support clients moving into new careers.' },
      { who: 'Life and career coach', nameLength: 9, why: '{name} works with career changers worldwide online and offers a four-month {name}, making her a potential buyer of tools for those clients.' },
      { who: 'Career coach', nameLength: 13, address: true, why: 'The business offers one-to-one career change coaching and a self-guided membership, making {name} a potential buyer of tools to support clients pursuing a new career.' },
    ],
  },
  email: {
    who: 'Career coach',
    subject: 'Tailoring clients’ CVs',
    greeting: 'Hello,',
    opening: 'I noticed your page speaks to people who’ve been applying for jobs for months without success.',
    body: [
      'I’m the founder of Next Role. It tailors an existing CV to a specific job using only the applicant’s real experience, so your clients can reshape an application without inventing anything.',
      'Would you try the free preview with one client applying for a role now? No account or setup is needed.',
    ],
    signoff: 'Yann',
  },
  plan: {
    seconds: 40,
    ask: 'Find ten more customers by Sunday.',
    title: 'Prepare ten additional prospects by Sunday 8 November',
    lines: [
      'Give the existing customer-search initiative ten more relevant businesses to approach.',
      'Each record would include dated public evidence of fit, a specific reason to approach now, a verified contact route and a tailored email draft.',
      'Sending remains with Yann after review.',
    ],
  },
  market: {
    topic: 'AI agents that find customers for small businesses and founders',
    days: [
      { date: '4 Nov', headline: 'Banks start packaging AI toolkits for small business customers', outlet: 'americanbanker.com', quote: 'As small businesses’ appetites for AI products grows some banks are launching initiatives to give business owners greater access.' },
      { date: '3 Nov', headline: 'Small business owner publicly rejects AI agents calling local shops', outlet: 'thecooldown.com', quote: '' },
      { date: '2 Nov', headline: 'Meta’s AI ad tools reach almost 10 million advertisers', outlet: 'cnbc.com', quote: '' },
      { date: '1 Nov', headline: 'Wysera launches brand-voice marketing agent with human approval gate', outlet: 'usatoday.com', quote: '' },
    ],
  },
  /** The running count under the window: what the visitor did, and what Traction did, by the chapter it lands in. */
  ledger: {
    you: [
      { at: 'read', key: 'address', count: 1, short: 'address', label: 'app address' },
      { at: 'customers', key: 'clicks', count: 1, short: 'click', label: 'click' },
      { at: 'email', key: 'clicks', count: 2, short: 'clicks', label: 'clicks' },
      { at: 'send', key: 'clicks', count: 3, short: 'clicks', label: 'clicks' },
      { at: 'plan', key: 'sentence', count: 1, short: 'sentence', label: 'sentence' },
    ],
    traction: [
      { at: 'read', key: 'pages', count: 3, short: 'pages read', label: 'pages of the app read' },
      { at: 'customers', key: 'sites', count: 8, short: 'sites read', label: 'businesses’ pages read' },
      { at: 'customers', key: 'found', count: 5, short: 'found', label: 'businesses found, each with its proof' },
      { at: 'email', key: 'emails', count: 5, short: 'emails drafted', label: 'emails drafted, one per business' },
      { at: 'plan', key: 'plan', count: 1, short: 'plan', label: 'plan with dates' },
      { at: 'market', key: 'market', count: 4, short: 'days of market', label: 'days of the market read' },
    ],
  },
  timings: {
    read: '33 seconds',
    customers: '1 min 20 s',
    plan: '40 seconds',
  } as Partial<Record<TourChapter['id'], string>>,
};
