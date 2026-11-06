import { freeBoard } from '@/data/traction-offer';

/**
 * The film on /traction: Traction itself as one continuous video (`public/traction/tour/film.mp4`, a 720p copy for
 * narrow screens, poster `film.jpg`). It opens on a question, plays five chapters of the real app, then closes on what
 * each side did, "Make Traction work for you, now." and the page's own door, laid over the film's last frame.
 *
 * Read, Customers and Email replay a 5 November 2026 run on the corrected screens (app f8916f7, engine 73d95b6a) with no
 * new model or search call; Plan was recorded that day; Market is Traction's own board on 6 November, its strip opening
 * on the day its market read began (Traction 90fdfd5). The app it reads is one of ours, Next Role, renamed Yourapp at
 * yourapp.example. The businesses the search found are real, so their names, reasons, addresses and pages are blurred.
 * Waits are cut and the film says how long each took. Method, footage and edit: `.growth/traction/launch/tour-film/`
 * (`film.json`, `render-film.mjs`). A new render replaces the file, the chapter starts and the door's box together.
 */

export type TourChapter = {
  id: 'read' | 'customers' | 'email' | 'plan' | 'market';
  /** Seconds into the film. */
  start: number;
  /** Which line under the picture says where the footage comes from. */
  label: 'recorded' | 'replayed' | 'market';
  name: string;
  title: string;
  line: string;
};

export const tour = {
  src: '/traction/tour/film.mp4',
  /** The same film at 720p, for screens where the picture is narrow. */
  small: '/traction/tour/film-720.mp4',
  poster: '/traction/tour/film.jpg',
  duration: 55.96,
  /** The question the film opens on, before the first chapter. */
  opening: { title: 'One app that needs to meet its market?', line: 'See Traction in action: one of our apps, from its sign-up to its market.' },
  chapters: [
    { id: 'read', start: 4.05, label: 'replayed', name: 'Read', title: 'It reads your app like a new customer.', line: 'What works, what’s in the way and the move to make first, each from your own pages.' },
    { id: 'customers', start: 13.03, label: 'replayed', name: 'Customers', title: 'One tap researches five prospects.', line: 'Businesses chosen from what their own pages say, each with the line it was chosen on.' },
    { id: 'email', start: 23.87, label: 'replayed', name: 'Email', title: 'The first email, in your voice.', line: 'Approve, and they’re in your CRM. Nothing leaves without your click.' },
    { id: 'plan', start: 31.84, label: 'recorded', name: 'Plan', title: 'Ask in a sentence. Get a plan.', line: 'The Growth Manager drafts the work to your deadline. It starts when you approve it.' },
    { id: 'market', start: 39.65, label: 'market', name: 'Market', title: 'Your market, read every day.', line: 'On Traction’s own board: one tile a day since its market read began, each story with its source.' },
  ] satisfies TourChapter[],
  /** When the close starts: what each side did, then the line and the door. */
  close: 48.96,
  /** Where the door shows in the last frame, as fractions of the frame, and when: the page lays its own link over it. */
  door: { at: 51.86, left: 0.3108, top: 0.679, width: 0.3784, height: 0.0611 },
  end: { title: 'Make Traction work for you, now.', line: freeBoard.text },
  /** The close, in words: what the founder did against what Traction did in this recording. */
  ledger: {
    you: [
      { count: 1, label: 'short form: name, app address, email' },
      { count: 2, label: 'clicks' },
      { count: 1, label: 'sentence' },
    ],
    traction: [
      { count: 3, label: 'pages of your app read' },
      { count: 8, label: 'web pages read for the research' },
      { count: 5, label: 'prospects researched, each with its evidence' },
      { count: 5, label: 'first emails, one per business' },
      { count: 1, label: 'plan, waiting for your yes' },
      { count: 6, label: 'days of market news, on its own board' },
    ],
  },
  labels: {
    film: 'Traction in action: one of our apps, renamed Yourapp, from its sign-up to its market',
    recorded: 'Recorded in Traction on 5 November 2026 · one of our apps, renamed Yourapp · businesses blurred',
    replayed: 'A 5 November 2026 run, replayed on today’s Traction screens · one of our apps, renamed Yourapp · businesses blurred',
    market: 'Traction’s own board, recorded on 6 November 2026 · stories from Intel’s daily brief',
    end: 'Every count is from this recording',
    yourPart: 'Your part',
    itsPart: 'Traction’s part',
    play: 'Play the film',
    pause: 'Pause the film',
    again: 'Watch again',
    chapters: 'Chapters of the film',
  },
};
