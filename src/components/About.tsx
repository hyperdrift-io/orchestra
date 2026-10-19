import { fits, partners } from '@/data/about';
import { siteDoor } from '@/data/site-door';

/** Where founders get stuck, what we bring to each, the work that proves it, and the door. */
export function About() {
  return <section id="about" aria-labelledby="about-title">
    <header>
      <p>About Orchestra</p>
      <h1 id="about-title">You’ve built something promising.<br/><em>Let’s help it become a stronger business.</em></h1>
      <p>We start with one workflow, agree the scope, build an improvement you can inspect, and measure its effect.</p>
      <p data-actions><a href="#contact" data-primary="">{siteDoor.label} →</a><small>{siteDoor.reply}</small></p>
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
  </section>;
}
