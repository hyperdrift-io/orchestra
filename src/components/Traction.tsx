import { EnquiryForm } from '@/components/EnquiryForm';
import { OfferSteps, ReadExcerpt, BoardFilm, BoardValue } from '@/components/TractionOffer';
import { count, launched } from '@/data/traction';
import { launchLogHref } from '@/components/LaunchLog';

/** Traction, the service: what it is and what you get, how it starts, then a first read. The launch lives in its log. */
export function Traction() {
  return <>
    <section id="traction" aria-labelledby="traction-title">
      <header>
        <p>Traction · a growth board for your live app</p>
        <h1 id="traction-title">Know your next customer move. <em>Then keep it.</em></h1>
        <p>Your customers, promises and results on one board, with the next move proposed from the evidence. We set it up with you, keep the record honest, and build with you once the board shows demand.</p>
        <p><a href="#contact">Ask for a first read →</a><a href="#value">Watch the board at work ↓</a></p>
        <p data-live>Launching on itself, from zero, in public · <strong>{count.founders}/{count.of}</strong> founders on the board · launched {launched} · <a href={launchLogHref}>the launch log →</a></p>
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
