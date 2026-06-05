import type { Metadata } from 'next';
import { Zen_Old_Mincho, Oswald } from 'next/font/google';

const zenMincho = Zen_Old_Mincho({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-mincho', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-oswald', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sora Realty — Premium Properties in the Philippines',
  description: 'Exceptional properties. Thoughtful placement. Find your place in the sky.',
};

// ── City skyline SVG ──────────────────────────────────────────────────────────

function CitySkyline() {
  return (
    <svg
      viewBox="0 0 1440 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
    >
      {/* Far background hills */}
      <ellipse cx="720" cy="600" rx="900" ry="260" fill="#1a3a5c" opacity="0.4"/>

      {/* Tower 1 — tallest center */}
      <rect x="640" y="60" width="90" height="460" fill="#2bdeff"/>
      {/* Tower 1 spire */}
      <polygon points="685,20 680,60 690,60" fill="#2bdeff"/>
      {/* Tower 1 windows grid */}
      {Array.from({ length: 18 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <rect key={`t1-${row}-${col}`}
            x={648 + col * 16} y={70 + row * 22}
            width="10" height="14"
            fill="rgba(0,0,0,0.45)"
          />
        ))
      )}
      {/* Antenna dot */}
      <circle cx="685" cy="16" r="4" fill="#2bdeff" opacity="0.7"/>

      {/* Tower 2 — left tall */}
      <rect x="490" y="120" width="70" height="400" fill="#2bdeff" opacity="0.7"/>
      <rect x="505" y="100" width="40" height="25" fill="#2bdeff" opacity="0.7"/>
      <line x1="525" y1="100" x2="525" y2="82" stroke="#2bdeff" strokeWidth="3" opacity="0.7"/>
      {Array.from({ length: 14 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <rect key={`t2-${row}-${col}`}
            x={498 + col * 20} y={130 + row * 24}
            width="12" height="16"
            fill="rgba(0,0,0,0.45)"
          />
        ))
      )}

      {/* Tower 3 — right tall */}
      <rect x="780" y="100" width="80" height="420" fill="#2bdeff" opacity="0.65"/>
      <rect x="793" y="80" width="54" height="24" fill="#2bdeff" opacity="0.65"/>
      <line x1="820" y1="80" x2="820" y2="58" stroke="#2bdeff" strokeWidth="3" opacity="0.6"/>
      <circle cx="820" cy="55" r="5" fill="#2bdeff" opacity="0.5"/>
      {Array.from({ length: 16 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <rect key={`t3-${row}-${col}`}
            x={788 + col * 18} y={108 + row * 24}
            width="11" height="16"
            fill="rgba(0,0,0,0.45)"
          />
        ))
      )}

      {/* Tower 4 — mid-left */}
      <rect x="360" y="180" width="55" height="340" fill="#2bdeff" opacity="0.5"/>
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <rect key={`t4-${row}-${col}`}
            x={368 + col * 16} y={192 + row * 28}
            width="10" height="18"
            fill="rgba(0,0,0,0.4)"
          />
        ))
      )}

      {/* Tower 5 — mid-right */}
      <rect x="920" y="160" width="60" height="360" fill="#2bdeff" opacity="0.5"/>
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => (
          <rect key={`t5-${row}-${col}`}
            x={928 + col * 18} y={172 + row * 28}
            width="12" height="18"
            fill="rgba(0,0,0,0.4)"
          />
        ))
      )}

      {/* Tower 6 — far left */}
      <rect x="220" y="240" width="45" height="280" fill="#2bdeff" opacity="0.35"/>
      {/* Tower 7 — far right */}
      <rect x="1070" y="220" width="50" height="300" fill="#2bdeff" opacity="0.35"/>

      {/* Small buildings */}
      <rect x="150" y="300" width="35" height="220" fill="#2bdeff" opacity="0.25"/>
      <rect x="1140" y="280" width="40" height="240" fill="#2bdeff" opacity="0.25"/>
      <rect x="1200" y="340" width="60" height="180" fill="#2bdeff" opacity="0.2"/>
      <rect x="80" y="360" width="50" height="160" fill="#2bdeff" opacity="0.2"/>

      {/* Ground plane */}
      <rect x="0" y="510" width="1440" height="10" fill="#2bdeff" opacity="0.15"/>

      {/* Architectural grid overlay */}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`vg-${i}`} x1={144 * i} y1="0" x2={144 * i} y2="520" stroke="#2bdeff" strokeWidth="0.4" opacity="0.12"/>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`hg-${i}`} x1="0" y1={86 * i} x2="1440" y2={86 * i} stroke="#2bdeff" strokeWidth="0.4" opacity="0.12"/>
      ))}
    </svg>
  );
}

// ── Property data ──────────────────────────────────────────────────────────────

const PROPERTIES = [
  { id: 'SR-001', name: 'The Meridian', location: 'BGC, Taguig', type: 'Condominium', beds: 3, area: 142, price: '₱28,000,000', tag: 'Featured', accentColor: '#2bdeff', floor: '28F' },
  { id: 'SR-002', name: 'Casa Celeste', location: 'Alabang, Muntinlupa', type: 'House & Lot', beds: 5, area: 320, price: '₱62,000,000', tag: 'New Listing', accentColor: '#c0c4ce', floor: null },
  { id: 'SR-003', name: 'Sky Residences 12A', location: 'Ortigas, Pasig', type: 'Condominium', beds: 2, area: 88, price: '₱12,500,000', tag: 'Move-in Ready', accentColor: '#48a08f', floor: '12F' },
  { id: 'SR-004', name: 'Hacienda Verde', location: 'Silang, Cavite', type: 'Farm Lot', beds: null, area: 1200, price: '₱18,000,000', tag: 'Investment', accentColor: '#8dc556', floor: null },
  { id: 'SR-005', name: 'The Residences at Azure', location: 'Parañaque City', type: 'Condominium', beds: 1, area: 54, price: '₱9,800,000', tag: 'Promo', accentColor: '#2bdeff', floor: '7F' },
];

// ── Section data ──────────────────────────────────────────────────────────────

const PANELS = [
  {
    num: '01 / 03',
    title: 'Urban Towers',
    subtitle: "Metro Manila’s Skyline",
    desc: 'Exceptional condominiums in BGC, Ortigas, and the Makati CBD. Floor-to-ceiling views, concierge services, and addresses that define your standard.',
    color: '#0a1c30',
    accent: '#2bdeff',
    prop: PROPERTIES[0],
  },
  {
    num: '02 / 03',
    title: 'Premium Estates',
    subtitle: 'Suburban Havens',
    desc: 'House-and-lot properties in Alabang, Cavite, and Laguna. Space for a family, a garden, and the kind of morning light you can only find outside the city.',
    color: '#fff',
    accent: '#0a1c30',
    prop: PROPERTIES[1],
  },
  {
    num: '03 / 03',
    title: 'Land & Investment',
    subtitle: 'Long-Horizon Assets',
    desc: "Farm lots and raw land for the patient investor. We identify parcels with infrastructure tailwinds, zoning potential, and the coordinates of the next decade's growth.",
    color: '#0a1c30',
    accent: '#2bdeff',
    prop: PROPERTIES[3],
  },
];

function PropertyMiniCard({ prop, accent }: { prop: typeof PROPERTIES[0]; accent: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: `1px solid ${accent}30`,
      padding: '20px 24px',
      position: 'relative',
    }}>
      {/* Small SVG cityscape thumbnail */}
      <div style={{ height: 100, background: '#04111e', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 300 100" fill="none" style={{ width: '100%', height: '100%', opacity: 0.5 }} aria-hidden="true">
          <rect x="110" y="10" width="30" height="90" fill={accent}/>
          <rect x="80" y="30" width="25" height="70" fill={accent} opacity="0.7"/>
          <rect x="145" y="25" width="28" height="75" fill={accent} opacity="0.65"/>
          <rect x="50" y="45" width="20" height="55" fill={accent} opacity="0.5"/>
          <rect x="180" y="40" width="22" height="60" fill={accent} opacity="0.5"/>
          {Array.from({length: 4}, (_, r) => Array.from({length: 2}, (_, c) => (
            <rect key={`${r}-${c}`} x={118+c*14} y={18+r*20} width="8" height="12" fill="rgba(0,0,0,0.5)"/>
          )))}
        </svg>
        {prop.floor && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.5)', border: `1px solid ${accent}50`,
            padding: '3px 8px',
          }}>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.68rem', color: accent, letterSpacing: '0.1em' }}>{prop.floor}</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.18em', color: accent, textTransform: 'uppercase' }}>{prop.tag}</span>
        <span style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', flexShrink: 0 }}/>
        <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{prop.id}</span>
      </div>
      <h4 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 4px', color: '#fff', lineHeight: 1.15 }}>{prop.name}</h4>
      <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 12px', letterSpacing: '0.04em' }}>{prop.location}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>{prop.price}</span>
        <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
          {prop.area} sqm{prop.beds ? ` · ${prop.beds} BR` : ''}
        </span>
      </div>
    </div>
  );
}

export default function SoraPage() {
  return (
    <div className={`${zenMincho.variable} ${oswald.variable}`} style={{ fontFamily: 'var(--font-oswald), sans-serif', background: '#fff', color: '#01000a', minHeight: '100vh' }}>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.96)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '0 clamp(20px,5vw,64px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/playground" style={{ color: '#01000a', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.2rem)', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>SORA</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.22em', color: '#909195', display: 'block' }}>REALTY</span>
          </a>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Properties', 'About', 'Agents', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: '#909195', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
          <a href="#properties" style={{
            background: '#01000a', color: '#fff', textDecoration: 'none',
            fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.78rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px 22px',
          }}>
            Find Property
          </a>
        </div>
      </nav>

      {/* ── Hero — full-screen dark navy ─────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a1c30',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Gradient atmosphere layer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #00091b 0%, #0a1c30 40%, #0a1c30 70%, rgba(10,28,48,0.85) 100%)',
          zIndex: 1,
        }}/>

        {/* City skyline illustration */}
        <CitySkyline />

        {/* Stars / ambient dots */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, opacity: 0.5 }} aria-hidden="true">
          {[
            [120, 80], [280, 50], [450, 120], [600, 40], [750, 90], [920, 60],
            [1080, 110], [1250, 45], [1380, 95], [200, 160], [500, 180], [850, 140],
            [1100, 170], [350, 200], [700, 220], [990, 195],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.2} fill="#fff" opacity={0.3 + (i % 4) * 0.1}/>
          ))}
        </svg>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,72px) clamp(60px,8vh,100px)', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: '#2bdeff' }}/>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.22em', color: '#c0c4ce', textTransform: 'uppercase' }}>
              Premium Properties · Philippines
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: 'var(--font-mincho)',
            fontWeight: 900,
            fontSize: 'clamp(3.5rem,8vw,7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            margin: '0 0 40px',
            color: '#fff',
            maxWidth: '14ch',
          }}>
            Find your<br />place in<br />
            <em style={{ fontStyle: 'italic', color: '#2bdeff' }}>the sky.</em>
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end' }}>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: 'clamp(0.95rem,1.4vw,1.05rem)', lineHeight: 1.75, maxWidth: '44ch', color: '#c0c4ce', margin: 0, flex: '1 1 280px' }}>
              Sora curates exceptional properties across Metro Manila and beyond. We match discerning buyers with homes that meet their exact standard — nothing more, nothing less.
            </p>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
              <a href="#properties" style={{
                background: '#2bdeff', color: '#01000a', textDecoration: 'none',
                fontFamily: 'var(--font-oswald)', fontWeight: 600, fontSize: '0.85rem',
                letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px',
              }}>
                Browse listings
              </a>
              <a href="#contact" style={{
                color: '#fff', textDecoration: 'none',
                fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '14px 28px', border: '1px solid rgba(255,255,255,0.2)',
              }}>
                Speak to an agent
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 64 }}>
            <div style={{
              width: 1, height: 44,
              background: 'linear-gradient(to bottom, transparent, #2bdeff)',
              animation: 'sora-scroll-pulse 2s ease-in-out infinite',
            }}/>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              Scroll Down
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <div style={{ background: '#ebf1ff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '28px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'space-around' }}>
          {[['₱2.1B', 'Total Listings Value'], ['87', 'Active Properties'], ['14', 'Years in Business'], ['98%', 'Client Satisfaction']].map(([num, label], i) => (
            <div key={label} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.02em', color: '#01000a' }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.16em', color: '#909195', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Numbered sections alternating ───────────────────────────────── */}
      {PANELS.map(({ num, title, subtitle, desc, color, accent, prop }, idx) => {
        const isDark = color === '#0a1c30';
        return (
          <section key={num} id={idx === 0 ? 'properties' : undefined} style={{ background: color, padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,72px)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>

              {/* Text side */}
              <div>
                {/* Section number — big display */}
                <div style={{
                  fontFamily: 'var(--font-oswald)',
                  fontWeight: 300,
                  fontSize: 'clamp(4rem,10vw,8rem)',
                  lineHeight: 1,
                  color: isDark ? 'rgba(43,222,255,0.15)' : 'rgba(10,28,48,0.08)',
                  letterSpacing: '-0.02em',
                  marginBottom: -24,
                  userSelect: 'none',
                }}>
                  {num}
                </div>

                <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.22em', color: isDark ? '#909195' : '#909195', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 24, height: 1, background: isDark ? '#2bdeff' : '#0a1c30', display: 'inline-block', flexShrink: 0 }}/>
                  {subtitle}
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-mincho)',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                  margin: '0 0 20px',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: isDark ? '#fff' : '#01000a',
                }}>
                  {title}
                </h2>

                <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: isDark ? '#c0c4ce' : '#615d6a', margin: '0 0 32px', maxWidth: '44ch' }}>
                  {desc}
                </p>

                <a href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: isDark ? '#2bdeff' : '#01000a',
                  color: isDark ? '#01000a' : '#fff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-oswald)', fontWeight: 600,
                  fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '12px 28px',
                }}>
                  View listings
                  <span style={{ fontSize: '1rem' }}>→</span>
                </a>
              </div>

              {/* Property card side */}
              <PropertyMiniCard prop={prop} accent={isDark ? '#2bdeff' : '#0a1c30'} />
            </div>
          </section>
        );
      })}

      {/* ── About / dark navy ───────────────────────────────────────────── */}
      <section style={{ background: '#0a1c30', padding: 'clamp(80px,10vh,120px) clamp(20px,5vw,72px)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.22em', color: '#909195', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 24, height: 1, background: '#2bdeff', display: 'inline-block' }}/>
              About Sora
            </div>
            <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.2rem)', margin: '0 0 24px', lineHeight: 1, letterSpacing: '-0.01em' }}>
              We don't sell<br /><em style={{ color: '#2bdeff', fontStyle: 'italic' }}>properties.</em><br />We place people.
            </h2>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: '#c0c4ce', margin: '0 0 32px', maxWidth: '40ch' }}>
              Fourteen years in Manila real estate taught us that the transaction is the easy part. What matters is the fit — the neighborhood, the light at 7am, the commute on a Tuesday.
            </p>
            <a href="#contact" style={{
              display: 'inline-block', background: '#2bdeff', color: '#01000a',
              textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 600,
              fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '13px 28px',
            }}>
              Meet the team
            </a>
          </div>

          <div>
            {[['14', 'Years in the industry'],['₱2.1B','In properties placed'],['87','Active listings now'],['98%','Referral rate from clients']].map(([num, label], i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.8rem', letterSpacing: '0.08em', color: '#909195', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: i === 0 ? '#2bdeff' : '#fff' }}>{num}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: '#ebf1ff', padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,72px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,3.5rem)', margin: '0 0 16px', lineHeight: 1, letterSpacing: '-0.01em' }}>
              Ready to<br />find your place?
            </h2>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.95rem', color: '#615d6a', lineHeight: 1.7, margin: 0, maxWidth: '44ch' }}>
              Tell us what you're looking for and we'll match you within 48 hours.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <a href="mailto:hello@sorarealty.ph" style={{
              background: '#01000a', color: '#fff', textDecoration: 'none',
              fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '1.05rem',
              letterSpacing: '0.06em', padding: '16px 36px',
            }}>
              hello@sorarealty.ph
            </a>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.14em', color: '#909195', textAlign: 'center', textTransform: 'uppercase' }}>
              Or call +63 2 8888 SORA
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer with watermark wordmark ──────────────────────────────── */}
      <footer style={{ background: '#0a1c30', padding: '48px clamp(20px,5vw,72px) 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Large watermark wordmark */}
        <div style={{
          position: 'absolute',
          bottom: -24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mincho)',
          fontWeight: 900,
          fontSize: 'clamp(4rem,14vw,10rem)',
          letterSpacing: '0.08em',
          color: 'rgba(43,222,255,0.04)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 1,
          pointerEvents: 'none',
        }}>
          SORA REALTY
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 48 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.05em', display: 'block', color: '#fff', marginBottom: 4 }}>SORA REALTY</span>
              <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.14em', color: '#909195', display: 'block' }}>© 2025 Sora Realty Inc.</span>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {['Properties', 'About', 'Agents', 'Contact'].map(l => (
                <a key={l} href="#" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.12em', color: '#909195', textDecoration: 'none', textTransform: 'uppercase' }}>{l}</a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, color: '#909195', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
              A playground project by{' '}
              <a href="/playground" style={{ color: '#c0c4ce', textDecoration: 'underline' }}>Christian Dizon</a>
              {' '}— inspired by Mori Trust design
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes sora-scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
