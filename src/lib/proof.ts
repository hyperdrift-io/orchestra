import { caseStudies, type Reading } from '@/data/case-studies';
import { articleBySlug, visibleArticles } from '@/lib/article-catalogue';

export interface ReadingLink { title: string; href: string; external: boolean }

/** An Orchestra article counts only once it is visible; a blog post is linked as recorded. */
function resolveReading(reading: Reading[] = []): ReadingLink[] {
  const visible = new Set(visibleArticles().map((article) => article.slug));
  return reading.flatMap((entry): ReadingLink[] => {
    if ('href' in entry) return [{ ...entry, external: true }];
    const article = articleBySlug(entry.article);
    return article && visible.has(article.slug) ? [{ title: article.title, href: `/articles/${article.slug}`, external: false }] : [];
  });
}

/** The First Officer's film is the one its article carries. */
const firstOfficerFilm = articleBySlug('the-first-officer')?.media ?? null;

const presentation: Record<string, { headline: string; value: string; recording?: { id: string; title: string } }> = {
  nextrole: { headline: 'Meet customers in their assistant.', value: 'NextRole brings its career tools into the conversation where someone is already working on their next move.' },
  standup: { headline: 'Find the next useful action.', value: 'Explore a repository brief, with source checking still needed before acting on its recommendations.' },
  helm: { headline: 'Give work a clear boundary.', value: 'Give delegated work a clear owner, a defined scope and a visible result.', recording: { id: 'JB2O3WSwH90', title: 'Helm: recorded sandbox diagnosis and recovery' } },
  'uk-gov-radar': { headline: 'Recognise the right opportunity.', value: 'Find relevant opportunities and inspect the evidence before deciding what to pursue.', recording: { id: 'z4B0gtwbjB4', title: 'uk.gov Radar: recorded opportunity discovery' } },
  unanswered: { headline: 'Put expertise where it helps.', value: 'Connect relevant expertise with people already asking for help.' },
  'bridge-voice': { headline: 'Talk through the next move.', value: 'Talk through a business decision with the evidence and available actions in view.' },
};

/** The catalogue lists our own product first, then public builds newest first; the home shows three. */
export function proofWorks(catalogue: boolean) {
  const home = ['nextrole', 'helm', 'uk-gov-radar'];
  return caseStudies
    .filter((item) => catalogue ? item.challenge || item.slug === 'nextrole' : home.includes(item.slug))
    .sort((a, b) => catalogue ? 0 : home.indexOf(a.slug) - home.indexOf(b.slug))
    .map((item) => ({ ...item, ...presentation[item.slug], reading: resolveReading(item.reading), film: item.slug === 'bridge-voice' ? firstOfficerFilm : null }));
}

export const mcpEnquiryHref = '/?situation=mcp#contact';
