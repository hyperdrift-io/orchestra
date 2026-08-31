import { packages } from '@/data/packages';

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>06</p>
        <p className="eyebrow">Movement VI · Packages</p>
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

      <article className="card">
        <p className="meta">The Traction Partnership</p>
        <h3>
          No budget? Then we <em>partner</em>.
        </h3>
        <p>
          For a small number of products a quarter, we build the automation for
          free and validate the partnership on traction alone: if the work moves
          your numbers, the partnership stands and we share the upside; if it
          does not, you owe nothing and keep everything we shipped. Orchestra is
          the partner in the work — your team stays focused on profit while the
          automation earns its place.
        </p>
        <p>
          <a className="btn primary" href="#contact">Apply to partner</a>
        </p>
        <footer>
          <p>
            In partnership with <strong>Tecknuovo</strong> and{' '}
            <strong>Vodafone3</strong> — contracted through Hyperdrift.
            Sponsored by <strong>Databricks</strong>.
          </p>
        </footer>
      </article>
    </section>
  );
}
