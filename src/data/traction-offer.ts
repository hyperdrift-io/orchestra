/**
 * The Traction offer: Traction is the board, the Traction Partnership is the work done with a founder on it.
 * Three steps, each earning the next. One source for the home section, /partnership and the sample read.
 */

export interface OfferStep { name: string; gets: string; who: string; link: { href: string; label: string } }

export const offerSteps: OfferStep[] = [
  {
    name: 'A first read',
    gets: 'Send us your live app. We read it the way a new customer meets it and come back with one strength, one constraint and the next customer move.',
    who: 'Prepared by our AI operator. Read and signed by Yann VR.',
    link: { href: '/traction/first-read', label: 'Read a sample first read' },
  },
  {
    name: 'Your board',
    gets: 'If the read is useful, your app goes on Traction and the read becomes its first record. Customers, promises and results sit on one board, and it proposes the next move from the evidence.',
    who: 'You own the customer work. We set up the board, connect your evidence and keep the record honest, misses included.',
    link: { href: '/work#work-traction', label: 'Watch the board' },
  },
  {
    name: 'The partnership',
    gets: 'When the board shows people using, buying or asking for more, we build the next improvement with you and measure it on the same board.',
    who: 'You bring the customers. We bring the AI engineering.',
    link: { href: '/partnership', label: 'How the partnership works' },
  },
];

/** Where a founder asks for their own read: the launch page's enquiry, preset to a first read. */
export const firstReadHref = '/traction#contact';

/** `headline` is the finding in one sentence, also shown beside the offer; `detail` is the rest as the founder receives it. */
export interface Finding { label: string; headline: string; detail: string; evidence: string[] }

/**
 * A real first read, run on Hyperdrift's own portal so no partner data goes public.
 * Public surface only, exactly what an outside founder's read starts from.
 */
export const sampleRead = {
  app: 'ai.hyperdrift.io',
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
