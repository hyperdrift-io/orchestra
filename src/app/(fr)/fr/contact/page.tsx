import { ContactPage, contactMetadata, type ContactPageProps } from '@/components/ContactPage';

export const metadata = contactMetadata('fr');
export default function Page(props: ContactPageProps) {
  return <ContactPage language="fr" {...props} />;
}
