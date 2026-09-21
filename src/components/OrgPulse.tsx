'use client';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';

/** Signals travel in the diagram's gutters, clear of labels. */
export function OrgPulse({active,playing}:{active:number;playing:boolean}) {
  const canvas=useRef<HTMLCanvasElement>(null),state=useRef({active,playing});state.current={active,playing};
  useEffect(()=>{
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({canvas:canvas.current!,alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
    const media=matchMedia('(prefers-reduced-motion: reduce)'),scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(0,1000,580,0,.1,100);camera.position.z=10;
    const geometry=new THREE.SphereGeometry(2.6,10,6),material=new THREE.MeshBasicMaterial({color:'#ffe0a0'});
    const particles=new THREE.InstancedMesh(geometry,material,15);scene.add(particles);
    const paths=Array.from({length:5},(_,i)=>{
      const x=124+i*188;
      return [new THREE.Vector3(500,475,0),new THREE.Vector3(500,455,0),new THREE.Vector3(x,455,0),new THREE.Vector3(x,435,0),new THREE.Vector3(x-92,435,0),new THREE.Vector3(x-92,125,0),new THREE.Vector3(x,125,0),new THREE.Vector3(x,100,0)];
    });
    const curves=paths.map(()=>new THREE.CurvePath<THREE.Vector3>());
    paths.forEach((points,i)=>points.slice(1).forEach((p,j)=>curves[i].add(new THREE.LineCurve3(points[j],p))));
    let raf=0,last=0,time=0,visible=false;const m=new THREE.Matrix4(),p=new THREE.Vector3();
    const draw=()=>{const c=curves[state.current.active];for(let i=0;i<15;i++){c.getPoint((time*.2+i*.013)%1,p);const s=1-i/19;m.makeScale(s,s,s);m.setPosition(p);particles.setMatrixAt(i,m);}particles.instanceMatrix.needsUpdate=true;renderer.render(scene,camera);};
    const frame=(now:number)=>{if(last)time+=Math.min((now-last)/1000,.1);last=now;draw();if(visible&&state.current.playing&&!media.matches&&!document.hidden)raf=requestAnimationFrame(frame);};
    const run=()=>{cancelAnimationFrame(raf);last=0;if(visible&&state.current.playing&&!media.matches&&!document.hidden)raf=requestAnimationFrame(frame);else draw();};
    const resize=new ResizeObserver(()=>{const el=canvas.current!;renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(el.clientWidth,el.clientHeight,false);draw();});resize.observe(canvas.current!);
    const io=new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);run();});io.observe(canvas.current!);
    // React updates control state; this event restarts a stopped animation without rebuilding WebGL.
    canvas.current!.addEventListener('sequencechange',run);document.addEventListener('visibilitychange',run);media.addEventListener('change',run);
    const el=canvas.current!;
    return()=>{cancelAnimationFrame(raf);resize.disconnect();io.disconnect();el.removeEventListener('sequencechange',run);document.removeEventListener('visibilitychange',run);media.removeEventListener('change',run);geometry.dispose();material.dispose();renderer.dispose();};
  },[]);
  useEffect(()=>{canvas.current?.dispatchEvent(new Event('sequencechange'));},[active,playing]);
  return <canvas ref={canvas} aria-hidden="true"/>;
}
