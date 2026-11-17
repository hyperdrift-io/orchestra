import type { Metadata } from 'next/types';
export const metadata: Metadata = {
 metadataBase:new URL('https://hyperdrift.io'), title:{default:'Hyperdrift — A team behind your app',template:'%s — Hyperdrift'},
 description:'Grow your app with Traction. Build and run it with Hyperdrift. An AI team works with you, with your approval on consequential decisions.',
 robots:process.env.MIGRATION_PREVIEW === 'true' ? {index:false,follow:false}:undefined,
 openGraph:{type:'website',siteName:'Hyperdrift',locale:'en_GB',images:[{url:'/opengraph-image',width:1200,height:630}]},
 twitter:{card:'summary_large_image',images:['/opengraph-image']},
};
export const organisation = JSON.stringify({'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':'https://hyperdrift.io/#organization',name:'Hyperdrift',url:'https://hyperdrift.io',logo:'https://hyperdrift.io/assets/hyperdrift-logo.svg',founder:{'@type':'Person',name:'Yann Vallery-Radot',sameAs:'https://www.linkedin.com/in/yannvr/'},sameAs:['https://github.com/hyperdrift-io']},
 {'@type':'WebSite','@id':'https://hyperdrift.io/#website',name:'Hyperdrift',url:'https://hyperdrift.io',publisher:{'@id':'https://hyperdrift.io/#organization'},inLanguage:'en-GB'}]}).replace(/</g,'\u003c');
