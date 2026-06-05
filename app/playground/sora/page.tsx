import type { Metadata } from 'next';
import { Zen_Old_Mincho, Oswald } from 'next/font/google';

const zenMincho = Zen_Old_Mincho({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-mincho',
  display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sora Realty — Premium Properties',
  description: 'Exceptional properties. Thoughtful placement. Find your place in the sky.',
};

// ── Mascot (bunny/tanuki style, like Mori Trust footer mascot) ────────────────

function SoraMascot() {
  return (
    <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Tall ears */}
      <ellipse cx="20" cy="22" rx="7" ry="20" fill="#fff" stroke="#aaa" strokeWidth="1.5"/>
      <ellipse cx="40" cy="22" rx="7" ry="20" fill="#fff" stroke="#aaa" strokeWidth="1.5"/>
      <ellipse cx="20" cy="22" rx="4" ry="16" fill="#f4a0b0" opacity="0.5"/>
      <ellipse cx="40" cy="22" rx="4" ry="16" fill="#f4a0b0" opacity="0.5"/>
      {/* Head */}
      <circle cx="30" cy="42" r="18" fill="#fff" stroke="#aaa" strokeWidth="1.5"/>
      {/* Eyes */}
      <circle cx="23" cy="40" r="4" fill="#2a2a2a"/>
      <circle cx="37" cy="40" r="4" fill="#2a2a2a"/>
      <circle cx="24.5" cy="38.5" r="1.5" fill="#fff"/>
      <circle cx="38.5" cy="38.5" r="1.5" fill="#fff"/>
      {/* Nose */}
      <ellipse cx="30" cy="46" rx="3" ry="2" fill="#f4a0b0"/>
      {/* Whiskers */}
      <line x1="10" y1="46" x2="26" y2="47" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
      <line x1="10" y1="50" x2="26" y2="49" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
      <line x1="34" y1="47" x2="50" y2="46" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
      <line x1="34" y1="49" x2="50" y2="50" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
      {/* Mouth */}
      <path d="M 26 51 Q 30 55 34 51" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx="30" cy="68" rx="14" ry="11" fill="#fff" stroke="#aaa" strokeWidth="1.5"/>
    </svg>
  );
}

// ── Building SVG for hero ─────────────────────────────────────────────────────

function HeroBuilding() {
  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', opacity: 0.12 }} aria-hidden="true">
      {/* Large tower center */}
      <rect x="340" y="80" width="120" height="420" fill="#fff"/>
      <rect x="360" y="80" width="80" height="60" fill="#c0c4ce"/>
      {/* Windows grid center */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect key={`c-${row}-${col}`} x={352 + col * 15} y={160 + row * 30} width="10" height="18" fill="#fff" opacity="0.3"/>
        ))
      )}
      {/* Left building */}
      <rect x="180" y="180" width="80" height="320" fill="#c0c4ce"/>
      {Array.from({ length: 7 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <rect key={`l-${row}-${col}`} x={190 + col * 24} y={200 + row * 40} width="16" height="24" fill="#fff" opacity="0.25"/>
        ))
      )}
      {/* Right building */}
      <rect x="540" y="150" width="90" height="350" fill="#c0c4ce"/>
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <rect key={`r-${row}-${col}`} x={552 + col * 26} y={170 + row * 38} width="18" height="22" fill="#fff" opacity="0.25"/>
        ))
      )}
      {/* Far left */}
      <rect x="60" y="240" width="60" height="260" fill="#909195"/>
      {/* Far right */}
      <rect x="680" y="200" width="70" height="300" fill="#909195"/>
      {/* Ground */}
      <rect x="0" y="488" width="800" height="12" fill="#c0c4ce" opacity="0.5"/>
    </svg>
  );
}

// ── Moon SVG ──────────────────────────────────────────────────────────────────

function Moon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="60" r="55" fill="#e8e0d0" opacity="0.9"/>
      <circle cx="60" cy="60" r="52" fill="#f5f0e8"/>
      {/* Craters */}
      <circle cx="38" cy="45" r="6" fill="#e0d8cc" opacity="0.6"/>
      <circle cx="72" cy="35" r="4" fill="#e0d8cc" opacity="0.5"/>
      <circle cx="55" cy="72" r="8" fill="#e0d8cc" opacity="0.5"/>
      <circle cx="80" cy="65" r="5" fill="#e0d8cc" opacity="0.4"/>
    </svg>
  );
}

// ── Tree silhouette SVG ────────────────────────────────────────────────────────

function Trees() {
  return (
    <svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', opacity: 0.7 }} aria-hidden="true">
      {/* Dense tree line */}
      {[40,80,130,180,220,270,310,360,400,440,490,540,580,630,670,720,760].map((x, i) => (
        <path key={i} d={`M ${x} 300 L ${x - 15 - (i%3)*5} ${200 - (i%4)*20} L ${x + 15 + (i%3)*5} ${200 - (i%4)*20} Z`} fill="#0a1c30"/>
      ))}
      {/* Thicker trunks */}
      {[100,250,400,560,700].map(x => (
        <rect key={x} x={x-3} y={250} width={6} height={50} fill="#0a1c30"/>
      ))}
      {/* Japanese house silhouette */}
      <rect x="330" y="200" width="140" height="80" fill="#0a1c30"/>
      <path d="M 310 205 L 400 150 L 490 205 Z" fill="#0a1c30"/>
      <rect x="380" y="230" width="40" height="50" fill="#0c0c12"/>
      <rect x="340" y="210" width="30" height="25" fill="#0c0c12"/>
      <rect x="430" y="210" width="30" height="25" fill="#0c0c12"/>
    </svg>
  );
}

// ── Circular diagram ──────────────────────────────────────────────────────────

function CircleDiagram() {
  const nodes = [
    { angle: -90, label: '日本を代表する\nホテルの可能性' },
    { angle: -18, label: 'ビジネス交流を\n育むオフィスの可能性' },
    { angle: 54,  label: '社会課題を\n解決する可能性' },
    { angle: 126, label: '土地・建物\n開発を委ねる可能性' },
    { angle: 198, label: '人を育て\n守る可能性' },
  ];
  const cx = 200, cy = 200, r = 130, nodeR = 40;
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'min(380px, 90vw)', height: 'min(380px, 90vw)' }} aria-hidden="true">
      {/* Connection lines */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const nx = cx + r * Math.cos(rad), ny = cy + r * Math.sin(rad);
        return <line key={i} x1={cx} y1={cy} x2={nx} y2={ny} stroke="#909195" strokeWidth="1" opacity="0.4"/>;
      })}
      {/* Outer nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const nx = cx + r * Math.cos(rad), ny = cy + r * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={nx} cy={ny} r={nodeR} fill="#ebf1ff" stroke="#615d6a" strokeWidth="1"/>
            {n.label.split('\n').map((line, j) => (
              <text key={j} x={nx} y={ny + (j - (n.label.split('\n').length - 1) / 2) * 11} textAnchor="middle" fontSize="7" fill="#01000a" fontFamily="sans-serif">{line}</text>
            ))}
          </g>
        );
      })}
      {/* Center */}
      <circle cx={cx} cy={cy} r={52} fill="#0a1c30" stroke="#615d6a" strokeWidth="1.5"/>
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fill="#fff" fontFamily="sans-serif" fontWeight="700">可能性</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="10" fill="#fff" fontFamily="sans-serif" fontWeight="700">デベロッパー</text>
    </svg>
  );
}

// ── Property card component ───────────────────────────────────────────────────

function PropertyCard({ title, sub, idx }: { title: string; sub: string; idx: number }) {
  const gradients = [
    'linear-gradient(160deg, #1a3a5c 0%, #0a1c30 100%)',
    'linear-gradient(160deg, #2a1a3c 0%, #1a0a2c 100%)',
    'linear-gradient(160deg, #1a3c2a 0%, #0a2c1a 100%)',
  ];
  return (
    <div style={{ background: gradients[idx % gradients.length], borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
      {/* Window grid faux-photo */}
      <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <div key={`${row}-${col}`} style={{
                position: 'absolute',
                top: `${16 + row * 38}px`, left: `${8 + col * 44}px`,
                width: 28, height: 24,
                background: `rgba(255,255,255,${0.05 + (row + col) % 3 * 0.04})`,
                border: '1px solid rgba(255,255,255,0.08)',
              }}/>
            ))
          )}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)' }}/>
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: '0.75rem', color: '#909195', lineHeight: 1.65 }}>{sub}</div>
      </div>
    </div>
  );
}

const PROPERTIES = [
  { title: '森トラストHP', sub: '高級ホテル・リゾート' },
  { title: 'プロジェクト一覧', sub: '不動産開発プロジェクト' },
  { title: 'セリトラ！', sub: 'ライフスタイル提案' },
];

export default function SoraPage() {
  return (
    <div
      className={`${zenMincho.variable} ${oswald.variable}`}
      style={{ fontFamily: 'var(--font-oswald), sans-serif', background: '#fff', color: '#01000a', minHeight: '100vh', overflowX: 'hidden' }}
    >

      {/* ── Fixed nav ───────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px clamp(16px,4vw,48px)',
        display: 'flex', alignItems: 'center',
      }}>
        <a href="/playground" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M 4 4 L 20 4 L 20 14 L 12 20 L 4 14 Z" fill="#0a1c30"/></svg>
          </div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 600, fontSize: '0.85rem', color: '#fff', letterSpacing: '0.1em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>SORA</div>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>REALTY GROUP</div>
          </div>
        </a>
      </nav>

      {/* ── Hero — full screen dark photo ──────────────────────────────── */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a1c30' }}>
        {/* Dark gradient layers */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #001030 0%, #0a1c30 40%, #1a2a40 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(43,222,255,0.04) 0%, transparent 70%)' }}/>
        {/* Building silhouette */}
        <HeroBuilding />
        {/* Subtle left panel overlay (like the Mori Trust left side text panel) */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '220px',
          background: 'rgba(0,0,0,0.35)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '80px 24px 40px',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          {[
            { label: 'TV CMキャスター', val: '実績' },
            { label: 'ストーリー', val: '' },
            { label: '不動産デベロッパー', val: '' },
            { label: '人の可能性を信じ', val: '' },
            { label: 'まちを育てる', val: '' },
            { label: 'キャラクターについて', val: '' },
          ].map(({ label }) => (
            <div key={label} style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', lineHeight: 1.8 }}>{label}</div>
          ))}
        </div>
        {/* Hero text — bottom right (Mori Trust style) */}
        <div style={{
          position: 'absolute', bottom: 'clamp(48px,8vh,96px)', right: 'clamp(20px,5vw,80px)',
          textAlign: 'right', color: '#fff',
        }}>
          <div style={{
            fontFamily: 'var(--font-mincho)', fontWeight: 400,
            fontSize: 'clamp(0.8rem,1.5vw,1rem)', letterSpacing: '0.06em',
            marginBottom: 8, opacity: 0.8,
          }}>
            不動産デベロッパー？
          </div>
          <div style={{
            fontFamily: 'var(--font-mincho)', fontWeight: 700,
            fontSize: 'clamp(2.2rem,5.5vw,5rem)', letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}>
            可能性<span style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, letterSpacing: '0.04em' }}> デベロッパー。</span>
          </div>
        </div>
        {/* Scroll down */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.45)', fontSize: '0.62rem', letterSpacing: '0.18em',
          fontFamily: 'var(--font-oswald)', fontWeight: 400,
        }}>
          SCROLL DOWN
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M 8 2 L 8 16 M 2 12 L 8 18 L 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>

      {/* ── Night scene section (Mori Trust scroll-017 style) ───────────── */}
      <section style={{ minHeight: '100vh', background: '#00091b', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: 'clamp(48px,8vh,96px) clamp(20px,5vw,80px)' }}>
        {/* Trees silhouette */}
        <Trees />
        {/* Moon */}
        <div style={{ position: 'absolute', top: '10%', right: '12%', width: 'clamp(80px,10vw,120px)', opacity: 0.9 }}>
          <Moon />
        </div>
        {/* Dark gradient at bottom over trees */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg, #00091b 0%, transparent 100%)' }}/>

        {/* Left panel: small text */}
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', gap: 'clamp(40px,8vw,120px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Vertical Japanese text block */}
          <div style={{
            writingMode: 'vertical-rl', textOrientation: 'mixed',
            fontFamily: 'var(--font-mincho)', fontWeight: 400,
            fontSize: 'clamp(0.9rem,1.5vw,1.15rem)', color: 'rgba(255,255,255,0.8)',
            lineHeight: 2, letterSpacing: '0.08em', flexShrink: 0,
          }}>
            <span style={{ display: 'block', marginBottom: 16 }}>まちづくり、そしてその先へ、</span>
            <span style={{ display: 'block' }}>拓き、未来へと進む。</span>
          </div>
          {/* Story text */}
          <div style={{ flex: 1, minWidth: 260, paddingTop: 20 }}>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.8rem,1.2vw,0.95rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 2.2, marginBottom: 32 }}>
              そんなことは誰にもわかっている。
            </p>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.8rem,1.2vw,0.95rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 2.2, marginBottom: 32 }}>
              しかし虎の尾を踏まれような、この感情はなんなのか。
            </p>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.8rem,1.2vw,0.95rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 2.2 }}>
              「虎トラに憧憬し」まっすぐ前を向いて歩み続けるために。
            </p>
          </div>
        </div>
      </section>

      {/* ── Circular diagram section (scroll-033 style) ────────────────── */}
      <section style={{ background: '#f5f5f5', padding: 'clamp(64px,9vh,112px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px,6vw,80px)', alignItems: 'center' }}>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.2em', color: '#909195', textTransform: 'uppercase', marginBottom: 20 }}>
              MORI IS NOT ONLY
            </div>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.85rem,1.4vw,1rem)', color: '#333', lineHeight: 2, marginBottom: 28 }}>
              空不動産に働くだけではない。<br/>
              人の、人の、企業の持つ可能性を輝かせ<br/>
              ビジネスそのものを進化させるオフィス。
            </p>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.85rem,1.4vw,1rem)', color: '#333', lineHeight: 2 }}>
              量だけではない。<br/>
              文化、自然、この国に眠る可能性を<br/>
              共に手を組み磨き上げていく、リゾートホテルを。
            </p>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <CircleDiagram />
          </div>
        </div>
      </section>

      {/* ── Blue property sections (01/03, 02/03, 03/03) ────────────────── */}
      {([
        {
          num: '01', total: '03',
          heading: '空トラストのまちづくり',
          body: '街の価値を高め、人の可能性を広げるまちづくりを私たちは手がけています。国内外の大都市において、様々な施設を高度に組み合わせた新しい形の土地活用を推進し、新しい価値のある土地を生み出す不動産開発を行っています。',
          sub: '日本、そして世界へ',
          sub2: '大規模複合施設「東京ワールドゲート渋谷」、ラグジュアリーライフスタイルホテル「W東京」なども手がける空の先へ、世界の大都市においても多くのみなさんとともに不動産業務を行っております。',
          cta: 'View More →',
        },
        {
          num: '02', total: '03',
          heading: '空ホテル',
          body: '明治36年に日本における最高格式のホテルとして創業した「空ホテル」は、日本を代表するクラシックホテルのひとつとなり、皇室や国内外の要人にも多く利用されてきた品格のあるラグジュアリーホテルです。',
          sub: 'ホテルインディゴ銀座プラザストリート',
          sub2: '伝統的な建築と現代的なデザインが融合した、最上のホスピタリティ空間。空トラストが誇るフラッグシップホテルとして、世界基準のサービスをご提供いたします。',
          cta: 'View More →',
        },
        {
          num: '03', total: '03',
          heading: '社会の未来を変えるイノベーションの可能性',
          body: '日本建設の化石ともいえることを止め、現代に生きる人々の多様なニーズを機軸に設計してこそ、現代社会の新しい生き方と新たな価値を創造する大型複合施設が生まれます。',
          sub: '',
          sub2: '',
          cta: '投資案件 →',
        },
      ] as Array<{ num: string; total: string; heading: string; body: string; sub: string; sub2: string; cta: string }>)
        .map(({ num, total, heading, body, sub, sub2, cta }) => (
          <section key={num} style={{ background: '#1a6eb5', padding: 'clamp(56px,8vh,96px) clamp(20px,5vw,80px)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 4, opacity: 0.5 }}>
                  {num}<span style={{ fontSize: '0.45em', letterSpacing: '0.05em' }}>/{total}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1rem,2.2vw,1.4rem)', color: '#fff', margin: '0 0 20px', lineHeight: 1.4 }}>
                  {heading}
                </h2>
                <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.78rem,1.2vw,0.92rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.95, marginBottom: 28 }}>
                  {body}
                </p>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-oswald)', letterSpacing: '0.08em', fontWeight: 400, borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: 2 }}>
                  {cta}
                </a>
              </div>
              {sub && (
                <div style={{ flex: '1 1 280px' }}>
                  <h3 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(0.85rem,1.5vw,1rem)', color: '#fff', marginBottom: 12 }}>{sub}</h3>
                  <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.75rem,1.1vw,0.85rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.95 }}>{sub2}</p>
                </div>
              )}
            </div>
          </section>
        ))
      }

      {/* ── About section — giant watermark (scroll-083 style) ──────────── */}
      <section style={{ background: '#fff', padding: 'clamp(64px,9vh,112px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        {/* Giant faint watermark text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-oswald)', fontWeight: 600,
          fontSize: 'clamp(5rem,12vw,10rem)', letterSpacing: '0.05em',
          color: '#f0f0f0', userSelect: 'none', pointerEvents: 'none',
          zIndex: 0,
        }}>
          ABOUT SORA REALT
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,7vw,96px)', alignItems: 'flex-start' }}>
          {/* Logo area */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0a1c30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M 4 4 L 20 4 L 20 14 L 12 20 L 4 14 Z" fill="#fff"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.15em', color: '#0a1c30' }}>SORA</div>
                <div style={{ fontFamily: 'var(--font-oswald)', fontWeight: 300, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#909195' }}>REALTY GROUP</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mincho)', fontSize: '0.8rem', color: '#909195', lineHeight: 1.9, maxWidth: 200 }}>
              空トラストグループは、1985年に創業した総合不動産デベロッパーグループです。
            </div>
          </div>
          {/* Description */}
          <div style={{ flex: '1 1 280px' }}>
            <h2 style={{ fontFamily: 'var(--font-mincho)', fontWeight: 700, fontSize: 'clamp(1rem,2vw,1.3rem)', color: '#0a1c30', marginBottom: 20 }}>
              空トラストについて
            </h2>
            <p style={{ fontFamily: 'var(--font-mincho)', fontSize: 'clamp(0.8rem,1.2vw,0.92rem)', color: '#333', lineHeight: 2, marginBottom: 24 }}>
              街の価値を高め、人の可能性を広げることを目指し、国内外において商業施設、ホテル・リゾート、オフィス等の不動産開発を手がけてきました。全国各所に展開しています。
            </p>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0a1c30', color: '#fff', textDecoration: 'none',
              fontFamily: 'var(--font-oswald)', fontWeight: 400, fontSize: '0.78rem', letterSpacing: '0.1em',
              padding: '12px 24px', borderRadius: 2,
            }}>
              事業内容 →
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0a1c30', padding: 'clamp(48px,6vh,72px) clamp(20px,5vw,80px) 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Giant "SORA TRUST G" watermark in footer (like Mori Trust) */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-oswald)', fontWeight: 700,
          fontSize: 'clamp(4rem,9vw,7rem)', letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.04)', userSelect: 'none', pointerEvents: 'none',
        }}>
          SORA REALTY G
        </div>
        {/* Property cards grid */}
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
            {PROPERTIES.map((p, i) => (
              <PropertyCard key={p.title} {...p} idx={i} />
            ))}
          </div>
          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                {['プライバシーポリシー', '利用規約', 'お問い合わせ'].map(l => (
                  <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', textDecoration: 'none', letterSpacing: '0.04em', fontFamily: 'var(--font-mincho)' }}>{l}</a>
                ))}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', fontFamily: 'var(--font-oswald)', letterSpacing: '0.06em' }}>
                MORI TRUST CO.,LTD. All Rights Reserved.
              </div>
            </div>
            {/* Mascot */}
            <div style={{ width: 56, opacity: 0.7 }}>
              <SoraMascot />
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}
