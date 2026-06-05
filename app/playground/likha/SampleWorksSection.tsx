'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const D_RED    = '#e60039';
const D_TEAL   = '#5BC8E0';
const D_GREEN  = '#8dc556';
const D_ORG    = '#E87000';
const D_YELLOW = '#fff100';

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
function HeartSVG({ color = '#e60039' }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <path d="M 30 50 C 18 38 4 30 4 17 C 4 9 10 3 18 3 C 22 3 26 5 30 9 C 34 5 38 3 42 3 C 50 3 56 9 56 17 C 56 30 42 38 30 50 Z" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  );
}

const ALL_BARONGS = [
  { img: '/playground/likha/barong-manila.png',      name: 'MANILA',      price: '₱4,200' },
  { img: '/playground/likha/barong-mabuhay.png',     name: 'MABUHAY',     price: '₱3,800' },
  { img: '/playground/likha/barong-harmony.png',     name: 'HARMONY',     price: '₱3,600' },
  { img: '/playground/likha/barong-playtime.png',    name: 'PLAYTIME',    price: '₱3,800' },
  { img: '/playground/likha/barong-alphabet.png',    name: 'ALPHABET',    price: '₱3,600' },
  { img: '/playground/likha/barong-filipiniana.png', name: 'FILIPINIANA', price: '₱4,200' },
  { img: '/playground/likha/barong-funday.png',      name: 'FUN DAY',     price: '₱3,800' },
  { img: '/playground/likha/barong-harvest.png',     name: 'HARVEST',     price: '₱3,600' },
  { img: '/playground/likha/barong-harrmonny.png',   name: 'HARRMONNY',   price: '₱3,800' },
  { img: '/playground/likha/barong-hay.png',         name: 'HAY!',        price: '₱3,600' },
];

const NOTE_COLORS = [D_YELLOW, '#ffd6e0', '#c8f7c5', '#c8eaf7', '#ffd9b3', '#e8c8f7'];
const PIN_COLORS  = [D_RED, D_TEAL, D_GREEN, D_ORG, D_RED, D_GREEN, D_TEAL, D_ORG, D_RED, D_GREEN];
const ROTS        = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5, -1, 3.5];

export default function SampleWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading slides up
      gsap.from('.works-heading', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'y,opacity',
        scrollTrigger: {
          trigger: '.works-heading',
          start: 'top 88%',
          once: true,
        },
      });

      // Each card gets its own trigger; delay is based on horizontal position
      // so cards in the same row still stagger left → right per card
      const board = sectionRef.current?.querySelector('.works-board') as HTMLElement;
      const boardLeft = board?.getBoundingClientRect().left ?? 0;
      const boardWidth = board?.clientWidth ?? 1;

      gsap.utils.toArray<HTMLElement>('.works-card').forEach((card) => {
        const rot      = parseFloat(card.dataset.rot ?? '0');
        const cardLeft = card.getBoundingClientRect().left;
        const delay    = ((cardLeft - boardLeft) / boardWidth) * 0.3;

        // Rotation lives on outer — never touched by the y/opacity tween
        gsap.set(card, { rotation: rot });

        // y + opacity animate on the inner wrapper only
        const inner = card.querySelector<HTMLElement>('.works-card-inner');
        if (!inner) return;
        gsap.from(inner, {
          y: 80,
          opacity: 0,
          duration: 0.45,
          delay,
          ease: 'power3.out',
          clearProps: 'y,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
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
    <section ref={sectionRef} id="collection" style={{
      padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,64px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Doodles */}
      <div style={{ position: 'absolute', top: '3%',    left: '1%',   width: 48,  pointerEvents: 'none', opacity: 0.45, transform: 'rotate(-18deg)' }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_RED} stroke={D_RED} strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '5%',    right: '1.5%',width: 82,  pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(9deg)'   }}>
        <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_TEAL} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '31%',   left: '0.5%', width: 52,  pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(14deg)'  }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_GREEN} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '22%',   right: '0.5%',width: 34,  pointerEvents: 'none', opacity: 0.45, transform: 'rotate(-22deg)' }}>
        <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="18" r="14" fill="none" stroke={D_ORG} strokeWidth="4"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '54%',   right: '1%',  width: 44,  pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(7deg)'   }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_YELLOW} strokeWidth="3" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '8%', left: '1%',   width: 56,  pointerEvents: 'none', opacity: 0.45, transform: 'rotate(-9deg)'  }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_RED} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '4%', right: '2%',  width: 64,  pointerEvents: 'none', opacity: 0.4,  transform: 'rotate(16deg)'  }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_TEAL} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      {/* Near-content interior doodles */}
      <div style={{ position: 'absolute', top: '7%',    left: '16%',  width: 38,  pointerEvents: 'none', opacity: 0.3,  transform: 'rotate(-16deg)' }}>
        <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}><circle cx="18" cy="18" r="14" fill="none" stroke={D_RED} strokeWidth="4"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '9%',    right: '18%', width: 30,  pointerEvents: 'none', opacity: 0.28, transform: 'rotate(12deg)'  }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill={D_YELLOW} stroke={D_YELLOW} strokeWidth="1.5" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '17%',   left: '28%',  width: 56,  pointerEvents: 'none', opacity: 0.25, transform: 'rotate(7deg)'   }}>
        <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_GREEN} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', top: '32%', right: '25%', width: 62, pointerEvents: 'none', opacity: 0.28, transform: 'rotate(6deg)' }}>
        <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={D_RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '13%',left: '20%',  width: 34,  pointerEvents: 'none', opacity: 0.3,  transform: 'rotate(21deg)'  }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z" fill="none" stroke={D_ORG} strokeWidth="3" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ position: 'absolute', bottom: '10%',right: '22%', width: 48,  pointerEvents: 'none', opacity: 0.28, transform: 'rotate(-8deg)'  }}>
        <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={D_GREEN} strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>
              Handcrafted pieces
            </div>
            <h2 className="works-heading" style={{
              fontFamily: 'var(--font-klee)', fontWeight: 600,
              fontSize: 'clamp(2.4rem,6vw,4.5rem)', margin: 0, lineHeight: 1.15,
              filter: 'url(#brush-stroke)',
            }}>
              <span style={{ color: D_RED }}>Sample</span> Works
            </h2>
          </div>
          {/* ① barong doodle near heading */}
          <div style={{ width: 56, height: 74, opacity: 0.55, transform: 'rotate(8deg)', pointerEvents: 'none', flexShrink: 0 }}>
            <BarongSVG color={D_RED} />
          </div>
          {/* ⑤ extra doodle near heading */}
          <div style={{ width: 70, height: 20, opacity: 0.4, transform: 'rotate(-6deg)', pointerEvents: 'none', flexShrink: 0 }}>
            <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}><path d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={D_TEAL} strokeWidth="6" strokeLinecap="round" fill="none"/></svg>
          </div>
        </div>

        {/* Cork board */}
        <div className="works-board" style={{
          background: '#c4893a',
          backgroundImage: [
            'radial-gradient(ellipse at 18% 25%, rgba(160,95,20,0.55) 0%, transparent 38%)',
            'radial-gradient(ellipse at 72% 15%, rgba(190,130,45,0.45) 0%, transparent 32%)',
            'radial-gradient(ellipse at 45% 55%, rgba(130,70,10,0.4) 0%, transparent 42%)',
            'radial-gradient(ellipse at 85% 70%, rgba(175,115,35,0.5) 0%, transparent 36%)',
            'radial-gradient(ellipse at 10% 80%, rgba(200,145,55,0.4) 0%, transparent 30%)',
            'radial-gradient(ellipse at 60% 88%, rgba(145,85,15,0.45) 0%, transparent 35%)',
            'repeating-linear-gradient(12deg, transparent 0, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)',
            'repeating-linear-gradient(-18deg, transparent 0, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)',
            'repeating-linear-gradient(78deg, transparent 0, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 7px)',
            'repeating-linear-gradient(-72deg, transparent 0, transparent 9px, rgba(0,0,0,0.04) 9px, rgba(0,0,0,0.04) 10px)',
          ].join(','),
          border: '12px solid #4a2800',
          borderRadius: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 0 40px rgba(0,0,0,0.2)',
          padding: 'clamp(28px,4vw,48px)',
          position: 'relative',
        }}>
          {/* ② heart doodle floating on cork board */}
          <div style={{ position: 'absolute', top: 24, right: 32, width: 48, height: 44, opacity: 0.7, transform: 'rotate(12deg)', pointerEvents: 'none', zIndex: 0 }}>
            <HeartSVG color="#fff" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 36 }}>
            {ALL_BARONGS.map(({ img, name, price }, i) => (
              <div key={name} className="works-card" data-rot={ROTS[i % ROTS.length]} style={{ position: 'relative' }}>
                <div className="works-card-inner" style={{
                  background: NOTE_COLORS[i % NOTE_COLORS.length],
                  boxShadow: '4px 8px 16px rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative',
                  paddingTop: 14,
                }}>
                  {/* Pushpin */}
                  <div style={{
                    position: 'absolute', top: -10, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20, height: 20, borderRadius: '50%',
                    background: PIN_COLORS[i % PIN_COLORS.length],
                    border: '2px solid #111',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                    zIndex: 2,
                  }} />
                  {/* Barong image */}
                  <div style={{ position: 'relative', height: 230, background: 'rgba(255,255,255,0.72)', margin: '0 12px' }}>
                    <Image src={img} alt={name} fill style={{ objectFit: 'contain' }} />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '10px 14px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <span style={{ fontWeight: 900, fontSize: '0.8rem', color: '#111' }}>{name}</span>
                      <span style={{ fontWeight: 900, fontSize: '0.75rem', color: D_RED }}>{price}</span>
                    </div>
                    <a href="#" className="likha-btn-primary" style={{
                      display: 'block', textAlign: 'center', textDecoration: 'none',
                      background: '#111', color: '#fff',
                      border: '2px solid #111', borderRadius: '5.33333vw',
                      padding: '6px 0', fontWeight: 900, fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}>
                      Inquire →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
