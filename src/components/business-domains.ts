import * as THREE from 'three';

// Each domain keeps its colour from the whole business into its own interior.
export const domainColours = ['#78dcca', '#9dbdff', '#e6b46c', '#f19c9a', '#c3a6f5'];
export const domainRadius = .88;
const facetOffsets = [[-.49, .36, .3], [.49, .36, .3], [-.49, -.36, .3], [.49, -.36, .3]];

/** Original procedural assets: luminous membranes, branching signals and four business facets. */
export function createBusinessDomains(scene: THREE.Scene) {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const geometry = <T extends THREE.BufferGeometry>(value: T) => { geometries.push(value); return value; };
  const material = <T extends THREE.Material>(value: T) => { materials.push(value); return value; };
  const shellGeometry = geometry(new THREE.SphereGeometry(domainRadius, 48, 32));
  const shellVertex = `
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vPosition;
    void main() {
      vec4 view = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vView = -view.xyz;
      vPosition = position;
      gl_Position = projectionMatrix * view;
    }
  `;
  const shellFragment = `
    uniform vec3 uColour;
    uniform float uTime;
    uniform float uStrength;
    varying vec3 vNormal;
    varying vec3 vView;
    varying vec3 vPosition;
    void main() {
      float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.4);
      vec3 p = vPosition * 7.0;
      float flow = sin(p.x + sin(p.z * 1.8 + uTime * .22))
                 * sin(p.y * 1.3 - uTime * .17 + cos(p.z));
      float filament = pow(1.0 - abs(flow), 12.0);
      float light = .025 + rim * .68 + filament * .12;
      gl_FragColor = vec4(uColour * (1.0 + rim * .55), light * uStrength);
    }
  `;
  const shellMaterials = domainColours.map(colour => material(new THREE.ShaderMaterial({
    uniforms: { uColour: { value: new THREE.Color(colour) }, uTime: { value: 0 }, uStrength: { value: .8 } },
    vertexShader: shellVertex, fragmentShader: shellFragment,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  })));
  const groups = shellMaterials.map(shellMaterial => {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(shellGeometry, shellMaterial));
    scene.add(group);
    return group;
  });

  const interior = new THREE.Group();
  scene.add(interior);
  const facetPoints = facetOffsets.map(offset => new THREE.Vector3(...offset));
  const curves = facetPoints.map((end, i) => new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, .1),
    new THREE.Vector3(end.x * .15, end.y * 1.2, .54),
    new THREE.Vector3(end.x * 1.25, end.y * .3, .42), end,
  ));
  const filamentMaterial = material(new THREE.LineBasicMaterial({ color: domainColours[0], transparent: true, opacity: .36, blending: THREE.AdditiveBlending, depthWrite: false }));
  curves.forEach(curve => interior.add(new THREE.Line(geometry(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48))), filamentMaterial)));

  // The branch routes are static; light travels along the exact same curves.
  const signalPositions = new Float32Array(4 * 18 * 3);
  const signalGeometry = geometry(new THREE.BufferGeometry());
  signalGeometry.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));
  const signalMaterial = material(new THREE.ShaderMaterial({
    uniforms: { uColour: { value: new THREE.Color(domainColours[0]) }, uOpacity: { value: 1 } },
    vertexShader: `
      void main() {
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(12.0 / -view.z, 2.0, 9.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColour;
      uniform float uOpacity;
      void main() {
        float radius = length(gl_PointCoord - .5) * 2.0;
        if (radius > 1.0) discard;
        gl_FragColor = vec4(mix(uColour, vec3(1.0), .35), pow(1.0 - radius, 2.0) * uOpacity);
      }
    `,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  const signalPoints = new THREE.Points(signalGeometry, signalMaterial);
  signalPoints.frustumCulled = false;
  interior.add(signalPoints);

  const assetMaterials = facetPoints.map(() => material(new THREE.MeshBasicMaterial({ color: domainColours[0], transparent: true, opacity: .85, blending: THREE.AdditiveBlending, depthWrite: false })));
  const assets = facetPoints.map(point => { const group = new THREE.Group(); group.position.copy(point); interior.add(group); return group; });
  const ringGeometry = geometry(new THREE.TorusGeometry(.115, .004, 5, 64));
  const signalRings = Array.from({ length: 3 }, (_, i) => {
    const ring = new THREE.Mesh(ringGeometry, assetMaterials[0]);
    ring.rotation.set(i * .55, i * .8, .3); assets[0].add(ring); return ring;
  });
  const actionGeometry = geometry(new THREE.OctahedronGeometry(.125, 0));
  const action = new THREE.Mesh(actionGeometry, assetMaterials[1]);
  const actionFrame = new THREE.Mesh(geometry(new THREE.IcosahedronGeometry(.19, 0)), material(new THREE.MeshBasicMaterial({ color: '#fff0d7', transparent: true, opacity: .35, wireframe: true })));
  assets[1].add(action, actionFrame);
  const impactPetals = Array.from({ length: 7 }, (_, i) => {
    const petal = new THREE.Mesh(ringGeometry, assetMaterials[2]);
    const angle = i / 7 * Math.PI * 2;
    petal.position.set(Math.cos(angle) * .07, Math.sin(angle) * .07, 0);
    petal.rotation.set(.6, .9, angle); assets[2].add(petal); return petal;
  });
  const measure = new THREE.Mesh(ringGeometry, assetMaterials[3]);
  assets[3].add(measure);
  const tickGeometry = geometry(new THREE.BoxGeometry(.007, .035, .007));
  for (let i = 0; i < 16; i++) {
    const tick = new THREE.Mesh(tickGeometry, assetMaterials[3]), angle = i / 16 * Math.PI * 2;
    tick.position.set(Math.sin(angle) * .155, Math.cos(angle) * .155, 0); tick.rotation.z = -angle; assets[3].add(tick);
  }
  const needle = new THREE.Mesh(geometry(new THREE.ConeGeometry(.014, .09, 5)), assetMaterials[3]);
  needle.position.y = .045; assets[3].add(needle);
  const core = new THREE.Mesh(geometry(new THREE.IcosahedronGeometry(.065, 1)), assetMaterials[1]);
  interior.add(core);
  const point = new THREE.Vector3();
  let selectedFacet: number | null = null;

  return {
    facetPoints: facetOffsets.map(() => new THREE.Vector3()),
    facet(index: number | null) { selectedFacet = index; },
    update(anchors: THREE.Vector3[], focused: number | null, time: number, heartbeat: number) {
      groups.forEach((group, i) => {
        group.position.copy(anchors[i]);
        group.visible = focused === null || focused === i;
        shellMaterials[i].uniforms.uTime.value = time + i * 3;
        shellMaterials[i].uniforms.uStrength.value = (focused === i ? 1.15 : .65) + heartbeat;
      });
      interior.visible = focused !== null;
      if (focused === null) return;
      interior.position.copy(anchors[focused]);
      const colour = domainColours[focused];
      filamentMaterial.color.set(colour);
      signalMaterial.uniforms.uColour.value.set(colour);
      assetMaterials.forEach((mat, i) => {
        mat.color.set(colour);
        mat.opacity = selectedFacet === null || selectedFacet === i ? .95 : .32;
      });
      curves.forEach((curve, branch) => {
        for (let i = 0; i < 18; i++) {
          const progress = (time * .42 + i * .008 + branch * .23) % 1;
          curve.getPoint(progress, point);
          signalPositions.set(point.toArray(), (branch * 18 + i) * 3);
        }
        // Labels sit underneath the asset so the visual remains inspectable.
        this.facetPoints[branch].copy(anchors[focused]).add(facetPoints[branch]).add(new THREE.Vector3(0, -.23, .05));
      });
      signalGeometry.attributes.position.needsUpdate = true;
      signalRings.forEach((ring, i) => { ring.rotation.z = time * (.25 + i * .15); });
      action.rotation.set(time * .45, time * .65, .4); actionFrame.rotation.y = -time * .24;
      impactPetals.forEach((petal, i) => { petal.rotation.z = i / 7 * Math.PI * 2 + time * .18; });
      assets[3].rotation.z = Math.sin(time * .35) * .18;
      core.rotation.set(time * .15, time * .28, 0);
    },
    dispose() {
      groups.forEach(group => scene.remove(group)); scene.remove(interior);
      geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose());
    },
  };
}
