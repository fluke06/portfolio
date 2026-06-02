'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function AnimatedLetter({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = [...text];
  const nonSpaceCount = chars.filter(c => c !== ' ').length;
  let ci = 0;

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => {
        if (char === ' ') return <span key={i}> </span>;
        const progress = ci++ / nonSpaceCount;
        return (
          <AnimatedLetter
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={Math.max(0, progress - 0.1)}
            end={Math.min(1, progress + 0.05)}
          />
        );
      })}
    </p>
  );
}
