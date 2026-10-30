import { LinkPreview } from '@/components/LinkPreview';

/*
 * Thirty days of review on #556, from the public pull request. Each stop shows what the change carried
 * at that point: which attributes, and whether it summarised or set rules. The narrowing is the story.
 */

type Attribute = 'agent' | 'conversation';

const stops: readonly { date: string; who?: string; title: string; text: string; scope: readonly Attribute[]; form: string; approval?: boolean }[] = [
  { date: '1 Oct', title: 'Opened', text: 'An 18-line summary of where two attributes already appear.', scope: ['agent', 'conversation'], form: 'Summary' },
  { date: '12 Oct', who: 'Liudmila Molkova', title: 'Make it normative', text: 'Proposed rules for propagation, and links to the canonical definitions instead of repeating them.', scope: ['agent', 'conversation'], form: 'Summary' },
  { date: '13 Oct', who: 'Liudmila Molkova', title: 'Revised and approved', text: 'A change like this also needs an approval from a reviewer at a second company.', scope: ['agent', 'conversation'], form: 'Rules', approval: true },
  { date: '23 Oct', who: 'Trask Stalnaker', title: 'The wrong agent', text: 'An inherited agent name can label a remote agent with its caller’s name. The SIG continues agent naming in #385.', scope: ['agent', 'conversation'], form: 'Rules' },
  { date: '27 Oct', title: 'Agent name removed', text: 'The list keeps the conversation ID only.', scope: ['conversation'], form: 'Rules' },
  { date: '30 Oct', who: 'Trask Stalnaker · Liudmila Molkova', title: 'Approved and merged', text: 'Two wording suggestions applied, approvals from both reviewers, merged at 22:56 UTC.', scope: ['conversation'], form: 'Four rules', approval: true },
];

const names: Record<Attribute, string> = { agent: 'gen_ai.agent.name', conversation: 'gen_ai.conversation.id' };

const facts = [
  { value: '30', label: 'days in review' },
  { value: '16', label: 'lines added' },
  { value: '2', label: 'approvals, two companies' },
  { value: '44', label: 'checks passed on the final commit' },
];

/** How review turned a summary of two attributes into four rules for one. */
export function ReviewTimeline() {
  return <section data-visual="review-timeline" aria-label="Thirty days of review on pull request 556">
    <header><p>FROM THE PUBLIC PULL REQUEST / 1–30 OCTOBER 2026</p><h3>From two attributes <em>to one</em></h3><p>What the change carried at each step of its review.</p></header>
    <ol data-stops="">{stops.map((stop) => <li key={stop.date} data-approval={stop.approval || undefined}>
      <time>{stop.date}</time>
      <div><strong>{stop.title}</strong>{stop.who && <small>{stop.who}</small>}<p>{stop.text}</p></div>
      <ul aria-label="In scope">{(['agent', 'conversation'] as const).map((attribute) => <li key={attribute} data-in={stop.scope.includes(attribute) || undefined}><code>{names[attribute]}</code></li>)}<li data-form="">{stop.form}</li></ul>
    </li>)}</ol>
    <dl data-facts="">{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    <p data-action=""><LinkPreview href="https://github.com/open-telemetry/semantic-conventions-genai/pull/556">Read the merged pull request ↗</LinkPreview></p>
    <footer>Dates and events from the public pull request · approvals at commits b21ec2c, 6d76444 and b474883</footer>
  </section>;
}
