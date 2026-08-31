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

      <p className="lead">
        Proof from the Hyperdrift studio — live products, contest entries,
        and the fleet Orchestra itself runs on. Each demonstrates a pattern
        we ship into client engagements.
      </p>

      <div>
        {caseStudies.map((cs, i) => (
          <article key={cs.slug} className="card">
            <header>
              <p className="meta">Case Op. {String(i + 1).padStart(2, '0')}</p>
              <span>
                {cs.link && (
                  <a href={cs.link} target="_blank" rel="noreferrer" className="meta">
                    {cs.linkLabel ?? 'Source'} ↗
                  </a>
                )}
                {cs.repo && (
                  <a href={cs.repo} target="_blank" rel="noreferrer" className="meta">
                    Source ↗
                  </a>
                )}
              </span>
            </header>

            <h3>{cs.name}</h3>

            <p className="lead">{cs.outcome}</p>

            <hr className="hair" />

            <dl>
              <div>
                <dt className="meta">Problem</dt>
                <dd>{cs.problem}</dd>
              </div>
              <div>
                <dt className="meta">Method</dt>
                <dd>{cs.capability}</dd>
              </div>
              <div>
                <dt className="meta">Stack</dt>
                <dd data-stack>{cs.stack.join(' · ')}</dd>
              </div>
            </dl>

            {cs.article && (
              <p>
                <a href={cs.article}>Read the build on the Hyperdrift blog →</a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
