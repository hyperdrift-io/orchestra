import Link from 'next/link';

export function PartnershipInvitation() {
  return <section id="traction-partnership" aria-labelledby="traction-title">
    <header><p>The Traction Partnership</p><h2 id="traction-title">You’ve found momentum.<br/><em>Let’s build on it.</em></h2></header>
    <div><p>You have people using, buying or asking for what you’re building. You’re close enough to your customers to see the next opportunity — and ready to do the work to pursue it.</p><p>We’re open to partnering with founders at that stage. You bring the customer understanding and commitment. We bring the AI engineering. Together, we agree what to improve and how we’ll measure the result.</p><p><Link href={{pathname:'/',query:{situation:'partnership'},hash:'#contact'}}>Discuss a partnership →</Link><a href="/partnership">How the partnership works →</a></p><small>Tell us what is working today, the traction you can show, and where you want to go next.</small></div>
  </section>;
}

export function Partnership() {
  return <section id="partnership" aria-labelledby="partnership-title">
    <header><p>The Traction Partnership</p><h1 id="partnership-title">Build together.<br/><em>Share the upside.</em></h1><p>You’ve built something promising. Let’s help it become a stronger business.</p></header>
    <div><h2>Start with what’s already working.</h2><p>We consider partnerships with founders who can show demand: paying customers, people returning to the product, repeat engagements, or another credible signal that someone values the work.</p><p>You bring knowledge of your customers, access to the relevant evidence, and the commitment to make decisions and follow through. We bring AI engineering and a shared focus on growth, profit and a business that is easier to run.</p><h2>The work earns its place.</h2><p>For selected projects, we can build an agreed first improvement without an upfront engineering fee, with shared upside tied to an outcome we define together. If the agreed result is not achieved, you owe nothing for that scoped work and keep what we shipped.</p><p>We agree eligibility, scope, measurement, costs, ownership and partnership terms together before work begins. A conversation explores fit; it creates no commitment for either side.</p><Link href={{pathname:'/',query:{situation:'partnership'},hash:'#contact'}}>Tell us what’s gaining traction →</Link><p><a href="/work">Explore the work we’ve built →</a></p></div>
  </section>;
}
