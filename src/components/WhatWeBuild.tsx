import { capabilities } from '@/data/what-we-build';

export function WhatWeBuild() {
  return (
    <section aria-labelledby="build-title">
      <p className="eyebrow">What we build</p>
      <h2 id="build-title">Production-grade agent capabilities.</h2>
      <div
        style={{
          marginBlockStart: 'var(--space-l)',
          display: 'grid',
          gap: 'var(--space-l)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {capabilities.map((c) => (
          <article key={c.title}>
            <h3>{c.title}</h3>
            <p style={{ marginBlockStart: 'var(--space-s)' }}>{c.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
