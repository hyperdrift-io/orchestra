/**
 * Version B of the front door: the Commander in the middle. What feeds it, the jobs
 * wired around it, and what comes out. Every name is a real part of how Hyperdrift
 * runs (see org-graph.ts and docs/design/2026-09-16-ai-native-org/INVENTORY.md).
 */

/** What streams in: the integration points. */
export const inputs = [
  { key: 'analytics', name: 'Analytics', tool: 'PostHog' },
  { key: 'code', name: 'Code and issues', tool: 'GitHub' },
  { key: 'web', name: 'The web', tool: 'Firecrawl' },
  { key: 'bank', name: 'The bank', tool: 'Monzo · QuickBooks' },
] as const;

/** The anchor notes on the globe: jobs a visitor can hover, wired as they hand off. */
export const anchors = [
  { slug: 'signals', name: 'Signals', links: ['read', 'focus'] },
  { slug: 'read', name: 'The Read', links: ['signals', 'mission', 'learn'] },
  { slug: 'mission', name: 'The Mission', links: ['read', 'focus'] },
  { slug: 'focus', name: 'Fleet focus', links: ['mission', 'babysitter'] },
  { slug: 'babysitter', name: 'Babysitter', links: ['focus', 'pipelines'] },
  { slug: 'pipelines', name: 'Pipelines', links: ['babysitter', 'heal'] },
  { slug: 'heal', name: 'Self-heal', links: ['pipelines', 'learn'] },
  { slug: 'learn', name: 'Learn loop', links: ['heal', 'read'] },
] as const;

/** The five beats, in our loop’s order. Captions sit under the stage. */
export const beats = [
  { stage: 1, name: 'Sense', caption: 'Every tool feeds the Commander: analytics, code, the web, the bank.' },
  { stage: 2, name: 'Read', caption: 'It reads the fleet and writes the founder a verdict, a call and one opportunity.' },
  { stage: 3, name: 'Work', caption: 'Findings become issues and sessions; the graph grows a wired-in node per job done.' },
  { stage: 4, name: 'Ship', caption: 'Review, merge, deploy, in the background. Out comes shipped work.' },
  { stage: 5, name: 'Learn', caption: 'Outcomes are scored back into the notes. Tomorrow’s read is better.' },
] as const;

/** The read card that appears on beat 2. A sample, in the Commander’s format. */
export const readCard = 'Verdict: hold the redesign. Call: fix the enquiry path. Opportunity: Intel’s readers.';
