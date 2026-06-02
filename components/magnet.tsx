'use client';
import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const near =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (near) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        el.style.transform = `translate3d(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px, 0)`;
        el.style.transition = activeTransition;
      } else {
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = inactiveTransition;
      }
    };

    el.style.willChange = 'transform';
    document.addEventListener('mousemove', handleMove);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      el.style.willChange = '';
    };
  }, [padding, strength, activeTransition, inactiveTransition, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
