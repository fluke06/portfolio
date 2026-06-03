'use client';
import { FadeIn } from './fade-in';

const SERVICES = [
  {
    num: '01',
    name: 'Full-Stack Web Apps',
    desc: 'End-to-end applications built with Next.js and Express — internal dashboards, client-facing apps, REST APIs, scoped and shipped from architecture to launch.',
  },
  {
    num: '02',
    name: 'Cloud & AWS Infrastructure',
    desc: 'Scalable AWS infrastructure with Terraform: ECS, Lambda, API Gateway, RDS — serverless-leaning, multi-client deployments.',
  },
  {
    num: '03',
    name: 'E-commerce & CMS',
    desc: 'WordPress and WooCommerce development: custom themes, Elementor and WPBakery builds, launch, and ongoing optimization.',
  },
  {
    num: '04',
    name: 'DevOps & Site Infrastructure',
    desc: 'Full site infrastructure — DNS, CDN, email, databases, automated backups, Docker deployments managed end-to-end.',
  },
  {
    num: '05',
    name: 'Performance & SEO',
    desc: 'PageSpeed, GTmetrix, Google Analytics, Search Console, Hotjar. Sites that load fast and rank.',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-44"
      style={{ background: '#100F0D' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <FadeIn delay={0} y={28}>
          <h2
            className="font-fraunces font-black text-[#EDE8E0] leading-none tracking-tight mb-20 sm:mb-28"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', lineHeight: 0.92 }}
          >
            What I{' '}
            <em className="italic text-[#EDE8E0]">do.</em>
          </h2>
        </FadeIn>

        {/* List */}
        <div>
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.num} delay={i * 0.07} y={16}>
              <div
                className="flex items-start gap-8 md:gap-14 py-9 sm:py-11"
                style={{ borderTop: '1px solid rgba(237,232,224,0.08)' }}
              >
                {/* Number */}
                <span
                  className="font-fraunces italic text-[#EDE8E0] leading-none flex-shrink-0 select-none"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', opacity: 0.45, minWidth: '2.5rem' }}
                >
                  {svc.num}
                </span>

                {/* Name + desc */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-12">
                  <h3
                    className="font-fraunces font-black text-[#EDE8E0] leading-none flex-shrink-0"
                    style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.4rem)' }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="font-inter font-light text-[#888280] leading-relaxed"
                    style={{ fontSize: 'clamp(0.85rem, 1.35vw, 1.05rem)', maxWidth: '52ch' }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
          {/* Bottom rule */}
          <div style={{ borderTop: '1px solid rgba(237,232,224,0.08)' }} />
        </div>

      </div>
    </section>
  );
}
