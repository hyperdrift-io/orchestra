import Image from 'next/image';
import type { ReactElement } from 'react';
import { visibleArticles } from '@/lib/article-catalogue';
import { proofWorks, mcpEnquiryHref } from '@/lib/proof';
import { NextRoleProof } from '@/components/NextRoleProof';

interface ProofProps { catalogue?: boolean }

export function Proof({ catalogue = false }: ProofProps): ReactElement {
  const Heading = catalogue ? 'h1' : 'h2';
  return <section id="proof" data-catalogue={catalogue} aria-labelledby="proof-title">
    <Heading id="proof-title">{catalogue ? 'Real work. Open to inspection.' : 'See what we can put to work for you.'}</Heading>
    <p>Explore Hyperdrift’s own products and public prototypes. Each example names what it demonstrates and how you can inspect it.</p>
    <ol>{proofWorks(catalogue).map(cs => <li key={cs.slug} id={`work-${cs.slug}`}>
      <p data-project-name>{cs.name}{cs.relation && <> · {cs.relation}</>}</p>
      <h3>{cs.headline ?? cs.name}</h3>
      <p>{cs.value ?? cs.capability}</p>
      {cs.slug === 'nextrole' && <NextRoleProof catalogue={catalogue} />}
      {cs.slug === 'standup' && <figure><Image src="/articles/standup.jpg" alt="Opening frame of the recorded Standup demonstration" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 420px" /><figcaption>Public prototype · Standup</figcaption></figure>}
      {cs.recording && <figure><iframe src={`https://www.youtube-nocookie.com/embed/${cs.recording.id}`} title={cs.recording.title} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen /><figcaption>{cs.slug === 'helm' ? 'Recorded sandbox demonstration' : 'Recorded product demonstration'}</figcaption></figure>}
      {cs.slug === 'unanswered' && <figure><video controls playsInline preload="none" poster="/recordings/unanswered-poster.jpg" aria-label="Unanswered: from skills to a relevant request and a first reply"><source src="/recordings/unanswered-demo.mp4" type="video/mp4" /><track kind="captions" src="/recordings/unanswered-demo.vtt" srcLang="en" label="English" /><a href="/recordings/unanswered-demo.mp4">Watch the Unanswered demonstration</a></video><figcaption>14-second recorded walkthrough · search, match and draft. Results shown are from the recording.</figcaption><details><summary>Read the walkthrough</summary><p>Choose the experience you can offer. Unanswered finds relevant requests from open-source maintainers, explains the match and prepares an opening reply. Read it, edit it and decide whether to send it yourself. Nothing is posted on your behalf.</p></details></figure>}
      {catalogue ? <>
        <p>{cs.outcome}</p>
        {cs.challenge && <><p>Built for {cs.challenge.organiser} · <a href={cs.challenge.url}>{cs.challenge.name}</a></p><p>{cs.challenge.stage}</p></>}
        <p>
          {cs.link && <a href={cs.link} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined} target="_blank" rel="noreferrer">{cs.linkLabel ?? 'Open'} ↗</a>}
          {cs.repo && <a href={cs.repo} target="_blank" rel="noreferrer">Source ↗</a>}
          {cs.article && <a href={cs.article}>Read the build ↗</a>}
          {cs.challenge?.entryUrl && <a href={cs.challenge.entryUrl}>Challenge entry ↗</a>}
        </p>
      </> : <p><a href={`/work#work-${cs.slug}`} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined}>Explore {cs.name} →</a>{cs.slug === 'nextrole' && <a href={mcpEnquiryHref} data-offer="mcp">Discuss your product →</a>}</p>}
    </li>)}</ol>
    <footer>{catalogue ? <p><a href="/#contact">What could we put to work in your business? →</a></p> : <><a href="/work">Explore all our work →</a><a href={visibleArticles().length > 0 ? '/articles' : 'https://hyperdrift.io/blog'}>Read our engineering notes →</a></>}</footer>
  </section>;
}
