'use client';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FACTS = [
  { label: 'Name',       value: 'Christian Dizon' },
  { label: 'Based',      value: 'Quezon City, PH' },
  { label: 'Experience', value: '8 years' },
  { label: 'Focus',      value: 'Full-Stack + Cloud' },
  { label: 'Available',  value: 'Yes — open to work' },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function AboutSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section
      id="about"
      ref={ref}
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-44"
      style={{ background: '#100F0D', borderTop: '1px solid rgba(237,232,224,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Top: headline + para */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24 mb-20 lg:mb-28">

          <motion.div
            className="flex-1"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease }}
          >
            <h2
              className="font-fraunces text-[#EDE8E0] leading-tight mb-10"
              style={{
                fontSize:   'clamp(2rem, 5vw, 4.5rem)',
                fontStyle:  'italic',
                fontWeight: 400,
                lineHeight: 1.1,
                maxWidth:   '20ch',
              }}
            >
              Eight years building
              things people actually use.
            </h2>

            <div
              className="font-inter font-light text-[#888280] leading-relaxed space-y-5"
              style={{ fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)', maxWidth: '52ch' }}
            >
              <p>
                I started freelancing at 20, building WordPress sites for local
                businesses in Manila. By the time I was 24 I was running the
                full AWS stack for a SaaS company, provisioning infrastructure
                with Terraform and writing the React front end.
              </p>
              <p>
                What I do is less about a specific framework and more about
                ownership. I scope the problem, pick the right tools, build
                front end and back end, and stay involved after launch. Most
                clients come back because they don&apos;t have to explain the
                system to me twice.
              </p>
              <p>
                Right now I take on two to three projects a year, usually
                greenfield builds or significant rewrites. I prefer working
                with founders and small product teams who move quickly and
                care about the details.
              </p>
            </div>
          </motion.div>

          {/* Fact list */}
          <div className="flex-shrink-0 w-full lg:w-72">
            {FACTS.map(({ label, value }, i) => (
              <motion.div
                key={label}
                className="flex items-baseline justify-between py-4"
                style={{ borderBottom: '1px solid rgba(237,232,224,0.08)' }}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={inView || reduced ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.07, ease }}
              >
                <span
                  className="font-inter text-[#888280]"
                  style={{ fontSize: '11px', letterSpacing: '0.08em' }}
                >
                  {label}
                </span>
                <span
                  className="font-fraunces text-[#EDE8E0] text-right"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
                >
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: 3-col philosophy row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-0"
          style={{ borderTop: '1px solid rgba(237,232,224,0.08)' }}
        >
          {[
            {
              n: '01',
              head: 'Scope first.',
              body: 'Every project starts with a week of questions. What problem is actually being solved? Where does complexity live? What can be cut? Most scoping errors turn into build errors.',
            },
            {
              n: '02',
              head: 'Own the stack.',
              body: 'I don\'t hand off infrastructure to a "DevOps person." I provision, configure, monitor, and scale it myself. Less handoff means fewer assumptions baked into the system.',
            },
            {
              n: '03',
              head: 'Ship and stay.',
              body: 'I stay on after launch. Not indefinitely, but long enough to see the first real traffic, fix the bugs that only appear in production, and hand off something stable.',
            },
          ].map(({ n, head, body }, i) => (
            <motion.div
              key={n}
              className={`py-10 ${i < 2 ? 'sm:pr-10 sm:border-r' : ''} ${i > 0 ? 'sm:pl-10' : ''}`}
              style={{ borderColor: 'rgba(237,232,224,0.08)' }}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease }}
            >
              <span
                className="font-inter text-[#888280] block mb-4"
                style={{ fontSize: '10px', letterSpacing: '0.12em' }}
              >
                {n}
              </span>
              <h3
                className="font-fraunces text-[#EDE8E0] mb-3"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontStyle: 'italic', fontWeight: 400 }}
              >
                {head}
              </h3>
              <p
                className="font-inter font-light text-[#888280] leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', maxWidth: '34ch' }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
