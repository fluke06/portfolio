'use client';
import { useState, useEffect } from 'react';
import { IntroAnimation } from './intro-animation';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { StackSection } from './stack-section';

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
