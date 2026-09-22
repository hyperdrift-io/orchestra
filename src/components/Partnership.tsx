import Link from 'next/link';

export function Partnership() {
  return <section id="partnership" aria-labelledby="partnership-title">
    <header><p>The Traction Partnership</p><h1 id="partnership-title">Build together.<br/><em>Share the upside.</em></h1><p>For founders with a promising workflow and a useful outcome to pursue together.</p></header>
    <div><h2>The work earns its place.</h2><p>For a small number of products a quarter, we build the automation for free and validate the partnership on traction alone. If the work moves your numbers, the partnership stands and we share the upside. If it does not, you owe nothing and keep everything we shipped.</p><p>We agree the scope, the outcome to measure and the partnership terms together before work begins. Your team stays focused on the business while we build and evaluate the improvement.</p><Link href={{pathname:'/',query:{situation:'partnership'},hash:'#contact'}}>Tell us about the opportunity →</Link><p><a href="/work">Explore the work we’ve built →</a></p></div>
  </section>;
}
