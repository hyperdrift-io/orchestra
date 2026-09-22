import Image from 'next/image';
import { caseStudies } from '@/data/case-studies';
import { visibleArticles } from '@/lib/article-catalogue';

const businessValue: Record<string,string> = {
  standup: 'See which requests need attention and where a team can move work forward.',
  helm: 'Give delegated work a clear owner, a defined scope and a visible result.',
  'uk-gov-radar': 'Find relevant opportunities and inspect the evidence before deciding what to pursue.',
  unanswered: 'Connect relevant expertise with people already asking for help.',
  'bridge-voice': 'Talk through a business decision with the evidence and available actions in view.',
};
const headlines: Record<string,string> = {
  standup: 'Find the next useful action.',
  helm: 'Give work a clear boundary.',
  'uk-gov-radar': 'Recognise the right opportunity.',
  unanswered: 'Put expertise where it helps.',
  'bridge-voice': 'Talk through the next move.',
};
const recordings: Record<string,{id:string;title:string}> = {
  helm: {id:'JB2O3WSwH90',title:'Helm: recorded sandbox diagnosis and recovery'},
  'uk-gov-radar': {id:'z4B0gtwbjB4',title:'uk.gov Radar: recorded opportunity discovery'},
};

export function Proof({catalogue=false}:{catalogue?:boolean}) {
  const articlesAvailable=visibleArticles().length>0;
  const works = caseStudies.filter(cs=>cs.challenge && (catalogue||['standup','helm','uk-gov-radar'].includes(cs.slug)));
  const Heading = catalogue ? 'h1' : 'h2';
  return <section id="proof" data-catalogue={catalogue} aria-labelledby="proof-title">
    <Heading id="proof-title">{catalogue?'Real work. Open to inspection.':'See what we can put to work for you.'}</Heading>
    <p>Explore real builds that turn information into clearer decisions and useful action. Public demonstrations and prototypes, built by Hyperdrift.</p>
    <ol>{works.map(cs=><li key={cs.slug} id={`work-${cs.slug}`}>
      <p data-project-name>{cs.name}</p>
      <h3>{headlines[cs.slug]??cs.name}</h3>
      <p>{businessValue[cs.slug]??cs.capability}</p>
      {cs.slug==='standup'&&<figure><Image src="/articles/standup.jpg" alt="Opening frame of the recorded Standup demonstration" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 420px"/><figcaption>Public project · Standup</figcaption></figure>}
      {recordings[cs.slug]&&<figure><iframe src={`https://www.youtube-nocookie.com/embed/${recordings[cs.slug].id}`} title={recordings[cs.slug].title} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen/><figcaption>{cs.slug==='helm'?'Recorded sandbox demonstration':'Recorded product demonstration'}</figcaption></figure>}
      {cs.slug==='unanswered'&&<figure><video controls playsInline preload="none" poster="/recordings/unanswered-poster.jpg" aria-label="Unanswered: from skills to a relevant request and a first reply"><source src="/recordings/unanswered-demo.mp4" type="video/mp4"/><track kind="captions" src="/recordings/unanswered-demo.vtt" srcLang="en" label="English"/><a href="/recordings/unanswered-demo.mp4">Watch the Unanswered demonstration</a></video><figcaption>14-second recorded walkthrough · search, match and draft. Results shown are from the recording.</figcaption><details><summary>Read the walkthrough</summary><p>Choose the experience you can offer. Unanswered finds relevant requests from open-source maintainers, explains the match and prepares an opening reply. Read it, edit it and decide whether to send it yourself. Nothing is posted on your behalf.</p></details></figure>}
      {catalogue?<>
        <p>{cs.outcome}</p>
        <p>Built for {cs.challenge!.organiser} · <a href={cs.challenge!.url}>{cs.challenge!.name}</a></p>
        <p>{cs.challenge!.stage}</p>
        <p>
          {cs.link&&<a href={cs.link} target="_blank" rel="noreferrer">{cs.linkLabel??'Open'} ↗</a>}
          {cs.repo&&<a href={cs.repo} target="_blank" rel="noreferrer">Source ↗</a>}
          {cs.article&&<a href={cs.article}>Read the build ↗</a>}
          {cs.challenge!.entryUrl&&<a href={cs.challenge!.entryUrl}>Challenge entry ↗</a>}
        </p>
      </>:<p><a href={`/work#work-${cs.slug}`}>Explore {cs.name} →</a></p>}
    </li>)}</ol>
    <footer>{catalogue?<p><a href="/#contact">What could we put to work in your business? →</a></p>:<><a href="/work">Explore all our work →</a><a href={articlesAvailable?'/articles':'https://hyperdrift.io/blog'}>{articlesAvailable?'Read the AI-native series':'Read our engineering notes'} →</a></>}</footer>
  </section>;
}
