import type { BusinessStep } from '@/home/data/business-scenarios';
import { domainStories } from './domain-stories';
export function BusinessDetail({step,index,id,facet,domain}: {step:BusinessStep;index:number;id:string;facet?:number|null;domain?:number}) {
  const story=domain===undefined?null:domainStories[domain];
  const facets=[['Your need',step.signal],['Agent work',step.action],['What you can inspect',step.impact],['Your decision',step.measure]];
  return <article id={id} data-action-detail>
    <header><p>{step.name}{story?` · ${story.form}`:` · Capability ${index+1} / 5`}</p><h4>{story?(facet==null?story.promise:story.facets[facet]):step.title}</h4>{facet==null && <p>{story?story.emotion:step.signal}</p>}</header>
    <dl>{facets.map(([label,text],i)=>(facet==null?i>0:facet===i)&&<div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
  </article>;
}
