import { LinkPreview } from '@/components/LinkPreview';
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
      {cs.walkthrough && <figure><video controls playsInline preload="none" poster={cs.walkthrough.poster} aria-label={cs.walkthrough.label}><source src={cs.walkthrough.src} type="video/mp4" /><track kind="captions" src={cs.walkthrough.captions} srcLang="en" label="English" /><a href={cs.walkthrough.src}>Watch the recorded walkthrough</a></video><figcaption>{cs.walkthrough.caption}</figcaption><details><summary>Read the walkthrough</summary><p>{cs.walkthrough.text}</p></details></figure>}
      {catalogue ? <>
        <p>{cs.outcome}</p>
        {cs.challenge && <><p>Built for {cs.challenge.organiser} · <LinkPreview href={cs.challenge.url}>{cs.challenge.name}</LinkPreview></p><p>{cs.challenge.stage}</p></>}
        <p>
          {cs.link && (cs.link.startsWith('/') ? <a href={cs.link}>{cs.linkLabel ?? 'Open'} →</a> : <LinkPreview intent="navigate" href={cs.link} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined} target="_blank" rel="noreferrer">{cs.linkLabel ?? 'Open'} ↗</LinkPreview>)}
          {cs.repo && <LinkPreview intent="navigate" href={cs.repo} target="_blank" rel="noreferrer">Source ↗</LinkPreview>}
          {cs.article && <LinkPreview href={cs.article}>Read the build ↗</LinkPreview>}
          {cs.challenge?.entryUrl && <LinkPreview href={cs.challenge.entryUrl}>Challenge entry ↗</LinkPreview>}
        </p>
      </> : <p><a href={`/work#work-${cs.slug}`} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined}>Explore {cs.name} →</a>{cs.slug === 'nextrole' && <a href={mcpEnquiryHref} data-offer="mcp">Discuss your product →</a>}</p>}
    </li>)}</ol>
    <footer>{catalogue ? <p><a href="/#contact">What could we put to work in your business? →</a></p> : <><a href="/work">Explore all our work →</a><a href={visibleArticles().length > 0 ? '/articles' : 'https://hyperdrift.io/blog'}>Read our engineering notes →</a></>}</footer>
  </section>;
}
