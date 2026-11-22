import { ContactPage, contactMetadata, type ContactPageProps } from '@/components/ContactPage';

export const metadata = contactMetadata('en');
export default function Page(props: ContactPageProps) {
  return <ContactPage language="en" {...props} />;
}
