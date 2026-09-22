import * as THREE from 'three';

export type DomainSymbol = 'eye'|'signpost'|'wrench'|'plane'|'book'|'conversation'|'magnifier'|'bulb'|'chart'|'decision'|'target'|'scales'|'flag'|'hammer'|'gate'|'clock'|'checklist'|'shield'|'gift'|'response'|'comparison'|'library'|'steps'|'coins';
export const domainSymbols:DomainSymbol[]=['eye','signpost','wrench','plane','book'];
export const actorSymbols:DomainSymbol[][]=[
  ['conversation','magnifier','bulb','chart'],
  ['bulb','decision','target','scales'],
  ['flag','hammer','gate','clock'],
  ['checklist','shield','gift','response'],
  ['comparison','library','steps','coins'],
];

/** Recognisable objects, built from vertices and edges only. No maps, textures or filled surfaces. */
export function createDomainSymbol(kind:DomainSymbol,stroke:THREE.LineBasicMaterial,vertices:THREE.PointsMaterial,register:(g:THREE.BufferGeometry)=>THREE.BufferGeometry) {
  const positions:number[]=[],matrix=new THREE.Matrix4(),quaternion=new THREE.Quaternion();
  const add=(shape:THREE.BufferGeometry,position:[number,number,number]=[0,0,0],rotation:[number,number,number]=[0,0,0])=>{
    quaternion.setFromEuler(new THREE.Euler(...rotation));matrix.compose(new THREE.Vector3(...position),quaternion,new THREE.Vector3(1,1,1));
    const wire=new THREE.WireframeGeometry(shape);wire.applyMatrix4(matrix);
    positions.push(...Array.from(wire.getAttribute('position').array));wire.dispose();shape.dispose();
  };
  const box=(x:number,y:number,w:number,h:number,d=.11,z=0)=>add(new THREE.BoxGeometry(w,h,d),[x,y,z]);
  const rod=(a:number[],b:number[],radius=.02)=>{
    const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),curve=new THREE.LineCurve3(start,end);
    add(new THREE.TubeGeometry(curve,1,radius,5,false));
  };
  const ring=(x:number,y:number,r:number,z=0)=>add(new THREE.TorusGeometry(r,.022,5,32),[x,y,z]);
  const polygon=(coords:number[][],depth=.1)=>{
    const path=new THREE.Shape();coords.forEach(([x,y],i)=>i===0?path.moveTo(x,y):path.lineTo(x,y));path.closePath();
    add(new THREE.ExtrudeGeometry(path,{depth,bevelEnabled:false,steps:1}),[0,0,-depth/2]);
  };
  const tick=(x=0,y=0,s=1)=>{rod([x-.22*s,y, .12],[x-.05*s,y-.17*s,.12],.025);rod([x-.05*s,y-.17*s,.12],[x+.27*s,y+.22*s,.12],.025);};
  const bubble=(x:number,y:number,s=1)=>{
    polygon([[x-.43*s,y+.29*s],[x+.43*s,y+.29*s],[x+.43*s,y-.18*s],[x+.06*s,y-.18*s],[x-.14*s,y-.37*s],[x-.12*s,y-.18*s],[x-.43*s,y-.18*s]],.12);
  };
  const chart=(compare=false)=>{
    rod([-.6,-.52,0],[.63,-.52,0]);rod([-.6,-.52,0],[-.6,.58,0]);
    const bars=compare?[.24,.62,.42,.85]:[.24,.48,.81];
    bars.forEach((height,i)=>box(-.34+i*(compare?.25:.35),-.5+height/2,compare?.15:.21,height,.18));
  };
  switch(kind){
    case 'eye': {
      const lid=new THREE.Shape();lid.moveTo(-.72,0);lid.bezierCurveTo(-.3,.48,.3,.48,.72,0);lid.bezierCurveTo(.3,-.48,-.3,-.48,-.72,0);
      add(new THREE.ExtrudeGeometry(lid,{depth:.065,bevelEnabled:false}),[0,0,-.12]);
      add(new THREE.SphereGeometry(.245,16,10),[0,0,.04]);ring(0,0,.125,.275);break;
    }
    case 'signpost':
      box(0,-.04,.075,1.32,.075);polygon([[-.04,.55],[.44,.55],[.66,.38],[.44,.21],[-.04,.21]]);polygon([[.04,.08],[-.44,.08],[-.66,-.09],[-.44,-.26],[.04,-.26]]);box(0,-.7,.45,.04,.32);break;
    case 'wrench':
      polygon([[-.34,-.64],[-.52,-.47],[-.13,.15],[-.27,.37],[-.19,.65],[.02,.7],[-.05,.44],[.12,.34],[.29,.48],[.21,.73],[.46,.56],[.43,.28],[.21,.12]]);ring(-.35,-.46,.085,.09);break;
    case 'plane': {
      const a=new THREE.Vector3(-.65,.17,0),b=new THREE.Vector3(.68,.67,0),c=new THREE.Vector3(-.1,-.1,.2),d=new THREE.Vector3(.17,-.65,0),e=new THREE.Vector3(-.18,-.4,-.04);
      const geo=new THREE.BufferGeometry().setFromPoints([a,b,c,c,b,d,c,d,e]);geo.setIndex([0,1,2,3,4,5,6,7,8]);add(geo);rod([-.48,-.56,-.06],[-.69,-.71,-.06],.015);rod([-.22,-.63,-.06],[-.39,-.77,-.06],.015);break;
    }
    case 'book':
      // Two folded page blocks meet at a visible spine.
      polygon([[-.64,.53],[-.08,.42],[0,.32],[0,-.63],[-.12,-.51],[-.64,-.42]],.15);
      polygon([[.64,.53],[.08,.42],[0,.32],[0,-.63],[.12,-.51],[.64,-.42]],.15);
      for(let i=0;i<4;i++){rod([-.51,.3-i*.16,.095],[-.15,.23-i*.16,.095],.009);rod([.51,.3-i*.16,.095],[.15,.23-i*.16,.095],.009);}break;
    case 'conversation':
      bubble(-.14,.2,.9);bubble(.22,-.3,.7);for(let i=0;i<3;i++)add(new THREE.IcosahedronGeometry(.035),[-.32+i*.18,.22,.12]);break;
    case 'magnifier':
      box(-.19,.07,.58,.78,.07,-.1);ring(.16,.18,.33,.08);rod([.39,-.06,.08],[.64,-.47,.08],.055);for(let i=0;i<3;i++)rod([-.38,.3-i*.18,-.02],[-.05,.3-i*.18,-.02],.012);break;
    case 'bulb':
      add(new THREE.SphereGeometry(.39,12,10),[0,.19,0]);box(0,-.27,.28,.16,.22);box(0,-.43,.23,.09,.18);rod([-.16,.13,0],[0,-.2,0]);rod([.16,.13,0],[0,-.2,0]);
      for(let i=0;i<5;i++){const a=i/4*Math.PI;rod([Math.cos(a)*.52,.19+Math.sin(a)*.52,0],[Math.cos(a)*.67,.19+Math.sin(a)*.67,0],.012);}break;
    case 'chart':chart();break;
    case 'comparison':chart(true);break;
    case 'decision':box(0,0,1.08,1.08,.07);tick(0,0,1.5);break;
    case 'target':
      ring(0,0,.55);ring(0,0,.34);ring(0,0,.13);rod([0,0,.04],[.52,.54,.46],.025);polygon([[.52,.54],[.63,.57],[.55,.69]],.08);break;
    case 'scales':
      rod([0,-.58,0],[0,.63,0],.035);rod([-.65,.34,0],[.65,.34,0],.026);box(0,-.64,.64,.09,.3);
      for(const x of [-.43,.43]){rod([x,.34,0],[x-.2,-.25,0],.012);rod([x,.34,0],[x+.2,-.25,0],.012);add(new THREE.CylinderGeometry(.23,.14,.09,10),[x,-.29,0]);}break;
    case 'flag':
      rod([-.33,-.67,0],[-.33,.65,0],.027);polygon([[-.3,.6],[.47,.48],[.25,.17],[-.3,.25]],.08);box(-.33,-.69,.43,.05,.3);break;
    case 'hammer':
      box(-.12,-.12,.13,1.12,.15);polygon([[-.43,.43],[.23,.43],[.51,.26],[.35,.15],[.14,.24],[-.43,.24]],.24);break;
    case 'gate':
      box(-.51,0,.08,1.2,.1);box(.51,0,.08,1.2,.1);box(0,.59,1.1,.08,.1);add(new THREE.BoxGeometry(.79,1.1,.055),[-.19,-.01,.32],[0,-.9,0]);add(new THREE.SphereGeometry(.035,8,5),[.13,-.05,.62]);break;
    case 'clock':
      ring(0,0,.57);ring(0,0,.52);rod([0,0,.04],[0,.33,.04],.025);rod([0,0,.04],[.27,-.14,.04],.025);for(let i=0;i<12;i++){const a=i/12*Math.PI*2;rod([Math.sin(a)*.45,Math.cos(a)*.45,0],[Math.sin(a)*.5,Math.cos(a)*.5,0],.01);}break;
    case 'checklist':
      box(0,0,.86,1.2,.09);box(0,.6,.37,.13,.15);for(let i=0;i<3;i++){tick(-.22,.3-i*.3,.35);rod([-.02,.31-i*.3,.1],[.28,.31-i*.3,.1],.016);}break;
    case 'shield':
      polygon([[-.53,.47],[0,.65],[.53,.47],[.43,-.24],[0,-.63],[-.43,-.24]],.16);tick(0,.04,1.2);break;
    case 'gift':
      box(0,-.13,1,.8,.6);box(0,.32,1.1,.16,.69);box(0,-.06,.11,.99,.67);ring(-.17,.53,.16);ring(.17,.53,.16);break;
    case 'response':
      bubble(0,0,1.2);const pulse=[[-.37,0,.14],[-.2,0,.14],[-.1,.2,.14],[.05,-.17,.14],[.16,.08,.14],[.37,.08,.14]];pulse.slice(1).forEach((p,i)=>rod(pulse[i],p,.014));break;
    case 'library':
      for(let i=0;i<3;i++){box((i-1)*.34,0,.26,1.05,.4);box((i-1)*.34,.31,.27,.04,.41);box((i-1)*.34,-.29,.27,.04,.41);}box(0,-.6,1.22,.06,.6);break;
    case 'steps':
      for(let i=0;i<3;i++)box(-.4+i*.38,-.53+(i+1)*.16,.35,(i+1)*.32,.34);rod([-.51,.0,.1],[.47,.7,.1],.02);polygon([[.28,.68],[.5,.73],[.47,.49]],.08);break;
    case 'coins':
      for(let stack=0;stack<3;stack++)for(let i=0;i<=stack*2;i++)add(new THREE.CylinderGeometry(.19,.19,.065,14),[(stack-1)*.39,-.48+i*.09,0]);break;
  }
  const group=new THREE.Group();
  const geo=register(new THREE.BufferGeometry());geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  group.add(new THREE.LineSegments(geo,stroke));
  const unique=new Map<string,number[]>();for(let i=0;i<positions.length;i+=3){const p=positions.slice(i,i+3);unique.set(p.map(n=>n.toFixed(3)).join(','),p);}
  const dots=register(new THREE.BufferGeometry());dots.setAttribute('position',new THREE.Float32BufferAttribute([...unique.values()].flat(),3));group.add(new THREE.Points(dots,vertices));
  return group;
}
