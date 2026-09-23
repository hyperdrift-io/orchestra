import * as THREE from 'three';
import { SVGLoader, type StrokeStyle } from 'three/examples/jsm/loaders/SVGLoader.js';
import { articleArtwork } from './mesh-artwork-scene';
import { meshArtworkFrame, type MeshLayout } from './mesh-artwork-layout';

export async function createMeshArtwork(canvas: HTMLCanvasElement, kind: 'logo' | 'article', slug: string, fallback: string, signal: AbortSignal, layout: MeshLayout = 'cover', sourceSvg?: string) {
  // Keep the approved logo's aperture and stroke proportions exactly; render its paths as GPU geometry.
  const source = kind === 'logo' ? sourceSvg ?? await fetch(fallback, { signal }).then(response => {
    if (!response.ok) throw new Error('Logo geometry unavailable');
    return response.text();
  }) : null;
  signal.throwIfAborted();
  let renderer: THREE.WebGLRenderer | undefined;
  let artwork: ReturnType<typeof articleArtwork> | undefined;
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const dispose = () => {
    artwork?.dispose();
    geometries.forEach(g => g.dispose());
    materials.forEach(m => m.dispose());
    renderer?.dispose();
    renderer?.forceContextLoss();
  };
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-600, 600, 80, -80, .1, 1000);
    camera.position.z = 500;
    if (source) {
      const parsed = new SVGLoader().parse(source);
      const group = new THREE.Group();
      for (const path of parsed.paths) {
        const style = path.userData?.style as (StrokeStyle & { fill?: string; stroke?: string }) | undefined;
        const add = (geometry: THREE.BufferGeometry, colour: string) => {
          const material = new THREE.MeshBasicMaterial({ color: colour, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
          geometries.push(geometry); materials.push(material);
          group.add(new THREE.Mesh(geometry, material));
        };
        if (style?.fill && style.fill !== 'none') SVGLoader.createShapes(path).forEach(shape => add(new THREE.ShapeGeometry(shape), style.fill!));
        if (style?.stroke && style.stroke !== 'none') path.subPaths.forEach(subpath => {
          const geometry = SVGLoader.pointsToStroke(subpath.getPoints(48), style);
          if (geometry) add(geometry, style.stroke!);
        });
      }
      group.position.set(-256, 256, 0); group.scale.y = -1;
      scene.add(group);
    } else {
      artwork = articleArtwork(slug);
      scene.add(artwork.group);
    }
    let previousWidth = 0, previousHeight = 0;
    const render = (width: number, height: number, pointer = 0, elapsed = 0, pointerY = 0) => {
      if (!width || !height) return;
      // Assigning canvas.width/height clears the drawing buffer, even at the same size.
      if (width !== previousWidth || height !== previousHeight) {
        renderer!.setSize(width, height, false);
        previousWidth = width; previousHeight = height;
      }
      const frame = meshArtworkFrame(layout);
      const scale = kind === 'logo' ? Math.min(width / 512, height / 512) : layout !== 'cover' ? Math.min(width / frame.width, height / frame.height) : Math.max(width / frame.width, height / frame.height);
      camera.left = -width / scale / 2; camera.right = width / scale / 2;
      camera.top = height / scale / 2; camera.bottom = -height / scale / 2;
      camera.updateProjectionMatrix();
      if (artwork) {
        // Continuous domain rotation, with a separate two-axis cursor tilt.
        // Rotate actual 3D geometry; no scrolling texture, moving light or brightness pulse.
        artwork.rotor.rotation.y = -.24 + elapsed * .38;
        artwork.group.rotation.y = pointer * .65;
        artwork.group.rotation.x = -pointerY * .42;
        artwork.group.position.x = pointer * 12;
      }
      renderer!.render(scene, camera);
    };
    return { render, dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}
