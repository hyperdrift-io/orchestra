import { EnquiryForm } from '@/components/EnquiryForm';
import { count, gates, launched, record, updated } from '@/data/traction';

/** Traction's launch page: the promise, the trailer, the public count and record, then a first read. */
export function Traction() {
  return <>
    <section id="traction" aria-labelledby="traction-title">
      <header>
        <p>Traction · launched {launched}</p>
        <h1 id="traction-title">A growth board wired <em>to your live app.</em></h1>
        <p>We’re launching it on itself, from zero, in public. An AI runs the launch. A human signs every word.</p>
        <a href="#contact">Ask for a first read →</a>
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
          <h2><span className="numeral">{count.founders}/{count.of}</span> founders on the board</h2>
          <ol>{gates.map((gate) => <li key={gate.label} aria-current={gate.current ? 'step' : undefined}><span>{gate.label}</span>{gate.text}</li>)}</ol>
          <p>Each gate opens on evidence, never on a date.</p>
        </div>
        <table>
          <caption>Every day goes on the record. Misses too.<small>Updated {updated} · copied by hand from Traction’s own board</small></caption>
          <tbody>{record.map((row) => <tr key={`${row.date}-${row.entry}`}><td>{row.date}</td><td>{row.entry}</td><td data-status={row.status}>{row.status}</td></tr>)}</tbody>
        </table>
      </div>
      <figure>
        <video controls playsInline preload="none" poster="/traction/walkthrough-poster.jpg" aria-label="What a first read gives you, shown on Traction’s own board: 45 seconds, narrated, captions on screen">
          <source src="/traction/walkthrough.mp4" type="video/mp4" />
          <a href="/traction/walkthrough.mp4">Watch the walkthrough</a>
        </video>
        <figcaption>The walkthrough · 45 s · a first read, your board, the partnership, on Traction’s own board. Voice and score made with ElevenLabs.</figcaption>
        <details><summary>Read the walkthrough</summary><p>You’ve got a live app. Here’s what a first read gives you. We read what it already shows, and come back with one strength, one constraint, and your next customer move. Prepared by an AI. Signed by a human.</p><p>Then the move goes on a board. Like this one. Every move has an owner, and a time. What slips stays on the record. What lands carries its result. And the count moves only on evidence.</p><p>When your board shows demand, we build the next step with you. That’s the Traction Partnership. This launch runs on the board. From zero. In public. Ask for a first read.</p></details>
      </figure>
    </section>
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Ask for a first read.</h2>
      <div>
        <div>
          <p>Bring your live app. We read what it already shows and come back with one strength, one constraint and the next customer move.</p>
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
