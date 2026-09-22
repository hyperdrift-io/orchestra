import * as THREE from 'three';
import {createDomainSymbol,domainSymbols,actorSymbols} from './domain-symbols';

export const domainColours=['#78dcca','#9dbdff','#e6b46c','#f19c9a','#c3a6f5'];
export const domainRadius=.88;
const facetOffsets=[[-.47,.36,.58],[.47,.36,.58],[-.47,-.30,.58],[.47,-.30,.58]];

/** Recognisable wireframe domains and actors coexist throughout the camera journey. */
export function createBusinessDomains(scene:THREE.Scene,scaleFactor=1) {
  const geometries:THREE.BufferGeometry[]=[],materials:THREE.Material[]=[];
  const geometry=<T extends THREE.BufferGeometry>(g:T)=>{geometries.push(g);return g;};
  const material=<T extends THREE.Material>(m:T)=>{materials.push(m);return m;};
  const facetPoints=facetOffsets.map(()=>new THREE.Vector3());
  const actorPoints=facetOffsets.map(()=>new THREE.Vector3());
  const point=new THREE.Vector3();let selectedFacet:number|null=null;
  const worlds=domainColours.map((colour,domain)=>{
    const group=new THREE.Group();group.scale.setScalar(scaleFactor);scene.add(group);
    const bodyMaterial=material(new THREE.LineBasicMaterial({color:colour,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));
    const vertexMaterial=material(new THREE.PointsMaterial({color:colour,size:.014,transparent:true,opacity:.85,depthWrite:false}));
    const sculpture=createDomainSymbol(domainSymbols[domain],bodyMaterial,vertexMaterial,geometry);group.add(sculpture);
    const actorMaterials=facetOffsets.map(()=>material(new THREE.LineBasicMaterial({color:colour,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false})));
    const actorVertices=facetOffsets.map(()=>material(new THREE.PointsMaterial({color:colour,size:.009,transparent:true,opacity:0,depthWrite:false})));
    const actors=facetOffsets.map((offset,i)=>{
      const actor=createDomainSymbol(actorSymbols[domain][i],actorMaterials[i],actorVertices[i],geometry);
      actor.scale.setScalar(.32);actor.position.set(...offset as [number,number,number]);group.add(actor);return actor;
    });
    const paths=facetOffsets.map(offset=>new THREE.CubicBezierCurve3(new THREE.Vector3(0,0,.15),new THREE.Vector3(offset[0]*.2,offset[1]*1.3,.65),new THREE.Vector3(offset[0]*1.1,offset[1]*.5,.7),new THREE.Vector3(...offset)));
    const lineMaterial=material(new THREE.LineBasicMaterial({color:colour,transparent:true,opacity:.05,blending:THREE.AdditiveBlending,depthWrite:false}));
    paths.forEach(path=>group.add(new THREE.Line(geometry(new THREE.BufferGeometry().setFromPoints(path.getPoints(48))),lineMaterial)));
    const specks=new Float32Array(4*14*3),sparkGeometry=geometry(new THREE.BufferGeometry());
    sparkGeometry.setAttribute('position',new THREE.BufferAttribute(specks,3));
    const sparkMaterial=material(new THREE.ShaderMaterial({
      uniforms:{uColour:{value:new THREE.Color(colour)},uOpacity:{value:0},uTime:{value:0}},
      vertexShader:`varying float seed;void main(){seed=position.x*17.+position.y*29.;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(27./-p.z,2.,10.);}`,
      fragmentShader:`uniform vec3 uColour;uniform float uOpacity;uniform float uTime;varying float seed;void main(){vec2 p=abs(gl_PointCoord-.5)*2.;float d=length(p);float cross=pow(max(0.,1.-min(p.x,p.y)),18.)*pow(max(0.,1.-max(p.x,p.y)),2.);float light=pow(max(0.,1.-d),4.)+cross*.55;gl_FragColor=vec4(mix(uColour,vec3(1.),.65),light*uOpacity*(.65+.35*sin(seed+uTime*6.)));}`,
      transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
    }));
    const sparks=new THREE.Points(sparkGeometry,sparkMaterial);sparks.frustumCulled=false;group.add(sparks);
    return {group,sculpture,bodyMaterial,vertexMaterial,actors,actorMaterials,actorVertices,paths,lineMaterial,specks,sparkGeometry,sparkMaterial,focus:0,visibility:1,hover:0,turn:domain*.3};
  });
  return {
    facetPoints,actorPoints,
    scale(value:number){scaleFactor=value;worlds.forEach(w=>w.group.scale.setScalar(value));},
    facet(index:number|null){selectedFacet=index;},
    update(anchors:THREE.Vector3[],focused:number|null,time:number,heartbeat:number,dt=.016,hover:number|null=null,reduced=false,depth=false){
      const ease=reduced?1:1-Math.exp(-dt*6);
      worlds.forEach((w,i)=>{
        w.focus+=((focused===i?1:0)-w.focus)*ease;
        const depthOpacity=depth?THREE.MathUtils.clamp((anchors[i].z+2.65)/4.1,.2,1):1;
        w.visibility+=((focused===null?depthOpacity:focused===i?1:.015)-w.visibility)*ease;
        w.hover+=((hover===i?1:0)-w.hover)*ease;
        w.group.position.copy(anchors[i]);
        if(reduced)w.turn=0;else if(hover===i||focused===i)w.turn+=Math.atan2(Math.sin(-w.turn),Math.cos(-w.turn))*(1-Math.exp(-dt*4));else w.turn+=(Math.sin(time*.3+i)*.42-w.turn)*(1-Math.exp(-dt*2));
        w.sculpture.rotation.set(.1*(1-w.hover),w.turn,0);
        w.bodyMaterial.opacity=w.visibility*(.75+w.hover*.2)*(1-w.focus*.98);
        w.vertexMaterial.opacity=w.bodyMaterial.opacity*(1+heartbeat);
        w.lineMaterial.opacity=(.025+w.focus*.36)*w.visibility;
        w.actors.forEach((actor,j)=>{
          actor.rotation.set(Math.sin(time*.25+j)*.07,Math.sin(time*.22+j)*.18,0);
          w.actorMaterials[j].opacity=w.focus*w.visibility*(selectedFacet===null||selectedFacet===j?1:.24);
          w.actorVertices[j].opacity=w.actorMaterials[j].opacity;
          if(focused===i){
            actorPoints[j].set(...facetOffsets[j] as [number,number,number]).multiplyScalar(scaleFactor).add(anchors[i]);
            facetPoints[j].copy(actorPoints[j]).add(new THREE.Vector3(0,-.25,.05).multiplyScalar(scaleFactor));
          }
          for(let k=0;k<14;k++){w.paths[j].getPoint(1-(time*(i===3?.6:.3)+k*.011+j*.23)%1,point);w.specks.set(point.toArray(),(j*14+k)*3);}
        });
        w.sparkMaterial.uniforms.uOpacity.value=(w.focus*.65+w.hover*.85)*w.visibility;
        w.sparkMaterial.uniforms.uTime.value=time;w.sparkGeometry.attributes.position.needsUpdate=true;
      });
    },
    dispose(){worlds.forEach(w=>scene.remove(w.group));geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
  };
}
