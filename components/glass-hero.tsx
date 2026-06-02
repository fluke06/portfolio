'use client';
import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll, useTransform,
  useMotionValue, useSpring, useReducedMotion,
  MotionValue,
} from 'framer-motion';

const SPRING = { stiffness: 55, damping: 18, mass: 0.9 };

// Panels occupy the right 45–95% — left text stays clean
const PANELS = [
  { x: 58,  y: 4,   w: 260, h: 320, rot: -8,  blur: 20, depth: 1.0 },
  { x: 78,  y: 12,  w: 190, h: 240, rot:  7,  blur: 16, depth: 0.5 },
  { x: 46,  y: 40,  w: 340, h: 210, rot: -4,  blur: 26, depth: 1.5 },
  { x: 74,  y: 50,  w: 210, h: 270, rot: 11,  blur: 18, depth: 0.7 },
  { x: 52,  y: 72,  w: 160, h: 180, rot: -11, blur: 22, depth: 1.2 },
];

// Concentrated orbs — the actual luminance source
const ORBS = [
  { cx: 66, cy: 26, size: 460, a0: 0.72, df: 0.3 },
  { cx: 84, cy: 60, size: 320, a0: 0.50, df: 0.7 },
  { cx: 50, cy: 58, size: 280, a0: 0.38, df: 1.1 },
];

function GlassPanel({
  p, sx, sy, reduced,
}: {
  p: typeof PANELS[number];
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduced: boolean | null;
}) {
  const px = useTransform(sx, v => v * 42 * p.depth);
  const py = useTransform(sy, v => v * 32 * p.depth);

  return (
    <motion.div
      className="absolute"
      style={{
        left:   `${p.x}%`,
        top:    `${p.y}%`,
        width:  p.w,
        height: p.h,
        borderRadius: 26,
        rotate: p.rot,
        // Bright frosted glass — luminous enough to read against dark
        background: 'rgba(255, 255, 255, 0.09)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        backdropFilter: `blur(${p.blur}px) saturate(1.4)`,
        WebkitBackdropFilter: `blur(${p.blur}px) saturate(1.4)`,
        boxShadow: [
          'inset 0 1.5px 0 rgba(255,255,255,0.30)',   // top highlight
          'inset 0 -1px 0 rgba(0,0,0,0.18)',            // bottom shadow
          '0 8px 48px rgba(0,0,0,0.35)',               // depth
          '0 0 60px rgba(184,122,60,0.08)',             // copper ambient
        ].join(', '),
        x: reduced ? 0 : px,
        y: reduced ? 0 : py,
      }}
    >
      {/* Top-edge bright highlight */}
      <div
        className="absolute inset-x-6 top-0"
        style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.50), transparent)',
        }}
      />
      {/* Warm inner surface tint */}
      <div
        className="absolute inset-0 rounded-[26px]"
        style={{
          background: 'linear-gradient(140deg, rgba(184,122,60,0.10) 0%, rgba(201,143,86,0.04) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

function GlassOrb({
  orb, sx, sy, reduced,
}: {
  orb: typeof ORBS[number];
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduced: boolean | null;
}) {
  const ox = useTransform(sx, v => v * -24 * orb.df);
  const oy = useTransform(sy, v => v * -18 * orb.df);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left:       `${orb.cx}%`,
        top:        `${orb.cy}%`,
        width:      orb.size,
        height:     orb.size,
        marginLeft: -orb.size / 2,
        marginTop:  -orb.size / 2,
        background: `radial-gradient(circle, rgba(184,122,60,${orb.a0}) 0%, rgba(184,122,60,0.15) 40%, transparent 70%)`,
        x: reduced ? 0 : ox,
        y: reduced ? 0 : oy,
      }}
    />
  );
}

export function GlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollScale   = useTransform(scrollY, [0, 700], [1, 0.84]);
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollYVal    = useTransform(scrollY, [0, 700], [0, -60]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - (rect.left + rect.width  / 2)) / rect.width);
      rawY.set((e.clientY - (rect.top  + rect.height / 2)) / rect.height);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, rawX, rawY]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={
        reduced
          ? { opacity: scrollOpacity }
          : { scale: scrollScale, opacity: scrollOpacity, y: scrollYVal }
      }
    >
      {ORBS.map((orb, i) => (
        <GlassOrb key={i} orb={orb} sx={springX} sy={springY} reduced={reduced} />
      ))}
      {PANELS.map((p, i) => (
        <GlassPanel key={i} p={p} sx={springX} sy={springY} reduced={reduced} />
      ))}
    </motion.div>
  );
}
