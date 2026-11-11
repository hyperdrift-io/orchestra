import { LinkPreview } from '@/components/LinkPreview';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { moreWork, type Walkthrough, type Work } from '@/lib/proof';
import { boardFilm } from '@/data/traction-offer';
import { NextRoleProof } from '@/components/NextRoleProof';
import { siteDoor } from '@/data/site-door';

function Film({ film }: { film: Walkthrough }): ReactElement {
  return <figure><video controls playsInline preload="none" poster={film.poster} aria-label={film.label}><source src={film.src} type="video/mp4" /><track kind="captions" src={film.captions} srcLang="en" label="English" /><a href={film.src}>Watch the recorded walkthrough</a></video><figcaption>{film.caption}</figcaption><details><summary>Read the walkthrough</summary><p>{film.text}</p></details></figure>;
}

function Card({ work: cs }: { work: Work }): ReactElement {
  return <li id={`work-${cs.slug}`}>
    <p data-project-name>{cs.name}{cs.relation && <> · {cs.relation}</>}</p>
    <h3>{cs.headline}</h3>
    <p>{cs.value}</p>
    {cs.slug === 'nextrole' && <NextRoleProof />}
    {cs.slug === 'standup' && <figure><Image src="/articles/standup.jpg" alt="Opening frame of the recorded Standup demonstration" width={1920} height={1080} sizes="(max-width: 850px) 100vw, 420px" /><figcaption>Public prototype · Standup</figcaption></figure>}
    {cs.recording && <figure><iframe src={`https://www.youtube-nocookie.com/embed/${cs.recording.id}`} title={cs.recording.title} loading="lazy" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen /><figcaption>{cs.slug === 'helm' ? 'Recorded sandbox demonstration' : 'Recorded product demonstration'}</figcaption></figure>}
    {cs.walkthrough && <Film film={cs.walkthrough} />}
    <p>{cs.outcome}</p>
    {cs.challenge && <><p>Built for {cs.challenge.organiser} · <LinkPreview href={cs.challenge.url}>{cs.challenge.name}</LinkPreview></p><p>{cs.challenge.stage}</p></>}
    <p>
      {cs.link && <LinkPreview intent="navigate" href={cs.link} data-offer={cs.slug === 'nextrole' ? 'mcp' : undefined} target="_blank" rel="noreferrer">{cs.linkLabel ?? 'Open'} ↗</LinkPreview>}
      {cs.repo && <LinkPreview intent="navigate" href={cs.repo} target="_blank" rel="noreferrer">Source ↗</LinkPreview>}
      {cs.article && <LinkPreview href={cs.article}>Read the build ↗</LinkPreview>}
      {cs.challenge?.entryUrl && <LinkPreview href={cs.challenge.entryUrl}>Challenge entry ↗</LinkPreview>}
    </p>
  </li>;
}

/** /work: what working with us makes possible, proved by Traction and open source, then the wider work and one door. */
export function Proof(): ReactElement {
  return <section id="proof" data-catalogue="true" aria-labelledby="proof-title">
    <p className="eyebrow">Our work</p>
    <h1 id="proof-title">A whole team behind your app.</h1>
    <p>We find your next customers, prepare every move to reach them and build what they need. You make the calls. Here’s the proof: Traction, where we run our own launch, and open-source work you can read and use.</p>
    <nav aria-label="On this page"><a href="#work-traction">Traction ↓</a><a href="#open-source">Open source ↓</a><a href="#more-work">More work ↓</a></nav>

    <article id="work-traction" aria-labelledby="work-traction-title">
      <p data-project-name>Traction · a growth team for your app</p>
      <h2 id="work-traction-title">Work only on what lifts your business off the ground.</h2>
      <p>Traction is a new frontier for growth. It brings your initiatives, intel and CRM together to unlock your project’s growth potential. A whole team comes together to propose and track initiatives designed for your needs and your market. It takes you through every stage and helps you validate the best next step for growth, every time. Business success depends on clear communication and alignment with your vision at every step. That’s what Traction does for you.</p>
      <p>Start with a review of your website. Traction’s AI Growth Manager finds potential customers and drafts your first email. You choose who to contact, and we can do the research and outreach with you.</p>
      <Film film={boardFilm} />
      <p><a href="/traction">Explore Traction →</a></p>
    </article>

    <section id="open-source" aria-labelledby="open-source-title">
      <p className="eyebrow">Open source</p>
      <h2 id="open-source-title">Try our method on your own app.</h2>
      <ol>
        <li id="work-first-read">
          <p data-project-name>First read · our open-source Agent Skill</p>
          <p>See your app the way a stranger does. It’s the read we give a founder before we work together. Run it on your app from Claude Code or Codex: one strength, one constraint and the next customer move, each with its evidence. Its first run, on GreenLife, one of our apps, found a notification panel covering the first nudge on a phone. We built GreenLife and hadn’t seen it. The unedited output is in the repository.</p>
          <p><LinkPreview intent="navigate" href="https://github.com/hyperdrift-io/first-read" target="_blank" rel="noreferrer">Get the skill ↗</LinkPreview></p>
        </li>
        <li id="work-opentelemetry">
          <p data-project-name>OpenTelemetry · merged upstream contribution</p>
          <p>OpenTelemetry is an open standard for tracing what software does. Our founder’s change to its generative AI conventions, merged on 30 October 2026, clarifies how a conversation ID can be shared across nested AI operations, so the steps of one conversation can be found together.</p>
          <p><LinkPreview intent="navigate" href="https://github.com/open-telemetry/semantic-conventions-genai/pull/556" target="_blank" rel="noreferrer">Read the merged change ↗</LinkPreview></p>
        </li>
      </ol>
    </section>

    <section id="more-work" aria-labelledby="more-work-title">
      <h2 id="more-work-title">More work</h2>
      <p>One of our products and four of our challenge entries.</p>
      <ol>{moreWork.map((cs) => <Card key={cs.slug} work={cs} />)}</ol>
    </section>

    <footer>
      <p>Tell us about your app and the customers you want. We’ll reply with what we’d do first.</p>
      <p><a href="#enquire" data-enquiry="">{siteDoor.label} →</a></p>
    </footer>
  </section>;
}
