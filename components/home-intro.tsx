'use client';
import { useState } from 'react';
import { IntroAnimation } from './intro-animation';

export function HomeIntro() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <IntroAnimation onDone={() => setDone(true)} />;
}
