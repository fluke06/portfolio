'use client';
import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'About',   href: '/about' },
  { label: 'Works',   href: '/works' },
  { label: 'Contact', href: '/contact' },
];

export function StickyNav({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (alwaysVisible) {
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
      if (!reduced) el.style.transform = 'translateY(0)';
      return;
    }

    let scheduled = false;

    const update = () => {
      scheduled = false;
      const visible = window.scrollY > window.innerHeight * 0.7;
      el.style.opacity = visible ? '1' : '0';
      el.style.pointerEvents = visible ? 'auto' : 'none';
      if (!visible) setOpen(false);
      if (!reduced) {
        el.style.transform = visible ? 'translateY(0)' : 'translateY(-10px)';
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

  useEffect(() => { setOpen(false); }, [pathname]);

  const bg     = 'rgba(16, 15, 13, 0.92)';
  const border = '1px solid rgba(237, 232, 224, 0.08)';

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: alwaysVisible ? 1 : 0,
        pointerEvents: alwaysVisible ? 'auto' : 'none',
        transition: reduced ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* ── Bar ── */}
      <div
        className="flex items-center justify-between px-5 sm:px-8 md:px-10 py-3 sm:py-4"
        style={{
          background: bg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: border,
        }}
      >
        <Link
          href="/"
          className="font-fraunces font-black text-[#EDE8E0] leading-none flex-shrink-0 hover:opacity-70 transition-opacity duration-200"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', wordSpacing: '0.12em' }}
        >
          Christian Dizon<em className="italic">.</em>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-5 md:gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="font-inter font-medium hover:text-[#EDE8E0] transition-colors duration-200 text-sm"
              style={{ color: '#b4ac97' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-full font-inter font-medium text-xs items-center min-h-[44px] px-5 transition-colors duration-200 hover:bg-[#b4ac97] hover:text-[#100F0D]"
            style={{ color: '#b4ac97', border: '1px solid #b4ac97' }}
          >
            Start a project
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="sm:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] flex-shrink-0"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span
              className="block w-5 bg-[#EDE8E0] rounded-full"
              style={{
                height: '1.5px',
                transition: reduced ? 'none' : 'transform 0.2s ease',
                transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-5 bg-[#EDE8E0] rounded-full"
              style={{
                height: '1.5px',
                transition: reduced ? 'none' : 'opacity 0.15s ease',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-5 bg-[#EDE8E0] rounded-full"
              style={{
                height: '1.5px',
                transition: reduced ? 'none' : 'transform 0.2s ease',
                transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className="sm:hidden overflow-hidden"
        style={{
          background: bg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: open ? border : 'none',
          maxHeight: open ? '240px' : '0',
          transition: reduced ? 'none' : 'max-height 0.28s ease',
        }}
      >
        <div className="px-5 pt-1 pb-5 flex flex-col">
          {NAV_LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-inter font-medium text-[#b4ac97] hover:text-[#EDE8E0] transition-colors duration-200 py-3.5 text-[15px]"
              style={{ borderBottom: '1px solid rgba(237,232,224,0.06)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center items-center rounded-full font-inter font-medium text-sm min-h-[44px] px-5 transition-colors duration-200 hover:bg-[#b4ac97] hover:text-[#100F0D]"
            style={{ color: '#b4ac97', border: '1px solid #b4ac97' }}
          >
            Start a project
          </Link>
        </div>
      </div>
    </div>
  );
}
