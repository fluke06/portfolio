'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const D_RED    = '#e60039';
const D_TEAL   = '#5BC8E0';
const D_GREEN  = '#8dc556';
const D_ORG    = '#E87000';
const D_YELLOW = '#fff100';

const TAGS = ['Hand-embroidered', 'Made in the Philippines', 'One of a kind'];
const TAG_BG  = [D_YELLOW, D_TEAL, D_GREEN];
const TAG_ROT = [-1.5, 1, -1];

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.mission-card', {
        y: 60, opacity: 0, duration: 0.65,
        ease: 'power3.out', clearProps: 'y,opacity',
        scrollTrigger: { trigger: '.mission-card', start: 'top 85%', once: true },
      });

      gsap.from('.mission-text', {
        y: 24, opacity: 0, duration: 0.55, delay: 0.15,
        ease: 'power3.out', clearProps: 'y,opacity',
        scrollTrigger: { trigger: '.mission-card', start: 'top 85%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.mission-tag').forEach((tag, i) => {
        gsap.from(tag, {
          scale: 0.7, opacity: 0, duration: 0.4,
          delay: 0.3 + i * 0.1,
          ease: 'back.out(2)',
          clearProps: 'scale,opacity',
          scrollTrigger: { trigger: '.mission-card', start: 'top 85%', once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,64px)',
      textAlign: 'center',
      background: '#FFEE00',
      backgroundImage: [
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
        'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
      ].join(', '),
    }}>
      <div className="mission-card" style={{
        maxWidth: '100%', margin: '0 auto',
        background: '#fff',
        border: '3.5px solid #111',
        borderRadius: 24,
        boxShadow: '6px 6px 0 #111',
        padding: 'clamp(40px,6vw,72px) clamp(28px,5vw,64px)',
        position: 'relative',
      }}>
        {/* Corner doodles */}
        <div style={{ position: 'absolute', top: 16, left: 16,   width: 44, transform: 'rotate(-12deg)', opacity: 0.35, pointerEvents: 'none' }}>
          <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16,  width: 36, transform: 'rotate(10deg)',  opacity: 0.35, pointerEvents: 'none' }}>
          <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_TEAL} stroke={D_TEAL} strokeWidth="1.5" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 16, left: 20, width: 32, transform: 'rotate(8deg)',  opacity: 0.35, pointerEvents: 'none' }}>
          <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_GREEN} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, width: 56, transform: 'rotate(-6deg)', opacity: 0.35, pointerEvents: 'none' }}>
          <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_ORG} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
        </div>

        <div className="mission-text" style={{
          fontFamily: 'var(--font-klee)', fontWeight: 600,
          fontSize: 'clamp(2rem,5vw,3.6rem)',
          lineHeight: 1.4, color: '#111',
          filter: 'url(#brush-stroke)',
        }}>
          Bringing the <span style={{ color: D_RED }}>joy of wearing</span><br />
          something truly handcrafted —<br />
          <span style={{ color: D_GREEN }}>to everyone.</span>
        </div>

        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          {TAGS.map((tag, i) => (
            <span key={tag} className="mission-tag" style={{
              background: TAG_BG[i],
              border: '2.5px solid #111', borderRadius: '5.33333vw',
              padding: '6px 18px', fontWeight: 900, fontSize: '0.72rem',
              letterSpacing: '0.08em', color: '#111',
              boxShadow: '3px 3px 0 #111',
              transform: `rotate(${TAG_ROT[i]}deg)`,
              display: 'inline-block',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
