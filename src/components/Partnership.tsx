import Link from 'next/link';
import { OfferSteps, ReadExcerpt } from '@/components/TractionOffer';
import { firstReadHref } from '@/data/traction-offer';

export function PartnershipInvitation() {
  return <section id="traction-partnership" aria-labelledby="traction-title">
    <header><p>The Traction Partnership</p><h2 id="traction-title">You’ve found momentum.<br/><em>Let’s build on it.</em></h2><p>Traction is the board. The partnership is the work we do with you on it. Both start with a read of the app you already have.</p><p><a href={firstReadHref}>Ask for a first read →</a></p></header>
    <OfferSteps />
    <ReadExcerpt />
  </section>;
}

export function Partnership() {
  return <section id="partnership" aria-labelledby="partnership-title">
    <header><p>The Traction Partnership</p><h1 id="partnership-title">Build together.<br/><em>Share the upside.</em></h1><p>You’ve built something promising. Let’s help it become a stronger business.</p></header>
    <div><h2>Start with what’s already working.</h2><p>We consider partnerships with founders who can show demand: paying customers, people returning to the product, repeat engagements, or another credible signal that someone values the work.</p><p>You bring knowledge of your customers, access to the relevant evidence, and the commitment to make decisions and follow through. We bring AI engineering and a shared focus on growth, profit and a business that is easier to run.</p>
    <h2>It runs on the board.</h2><p>Traction is the board where the partnership happens: your customers, promises and results in one place, with the next move and the evidence behind it. We get there in three steps, and each one has to earn the next. We take on a few founders at a time, because a person signs every read and every build.</p></div>
    <OfferSteps here="/partnership" />
    <div><h2>The work earns its place.</h2><p>We choose the first improvement from the evidence on your board and agree how we’ll measure it before any work begins. Eligibility, scope, measurement, costs, ownership and terms are agreed together, in conversation. A conversation explores fit; it creates no commitment for either side.</p><Link href={{pathname:'/',query:{situation:'partnership'},hash:'#contact'}}>Tell us what’s gaining traction →</Link><p><a href={firstReadHref}>Start with a first read →</a><a href="/work">Explore the work we’ve built →</a></p></div>
  </section>;
}
