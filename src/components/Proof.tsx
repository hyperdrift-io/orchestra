import Image from 'next/image';
import type { ReactElement } from 'react';
import { visibleArticles } from '@/lib/article-catalogue';
import { proofWorks, mcpEnquiryHref, type ReadingLink } from '@/lib/proof';
import { NextRoleProof } from '@/components/NextRoleProof';

interface ProofProps { catalogue?: boolean }

interface ReadingProps { links: ReadingLink[]; related?: boolean }

/** The article to read first, set large; on /work the related articles follow it. */
function Reading({ links: [lead, ...more], related = false }: ReadingProps): ReactElement {
  const label = (link: ReadingLink) => `${link.title} ${link.external ? '↗' : '→'}`;
  return <div data-reading="">
    <p>Read the article</p>
    <a href={lead.href}>{label(lead)}</a>
    {related && more.length > 0 && <ul aria-label="Related articles">{more.map((link) => <li key={link.href}><a href={link.href}>{label(link)}</a></li>)}</ul>}
  </div>;
}

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
      {cs.film?.src && <figure><video controls playsInline preload="metadata" src={cs.film.src} aria-label={`${cs.name}: recorded demonstration`} /><figcaption>{cs.film.caption}</figcaption></figure>}
      {cs.recording && <figure><iframe src={`https://www.youtube-nocookie.com/embed/${cs.recording.id}`} title={cs.recording.title} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen /><figcaption>{cs.slug === 'helm' ? 'Recorded sandbox demonstration' : 'Recorded product demonstration'}</figcaption></figure>}
      {cs.slug === 'unanswered' && <figure><video controls playsInline preload="none" poster="/recordings/unanswered-poster.jpg" aria-label="Unanswered: from skills to a relevant request and a first reply"><source src="/recordings/unanswered-demo.mp4" type="video/mp4" /><track kind="captions" src="/recordings/unanswered-demo.vtt" srcLang="en" label="English" /><a href="/recordings/unanswered-demo.mp4">Watch the Unanswered demonstration</a></video><figcaption>14-second recorded walkthrough · search, match and draft. Results shown are from the recording.</figcaption><details><summary>Read the walkthrough</summary><p>Choose the experience you can offer. Unanswered finds relevant requests from open-source maintainers, explains the match and prepares an opening reply. Read it, edit it and decide whether to send it yourself. Nothing is posted on your behalf.</p></details></figure>}
      {catalogue ? <>
        <p>{cs.outcome}</p>
        {cs.reading.length > 0 && <Reading links={cs.reading} related />}
        {(cs.link || cs.repo) && <p>
          {cs.link && <a href={cs.link} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined} target="_blank" rel="noreferrer">{cs.linkLabel ?? 'Open'} ↗</a>}
          {cs.repo && <a href={cs.repo} target="_blank" rel="noreferrer">Source ↗</a>}
        </p>}
      </> : <>
        {cs.reading.length > 0 && <Reading links={cs.reading} />}
        <p><a href={`/work#work-${cs.slug}`} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined}>Explore {cs.name} →</a>{cs.slug === 'nextrole' && <a href={mcpEnquiryHref} data-offer="mcp">Discuss your product →</a>}</p>
      </>}
    </li>)}</ol>
    <footer>{catalogue ? <p><a href="/#contact">What could we put to work in your business? →</a></p> : <><a href="/work">Explore all our work →</a><a href={visibleArticles().length > 0 ? '/articles' : 'https://hyperdrift.io/blog'}>Read our engineering notes →</a></>}</footer>
  </section>;
}
