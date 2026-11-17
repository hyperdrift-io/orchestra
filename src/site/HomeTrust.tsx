import {ExperienceCarousel} from './ExperienceCarousel';
import './styles/home-trust.css';

export function HomeTrust() {
  return <section className="home-trust" id="why-trust-us" aria-labelledby="trust-title">
    <div className="home-trust-intro">
      <div>
        <p className="eyebrow">About Hyperdrift</p>
        <h2 id="trust-title"><span>20+ years</span> helping businesses scale.</h2>
      </div>
      <div>
        <p>We’ve designed and delivered systems for complex businesses. The problem we keep coming back to is growth.</p>
        <p>We integrate AI agents into complex workflows to automate the work that gets in your way, so you can focus on what you do best.</p>
        <a href="/work">See our work <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <ExperienceCarousel/>
    <p className="home-trust-insurance">Hyperdrift Limited holds technology professional indemnity and public and products liability cover with Hiscox.</p>
  </section>;
}
