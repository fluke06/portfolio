import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KAOMUG — Ceramic Character Mugs',
  description: 'Handcrafted ceramic character mugs. Your face, your cup.',
};

export default function KaomugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
