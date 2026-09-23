'use client';

import { useEffect, useState } from 'react';

type Entry = { id: string; title: string };

/** Native anchor links remain usable without JS; scroll tracking only adds orientation. */
export function ArticleContents({ entries, ctaLabel }: { entries: Entry[]; ctaLabel: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = entries.flatMap((entry) => {
      const element = document.getElementById(entry.id);
      return element ? [{ ...entry, element }] : [];
    });
    const end = document.getElementById('enquire');
    let frame = 0;
    let fragmentTimer: ReturnType<typeof setTimeout> | undefined;

    const update = (writeFragment: boolean) => {
      frame = 0;
      clearTimeout(fragmentTimer);
      // Match the page's 2rem anchor offset while letting a heading enter the reading area.
      const readingLine = Math.min(120, window.innerHeight * .2);
      const ordered = sections.map((section) => ({ ...section, top: section.element.getBoundingClientRect().top })).sort((a, b) => a.top - b.top);
      const current = ordered.filter((section) => section.top <= readingLine + 1).at(-1);
      setActive(current?.id ?? null);
      // Preserve explicit share/contact anchors once the reader has left the article sections.
      if (!writeFragment || !current || (end && end.getBoundingClientRect().top <= readingLine)) return;
      fragmentTimer = setTimeout(() => {
        const url = new URL(window.location.href);
        if (url.hash === `#${current.id}`) return;
        url.hash = current.id;
        // Retain Next's history state and avoid one Back entry per scroll transition.
        window.history.replaceState(window.history.state, '', url);
      }, 180);
    };
    const schedule = (writeFragment: boolean) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => update(writeFragment));
    };
    const onScroll = () => schedule(true);
    const onLayout = () => schedule(false);
    const onHashChange = () => {
      clearTimeout(fragmentTimer);
      schedule(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onLayout);
    window.addEventListener('hashchange', onHashChange);
    const observer = new ResizeObserver(onLayout);
    const body = document.getElementById('article-body');
    if (body) observer.observe(body);
    schedule(false);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fragmentTimer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onLayout);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [entries]);

  return <aside aria-label="In this article"><nav aria-label="Article sections"><p>In this article</p><ol>{entries.map((entry) => <li key={entry.id}><a href={`#${entry.id}`} aria-current={active === entry.id ? 'location' : undefined}>{entry.title}</a></li>)}</ol></nav><nav aria-label="Share or enquire"><a href="#article-share">Share article ↓</a><a href="#enquire" data-enquiry="">{ctaLabel} →</a></nav></aside>;
}
