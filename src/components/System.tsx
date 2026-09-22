import { SystemGraph } from '@/components/SystemGraph';

export function System() {
  return <section id="system" aria-labelledby="system-title">
    <SystemGraph />
    <div data-proposition>
      <p>For founders with momentum</p>
      <h2>Grow your business.<br /><em>Keep more of the upside.</em></h2>
      <p>You’ve built something people want. We bring AI engineering to the next stage: turning customer demand into growth, making delivery more profitable, and giving you room to lead.</p>
      <p><a href="#contact">Discuss your next stage</a><a href="#traction-partnership">Explore a Traction Partnership →</a></p>
      <small>For businesses with customers, active users or a clear signal of demand. Start with one measurable opportunity.</small>
    </div>
    <p data-explore-link><a href="/how-it-works">See how the whole organisation learns and grows →</a></p>
  </section>;
}
