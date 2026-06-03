import dynamic from 'next/dynamic';
import { HomeClient } from '@/components/home-client';
import { StickyNav } from '@/components/sticky-nav';

const ProjectsSection = dynamic(() =>
  import('@/components/projects-section').then(m => ({ default: m.ProjectsSection }))
);
const CtaSection = dynamic(() =>
  import('@/components/cta-section').then(m => ({ default: m.CtaSection }))
);
const FooterSection = dynamic(() =>
  import('@/components/footer-section').then(m => ({ default: m.FooterSection }))
);

export default function HomePage() {
  return (
    <>
      {/*
        Static HELLO placeholder — visible immediately without JS.
        Makes LCP ~0.9s (FCP) instead of ~3.3s (after JS hydrates).
        Hidden for returning visitors via inline script in layout that checks sessionStorage.
      */}
      <div
        id="intro-placeholder"
        aria-hidden="true"
        className="font-fraunces"
        style={{
          position: 'fixed', inset: 0, background: '#100F0D',
          zIndex: 199, display: 'flex', alignItems: 'center',
          justifyContent: 'center', pointerEvents: 'none', userSelect: 'none',
        }}
      >
        <span
          style={{
            fontWeight: 900, color: '#EDE8E0', lineHeight: 1,
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            letterSpacing: '0.32em', paddingLeft: '0.32em',
          }}
        >
          HELLO
        </span>
      </div>
      <StickyNav />
      <main id="main-content" style={{ background: 'var(--color-bg)', overflowX: 'clip' }}>
        <HomeClient />
        <ProjectsSection />
        <CtaSection />
        <FooterSection />
      </main>
    </>
  );
}
