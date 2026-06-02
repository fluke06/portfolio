'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const TARGET      = 'HELLO';
const CHARSET     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const FLASH_COUNT = 5;    // random chars flashed per letter before it locks
const FLASH_MS    = 38;   // ms between each flash frame
const LETTER_GAP  = 48;   // ms pause after lock before next letter starts
const HOLD_AFTER  = 800;  // ms of full word visible before exit
const EXIT_DUR    = 0.85; // seconds for curtain wipe

function rnd() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();

  const [chars,   setChars]   = useState<string[]>(() => TARGET.split('').map(() => ''));
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduced) { onDone(); return; }

    const showTimer = setTimeout(() => setVisible(true), 120);
    const ids: ReturnType<typeof setTimeout>[] = [];

    let delay = 0;
    TARGET.split('').forEach((letter, idx) => {
      // Flash random chars
      for (let f = 0; f < FLASH_COUNT; f++) {
        ids.push(setTimeout(() => {
          setChars(prev => { const n = [...prev]; n[idx] = rnd(); return n; });
        }, delay + f * FLASH_MS));
      }
      // Snap to the correct letter
      ids.push(setTimeout(() => {
        setChars(prev => { const n = [...prev]; n[idx] = letter; return n; });
      }, delay + FLASH_COUNT * FLASH_MS));

      delay += FLASH_COUNT * FLASH_MS + LETTER_GAP;
    });

    // Hold then curtain-wipe
    ids.push(setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, EXIT_DUR * 1000 + 100);
    }, delay + HOLD_AFTER));

    return () => { clearTimeout(showTimer); ids.forEach(clearTimeout); };
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center select-none pointer-events-none"
          style={{ background: '#100F0D', zIndex: 200 }}
          exit={{ y: '-100%' }}
          transition={{ duration: EXIT_DUR, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-fraunces font-black text-[#EDE8E0] leading-none"
            style={{
              fontSize:      'clamp(1.8rem, 4vw, 3.5rem)',
              letterSpacing: '0.32em',
              paddingLeft:   '0.32em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {chars.map((c, i) => (
              <span key={i}>{c || ' '}</span>
            ))}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
