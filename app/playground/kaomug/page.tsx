'use client';
import { Noto_Sans_JP, Outfit } from 'next/font/google';
import { useEffect, useRef } from 'react';

const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

// ── Data ──────────────────────────────────────────────────────────────────────

const MUGS = [
  { img: '/kaomug/mug-specs.png',     name: 'Specs',  nameJP: '眼鏡',  role: 'ILLUSTRATOR',       roleJP: 'イラストレーター',       price: '₱980',   cardBg: '#9B6EC8', soldOut: false, avatar: 'glasses',    desc: 'Pink frames, blue shimmer. This one stops the room.' },
  { img: '/kaomug/mug-moon.png',      name: 'Moon',   nameJP: '月',    role: 'ARTIST / TALENT',   roleJP: 'アーティスト',           price: '₱1,080', cardBg: '#2AADA0', soldOut: true,  avatar: 'moon',       desc: 'Pink hair, crescent moon, silver eyes. Dreamy by design.' },
  { img: '/kaomug/mug-teal.png',      name: 'Teal',   nameJP: '翡翠',  role: 'GRAPHIC DESIGNER',  roleJP: 'グラフィックデザイナー', price: '₱980',   cardBg: '#D4522A', soldOut: false, avatar: 'gem',        desc: 'Teal hair and golden glasses. Cool, collected, always.' },
  { img: '/kaomug/mug-spacebuns.png', name: 'Cosmo',  nameJP: '宇宙',  role: 'TYPOGRAPHER',       roleJP: 'タイポグラフィユニット', price: '₱1,080', cardBg: '#C87E18', soldOut: true,  avatar: 'star',       desc: 'Space buns, starry vibes. Out of this world.' },
  { img: '/kaomug/mug-mint.png',      name: 'Mint',   nameJP: '薄荷',  role: 'ARTIST',            roleJP: 'アーティスト',           price: '₱1,180', cardBg: '#38A86A', soldOut: false, avatar: 'leaf',       desc: 'Mint hair, pink glasses. She cries glitter.' },
  { img: '/kaomug/mug-dark.png',      name: 'Nova',   nameJP: '星雲',  role: 'ILLUSTRATOR',       roleJP: 'イラストレーター',       price: '₱980',   cardBg: '#1A2E50', soldOut: false, avatar: 'sparkle',    desc: 'Dark buns, red frames, gold eyes. Night sky energy.' },
  { img: '/kaomug/mug-blue.png',      name: 'Azure',  nameJP: '碧空',  role: 'VOCALIST',          roleJP: 'ボーカリスト',           price: '₱980',   cardBg: '#2278C8', soldOut: false, avatar: 'music',      desc: 'Sky-blue twin tails. Her voice clears every cloud.' },
  { img: '/kaomug/mug-bun.png',       name: 'Bun',    nameJP: '団子',  role: 'CREATOR',           roleJP: 'クリエイター',           price: '₱1,080', cardBg: '#C84E8A', soldOut: false, avatar: 'heart',      desc: 'Single bun, big ideas. Quietly building something great.' },
  { img: '/kaomug/mug-buns2.png',     name: 'Sage',   nameJP: '賢者',  role: 'ANIMATOR',          roleJP: 'アニメーター',           price: '₱980',   cardBg: '#2A9E58', soldOut: true,  avatar: 'sprout',     desc: 'Green tones, gentle gaze. Every frame tells a story.' },
  { img: '/kaomug/mug-curly.png',     name: 'Curl',   nameJP: '巻き毛', role: 'MUSICIAN',         roleJP: 'ミュージシャン',         price: '₱1,080', cardBg: '#C88C10', soldOut: false, avatar: 'headphones', desc: 'Golden curls, warm heart. Always humming something new.' },
  { img: '/kaomug/mug-pink.png',      name: 'Bloom',  nameJP: '桜',    role: 'VOCALIST',          roleJP: 'ボーカリスト',           price: '₱980',   cardBg: '#E03E7A', soldOut: false, avatar: 'flower',     desc: 'Pink petals, soft power. Her smile is the main event.' },
  { img: '/kaomug/mug-updo.png',      name: 'Crown',  nameJP: '冠',    role: 'DIRECTOR',          roleJP: 'ディレクター',           price: '₱1,180', cardBg: '#6040B8', soldOut: true,  avatar: 'crown',      desc: 'Elegant updo, sharp eyes. She directs the whole show.' },
];

const ALL_IMGS = [
  { img: '/kaomug/mug-blue.png',      bg: '#2278C8' },
  { img: '/kaomug/mug-bun.png',       bg: '#C84E8A' },
  { img: '/kaomug/mug-curly.png',     bg: '#C88C10' },
  { img: '/kaomug/mug-specs.png',     bg: '#9B6EC8' },
  { img: '/kaomug/mug-pink.png',      bg: '#E03E7A' },
  { img: '/kaomug/mug-spacebuns.png', bg: '#C87E18' },
  { img: '/kaomug/mug-teal.png',      bg: '#D4522A' },
  { img: '/kaomug/mug-updo.png',      bg: '#6040B8' },
  { img: '/kaomug/mug-buns2.png',     bg: '#2A9E58' },
  { img: '/kaomug/mug-moon.png',      bg: '#2AADA0' },
  { img: '/kaomug/mug-mint.png',      bg: '#38A86A' },
  { img: '/kaomug/mug-dark.png',      bg: '#1A2E50' },
];

const MARQUEE_ITEMS = [...Array(4)].map(() =>
  'KAOMUG COLLECTION 2025 ★ CHARACTER MUG ★ HANDCRAFTED CERAMIC ★ LIMITED EDITION ★ '
);

function Avatar({ id, size = 16, color = 'currentColor' }: { id: string; size?: number; color?: string }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (id) {
    case 'glasses':    return <svg {...p}><circle cx="7" cy="12" r="3.5"/><circle cx="17" cy="12" r="3.5"/><path d="M10.5 12h3M1.5 12h2M20.5 12H23"/></svg>;
    case 'moon':       return <svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    case 'gem':        return <svg {...p}><polygon points="12 2 22 12 12 22 2 12"/></svg>;
    case 'star':       return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case 'leaf':       return <svg {...p}><path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.1 9.1c.2-.2 5.54-2 8.9 0"/></svg>;
    case 'sparkle':    return <svg {...p}><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>;
    case 'music':      return <svg {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    case 'heart':      return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
    case 'sprout':     return <svg {...p}><path d="M12 22V12"/><path d="M12 12a5 5 0 0 0 5-5c0-3-5-5-5-5S7 4 7 7a5 5 0 0 0 5 5z"/></svg>;
    case 'headphones': return <svg {...p}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
    case 'sun':        return <svg {...p}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
    case 'flower':     return <svg {...p}><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="6" rx="2" ry="4"/><ellipse cx="12" cy="18" rx="2" ry="4"/><ellipse cx="6" cy="12" rx="4" ry="2"/><ellipse cx="18" cy="12" rx="4" ry="2"/></svg>;
    case 'crown':      return <svg {...p}><path d="M3 19h18"/><polygon points="3 19 5 8 9.5 14 12 3 14.5 14 19 8 21 19"/></svg>;
    case 'coffee':     return <svg {...p}><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>;
    default: return null;
  }
}

function useReveal(threshold = 0.15) {
  const ref = useRef<any>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('km-visible'); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

function KaomugLogo({ height = 38 }: { height?: number }) {
  const vw = 68, vh = 82;
  const w = Math.round(height * vw / vh);
  return (
    <svg width={w} height={height} viewBox="0 0 68 82" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      {/* Handle — teal left */}
      <path d="M19 42 C6 42 6 60 19 60" stroke="#3ABBB4" strokeWidth="5.5" strokeLinecap="round"/>
      {/* Face skin */}
      <ellipse cx="38" cy="52" rx="21" ry="24" fill="#D4916A" stroke="#1C1410" strokeWidth="1.5"/>
      {/* Orange hair */}
      <ellipse cx="38" cy="28" rx="23" ry="22" fill="#E87000" stroke="#1C1410" strokeWidth="1.5"/>
      {/* Crescent moon (two overlapping ellipses) */}
      <ellipse cx="38" cy="16" rx="4.5" ry="5" fill="#FFD100"/>
      <ellipse cx="40.5" cy="16" rx="3.5" ry="4" fill="#E87000"/>
      {/* Gold star dots in hair */}
      <circle cx="25" cy="14" r="2.2" fill="#FFD100"/>
      <circle cx="38" cy="8"  r="1.8" fill="#FFD100"/>
      <circle cx="51" cy="13" r="2.2" fill="#FFD100"/>
      <circle cx="30" cy="9"  r="1.3" fill="#FFD100"/>
      <circle cx="46" cy="9"  r="1.3" fill="#FFD100"/>
      {/* Glasses left — teal shimmer + pink frame */}
      <rect x="18" y="54" width="16" height="11" rx="3" fill="#20C8BE" fillOpacity="0.6"/>
      <rect x="18" y="54" width="16" height="11" rx="3" stroke="#E0408A" strokeWidth="2.5"/>
      {/* Glasses right */}
      <rect x="37" y="54" width="16" height="11" rx="3" fill="#20C8BE" fillOpacity="0.6"/>
      <rect x="37" y="54" width="16" height="11" rx="3" stroke="#E0408A" strokeWidth="2.5"/>
      {/* Bridge */}
      <line x1="34" y1="59.5" x2="37" y2="59.5" stroke="#E0408A" strokeWidth="2.5"/>
      {/* Closed eyes */}
      <path d="M20 59.5 Q27 56.5 32 59.5" stroke="#5a2010" strokeWidth="2" strokeLinecap="round"/>
      <path d="M39 59.5 Q46 56.5 51 59.5" stroke="#5a2010" strokeWidth="2" strokeLinecap="round"/>
      {/* Lower lashes */}
      <line x1="21"   y1="61" x2="20.5" y2="63.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26.5" y1="62" x2="26.5" y2="64.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="32"   y1="61" x2="32.5" y2="63.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40"   y1="61" x2="39.5" y2="63.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="45.5" y1="62" x2="45.5" y2="64.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="51"   y1="61" x2="51.5" y2="63.5" stroke="#5a2010" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Cheek freckles */}
      <circle cx="28" cy="67" r="1.5" fill="#A06030" fillOpacity="0.45"/>
      <circle cx="48" cy="67" r="1.5" fill="#A06030" fillOpacity="0.45"/>
      {/* Nose */}
      <ellipse cx="38" cy="68.5" rx="2" ry="1.5" fill="#A06030" fillOpacity="0.35"/>
      {/* Lips */}
      <path d="M32 73 Q38 77 44 73" stroke="#C06050" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function KaomugPage() {
  const rosterRef  = useReveal(0.08);
  const detailRef  = useReveal(0.04);
  const taglineRef = useReveal(0.12);
  const footerRef  = useReveal(0.15);

  return (
    <div className={`${notoJP.variable} ${outfit.variable}`} style={{
      fontFamily: 'var(--font-noto), sans-serif',
      background: '#E87000',
      color: '#ffffff',
      overflowX: 'hidden',
    }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="km-nav-enter" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#E87000',
        borderBottom: '2.5px solid #FFD100',
        height: 64,
      }}>
        <div style={{
          maxWidth: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 40px)',
        }}>
          {/* Logo */}
          <a href="/playground" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <KaomugLogo height={42} />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#fff', letterSpacing: '-0.01em', fontFamily: 'var(--font-outfit), sans-serif' }}>KAOMUG</div>
              <div style={{ fontWeight: 400, fontSize: '0.55rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em' }}>STUDIO</div>
            </div>
          </a>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none', color: '#fff', fontSize: '0.58rem' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Account
            </a>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none', color: '#fff', fontSize: '0.58rem' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
            </a>
            <button aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 6 }}>
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 1 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero character grid — 2 scrolling rows ──────────────────────── */}
      <section style={{ height: 'calc(120vh - 64px)', display: 'flex', position: 'relative', padding: '20px 20px 0' }}>
        {/* Floating accents over hero */}
        <svg className="km-accent" style={{ top: '12%', right: '8%', animation: 'km-drift-a 4s ease-in-out infinite' }} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg className="km-accent" style={{ top: '60%', right: '22%', animation: 'km-drift-b 5.5s ease-in-out infinite 0.8s' }} width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)" stroke="none"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="km-accent" style={{ top: '30%', right: '3%', animation: 'km-drift-c 6s ease-in-out infinite 1.2s' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>
        <svg className="km-accent" style={{ top: '75%', right: '6%', animation: 'km-spin-slow 12s linear infinite' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,209,0,0.6)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <svg className="km-accent" style={{ top: '8%', right: '28%', animation: 'km-pulse 3.5s ease-in-out infinite 0.4s' }} width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg className="km-accent" style={{ top: '45%', right: '15%', animation: 'km-drift-a 7s ease-in-out infinite 2s' }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(91,200,224,0.7)" strokeWidth="1.5"><polygon points="12 2 22 12 12 22 2 12"/></svg>

        {/* Left accent panel */}
        <div className="km-hero-side-panel" style={{
          width: 52, flexShrink: 0,
          background: '#E87000',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
          position: 'absolute', left: 0, zIndex: 1, height: '30%', borderBottomRightRadius: 10,
        }}>
          <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff', lineHeight: 1 }}>×</span>
          <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: '2rem', color: '#fff', lineHeight: 1 }}>12</span>
          <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '0.48rem', color: '#fff', letterSpacing: '0.12em', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>CHARACTERS</span>
        </div>

        {/* Scrolling rows area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Row 1 — scrolls left */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%', animation: 'km-hero-row 22s linear infinite', width: 'max-content' }}>
              {[...MUGS, ...MUGS].map(({ img, name, role, cardBg, soldOut, avatar }, i) => (
                <div key={i} className="km-hero-tile" style={{
                  background: cardBg, height: '100%',
                  width: 'calc((100vw - 52px) / 4)',
                  position: 'relative', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', left: 10, top: '50%',
                    transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    whiteSpace: 'nowrap',
                  }}>
                    <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>{role}</span>
                    <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>{name}</span>
                  </div>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <div style={{
                    position: 'absolute', bottom: 12, left: 24,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  }}><Avatar id={avatar} size={16} /></div>
                  {soldOut && (
                    <div style={{
                      position: 'absolute', bottom: 10, right: 10, width: 58, height: 58,
                      background: '#F5F500',
                      clipPath: 'polygon(50% 0%, 61% 28%, 92% 14%, 76% 43%, 100% 50%, 76% 57%, 92% 86%, 61% 72%, 50% 100%, 39% 72%, 8% 86%, 24% 57%, 0% 50%, 24% 43%, 8% 14%, 39% 28%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.48rem', fontWeight: 900, lineHeight: 1.35, textAlign: 'center', color: '#000',
                    }}>
                      <div style={{ fontSize: '0.55rem' }}>SOLD</div>
                      <div style={{ fontSize: '0.55rem' }}>OUT!</div>
                      <div style={{ fontSize: '0.42rem' }}>THANK YOU</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%', animation: 'km-hero-row-rev 22s linear infinite', width: 'max-content' }}>
              {[...MUGS.slice(3), ...MUGS.slice(0, 3), ...MUGS.slice(3), ...MUGS.slice(0, 3)].map(({ img, name, role, cardBg, soldOut, avatar }, i) => (
                <div key={i} className="km-hero-tile" style={{
                  background: cardBg, height: '100%',
                  width: 'calc((100vw - 52px) / 4)',
                  position: 'relative', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', left: 10, top: '50%',
                    transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    whiteSpace: 'nowrap',
                  }}>
                    <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700, fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>{role}</span>
                    <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>{name}</span>
                  </div>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  <div style={{
                    position: 'absolute', bottom: 12, left: 24,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                  }}><Avatar id={avatar} size={16} /></div>
                  {soldOut && (
                    <div style={{
                      position: 'absolute', bottom: 10, right: 10, width: 58, height: 58,
                      background: '#F5F500',
                      clipPath: 'polygon(50% 0%, 61% 28%, 92% 14%, 76% 43%, 100% 50%, 76% 57%, 92% 86%, 61% 72%, 50% 100%, 39% 72%, 8% 86%, 24% 57%, 0% 50%, 24% 43%, 8% 14%, 39% 28%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.48rem', fontWeight: 900, lineHeight: 1.35, textAlign: 'center', color: '#000',
                    }}>
                      <div style={{ fontSize: '0.55rem' }}>SOLD</div>
                      <div style={{ fontSize: '0.55rem' }}>OUT!</div>
                      <div style={{ fontSize: '0.42rem' }}>THANK YOU</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 — color blocks, scrolls right */}
          <div style={{ flex: '0 0 60px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%', animation: 'km-hero-row-rev 20s linear infinite', width: 'max-content' }}>
              {[...['#9888C0','#E0A0B8','#C8AA60','#88B898','#C898B0','#7BABC8','#2A3C58','#D08878','#C8A464','#D4907A','#7BBAB0','#B8A0CC'],
                 ...['#9888C0','#E0A0B8','#C8AA60','#88B898','#C898B0','#7BABC8','#2A3C58','#D08878','#C8A464','#D4907A','#7BBAB0','#B8A0CC']].map((color, i) => (
                <div key={i} className="km-color-block" style={{ background: color, height: '100%', flexShrink: 0, width: 'calc((100vw - 52px) / 6)' }} />
              ))}
            </div>
          </div>

          {/* Row 4 — color blocks, scrolls left */}
          <div style={{ flex: '0 0 60px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%', animation: 'km-hero-row 13s linear infinite', width: 'max-content' }}>
              {[...['#B8A0CC','#7BBAB0','#D4907A','#C8A464','#D08878','#2A3C58','#7BABC8','#C898B0','#88B898','#C8AA60','#E0A0B8','#9888C0'],
                 ...['#B8A0CC','#7BBAB0','#D4907A','#C8A464','#D08878','#2A3C58','#7BABC8','#C898B0','#88B898','#C8AA60','#E0A0B8','#9888C0']].map((color, i) => (
                <div key={i} className="km-color-block" style={{ background: color, height: '100%', flexShrink: 0, width: 'calc((100vw - 52px) / 6)' }} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Giant collection title ───────────────────────────────────────── */}
      <div className="km-title-enter" style={{
        background: '#E87000',
        padding: 'clamp(12px, 2vw, 24px) 0 clamp(8px, 1.5vw, 16px)',
        overflow: 'visible',
      }}>
        <div style={{
          fontFamily: 'var(--font-outfit), var(--font-noto), sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 11vw, 12rem)',
          letterSpacing: '-0.025em',
          lineHeight: 0.95,
          color: '#E87000',
          whiteSpace: 'nowrap',
          padding: '20px 20px 0',
          marginTop: '-11%',
          textAlign: 'center',
        }}>
          KAOMUG 2025
        </div>
      </div>

      {/* ── Marquee strip ────────────────────────────────────────────────── */}
      <div style={{ background: '#E87000', overflow: 'hidden', padding: '10px 0', marginBottom: 50, borderTop: '1.5px solid rgba(255,255,255,0.25)', borderBottom: '1.5px solid rgba(255,255,255,0.25)' }}>
        <div style={{ display: 'flex', animation: 'km-marquee 18s linear infinite', width: 'max-content' }}>
          {MARQUEE_ITEMS.map((txt, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1.2vw, 0.88rem)', letterSpacing: '0.12em',
              color: '#fff', whiteSpace: 'nowrap', padding: '0 2px',
            }}>{txt}</span>
          ))}
        </div>
      </div>

      {/* ── "12 CHARACTERS × 顔MUG" lavender arch section ─────────────────── */}
      <section style={{ background: '#E87000', paddingTop: 0, position: 'relative' }}>
        {/* Floating badge above arch */}
        <div style={{
          position: 'absolute', top: 20, left: 'clamp(24px, 5vw, 60px)',
          width: 72, height: 72, zIndex: 1,
          background: '#fff',
          clipPath: 'polygon(50% 0%, 57% 18%, 74% 8%, 72% 26%, 90% 22%, 84% 38%, 100% 42%, 90% 55%, 100% 65%, 86% 70%, 90% 86%, 74% 84%, 70% 100%, 57% 90%, 50% 100%, 43% 90%, 30% 100%, 26% 84%, 10% 86%, 14% 70%, 0% 65%, 10% 55%, 0% 42%, 16% 38%, 10% 22%, 28% 26%, 26% 8%, 43% 18%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#E87000',
        }}><Avatar id="coffee" size={30} /></div>
        <div style={{
          background: '#CACCE8',
          borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
          padding: 'clamp(100px, 13vw, 180px) clamp(24px, 6vw, 80px) clamp(48px, 7vw, 80px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          {/* Heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.5vw, 24px)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            <h2 style={{
              fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900,
              fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)', letterSpacing: '-0.02em',
              color: '#E87000', margin: 0, lineHeight: 1.1,
            }}>12 CHARACTERS</h2>
            <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 5vw, 3.6rem)', color: '#E87000', lineHeight: 1 }}>×</span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ display: 'flex', gap: 1 }}>
                {['K','A','O','M','U','G'].map((c, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900,
                    fontSize: 'clamp(1.3rem, 3.5vw, 2.4rem)', lineHeight: 1,
                    color: ['#E87000','#E87000','#E87000','#5BC8E0','#e60012','#FFD100'][i],
                  }}>{c}</span>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 400, fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)', color: '#E87000', letterSpacing: '0.08em' }}>STUDIO</div>
            </div>
          </div>

          {/* Body text */}
          <div style={{
            fontFamily: 'var(--font-outfit), sans-serif', color: '#E87000',
            fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', lineHeight: 2, maxWidth: 480,
            marginBottom: 36,
          }}>
            Designed for mugs that outlast trends —<br />
            12 characters, each with their own world.<br />
            Find the one that feels like you,<br />
            and make every sip a little more personal.
          </div>

          {/* Character roster — scroll-triggered stagger */}
          <div ref={rosterRef} className="km-roster-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, clamp(90px, 11vw, 130px))', gap: 'clamp(10px, 2vw, 18px)' }}>
            {MUGS.map(({ img, name, role, cardBg, soldOut }, idx) => (
              <div key={name} className="km-roster-item" style={{ '--i': idx, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0 } as React.CSSProperties}>
                <div style={{
                  width: 'clamp(90px, 11vw, 130px)', height: 'clamp(90px, 11vw, 130px)',
                  borderRadius: 16, background: cardBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                }}>
                  <img src={img} alt={name} style={{ width: '100%', height: 'auto', objectFit: 'fill' }} />
                  {soldOut && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#F5F500',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.36rem', fontWeight: 900, color: '#000', lineHeight: 1.1, textAlign: 'center',
                    }}>SOLD<br/>OUT</div>
                  )}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900, fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', color: '#E87000', letterSpacing: '-0.01em' }}>{name}</div>
                  <div style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 400, fontSize: 'clamp(0.48rem, 0.8vw, 0.6rem)', color: 'rgba(60,30,0,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{role.split(' / ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Character detail grid ────────────────────────────────────────── */}
      <section ref={detailRef} className="km-detail-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {MUGS.map(({ img, name, role, price, cardBg, soldOut, avatar }, idx) => (
          <div key={name} className="km-detail-card" style={{ '--i': idx, display: 'flex', flexDirection: 'column' } as React.CSSProperties}>
            {/* Photo area */}
            <div className="km-detail-img-wrap" style={{
              background: cardBg, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              aspectRatio: '3 / 4', overflow: 'hidden',
            }}>
              <img src={img} alt={name} className="km-detail-photo" style={{ width: '120%', height: '120%', objectFit: 'contain' }} />
              {/* Hover overlay */}
              <div className="km-detail-overlay" />
              {/* Avatar */}
              <div style={{
                position: 'absolute', bottom: 14, left: 18,
                width: 'clamp(28px, 4vw, 44px)', height: 'clamp(28px, 4vw, 44px)', borderRadius: '50%',
                background: 'rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', zIndex: 1,
              }}>
                <Avatar id={avatar} size={18} />
              </div>
              {/* Sold-out badge */}
              {soldOut && (
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  width: 'clamp(52px, 7vw, 72px)', height: 'clamp(52px, 7vw, 72px)',
                  background: '#F5F500',
                  clipPath: 'polygon(50% 0%, 61% 28%, 92% 14%, 76% 43%, 100% 50%, 76% 57%, 92% 86%, 61% 72%, 50% 100%, 39% 72%, 8% 86%, 24% 57%, 0% 50%, 24% 43%, 8% 14%, 39% 28%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(0.42rem, 0.8vw, 0.58rem)', fontWeight: 900, lineHeight: 1.35,
                  textAlign: 'center', color: '#000', zIndex: 1,
                }}>
                  <div>SOLD</div>
                  <div>OUT!</div>
                  <div style={{ fontSize: '0.85em' }}>THANK YOU</div>
                </div>
              )}
            </div>
            {/* Text area */}
            <div className="km-detail-text" style={{ background: cardBg, padding: 'clamp(12px, 2.5vw, 24px) clamp(14px, 3vw, 28px) clamp(16px, 3vw, 28px)' }}>
              <div style={{
                fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 400,
                fontSize: 'clamp(0.6rem, 1.1vw, 0.75rem)', color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.1em', marginBottom: 4, textTransform: 'uppercase',
              }}>{role}</div>
              <div style={{
                fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 900,
                fontSize: 'clamp(1.1rem, 2.8vw, 2rem)', lineHeight: 1.1,
                color: '#fff', letterSpacing: '-0.01em', marginBottom: 2,
              }}>{name}</div>
              <div style={{
                fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700,
                fontSize: 'clamp(0.65rem, 1.2vw, 0.88rem)', letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.65)',
              }}>{price}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Scrolling mug rows ───────────────────────────────────────────── */}
      <section style={{ background: '#E87000', padding: '24px 0', overflow: 'hidden' }}>
        <div className="km-scroll-row" style={{ overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, animation: 'km-row 30s linear infinite', width: 'max-content' }}>
            {[...ALL_IMGS, ...ALL_IMGS].map(({ img, bg }, i) => (
              <div key={i} className="km-mug-tile" style={{
                background: bg, borderRadius: 40, overflow: 'hidden',
                flexShrink: 0, width: 160, height: 140,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
              }}>
                <img src={img} alt="" className="km-mug-img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="km-scroll-row" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 12, animation: 'km-row-rev 30s linear infinite', width: 'max-content' }}>
            {[...ALL_IMGS.slice(7), ...ALL_IMGS.slice(0, 7), ...ALL_IMGS.slice(7), ...ALL_IMGS.slice(0, 7)].map(({ img, bg }, i) => (
              <div key={i} className="km-mug-tile" style={{
                background: bg, borderRadius: 40, overflow: 'hidden',
                flexShrink: 0, width: 160, height: 140,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
              }}>
                <img src={img} alt="" className="km-mug-img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tagline / poetry section ─────────────────────────────────────── */}
      <section ref={taglineRef} className="km-tagline-section" style={{ background: '#E87000', padding: 'clamp(48px, 7vh, 88px) clamp(20px, 5vw, 64px)', position: 'relative', overflow: 'hidden' }}>
        {/* Tagline section accents */}
        <svg className="km-accent" style={{ top: '10%', right: '5%', animation: 'km-drift-b 5s ease-in-out infinite' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <svg className="km-accent" style={{ bottom: '15%', right: '12%', animation: 'km-drift-a 6s ease-in-out infinite 1s' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="km-accent" style={{ top: '50%', right: '2%', animation: 'km-drift-c 8s ease-in-out infinite 0.5s' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,209,0,0.4)" strokeWidth="1.5"><polygon points="12 2 22 12 12 22 2 12"/></svg>
        <svg className="km-accent" style={{ top: '20%', left: '3%', animation: 'km-pulse 4s ease-in-out infinite 1.5s' }} width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)" stroke="none"><circle cx="12" cy="12" r="10"/></svg>
        <svg className="km-accent" style={{ bottom: '8%', left: '8%', animation: 'km-spin-slow 15s linear infinite' }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/></svg>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
          {/* Oval with mugs — gentle float */}
          <div className="km-oval-float" style={{
            flex: '0 0 auto',
            width: 'clamp(240px, 38vw, 440px)', height: 'clamp(240px, 38vw, 440px)',
            borderRadius: '50%',
            background: '#FFF5E8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative',
            flexShrink: 0,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 24 }}>
              {MUGS.slice(0, 4).map(({ img, name }) => (
                <img key={name} src={img} alt={name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              ))}
            </div>
          </div>

          {/* Poetry text */}
          <div style={{ flex: '1 1 280px' }}>
            <p style={{
              fontFamily: 'var(--font-outfit), sans-serif', color: '#fff',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)', lineHeight: 2.1,
              margin: '0 0 32px',
            }}>
              For the mornings that need a little magic,<br />
              the afternoons you earned, and every<br />
              quiet moment in between — this small mug<br />
              holds more than just your coffee.
            </p>

            {/* Pill badges — stagger reveal */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {MUGS.map(({ name, cardBg }, idx) => (
                <div key={name} className="km-pill" style={{
                  '--i': idx,
                  background: cardBg,
                  borderRadius: 9999, padding: '7px 16px',
                  fontFamily: 'var(--font-outfit), sans-serif',
                  fontWeight: 700, fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)',
                  color: '#fff', whiteSpace: 'nowrap',
                } as React.CSSProperties}>
                  {name} × KAOMUG
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer ref={footerRef} className="km-footer-reveal" style={{ background: '#E87000', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 64px) 32px', textAlign: 'center' }}>
        {/* Large logo */}
        <div style={{ marginBottom: 28 }}>
          <div className="km-wordmark" style={{
            fontFamily: 'var(--font-outfit), var(--font-noto), sans-serif', fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.03em', lineHeight: 1,
            color: '#fff', display: 'block',
          }}>KAOMUG</div>
          <div className="km-wordmark-sub" style={{
            fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700,
            fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.7)', marginTop: 4,
          }}>STUDIO</div>
        </div>

        {/* Back to top button */}
        <a href="#" className="km-back-top" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 9999, border: '2px solid rgba(255,255,255,0.8)',
          color: '#fff', textDecoration: 'none',
          fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 700,
          fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)', letterSpacing: '0.08em',
          padding: '12px clamp(28px, 5vw, 52px)',
          marginBottom: 40,
        }}>
          BACK TO TOP
        </a>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.25)', marginBottom: 28 }} />

        {/* Legal links */}
        <p style={{
          fontFamily: 'var(--font-outfit), sans-serif', color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(0.65rem, 1vw, 0.78rem)', lineHeight: 2.2, marginBottom: 20,
        }}>
          Shop Guide ／ Terms of Service ／ Privacy Policy ／ About Personal Information
        </p>

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-outfit), sans-serif', color: 'rgba(255,255,255,0.5)',
          fontSize: 'clamp(0.6rem, 0.9vw, 0.72rem)', margin: 0,
        }}>
          Copyright &copy; {new Date().getFullYear()} KAOMUG Studio. All rights reserved.
        </p>
      </footer>

      <style>{`
        /* ── Existing scroll animations ── */
        @keyframes km-hero-row {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes km-hero-row-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes km-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        @keyframes km-row {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        @keyframes km-row-rev {
          from { transform: translateX(-33.3333%); }
          to   { transform: translateX(0); }
        }

        /* ── Floating accent animations ── */
        @keyframes km-drift-a {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.55; }
          50%  { transform: translateY(-18px) rotate(20deg); opacity: 0.8; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.55; }
        }
        @keyframes km-drift-b {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.4; }
          50%  { transform: translateY(12px) rotate(-15deg) scale(1.1); opacity: 0.7; }
          100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.4; }
        }
        @keyframes km-drift-c {
          0%   { transform: translateX(0) rotate(0deg); opacity: 0.5; }
          33%  { transform: translateX(10px) rotate(12deg); opacity: 0.75; }
          66%  { transform: translateX(-8px) rotate(-8deg); opacity: 0.6; }
          100% { transform: translateX(0) rotate(0deg); opacity: 0.5; }
        }
        @keyframes km-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes km-pulse {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.2); opacity: 0.9; }
        }

        /* ── New entrance animations ── */
        @keyframes km-nav-down {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes km-title-slide {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes km-gentle-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes km-wordmark-in {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Utility ── */
        .km-accent { position: absolute; pointer-events: none; }

        /* ── Page load entrances ── */
        .km-nav-enter {
          animation: km-nav-down 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .km-title-enter {
          animation: km-title-slide 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        /* ── Roster stagger reveal ── */
        .km-roster-item {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity  0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i, 0) * 38ms),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i, 0) * 38ms);
        }
        .km-roster-grid.km-visible .km-roster-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Detail card pixel entrance ── */
        @keyframes km-pixel-in {
          0%   { transform: scale(0.08); opacity: 0; filter: saturate(0) contrast(4); }
          100% { transform: scale(1);    opacity: 1; filter: saturate(1) contrast(1); }
        }
        .km-detail-card {
          opacity: 0;
        }
        .km-detail-section.km-visible .km-detail-card {
          animation: km-pixel-in 0.6s steps(8, end) calc(var(--i, 0) * 55ms) both;
        }
        .km-detail-overlay { display: none; }

        /* ── Oval float ── */
        .km-oval-float {
          animation: km-gentle-float 5s ease-in-out infinite;
        }

        /* ── Pill stagger reveal + hover ── */
        .km-tagline-section .km-pill {
          opacity: 0;
          transform: translateY(10px);
          cursor: pointer;
          transition:
            opacity   0.4s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i, 0) * 28ms + 180ms),
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i, 0) * 28ms + 180ms),
            box-shadow 0.22s ease,
            filter 0.22s ease;
        }
        .km-tagline-section.km-visible .km-pill {
          opacity: 1;
          transform: translateY(0);
        }
        .km-tagline-section.km-visible .km-pill:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.22);
          filter: brightness(1.1);
          transition-delay: 0ms;
        }

        /* ── Scroll row pause on hover ── */
        .km-scroll-row:hover > div {
          animation-play-state: paused;
        }

        /* ── Mug tile inner image zoom on hover ── */
        .km-mug-img {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .km-mug-tile:hover .km-mug-img {
          transform: scale(1.1);
        }

        /* ── Footer wordmark reveal ── */
        .km-wordmark {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .km-wordmark-sub {
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }
        .km-footer-reveal.km-visible .km-wordmark {
          opacity: 1;
          transform: scale(1);
        }
        .km-footer-reveal.km-visible .km-wordmark-sub {
          opacity: 1;
        }

        /* ── Back to top button hover ── */
        .km-back-top {
          transition: background 0.22s ease, color 0.22s ease;
        }
        .km-back-top:hover {
          background: rgba(255,255,255,0.15);
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ── Responsive: tablet (641–1023px) ─────────────────────────────── */
        @media (min-width: 641px) and (max-width: 1023px) {
          .km-hero-tile { width: calc((100vw - 52px) / 3) !important; }
          .km-color-block { width: calc((100vw - 52px) / 5) !important; }
          .km-roster-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .km-detail-section { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ── Responsive: mobile (≤640px) ─────────────────────────────────── */
        @media (max-width: 640px) {
          .km-hero-side-panel { display: none !important; }
          .km-hero-tile { width: 50vw !important; }
          .km-color-block { width: 25vw !important; }
          .km-roster-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
          }
          .km-detail-section { grid-template-columns: repeat(2, 1fr) !important; }
          .km-oval-float {
            width: min(80vw, 360px) !important;
            height: min(80vw, 360px) !important;
          }
          .km-back-top { min-height: 44px !important; }
        }
      `}</style>
    </div>
  );
}
