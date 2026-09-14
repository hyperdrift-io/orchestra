import { WhatWeBuild } from '@/components/WhatWeBuild';
import { WhyOrchestra } from '@/components/WhyOrchestra';
import { HowWeWork } from '@/components/HowWeWork';
import { CaseStudies } from '@/components/CaseStudies';
import { Packages } from '@/components/Packages';
import { Faq } from '@/components/Faq';

/** The long material, folded. Nothing is removed; it waits to be asked for. */
export function Programme() {
  return (
    <section id="programme" aria-labelledby="programme-title">
      <h2 id="programme-title">
        Everything else, <em>when you want it</em>.
      </h2>

      <details>
        <summary>What we build</summary>
        <WhatWeBuild />
      </details>
      <details>
        <summary>Why Orchestra, and how we work</summary>
        <WhyOrchestra />
        <HowWeWork />
      </details>
      <details>
        <summary>More work &amp; collaborations</summary>
        <CaseStudies />
      </details>
      <details>
        <summary>Services, delivery &amp; pricing</summary>
        <Packages />
      </details>
      <details>
        <summary>Common questions</summary>
        <Faq />
      </details>
    </section>
  );
}
