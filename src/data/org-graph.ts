/**
 * The AI-native organisation, as a graph. Every node is a job an agent holds at
 * Hyperdrift today, with the artefact that proves it. Spec and node selection:
 * docs/design/2026-09-16-ai-native-org/GRAPH.md. No numbers as proof; artefacts only.
 */

export type ColumnSlug = 'sense' | 'read' | 'work' | 'ship' | 'learn';
export type LensSlug = 'product' | 'operations' | 'consultancy';

export interface Column {
  slug: ColumnSlug;
  name: string;
  /** The cadence mark inside the column box. */
  mark: string;
}

export interface GraphNode {
  slug: string;
  column: ColumnSlug;
  name: string;
  /** The job, in one line. */
  job: string;
  /** How it runs: the agent or script, and when. */
  runs: string;
  /** Short tool mark drawn on the node; the full list sits in `tools`. */
  mark: string;
  tools: string[];
  artefact: { label: string; href: string };
}

export interface Movement {
  n: number;
  eyebrow: string;
  title: string;
  lines: string[];
}

export interface Lens {
  slug: LensSlug;
  label: string;
  founder: string;
  columns: Record<ColumnSlug, string>;
  line: string;
}

export const columns: Column[] = [
  { slug: 'sense', name: 'Sense', mark: '06:00, every day' },
  { slug: 'read', name: 'Read', mark: 'one decision a day' },
  { slug: 'work', name: 'Work', mark: 'issues, sessions' },
  { slug: 'ship', name: 'Ship', mark: 'on every push' },
  { slug: 'learn', name: 'Learn', mark: 'the loop closes' },
];

export const nodes: GraphNode[] = [
  {
    slug: 'signals',
    column: 'sense',
    name: 'Signals',
    job: 'Reads the day-on-day analytics of every app and ranks what moved.',
    runs: 'A growth script over PostHog, first stage of the morning run.',
    mark: 'PostHog',
    tools: ['PostHog', 'Python'],
    artefact: { label: 'How the fleet watches itself', href: 'https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals' },
  },
  {
    slug: 'intel',
    column: 'sense',
    name: 'Daily Intel',
    job: 'Researches, writes, reviews and publishes an intelligence brief every morning.',
    runs: 'A GitHub Actions workflow with Claude and Firecrawl; the article commits itself at 07:00.',
    mark: 'Claude · Firecrawl',
    tools: ['Claude', 'Firecrawl', 'GitHub Actions'],
    artefact: { label: "Read this morning's brief", href: 'https://intel.hyperdrift.io/daily' },
  },
  {
    slug: 'uptime',
    column: 'sense',
    name: 'Uptime',
    job: 'Checks every public app every five minutes and opens an issue when one is down.',
    runs: 'A scheduled workflow over the fleet registry; errors that touch conversion are checked every fifteen.',
    mark: 'GitHub Actions',
    tools: ['GitHub Actions'],
    artefact: { label: 'The Bridge should be invisible', href: 'https://hyperdrift.io/blog/the-bridge-should-be-invisible' },
  },
  {
    slug: 'read',
    column: 'read',
    name: 'The Read',
    job: 'Hands the founder a verdict, a pragmatic call and one opportunity, per app and for the fleet.',
    runs: 'The Commander, a headless agent session, right after Sense.',
    mark: 'Claude',
    tools: ['Claude', 'Python'],
    artefact: { label: 'The agent is the session', href: 'https://hyperdrift.io/blog/the-agent-is-the-session' },
  },
  {
    slug: 'mission',
    column: 'read',
    name: 'The Mission',
    job: 'One decision object a day, logged, with its outcome scored later.',
    runs: 'The Commander writes it; the learn step reads it back the next morning.',
    mark: 'Mission Log',
    tools: ['Python', 'Mission Log'],
    artefact: { label: 'Hyperdrift turns one', href: 'https://hyperdrift.io/blog/hyperdrift-turns-one' },
  },
  {
    slug: 'gate',
    column: 'read',
    name: 'Idea gate',
    job: 'GO, REFINE or KILL on any feature before anyone builds it.',
    runs: 'The strategist skill, on demand, before a plan is allowed to become work.',
    mark: 'skill',
    tools: ['Claude', 'skills'],
    artefact: { label: 'Orchestrated development', href: 'https://hyperdrift.io/blog/hd-scripting-orchestrated-dev' },
  },
  {
    slug: 'focus',
    column: 'work',
    name: 'Fleet focus',
    job: 'Turns growth findings into triaged issues, each with a request an agent can pick up.',
    runs: 'The orchestrator, daily, after the Read.',
    mark: 'GitHub',
    tools: ['GitHub', 'Python'],
    artefact: { label: 'How the fleet watches itself', href: 'https://hyperdrift.io/blog/the-fleet-watches-itself-posthog-signals' },
  },
  {
    slug: 'distribution',
    column: 'work',
    name: 'Distribution',
    job: 'Finds the conversations worth joining, drafts a disclosed reply, tracks follow-ups. Never posts alone.',
    runs: 'A daily scan with Firecrawl; a human sends every reply.',
    mark: 'Firecrawl',
    tools: ['Firecrawl', 'SQLite'],
    artefact: { label: 'hyper-post, the posting tool', href: 'https://github.com/hyperdrift-io/hyper-post' },
  },
  {
    slug: 'vanguard',
    column: 'work',
    name: 'Vanguard',
    job: 'Reviews the fleet’s code against the frontier once a week and files what should change.',
    runs: 'A Monday workflow; findings arrive as labelled issues.',
    mark: 'GitHub Actions',
    tools: ['GitHub Actions', 'Claude'],
    artefact: { label: 'Agents versus automation', href: 'https://hyperdrift.io/blog/agents-vs-automation' },
  },
  {
    slug: 'qa',
    column: 'ship',
    name: 'QA engineer',
    job: 'Writes and runs the critical-path tests before anything launches.',
    runs: 'A skill that scaffolds Playwright from the app’s own guide, per release.',
    mark: 'Playwright',
    tools: ['Playwright', 'skills'],
    artefact: { label: 'The stack our apps inherit', href: 'https://own-stack.hyperdrift.io' },
  },
  {
    slug: 'babysitter',
    column: 'ship',
    name: 'Babysitter',
    job: 'Walks a change through review, checks and merge, then promotes it. Server-side only.',
    runs: 'A background agent per pull request; a human gate where it matters.',
    mark: 'GitHub',
    tools: ['GitHub', 'skills'],
    artefact: { label: 'Orchestrated development', href: 'https://hyperdrift.io/blog/hd-scripting-orchestrated-dev' },
  },
  {
    slug: 'pipelines',
    column: 'ship',
    name: 'Pipelines',
    job: 'One pipeline per app, test to production; MCP servers publish to the official registry on change.',
    runs: 'GitHub Actions sequences the jobs; Ansible does the work.',
    mark: 'Actions · Ansible',
    tools: ['GitHub Actions', 'Ansible', 'MCP registry'],
    artefact: { label: 'Next Role, in the MCP registry', href: 'https://nextrole.site' },
  },
  {
    slug: 'learn',
    column: 'learn',
    name: 'Learn loop',
    job: 'Scores yesterday’s decisions against what happened, so tomorrow’s read is better.',
    runs: 'The Commander’s learn step, first thing, before today’s mission.',
    mark: 'Mission Log',
    tools: ['Python', 'Mission Log'],
    artefact: { label: 'The agent is the session', href: 'https://hyperdrift.io/blog/the-agent-is-the-session' },
  },
  {
    slug: 'books',
    column: 'learn',
    name: 'Books',
    job: 'Bank to ledger: pulls, posts and verifies, with the vendor policy written as code.',
    runs: 'A daily job from Monzo into QuickBooks; parity drift lands on the Bridge.',
    mark: 'QuickBooks',
    tools: ['QuickBooks', 'Monzo', 'Composio'],
    artefact: { label: 'The Bridge should be invisible', href: 'https://hyperdrift.io/blog/the-bridge-should-be-invisible' },
  },
  {
    slug: 'heal',
    column: 'learn',
    name: 'Self-heal',
    job: 'Detects, heals, audits and reports, on the server, without being asked.',
    runs: 'Ansible-installed watchdogs every five minutes and a daily heal.',
    mark: 'Ansible',
    tools: ['Ansible', 'cron'],
    artefact: { label: 'The Bridge should be invisible', href: 'https://hyperdrift.io/blog/the-bridge-should-be-invisible' },
  },
];

/** What the scroll tells, beside the graph. Movement 0 is the first screen. */
export const movements: Movement[] = [
  {
    n: 0,
    eyebrow: '06:00',
    title: 'Your company, in full motion.',
    lines: [
      'We put a company on agents. You keep your eyes on the business.',
      'This is ours, running today: every job on this map is held by an agent, and every node links to the proof.',
    ],
  },
  {
    n: 1,
    eyebrow: 'Sense',
    title: 'Before anyone is at a desk, the fleet has been read.',
    lines: [
      'Analytics deltas for every app. This morning’s intelligence brief, written and published. Every app checked, every five minutes.',
    ],
  },
  {
    n: 2,
    eyebrow: 'Read',
    title: 'One decision a day, written down.',
    lines: [
      'The Commander reads the fleet and hands the founder a verdict, a pragmatic call and one opportunity. The founder keeps the verdict. The outcome is tracked.',
    ],
  },
  {
    n: 3,
    eyebrow: 'Work',
    title: 'Findings become work. Replies are drafted, never posted alone.',
    lines: [
      'Signals turn into triaged issues. Distribution finds the threads worth joining and drafts the reply for a human to send. On Mondays, Vanguard reviews the code against the frontier.',
    ],
  },
  {
    n: 4,
    eyebrow: 'Ship',
    title: 'Review, merge, deploy. In the background.',
    lines: [
      'Tests before launch. A babysitter walks each change through review and merge, server-side only. One pipeline per app, test to production. A human gate where it matters.',
    ],
  },
  {
    n: 5,
    eyebrow: 'Learn',
    title: 'The loop closes.',
    lines: [
      'Decisions are scored against what happened. The books reconcile against the bank. The fleet detects, heals, audits and reports.',
    ],
  },
  {
    n: 6,
    eyebrow: 'One email',
    title: 'All of it arrives as one email.',
    lines: ['That is the founder’s morning. The rest of the day is the business.'],
  },
];

/** The same graph, relabelled for the visitor’s organisation. */
export const lenses: Lens[] = [
  {
    slug: 'product',
    label: 'A product team',
    founder: 'Your product lead',
    columns: {
      sense: 'Usage and errors',
      read: 'What to build next',
      work: 'Backlog to sessions',
      ship: 'Release',
      learn: 'Learn from usage',
    },
    line: 'Agents inside what you ship. Work and Ship are your integration path; the MCP servers below are the pattern.',
  },
  {
    slug: 'operations',
    label: 'An operations team',
    founder: 'Your head of operations',
    columns: {
      sense: 'Monitoring, intake',
      read: 'The morning brief',
      work: 'Tickets, follow-up',
      ship: 'Changes to prod',
      learn: 'Reconciliation',
    },
    line: 'Agents inside how you run. Sense, Learn and the one email become your monitoring, your reconciliation and your morning brief.',
  },
  {
    slug: 'consultancy',
    label: 'A consultancy',
    founder: 'Your client',
    columns: {
      sense: 'Discovery',
      read: 'The proposal',
      work: 'Delivery',
      ship: 'Handover',
      learn: 'Support',
    },
    line: 'You own the client; we own the build. The loop is delivery capacity, and the Vodafone Three work is the reference.',
  },
];

export const surface = [
  { name: 'MCP servers', detail: 'Deputy workforce · Next Role', href: 'https://github.com/hyperdrift-io/deputy-workforce-mcp' },
  { name: 'Your tools', detail: 'GitHub · PostHog · Ansible · Claude', href: '#plug' },
  { name: 'Proof', detail: 'Vodafone Three via Tecknuovo · builds', href: '#proof' },
];
