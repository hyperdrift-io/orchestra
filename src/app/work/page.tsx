import { brandShareImage } from '@/lib/share-metadata';
import type { Metadata } from 'next';
import { Proof } from '@/components/Proof';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = {title:'Work you can inspect',description:'Explore Hyperdrift’s public AI builds and recorded demonstrations, from opportunity discovery to scoped agent work.',alternates:{canonical:'/work'},openGraph:{title:'Real work. Open to inspection.',description:'Explore public AI builds and recorded demonstrations by Hyperdrift.',url:'https://ai.hyperdrift.io/work',images:[brandShareImage]}};
export default function WorkPage(){return <><Proof catalogue/><Footer/></>;}
