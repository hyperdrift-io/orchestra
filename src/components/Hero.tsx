export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <p className="eyebrow">Orchestra AI</p>
      <h1 id="hero-title">Agent orchestration for production AI workflows.</h1>
      <p className="lead" style={{ marginBlockStart: 'var(--space-m)' }}>
        We make agents production-grade inside the vertical SaaS you have already shipped.
        Multi-tenant, audit-ready, model-neutral — built by founding engineers.
      </p>
      <div style={{ marginBlockStart: 'var(--space-l)', display: 'flex', gap: 'var(--space-s)', flexWrap: 'wrap' }}>
        <a className="primary" href="#contact">Start a project</a>
        <a className="ghost" href="#case-studies">See case studies</a>
      </div>
    </section>
  );
}
