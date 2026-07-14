import type { Cat, Food, IntakeLog, MealPlan, Supplement } from './types';
import { KUBO_CAT, KUBO_PLAN, SEED_FOODS } from './seed';

const KEY = 'kubo:v1';
const SCHEMA_VERSION = 1;

export interface KuboStore {
  version: number;
  cats: Cat[];
  foods: Food[];
  plans: Record<string, MealPlan>;
  activeCatId: string;
  intake?: Record<string, Record<string, IntakeLog>>;
}

function defaults(): KuboStore {
  return {
    version: SCHEMA_VERSION,
    cats: [KUBO_CAT],
    foods: SEED_FOODS,
    plans: { [KUBO_CAT.id]: KUBO_PLAN },
    activeCatId: KUBO_CAT.id,
    intake: {},
  };
}

function parseSupplementString(s: string): Supplement[] {
  if (!s) return [];
  return s.split(/\s*[·,;]\s*/).filter(Boolean).map(part => {
    // Split into "Name" + "dose". Dose is the tail that starts with a digit.
    const match = part.match(/^(.+?)\s+(\d.*)$/);
    if (match) return { name: match[1].trim(), dose: match[2].trim() };
    return { name: part.trim(), dose: '' };
  });
}

function normalizeSupplements(raw: unknown): Supplement[] | undefined {
  if (raw == null) return undefined;
  if (typeof raw === 'string') return raw.trim() ? parseSupplementString(raw) : undefined;
  if (Array.isArray(raw)) {
    return raw
      .filter((r): r is { name?: unknown; dose?: unknown } => typeof r === 'object' && r !== null)
      .map(r => ({ name: String(r.name ?? '').trim(), dose: String(r.dose ?? '').trim() }))
      .filter(s => s.name);
  }
  return undefined;
}

function migrateCat(cat: Cat & { defaultSupplements?: unknown }): Cat {
  return { ...cat, defaultSupplements: normalizeSupplements(cat.defaultSupplements) };
}

interface LegacyIntakeLog {
  date: string;
  dryG?: number;
  wetG?: number;
  addedWaterMl?: number;
  meals?: (IntakeLog['meals'][number] & { supplements?: unknown })[];
}

function migrateIntake(intake: Record<string, Record<string, LegacyIntakeLog>> | undefined): Record<string, Record<string, IntakeLog>> {
  const out: Record<string, Record<string, IntakeLog>> = {};
  if (!intake) return out;
  for (const catId of Object.keys(intake)) {
    out[catId] = {};
    for (const date of Object.keys(intake[catId])) {
      const raw = intake[catId][date] as LegacyIntakeLog;
      if (Array.isArray(raw.meals)) {
        out[catId][date] = {
          date,
          meals: raw.meals.map(m => ({
            ...m,
            supplements: normalizeSupplements(m.supplements),
          })),
        };
      } else if (typeof raw.dryG === 'number' || typeof raw.wetG === 'number' || typeof raw.addedWaterMl === 'number') {
        out[catId][date] = {
          date,
          meals: [{
            id: `meal-${Date.parse(date) || Date.now()}`,
            label: 'Migrated from single-log',
            dryG: raw.dryG ?? 0,
            wetG: raw.wetG ?? 0,
            addedWaterMl: raw.addedWaterMl ?? 0,
          }],
        };
      } else {
        out[catId][date] = { date, meals: [] };
      }
    }
  }
  return out;
}

export function load(): KuboStore {
  if (typeof window === 'undefined') return defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw) as KuboStore & { intake?: Record<string, Record<string, LegacyIntakeLog>> };
    if (!parsed || parsed.version !== SCHEMA_VERSION) return defaults();
    return {
      ...parsed,
      cats: parsed.cats.map(migrateCat),
      intake: migrateIntake(parsed.intake),
    };
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
