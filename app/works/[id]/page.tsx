import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { StickyNav } from '@/components/sticky-nav';
import { FadeIn } from '@/components/fade-in';
import { FooterSection } from '@/components/footer-section';
import { Mascot } from '@/components/mascot';
import { BilingualLabel } from '@/components/bilingual-label';
import { DeviceFrame } from '@/components/device-frame';
import { PROJECTS } from '@/lib/projects';

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} ${project.titleAccent} — Christian Dizon`,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) notFound();

  const idx = PROJECTS.findIndex(p => p.id === id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const SPEC_ROWS = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Stack', value: project.stack.join(' · ') },
    { label: 'Tags', value: project.tags.map(t => `/ ${t}`).join('  ') },
  ];

  return (
    <div className="min-h-screen bg-[#100F0D]">
      <StickyNav alwaysVisible />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-36 px-5 sm:px-8 md:px-10 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <FadeIn delay={0} y={0} duration={0.5}>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 font-inter font-medium text-[#888280] text-sm hover:text-[#EDE8E0] transition-colors duration-200 mb-12 sm:mb-16 md:mb-20"
            >
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M13 16 L7 10 L13 4" />
              </svg>
              Works
            </Link>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
              <FadeIn delay={0.05} y={20}>
                <span
                  className="font-fraunces font-black text-[#EDE8E0] leading-none block mb-3"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', opacity: 0.12 }}
                  aria-hidden="true"
                >
                  {project.num}
                </span>
              </FadeIn>

              <div className="overflow-hidden mb-6 sm:mb-8">
                <FadeIn delay={0.12} y={32}>
                  <h1
                    className="font-fraunces font-black tracking-tight text-balance"
                    style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', lineHeight: 0.92 }}
                  >
                    <span className="text-[#EDE8E0] block">{project.title}</span>
                    <em className="italic text-[#EDE8E0] block">{project.titleAccent}.</em>
                  </h1>
                </FadeIn>
              </div>

              <FadeIn delay={0.22} y={20}>
                <p
                  className="font-inter font-light text-[#888280] leading-relaxed max-w-lg mb-8 sm:mb-10"
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
                >
                  {project.blurb}
                </p>
              </FadeIn>

              <FadeIn delay={0.3} y={0} duration={0.5}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-inter font-light text-[#888280] text-sm">{project.role}</span>
                  <span className="text-[#EDE8E0]/40 text-sm" aria-hidden="true">·</span>
                  <span className="font-inter font-medium text-[#EDE8E0] text-sm">{project.year}</span>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-inter font-medium text-[#EDE8E0] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
                    >
                      Visit site
                      <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 13 L13 3 M7 3 H13 V9" />
                      </svg>
                    </a>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Right: screenshot or palette panel */}
            <FadeIn
              delay={0.28}
              y={40}
              className="w-full lg:w-[46%] xl:w-[44%] flex-shrink-0"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: 'clamp(20px, 3.5vw, 40px)',
                  aspectRatio: '4 / 3',
                }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} ${project.titleAccent} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 100%)` }}
                  >
                    <Mascot
                      name={project.mascot}
                      style={{ color: project.palette[2], opacity: 0.8 }}
                      className="w-[44%] h-[44%]"
                    />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Spec strip */}
      <div
        className="px-5 sm:px-8 md:px-10 py-8 sm:py-10"
        style={{
          borderTop: '1px solid rgba(184,122,60,0.12)',
          borderBottom: '1px solid rgba(184,122,60,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {SPEC_ROWS.map(({ label, value }) => (
            <div key={label}>
              <p
                className="font-inter font-medium text-[#888280] uppercase tracking-widest mb-2"
                style={{ fontSize: '10px' }}
              >
                {label}
              </p>
              <p
                className="font-inter font-light text-[#EDE8E0] leading-snug"
                style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.95rem)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 sm:px-8 md:px-10 max-w-7xl mx-auto">

        {/* The brief */}
        <div style={{ borderBottom: '1px solid rgba(184,122,60,0.08)' }}>
        <FadeIn y={30} className="py-16 sm:py-20 md:py-28">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
            <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
              <BilingualLabel en="The brief" ta="Ang Gawain" />
            </div>
            <div className="flex-1 max-w-[65ch]">
              <p
                className="font-inter font-light text-[#EDE8E0] leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
              >
                {project.summary}
              </p>
            </div>
          </div>
        </FadeIn>
        </div>

        {/* What was built */}
        <div style={project.screens?.length ? { borderBottom: '1px solid rgba(184,122,60,0.08)' } : {}}>
        <FadeIn y={30} delay={0.08} className="py-16 sm:py-20 md:py-28">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
            <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
              <BilingualLabel en="What was built" ta="Ang Ginawa" />
            </div>
            <div className="flex-1 max-w-[65ch]">
              <p
                className="font-inter font-light text-[#888280] leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
              >
                {project.detail}
              </p>
            </div>
          </div>
        </FadeIn>
        </div>

        {/* Screens */}
        {project.screens && project.screens.length > 0 && (
          <FadeIn y={30} delay={0.1} className="py-16 sm:py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
              <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
                <BilingualLabel en="Screens" ta="Mga View" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-end gap-5 sm:gap-8">
                  {project.screens.find(s => s.device === 'desktop') && (
                    <div className="flex-1 min-w-0">
                      <DeviceFrame
                        device="desktop"
                        image={project.screens.find(s => s.device === 'desktop')!.image}
                        alt={`${project.title} desktop view`}
                      />
                      <p className="font-inter font-medium text-[#888280] uppercase tracking-widest mt-4" style={{ fontSize: '10px' }}>
                        Desktop
                      </p>
                    </div>
                  )}
                  {project.screens.find(s => s.device === 'tablet') && (
                    <div style={{ width: 'clamp(140px, 24%, 200px)', flexShrink: 0 }}>
                      <DeviceFrame
                        device="tablet"
                        image={project.screens.find(s => s.device === 'tablet')!.image}
                        alt={`${project.title} tablet view`}
                      />
                      <p className="font-inter font-medium text-[#888280] uppercase tracking-widest mt-4" style={{ fontSize: '10px' }}>
                        Tablet
                      </p>
                    </div>
                  )}
                  {project.screens.find(s => s.device === 'mobile') && (
                    <div style={{ width: 'clamp(100px, 18%, 160px)', flexShrink: 0 }}>
                      <DeviceFrame
                        device="mobile"
                        image={project.screens.find(s => s.device === 'mobile')!.image}
                        alt={`${project.title} mobile view`}
                      />
                      <p className="font-inter font-medium text-[#888280] uppercase tracking-widest mt-4" style={{ fontSize: '10px' }}>
                        Mobile
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Next project */}
      <div
        className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-24 md:pb-32"
        style={{ borderTop: '1px solid rgba(184,122,60,0.12)' }}
      >
        <div className="max-w-7xl mx-auto pt-12 sm:pt-16 md:pt-20">
          <FadeIn y={30}>
            <div className="mb-6 sm:mb-8">
              <BilingualLabel en="Next project" ta="Susunod" />
            </div>
            <Link
              href={`/works/${next.id}`}
              className="group flex items-center justify-between gap-6 p-6 sm:p-8 md:p-10 rounded-[clamp(16px,3vw,28px)] border border-[#EDE8E0]/25 hover:border-[#EDE8E0]/50 hover:bg-[#EDE8E0]/[0.03] transition-colors duration-300"
            >
              <div className="min-w-0">
                <p className="font-inter text-[#888280] text-sm mb-3">
                  {next.num} · {next.year}
                </p>
                <p
                  className="font-fraunces font-black text-[#EDE8E0] leading-none truncate"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
                >
                  {next.title}{' '}
                  <em className="italic text-[#EDE8E0]">{next.titleAccent}</em>
                </p>
              </div>
              <div
                className="text-[#EDE8E0] flex-shrink-0 group-hover:translate-x-1.5 transition-transform duration-300"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18 L18 6 M9 6 H18 V15" />
                </svg>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
