import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kaomug — Custom Character Mugs',
  description: 'Handcrafted ceramic character mugs. Your face, your cup.',
};

// ── Face Mug SVGs ────────────────────────────────────────────────────────────

function MugSpecs() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#c9896a" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#d4906e"/>
      {/* Rim highlight */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#e8a888"/>
      {/* Spiky hair */}
      <path d="M 50 42 L 58 8 L 68 38 L 78 4 L 88 36 L 98 2 L 108 36 L 118 6 L 128 38 L 138 10 L 146 42" fill="#7a3a1e" stroke="#7a3a1e" strokeWidth="2" strokeLinejoin="round"/>
      {/* Freckles */}
      <circle cx="72" cy="115" r="4" fill="#c07855" opacity="0.7"/>
      <circle cx="128" cy="115" r="4" fill="#c07855" opacity="0.7"/>
      <circle cx="67" cy="125" r="2.5" fill="#c07855" opacity="0.5"/>
      <circle cx="133" cy="125" r="2.5" fill="#c07855" opacity="0.5"/>
      {/* White eyes background */}
      <ellipse cx="75" cy="110" rx="22" ry="22" fill="#fff"/>
      <ellipse cx="125" cy="110" rx="22" ry="22" fill="#fff"/>
      {/* Red glasses frames */}
      <rect x="50" y="89" width="46" height="42" rx="21" fill="none" stroke="#e60012" strokeWidth="7"/>
      <rect x="103" y="89" width="46" height="42" rx="21" fill="none" stroke="#e60012" strokeWidth="7"/>
      {/* Glasses bridge */}
      <path d="M 96 110 L 103 110" stroke="#e60012" strokeWidth="5" strokeLinecap="round"/>
      {/* Pupils */}
      <circle cx="75" cy="112" r="12" fill="#1a1a1a"/>
      <circle cx="125" cy="112" r="12" fill="#1a1a1a"/>
      <circle cx="79" cy="108" r="4" fill="#fff" opacity="0.6"/>
      <circle cx="129" cy="108" r="4" fill="#fff" opacity="0.6"/>
      {/* Nose */}
      <circle cx="99" cy="133" r="4" fill="#c07855"/>
      {/* Frown mouth */}
      <path d="M 82 152 Q 99 145 116 152" fill="none" stroke="#a05a38" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Left ear + piercing */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#d4906e"/>
      <circle cx="18" cy="136" r="4" fill="none" stroke="#c0c0c0" strokeWidth="2.5"/>
      {/* Right ear + piercing */}
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#d4906e"/>
      <circle cx="182" cy="136" r="4" fill="none" stroke="#c0c0c0" strokeWidth="2.5"/>
      {/* Hair accessory */}
      <circle cx="120" cy="22" r="7" fill="none" stroke="#e60012" strokeWidth="4"/>
    </svg>
  );
}

function MugSleepy() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#b8c9d4" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#c9dce8"/>
      {/* Rim */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#dceaf4"/>
      {/* Messy bun */}
      <circle cx="99" cy="20" r="22" fill="#5c3d2e"/>
      <path d="M 75 28 Q 84 12 99 10 Q 114 12 123 28" fill="#5c3d2e"/>
      {/* Bun strands */}
      <path d="M 80 20 Q 88 8 99 10" fill="none" stroke="#3d2a1e" strokeWidth="2"/>
      <path d="M 99 10 Q 110 8 118 20" fill="none" stroke="#3d2a1e" strokeWidth="2"/>
      {/* Sleepy half-closed eyes */}
      <ellipse cx="75" cy="112" rx="21" ry="21" fill="#fff"/>
      <ellipse cx="125" cy="112" rx="21" ry="21" fill="#fff"/>
      {/* Half-closed eyelids */}
      <path d="M 54 112 Q 75 102 96 112" fill="#c9dce8"/>
      <path d="M 104 112 Q 125 102 146 112" fill="#c9dce8"/>
      {/* Pupils */}
      <ellipse cx="75" cy="116" rx="11" ry="8" fill="#2a2020"/>
      <ellipse cx="125" cy="116" rx="11" ry="8" fill="#2a2020"/>
      {/* Shine */}
      <circle cx="79" cy="113" r="3" fill="#fff" opacity="0.7"/>
      <circle cx="129" cy="113" r="3" fill="#fff" opacity="0.7"/>
      {/* Blush */}
      <ellipse cx="60" cy="130" rx="14" ry="8" fill="#f4a0b0" opacity="0.5"/>
      <ellipse cx="140" cy="130" rx="14" ry="8" fill="#f4a0b0" opacity="0.5"/>
      {/* Nose */}
      <path d="M 95 140 Q 99 144 103 140" fill="none" stroke="#8aabbc" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Yawn / sleepy mouth */}
      <path d="M 85 158 Q 99 165 113 158" fill="none" stroke="#8aabbc" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Ears */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#c9dce8"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#c9dce8"/>
      {/* Zzz */}
      <text x="140" y="58" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#8aabbc" opacity="0.8">z z z</text>
    </svg>
  );
}

function MugKitty() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#f5e6c8" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#fef3e2"/>
      {/* Rim */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#fff8f0"/>
      {/* Cat ears */}
      <path d="M 52 42 L 38 8 L 72 36" fill="#fef3e2" stroke="#fef3e2" strokeWidth="2"/>
      <path d="M 148 42 L 162 8 L 128 36" fill="#fef3e2" stroke="#fef3e2" strokeWidth="2"/>
      {/* Inner ear pink */}
      <path d="M 52 38 L 42 14 L 68 36" fill="#f4a0b0" opacity="0.6"/>
      <path d="M 148 38 L 158 14 L 132 36" fill="#f4a0b0" opacity="0.6"/>
      {/* Eyes — vertical cat pupils */}
      <ellipse cx="75" cy="108" rx="20" ry="22" fill="#8fc4a0"/>
      <ellipse cx="125" cy="108" rx="20" ry="22" fill="#8fc4a0"/>
      <ellipse cx="75" cy="108" rx="7" ry="18" fill="#1a1a1a"/>
      <ellipse cx="125" cy="108" rx="7" ry="18" fill="#1a1a1a"/>
      <ellipse cx="78" cy="104" rx="3" ry="5" fill="#fff" opacity="0.6"/>
      <ellipse cx="128" cy="104" rx="3" ry="5" fill="#fff" opacity="0.6"/>
      {/* Nose — tiny triangle */}
      <path d="M 96 132 L 99 128 L 102 132 Z" fill="#f4a0b0"/>
      {/* Whisker dots */}
      <circle cx="64" cy="136" r="2.5" fill="#ccc"/>
      <circle cx="55" cy="141" r="2.5" fill="#ccc"/>
      <circle cx="134" cy="136" r="2.5" fill="#ccc"/>
      <circle cx="143" cy="141" r="2.5" fill="#ccc"/>
      {/* Mouth — cat w shape */}
      <path d="M 88 142 Q 93 149 99 144 Q 105 149 112 142" fill="none" stroke="#f4a0b0" strokeWidth="3" strokeLinecap="round"/>
      {/* Blush */}
      <ellipse cx="58" cy="128" rx="14" ry="8" fill="#f4a0b0" opacity="0.35"/>
      <ellipse cx="142" cy="128" rx="14" ry="8" fill="#f4a0b0" opacity="0.35"/>
      {/* Ears */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#fef3e2"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#fef3e2"/>
      {/* Bow */}
      <path d="M 80 20 L 99 30 L 118 20 L 99 10 Z" fill="#e60012" opacity="0.9"/>
      <circle cx="99" cy="20" r="5" fill="#ff4444"/>
    </svg>
  );
}

function MugGhost() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#d8d8d8" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#efefef"/>
      {/* Rim */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#f8f8f8"/>
      {/* Wobbly ghost hair top */}
      <path d="M 35 44 Q 42 18 55 38 Q 65 14 78 38 Q 88 10 99 38 Q 110 14 122 38 Q 133 10 145 38 Q 158 18 165 44" fill="#efefef" stroke="#efefef"/>
      {/* Hollow oval eyes */}
      <ellipse cx="75" cy="110" rx="20" ry="24" fill="#1a1a2e"/>
      <ellipse cx="125" cy="110" rx="20" ry="24" fill="#1a1a2e"/>
      {/* Eye shine */}
      <ellipse cx="80" cy="104" rx="6" ry="8" fill="#fff" opacity="0.3"/>
      <ellipse cx="130" cy="104" rx="6" ry="8" fill="#fff" opacity="0.3"/>
      {/* O mouth */}
      <ellipse cx="99" cy="148" rx="14" ry="18" fill="#1a1a2e"/>
      <ellipse cx="99" cy="148" rx="8" ry="10" fill="#fff" opacity="0.15"/>
      {/* Cheek glow */}
      <ellipse cx="55" cy="130" rx="18" ry="10" fill="#b9cdfd" opacity="0.35"/>
      <ellipse cx="145" cy="130" rx="18" ry="10" fill="#b9cdfd" opacity="0.35"/>
      {/* Ears */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#efefef"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#efefef"/>
    </svg>
  );
}

function MugPunk() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#3a3a4a" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#4a4a5e"/>
      {/* Rim */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#5a5a6e"/>
      {/* Mohawk */}
      <path d="M 80 42 L 83 2 L 88 36 L 93 -2 L 98 34 L 103 -4 L 108 34 L 113 0 L 118 38 L 122 4 L 120 42" fill="#e60012" stroke="none"/>
      {/* Eyebrows — sharp */}
      <path d="M 55 96 L 93 88" stroke="#c9dce8" strokeWidth="5" strokeLinecap="square"/>
      <path d="M 105 88 L 143 96" stroke="#c9dce8" strokeWidth="5" strokeLinecap="square"/>
      {/* Eyes — sharp */}
      <ellipse cx="75" cy="112" rx="19" ry="17" fill="#ddd"/>
      <ellipse cx="125" cy="112" rx="19" ry="17" fill="#ddd"/>
      <ellipse cx="75" cy="112" rx="12" ry="14" fill="#1a1a1a"/>
      <ellipse cx="125" cy="112" rx="12" ry="14" fill="#1a1a1a"/>
      <circle cx="79" cy="108" r="4" fill="#fff" opacity="0.5"/>
      <circle cx="129" cy="108" r="4" fill="#fff" opacity="0.5"/>
      {/* Nose ring */}
      <circle cx="99" cy="135" r="6" fill="none" stroke="#c0c0c0" strokeWidth="3"/>
      {/* Smirk */}
      <path d="M 86 152 Q 105 165 116 154" fill="none" stroke="#c9dce8" strokeWidth="3.5" strokeLinecap="round"/>
      {/* X earrings */}
      <line x1="12" y1="118" x2="24" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="118" x2="12" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="176" y1="118" x2="188" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="188" y1="118" x2="176" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Ears */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#4a4a5e"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#4a4a5e"/>
    </svg>
  );
}

function MugSunny() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Handle */}
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#f9d5a0" strokeWidth="22" strokeLinecap="round"/>
      {/* Body */}
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#fce4a0"/>
      {/* Rim */}
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#ffe8b0"/>
      {/* Pigtails */}
      <circle cx="44" cy="48" r="20" fill="#f4a435"/>
      <circle cx="156" cy="48" r="20" fill="#f4a435"/>
      {/* Hair */}
      <path d="M 52 42 Q 68 20 100 36 Q 132 20 148 42" fill="#f4a435"/>
      {/* Hair strands */}
      <path d="M 68 36 Q 75 22 88 30" fill="none" stroke="#d4831a" strokeWidth="2.5"/>
      <path d="M 110 30 Q 123 22 130 36" fill="none" stroke="#d4831a" strokeWidth="2.5"/>
      {/* Pigtail ties */}
      <circle cx="44" cy="44" r="7" fill="#e60012"/>
      <circle cx="156" cy="44" r="7" fill="#e60012"/>
      {/* Star eyes */}
      <ellipse cx="75" cy="108" rx="20" ry="20" fill="#fff"/>
      <ellipse cx="125" cy="108" rx="20" ry="20" fill="#fff"/>
      {/* Star paths */}
      <path d="M 75 92 L 77 103 L 88 103 L 79 110 L 82 121 L 75 115 L 68 121 L 71 110 L 62 103 L 73 103 Z" fill="#f4a435"/>
      <path d="M 125 92 L 127 103 L 138 103 L 129 110 L 132 121 L 125 115 L 118 121 L 121 110 L 112 103 L 123 103 Z" fill="#f4a435"/>
      {/* Blush */}
      <ellipse cx="57" cy="127" rx="14" ry="9" fill="#f4a0b0" opacity="0.55"/>
      <ellipse cx="143" cy="127" rx="14" ry="9" fill="#f4a0b0" opacity="0.55"/>
      {/* Big smile */}
      <path d="M 78 148 Q 99 168 120 148" fill="#f4a435" stroke="#d4831a" strokeWidth="2.5"/>
      {/* Teeth */}
      <path d="M 85 152 Q 99 165 113 152" fill="#fff"/>
      {/* Ears */}
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#fce4a0"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#fce4a0"/>
    </svg>
  );
}

// ── Product data ──────────────────────────────────────────────────────────────

const MUGS = [
  { svg: MugSpecs,  name: 'Specs',  tag: 'THE CLASSIC',     price: '₱980',  desc: 'For the artsy overthinker. Red round glasses and that pensive stare.' },
  { svg: MugSleepy, name: 'Sleepy', tag: 'MORNING MODE',    price: '₱980',  desc: 'Perpetually tired, endlessly cute. Ships with zzz soundtrack.' },
  { svg: MugKitty,  name: 'Kitty',  tag: 'FAN FAVORITE',    price: '₱1,080', desc: 'Vertical pupils, little bow. This one outsells everything else.' },
  { svg: MugGhost,  name: 'Ghost',  tag: 'LIMITED DROP',    price: '₱1,080', desc: 'Hollow-eyed and spectral. Great for people who hate mornings.' },
  { svg: MugPunk,   name: 'Punk',   tag: 'STATEMENT PIECE', price: '₱1,180', desc: 'Mohawk, nose ring, zero patience. Ceramic rebellion since 2023.' },
  { svg: MugSunny,  name: 'Sunny',  tag: 'BEST GIFTER',     price: '₱980',  desc: 'Star-shaped eyes, pigtails, permanently in a good mood.' },
];

// Duplicate for seamless looping
const ROW1 = [...MUGS, ...MUGS, ...MUGS];
const ROW2 = [...MUGS.slice(3), ...MUGS, ...MUGS, ...MUGS.slice(0, 3)];

export default function KaomugPage() {
  return (
    <div className={outfit.variable} style={{
      fontFamily: 'var(--font-outfit), sans-serif',
      background: '#0a0505',
      color: '#fff',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,5,5,0.92)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 clamp(20px,5vw,64px)',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/playground" style={{ color: '#fff', textDecoration: 'none', fontWeight: 900, fontSize: 'clamp(1rem,2vw,1.2rem)', letterSpacing: '-0.01em' }}>
            KAO<span style={{ color: '#e60012' }}>MUG</span>
          </a>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {['Shop', 'About', 'Custom'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>{l}</a>
            ))}
          </div>
          <a href="#shop" style={{
            background: '#e60012', color: '#fff', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.8rem', borderRadius: 44,
            padding: '10px 22px', letterSpacing: '0.04em',
          }}>
            Shop Now
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px,11vh,140px) clamp(20px,5vw,64px) clamp(48px,6vh,80px)', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: '1 1 320px' }}>
            {/* Pill badge */}
            <div style={{
              display: 'inline-block', background: '#e60012', color: '#fff',
              fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.18em',
              padding: '6px 16px', borderRadius: 44, marginBottom: 28, textTransform: 'uppercase',
            }}>
              Handcrafted in Manila
            </div>
            <h1 style={{
              fontWeight: 900, fontSize: 'clamp(3.5rem,9vw,7.5rem)',
              lineHeight: 0.88, letterSpacing: '-0.03em', margin: '0 0 28px',
            }}>
              Your<br />face.<br />
              <span style={{ color: '#e60012' }}>Your cup.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', lineHeight: 1.7, maxWidth: '44ch', margin: '0 0 36px' }}>
              Each Kaomug is a hand-sculpted ceramic character. Six expressions ready to ship, or send us your face and we'll make one just for you.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#shop" style={{
                background: '#e60012', color: '#fff', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.95rem', borderRadius: 44, padding: '14px 32px',
              }}>
                Browse the collection
              </a>
              <a href="#custom" style={{
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.95rem', borderRadius: 44,
                padding: '14px 24px', border: '1px solid rgba(255,255,255,0.15)',
              }}>
                Custom order →
              </a>
            </div>
          </div>

          {/* Hero mug cluster */}
          <div style={{ flex: '0 0 auto', display: 'flex', gap: 20, alignItems: 'flex-end' }}>
            <div style={{ width: 150, transform: 'rotate(-8deg) translateY(20px)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}>
              <MugGhost />
            </div>
            <div style={{ width: 190, transform: 'rotate(1deg)', filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))' }}>
              <MugSpecs />
            </div>
            <div style={{ width: 145, transform: 'rotate(7deg) translateY(24px)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}>
              <MugKitty />
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ticker ──────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 0', overflow: 'hidden', whiteSpace: 'nowrap',
        background: '#000',
      }}>
        <div style={{ display: 'inline-flex', gap: 48, animation: 'km-ticker 20s linear infinite' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.22em', fontWeight: 700, textTransform: 'uppercase' }}>
              HANDCRAFTED CERAMIC · MADE IN MANILA · FOOD-SAFE GLAZE · CUSTOM ORDERS ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrolling mug rows (Asahi kvRow style) ──────────────────────── */}
      <section style={{ background: '#000', padding: '64px 0', overflow: 'hidden' }}>

        {/* Label */}
        <div style={{ maxWidth: 1080, margin: '0 auto 48px', padding: '0 clamp(20px,5vw,64px)' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#e60012', textTransform: 'uppercase', marginBottom: 12 }}>
            The Full Lineup
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.03em', margin: 0 }}>
            Six characters.<br />One you'll need.
          </h2>
        </div>

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <div style={{
            display: 'flex', gap: 16,
            animation: 'km-row 28s linear infinite',
            width: 'max-content',
          }}>
            {ROW1.map(({ svg: Svg, name, tag, price }, i) => (
              <div key={i} style={{
                background: '#4b271f',
                borderRadius: 44, padding: 16,
                flexShrink: 0, width: 220,
                boxShadow: '0 0 8px rgba(0,0,0,0.6)',
              }}>
                <div style={{ width: '100%', marginBottom: 12 }}>
                  <Svg />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{name}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e60012' }}>{price}</span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', padding: '4px 4px 0' }}>
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap: 16,
            animation: 'km-row-reverse 28s linear infinite',
            width: 'max-content',
          }}>
            {ROW2.map(({ svg: Svg, name, tag, price }, i) => (
              <div key={i} style={{
                background: '#4b271f',
                borderRadius: 44, padding: 16,
                flexShrink: 0, width: 220,
                boxShadow: '0 0 8px rgba(0,0,0,0.6)',
              }}>
                <div style={{ width: '100%', marginBottom: 12 }}>
                  <Svg />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{name}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#e60012' }}>{price}</span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', padding: '4px 4px 0' }}>
                  {tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop Grid (detail cards) ─────────────────────────────────────── */}
      <section id="shop" style={{ padding: 'clamp(64px,8vh,100px) clamp(20px,5vw,64px)', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.03em', margin: 0 }}>
            Shop All
          </h2>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', letterSpacing: '0.1em', fontWeight: 500 }}>
            6 characters · All in stock
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 20 }}>
          {MUGS.map(({ svg: Svg, name, tag, price, desc }) => (
            <article key={name} style={{
              background: '#4b271f',
              borderRadius: 44, overflow: 'hidden',
              boxShadow: '0 0 8px rgba(0,0,0,0.6)',
            }}>
              <div style={{ padding: '32px 24px 16px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 164 }}><Svg /></div>
              </div>
              <div style={{ padding: '16px 24px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: '#e60012', textTransform: 'uppercase' }}>{tag}</span>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>{price}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.65, margin: '0 0 20px' }}>{desc}</p>
                <button style={{
                  width: '100%', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)', color: '#fff',
                  fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '0.85rem',
                  borderRadius: 44, padding: '12px 0', cursor: 'pointer', letterSpacing: '0.04em',
                }}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Custom Order ─────────────────────────────────────────────────── */}
      <section id="custom" style={{ background: '#4b271f', padding: 'clamp(64px,8vh,100px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16 }}>Custom Orders</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 0.92, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
              Make it<br /><em style={{ fontStyle: 'italic', color: '#ffd3d3' }}>yours.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.95rem,1.4vw,1.05rem)', lineHeight: 1.75, maxWidth: '44ch', margin: '0 0 32px' }}>
              Send us a reference photo. We'll sculpt a mug that looks like your dog, your cat, your friend, your enemy — anyone. Four-week turnaround. All food-safe glazes.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, maxWidth: 360, marginBottom: 32 }}>
              {[['01', 'Send a photo'], ['02', 'We sculpt'], ['03', 'Ships in 4 wks']].map(([num, label]) => (
                <div key={num} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: '16px 12px' }}>
                  <div style={{ color: '#e60012', fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.12em', marginBottom: 8 }}>{num}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>{label}</div>
                </div>
              ))}
            </div>
            <a href="mailto:hello@kaomug.ph" style={{
              display: 'inline-block', background: '#e60012', color: '#fff',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem',
              borderRadius: 44, padding: '14px 32px',
            }}>
              Start a custom order
            </a>
          </div>
          <div style={{ flex: '0 0 auto', width: 240, transform: 'rotate(-4deg)', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))' }}>
            <MugPunk />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '36px clamp(20px,5vw,64px)', background: '#000' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
            KAO<span style={{ color: '#e60012' }}>MUG</span>
          </span>
          <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.75rem' }}>
            A playground project by{' '}
            <a href="/playground" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Christian Dizon</a>
            {' '}— inspired by Asahi Fantasy Miniglass design
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes km-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes km-row {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        @keyframes km-row-reverse {
          from { transform: translateX(-33.3333%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
