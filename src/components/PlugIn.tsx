'use client';
import {useEffect,useRef,useState} from 'react';
import {OrgGraph} from '@/components/OrgGraph';
import {BusinessDetail} from '@/components/BusinessDetail';
import {businessScenarios} from '@/data/business-scenarios';

export function PlugIn(){
  const [selected,setSelected]=useState(0),[active,setActive]=useState(0),[playing,setPlaying]=useState(true),[reduced,setReduced]=useState(false),[zoom,setZoom]=useState(false);
  const section=useRef<HTMLElement>(null),scenario=businessScenarios[selected];
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,timer:ReturnType<typeof setInterval>|undefined;
    const run=()=>{clearInterval(timer);if(visible&&playing&&!document.hidden&&!media.matches)timer=setInterval(()=>setActive(i=>(i+1)%5),1800);};
    const motion=()=>{setReduced(media.matches);if(media.matches)setPlaying(false);run();};
    const io=new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);run();});io.observe(section.current!);media.addEventListener('change',motion);document.addEventListener('visibilitychange',run);motion();
    return()=>{clearInterval(timer);io.disconnect();media.removeEventListener('change',motion);document.removeEventListener('visibilitychange',run);};
  },[playing]);
  const select=(i:number)=>{setActive(i);setPlaying(false);};
  return <section id="plug" ref={section} aria-labelledby="plug-title" data-step={active} data-playing={playing}>
    <h2 id="plug-title">Same shape.<br/><em>Your organisation.</em></h2>
    <p>Your business is a connected system. Watch the work move through it — with the founder’s judgement above it and growth, profit and time to lead below.</p>
    <fieldset><legend>Your business</legend>{businessScenarios.map((s,i)=><label key={s.slug}><input type="radio" name="business-scenario" checked={selected===i} onChange={()=>{setSelected(i);setActive(0);}}/>{s.audience}</label>)}</fieldset>
    <header><p>Illustrative scenario</p><h3>{scenario.title}</h3></header>
    <figure data-organisation-view data-zoomed={zoom} tabIndex={0} aria-label="Interactive organisation graph. Scroll horizontally on smaller screens."><div><OrgGraph id="graph-lens" scenario={scenario} active={active} onSelect={select}/></div></figure>
    <div data-graph-controls role="group" aria-label="Organisation animation"><button disabled={reduced} onClick={()=>setPlaying(!playing)}>{reduced?'Reduced motion':playing?'Pause signals':'Play signals'}</button><button aria-pressed={zoom} onClick={()=>setZoom(!zoom)}>{zoom?'Fit diagram':'Enlarge diagram'}</button></div>
    <nav aria-label="Organisation sequence">{scenario.steps.map((s,i)=><button key={s.name} aria-pressed={active===i} onClick={()=>select(i)}><span>0{i+1}</span>{s.name}</button>)}</nav>
    <BusinessDetail step={scenario.steps[active]} index={active} id="organisation-detail"/>
    <p data-business-outcome><span>The founder’s objective</span><strong>{scenario.outcome}</strong></p>
    <footer><p>Start with one opportunity worth improving. We’ll work out the useful first scope with you.</p><a href="#contact">Explore this for your business</a></footer>
  </section>;
}
