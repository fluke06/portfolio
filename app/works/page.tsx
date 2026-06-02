import type { Metadata } from 'next';
import { WorksClient } from './works-client';

export const metadata: Metadata = {
  title: 'Works — Christian Dizon',
  description: 'Ten things built and shipped — client sites, e-commerce, and multilingual platforms.',
};

export default function WorksPage() {
  return <WorksClient />;
}
