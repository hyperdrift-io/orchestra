import { freeBoard } from '@/data/traction-offer';

/**
 * The film on /traction: Traction itself as one continuous video (`public/traction/tour/film.mp4`, a 720p copy for
 * narrow screens, poster `film.jpg`). It opens on a question and the five pieces of work an app needs around it, plays
 * five narrated chapters of the real app at reading pace, one per piece, then closes on what each side did, "Make
 * Traction work for you, now." and the page's own door, laid over the film's last frame. `says` is the narration the
 * film carries, so a narrow screen or a screen reader gets it under the picture.
 *
 * Read, Customers and Email replay a 5 November 2026 run on the corrected screens (app f8916f7, engine 73d95b6a) with no
 * new model or search call; Plan was recorded that day; Market is Traction's own board on 6 November, its strip opening
 * on the day its market read began (Traction 90fdfd5). The app it reads is one of ours, Next Role, renamed Yourapp at
 * yourapp.example, and every sentence naming its field is blurred, so a founder from any field sees their own app in it.
 * The businesses the search found are real, so their names, reasons, addresses and pages are blurred too.
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
  /** The film's narration in this chapter: each line and the second it appears. */
  says: { at: number; text: string }[];
};

export const tour = {
  src: '/traction/tour/film.mp4',
  /** The same film at 720p, for screens where the picture is narrow. */
  small: '/traction/tour/film-720.mp4',
  poster: '/traction/tour/film.jpg',
  duration: 147.04,
  /** The question the film opens on, before the first chapter. */
  opening: { title: 'One app that needs to meet its market?', line: 'Every week, on top of building it. See Traction in action on one of our apps, from its sign-up to its market.' },
  chapters: [
    { id: 'read', start: 11.4, label: 'replayed', name: 'Read', title: 'It reads your app like a new customer.',
      line: 'What works, what’s in the way and the move to make first, each from your own pages.',
      says: [{ at: 15.1, text: 'Three fields and a passkey. Nothing to install or connect.' }, { at: 19.68, text: 'Your board opens, and your Growth Manager starts reading your app.' }, { at: 26.64, text: 'Your first read: what works, what’s in the way, and the move to make first.' }, { at: 31.24, text: 'Each finding quotes your own pages, so you can check it.' }, { at: 35.94, text: 'The first move uses words your site already has.' }, { at: 40.24, text: 'Then your Growth Manager proposes the next step. You choose.' }] },
    { id: 'customers', start: 43.97, label: 'replayed', name: 'Customers', title: 'It finds people your app could help.',
      line: 'Businesses chosen from what their own pages say, each with the line it was chosen on.',
      says: [{ at: 47.07, text: 'One click starts the research: five prospects who may need your app.' }, { at: 51.25, text: 'It reads the web for businesses whose own pages show the need.' }, { at: 56.71, text: 'Five found. A public page suggests a fit; only a reply confirms interest.' }, { at: 64.69, text: 'Each with the line from its own site that shows the fit.' }] },
    { id: 'email', start: 69.98, label: 'replayed', name: 'Email', title: 'It writes to each, in your voice.',
      line: 'Approve, and they’re in your CRM with their drafts. Nothing leaves without your click.',
      says: [{ at: 73.48, text: 'A first email for each, in your voice and signed with your name.' }, { at: 80.82, text: 'You read it. You decide.' }, { at: 84.64, text: 'Approve, and all five go to your CRM with their drafts. Nothing is sent without you.' }] },
    { id: 'plan', start: 89.75, label: 'recorded', name: 'Plan', title: 'Ask in a sentence. Get a plan.',
      line: 'The Growth Manager drafts the work to your deadline. It starts when you approve it.',
      says: [{ at: 93.25, text: 'Want more? Tell your Growth Manager in one sentence, with a date.' }, { at: 99.83, text: 'It comes back with a plan to your date, and waits for your yes.' }, { at: 106.04, text: 'Then it follows your app every day. Tell it what happened, and it works out what comes next.' }] },
    { id: 'market', start: 110.14, label: 'market', name: 'Market', title: 'It keeps up with your market.',
      line: 'On Traction’s own board: one tile a day since its market read began, each story with its source.',
      says: [{ at: 113.44, text: 'Your market, one read a day. Here, on Traction’s own board.' }, { at: 117.04, text: 'One tile a day since its market read began. Pick a day to see what moved.' }, { at: 124.93, text: 'Each story with its source and the words it quotes, so you can check it.' }, { at: 129.73, text: 'And what changed since yesterday, before you choose the next move.' }] },
  ] satisfies TourChapter[],
  /** When the close starts: what each side did, then the line and the door. */
  close: 134.54,
  /** Where the door shows in the last frame, as fractions of the frame, and when: the page lays its own link over it. */
  door: { at: 140.14, left: 0.3108, top: 0.679, width: 0.3784, height: 0.0611 },
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
    replayed: 'A 5 November 2026 run, replayed on today’s Traction screens · one of our apps, renamed Yourapp · its field and the businesses blurred',
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
