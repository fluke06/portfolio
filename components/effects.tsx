'use client';
import { useEffect, useRef, useState } from 'react';
import { Mascot } from './mascot';

// ─── Custom Cursor ────────────────────────────────────────────────────────
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, hover: false, hidden: true, showLabel: false });

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!cursor || !dot) return;

    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
      if (stateRef.current.hidden) {
        stateRef.current.hidden = false;
        cursor.classList.add('is-visible');
        dot.classList.add('is-visible');
      }
    };
    const onLeave = () => {
      stateRef.current.hidden = true;
      cursor.classList.remove('is-visible');
      dot.classList.remove('is-visible');
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest(
        'a, button, [role="button"], [data-cursor="hover"], .work-row, .work-tile, .project-next-card, .pill, .filter-pill, .kind-pill, .nav-link, .brand, .theme-toggle, .footer-link, .crumb-link, .section-more'
      );
      const isHover = !!target;
      if (isHover !== stateRef.current.hover) {
        stateRef.current.hover = isHover;
        cursor.classList.toggle('is-hover', isHover);
      }
      // Show VIEW label only on project/work items
      if (label) {
        const isWork = !!(e.target as Element).closest('.work-row, .work-tile, .project-next-card');
        if (isWork !== stateRef.current.showLabel) {
          stateRef.current.showLabel = isWork;
          label.classList.toggle('is-visible', isWork);
        }
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);

    let raf: number;
    const loop = () => {
      const s = stateRef.current;
      s.x += (s.tx - s.x) * 0.18;
      s.y += (s.ty - s.y) * 0.18;
      cursor.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0) translate(-50%, -50%)`;
      if (label) {
        label.style.transform = `translate3d(${s.tx + 14}px, ${s.ty - 28}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true">View →</div>
    </>
  );
}

// ─── Magnetic Effect ──────────────────────────────────────────────────────
export function MagneticEffect() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const RADIUS = 110;
    const STRENGTH = 0.28;

    let elements: Element[] = [];
    const refresh = () => { elements = [...document.querySelectorAll('[data-magnetic]')]; };
    refresh();
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: MouseEvent) => {
      for (const el of elements) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH;
          (el as HTMLElement).style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else if ((el as HTMLElement).style.transform) {
          (el as HTMLElement).style.transform = '';
        }
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      mo.disconnect();
      elements.forEach(el => { (el as HTMLElement).style.transform = ''; });
    };
  }, []);
  return null;
}

// ─── Image Preview ────────────────────────────────────────────────────────
export function ImagePreview() {
  const refImg = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const img = refImg.current;
    if (!img) return;

    const show = (url: string) => {
      img.style.backgroundImage = `url(${url})`;
      img.classList.add('is-visible');
    };
    const hide = () => img.classList.remove('is-visible');

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-preview]');
      if (target) show(target.getAttribute('data-preview')!);
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-preview]');
      if (target && !target.contains(e.relatedTarget as Node)) hide();
    };
    const onMove = (e: MouseEvent) => {
      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousemove', onMove);

    let raf: number;
    const loop = () => {
      const s = state.current;
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      img.style.transform = `translate3d(${s.x + 24}px, ${s.y - 60}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={refImg} className="image-preview" aria-hidden="true" />;
}

// ─── Scroll Walker ────────────────────────────────────────────────────────
export function ScrollWalker() {
  const [pct, setPct] = useState(0);
  const [bobbing, setBobbing] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setPct(p);
      setBobbing(b => b + 1);
      setVisible(window.scrollY > 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const top = `calc(22vh + ${pct * 58}vh)`;
  const rot = Math.sin(bobbing * 0.4) * 8;

  return (
    <div
      className={`scroll-walker ${visible ? 'is-visible' : ''}`}
      style={{ top, left: 'clamp(8px, 2vw, 36px)' }}
    >
      <Mascot name="pebble" className="scroll-walker-blob" style={{ transform: `rotate(${rot}deg)` }} />
      <div className="scroll-walker-shadow" />
    </div>
  );
}

// ─── Back To Top ──────────────────────────────────────────────────────────
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <Mascot name="pebble" className="back-to-top-blob" />
      <span className="back-to-top-label">Top <em>tuktok</em></span>
    </button>
  );
}

// ─── Lenis Smooth Scroll — synced with GSAP ScrollTrigger ────────────────
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    let cancelled = false;
    let done: (() => void) | null = null;

    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const tick = (t: number) => lenis.raf(t * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      done = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => { cancelled = true; done?.(); };
  }, []);

  return null;
}

// ─── GSAP Hero — scroll-scrub parallax on hero decorative elements ────────
export function GSAPHero() {
  useEffect(() => {
    let cancelled = false;
    let done: (() => void) | null = null;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        if (!document.querySelector('.hero')) return;

        // Pass scrollTrigger as an inline option so the tween starts paused
        // and ScrollTrigger owns it from frame 0 — no 1-frame animation flash.
        const ctx = gsap.context(() => {
          const st = { trigger: '.hero', start: 'top top', end: 'bottom top' };
          gsap.to('.hero-blob-1',   { y: -180, x:  40, rotation:  55, scale: 1.15, ease: 'none', scrollTrigger: { ...st, scrub: 1.5 } });
          gsap.to('.hero-blob-2',   { y: -100, x: -50, rotation: -30,             ease: 'none', scrollTrigger: { ...st, scrub: 2.0 } });
          gsap.to('.hero-asterisk', { y:  -70,          rotation: 360,             ease: 'none', scrollTrigger: { ...st, scrub: 1.0 } });
        });

        done = () => ctx.revert();
      }
    );

    return () => { cancelled = true; done?.(); };
  }, []);
  return null;
}

// ─── Grain layer (server-safe wrapper) ───────────────────────────────────
export function GrainLayer() {
  return <div className="grain" aria-hidden="true" />;
}

// ─── ScrollReveal — wires up IntersectionObserver on all .reveal elements ──
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const refresh = () => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach(el => observer.observe(el));
    };
    refresh();

    // Re-scan on route changes (Next.js soft nav)
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
