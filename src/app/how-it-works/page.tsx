import { websiteOpenGraph } from '@/lib/share-metadata';
import type { Metadata } from 'next';
import { Organisation } from '@/components/Organisation';
import { OperatingSystem } from '@/components/OperatingSystem';
import '../operating-system.css';
import { Footer } from '@/components/Footer';
import { visibleArticles } from '@/lib/article-catalogue';
export const metadata: Metadata = {title:'Embed your app on Orchestra OS',description:'Explore the operating model connecting development, production care and customer progress around your app. An illustrative Orchestra OS journey.',alternates:{canonical:'/how-it-works'},openGraph:{...websiteOpenGraph,title:'Embed your app on Orchestra OS',description:'Development, production care and customer progress around one app. Explore the Orchestra OS operating model.',url:'https://orchestra.hyperdrift.io/how-it-works'}};
export default async function HowItWorksPage({searchParams}:{searchParams:Promise<{view?:string}>}){const {view}=await searchParams;return <>{view==='business'?<Organisation articlesAvailable={visibleArticles().length>0}/>:<OperatingSystem/>}<Footer/></>;}
