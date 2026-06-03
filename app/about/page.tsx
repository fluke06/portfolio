import type { Metadata } from 'next';
import Link from 'next/link';
import { StickyNav } from '@/components/sticky-nav';
import { FadeIn } from '@/components/fade-in';
import { FooterSection } from '@/components/footer-section';
import { BilingualLabel } from '@/components/bilingual-label';

export const metadata: Metadata = {
  title: 'About — Christian Dizon',
  description: "Full-stack developer based in Quezon City. 8 years building web applications end-to-end — Next.js, AWS, Terraform.",
};

const SKILLS = [
  { name: 'Next.js / React',           level: 5, note: 'daily driver' },
  { name: 'JavaScript / TypeScript',   level: 5, note: '' },
  { name: 'Node.js / Express',         level: 5, note: 'REST APIs' },
  { name: 'MySQL / MariaDB / Redis',   level: 4, note: 'caching, sessions' },
  { name: 'AWS — ECS, Lambda, RDS',    level: 4, note: 'Terraform managed' },
  { name: 'Terraform + Docker',        level: 4, note: '' },
  { name: 'WordPress / WooCommerce',   level: 5, note: 'Elementor, WPBakery' },
  { name: 'HTML / CSS / Sass',         level: 5, note: '' },
  { name: 'Frontend Design',           level: 4, note: 'layouts, motion, systems' },
  { name: 'Figma / Sketch / Adobe XD', level: 4, note: 'UI + wireframes' },
  { name: 'Photoshop / Lightroom',     level: 3, note: 'graphic + photo' },
  { name: 'SEO + Analytics',           level: 4, note: 'GA, GSC, Hotjar' },
  { name: 'AI-assisted dev',           level: 4, note: 'Claude Code, Codex, Gemini' },
];

const TIMELINE = [
  {
    year: '2018 – Now',
    title: 'Mid Tier Web Developer',
    org: 'Straight Login Inc.',
    body: 'Own end-to-end delivery for dozens of client web projects, usually solo or in small teams. Scope requirements, design the architecture, build it, manage the infra after launch. Stack: Next.js + Express on AWS (ECS / Lambda / API Gateway / RDS), Terraform-managed, with WordPress + WooCommerce on the side.',
  },
  {
    year: '2014 – 2018',
    title: 'BS Information Technology',
    org: 'Quezon City Polytechnic University',
    body: 'Four years of CS fundamentals and a lot of side projects along the way.',
  },
];

const NOW = [
  { label: 'At work',       value: 'Client builds: Next.js + AWS' },
  { label: 'Learning',      value: 'Deeper Terraform patterns' },
  { label: 'Tooling daily', value: 'Claude Code, Codex, Gemini' },
  { label: 'Side project',  value: 'Small things on weekends' },
];

const DIVIDER = { borderBottom: '1px solid rgba(237,232,224,0.08)' };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#100F0D]">
      <StickyNav alwaysVisible />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 px-5 sm:px-8 md:px-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.05} y={32}>
            <h1
              className="font-fraunces font-black tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 0.92 }}
            >
              <span className="text-[#EDE8E0] block">Christian</span>
              <em className="italic text-[#EDE8E0] block">Dizon.</em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <p
              className="font-inter font-light text-[#888280] mt-6 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
            >
              Full-stack developer, 8 years. Next.js, AWS, Terraform.
            </p>
          </FadeIn>

          <FadeIn delay={0.25} y={0} duration={0.5}>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 sm:mt-12">
              {[
                { val: '8+',  label: 'years shipping' },
                { val: '16+', label: 'projects delivered' },
                { val: '3',   label: 'markets served' },
              ].map(s => (
                <div key={s.label}>
                  <p
                    className="font-fraunces font-black text-[#EDE8E0] leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                  >
                    {s.val}
                  </p>
                  <p
                    className="font-inter font-light text-[#888280] mt-1"
                    style={{ fontSize: '12px', letterSpacing: '0.04em' }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="px-5 sm:px-8 md:px-10 max-w-7xl mx-auto">

        {/* Bio */}
        <div style={DIVIDER}>
          <FadeIn y={24} className="py-16 sm:py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
              <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
                <BilingualLabel en="About" ta="Tungkol sa akin" />
              </div>
              <div className="flex-1 max-w-[65ch] space-y-5">
                {[
                  "I'm a full-stack web developer with 8 years of experience designing, building, and shipping web applications end-to-end, usually solo or in small teams. I scope the technical requirements, choose the architecture, write the front-end and back-end code, and manage the AWS infrastructure after launch.",
                  "Based in Quezon City. I work as a mid-tier developer at Straight Login Inc., where I've delivered dozens of client websites and applications across WordPress / WooCommerce and modern Next.js + Express stacks, with infrastructure managed via Terraform on AWS.",
                  "I also handle the UI/UX side: wireframing, visual design, small graphic-design jobs in Figma, Sketch, Adobe XD, Photoshop, Lightroom, then implement the front-end in code. The seam between the two halves is the part I like most.",
                ].map((p, i) => (
                  <p
                    key={i}
                    className="font-inter font-light text-[#EDE8E0] leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
                  >
                    {p}
                  </p>
                ))}
                <p
                  className="font-inter font-light text-[#888280] leading-relaxed"
                  style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
                >
                  Outside work, I make small things on weekends (see the{' '}
                  <Link href="/playground" className="text-[#EDE8E0] hover:opacity-80 transition-opacity">
                    Playground
                  </Link>
                  ). I lean on AI tooling daily (Claude Code, Codex, Gemini) for scaffolding, code review, debugging, and Terraform drafts.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div style={DIVIDER}>
          <FadeIn y={24} delay={0.05} className="py-16 sm:py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
              <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
                <BilingualLabel en="A short history" ta="Maikling Kasaysayan" />
              </div>
              <div className="flex-1 max-w-[65ch]">
                <ol>
                  {TIMELINE.map((t, i) => (
                    <li
                      key={t.year}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-8"
                      style={{ borderTop: i > 0 ? '1px solid rgba(237,232,224,0.08)' : undefined }}
                    >
                      <div className="sm:w-32 flex-shrink-0">
                        <span
                          className="font-inter font-medium text-[#EDE8E0]"
                          style={{ fontSize: '11px', letterSpacing: '0.06em' }}
                        >
                          {t.year}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-fraunces font-black text-[#EDE8E0] leading-snug mb-2"
                          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
                        >
                          {t.title}
                          {t.org && (
                            <span className="font-inter font-light text-[#888280]"
                              style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                            >
                              {' '}· {t.org}
                            </span>
                          )}
                        </p>
                        <p
                          className="font-inter font-light text-[#888280] leading-relaxed"
                          style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}
                        >
                          {t.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <div style={DIVIDER}>
          <FadeIn y={24} delay={0.05} className="py-16 sm:py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
              <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
                <BilingualLabel en="Skills" ta="Kakayahan" />
              </div>
              <div className="flex-1 max-w-[65ch]">
                {SKILLS.map((s, i) => (
                  <div
                    key={s.name}
                    className="flex items-center gap-4 py-3.5"
                    style={{ borderTop: i > 0 ? '1px solid rgba(237,232,224,0.06)' : undefined }}
                  >
                    {/* Name */}
                    <p
                      className="font-inter font-light text-[#EDE8E0] flex-1 min-w-0"
                      style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                    >
                      {s.name}
                    </p>
                    {/* Dot scale */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map(d => (
                        <span
                          key={d}
                          className="rounded-full flex-shrink-0"
                          style={{
                            width: 6,
                            height: 6,
                            background: d <= s.level
                              ? '#EDE8E0'
                              : 'rgba(184,122,60,0.18)',
                          }}
                        />
                      ))}
                    </div>
                    {/* Note */}
                    <p
                      className="font-inter font-light text-[#888280] text-right flex-shrink-0 hidden sm:block"
                      style={{ fontSize: '11px', minWidth: '8rem', letterSpacing: '0.02em' }}
                    >
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Now */}
        <FadeIn y={24} delay={0.05} className="py-16 sm:py-20 md:py-28">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
            <div className="md:w-48 lg:w-56 flex-shrink-0 pt-1">
              <BilingualLabel en="Now" ta="Ngayon" />
            </div>
            <div className="flex-1 max-w-[65ch] grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {NOW.map(n => (
                <div key={n.label}>
                  <p
                    className="font-inter font-medium text-[#EDE8E0] uppercase mb-2"
                    style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                  >
                    {n.label}
                  </p>
                  <p
                    className="font-inter font-light text-[#EDE8E0]"
                    style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
                  >
                    {n.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Baybayin watermark */}
      <div
        className="relative overflow-hidden"
        aria-hidden="true"
        style={{ height: 1 }}
      >
        <span
          className="font-baybayin absolute bottom-0 right-8 pointer-events-none select-none leading-none"
          style={{ fontSize: 'clamp(5rem, 16vw, 18rem)', color: '#EDE8E0', opacity: 0.04 }}
        >
          ᜃᜇ
        </span>
      </div>

      <FooterSection />
    </div>
  );
}
