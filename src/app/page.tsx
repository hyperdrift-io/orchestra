import { Hero } from '@/components/Hero';
import { Situations } from '@/components/Situations';
import { CurrentContent } from '@/components/CurrentContent';
import { Partnership } from '@/components/Partnership';
import { Programme } from '@/components/Programme';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Hero />
      <Situations />
      <CurrentContent />
      <Partnership />
      <Programme />
      <Contact />
      <Footer />
    </>
  );
}
