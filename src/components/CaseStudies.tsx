import { caseStudies } from '@/data/case-studies';

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>05</p>
        <p className="eyebrow">Movement V · Case studies</p>
        <h2 id="case-studies-title">
          Applied AI, <em>shipped</em>.
        </h2>
      </div>

      <p className="lead" style={{ marginBlockEnd: 'var(--sp-l)' }}>
        Early proof from the Hyperdrift studio. Each demonstrates a pattern
        we now ship into client engagements.
      </p>

      <div
        style={{
          display: 'grid',
          gap: 'var(--sp-m)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}
      >
        {caseStudies.map((cs, i) => (
          <article key={cs.slug} className="card">
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 'var(--sp-s)',
                marginBlockEnd: 'var(--sp-s)',
              }}
            >
              <p className="meta" style={{ color: 'var(--vermillion)' }}>
                Case Op. {String(i + 1).padStart(2, '0')}
              </p>
              {cs.link && (
                <a
                  href={cs.link}
                  target="_blank"
                  rel="noreferrer"
                  className="meta"
                  style={{ color: 'var(--cream-2)', borderBottom: '1px solid var(--cream-4)' }}
                >
                  Source ↗
                </a>
              )}
            </div>

            <h3>{cs.name}</h3>

            <p
              className="lead"
              style={{
                fontSize: 'var(--fs-body)',
                color: 'var(--cream)',
                marginBlockStart: 'var(--sp-s)',
                maxWidth: '36ch',
              }}
            >
              {cs.outcome}
            </p>

            <hr className="hair" style={{ marginBlock: 'var(--sp-m)' }} />

            <dl style={{ display: 'grid', gap: 'var(--sp-s)', margin: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '5rem 1fr', gap: 'var(--sp-s)' }}>
                <dt className="meta" style={{ color: 'var(--cream-3)' }}>Problem</dt>
                <dd style={{ margin: 0, color: 'var(--cream-2)' }}>{cs.problem}</dd>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '5rem 1fr', gap: 'var(--sp-s)' }}>
                <dt className="meta" style={{ color: 'var(--cream-3)' }}>Method</dt>
                <dd style={{ margin: 0, color: 'var(--cream-2)' }}>{cs.capability}</dd>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '5rem 1fr', gap: 'var(--sp-s)' }}>
                <dt className="meta" style={{ color: 'var(--cream-3)' }}>Stack</dt>
                <dd
                  style={{
                    margin: 0,
                    color: 'var(--cream-3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-mark)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {cs.stack.join(' · ')}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
