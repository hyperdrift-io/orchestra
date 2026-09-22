import * as THREE from 'three';
import { createBusinessDomains, domainRadius } from '@/components/business-domains';

export interface MeshEngine { select(index:number):void; facet(index:number):void; zoom(value:number):void; play(value:boolean):void; hover(index?:number):void; reset():void; dispose():void; }
interface Options { canvas:HTMLCanvasElement; host:HTMLDivElement; nodes:()=>Array<HTMLButtonElement|null>; facets:()=>Array<HTMLButtonElement|null>; onStep:(n:number)=>void; onFocus:(n:number)=>void; onReset:(n:number)=>void; onMotion:(reduced:boolean)=>void; }

/** Instanced nodes and moving signals: dense geometry, a small fixed set of GPU draw calls. */
export function createBusinessMesh(o:Options):MeshEngine {
  const renderer=new THREE.WebGLRenderer({canvas:o.canvas,alpha:true,antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(43,1,.1,100); camera.position.set(0,0,8.4);
  const gold=new THREE.Color('#f5bc67'), ivory=new THREE.Color('#fff0d7');
  const geo=new THREE.IcosahedronGeometry(1,0);
  const nodeMat=new THREE.MeshBasicMaterial({color:ivory,transparent:true});
  const count=210;
  const nodes=new THREE.InstancedMesh(geo,nodeMat,count); nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(nodes);
  const unit:THREE.Vector3[]=[],world:THREE.Vector3[]=[];
  for(let i=0;i<count;i++) { const shell=i<150?1:i<190?.7:.4, j=i%150, y=1-j/149*2, r=Math.sqrt(1-y*y), t=j*2.399963+shell; unit.push(new THREE.Vector3(Math.cos(t)*r,y,Math.sin(t)*r).multiplyScalar(2.05*shell));world.push(new THREE.Vector3()); }
  const anchorUnits=Array.from({length:5},(_,i)=>new THREE.Vector3(Math.sin(i*Math.PI*2/5)*1.95,Math.sin(i*2.4)*.65,Math.cos(i*Math.PI*2/5)*1.95));
  const anchors=anchorUnits.map(()=>new THREE.Vector3());
  const pairs:[number,number][]=[];
  unit.forEach((p,i)=>{ unit.map((q,j)=>({j,d:p.distanceToSquared(q)})).filter(x=>x.j>i).sort((a,b)=>a.d-b.d).slice(0,5).forEach(x=>pairs.push([i,x.j])); });
  const positions=new Float32Array(pairs.length*6),colors=new Float32Array(pairs.length*6);
  const lineGeo=new THREE.BufferGeometry(); lineGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));lineGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const lineMat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.66,blending:THREE.AdditiveBlending,depthWrite:false});scene.add(new THREE.LineSegments(lineGeo,lineMat));
  const signalMat=new THREE.MeshBasicMaterial({color:gold,transparent:true,blending:THREE.AdditiveBlending});
  const signals=new THREE.InstancedMesh(geo,signalMat,72); signals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(signals);
  const textureCanvas=document.createElement('canvas');textureCanvas.width=textureCanvas.height=128;
  const ctx=textureCanvas.getContext('2d')!, gradient=ctx.createRadialGradient(64,64,0,64,64,64);
  gradient.addColorStop(0,'#fff8e4');gradient.addColorStop(.15,'#edb767');gradient.addColorStop(1,'rgba(230,150,65,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const texture=new THREE.CanvasTexture(textureCanvas);
  const haloMat=new THREE.SpriteMaterial({map:texture,color:gold,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false});
  const halo=new THREE.Sprite(haloMat); halo.scale.setScalar(4.5);scene.add(halo);
  const coreMat=new THREE.MeshBasicMaterial({color:'#ffe3a9',transparent:true,opacity:.55,wireframe:true});
  const coreGeo=new THREE.IcosahedronGeometry(.42,2), core=new THREE.Mesh(coreGeo,coreMat);scene.add(core);
  const ringGeo=new THREE.TorusGeometry(2.24,.006,4,160),ringMat=new THREE.MeshBasicMaterial({color:gold,transparent:true,opacity:.36});
  const rings=Array.from({length:3},(_,i)=>{const ring=new THREE.Mesh(ringGeo,ringMat);ring.rotation.set(.55+i*.65,i*.8,.3);scene.add(ring);return ring;});
  const domains=createBusinessDomains(scene);
  const matrix=new THREE.Matrix4(),quaternion=new THREE.Quaternion(),scale=new THREE.Vector3(),color=new THREE.Color(),projected=new THREE.Vector3(),temp=new THREE.Vector3();
  const rotation=new THREE.Euler(.18,0,.08), targetCenter=new THREE.Vector3(),center=new THREE.Vector3();
  let width=1,height=1, raf=0,last=0,time=0,angle=0,speed=.3,current=0,stageTime=0;
  let visible=false,running=!media.matches,hoverTarget:number|null=null,focused:number|null=null,zoom=1,distance=8.4,flight=false;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),domainBounds=new THREE.Sphere();
  const projectedNodes:{x:number;y:number;stage:number;z:number}[]=[];
  const fitDistance=()=> width<550?10.8:8.4;
  const targetAngle=(index:number)=>-index*Math.PI*2/5;
  const shortest=(a:number)=>Math.atan2(Math.sin(a),Math.cos(a));
  const placeButton=(button:HTMLButtonElement|null|undefined,p:THREE.Vector3,show:boolean)=>{
    if(!button)return; projected.copy(p).project(camera);const x=(projected.x+1)*width/2,y=(1-projected.y)*height/2;
    button.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;
    button.style.opacity=show?'1':'0';button.style.pointerEvents=show?'auto':'none';button.tabIndex=show?0:-1;
  };
  const render=(dt=0)=>{
    const moving=!media.matches;
    if(running && moving) time+=dt;
    const beatPhase=(time%1.45)/1.45;
    const heartbeat=Math.exp(-Math.pow((beatPhase-.14)/.09,2))*.018+Math.exp(-Math.pow((beatPhase-.3)/.1,2))*.009;
    if(moving && running && focused===null) {
      if(hoverTarget!==null) {const delta=shortest(targetAngle(hoverTarget)-angle);speed+=(2.5-speed)*Math.min(1,dt*5);angle+=delta*Math.min(1,dt*speed*3);}
      else {speed+=(.3-speed)*Math.min(1,dt*2);angle+=dt*speed;}
    }
    rotation.y=angle;quaternion.setFromEuler(rotation);
    unit.forEach((p,i)=>{
      world[i].copy(p).applyQuaternion(quaternion);
      scale.setScalar(i<150?.019:.014);matrix.makeScale(scale.x,scale.y,scale.z);matrix.setPosition(world[i]);nodes.setMatrixAt(i,matrix);
      color.copy(i%7===0?gold:ivory).multiplyScalar(.48+(world[i].z+2.2)/6+heartbeat*.5);nodes.setColorAt(i,color);
    });nodes.instanceMatrix.needsUpdate=true;if(nodes.instanceColor)nodes.instanceColor.needsUpdate=true;
    anchorUnits.forEach((p,i)=>anchors[i].copy(p).applyQuaternion(quaternion));
    pairs.forEach(([a,b],i)=>{
      positions.set(world[a].toArray(),i*6);positions.set(world[b].toArray(),i*6+3);
      const wave=(Math.sin(time*2.6-i*.07)+1)/2;
      color.copy(i%6===current?gold:ivory).multiplyScalar((focused===null?.18:.07)+wave*.21+heartbeat*.4);
      colors.set([color.r,color.g,color.b,color.r,color.g,color.b],i*6);
    });lineGeo.attributes.position.needsUpdate=true;lineGeo.attributes.color.needsUpdate=true;
    for(let i=0;i<72;i++){const [a,b]=pairs[(i*13)%pairs.length],t=(time*(.45+(i%4)*.12)+i*.17)%1;temp.lerpVectors(world[a],world[b],t);matrix.makeScale(.021,.021,.021);matrix.setPosition(temp);signals.setMatrixAt(i,matrix);}signals.instanceMatrix.needsUpdate=true;
    nodeMat.opacity=focused===null?1:.18;signalMat.opacity=focused===null?1:.16;lineMat.opacity=focused===null?.66:.12;ringMat.opacity=focused===null?.36:.07;
    // Heartbeat changes light only; geometry and camera targets remain steady.
    haloMat.opacity=(focused===null?.25:.08)+heartbeat*.65;halo.scale.setScalar(4.3);core.rotation.set(time*.12,time*.24,0);coreMat.opacity=(focused===null?.5:.08)+heartbeat;
    rings.forEach((ring,i)=>{ring.rotation.z=time*(i%2?-.08:.07)+i;});
    if(focused!==null)targetCenter.copy(anchors[focused]);else targetCenter.set(0,0,0);
    const targetDistance=focused!==null?(width<420?3.65:2.95):fitDistance()/zoom;
    const ease=moving?1-Math.exp(-dt*5):1;
    center.lerp(targetCenter,ease);distance+=(targetDistance-distance)*ease;
    flight=center.distanceTo(targetCenter)>.002||Math.abs(distance-targetDistance)>.002;
    camera.position.set(center.x,center.y,center.z+distance);camera.lookAt(center);camera.updateMatrixWorld();
    projectedNodes.length=0;
    world.forEach((p,i)=>{projected.copy(p).project(camera);projectedNodes.push({x:(projected.x+1)*width/2,y:(1-projected.y)*height/2,stage:i%5,z:p.z});});
    anchors.forEach((p,i)=>{placeButton(o.nodes()[i],p,focused===null);projected.copy(p).project(camera);projectedNodes.push({x:(projected.x+1)*width/2,y:(1-projected.y)*height/2,stage:i,z:p.z});});
    domains.update(anchors,focused,time,heartbeat);
    domains.facetPoints.forEach((point,i)=>placeButton(o.facets()[i],point,focused!==null));
    renderer.render(scene,camera);
  };
  const frame=(now:number)=>{
    const dt=last?Math.min((now-last)/1000,.05):.016;last=now;
    if(running&&focused===null&&hoverTarget===null){stageTime+=dt;if(stageTime>6){stageTime=0;current=(current+1)%5;o.onStep(current);}}
    render(dt);
    if(visible&&!document.hidden&&!media.matches&&(running||flight))raf=requestAnimationFrame(frame);
  };
  const schedule=()=>{cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden&&!media.matches&&(running||flight))raf=requestAnimationFrame(frame);else render(media.matches?1:0);};
  const size=()=>{width=o.host.clientWidth;height=o.host.clientHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(width,height,false);flight=true;render(media.matches?1:.016);schedule();};
  const select=(index:number)=>{current=index;focused=index;hoverTarget=null;stageTime=0;domains.facet(null);flight=true;o.onFocus(index);render(media.matches?1:.016);schedule();};
  const reset=()=>{const previous=focused??current;focused=null;hoverTarget=null;zoom=1;flight=true;domains.facet(null);o.onReset(previous);schedule();};
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
      domainBounds.center.copy(anchors[focused]);domainBounds.radius=domainRadius;
      if(!raycaster.ray.intersectsSphere(domainBounds))reset();
      return;
    }
    // Every visible domain is an entrance, including its translucent shell.
    pointer.set(x/width*2-1,1-y/height*2);raycaster.setFromCamera(pointer,camera);
    const domainHit=anchors.map((center,stage)=>{domainBounds.center.copy(center);domainBounds.radius=domainRadius;const hit=raycaster.ray.intersectSphere(domainBounds,new THREE.Vector3());return {stage,distance:hit?camera.position.distanceTo(hit):Infinity};}).sort((a,b)=>a.distance-b.distance)[0];
    if(domainHit.distance<Infinity){select(domainHit.stage);return;}
    const hit=projectedNodes.map(p=>({...p,d:Math.hypot(x-p.x,y-p.y)})).filter(p=>p.d<24).sort((a,b)=>a.d-b.d||b.z-a.z)[0];if(hit)select(hit.stage);
  };
  o.canvas.addEventListener('pointerdown',down);o.canvas.addEventListener('pointerup',up);o.onMotion(media.matches);size();
  return {
    select,
    facet(index){domains.facet(index);render(media.matches?1:.016);},
    hover(index){if(index===-1){hoverTarget=null;schedule();return;}if(focused!==null||media.matches||!running)return;hoverTarget=index??(current+1)%5;current=hoverTarget;o.onStep(current);schedule();},
    zoom(value){zoom=value;flight=true;schedule();},
    play(value){running=value;if(value){focused=null;hoverTarget=null;}schedule();},
    reset,
    dispose(){cancelAnimationFrame(raf);io.disconnect();ro.disconnect();media.removeEventListener('change',onMotion);document.removeEventListener('visibilitychange',schedule);o.canvas.removeEventListener('pointerdown',down);o.canvas.removeEventListener('pointerup',up);[geo,nodeMat,lineGeo,lineMat,signalMat,texture,haloMat,coreGeo,coreMat,ringGeo,ringMat].forEach(x=>x.dispose());domains.dispose();renderer.dispose();},
  };
}
