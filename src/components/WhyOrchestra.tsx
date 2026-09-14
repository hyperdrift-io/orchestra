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
    <section id="why" aria-labelledby="why-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>05</p>
        <p className="eyebrow">Movement V · Why Orchestra</p>
        <h2 id="why-title">
          Agents that work in dev <em>break</em> in production.
        </h2>
      </div>

      <div>
        <p className="lead">
          Demos do not survive contact with real products. Multi-tenancy,
          audit, cost spikes, tool failures, customer load — the gap between
          an AI prototype and a feature your customers can rely on is exactly
          where most teams stall.
        </p>
        <p>
          Orchestra exists to close that gap. We bring 25+ years of production
          engineering to the orchestration of agents inside live SaaS products.
          Not another framework. Not another POC. Software that holds up.
        </p>
      </div>

      <div>
        {pillars.map((p) => (
          <article key={p.key} className="card">
            <p className="meta">{p.key.toUpperCase()}.</p>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
