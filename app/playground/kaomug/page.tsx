import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';

const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KAOMUG — 顔セラミックマグ',
  description: 'Handcrafted ceramic character mugs. Your face, your cup.',
};

// ── Mug SVGs ─────────────────────────────────────────────────────────────────

function MugSpecs() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#c9896a" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#d4906e"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#e8a888"/>
      <path d="M 50 42 L 58 8 L 68 38 L 78 4 L 88 36 L 98 2 L 108 36 L 118 6 L 128 38 L 138 10 L 146 42" fill="#7a3a1e" stroke="#7a3a1e" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="72" cy="115" r="4" fill="#c07855" opacity="0.7"/>
      <circle cx="128" cy="115" r="4" fill="#c07855" opacity="0.7"/>
      <ellipse cx="75" cy="110" rx="22" ry="22" fill="#fff"/>
      <ellipse cx="125" cy="110" rx="22" ry="22" fill="#fff"/>
      <rect x="50" y="89" width="46" height="42" rx="21" fill="none" stroke="#e60012" strokeWidth="7"/>
      <rect x="103" y="89" width="46" height="42" rx="21" fill="none" stroke="#e60012" strokeWidth="7"/>
      <path d="M 96 110 L 103 110" stroke="#e60012" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="75" cy="112" r="12" fill="#1a1a1a"/>
      <circle cx="125" cy="112" r="12" fill="#1a1a1a"/>
      <circle cx="79" cy="108" r="4" fill="#fff" opacity="0.6"/>
      <circle cx="129" cy="108" r="4" fill="#fff" opacity="0.6"/>
      <circle cx="99" cy="133" r="4" fill="#c07855"/>
      <path d="M 82 152 Q 99 145 116 152" fill="none" stroke="#a05a38" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#d4906e"/>
      <circle cx="18" cy="136" r="4" fill="none" stroke="#c0c0c0" strokeWidth="2.5"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#d4906e"/>
      <circle cx="182" cy="136" r="4" fill="none" stroke="#c0c0c0" strokeWidth="2.5"/>
      <circle cx="120" cy="22" r="7" fill="none" stroke="#e60012" strokeWidth="4"/>
    </svg>
  );
}

function MugSleepy() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#b8c9d4" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#c9dce8"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#dceaf4"/>
      <circle cx="99" cy="20" r="22" fill="#5c3d2e"/>
      <path d="M 75 28 Q 84 12 99 10 Q 114 12 123 28" fill="#5c3d2e"/>
      <ellipse cx="75" cy="112" rx="21" ry="21" fill="#fff"/>
      <ellipse cx="125" cy="112" rx="21" ry="21" fill="#fff"/>
      <path d="M 54 112 Q 75 102 96 112" fill="#c9dce8"/>
      <path d="M 104 112 Q 125 102 146 112" fill="#c9dce8"/>
      <ellipse cx="75" cy="116" rx="11" ry="8" fill="#2a2020"/>
      <ellipse cx="125" cy="116" rx="11" ry="8" fill="#2a2020"/>
      <circle cx="79" cy="113" r="3" fill="#fff" opacity="0.7"/>
      <circle cx="129" cy="113" r="3" fill="#fff" opacity="0.7"/>
      <ellipse cx="60" cy="130" rx="14" ry="8" fill="#f4a0b0" opacity="0.5"/>
      <ellipse cx="140" cy="130" rx="14" ry="8" fill="#f4a0b0" opacity="0.5"/>
      <path d="M 85 158 Q 99 165 113 158" fill="none" stroke="#8aabbc" strokeWidth="3.5" strokeLinecap="round"/>
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#c9dce8"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#c9dce8"/>
      <text x="140" y="58" fontFamily="Arial" fontSize="14" fontWeight="700" fill="#8aabbc" opacity="0.8">z z z</text>
    </svg>
  );
}

function MugKitty() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#f5e6c8" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#fef3e2"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#fff8f0"/>
      <path d="M 52 42 L 38 8 L 72 36" fill="#fef3e2" stroke="#fef3e2" strokeWidth="2"/>
      <path d="M 148 42 L 162 8 L 128 36" fill="#fef3e2" stroke="#fef3e2" strokeWidth="2"/>
      <path d="M 52 38 L 42 14 L 68 36" fill="#f4a0b0" opacity="0.6"/>
      <path d="M 148 38 L 158 14 L 132 36" fill="#f4a0b0" opacity="0.6"/>
      <ellipse cx="75" cy="108" rx="20" ry="22" fill="#8fc4a0"/>
      <ellipse cx="125" cy="108" rx="20" ry="22" fill="#8fc4a0"/>
      <ellipse cx="75" cy="108" rx="7" ry="18" fill="#1a1a1a"/>
      <ellipse cx="125" cy="108" rx="7" ry="18" fill="#1a1a1a"/>
      <ellipse cx="78" cy="104" rx="3" ry="5" fill="#fff" opacity="0.6"/>
      <ellipse cx="128" cy="104" rx="3" ry="5" fill="#fff" opacity="0.6"/>
      <path d="M 96 132 L 99 128 L 102 132 Z" fill="#f4a0b0"/>
      <circle cx="64" cy="136" r="2.5" fill="#ccc"/>
      <circle cx="55" cy="141" r="2.5" fill="#ccc"/>
      <circle cx="134" cy="136" r="2.5" fill="#ccc"/>
      <circle cx="143" cy="141" r="2.5" fill="#ccc"/>
      <path d="M 88 142 Q 93 149 99 144 Q 105 149 112 142" fill="none" stroke="#f4a0b0" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="58" cy="128" rx="14" ry="8" fill="#f4a0b0" opacity="0.35"/>
      <ellipse cx="142" cy="128" rx="14" ry="8" fill="#f4a0b0" opacity="0.35"/>
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#fef3e2"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#fef3e2"/>
      <path d="M 80 20 L 99 30 L 118 20 L 99 10 Z" fill="#e60012" opacity="0.9"/>
      <circle cx="99" cy="20" r="5" fill="#ff4444"/>
    </svg>
  );
}

function MugGhost() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#d8d8d8" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#efefef"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#f8f8f8"/>
      <path d="M 35 44 Q 42 18 55 38 Q 65 14 78 38 Q 88 10 99 38 Q 110 14 122 38 Q 133 10 145 38 Q 158 18 165 44" fill="#efefef" stroke="#efefef"/>
      <ellipse cx="75" cy="110" rx="20" ry="24" fill="#1a1a2e"/>
      <ellipse cx="125" cy="110" rx="20" ry="24" fill="#1a1a2e"/>
      <ellipse cx="80" cy="104" rx="6" ry="8" fill="#fff" opacity="0.3"/>
      <ellipse cx="130" cy="104" rx="6" ry="8" fill="#fff" opacity="0.3"/>
      <ellipse cx="99" cy="148" rx="14" ry="18" fill="#1a1a2e"/>
      <ellipse cx="99" cy="148" rx="8" ry="10" fill="#fff" opacity="0.15"/>
      <ellipse cx="55" cy="130" rx="18" ry="10" fill="#b9cdfd" opacity="0.35"/>
      <ellipse cx="145" cy="130" rx="18" ry="10" fill="#b9cdfd" opacity="0.35"/>
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#efefef"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#efefef"/>
    </svg>
  );
}

function MugPunk() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#3a3a4a" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#4a4a5e"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#5a5a6e"/>
      <path d="M 80 42 L 83 2 L 88 36 L 93 -2 L 98 34 L 103 -4 L 108 34 L 113 0 L 118 38 L 122 4 L 120 42" fill="#e60012" stroke="none"/>
      <path d="M 55 96 L 93 88" stroke="#c9dce8" strokeWidth="5" strokeLinecap="square"/>
      <path d="M 105 88 L 143 96" stroke="#c9dce8" strokeWidth="5" strokeLinecap="square"/>
      <ellipse cx="75" cy="112" rx="19" ry="17" fill="#ddd"/>
      <ellipse cx="125" cy="112" rx="19" ry="17" fill="#ddd"/>
      <ellipse cx="75" cy="112" rx="12" ry="14" fill="#1a1a1a"/>
      <ellipse cx="125" cy="112" rx="12" ry="14" fill="#1a1a1a"/>
      <circle cx="79" cy="108" r="4" fill="#fff" opacity="0.5"/>
      <circle cx="129" cy="108" r="4" fill="#fff" opacity="0.5"/>
      <circle cx="99" cy="135" r="6" fill="none" stroke="#c0c0c0" strokeWidth="3"/>
      <path d="M 86 152 Q 105 165 116 154" fill="none" stroke="#c9dce8" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="12" y1="118" x2="24" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="118" x2="12" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="176" y1="118" x2="188" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="188" y1="118" x2="176" y2="130" stroke="#c0c0c0" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="18" cy="125" rx="10" ry="14" fill="#4a4a5e"/>
      <ellipse cx="182" cy="125" rx="10" ry="14" fill="#4a4a5e"/>
    </svg>
  );
}

function MugSunny() {
  return (
    <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 175 90 Q 215 90 215 130 Q 215 175 175 165" fill="none" stroke="#f9d5a0" strokeWidth="22" strokeLinecap="round"/>
      <rect x="20" y="38" width="158" height="170" rx="22" fill="#fce4a0"/>
      <ellipse cx="99" cy="38" rx="79" ry="13" fill="#ffe8b0"/>
      <circle cx="44" cy="48" r="20" fill="#f4a435"/>
      <circle cx="156" cy="48" r="20" fill="#f4a435"/>
      <path d="M 52 42 Q 68 20 100 36 Q 132 20 148 42" fill="#f4a435"/>
      <circle cx="44" cy="44" r="7" fill="#e60012"/>
      <circle cx="156" cy="44" r="7" fill="#e60012"/>
      <ellipse cx="75" cy="108" rx="20" ry="20" fill="#fff"/>
      <ellipse cx="125" cy="108" rx="20" ry="20" fill="#fff"/>
      <path d="M 75 92 L 77 103 L 88 103 L 79 110 L 82 121 L 75 115 L 68 121 L 71 110 L 62 103 L 73 103 Z" fill="#f4a435"/>
      <path d="M 125 92 L 127 103 L 138 103 L 129 110 L 132 121 L 125 115 L 118 121 L 121 110 L 112 103 L 123 103 Z" fill="#f4a435"/>
      <ellipse cx="57" cy="127" rx="14" ry="9" fill="#f4a0b0" opacity="0.55"/>
      <ellipse cx="143" cy="127" rx="14" ry="9" fill="#f4a0b0" opacity="0.55"/>
      <path d="M 78 148 Q 99 168 120 148" fill="#f4a435" stroke="#d4831a" strokeWidth="2.5"/>
      <path d="M 85 152 Q 99 165 113 152" fill="#fff"/>
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

const ROW1 = [...MUGS, ...MUGS, ...MUGS];
const ROW2 = [...MUGS.slice(3), ...MUGS, ...MUGS, ...MUGS.slice(0, 3)];

export default function KaomugPage() {
  return (
    <div className={notoJP.variable} style={{
      fontFamily: 'var(--font-noto), sans-serif',
      background: '#FFB347',
      color: '#3a2010',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,179,71,0.97)',
        borderBottom: '1px solid rgba(232,135,0,0.25)',
      }}>
        {/* thin top stripe */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #E87000 0%, #5BC8E0 50%, #E87000 100%)', opacity: 0.4 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, padding: '0 clamp(16px,4vw,48px)' }}>
          {/* Logo */}
          <a href="/playground" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 22, height: 22, flexShrink: 0 }}>
              <div style={{ background: '#E87000', borderRadius: 2 }} />
              <div style={{ background: '#5BC8E0', borderRadius: 2 }} />
              <div style={{ background: '#e60012', borderRadius: 2 }} />
              <div style={{ background: '#fff100', borderRadius: 2 }} />
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#3a2010', letterSpacing: '-0.01em' }}>顔MUG</div>
              <div style={{ fontWeight: 400, fontSize: '0.58rem', color: 'rgba(58,32,16,0.55)', letterSpacing: '0.1em' }}>空想工房</div>
            </div>
          </a>
          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', color: 'rgba(58,32,16,0.65)', fontSize: '0.62rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
              マイページ
            </a>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textDecoration: 'none', color: 'rgba(58,32,16,0.65)', fontSize: '0.62rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.2 4H2V2H0v2h2l3.6 7.6-1.4 2.4C3.5 14.5 4 15.2 4 16c0 1.1.9 2 2 2h14v-2H6.4l1.1-2h8.5c.7 0 1.4-.4 1.7-1l3.4-6.2A1 1 0 0020.7 5H5.2z"/></svg>
              カート
            </a>
            <button aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 6 }}>
              <span style={{ display: 'block', width: 22, height: 2, background: '#3a2010', borderRadius: 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#3a2010', borderRadius: 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#3a2010', borderRadius: 1 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero — orange oval (Asahi age-gate layout) ───────────────────── */}
      <section style={{
        minHeight: 'calc(100vh - 71px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#FFB347', padding: '48px 20px',
      }}>
        <div style={{
          background: '#E87000',
          borderRadius: '50%',
          width: 'clamp(340px, 58vw, 700px)',
          height: 'clamp(300px, 50vw, 620px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(32px,5vw,64px) clamp(24px,4vw,56px)',
          textAlign: 'center',
          color: '#fff',
        }}>
          <p style={{ fontSize: 'clamp(0.72rem,1.2vw,0.88rem)', lineHeight: 1.9, marginBottom: 24, opacity: 0.85 }}>
            顔マグには、あなたの個性が込められています。<br />
            世界にひとつだけのセラミックマグへようこそ。
          </p>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem,3.5vw,2.6rem)', lineHeight: 1.25, marginBottom: 40, letterSpacing: '-0.01em' }}>
            あなたの顔を、<br />カップにしませんか？
          </h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'コレクションを見る', href: '#shop' },
              { label: 'カスタム注文', href: '#custom' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                background: '#5BC8E0', color: '#fff', textDecoration: 'none',
                fontWeight: 700, fontSize: 'clamp(0.82rem,1.4vw,0.95rem)', borderRadius: 9999,
                padding: '13px 32px',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                {label}
                <span style={{
                  background: 'rgba(255,255,255,0.28)', borderRadius: '50%',
                  width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', flexShrink: 0,
                }}>›</span>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.65, fontSize: '0.75rem' }}>
            <div style={{ width: 14, height: 14, border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: 2, flexShrink: 0 }} />
            次回から表示しない
          </div>
        </div>
      </section>

      {/* ── Scrolling mug rows (Asahi kvRow style) ──────────────────────── */}
      <section style={{ background: '#FFB347', paddingTop: 0, paddingBottom: 16, overflow: 'hidden' }}>
        {/* Row 1 — scrolls left */}
        <div style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 14, animation: 'km-row 32s linear infinite', width: 'max-content' }}>
            {ROW1.map(({ svg: Svg, name, tag, price }, i) => (
              <div key={i} style={{ background: '#4b271f', borderRadius: 44, padding: 16, flexShrink: 0, width: 210, boxShadow: '0 0 8px rgba(0,0,0,0.18)' }}>
                <div style={{ width: '100%', marginBottom: 10 }}><Svg /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{name}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#E87000' }}>{price}</span>
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', padding: '4px 4px 0' }}>{tag}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 14, animation: 'km-row-rev 32s linear infinite', width: 'max-content' }}>
            {ROW2.map(({ svg: Svg, name, tag, price }, i) => (
              <div key={i} style={{ background: '#4b271f', borderRadius: 44, padding: 16, flexShrink: 0, width: 210, boxShadow: '0 0 8px rgba(0,0,0,0.18)' }}>
                <div style={{ width: '100%', marginBottom: 10 }}><Svg /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{name}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#E87000' }}>{price}</span>
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', padding: '4px 4px 0' }}>{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop grid ────────────────────────────────────────────────────── */}
      <section id="shop" style={{ background: '#FFB347', padding: 'clamp(56px,7vh,96px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(58,32,16,0.45)', marginBottom: 8 }}>Collection</div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4.5vw,3rem)', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
                全キャラクター
              </h2>
            </div>
            <span style={{ color: 'rgba(58,32,16,0.4)', fontSize: '0.8rem', fontWeight: 500 }}>6 characters · All in stock</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
            {MUGS.map(({ svg: Svg, name, tag, price, desc }) => (
              <article key={name} style={{ background: '#4b271f', borderRadius: 44, overflow: 'hidden', boxShadow: '0 0 8px rgba(0,0,0,0.15)' }}>
                <div style={{ padding: '28px 20px 12px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 156 }}><Svg /></div>
                </div>
                <div style={{ padding: '12px 22px 26px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', color: '#E87000', textTransform: 'uppercase' }}>{tag}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{price}</span>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.15rem', margin: '0 0 6px', color: '#fff', letterSpacing: '-0.01em' }}>{name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem', lineHeight: 1.65, margin: '0 0 18px' }}>{desc}</p>
                  <button style={{
                    width: '100%', background: '#5BC8E0', color: '#fff',
                    fontFamily: 'var(--font-noto)', fontWeight: 700, fontSize: '0.82rem',
                    borderRadius: 9999, padding: '11px 0', cursor: 'pointer',
                    border: 'none', letterSpacing: '0.03em',
                  }}>
                    カートに追加
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom order ─────────────────────────────────────────────────── */}
      <section id="custom" style={{ background: '#E87000', padding: 'clamp(56px,7vh,96px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>Custom Orders</div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.2rem)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: '0 0 20px', color: '#fff' }}>
              あなただけの<br />一杯を。
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.88rem,1.4vw,1rem)', lineHeight: 1.8, maxWidth: '42ch', margin: '0 0 28px' }}>
              写真を送ってください。あなたの顔、ペット、大切な人—誰でも顔マグにできます。制作期間4週間、食器用グレーズ使用。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, maxWidth: 340, marginBottom: 28 }}>
              {[['01', '写真を送る'], ['02', '制作開始'], ['03', '4週で発送']].map(([num, label]) => (
                <div key={num} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
                  <div style={{ color: '#5BC8E0', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.12em', marginBottom: 6 }}>{num}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.78rem', color: '#fff' }}>{label}</div>
                </div>
              ))}
            </div>
            <a href="mailto:hello@kaomug.ph" style={{
              display: 'inline-block', background: '#5BC8E0', color: '#fff',
              textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
              borderRadius: 9999, padding: '13px 30px',
            }}>
              カスタム注文を始める
            </a>
          </div>
          <div style={{ flex: '0 0 auto', width: 220, transform: 'rotate(-4deg)', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.25))' }}>
            <MugPunk />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#FFB347', borderTop: '1px solid rgba(232,135,0,0.25)', padding: '40px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {/* Warning row (like Asahi's "stop underage drinking" footer) */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid rgba(232,135,0,0.2)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(58,32,16,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1rem' }}>☕</span>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'rgba(58,32,16,0.55)', lineHeight: 1.7, margin: 0, maxWidth: 360 }}>
                全ての顔マグは食器洗浄機対応、食器用釉薬を使用しています。ご安心してお使いください。電子レンジ使用可。
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: 18, height: 18 }}>
                <div style={{ background: '#E87000', borderRadius: 1.5 }} />
                <div style={{ background: '#5BC8E0', borderRadius: 1.5 }} />
                <div style={{ background: '#e60012', borderRadius: 1.5 }} />
                <div style={{ background: '#fff100', borderRadius: 1.5 }} />
              </div>
              <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#3a2010' }}>顔MUG</span>
            </div>
            <span style={{ color: 'rgba(58,32,16,0.4)', fontSize: '0.7rem' }}>
              ご利用規約 ／ プライバシーポリシー ／ 特定商取引法に基づく表記
            </span>
            <span style={{ color: 'rgba(58,32,16,0.35)', fontSize: '0.68rem' }}>
              Copyright &copy; {new Date().getFullYear()} 顔MUG 空想工房
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes km-row {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        @keyframes km-row-rev {
          from { transform: translateX(-33.3333%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
