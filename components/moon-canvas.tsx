'use client';
import { useEffect, useRef } from 'react';

const SIZE = 600;

function draw(ctx: CanvasRenderingContext2D) {
  const s = SIZE;
  const cx = s / 2, cy = s / 2, r = s / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
  ctx.clip();

  // ── Base: warm cream with limb darkening ──
  const base = ctx.createRadialGradient(cx * 0.88, cy * 0.82, 0, cx, cy, r);
  base.addColorStop(0.00, 'rgb(242, 230, 204)');
  base.addColorStop(0.28, 'rgb(218, 204, 175)');
  base.addColorStop(0.56, 'rgb(170, 156, 128)');
  base.addColorStop(0.78, 'rgb(108, 98, 78)');
  base.addColorStop(0.92, 'rgb(60, 54, 42)');
  base.addColorStop(1.00, 'rgb(28, 25, 19)');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, s, s);

  // ── Large soft maria (dark patches) ──
  const maria = [
    { x: 0.40, y: 0.40, rx: 0.26, ry: 0.20, a: -0.25, op: 0.44 },
    { x: 0.56, y: 0.36, rx: 0.18, ry: 0.14, a:  0.20, op: 0.36 },
    { x: 0.52, y: 0.55, rx: 0.16, ry: 0.13, a:  0.10, op: 0.30 },
    { x: 0.34, y: 0.58, rx: 0.14, ry: 0.11, a: -0.15, op: 0.26 },
    { x: 0.64, y: 0.52, rx: 0.12, ry: 0.10, a:  0.35, op: 0.24 },
    { x: 0.44, y: 0.30, rx: 0.11, ry: 0.09, a: -0.10, op: 0.20 },
    { x: 0.68, y: 0.35, rx: 0.10, ry: 0.09, a:  0.05, op: 0.18 },
    { x: 0.42, y: 0.68, rx: 0.11, ry: 0.09, a:  0.20, op: 0.22 },
    { x: 0.58, y: 0.66, rx: 0.09, ry: 0.07, a: -0.30, op: 0.16 },
    { x: 0.28, y: 0.46, rx: 0.10, ry: 0.08, a:  0.15, op: 0.18 },
    { x: 0.72, y: 0.60, rx: 0.08, ry: 0.07, a: -0.10, op: 0.14 },
    { x: 0.48, y: 0.74, rx: 0.08, ry: 0.06, a:  0.00, op: 0.14 },
  ];

  for (const m of maria) {
    ctx.save();
    ctx.translate(m.x * s, m.y * s);
    ctx.rotate(m.a);
    ctx.scale(1, m.ry / m.rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, m.rx * s);
    g.addColorStop(0,    `rgba(34, 30, 22, ${m.op})`);
    g.addColorStop(0.55, `rgba(34, 30, 22, ${m.op * 0.45})`);
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, m.rx * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Bright highland patches ──
  const highlands = [
    { x: 0.64, y: 0.66, rx: 0.14, ry: 0.12, op: 0.16 },
    { x: 0.30, y: 0.32, rx: 0.12, ry: 0.10, op: 0.13 },
    { x: 0.74, y: 0.42, rx: 0.10, ry: 0.09, op: 0.11 },
    { x: 0.34, y: 0.72, rx: 0.09, ry: 0.08, op: 0.10 },
    { x: 0.60, y: 0.22, rx: 0.10, ry: 0.08, op: 0.12 },
  ];

  for (const h of highlands) {
    ctx.save();
    ctx.translate(h.x * s, h.y * s);
    ctx.scale(1, h.ry / h.rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, h.rx * s);
    g.addColorStop(0,   `rgba(255, 248, 230, ${h.op})`);
    g.addColorStop(0.6, `rgba(255, 248, 230, ${h.op * 0.3})`);
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, h.rx * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── Edge rim darkening ──
  const rim = ctx.createRadialGradient(cx, cy, r * 0.78, cx, cy, r);
  rim.addColorStop(0, 'rgba(20,18,14,0)');
  rim.addColorStop(1, 'rgba(20,18,14,0.92)');
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, s, s);

  ctx.restore();
}

export function MoonCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw(ctx);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ borderRadius: '50%' }}
    />
  );
}
