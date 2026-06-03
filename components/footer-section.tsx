import Link from 'next/link';

const COLS = [
  {
    head: 'Contact',
    items: [
      { label: 'cdizon1048@gmail.com', href: 'mailto:cdizon1048@gmail.com', external: false },
      { label: 'GitHub',          href: 'https://github.com/fluke06', external: true },
      { label: 'LinkedIn',        href: 'https://www.linkedin.com/in/christian-dizon-7a1151267', external: true },
    ],
  },
  {
    head: 'Nav',
    items: [
      { label: 'About',   href: '/about',   external: false },
      { label: 'Works',   href: '/works',   external: false },
      { label: 'Contact', href: '/contact', external: false },
    ],
  },
  {
    head: 'Scope',
    items: [
      { label: 'Full-Stack Dev', href: null, external: false },
      { label: 'Cloud / AWS',    href: null, external: false },
      { label: 'UI Design',      href: null, external: false },
    ],
  },
];

export function FooterSection() {
  return (
    <footer
      style={{ background: '#100F0D', overflow: 'hidden' }}
      aria-label="Site footer"
    >
      {/* ── Columns ── */}
      <div className="px-5 sm:px-8 md:px-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
          {COLS.map((col, i) => (
            <div key={col.head} className={i === 0 ? 'col-span-2 sm:col-span-1' : ''}>
              {/* Column header */}
              <p
                className="font-inter text-[#888280] mb-5 pb-3"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  borderBottom: '1px solid rgba(237,232,224,0.10)',
                }}
              >
                {col.head}
              </p>
              {/* Links */}
              <ul className="flex flex-col gap-2.5">
                {col.items.map(item =>
                  item.href ? (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="font-inter font-light text-[#EDE8E0] hover:text-[#EDE8E0] transition-colors duration-200"
                        style={{ fontSize: 'clamp(0.82rem, 1.3vw, 0.95rem)' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={item.label}
                      className="font-inter font-light text-[#888280]"
                      style={{ fontSize: 'clamp(0.82rem, 1.3vw, 0.95rem)' }}
                    >
                      {item.label}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrolling name mark ── */}
      <div className="overflow-hidden" aria-hidden="true">
        <div
          className="marquee-track inline-flex"
          style={{ animation: 'marquee-right 22s linear infinite' }}
        >
          {[0, 1].map(i => (
            <span
              key={i}
              className="font-fraunces font-black text-[#EDE8E0] whitespace-nowrap leading-none select-none"
              style={{
                fontSize:      'clamp(4rem, 16vw, 18rem)',
                letterSpacing: '-0.02em',
                paddingRight:  '0.4em',
                lineHeight:    0.88,
                opacity:       0.40,
              }}
            >
              Christian Dizon
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
