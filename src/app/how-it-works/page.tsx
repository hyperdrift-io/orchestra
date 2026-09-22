import { websiteOpenGraph } from '@/lib/share-metadata';
import type { Metadata } from 'next';
import { Organisation } from '@/components/Organisation';
import { Footer } from '@/components/Footer';
import { visibleArticles } from '@/lib/article-catalogue';
export const metadata: Metadata = {title:'How your organisation learns and grows',description:'Explore how connected business signals become useful decisions, scoped work and retained improvements. A living, interactive organisation by Hyperdrift.',alternates:{canonical:'/how-it-works'},openGraph:{...websiteOpenGraph,title:'Every useful signal can become progress.',description:'Learn. Improve. Build on what works. Explore the AI-native organisation.',url:'https://ai.hyperdrift.io/how-it-works'}};
export default function HowItWorksPage(){return <><Organisation articlesAvailable={visibleArticles().length>0}/><Footer/></>;}
