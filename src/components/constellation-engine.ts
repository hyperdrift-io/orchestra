import * as THREE from 'three';
import {createBusinessDomains, domainRadius} from './business-domains';
import {createCameraFlight} from './camera-flight';

interface Options {
  canvas:HTMLCanvasElement; host:HTMLDivElement;
  nodes:()=>Array<HTMLButtonElement|null>; facets:()=>Array<HTMLButtonElement|null>;
  onStep:(index:number)=>void; onCycle:(index:number)=>void; onComplete:(count:number)=>void;
  onFocus:(index:number|null)=>void; onFacet:(index:number)=>void; onPlaying:(value:boolean)=>void; onMotion:(value:boolean)=>void;
}
export interface ConstellationEngine {
  select(index:number):void; reset():void; facet(index:number):void; hover(index:number|null):void;
  play(value:boolean):void; iteration(index:number):void; zoom(value:number):void; dispose():void;
}

/** The approved five-domain silhouette, with signals travelling on its actual branching paths. */
export function createConstellation(o:Options):ConstellationEngine {
  const renderer=new THREE.WebGLRenderer({canvas:o.canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(43,1,.1,80);
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const sourcePositions=[new THREE.Vector3(2.1,1.3,0),new THREE.Vector3(3.45,-.25,.15),new THREE.Vector3(-2.45,1.1,.05),new THREE.Vector3(1.8,-1.65,.25),new THREE.Vector3(-2.4,-1.6,.15)];
  const anchors=sourcePositions.map(p=>p.clone());
  const domains=createBusinessDomains(scene,1.2);
  const geometries:THREE.BufferGeometry[]=[],materials:THREE.Material[]=[];
  const geometry=<T extends THREE.BufferGeometry>(g:T)=>{geometries.push(g);return g;};
  const material=<T extends THREE.Material>(m:T)=>{materials.push(m);return m;};
  const gold=new THREE.Color('#f4c884');
  const core=new THREE.Mesh(geometry(new THREE.IcosahedronGeometry(.105,2)),material(new THREE.MeshBasicMaterial({color:'#ffe8bb',transparent:true})));scene.add(core);
  const memory=Array.from({length:3},(_,i)=>{
    const mat=material(new THREE.MeshBasicMaterial({color:gold,transparent:true,opacity:.07,blending:THREE.AdditiveBlending,depthWrite:false}));
    const ring=new THREE.Mesh(geometry(new THREE.TorusGeometry(.26+i*.14,.008,6,100)),mat);ring.rotation.set(.5+i*.4,.2+i*.25,0);scene.add(ring);return {ring,mat};
  });

  // Source → domain and domain → domain routes fan out at shared endpoints, never a separate overlay.
  const routes=[
    {a:-2,b:0,start:0,end:1.5},{a:-3,b:0,start:.35,end:1.8},{a:-1,b:0,start:.25,end:1.8},
    {a:0,b:1,start:1.15,end:3.2},{a:0,b:4,start:1.5,end:3.2},
    {a:4,b:1,start:2,end:3.6},{a:1,b:2,start:3,end:5},
    {a:1,b:3,start:3.3,end:5.3},{a:2,b:3,start:4.65,end:6.6},
    {a:2,b:4,start:5,end:6.7},{a:3,b:4,start:6.2,end:8.2},
    {a:4,b:-1,start:7.8,end:9.5},{a:-1,b:0,start:8.5,end:10},
  ];
  type Route=typeof routes[number]&{curves:THREE.CubicBezierCurve3[];geo:THREE.BufferGeometry;mat:THREE.LineBasicMaterial;};
  const routeGraphics:Route[]=routes.map(route=>{
    const geo=geometry(new THREE.BufferGeometry()),mat=material(new THREE.LineBasicMaterial({color:gold,transparent:true,opacity:.07,blending:THREE.AdditiveBlending,depthWrite:false}));
    scene.add(new THREE.LineSegments(geo,mat));return {...route,geo,mat,curves:[]};
  });
  const perRoute=7*18,particleCount=routes.length*perRoute;
  const positions=new Float32Array(particleCount*3),lights=new Float32Array(particleCount);
  const particlesGeo=geometry(new THREE.BufferGeometry());particlesGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));particlesGeo.setAttribute('light',new THREE.BufferAttribute(lights,1));
  const particleMat=material(new THREE.ShaderMaterial({
    uniforms:{uFade:{value:1}},transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
    vertexShader:`attribute float light; varying float vLight; void main(){vLight=light;vec4 view=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*view;gl_PointSize=clamp(70. / -view.z,3.,14.);}`,
    fragmentShader:`varying float vLight;uniform float uFade;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;gl_FragColor=vec4(1.,.78,.42,pow(1.-d,2.)*vLight*uFade);}`,
  }));
  const particles=new THREE.Points(particlesGeo,particleMat);particles.frustumCulled=false;scene.add(particles);
  const junctionPositions:number[]=[],junctionDomains:number[]=[];
  const junctionGeo=geometry(new THREE.BufferGeometry());
  const junctionMat=material(new THREE.PointsMaterial({color:'#f2d5a0',size:.045,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false}));
  const junctions=new THREE.Points(junctionGeo,junctionMat);scene.add(junctions);

  let width=1,height=1,visible=false,running=!motion.matches,focused:number|null=null,zoom=1;
  let last=0,raf=0,time=0,cycleTime=0,cycle=0,complete=0,step=0,flight=true;
  const target=new THREE.Vector3(),projected=new THREE.Vector3(),point=new THREE.Vector3();
  const cameraFlight=createCameraFlight(camera,10);
  let focusBlend=0,hovered:number|null=null;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),bounds=new THREE.Sphere();
  const endpoint=(index:number)=>index>=0?anchors[index]:index===-1?new THREE.Vector3():new THREE.Vector3(width<600?-2.1:-5,index===-2?1.2:-.65,-.15);
  const buildRoutes=()=>{
    routeGraphics.forEach((route,index)=>{
      const start=endpoint(route.a),end=endpoint(route.b),vertex:number[]=[];
      route.curves=Array.from({length:7},(_,ribbon)=>{
        const offset=(ribbon-3)*.14;
        const c1=start.clone().lerp(end,.34),c2=start.clone().lerp(end,.7);
        c1.y+=(index%2?.8:-.8)+offset;c1.z+=offset*1.6;
        c2.y+=(index%3?.4:-.55)-offset;c2.x+=offset*1.5;
        const curve=new THREE.CubicBezierCurve3(start.clone(),c1,c2,end.clone());
        const samples=curve.getPoints(50);
        for(let j=1;j<samples.length;j++)vertex.push(...samples[j-1].toArray(),...samples[j].toArray());
        return curve;
      });
      route.geo.setAttribute('position',new THREE.Float32BufferAttribute(vertex,3));route.geo.computeBoundingSphere();
    });
    junctionPositions.length=0;junctionDomains.length=0;
    routeGraphics.forEach(route=>{for(let j=1;j<9;j++){route.curves[j%7].getPoint(j/9,point);junctionPositions.push(...point.toArray());junctionDomains.push(route.b>=0?route.b:4);}});
    junctionGeo.setAttribute('position',new THREE.Float32BufferAttribute(junctionPositions,3));junctionGeo.computeBoundingSphere();
  };
  const place=(button:HTMLButtonElement|null|undefined,p:THREE.Vector3,shown:boolean)=>{
    if(!button)return;projected.copy(p).project(camera);
    button.style.transform=`translate(${(projected.x+1)*width/2}px,${(1-projected.y)*height/2}px) translate(-50%,-50%)`;
    button.style.opacity=shown?'1':'0';button.style.pointerEvents=shown?'auto':'none';button.tabIndex=shown?0:-1;
  };
  const render=(dt=0)=>{
    const animated=!motion.matches;
    if(running&&animated)time+=dt;
    if(running&&animated&&focused===null){
      cycleTime+=dt;
      if(complete===3){cycleTime%=10;}
      else if(cycleTime>=10){
        complete=Math.min(3,cycle+1);o.onComplete(complete);
        if(complete===3){cycleTime=0;}
        else {cycle++;cycleTime=0;o.onCycle(cycle);}
      }
    }
    const nextStep=cycleTime<1.5?0:cycleTime<3.3?1:cycleTime<5.2?2:cycleTime<7.5?3:4;
    if(nextStep!==step&&focused===null){step=nextStep;o.onStep(step);}
    const beat=Math.pow(Math.max(0,Math.sin(time*4.33)),14)*.014;
    focusBlend+=((focused!==null?1:0)-focusBlend)*(animated?1-Math.exp(-dt*6):1);
    domains.update(anchors,focused,time,beat,dt,hovered,motion.matches);
    routeGraphics.forEach((route,index)=>{
      const active=cycleTime>=route.start&&cycleTime<=route.end;
      const progress=(cycleTime-route.start)/(route.end-route.start);
      route.mat.opacity=(1-focusBlend*.98)*(.065+complete*.014+(active?.23:0));
      for(let ribbon=0;ribbon<7;ribbon++)for(let tail=0;tail<18;tail++){
        const at=index*perRoute+ribbon*18+tail;
        const t=progress-tail*.009-ribbon*.015;
        lights[at]=active&&t>=0&&t<=1?(1-tail/18)*.92:0;
        route.curves[ribbon].getPoint(THREE.MathUtils.clamp(t,0,1),point);positions.set(point.toArray(),at*3);
      }
    });
    particlesGeo.attributes.position.needsUpdate=true;particlesGeo.attributes.light.needsUpdate=true;
    particleMat.uniforms.uFade.value=1-focusBlend*.98;junctionMat.opacity=.35-focusBlend*.34;
    memory.forEach(({ring,mat},i)=>{mat.opacity=(i<complete?.7:.06)*(1-focusBlend*.97);ring.rotation.z=time*.035*(i%2?-1:1);});
    (core.material as THREE.MeshBasicMaterial).opacity=1-focusBlend;
    target.copy(focused===null?new THREE.Vector3():anchors[focused]);
    const portrait=width<600;
    const fit=portrait?11.1:width/height<1.5?10.8:9.6;
    const wanted=focused===null?fit/zoom:(portrait?Math.max(4.2,3.7*height/width):6);
    flight=cameraFlight.update(target,wanted,focused!==null&&width>1000?1.4:0,focused!==null,dt,motion.matches)||Math.abs(focusBlend-(focused!==null?1:0))>.001;
    anchors.forEach((anchor,i)=>{point.copy(anchor).add(new THREE.Vector3(0,width<600?-1.12:-1.32,.12));place(o.nodes()[i],point,focused===null);});
    domains.facetPoints.forEach((p,i)=>place(o.facets()[i],p,focused!==null&&focusBlend>.78));
    renderer.render(scene,camera);
  };
  const frame=(now:number)=>{const dt=last?Math.min((now-last)/1000,.05):.016;last=now;render(dt);if(visible&&!document.hidden&&!motion.matches&&(running||flight))raf=requestAnimationFrame(frame);};
  const schedule=()=>{cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden&&!motion.matches&&(running||flight))raf=requestAnimationFrame(frame);else render(motion.matches?1:0);};
  const size=()=>{
    width=o.host.clientWidth;height=o.host.clientHeight;
    if(width<600){const portrait=[[-1.05,2.15,0],[1.12,1.35,.1],[-1.08,-.05,0],[1.05,-1.02,.05],[-.6,-2.15,.1]];anchors.forEach((p,i)=>p.set(...portrait[i] as [number,number,number]));}
    else anchors.forEach((p,i)=>p.copy(sourcePositions[i]).multiplyScalar(1.2));
    domains.scale(width<600?1.2:1.45);
    buildRoutes();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(width,height,false);flight=true;schedule();
  };
  const select=(index:number)=>{focused=index;hovered=null;step=index;domains.facet(null);o.onStep(index);o.onFocus(index);flight=true;schedule();};
  const reset=()=>{focused=null;hovered=null;domains.facet(null);o.onFocus(null);flight=true;schedule();};
  const setMotion=()=>{if(motion.matches){running=false;o.onPlaying(false);}o.onMotion(motion.matches);schedule();};
  let downX=0,downY=0;
  const down=(e:PointerEvent)=>{downX=e.clientX;downY=e.clientY;};
  const up=(e:PointerEvent)=>{
    if(Math.hypot(e.clientX-downX,e.clientY-downY)>8)return;
    const rect=o.canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/width*2-1,1-(e.clientY-rect.top)/height*2);raycaster.setFromCamera(pointer,camera);
    bounds.radius=domainRadius*(width<600?1.2:1.45);
    if(focused!==null){
      if(focusBlend>.78){
        bounds.radius=.25*(width<600?1.2:1.45);
        const actor=domains.actorPoints.findIndex(center=>{bounds.center.copy(center);return raycaster.ray.intersectsSphere(bounds);});
        if(actor>=0){domains.facet(actor);o.onFacet(actor);render(motion.matches?1:.016);return;}
      }
      bounds.radius=domainRadius*(width<600?1.2:1.45);bounds.center.copy(anchors[focused]);if(!raycaster.ray.intersectsSphere(bounds))reset();return;
    }
    const hits=anchors.map((a,index)=>{bounds.center.copy(a);const hit=raycaster.ray.intersectSphere(bounds,new THREE.Vector3());return {index,d:hit?camera.position.distanceTo(hit):Infinity};}).sort((a,b)=>a.d-b.d);
    if(hits[0].d<Infinity){select(hits[0].index);return;}
    // A junction opens the domain receiving that signal; native domain buttons provide keyboard access.
    const x=e.clientX-rect.left,y=e.clientY-rect.top;
    let closest=20,domain:number|null=null;
    junctionDomains.forEach((index,i)=>{point.fromArray(junctionPositions,i*3).project(camera);const d=Math.hypot((point.x+1)*width/2-x,(1-point.y)*height/2-y);if(d<closest){closest=d;domain=index;}});
    if(domain!==null)select(domain);
  };
  const hover=(index:number|null)=>{hovered=index;};
  const move=(e:PointerEvent)=>{
    if(e.pointerType!=='mouse'||focused!==null||motion.matches)return;
    const rect=o.canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/width*2-1,1-(e.clientY-rect.top)/height*2);raycaster.setFromCamera(pointer,camera);bounds.radius=domainRadius*(width<600?1.2:1.45);
    const hit=anchors.map((a,index)=>{bounds.center.copy(a);const p=raycaster.ray.intersectSphere(bounds,new THREE.Vector3());return {index,d:p?camera.position.distanceTo(p):Infinity};}).sort((a,b)=>a.d-b.d)[0];hover(hit.d<Infinity?hit.index:null);
  };
  const leave=()=>hover(null);
  o.canvas.addEventListener('pointermove',move);o.canvas.addEventListener('pointerleave',leave);
  const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);schedule();},{threshold:.05});observer.observe(o.host);
  const resize=new ResizeObserver(size);resize.observe(o.host);
  motion.addEventListener('change',setMotion);document.addEventListener('visibilitychange',schedule);o.canvas.addEventListener('pointerdown',down);o.canvas.addEventListener('pointerup',up);size();setMotion();
  return {
    select,reset,hover,
    facet(index){domains.facet(index);render(motion.matches?1:.016);},
    play(value){running=value&&!motion.matches;o.onPlaying(running);schedule();},
    iteration(index){cycle=index;complete=index;cycleTime=0;focused=null;hovered=null;domains.facet(null);running=!motion.matches;o.onCycle(index);o.onComplete(complete);o.onFocus(null);o.onPlaying(running);flight=true;schedule();},
    zoom(value){zoom=value;flight=true;schedule();},
    dispose(){cancelAnimationFrame(raf);observer.disconnect();resize.disconnect();motion.removeEventListener('change',setMotion);document.removeEventListener('visibilitychange',schedule);o.canvas.removeEventListener('pointermove',move);o.canvas.removeEventListener('pointerleave',leave);o.canvas.removeEventListener('pointerdown',down);o.canvas.removeEventListener('pointerup',up);domains.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();},
  };
}
