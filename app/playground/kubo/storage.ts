import type { Cat, Food, MealPlan } from './types';
import { KUBO_CAT, KUBO_PLAN, SEED_FOODS } from './seed';

const KEY = 'kubo:v1';
const SCHEMA_VERSION = 1;

export interface KuboStore {
  version: number;
  cats: Cat[];
  foods: Food[];
  plans: Record<string, MealPlan>;
  activeCatId: string;
}

function defaults(): KuboStore {
  return {
    version: SCHEMA_VERSION,
    cats: [KUBO_CAT],
    foods: SEED_FOODS,
    plans: { [KUBO_CAT.id]: KUBO_PLAN },
    activeCatId: KUBO_CAT.id,
  };
}

export function load(): KuboStore {
  if (typeof window === 'undefined') return defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw) as KuboStore;
    if (!parsed || parsed.version !== SCHEMA_VERSION) return defaults();
    return parsed;
  } catch {
    return defaults();
  }
}

export function save(state: KuboStore): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // noop — quota exceeded, private mode, etc.
  }
}

export function reset(): KuboStore {
  const d = defaults();
  save(d);
  return d;
}

export function exportJson(state: KuboStore): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(raw: string): KuboStore | null {
  try {
    const parsed = JSON.parse(raw) as KuboStore;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.cats) || !Array.isArray(parsed.foods)) return null;
    return { ...parsed, version: SCHEMA_VERSION };
  } catch {
    return null;
  }
}
