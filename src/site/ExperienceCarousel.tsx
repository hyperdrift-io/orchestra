'use client';
import {useEffect, useId, useState, type CSSProperties} from 'react';
import '@/../public/assets/carousel.css';

const organisations = [
  ['vodafonethree', 'VodafoneThree via Tecknuovo'],
  ['hsbc', 'HSBC'], ['fis', 'FIS'], ['british-gas', 'British Gas'],
  ['financial-times', 'Financial Times'], ['channel-4', 'Channel 4'],
];

export function ExperienceCarousel() {
  const id = useId();
  const [ready, setReady] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => setReady(true), []);
  return <div className="experience-strip" data-static={!ready || showAll ? '' : undefined} role="region" aria-labelledby={`${id}-caption`}>
    <div className="experience-window" id={`${id}-organisations`}>
      <div className="experience-track">
        {[false, true].map(duplicate => <ul className="experience-names" key={String(duplicate)} aria-hidden={duplicate || undefined}>
          {organisations.map(([file, name]) => <li key={file}>
            <span className="experience-mark" role="img" aria-label={name} style={{'--logo': `url(/assets/about-logos/${file}.png)`} as CSSProperties}/>
          </li>)}
        </ul>)}
      </div>
    </div>
    <div className="experience-caption">
      <p id={`${id}-caption`}>Experience our team brings</p>
      <button className="experience-toggle" type="button" hidden={!ready} aria-pressed={showAll} aria-controls={`${id}-organisations`} onClick={() => setShowAll(!showAll)}>Show all logos</button>
    </div>
  </div>;
}
