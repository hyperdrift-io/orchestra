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
      <p className="eyebrow">How we work</p>
      <h2 id="how-title">Three steps. No theatre.</h2>
      <ol
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {steps.map((s) => (
          <li key={s.n}>
            <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{s.n}</p>
            <h3 style={{ marginBlockStart: 'var(--space-xs)' }}>{s.title}</h3>
            <p style={{ marginBlockStart: 'var(--space-s)' }}>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
