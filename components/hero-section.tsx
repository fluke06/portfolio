'use client';
import { useEffect } from 'react';
import {
  m,
  useScroll, useTransform,
  useMotionValue, useSpring, useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { MoonCanvas } from './moon-canvas';

const NAME   = 'CHRISTIAN DIZON';
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING = { stiffness: 45, damping: 16, mass: 1.0 };

/* ── Moon ───────────────────────────────────── */
function Moon({
  sx, sy, reduced, scrollY,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduced: boolean | null;
  scrollY: MotionValue<number>;
}) {
  const px = useTransform(sx, v => v * 28);
  const py = useTransform(sy, v => v * 20);

  // Scroll → eclipse: moon goes dark as page scrolls
  const eclipseOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <m.div
      className="relative select-none pointer-events-none"
      style={{
        width:  'clamp(240px, 44vmin, 540px)',
        height: 'clamp(240px, 44vmin, 540px)',
        x: reduced ? 0 : px,
        y: reduced ? 0 : py,
      }}
    >
      {/* Moon surface — canvas drawn */}
      <MoonCanvas />

      {/* Eclipse overlay — darkens to black on scroll */}
      <m.div
        className="absolute inset-0 rounded-full"
        style={{
          background: '#100F0D',
          opacity: reduced ? 0 : eclipseOpacity,
        }}
      />
    </m.div>
  );
}

/* ── Hero ───────────────────────────────────── */
export function HeroSection({ introDone }: { introDone: boolean }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx   = useSpring(rawX, SPRING);
  const sy   = useSpring(rawY, SPRING);

  useEffect(() => {
    if (reduced) return;
    const on = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth  - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', on, { passive: true });
    return () => window.removeEventListener('mousemove', on);
  }, [reduced, rawX, rawY]);

  const nameY = useTransform(scrollY, [0, 700], [0, -160]);
  const show  = reduced || introDone;

  return (
    <section
      className="h-screen relative overflow-hidden"
      style={{ background: '#100F0D' }}
    >
      <h1 className="sr-only">Christian Dizon — Full-Stack Developer</h1>

      {/* ── Shadow video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          objectFit: 'cover',
          opacity: 0.55,
          filter: 'brightness(0.4) contrast(1.6) grayscale(1)',
          mixBlendMode: 'luminosity',
        }}
      >
        <source src="/assets/shadow-movie.mp4" type="video/mp4" />
      </video>

      {/* ── Top bar ── */}
      <m.div
        className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 pt-7 md:pt-9"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.78, delay: 0, ease: expo }}
      >
        <span
          className="font-fraunces font-black text-[#EDE8E0]"
          style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1.1rem)', wordSpacing: '0.12em' }}
        >
          Christian Dizon.
        </span>
        <nav aria-label="Main navigation" className="flex items-center gap-6 sm:gap-10">
          {([['About', '/about'], ['Works', '/works'], ['Contact', '/contact']] as const).map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-inter font-medium text-[#888280] hover:text-[#EDE8E0] transition-colors duration-200"
              style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.92rem)' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </m.div>

      {/* ── Moon ── */}
      <div
        className="absolute top-[46%] left-1/2 md:left-[28%]"
        style={{ transform: 'translate(-50%, -50%)', zIndex: 5 }}
      >
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.22, ease: expo }}
        >
          <Moon sx={sx} sy={sy} reduced={reduced} scrollY={scrollY} />
        </m.div>
      </div>

      {/* ── Bio text — mobile, below moon ── */}
      <m.div
        className="absolute left-6 right-6 sm:hidden"
        style={{ bottom: 'calc(10vw + 7.5rem)', zIndex: 10 }}
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.78, delay: 0.48, ease: expo }}
      >
        <p
          className="font-inter font-light text-[#EDE8E0] leading-relaxed mb-2"
          style={{ fontSize: 'clamp(0.88rem, 3.5vw, 1rem)' }}
        >
          Full-stack developer, 8 years.
          <br />I build web apps end-to-end.
        </p>
        <p
          className="font-inter font-light text-[#888280]"
          style={{ fontSize: 'clamp(0.75rem, 3vw, 0.875rem)', letterSpacing: '0.05em' }}
        >
          Next.js · AWS · Terraform
        </p>
      </m.div>

      {/* ── Bio text — right side, desktop only ── */}
      <m.div
        className="absolute hidden sm:block"
        style={{
          right:     'clamp(2rem, 5vw, 6rem)',
          top:       '50%',
          transform: 'translateY(-22%)',
          maxWidth:  '26ch',
          zIndex:    10,
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.78, delay: 0.48, ease: expo }}
      >
        <p
          className="font-inter font-light text-[#EDE8E0] leading-relaxed mb-3"
          style={{ fontSize: 'clamp(0.88rem, 1.35vw, 1.05rem)' }}
        >
          Full-stack developer, 8 years.
          <br />I build web apps end-to-end.
        </p>
        <p
          className="font-inter font-light text-[#888280]"
          style={{ fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', letterSpacing: '0.05em' }}
        >
          Next.js · AWS · Terraform
        </p>
      </m.div>

      {/* ── Bottom meta ── */}
      <m.div
        className="absolute left-0 right-0 flex justify-between items-end px-6 md:px-10"
        style={{ bottom: 'calc(10vw + 2.2rem)', zIndex: 15 }}
        initial={{ opacity: 0, y: 14 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.78, delay: 0.58, ease: expo }}
      >
        <p
          className="font-inter font-light text-[#888280] uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.10em' }}
        >
          Web Dev · Full-Stack · Cloud
        </p>
        <span
          className="font-inter font-medium text-[#EDE8E0] uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.12em' }}
        >
          Available for new projects
        </span>
      </m.div>

      {/* ── Mega name ── */}
      <m.div
        className="absolute left-0 right-0 bottom-0"
        style={{ zIndex: 3, y: nameY }}
        aria-hidden="true"
      >
        <div
          className="font-fraunces font-black leading-[0.86] sm:whitespace-nowrap"
          style={{
            fontSize:      'clamp(4rem, 10vw, 20rem)',
            paddingLeft:   '0.08em',
            paddingBottom: '0.02em',
            color:         '#EDE8E0',
            opacity:       0.40,
          }}
        >
          {NAME.split('').map((char, i) => (
            <m.span
              key={i}
              className="inline-block"
              style={{
                ...(char === ' ' ? { width: '0.38em' } : {}),
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, y: '55%' }}
              animate={show
                ? { opacity: 1, y: '0%' }
                : { opacity: 0, y: '55%' }
              }
              transition={{
                duration: 0.92,
                delay:    0.55 + i * 0.048,
                ease:     expo,
              }}
            >
              {char === ' ' ? ' ' : char}
            </m.span>
          ))}
        </div>
      </m.div>
    </section>
  );
}
