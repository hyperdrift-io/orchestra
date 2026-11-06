'use client';

import { useState } from 'react';
import { useCalmVideo } from '@/lib/hooks/use-calm-video';

const areas = [
  {
    name: 'Direction',
    title: 'Know where to put your effort.',
    clip: '/traction/in-action/direction.mp4',
    poster: '/traction/in-action/direction.jpg',
    shows: 'Where you stand, what the next stage needs and the one move worth making now.',
  },
  {
    name: 'Customers',
    title: 'Build relationships with the right people.',
    clip: '/traction/in-action/customers.mp4',
    poster: '/traction/in-action/customers.jpg',
    shows: 'Prospects ranked by fit, each one researched, and a first email drafted for you to review. Nothing is sent without you.',
  },
  {
    name: 'First use',
    title: 'Make their first experience count.',
    clip: '/traction/in-action/firstuse.mp4',
    poster: '/traction/in-action/firstuse.jpg',
    shows: 'One sentence turns a customer’s feedback into an action on your onboarding work, with a note on the customer and Undo beside it.',
  },
  {
    name: 'Lasting value',
    title: 'Learn what makes people come back.',
    clip: '/traction/in-action/value.mp4',
    poster: '/traction/in-action/value.jpg',
    shows: 'Work and results on one timeline: as the week’s demos land, bookings reach the next stage’s target.',
  },
];

/** The engine at work, one area at a time, on example data. The clips carry their corner label; the caption says it again for small screens. */
export function TractionWalkthrough() {
  const [selected, setSelected] = useState(0);
  const calm = useCalmVideo();
  const area = areas[selected];
  return <div data-traction-walkthrough>
    <div role="group" aria-label="What Traction works on">
      {areas.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="traction-example" onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <figure id="traction-example" data-in-action key={area.name} aria-live="polite">
      <video ref={calm} autoPlay muted loop playsInline preload="metadata" poster={area.poster} aria-label={`${area.name} on Traction’s board: ${area.shows}`}><source src={area.clip} type="video/mp4" /></video>
      <figcaption><span>{area.title}</span><small>Example data</small></figcaption>
    </figure>
  </div>;
}
