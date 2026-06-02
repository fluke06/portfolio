'use client';
import { useEffect, useState } from 'react';

const BAYBAYIN_POOL = [
  'ᜀ','ᜁ','ᜂ','ᜃ','ᜄ','ᜅ','ᜆ','ᜇ','ᜈ','ᜉ',
  'ᜊ','ᜋ','ᜌ','ᜎ','ᜐ','ᜑ','ᜏ',
];
const REEL_LEN = 12;

function makeReels(text: string): (string[] | null)[] {
  return [...text].map(c =>
    /\s/.test(c) ? null : Array.from({ length: REEL_LEN }, () =>
      BAYBAYIN_POOL[Math.floor(Math.random() * BAYBAYIN_POOL.length)]
    )
  );
}

interface SlotTextProps {
  children: string;
  delay?: number;
  perCharDelay?: number;
  baseDuration?: number;
  perCharDuration?: number;
  className?: string;
}

export function SlotText({
  children,
  delay = 0,
  perCharDelay = 50,
  baseDuration = 1100,
  perCharDuration = 80,
  className = '',
}: SlotTextProps) {
  const [inView, setInView] = useState(false);
  const [reels, setReels] = useState<(string[] | null)[]>([]);
  const [ready, setReady] = useState(false);

  const text = children ?? '';

  useEffect(() => {
    setReels(makeReels(text));
    setReady(true);
    setInView(true);
  }, [text]);

  return (
    <span className={`slot-text ${className}`}>
      {[...text].map((char, i) => {
        if (/\s/.test(char)) return <span key={i} className="slot-space">{char}</span>;

        const reel = reels[i];
        const charDelay = delay + i * perCharDelay;
        const animStyle: React.CSSProperties = inView ? {
          animationName: 'slot-spin',
          animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          animationFillMode: 'forwards',
          animationDelay: `${charDelay}ms`,
          animationDuration: `${baseDuration + i * perCharDuration}ms`,
        } : {};
        return (
          <span key={i} className="slot-char">
            <span className="slot-ghost" aria-hidden="true">{char}</span>
            {ready && inView && (
              <span
                className="slot-reel"
                style={animStyle}
                aria-hidden="true"
                onAnimationEnd={(e) => {
                  const reel = e.currentTarget;
                  const charEl = reel.parentElement;
                  reel.style.display = 'none';
                  charEl?.querySelector('.slot-ghost')?.classList.add('slot-ghost-visible');
                  charEl?.classList.add('slot-char-done');
                }}
              >
                {reel?.map((r, j) => <span key={j} className="slot-glyph">{r}</span>)}
                <span className="slot-final">{char}</span>
              </span>
            )}
            <span className="slot-sr-only">{char}</span>
          </span>
        );
      })}
    </span>
  );
}
