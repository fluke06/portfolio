import type { Metadata } from 'next';
import { PlaygroundClient } from './playground-client';

export const metadata: Metadata = {
  title: 'Playground — Christian Dizon',
  description: 'Landing pages, interactive experiments, and things built during creative bursts.',
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
