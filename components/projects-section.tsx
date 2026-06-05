'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from './fade-in';
import { PROJECTS } from '@/lib/projects';

const FEATURED_IDS = ['yumami', 'tenmixer', 'rc-wallet', 'bi-winning', 'wagyufive', 'dxpcorp'];
const FEATURED = FEATURED_IDS.map(id => PROJECTS.find(p => p.id === id)!);

export function ProjectsSection() {
  return (
    <section
      id="works"
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-44"
      style={{ background: '#100F0D' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-14 sm:pb-20"
          style={{ borderBottom: '1px solid rgba(237,232,224,0.08)' }}
        >
          <FadeIn delay={0} y={28}>
            <h2
              className="font-fraunces font-black text-[#EDE8E0] leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', lineHeight: 0.92 }}
            >
              Selected{' '}
              <em className="italic text-[#EDE8E0]">work.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={0} duration={0.5}>
            <Link
              href="/works"
              className="font-inter font-medium text-[#888280] hover:text-[#EDE8E0] transition-colors duration-200 flex items-center gap-2 flex-shrink-0 pb-1"
              style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
            >
              View all work
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 13 L13 3 M7 3 H13 V9" />
              </svg>
            </Link>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-24 sm:gap-y-28 pt-14 sm:pt-20">
          {FEATURED.map((p, i) => (
            <FadeIn key={p.num} delay={Math.min(i * 0.06, 0.24)} y={32}>
              <Link href={`/works/${p.id}`} className="group block">

                {/* Num + Year */}
                <div className="flex items-baseline justify-between mb-5">
                  <span
                    className="font-fraunces font-black text-[#EDE8E0] leading-none"
                    style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', opacity: 0.15 }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-inter text-[#888280] uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                  >
                    {p.year}
                  </span>
                </div>

                {/* Image */}
                <div
                  className="relative w-full overflow-hidden mb-7"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <Image
                    src={p.image ?? ''}
                    alt={`${p.title} ${p.titleAccent}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(16,15,13,0.18)' }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-fraunces font-black text-[#EDE8E0] leading-tight mb-3 group-hover:text-[#C4B89A] transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)' }}
                >
                  {p.title}{' '}
                  <em className="italic font-normal">{p.titleAccent}</em>
                </h3>

                {/* Blurb */}
                <p
                  className="font-inter font-light text-[#888280] leading-relaxed mb-5"
                  style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', maxWidth: '46ch' }}
                >
                  {p.blurb}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="font-inter font-medium text-[#888280] hover:text-[#EDE8E0] uppercase transition-colors duration-200"
                      style={{ fontSize: '10px', letterSpacing: '0.08em' }}
                    >
                      / {t}
                    </span>
                  ))}
                </div>

              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
