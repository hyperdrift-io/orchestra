'use client';

import { useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const film = {
  name: 'traction-companion',
  src: '/traction/film.mp4',
  poster: '/traction/film-poster.jpg',
  captions: '/traction/film.en.vtt',
  label: 'Traction at work: a 57-second film with captions, on an example board for a fictional studio booking app',
  caption: 'Traction at work, in 57 seconds. An example board for a fictional studio booking app.',
  transcript: 'You built something good. Now it has to reach the people it’s for. Meet Traction. A growth partner for your app. It shows where you stand, and what it takes to reach the next stage. No forms. Just tell it what happened. It fills in the board for you. It researches each prospect, and shows who to reach first. Then it drafts the first email, in your voice. You decide what gets sent. Every move sits on one timeline, beside your numbers, so you can see what brings people in. We set it up with you, and work on it together. Let’s find your next users.',
};

/** The board at work in under a minute, filmed on fictional data; the words are on screen, in the captions track and in the transcript. */
export function TractionFilm() {
  const played = useRef(false);
  return <figure data-traction-film>
    <video controls playsInline preload="none" poster={film.poster} aria-label={film.label}
      onPlay={() => { if (!played.current) { played.current = true; trackEvent('film_played', { film: film.name }); } }}
      onEnded={() => trackEvent('film_completed', { film: film.name })}>
      <source src={film.src} type="video/mp4" />
      <track kind="captions" src={film.captions} srcLang="en" label="English" />
      <a href={film.src}>Watch the film</a>
    </video>
    <figcaption>{film.caption}</figcaption>
    <details><summary>Read the film</summary><p>{film.transcript}</p></details>
  </figure>;
}
