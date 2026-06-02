'use client';
import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

function AnimatedChar({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const display = char === ' ' ? ' ' : char;
  return (
    <span className="relative inline-block">
      <span className="invisible">{display}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {display}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [inViewOnMount, setInViewOnMount] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInViewOnMount(true);
    }
  }, []);

  if (reduced || inViewOnMount) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  const chars = text.split('');

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          progress={scrollYProgress}
          start={i / chars.length}
          end={(i + 1) / chars.length}
        />
      ))}
    </p>
  );
}
