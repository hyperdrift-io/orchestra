"use client";
import {useEffect} from 'react';
import {journeyStartHref} from '@/lib/journey';
/** Keep old campaign anchors useful after the two public sites become one. */
export function Compatibility(){useEffect(()=>{
 if(location.pathname==='/' && ['#contact','#enquire'].includes(location.hash)) location.replace('/contact'+location.search);
 const links=Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="https://traction.hyperdrift.io/start"]'));
 const update=(event:Event)=>{const link=event.currentTarget as HTMLAnchorElement;link.href=journeyStartHref(link.href)};
 links.forEach(link=>{link.href=journeyStartHref(link.href);link.addEventListener('pointerdown',update);link.addEventListener('click',update)});
 return ()=>links.forEach(link=>{link.removeEventListener('pointerdown',update);link.removeEventListener('click',update)});
},[]);return null}
