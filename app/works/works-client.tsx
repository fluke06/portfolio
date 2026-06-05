'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StickyNav } from '@/components/sticky-nav';
import { FadeIn } from '@/components/fade-in';
import { FooterSection } from '@/components/footer-section';
import { Mascot } from '@/components/mascot';
import { PROJECTS, type Project } from '@/lib/projects';

type Filter = 'all' | 'web' | 'ui';

export function WorksClient() {
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all',  label: 'All',    count: PROJECTS.length },
    { id: 'web',  label: 'Web',    count: PROJECTS.filter(p => p.type === 'web').length },
    { id: 'ui',   label: 'UI / UX', count: PROJECTS.filter(p => p.type === 'ui').length },
  ];

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

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
              <span className="text-[#EDE8E0] block">The work,</span>
              <em className="italic text-[#EDE8E0] block">mostly.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} y={20}>
            <p
              className="font-inter font-light text-[#888280] mt-5 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
            >
              Ten things built and shipped — client sites, e-commerce, and multilingual platforms.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <div className="px-5 sm:px-8 md:px-10 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`font-inter font-medium text-sm rounded-full px-4 sm:px-5 py-2 transition-all duration-200 ${
                filter === f.id
                  ? 'bg-[#EDE8E0] text-[#100F0D]'
                  : 'text-[#888280] hover:text-[#EDE8E0] border border-[#EDE8E0]/20 hover:border-[#EDE8E0]/40'
              }`}
            >
              {f.label}{' '}
              <span className="opacity-60 text-xs">({f.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 sm:px-8 md:px-10 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20">
          {visible.map((p, i) => (
            <WorkTile key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

function WorkTile({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={Math.min(index * 0.04, 0.28)} y={20}>
      <Link href={`/works/${project.id}`} className="group block">

        {/* Num + Year */}
        <div className="flex items-baseline justify-between mb-4">
          <span
            className="font-fraunces font-black text-[#EDE8E0] leading-none"
            style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', opacity: 0.15 }}
          >
            {project.num}
          </span>
          <span
            className="font-inter text-[#888280] uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.14em' }}
          >
            {project.year}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '16 / 10' }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} ${project.titleAccent}`}
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 100%)` }}
            >
              <Mascot
                name={project.mascot}
                style={{ color: project.palette[2], opacity: 0.8 }}
                className="w-[40%] h-[40%]"
              />
            </div>
          )}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'rgba(16,15,13,0.18)' }}
          />
        </div>

        {/* Title */}
        <h3
          className="font-fraunces font-black text-[#EDE8E0] leading-tight mb-2 group-hover:text-[#C4B89A] transition-colors duration-300"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          {project.title}{' '}
          <em className="italic font-normal">{project.titleAccent}</em>
        </h3>

        {/* Blurb */}
        <p
          className="font-inter font-light text-[#888280] leading-relaxed mb-3 line-clamp-2"
          style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)' }}
        >
          {project.blurb}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.tags.slice(0, 3).map(t => (
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
