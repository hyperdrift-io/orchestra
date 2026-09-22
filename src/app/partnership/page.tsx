import type { Metadata } from 'next';
import { Partnership } from '@/components/Partnership';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = {title:'The Traction Partnership',description:'Explore a scoped Hyperdrift partnership where useful work is evaluated against real business traction.',alternates:{canonical:'/partnership'},openGraph:{title:'Build together. Share the upside.',description:'Explore a scoped Hyperdrift Traction Partnership.',url:'https://ai.hyperdrift.io/partnership'}};
export default function PartnershipPage(){return <><Partnership/><Footer/></>;}
