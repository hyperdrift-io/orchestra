import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { About } from '@/components/About';
import { Enquiry } from '@/components/Enquiry';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {title:'About',description:'Where founders get stuck, what Orchestra brings to each, and the work that proves it. Orchestra AI is made by Hyperdrift.',alternates:{canonical:'/about'},openGraph:{...websiteOpenGraph,title:'You’ve built something promising. Let’s help it become a stronger business.',description:'Where founders get stuck, what we bring, and the work that proves it.',url:'https://orchestra.hyperdrift.io/about'}};

/** The fit between a founder's problem and our work, then the enquiry on the same page. */
export default function AboutPage(){return <><About/><Enquiry/><Footer/></>;}
