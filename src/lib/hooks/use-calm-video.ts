import { useCallback } from 'react';

/** A muted loop holds still for anyone whose system asks for less motion: it keeps its poster and gains controls. */
export function useCalmVideo() {
  return useCallback((video: HTMLVideoElement | null) => {
    if (!video || !matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.pause();
    video.removeAttribute('autoplay');
    video.controls = true;
  }, []);
}
