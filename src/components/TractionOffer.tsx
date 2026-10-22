import { sampleRead, readMethod, boardFilm, boardValue } from '@/data/traction-offer';
import { LinkPreview } from '@/components/LinkPreview';

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
        <div><dt>Review method</dt><dd>Prepared with Traction’s AI operator, reviewed by us</dd></div>
      </dl>
    </header>
    <aside aria-labelledby="read-follow-up-title">
      <h2 id="read-follow-up-title">What changed after this read?</h2>
      <p>Checked on 17 October 2026: the homepage now puts an enquiry in the first screen on a phone. A first-read request asks for a name, email and app URL. The product proof now lives on the Work page.</p>
      <p>The original assessment below is preserved as a dated example. These changes make the next step easier to find; their effect on enquiries and conversion has not been established.</p>
    </aside>
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
      <p>This method is an open Agent Skill made by Orchestra. <LinkPreview intent="navigate" href="https://github.com/hyperdrift-io/first-read" target="_blank" rel="noreferrer">Run it on your own app ↗</LinkPreview> in Claude Code, Codex or any client that reads Agent Skills.</p>
    </section>
    <section aria-labelledby="next-title">
      <h2 id="next-title">Your next step.</h2>
      <p>Traction is the board. The Traction Partnership is the work we do with you on it. This is what a first read looks like; introduce your app and we’ll read yours the same way.</p>
      <a href="#enquire" data-enquiry="" data-situation="partnership" data-introduce="">Introduce your app →</a>
      <p><a href="/traction#partnership">How we work together →</a></p>
    </section>
  </article>;
}

/** The board doing the work: the film, with its words readable. */
export function BoardFilm() {
  return <figure data-board-film>
    <video controls playsInline preload="none" poster={boardFilm.poster} aria-label={boardFilm.label}><source src={boardFilm.src} type="video/mp4" /><track kind="captions" src={boardFilm.captions} srcLang="en" label="English" /><a href={boardFilm.src}>Watch the film</a></video>
    <figcaption>{boardFilm.caption}</figcaption>
    <details><summary>Read the film</summary><p>{boardFilm.text}</p></details>
  </figure>;
}

/** What a founder gets, in three lines. */
export function BoardValue() {
  return <dl data-board-value>{boardValue.map((item) => <div key={item.name}><dt>{item.name}</dt><dd>{item.text}</dd></div>)}</dl>;
}

