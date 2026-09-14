import { capabilities } from '@/data/what-we-build';

export function WhatWeBuild() {
  return (
    <section id="build" aria-labelledby="build-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>04</p>
        <p className="eyebrow">Movement IV · What we build</p>
        <h2 id="build-title">
          Production-grade agent <em>capabilities</em>.
        </h2>
      </div>

      <ul>
        {capabilities.map((c, i) => (
          <li key={c.title}>
            <p className="meta">No. {String(i + 1).padStart(2, '0')}</p>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
