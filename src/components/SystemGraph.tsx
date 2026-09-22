'use client';
import { useEffect,useId,useRef,useState } from 'react';
import { businessScenarios,type BusinessScenario } from '@/data/business-scenarios';
import { createBusinessMesh,type MeshEngine } from '@/components/business-mesh';
import { BusinessDetail } from '@/components/BusinessDetail';

export function SystemGraph({scenario=businessScenarios[0]}:{scenario?:BusinessScenario}) {
  const id=useId(),canvas=useRef<HTMLCanvasElement>(null),surface=useRef<HTMLDivElement>(null);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]),facets=useRef<(HTMLButtonElement|null)[]>([]);
  const engine=useRef<MeshEngine|null>(null);
  const [step,setStep]=useState(0),[playing,setPlaying]=useState(true),[reduced,setReduced]=useState(false),[available,setAvailable]=useState<boolean|null>(null),[zoom,setZoom]=useState(1);
  const [focused,setFocused]=useState(false),[facet,setFacet]=useState<number|null>(null),[announcement,setAnnouncement]=useState('');
  useEffect(()=>{
    try {engine.current=createBusinessMesh({canvas:canvas.current!,host:surface.current!,nodes:()=>buttons.current,facets:()=>facets.current,onStep:setStep,onFocus:(index)=>{setStep(index);setFocused(true);setFacet(null);setAnnouncement(`Inside ${scenario.steps[index].name}. Explore signal, action, impact and measurement. Click outside the sphere or press Escape to return.`);},onReset:(index)=>{setFocused(false);setFacet(null);setZoom(1);setAnnouncement('Back to the whole business.');requestAnimationFrame(()=>buttons.current[index]?.focus({preventScroll:true}));},onMotion:(value)=>{setReduced(value);if(value)setPlaying(false);}});setAvailable(true);}
    catch{setAvailable(false);setPlaying(false);}
    return()=>{engine.current?.dispose();engine.current=null;};
  },[scenario]);
  useEffect(()=>{if(focused)facets.current[0]?.focus({preventScroll:true});},[focused]);
  const select=(index:number)=>{setStep(index);setFacet(null);if(available)engine.current?.select(index);};
  const reset=()=>{engine.current?.reset();setFocused(false);setFacet(null);setZoom(1);};
  const changeZoom=(value:number)=>{setZoom(value);engine.current?.zoom(value);};
  return <div data-business-graph="globe" data-focused={focused} data-domain={step+1} onKeyDown={event=>{if(event.key==='Escape'&&focused){event.preventDefault();reset();}}}>
    <header><p>Illustrative scenario</p><h3>{scenario.title}</h3><p>{scenario.context}</p></header>
    <div data-signals aria-label="Business signals">{scenario.inputs.map(input=><span key={input}>{input}</span>)}</div>
    <div data-graph-surface ref={surface} onPointerEnter={e=>{if(e.pointerType==='mouse')engine.current?.hover();}} onPointerLeave={()=>engine.current?.hover(-1)}>
      <canvas ref={canvas} aria-label="Living business network. Select a coloured sphere to explore its signal, action, impact and measurement. Click outside the sphere to return." />
      {scenario.steps.map((item,i)=><button key={item.name} hidden={!available||focused} ref={el=>{buttons.current[i]=el;}} data-node={i+1} aria-label={`${i+1}. ${item.name}: ${item.title}`} aria-pressed={step===i} aria-controls={`${id}-detail`} onClick={()=>select(i)}><span>{i+1}</span></button>)}
      {['Signal','Action','Impact','Measure'].map((label,i)=><button key={label} hidden={!focused} ref={el=>{facets.current[i]=el;}} data-facet={label} aria-label={`Explore ${label.toLowerCase()} facet`} aria-pressed={facet===i} onClick={()=>{setFacet(i);engine.current?.facet(i);setAnnouncement(`${label}: ${[scenario.steps[step].signal,scenario.steps[step].action,scenario.steps[step].impact,scenario.steps[step].measure][i]}`);}}><span>{label}</span></button>)}
      {available===false&&<p role="status">The animated view is unavailable. Every action and impact is available below.</p>}
      <p data-graph-instruction>{focused?`Inside ${scenario.steps[step].name} · click outside the sphere to return`:'Hover to turn. Select a sphere to go inside.'}</p>
    </div>
    <div data-graph-controls role="group" aria-label="Animation and zoom">
      <button disabled={!available||reduced} onClick={()=>{const next=!playing;setPlaying(next);if(next){setFocused(false);setFacet(null);}engine.current?.play(next);}}>{reduced?'Reduced motion':playing?'Pause':'Play sequence'}</button>
      {focused?<button onClick={reset}>← Whole business</button>:<><button aria-label="Zoom out" disabled={!available||zoom<=1} onClick={()=>changeZoom(Math.max(1,Number((zoom-.2).toFixed(1))))}>−</button><output aria-label="Zoom level">{Math.round(zoom*100)}%</output><button aria-label="Zoom in" disabled={!available||zoom>=1.8} onClick={()=>changeZoom(Math.min(1.8,Number((zoom+.2).toFixed(1))))}>+</button><button disabled={!available||zoom===1} onClick={reset}>Fit view</button></>}
    </div>
    <nav aria-label="Business sequence">{scenario.steps.map((item,i)=><button key={item.name} aria-pressed={step===i} aria-controls={`${id}-detail`} onClick={()=>select(i)}><span>0{i+1}</span>{item.name}</button>)}</nav>
    <BusinessDetail step={scenario.steps[step]} index={step} id={`${id}-detail`} facet={facet}/>
    <p data-business-outcome><span>The founder’s objective</span><strong>{scenario.outcome}</strong></p>
    <p data-announcement role="status">{announcement}</p>
  </div>;
}
