import type { Metadata } from 'next';
import Image from 'next/image';
import { Zen_Kaku_Gothic_New, Noto_Sans_JP, Klee_One } from 'next/font/google';
import ClotheslineSection from './ClotheslineSection';
import SampleWorksSection from './SampleWorksSection';
import HowItWorksSection from './HowItWorksSection';
import CtaSocialsSection from './CtaSocialsSection';
import MissionSection from './MissionSection';

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-zen',
  display: 'swap',
});
const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
});
const kleeOne = Klee_One({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-klee',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Likhâ — Handpainted Barong Tagalog',
  description: 'Hand-embroidered barong tagalog. Each piece tells a story.',
};

// ── Design tokens (Kakuwaku) ──────────────────────────────────────────────────
const D_RED   = '#e60039';
const D_GREEN = '#8dc556';
const D_TEAL  = '#5BC8E0';
const D_ORG   = '#E87000';
const D_YELLOW = '#fff100';

// ── Colorful doodle SVG components ───────────────────────────────────────────

function DLightning({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 46 86" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 32 5 L 10 44 L 26 44 L 14 82 L 44 34 L 28 34 Z" fill={c} stroke="#111" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function DWave({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 130 38" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 6 26 Q 24 8 42 24 Q 62 38 82 22 Q 102 6 124 22" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function DStar({ c, outline = false }: { c: string; outline?: boolean }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 30 4 L 36 21 L 54 21 L 40 32 L 45 49 L 30 38 L 15 49 L 20 32 L 6 21 L 24 21 Z"
        fill={outline ? 'none' : c} stroke={c} strokeWidth={outline ? 3 : 1.5} strokeLinejoin="round"/>
    </svg>
  );
}
function DArrow({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 82 46" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 5 23 L 62 23 M 48 8 L 68 23 L 48 38" stroke={c} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
function DSpiral({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 30 30 Q 44 16 40 7 Q 34 0 22 5 Q 8 12 10 28 Q 13 46 30 48 Q 50 50 52 30 Q 54 8 30 6" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
function DRibbon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 34 96" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 24 6 Q 5 24 8 48 Q 5 72 24 90" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
function DZigzag({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 120 44" fill="none" style={{ width: '100%', height: '100%' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} d="M 6 34 L 24 10 L 42 34 L 60 10 L 78 34 L 96 10 L 114 34" stroke={c} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
function DConfetti({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 100 26" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect className="draw-in" pathLength={1} strokeDasharray={1} x="4" y="4" width="92" height="18" rx="9" fill={c} stroke={c} strokeWidth="2" transform="rotate(-4 50 13)"/>
    </svg>
  );
}
function DDot({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle className="draw-in" pathLength={1} strokeDasharray={1} cx="18" cy="18" r="14" fill="none" stroke={c} strokeWidth="4"/>
    </svg>
  );
}

function DBarong({ c, size = 120 }: { c: string; size?: number }) {
  return (
    <svg viewBox="0 0 80 110" fill="none" style={{ width: size, height: 'auto', display: 'block', filter: 'url(#crayon)' }}>
      <path className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 0s)' }}
        d="M 22 32 L 22 104 L 58 104 L 58 32" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 0.25s)' }}
        d="M 22 32 L 4 22 L 4 56 L 22 52" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 0.5s)' }}
        d="M 58 32 L 76 22 L 76 56 L 58 52" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 0.75s)' }}
        d="M 22 32 Q 30 28 40 42 Q 50 28 58 32" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <line className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 0.95s)' }}
        x1="40" y1="42" x2="40" y2="104" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path className="draw-in" pathLength={1} strokeDasharray={1} style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 1.15s)' }}
        d="M 22 104 Q 40 108 58 104" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="32" cy="60" r="2.5" fill={c} className="draw-in" style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 1.35s)' }}/>
      <circle cx="32" cy="72" r="2.5" fill={c} className="draw-in" style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 1.45s)' }}/>
      <circle cx="48" cy="60" r="2.5" fill={c} className="draw-in" style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 1.55s)' }}/>
      <circle cx="48" cy="72" r="2.5" fill={c} className="draw-in" style={{ animationDelay: 'calc(var(--draw-delay, 0s) + 1.65s)' }}/>
    </svg>
  );
}

// ── Hero doodle positions (27 items, big + colorful) ─────────────────────────
function _unused() {
  const lineYs = [68, 90, 112, 134, 156, 178, 200, 222, 244];
  const sunRays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 480 268" fill="none" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }}>
      {/* Paper bg */}
      <rect x="4" y="4" width="472" height="260" rx="18" fill="#fffde8"/>
      {/* Lined paper */}
      {lineYs.map((y, i) => (
        <line key={y} className="draw-in" pathLength={1} strokeDasharray={1}
          x1="18" y1={y} x2="462" y2={y}
          stroke="#a8d8f0" strokeWidth="1.3"
          style={{ animationDelay: `${0.15 + i * 0.06}s`, animationDuration: '0.5s' }}
        />
      ))}
      {/* Red crayon border */}
      <rect className="draw-in" pathLength={1} strokeDasharray={1}
        x="5" y="5" width="470" height="258" rx="18"
        stroke={D_RED} strokeWidth="10" fill="none"
        style={{ animationDelay: '0s', animationDuration: '1.1s', filter: 'url(#crayon)' }}
      />
      {/* Sun — top-left */}
      <g style={{ filter: 'url(#crayon)' }}>
        <circle className="draw-in" pathLength={1} strokeDasharray={1}
          cx="58" cy="48" r="20" fill="#FFD700" stroke="#E87000" strokeWidth="2.5"
          style={{ animationDelay: '0.35s' }}/>
        {sunRays.map((deg, i) => {
          const r = Math.PI / 180 * deg;
          return <line key={deg} className="draw-in" pathLength={1} strokeDasharray={1}
            x1={58 + 24 * Math.cos(r)} y1={48 + 24 * Math.sin(r)}
            x2={58 + 33 * Math.cos(r)} y2={48 + 33 * Math.sin(r)}
            stroke="#E87000" strokeWidth="3" strokeLinecap="round"
            style={{ animationDelay: `${0.42 + i * 0.04}s` }}/>;
        })}
        <circle cx="52" cy="46" r="2.2" fill="#E87000"/>
        <circle cx="64" cy="46" r="2.2" fill="#E87000"/>
        <path d="M 50 54 Q 58 60 66 54" stroke="#E87000" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </g>
      {/* Lightning */}
      <path className="draw-in" pathLength={1} strokeDasharray={1}
        d="M 244 10 L 232 36 L 242 36 L 230 58 L 258 28 L 246 28 Z"
        fill="#5BC8E0" stroke="#111" strokeWidth="1.5"
        style={{ animationDelay: '0.3s', filter: 'url(#crayon)' }}
      />
      {/* "q" doodle */}
      <text x="170" y="46" fill="#8dc556" fontSize="26" fontWeight="700"
        style={{ fontFamily: 'Georgia, serif', animationDelay: '0.5s' }}
        className="logo-text-reveal">q</text>
      {/* Star */}
      <path className="draw-in" pathLength={1} strokeDasharray={1}
        d="M 72 108 L 76 120 L 89 120 L 79 128 L 83 140 L 72 132 L 61 140 L 65 128 L 55 120 L 68 120 Z"
        fill="#FFD700" stroke="#E87000" strokeWidth="1.8"
        style={{ animationDelay: '0.85s' }}
      />
      {/* "Likhâ" main text */}
      <text x="68" y="210"
        fill="#1a3a8a" fontSize="116" fontWeight="600" letterSpacing="-1"
        style={{ fontFamily: 'var(--font-klee), cursive', animationDelay: '0.65s' }}
        className="logo-text-reveal"
      >Likhâ</text>
      {/* subtitle */}
      <text x="240" y="246"
        fill="#555" fontSize="20" textAnchor="middle"
        style={{ fontFamily: 'Georgia, serif', animationDelay: '0.95s' }}
        className="logo-text-reveal"
      >hand-drawn barongs</text>
      {/* Heart */}
      <path className="draw-in" pathLength={1} strokeDasharray={1}
        d="M 428 116 C 428 110 424 106 419 106 C 416 106 414 108 413 110 C 412 108 410 106 407 106 C 402 106 398 110 398 116 C 398 122 406 129 413 136 C 420 129 428 122 428 116 Z"
        fill={D_RED}
        style={{ animationDelay: '0.75s', filter: 'url(#crayon)' }}
      />
      {/* Stick figure */}
      {[
        { el: 'circle', cx: 425, cy: 162, r: 10, style: { animationDelay: '1.05s' } },
      ].map((_, i) => null)}
      <circle className="draw-in" pathLength={1} strokeDasharray={1} cx="425" cy="162" r="10" stroke="#555" strokeWidth="2.5" fill="none" style={{ animationDelay: '1.05s' }}/>
      <line className="draw-in" pathLength={1} strokeDasharray={1} x1="425" y1="172" x2="425" y2="200" stroke="#555" strokeWidth="2.5" strokeLinecap="round" style={{ animationDelay: '1.1s' }}/>
      <line className="draw-in" pathLength={1} strokeDasharray={1} x1="410" y1="183" x2="440" y2="183" stroke="#555" strokeWidth="2.5" strokeLinecap="round" style={{ animationDelay: '1.15s' }}/>
      <line className="draw-in" pathLength={1} strokeDasharray={1} x1="425" y1="200" x2="414" y2="218" stroke="#555" strokeWidth="2.5" strokeLinecap="round" style={{ animationDelay: '1.2s' }}/>
      <line className="draw-in" pathLength={1} strokeDasharray={1} x1="425" y1="200" x2="436" y2="218" stroke="#555" strokeWidth="2.5" strokeLinecap="round" style={{ animationDelay: '1.25s' }}/>
      {/* Squiggle */}
      <path className="draw-in" pathLength={1} strokeDasharray={1}
        d="M 26 250 Q 42 238 58 250 Q 74 262 90 250 Q 106 238 122 250"
        stroke="#8dc556" strokeWidth="4" strokeLinecap="round" fill="none"
        style={{ animationDelay: '1.1s', filter: 'url(#crayon)' }}
      />
    </svg>
  );
}

const HERO_DOODLES: Array<{
  top?: string; bottom?: string; left?: string; right?: string;
  w: number; h: number; r: number; s?: number;
  el: React.ReactElement;
}> = [
  // Top edge
  { top: '1%',  left: '0%',   w: 46, h: 86, r: -15, el: <DLightning c={D_RED}/> },
  { top: '0%',  left: '7%',   w: 60, h: 60, r: 20,  el: <DStar c={D_GREEN}/> },
  { top: '1%',  left: '16%',  w: 100,h: 26, r: -6,  el: <DConfetti c={D_TEAL}/> },
  { top: '0%',  left: '32%',  w: 60, h: 60, r: 30,  el: <DStar c={D_RED} outline/> },
  { top: '1%',  right: '30%', w: 82, h: 46, r: -18, el: <DArrow c={D_ORG}/> },
  { top: '0%',  right: '16%', w: 60, h: 60, r: -12, el: <DStar c={D_ORG}/> },
  { top: '2%',  right: '7%',  w: 130,h: 38, r: 10,  el: <DWave c={D_GREEN}/> },
  { top: '0%',  right: '0%',  w: 46, h: 86, r: 12,  el: <DLightning c={D_TEAL}/> },
  // Upper-mid
  { top: '13%', left: '0%',   w: 34, h: 96, r: 5,   el: <DRibbon c={D_RED}/> },
  { top: '12%', left: '8%',   w: 60, h: 60, r: -25, el: <DSpiral c={D_GREEN}/> },
  { top: '10%', left: '17%',  w: 120,h: 44, r: -5,  el: <DZigzag c={D_ORG}/> },
  { top: '11%', right: '14%', w: 60, h: 60, r: 18,  el: <DStar c={D_TEAL} outline/> },
  { top: '12%', right: '4%',  w: 60, h: 60, r: -28, el: <DStar c={D_RED}/> },
  // Mid
  { top: '30%', left: '2%',   w: 130,h: 38, r: 8,   el: <DWave c={D_ORG}/> },
  { top: '32%', left: '14%',  w: 36, h: 36, r: 0,   el: <DDot c={D_GREEN}/> },
  { top: '28%', right: '12%', w: 100,h: 26, r: 10,  el: <DConfetti c={D_RED}/> },
  { top: '30%', right: '1%',  w: 34, h: 96, r: -8,  el: <DRibbon c={D_GREEN}/> },
  // Lower-mid
  { bottom:'26%',left: '0%',  w: 46, h: 86, r: 18,  el: <DLightning c={D_ORG}/> },
  { bottom:'22%',left: '9%',  w: 82, h: 46, r: -12, el: <DArrow c={D_TEAL}/> },
  { bottom:'20%',left: '20%', w: 60, h: 60, r: 25,  el: <DSpiral c={D_RED}/> },
  { bottom:'22%',right: '7%', w: 60, h: 60, r: 10,  el: <DStar c={D_GREEN}/> },
  { bottom:'24%',right: '0%', w: 34, h: 96, r: -5,  el: <DRibbon c={D_TEAL}/> },
  // Bottom edge
  { bottom:'4%', left: '3%',  w: 60, h: 60, r: -10, el: <DStar c={D_TEAL}/> },
  { bottom:'2%', left: '13%', w: 100,h: 26, r: 6,   el: <DConfetti c={D_GREEN}/> },
  { bottom:'3%', left: '28%', w: 46, h: 86, r: -4,  el: <DLightning c={D_RED}/> },
  { bottom:'2%', right:'24%', w: 130,h: 38, r: -9,  el: <DWave c={D_RED}/> },
  { bottom:'3%', right: '9%', w: 60, h: 60, r: 22,  el: <DStar c={D_ORG} outline/> },
];

// ── Barong SVGs ──────────────────────────────────────────────────────────────

function BarongABC() {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 40 40 L 10 75 L 25 82 L 20 200 L 160 200 L 155 82 L 170 75 L 140 40 Q 120 30 90 30 Q 60 30 40 40Z" fill="#FAFAF5" stroke="#333" strokeWidth="2.5"/>
      <path d="M 70 38 L 90 65 L 110 38" fill="#FAFAF5" stroke="#333" strokeWidth="2"/>
      <path d="M 90 40 L 90 80" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3"/>
      <circle cx="90" cy="90" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="108" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="126" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <text x="35" y="110" fontSize="8" fill="#333" fontFamily="serif" transform="rotate(-5,35,110)">A B C</text>
      <text x="118" y="108" fontSize="8" fill="#333" fontFamily="serif" transform="rotate(4,118,108)">D E F</text>
      <text x="38" y="128" fontSize="7" fill="#555" fontFamily="serif">G H I J</text>
      <text x="112" y="130" fontSize="7" fill="#555" fontFamily="serif" transform="rotate(3,112,130)">K L M</text>
      <text x="42" y="150" fontSize="8" fill="#333" fontFamily="serif" transform="rotate(-3,42,150)">N O P</text>
      <text x="110" y="152" fontSize="8" fill="#333" fontFamily="serif">Q R S</text>
      <rect x="70" y="155" width="20" height="14" fill="none" stroke="#555" strokeWidth="1.5"/>
      <path d="M 67 157 L 80 146 L 93 157" fill="none" stroke="#555" strokeWidth="1.5"/>
      <rect x="77" y="160" width="6" height="9" fill="none" stroke="#555" strokeWidth="1"/>
      <text x="44" y="172" fontSize="10" fill={D_ORG}>★</text>
      <text x="118" y="170" fontSize="8" fill={D_ORG}>★</text>
      <text x="58" y="162" fontSize="7" fill="#555">9/10 VG!</text>
    </svg>
  );
}

function BarongHardin() {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 40 40 L 10 75 L 25 82 L 20 200 L 160 200 L 155 82 L 170 75 L 140 40 Q 120 30 90 30 Q 60 30 40 40Z" fill="#FAFAF5" stroke="#333" strokeWidth="2.5"/>
      <path d="M 70 38 L 90 65 L 110 38" fill="#FAFAF5" stroke="#333" strokeWidth="2"/>
      <path d="M 90 40 L 90 80" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3"/>
      <circle cx="90" cy="90" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="108" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="126" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="52" cy="105" r="8" fill="none" stroke={D_RED} strokeWidth="1.5"/>
      <circle cx="52" cy="105" r="3" fill={D_RED} opacity="0.6"/>
      <circle cx="128" cy="110" r="7" fill="none" stroke={D_GREEN} strokeWidth="1.5"/>
      <circle cx="128" cy="110" r="3" fill={D_GREEN} opacity="0.6"/>
      <path d="M 35 120 Q 45 112 55 120 Q 65 128 75 118" fill="none" stroke={D_GREEN} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 105 118 Q 115 110 125 118 Q 135 128 145 116" fill="none" stroke={D_GREEN} strokeWidth="1.5" strokeLinecap="round"/>
      <text x="76" y="185" fontSize="8" fill="#555" fontFamily="serif">Hardin</text>
    </svg>
  );
}

function BarongLangit() {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 40 40 L 10 75 L 25 82 L 20 200 L 160 200 L 155 82 L 170 75 L 140 40 Q 120 30 90 30 Q 60 30 40 40Z" fill="#FAFAF5" stroke="#333" strokeWidth="2.5"/>
      <path d="M 70 38 L 90 65 L 110 38" fill="#FAFAF5" stroke="#333" strokeWidth="2"/>
      <path d="M 90 40 L 90 80" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3"/>
      <circle cx="90" cy="90" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="108" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="126" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <path d="M 55 100 Q 62 88 72 93 Q 60 98 58 110 Q 50 108 55 100Z" fill="#555" opacity="0.6"/>
      <path d="M 128 100 L 130 106 L 136 106 L 131 110 L 133 116 L 128 112 L 123 116 L 125 110 L 120 106 L 126 106Z" fill={D_ORG} opacity="0.8"/>
      <text x="105" y="175" fontSize="8" fill="#555" fontFamily="serif">Langit</text>
    </svg>
  );
}

function BarongLungsod() {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 40 40 L 10 75 L 25 82 L 20 200 L 160 200 L 155 82 L 170 75 L 140 40 Q 120 30 90 30 Q 60 30 40 40Z" fill="#FAFAF5" stroke="#333" strokeWidth="2.5"/>
      <path d="M 70 38 L 90 65 L 110 38" fill="#FAFAF5" stroke="#333" strokeWidth="2"/>
      <path d="M 90 40 L 90 80" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3"/>
      <circle cx="90" cy="90" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="108" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <circle cx="90" cy="126" r="4" fill="#ddd" stroke="#999" strokeWidth="1"/>
      <rect x="30" y="130" width="10" height="45" fill="none" stroke="#333" strokeWidth="1.5"/>
      <rect x="42" y="118" width="12" height="57" fill="none" stroke="#333" strokeWidth="1.5"/>
      <rect x="56" y="125" width="10" height="50" fill="none" stroke="#333" strokeWidth="1.5"/>
      <rect x="120" y="120" width="12" height="55" fill="none" stroke="#333" strokeWidth="1.5"/>
      <rect x="134" y="126" width="10" height="49" fill="none" stroke="#333" strokeWidth="1.5"/>
      <line x1="25" y1="175" x2="155" y2="175" stroke="#333" strokeWidth="1.5"/>
      <text x="72" y="190" fontSize="8" fill="#555" fontFamily="serif">Lungsod</text>
    </svg>
  );
}

// ── Clothesline components ────────────────────────────────────────────────────

// ── Mascot ────────────────────────────────────────────────────────────────────

function BarongMascot({ color = '#333', accent = D_ORG }: { color?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="30" cy="18" r="13" fill="#f0d8c0" stroke={color} strokeWidth="1.5"/>
      <path d="M 18 12 Q 24 6 30 8 Q 36 6 42 12" fill={color} stroke={color} strokeWidth="1"/>
      <circle cx="25" cy="17" r="3" fill={color}/>
      <circle cx="35" cy="17" r="3" fill={color}/>
      <circle cx="26" cy="16" r="1.2" fill="#fff"/>
      <circle cx="36" cy="16" r="1.2" fill="#fff"/>
      <path d="M 25 23 Q 30 27 35 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 15 32 L 8 42 L 14 44 L 12 75 L 48 75 L 46 44 L 52 42 L 45 32 Q 38 28 30 28 Q 22 28 15 32Z" fill="#FAFAF5" stroke={color} strokeWidth="1.5"/>
      <path d="M 24 32 L 30 40 L 36 32" fill="#FAFAF5" stroke={color} strokeWidth="1"/>
      <path d="M 18 52 Q 22 49 26 52 Q 30 55 34 52 Q 38 49 42 52" fill="none" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 19 60 Q 23 57 27 60 Q 31 63 35 60 Q 39 57 41 60" fill="none" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="20" y="72" width="8" height="16" rx="2" fill="#e8d4c0" stroke={color} strokeWidth="1"/>
      <rect x="32" y="72" width="8" height="16" rx="2" fill="#e8d4c0" stroke={color} strokeWidth="1"/>
      <ellipse cx="24" cy="89" rx="7" ry="3" fill={color}/>
      <ellipse cx="36" cy="89" rx="7" ry="3" fill={color}/>
    </svg>
  );
}


const MASCOT_CONFIGS = [
  { color: '#333',    accent: D_ORG   },
  { color: '#333',    accent: D_RED   },
  { color: '#2a5c2a', accent: D_GREEN },
  { color: '#1a3a6a', accent: D_TEAL  },
  { color: '#5c1a2a', accent: D_RED   },
  { color: '#333',    accent: D_YELLOW},
];

const SNS_LINKS = [
  { label: 'Official Site', sub: 'likha-barong.com',  hue: 0,   icon: 'WEB' },
  { label: 'X / Twitter',   sub: '@likha_barong',      hue: 160, icon: 'X'   },
  { label: 'Instagram',     sub: '@likha_barong',      hue: 200, icon: 'IG'  },
  { label: 'Shop Now',      sub: 'Browse the store →', hue: 100, icon: 'BUY' },
  { label: 'Custom Order',  sub: 'Made just for you',  hue: 50,  icon: 'CUS' },
  { label: 'About Us',      sub: 'Our story',          hue: 280, icon: 'US'  },
];

export default function LikhaPage() {
  return (
    <>
    <div
      className={`${zenKaku.variable} ${notoJP.variable} ${kleeOne.variable}`}
      style={{
        fontFamily: 'var(--font-zen), var(--font-noto), sans-serif',
        background: '#FFEE00',
        color: '#000',
        minHeight: '100vh',
        overflowX: 'hidden',
        backgroundImage: [
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 30px)',
        ].join(', '),
      }}
    >

      {/* SVG filters */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', overflow: 'hidden' }}>
        <defs>
          <filter id="brush-stroke" x="-8%" y="-15%" width="116%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.06" numOctaves="3" seed="8" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="crayon" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency="0.055 0.075" numOctaves="4" seed="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
            <feGaussianBlur in="displaced" stdDeviation="0.6"/>
          </filter>
        </defs>
      </svg>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 24, zIndex: 100,
        padding: '0 clamp(16px,4vw,48px)',
        marginTop: 24,
        pointerEvents: 'none',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64,
          background: '#fff',
          border: '3px solid #000',
          borderRadius: 9999,
          padding: '0 clamp(16px,3vw,36px)',
          boxShadow: '4px 4px 0 #111',
          pointerEvents: 'auto',
        }}>
          <a href="/playground/likha" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Image src="/playground/likha/logo.png" alt="Likhâ" width={120} height={60} style={{ objectFit: 'contain', height: 48, width: 'auto' }} priority />
          </a>
          <a href="#collection" className="nav-cta" style={{
            display: 'inline-block',
            background: D_RED, color: '#fff',
            border: '2.5px solid #111', borderRadius: '5.33333vw',
            padding: '10px 28px', fontWeight: 900, fontSize: '0.82rem',
            textDecoration: 'none', boxShadow: '3px 3px 0 #111',
            letterSpacing: '0.04em',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}>
            View Collection
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hero-section" style={{
        position: 'relative', minHeight: 'calc(100vh - 67px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,64px)', overflow: 'hidden',
      }}>

        {/* Dense colorful doodles */}
        {HERO_DOODLES.map((d, i) => (
          <div key={i} className="hero-doodle" style={{
            position: 'absolute',
            top: d.top, bottom: d.bottom, left: d.left, right: d.right,
            width: d.w, height: d.h,
            transform: `rotate(${d.r}deg)`,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            {d.el}
          </div>
        ))}

        {/* Doodle barong — left  (draw@0s → float@2.5s) */}
        <div className="barong-float" style={{
          position: 'absolute', left: 'clamp(16px,5vw,72px)', top: '50%',
          transform: 'translateY(-50%) rotate(-9deg)',
          zIndex: 2, pointerEvents: 'none',
          ['--draw-delay' as string]: '0s', animationDelay: '2.5s',
        }}>
          <DBarong c={D_RED} size={160} />
        </div>

        {/* Doodle barong — right top  (draw@0.4s → float@2.9s) */}
        <div className="barong-float" style={{
          position: 'absolute', right: 'clamp(16px,5vw,72px)', top: '12%',
          transform: 'rotate(11deg)',
          zIndex: 2, pointerEvents: 'none',
          ['--draw-delay' as string]: '0.4s', animationDelay: '2.9s',
        }}>
          <DBarong c={D_TEAL} size={130} />
        </div>

        {/* Doodle barong — right bottom  (draw@0.8s → float@3.3s) */}
        <div className="barong-float" style={{
          position: 'absolute', right: 'clamp(16px,7vw,100px)', bottom: '10%',
          transform: 'rotate(-7deg)',
          zIndex: 2, pointerEvents: 'none',
          ['--draw-delay' as string]: '0.8s', animationDelay: '3.3s',
        }}>
          <DBarong c={D_GREEN} size={110} />
        </div>

        {/* Doodle barong — top left  (draw@0.2s → float@2.7s) */}
        <div className="barong-float" style={{
          position: 'absolute', left: 'clamp(16px,8vw,120px)', top: '8%',
          transform: 'rotate(14deg)',
          zIndex: 2, pointerEvents: 'none',
          ['--draw-delay' as string]: '0.2s', animationDelay: '2.7s',
        }}>
          <DBarong c={D_ORG} size={105} />
        </div>

        {/* Doodle barong — bottom left  (draw@0.6s → float@3.1s) */}
        <div className="barong-float" style={{
          position: 'absolute', left: 'clamp(16px,6vw,90px)', bottom: '8%',
          transform: 'rotate(-12deg)',
          zIndex: 2, pointerEvents: 'none',
          ['--draw-delay' as string]: '0.6s', animationDelay: '3.1s',
        }}>
          <DBarong c={D_YELLOW} size={120} />
        </div>

        {/* Small doodles near the logo */}
        <div className="doodle-bob" style={{ position: 'absolute', top: '28%', left: '28%', width: 36, height: 36, transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '0.2s', animationDelay: '2.7s' }}><DStar c={D_RED} /></div>
        <div className="doodle-bob" style={{ position: 'absolute', top: '24%', right: '28%', width: 30, height: 30, transform: 'rotate(20deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '0.6s', animationDelay: '3.1s' }}><DSpiral c={D_TEAL} /></div>
        <div className="doodle-bob" style={{ position: 'absolute', top: '42%', left: '22%', width: 80, height: 26, transform: 'rotate(-8deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '0.4s', animationDelay: '2.9s' }}><DWave c={D_ORG} /></div>
        <div className="doodle-bob" style={{ position: 'absolute', top: '40%', right: '22%', width: 32, height: 32, transform: 'rotate(12deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '0.8s', animationDelay: '3.3s' }}><DStar c={D_GREEN} outline /></div>
        <div className="doodle-bob" style={{ position: 'absolute', bottom: '30%', left: '26%', width: 28, height: 28, transform: 'rotate(-20deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '0.3s', animationDelay: '2.8s' }}><DDot c={D_YELLOW} /></div>
        <div className="doodle-bob" style={{ position: 'absolute', bottom: '26%', right: '24%', width: 70, height: 22, transform: 'rotate(6deg)', pointerEvents: 'none', zIndex: 2, ['--draw-delay' as string]: '1.0s', animationDelay: '3.5s' }}><DZigzag c={D_RED} /></div>

        {/* Center logo */}
        <div style={{ textAlign: 'center', maxWidth: 520, zIndex: 3, position: 'relative' }}>
          <div className="hero-text-reveal" style={{ fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, color: '#444', animationDelay: '0.2s' }}>
            Made with love, for you.
          </div>
          <Image
            src="/playground/likha/logo.png"
            alt="Likhâ — hand-drawn barongs"
            width={400} height={230}
            className="logo-pop-in"
            style={{ objectFit: 'contain', maxWidth: 'min(400px, 58vw)', height: 'auto' }}
            priority
          />
          <p className="hero-text-reveal" style={{ marginTop: 24, fontSize: 'clamp(0.9rem,1.5vw,1.08rem)', color: '#333', lineHeight: 1.75, fontWeight: 500, animationDelay: '0.5s' }}>
            Hand-embroidered Barong Tagalog.<br />
            Every piece tells your story.
          </p>
          <div className="hero-text-reveal" style={{ marginTop: 32, animationDelay: '0.8s' }}>
            <a href="#collection" className="nav-cta" style={{
              display: 'inline-block',
              background: D_RED, color: '#fff',
              border: '2.5px solid #111',
              borderRadius: '5.33333vw', padding: '14px 48px',
              fontWeight: 900, fontSize: '0.95rem', textDecoration: 'none',
              boxShadow: '4px 4px 0 #111', letterSpacing: '0.04em',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}>
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission (client, GSAP ScrollTrigger) ─────────────────────────── */}
      <MissionSection />

      {/* ── Current Collection — clothesline (client, GSAP ScrollTrigger) ── */}
      <ClotheslineSection />

      {/* ── How It Works (client, GSAP ScrollTrigger) ────────────────────── */}
      <HowItWorksSection />

      {/* ── Sample Works (client, GSAP ScrollTrigger) ───────────────────── */}
      <SampleWorksSection />

      {/* ── CTA + Socials (client, GSAP ScrollTrigger) ───────────────────── */}
      <CtaSocialsSection />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }

        /* ── Button hovers ── */
        .nav-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #111 !important;
        }
        .likha-btn-primary:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #111 !important;
        }
        .sns-tile:hover {
          box-shadow: 7px 7px 0 #111 !important;
        }
        .works-card a:hover {
          background: #111 !important;
          color: #fff !important;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #111 !important;
        }
        .back-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #e60039 !important;
        }

        /* ── SVG draw-in (hero only) ── */
        @keyframes drawIn {
          from { stroke-dashoffset: 1; opacity: 0; }
          to   { stroke-dashoffset: 0; opacity: 1; }
        }
        .hero-section .draw-in {
          animation: drawIn 1.4s cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: var(--draw-delay, 0s);
        }
        @keyframes textReveal {
          from { opacity: 0; translate: 0 8px; }
          to   { opacity: 1; translate: 0 0; }
        }
        .hero-section .logo-text-reveal {
          animation: textReveal 0.5s ease both;
          animation-delay: inherit;
        }
        @keyframes heroTextReveal {
          from { opacity: 0; translate: 0 16px; }
          to   { opacity: 1; translate: 0 0; }
        }
        .hero-text-reveal {
          animation: heroTextReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes logoPop {
          0%   { opacity: 0; scale: 0.82; rotate: -4deg; }
          65%  { scale: 1.06; rotate: 1.5deg; }
          100% { opacity: 1; scale: 1; rotate: 0deg; }
        }
        .logo-pop-in {
          animation: logoPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: 0.1s;
        }

        /* ── Continuous hero animations ── */
        @keyframes barongFloat {
          0%, 100% { translate: 0 0; }
          50%       { translate: 0 -14px; }
        }
        @keyframes doodleBob {
          0%, 100% { translate: 0 0; scale: 1; }
          50%       { translate: 0 -8px; scale: 1.08; }
        }
        @keyframes sunSpin {
          to { rotate: 360deg; }
        }
        @keyframes cloudDrift {
          0%, 100% { translate: 0 0; }
          50%       { translate: 14px 0; }
        }

        .barong-float {
          animation: barongFloat 4s ease-in-out infinite;
        }
        .doodle-bob {
          animation: doodleBob 3s ease-in-out infinite;
        }
        .sun-spin {
          animation: sunSpin 18s linear infinite;
          transform-origin: center;
        }
        .cloud-drift {
          animation: cloudDrift 6s ease-in-out infinite;
        }

        /* ── Rope draw-in ── */
        @keyframes ropeDraw {
          to { stroke-dashoffset: 0; }
        }
        .rope-draw {
          animation: ropeDraw 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* ── Scroll reveals ── */
        @keyframes scrollFadeUp {
          from { opacity: 0; translate: 0 36px; }
          to   { opacity: 1; translate: 0 0; }
        }
        @keyframes scrollFadeIn {
          from { opacity: 0; scale: 0.96; }
          to   { opacity: 1; scale: 1; }
        }

        @supports (animation-timeline: view()) {
          .scroll-reveal {
            animation-name: scrollFadeUp;
            animation-duration: auto;
            animation-timing-function: linear;
            animation-fill-mode: both;
            animation-timeline: view();
            animation-range: entry 5% entry 35%;
          }
          .scroll-card {
            animation-name: scrollFadeIn;
            animation-duration: auto;
            animation-timing-function: linear;
            animation-fill-mode: both;
            animation-timeline: view();
            animation-range: entry 5% entry 40%;
          }
        }
.exp-item {
          transform: rotate(var(--rot, 0deg));
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .exp-item:hover,
        .exp-item:active {
          transform: rotate(var(--rot, 0deg));
          z-index: 20 !important;
        }
        .exp-item:has(~ .exp-item:hover),
        .exp-item:has(~ .exp-item:active) {
          transform: rotate(var(--rot, 0deg)) translateX(-70px);
        }
        .exp-item:hover ~ .exp-item,
        .exp-item:active ~ .exp-item {
          transform: rotate(var(--rot, 0deg)) translateX(70px);
        }
        .exp-overlay {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .exp-item:hover .exp-overlay,
        .exp-item:active .exp-overlay {
          opacity: 1;
        }
        .exp-barong {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }
        .exp-item:hover .exp-barong,
        .exp-item:active .exp-barong {
          transform: none;
          filter:
            drop-shadow(4px 0 0 var(--pin-color))
            drop-shadow(-4px 0 0 var(--pin-color))
            drop-shadow(0 4px 0 var(--pin-color))
            drop-shadow(0 -4px 0 var(--pin-color))
            drop-shadow(3px 3px 0 var(--pin-color))
            drop-shadow(-3px 3px 0 var(--pin-color))
            drop-shadow(3px -3px 0 var(--pin-color))
            drop-shadow(-3px -3px 0 var(--pin-color));
        }
        /* ── Mobile responsive ──────────────────────────────────────── */
        @media (max-width: 640px) {
          /* Hero: hide outer doodles + large barong floats for clean layout */
          .hero-doodle { display: none !important; }
          .barong-float { display: none !important; }

          /* Nav CTA */
          .nav-cta { padding: 8px 14px !important; font-size: 0.72rem !important; }

          /* Social tiles: 2 columns */
          .sns-grid { grid-template-columns: repeat(2, 1fr) !important; }

          /* CTA button */
          .cta-btn .likha-btn-primary { padding: 12px 28px !important; }

          /* Cork board thinner border */
          .works-board { border-width: 6px !important; }

          /* HIW heading: wrap and hide the heart */
          .hiw-heading { flex-wrap: wrap !important; }
          .hiw-heart { display: none !important; }

          /* Clothesline: swipeable on mobile */
          .clothesline-inner { padding: 0 !important; }
          .barong-scroll-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .barong-scroll-wrapper::-webkit-scrollbar { display: none; }
          /* Left-align so content starts at edge, not behind overflow clip */
          .barong-row { justify-content: flex-start !important; padding: 0 16px; }
          /* 250px barongs + overlap showing ~130px of each */
          .exp-barong { width: 250px !important; }
          .barong-row .exp-item + .exp-item { margin-left: -150px !important; }
          /* Name tag: pull closer to barong on mobile */
          .exp-overlay-left { left: 70% !important; }

          /* Back button */
          .back-btn { bottom: 16px !important; right: 12px !important; width: 44px !important; height: 44px !important; font-size: 0.95rem !important; }
        }

        /* Tablet: 2-col social tiles */
        @media (max-width: 768px) and (min-width: 641px) {
          .sns-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#111', padding: '28px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Image src="/playground/likha/logo.png" alt="Likhâ" width={100} height={50} style={{ objectFit: 'contain', height: 36, width: 'auto' }} />
          <span style={{ color: '#444', fontSize: '0.65rem' }}>© {new Date().getFullYear()} Likhâ. All rights reserved.</span>
        </div>
      </footer>

    </div>

    {/* ── Fixed back button — outside overflow wrapper so iOS fixed works ── */}
    <a href="/playground" aria-label="Back to playground" style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
      width: 56, height: 56, borderRadius: '50%',
      background: '#111', border: '3px solid #111',
      boxShadow: '4px 4px 0 ' + D_RED,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textDecoration: 'none', color: '#fff',
      fontSize: '1.2rem', fontWeight: 900,
      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    }}
      className="back-btn"
    >
      ←
    </a>
    </>
  );
}
