/**
 * The /about page: where founders get stuck, what we bring, and the work that proves it.
 * Founder direction, 9 Oct 2026: not a retrospective; frame how our skills fit the founder's
 * problem, backed by our achievements, as general as possible. Every line is already published
 * on Orchestra or hyperdrift.io unless the review list for this page says otherwise.
 */
export type ProofLink = { label: string; href: string };
export type Fit = { id: string; problem: string; bring: string; proof: string; links: ProofLink[] };

export const fits: readonly Fit[] = [
  {
    id: 'demand',
    problem: 'Interested visitors reach pricing but hesitate during signup.',
    bring: 'A growth board wired to your live app: a first read, your board, then the Traction Partnership when the board shows demand.',
    proof: 'Traction is launching itself from zero, in public, on its own board.',
    links: [{ label: 'The launch log', href: '/articles/traction-from-zero' }, { label: 'A sample first read', href: '/traction/first-read' }],
  },
  {
    id: 'time',
    problem: 'Every decision still waits for you.',
    bring: 'Agents on a daily loop, and a founder who approves, denies or redirects.',
    proof: 'Our own fleet runs this way: a whole day of founder input fits in three words, approve, deny, redirect.',
    links: [{ label: 'The dashboard that speaks first', href: '/articles/the-first-officer' }],
  },
  {
    id: 'agents',
    problem: 'Your customers want to use your product from their assistant.',
    bring: 'We integrate one useful workflow from your product through MCP: agree the outcome and permissions, connect the product, verify a task in a compatible assistant and provide connection instructions.',
    proof: 'NextRole, our own commercial career product, answers through five MCP tools.',
    links: [{ label: 'Inspect the live MCP check', href: '/proof/nextrole-mcp-corrected-2026-10-04.json' }, { label: 'The work', href: '/work' }],
  },
  {
    id: 'trust',
    problem: 'How much authority should you delegate to an agent?',
    bring: 'Helm separates diagnosis from action and confines disruptive operations to drill services.',
    proof: 'An agent crew at the wheel of a live four-app fleet, drilled against a prompt-injected sandbox.',
    links: [{ label: 'AI agent permissions', href: '/articles/delegation-with-boundaries' }],
  },
];

export const partners = 'Yann’s client engagements include Everything and VodafoneThree, with VodafoneThree delivered through Tecknuovo. Together and Revela are partner ventures, each combining a founder’s audience knowledge with our engineering.';
