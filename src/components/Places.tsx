import Link from 'next/link';
import { situations } from '@/data/situations';
import { resolveEvidence } from '@/lib/evidence';

/** An enquiry link that preselects "Where you are" in the form. */
const enquiry = (situation: string) => ({ pathname: '/', query: { situation }, hash: '#contact' });

/**
 * The four places (screencraft/four-places). Native radios sit over the horizon;
 * the chosen place lights up and its response opens below. No client JavaScript.
 */
export function Places() {
  return (
    <section id="places" aria-labelledby="places-title">
      <h2 id="places-title">Choose where you are</h2>
      <figure>
        <picture>
          <img
            src="/shoulder/four-places-1440.webp"
            srcSet="/shoulder/four-places-960.webp 960w, /shoulder/four-places-1440.webp 1440w, /shoulder/four-places-2400.webp 2400w"
            sizes="100vw"
            alt="Past the giant's stone head, the founder points from its shoulder over a valley: a light on a hill, water channels running into fields, a stone bridge and a city in the morning."
            loading="lazy"
          />
        </picture>
      </figure>

      <fieldset aria-labelledby="places-title">
        {situations.map((s) => (
          <label key={s.slug} data-place={s.slug}>
            <input type="radio" name="place" value={s.slug} aria-controls={`panel-${s.slug}`} />
            {s.label}
          </label>
        ))}
      </fieldset>

      <p>Choose a place on the horizon to see the work and your next step.</p>

      {situations.map((s) => (
        <article key={s.slug} id={`panel-${s.slug}`} data-panel={s.slug} aria-labelledby={`panel-${s.slug}-title`}>
          <div>
            <h3 id={`panel-${s.slug}-title`}>{s.heading}</h3>
            <p>{s.who}</p>
            <p>
              <Link className="btn primary" href={enquiry(s.slug)}>
                {s.cta} <span aria-hidden>↗</span>
              </Link>
            </p>
            <details>
              <summary>How we would approach it</summary>
              <ol>
                {s.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </details>
          </div>

          <ul>
            {s.evidence
              .map((e) => resolveEvidence(e))
              .map((e) => (
                <li key={e.name}>
                  <h4>{e.name}</h4>
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
        </article>
      ))}
    </section>
  );
}
