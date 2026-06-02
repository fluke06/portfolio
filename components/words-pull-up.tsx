'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayOffset?: number;
}

export function WordsPullUp({ text, className = '', showAsterisk = false, delayOffset = 0 }: WordsPullUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.2em] last:mr-0">
          <motion.span
            className="inline-block relative"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: delayOffset + i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-normal">*</sup>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
  delayOffset?: number;
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '', delayOffset = 0 }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const allWords: { word: string; className: string; idx: number }[] = [];
  let idx = 0;
  segments.forEach(seg => {
    seg.text.split(' ').filter(Boolean).forEach(word => {
      allWords.push({ word, className: seg.className ?? '', idx: idx++ });
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${containerClassName}`}>
      {allWords.map(({ word, className, idx: i }) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: delayOffset + i * 0.08,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
