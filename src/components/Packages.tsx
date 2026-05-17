import { packages } from '@/data/packages';

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title">
      <p className="eyebrow">Packages</p>
      <h2 id="packages-title">Fixed-scope, scoped per engagement.</h2>
      <p className="lead" style={{ marginBlockStart: 'var(--space-m)' }}>
        Every product is different, so pricing is per engagement. Start a conversation and we will scope concretely.
      </p>
      <div
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {packages.map((p) => (
          <article
            key={p.slug}
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-l)',
              background: 'var(--surface-elevated)',
            }}
          >
            <h3>{p.name}</h3>
            <p style={{ marginBlockStart: 'var(--space-s)' }}>{p.summary}</p>
            <ul style={{ marginBlockStart: 'var(--space-m)', paddingInlineStart: '1.1rem' }}>
              {p.highlights.map((h) => (
                <li key={h} style={{ color: 'var(--text-secondary)' }}>{h}</li>
              ))}
            </ul>
            <p
              style={{
                marginBlockStart: 'var(--space-m)',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            >
              {p.timeline}
            </p>
            <p style={{ marginBlockStart: 'var(--space-m)' }}>
              <a className="primary" href="#contact">Get a quote</a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
