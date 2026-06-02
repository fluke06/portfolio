'use client';
import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW1 = [...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11)];
const ROW2 = [...IMAGES.slice(11), ...IMAGES.slice(11), ...IMAGES.slice(11)];

const IMG_STYLE = { width: 'clamp(240px, 35vw, 420px)', height: 'clamp(154px, 22.5vw, 270px)' } as const;

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let scheduled = false;

    const update = () => {
      scheduled = false;
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const tx = (window.scrollY - sectionTop + window.innerHeight) * 0.3 - 200;
      row1.style.transform = `translateX(${tx}px)`;
      row2.style.transform = `translateX(${-tx}px)`;
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0E1A] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <p
        className="font-fraunces italic text-[#5B82FF] text-center mb-8 sm:mb-12"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', opacity: 0.55 }}
      >
        Motion I study
      </p>

      <div ref={row1Ref} className="flex gap-3 mb-3" style={{ willChange: 'transform' }}>
        {ROW1.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="rounded-2xl object-cover flex-shrink-0"
            style={IMG_STYLE}
            loading="lazy"
          />
        ))}
      </div>

      <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
        {ROW2.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="rounded-2xl object-cover flex-shrink-0"
            style={IMG_STYLE}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
