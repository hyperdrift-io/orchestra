import { offerSteps, sampleRead, readMethod, firstReadHref } from '@/data/traction-offer';

/** The three steps of the offer, each with the proof a founder can inspect before taking it. `here` drops the link to the current page. */
export function OfferSteps({ here }: { here?: string }) {
  return <ol data-offer-steps>{offerSteps.map((step) => <li key={step.name}>
    <h3>{step.name}</h3>
    <p>{step.gets}</p>
    <p>{step.who}</p>
    {step.link.href !== here && <a href={step.link.href}>{step.link.label} →</a>}
  </li>)}</ol>;
}

/** The sample read in three lines, where a founder decides whether to ask for theirs. */
export function ReadExcerpt() {
  return <figure data-read-excerpt>
    <figcaption>From a real first read of this site · {sampleRead.readOn}</figcaption>
    <dl>{sampleRead.findings.map((finding) => <div key={finding.label}><dt>{finding.label}</dt><dd>{finding.headline}</dd></div>)}</dl>
    <a href="/traction/first-read">Read it in full, with the evidence →</a>
  </figure>;
}

/** The sample first read: Hyperdrift's own portal, read the way an outside founder's app is read. */
export function FirstRead() {
  return <article id="first-read" aria-labelledby="first-read-title">
    <header>
      <p>Traction · A first read</p>
      <h1 id="first-read-title">We read our own site <em>first.</em></h1>
      <p>Before asking for your app, we ran a first read on this one. Same method, same limits: public pages only, the way a new customer meets them. It’s written the way you’d receive yours, so here “you” is us.</p>
      <dl>
        <div><dt>App</dt><dd>{sampleRead.app}</dd></div>
        <div><dt>Read on</dt><dd>{sampleRead.readOn}</dd></div>
        <div><dt>Read from</dt><dd>{sampleRead.readFrom}</dd></div>
        <div><dt>Signed by</dt><dd>Yann VR, prepared by Traction’s AI operator</dd></div>
      </dl>
    </header>
    <ol>{sampleRead.findings.map((finding) => <li key={finding.label}>
      <h2>{finding.label}</h2>
      <p>{finding.headline}</p>
      <p>{finding.detail}</p>
      {finding.evidence.length > 0 && <details><summary>The evidence</summary><ul>{finding.evidence.map((line) => <li key={line}>{line}</li>)}</ul></details>}
    </li>)}</ol>
    <section aria-labelledby="unseen-title">
      <h2 id="unseen-title">What this read could not see.</h2>
      <p>{sampleRead.unseen}</p>
      <p>{sampleRead.note}</p>
    </section>
    <section aria-labelledby="method-title">
      <h2 id="method-title">What every first read looks at.</h2>
      <ol>{readMethod.map((part) => <li key={part.name}><h3>{part.name}</h3><p>{part.question}</p></li>)}</ol>
    </section>
    <section aria-labelledby="next-title">
      <h2 id="next-title">Yours, then the board.</h2>
      <p>Traction is the board. The Traction Partnership is the work we do with you on it. Each step has to earn the next.</p>
      <OfferSteps here="/traction/first-read" />
      <a href={firstReadHref}>Ask for a first read of your app →</a>
    </section>
  </article>;
}
