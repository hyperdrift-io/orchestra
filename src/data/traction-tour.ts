import { freeBoard } from '@/data/traction-offer';

/**
 * The tour beside the promise on /traction: Traction itself, recorded in Chrome on 5 November 2026 and framed chapter
 * by chapter (`public/traction/tour/<id>.mp4`, poster `<id>.jpg`). Read's ending, Customers and Email replay that day's
 * saved research on the corrected screens (app f8916f7, engine 73d95b6a), with no new model or search call; their label
 * says so.
 *
 * The app it reads is one of ours, Next Role, renamed Yourapp at yourapp.example so a founder sees their own app in
 * its place. Every other line on screen is what the engine wrote about those pages. The businesses the search found
 * are real, so their names, reasons, addresses and pages are blurred before a frame is taken. The market is Intel's
 * read on Traction's own board. Waits are cut, and the clip says how long each one took. Method, footage and edit:
 * `.growth/traction/launch/tour-film/`. A new recording replaces the clips, the counts and the date together.
 */

export type TourChapter = {
  id: 'read' | 'customers' | 'email' | 'plan' | 'market';
  /** Which line under the picture tells where the footage comes from. */
  label: 'recorded' | 'replayed' | 'market';
  name: string;
  title: string;
  line: string;
};

export const tour = {
  chapters: [
    { id: 'read', label: 'replayed', name: 'Read', title: 'It reads your app like a new customer.', line: 'What works, what’s in the way and the move to make first, each from your own pages.' },
    { id: 'customers', label: 'replayed', name: 'Customers', title: 'One tap researches five prospects.', line: 'Businesses chosen from what their own pages say, each with the line it was chosen on.' },
    { id: 'email', label: 'replayed', name: 'Email', title: 'The first email, in your voice.', line: 'Approve, and they’re in your CRM. Nothing leaves without your click.' },
    { id: 'plan', label: 'recorded', name: 'Plan', title: 'Ask in a sentence. Get a plan.', line: 'The Growth Manager drafts the work to your deadline. It starts when you approve it.' },
    { id: 'market', label: 'market', name: 'Market', title: 'Your market, read every day.', line: 'Each story once, with its source, so you see what changed.' },
  ] satisfies TourChapter[],
  clip: (id: TourChapter['id']) => `/traction/tour/${id}.mp4`,
  poster: (id: TourChapter['id']) => `/traction/tour/${id}.jpg`,
  end: { title: 'Yours is next.', line: freeBoard.text },
  /** The close: what the founder did against what Traction did in this recording. */
  ledger: {
    you: [
      { count: 1, label: 'short form: name, email, app address' },
      { count: 2, label: 'clicks' },
      { count: 1, label: 'sentence' },
    ],
    traction: [
      { count: 3, label: 'pages of the app read' },
      { count: 8, label: 'web pages read for the research' },
      { count: 5, label: 'prospects researched, each with its reason' },
      { count: 5, label: 'first emails written, one per business' },
      { count: 1, label: 'plan to approve' },
      { count: 4, label: 'days of the market read' },
    ],
  },
  labels: {
    recorded: 'Recorded in Traction on 5 November 2026 · one of our apps, renamed Yourapp · businesses blurred',
    replayed: 'A 5 November 2026 run, replayed on today’s Traction screens · one of our apps, renamed Yourapp · businesses blurred',
    market: 'Recorded on Traction’s own board on 5 November 2026',
    end: 'Every count is from this recording',
    yourPart: 'Your part',
    itsPart: 'Traction’s part',
    play: 'Play the tour',
    pause: 'Pause the tour',
    again: 'Watch again',
    chapters: 'Chapters of the tour',
    clip: (name: string, title: string) => `${name}: ${title}`,
  },
};
