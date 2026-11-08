/**
 * What Traction does, in the order a founder meets it on /traction: what the free start leaves on the board, then what
 * continues. Every line is true of the board today. The free group matches `freeBoard`: the website review, the first
 * search and its email drafts. The search researches prospects; only a reply confirms interest, so nothing here says a
 * business needs the app or would buy it.
 */
export interface FeatureGroup { id: 'free' | 'continued'; label: string; features: { title: string; text: string }[] }

export const featureGroups: FeatureGroup[] = [
  {
    id: 'free',
    label: 'Free to start',
    features: [
      { title: 'It reads your app like a new customer.', text: 'Your first read: what works, what’s in the way and the move to make first. Each finding quotes your own pages, so you can check it.' },
      { title: 'It finds people your app could help.', text: 'One click starts the research: up to five businesses whose own pages show the need, each with the line that shows the fit. A public page suggests a fit; only a reply confirms interest.' },
      { title: 'It writes to each, in your voice.', text: 'A first email for each, signed with your name. You read it and decide. Approve, and they go to your CRM with their drafts. Nothing is sent without you.' },
    ],
  },
  {
    id: 'continued',
    label: 'As you keep going',
    features: [
      { title: 'Ask in a sentence. Get a plan.', text: 'Tell your Growth Manager what you want, with a date. It comes back with a plan to your date and waits for your yes. Tell it what happened, and it works out what comes next.' },
      { title: 'Know where to put your effort.', text: 'Your roadmap shows where you stand, what the next stage needs and the one move worth making now, with work and results on one timeline.' },
      { title: 'It keeps up with your market.', text: 'One read a day: each story with its source and the words it quotes, and what changed since yesterday, before you choose the next move.' },
    ],
  },
];

export const featuresIntro = {
  label: 'What it does',
  title: 'The customer work around your app, done with you.',
  text: 'It takes hours a founder doesn’t have: seeing the app as a stranger does, finding the people it could help, writing to each of them and keeping up with the market. Traction does that work with you, on a board that keeps the evidence. It’s for founders with a live app and no growth team yet, and we run Traction’s own launch on it.',
};
