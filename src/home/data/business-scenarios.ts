/** Traction workflows illustrated through HD OS. Capabilities have their own scope and access. */
export interface BusinessStep { name: string; title: string; signal: string; action: string; impact: string; measure: string; }
export interface BusinessScenario { slug: string; audience: string; title: string; context: string; inputs: string[]; outcome: string; steps: BusinessStep[]; }
export const businessScenarios: BusinessScenario[] = [
  {
    slug: 'traction', audience: 'Founders with a working app', title: 'Grow your app with a team behind you.',
    context: 'Traction brings customer research, outreach preparation and market evidence into your next growth move. Your AI Growth Manager coordinates the work. You lead.',
    inputs: ['Your app', 'Customer evidence', 'Your direction'],
    outcome: 'Grow revenue, protect profit and reclaim time.',
    steps: [
      {
        name: 'Research', title: 'Find people your app could help.',
        signal: 'Your app works, but finding relevant customers takes time. You need reasons to approach someone beyond a name on a list.',
        action: 'Your Growth Manager reads your public pages, reviews the customer experience and researches prospects or investors from their own websites.',
        impact: 'In the trial: a website review, a first search of up to five prospects or investors and email drafts, with public sources you can inspect.',
        measure: 'Check the suggested fit and choose whom to contact. A public page suggests fit; a reply confirms interest.',
      },
      {
        name: 'CRM', title: 'Keep the next conversation in context.',
        signal: 'Drafts, replies and follow-ups can end up scattered across your inbox and notes.',
        action: 'The Growth Manager prepares personal email drafts and keeps approved prospects on your board. With a subscription and connected mailbox, emails leave on your click and replies reach each person’s record.',
        impact: 'Prospect records with drafts and next actions. Confirmed replies join the record when your mailbox is connected.',
        measure: 'Review each email. In the trial, send it from your own mail app. Decide who needs a follow-up.',
      },
      {
        name: 'Market', title: 'See which market change deserves your attention.',
        signal: 'News moves quickly. You need to know which change could matter to your app and its customers.',
        action: 'Intel reads sources for your market. Your Growth Manager proposes moves tied to the stories. Trial reads depend on coverage; the subscription provides a fresh read each day you ask.',
        impact: 'A market briefing with its sources and proposed moves you can discuss with your Growth Manager.',
        measure: 'Choose the opportunity worth pursuing. Accept a proposed move to make it an initiative on your board.',
      },
      {
        name: 'Build', title: 'Make the improvement customers need.',
        signal: 'A customer objection or product gap needs more than another task on a list.',
        action: 'The Growth Manager scopes an initiative. Builder delivery is agreed separately: implement the change, run relevant checks and prepare a preview for review.',
        impact: 'An inspectable change linked to its initiative, with the checks performed and any unresolved work.',
        measure: 'Review the preview and authorise the release. Judge delivery and the later customer result separately.',
      },
      {
        name: 'Analytics', title: 'See what happened after the work.',
        signal: 'You have shipped a change or contacted prospects. You need to see whether customer behaviour changed.',
        action: 'On a subscription with Analytics connected to your app, the Growth Manager reviews visitors, trials and paying customers alongside the initiatives.',
        impact: 'A view of customer activity with initiatives marked against it, so you can inspect the before-and-after evidence.',
        measure: 'Decide what to continue, change or stop. Check the baseline and other possible causes; a completed initiative does not prove growth.',
      },
    ],
  },
];
