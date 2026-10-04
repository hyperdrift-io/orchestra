import { caseStudies } from '@/data/case-studies';

const presentation: Record<string, { headline: string; value: string; recording?: { id: string; title: string } }> = {
  nextrole: { headline: 'Meet customers in their assistant.', value: 'NextRole brings its career tools into the conversation where someone is already working on their next move.' },
  standup: { headline: 'Find the next useful action.', value: 'Explore a repository brief, with source checking still needed before acting on its recommendations.' },
  helm: { headline: 'Give work a clear boundary.', value: 'Give delegated work a clear owner, a defined scope and a visible result.', recording: { id: 'JB2O3WSwH90', title: 'Helm: recorded sandbox diagnosis and recovery' } },
  'uk-gov-radar': { headline: 'Recognise the right opportunity.', value: 'Find relevant opportunities and inspect the evidence before deciding what to pursue.', recording: { id: 'z4B0gtwbjB4', title: 'uk.gov Radar: recorded opportunity discovery' } },
  unanswered: { headline: 'Put expertise where it helps.', value: 'Connect relevant expertise with people already asking for help.' },
  'bridge-voice': { headline: 'Talk through the next move.', value: 'Talk through a business decision with the evidence and available actions in view.' },
};

/** Keep the full contest catalogue; lead with the founder-selected owned product. */
export function proofWorks(catalogue: boolean) {
  return caseStudies
    .filter((item) => catalogue ? item.challenge || item.slug === 'nextrole' : ['nextrole', 'helm', 'uk-gov-radar'].includes(item.slug))
    .map((item) => ({ ...item, ...presentation[item.slug] }));
}

export const mcpEnquiryHref = '/?situation=mcp#contact';
