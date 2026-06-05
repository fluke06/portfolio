'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const D_RED    = '#e60039';
const D_TEAL   = '#5BC8E0';
const D_GREEN  = '#8dc556';
const D_ORG    = '#E87000';
const D_YELLOW = '#fff100';

function HeartSVG({ color = '#e60039' }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <path d="M 30 50 C 18 38 4 30 4 17 C 4 9 10 3 18 3 C 22 3 26 5 30 9 C 34 5 38 3 42 3 C 50 3 56 9 56 17 C 56 30 42 38 30 50 Z" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  );
}

const CARDS = [
  { num: '01', accent: D_RED,   tape: D_RED,   rot: -3, title: 'Choose Your Design',    body: 'Pick from our collection of hand-embroidered patterns — inspired by Filipino culture, nature, and everyday life.' },
  { num: '02', accent: D_TEAL,  tape: D_TEAL,  rot:  2, title: 'We Stitch It By Hand',  body: 'Every Likhâ barong is embroidered by Filipino artisans. No machines, no shortcuts — just needle, thread, and care.' },
  { num: '03', accent: D_GREEN, tape: D_GREEN, rot: -2, title: 'Wear Your Story',        body: 'Your finished barong arrives ready to wear — a one-of-a-kind piece that carries the craft and soul of the maker.' },
  { num: '04', accent: D_ORG,   tape: D_ORG,   rot:  3, title: 'Want Something Custom?', body: "Tell us your vision. We'll design a completely original barong — your motifs, your colors, your story." },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.hiw-heading', {
        y: 32, opacity: 0, duration: 0.55, ease: 'power3.out',
        clearProps: 'y,opacity',
        scrollTrigger: { trigger: '.hiw-heading', start: 'top 88%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.hiw-card').forEach((card, i) => {
        const rot = parseFloat(card.dataset.rot ?? '0');
        // Rotation lives on the outer element — GSAP owns it, nothing else touches it
        gsap.set(card, { rotation: rot });
        // y + opacity animate on the inner wrapper so transform is never shared
        const inner = card.querySelector<HTMLElement>('.hiw-card-inner');
        if (!inner) return;
        gsap.from(inner, {
          y: 80, opacity: 0, duration: 0.5, delay: i * 0.1,
          ease: 'back.out(1.8)', clearProps: 'y,opacity',
          scrollTrigger: { trigger: '.hiw-grid', start: 'top 85%', once: true },
        });
      });

      // Doodle draw-in + continuous float
      Array.from(sectionRef.current?.querySelectorAll<HTMLElement>('div') ?? [])
        .filter(el => el.style.pointerEvents === 'none')
        .forEach((el) => {
          const geoms = Array.from(el.querySelectorAll<SVGGeometryElement>('path, circle, line'));
          geoms.forEach(g => {
            if (g.getAttribute('fill') && g.getAttribute('fill') !== 'none') {
              gsap.set(g, { opacity: 0 });
            } else {
              try { const len = g.getTotalLength(); gsap.set(g, { strokeDasharray: len, strokeDashoffset: len }); }
              catch { gsap.set(g, { opacity: 0 }); }
            }
          });
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
          tl.to(geoms, { strokeDashoffset: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.06 });
          tl.to(el, { y: -(4 + Math.random() * 4), duration: 1.8 + Math.random() * 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true }, '+=0.1');
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      backgroundImage: 'url(/playground/likha/padpaper-pattern.png)',
      backgroundSize: 'auto 60px',
      backgroundRepeat: 'repeat',
      padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,64px)',
      borderTop: '4px solid #111',
      borderBottom: '4px solid #111',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '6%',  left: '2%',  width: 80,  height: 32, transform: 'rotate(-7deg)',  pointerEvents: 'none', opacity: 0.6 }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_TEAL} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '5%',  right: '24%', width: 50,  height: 50, transform: 'rotate(14deg)',  pointerEvents: 'none', opacity: 0.6 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_RED} stroke={D_RED} strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '8%', left: '5%', width: 40,  height: 40, transform: 'rotate(-12deg)', pointerEvents: 'none', opacity: 0.55 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_ORG} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '6%', right: '40%', width: 100, height: 28, transform: 'rotate(6deg)',   pointerEvents: 'none', opacity: 0.6 }}>
        <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_GREEN} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '17%',   left: '2%',   width: 36,  height: 36,  transform: 'rotate(22deg)',  pointerEvents: 'none', opacity: 0.5 }}>
        <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="18" r="14" fill="none" stroke={D_YELLOW} strokeWidth="4"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '28%',   right: '14.5%',width: 50,  height: 50,  transform: 'rotate(-13deg)', pointerEvents: 'none', opacity: 0.5 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_TEAL} strokeWidth="3" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '58%',   left: '1.5%', width: 28,  height: 28,  transform: 'rotate(-20deg)', pointerEvents: 'none', opacity: 0.45 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_YELLOW} stroke={D_YELLOW} strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '43%',   right: '2.5%',width: 72,  height: 20,  transform: 'rotate(11deg)',  pointerEvents: 'none', opacity: 0.5 }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '30%', left: '7.5%',width: 44,  height: 44,  transform: 'rotate(17deg)',  pointerEvents: 'none', opacity: 0.5 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_TEAL} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '2%', width: 38,  height: 38,  transform: 'rotate(-24deg)', pointerEvents: 'none', opacity: 0.45 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_ORG} strokeWidth="3" strokeLinejoin="round"/></svg>
      </div>
      {/* Near-content interior doodles */}
      <div style={{ position: 'absolute', top: '24%',   left: '14%',  width: 52,  height: 15,  transform: 'rotate(-11deg)', pointerEvents: 'none', opacity: 0.3 }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '37%',   right: '16%', width: 30,  height: 30,  transform: 'rotate(18deg)',  pointerEvents: 'none', opacity: 0.28 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_TEAL} stroke={D_TEAL} strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '52%',   left: '20%',  width: 32,  height: 32,  transform: 'rotate(-6deg)',  pointerEvents: 'none', opacity: 0.28 }}>
        <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="18" r="14" fill="none" stroke={D_GREEN} strokeWidth="4"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '66%',   right: '14%', width: 60,  height: 17,  transform: 'rotate(9deg)',   pointerEvents: 'none', opacity: 0.3 }}>
        <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_YELLOW} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '25%',left: '25%',  width: 26,  height: 26,  transform: 'rotate(24deg)',  pointerEvents: 'none', opacity: 0.28 }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_ORG} strokeWidth="3" strokeLinejoin="round"/></svg>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="hiw-heading" style={{ marginBottom: 56, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            background: D_YELLOW, border: '3px solid #111', borderRadius: 12,
            padding: '6px 20px', fontWeight: 900, fontSize: '0.75rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', boxShadow: '3px 3px 0 #111',
            transform: 'rotate(-2deg)', display: 'inline-block', color: '#111',
          }}>
            The Process
          </div>
          <h2 style={{
            fontFamily: 'var(--font-klee)', fontWeight: 600,
            fontSize: 'clamp(2rem,5vw,4rem)', margin: 0, lineHeight: 1.15,
            transform: 'rotate(-1deg)',
            filter: 'url(#brush-stroke)',
          }}>
            How It <span style={{ color: D_RED }}>Works</span>
          </h2>
          {/* ④ big heart near heading */}
          <div className="hiw-heart" style={{ width: 70, height: 65, flexShrink: 0, opacity: 0.8, transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
            <HeartSVG color={D_RED} />
          </div>
        </div>

        <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
          {CARDS.map(({ num, accent, tape, rot, title, body }) => (
            <div key={num} className="hiw-card" data-rot={rot} style={{ position: 'relative', transformOrigin: 'center top' }}>
              <div className="hiw-card-inner" style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -10, left: '50%',
                transform: 'translateX(-50%)',
                width: 52, height: 18,
                background: tape, opacity: 0.85,
                borderRadius: 3, border: '1.5px solid #111', zIndex: 2,
              }} />
              <div style={{
                backgroundImage: 'url(/playground/likha/background-markee.png)',
                backgroundSize: 'cover',
                border: '3px solid #111', borderRadius: 16,
                boxShadow: '5px 5px 0 #111',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingTop: 6,
              }}>
                <div style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-zen)', fontWeight: 900,
                    fontSize: 'clamp(2.8rem,5.5vw,3.8rem)',
                    lineHeight: 1, color: '#000',
                    textShadow: `2px 2px 0 ${accent}`,
                  }}>{num}</div>
                  <h3 style={{ fontWeight: 900, fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', margin: 0, color: '#000', lineHeight: 1.35 }}>{title}</h3>
                  <p style={{
                    fontSize: 'clamp(0.78rem,1.1vw,0.88rem)', color: '#111', lineHeight: 1.7, margin: 0,
                    background: 'rgba(255,255,255,0.55)', borderRadius: 8, padding: '8px 10px',
                    border: '1.5px solid rgba(0,0,0,0.12)',
                  }}>{body}</p>
                </div>
              </div>
              </div>{/* hiw-card-inner */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
