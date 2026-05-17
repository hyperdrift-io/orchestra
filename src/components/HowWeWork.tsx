const steps = [
  {
    n: '01',
    title: 'Audit',
    body: 'A short, concrete read of your product, stack and the agent surface you want. No decks, no discovery theatre — we ship a written brief.',
  },
  {
    n: '02',
    title: 'Orchestrate',
    body: 'We design and build the agent flow inside your product. Multi-tenant from day one, observability and cost controls wired before launch.',
  },
  {
    n: '03',
    title: 'Handoff',
    body: 'You receive working code, documentation and runbooks. Optional retainers are available; you are never locked in.',
  },
];

export function HowWeWork() {
  return (
    <section aria-labelledby="how-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>03</p>
        <p className="eyebrow">Movement III · How we work</p>
        <h2 id="how-title">
          Three steps. No <em>theatre</em>.
        </h2>
      </div>

      <ol
        style={{
          display: 'grid',
          gap: 'var(--sp-m)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {steps.map((s) => (
          <li
            key={s.n}
            className="card"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <p
              aria-hidden
              className="meta"
              style={{
                position: 'absolute',
                top: 'var(--sp-m)',
                right: 'var(--sp-m)',
                color: 'var(--cream-4)',
              }}
            >
              {s.n}
            </p>
            <p className="meta" style={{ color: 'var(--vermillion)' }}>Step {s.n}</p>
            <h3 style={{ marginBlockStart: 'var(--sp-s)' }}>{s.title}</h3>
            <p style={{ marginBlockStart: 'var(--sp-s)' }}>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
