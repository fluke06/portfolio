'use client';
import { TopNav } from './top-nav';
import { Footer } from './footer';
import { CustomCursor, MagneticEffect, ImagePreview, ScrollWalker, BackToTop, SmoothScroll, GrainLayer, ScrollReveal, GSAPHero } from './effects';
import { ThreeScene } from './three-scene';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <GrainLayer />
      <ThreeScene />
      <TopNav />
      <main>
        {children}
        <Footer />
      </main>
      <CustomCursor />
      <MagneticEffect />
      <ImagePreview />
      <ScrollWalker />
      <BackToTop />
      <SmoothScroll />
      <ScrollReveal />
      <GSAPHero />
    </div>
  );
}
