import { caseStudies } from '@/data/case-studies';

/** A local recording with captions, played inline: the product doing the work, not a description of it. */
interface Walkthrough { src: string; poster: string; captions: string; label: string; caption: string; text: string }

const presentation: Record<string, { headline: string; value: string; recording?: { id: string; title: string }; walkthrough?: Walkthrough }> = {
  nextrole: { headline: 'Meet customers in their assistant.', value: 'NextRole brings its career tools into the conversation where someone is already working on their next move.' },
  standup: { headline: 'Find the next useful action.', value: 'Explore a repository brief, with source checking still needed before acting on its recommendations.' },
  helm: { headline: 'Give work a clear boundary.', value: 'Give delegated work a clear owner, a defined scope and a visible result.', recording: { id: 'JB2O3WSwH90', title: 'Helm: recorded sandbox diagnosis and recovery' } },
  'uk-gov-radar': { headline: 'Recognise the right opportunity.', value: 'Find relevant opportunities and inspect the evidence before deciding what to pursue.', recording: { id: 'z4B0gtwbjB4', title: 'uk.gov Radar: recorded opportunity discovery' } },
  traction: { headline: 'Keep every customer promise in view.', value: 'Traction puts an app’s customers, promises and results on one board and proposes the next move from the evidence.', walkthrough: { src: '/recordings/traction-board.mp4', poster: '/recordings/traction-board-poster.jpg', captions: '/recordings/traction-board.vtt', label: 'Traction’s board, 47 seconds, narrated, captions on screen: evidence, the next move, a kept promise, the count', caption: 'The film · 47 s · one board running one loop, on Traction’s own launch board. Real records. Voice and score made with ElevenLabs.', text: 'Your app is live. Your customers are real. Here’s how it grows from here. One board holds your evidence, names the one thing in the way, and proposes your next customer move. You decide. It becomes a promise, with an owner and a time. Kept promises carry their result. A missed promise stays in view until it’s recovered. Nothing waits on memory. Gates open on evidence. Never on a date. That’s what moves the count: one kept move at a time. An AI operator prepares every move. You sign it. We run our own launch on this board. From zero. In public. Yours starts with a first read. Ask for one.' } },
  unanswered: { headline: 'Put expertise where it helps.', value: 'Connect relevant expertise with people already asking for help.', walkthrough: { src: '/recordings/unanswered-demo.mp4', poster: '/recordings/unanswered-poster.jpg', captions: '/recordings/unanswered-demo.vtt', label: 'Unanswered: from skills to a relevant request and a first reply', caption: '14-second recorded walkthrough · search, match and draft. Results shown are from the recording.', text: 'Choose the experience you can offer. Unanswered finds relevant requests from open-source maintainers, explains the match and prepares an opening reply. Read it, edit it and decide whether to send it yourself. Nothing is posted on your behalf.' } },
  'bridge-voice': { headline: 'Talk through the next move.', value: 'Talk through a business decision with the evidence and available actions in view.' },
};

/** Keep the full contest catalogue; lead with the founder-selected owned product. */
export function proofWorks(catalogue: boolean) {
  return caseStudies
    .filter((item) => catalogue ? item.challenge || ['nextrole', 'traction'].includes(item.slug) : ['nextrole', 'helm', 'uk-gov-radar'].includes(item.slug))
    .map((item) => ({ ...item, ...presentation[item.slug] }));
}

export const mcpEnquiryHref = '/?situation=mcp#contact';
