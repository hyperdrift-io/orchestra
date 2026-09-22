'use client';
import {useEffect,useRef,useState} from 'react';
import {businessScenarios} from '@/data/business-scenarios';
import {businessIterations,iterationSteps} from '@/data/business-iterations';
import {BusinessDetail} from './BusinessDetail';
import {domainStories} from './domain-stories';
import {createConstellation,type ConstellationEngine} from './constellation-engine';

export function Organisation({articlesAvailable=false}:{articlesAvailable?:boolean}){
  const [scenarioIndex,setScenarioIndex]=useState(0),[cycle,setCycle]=useState(0),[complete,setComplete]=useState(0),[step,setStep]=useState(0);
  const [focused,setFocused]=useState<number|null>(null),[facet,setFacet]=useState<number|null>(null),[playing,setPlaying]=useState(true),[reduced,setReduced]=useState(false),[available,setAvailable]=useState<boolean|null>(null),[zoom,setZoom]=useState(1);
  const canvas=useRef<HTMLCanvasElement>(null),surface=useRef<HTMLDivElement>(null),nodes=useRef<(HTMLButtonElement|null)[]>([]),facets=useRef<(HTMLButtonElement|null)[]>([]),engine=useRef<ConstellationEngine|null>(null),lastSelected=useRef(0);
  const scenario=businessScenarios[scenarioIndex],iterations=businessIterations[scenario.slug],iteration=iterations[cycle],steps=iterationSteps(scenario,iteration);
  useEffect(()=>{
    try{
      engine.current=createConstellation({canvas:canvas.current!,host:surface.current!,nodes:()=>nodes.current,facets:()=>facets.current,onStep:setStep,onFacet:setFacet,onCycle:setCycle,onComplete:setComplete,onPlaying:setPlaying,onMotion:setReduced,onFocus:index=>{
        setFocused(index);setFacet(null);
        if(index!==null)lastSelected.current=index;
        else requestAnimationFrame(()=>nodes.current[lastSelected.current]?.focus({preventScroll:true}));
      }});setAvailable(true);
    }catch{setAvailable(false);setPlaying(false);}
    return()=>{engine.current?.dispose();engine.current=null;};
  },[]);
  useEffect(()=>{if(focused!==null)facets.current[0]?.focus({preventScroll:true});},[focused]);
  const select=(index:number)=>{setStep(index);setFacet(null);engine.current?.select(index);};
  const chooseIteration=(index:number)=>{setCycle(index);setComplete(index);setStep(0);setFocused(null);setFacet(null);engine.current?.iteration(index);};
  const chooseScenario=(index:number)=>{setScenarioIndex(index);chooseIteration(0);};
  const reset=()=>engine.current?.reset();
  const changeZoom=(value:number)=>{const next=Math.round(value*10)/10;setZoom(next);engine.current?.zoom(next);};
  return <section id="organisation" data-domain={step+1} data-focused={focused!==null} onKeyDown={event=>{if(event.key==='Escape'&&focused!==null){event.preventDefault();reset();}}} aria-labelledby="organisation-title">
    <header><p>How it works · the AI-native organisation</p><h1 id="organisation-title">Every useful signal<br/> can become <em>progress.</em></h1><p>Learn. Improve. Build on what works.</p></header>
    <p data-live-cycle><span>Illustrative {scenario.audience.toLowerCase()} journey · {cycle+1} / 3</span><strong>{iteration.title}</strong>{iteration.benefit}</p>
    <div data-constellation-view><div data-constellation-surface ref={surface}>
      <canvas ref={canvas} aria-label="Living constellation: five coloured domains connected by branching business signals. Select an object to explore its action and impact."/>
      {steps.map((item,i)=><button key={item.name} hidden={!available||focused!==null} ref={el=>{nodes.current[i]=el;}} data-domain-label={i+1} aria-label={`Explore ${item.name}`} aria-pressed={step===i} onPointerEnter={e=>{if(e.pointerType==='mouse')engine.current?.hover(i);}} onPointerLeave={()=>engine.current?.hover(null)} onFocus={()=>engine.current?.hover(i)} onBlur={()=>engine.current?.hover(null)} onClick={()=>select(i)}>{item.name}</button>)}
      {domainStories[step].facets.map((label,i)=><button key={label} hidden={focused===null} ref={el=>{facets.current[i]=el;}} data-domain-facet aria-pressed={facet===i} aria-label={`Explore ${label.toLowerCase()} facet`} onClick={()=>{setFacet(i);engine.current?.facet(i);}}>{label}</button>)}
      <p>{focused!==null?`Inside ${steps[step].name} · click outside the domain or press Escape to return`:'Follow the light. Select an object to see what happens inside.'}</p>
      {available===false&&<p role="status">Explore every action and impact using the stages below.</p>}
    </div>
    {focused!==null&&<aside data-domain-story aria-live="polite"><p>{steps[step].name} · {domainStories[step].form}</p><h2>{facet===null?domainStories[step].promise:domainStories[step].facets[facet]}</h2><p>{facet===null?domainStories[step].emotion:[steps[step].signal,steps[step].action,steps[step].impact,steps[step].measure][facet]}</p><small>{iteration.title}</small><button onClick={reset}>← Whole organisation</button></aside>}
    </div>
    <div data-constellation-controls aria-label="Constellation controls" role="group">
      <button disabled={!available||reduced} onClick={()=>engine.current?.play(!playing)}>{reduced?'Reduced motion':playing?'Pause signals':'Play signals'}</button>
      {complete===3&&<button onClick={()=>chooseIteration(0)}>Replay the journey</button>}
      {focused!==null?<button onClick={reset}>← Whole organisation</button>:<><button aria-label="Zoom out" disabled={!available||zoom<=1} onClick={()=>changeZoom(Math.max(1,zoom-.2))}>−</button><output aria-label="Zoom level">{Math.round(zoom*100)}%</output><button aria-label="Zoom in" disabled={!available||zoom>=1.6} onClick={()=>changeZoom(Math.min(1.6,zoom+.2))}>+</button>{zoom>1&&<button onClick={()=>changeZoom(1)}>Fit view</button>}</>}
    </div>
    <div data-organisation-story>
      <header><p>Illustrative business journey · three successful iterations</p><h2>Same connected system.<br/><em>Your organisation.</em></h2><p>Follow one opportunity into useful work. Each cycle brings new evidence; the improvements that earn their place become the foundation for the next.</p></header>
      <fieldset><legend>Explore your business</legend>{businessScenarios.map((item,i)=><label key={item.slug}><input type="radio" name="organisation-scenario" checked={scenarioIndex===i} onChange={()=>chooseScenario(i)}/>{item.audience}</label>)}</fieldset>
      <div data-iteration-heading><p>Iteration {cycle+1} of 3</p><h3>{iteration.title}</h3><p>{iteration.signal}</p></div>
      <nav aria-label="Business domains">{steps.map((item,i)=><button key={item.name} aria-pressed={step===i} onPointerEnter={e=>{if(e.pointerType==='mouse')engine.current?.hover(i);}} onPointerLeave={()=>engine.current?.hover(null)} onFocus={()=>engine.current?.hover(i)} onBlur={()=>engine.current?.hover(null)} onClick={()=>select(i)}>{item.name}</button>)}</nav>
      <BusinessDetail step={steps[step]} index={step} facet={facet} id="organisation-detail"/>
      <div data-retained-learning>
        <header><p>What carries forward</p><h3>Progress with a memory.</h3><p>In this illustration, each successful improvement adds a lasting ring of light. In your business, we measure the result before expanding the work.</p></header>
        <ol aria-label="Illustrated iterations">{iterations.map((item,i)=><li key={item.title} data-retained={i<complete} data-current={i===cycle}><button aria-pressed={i===cycle} onClick={()=>chooseIteration(i)}><span>{i<complete?'Retained':i===cycle?'In focus':'Up next'}</span><strong>{item.title}</strong><span>{item.benefit}</span><small>Measure: {item.measure}</small></button></li>)}</ol>
      </div>
      <p data-organisation-outcome><span>What you’re building towards</span><strong>{scenario.outcome}</strong></p>
      <footer><div><h2>Start with one opportunity.</h2><p>Bring us a workflow worth improving. We’ll connect the first useful step to the outcome you want to measure.</p></div><a href="/#contact">Find your growth opportunity →</a><a href={articlesAvailable?'/articles':'https://hyperdrift.io/blog'}>Explore the ideas behind the work →</a></footer>
    </div>
  </section>;
}
