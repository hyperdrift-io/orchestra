'use client';

import { useEffect, useRef } from 'react';

/** Keep the native, expanded no-JavaScript contents; fold it on small screens after hydration. */
export function useResponsiveContents() {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const smallScreen = window.matchMedia('(max-width: 850px)');
    const update = () => { if (ref.current) ref.current.open = !smallScreen.matches; };
    update();
    smallScreen.addEventListener('change', update);
    return () => smallScreen.removeEventListener('change', update);
  }, []);
  return ref;
}
