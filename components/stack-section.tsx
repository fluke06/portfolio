import { FadeIn } from './fade-in';

const COLS = [
  {
    head: 'Languages & Frameworks',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'React', 'Next.js', 'Node.js', 'SQL'],
  },
  {
    head: 'Infrastructure & Tools',
    items: ['AWS (EC2, RDS, S3)', 'Terraform', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Vercel', 'Redis', 'Linux'],
  },
];

export function StackSection() {
  return (
    <section
      id="stack"
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-44"
      style={{ background: '#100F0D', borderTop: '1px solid rgba(237,232,224,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16 sm:mb-20 pb-6"
          style={{ borderBottom: '1px solid rgba(237,232,224,0.08)' }}>
          <FadeIn delay={0} y={20}>
            <h2
              className="font-fraunces font-black text-[#EDE8E0] leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
            >
              The stack.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={0}>
            <p
              className="font-inter font-light text-[#7A7570]"
              style={{ fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', maxWidth: '32ch' }}
            >
              Tools I reach for when the job needs to get done.
            </p>
          </FadeIn>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {COLS.map((col, ci) => (
            <FadeIn key={col.head} delay={0.08 * ci} y={24}>
              <div
                className={ci === 0 ? 'sm:pr-12 sm:border-r pb-12 sm:pb-0' : 'sm:pl-12 pt-12 sm:pt-0'}
                style={{
                  borderColor: 'rgba(237,232,224,0.08)',
                  borderTopColor: 'rgba(237,232,224,0.08)',
                }}
              >
                <p
                  className="font-inter text-[#7A7570] mb-8"
                  style={{ fontSize: '10px', letterSpacing: '0.12em' }}
                >
                  {col.head.toUpperCase()}
                </p>
                <ul>
                  {col.items.map((item, i) => (
                    <li
                      key={item}
                      className="font-fraunces text-[#EDE8E0] flex items-center justify-between py-3.5"
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        borderBottom: i < col.items.length - 1
                          ? '1px solid rgba(237,232,224,0.06)'
                          : 'none',
                      }}
                    >
                      <span>{item}</span>
                      <span
                        className="font-inter text-[#7A7570]"
                        style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
