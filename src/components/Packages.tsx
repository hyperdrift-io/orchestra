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

      <p className="lead" style={{ marginBlockEnd: 'var(--sp-l)' }}>
        Every product is different, so pricing is per engagement.
        Start a conversation and we will scope concretely.
      </p>

      <div
        style={{
          display: 'grid',
          gap: 'var(--sp-m)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {packages.map((p, i) => (
          <article key={p.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <p className="meta" style={{ color: 'var(--vermillion)' }}>
              Opus {String(i + 1).padStart(2, '0')}
            </p>
            <h3 style={{ marginBlockStart: 'var(--sp-s)' }}>{p.name}</h3>
            <p style={{ marginBlockStart: 'var(--sp-s)' }}>{p.summary}</p>

            <hr className="hair" style={{ marginBlock: 'var(--sp-m)' }} />

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 'var(--sp-2xs)' }}>
              {p.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    color: 'var(--cream-2)',
                    paddingInlineStart: '1.1rem',
                    position: 'relative',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      insetInlineStart: 0,
                      top: '0.55em',
                      width: '0.6rem',
                      height: '1px',
                      background: 'var(--vermillion)',
                    }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            <p className="meta" style={{ marginBlockStart: 'var(--sp-m)', color: 'var(--cream-3)' }}>
              {p.timeline}
            </p>

            <p style={{ marginBlockStart: 'var(--sp-m)' }}>
              <a className="btn primary" href="#contact">Get a quote</a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
