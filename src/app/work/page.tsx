import { websiteOpenGraph } from '@/lib/share-metadata';
import type { Metadata } from 'next';
import { Proof } from '@/components/Proof';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = {title:'Work you can inspect',description:'See NextRole’s live MCP integration and explore what Orchestra can connect to your product, alongside Hyperdrift’s public AI demonstrations.',alternates:{canonical:'/work'},openGraph:{...websiteOpenGraph,title:'Real work. Open to inspection.',description:'NextRole’s live MCP integration, Orchestra’s product integration offering and public demonstrations by Hyperdrift.',url:'https://ai.hyperdrift.io/work'}};
export default function WorkPage(){return <><Proof catalogue/><Footer/></>;}
