'use client';
import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About',   hash: '/about' },
  { label: 'Works',   hash: '/works' },
  { label: 'Contact', hash: '/contact' },
];

export function StickyNav({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (alwaysVisible) {
      nav.style.opacity = '1';
      nav.style.pointerEvents = 'auto';
      if (!reduced) nav.style.transform = 'translateY(0)';
      return;
    }

    let scheduled = false;

    const update = () => {
      scheduled = false;
      const visible = window.scrollY > window.innerHeight * 0.7;
      nav.style.opacity = visible ? '1' : '0';
      nav.style.pointerEvents = visible ? 'auto' : 'none';
      if (!reduced) {
        nav.style.transform = visible ? 'translateY(0)' : 'translateY(-10px)';
      }
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, alwaysVisible]);

  return (
    <nav
      ref={navRef}
      aria-label="Sticky navigation"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 sm:py-4"
      style={{
        background: 'rgba(16, 15, 13, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(237, 232, 224, 0.08)',
        opacity: alwaysVisible ? 1 : 0,
        pointerEvents: alwaysVisible ? 'auto' : 'none',
        transition: reduced ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <Link
        href="/"
        className="font-fraunces font-black text-[#EDE8E0] leading-none flex-shrink-0 hover:opacity-70 transition-opacity duration-200"
        style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', wordSpacing: '0.12em' }}
      >
        Christian Dizon<em className="italic text-[#EDE8E0]">.</em>
      </Link>

      <div className="hidden sm:flex items-center gap-5 md:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.hash}
            className="font-inter font-medium hover:text-[#EDE8E0] transition-colors duration-200 text-sm"
            style={{ color: '#b4ac97' }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="/contact"
        className="rounded-full font-inter font-medium text-xs flex-shrink-0 inline-flex items-center min-h-[44px] px-5 transition-colors duration-200 hover:bg-[#b4ac97] hover:text-[#100F0D]"
        style={{
          color:  '#b4ac97',
          border: '1px solid #b4ac97',
        }}
      >
        Start a project
      </a>
    </nav>
  );
}
