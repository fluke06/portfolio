import type React from 'react';
import type { Metadata } from 'next';
import { Zen_Old_Mincho, Oswald } from 'next/font/google';

const zenMincho = Zen_Old_Mincho({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-mincho', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-oswald', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sora Realty — Premium Properties in the Philippines',
  description: 'Exceptional properties. Thoughtful placement. Find your place in the sky.',
};

const PROPERTIES = [
  {
    id: 'SR-001',
    name: 'The Meridian',
    location: 'BGC, Taguig',
    type: 'Condominium',
    beds: 3,
    area: 142,
    price: '₱28,000,000',
    tag: 'Featured',
    color: '#0a1c30',
    accentColor: '#2bdeff',
    floor: '28F',
  },
  {
    id: 'SR-002',
    name: 'Casa Celeste',
    location: 'Alabang, Muntinlupa',
    type: 'House & Lot',
    beds: 5,
    area: 320,
    price: '₱62,000,000',
    tag: 'New Listing',
    color: '#1a0c30',
    accentColor: '#c0c4ce',
    floor: '—',
  },
  {
    id: 'SR-003',
    name: 'Sky Residences 12A',
    location: 'Ortigas, Pasig',
    type: 'Condominium',
    beds: 2,
    area: 88,
    price: '₱12,500,000',
    tag: 'Move-in Ready',
    color: '#001a1c',
    accentColor: '#48a08f',
    floor: '12F',
  },
  {
    id: 'SR-004',
    name: 'Hacienda Verde',
    location: 'Silang, Cavite',
    type: 'Farm Lot',
    beds: null,
    area: 1200,
    price: '₱18,000,000',
    tag: 'Investment',
    color: '#0c2010',
    accentColor: '#8dc556',
    floor: '—',
  },
  {
    id: 'SR-005',
    name: 'The Residences at Azure',
    location: 'Parañaque City',
    type: 'Condominium',
    beds: 1,
    area: 54,
    price: '₱9,800,000',
    tag: 'Promo',
    color: '#001428',
    accentColor: '#2bdeff',
    floor: '7F',
  },
];

function PropertyCard({ prop, large = false }: { prop: typeof PROPERTIES[0]; large?: boolean }) {
  return (
    <article style={{ background: prop.color, borderRadius: 0, overflow: 'hidden', position: 'relative', aspectRatio: large ? '16/10' : '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Architectural grid overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <line key={`v${i}`} x1={50 * i} y1="0" x2={50 * i} y2="300" stroke="#fff" strokeWidth="0.5"/>)}
        {Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} x1="0" y1={50 * i} x2="400" y2={50 * i} stroke="#fff" strokeWidth="0.5"/>)}
        <circle cx="200" cy="150" r="80" stroke="#fff" strokeWidth="0.5" fill="none"/>
        <circle cx="200" cy="150" r="120" stroke="#fff" strokeWidth="0.5" fill="none"/>
      </svg>

      {/* Building silhouette illustration */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        {/* Main tower */}
        <rect x="160" y="60" width="80" height="240" fill={prop.accentColor}/>
        {/* Tower details */}
        {Array.from({ length: 16 }, (_, i) => (
          <g key={i}>
            <rect x="168" y={70 + i * 14} width="12" height="8" fill="rgba(0,0,0,0.5)"/>
            <rect x="184" y={70 + i * 14} width="12" height="8" fill="rgba(0,0,0,0.5)"/>
            <rect x="200" y={70 + i * 14} width="12" height="8" fill="rgba(0,0,0,0.5)"/>
            <rect x="216" y={70 + i * 14} width="12" height="8" fill="rgba(0,0,0,0.5)"/>
          </g>
        ))}
        {/* Spire */}
        <path d="M 195 60 L 200 20 L 205 60 Z" fill={prop.accentColor}/>
        {/* Side building */}
        <rect x="240" y="120" width="50" height="180" fill={prop.accentColor} opacity="0.6"/>
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="248" y={130 + i * 18} width="8" height="10" fill="rgba(0,0,0,0.5)"/>
        ))}
        {/* Left building */}
        <rect x="100" y="140" width="55" height="160" fill={prop.accentColor} opacity="0.5"/>
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i}>
            <rect x="108" y={152 + i * 18} width="8" height="10" fill="rgba(0,0,0,0.5)"/>
            <rect x="122" y={152 + i * 18} width="8" height="10" fill="rgba(0,0,0,0.5)"/>
          </g>
        ))}
        {/* Ground / horizon */}
        <line x1="0" y1="300" x2="400" y2="300" stroke={prop.accentColor} strokeWidth="1"/>
      </svg>

      {/* Content overlay */}
      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: large ? '28px 28px 28px' : '16px 18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.18em', color: prop.accentColor, textTransform: 'uppercase' }}>{prop.tag}</span>
              <span style={{ width: 3, height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }}/>
              <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.68rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{prop.id}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: large ? 'clamp(1.4rem,2.5vw,2rem)' : 'clamp(1rem,2vw,1.35rem)', margin: '0 0 4px', color: '#fff', lineHeight: 1.1 }}>{prop.name}</h3>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.04em' }}>{prop.location}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: 16 }}>
            <div style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: large ? '1.25rem' : '1rem', color: '#fff', lineHeight: 1 }}>{prop.price}</div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '0.06em' }}>{prop.area} sqm · {prop.beds ? `${prop.beds} BR` : 'Lot'}</div>
          </div>
        </div>
      </div>

      {/* Floor badge */}
      {prop.floor !== '—' && (
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: `1px solid ${prop.accentColor}40`, borderRadius: 0, padding: '5px 10px' }}>
          <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.72rem', color: prop.accentColor, letterSpacing: '0.1em' }}>{prop.floor}</span>
        </div>
      )}
    </article>
  );
}

export default function SoraPage() {
  return (
    <div className={`${zenMincho.variable} ${oswald.variable}`} style={{ fontFamily: 'var(--font-oswald), sans-serif', background: '#fff', color: '#01000a', minHeight: '100vh' }}>

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0 clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="/playground" style={{ color: '#01000a', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.25rem)', letterSpacing: '0.05em', display: 'block', lineHeight: 1 }}>SORA</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.62rem', letterSpacing: '0.22em', color: '#909195', display: 'block' }}>REALTY</span>
          </a>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Properties', 'About', 'Agents', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: '#909195', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</a>
            ))}
          </div>
          <a href="#properties" style={{ background: '#01000a', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 22px' }}>
            Find Property
          </a>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,12vh,160px) clamp(20px,5vw,64px) clamp(60px,8vh,100px)', maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Architectural grid background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.04, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 16 }, (_, i) => <line key={i} x1={`${6.25 * i}%`} y1="0" x2={`${6.25 * i}%`} y2="100%" stroke="#000" strokeWidth="1"/>)}
            {Array.from({ length: 8 }, (_, i) => <line key={i} x1="0" y1={`${12.5 * i}%`} x2="100%" y2={`${12.5 * i}%`} stroke="#000" strokeWidth="1"/>)}
          </svg>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 32, height: 1, background: '#01000a', marginTop: '0.7em', flexShrink: 0 }}/>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.78rem', letterSpacing: '0.2em', color: '#909195', textTransform: 'uppercase' }}>
              Premium Properties · Philippines
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 900, fontSize: 'clamp(3.2rem,8vw,7rem)', lineHeight: 0.9, letterSpacing: '-0.01em', margin: '0 0 36px', maxWidth: '14ch' }}>
            Find your<br />place in<br /><em style={{ fontStyle: 'italic', color: '#2bdeff', WebkitTextStroke: '1px #01000a' } as React.CSSProperties}>the sky.</em>
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end' }}>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: 'clamp(1rem,1.5vw,1.1rem)', lineHeight: 1.7, maxWidth: '44ch', color: '#615d6a', margin: 0, flex: '1 1 280px' }}>
              Sora curates exceptional properties across Metro Manila and beyond. We match discerning buyers with homes that meet their exact standard — nothing more, nothing less.
            </p>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <a href="#properties" style={{ background: '#01000a', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px' }}>
                Browse listings
              </a>
              <a href="#contact" style={{ color: '#01000a', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 24px', border: '1px solid #615d6a' }}>
                Speak to an agent
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div style={{ background: '#ebf1ff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '28px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'space-around' }}>
          {[['₱2.1B', 'Total Listings Value'], ['87', 'Active Properties'], ['14', 'Years in Business'], ['98%', 'Client Satisfaction']].map(([num, label], i) => (
            <div key={label} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid rgba(0,0,0,0.1)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.02em', color: '#01000a' }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.14em', color: '#909195', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Properties ────────────────────────────────────────── */}
      <section id="properties" style={{ padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.2em', color: '#909195', textTransform: 'uppercase', marginBottom: 10 }}>Current Listings</div>
            <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: 0, letterSpacing: '-0.01em' }}>Featured Properties</h2>
          </div>
          <a href="#" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.1em', color: '#01000a', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid #01000a', paddingBottom: 2 }}>
            View all 87 listings →
          </a>
        </div>

        {/* Featured large */}
        <div style={{ marginBottom: 16 }}>
          <PropertyCard prop={PROPERTIES[0]} large />
        </div>

        {/* 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
          <PropertyCard prop={PROPERTIES[1]} />
          <PropertyCard prop={PROPERTIES[2]} />
        </div>

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          <PropertyCard prop={PROPERTIES[3]} />
          <PropertyCard prop={PROPERTIES[4]} />
          <div style={{ background: '#01000a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 32, textAlign: 'center', minHeight: 200 }}>
            <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: '1.4rem', color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>83 more listings available</span>
            <a href="#" style={{ fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.14em', color: '#2bdeff', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid #2bdeff40', paddingBottom: 2 }}>
              Browse all →
            </a>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#01000a', padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.72rem', letterSpacing: '0.2em', color: '#909195', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 24, height: 1, background: '#909195', display: 'inline-block' }}/>
              <span>About Sora</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.2rem)', margin: '0 0 24px', lineHeight: 1, letterSpacing: '-0.01em' }}>
              We don't sell<br /><em style={{ color: '#2bdeff', fontStyle: 'italic' }}>properties.</em><br />We place people.
            </h2>
            <p style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: '#c0c4ce', margin: '0 0 32px', maxWidth: '40ch' }}>
              Fourteen years in Manila real estate taught us that the transaction is the easy part. What matters is the fit — the neighborhood, the light at 7am, the commute on a Tuesday.
            </p>
            <a href="#contact" style={{ display: 'inline-block', background: '#2bdeff', color: '#01000a', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '13px 28px' }}>
              Meet the team
            </a>
          </div>
          <div>
            {[['14', 'Years in the industry'],['₱2.1B', 'In properties placed'],['87', 'Active listings now'],['98%', 'Referral rate from clients']].map(([num, label], i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.82rem', letterSpacing: '0.08em', color: '#909195', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1.1rem,2vw,1.5rem)', color: i === 0 ? '#2bdeff' : '#fff' }}>{num}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: '#ebf1ff', padding: 'clamp(60px,8vh,100px) clamp(20px,5vw,64px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
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
            <a href="mailto:hello@sorarealty.ph" style={{ background: '#01000a', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-oswald)', fontWeight: 500, fontSize: '1.1rem', letterSpacing: '0.06em', padding: '16px 36px' }}>
              hello@sorarealty.ph
            </a>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.75rem', letterSpacing: '0.12em', color: '#909195', textAlign: 'center', textTransform: 'uppercase' }}>
              Or call +63 2 8888 SORA
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '32px clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.05em', display: 'block' }}>SORA REALTY</span>
            <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.1em', color: '#909195', display: 'block' }}>© 2025 Sora Realty Inc.</span>
          </div>
          <span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, color: '#909195', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
            A playground project by{' '}
            <a href="/playground" style={{ color: '#615d6a', textDecoration: 'underline' }}>Christian Dizon</a>
            {' '}— inspired by Mori Trust design
          </span>
        </div>
      </footer>
    </div>
  );
}
