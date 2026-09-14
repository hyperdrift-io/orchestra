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
    <section id="how" aria-labelledby="how-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>06</p>
        <p className="eyebrow">Movement VI · How we work</p>
        <h2 id="how-title">
          Three steps. No <em>theatre</em>.
        </h2>
      </div>

      <ol>
        {steps.map((s) => (
          <li key={s.n} className="card">
            <p aria-hidden className="meta">{s.n}</p>
            <p className="meta">Step {s.n}</p>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
