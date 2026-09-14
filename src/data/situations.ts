/**
 * The front door: four situations a visitor can recognise themselves in.
 * Each opens to who it serves, one enquiry action, and examples they can
 * inspect right now. Catalogue entries are referenced by slug so facts and
 * attribution live once, in case-studies.ts.
 */

export type SituationSlug = 'explore' | 'workflow' | 'prototype' | 'live';

export interface Action {
  label: string;
  href: string;
}

/** A catalogue entry with a one-line summary written for this situation. */
export interface CatalogueEvidence {
  caseStudy: string;
  summary: string;
}

/** A public example outside the catalogue. `relation` says what it is to us. */
export interface LinkedEvidence {
  name: string;
  summary: string;
  relation: string;
  actions: Action[];
}

export type Evidence = CatalogueEvidence | LinkedEvidence;

export interface Situation {
  slug: SituationSlug;
  /** The row label: how the visitor recognises themselves. */
  label: string;
  /** The response heading once opened. */
  heading: string;
  /** Who this serves and what changes for them. */
  who: string;
  /** Enquiry action; opens the contact form with this situation prefilled. */
  cta: string;
  evidence: Evidence[];
  /** Collapsed by default: how an engagement at this stage runs. */
  approach: string[];
}

export const situations: Situation[] = [
  {
    slug: 'explore',
    label: 'Finding a useful first step',
    heading: 'Pick one thing worth automating.',
    who: 'For founders and teams asking where AI would earn its keep. We help you choose one bounded use case with real data behind it, before anyone writes a prompt.',
    cta: 'Find my first use case',
    evidence: [
      {
        name: 'Intel',
        summary: 'A daily briefing our own agents assemble from the sources we read.',
        relation: 'Hyperdrift product',
        actions: [{ label: 'Read the briefing', href: 'https://intel.hyperdrift.io/daily' }],
      },
      {
        caseStudy: 'unanswered',
        summary: 'Tell it what you know. It finds the maintainer who asked for exactly that.',
      },
    ],
    approach: [
      'A short written read of your product and where the repeatable work sits.',
      'One candidate use case, with the data it needs and the decision it supports.',
      'A plain yes or no on whether it is worth building.',
    ],
  },
  {
    slug: 'workflow',
    label: 'Automating a workflow',
    heading: 'Give your team time back.',
    who: 'For teams with a working product or a repeatable task. Connect the tools you already use, with people in control of every consequential step.',
    cta: 'Map my workflow',
    evidence: [
      {
        caseStudy: 'standup',
        summary: 'A GitHub brief: who is waiting on you, and what to do first.',
      },
      {
        name: 'Deputy workforce MCP',
        summary: 'Five read-only workflows over an existing workforce API, usable from any assistant.',
        relation: 'Reference integration',
        actions: [
          { label: 'Inspect the integration', href: 'https://github.com/hyperdrift-io/deputy-workforce-mcp' },
        ],
      },
    ],
    approach: [
      'Map the workflow as it runs today, including the steps people do by hand.',
      'Agents get read access first. Writes arrive only where a person confirms.',
      'Every action leaves a trail you can inspect.',
    ],
  },
  {
    slug: 'prototype',
    label: 'Taking a prototype live',
    heading: 'Turn the demo into a feature.',
    who: 'For founders and engineers with a working prototype. We agree the boundaries, the auth, and how you will see what the agent did, then ship it inside your product.',
    cta: 'Review my prototype',
    evidence: [
      {
        caseStudy: 'uk-gov-radar',
        summary: 'A founder and their browser agent work the same shortlist through WebMCP.',
      },
      {
        caseStudy: 'own-stack',
        summary: 'Server-rendered React with five dependencies: the stack our new apps inherit.',
      },
    ],
    approach: [
      'Read the prototype together and write down what it must never do.',
      'Scope tenancy, auth, cost limits and observability before the first production request.',
      'Ship behind a flag, watch real usage, widen the boundary on evidence.',
    ],
  },
  {
    slug: 'live',
    label: 'Improving a live product',
    heading: 'Find the friction, then fix it.',
    who: 'For teams already serving users. We read the signals your product already emits, find where people stall, and scope the next improvement.',
    cta: 'Discuss my live product',
    evidence: [
      {
        caseStudy: 'helm',
        summary: 'An agent crew diagnoses a live fleet and acts only through allow-listed tools.',
      },
      {
        name: 'NextRole',
        summary: 'A career tool that asks where you are before it asks for anything. The pattern behind this page.',
        relation: 'Hyperdrift product',
        actions: [{ label: 'Try the entry flow', href: 'https://nextrole.site' }],
      },
    ],
    approach: [
      'Start from the analytics and error signals you already have.',
      'One improvement at a time, each measured against the stall it targets.',
      'Agents watch and propose. Your team keeps the final say.',
    ],
  },
];

/** Choices offered in the enquiry form. Partnership shares the same honest route. */
export const enquiryChoices: { value: string; label: string }[] = [
  ...situations.map((s) => ({ value: s.slug, label: s.label })),
  { value: 'partnership', label: 'The Traction Partnership' },
];
