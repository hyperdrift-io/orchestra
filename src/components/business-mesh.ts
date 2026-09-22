import * as THREE from 'three';
import { createBusinessDomains, domainRadius, domainColours } from '@/components/business-domains';
import { createCameraFlight } from './camera-flight';
import {contributionAt,createBusinessReinforcement} from './business-reinforcement';

export interface MeshEngine { select(index:number):void; facet(index:number):void; play(value:boolean):void; hover(index?:number):void; reset():void; dispose():void; }
interface Options { canvas:HTMLCanvasElement; host:HTMLDivElement; coreLabel:()=>HTMLDivElement|null; onContribution:(n:number)=>void; nodes:()=>Array<HTMLButtonElement|null>; facets:()=>Array<HTMLButtonElement|null>; onStep:(n:number)=>void; onFacet:(n:number)=>void; onFocus:(n:number)=>void; onReset:(n:number)=>void; onMotion:(reduced:boolean)=>void; }

/** Instanced nodes and moving signals: dense geometry, a small fixed set of GPU draw calls. */
export function createBusinessMesh(o:Options):MeshEngine {
  const renderer=new THREE.WebGLRenderer({canvas:o.canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:false});
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(43,1,.1,100); camera.position.set(0,0,8.4);
  const gold=new THREE.Color('#f5bc67'), ivory=new THREE.Color('#fff0d7');
  const geo=new THREE.IcosahedronGeometry(1,0);
  const nodeMat=new THREE.MeshBasicMaterial({color:ivory,transparent:true});
  const count=210;
  const nodes=new THREE.InstancedMesh(geo,nodeMat,count); nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(nodes);
  const unit:THREE.Vector3[]=[],world:THREE.Vector3[]=[];
  for(let i=0;i<count;i++) { const shell=i<150?1:i<190?.7:.4, j=i%150, y=1-j/149*2, r=Math.sqrt(1-y*y), t=j*2.399963+shell; unit.push(new THREE.Vector3(Math.cos(t)*r,y,Math.sin(t)*r).multiplyScalar(shell));world.push(new THREE.Vector3()); }
  const anchors=Array.from({length:5},()=>new THREE.Vector3());
  const anchorUnits=anchors.map(()=>new THREE.Vector3());
  const spread=new THREE.Vector3(2.65,2.65,2.65);
  const pairs:[number,number][]=[];
  unit.forEach((p,i)=>{ unit.map((q,j)=>({j,d:p.distanceToSquared(q)})).filter(x=>x.j>i).sort((a,b)=>a.d-b.d).slice(0,5).forEach(x=>pairs.push([i,x.j])); });
  const positions=new Float32Array(pairs.length*6),colors=new Float32Array(pairs.length*6);
  const lineGeo=new THREE.BufferGeometry(); lineGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));lineGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const lineMat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.66,blending:THREE.AdditiveBlending,depthWrite:false});scene.add(new THREE.LineSegments(lineGeo,lineMat));
  const outerGeo=new THREE.BufferGeometry(),outerPositions=new Float32Array(pairs.length*6);
  outerGeo.setAttribute('position',new THREE.BufferAttribute(outerPositions,3));
  const outerMat=new THREE.LineBasicMaterial({color:'#d7c8a4',transparent:true,opacity:.045,depthWrite:false});
  scene.add(new THREE.LineSegments(outerGeo,outerMat));
  const bridgeGeo=new THREE.BufferGeometry(),bridgePositions=new Float32Array(5*4*6),bridgeColors=new Float32Array(5*4*6);
  bridgeGeo.setAttribute('position',new THREE.BufferAttribute(bridgePositions,3));bridgeGeo.setAttribute('color',new THREE.BufferAttribute(bridgeColors,3));
  const bridgeMat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.4,depthWrite:false});scene.add(new THREE.LineSegments(bridgeGeo,bridgeMat));
  const signalMat=new THREE.MeshBasicMaterial({color:gold,transparent:true,blending:THREE.AdditiveBlending});
  const signals=new THREE.InstancedMesh(geo,signalMat,72); signals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(signals);
  const reinforcement=createBusinessReinforcement(scene);
  const domains=createBusinessDomains(scene);
  const matrix=new THREE.Matrix4(),quaternion=new THREE.Quaternion(),scale=new THREE.Vector3(),color=new THREE.Color(),projected=new THREE.Vector3(),temp=new THREE.Vector3();
  const rotation=new THREE.Euler(.18,0,.08), targetCenter=new THREE.Vector3();
  const cameraFlight=createCameraFlight(camera,8.4);
  let width=1,height=1, raf=0,last=0,time=0,angle=0,speed=.3,current=0,flowTime=0,lastContribution=0,growth=1;
  let visible=false,running=!media.matches,hoverTarget:number|null=null,focused:number|null=null,flight=false,focusBlend=0;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),domainBounds=new THREE.Sphere();
  const projectedNodes:{x:number;y:number;stage:number;z:number}[]=[];
  const fitDistance=()=> width<600?11.8:8.6;
  const targetAngle=(index:number)=>-Math.atan2(anchorUnits[index].x,anchorUnits[index].z);
  const shortest=(a:number)=>Math.atan2(Math.sin(a),Math.cos(a));
  const placeButton=(button:HTMLButtonElement|null|undefined,p:THREE.Vector3,show:boolean)=>{
    if(!button)return; projected.copy(p).project(camera);const x=(projected.x+1)*width/2,y=(1-projected.y)*height/2;
    button.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;
    button.style.opacity=show?'1':'0';button.style.pointerEvents=show?'auto':'none';button.tabIndex=show?0:-1;
  };
  const render=(dt=0)=>{
    const moving=!media.matches;
    if(running && moving){time+=dt;if(focused===null)flowTime+=dt;}
    const contribution=contributionAt(flowTime);
    if(contribution.count!==lastContribution){lastContribution=contribution.count;o.onContribution((contribution.count-1)%5);}
    if(focused===null&&hoverTarget===null&&current!==contribution.domain){current=contribution.domain;o.onStep(current);}
    focusBlend+=((focused!==null?1:0)-focusBlend)*(moving?1-Math.exp(-dt*6):1);
    const beatPhase=(time%1.45)/1.45;
    const heartbeat=Math.exp(-Math.pow((beatPhase-.14)/.09,2))*.018+Math.exp(-Math.pow((beatPhase-.3)/.1,2))*.009;
    if(moving && running) {
      if(focused!==null) {speed+=(0-speed)*(1-Math.exp(-dt*8));angle+=dt*speed;}
      else if(hoverTarget!==null) {const delta=shortest(targetAngle(hoverTarget)-angle);speed+=(2.5-speed)*Math.min(1,dt*5);angle+=delta*Math.min(1,dt*speed*3);}
      else {speed+=(.3-speed)*Math.min(1,dt*2);angle+=dt*speed;}
    }
    growth+=(1+contribution.strength*.08-growth)*(moving?1-Math.exp(-dt*2.8):1);
    spread.setScalar((width<600?2.6:2.65)*growth);
    rotation.y=angle;quaternion.setFromEuler(rotation);
    unit.forEach((p,i)=>{
      world[i].copy(p).applyQuaternion(quaternion).multiply(spread);
      scale.setScalar(i<150?.019:.014);matrix.makeScale(scale.x,scale.y,scale.z);matrix.setPosition(world[i]);nodes.setMatrixAt(i,matrix);
      color.copy(i%7===0?gold:ivory).multiplyScalar(.48+(world[i].z+2.2)/6+heartbeat*.5);nodes.setColorAt(i,color);
    });nodes.instanceMatrix.needsUpdate=true;if(nodes.instanceColor)nodes.instanceColor.needsUpdate=true;
    const portrait=width<600;
    const layout=portrait?[[-.52,.69,.55],[.5,.34,-.73],[-.73,-.04,.55],[.5,-.43,-.72],[-.36,-.75,.52]]:[[-.7,.43,.55],[.1,.68,-.7],[.8,.13,.58],[.38,-.58,-.72],[-.55,-.68,.5]];
    anchorUnits.forEach((p,i)=>p.set(...layout[i] as [number,number,number]).normalize().multiplyScalar(2.14));
    anchors.forEach((p,i)=>p.copy(anchorUnits[i]).applyQuaternion(quaternion).multiplyScalar(growth));
    const coreSize=reinforcement.update(anchors,contribution,time,focusBlend,dt,media.matches);
    pairs.forEach(([a,b],i)=>{
      positions.set(world[a].toArray(),i*6);positions.set(world[b].toArray(),i*6+3);
      temp.copy(world[a]).multiplyScalar(1.8/growth);outerPositions.set(temp.toArray(),i*6);temp.copy(world[b]).multiplyScalar(1.8/growth);outerPositions.set(temp.toArray(),i*6+3);
      const wave=(Math.sin(time*2.6-i*.07)+1)/2;
      color.copy(i%6===current?gold:ivory).multiplyScalar((.18-focusBlend*.11)+wave*.21+heartbeat*.4);
      colors.set([color.r,color.g,color.b,color.r,color.g,color.b],i*6);
    });lineGeo.attributes.position.needsUpdate=true;lineGeo.attributes.color.needsUpdate=true;outerGeo.attributes.position.needsUpdate=true;
    anchors.forEach((anchor,i)=>{
      const neighbours=world.map((p,j)=>({j,d:p.distanceToSquared(anchor)})).sort((a,b)=>a.d-b.d).slice(0,4);
      neighbours.forEach(({j},n)=>{
        const at=(i*4+n)*6;temp.copy(world[j]).sub(anchor).normalize().multiplyScalar(.32).add(anchor);
        bridgePositions.set(temp.toArray(),at);bridgePositions.set(world[j].toArray(),at+3);
        color.set(domainColours[i]).multiplyScalar(hoverTarget===i?.85:.4);
        bridgeColors.set([color.r,color.g,color.b,color.r,color.g,color.b],at);
      });
    });bridgeGeo.attributes.position.needsUpdate=true;bridgeGeo.attributes.color.needsUpdate=true;
    for(let i=0;i<72;i++){const [a,b]=pairs[(i*13)%pairs.length],t=(time*(.45+(i%4)*.12)+i*.17)%1;temp.lerpVectors(world[a],world[b],t);matrix.makeScale(.021,.021,.021);matrix.setPosition(temp);signals.setMatrixAt(i,matrix);}signals.instanceMatrix.needsUpdate=true;
    nodeMat.opacity=1-focusBlend*.9;signalMat.opacity=1-focusBlend*.94;lineMat.opacity=(.32+contribution.strength*.1+contribution.pulse*.18)*(1-focusBlend*.97);outerMat.opacity=(.045+contribution.strength*.02+contribution.pulse*.025)*(1-focusBlend*.6);bridgeMat.opacity=.65*(1-focusBlend);
    if(focused!==null)targetCenter.copy(anchors[focused]);else targetCenter.set(0,0,0);
    const targetDistance=focused!==null?(width<600?4.8:5.8):fitDistance();
    flight=cameraFlight.update(targetCenter,targetDistance,focused!==null&&width>=1000?.85:0,focused!==null,dt,media.matches)||Math.abs(focusBlend-(focused!==null?1:0))>.001;
    projectedNodes.length=0;
    world.forEach((p,i)=>{projected.copy(p).project(camera);projectedNodes.push({x:(projected.x+1)*width/2,y:(1-projected.y)*height/2,stage:anchors.reduce((nearest,a,j)=>p.distanceToSquared(a)<p.distanceToSquared(anchors[nearest])?j:nearest,0),z:p.z});});
    anchors.forEach((p,i)=>{temp.copy(p).add(new THREE.Vector3(0,width<600?-.5:-.66,.1));placeButton(o.nodes()[i],temp,focused===null);projected.copy(p).project(camera);projectedNodes.push({x:(projected.x+1)*width/2,y:(1-projected.y)*height/2,stage:i,z:p.z});});
    const label=o.coreLabel();
    if(label){temp.set(0,-.7*coreSize,.12).project(camera);label.style.transform=`translate(${(temp.x+1)*width/2}px,${(1-temp.y)*height/2}px) translate(-50%,0)`;label.style.opacity=String(1-focusBlend);}
    domains.scale((width<600?.54:.72)+(width<600?.40:.55)*focusBlend);
    domains.update(anchors,focused,time,heartbeat,dt,hoverTarget,media.matches,true);
    domains.facetPoints.forEach((point,i)=>placeButton(o.facets()[i],point,focused!==null&&focusBlend>.78));
    renderer.render(scene,camera);
  };
  const frame=(now:number)=>{
    const dt=last?Math.min((now-last)/1000,.05):.016;last=now;
    render(dt);
    if(visible&&!document.hidden&&!media.matches&&(running||flight))raf=requestAnimationFrame(frame);
  };
  const schedule=()=>{cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden&&!media.matches&&(running||flight))raf=requestAnimationFrame(frame);else render(media.matches?1:0);};
  const size=()=>{width=o.host.clientWidth;height=o.host.clientHeight;spread.setScalar(width<600?2.6:2.65);camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(width,height,false);flight=true;render(media.matches?1:.016);schedule();};
  const select=(index:number)=>{current=index;focused=index;hoverTarget=null;domains.facet(null);flight=true;o.onFocus(index);schedule();};
  const reset=()=>{const previous=focused??current;focused=null;hoverTarget=null;flight=true;domains.facet(null);o.onReset(previous);schedule();};
  const onMotion=()=>{if(media.matches)running=false;o.onMotion(media.matches);render(1);schedule();};
  const io=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);schedule();},{threshold:.05});io.observe(o.host);
  const ro=new ResizeObserver(size);ro.observe(o.host);media.addEventListener('change',onMotion);document.addEventListener('visibilitychange',schedule);
  let startX=0,startY=0;
  const down=(e:PointerEvent)=>{startX=e.clientX;startY=e.clientY;};
  const up=(e:PointerEvent)=>{
    if(Math.hypot(e.clientX-startX,e.clientY-startY)>8)return;
    const rect=o.canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
    if(focused!==null){
      pointer.set(x/width*2-1,1-y/height*2);raycaster.setFromCamera(pointer,camera);
      if(focusBlend>.78){
        const actor=domains.actorPoints.findIndex(center=>{domainBounds.center.copy(center);domainBounds.radius=.25*((width<600?.54:.72)+(width<600?.4:.55)*focusBlend);return raycaster.ray.intersectsSphere(domainBounds);});
        if(actor>=0){domains.facet(actor);o.onFacet(actor);render(media.matches?1:.016);return;}
      }
      domainBounds.center.copy(anchors[focused]);domainBounds.radius=domainRadius*((width<600?.54:.72)+(width<600?.4:.55)*focusBlend);
      if(!raycaster.ray.intersectsSphere(domainBounds))reset();
      return;
    }
    // Every visible domain is an entrance, including the space around its wireframe.
    pointer.set(x/width*2-1,1-y/height*2);raycaster.setFromCamera(pointer,camera);
    const domainHit=anchors.map((center,stage)=>{domainBounds.center.copy(center);domainBounds.radius=domainRadius*((width<600?.54:.72)+(width<600?.4:.55)*focusBlend);const hit=raycaster.ray.intersectSphere(domainBounds,new THREE.Vector3());return {stage,distance:hit?camera.position.distanceTo(hit):Infinity};}).sort((a,b)=>a.distance-b.distance)[0];
    if(domainHit.distance<Infinity){select(domainHit.stage);return;}
    domainBounds.center.set(0,0,0);domainBounds.radius=.85;if(raycaster.ray.intersectsSphere(domainBounds))return;
    const hit=projectedNodes.map(p=>({...p,d:Math.hypot(x-p.x,y-p.y)})).filter(p=>p.d<24).sort((a,b)=>a.d-b.d||b.z-a.z)[0];if(hit)select(hit.stage);
  };
  const move=(e:PointerEvent)=>{
    if(e.pointerType!=='mouse'||focused!==null||media.matches||!running)return;
    const rect=o.canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/width*2-1,1-(e.clientY-rect.top)/height*2);raycaster.setFromCamera(pointer,camera);
    const hit=anchors.map((p,index)=>{domainBounds.center.copy(p);domainBounds.radius=domainRadius*((width<600?.54:.72)+(width<600?.4:.55)*focusBlend);const at=raycaster.ray.intersectSphere(domainBounds,new THREE.Vector3());return {index,d:at?camera.position.distanceTo(at):Infinity};}).sort((a,b)=>a.d-b.d)[0];
    if(hit.d<Infinity){hoverTarget=hit.index;current=hit.index;o.onStep(current);}
  };
  const leave=()=>{hoverTarget=null;};
  o.canvas.addEventListener('pointermove',move);o.canvas.addEventListener('pointerleave',leave);
  o.canvas.addEventListener('pointerdown',down);o.canvas.addEventListener('pointerup',up);o.onMotion(media.matches);size();
  return {
    select,
    facet(index){domains.facet(index);render(media.matches?1:.016);},
    hover(index){if(index===-1){hoverTarget=null;schedule();return;}if(focused!==null||media.matches||!running)return;hoverTarget=index??(current+1)%5;current=hoverTarget;o.onStep(current);schedule();},
    play(value){running=value;if(value){hoverTarget=null;}schedule();},
    reset,
    dispose(){cancelAnimationFrame(raf);io.disconnect();ro.disconnect();media.removeEventListener('change',onMotion);document.removeEventListener('visibilitychange',schedule);o.canvas.removeEventListener('pointermove',move);o.canvas.removeEventListener('pointerleave',leave);o.canvas.removeEventListener('pointerdown',down);o.canvas.removeEventListener('pointerup',up);[geo,nodeMat,lineGeo,lineMat,outerGeo,outerMat,bridgeGeo,bridgeMat,signalMat].forEach(x=>x.dispose());domains.dispose();reinforcement.dispose();renderer.dispose();},
  };
}
