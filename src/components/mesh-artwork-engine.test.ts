import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const gpu = vi.hoisted(() => ({ fail: false, instances: [] as Array<{ render: ReturnType<typeof vi.fn>; dispose: ReturnType<typeof vi.fn>; forceContextLoss: ReturnType<typeof vi.fn>; setSize: ReturnType<typeof vi.fn>; setPixelRatio: ReturnType<typeof vi.fn> }> }));
vi.mock('three', async importOriginal => {
  const actual = await importOriginal<typeof import('three')>();
  return { ...actual, WebGLRenderer: class {
    render = vi.fn(); dispose = vi.fn(); forceContextLoss = vi.fn(); setSize = vi.fn(); setPixelRatio = vi.fn();
    constructor() { if (gpu.fail) throw new Error('WebGL unavailable'); gpu.instances.push(this); }
  } };
});
import { createMeshArtwork } from './mesh-artwork-engine';

beforeEach(() => { gpu.fail = false; gpu.instances.length = 0; vi.stubGlobal('window', { devicePixelRatio: 3 }); });
afterEach(() => vi.unstubAllGlobals());
const canvas = {} as HTMLCanvasElement;
const signal = () => new AbortController().signal;

describe('mesh artwork GPU lifecycle', () => {
  it('rejects unavailable WebGL so the existing SVG stays visible', async () => {
    gpu.fail = true;
    await expect(createMeshArtwork(canvas, 'article', 'the-bridge', '', signal())).rejects.toThrow('WebGL unavailable');
    expect(gpu.instances).toHaveLength(0);
  });
  it('does not allocate a context for a cancelled mount or missing logo source', async () => {
    const controller = new AbortController(); controller.abort();
    await expect(createMeshArtwork(canvas, 'article', 'the-bridge', '', controller.signal)).rejects.toThrow();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(createMeshArtwork(canvas, 'logo', '', '/missing.svg', signal())).rejects.toThrow('Logo geometry unavailable');
    expect(gpu.instances).toHaveLength(0);
  });
  it('animates geometry without clearing the canvas by resizing it on every frame', async () => {
    const engine = await createMeshArtwork(canvas, 'article', 'the-bridge', '', signal());
    const renderer = gpu.instances[0];
    engine.render(1040, 120, 0, 0);
    const [scene] = renderer.render.mock.calls[0];
    const symbol = scene.children[0].children[0];
    const initial = symbol.rotation.y;
    engine.render(1040, 120, 0, 5);
    expect(symbol.rotation.y).not.toBe(initial);
    expect(renderer.setSize).toHaveBeenCalledOnce();
    engine.render(390, 150, 0, 5);
    expect(renderer.setSize).toHaveBeenCalledTimes(2);
    engine.render(390, 150, 0, 0);
    expect(symbol.rotation.y).toBe(initial);
    engine.dispose();
  });
  it('rotates the expertise globe continuously and applies both cursor axes independently', async () => {
    const engine = await createMeshArtwork(canvas, 'article', 'the-bridge', '', signal(), 'stripe');
    const renderer = gpu.instances[0];
    engine.render(1040, 64, 0, 0, 0);
    const [scene] = renderer.render.mock.calls[0];
    const group = scene.children[0], globe = group.children[0];
    const initial = globe.rotation.y;
    engine.render(1040, 64, 0, 2, 0);
    expect(globe.rotation.y - initial).toBeCloseTo(.76);
    const pausedAngle = globe.rotation.y;
    engine.render(1040, 64, .8, 2, -.5);
    expect(globe.rotation.y).toBe(pausedAngle);
    expect(group.rotation.y).toBeCloseTo(.52);
    expect(group.rotation.x).toBeCloseTo(.21);
    engine.render(1040, 64, 0, 2, 0);
    expect(group.rotation.x).toBeCloseTo(0);
    expect(group.rotation.y).toBe(0);
    expect(renderer.setSize).toHaveBeenCalledOnce();
    engine.dispose();
  });
  it('preserves proportions on a phone, caps pixel density and disposes GPU resources', async () => {
    const engine = await createMeshArtwork(canvas, 'article', 'conversation-with-a-shared-view', '', signal());
    const renderer = gpu.instances[0];
    engine.render(342, 80);
    const [scene, camera] = renderer.render.mock.calls[0];
    expect((camera.right - camera.left) / (camera.top - camera.bottom)).toBeCloseTo(342 / 80);
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2);
    const disposals: ReturnType<typeof vi.spyOn>[] = [];
    scene.traverse((object: { geometry?: { dispose: () => void } }) => { if (object.geometry) disposals.push(vi.spyOn(object.geometry, 'dispose')); });
    engine.dispose();
    expect(disposals.length).toBeGreaterThan(0);
    disposals.forEach(dispose => expect(dispose).toHaveBeenCalled());
    expect(renderer.dispose).toHaveBeenCalledOnce();
    expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
  });
});
