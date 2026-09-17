'use client';

import { useEffect, useRef } from 'react';

/*
 * The experience layer: light travelling the loop behind the graph. Vanilla WebGL2, no
 * dependency. Off on reduced motion, narrow screens, or without WebGL2; the SVG graph
 * above it is the page either way. Coordinates are the graph’s viewBox (1000 × 580).
 */

const VIEW = [1000, 580] as const;

/* The loop in viewBox units: along the five columns, down, back, up. Matches OrgGraph. */
const LOOP: [number, number][] = [
  [124, 185],
  [876, 185],
  [876, 245],
  [124, 245],
  [124, 185],
];

/* The founder’s line: Read up to the founder, founder down to Work. */
const FOUNDER: [number, number][] = [
  [312, 150],
  [312, 65],
  [500, 65],
  [500, 150],
];

const POINT_VS = `#version 300 es
in vec2 p; in float s; in float a;
uniform vec2 view; out float alpha;
void main() {
  vec2 c = p / view * 2.0 - 1.0;
  gl_Position = vec4(c.x, -c.y, 0.0, 1.0);
  gl_PointSize = s;
  alpha = a;
}`;

const POINT_FS = `#version 300 es
precision mediump float;
in float alpha; out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float k = smoothstep(0.5, 0.05, d);
  o = vec4(0.89, 0.66, 0.34, k * alpha);
}`;

const FADE_VS = `#version 300 es
in vec2 q; void main() { gl_Position = vec4(q, 0.0, 1.0); }`;

const FADE_FS = `#version 300 es
precision mediump float; out vec4 o;
void main() { o = vec4(0.078, 0.071, 0.055, 0.16); }`;

interface Path {
  pts: [number, number][];
  seg: number[];
  len: number;
}

const measure = (pts: [number, number][]): Path => {
  const seg: number[] = [];
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    seg.push(d);
    len += d;
  }
  return { pts, seg, len };
};

const at = (path: Path, t: number, out: Float32Array, i: number) => {
  let d = ((t % 1) + 1) % 1 * path.len;
  for (let s = 0; s < path.seg.length; s++) {
    if (d <= path.seg[s]) {
      const k = d / path.seg[s];
      const [x0, y0] = path.pts[s];
      const [x1, y1] = path.pts[s + 1];
      out[i] = x0 + (x1 - x0) * k;
      out[i + 1] = y0 + (y1 - y0) * k;
      return;
    }
    d -= path.seg[s];
  }
  const last = path.pts[path.pts.length - 1];
  out[i] = last[0];
  out[i + 1] = last[1];
};

const compile = (gl: WebGL2RenderingContext, vs: string, fs: string) => {
  const prog = gl.createProgram()!;
  for (const [type, src] of [
    [gl.VERTEX_SHADER, vs],
    [gl.FRAGMENT_SHADER, fs],
  ] as const) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    gl.attachShader(prog, sh);
  }
  gl.linkProgram(prog);
  return prog;
};

export function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 900px)').matches;
    if (still || narrow) return;
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
    if (!gl) return;

    const loop = measure(LOOP);
    const founder = measure(FOUNDER);
    const N = 420;
    const NF = 60;
    const t = new Float32Array(N + NF);
    const v = new Float32Array(N + NF);
    const size = new Float32Array(N + NF);
    const alpha = new Float32Array(N + NF);
    const pos = new Float32Array((N + NF) * 2);
    for (let i = 0; i < N + NF; i++) {
      t[i] = Math.random();
      v[i] = 0.018 + Math.random() * 0.03;
      size[i] = 1.5 + Math.random() * 3;
      alpha[i] = 0.25 + Math.random() * 0.6;
    }

    const points = compile(gl, POINT_VS, POINT_FS);
    const fade = compile(gl, FADE_VS, FADE_FS);
    const uView = gl.getUniformLocation(points, 'view');
    const aP = gl.getAttribLocation(points, 'p');
    const aS = gl.getAttribLocation(points, 's');
    const aA = gl.getAttribLocation(points, 'a');
    const aQ = gl.getAttribLocation(fade, 'q');

    const bufP = gl.createBuffer();
    const bufS = gl.createBuffer();
    const bufA = gl.createBuffer();
    const bufQ = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufS);
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
    gl.bufferData(gl.ARRAY_BUFFER, alpha, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufQ);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      resize();

      gl.useProgram(fade);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufQ);
      gl.enableVertexAttribArray(aQ);
      gl.vertexAttribPointer(aQ, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      for (let i = 0; i < N; i++) {
        t[i] += v[i] * dt;
        at(loop, t[i], pos, i * 2);
        pos[i * 2 + 1] += Math.sin(now / 900 + i) * 3;
      }
      for (let i = N; i < N + NF; i++) {
        t[i] += v[i] * dt * 1.4;
        at(founder, t[i], pos, i * 2);
      }

      gl.useProgram(points);
      gl.uniform2f(uView, VIEW[0], VIEW[1]);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufP);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aP);
      gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufS);
      gl.enableVertexAttribArray(aS);
      gl.vertexAttribPointer(aS, 1, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufA);
      gl.enableVertexAttribArray(aA);
      gl.vertexAttribPointer(aA, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, N + NF);

      raf = requestAnimationFrame(frame);
    };
    const visibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', visibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', visibility);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
