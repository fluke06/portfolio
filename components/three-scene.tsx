'use client';
import { useEffect, useRef } from 'react';

const COUNT = 4000;

// Minimal vertex shader — no custom attributes, no noise GLSL.
// Animation happens on the CPU; the shader just sizes and colours each point.
const VERT = `
uniform float uScroll;
varying float vAlpha;
varying float vDepth;

void main() {
  // Expand the field as the user scrolls
  vec3 pos    = position * (1.0 + uScroll * 0.9);
  vec4 mvPos  = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  // Perspective-correct point size
  gl_PointSize = clamp(3.5 * (7.0 / -mvPos.z), 0.8, 4.5);

  // Fade particles that are far from the sphere centre
  float rim = length(position) / 7.5;
  vAlpha    = (1.0 - smoothstep(0.45, 1.0, rim)) * 0.72;

  // Depth cue for colour mixing
  vDepth = clamp((-mvPos.z - 4.0) / 12.0, 0.0, 1.0);
}`;

const FRAG = `
uniform vec3  uCA;
uniform vec3  uCB;
varying float vAlpha;
varying float vDepth;

void main() {
  vec2  c    = gl_PointCoord - 0.5;
  float r    = length(c);
  if (r > 0.5) discard;
  float soft = 1.0 - smoothstep(0.2, 0.5, r);
  vec3  col  = mix(uCA, uCB, vDepth);
  gl_FragColor = vec4(col, vAlpha * soft);
}`;

// Multi-frequency sine approximation — looks organic without simplex noise GLSL.
// Values are stable across browsers / drivers because the math is on the CPU.
function applyFlow(
  out: Float32Array, base: Float32Array, count: number,
  t: number, mx: number, my: number, scroll: number
) {
  const t1 = t * 0.08, t2 = t * 0.055;
  const explode = 1 + scroll * 0.7;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const bx = base[i3], by = base[i3 + 1], bz = base[i3 + 2];

    // Two-octave sine drift
    const dx = Math.sin(by * 0.38 + t1) * 0.65 + Math.sin(bz * 0.7 + t2 * 0.85 + bx * 0.2) * 0.32;
    const dy = Math.cos(bz * 0.38 + t1 * 0.9) * 0.65 + Math.cos(bx * 0.7 + t2 + by * 0.2) * 0.32;
    const dz = Math.sin(bx * 0.38 + t1 * 0.75) * 0.65 + Math.sin(by * 0.7 + t2 * 1.1 + bz * 0.2) * 0.32;

    // Gentle mouse push (repel from cursor direction)
    const pushX = bx * 0.12 * mx;
    const pushY = by * 0.12 * my;

    out[i3]     = (bx + dx + pushX) * explode;
    out[i3 + 1] = (by + dy + pushY) * explode;
    out[i3 + 2] = (bz + dz)         * explode;
  }
}

export function ThreeScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    let cancelled = false;
    let raf = 0;
    let dispose = () => {};

    import('three').then(THREE => {
      if (cancelled) return;
      const canvas = ref.current;
      if (!canvas) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      } catch {
        return; // WebGL 2 not available
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.setClearColor(0, 0);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 11;

      // Uniform sphere distribution (cube-root trick for volume-uniform fill)
      const base = new Float32Array(COUNT * 3);
      const pos  = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        const theta = 2 * Math.PI * Math.random();
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = Math.cbrt(Math.random()) * 7;
        const i3    = i * 3;
        base[i3]     = pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        base[i3 + 1] = pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        base[i3 + 2] = pos[i3 + 2] = r * Math.cos(phi) - 1;
      }

      const geo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(pos, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage); // hint: we update every frame
      geo.setAttribute('position', posAttr);
      geo.computeBoundingSphere();

      const dark  = () => document.documentElement.getAttribute('data-theme') === 'dark';
      const getCA = () => new THREE.Color(dark() ? '#7B9AFF' : '#2E4DDB');
      const getCB = () => new THREE.Color(dark() ? '#E8B33E' : '#8B5E14');

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uScroll: { value: 0 },
          uCA:     { value: getCA() },
          uCB:     { value: getCB() },
        },
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent:    true,
        depthWrite:     false,
      });

      const points = new THREE.Points(geo, mat);
      points.frustumCulled = false; // bounding sphere can't account for shader expansion
      scene.add(points);

      // Resize
      const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Mouse
      let mx = 0, my = 0, mxS = 0, myS = 0;
      const onMove = (e: MouseEvent) => {
        mx =  (e.clientX / innerWidth  - 0.5) * 2;
        my = -(e.clientY / innerHeight - 0.5) * 2;
      };
      addEventListener('mousemove', onMove, { passive: true });

      // Scroll
      let scrollRaw = 0, scrollSmooth = 0;
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        scrollRaw = max > 0 ? window.scrollY / max : 0;
      };
      addEventListener('scroll', onScroll, { passive: true });

      // Theme
      const onTheme = () => { mat.uniforms.uCA.value = getCA(); mat.uniforms.uCB.value = getCB(); };
      const themeObs = new MutationObserver(onTheme);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

      const t0 = performance.now();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (document.hidden) return;

        const t = (performance.now() - t0) * 0.001;

        // Smooth mouse + scroll
        mxS += (mx - mxS) * 0.05;
        myS += (my - myS) * 0.05;
        scrollSmooth += (scrollRaw - scrollSmooth) * 0.04;

        // Update particle positions on CPU (avoids custom GLSL attribute issues)
        applyFlow(pos, base, COUNT, t, mxS, myS, scrollSmooth);
        posAttr.needsUpdate = true;

        mat.uniforms.uScroll.value = scrollSmooth;

        // Slow ambient rotation + scroll-driven tilt
        points.rotation.y = t * 0.014 + scrollSmooth * 1.1;
        points.rotation.x = Math.sin(t * 0.005) * 0.07 + scrollSmooth * 0.22;

        // Camera drifts forward as the page scrolls
        camera.position.z = 11 - scrollSmooth * 3;

        renderer.render(scene, camera);
      };
      tick();

      dispose = () => {
        cancelAnimationFrame(raf);
        removeEventListener('mousemove', onMove);
        removeEventListener('scroll', onScroll);
        ro.disconnect();
        themeObs.disconnect();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    });

    return () => { cancelled = true; dispose(); };
  }, []);

  return <canvas ref={ref} className="three-scene" aria-hidden="true" />;
}
