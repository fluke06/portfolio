'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from './hero-section';

const IntroAnimation = dynamic(
  () => import('./intro-animation').then(m => ({ default: m.IntroAnimation })),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import('./about-section').then(m => ({ default: m.AboutSection }))
);
const StackSection = dynamic(
  () => import('./stack-section').then(m => ({ default: m.StackSection }))
);

export function HomeClient() {
  const [ready,     setReady]     = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('introShown') === '1';
    if (alreadyShown) setIntroDone(true);
    setReady(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem('introShown', '1');
    setIntroDone(true);
  };

  return (
    <>
      {ready && !introDone && <IntroAnimation onDone={handleDone} />}
      <HeroSection introDone={introDone} />
      <AboutSection />
      <StackSection />
    </>
  );
}
