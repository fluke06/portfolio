import type { Metadata } from 'next';
import { PixlClient } from './pixl-client';

export const metadata: Metadata = {
  title: 'PIXL — Y2K Tech Accessories',
  description: 'Handpicked Y2K pixel-inspired jewelry and charms. Chrome pendants, flip-phone keychains, CD compacts.',
};

export default function PixlPage() {
  return <PixlClient />;
}
