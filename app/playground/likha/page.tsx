import type { Metadata } from 'next';
import { Zen_Kaku_Gothic_New } from 'next/font/google';

const zenKaku = Zen_Kaku_Gothic_New({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-zen', display: 'swap' });

export const metadata: Metadata = {
  title: 'Likhâ — Handpainted Barong Collection',
  description: 'Barong Tagalog as a canvas. Original illustrations, hand-embroidered.',
};

// ── Barong SVGs ──────────────────────────────────────────────────────────────

function BarongBase({ color = '#fafaf5', stripeColor = 'rgba(0,0,0,0.07)' }: { color?: string; stripeColor?: string }) {
  return (
    <>
      <path d="M 40 80 L 20 280 Q 150 295 280 280 L 260 80 L 220 60 L 200 85 L 200 90 L 150 95 L 100 90 L 100 85 L 80 60 Z" fill={color}/>
      <path d="M 40 80 L 80 60 L 55 30 L 5 55 Z" fill={color}/>
      <path d="M 260 80 L 220 60 L 245 30 L 295 55 Z" fill={color}/>
      <path d="M 100 90 Q 100 62 150 58 Q 200 62 200 90 L 195 95 L 150 88 L 105 95 Z" fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
      <path d="M 105 95 L 100 90 Q 110 75 130 72 L 140 88 Z" fill="rgba(0,0,0,0.05)"/>
      <path d="M 195 95 L 200 90 Q 190 75 170 72 L 160 88 Z" fill="rgba(0,0,0,0.05)"/>
      <line x1="150" y1="90" x2="150" y2="275" stroke="rgba(0,0,0,0.12)" strokeWidth="2"/>
      {[108, 128, 148, 168, 188, 208, 228].map(y => (
        <circle key={y} cx="150" cy={y} r="5" fill="#f0ede8" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      ))}
      {Array.from({ length: 28 }, (_, i) => (
        <line key={i} x1="20" y1={90 + i * 7} x2="280" y2={90 + i * 7} stroke={stripeColor} strokeWidth="0.8"/>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="6" y1={56 + i * 7} x2="80" y2={74 + i * 4} stroke={stripeColor} strokeWidth="0.8"/>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="220" y1={74 + i * 4} x2="294" y2={56 + i * 7} stroke={stripeColor} strokeWidth="0.8"/>
      ))}
      <path d="M 150 10 L 150 38" stroke="#aaa" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 150 38 Q 130 30 118 42 Q 110 54 118 62 Q 130 68 150 58 Q 170 68 182 62 Q 190 54 182 42 Q 170 30 150 38" fill="none" stroke="#bbb" strokeWidth="3"/>
    </>
  );
}

function BarongNotebook() {
  return (
    <svg viewBox="0 0 300 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <BarongBase />
      <text x="55" y="135" fontFamily="'Courier New', monospace" fontSize="11" fontWeight="700" fill="#1a1a1a" opacity="0.75">ABC DEF</text>
      <text x="55" y="150" fontFamily="'Courier New', monospace" fontSize="11" fontWeight="700" fill="#1a1a1a" opacity="0.75">GHIJKLM</text>
      <text x="55" y="165" fontFamily="'Courier New', monospace" fontSize="11" fontWeight="700" fill="#1a1a1a" opacity="0.75">NOPQRSTU</text>
      <text x="60" y="180" fontFamily="'Courier New', monospace" fontSize="11" fontWeight="700" fill="#1a1a1a" opacity="0.75">VWXYZ</text>
      <path d="M 200 115 L 203 125 L 213 125 L 205 131 L 208 141 L 200 135 L 192 141 L 195 131 L 187 125 L 197 125 Z" fill="none" stroke="#e94a37" strokeWidth="2.5"/>
      <path d="M 220 108 L 222 116 L 230 116 L 224 121 L 226 129 L 220 124 L 214 129 L 216 121 L 210 116 L 218 116 Z" fill="none" stroke="#de3421" strokeWidth="2" opacity="0.6"/>
      <rect x="180" y="185" width="50" height="45" fill="none" stroke="#de3421" strokeWidth="2.5"/>
      <path d="M 175 192 L 205 170 L 235 192" fill="none" stroke="#e94a37" strokeWidth="2.5"/>
      <rect x="192" y="205" width="12" height="25" fill="none" stroke="#de3421" strokeWidth="2"/>
      <circle cx="210" cy="208" r="2" fill="#de3421"/>
      <line x1="245" y1="230" x2="245" y2="185" stroke="#2a5a1a" strokeWidth="3"/>
      <ellipse cx="245" cy="178" rx="14" ry="14" fill="none" stroke="#2a5a1a" strokeWidth="2.5"/>
      <ellipse cx="245" cy="183" rx="18" ry="18" fill="none" stroke="#2a5a1a" strokeWidth="2.5"/>
      <text x="68" y="220" fontFamily="'Courier New', monospace" fontSize="13" fontWeight="700" fill="#e60039" opacity="0.85">9/10 VG!</text>
      <path d="M 195 135 L 188 155 L 196 153 L 189 175" fill="none" stroke="#f4a435" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function BarongOcean() {
  return (
    <svg viewBox="0 0 300 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <BarongBase color="#f0f8ff" stripeColor="rgba(70,130,180,0.12)"/>
      <ellipse cx="100" cy="145" rx="32" ry="18" fill="none" stroke="#4c7ef3" strokeWidth="2.5"/>
      <path d="M 68 145 L 52 132 L 52 158 Z" fill="none" stroke="#4c7ef3" strokeWidth="2.5"/>
      <circle cx="116" cy="140" r="4" fill="#4c7ef3" opacity="0.7"/>
      <circle cx="116" cy="140" r="2" fill="#fff"/>
      <ellipse cx="195" cy="180" rx="20" ry="11" fill="none" stroke="#59bded" strokeWidth="2"/>
      <path d="M 175 180 L 163 171 L 163 189 Z" fill="none" stroke="#59bded" strokeWidth="2"/>
      <circle cx="208" cy="177" r="3" fill="#59bded" opacity="0.7"/>
      <circle cx="208" cy="177" r="1.5" fill="#fff"/>
      <path d="M 30 230 Q 55 220 80 230 Q 105 240 130 230 Q 155 220 180 230 Q 205 240 230 230 Q 255 220 270 230" fill="none" stroke="#4c7ef3" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 30 244 Q 55 234 80 244 Q 105 254 130 244 Q 155 234 180 244 Q 205 254 230 244 Q 255 234 270 244" fill="none" stroke="#59bded" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M 175 130 Q 180 118 188 118 Q 200 118 200 132 Q 200 145 188 150 Q 175 150 175 130 Z" fill="none" stroke="#de3421" strokeWidth="2"/>
      <path d="M 188 118 L 188 150" stroke="#de3421" strokeWidth="1.5" opacity="0.6"/>
      <path d="M 175 132 Q 188 132 200 132" stroke="#de3421" strokeWidth="1.5" opacity="0.6"/>
      <path d="M 60 255 Q 65 240 58 225 Q 63 210 56 195" fill="none" stroke="#2a5a1a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 60 230 Q 70 225 72 218" fill="none" stroke="#2a5a1a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 58 215 Q 50 210 48 203" fill="none" stroke="#2a5a1a" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="130" cy="160" r="4" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <circle cx="138" cy="150" r="3" fill="none" stroke="#59bded" strokeWidth="1.5"/>
      <circle cx="124" cy="148" r="2.5" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <path d="M 215 118 L 195 135 L 235 135 Z" fill="none" stroke="#de3421" strokeWidth="2"/>
      <line x1="225" y1="118" x2="225" y2="100" stroke="#de3421" strokeWidth="2"/>
      <path d="M 225 100 L 240 110 L 225 110 Z" fill="#de3421" opacity="0.7"/>
    </svg>
  );
}

function BarongGarden() {
  return (
    <svg viewBox="0 0 300 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <BarongBase color="#fafaf2" stripeColor="rgba(80,140,60,0.08)"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse key={i}
          cx={150 + Math.cos(deg * Math.PI / 180) * 24}
          cy={165 + Math.sin(deg * Math.PI / 180) * 24}
          rx="12" ry="8" fill="none"
          stroke={i % 2 === 0 ? '#de3421' : '#f4a435'}
          strokeWidth="2.5"
          transform={`rotate(${deg}, ${150 + Math.cos(deg * Math.PI / 180) * 24}, ${165 + Math.sin(deg * Math.PI / 180) * 24})`}
        />
      ))}
      <circle cx="150" cy="165" r="10" fill="none" stroke="#f4a435" strokeWidth="3"/>
      <circle cx="150" cy="165" r="5" fill="#f4a435" opacity="0.5"/>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i}
          cx={78 + Math.cos(deg * Math.PI / 180) * 14}
          cy={145 + Math.sin(deg * Math.PI / 180) * 14}
          rx="7" ry="5" fill="none" stroke="#59bded" strokeWidth="2"
          transform={`rotate(${deg}, ${78 + Math.cos(deg * Math.PI / 180) * 14}, ${145 + Math.sin(deg * Math.PI / 180) * 14})`}
        />
      ))}
      <circle cx="78" cy="145" r="6" fill="#f4a435" opacity="0.6"/>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i}
          cx={218 + Math.cos(deg * Math.PI / 180) * 14}
          cy={138 + Math.sin(deg * Math.PI / 180) * 14}
          rx="7" ry="5" fill="none" stroke="#de3421" strokeWidth="2"
          transform={`rotate(${deg}, ${218 + Math.cos(deg * Math.PI / 180) * 14}, ${138 + Math.sin(deg * Math.PI / 180) * 14})`}
        />
      ))}
      <circle cx="218" cy="138" r="6" fill="#de3421" opacity="0.5"/>
      <line x1="78" y1="159" x2="78" y2="200" stroke="#2a6a18" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="150" y1="180" x2="150" y2="230" stroke="#2a6a18" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="218" y1="152" x2="218" y2="200" stroke="#2a6a18" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 78 175 Q 60 168 58 158" fill="none" stroke="#3a8a20" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 78 183 Q 96 176 98 166" fill="none" stroke="#3a8a20" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 150 205 Q 132 198 130 188" fill="none" stroke="#3a8a20" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 150 215 Q 168 208 170 198" fill="none" stroke="#3a8a20" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 185 110 Q 176 98 172 106 Q 168 114 176 116 Q 180 117 185 110 Z" fill="none" stroke="#b81a2d" strokeWidth="2"/>
      <path d="M 185 110 Q 194 98 198 106 Q 202 114 194 116 Q 190 117 185 110 Z" fill="none" stroke="#b81a2d" strokeWidth="2"/>
      <path d="M 185 110 Q 178 115 176 122 Q 174 128 180 126 Q 184 125 185 118 Z" fill="none" stroke="#b81a2d" strokeWidth="1.5"/>
      <path d="M 185 110 Q 192 115 194 122 Q 196 128 190 126 Q 186 125 185 118 Z" fill="none" stroke="#b81a2d" strokeWidth="1.5"/>
      <circle cx="185" cy="112" r="2" fill="#b81a2d"/>
      <ellipse cx="95" cy="118" rx="7" ry="5" fill="none" stroke="#f4a435" strokeWidth="2"/>
      <line x1="89" y1="118" x2="101" y2="118" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M 92 113 Q 91 107 96 108" fill="none" stroke="#ccc" strokeWidth="1.5"/>
      <path d="M 98 113 Q 99 107 104 108" fill="none" stroke="#ccc" strokeWidth="1.5"/>
      <path d="M 55 210 Q 90 215 150 210 Q 210 205 245 210" fill="none" stroke="rgba(90,55,20,0.4)" strokeWidth="2" strokeDasharray="4 4"/>
    </svg>
  );
}

function BarongCity() {
  return (
    <svg viewBox="0 0 300 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <BarongBase color="#f8f4f0" stripeColor="rgba(50,50,80,0.07)"/>
      <rect x="58" y="185" width="28" height="55" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <rect x="62" y="175" width="20" height="15" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <rect x="63" y="192" width="5" height="5" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <rect x="72" y="192" width="5" height="5" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <rect x="63" y="204" width="5" height="5" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <rect x="72" y="204" width="5" height="5" fill="none" stroke="#4c7ef3" strokeWidth="1.5"/>
      <rect x="92" y="170" width="35" height="70" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <rect x="98" y="158" width="23" height="16" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <line x1="109" y1="158" x2="109" y2="148" stroke="#1a1a3a" strokeWidth="2"/>
      {[175, 185, 195, 205, 215].map(y => (
        <g key={y}>
          <rect x="97" y={y} width="6" height="6" fill="none" stroke="#f4a435" strokeWidth="1.5"/>
          <rect x="108" y={y} width="6" height="6" fill="none" stroke="#f4a435" strokeWidth="1.5"/>
          <rect x="119" y={y} width="6" height="6" fill="none" stroke="#f4a435" strokeWidth="1.5"/>
        </g>
      ))}
      <rect x="155" y="155" width="40" height="85" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <rect x="163" y="143" width="24" height="16" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <line x1="175" y1="143" x2="175" y2="130" stroke="#1a1a3a" strokeWidth="2"/>
      <circle cx="175" cy="128" r="4" fill="none" stroke="#de3421" strokeWidth="2"/>
      {[162, 172, 182, 192, 202, 212].map(y => (
        <g key={y}>
          <rect x="161" y={y} width="6" height="6" fill="none" stroke="#59bded" strokeWidth="1.5"/>
          <rect x="172" y={y} width="6" height="6" fill="none" stroke="#59bded" strokeWidth="1.5"/>
          <rect x="183" y={y} width="6" height="6" fill="none" stroke="#59bded" strokeWidth="1.5"/>
        </g>
      ))}
      <rect x="202" y="190" width="30" height="50" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <rect x="208" y="200" width="6" height="6" fill="none" stroke="#de3421" strokeWidth="1.5"/>
      <rect x="218" y="200" width="6" height="6" fill="none" stroke="#de3421" strokeWidth="1.5"/>
      <rect x="208" y="212" width="6" height="6" fill="none" stroke="#de3421" strokeWidth="1.5"/>
      <rect x="218" y="212" width="6" height="6" fill="none" stroke="#de3421" strokeWidth="1.5"/>
      <path d="M 40 242 L 260 242" stroke="#666" strokeWidth="2" strokeDasharray="8 5"/>
      <rect x="90" y="233" width="36" height="14" rx="4" fill="none" stroke="#4c7ef3" strokeWidth="2"/>
      <circle cx="97" cy="247" r="4" fill="none" stroke="#4c7ef3" strokeWidth="2"/>
      <circle cx="119" cy="247" r="4" fill="none" stroke="#4c7ef3" strokeWidth="2"/>
      <path d="M 96 233 Q 99 224 109 223 Q 119 224 122 233" fill="none" stroke="#4c7ef3" strokeWidth="2"/>
      <path d="M 82 130 L 98 125 L 82 120 Z" fill="none" stroke="#1a1a3a" strokeWidth="2"/>
      <line x1="82" y1="125" x2="66" y2="125" stroke="#1a1a3a" strokeWidth="2"/>
      <path d="M 76 125 L 72 118 L 68 125 L 72 132 Z" fill="none" stroke="#1a1a3a" strokeWidth="1.5"/>
      <path d="M 195 118 Q 195 110 202 110 Q 202 104 209 104 Q 216 104 218 110 Q 225 109 226 115 Q 229 115 229 120 Q 229 125 225 125 L 197 125 Q 193 125 193 121 Q 193 118 195 118 Z" fill="none" stroke="#aaa" strokeWidth="1.5"/>
    </svg>
  );
}

// ── Collection data ───────────────────────────────────────────────────────────

const COLLECTION = [
  { id: '01', barong: BarongNotebook, name: 'Notebook', nameFil: 'Kwaderno', accent: '#e60039', tag: 'The Original', price: '₱4,800',
    desc: 'Hand-embroidered alphabet, a house, stars, and a 9/10 grade. Every childhood memory in one shirt.' },
  { id: '02', barong: BarongOcean,    name: 'Ocean',    nameFil: 'Dagat',    accent: '#4c7ef3', tag: 'Summer Collection', price: '₱4,800',
    desc: 'Fish, seaweed, a little boat, and waves that go nowhere. The sea stitched into jusi.' },
  { id: '03', barong: BarongGarden,   name: 'Garden',   nameFil: 'Hardin',   accent: '#3a8a20', tag: 'Best Seller', price: '₱5,200',
    desc: 'Flowers, a butterfly, a tiny bee. Everything a neighborhood garden has — in embroidery thread.' },
  { id: '04', barong: BarongCity,     name: 'City',     nameFil: 'Lungsod',  accent: '#1a1a3a', tag: 'New Drop', price: '₱5,200',
    desc: 'The Manila skyline stitched on piña. Buildings you know, a jeepney, one small airplane.' },
];

// ── Inline doodle SVG decorations ────────────────────────────────────────────

function DoodleLightning({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="40" height="72" viewBox="0 0 40 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      <path d="M28 4L8 38H22L12 68L36 28H22L28 4Z" stroke="#333" strokeWidth="3" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function DoodleSpiral({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      <path d="M24 24 Q36 12 36 24 Q36 38 20 38 Q6 38 6 24 Q6 8 24 8 Q42 8 42 24 Q42 42 24 42" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function DoodleStar({ style, color = '#333' }: { style?: React.CSSProperties; color?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      <path d="M18 4L21 14H32L23 20L26 31L18 25L10 31L13 20L4 14H15Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function DoodleZigzag({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      <path d="M2 20L16 4L30 20L44 4L58 20L72 4" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function DoodleDots({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      {[6,18,30,42].map(x => [6,18,30,42].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#333" opacity="0.25"/>
      )))}
    </svg>
  );
}

function DoodleCircle({ style, color = '#333' }: { style?: React.CSSProperties; color?: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', ...style }} aria-hidden="true">
      <circle cx="26" cy="26" r="22" stroke={color} strokeWidth="3" fill="none" strokeDasharray="6 4"/>
    </svg>
  );
}

export default function LikhaPage() {
  return (
    <div className={zenKaku.variable} style={{ fontFamily: 'var(--font-zen), sans-serif', background: '#FFEE00', color: '#000', minHeight: '100vh' }}>

      {/* ── Nav (white bar) ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#fff',
        borderBottom: '2px solid #333',
        padding: '0 clamp(20px,5vw,64px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/playground" style={{ color: '#000', textDecoration: 'none', fontWeight: 900, fontSize: 'clamp(1.1rem,2.2vw,1.35rem)', letterSpacing: '-0.02em' }}>
            LIKHÂ<span style={{ color: '#e60039' }}>.</span>
          </a>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {['Collection', 'About', 'Custom'].map(l => (
              <a key={l} href="#" style={{ color: '#555', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 700 }}>{l}</a>
            ))}
          </div>
          <a href="#collection" style={{
            background: '#000', color: '#fff', textDecoration: 'none',
            fontWeight: 700, fontSize: '0.82rem', borderRadius: 900,
            padding: '10px 22px', letterSpacing: '0.04em',
          }}>
            Shop Collection
          </a>
        </div>
      </nav>

      {/* ── Hero (yellow, full doodles) ──────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(64px,10vh,120px) clamp(20px,5vw,64px) clamp(48px,6vh,80px)', overflow: 'hidden' }}>

        {/* Scattered doodles */}
        <DoodleLightning style={{ top: 40, left: '8%', opacity: 0.55 }} />
        <DoodleSpiral style={{ top: 80, right: '12%', opacity: 0.45 }} />
        <DoodleStar style={{ top: 20, left: '28%', opacity: 0.5 }} />
        <DoodleStar style={{ bottom: 40, right: '22%', opacity: 0.4, width: 24, height: 24 }} />
        <DoodleZigzag style={{ bottom: 60, left: '6%', opacity: 0.4 }} />
        <DoodleDots style={{ top: 60, right: '30%', opacity: 0.6 }} />
        <DoodleCircle style={{ bottom: 20, right: '5%', opacity: 0.35 }} />
        <DoodleLightning style={{ bottom: 80, left: '40%', opacity: 0.3, width: 28, height: 52 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 32, position: 'relative', zIndex: 1 }}>
          <div style={{ flex: '1 1 320px', paddingBottom: 48 }}>

            {/* Section number pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#e60039', color: '#fff', fontWeight: 700,
              fontSize: '0.68rem', letterSpacing: '0.18em', padding: '6px 16px',
              borderRadius: 900, marginBottom: 28, textTransform: 'uppercase',
            }}>
              <span>Barong Tagalog</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>Hand-Embroidered</span>
            </div>

            <h1 style={{
              fontWeight: 900,
              fontSize: 'clamp(3rem,8vw,6.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: '0 0 28px',
            }}>
              Tradition<br />as a<br />
              <em style={{ fontStyle: 'italic', color: '#e60039' }}>canvas.</em>
            </h1>

            <p style={{ color: '#333', fontSize: 'clamp(1rem,1.5vw,1.1rem)', lineHeight: 1.7, maxWidth: '46ch', margin: '0 0 36px' }}>
              The barong tagalog is the most Filipino garment there is. We took that and covered it in drawings — childlike, free, impossible to ignore.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#collection" style={{
                background: '#e60039', color: '#fff', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.92rem', borderRadius: 900,
                padding: '14px 32px',
              }}>
                View the collection
              </a>
              <a href="#custom" style={{
                color: '#000', textDecoration: 'none', fontWeight: 700,
                fontSize: '0.92rem', borderRadius: 900, padding: '14px 26px',
                border: '2.5px solid #333',
              }}>
                Custom design →
              </a>
            </div>
          </div>

          {/* Hero barong cluster */}
          <div style={{ flex: '0 0 auto', display: 'flex', gap: 12, alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 170, transform: 'rotate(-5deg) translateY(10px)', opacity: 0.75 }}>
              <BarongOcean />
            </div>
            <div style={{ width: 210 }}>
              <BarongNotebook />
            </div>
            <div style={{ width: 165, transform: 'rotate(5deg) translateY(8px)', opacity: 0.8 }}>
              <BarongGarden />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar (black) ────────────────────────────────────────────── */}
      <div style={{ background: '#000', color: '#fff', padding: '20px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-around' }}>
          {[['4', 'Designs'], ['100%', 'Jusi Fabric'], ['Hand', 'Embroidered'], ['4 wks', 'Custom Lead Time']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.03em', color: '#FFEE00' }}>{num}</div>
              <div style={{ fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Collection (white notebook grid section) ─────────────────────── */}
      <section id="collection" style={{
        background: '#fff',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)',
        borderTop: '2px solid #333',
        borderBottom: '2px solid #333',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: 48, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#e60039', textTransform: 'uppercase', marginBottom: 8 }}>
                02 / Collection
              </div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.04em', margin: 0 }}>
                2025 Collection
              </h2>
            </div>
          </div>

          {/* Report-style cards with film-strip holes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {COLLECTION.map(({ id, barong: Barong, name, nameFil, accent, tag, price, desc }) => (
              <article key={id} style={{ background: '#fff', border: '2.5px solid #333', position: 'relative' }}>

                {/* Film-strip holes top */}
                <div style={{
                  height: 20, background: '#333',
                  backgroundImage: 'radial-gradient(circle, #fff 6px, transparent 6px)',
                  backgroundSize: '28px 20px',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: '8px center',
                }}/>

                {/* Barong display */}
                <div style={{
                  background: '#FFEE00',
                  padding: '28px 20px 16px',
                  display: 'flex', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {/* Big number watermark */}
                  <div style={{
                    position: 'absolute', top: 12, left: 16,
                    fontWeight: 900, fontSize: '3.5rem', lineHeight: 1,
                    color: '#000', opacity: 0.1,
                  }}>{id}</div>

                  {/* Doodle accents per card */}
                  {id === '01' && <DoodleStar style={{ top: 12, right: 16, opacity: 0.5, width: 28, height: 28 }} />}
                  {id === '02' && <DoodleZigzag style={{ bottom: 8, right: 8, opacity: 0.4, width: 60, height: 18 }} />}
                  {id === '03' && <DoodleCircle style={{ bottom: 4, right: 4, opacity: 0.3, width: 40, height: 40 }} />}
                  {id === '04' && <DoodleLightning style={{ top: 8, right: 12, opacity: 0.4, width: 24, height: 44 }} />}

                  <div style={{ width: 190 }}>
                    <Barong />
                  </div>
                </div>

                {/* Film-strip holes bottom */}
                <div style={{
                  height: 20, background: '#333',
                  backgroundImage: 'radial-gradient(circle, #fff 6px, transparent 6px)',
                  backgroundSize: '28px 20px',
                  backgroundRepeat: 'repeat-x',
                  backgroundPosition: '8px center',
                }}/>

                {/* Card body */}
                <div style={{ padding: '20px 20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', color: accent, textTransform: 'uppercase' }}>{tag}</span>
                    <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>{price}</span>
                  </div>
                  <h3 style={{ fontWeight: 900, fontSize: '1.3rem', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{name}</h3>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#999', letterSpacing: '0.06em', marginBottom: 10 }}>{nameFil}</div>
                  <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.65, margin: '0 0 20px' }}>{desc}</p>
                  <button style={{
                    width: '100%', background: '#000', color: '#fff',
                    fontFamily: 'var(--font-zen)', fontWeight: 700, fontSize: '0.82rem',
                    border: 'none', padding: '13px 0', cursor: 'pointer',
                    letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 900,
                  }}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Process (yellow with doodles) ───────────────────────── */}
      <section id="about" style={{ background: '#FFEE00', padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)', position: 'relative', overflow: 'hidden' }}>

        <DoodleSpiral style={{ top: 24, left: '5%', opacity: 0.4 }} />
        <DoodleDots style={{ top: 40, right: '10%', opacity: 0.5 }} />
        <DoodleZigzag style={{ bottom: 32, right: '8%', opacity: 0.35 }} />
        <DoodleStar style={{ bottom: 48, left: '15%', opacity: 0.4, width: 32, height: 32 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section number */}
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#e60039', textTransform: 'uppercase', marginBottom: 12 }}>
            03 / Process
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.04em', margin: '0 0 48px' }}>
            Made by hand.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              ['01', 'Draw', 'An illustrator sketches the motif on paper.', '#e60039'],
              ['02', 'Transfer', 'The design is traced onto the fabric.', '#4c7ef3'],
              ['03', 'Stitch', 'Hand-embroidered by craftswomen in Pampanga.', '#3a8a20'],
              ['04', 'Finish', 'Washed, pressed, and tagged.', '#1a1a3a'],
            ].map(([num, head, body, color]) => (
              <div key={num} style={{
                background: '#fff',
                border: '2.5px solid #333',
                padding: '24px 20px',
              }}>
                <div style={{ fontWeight: 900, fontSize: '2.5rem', lineHeight: 1, color, marginBottom: 12, opacity: 0.85 }}>{num}</div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: 8 }}>{head}</div>
                <div style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (white notebook grid) ───────────────────────────────────── */}
      <section id="custom" style={{
        background: '#fff',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)',
        borderTop: '2px solid #333',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.22em', color: '#e60039', textTransform: 'uppercase', marginBottom: 12 }}>
            04 / Custom
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.04em', margin: '0 0 12px' }}>
            Commission a design
          </h2>
          <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.75, maxWidth: '48ch', margin: '0 0 36px' }}>
            Each Likhâ barong starts as plain piña-jusi. An illustrator draws the motif by hand, then it's transferred to thread and stitched by craftswomen in Pampanga. No two pieces are exactly identical.
          </p>

          {/* Pill button grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="mailto:hello@likha.ph" style={{
              background: '#87CEEB', color: '#000', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.92rem', borderRadius: 900,
              padding: '14px 32px', border: '2px solid #333',
            }}>
              Instagram
            </a>
            <a href="mailto:hello@likha.ph" style={{
              background: '#FFEE00', color: '#000', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.92rem', borderRadius: 900,
              padding: '14px 32px', border: '2px solid #333',
            }}>
              Email us
            </a>
            <a href="mailto:hello@likha.ph" style={{
              background: '#8DC556', color: '#000', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.92rem', borderRadius: 900,
              padding: '14px 32px', border: '2px solid #333',
            }}>
              Start a commission
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#333', color: '#fff', padding: '36px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            LIKHÂ<span style={{ color: '#e60039' }}>.</span>
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>
            A playground project by{' '}
            <a href="/playground" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>Christian Dizon</a>
            {' '}— inspired by Kakuwaku/ZEBRA design
          </span>
        </div>
      </footer>
    </div>
  );
}
