import * as THREE from 'three';
import { createDomainSymbol, type DomainSymbol } from '@/components/domain-symbols';
import { createCameraFlight } from '@/components/camera-flight';
import { operatingScenarios, operatingServices } from '@/data/operating-system';

interface Options {
  canvas: HTMLCanvasElement;
  host: HTMLDivElement;
  labels: () => (HTMLButtonElement | null)[];
  appLabel: () => HTMLParagraphElement | null;
  onScene: (scene: number) => void;
  onSelect: (service: number | null) => void;
  onPlaying: (playing: boolean) => void;
  onMotion: (reduced: boolean) => void;
  onAvailable: (available: boolean) => void;
}
export interface OperatingSceneEngine {
  goTo(scene: number): void;
  select(service: number | null): void;
  scenario(index: number): void;
  play(playing: boolean): void;
  replay(): void;
  dispose(): void;
}

/** The homepage's spherical mesh language, around one app and one bounded example. */
export function createOperatingScene(o: Options): OperatingSceneEngine {
  const renderer = new THREE.WebGLRenderer({ canvas: o.canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 80);
  camera.position.set(0, 0, 9);
  const flight = createCameraFlight(camera, 9);
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

  const units = [[-.45,.8,.4],[.7,.4,-.59],[.8,0,.6],[.6,-.42,-.68],[-.38,-.82,.43]].map(p => new THREE.Vector3(...p as [number, number, number]).normalize().multiplyScalar(2.2));
  const anchors = units.map(p => p.clone());
  const nodes = operatingServices.map((service, i) => {
    const mat = stroke(service.colour, .8);
    const dot = keepMaterial(new THREE.PointsMaterial({ color: service.colour, size: .02, transparent: true, opacity: .5, depthWrite: false }));
    const group = createDomainSymbol(service.symbol as DomainSymbol, mat, dot, keepGeometry);
    group.position.copy(anchors[i]); scene.add(group);
    return { group, mat, dot };
  });
  const routes = anchors.map((anchor, i) => {
    const curve = new THREE.QuadraticBezierCurve3(core.clone(), anchor.clone().multiplyScalar(.5), anchor.clone());
    const mat = stroke(operatingServices[i].colour, .1);
    return { curve, mat, path: line(curve.getPoints(32), mat) };
  });
  const reconcileCurve = new THREE.CubicBezierCurve3(anchors[2].clone(), anchors[2].clone(), anchors[0].clone(), anchors[0].clone());
  const reconcileMaterial = stroke('#8fb9f3', 0);
  const reconciliation = line(reconcileCurve.getPoints(48), reconcileMaterial);
  const record = edges(new THREE.BoxGeometry(.22, .28, .06), stroke('#e3a857', 1), scene);
  record.visible = false;

  let width = 1, height = 1, step = 0, elapsed = 0, clock = 0, angle = .2, example = 0, selected: number | null = null;
  let raf = 0, last = 0, visible = false, lost = false, disposed = false, inFlight = true, focusBlend = 0;
  let journey = true;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let running = !motion.matches;
  const duration = [4.5, 5, 5.5, 6, 8, 7];
  const projected = new THREE.Vector3(), sample = new THREE.Vector3(), center = new THREE.Vector3();
  const quaternion = new THREE.Quaternion(), rotation = new THREE.Euler(.18, angle, .08);
  const ease = (value: number) => { const t = THREE.MathUtils.clamp(value, 0, 1); return t * t * (3 - 2 * t); };
  const setRunning = (value: boolean) => { running = value && !motion.matches && !lost; o.onPlaying(running); };
  const fitDistance = () => Math.max(8.8, 3.7 / (Math.tan(THREE.MathUtils.degToRad(43 / 2)) * width / height));
  const replacePoints = (geometry: THREE.BufferGeometry, curve: THREE.Curve<THREE.Vector3>, count: number) => {
    const attribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i <= count; i++) { curve.getPoint(i / count, sample); attribute.setXYZ(i, sample.x, sample.y, sample.z); }
    attribute.needsUpdate = true; geometry.computeBoundingSphere();
  };
  const render = (dt = 0) => {
    if (disposed || lost) return;
    const progress = Math.min(1, elapsed / duration[step]);
    if (running && selected === null) { angle += dt * .24; clock += dt; }
    focusBlend += ((selected === null ? 0 : 1) - focusBlend) * (motion.matches ? 1 : 1 - Math.exp(-dt * 7));
    rotation.y = angle; quaternion.setFromEuler(rotation); sphere.quaternion.copy(quaternion);
    meshMaterial.opacity = .17 * (1 - focusBlend * .85); outerMaterial.opacity = .035 * (1 - focusBlend * .6);
    nodeMaterial.opacity = .6 * (1 - focusBlend * .9); flowMaterial.opacity = .7 * (1 - focusBlend);
    const flowPoints = flowGeometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < 36; i++) { const [a, b] = pairs[(i * 17) % pairs.length]; sample.lerpVectors(points[a], points[b], (clock * .3 + i * .17) % 1); flowPoints.setXYZ(i, sample.x, sample.y, sample.z); }
    flowPoints.needsUpdate = true;
    // The app stays at the centre as the operating sphere turns around it.
    app.position.set(0, 0, 0); app.rotation.y = motion.matches ? 0 : Math.sin(clock * .25) * .08;
    app.scale.setScalar(step === 0 ? .7 + .3 * ease(progress * 2) : 1);
    app.visible = focusBlend < .85;
    anchors.forEach((anchor, i) => anchor.copy(units[i]).applyQuaternion(quaternion));
    nodes.forEach(({ group, mat, dot }, i) => {
      group.position.copy(anchors[i]); group.rotation.set(.08, Math.sin(clock * .2 + i) * .3, 0);
      group.scale.setScalar((width < 600 ? .62 : .72) + (selected === i ? focusBlend * .35 : 0));
      const focused = selected === i;
      mat.opacity = selected === null ? .82 : focused ? 1 : .1; dot.opacity = mat.opacity * .5;
      const route = routes[i]; route.curve.v2.copy(anchors[i]); route.curve.v1.copy(anchors[i]).multiplyScalar(.5); route.curve.v1.z += .25;
      replacePoints(route.path.geometry, route.curve, 32);
      route.mat.opacity = (step < 2 ? .06 : .25) * (1 - focusBlend);
    });
    reconcileCurve.v0.copy(anchors[2]); reconcileCurve.v1.copy(anchors[2]).multiplyScalar(1.35);
    reconcileCurve.v2.copy(anchors[0]).multiplyScalar(1.35); reconcileCurve.v3.copy(anchors[0]);
    reconciliation.visible = step === 5 && example === 0 && selected === null;
    if (reconciliation.visible) { replacePoints(reconciliation.geometry, reconcileCurve, 48); reconcileMaterial.opacity = .6; }
    record.visible = step >= 4 && selected === null;
    if (record.visible) {
      const route = step === 5 && example === 0 && progress < .65 ? reconcileCurve : routes[step === 5 ? 4 : operatingScenarios[example].service].curve;
      route.getPoint(ease(progress), record.position); record.rotation.z = motion.matches ? 0 : clock * .15;
    }
    if (selected === null) center.set(0, 0, 0); else center.copy(anchors[selected]);
    inFlight = flight.update(center, selected === null ? fitDistance() : 5, 0, selected !== null, dt, motion.matches) || Math.abs(focusBlend - (selected === null ? 0 : 1)) > .001;
    o.labels().forEach((label, i) => {
      if (!label) return;
      projected.copy(anchors[i]).add(new THREE.Vector3(0, -.52, .1)).project(camera);
      const half = width < 600 ? 74 : 84;
      label.style.transform = `translate(${THREE.MathUtils.clamp((projected.x + 1) * width / 2, half, width - half)}px,${(1 - projected.y) * height / 2}px) translate(-50%,-50%)`;
      label.style.opacity = selected === null ? String(.6 + (anchors[i].z + 2.2) / 11) : '0';
      label.style.visibility = selected === null ? 'visible' : 'hidden';
      label.tabIndex = -1; // Stationary native buttons below provide the keyboard path.
    });
    const label = o.appLabel();
    if (label) {
      projected.set(0, -.1, .2).project(camera);
      label.style.transform = `translate(${(projected.x + 1) * width / 2}px,${(1 - projected.y) * height / 2}px) translate(-50%,-50%)`;
      label.style.opacity = String(1 - focusBlend);
    }
    renderer.render(scene, camera);
  };
  const frame = (now: number) => {
    if (disposed || lost) return;
    const dt = last ? Math.min((now - last) / 1000, .06) : .016; last = now;
    if (running && journey && selected === null) {
      elapsed += dt;
      if (elapsed >= duration[step]) {
        if (step === 5) { elapsed = duration[step]; journey = false; }
        else { step++; elapsed = 0; o.onScene(step); }
      }
    }
    render(dt);
    if ((running || inFlight) && visible && !document.hidden && !motion.matches) raf = requestAnimationFrame(frame);
  };
  const schedule = () => {
    cancelAnimationFrame(raf); last = 0;
    if (disposed || lost) return;
    render(motion.matches ? 1 : .016);
    if ((running || inFlight) && visible && !document.hidden && !motion.matches) raf = requestAnimationFrame(frame);
  };
  const select = (index: number | null) => { selected = index; journey = false; inFlight = true; setRunning(index === null); o.onSelect(index); o.host.focus({ preventScroll: true }); schedule(); };
  const size = () => {
    width = o.host.clientWidth; height = o.host.clientHeight; if (!width || !height) return;
    camera.aspect = width / height; camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7)); renderer.setSize(width, height, false); inFlight = true; schedule();
  };
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2(), bounds = new THREE.Sphere();
  let startX = 0, startY = 0;
  const down = (event: PointerEvent) => { startX = event.clientX; startY = event.clientY; };
  const pick = (event: PointerEvent): number | null => {
    const rect = o.canvas.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
    pointer.set(x / width * 2 - 1, 1 - y / height * 2); raycaster.setFromCamera(pointer, camera);
    const hit = anchors.map((anchor, index) => {
      bounds.center.copy(anchor); bounds.radius = .5;
      const intersection = raycaster.ray.intersectSphere(bounds, sample);
      return { index, distance: intersection ? camera.position.distanceTo(intersection) : Infinity };
    }).sort((a, b) => a.distance - b.distance)[0];
    if (hit.distance < Infinity) return hit.index;
    bounds.center.set(0, 0, 0); bounds.radius = 2.8;
    if (!raycaster.ray.intersectsSphere(bounds)) return null;
    // Clicking a strand opens the nearest capability, as on the homepage.
    return anchors.map((anchor, index) => { projected.copy(anchor).project(camera); return { index, distance: Math.hypot((projected.x + 1) * width / 2 - x, (1 - projected.y) * height / 2 - y) }; }).sort((a, b) => a.distance - b.distance)[0].index;
  };
  const up = (event: PointerEvent) => { if (Math.hypot(event.clientX - startX, event.clientY - startY) > 8) return; if (selected !== null) select(null); else { const hit = pick(event); if (hit !== null) select(hit); } };
  const move = (event: PointerEvent) => { o.canvas.style.cursor = selected !== null || pick(event) !== null ? 'pointer' : 'default'; };
  const visibility = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); schedule(); }, { threshold: .05 }); visibility.observe(o.host);
  const resize = new ResizeObserver(size); resize.observe(o.host);
  const changedMotion = () => { o.onMotion(motion.matches); if (motion.matches) setRunning(false); schedule(); };
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(raf); setRunning(false); o.onAvailable(false); };
  const contextRestored = () => { lost = false; o.onAvailable(true); schedule(); };
  motion.addEventListener('change', changedMotion); document.addEventListener('visibilitychange', schedule);
  o.canvas.addEventListener('webglcontextlost', contextLost); o.canvas.addEventListener('webglcontextrestored', contextRestored);
  o.canvas.addEventListener('pointerdown', down); o.canvas.addEventListener('pointerup', up); o.canvas.addEventListener('pointermove', move);
  size(); o.onAvailable(true); o.onMotion(motion.matches); o.onPlaying(running);
  return {
    goTo(index) { step = THREE.MathUtils.clamp(index, 0, 5); elapsed = duration[step]; selected = null; journey = false; inFlight = true; o.onScene(step); schedule(); },
    select,
    scenario(index) { example = index; selected = null; inFlight = true; schedule(); },
    play(value) { selected = null; inFlight = true; setRunning(value); schedule(); },
    replay() { step = 0; elapsed = 0; selected = null; journey = true; inFlight = true; o.onScene(0); setRunning(true); schedule(); },
    dispose() { disposed = true; cancelAnimationFrame(raf); visibility.disconnect(); resize.disconnect(); motion.removeEventListener('change', changedMotion); document.removeEventListener('visibilitychange', schedule); o.canvas.removeEventListener('webglcontextlost', contextLost); o.canvas.removeEventListener('webglcontextrestored', contextRestored); o.canvas.removeEventListener('pointerdown', down); o.canvas.removeEventListener('pointerup', up); o.canvas.removeEventListener('pointermove', move); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose(); },
  };
}
