'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/** Which parts of the Traction page a visitor reached, once each: the journey behind an enquiry, keyed by the email's campaign tags. */
export function TractionJourney() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('#traction [data-journey]'));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const section = entry.target instanceof HTMLElement ? entry.target.dataset.journey : undefined;
        if (!entry.isIntersecting || !section || seen.has(section)) continue;
        seen.add(section);
        trackEvent('section_viewed', { section });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.4 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return null;
}
