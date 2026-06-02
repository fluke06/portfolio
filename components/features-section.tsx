'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { WordsPullUp } from './words-pull-up';

const CARD_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SKILL_CARDS = [
  {
    id: 'frontend',
    num: '01',
    title: 'Frontend & Design.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    href: '/works',
    items: ['Next.js & React, TypeScript', 'Figma-to-code, responsive layouts', 'Performance — Lighthouse 95+', 'Animation with GSAP & Framer'],
  },
  {
    id: 'backend',
    num: '02',
    title: 'Backend & APIs.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    href: '/works',
    items: ['Express & Node.js REST APIs', 'MySQL, Postgres, Redis', 'Auth, queues, webhooks'],
  },
  {
    id: 'infra',
    num: '03',
    title: 'Cloud & Infra.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    href: '/works',
    items: ['AWS — ECS, Lambda, RDS, SES', 'Terraform for all infra', 'Docker, CI/CD pipelines'],
  },
];

function SkillCard({ card, index }: { card: typeof SKILL_CARDS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay: (index + 1) * 0.15, duration: 0.6, ease: CARD_EASE }}
      className="bg-[#212121] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 h-full"
    >
      <img src={card.icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
      <div>
        <p className="text-gray-500 text-xs font-mono mb-1">{card.num}</p>
        <h3 className="text-primary font-medium text-base sm:text-lg">{card.title}</h3>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {card.items.map(item => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-gray-400 text-xs sm:text-sm leading-snug">{item}</span>
          </li>
        ))}
      </ul>
      <Link href={card.href} className="flex items-center gap-1 text-primary text-xs group mt-auto w-fit">
        <span>See work</span>
        <ArrowRight className="w-3 h-3 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

export function FeaturesSection() {
  const videoCardRef = useRef(null);
  const videoInView = useInView(videoCardRef, { once: true, margin: '-100px' });

  return (
    <section className="min-h-screen bg-black py-16 sm:py-24 px-4 md:px-8 relative">
      {/* Noise bg */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-12 sm:mb-16">
          <div className="block">
            <WordsPullUp text="End-to-end engineering for ambitious products." className="text-primary justify-center" />
          </div>
          <div className="block mt-1">
            <WordsPullUp text="From design to deployment, I own the whole stack." className="text-gray-500 justify-center" delayOffset={0.3} />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 lg:h-[480px]">

          {/* Card 1 — video */}
          <motion.div
            ref={videoCardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={videoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 0, duration: 0.6, ease: CARD_EASE }}
            className="relative rounded-2xl overflow-hidden h-64 lg:h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>
              8 years. End to end.
            </p>
          </motion.div>

          {/* Skill cards */}
          {SKILL_CARDS.map((card, i) => (
            <SkillCard key={card.id} card={card} index={i} />
          ))}

        </div>
      </div>
    </section>
  );
}
