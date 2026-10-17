'use client';

import { useState } from 'react';
import { useCalmVideo } from '@/lib/hooks/use-calm-video';

const areas = [
  {
    name: 'Direction',
    title: 'Know where to put your effort.',
    description: 'We’ll help sharpen your positioning and choose a goal worth working towards. AI prepares recommendations from the product and customer evidence you share.',
    clip: '/traction/in-action/direction.mp4',
    poster: '/traction/in-action/direction.jpg',
    shows: 'Where you stand, what the next stage needs and the one move worth making now.',
  },
  {
    name: 'Customers',
    title: 'Build relationships with the right people.',
    description: 'Your CRM keeps research, conversations and agreed next steps together. AI prepares introductions in your voice; you decide who to contact and what to send.',
    clip: '/traction/in-action/customers.mp4',
    poster: '/traction/in-action/customers.jpg',
    shows: 'Prospects ranked by fit, each one researched, and a first email drafted for you to review. Nothing is sent without you.',
  },
  {
    name: 'First use',
    title: 'Make their first experience count.',
    description: 'Interest only helps if people can use what you’ve built. We’ll look at onboarding with you, find what gets in the way and agree the improvements to make.',
    clip: '/traction/in-action/firstuse.mp4',
    poster: '/traction/in-action/firstuse.jpg',
    shows: 'One sentence turns a customer’s feedback into an action on your onboarding work, with a note on the customer and Undo beside it.',
  },
  {
    name: 'Lasting value',
    title: 'Learn what makes people come back.',
    description: 'Set measures around your app’s actual value. Customer feedback and repeat use help us decide where to invest more effort or change direction.',
    clip: '/traction/in-action/value.mp4',
    poster: '/traction/in-action/value.jpg',
    shows: 'Work and results on one timeline: as the week’s demos land, bookings reach the next stage’s target.',
  },
];

/** Each area shown on Traction’s own board, with example data from a fictional studio booking app; no customer data, no model calls. */
export function TractionWalkthrough() {
  const [selected, setSelected] = useState(0);
  const calm = useCalmVideo();
  const area = areas[selected];
  return <div data-traction-walkthrough>
    <div role="group" aria-label="How we can help">
      {areas.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="traction-example" onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <div id="traction-example" aria-live="polite">
      <header><h3>{area.title}</h3><p>{area.description}</p></header>
      <figure data-in-action key={area.name}>
        <video ref={calm} autoPlay muted loop playsInline preload="metadata" poster={area.poster} aria-label={`${area.name} on Traction’s board: ${area.shows}`}><source src={area.clip} type="video/mp4" /></video>
        <figcaption>{area.shows} <small>Traction’s board · fictional example data</small></figcaption>
      </figure>
    </div>
  </div>;
}
