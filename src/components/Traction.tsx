import { EnquiryForm } from '@/components/EnquiryForm';
import { OfferSteps, ReadExcerpt, BoardFilm, BoardValue } from '@/components/TractionOffer';
import { count, gates, launched, record, updated } from '@/data/traction';

/** Traction, the offering: what it is and what you get, how it starts, the launch running on it in public, then a first read. */
export function Traction() {
  return <>
    <section id="traction" aria-labelledby="traction-title">
      <header>
        <p>Traction · a growth board for your live app</p>
        <h1 id="traction-title">Know your next customer move. <em>Then keep it.</em></h1>
        <p>Your customers, promises and results on one board, with the next move proposed from the evidence. We set it up with you, keep the record honest, and build with you once the board shows demand.</p>
        <p><a href="#contact">Ask for a first read →</a><a href="#value">Watch the board at work ↓</a></p>
        <p data-live>Launching on itself, from zero, in public · <strong>{count.founders}/{count.of}</strong> founders on the board · launched {launched} · <a href="#launch">the count and the record ↓</a></p>
      </header>
    </section>
    <section id="value" aria-labelledby="value-title">
      <header><p>What you get</p><h2 id="value-title">One board. <em>One loop.</em></h2></header>
      <BoardFilm />
      <BoardValue />
      <p>An AI operator prepares every move. You sign it.</p>
    </section>
    <section id="steps" aria-labelledby="steps-title">
      <header><p>How it starts</p><h2 id="steps-title">Three steps. <em>Each earns the next.</em></h2><p>Traction is the board. The Traction Partnership is the work we do with you on it. We take on a few founders at a time, because a person signs every read and every build.</p></header>
      <OfferSteps here="/traction" />
      <ReadExcerpt />
    </section>
    <section id="launch" aria-labelledby="launch-title">
      <header>
        <p>Live now · launched {launched}</p>
        <h2 id="launch-title">We’re launching it on itself. <em>From zero, in public.</em></h2>
        <p>An AI operator runs the launch on Traction’s own board. A human signs every word. The first three founders with a live app get on the board with us; the count is real and moves only on evidence.</p>
      </header>
      <figure>
        <video controls playsInline preload="none" poster="/traction/poster.jpg" aria-label="The Traction trailer, 46 seconds, with captions">
          <source src="/traction/trailer.mp4" type="video/mp4" />
          <track kind="captions" src="/traction/trailer.en.vtt" srcLang="en" label="English" default />
          <a href="/traction/trailer.mp4">Open the trailer</a>
        </video>
        <figcaption>The trailer · 46 s · cut by an AI, signed by a human</figcaption>
      </figure>
      <div>
        <div>
          <h3><span className="numeral">{count.founders}/{count.of}</span> founders on the board</h3>
          <ol>{gates.map((gate) => <li key={gate.label} aria-current={gate.current ? 'step' : undefined}><span>{gate.label}</span>{gate.text}</li>)}</ol>
          <p>Each gate opens on evidence, never on a date.</p>
          <a href="#contact">Be one of the three founders →</a>
        </div>
        <table>
          <caption>Every day goes on the record. Misses too.<small>Updated {updated} · copied by hand from Traction’s own board</small></caption>
          <tbody>{record.map((row) => <tr key={`${row.date}-${row.entry}`}><td>{row.date}</td><td>{row.entry}</td><td data-status={row.status}>{row.status}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Ask for a first read.</h2>
      <div>
        <div>
          <p>Bring your live app. We read what it already shows and come back with one strength, one constraint and the next customer move.</p>
          <p><a href="/traction/first-read">Read a sample first read →</a> · <a href="/partnership">What comes after the read →</a></p>
          <dl>
            <div><dt>Reply time</dt><dd>One working day</dd></div>
            <div><dt>For</dt><dd>Founders with a live app</dd></div>
          </dl>
        </div>
        <EnquiryForm situation="traction" />
      </div>
    </section>
  </>;
}
