import Link from 'next/link';
import { situations } from '@/data/situations';
import { resolveEvidence } from '@/lib/evidence';

/** The enquiry form reads ?situation= and prefills its "Where you are" field. */
const enquiry = (situation: string) => ({ pathname: '/', query: { situation }, hash: '#contact' });

export function Situations() {
  return (
    <section id="situations" aria-label="Choose where you are">
      {situations.map((s, i) => (
        <details key={s.slug} id={`situation-${s.slug}`} name="situation" data-stage={s.slug}>
          <summary>
            <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
            {s.label}
          </summary>

          <div>
            <div>
              <h2>{s.heading}</h2>
              <p>{s.who}</p>
              <p>
                <Link className="btn primary" href={enquiry(s.slug)}>
                  {s.cta} <span aria-hidden>↗</span>
                </Link>
              </p>
            </div>

            <ul>
              {s.evidence
                .map((e) => resolveEvidence(e))
                .map((e) => (
                  <li key={e.name}>
                    <h3>{e.name}</h3>
                    <p>{e.summary}</p>
                    {e.relation && <p className="meta">{e.relation}</p>}
                    <p>
                      {e.actions.map((a) => (
                        <a key={a.href} href={a.href} target="_blank" rel="noreferrer">
                          {a.label} ↗
                        </a>
                      ))}
                    </p>
                  </li>
                ))}
            </ul>
          </div>

          <details>
            <summary>How we would approach it</summary>
            <ol>
              {s.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </details>
        </details>
      ))}

      <figure>
        <img
          src="/hero-orchestra.webp"
          alt="A conductor raising a baton over an orchestra of glowing automation pipelines"
        />
      </figure>
    </section>
  );
}
