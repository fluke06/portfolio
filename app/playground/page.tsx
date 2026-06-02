import type { Metadata } from 'next';
import { PlaygroundClient } from './playground-client';
import { AppShell } from '@/components/app-shell';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Small experiments. Most are pointless. That\'s the point.',
};

export default function PlaygroundPage() {
  return (
    <AppShell>
      <PlaygroundClient />
    </AppShell>
  );
}
