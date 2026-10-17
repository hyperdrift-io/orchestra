'use client';

import { useState } from 'react';

const areas = [
  {
    name: 'Direction',
    title: 'Know where to put your effort.',
    description: 'We’ll help sharpen your positioning and choose a goal worth working towards. AI prepares recommendations from the product and customer evidence you share.',
    example: [
      ['Ambition', 'Help independent studios manage bookings without a spreadsheet.'],
      ['Focus', 'Start with studios mixing classes and private sessions.'],
      ['Useful result', 'A studio runs its real bookings in the app.'],
    ],
  },
  {
    name: 'Customers',
    title: 'Build relationships with the right people.',
    description: 'Your CRM keeps research, conversations and agreed next steps together. AI prepares introductions in your voice; you decide who to contact and what to send.',
    example: [
      ['Prospect', 'Alex runs a studio with classes and private sessions.'],
      ['Approach', 'A personal introduction showing how the app could help with both.'],
      ['Follow-through', 'Keep Alex’s reply and the agreed walkthrough with the relationship.'],
    ],
  },
  {
    name: 'First use',
    title: 'Make their first experience count.',
    description: 'Interest only helps if people can use what you’ve built. We’ll look at onboarding with you, find what gets in the way and agree the improvements to make.',
    example: [
      ['Feedback', 'Alex can create classes, but can’t see how to add a private session.'],
      ['Action', 'Make both booking types clear during setup.'],
      ['Check', 'Can Alex publish a real schedule without help?'],
    ],
  },
  {
    name: 'Lasting value',
    title: 'Learn what makes people come back.',
    description: 'Set measures around your app’s actual value. Customer feedback and repeat use help us decide where to invest more effort or change direction.',
    example: [
      ['Measure', 'Studios returning to manage their next week of bookings.'],
      ['Listen for', 'What they still do outside the app, and why.'],
      ['Next decision', 'Choose the next improvement from what those studios need.'],
    ],
  },
];

/** Illustrates the partnership using one fictional app; no customer data or model calls. */
export function TractionWalkthrough() {
  const [selected, setSelected] = useState(0);
  const area = areas[selected];
  return <div data-traction-walkthrough>
    <div role="group" aria-label="How we can help">
      {areas.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="traction-example" onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <div id="traction-example" aria-live="polite">
      <header><h3>{area.title}</h3><p>{area.description}</p></header>
      <details key={area.name} data-work-example>
        <summary>See an example</summary>
        <p>Fictional example · a studio booking app</p>
        <dl>{area.example.map(([label, detail]) => <div key={label}><dt>{label}</dt><dd>{detail}</dd></div>)}</dl>
      </details>
    </div>
  </div>;
}
