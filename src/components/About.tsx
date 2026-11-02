import { fits, partners } from '@/data/about';

/** Where founders get stuck, what we bring to each, the work that proves it; the enquiry section that follows is the door. */
export function About() {
  return <section id="about" aria-labelledby="about-title">
    <header>
      <p>About Orchestra</p>
      <h1 id="about-title">You’ve built something promising.<br/><em>Let’s help it become a stronger business.</em></h1>
      <p>We start with one workflow, agree the scope, build an improvement you can inspect, and measure its effect.</p>
      <p>Orchestra is built by Hyperdrift, founded by Yann VR. We develop and run our own apps, and bring what we learn into our work with other founders.</p>
      <p>{partners}</p>
    </header>
    <ol aria-label="Where founders get stuck, what we bring, and the proof">
      {fits.map((fit) => <li key={fit.id}>
        <h2>{fit.problem}</h2>
        <dl>
          <div><dt>What we bring</dt><dd>{fit.bring}</dd></div>
          <div><dt>Proof</dt><dd>{fit.proof} {fit.links.map((link) => <a key={link.href} href={link.href}>{link.label} →</a>)}</dd></div>
        </dl>
      </li>)}
    </ol>
    <section aria-labelledby="company-title">
      <h2 id="company-title">Company</h2>
      <div>
        <p>Orchestra AI is made by Hyperdrift, run by its two directors, Yann Vallery-Radot, founder, and Alana Williamson.</p>
        <p>We believe in grassroots development: we build with the people who have the problem, in person when we can, and grow through the value they get from the work.</p>
        <p>We’re in London and always happy to meet our customers.</p>
        <p>Professional indemnity and public liability insurance with Hiscox.</p>
      </div>
    </section>
  </section>;
}
