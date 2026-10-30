'use client';

import { useState, type CSSProperties } from 'react';

/*
 * One support conversation in one process, drawn as a trace. The server render is the rule applied,
 * so the static export and readers without JavaScript see the result; the other two views are a choice away.
 * Span and attribute names follow the GenAI conventions. The conversation, agents and timings are illustrative.
 */

type View = 'before' | 'rule' | 'names';
/** Where a span's conversation ID comes from: its own library, the outer context, or nowhere. */
type Source = 'own' | 'context' | 'session' | 'none';

interface Span {
  id: string;
  depth: number;
  op: string;
  name: string;
  role: string;
  by: string;
  /** Position in the turn, in per cent. */
  start: number;
  end: number;
  before: Source;
  rule: Source;
  /** `gen_ai.agent.name` as recorded; `inherited` is what an inherited name would say instead. */
  agent?: string;
  inherited?: string;
}

const CONVERSATION = 'conv_5j66';
const SESSION = 'sess_8tq2';

const spans: readonly Span[] = [
  { id: 'support', depth: 0, op: 'invoke_agent', name: 'Support', role: 'Agent', by: 'Agent framework', start: 0, end: 100, before: 'own', rule: 'own', agent: 'Support' },
  { id: 'chat-support', depth: 1, op: 'chat', name: 'gpt-4', role: 'Inference', by: 'Model client', start: 3, end: 27, before: 'none', rule: 'context' },
  { id: 'tool', depth: 1, op: 'execute_tool', name: 'lookup_order', role: 'Tool', by: 'Agent framework', start: 29, end: 41, before: 'own', rule: 'own', agent: 'Support' },
  { id: 'billing', depth: 1, op: 'invoke_agent', name: 'Billing', role: 'Agent', by: 'Agent framework', start: 43, end: 76, before: 'own', rule: 'own', agent: 'Billing' },
  { id: 'chat-billing', depth: 2, op: 'chat', name: 'gpt-4', role: 'Inference', by: 'Model client', start: 47, end: 72, before: 'none', rule: 'context' },
  { id: 'refunds', depth: 1, op: 'invoke_agent', name: 'Refunds', role: 'Remote agent', by: 'Hosted agent client', start: 79, end: 97, before: 'session', rule: 'session', agent: 'Refunds', inherited: 'Support' },
];

const rules = [
  { id: 'pass', text: 'Pass it to nested calls in the same process' },
  { id: 'prefer', text: 'Prefer the library’s own value' },
  { id: 'listed', text: 'Share only what’s listed' },
  { id: 'defined', text: 'Only on signals that define it' },
] as const;

type RuleId = (typeof rules)[number]['id'];

const views: Record<View, { label: string; count: string; lit: readonly RuleId[]; title: string; text: string }> = {
  before: {
    label: 'Before the rule', count: '3 of 6 spans', lit: [],
    title: 'Three of six spans answer to the conversation.',
    text: 'The agent framework records its session on its own spans. The model client inside it doesn’t know which conversation it serves, so both chat spans arrive without the ID. To find them, you walk the trace down from the agent.',
  },
  rule: {
    label: 'With the rule', count: '5 of 6 spans', lit: ['pass', 'prefer', 'defined'],
    title: 'Five of six, without walking the trace.',
    text: 'The framework puts the conversation ID in context, and the model client in the same process records it on both chat spans. The remote agent’s client has its own session ID, and the library’s value wins. The token metric stays without it, because GenAI metrics don’t define the attribute.',
  },
  names: {
    label: 'If agent names were inherited', count: '1 wrong agent', lit: ['listed'],
    title: 'Ask for the Refunds agent and the trace returns nothing.',
    text: 'The client span invokes the remote Refunds agent, but an inherited name says Support, its caller. Review caught this, so the merged list carries the conversation ID only and agent naming continues in draft #385.',
  },
};

const order: readonly View[] = ['before', 'rule', 'names'];

function sourceOf(span: Span, view: View): Source {
  return view === 'before' ? span.before : span.rule;
}

function Chip({ source }: { source: Source }) {
  if (source === 'none') return <span data-chip="none">no conversation ID</span>;
  if (source === 'session') return <span data-chip="session"><code>{SESSION}</code> its own session</span>;
  return <span data-chip={source}><code>{CONVERSATION}</code> {source === 'context' ? 'from context' : 'framework session'}</span>;
}

/** Which spans a query by conversation returns, before and after the rule, and why agent names stayed out. */
export function ConversationTrace() {
  const [view, setView] = useState<View>('rule');
  // Chips settle in only after a reader's choice, never on load.
  const [animate, setAnimate] = useState(false);
  const current = views[view];
  // In the agent-name view the query looks for the remote agent's work, which an inherited name hides.
  const query = view === 'names' ? { attribute: 'gen_ai.agent.name', value: 'Refunds' } : { attribute: 'gen_ai.conversation.id', value: CONVERSATION };
  const matches = spans.filter((span) => {
    if (view === 'names') return span.agent === query.value && !span.inherited;
    const source = sourceOf(span, view);
    return source === 'own' || source === 'context';
  }).length;
  return <section data-visual="conversation-trace" data-view={view} data-animate={animate || undefined} aria-label="One conversation as a trace: which spans carry its ID">
    <header><p>ILLUSTRATIVE TRACE / ONE CONVERSATION, ONE PROCESS</p><h3>Which spans can you find <em>by conversation?</em></h3><p>A support agent hands work to a sub-agent, a tool and a remote agent. Pick a view, then read the query.</p></header>
    <nav data-views="" aria-label="Choose a view">{order.map((id) => <button key={id} type="button" value={id} aria-pressed={view === id} onClick={() => { setAnimate(true); setView(id); }}>{views[id].label}<small>{views[id].count}</small></button>)}</nav>
    <div data-query=""><span>Query</span><code>{query.attribute} = &quot;{query.value}&quot;</code><strong aria-live="polite">{matches} of {spans.length} spans</strong></div>
    <div data-spans-head="" aria-hidden="true"><span>Span</span><span>One turn</span><span>{query.attribute}</span></div>
    <ol data-spans="">{spans.map((span) => {
      const source = sourceOf(span, view);
      const match = source === 'own' || source === 'context';
      const wrong = view === 'names' && Boolean(span.inherited);
      return <li key={span.id} data-span={span.id} data-depth={span.depth} data-match={match || undefined} data-carried={source === 'context' || undefined} data-wrong={wrong || undefined} style={{ '--start': span.start, '--end': span.end } as CSSProperties}>
        <div data-name=""><code>{span.op}</code> <strong>{span.name}</strong><small>{span.role} · {span.by}</small></div>
        <span data-bar="" aria-hidden="true"><i /></span>
        <div data-value="" key={view}>{view === 'names'
          ? (span.agent
            ? (wrong ? <span data-chip="wrong"><code>{span.inherited}</code> wrong agent: this span invokes {span.agent}</span> : <span data-chip="agent"><code>{span.agent}</code> its own agent</span>)
            : <span data-chip="none">not defined on inference spans</span>)
          : <Chip source={source} />}
          {view === 'rule' && span.rule === 'context' && <b data-rule-mark="" title="Rule 1">1</b>}
          {view === 'rule' && span.rule === 'session' && <b data-rule-mark="" title="Rule 2">2</b>}
          {view === 'names' && wrong && <b data-rule-mark="" title="Rule 3">3</b>}
        </div>
      </li>;
    })}</ol>
    <div data-metric=""><div data-name=""><code>gen_ai.client.<wbr />inference.<wbr />usage.<wbr />input_tokens</code><small>Metric · model client</small></div><div data-value=""><span data-chip="none">no conversation ID: metrics don’t define it</span>{view === 'rule' && <b data-rule-mark="" title="Rule 4">4</b>}</div></div>
    <ol data-rules="" aria-label="The four rules in the merged section">{rules.map((rule, index) => <li key={rule.id} data-lit={current.lit.includes(rule.id) || undefined}><b>{index + 1}</b>{rule.text}</li>)}</ol>
    <p data-outcome="" role="status"><strong>{current.title}</strong>{current.text}</p>
    <footer>Illustrative trace · span and attribute names from the GenAI conventions · rules from the section merged in #556</footer>
  </section>;
}
