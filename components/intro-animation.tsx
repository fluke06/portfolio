'use client';
import { useState, useEffect } from 'react';

const TARGET      = 'HELLO';
const CHARSET     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const FLASH_COUNT = 5;
const FLASH_MS    = 38;
const LETTER_GAP  = 48;
const HOLD_AFTER  = 800;
const EXIT_DUR    = 0.85;

function rnd() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [chars,   setChars]   = useState<string[]>(() => TARGET.split('').map(() => ''));
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }

    const showTimer = setTimeout(() => setVisible(true), 120);
    const ids: ReturnType<typeof setTimeout>[] = [];

    let delay = 0;
    TARGET.split('').forEach((letter, idx) => {
      for (let f = 0; f < FLASH_COUNT; f++) {
        ids.push(setTimeout(() => {
          setChars(prev => { const n = [...prev]; n[idx] = rnd(); return n; });
        }, delay + f * FLASH_MS));
      }
      ids.push(setTimeout(() => {
        setChars(prev => { const n = [...prev]; n[idx] = letter; return n; });
      }, delay + FLASH_COUNT * FLASH_MS));
      delay += FLASH_COUNT * FLASH_MS + LETTER_GAP;
    });

    ids.push(setTimeout(() => {
      setExiting(true);
      setTimeout(() => { onDone(); setMounted(false); }, EXIT_DUR * 1000 + 100);
    }, delay + HOLD_AFTER));

    return () => { clearTimeout(showTimer); ids.forEach(clearTimeout); };
  }, [onDone]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center select-none pointer-events-none"
      style={{
        background: '#100F0D',
        zIndex: 200,
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: exiting ? `transform ${EXIT_DUR}s cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
      }}
    >
      <span
        className="font-fraunces font-black text-[#EDE8E0] leading-none"
        style={{
          fontSize:      'clamp(1.8rem, 4vw, 3.5rem)',
          letterSpacing: '0.32em',
          paddingLeft:   '0.32em',
          opacity:       visible ? 1 : 0,
          transition:    visible ? 'opacity 0.3s ease-out' : 'none',
        }}
      >
        {chars.map((c, i) => <span key={i}>{c || ' '}</span>)}
      </span>
    </div>
  );
}
