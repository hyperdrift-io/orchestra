'use client';

import { useState } from 'react';

const steps = [
  { name: 'Find prospects', title: 'Who is worth a conversation?', description: 'Research a company’s product, stage and possible fit. See what the sources support and what you still need to ask.' },
  { name: 'Prepare an email', title: 'An introduction that sounds like you.', description: 'Give Traction your offer and a sample of your writing. Review and edit the draft alongside the prospect’s research.' },
  { name: 'Follow through', title: 'Pick up where you left off.', description: 'Keep the conversation, your promises and the next action with the person. Update the relationship as you learn more.' },
  { name: 'Choose a priority', title: 'A reason for your next move.', description: 'Ask AI to propose the next useful work from your saved customer evidence. Review its reasoning before you take it on.' },
];

/** An explorable example, explicitly fictional, with no customer data or model calls. */
export function TractionWalkthrough() {
  const [selected, setSelected] = useState(0);
  const step = steps[selected];
  return <div data-traction-walkthrough>
    <div role="group" aria-label="Explore Traction">
      {steps.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="traction-example" onClick={() => setSelected(index)}>{item.name}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div id="traction-example" aria-live="polite">
      <header><p>Example workspace · a studio booking app</p><h3>{step.title}</h3><p>{step.description}</p></header>
      {selected === 0 && <div data-prospect-example>
        <div><strong>Alex · Borough Studio</strong><span>Prospect</span></div>
        <dl><div><dt>Possible fit</dt><dd>A small studio with classes and private sessions.</dd></div><div><dt>What to confirm</dt><dd>How they handle bookings today, and whether changing tools would help.</dd></div><div><dt>Next step</dt><dd>Prepare a personal introduction.</dd></div></dl>
      </div>}
      {selected === 1 && <div data-email-example>
        <p><span>Subject</span> A thought for Borough Studio</p>
        <p>Hi Alex,</p>
        <p>I’m Sam, the founder of a booking app for small studios. I’d like to understand how you manage classes and private sessions, and whether what I’m building could help.</p>
        <p>Would you be open to a conversation?</p>
        <p>Sam</p>
        <small>Draft for review · nothing sent</small>
      </div>}
      {selected === 2 && <dl data-followup-example>
        <div><dt>Conversation</dt><dd>Alex wants to see how a private session fits around a class.</dd></div><div><dt>Agreed next step</dt><dd>Prepare a walkthrough using the studio’s example.</dd></div><div><dt>Owner</dt><dd>Sam · awaiting the walkthrough</dd></div>
      </dl>}
      {selected === 3 && <div data-priority-example>
        <small>AI proposal · your decision</small><h4>Make the next demo useful.</h4><p>Alex has asked about private sessions. Prepare that walkthrough before approaching more studios.</p><p><strong>Evidence:</strong> the saved conversation and agreed next step.</p><p><strong>Learn:</strong> does it solve the booking problem Alex described?</p>
      </div>}
    </div>
  </div>;
}
