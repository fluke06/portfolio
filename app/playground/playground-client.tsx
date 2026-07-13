'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StickyNav } from '@/components/sticky-nav';
import { FadeIn } from '@/components/fade-in';
import { FooterSection } from '@/components/footer-section';
import { Mascot, Asterisk } from '@/components/mascot';

// ── Hooks ─────────────────────────────────────────────────────────────────────

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

// ── Experiment card shell ─────────────────────────────────────────────────────

function ExpCard({ title, blurb, kind, children }: {
  title: string; blurb: string; kind: string; children: React.ReactNode;
}) {
  return (
    <article className="bg-[#1B1917] rounded-2xl overflow-hidden">
      <div className="h-52 flex items-center justify-center p-6">
        {children}
      </div>
      <div className="px-5 pb-5 pt-4 border-t border-white/[0.06]">
        <div
          className="font-inter text-[#888280] uppercase mb-1"
          style={{ fontSize: '10px', letterSpacing: '0.14em' }}
        >
          {kind}
        </div>
        <h3 className="font-fraunces font-black text-[#EDE8E0] text-base leading-tight mb-1.5">
          {title}
        </h3>
        <p className="font-inter text-[#888280] leading-relaxed" style={{ fontSize: '0.82rem' }}>
          {blurb}
        </p>
      </div>
    </article>
  );
}

// ── Experiment cards ──────────────────────────────────────────────────────────

function BreatheCard() {
  const [phase, setPhase] = useState<'idle' | 'in' | 'hold' | 'out'>('idle');
  useEffect(() => {
    if (phase === 'idle') return;
    const seq: [typeof phase, number][] = [['in', 4000], ['hold', 7000], ['out', 8000]];
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const [p, ms] = seq[i % seq.length];
      setPhase(p);
      timer = setTimeout(() => { i++; tick(); }, ms);
    };
    tick();
    return () => clearTimeout(timer);
  }, [phase === 'idle']);

  const scale = phase === 'out' ? 0.4 : phase === 'idle' ? 0.7 : 1;
  const ms = phase === 'in' ? 4000 : phase === 'out' ? 8000 : 7000;
  const label = phase === 'idle' ? 'tap to start' : phase === 'in' ? 'breathe in' : phase === 'hold' ? 'hold' : 'out';

  return (
    <ExpCard title="Breath circle" blurb="A 4-7-8 breathing visualizer. Click to start." kind="interactive">
      <button
        onClick={() => setPhase('in')}
        className="relative flex items-center justify-center w-full h-full"
        aria-label="Start breathing exercise"
      >
        <div
          className="absolute rounded-full bg-[#C4B89A]/20"
          style={{
            width: 120, height: 120,
            transform: `scale(${scale})`,
            transition: `transform ${ms}ms cubic-bezier(0.4,0,0.6,1)`,
          }}
        />
        <span className="relative font-inter text-[#888280] text-sm tracking-widest select-none">
          {label}
        </span>
      </button>
    </ExpCard>
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
    <ExpCard title="Morph" blurb="A blob that drifts through six shapes on a loop." kind="animation">
      <Mascot name={shapes[i]} className="w-24 h-24 text-[#C4B89A]" />
    </ExpCard>
  );
}

function ASCIIClockCard() {
  const t = useManilaTime();
  return (
    <ExpCard title="ASCII clock" blurb="A clock in monospace characters. Manila time." kind="live">
      <div className="flex items-center gap-0.5 font-mono">
        {t.split('').map((c, i) => (
          <span
            key={i}
            className={`font-mono font-bold text-2xl ${c === ':' ? 'text-[#888280]' : 'text-[#EDE8E0]'}`}
          >
            {c}
          </span>
        ))}
      </div>
    </ExpCard>
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
    <ExpCard title="Palette mixer" blurb="Click to roll a new harmonious palette." kind="interactive">
      <button
        onClick={() => setI(v => (v + 1) % palettes.length)}
        className="flex flex-col items-center gap-3 w-full h-full justify-center"
        aria-label="Roll palette"
      >
        <div className="flex gap-2">
          {palettes[i].map((c, j) => (
            <div key={j} className="w-10 h-10 rounded-lg" style={{ background: c }} />
          ))}
        </div>
        <span className="font-mono text-[#888280] tracking-widest" style={{ fontSize: '10px' }}>
          click to roll
        </span>
      </button>
    </ExpCard>
  );
}

function MagneticBlobCard() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <ExpCard title="Magnetic cursor" blurb="Hover near the blob — it leans toward your cursor." kind="interactive">
      <div
        className="flex items-center justify-center w-full h-full"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setOffset({
            x: (e.clientX - r.left - r.width / 2) * 0.15,
            y: (e.clientY - r.top - r.height / 2) * 0.15,
          });
        }}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      >
        <Mascot
          name="pebble"
          className="w-20 h-20 text-[#C4B89A]"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: 'transform 0.1s ease-out' }}
        />
      </div>
    </ExpCard>
  );
}

function NoodleCard() {
  const scrollY = useScrollY();
  return (
    <ExpCard title="Ribbon" blurb="A noodle that follows the scroll like a fish." kind="scroll">
      <Mascot
        name="noodle"
        className="w-24 h-24 text-[#C4B89A]"
        style={{ transform: `translateY(${Math.sin(scrollY / 60) * 12}px)`, transition: 'transform 0.1s ease-out' }}
      />
    </ExpCard>
  );
}

// ── Landing page data + tile ───────────────────────────────────────────────────

const LANDING_PAGES = [
  {
    href: '/playground/kaomug',
    bg: '#111',
    accent: '#e60012',
    num: '01',
    year: '2025',
    title: 'Kaomug',
    titleAccent: '',
    sub: 'Custom ceramic character mugs. Six personalities, one addiction.',
    tags: ['Shop'] as const,
    previewImage: '/playground/kaomug/preview.png',
  },
  {
    href: '/playground/likha',
    bg: '#f5ede3',
    accent: '#e60039',
    num: '02',
    year: '2025',
    title: 'Likhâ',
    titleAccent: '',
    sub: 'Handpainted barong tagalog. Every thread, a story.',
    tags: ['Fashion'] as const,
    previewImage: '/playground/likha/preview.png',
  },
  {
    href: '/playground/pixl',
    bg: '#080012',
    accent: '#FF1F8E',
    num: '03',
    year: '2025',
    title: 'PIXL',
    titleAccent: '',
    sub: 'Limited-run Y2K jewelry. Chrome pendants, flip-phone keychains, pixel rings. Friday drops only.',
    tags: ['Y2K', 'Accessories'] as const,
    previewImage: '/playground/pixl/preview.png',
  },
];

function LandingTile({
  href, bg, accent, num, year, title, titleAccent, sub, tags, previewImage,
}: typeof LANDING_PAGES[number] & { previewImage?: string }) {
  return (
    <FadeIn y={20}>
      <Link href={href} className="group block">
        {/* Num + year */}
        <div className="flex items-baseline justify-between mb-4">
          <span
            className="font-fraunces font-black text-[#EDE8E0] leading-none"
            style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', opacity: 0.15 }}
          >
            {num}
          </span>
          <span
            className="font-inter text-[#888280] uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.14em' }}
          >
            {year}
          </span>
        </div>

        {/* Thumbnail */}
        <div
          className="relative overflow-hidden mb-5"
          style={{ aspectRatio: '16/10', background: bg }}
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt={title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <>
              <div
                className="absolute rounded-full group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ background: accent, opacity: 0.18, width: '60%', height: '120%', top: '-10%', right: '-10%' }}
              />
              <div
                className="absolute rounded-full"
                style={{ background: accent, opacity: 0.08, width: '40%', height: '80%', bottom: '-20%', left: '-5%' }}
              />
            </>
          )}
          <span
            className="absolute top-3 left-3 font-inter font-bold text-white rounded-full px-3 py-1 z-10"
            style={{ background: accent, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            Landing page
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/[0.15] z-10" />
        </div>

        {/* Title */}
        <h3
          className="font-fraunces font-black text-[#EDE8E0] leading-tight mb-2 group-hover:text-[#C4B89A] transition-colors duration-300"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          {title}
          {titleAccent && <em className="italic font-normal"> {titleAccent}</em>}
        </h3>

        <p
          className="font-inter font-light text-[#888280] leading-relaxed mb-3 line-clamp-2"
          style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)' }}
        >
          {sub}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {tags.map(t => (
            <span
              key={t}
              className="font-inter font-medium text-[#888280] uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.08em' }}
            >
              / {t}
            </span>
          ))}
        </div>
      </Link>
    </FadeIn>
  );
}

// ── Section divider label ─────────────────────────────────────────────────────

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <FadeIn y={12}>
      <div className="flex items-center gap-4 mb-10 sm:mb-14">
        <span
          className="font-inter text-[#888280] uppercase shrink-0"
          style={{ fontSize: '10px', letterSpacing: '0.2em' }}
        >
          {num}
        </span>
        <div className="flex-1 h-px bg-[#EDE8E0]/10" />
        <span
          className="font-fraunces font-black text-[#EDE8E0] shrink-0"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
        >
          {label}
        </span>
      </div>
    </FadeIn>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function PlaygroundClient() {
  return (
    <div className="min-h-screen bg-[#100F0D]">
      <StickyNav alwaysVisible />

      {/* Header */}
      <section className="pt-28 sm:pt-32 md:pt-40 px-5 sm:px-8 md:px-10 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.05} y={32}>
            <h1
              className="font-fraunces font-black tracking-tight text-balance"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 0.92 }}
            >
              <span className="text-[#EDE8E0] block">Things I made</span>
              <em className="italic text-[#EDE8E0] block">for fun.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} y={20}>
            <p
              className="font-inter font-light text-[#888280] mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
            >
              Landing pages, interactive experiments, and other things built during creative bursts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Landing pages */}
      <section className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">
          <SectionLabel num="01" label="Landing pages" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20">
            {LANDING_PAGES.map(p => (
              <LandingTile key={p.href} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">
          <SectionLabel num="02" label="Tools" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20">
            <FadeIn y={20}>
              <Link href="/playground/kubo" className="group block">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-fraunces font-black text-[#EDE8E0] leading-none" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', opacity: 0.15 }}>01</span>
                  <span className="font-inter text-[#888280] uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>2026</span>
                </div>
                <div className="relative overflow-hidden mb-5 rounded-sm" style={{ aspectRatio: '16/10', background: '#1B1917' }}>
                  <Image
                    src="/assets/kubo/kubo.jpg"
                    alt="Kubo"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(16,15,13,0.1) 0%, rgba(16,15,13,0.75) 100%)' }} />
                  <span className="absolute top-3 left-3 font-inter font-bold rounded-full px-3 py-1 z-10" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#E8B380', color: '#100F0D' }}>
                    Calculator
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3">
                    <div className="font-fraunces font-black text-[#EDE8E0]" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', lineHeight: 1 }}>
                      Kubo<em className="italic text-[#E8B380]">.</em>
                    </div>
                    <div className="text-right">
                      <div className="font-inter text-[#EDE8E0]" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7 }}>daily kcal</div>
                      <div className="font-fraunces font-black text-[#E8B380]" style={{ fontSize: '1.1rem' }}>~240</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/[0.15] z-10" />
                </div>
                <h3 className="font-fraunces font-black text-[#EDE8E0] leading-tight mb-2 group-hover:text-[#C4B89A] transition-colors duration-300" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                  Cat feeding planner
                </h3>
                <p className="font-inter font-light text-[#888280] leading-relaxed mb-3 line-clamp-2" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)' }}>
                  Daily kcal, wet/dry blend, macro & urinary check, budget planner. Seeded with a real kitten.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {(['Cats', 'Health'] as const).map(t => (
                    <span key={t} className="font-inter font-medium text-[#888280] uppercase" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>/ {t}</span>
                  ))}
                </div>
              </Link>
            </FadeIn>
            <FadeIn y={20}>
              <Link href="/playground/ph-salary" className="group block">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-fraunces font-black text-[#EDE8E0] leading-none" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', opacity: 0.15 }}>02</span>
                  <span className="font-inter text-[#888280] uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>2026</span>
                </div>
                <div className="relative overflow-hidden mb-5 rounded-sm" style={{ aspectRatio: '16/10', background: '#1B1917' }}>
                  {/* Preview: salary numbers */}
                  <div className="absolute inset-0 flex flex-col justify-center px-6 gap-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-inter text-[#888280]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>SSS</span>
                      <span className="font-fraunces font-black text-[#6B89FF]" style={{ fontSize: '0.9rem' }}>₱1,350</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-inter text-[#888280]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>PhilHealth</span>
                      <span className="font-fraunces font-black text-[#4CAF82]" style={{ fontSize: '0.9rem' }}>₱750</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-inter text-[#888280]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>Pag-IBIG</span>
                      <span className="font-fraunces font-black text-[#E8B33E]" style={{ fontSize: '0.9rem' }}>₱100</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-inter text-[#888280]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>Tax</span>
                      <span className="font-fraunces font-black text-[#FF7B6B]" style={{ fontSize: '0.9rem' }}>₱1,875</span>
                    </div>
                    <div className="h-px bg-white/10 my-1" />
                    <div className="flex justify-between items-baseline">
                      <span className="font-inter text-[#888280]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>Net</span>
                      <span className="font-fraunces font-black text-[#C4B89A]" style={{ fontSize: '1.1rem' }}>₱25,925</span>
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 font-inter font-bold text-white rounded-full px-3 py-1 z-10 bg-[#C4B89A]" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#100F0D' }}>
                    Calculator
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/[0.15] z-10" />
                </div>
                <h3 className="font-fraunces font-black text-[#EDE8E0] leading-tight mb-2 group-hover:text-[#C4B89A] transition-colors duration-300" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                  PH Salary Deductions
                </h3>
                <p className="font-inter font-light text-[#888280] leading-relaxed mb-3 line-clamp-2" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)' }}>
                  Compute monthly take-home after SSS, PhilHealth, Pag-IBIG, and BIR withholding tax.
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {(['PH', 'Finance'] as const).map(t => (
                    <span key={t} className="font-inter font-medium text-[#888280] uppercase" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>/ {t}</span>
                  ))}
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Experiments */}
      <section className="px-5 sm:px-8 md:px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <SectionLabel num="03" label="Experiments" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              <BreatheCard key="breathe" />,
              <MorphCard key="morph" />,
              <ASCIIClockCard key="clock" />,
              <PaletteCard key="palette" />,
              <MagneticBlobCard key="magnetic" />,
              <NoodleCard key="noodle" />,
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.05} y={16}>{card}</FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="px-5 sm:px-8 md:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={12}>
            <div className="flex items-start gap-3 text-[#888280]">
              <Asterisk size={16} />
              <p className="font-inter font-light leading-relaxed" style={{ fontSize: '0.82rem' }}>
                Built with vanilla web tech, mostly. Source on{' '}
                <a
                  href="https://github.com/fluke06"
                  className="text-[#C4B89A] hover:text-[#EDE8E0] transition-colors duration-200"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub →
                </a>{' '}
                when it&rsquo;s not embarrassing.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
