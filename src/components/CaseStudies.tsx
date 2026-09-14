import { caseStudies } from '@/data/case-studies';

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="case-studies-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>07</p>
        <p className="eyebrow">Movement VII · Case studies</p>
        <h2 id="case-studies-title">
          Applied AI, <em>in practice</em>.
        </h2>
      </div>

      <p className="lead">
        Our challenge builds put each organiser’s technology to work on a real
        problem. Explore the entries, their current stage, and the engineering
        behind them, alongside other work from Hyperdrift.
      </p>

      <div>
        {caseStudies.map((cs, i) => (
          <article key={cs.slug} className="card">
            <header>
              <p className="meta">
                {cs.challenge?.organiser ?? `Case Op. ${String(i + 1).padStart(2, '0')}`}
              </p>
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
              {cs.challenge && (
                <>
                  <div>
                    <dt className="meta">Built for</dt>
                    <dd><a href={cs.challenge.url}>{cs.challenge.name}</a></dd>
                  </div>
                  <div>
                    <dt className="meta">Stage</dt>
                    <dd>{cs.challenge.stage}</dd>
                  </div>
                </>
              )}
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

            {cs.challenge?.entryUrl && (
              <p><a href={cs.challenge.entryUrl}>Read the challenge entry →</a></p>
            )}

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
