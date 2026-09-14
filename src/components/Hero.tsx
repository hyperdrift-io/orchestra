export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="staff" aria-hidden />

      <p className="eyebrow reveal" data-stagger="0">
        Orchestra AI <span className="meta">By Hyperdrift · 2026</span>
      </p>

      <h1 id="hero-title" className="reveal" data-stagger="1">
        Agent orchestration<br />
        for <em>production</em> AI workflows.
      </h1>

      <p className="lead reveal" data-stagger="2">
        We make agents production-grade inside the vertical SaaS you have
        already shipped. Multi-tenant, audit-ready, model-neutral —
        built by founding engineers.
      </p>

      <nav className="reveal" data-stagger="3" aria-label="Primary actions">
        <a className="btn primary" href="#contact">
          Start a project
          <span aria-hidden>↗</span>
        </a>
        <a className="btn ghost" href="#case-studies">See case studies</a>
        <a className="btn ghost" href="https://hyperdrift.io/blog/hyperdrift-turns-one">
          Hyperdrift turns one <span aria-hidden>↗</span>
        </a>
      </nav>

      <figure className="reveal" data-stagger="4">
        <img
          src="/hero-orchestra.webp"
          alt="A conductor raising a baton over an orchestra of glowing automation pipelines"
        />
      </figure>

      <dl className="reveal" data-stagger="4">
        <div>
          <dt className="meta">Practice</dt>
          <dd>Agent orchestration · MCP integrations</dd>
        </div>
        <div>
          <dt className="meta">For</dt>
          <dd>Vertical SaaS, Seed → Series B</dd>
        </div>
        <div>
          <dt className="meta">Partners</dt>
          <dd>
            <a href="#partnership">Tecknuovo · Vodafone3 · Databricks</a>
          </dd>
        </div>
        <div>
          <dt className="meta">Partnership</dt>
          <dd>
            <a href="#partnership">Build with Hyperdrift</a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
