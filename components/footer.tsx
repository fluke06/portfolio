'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Monogram, Mascot } from './mascot';
import { Button } from './button';
import { NAV_ITEMS } from '@/lib/projects';

function useManilaTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-PH', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Manila',
    });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Footer() {
  const time = useManilaTime();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-h">
            Got a project<br />
            in mind? <em>Let&rsquo;s talk.</em>
          </div>
          <Link href="/contact" className="btn btn-primary" data-magnetic>
            <span>Send a message</span>
            <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 L18 6 M9 6 H18 V15" /></svg>
          </Link>
        </div>
        <Mascot name="splat" className="footer-blob" />
      </div>

      <div className="footer-grid">
        <div>
          <div className="footer-cap">Made by</div>
          <div className="footer-val">Christian Dizon</div>
        </div>
        <div>
          <div className="footer-cap">Based in</div>
          <div className="footer-val">Quezon City, PH</div>
        </div>
        <div>
          <div className="footer-cap">Email</div>
          <div className="footer-val">
            <a href="mailto:cdizon1048@gmail.com" className="t-link">cdizon1048@gmail.com</a>
          </div>
        </div>
        <div>
          <div className="footer-cap">Now in Manila</div>
          <div className="footer-val footer-mono">{time}</div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-mark">
          <Monogram size={20} />
          <span>© 2026</span>
        </div>
        <div className="footer-links">
          {NAV_ITEMS.map(n => (
            <Link key={n.id} href={n.href} className="footer-link">{n.en}</Link>
          ))}
        </div>
        <div className="footer-mono t-mono">PHT · UTC+8</div>
      </div>
    </footer>
  );
}
