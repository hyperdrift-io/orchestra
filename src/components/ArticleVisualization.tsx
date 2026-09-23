'use client';

import { useEffect, useState } from 'react';
import type { ArticleSummary } from '@/lib/article-catalogue';

function TransactionMap() {
  const [retry, setRetry] = useState(false);
  const [model, setModel] = useState('relational');
  const [interactive, setInteractive] = useState(false);
  useEffect(() => setInteractive(true), []);
  return <section data-visual="transaction" data-model-view={model} data-ready={interactive} data-retry={retry} aria-label="Refund transaction boundaries">
    <header><p>THE CONSISTENCY BOUNDARY</p><h3>What has to change <em>together?</em></h3><p>One refund. Two ways to organise the same work.</p></header>
    <div data-refund=""><strong>£40<span>refund</span></strong><div><span>BUSINESS OPERATION</span><code>refund_1042</code><small>{retry ? 'Existing operation → read its result' : 'One identity across every retry'}</small></div><button type="button" aria-pressed={retry} onClick={() => setRetry(!retry)}>{retry ? '↺ Reset example' : '↻ Try a duplicate request'}</button></div>
    <nav data-model-picker="" aria-label="Compare data models"><button type="button" aria-pressed={model === 'relational'} onClick={() => setModel('relational')}>Related records</button><button type="button" aria-pressed={model === 'document'} onClick={() => setModel('document')}>Case document</button></nav>
    <div data-models="">
      <section data-model="relational"><header><span>01 / RELATED RECORDS</span><h4>Postgres <i>/ Lakebase</i></h4></header>
        <div data-boundary="transaction"><span data-boundary-label="">ONE TRANSACTION</span><ol>
          <li><span data-record="customer">C</span><div><strong>Customer</strong><code>balance</code></div><span data-record-value="">updated</span></li>
          <li><span data-record="refund">R</span><div><strong>Refund</strong><code>operation_id</code></div><span data-record-value="">{retry ? '1042 ✓' : '1042'}</span></li>
          <li><span data-record="approval">A</span><div><strong>Approval</strong><code>decision</code></div><span data-record-value="">allowed</span></li>
        </ol><p><span aria-hidden="true">✓</span> Commit the related changes together</p></div>
        <p>Separate records. Shared business rules.</p>
      </section>
      <section data-model="document"><header><span>02 / ONE AGGREGATE</span><h4>A support-case document</h4></header>
        <div data-boundary="document"><span data-boundary-label="">CASE / 1042</span><div data-document-fields=""><span aria-hidden="true">{`{`}</span><div><p><code>messages</code><span>conversation</span></p><p><code>proposal</code><span>£40 refund</span></p><p><code>review</code><span>approved</span></p></div><span aria-hidden="true">{`}`}</span></div><p>Read and update the case as a unit</p></div>
        <div data-separate=""><span aria-hidden="true">↳</span><div><strong>Customer balance</strong><span>Separate record → define its transaction boundary</span></div></div>
      </section>
    </div>
    <div data-payment=""><span data-payment-mark="" aria-hidden="true">£</span><div><span>BEYOND EITHER DATABASE</span><strong>The payment provider</strong></div><p>Use provider idempotency<br />and a recoverable workflow.</p></div>
    <p data-outcome="" role="status">{retry ? <><strong>Same operation. Look up the recorded result.</strong> A unique operation ID can guard the database write; the payment provider needs its own idempotency check.</> : <><strong>Choose around the boundary, not the JSON.</strong> Both models can transact. MongoDB supports multi-document transactions; Cosmos DB document batches share a logical partition key.</>}</p>
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

export function ArticleVisualization({ article }: { article: ArticleSummary }) {
  const visual = article.visualization;
  if (!visual) return null;
  return <figure id="article-proof" data-article-visual="" aria-label={article.proof.heading}>
    {visual.kind === 'transaction' ? <TransactionMap /> : <StreamingSequence />}
    <figcaption>{visual.takeaway} <a href={article.proof.url} download>Save the visual ↓</a></figcaption>
    <details><summary>Explanation and primary sources</summary><p>{visual.description}</p><ul>{visual.sources.map((source) => <li key={source.url}><a href={source.url}>{source.label} ↗</a></li>)}</ul><small>Reviewed 22 September 2026 · Illustrative design, not a client result.</small></details>
  </figure>;
}
