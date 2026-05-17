import { capabilities } from '@/data/what-we-build';

export function WhatWeBuild() {
  return (
    <section aria-labelledby="build-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>04</p>
        <p className="eyebrow">Movement IV · What we build</p>
        <h2 id="build-title">
          Production-grade agent <em>capabilities</em>.
        </h2>
      </div>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          borderInlineStart: '1px solid var(--line-hair)',
          borderBlockStart: '1px solid var(--line-hair)',
        }}
      >
        {capabilities.map((c, i) => (
          <li
            key={c.title}
            style={{
              padding: 'var(--sp-m)',
              borderInlineEnd: '1px solid var(--line-hair)',
              borderBlockEnd: '1px solid var(--line-hair)',
              position: 'relative',
            }}
          >
            <p className="meta" style={{ color: 'var(--vermillion)' }}>
              No. {String(i + 1).padStart(2, '0')}
            </p>
            <h3 style={{ marginBlockStart: 'var(--sp-s)' }}>{c.title}</h3>
            <p style={{ marginBlockStart: 'var(--sp-s)' }}>{c.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
