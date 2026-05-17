export function Problem() {
  return (
    <section aria-labelledby="problem-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>01</p>
        <p className="eyebrow">Movement I · The problem</p>
        <h2 id="problem-title">
          Agents that work in dev <em>break</em> in production.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--sp-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          maxWidth: '92ch',
        }}
      >
        <p className="lead" style={{ maxWidth: '38ch' }}>
          Demos do not survive contact with real products. Multi-tenancy,
          audit, cost spikes, tool failures, customer load — the gap between
          an AI prototype and a feature your customers can rely on is exactly
          where most teams stall.
        </p>
        <p style={{ maxWidth: '40ch' }}>
          Orchestra exists to close that gap. We bring 25+ years of production
          engineering to the orchestration of agents inside live SaaS products.
          Not another framework. Not another POC. Software that holds up.
        </p>
      </div>
    </section>
  );
}
