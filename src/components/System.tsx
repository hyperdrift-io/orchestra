import { SystemGraph } from '@/components/SystemGraph';

export function System() {
  return <section id="system" aria-labelledby="system-title">
    <div>
      <p>AI for the business you’re building</p>
      <h1 id="system-title">Grow your business.<br /><em>Keep more of the upside.</em></h1>
      <p>We help founders turn customer signals into better decisions and useful work. Connect AI to the business you already run — to grow revenue, protect profit and give you more time to lead.</p>
      <p><a href="#contact">Find your growth opportunity</a><a href="/how-it-works">Explore your organisation →</a></p>
      <small>Start with one workflow. We’ll reply within one working day.</small>
    </div>
    <SystemGraph />
    <p data-explore-link><a href="/how-it-works">See how the whole organisation learns and grows →</a></p>
  </section>;
}
