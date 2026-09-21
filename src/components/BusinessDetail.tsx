import type { BusinessStep } from '@/data/business-scenarios';
export function BusinessDetail({step,index,id,facet}: {step:BusinessStep;index:number;id:string;facet?:number|null}) {
  const facets=[['Signal',step.signal],['Action',step.action],['Business impact',step.impact],['What we measure',step.measure]];
  return <article id={id} data-action-detail>
    <header><p>Step {index+1} / 5 · {step.name}</p><h4>{step.title}</h4>{facet==null && <p>{step.signal}</p>}</header>
    <dl>{facets.map(([label,text],i)=>(facet==null?i>0:facet===i)&&<div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
  </article>;
}
