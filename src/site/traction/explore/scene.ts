import * as THREE from 'three';
import { createCameraFlight } from '@/home/components/camera-flight';
import { createDomainSymbol } from '@/components/domain-symbols';
import { operatingScenes, operatingServices } from './data';

interface Options {
  canvas: HTMLCanvasElement;
  host: HTMLDivElement;
  labels: () => (HTMLButtonElement | null)[];
  appLabel: () => HTMLParagraphElement | null;
  onDomain: (service: number) => void;
  onPlaying: (playing: boolean) => void;
  onMotion: (reduced: boolean) => void;
  onAvailable: (available: boolean) => void;
}
export interface OperatingSceneEngine {
  goTo(signal: number | null): void;
  play(playing: boolean): void;
  dispose(): void;
}

/** Keep the five domains in view while data travels along the selected handoff. */
export function createOperatingScene(o: Options): OperatingSceneEngine {
  const renderer = new THREE.WebGLRenderer({ canvas: o.canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 80);
  const overviewDistance = 8.2;
  camera.position.set(0, 0, overviewDistance);
  const flight = createCameraFlight(camera, overviewDistance);
  const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [];
  const keepGeometry = <T extends THREE.BufferGeometry>(g: T): T => { geometries.push(g); return g; };
  const keepMaterial = <T extends THREE.Material>(m: T): T => { materials.push(m); return m; };
  const stroke = (colour: string, opacity = 1) => keepMaterial(new THREE.LineBasicMaterial({ color: colour, transparent: true, opacity, depthWrite: false }));
  const line = (points: THREE.Vector3[], mat: THREE.LineBasicMaterial, parent: THREE.Object3D = scene) => {
    const item = new THREE.Line(keepGeometry(new THREE.BufferGeometry().setFromPoints(points)), mat); parent.add(item); return item;
  };
  const edges = (shape: THREE.BufferGeometry, mat: THREE.LineBasicMaterial, parent: THREE.Object3D) => {
    const wire = keepGeometry(new THREE.EdgesGeometry(shape)); shape.dispose();
    const item = new THREE.LineSegments(wire, mat); parent.add(item); return item;
  };
  const sphere = new THREE.Group(); scene.add(sphere);
  // Same Fibonacci distribution, triangulated connections and outer ghost shell as the home.
  const points = Array.from({ length: 170 }, (_, i) => {
    const shell = i < 140 ? 1 : .65, j = i % 140, y = 1 - j / 139 * 2;
    const radius = Math.sqrt(1 - y * y), angle = j * 2.399963 + shell;
    return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius).multiplyScalar(2.65 * shell);
  });
  const pairs: [number, number][] = [];
  points.forEach((point, i) => points.map((other, j) => ({ j, d: point.distanceToSquared(other) })).filter(p => p.j !== i).sort((a, b) => a.d - b.d).slice(0, 5).filter(p => p.j > i).forEach(p => pairs.push([i, p.j])));
  const meshGeometry = keepGeometry(new THREE.BufferGeometry().setFromPoints(pairs.flatMap(([a, b]) => [points[a], points[b]])));
  const meshMaterial = stroke('#d6bc92', .15);
  sphere.add(new THREE.LineSegments(meshGeometry, meshMaterial));
  const outerMaterial = stroke('#d6bc92', .035);
  const outer = new THREE.LineSegments(meshGeometry, outerMaterial); outer.scale.setScalar(1.55); sphere.add(outer);
  const nodeMaterial = keepMaterial(new THREE.PointsMaterial({ color: '#f3d5a6', size: .036, transparent: true, opacity: .7, depthWrite: false }));
  sphere.add(new THREE.Points(keepGeometry(new THREE.BufferGeometry().setFromPoints(points)), nodeMaterial));
  const flowGeometry = keepGeometry(new THREE.BufferGeometry());
  flowGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(36 * 3), 3));
  const flowMaterial = keepMaterial(new THREE.PointsMaterial({ color: '#f5bc67', size: .045, transparent: true, opacity: .8, depthWrite: false }));
  const flow = new THREE.Points(flowGeometry, flowMaterial); flow.frustumCulled = false; sphere.add(flow);

  const core = new THREE.Vector3();
  const app = new THREE.Group(); scene.add(app);
  const appStroke = stroke('#f6eee1', .95);
  edges(new THREE.BoxGeometry(1.5, 1, .22), appStroke, app);
  line([new THREE.Vector3(-.75, .3, .12), new THREE.Vector3(.75, .3, .12)], appStroke, app);
  const dots = keepGeometry(new THREE.BufferGeometry().setFromPoints([-.61, -.49, -.37].map(x => new THREE.Vector3(x, .4, .13))));
  app.add(new THREE.Points(dots, keepMaterial(new THREE.PointsMaterial({ color: '#e3a857', size: .035 }))));
  const appShell = edges(new THREE.BoxGeometry(1.66, 1.16, .4), stroke('#e3a857', .14), app);
  appShell.rotation.set(.02, .08, .02);

  // A stable map makes the sending and receiving domains easy to find on every step.
  const anchors = [
    new THREE.Vector3(-1.62, 1.45, .55),
    new THREE.Vector3(1.38, 1.48, .6),
    new THREE.Vector3(2.05, -.18, .25),
    new THREE.Vector3(.68, -1.56, .65),
    new THREE.Vector3(-1.92, -.84, .5),
  ];
  const nodes = operatingServices.map((service, i) => {
    const mat = stroke(service.colour);
    const dot = keepMaterial(new THREE.PointsMaterial({ color: service.colour, size: .02, transparent: true, depthWrite: false }));
    const group = createDomainSymbol(service.symbol, mat, dot, keepGeometry);
    group.position.copy(anchors[i]);
    scene.add(group);
    const spoke = line([core.clone(), anchors[i]], stroke(service.colour, .13));
    return { group, mat, dot, spoke };
  });

  const routes = operatingScenes.map(({ domain, next }) => {
    const start = anchors[domain], end = anchors[next];
    const bend = start.clone().lerp(end, .5);
    if (domain === 4) bend.set(-.7, 1.7, 1.15);
    else bend.multiplyScalar(1.25);
    const curve = new THREE.QuadraticBezierCurve3(start, bend, end);
    const mat = stroke(operatingServices[domain].colour);
    line(curve.getPoints(40), mat);
    // Frame the path, both sculptures and their projected labels.
    const frame = new THREE.Box3().setFromPoints(curve.getPoints(12));
    frame.min.add(new THREE.Vector3(-.68, -.85, 0));
    frame.max.add(new THREE.Vector3(.68, .55, .38));
    const center = frame.getCenter(new THREE.Vector3());
    const extent = frame.getSize(new THREE.Vector3()).multiplyScalar(.5);
    return { curve, mat, center, extent };
  });
  const packetMaterial = keepMaterial(new THREE.MeshBasicMaterial({ color: '#f4cd92' }));
  const packet = new THREE.Mesh(keepGeometry(new THREE.OctahedronGeometry(.09)), packetMaterial);
  scene.add(packet);

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 1, height = 1, elapsed = 0, clock = 0;
  let signal: number | null = null;
  let raf = 0, last = 0, visible = false, lost = false, disposed = false;
  let requestedPlaying = true;
  const travelTime = 2.15;
  const projected = new THREE.Vector3(), sample = new THREE.Vector3();
  const overview = new THREE.Vector3();
  const overviewTan = Math.tan(THREE.MathUtils.degToRad(43 / 2));
  const closeupTan = Math.tan(THREE.MathUtils.degToRad(39 / 2));
  camera.updateMatrixWorld();

  const playing = () => requestedPlaying && !motion.matches && !lost;
  const place = (label: HTMLElement, point: THREE.Vector3) => {
    projected.copy(point).project(camera);
    const x = (projected.x + 1) * width / 2;
    const y = (1 - projected.y) * height / 2;
    label.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  };
  const render = (dt = 0) => {
    if (disposed || lost) return;
    const handoff = signal === null ? null : operatingScenes[signal];
    const progress = Math.min(1, elapsed / travelTime);
    const route = signal === null ? null : routes[signal];
    const fullDistance = Math.max(overviewDistance, 3.05 / (overviewTan * camera.aspect));
    const fit = route ? route.extent.z + Math.max(
      route.extent.y / closeupTan,
      route.extent.x / (closeupTan * camera.aspect),
    ) : 0;
    flight.update(route?.center ?? overview, route ? Math.max(5.15, fit + .35) : fullDistance, 0,
      route !== null, dt, motion.matches || !requestedPlaying);
    sphere.rotation.set(.15, .32 * Math.sin(clock * .24), .06);
    const flowPoints = flowGeometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < 36; i++) {
      const [a, b] = pairs[(i * 17) % pairs.length];
      sample.lerpVectors(points[a], points[b], (clock * .18 + i * .17) % 1);
      flowPoints.setXYZ(i, sample.x, sample.y, sample.z);
    }
    flowPoints.needsUpdate = true;
    flowMaterial.opacity = .32;
    meshMaterial.opacity = .12;
    nodeMaterial.opacity = .42;
    appStroke.opacity = .8;
    nodes.forEach(({ group, mat, dot, spoke }, i) => {
      const sending = i === handoff?.domain, receiving = i === handoff?.next;
      group.scale.setScalar(sending ? .91 : receiving ? .78 : .68);
      mat.opacity = sending ? 1 : receiving ? .8 : route ? .23 : .68;
      dot.opacity = mat.opacity * .55;
      (spoke.material as THREE.LineBasicMaterial).opacity = sending || receiving ? .31 : .1;
      group.rotation.y = Math.sin(clock * .32 + i) * .18;
    });
    routes.forEach(({ mat }, i) => {
      mat.opacity = i === signal ? .95 : route ? .08 : .22;
    });
    packet.visible = route !== null;
    if (route) {
      route.curve.getPoint(.06 + progress * .86, packet.position);
      packet.rotation.set(clock * .8, clock * .6, .35);
    }
    o.labels().forEach((label, i) => {
      if (!label) return;
      sample.copy(anchors[i]);
      sample.y -= .48; sample.z += .12;
      place(label, sample);
    });
    const appLabel = o.appLabel();
    if (appLabel) place(appLabel, core);
    renderer.render(scene, camera);
  };
  const frame = (now: number) => {
    const dt = last ? Math.min((now - last) / 1000, .06) : 0;
    last = now;
    if (playing()) {
      elapsed = Math.min(travelTime, elapsed + dt);
      clock += dt;
    }
    render(dt);
    if (playing() && visible && !document.hidden && !disposed) raf = requestAnimationFrame(frame);
  };
  const schedule = () => {
    cancelAnimationFrame(raf);
    last = 0;
    render();
    if (playing() && visible && !document.hidden && !disposed) raf = requestAnimationFrame(frame);
  };
  const size = () => {
    width = o.host.clientWidth; height = o.host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.setSize(width, height, false);
    schedule();
  };
  const pick = (event: MouseEvent) => {
    const rect = o.canvas.getBoundingClientRect();
    let nearest = -1, distance = 43;
    anchors.forEach((anchor, index) => {
      projected.copy(anchor).project(camera);
      const dx = (projected.x + 1) * width / 2 - (event.clientX - rect.left);
      const dy = (1 - projected.y) * height / 2 - (event.clientY - rect.top);
      const d = Math.hypot(dx, dy);
      if (d < distance) { nearest = index; distance = d; }
    });
    return nearest;
  };
  const click = (event: MouseEvent) => { const domain = pick(event); if (domain >= 0) o.onDomain(domain); };
  const move = (event: PointerEvent) => { o.canvas.style.cursor = pick(event) >= 0 ? 'pointer' : 'default'; };
  const visibility = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    schedule();
  }, { threshold: .05 });
  const resize = new ResizeObserver(size);
  const changedMotion = () => {
    if (motion.matches) elapsed = travelTime;
    o.onMotion(motion.matches); o.onPlaying(playing()); schedule();
  };
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(raf); o.onPlaying(false); o.onAvailable(false); };
  const contextRestored = () => { lost = false; o.onAvailable(true); o.onPlaying(playing()); size(); };
  visibility.observe(o.host); resize.observe(o.host);
  motion.addEventListener('change', changedMotion);
  document.addEventListener('visibilitychange', schedule);
  o.canvas.addEventListener('webglcontextlost', contextLost);
  o.canvas.addEventListener('webglcontextrestored', contextRestored);
  o.canvas.addEventListener('click', click);
  o.canvas.addEventListener('pointermove', move);
  size(); o.onAvailable(true); o.onMotion(motion.matches); o.onPlaying(playing());

  return {
    goTo(index) {
      signal = index;
      elapsed = playing() ? 0 : travelTime;
      schedule();
    },
    play(value) { requestedPlaying = value; o.onPlaying(playing()); schedule(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      visibility.disconnect(); resize.disconnect();
      motion.removeEventListener('change', changedMotion);
      document.removeEventListener('visibilitychange', schedule);
      o.canvas.removeEventListener('webglcontextlost', contextLost);
      o.canvas.removeEventListener('webglcontextrestored', contextRestored);
      o.canvas.removeEventListener('click', click);
      o.canvas.removeEventListener('pointermove', move);
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      renderer.dispose();
    },
  };
}
