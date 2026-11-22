import { EnquiryForm } from './EnquiryForm';
import { enquiryCopy, type EnquiryLanguage } from '@/data/enquiry-copy';
import { pageMetadata } from '@/lib/site-metadata';

type ContactQuery = Record<string, string | string[] | undefined>;
export type ContactPageProps = { searchParams: Promise<ContactQuery> };
export function contactMetadata(language: EnquiryLanguage) {
  const t = enquiryCopy[language];
  const languages = { en: '/contact', fr: '/fr/contact' };
  return { ...pageMetadata(t.title, t.description, languages[language]), alternates: { canonical: languages[language], languages } };
}

export async function ContactPage({ language, searchParams }: ContactPageProps & { language: EnquiryLanguage }) {
  const params = await searchParams;
  const situation = typeof params.situation === 'string' ? params.situation : undefined;
  const t = enquiryCopy[language];
  return <section id="contact"><h1>{t.heading}</h1><p>{t.lede}</p>
    <EnquiryForm language={language} paused={process.env.MIGRATION_PREVIEW === 'true'} situation={situation}
      quote={situation === 'subscription'} introduce={situation === 'partnership'} />
  </section>;
}
