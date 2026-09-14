import { caseStudies, type CaseStudy } from '@/data/case-studies';
import type { Action, Evidence, LinkedEvidence } from '@/data/situations';

/** What the situation row renders for one example: name, one line, its relation to us, public actions. */
export type ResolvedEvidence = Omit<LinkedEvidence, 'relation'> & { relation?: string };

function actionsFor(cs: CaseStudy): Action[] {
  const actions: Action[] = [];
  if (cs.link) actions.push({ label: cs.linkLabel ?? 'Open', href: cs.link });
  if (cs.article) actions.push({ label: 'Read the build', href: cs.article });
  else if (cs.repo) actions.push({ label: 'Source', href: cs.repo });
  return actions;
}

/** Participation credit only. Never reads as an endorsement or award. */
function relationFor(cs: CaseStudy): string | undefined {
  return cs.challenge ? `Built for ${cs.challenge.organiser} · ${cs.challenge.name}` : undefined;
}

export function resolveEvidence(item: Evidence, catalogue: CaseStudy[] = caseStudies): ResolvedEvidence {
  if (!('caseStudy' in item)) return item;
  const cs = catalogue.find((c) => c.slug === item.caseStudy);
  if (!cs) throw new Error(`Unknown case study "${item.caseStudy}" referenced by a situation`);
  return { name: cs.name, summary: item.summary, relation: relationFor(cs), actions: actionsFor(cs) };
}
