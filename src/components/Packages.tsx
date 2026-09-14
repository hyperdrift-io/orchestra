import { packages } from '@/data/packages';

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>08</p>
        <p className="eyebrow">Movement VIII · Packages</p>
        <h2 id="packages-title">
          Fixed-scope, scoped <em>per engagement</em>.
        </h2>
      </div>

      <p className="lead">
        Every product is different, so pricing is per engagement.
        Start a conversation and we will scope concretely.
      </p>

      <div>
        {packages.map((p, i) => (
          <article key={p.slug} className="card">
            <p className="meta">Opus {String(i + 1).padStart(2, '0')}</p>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>

            <hr className="hair" />

            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <p className="meta">{p.timeline}</p>

            <p>
              <a className="btn primary" href="#contact">Get a quote</a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
