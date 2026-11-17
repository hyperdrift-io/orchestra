import * as THREE from 'three';
import {domainColours} from './business-domains';

// Each domain receives its own illustrative signals. Their arrivals can overlap.
const cadence = [
  { interval: 7.5, offset: .8 },
  { interval: 11.1, offset: 3.2 },
  { interval: 6.2, offset: 1.6 },
  { interval: 9.7, offset: 4.5 },
  { interval: 8.3, offset: .1 },
];

export function contributionAt(time: number) {
  const travelTime = 1.85;
  let count = 0, domain = 0, latestArrival = -Infinity;
  const progress = cadence.map(({ interval, offset }, i) => {
    const elapsed = time - offset;
    if (elapsed < 0) return -1;
    const completed = Math.max(0, Math.floor((elapsed - travelTime) / interval) + 1);
    count += completed;
    if (completed > 0) {
      const arrival = offset + (completed - 1) * interval + travelTime;
      if (arrival > latestArrival) { latestArrival = arrival; domain = i; }
    }
    return (elapsed % interval) / travelTime;
  });
  const pulse = Math.pow(Math.max(0, 1 - (time - latestArrival) / .55), 2);
  return { domain, progress, count, strength: Math.min(count / 15, 1), pulse };
}

/** A contribution reaches the business before its retained strength increases. */
export function createBusinessReinforcement(scene:THREE.Scene){
  const colours=domainColours.map(c=>new THREE.Color(c)),warm=new THREE.Color('#f9dda3');
  const coreGeo=new THREE.IcosahedronGeometry(.48,2);
  const coreMat=new THREE.MeshBasicMaterial({color:warm,wireframe:true,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false});
  const shellMat=coreMat.clone(),core=new THREE.Mesh(coreGeo,coreMat),shell=new THREE.Mesh(coreGeo,shellMat);
  scene.add(core,shell);
  const routePositions=new Float32Array(5*48*6),routeColours=new Float32Array(5*48*6);
  const routeGeo=new THREE.BufferGeometry();routeGeo.setAttribute('position',new THREE.BufferAttribute(routePositions,3));routeGeo.setAttribute('color',new THREE.BufferAttribute(routeColours,3));
  const routeMat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false});
  const routes=new THREE.LineSegments(routeGeo,routeMat);routes.frustumCulled=false;scene.add(routes);
  const particleGeo=new THREE.IcosahedronGeometry(.023,0),particleMat=new THREE.MeshBasicMaterial({transparent:true,blending:THREE.AdditiveBlending,depthWrite:false});
  const particles=new THREE.InstancedMesh(particleGeo,particleMat,5*20);particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);particles.frustumCulled=false;scene.add(particles);
  for(let i=0;i<100;i++)particles.setColorAt(i,colours[Math.floor(i/20)]);
  const point=new THREE.Vector3(),previous=new THREE.Vector3(),colour=new THREE.Color(),matrix=new THREE.Matrix4();
  let size=1;
  return {
    update(anchors:THREE.Vector3[],state:ReturnType<typeof contributionAt>,time:number,fade:number,dt:number,reduced:boolean){
      size+=(1+state.strength*.55-size)*(reduced?1:1-Math.exp(-dt*2.8));
      core.scale.setScalar(size);shell.scale.setScalar(size*1.12);
      core.rotation.set(time*.06,time*.13,0);shell.rotation.set(-time*.08,.6+time*.07,.3);
      coreMat.color.copy(warm).lerp(colours[state.domain],state.pulse*.55);
      coreMat.opacity=(.3+state.strength*.35+state.pulse*.25)*(1-fade*.96);
      shellMat.color.copy(coreMat.color);shellMat.opacity=(.07+state.strength*.1+state.pulse*.2)*(1-fade*.97);
      anchors.forEach((anchor,i)=>{
        const end=anchor.clone().normalize().multiplyScalar(.49*size);
        const c1=anchor.clone().multiplyScalar(.68),c2=end.clone().lerp(anchor,.25);
        c1.y+=(i%2?.25:-.25);c2.z+=.18;
        const curve=new THREE.CubicBezierCurve3(anchor.clone(),c1,c2,end);
        curve.getPoint(0,previous);
        for(let j=1;j<=48;j++){
          const at=(i*48+j-1)*6;curve.getPoint(j/48,point);routePositions.set(previous.toArray(),at);routePositions.set(point.toArray(),at+3);previous.copy(point);
          const head=1-Math.min(1,Math.abs(j/48-state.progress[i])*7);
          const light=.17+(head*.9+(i===state.domain?state.pulse*.6:0));
          colour.copy(colours[i]).multiplyScalar(light);routeColours.set([colour.r,colour.g,colour.b,colour.r,colour.g,colour.b],at);
        }
        for(let k=0;k<20;k++){
          const t=state.progress[i]-k*.014,shown=t>=0&&t<=1&&!reduced;
          curve.getPoint(THREE.MathUtils.clamp(t,0,1),point);
          matrix.makeScale(shown?1-k/24:0,shown?1-k/24:0,shown?1-k/24:0);matrix.setPosition(point);particles.setMatrixAt(i*20+k,matrix);
        }
      });
      routeGeo.attributes.position.needsUpdate=true;routeGeo.attributes.color.needsUpdate=true;particles.instanceMatrix.needsUpdate=true;
      routeMat.opacity=1-fade;particleMat.opacity=1-fade;
      return size;
    },
    dispose(){scene.remove(core,shell,routes,particles);[coreGeo,coreMat,shellMat,routeGeo,routeMat,particleGeo,particleMat].forEach(resource=>resource.dispose());},
  };
}
