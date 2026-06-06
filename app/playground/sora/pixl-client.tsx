'use client';
import { Boogaloo, Nunito } from 'next/font/google';

const boogaloo = Boogaloo({ subsets: ['latin'], weight: ['400'], variable: '--font-px-display', display: 'swap' });
const nunito   = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-px-body', display: 'swap' });

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  fuchsia:    'oklch(0.58 0.27 330)',
  fuchsiaDim: 'oklch(0.50 0.25 330)',
  navy:       'oklch(0.18 0.10 264)',
  navySurf:   'oklch(0.24 0.09 264)',
  lime:       'oklch(0.87 0.26 128)',
  chrome:     'oklch(0.92 0.03 264)',
  inkDark:    'oklch(0.13 0.08 264)',
  inkLight:   'oklch(0.96 0.01 100)',
  inkMuted:   'oklch(0.72 0.06 264)',
};

// ── Pixel art SVG helpers ─────────────────────────────────────────────────────

function PxStar({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  const p = size / 7;
  const cells = [[0,3],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,2],[5,3],[5,4],[6,3]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {cells.map(([r, c], i) => <rect key={i} x={c * p} y={r * p} width={p} height={p} fill={color} />)}
    </svg>
  );
}

function PxHeart({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  const p = size / 8;
  const cells = [[1,1],[1,2],[1,5],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,2],[5,3],[5,4],[5,5],[6,3],[6,4]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {cells.map(([r, c], i) => <rect key={i} x={c * p} y={r * p} width={p - 0.5} height={p - 0.5} fill={color} />)}
    </svg>
  );
}

function PxBolt({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  const p = size / 7;
  const cells = [[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3],[3,4],[4,2],[4,3],[5,1],[5,2],[6,0],[6,1]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {cells.map(([r, c], i) => <rect key={i} x={c * p} y={r * p} width={p} height={p} fill={color} />)}
    </svg>
  );
}

function PxDiamond({ size = 32, color = '#fff' }: { size?: number; color?: string }) {
  const p = size / 7;
  const cells = [[0,3],[1,2],[1,3],[1,4],[2,1],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[5,2],[5,3],[5,4],[6,3]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {cells.map(([r, c], i) => <rect key={i} x={c * p} y={r * p} width={p} height={p} fill={color} />)}
    </svg>
  );
}

// ── Product pixel illustrations ───────────────────────────────────────────────

function StarPendantArt() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80" aria-hidden="true">
      <line x1="40" y1="4" x2="40" y2="28" stroke={C.chrome} strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round"/>
      {(() => {
        const p = 5, ox = 17, oy = 28;
        const cells = [[0,3],[1,2],[1,3],[1,4],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,2],[5,3],[5,4],[6,3]];
        return cells.map(([r,c],i) => <rect key={i} x={ox+c*p} y={oy+r*p} width={p} height={p} fill={C.chrome}/>);
      })()}
    </svg>
  );
}

function FlipPhoneArt() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80" aria-hidden="true">
      <rect x="24" y="8" width="32" height="20" rx="4" fill={C.fuchsia} stroke={C.inkDark} strokeWidth="1.5"/>
      <rect x="28" y="11" width="24" height="12" rx="2" fill={C.inkDark} opacity="0.6"/>
      <rect x="24" y="28" width="32" height="4" rx="1" fill={C.fuchsiaDim}/>
      <rect x="24" y="32" width="32" height="24" rx="4" fill={C.fuchsia} stroke={C.inkDark} strokeWidth="1.5"/>
      {[0,1,2].flatMap(r => [0,1,2].map(c => (
        <rect key={`${r}${c}`} x={30+c*8} y={37+r*6} width="5" height="3" rx="1" fill={C.inkDark} opacity="0.5"/>
      )))}
      <circle cx="40" cy="6" r="3" stroke={C.chrome} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function CdArt() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80" aria-hidden="true">
      <circle cx="40" cy="40" r="30" fill={C.chrome} opacity="0.9"/>
      {(['oklch(0.7 0.25 330)','oklch(0.7 0.25 264)','oklch(0.8 0.25 128)','oklch(0.8 0.25 60)'] as const).map((clr, i) => (
        <circle key={i} cx="40" cy="40" r={27 - i * 3} fill="none" stroke={clr} strokeWidth="1.5" opacity="0.4"/>
      ))}
      <circle cx="40" cy="40" r="8" fill={C.navySurf}/>
      <circle cx="40" cy="40" r="3" fill={C.chrome} opacity="0.5"/>
    </svg>
  );
}

function BrowBarArt() {
  return (
    <svg viewBox="0 0 80 80" fill="none" width="80" height="80" aria-hidden="true">
      <rect x="18" y="37" width="44" height="6" rx="3" fill={C.chrome}/>
      <circle cx="16" cy="40" r="8" fill={C.lime}/>
      <circle cx="14" cy="38" r="2" fill="white" opacity="0.4"/>
      <circle cx="64" cy="40" r="8" fill={C.fuchsia}/>
      <circle cx="62" cy="38" r="2" fill="white" opacity="0.4"/>
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: 'Chrome Star Pendant',  sub: 'Pixel star necklace, 16" silver chain', price: '$18', tag: 'BESTSELLER', Art: StarPendantArt },
  { id: 2, name: 'Raspberry Flip',        sub: 'Flip phone keychain, UV-reactive pink',  price: '$12', tag: 'NEW DROP',   Art: FlipPhoneArt },
  { id: 3, name: 'CD Compact Mirror',     sub: 'Iridescent CD-face vanity mirror',       price: '$24', tag: 'LIMITED',    Art: CdArt },
  { id: 4, name: 'Pixel Brow Bar',        sub: 'Acrylic barbell, lime & fuchsia ends',   price: '$9',  tag: '',           Art: BrowBarArt },
];

const MARQUEE_CATS  = ['CHARMS', 'CLIPS', 'RINGS', 'KEYCHAINS', 'PENDANTS', 'PINS', 'EARRINGS', 'COMPACTS', 'BEADS', 'BANGLES'];
const MARQUEE_VIBES = ['FOUND IT 2003', 'HANDPICKED', 'ONLY 1 OF EACH', 'JUST DROPPED', 'SOLD LAST WEEK: 47 PIECES', 'FREE SHIPPING $35+', 'THRIFT GODS', 'LIMITED STOCK'];

// ── Page ─────────────────────────────────────────────────────────────────────

export function PixlClient() {
  return (
    <div
      className={`${boogaloo.variable} ${nunito.variable}`}
      style={{ fontFamily: 'var(--font-px-body), sans-serif', background: C.navy, color: C.inkLight, minHeight: '100vh', overflowX: 'hidden' }}
    >

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px clamp(16px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${C.navy}e0`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <a href="/playground" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <PxStar size={24} color={C.fuchsia} />
          <span style={{ fontFamily: 'var(--font-px-display)', fontSize: '1.2rem', color: C.inkLight, letterSpacing: '0.04em' }}>PIXL</span>
        </a>
        <a href="#shop" style={{ fontFamily: 'var(--font-px-body)', fontWeight: 700, fontSize: '0.8rem', color: C.inkDark, background: C.lime, padding: '9px 18px', borderRadius: 4, textDecoration: 'none', letterSpacing: '0.04em' }}>
          Shop the drop
        </a>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '100svh', background: C.fuchsia, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: 'clamp(96px,14vh,140px) clamp(20px,5vw,64px) clamp(64px,9vh,96px)' }}>

        {/* Floating pixel deco */}
        {([
          { icon: 'star',    style: { top: '12%', left: '7%' },   size: 40, color: C.inkDark, anim: 'px-float 3.2s ease-in-out infinite' },
          { icon: 'bolt',    style: { top: '18%', right: '9%' },  size: 36, color: C.inkDark, anim: 'px-float 2.6s ease-in-out infinite 0.5s' },
          { icon: 'heart',   style: { top: '70%', left: '5%' },   size: 32, color: C.inkDark, anim: 'px-float 3.8s ease-in-out infinite 1s' },
          { icon: 'diamond', style: { top: '65%', right: '6%' },  size: 44, color: C.inkDark, anim: 'px-float 2.9s ease-in-out infinite 0.3s' },
          { icon: 'star',    style: { top: '42%', left: '3%' },   size: 22, color: C.lime,    anim: 'px-spin 8s linear infinite' },
          { icon: 'star',    style: { top: '28%', right: '4%' },  size: 26, color: C.lime,    anim: 'px-spin 6s linear infinite reverse' },
          { icon: 'bolt',    style: { top: '80%', left: '20%' },  size: 18, color: C.lime,    anim: 'px-float 4s ease-in-out infinite 0.8s' },
          { icon: 'heart',   style: { top: '14%', left: '32%' },  size: 16, color: C.lime,    anim: 'px-float 3.5s ease-in-out infinite 1.5s' },
          { icon: 'diamond', style: { top: '76%', right: '22%' }, size: 18, color: C.inkDark, anim: 'px-spin 10s linear infinite' },
        ] as Array<{ icon: string; style: React.CSSProperties; size: number; color: string; anim: string }>).map(({ icon, style, size, color, anim }, i) => (
          <div key={i} style={{ position: 'absolute', animation: anim, opacity: 0.9, ...style }}>
            {icon === 'star'    && <PxStar    size={size} color={color} />}
            {icon === 'heart'   && <PxHeart   size={size} color={color} />}
            {icon === 'bolt'    && <PxBolt    size={size} color={color} />}
            {icon === 'diamond' && <PxDiamond size={size} color={color} />}
          </div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 680 }}>
          <h1 style={{ fontFamily: 'var(--font-px-display)', fontSize: 'clamp(5rem,16vw,9rem)', color: C.inkDark, lineHeight: 0.9, letterSpacing: '-0.02em', margin: 0, textWrap: 'balance' }}>
            PIXL
          </h1>
          <p style={{ fontFamily: 'var(--font-px-body)', fontWeight: 800, fontSize: 'clamp(1rem,2.5vw,1.4rem)', color: C.inkDark, marginTop: 20, marginBottom: 8, letterSpacing: '0.01em', lineHeight: 1.3, textWrap: 'balance' }}>
            Y2K tech-inspired jewelry and charms.
          </p>
          <p style={{ fontFamily: 'var(--font-px-body)', fontWeight: 400, fontSize: 'clamp(0.88rem,1.6vw,1rem)', color: 'oklch(0.28 0.10 264)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto 36px', textWrap: 'pretty' }}>
            Handpicked from thrift hauls and retro stockrooms. Pixel stars, CD pendants, flip-phone keychains. One of each.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.inkDark, color: C.inkLight, padding: '13px 26px', borderRadius: 4, fontFamily: 'var(--font-px-body)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.04em' }}>
              <PxStar size={14} color={C.lime} />
              Shop the drop
            </a>
            <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 26px', borderRadius: 4, fontFamily: 'var(--font-px-body)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', color: C.inkDark, border: `2px solid ${C.inkDark}`, letterSpacing: '0.04em' }}>
              About PIXL
            </a>
          </div>
        </div>

        {/* Bottom ticker */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.inkDark, padding: '10px 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 40, width: 'max-content', animation: 'px-marquee 18s linear infinite' }}>
            {[...MARQUEE_CATS, ...MARQUEE_CATS].map((cat, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-px-display)', fontSize: '0.88rem', color: C.fuchsia, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>
                {cat}&nbsp;&nbsp;<span style={{ color: C.lime }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ───────────────────────────────────────────────────── */}
      <section id="shop" style={{ background: C.navy, padding: 'clamp(56px,8vh,96px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-px-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: C.inkLight, margin: 0 }}>
              This week's drop
            </h2>
            <span style={{ fontFamily: 'var(--font-px-body)', fontWeight: 700, fontSize: '0.75rem', color: C.lime, letterSpacing: '0.1em', border: `1px solid ${C.lime}`, padding: '4px 10px', borderRadius: 3 }}>
              FRIDAY 8PM
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {PRODUCTS.map(({ id, name, sub, price, tag, Art }, i) => (
              <article
                key={id}
                className="pixl-card"
                style={{ background: C.navySurf, borderRadius: 8, overflow: 'hidden', border: '1px solid oklch(1 0 0 / 0.07)' }}
              >
                <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i % 2 === 0 ? 'oklch(0.22 0.12 264)' : 'oklch(0.22 0.06 264)', position: 'relative' }}>
                  <Art />
                  {tag && (
                    <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-px-body)', fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.12em', background: tag === 'NEW DROP' ? C.lime : tag === 'LIMITED' ? C.fuchsia : C.chrome, color: tag === 'LIMITED' ? C.inkLight : C.inkDark, padding: '4px 8px', borderRadius: 3 }}>
                      {tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: '16px 20px 20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-px-display)', fontSize: '1.1rem', color: C.inkLight, margin: '0 0 5px' }}>{name}</h3>
                  <p style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.8rem', color: C.inkMuted, lineHeight: 1.5, margin: '0 0 14px' }}>{sub}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-px-display)', fontSize: '1.3rem', color: C.lime }}>{price}</span>
                    <button type="button" style={{ background: C.fuchsia, color: C.inkLight, border: 'none', padding: '8px 16px', borderRadius: 4, fontFamily: 'var(--font-px-body)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', letterSpacing: '0.04em' }}>
                      Add to bag
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vibe marquee ───────────────────────────────────────────────── */}
      <div style={{ background: C.fuchsia, padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, width: 'max-content', animation: 'px-marquee-rev 22s linear infinite' }}>
          {[...MARQUEE_VIBES, ...MARQUEE_VIBES].map((v, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-px-display)', fontSize: '0.95rem', color: C.inkDark, whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>
              {v}&nbsp;&nbsp;<span style={{ opacity: 0.4 }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" style={{ background: C.navySurf, padding: 'clamp(72px,10vh,120px) clamp(20px,5vw,64px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-px-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: C.inkLight, lineHeight: 1.05, margin: '0 0 24px', textWrap: 'balance' }}>
              Every piece has a past life.
            </h2>
            <p style={{ fontFamily: 'var(--font-px-body)', fontSize: 'clamp(0.9rem,1.4vw,1rem)', color: C.inkMuted, lineHeight: 1.8, marginBottom: 20, maxWidth: '58ch', textWrap: 'pretty' }}>
              PIXL started as a weekly thrift run. Now it's a Friday ritual: we dig through stockrooms, estate sales, and forgotten bins to find the pieces that hit different.
            </p>
            <p style={{ fontFamily: 'var(--font-px-body)', fontSize: 'clamp(0.9rem,1.4vw,1rem)', color: C.inkMuted, lineHeight: 1.8, maxWidth: '58ch', textWrap: 'pretty' }}>
              Tech-era hardware aesthetics meet wearable nostalgia. Pixel stars, CD iridescence, flip-phone energy. One of each, always.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {([
              { val: '1 of each',     label: 'Every item is unique',    icon: <PxDiamond size={22} color={C.lime}/> },
              { val: 'Every Friday',  label: 'New drop, same ritual',   icon: <PxBolt    size={22} color={C.fuchsia}/> },
              { val: '200+',          label: 'Items thrifted so far',   icon: <PxStar    size={22} color={C.chrome}/> },
            ] as Array<{ val: string; label: string; icon: React.ReactNode }>).map(({ val, label, icon }, i) => (
              <div key={i} style={{ background: C.navy, borderRadius: 6, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                {icon}
                <div>
                  <div style={{ fontFamily: 'var(--font-px-display)', fontSize: '1.35rem', color: C.inkLight, lineHeight: 1, marginBottom: 3 }}>{val}</div>
                  <div style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.8rem', color: C.inkMuted }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────────────────── */}
      <section style={{ background: C.fuchsia, padding: 'clamp(64px,9vh,96px) clamp(20px,5vw,64px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', right: '-2%', opacity: 0.08, animation: 'px-spin 18s linear infinite' }}>
          <PxStar size={160} color={C.inkDark} />
        </div>
        <div style={{ position: 'absolute', bottom: '-6%', left: '2%', opacity: 0.06, animation: 'px-spin 24s linear infinite reverse' }}>
          <PxDiamond size={180} color={C.inkDark} />
        </div>
        <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-px-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', color: C.inkDark, margin: '0 0 10px', textWrap: 'balance' }}>
            Get the drop link first.
          </h2>
          <p style={{ fontFamily: 'var(--font-px-body)', fontSize: 'clamp(0.88rem,1.4vw,1rem)', color: C.inkDark, opacity: 0.7, marginBottom: 32, lineHeight: 1.65, textWrap: 'pretty' }}>
            Friday drops sell out fast. Join the list and get a heads-up 30 minutes before anything goes live.
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' }}>
            <label htmlFor="pixl-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              Email address
            </label>
            <input
              id="pixl-email"
              type="email"
              placeholder="your@email.com"
              required
              style={{ flex: 1, minWidth: 180, padding: '12px 14px', borderRadius: 4, border: `2px solid ${C.inkDark}`, background: 'transparent', fontFamily: 'var(--font-px-body)', fontSize: '0.88rem', color: C.inkDark, outline: 'none' }}
            />
            <button type="submit" style={{ background: C.inkDark, color: C.inkLight, border: 'none', padding: '12px 20px', borderRadius: 4, fontFamily: 'var(--font-px-body)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              Join the drop
            </button>
          </form>
          <p style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.73rem', color: C.inkDark, opacity: 0.5, marginTop: 10 }}>
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ background: C.navy, padding: 'clamp(40px,6vh,64px) clamp(20px,5vw,64px) 28px', borderTop: '1px solid oklch(1 0 0 / 0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <PxStar size={22} color={C.fuchsia} />
                <span style={{ fontFamily: 'var(--font-px-display)', fontSize: '1.4rem', color: C.inkLight }}>PIXL</span>
              </div>
              <p style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.8rem', color: C.inkMuted, maxWidth: 200, lineHeight: 1.7 }}>
                Y2K tech accessories, thrifted and handpicked every week.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(28px,5vw,60px)', flexWrap: 'wrap' }}>
              {[
                { heading: 'Shop',   links: ['This week', 'Archive', 'Sold out'] },
                { heading: 'Info',   links: ['About', 'Shipping', 'Returns'] },
                { heading: 'Follow', links: ['Instagram', 'TikTok', 'Pinterest'] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <div style={{ fontFamily: 'var(--font-px-display)', fontSize: '0.9rem', color: C.fuchsia, marginBottom: 12, letterSpacing: '0.04em' }}>{heading}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {links.map(l => (
                      <li key={l}>
                        <a href="#" style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.8rem', color: C.inkMuted, textDecoration: 'none' }}>{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid oklch(1 0 0 / 0.06)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.72rem', color: C.inkMuted }}>
              © 2025 PIXL. A playground project by Christian Dizon.
            </span>
            <a href="/playground" style={{ fontFamily: 'var(--font-px-body)', fontSize: '0.72rem', color: C.inkMuted, textDecoration: 'none' }}>
              ← Back to playground
            </a>
          </div>
        </div>
      </footer>

      {/* ── CSS ────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes px-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes px-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes px-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes px-marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .pixl-card {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
        }
        .pixl-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px oklch(0 0 0 / 0.4);
        }
        #pixl-email::placeholder { color: oklch(0.13 0.08 264 / 0.45); }
        #pixl-email:focus { outline: 2px solid oklch(0.13 0.08 264); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @media (max-width: 500px) {
          form { flex-direction: column; }
          form input, form button { width: 100%; box-sizing: border-box; }
        }
      `}</style>
    </div>
  );
}
