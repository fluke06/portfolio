'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const D_RED    = '#e60039';
const D_TEAL   = '#5BC8E0';
const D_GREEN  = '#8dc556';
const D_ORG    = '#E87000';
const D_YELLOW = '#fff100';

const SNS_LINKS = [
  { label: 'Official Site', sub: 'likha-barong.com',  icon: 'WEB' },
  { label: 'X / Twitter',   sub: '@likha_barong',      icon: 'X'   },
  { label: 'Instagram',     sub: '@likha_barong',      icon: 'IG'  },
  { label: 'Shop Now',      sub: 'Browse the store →', icon: 'BUY' },
  { label: 'Custom Order',  sub: 'Made just for you',  icon: 'CUS' },
  { label: 'About Us',      sub: 'Our story',          icon: 'US'  },
];

const BG_COLORS  = [D_YELLOW, '#111', D_RED, D_GREEN, D_TEAL, D_ORG];
const TXT_COLORS = ['#111', '#fff', '#fff', '#111', '#111', '#111'];
const ROTS       = [-2, 1.5, -1.5, 2, -1, 1.5];

function StarSVG() {
  return <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_RED} stroke={D_RED} strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
function WaveSVG() {
  return <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_TEAL} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>;
}
function SpiralSVG() {
  return <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_GREEN} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>;
}
function StarOutlineSVG() {
  return <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_ORG} strokeWidth="3" strokeLinejoin="round"/></svg>;
}
function ZigzagSVG() {
  return <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>;
}
function DotSVG() {
  return <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="18" r="14" fill="none" stroke={D_TEAL} strokeWidth="4"/></svg>;
}
function BarongSVG({ color = '#111' }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" style={{ width: '100%', height: '100%' }}>
      <path d="M 22 6 L 38 6 L 56 17 L 60 28 L 50 33 L 50 74 L 10 74 L 10 33 L 0 28 L 4 17 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M 22 6 L 30 24 L 38 6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <line x1="30" y1="24" x2="30" y2="74" stroke={color} strokeWidth="1.5" strokeDasharray="3 3"/>
      <path d="M 13 30 L 13 52 M 16 33 L 16 54" stroke={color} strokeWidth="1" opacity="0.5"/>
      <path d="M 47 30 L 47 52 M 44 33 L 44 54" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

export default function CtaSocialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // CTA heading + subtext + button stagger
      gsap.from('.cta-heading', {
        y: 50, opacity: 0, duration: 0.6, ease: 'power3.out',
        clearProps: 'y,opacity',
        scrollTrigger: { trigger: '.cta-heading', start: 'top 85%', once: true },
      });
      gsap.from('.cta-sub', {
        y: 30, opacity: 0, duration: 0.5, delay: 0.15, ease: 'power3.out',
        clearProps: 'y,opacity',
        scrollTrigger: { trigger: '.cta-heading', start: 'top 85%', once: true },
      });
      gsap.from('.cta-btn', {
        scale: 0.85, opacity: 0, duration: 0.45, delay: 0.3, ease: 'back.out(2)',
        clearProps: 'scale,opacity',
        scrollTrigger: { trigger: '.cta-heading', start: 'top 85%', once: true },
      });

      // Divider draw
      gsap.from('.cta-divider', {
        scaleX: 0, opacity: 0, duration: 0.5, ease: 'power2.out',
        transformOrigin: 'left center',
        clearProps: 'scaleX,opacity',
        scrollTrigger: { trigger: '.cta-divider', start: 'top 90%', once: true },
      });

      // Rotation lives on the outer wrapper — y+opacity animate on the inner tile
      gsap.utils.toArray<HTMLElement>('.sns-outer').forEach((outer, i) => {
        const rot = ROTS[i] ?? 0;
        gsap.set(outer, { rotation: rot });
        const inner = outer.querySelector<HTMLElement>('.sns-tile');
        if (!inner) return;
        gsap.from(inner, {
          y: 60, opacity: 0, duration: 0.45, delay: i * 0.07,
          ease: 'back.out(1.8)',
          clearProps: 'y,opacity',
          scrollTrigger: { trigger: '.sns-grid', start: 'top 88%', once: true },
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
      background: '#fff',
      borderTop: '4px solid #111', borderBottom: '4px solid #111',
      padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,64px)',
      position: 'relative', overflow: 'hidden', textAlign: 'center',
      backgroundImage: [
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
        'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
      ].join(', '),
    }}>
      {/* Doodles */}
      <div style={{ position: 'absolute', top: '4%',    left: '21%',  width: 90, pointerEvents: 'none', opacity: 0.5,  transform: 'rotate(-14deg)' }}><StarSVG /></div>
      <div style={{ position: 'absolute', top: '3%',    right: '2%',  width: 90, pointerEvents: 'none', opacity: 0.45, transform: 'rotate(8deg)'   }}><WaveSVG /></div>
      <div style={{ position: 'absolute', bottom: '4%', left: '3%',   width: 52, pointerEvents: 'none', opacity: 0.5,  transform: 'rotate(10deg)'  }}><SpiralSVG /></div>
      <div style={{ position: 'absolute', bottom: '0%', right: '25%', width: 60, pointerEvents: 'none', opacity: 0.5,  transform: 'rotate(-8deg)'  }}><StarOutlineSVG /></div>
      <div style={{ position: 'absolute', top: '45%',   left: '1%',   width: 44, pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(20deg)'  }}><ZigzagSVG /></div>
      <div style={{ position: 'absolute', top: '42%',   right: '1%',  width: 40, pointerEvents: 'none', opacity: 0.45, transform: 'rotate(-18deg)' }}><DotSVG /></div>
      <div style={{ position: 'absolute', top: '27%',   right: '12.5%',width: 36, pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(19deg)'  }}><StarOutlineSVG /></div>
      <div style={{ position: 'absolute', top: '40%',   right: '24%', width: 58, pointerEvents: 'none', opacity: 0.35, transform: 'rotate(-6deg)'  }}><WaveSVG /></div>
      <div style={{ position: 'absolute', top: '62%',   right: '18%', width: 126,pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(-23deg)' }}><StarSVG /></div>
      <div style={{ position: 'absolute', top: '70%',   right: '2%',  width: 50, pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(11deg)'  }}><SpiralSVG /></div>
      <div style={{ position: 'absolute', top: '56%',   left: '3%',   width: 68, pointerEvents: 'none', opacity: 0.35, transform: 'rotate(8deg)'   }}><ZigzagSVG /></div>
      <div style={{ position: 'absolute', bottom: '14%',left: '1.5%', width: 32, pointerEvents: 'none', opacity: 0.45, transform: 'rotate(-14deg)' }}><DotSVG /></div>
      <div style={{ position: 'absolute', bottom: '10%',right: '3.5%',width: 44, pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(17deg)'  }}><StarOutlineSVG /></div>
      {/* Near-content interior doodles */}
      <div style={{ position: 'absolute', top: '10%',   left: '10%',  width: 38, pointerEvents: 'none', opacity: 0.3,  transform: 'rotate(-17deg)' }}><DotSVG /></div>
      <div style={{ position: 'absolute', top: '14%',   right: '10%', width: 32, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(21deg)'  }}><StarSVG /></div>
      <div style={{ position: 'absolute', top: '32%',   left: '12%',  width: 62, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(6deg)'   }}><ZigzagSVG /></div>
      <div style={{ position: 'absolute', top: '28%',   right: '23%', width: 50, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(-12deg)' }}><WaveSVG /></div>
      <div style={{ position: 'absolute', top: '47%',   left: '16%',  width: 50, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(14deg)'  }}><StarOutlineSVG /></div>
      <div style={{ position: 'absolute', top: '50%',   right: '14%', width: 28, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(-9deg)'  }}><DotSVG /></div>
      <div style={{ position: 'absolute', top: '63%',   left: '9%',   width: 85, pointerEvents: 'none', opacity: 0.3,  transform: 'rotate(-21deg)' }}><SpiralSVG /></div>
      <div style={{ position: 'absolute', top: '68%',   right: '9%',  width: 56, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(7deg)'   }}><WaveSVG /></div>
      <div style={{ position: 'absolute', top: '78%',   left: '18%',  width: 26, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(19deg)'  }}><StarSVG /></div>
      <div style={{ position: 'absolute', top: '82%',   right: '16%', width: 46, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(-14deg)' }}><ZigzagSVG /></div>

      {/* CTA */}
      <div style={{ maxWidth: 580, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* ③ barong near heading */}
        <div style={{ position: 'absolute', top: -10, right: -72, width: 54, height: 72, opacity: 0.45, transform: 'rotate(14deg)', pointerEvents: 'none' }}>
          <BarongSVG color={D_RED} />
        </div>
        <div style={{ position: 'absolute', top: 130, left: -68, width: 50, height: 66, opacity: 0.35, transform: 'rotate(-12deg)', pointerEvents: 'none' }}>
          <BarongSVG color="#111" />
        </div>
        <h2 className="cta-heading" style={{
          fontFamily: 'var(--font-klee)', fontWeight: 600,
          fontSize: 'clamp(3.2rem,9vw,6.5rem)',
          color: '#111', margin: '0 0 20px', lineHeight: 1.0,
          filter: 'url(#brush-stroke)',
        }}>
          Make it<br /><span style={{ color: D_RED }}>yours.</span>
        </h2>
        <p className="cta-sub" style={{
          color: '#333', fontWeight: 700,
          fontSize: 'clamp(0.95rem,2vw,1.1rem)', lineHeight: 1.7,
          marginBottom: 44,
        }}>
          Custom hand-embroidered barongs,<br />made just for you.
        </p>
        <div className="cta-btn">
          <button className="likha-btn-primary" style={{
            background: D_RED, border: '3px solid #111',
            borderRadius: '5.33333vw', padding: '14px 56px',
            fontFamily: 'var(--font-zen)', fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: '5px 5px 0 #111',
            letterSpacing: '0.1em', color: '#fff',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}>
            Applications Closed
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="cta-divider" style={{
        maxWidth: 860, margin: 'clamp(48px,7vh,80px) auto clamp(40px,6vh,64px)',
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ flex: 1, height: 3, background: '#111', borderRadius: 2 }} />
        <div style={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>Find us here</div>
        <div style={{ flex: 1, height: 3, background: '#111', borderRadius: 2 }} />
      </div>

      {/* Social tiles */}
      <div className="sns-grid" style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px,2vw,20px)' }}>
        {SNS_LINKS.map(({ label, sub, icon }, i) => (
          <div key={label} className="sns-outer" style={{ position: 'relative' }}>
            <a className="sns-tile" href="#" style={{
              textDecoration: 'none',
              background: BG_COLORS[i], border: '3px solid #111',
              borderRadius: 16, boxShadow: '5px 5px 0 #111',
              padding: 'clamp(16px,2.5vw,28px)',
              display: 'flex', flexDirection: 'column', gap: 6,
              color: TXT_COLORS[i],
              transition: 'box-shadow 0.15s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-zen)', fontWeight: 900, fontSize: 'clamp(1.1rem,2.2vw,1.6rem)' }}>{icon}</div>
              <div style={{ fontWeight: 900, fontSize: 'clamp(0.8rem,1.4vw,0.95rem)', lineHeight: 1.2 }}>{label}</div>
              <div style={{ fontSize: 'clamp(0.68rem,1.1vw,0.78rem)', opacity: 0.7, marginTop: 4 }}>{sub}</div>
              <div style={{ fontWeight: 900, fontSize: '1rem', textAlign: 'right', marginTop: 'auto' }}>→</div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
