'use client';
import React, { useRef } from 'react';
import { operatingScenes, operatingServices } from './data';
import { useOperatingSystem } from './hooks';

import fr from './fr.json';
import type {Language} from '../routes';

export function OperatingSystem({lang}:{lang:Language}) {
  const t = (key: keyof typeof fr):string => lang==='fr'?fr[key]:key;
  const view = useOperatingSystem();
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const showOverview = () => {
    if (view.step === null) return;
    stepButtons.current[view.step]?.focus({ preventScroll: true });
    view.chooseStep(null);
  };
  const scene = view.step === null ? null : operatingScenes[view.step];
  const active = scene && operatingServices[scene.domain];
  const destination = scene && operatingServices[scene.next];

  return <section id="operating-system" aria-label={t("How Traction uses HD OS: an illustrative booking-app example")} data-signal={view.step ?? undefined}
    onKeyDown={event => {
      if (event.key === 'Escape' && scene && view.available) {
        event.preventDefault();
        showOverview();
      }
    }}>
    <div className="story">
      <header>
        <p className="eyebrow">{t("Illustrative example")}</p>
        <h2>{t("What changed for your app?")}</h2>
        <p>{t("You run booking software for independent studios. Choose any signal to see how your team responds.")}</p>
      </header>
      <nav className="signal-options" aria-label={t("Choose an illustrative signal")}>
        {operatingScenes.map((item, i) =>
          <button key={item.label} type="button" ref={el => { stepButtons.current[i] = el; }} aria-pressed={i === view.step} aria-controls="scene-detail" onClick={() => view.chooseStep(i)}>
            {t(item.label)}
          </button>
        )}
      </nav>
      {scene && active && <article className="scene-detail" id="scene-detail" style={{ '--domain': active.colour } as React.CSSProperties}>
        <p className="eyebrow">{t(active.name)}</p>
        <h3>{t(scene.title)}</h3>
        <p>{t(scene.text)}</p>
        {'cohorts' in scene && <figure className="cohorts">
          <figcaption>{t("Trials reaching a first booking")}</figcaption>
          {scene.cohorts.map(({ label, completed, enrolled }) => <div key={label}>
            <span>{t(label)}</span>
            <meter min={0} max={enrolled} value={completed} aria-label={t(label)} aria-valuetext={lang==='fr'?`${completed} essais sur ${enrolled}`:`${completed} of ${enrolled} trials`} />
            <strong>{completed} {lang==='fr'?'sur':'of'} {enrolled}</strong>
          </div>)}
        </figure>}
        <dl>
          <div><dt>{t("What HD OS connects")}</dt><dd>{t(scene.work)}</dd></div>
          <div><dt>{t("What carries forward")}</dt><dd>{t(scene.record)}</dd></div>
        </dl>
      </article>}
    </div>
    <div className="stage">
      <header className="stage-header">
        <div><p className="eyebrow">{t("HD OS")}</p><p>{t("Your app and its agent team")}</p></div>
        <div className="stage-controls">
          {view.available && scene &&
            <button type="button" onClick={showOverview}>{t("← All signals")}</button>}
          {view.available && !view.reduced &&
            <button type="button" onClick={view.toggle}>{t(view.playing?'Pause':'Play')}</button>}
        </div>
      </header>
      <div className="handoff" role="status" style={active && destination ?
        { '--domain': active.colour, '--recipient': destination.colour } as React.CSSProperties : undefined}>
        {scene ? <><p className="eyebrow">{t(scene.packet)}</p><p>{t(scene.handoff)}</p></>
          : <p>{t("Choose a signal or select a domain.")}</p>}
      </div>
      <div className="surface" ref={view.surface} data-webgl={view.available === true}>
        <img src="/assets/mesh-fallback.svg" alt={t("Market pulse, Agent team, Prospect CRM, Initiative delivery and Analytics connected around an app")} width="900" height="620" />
        <canvas ref={view.canvas} aria-hidden="true" />
        <p className="app-label" ref={view.appLabel}>{t("Your app")}</p>
        <div className="domains" role="group" aria-label={t("Explore HD OS domains")}>
          {operatingServices.map((service, i) =>
            <button key={service.id} type="button" hidden={!!scene && scene.domain !== i && scene.next !== i} ref={el => { view.labels.current[i] = el; }}
              style={{ '--domain': service.colour } as React.CSSProperties}
              data-sending={scene?.domain === i || undefined} data-receiving={scene?.next === i || undefined}
              aria-pressed={scene?.domain === i} aria-controls="scene-detail" onClick={() => {
                const step = view.chooseDomain(i);
                if (step !== undefined) stepButtons.current[step]?.focus({ preventScroll: true });
              }}>
              {t(service.name)}
            </button>
          )}
        </div>
      </div>
    </div>
  </section>;
}
