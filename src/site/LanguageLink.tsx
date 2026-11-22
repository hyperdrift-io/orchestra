'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {englishHref,frenchHref,type Language} from './traction/routes';

export function LanguageLink({language}:{language:Language}) {
  const pathname=usePathname();
  const other=language==='fr'?englishHref(pathname):frenchHref(pathname);
  const ref=useRef<HTMLAnchorElement>(null);
  const keepPlace=()=>{
    if(!ref.current)return;
    ref.current.search=location.search;
    ref.current.hash=location.hash;
  };
  useEffect(()=>{
    keepPlace();
    window.addEventListener('hashchange',keepPlace);
    window.addEventListener('popstate',keepPlace);
    return ()=>{window.removeEventListener('hashchange',keepPlace);window.removeEventListener('popstate',keepPlace);};
  },[pathname]);
  if(!other || other===pathname)return null;
  return <a ref={ref} href={other} lang={language==='fr'?'en':'fr'} hrefLang={language==='fr'?'en':'fr'}
    onPointerDown={keepPlace} onFocus={keepPlace} onClick={keepPlace} onContextMenu={keepPlace}>
    {language==='fr'?'English':'Français'}
  </a>;
}
