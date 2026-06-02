'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';
import { Monogram } from './mascot';
import { NAV_ITEMS } from '@/lib/projects';

export function TopNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (!menuOpen) setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const activeRoute = pathname === '/' ? 'home'
    : pathname.startsWith('/works') ? 'works'
    : pathname.startsWith('/about') ? 'about'
    : pathname.startsWith('/playground') ? 'playground'
    : pathname.startsWith('/contact') ? 'contact'
    : '';

  return (
    <>
      <nav className={`topnav ${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}>
        <Link href="/" className="brand" aria-label="Home">
          <Monogram size={26} />
          <span className="brand-name">Christian Dizon</span>
        </Link>

        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-link ${activeRoute === item.id ? 'is-active' : ''}`}
            >
              <span className="nav-num">{item.num}</span>
              <span>{item.en}</span>
            </Link>
          ))}
        </div>

        <div className="nav-controls">
          {mounted && (
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-bar menu-bar-1" />
            <span className="menu-bar menu-bar-2" />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-drawer-inner">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-drawer-link ${activeRoute === item.id ? 'is-active' : ''}`}
            >
              <span className="nav-drawer-num">({item.num})</span>
              <span className="nav-drawer-en">{item.en}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
