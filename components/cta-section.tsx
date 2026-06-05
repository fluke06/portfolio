'use client';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export function CtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 sm:px-8 md:px-10 py-32 sm:py-44 md:py-60"
      style={{ background: '#100F0D', borderTop: '1px solid rgba(237,232,224,0.08)' }}
    >
      {/* Baybayin watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-baybayin leading-none"
          style={{ fontSize: 'clamp(12rem, 40vw, 52rem)', color: '#EDE8E0', opacity: 0.055 }}
        >
          ᜃ
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Large statement */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-fraunces font-black text-[#EDE8E0] leading-none tracking-tight mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)', lineHeight: 0.88 }}
          >
            Have a project<br />
            <em className="italic text-[#EDE8E0]">in mind?</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16} y={16}>
          <p
            className="font-inter font-light text-[#888280] leading-relaxed mb-10 sm:mb-12"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: '52ch' }}
          >
            Full-stack web apps, cloud infrastructure, fast e-commerce — I'll scope it and ship it end-to-end.
          </p>
        </FadeIn>

        <FadeIn delay={0.26} y={0} duration={0.6}>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <a
              href="mailto:cdizon1048@gmail.com"
              className="font-fraunces font-black text-[#EDE8E0] hover:text-[#EDE8E0] transition-colors duration-300 leading-none"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)' }}
            >
              cdizon1048@gmail.com ↗
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.36} y={0} duration={0.6}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-inter font-medium text-[#888280] hover:text-[#EDE8E0] transition-colors duration-200 mt-6"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
          >
            Or use the contact form
            <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 13 L13 3 M7 3 H13 V9" />
            </svg>
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}
