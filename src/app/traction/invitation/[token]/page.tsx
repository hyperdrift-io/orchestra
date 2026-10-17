import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Traction } from '@/components/Traction';
import { Footer } from '@/components/Footer';
import { tractionInvitation } from '@/lib/traction-invitations';
import { websiteOpenGraph } from '@/lib/share-metadata';
import '../../offering.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your invitation to Traction',
  description: 'An invitation to work on your next customers with Traction.',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
  alternates: { canonical: '/traction' },
  openGraph: { ...websiteOpenGraph, title: 'Your invitation to Traction', description: 'An invitation from Yann.', url: 'https://orchestra.hyperdrift.io/traction' },
};

export default async function InvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const invitation = await tractionInvitation((await params).token);
  if (!invitation) notFound();
  return <><Traction invitation={invitation} /><Footer /></>;
}
