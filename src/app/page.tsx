import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { WhyOrchestra } from '@/components/WhyOrchestra';
import { HowWeWork } from '@/components/HowWeWork';
import { WhatWeBuild } from '@/components/WhatWeBuild';
import { CaseStudies } from '@/components/CaseStudies';
import { Packages } from '@/components/Packages';
import { Faq } from '@/components/Faq';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <WhyOrchestra />
      <HowWeWork />
      <WhatWeBuild />
      <CaseStudies />
      <Packages />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
