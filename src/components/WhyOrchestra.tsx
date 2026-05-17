const pillars = [
  {
    title: 'Production engineering, first',
    body: 'Multi-tenant, audit-ready, cost-controlled. We have run advanced microservice stacks on AWS for businesses that could not afford to be wrong.',
  },
  {
    title: 'Specialised in vertical SaaS',
    body: 'Every engagement is a vertical SaaS or a production AI workflow. No horizontal generalism — depth in the shape of system you actually run.',
  },
  {
    title: 'Framework- and model-neutral',
    body: 'LangGraph, CrewAI, Mastra, Claude or OpenAI Agent SDKs — and any model. Your stack, your call. Orchestra adapts.',
  },
  {
    title: 'OSS-backed methodology',
    body: 'Patterns we use repeatedly become opinionated libraries — multi-tenant agent isolation, MCP-from-schema, audit-grade logging. The methodology is inspectable, not a black box.',
  },
];

export function WhyOrchestra() {
  return (
    <section aria-labelledby="why-title">
      <p className="eyebrow">Why Orchestra</p>
      <h2 id="why-title">Depth where it matters.</h2>
      <div
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {pillars.map((p) => (
          <article key={p.title}>
            <h3>{p.title}</h3>
            <p style={{ marginBlockStart: 'var(--space-s)' }}>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
