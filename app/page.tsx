import { HomeClient } from '@/components/home-client';
import { ProjectsSection } from '@/components/projects-section';
import { CtaSection } from '@/components/cta-section';
import { FooterSection } from '@/components/footer-section';
import { StickyNav } from '@/components/sticky-nav';

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
