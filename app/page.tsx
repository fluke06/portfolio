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
