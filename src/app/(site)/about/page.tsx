import {pageMetadata} from '@/lib/site-metadata';
import {ExperienceCarousel} from '@/site/ExperienceCarousel';
import '@/../public/assets/about.css';
export const metadata=pageMetadata("About Hyperdrift","Meet Hyperdrift: the experience, team and purpose behind Traction and our AI engineering work.","/about");
export default function Page(){return <main id="main" className="company-page about-page">
  <section className="page-intro" aria-labelledby="about-title">
    <h1 id="about-title">About <span>Hyperdrift</span></h1>
    <p className="lead">Our team brings over 20 years of experience designing and delivering systems that help businesses scale. The problem we keep coming back to is growth.</p>
    <p>We integrate AI agents into complex workflows to automate the work that gets in your way. A business should focus on what it does best. The rest is a distraction.</p>
    <p><a href="/work">See our work <span aria-hidden="true">→</span></a></p>
  </section>
  <ExperienceCarousel/>
  <section className="page-close" aria-labelledby="company-title">
    <h2 id="company-title">Hyperdrift Limited</h2>
    <p>We’re <a href="https://find-and-update.company-information.service.gov.uk/company/16638188">registered in England and Wales</a> and hold technology professional indemnity and public and products liability cover with Hiscox.</p>
  </section>
</main>}
