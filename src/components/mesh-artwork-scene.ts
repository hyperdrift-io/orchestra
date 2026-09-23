import * as THREE from 'three';
import { createDomainSymbol, type DomainSymbol } from './domain-symbols';
import definitions from '../data/article-mesh.json';

/** The same object geometry supplies the GPU scene and its SVG fallback. */
export function articleArtwork(slug: string) {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const register = (g: THREE.BufferGeometry) => { geometries.push(g); return g; };
  const material = <T extends THREE.Material>(m: T) => { materials.push(m); return m; };
  // One expertise domain, with related concepts around its spherical mesh.
  const rotor = new THREE.Group();
  rotor.rotation.set(.13, -.24, -.04);
  group.add(rotor);
  const sphere = new THREE.IcosahedronGeometry(66, 1);
  const wire = register(new THREE.WireframeGeometry(sphere));
  const nodeGeometry = register(new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: sphere.getAttribute('position').count }, (_, i) => new THREE.Vector3().fromBufferAttribute(sphere.getAttribute('position'), i))
  ));
  sphere.dispose();
  rotor.add(new THREE.LineSegments(wire, material(new THREE.LineBasicMaterial({ color: '#e3a857', transparent: true, opacity: .42 }))));
  rotor.add(new THREE.Points(nodeGeometry, material(new THREE.PointsMaterial({ color: '#f4cd92', size: 2, sizeAttenuation: false, transparent: true, opacity: .8 }))));
  const symbols = definitions[slug as keyof typeof definitions] ?? definitions['the-bridge'];
  const objects = symbols.map((kind, index) => {
    const colour = ['#90c5b8', '#e3a857', '#c8beae'][index];
    const object = createDomainSymbol(kind as DomainSymbol,
      material(new THREE.LineBasicMaterial({ color: colour, transparent: true, opacity: .82 })),
      material(new THREE.PointsMaterial({ color: colour, size: 1.3, sizeAttenuation: false, transparent: true, opacity: .8 })), register);
    object.position.set((index - 1) * 130, index === 1 ? 0 : index === 0 ? 12 : -12, index === 1 ? 0 : index === 0 ? 28 : -28);
    object.rotation.set(0, 0, 0);
    object.scale.setScalar(index === 1 ? 64 : 54);
    rotor.add(object);
    return object;
  });
  const connector = register(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-108, 12, 28), new THREE.Vector3(-58, 0, 0),
    new THREE.Vector3(58, 0, 0), new THREE.Vector3(108, -12, -28),
  ]));
  rotor.add(new THREE.LineSegments(connector, material(new THREE.LineBasicMaterial({ color: '#e3a857', transparent: true, opacity: .6 }))));
  return { group, rotor, objects, dispose: () => { geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); } };
}
