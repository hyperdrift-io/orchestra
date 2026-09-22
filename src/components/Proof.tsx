import { caseStudies } from '@/data/case-studies';

/** Real examples and a clear next step for the founder. */
const businessValue: Record<string,string> = {
  standup: 'See which requests need attention and where a team can move work forward.',
  helm: 'Give delegated work a clear owner, a defined scope and a visible result.',
  'uk-gov-radar': 'Find relevant opportunities and inspect the evidence before deciding what to pursue.',
  unanswered: 'Connect relevant expertise with people already asking for help.',
  'bridge-voice': 'Talk through a business decision with the evidence and available actions in view.',
};
const recordings: Record<string,{id:string;title:string}> = {
  helm: {id:'JB2O3WSwH90',title:'Helm: recorded sandbox diagnosis and recovery'},
  'uk-gov-radar': {id:'z4B0gtwbjB4',title:'uk.gov Radar: recorded opportunity discovery'},
};

export function Proof() {
  const works = caseStudies.filter((cs) => cs.challenge);

  return (
    <section id="proof" aria-labelledby="proof-title">
      <h2 id="proof-title">See what we can put to work for you.</h2>
      <p>Explore real builds that turn information into clearer decisions and useful action. These are public demonstrations and prototypes you can inspect.</p>

      <ol>
        {works.map((cs) => (
          <li key={cs.slug} id={`work-${cs.slug}`}>
            <h3>{cs.name}</h3>
            <p>{businessValue[cs.slug] ?? cs.capability}</p>
            {recordings[cs.slug] && <details>
              <summary>Watch the working example</summary>
              <iframe src={`https://www.youtube-nocookie.com/embed/${recordings[cs.slug].id}`} title={recordings[cs.slug].title} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen />
            </details>}
            <p>
              Built for {cs.challenge!.organiser} · <a href={cs.challenge!.url}>{cs.challenge!.name}</a>
            </p>
            <p>{cs.challenge!.stage}</p>
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
