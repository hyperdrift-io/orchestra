const pillars = [
  {
    key: 'i',
    title: 'Production engineering, first',
    body: 'Multi-tenant, audit-ready, cost-controlled. We have run advanced microservice stacks on AWS for businesses that could not afford to be wrong.',
  },
  {
    key: 'ii',
    title: 'Specialised in vertical SaaS',
    body: 'Every engagement is a vertical SaaS or a production AI workflow. No horizontal generalism — depth in the shape of system you actually run.',
  },
  {
    key: 'iii',
    title: 'Framework- and model-neutral',
    body: 'LangGraph, CrewAI, Mastra, Claude or OpenAI Agent SDKs — and any model. Your stack, your call. Orchestra adapts.',
  },
  {
    key: 'iv',
    title: 'OSS-backed methodology',
    body: 'Patterns we use repeatedly become opinionated libraries — multi-tenant agent isolation, MCP-from-schema, audit-grade logging. The methodology is inspectable, not a black box.',
  },
];

export function WhyOrchestra() {
  return (
    <section aria-labelledby="why-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>02</p>
        <p className="eyebrow">Movement II · Why Orchestra</p>
        <h2 id="why-title">
          Depth where it <em>matters</em>.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 'var(--sp-m)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {pillars.map((p) => (
          <article key={p.key} className="card">
            <p className="meta" style={{ color: 'var(--vermillion)' }}>{p.key.toUpperCase()}.</p>
            <h3 style={{ marginBlockStart: 'var(--sp-s)' }}>{p.title}</h3>
            <p style={{ marginBlockStart: 'var(--sp-s)' }}>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
