'use client';
import { useEffect,useId,useRef,useState } from 'react';
import { businessScenarios,type BusinessScenario } from '@/data/business-scenarios';
import { createBusinessMesh,type MeshEngine } from '@/components/business-mesh';
import { BusinessDetail } from '@/components/BusinessDetail';
import { trackEvent } from '@/lib/analytics';
import { domainStories } from './domain-stories';

export function SystemGraph({scenario=businessScenarios[0]}:{scenario?:BusinessScenario}) {
  const id=useId(),canvas=useRef<HTMLCanvasElement>(null),surface=useRef<HTMLDivElement>(null),coreLabel=useRef<HTMLDivElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]),links=useRef<(HTMLButtonElement|null)[]>([]),facets=useRef<(HTMLButtonElement|null)[]>([]);
  const engine=useRef<MeshEngine|null>(null);
  const [step,setStep]=useState(0),[playing,setPlaying]=useState(true),[reduced,setReduced]=useState(false),[available,setAvailable]=useState<boolean|null>(null);
  const [contribution,setContribution]=useState<number|null>(null);
  const [focused,setFocused]=useState(false),[facet,setFacet]=useState<number|null>(null),[announcement,setAnnouncement]=useState('');
  useEffect(()=>{
    try {engine.current=createBusinessMesh({canvas:canvas.current!,host:surface.current!,coreLabel:()=>coreLabel.current,onContribution:setContribution,nodes:()=>buttons.current,facets:()=>facets.current,onStep:setStep,onFacet:setFacet,onFocus:(index)=>{trackEvent('domain_explored',{domain:scenario.steps[index].name});setStep(index);setFocused(true);setFacet(null);setAnnouncement(`Inside ${scenario.steps[index].name}. Explore signal, action, impact and measurement. Click outside the domain or press Escape to return.`);},onReset:(index)=>{setFocused(false);setFacet(null);setAnnouncement('Back to the whole business.');requestAnimationFrame(()=>links.current[index]?.focus({preventScroll:true}));},onMotion:(value)=>{setReduced(value);if(value)setPlaying(false);}});setAvailable(true);}
    catch{setAvailable(false);setPlaying(false);}
    return()=>{engine.current?.dispose();engine.current=null;};
  },[scenario]);
  useEffect(()=>{if(focused)facets.current[0]?.focus({preventScroll:true});},[focused]);
  const select=(index:number)=>{setStep(index);setFacet(null);if(available)engine.current?.select(index);else {setFocused(true);trackEvent('domain_explored',{domain:scenario.steps[index].name});}};
  const reset=()=>{engine.current?.reset();setFocused(false);setFacet(null);};
  return <div data-business-graph="globe" data-focused={focused} data-domain={step+1} onKeyDown={event=>{if(event.key==='Escape'&&focused){event.preventDefault();reset();}}}>
    <header><p>AI engineering for founders · Illustrative scenario</p><h1 id="system-title">{scenario.title}</h1><p>Follow one opportunity from the first customer signal to a better business. Explore how every part contributes to growth.</p></header>
    <div data-graph-experience>
    <nav data-domain-links aria-label="Explore the business domains" onPointerLeave={()=>engine.current?.hover(-1)}>
      {scenario.steps.map((item,i)=><button key={item.name} ref={el=>{links.current[i]=el;}} data-node={i+1} aria-label={`Explore ${item.name}`} aria-pressed={focused&&step===i} aria-controls={`${id}-detail`} onPointerEnter={event=>{if(event.pointerType==='mouse')engine.current?.hover(i);}} onFocus={event=>{if(event.currentTarget.matches(':focus-visible'))engine.current?.hover(i);}} onBlur={()=>engine.current?.hover(-1)} onClick={()=>select(i)}><strong>{item.name}</strong><span>{['Find demand','Focus effort','Remove friction','Deliver value','Build on results'][i]}</span></button>)}
    </nav>
    <div data-graph-surface ref={surface} onPointerLeave={()=>engine.current?.hover(-1)}>
      <canvas ref={canvas} aria-label="Living business network. Select a coloured object to explore its signal, action, impact and measurement. Click outside the domain to return." />
      {scenario.steps.map((item,i)=><button key={item.name} hidden={!available||focused} ref={el=>{buttons.current[i]=el;}} data-node={i+1} aria-label={`${i+1}. ${item.name}: ${item.title}`} aria-pressed={step===i} aria-controls={`${id}-detail`} onPointerEnter={e=>{if(e.pointerType==='mouse')engine.current?.hover(i);}} onFocus={event=>{if(event.currentTarget.matches(':focus-visible'))engine.current?.hover(i);}} onBlur={()=>engine.current?.hover(-1)} onClick={()=>select(i)}><span>{item.name}</span></button>)}
      {domainStories[step].facets.map((label,i)=><button key={label} hidden={!focused||!available} ref={el=>{facets.current[i]=el;}} data-facet={label} aria-label={`Explore ${label.toLowerCase()} facet`} aria-pressed={facet===i} onClick={()=>{setFacet(i);engine.current?.facet(i);setAnnouncement(`${label}: ${[scenario.steps[step].signal,scenario.steps[step].action,scenario.steps[step].impact,scenario.steps[step].measure][i]}`);}}><span>{label}</span></button>)}
      {available===false&&<p role="status">The animated view is unavailable. Select a domain to explore every action and impact.</p>}
      <div data-business-core ref={coreLabel} hidden={focused}><strong>Your business</strong><span>{contribution===null?'Every contribution builds on the last.':['Customer insight received','A focused decision','An improvement delivered','Value reaches customers','Learning retained'][contribution]}</span></div>
      <div data-scene-tools>
        {focused&&<button onClick={reset} aria-label="Return to the whole business">← Whole business</button>}
        {!reduced&&available&&<button aria-label={playing?'Pause animation':'Resume animation'} onClick={()=>{const next=!playing;setPlaying(next);engine.current?.play(next);}}>{playing?'Ⅱ':'▷'}</button>}
      </div>
      <p data-graph-instruction>{focused?'Select an action to see its impact · click outside to return':'Explore your next stage. Select a domain.'}</p>
    </div>
    {focused&&<BusinessDetail step={scenario.steps[step]} index={step} id={`${id}-detail`} facet={facet} domain={step}/>}
    </div>
    <p data-business-outcome><span>The founder’s objective</span><strong>{scenario.outcome}</strong></p>
    <p data-announcement role="status">{announcement}</p>
  </div>;
}
