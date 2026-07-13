import type { Metadata } from 'next';
import { KuboClient } from './kubo-client';

export const metadata: Metadata = {
  title: 'Kubo — Cat diet & feeding planner',
  description: 'A deep feeding calculator for cats. Daily kcal, wet/dry blend, macro & urinary check, budget planner. Seeded with a real kitten.',
};

export default function KuboPage() {
  return <KuboClient />;
}
