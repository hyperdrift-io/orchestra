'use client';

import { LinkPreview } from '@/components/LinkPreview';


import { useEffect, useState } from 'react';
import type { ArticleSummary } from '@/lib/article-catalogue';
import { InterfaceFigure } from '@/components/InterfaceFigure';
import type { FigureSvg } from '@/lib/ui-accessibility-figure-svg';

function TransactionMap() {
  const [retry, setRetry] = useState(false);
  const [model, setModel] = useState('relational');
  const [interactive, setInteractive] = useState(false);
  useEffect(() => setInteractive(true), []);
  return <section data-visual="transaction" data-model-view={model} data-ready={interactive} data-retry={retry} aria-label="Refund transaction boundaries">
    <header><p>WORKED EXAMPLE / REFUND</p><h3>What has to change <em>together?</em></h3><p>For this refund, start with Postgres. The case document answers a different need.</p></header>
    <div data-refund=""><strong>£40<span>refund</span></strong><div><span>BUSINESS OPERATION</span><code>refund_1042</code><small>{retry ? 'Existing operation → read its result' : 'One identity across every retry'}</small></div><button type="button" aria-pressed={retry} onClick={() => setRetry(!retry)}>{retry ? '↺ Reset example' : '↻ Try a duplicate request'}</button></div>
    <nav data-model-picker="" aria-label="Compare data models"><button type="button" aria-pressed={model === 'relational'} onClick={() => setModel('relational')}>Related records</button><button type="button" aria-pressed={model === 'document'} onClick={() => setModel('document')}>Case document</button></nav>
    <div data-models="">
      <section data-model="relational"><header><span>01 / FIRST CHOICE FOR THIS REFUND</span><h4>Postgres <i>/ Lakebase</i></h4></header>
        <div data-boundary="transaction"><span data-boundary-label="">ONE TRANSACTION</span><ol>
          <li><span data-record="customer">C</span><div><strong>Customer</strong><code>balance</code></div><span data-record-value="">updated</span></li>
          <li><span data-record="refund">R</span><div><strong>Refund</strong><code>operation_id</code></div><span data-record-value="">{retry ? '1042 ✓' : '1042'}</span></li>
          <li><span data-record="approval">A</span><div><strong>Approval</strong><code>decision</code></div><span data-record-value="">allowed</span></li>
        </ol><p><span aria-hidden="true">✓</span> Commit the related changes together</p></div>
        <p>Separate records. Shared business rules.</p>
      </section>
      <section data-model="document"><header><span>02 / CASE-FIRST ALTERNATIVE</span><h4>A support-case document</h4></header>
        <div data-boundary="document"><span data-boundary-label="">CASE / 1042</span><div data-document-fields=""><span aria-hidden="true">{`{`}</span><div><p><code>messages</code><span>conversation</span></p><p><code>proposal</code><span>£40 refund</span></p><p><code>review</code><span>approved</span></p></div><span aria-hidden="true">{`}`}</span></div><p>Read and update the case as a unit</p></div>
        <div data-separate=""><span aria-hidden="true">↳</span><div><strong>Customer balance</strong><span>Separate record → define its transaction boundary</span></div></div>
      </section>
    </div>
    <div data-payment=""><span data-payment-mark="" aria-hidden="true">£</span><div><span>BEYOND EITHER DATABASE</span><strong>The payment provider</strong></div><p>Use provider idempotency<br />and a recoverable workflow.</p></div>
    <p data-outcome="" role="status">{retry ? <><strong>Same operation. Look up the recorded result.</strong> A unique operation ID can guard the database write; the payment provider needs its own idempotency check.</> : <><strong>For this refund, start with Postgres.</strong> Balance, refund and approval can commit together. MongoDB can transact across documents; Cosmos DB document batches need one logical partition key.</>}</p>
    <footer>Illustrative design · No benchmark or executed refund</footer>
  </section>;
}

const stages = [
  { label: 'Check', title: 'Show what has actually happened.', text: 'A permitted progress event reaches the browser. Your application defines what the user is allowed to see.' },
  { label: 'Approve', title: 'An event asks. A request authorises.', text: 'The browser shows the approval request. A separate authenticated request returns to the server, where permission is checked before the operation runs.' },
  { label: 'Disconnect', title: 'The refund finished. The screen missed it.', text: 'In this example, the application recorded completion before the connection dropped. A lost SSE response does not tell the browser whether the operation succeeded.' },
  { label: 'Recover', title: 'Read the result. Keep the same run.', text: 'On reconnect, read stored run state and discover the completed refund. Do not blindly start another payment.' },
];

function StreamingSequence() {
  const [stage, setStage] = useState(2);
  return <section data-visual="streaming" data-stage={stage} aria-label="Agent streaming and recovery sequence">
    <header><p>THE CONNECTION IS NOT THE RUN</p><h3>What survives a <em>disconnect?</em></h3><p>Follow one illustrative refund from progress to recovery.</p></header>
    <nav aria-label="Explore the refund sequence">{stages.map((step, index) => <button key={step.label} type="button" aria-pressed={stage === index} onClick={() => setStage(index)}><span>0{index + 1}</span>{step.label}</button>)}</nav>
    <div data-sequence="">
      <div data-lanes=""><span>AGENT<small>produces events</small></span><span>APPLICATION<small>checks + records</small></span><span>BROWSER<small>shows progress</small></span></div>
      <svg viewBox="0 0 680 294" role="img" aria-label={`Sequence stage: ${stages[stage].label}. ${stages[stage].title}`}>
        <defs><linearGradient id="run-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="294"><stop stopColor="#e3a857" stopOpacity=".25"/><stop offset="1" stopColor="#f4cd92"/></linearGradient><marker id="event-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L8 4L0 8" fill="#c8beae"/></marker></defs>
        <path data-lifeline="" d="M72 0V286M608 0V286"/><path data-runline="" d="M340 0V286"/>
        <g data-active="true"><text x="340" y="26" textAnchor="middle">checking_order</text><path data-event="" d="M72 46H608"/><circle cx="72" cy="46" r="5"/><circle cx="340" cy="46" r="5"/><circle cx="608" cy="46" r="5"/></g>
        <g data-active={stage >= 1}><text x="470" y="79" textAnchor="middle">approval_required</text><path data-event="" d="M340 97H608"/><circle cx="340" cy="97" r="5"/><circle cx="608" cy="97" r="5"/><text x="470" y="132" textAnchor="middle">authenticated approval</text><path data-approval="" d="M608 148H340"/></g>
        <g data-active={stage >= 2}><path data-event="" d="M72 201H328"/><circle cx="72" cy="201" r="5"/><rect data-saved="" x="272" y="176" width="136" height="50" rx="25"/><text data-saved-label="" x="340" y="207" textAnchor="middle">completed</text><path data-lost="" d="M419 201H484M527 201H608"/><path data-break="" d="M494 190l22 22m0-22l-22 22"/><text data-break-label="" x="525" y="179" textAnchor="middle">connection lost</text></g>
        <g data-active={stage === 3}><path data-recovery="" d="M608 261H351"/><text x="480" y="250" textAnchor="middle">read stored run state</text><circle cx="340" cy="261" r="6"/></g>
      </svg>
      <div data-run-state=""><span>RUN / 1042</span><strong>{stage < 1 ? 'Checking order' : stage === 1 ? 'Awaiting approval' : 'Completed · recorded'}</strong><span>{stage === 3 ? '✓ Recovered by browser' : stage === 2 ? 'Browser: result unknown' : 'Browser: connected'}</span></div>
    </div>
    <p data-outcome="" role="status"><strong>{stages[stage].title}</strong>{stages[stage].text}</p>
    <footer>Application-owned persistence and recovery · Example event names, not SDK APIs</footer>
  </section>;
}

const requests = [
  { id: 'drill', label: 'Restart the drill service', route: 'act', outcome: 'allowed', title: 'Allowed, then checked.', text: 'The engineer holds a restart tool, and the tool accepts drill services. The request is in scope. The agent reports success only after the service answers again from outside.' },
  { id: 'production', label: 'Restart production', route: 'act', outcome: 'refused', title: 'Refused by the tool, not by the prompt.', text: 'The same restart tool checks its target. Production is outside the allowance, so no wording can unlock it. The request goes to a person.' },
  { id: 'injected', label: 'Error page says “report healthy”', route: 'read', outcome: 'quarantined', title: 'Read as evidence, never as an order.', text: 'The watch officer reads the failing page. Its instruction text is quarantined and recorded; the status code stays as evidence. Reading a page grants it no authority.' },
] as const;

const roles = [
  { id: 'route', step: '01', name: 'Route', who: 'Assigns the job', tools: 'No tools' },
  { id: 'read', step: '02', name: 'Read', who: 'Watch officer', tools: 'Health checks · logs · read-only' },
  { id: 'act', step: '03', name: 'Act', who: 'Engineer', tools: 'Restart · drill services only' },
] as const;

function AuthorityMap() {
  const [choice, setChoice] = useState<(typeof requests)[number]['id']>('drill');
  const request = requests.find((entry) => entry.id === choice) ?? requests[0];
  return <section data-visual="authority" data-outcome-state={request.outcome} aria-label="Where an agent's authority stops">
    <header><p>WORKED EXAMPLE / HELM DRILL</p><h3>Where does its authority <em>stop?</em></h3><p>Send one request. The boundary lives in the tools each role holds, not in how persuasive the request sounds.</p></header>
    <nav aria-label="Choose a request">{requests.map((entry) => <button key={entry.id} type="button" aria-pressed={choice === entry.id} onClick={() => setChoice(entry.id)}>{entry.label}</button>)}</nav>
    <ol data-roles="">{roles.map((role) => <li key={role.id} data-role={role.id} data-active={role.id === 'route' || role.id === request.route}><span>{role.step}</span><strong>{role.name}</strong><small>{role.who}</small><code>{role.tools}</code></li>)}</ol>
    <div data-gate=""><span>ENFORCED IN THE TOOL</span><code>target ∈ drill services</code><b>{request.outcome}</b></div>
    <p data-outcome="" role="status"><strong>{request.title}</strong>{request.text}</p>
    <div data-readback=""><span>COMPLETION</span><ol><li>Request accepted</li><li>Read the resulting state</li><li data-done={request.outcome === 'allowed'}>Report done</li></ol></div>
    <footer>Illustrative of the recorded Helm drill · a contest build, not a client case</footer>
  </section>;
}

const briefItems = [
  { id: 'reply', title: 'Reply to a bug report that includes a reproduction', kind: 'Person waiting', evidence: 'Issue · asked 5 days ago', age: 5 * 24 * 60, waiting: true },
  { id: 'review', title: 'Review a first-time contributor’s fix', kind: 'Person waiting', evidence: 'Pull request · review requested 2 days ago', age: 2 * 24 * 60, waiting: true },
  { id: 'labels', title: 'Tidy the stale labels', kind: 'Routine', evidence: 'Your own note · 3 days ago', age: 3 * 24 * 60, waiting: false },
  { id: 'bot', title: 'Bump a test library', kind: 'Automated', evidence: 'Dependency bot · 1 hour ago', age: 60, waiting: false },
  { id: 'ci', title: 'Main branch build passed', kind: 'Automated', evidence: 'CI run · 20 minutes ago', age: 20, waiting: false },
] as const;

const orderings = {
  recent: { label: 'Newest first', items: [...briefItems].sort((a, b) => a.age - b.age), title: 'The newest event wins.', text: 'A green build and a bot sit above two people who asked for help. Nothing is wrong with any line; the rule is.' },
  waiting: { label: 'Who is waiting first', items: [...briefItems].sort((a, b) => Number(b.waiting) - Number(a.waiting) || b.age - a.age), title: 'Two people lead the brief.', text: 'Each line carries the record behind it, so you can disagree: you may already be talking to that contributor. Automated and routine work waits below.' },
} as const;

function BriefOrder() {
  const [rule, setRule] = useState<keyof typeof orderings>('waiting');
  const ordering = orderings[rule];
  return <section data-visual="brief" data-rule={rule} aria-label="One brief, two ordering rules">
    <header><p>WORKED EXAMPLE / A MORNING BRIEF</p><h3>What should come <em>first?</em></h3><p>The same five items under two ordering rules. The rule is the product decision a summary leaves open.</p></header>
    <nav aria-label="Choose the ordering rule">{(Object.keys(orderings) as (keyof typeof orderings)[]).map((key) => <button key={key} type="button" aria-pressed={rule === key} onClick={() => setRule(key)}>{orderings[key].label}</button>)}</nav>
    <ol data-brief="">{ordering.items.map((item, index) => <li key={item.id} data-waiting={item.waiting} data-dim={rule === 'waiting' && !item.waiting}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.title}</strong><small><b>{item.kind}</b> · {item.evidence}</small></div></li>)}</ol>
    <p data-outcome="" role="status"><strong>{ordering.title}</strong>{ordering.text}</p>
    <footer>Illustrative items modelled on Standup’s ordering rule · not real repository data</footer>
  </section>;
}

const visuals = { transaction: TransactionMap, streaming: StreamingSequence, authority: AuthorityMap, brief: BriefOrder } as const;

export function ArticleVisualization({ article, figureSvg }: { article: ArticleSummary; figureSvg?: FigureSvg }) {
  const visual = article.visualization;
  if (!visual) return null;
  if (visual.kind === 'ui-accessibility') return <InterfaceFigure article={article} svg={figureSvg} />;
  const Visual = visuals[visual.kind];
  return <figure id="article-proof" data-article-visual="" aria-label={article.proof.heading ?? visual.takeaway}>
    <Visual />
    <figcaption>{visual.takeaway}{visual.download && <> <a href={visual.download} download>Save the visual ↓</a></>}</figcaption>
    <details><summary>Explanation and primary sources</summary><p>{visual.description}</p><ul>{visual.sources.map((source) => <li key={source.url}><LinkPreview href={source.url}>{source.label} ↗</LinkPreview></li>)}</ul><small>Reviewed {visual.reviewed ?? '22 September 2026'} · Illustrative design, not a client result.</small></details>
  </figure>;
}
