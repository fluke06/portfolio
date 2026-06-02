import Link from 'next/link';
import { AppShell } from '@/components/app-shell';
import { Mascot } from '@/components/mascot';

export default function NotFound() {
  return (
    <AppShell>
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 'var(--s-5)' }}>
        <Mascot name="squiggle" style={{ width: 120, height: 40, color: 'var(--accent)' }} />
        <div className="t-eyebrow">404</div>
        <h1 className="t-h2" >
          This page doesn&rsquo;t exist. <em>Yet.</em>
        </h1>
        <Link href="/" className="t-link" style={{ fontSize: 15 }}>← Back home</Link>
      </div>
    </AppShell>
  );
}
