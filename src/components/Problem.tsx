export function Problem() {
  return (
    <section aria-labelledby="problem-title">
      <p className="eyebrow">The problem</p>
      <h2 id="problem-title">Agents that work in dev break in production.</h2>
      <p className="lead" style={{ marginBlockStart: 'var(--space-m)' }}>
        Demos do not survive contact with real products. Multi-tenancy, audit, cost
        spikes, tool failures, customer load — the gap between an AI prototype and
        a feature your customers can rely on is exactly where most teams stall.
      </p>
      <p style={{ marginBlockStart: 'var(--space-m)', maxWidth: '60ch' }}>
        Orchestra exists to close that gap. We bring 25+ years of production
        engineering to the orchestration of agents inside live SaaS products.
      </p>
    </section>
  );
}
