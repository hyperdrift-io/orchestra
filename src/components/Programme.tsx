import { WhatWeBuild } from '@/components/WhatWeBuild';
import { WhyOrchestra } from '@/components/WhyOrchestra';
import { HowWeWork } from '@/components/HowWeWork';
import { CaseStudies } from '@/components/CaseStudies';
import { Packages } from '@/components/Packages';
import { Faq } from '@/components/Faq';

/** The long movements, folded. Nothing is removed; it waits to be asked for. */
export function Programme() {
  return (
    <section id="programme" aria-labelledby="programme-title">
      <div className="section-head">
        <p className="numeral" aria-hidden>03</p>
        <p className="eyebrow">Movement III · The full programme</p>
        <h2 id="programme-title">
          Everything else, <em>when you want it</em>.
        </h2>
      </div>

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
