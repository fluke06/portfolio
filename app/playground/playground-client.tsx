'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mascot, Asterisk } from '@/components/mascot';
import { PageHeader } from '@/components/page-header';

function useManilaTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-PH', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Manila',
    });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function CardShell({ title, blurb, kind, children }: {
  title: string; blurb: string; kind: string; children: React.ReactNode;
}) {
  return (
    <article className="exp-card reveal">
      <div className="exp-stage">{children}</div>
      <div className="exp-meta">
        <div className="exp-kind t-eyebrow">{kind}</div>
        <h3 className="exp-title">{title}</h3>
        <p className="exp-blurb">{blurb}</p>
      </div>
    </article>
  );
}

function BreatheCard() {
  const [phase, setPhase] = useState<'idle' | 'in' | 'hold' | 'out'>('idle');
  useEffect(() => {
    if (phase === 'idle') return;
    const seq: [typeof phase, number][] = [['in', 4000], ['hold', 7000], ['out', 8000]];
    let i = 0; let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const [p, ms] = seq[i % seq.length];
      setPhase(p);
      timer = setTimeout(() => { i++; tick(); }, ms);
    };
    tick();
    return () => clearTimeout(timer);
  }, [phase === 'idle']);

  const scale = phase === 'in' ? 1 : phase === 'hold' ? 1 : phase === 'out' ? 0.4 : 0.7;
  const ms = phase === 'in' ? 4000 : phase === 'out' ? 8000 : 7000;
  const label = phase === 'idle' ? 'tap to start' : phase === 'in' ? 'breathe in' : phase === 'hold' ? 'hold' : 'out';

  return (
    <CardShell title="Breath circle" blurb="A 4-7-8 breathing visualizer. Click to start." kind="interactive">
      <button className="breathe" onClick={() => setPhase('in')}>
        <div className="breathe-circle" style={{ transform: `scale(${scale})`, transition: `transform ${ms}ms cubic-bezier(0.4,0,0.6,1)` }} />
        <div className="breathe-label t-mono">{label}</div>
      </button>
    </CardShell>
  );
}

function MorphCard() {
  const shapes = ['pebble', 'splat', 'star', 'ring', 'pebble', 'droplet'] as const;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % shapes.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <CardShell title="Morph" blurb="A blob that drifts through six shapes on a loop." kind="animation">
      <div className="morph-stage">
        <Mascot name={shapes[i]} className="morph-blob" />
      </div>
    </CardShell>
  );
}

function ASCIIClockCard() {
  const t = useManilaTime();
  return (
    <CardShell title="ASCII clock" blurb="A clock in monospace characters. Manila time." kind="live">
      <div className="ascii-clock t-mono">
        {t.split('').map((c, i) => (
          <span key={i} className={c === ':' ? 'ascii-colon' : 'ascii-digit'}>{c}</span>
        ))}
      </div>
    </CardShell>
  );
}

function PaletteCard() {
  const palettes = [
    ['#FBF7F0', '#2E4DDB', '#1A1814', '#4B7F3A'],
    ['#0E0D0B', '#6B89FF', '#ECE7DC', '#2B4DFF'],
    ['#E2DDD0', '#1A1814', '#E8B33E', '#8A857B'],
    ['#D8E0F5', '#2E4DDB', '#2B4DFF', '#1A1814'],
  ];
  const [i, setI] = useState(0);
  return (
    <CardShell title="Palette mixer" blurb="Click to roll a new harmonious palette." kind="interactive">
      <div className="palette-card" onClick={() => setI(v => (v + 1) % palettes.length)}>
        {palettes[i].map((c, j) => <div key={j} className="palette-swatch" style={{ background: c }} />)}
        <div className="palette-hint t-mono">click to roll</div>
      </div>
    </CardShell>
  );
}

function MagneticBlobCard() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <CardShell title="Magnetic cursor" blurb="Hover near the blob — it leans toward your cursor." kind="interactive">
      <div
        className="magnet-stage"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setOffset({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.15 });
        }}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      >
        <Mascot name="pebble" className="magnet-blob" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} />
      </div>
    </CardShell>
  );
}

function NoodleCard() {
  const scrollY = useScrollY();
  return (
    <CardShell title="Ribbon" blurb="A noodle that follows the scroll like a fish." kind="scroll">
      <div className="noodle-stage">
        <Mascot name="noodle" className="noodle-blob" style={{ transform: `translateY(${Math.sin(scrollY / 60) * 12}px)` }} />
      </div>
    </CardShell>
  );
}

function LandingCard({ href, bg, accent, textDark = false, label, title, sub, tag }: {
  href: string; bg: string; accent: string; textDark?: boolean;
  label: string; title: string; sub: string; tag: string;
}) {
  const fg = textDark ? '#000' : '#fff';
  const fgMuted = textDark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.45)';
  const border = textDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block', borderRadius: 16, overflow: 'hidden', background: bg, border: `1px solid ${border}`, position: 'relative', minHeight: 180 }}>
      {/* Decorative accent shape */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: accent, opacity: 0.18 }}/>
      <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: accent, opacity: 0.1 }}/>
      <div style={{ position: 'relative', zIndex: 1, padding: '24px 24px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <span style={{ color: fgMuted, fontFamily: 'var(--font-inter, sans-serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
          <span style={{ background: accent, color: '#fff', fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 44 }}>{tag}</span>
        </div>
        <h3 style={{ color: fg, fontFamily: 'var(--font-fraunces, serif)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,1.75rem)', margin: '0 0 8px', lineHeight: 1, letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ color: fgMuted, fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 400, fontSize: '0.82rem', lineHeight: 1.55, margin: '0 0 18px' }}>{sub}</p>
        <span style={{ color: accent, fontFamily: 'var(--font-inter, sans-serif)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.04em' }}>
          View page →
        </span>
      </div>
    </Link>
  );
}

export function PlaygroundClient() {
  return (
    <div className="page">
      <PageHeader
        num="04"
        en="Playground"
        title="Things I made on"
        accent="weekends."
        accentBlock
        sub="Small experiments. Most are pointless. That's the point."
      />

      <div className="playground-grid">
        <BreatheCard />
        <MorphCard />
        <ASCIIClockCard />
        <PaletteCard />
        <MagneticBlobCard />
        <NoodleCard />
      </div>

      {/* Landing pages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, padding: '8px 0 32px' }}>
        <LandingCard
          href="/playground/kaomug"
          bg="#000"
          accent="#e60012"
          label="Landing Page · Dark"
          title="Kaomug"
          sub="Custom character mugs. Asahi-inspired."
          tag="Shop"
        />
        <LandingCard
          href="/playground/likha"
          bg="#fff"
          accent="#e60039"
          textDark
          label="Landing Page · Editorial"
          title="Likhâ"
          sub="Handpainted barong tagalog. Kakuwaku-inspired."
          tag="Fashion"
        />
        <LandingCard
          href="/playground/sora"
          bg="#0a1c30"
          accent="#2bdeff"
          label="Landing Page · Real Estate"
          title="Sora Realty"
          sub="Premium properties. Mori Trust-inspired."
          tag="Realty"
        />
      </div>

      <div className="playground-note reveal">
        <Asterisk size={18} />
        <p className="t-body-sm">
          Built with vanilla web tech, mostly. Source on{' '}
          <a href="https://github.com/fluke06" className="t-link" target="_blank" rel="noreferrer">GitHub →</a>
          {' '}when it&rsquo;s not embarrassing.
        </p>
      </div>
    </div>
  );
}
