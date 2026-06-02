'use client';
import { useEffect, useRef } from 'react';

// Low-res canvas — CSS + blur handles the upscaling
const W = 96, H = 72;

function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function vnoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix,        fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix,     iy),     b = hash(ix + 1, iy);
  const c = hash(ix,     iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

// Fractional Brownian Motion — 4 octaves
function fbm(x: number, y: number): number {
  const v =
    vnoise(x,       y)       * 0.5   +
    vnoise(x * 2.1, y * 2.1) * 0.25  +
    vnoise(x * 4.3, y * 4.3) * 0.125 +
    vnoise(x * 8.7, y * 8.7) * 0.0625;
  return v / 0.9375;
}

function drawFrame(ctx: CanvasRenderingContext2D, t: number) {
  const img = ctx.createImageData(W, H);
  const d   = img.data;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Elongated vertically to read as tree trunks / canopy depth
      const nx = (x / W) * 2.4 + t * 0.05;
      const ny = (y / H) * 5.0 + t * 0.025;
      const v  = fbm(nx, ny);

      // Power curve keeps it mostly dark; peaks become lighter patches
      const b  = Math.pow(v, 1.7) * 115;
      const i  = (y * W + x) * 4;
      d[i]     = b;
      d[i + 1] = b;
      d[i + 2] = Math.min(255, b + 8); // faint cool tint
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
}

export function ForestCanvas({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    canvas.width  = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (reduced) {
      drawFrame(ctx, 0);
      return;
    }

    let t     = 0;
    let frame = 0;
    let rafId: number;

    const tick = () => {
      frame++;
      if (frame % 2 === 0) {   // ~30 fps update
        drawFrame(ctx, t);
        t += 0.014;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        filter:       'blur(7px)',
        opacity:      0.26,
        mixBlendMode: 'screen',
      }}
    />
  );
}
