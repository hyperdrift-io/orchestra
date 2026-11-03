import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TractionInvitation } from '@/components/TractionInvitation';
import { Footer } from '@/components/Footer';
import { tractionInvitation } from '@/lib/traction-invitations';
import { websiteOpenGraph } from '@/lib/share-metadata';
import '../../offering.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your invitation to Traction',
  description: 'Your next step with Traction.',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Your invitation to Traction', description: 'Work with us on what comes next for your app.', url: 'https://orchestra.hyperdrift.io/traction' },
};

export default async function InvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invitation = await tractionInvitation(token);
  if (!invitation) notFound();
  return <><TractionInvitation invitation={invitation} /><Footer /></>;
}
