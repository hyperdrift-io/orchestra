import { caseStudies } from '@/data/case-studies';

/**
 * The proof (screencraft/proof): the footprints are the work. Numbered markers sit on
 * the footprints in the art; the same numbers lead each entry below. Participation
 * credit only, never an award or endorsement.
 */
export function Proof() {
  const works = caseStudies.filter((cs) => cs.challenge);

  return (
    <section id="proof" aria-labelledby="proof-title">
      <figure>
        <picture>
          <img
            src="/shoulder/proof-1440.webp"
            srcSet="/shoulder/proof-960.webp 960w, /shoulder/proof-1440.webp 1440w, /shoulder/proof-2400.webp 2400w"
            sizes="100vw"
            alt="Seen from above, the giant's footprints cross the country and each one now holds something thriving: a harbour, an orchard, a workshop. The founder stands on the giant's shoulder looking back along the trail."
            loading="lazy"
          />
        </picture>
      </figure>
      <h2 id="proof-title">Where the giant has walked, things grow.</h2>

      <ol>
        {works.map((cs) => (
          <li key={cs.slug} id={`work-${cs.slug}`}>
            <h3>{cs.name}</h3>
            <p>{cs.capability}</p>
            <p className="meta">
              Built for {cs.challenge!.organiser} · <a href={cs.challenge!.url}>{cs.challenge!.name}</a>
            </p>
            <p className="meta">{cs.challenge!.stage}</p>
            <p>
              {cs.link && (
                <a href={cs.link} target="_blank" rel="noreferrer">
                  {cs.linkLabel ?? 'Open'} ↗
                </a>
              )}
              {cs.repo && (
                <a href={cs.repo} target="_blank" rel="noreferrer">
                  Source ↗
                </a>
              )}
              {cs.article && <a href={cs.article}>Read the build ↗</a>}
              {cs.challenge!.entryUrl && <a href={cs.challenge!.entryUrl}>Challenge entry ↗</a>}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
