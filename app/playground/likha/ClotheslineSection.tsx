'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const D_RED    = '#e60039';
const D_GREEN  = '#8dc556';
const D_TEAL   = '#5BC8E0';
const D_ORG    = '#E87000';
const D_YELLOW = '#fff100';

function Clothespin({ color = '#c4893a' }: { color?: string }) {
  return (
    <svg viewBox="0 0 22 38" fill="none" style={{ width: 22, height: 38, display: 'block' }}>
      <rect x="4" y="0" width="14" height="22" rx="7" fill={color} stroke="#111" strokeWidth="2.5"/>
      <line x1="7" y1="15" x2="7" y2="36" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      <line x1="15" y1="15" x2="15" y2="36" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="11" cy="13" r="4" fill="#555" stroke="#111" strokeWidth="2"/>
    </svg>
  );
}

function SunDoodle() {
  const rays = [0,45,90,135,180,225,270,315];
  return (
    <svg viewBox="0 0 90 90" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="45" cy="45" r="20" fill={D_YELLOW} stroke="#111" strokeWidth="3"/>
      {rays.map(a => {
        const r = Math.PI * a / 180;
        return (
          <line key={a}
            x1={45 + 24 * Math.cos(r)} y1={45 + 24 * Math.sin(r)}
            x2={45 + 36 * Math.cos(r)} y2={45 + 36 * Math.sin(r)}
            stroke="#111" strokeWidth="3.5" strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function CloudDoodle() {
  return (
    <svg viewBox="0 0 110 56" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="55" cy="42" rx="44" ry="14" fill="#fff" stroke="#111" strokeWidth="2.5"/>
      <circle cx="32" cy="34" r="16" fill="#fff" stroke="#111" strokeWidth="2.5"/>
      <circle cx="55" cy="24" r="20" fill="#fff" stroke="#111" strokeWidth="2.5"/>
      <circle cx="76" cy="32" r="14" fill="#fff" stroke="#111" strokeWidth="2.5"/>
    </svg>
  );
}

const EXP_BARONGS = [
  { img: '/playground/likha/exp-barong-1.png',  name: 'MANILA',      step: '01', stepTitle: 'Choose Your Design',     stepBody: 'Pick from hand-embroidered patterns inspired by Filipino culture and everyday life.' },
  { img: '/playground/likha/exp-barong-2.png',  name: 'MABUHAY',     step: '02', stepTitle: 'We Stitch It By Hand',   stepBody: 'Every Likhâ barong is embroidered by Filipino artisans — needle, thread, and care.' },
  { img: '/playground/likha/exp-barong-3.png',  name: 'HARMONY',     step: '03', stepTitle: 'Wear Your Story',        stepBody: 'Your finished barong arrives ready to wear — a one-of-a-kind piece from the maker.' },
  { img: '/playground/likha/exp-barong-4.png',  name: 'PLAYTIME',    step: '04', stepTitle: 'Want Something Custom?', stepBody: "Tell us your vision. We'll design a barong with your motifs, colors, and story." },
  { img: '/playground/likha/exp-barong-5.png',  name: 'FILIPINIANA', step: '05', stepTitle: 'Quality You Can Feel',   stepBody: 'Premium piña and jusi fabrics — lightweight, breathable, and built to last.' },
  { img: '/playground/likha/exp-barong-6.png',  name: 'HARVEST',     step: '06', stepTitle: 'Made With Love',         stepBody: 'Each piece is made with pride in the Philippines — culture you can wear every day.' },
  { img: '/playground/likha/exp-barong-7.png',  name: 'ALPHABET',    step: '07', stepTitle: 'Start Them Early',       stepBody: 'Introduce little ones to Filipino heritage through playful embroidered letters.' },
  { img: '/playground/likha/exp-barong-8.png',  name: 'FUNDAY',      step: '08', stepTitle: 'Dress Up, Play On',      stepBody: 'Bright and comfortable — perfect for celebrations and everyday adventures.' },
  { img: '/playground/likha/exp-barong-9.png',  name: 'HARRMONNY',   step: '09', stepTitle: 'Stitch by Stitch',       stepBody: 'Every thread is placed with intention — slow craft in a fast world.' },
  { img: '/playground/likha/exp-barong-10.png', name: 'HAY',         step: '10', stepTitle: 'Rooted in the Fields',   stepBody: 'Inspired by the everyday beauty of Philippine rural life and its harvest.' },
  { img: '/playground/likha/exp-barong-11.png', name: 'CITY',        step: '11', stepTitle: 'Modern Filipino',        stepBody: 'Traditional craft meets contemporary style — for the Filipino of today.' },
  { img: '/playground/likha/exp-barong-12.png', name: 'HERITAGE',    step: '12', stepTitle: 'Passed Down With Pride', stepBody: 'A garment that carries stories — from the hands that made it to the one who wears it.' },
];

export default function ClotheslineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.exp-item');
      if (!items?.length) return;

      // Read each item's natural x position before moving anything
      const naturalX    = Array.from(items).map(el => el.getBoundingClientRect().left);
      const offscreenX  = -window.innerWidth; // all items stack here, fully off-screen left

      // Stack all items at the same off-screen position
      Array.from(items).forEach((el, i) => {
        gsap.set(el, { x: offscreenX - naturalX[i] });
      });

      // Grass sway — continuous wind effect
      gsap.to('.grass-svg', {
        skewX: 4.8,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'bottom center',
      });

      // On scroll enter: each barong slides right to its own spot
      const isMobile = window.innerWidth <= 640;
      ScrollTrigger.create({
        trigger: '.barong-row',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(Array.from(items), {
            x: 0,
            duration: 0.75,
            stagger: isMobile ? 0.05 : 0.08,
            ease: isMobile ? 'power3.out' : 'back.out(2.2)',
            clearProps: 'x',
            onComplete: () => {
              if (isMobile) {
                const wrapper = sectionRef.current?.querySelector<HTMLElement>('.barong-scroll-wrapper');
                if (wrapper) wrapper.scrollLeft = 0;
              }
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pinColors  = [D_RED, D_TEAL, D_GREEN, D_ORG, D_RED, D_GREEN, D_TEAL, D_ORG, D_RED, D_GREEN, D_TEAL, D_ORG];
  const noteColors = [D_YELLOW, '#ffd6e0', '#c8f7c5', '#c8eaf7', '#ffd9b3', '#e8c8f7', D_YELLOW, '#ffd6e0', '#c8f7c5', '#c8eaf7', '#ffd9b3', '#e8c8f7'];
  const rots       = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      zIndex: 1,
      background: '#c8e8f7',
      backgroundImage: [
        'repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0, rgba(0,0,0,0.025) 1px, transparent 0, transparent 32px)',
        'repeating-linear-gradient(90deg, rgba(0,0,0,0.025) 0, rgba(0,0,0,0.025) 1px, transparent 0, transparent 32px)',
      ].join(','),
      borderTop: '4px solid #111', borderBottom: '4px solid #111',
      paddingBottom: 120,
    }}>
      {/* Sun */}
      <div className="sun-spin" style={{ position: 'absolute', top: 24, right: 'clamp(32px,6vw,96px)', width: 110, height: 110, pointerEvents: 'none', filter: 'url(#crayon)' }}>
        <SunDoodle />
      </div>
      {/* Clouds */}
      <div className="cloud-drift" style={{ position: 'absolute', top: 20, left: '10%', width: 160, height: 80, pointerEvents: 'none', filter: 'url(#crayon)' }}>
        <CloudDoodle />
      </div>
      <div className="cloud-drift" style={{ position: 'absolute', top: 36, left: '40%', width: 120, height: 60, pointerEvents: 'none', opacity: 0.8, filter: 'url(#crayon)', animationDelay: '1.5s' }}>
        <CloudDoodle />
      </div>

      {/* Section title */}
      <div style={{ textAlign: 'center', padding: 'clamp(80px,10vh,120px) 0 clamp(80px,10vh,120px)' }}>
        <h2 className="scroll-reveal" style={{
          fontFamily: 'var(--font-klee)', fontWeight: 600,
          fontSize: 'clamp(2.8rem,6vw,5rem)', margin: 0,
          filter: 'url(#brush-stroke)',
        }}>
          <span style={{ color: D_RED }}>Current</span> Collection
        </h2>
      </div>

      {/* Clothesline */}
      <div className="clothesline-inner" style={{ position: 'relative', padding: '0 clamp(16px,4vw,60px)' }}>
        {/* Rope */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 48, overflow: 'visible', pointerEvents: 'none', zIndex: 2, filter: 'url(#crayon)' }}
          viewBox="0 0 1200 48" preserveAspectRatio="none"
        >
          <path
            className="rope-draw"
            d="M 0 24 L 1200 24"
            stroke="#7a4010" strokeWidth="8" fill="none" strokeLinecap="round"
            strokeDasharray="1200" strokeDashoffset="1200"
          />
          {[150, 300, 480, 660, 840, 1010].map(x => (
            <ellipse key={x} cx={x} cy={22} rx={8} ry={5} fill="#5a2800" opacity={0.45}/>
          ))}
        </svg>

        {/* Barong row — wrapped for mobile swipe */}
        <div className="barong-scroll-wrapper" style={{ position: 'relative', zIndex: 3 }}>
        <div className="barong-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'nowrap' }}>
          {EXP_BARONGS.map(({ img, name, step, stepTitle }, i) => {
            const overlap   = i === 0 ? 0 : -260;
            const noteRight = i < 6;
            return (
              <div key={name} className="exp-item" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flexShrink: 0,
                ['--rot' as string]: `${rots[i]}deg`,
                ['--pin-color' as string]: pinColors[i],
                transformOrigin: 'top center',
                paddingTop: 4,
                marginLeft: overlap,
                position: 'relative',
                zIndex: i + 1,
                cursor: 'pointer',
              }}>
                <div style={{ position: 'relative', zIndex: 1, transform: 'scale(1.4)', transformOrigin: 'top center', marginBottom: 8 }}>
                  <Clothespin color={pinColors[i]} />
                </div>
                <Image
                  src={img} alt={name}
                  width={300} height={460}
                  className="exp-barong"
                  style={{ width: 'clamp(250px,25.2vw,372px)', height: 'auto', display: 'block', position: 'relative', zIndex: 2 }}
                />
                {/* Name tag */}
                <div className={`exp-overlay${noteRight ? ' exp-overlay-left' : ''}`} style={{
                  position: 'absolute',
                  top: '18%',
                  ...(noteRight ? { left: '82%' } : { right: '82%' }),
                  transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                  width: 'clamp(150px,15vw,200px)',
                  background: '#fff',
                  border: '2.5px solid #111',
                  boxShadow: '4px 5px 0 #111',
                  borderRadius: 6,
                  padding: '28px 14px 16px',
                  zIndex: 30,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                  <div style={{
                    position: 'absolute', top: -1, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 18, height: 18,
                    background: '#fff', border: '2.5px solid #111', borderRadius: '50%',
                  }} />
                  <svg style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', overflow: 'visible' }} width="2" height="28">
                    <line x1="1" y1="0" x2="1" y2="28" stroke="#7a4010" strokeWidth="2" strokeDasharray="3 2"/>
                  </svg>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: 10, background: noteColors[i],
                    borderRadius: '3px 3px 0 0', borderBottom: '2px solid #111',
                  }} />
                  <div style={{ fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase' }}>No. {step}</div>
                  <div style={{ fontFamily: 'var(--font-klee)', fontWeight: 600, fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: '#111', textAlign: 'center', lineHeight: 1.2 }}>{name}</div>
                  <div style={{ width: '80%', height: 2, background: '#111', borderRadius: 1 }} />
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#111', textAlign: 'center', lineHeight: 1.3 }}>{stepTitle}</div>
                </div>
              </div>
            );
          })}
        </div>
        </div>{/* /barong-scroll-wrapper */}
      </div>

      {/* Grass */}
      <svg className="grass-svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 72, display: 'block', filter: 'url(#crayon)' }}
        viewBox="0 0 1200 72" preserveAspectRatio="none">
        <path d="M 0 32 Q 15 10 30 28 Q 45 44 60 18 Q 75 4 90 26 Q 105 46 120 20 Q 135 2 150 30 Q 165 48 180 16 Q 195 0 210 28 Q 225 46 240 14 Q 255 0 270 24 Q 285 44 300 18 Q 315 4 330 28 Q 345 48 360 16 Q 375 2 390 26 Q 405 44 420 12 Q 435 0 450 28 Q 465 46 480 18 Q 495 4 510 30 Q 525 48 540 14 Q 555 0 570 24 Q 585 46 600 16 Q 615 2 630 28 Q 645 44 660 18 Q 675 4 690 26 Q 705 46 720 12 Q 735 0 750 30 Q 765 46 780 18 Q 795 4 810 28 Q 825 46 840 16 Q 855 2 870 24 Q 885 44 900 14 Q 915 0 930 26 Q 945 44 960 18 Q 975 6 990 28 Q 1005 46 1020 16 Q 1035 2 1050 26 Q 1065 44 1080 18 Q 1095 4 1110 28 Q 1125 46 1140 16 Q 1155 2 1170 24 Q 1185 42 1200 20 L 1200 72 L 0 72 Z"
          fill={D_GREEN} stroke="#111" strokeWidth="3"/>
      </svg>
    </section>
  );
}
