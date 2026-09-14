import Link from 'next/link';

export function Partnership() {
  return (
    <section id="partnership" aria-labelledby="partnership-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>02</p>
        <p className="eyebrow">Movement II · The Traction Partnership</p>
        <h2 id="partnership-title">
          Build together. <em>Share the upside.</em>
        </h2>
      </div>

      <p className="lead">
        No budget for it yet? Then we partner: we build, traction decides, and
        you keep everything we ship either way.
      </p>
      <p>
        <Link className="btn primary" href={{ pathname: '/', query: { situation: 'partnership' }, hash: '#contact' }}>
          Apply to partner <span aria-hidden>↗</span>
        </Link>
      </p>

      <details>
        <summary>How the partnership works</summary>
        <p>
          For a small number of products a quarter, we build the automation for
          free and validate the partnership on traction alone: if the work moves
          your numbers, the partnership stands and we share the upside; if it
          does not, you owe nothing and keep everything we shipped. Orchestra is
          the partner in the work. Your team stays focused on profit while the
          automation earns its place.
        </p>
        <p>
          In partnership with <strong>Tecknuovo</strong> and{' '}
          <strong>Vodafone3</strong>, contracted through Hyperdrift.
          Sponsored by <strong>Databricks</strong>.
        </p>
      </details>
    </section>
  );
}
