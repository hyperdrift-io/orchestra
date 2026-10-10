import { SystemGraph } from '@/components/SystemGraph';

export function System() {
  return <section id="system" aria-labelledby="system-title">
    <div data-proposition>
      <p>Orchestra, by Hyperdrift</p>
      <h1 id="system-title">Give your next customers<br /><em>a way in.</em></h1>
      <p>Orchestra connects customer insight, distribution and AI engineering. We help you choose the next customer move, build what’s needed and measure whether it worked.</p>
      <p><a href="#contact">Discuss your next customer move</a><a href="/partnership">Explore a Traction Partnership →</a></p>
      <small>For founders with a working product and evidence of demand. Start with one opportunity to reach customers, help them use your product or improve delivery.</small>
      <p data-experience>Led by Yann VR. Client engagements include Everything and VodafoneThree, with VodafoneThree delivered through Tecknuovo. <a href="/about">The experience behind Orchestra →</a></p>
    </div>
    <SystemGraph />
    <p data-explore-link><a href="/how-it-works">See how the whole organisation learns and grows →</a></p>
  </section>;
}
