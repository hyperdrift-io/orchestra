export function Hero() {
  return (
    <section aria-labelledby="hero-title" style={{ paddingBlock: 'var(--sp-2xl) var(--sp-xl)' }}>
      <div className="staff" style={{ insetBlockStart: 'var(--sp-l)', opacity: 0.55 }} aria-hidden />

      <p className="eyebrow reveal" data-stagger="0">
        Orchestra AI <span className="meta" style={{ color: 'var(--cream-3)' }}>Op. 01 · 2026</span>
      </p>

      <h1
        id="hero-title"
        className="reveal"
        data-stagger="1"
        style={{ maxWidth: '15ch', marginBlockEnd: 'var(--sp-l)' }}
      >
        Agent orchestration<br />
        for <em>production</em> AI workflows.
      </h1>

      <p
        className="lead reveal"
        data-stagger="2"
        style={{ maxWidth: '38ch', marginBlockEnd: 'var(--sp-l)' }}
      >
        We make agents production-grade inside the vertical SaaS you have
        already shipped. Multi-tenant, audit-ready, model-neutral —
        built by founding engineers.
      </p>

      <div
        className="reveal"
        data-stagger="3"
        style={{ display: 'flex', gap: 'var(--sp-s)', flexWrap: 'wrap', alignItems: 'center' }}
      >
        <a className="btn primary" href="#contact">
          Start a project
          <span aria-hidden>↗</span>
        </a>
        <a className="btn ghost" href="#case-studies">See case studies</a>
      </div>

      <div className="reveal" data-stagger="4" style={{ marginBlockStart: 'var(--sp-xl)' }}>
        <img
          src="/hero-orchestra.webp"
          alt="A conductor raising a baton over an orchestra of glowing automation pipelines"
          style={{ width: '100%', display: 'block', border: '1px solid var(--line-hair)' }}
        />
      </div>

      <div
        className="reveal"
        data-stagger="4"
        style={{
          marginBlockStart: 'var(--sp-xl)',
          paddingBlockStart: 'var(--sp-m)',
          borderBlockStart: '1px solid var(--line-hair)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'var(--sp-m)',
        }}
      >
        <div>
          <p className="meta">Practice</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)', color: 'var(--cream)' }}>Agent orchestration</p>
        </div>
        <div>
          <p className="meta">For</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)', color: 'var(--cream)' }}>Vertical SaaS, Seed → Series B</p>
        </div>
        <div>
          <p className="meta">Stance</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)', color: 'var(--cream)' }}>Model · framework neutral</p>
        </div>
        <div>
          <p className="meta">Studio</p>
          <p style={{ marginBlockStart: 'var(--sp-2xs)', color: 'var(--cream)' }}>
            <a href="https://hyperdrift.io">An offspring of Hyperdrift</a>
          </p>
        </div>
      </div>
    </section>
  );
}
