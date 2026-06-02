'use client';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const SplineCanvas = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

const SCENE_URL = 'https://prod.spline.design/ryi1U8cDoWOmali1/scene.splinecode';

export function SplineScene({ scene = SCENE_URL }: { scene?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const scale     = useTransform(scrollY, [0, 700], [1, 0.82]);
  const opacity   = useTransform(scrollY, [0, 480], [1, 0]);
  const y         = useTransform(scrollY, [0, 700], [0, -70]);
  const rotateY   = useTransform(scrollY, [0, 700], [0, 14]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full"
      style={
        reduced
          ? { opacity }
          : { scale, opacity, y, rotateY, transformOrigin: '60% 50%', perspective: 1200 }
      }
    >
      <SplineCanvas
        scene={scene}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
}
