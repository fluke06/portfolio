'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from './fade-in';

const FEATURED = [
  {
    num: '12',
    name: 'Yumami bento',
    blurb: 'Brand and e-commerce site for a Manila bento atelier — bold editorial type, online ordering.',
    tags: ['Next.js', 'E-commerce'],
    href: '/works/yumami',
    image: '/assets/projects/yumami.jpg',
  },
  {
    num: '10',
    name: 'Ten Mixer',
    blurb: 'Cross-chain crypto mixer — incognito transactions across Bitcoin, Ethereum, and more.',
    tags: ['Next.js', 'Web3'],
    href: '/works/tenmixer',
    image: '/assets/projects/tenmixer.jpg',
  },
  {
    num: '09',
    name: 'RC Wallet',
    blurb: 'Landing page and user guide for a crypto-to-fiat exchange wallet app.',
    tags: ['Next.js', 'Crypto'],
    href: '/works/rc-wallet',
    image: '/assets/projects/rc-wallet.jpg',
  },
  {
    num: '08',
    name: 'Bi-Winning trading',
    blurb: 'Multilingual binary options trading platform for Japanese, English, Vietnamese, and Indonesian markets.',
    tags: ['WordPress', 'Multilingual'],
    href: '/works/bi-winning',
    image: '/assets/projects/bi-winning.jpg',
  },
  {
    num: '13',
    name: 'Wagyu Five',
    blurb: 'Online store for a Manila wagyu delivery brand — dark food photography, Metro Manila delivery.',
    tags: ['Shopify', 'E-commerce'],
    href: '/works/wagyufive',
    image: '/assets/projects/wagyufive.jpg',
  },
  {
    num: '14',
    name: 'DXP corp',
    blurb: 'Corporate site for a Japan-based web consultancy — services, process, bilingual.',
    tags: ['Next.js', 'Corporate'],
    href: '/works/dxpcorp',
    image: '/assets/projects/dxpcorp.jpg',
  },
];

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
              See all 10
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 13 L13 3 M7 3 H13 V9" />
              </svg>
            </Link>
          </FadeIn>
        </div>

        {/* Grid — editorial, no card bg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20 pt-14 sm:pt-20">
          {FEATURED.map((p, i) => (
            <FadeIn key={p.num} delay={Math.min(i * 0.06, 0.24)} y={28}>
              <Link href={p.href} className="group block">

                {/* Image */}
                <div
                  className="relative w-full overflow-hidden mb-6"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Subtle hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'rgba(16,15,13,0.18)' }}
                  />
                </div>

                {/* Meta */}
                <div className="flex items-baseline gap-4 mb-2">
                  <span
                    className="font-fraunces italic text-[#EDE8E0] flex-shrink-0"
                    style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', opacity: 0.55 }}
                  >
                    {p.num}
                  </span>
                  <h3
                    className="font-fraunces font-black text-[#EDE8E0] leading-tight group-hover:text-[#C4B89A] transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.3rem, 2.4vw, 2rem)' }}
                  >
                    {p.name}
                  </h3>
                </div>

                <p
                  className="font-inter font-light text-[#888280] leading-relaxed mb-4"
                  style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                >
                  {p.blurb}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="font-inter font-medium text-[#EDE8E0] uppercase"
                      style={{ fontSize: '10px', letterSpacing: '0.06em' }}
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
