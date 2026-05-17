import { caseStudies } from '@/data/case-studies';

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title">
      <p className="eyebrow">Case studies</p>
      <h2 id="case-studies-title">Applied AI, shipped.</h2>
      <p className="lead" style={{ marginBlockStart: 'var(--space-m)' }}>
        Early proof from the Hyperdrift studio. Each demonstrates a pattern we now ship into client engagements.
      </p>
      <div
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        {caseStudies.map((cs) => (
          <article
            key={cs.slug}
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-l)',
              background: 'var(--surface-elevated)',
            }}
          >
            <h3>{cs.name}</h3>
            <p style={{ marginBlockStart: 'var(--space-s)', color: 'var(--text-primary)' }}>
              {cs.outcome}
            </p>
            <dl style={{ marginBlockStart: 'var(--space-m)', display: 'grid', gap: 'var(--space-s)' }}>
              <div>
                <dt className="eyebrow">Problem</dt>
                <dd style={{ margin: 0 }}>{cs.problem}</dd>
              </div>
              <div>
                <dt className="eyebrow">Capability</dt>
                <dd style={{ margin: 0 }}>{cs.capability}</dd>
              </div>
              <div>
                <dt className="eyebrow">Stack</dt>
                <dd style={{ margin: 0, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  {cs.stack.join(' · ')}
                </dd>
              </div>
            </dl>
            {cs.link && (
              <p style={{ marginBlockStart: 'var(--space-m)' }}>
                <a href={cs.link} target="_blank" rel="noreferrer">
                  View source →
                </a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
