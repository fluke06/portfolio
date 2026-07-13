import type { Cat, Food, LifeStage, MealPlan, WeightEntry } from './types';

export function defaultMealTimes(count: number): string[] {
  const presets: Record<number, string[]> = {
    2: ['07:00', '18:00'],
    3: ['07:00', '12:30', '18:00'],
    4: ['06:30', '11:30', '16:30', '21:00'],
    5: ['06:30', '10:30', '14:30', '18:30', '22:00'],
    6: ['06:00', '09:30', '13:00', '16:30', '20:00', '23:00'],
  };
  return presets[count] ?? Array.from({ length: count }, (_, i) => {
    const startMin = 7 * 60;
    const endMin   = 21 * 60;
    const t = startMin + ((endMin - startMin) * i) / Math.max(1, count - 1);
    const h = Math.floor(t / 60).toString().padStart(2, '0');
    const m = Math.round(t % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  });
}

export function normalizedMealTimes(plan: MealPlan): string[] {
  const existing = plan.mealTimes ?? [];
  if (existing.length === plan.meals) return existing;
  const defaults = defaultMealTimes(plan.meals);
  return Array.from({ length: plan.meals }, (_, i) => existing[i] ?? defaults[i]);
}

export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function formatTime12(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  if (!isFinite(h)) return hhmm;
  const suffix = h < 12 ? 'AM' : 'PM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = (m ?? 0).toString().padStart(2, '0');
  return `${hh}:${mm} ${suffix}`;
}

export function ageInMonths(dob: string, now: Date = new Date()): number {
  const d = new Date(dob);
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  if (now.getDate() < d.getDate()) months -= 1;
  return Math.max(0, months);
}

export function ageDisplay(dob: string, now: Date = new Date()): string {
  const m = ageInMonths(dob, now);
  if (m < 1) {
    const days = Math.max(0, Math.floor((now.getTime() - new Date(dob).getTime()) / 86400000));
    return `${days} day${days === 1 ? '' : 's'}`;
  }
  if (m < 12) return `${m} month${m === 1 ? '' : 's'}`;
  const y = Math.floor(m / 12);
  const r = m % 12;
  if (r === 0) return `${y} year${y > 1 ? 's' : ''}`;
  return `${y}y ${r}mo`;
}

export function lifeStage(ageMo: number): LifeStage {
  if (ageMo < 12) return 'kitten';
  if (ageMo < 36) return 'young-adult';
  if (ageMo < 120) return 'adult';
  return 'senior';
}

export function lifeStageLabel(s: LifeStage): string {
  return { 'kitten': 'Kitten', 'young-adult': 'Young adult', 'adult': 'Adult', 'senior': 'Senior' }[s];
}

export function rer(kg: number): number {
  return 70 * Math.pow(Math.max(kg, 0.01), 0.75);
}

export function derFactor(cat: Cat, ageMo: number): { factor: number; label: string } {
  if (ageMo < 4)  return { factor: 3.0, label: 'Growing kitten (<4mo) — 3.0× RER' };
  if (ageMo < 6)  return { factor: 2.5, label: 'Growing kitten (4–6mo) — 2.5× RER' };
  if (ageMo < 12) return { factor: 2.0, label: 'Growing kitten (6–12mo) — 2.0× RER' };
  if (ageMo >= 120) {
    const f = cat.neutered ? 1.1 : 1.2;
    return { factor: f, label: `Senior ${cat.neutered ? 'neutered' : 'intact'} — ${f}× RER` };
  }
  let base: number;
  if (cat.activity === 'indoor-low')      base = cat.neutered ? 1.0 : 1.2;
  else if (cat.activity === 'indoor-active') base = cat.neutered ? 1.2 : 1.4;
  else                                     base = cat.neutered ? 1.4 : 1.6;
  if (cat.bcs >= 7) return { factor: base * 0.8, label: `Overweight (BCS ${cat.bcs}/9) — target weight loss` };
  if (cat.bcs <= 3) return { factor: base * 1.2, label: `Underweight (BCS ${cat.bcs}/9) — target weight gain` };
  const stageLabel = cat.neutered ? 'Neutered adult' : 'Intact adult';
  const actLabel = cat.activity === 'indoor-low' ? 'indoor low activity' : cat.activity === 'indoor-active' ? 'indoor active' : 'outdoor';
  return { factor: base, label: `${stageLabel}, ${actLabel} — ${base}× RER` };
}

export function der(cat: Cat, now?: Date): { rer: number; der: number; factor: number; label: string } {
  const m = ageInMonths(cat.dob, now);
  const r = rer(cat.weightKg);
  const { factor, label } = derFactor(cat, m);
  return { rer: r, der: r * factor, factor, label };
}

export function proteinTargetG(cat: Cat, now?: Date): number {
  const m = ageInMonths(cat.dob, now);
  return cat.weightKg * (m < 12 ? 9 : 4.5);
}

export function waterTargetMl(cat: Cat): number {
  return cat.weightKg * 60;
}

/**
 * Estimate BCS from actual/ideal weight ratio. Anchor points based on the
 * Laflamme 1997 9-point scale — each BCS step ≈ 10–15% body weight change.
 * Returns null if ideal weight isn't set. Adult-oriented; skip for kittens.
 */
export function estimatedBcs(cat: Cat, now?: Date): number | null {
  if (!cat.idealWeightKg || cat.idealWeightKg <= 0) return null;
  const m = ageInMonths(cat.dob, now);
  if (m < 12) return null;
  const ratio = cat.weightKg / cat.idealWeightKg;
  if (ratio <= 0.65) return 1;
  if (ratio <= 0.75) return 2;
  if (ratio <= 0.85) return 3;
  if (ratio <= 0.95) return 4;
  if (ratio <= 1.05) return 5;
  if (ratio <= 1.15) return 6;
  if (ratio <= 1.25) return 7;
  if (ratio <= 1.40) return 8;
  return 9;
}

/**
 * Expected kitten weight for age, from general domestic cat growth curve.
 * Returns typical low / mid / high range in kg. Null for cats >= 12 months.
 * Based on published pediatric weight tables (Vogt et al. 2010, WSAVA).
 * Individual breeds vary — smaller-boned cats trend low, large breeds trend high.
 */
export function expectedKittenWeight(ageMo: number): { low: number; mid: number; high: number } | null {
  if (ageMo >= 12) return null;
  const curve: [number, number, number, number][] = [
    [0,   0.10, 0.12, 0.16],
    [1,   0.40, 0.50, 0.60],
    [2,   0.90, 1.05, 1.20],
    [3,   1.30, 1.55, 1.80],
    [4,   1.80, 2.10, 2.40],
    [5,   2.30, 2.60, 2.90],
    [6,   2.70, 3.10, 3.40],
    [7,   3.00, 3.40, 3.80],
    [8,   3.20, 3.60, 4.00],
    [9,   3.40, 3.80, 4.20],
    [10,  3.60, 4.00, 4.40],
    [11,  3.80, 4.20, 4.60],
    [12,  4.00, 4.40, 4.80],
  ];
  const lower = curve.filter(c => c[0] <= ageMo).pop() ?? curve[0];
  const upper = curve.find(c => c[0] > ageMo) ?? lower;
  if (lower[0] === upper[0]) return { low: lower[1], mid: lower[2], high: lower[3] };
  const t = (ageMo - lower[0]) / (upper[0] - lower[0]);
  return {
    low: lower[1] + (upper[1] - lower[1]) * t,
    mid: lower[2] + (upper[2] - lower[2]) * t,
    high: lower[3] + (upper[3] - lower[3]) * t,
  };
}

export type GrowthStatus = 'below' | 'low-normal' | 'on-track' | 'high-normal' | 'above';

export function growthStatus(cat: Cat, now?: Date): { status: GrowthStatus; expected: { low: number; mid: number; high: number } } | null {
  const m = ageInMonths(cat.dob, now);
  const expected = expectedKittenWeight(m);
  if (!expected) return null;
  const w = cat.weightKg;
  let status: GrowthStatus;
  if (w < expected.low * 0.85)       status = 'below';
  else if (w < expected.low)          status = 'low-normal';
  else if (w <= expected.high)        status = 'on-track';
  else if (w <= expected.high * 1.15) status = 'high-normal';
  else                                status = 'above';
  return { status, expected };
}

/**
 * Compute weight-gain trend from history entries. Returns weekly gain (g),
 * total gain since first log, and a qualitative label. Kittens 6–14 weeks
 * should gain ~100g/week; slowing over time is normal.
 */
export type TrendLabel = 'excellent' | 'good' | 'slow' | 'stalled' | 'losing' | 'insufficient-data';

export interface PlanAdvisory {
  tone: 'good' | 'cream' | 'warn';
  headline: string;
  body: string;
  suggestedKcalDelta: number;
}

export function planAdvisory(cat: Cat, plannedKcal: number, trend: { label: TrendLabel; gainPerWeekG: number; spanDays: number }, now: Date = new Date()): PlanAdvisory {
  const ageMo = ageInMonths(cat.dob, now);
  const isKitten = ageMo < 12;
  const name = cat.name;
  if (trend.label === 'insufficient-data') {
    return { tone: 'cream', headline: 'Log a second weigh-in to get plan feedback',
      body: `The plan below is the textbook target from RER × life-stage factor. Once you log another weigh-in a week from now, the tool will tell you whether the plan matches ${name}'s real needs.`,
      suggestedKcalDelta: 0 };
  }
  if (trend.label === 'excellent') {
    return { tone: 'good', headline: `${name}'s current intake is working — don't push more`,
      body: `He's gaining ${Math.round(trend.gainPerWeekG)}g/week, which is above the textbook 50–100g/week for a kitten. The theoretical ${Math.round(plannedKcal)} kcal target below is a ceiling, not a floor — feed to appetite, not to the number. If he stops finishing, that's the ceiling.`,
      suggestedKcalDelta: 0 };
  }
  if (trend.label === 'good') {
    return { tone: 'good', headline: `${name}'s on a healthy trajectory — hold the plan`,
      body: `Gaining ${Math.round(trend.gainPerWeekG)}g/week — right where a growing kitten should be. The plan below is a solid match. Feed to appetite; don't ration.`,
      suggestedKcalDelta: 0 };
  }
  if (trend.label === 'slow') {
    const bump = Math.round(plannedKcal * 0.15);
    return { tone: 'cream', headline: `Gaining, but slower than ideal — try +15%`,
      body: `${Math.round(trend.gainPerWeekG)}g/week is below the target range for growth at this age. Try adding roughly ${bump} kcal/day — usually one extra meal, or bumping the wet ratio up. Re-check in a week.`,
      suggestedKcalDelta: bump };
  }
  if (trend.label === 'stalled') {
    const bump = Math.round(plannedKcal * 0.25);
    return { tone: 'warn', headline: isKitten ? `Weight stall — worth a vet check` : `Weight stable — fine for maintenance`,
      body: isKitten
        ? `No gain over ${Math.round(trend.spanDays)} days is a signal for a kitten. Common causes: worms (worth deworming again if it's been >4 weeks), dental discomfort, not enough calories, or an illness. Try +${bump} kcal/day and mention it to your vet at the next visit.`
        : `An adult holding weight is fine. If ${name} is at ideal body condition and eating well, no change needed.`,
      suggestedKcalDelta: isKitten ? bump : 0 };
  }
  if (trend.label === 'losing') {
    const bump = Math.round(plannedKcal * 0.30);
    return { tone: 'warn', headline: `${name} is losing weight — check in with your vet`,
      body: `${isKitten ? 'A growing kitten' : `${name}`} shouldn't lose weight without a reason. Worms, dental pain, urinary blockage in males, or GI upset are common causes. Increase intake by ~${bump} kcal/day and book a vet visit if there's no rebound this week.`,
      suggestedKcalDelta: bump };
  }
  return { tone: 'cream', headline: 'Add more weigh-ins to see the picture', body: 'The tool needs a recent trend to give plan feedback.', suggestedKcalDelta: 0 };
}

export function weightTrend(cat: Cat, now: Date = new Date()): {
  entries: WeightEntry[];
  gainG: number;
  gainPerWeekG: number;
  spanDays: number;
  label: TrendLabel;
} {
  const history = [...(cat.weightHistory ?? [])].sort((a, b) => a.date.localeCompare(b.date));
  if (history.length === 0) {
    return { entries: [], gainG: 0, gainPerWeekG: 0, spanDays: 0, label: 'insufficient-data' };
  }
  if (history.length === 1) {
    return { entries: history, gainG: 0, gainPerWeekG: 0, spanDays: 0, label: 'insufficient-data' };
  }
  const first = history[0];
  const last = history[history.length - 1];
  const gainKg = last.weightKg - first.weightKg;
  const spanDays = Math.max(1, (new Date(last.date).getTime() - new Date(first.date).getTime()) / 86400000);
  const gainPerWeekG = (gainKg / spanDays) * 7 * 1000;
  const ageMo = ageInMonths(cat.dob, now);
  let label: TrendLabel;
  if (gainPerWeekG < -20)      label = 'losing';
  else if (gainPerWeekG < 20)  label = 'stalled';
  else if (ageMo < 6 && gainPerWeekG >= 80)  label = 'excellent';
  else if (ageMo < 6 && gainPerWeekG >= 50)  label = 'good';
  else if (ageMo < 12 && gainPerWeekG >= 30) label = 'good';
  else if (ageMo >= 12 && Math.abs(gainPerWeekG) < 20) label = 'good';
  else if (gainPerWeekG >= 20) label = 'slow';
  else                          label = 'stalled';
  return { entries: history, gainG: gainKg * 1000, gainPerWeekG, spanDays, label };
}

export interface MealBreakdown {
  daily: { kcal: number; rer: number; der: number; factor: number; label: string };
  dry: { food: Food | null; kcal: number; grams: number; perMealG: number; costPhp: number };
  wet: { food: Food | null; kcal: number; grams: number; cans: number; perMealG: number; costPhp: number };
  addedWater: { perMealMl: number; dailyMl: number };
  totals: {
    proteinG: number;
    fatG: number;
    moistureFromFoodMl: number;
    moistureMl: number;
    proteinTargetG: number;
    waterTargetMl: number;
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
  };
  urinary: {
    phosphorusAvg: number | null;
    magnesiumAvg: number | null;
    moisturePctOfDiet: number;
    flags: string[];
  };
}

function findFood(id: string | null, foods: Food[]): Food | null {
  if (!id) return null;
  return foods.find(f => f.id === id) ?? null;
}

export function computeMealPlan(cat: Cat, plan: MealPlan, foods: Food[], now?: Date): MealBreakdown {
  const daily = der(cat, now);
  const dryFood = findFood(plan.dryFoodId, foods);
  const wetFood = findFood(plan.wetFoodId, foods);

  let wetRatio = plan.wetRatioKcal;
  if (!wetFood) wetRatio = 0;
  if (!dryFood) wetRatio = wetFood ? 1 : 0;

  const wetKcal = daily.der * wetRatio;
  const dryKcal = daily.der - wetKcal;

  const dryG = dryFood ? (dryKcal / dryFood.kcalPer100g) * 100 : 0;
  const wetG = wetFood ? (wetKcal / wetFood.kcalPer100g) * 100 : 0;
  const wetCans = wetFood && wetFood.canSizeG ? wetG / wetFood.canSizeG : 0;

  const proteinG = (dryG * (dryFood?.protein ?? 0) + wetG * (wetFood?.protein ?? 0)) / 100;
  const fatG     = (dryG * (dryFood?.fat     ?? 0) + wetG * (wetFood?.fat     ?? 0)) / 100;
  const moistureFromFoodMl = (dryG * (dryFood?.moisture ?? 0) + wetG * (wetFood?.moisture ?? 0)) / 100;
  const addedWaterPerMeal = Math.max(0, plan.addedWaterMlPerMeal || 0);
  const addedWaterDaily = addedWaterPerMeal * plan.meals;
  const moistureMl = moistureFromFoodMl + addedWaterDaily;
  const totalG = dryG + wetG;
  const moisturePctOfDiet = (totalG + addedWaterDaily) > 0 ? moistureMl / (totalG + addedWaterDaily) : 0;

  const dryCost = dryFood && dryFood.priceUnit === 'per-kg' ? (dryG / 1000) * dryFood.pricePhp : 0;
  const wetCost = wetFood && wetFood.priceUnit === 'per-can' && wetFood.canSizeG
    ? wetCans * wetFood.pricePhp
    : wetFood && wetFood.priceUnit === 'per-kg'
      ? (wetG / 1000) * wetFood.pricePhp
      : 0;
  const dailyCost = dryCost + wetCost;

  const pVals = [dryFood?.phosphorus, wetFood?.phosphorus].filter((v): v is number => typeof v === 'number');
  const mVals = [dryFood?.magnesium,  wetFood?.magnesium ].filter((v): v is number => typeof v === 'number');
  const phosphorusAvg = pVals.length ? pVals.reduce((a, b) => a + b, 0) / pVals.length : null;
  const magnesiumAvg  = mVals.length ? mVals.reduce((a, b) => a + b, 0) / mVals.length : null;

  const flags: string[] = [];
  if (phosphorusAvg !== null && phosphorusAvg > 1.2)  flags.push('High phosphorus (>1.2% DM) — long-term risk for urinary/renal health');
  if (magnesiumAvg  !== null && magnesiumAvg  > 0.12) flags.push('High magnesium (>0.12% DM) — struvite crystal risk for male cats');
  if (moisturePctOfDiet < 0.5 && cat.sex === 'male') flags.push('Diet moisture <50% — consider more wet food for a male cat');
  if (proteinG < proteinTargetG(cat, now) * 0.9) flags.push('Protein intake below target — increase wet food ratio or switch to higher-protein food');
  if (moistureMl < waterTargetMl(cat) * 0.3 && cat.sex === 'male') flags.push('Food-derived water low — free water intake becomes critical');

  // Per-meal stomach capacity check (kittens especially — ~20g/kg BW is a reasonable ceiling)
  const perMealG = (dryG + wetG) / plan.meals;
  const perMealCeilingG = cat.weightKg * 20;
  if (perMealG > perMealCeilingG) {
    const suggestedMeals = Math.ceil((dryG + wetG) / perMealCeilingG);
    flags.push(`Meal size ${Math.round(perMealG)}g may exceed ${cat.name}'s stomach capacity (~${Math.round(perMealCeilingG)}g/meal for ${cat.weightKg}kg). Try splitting into ${suggestedMeals}× / day, or lower the wet ratio.`);
  }

  return {
    daily: { kcal: daily.der, rer: daily.rer, der: daily.der, factor: daily.factor, label: daily.label },
    dry: { food: dryFood, kcal: dryKcal, grams: dryG, perMealG: dryG / plan.meals, costPhp: dryCost },
    wet: { food: wetFood, kcal: wetKcal, grams: wetG, cans: wetCans, perMealG: wetG / plan.meals, costPhp: wetCost },
    addedWater: { perMealMl: addedWaterPerMeal, dailyMl: addedWaterDaily },
    totals: {
      proteinG, fatG, moistureFromFoodMl, moistureMl,
      proteinTargetG: proteinTargetG(cat, now),
      waterTargetMl: waterTargetMl(cat),
      dailyCost, weeklyCost: dailyCost * 7, monthlyCost: dailyCost * 30,
    },
    urinary: { phosphorusAvg, magnesiumAvg, moisturePctOfDiet, flags },
  };
}

export function scoreFoodForCat(cat: Cat, food: Food, now?: Date): { score: number; reasons: string[] } {
  const m = ageInMonths(cat.dob, now);
  const stage = lifeStage(m);
  const reasons: string[] = [];
  let score = 50;
  if (stage === 'kitten' && food.lifeStage === 'kitten')            { score += 25; reasons.push('Kitten-formulated'); }
  else if (stage === 'kitten' && food.lifeStage === 'adult')        { score -= 30; reasons.push('Not formulated for kittens'); }
  else if (stage !== 'kitten' && food.lifeStage === 'kitten')       { score -= 15; reasons.push('Kitten formula — too calorie-dense for adults'); }
  else if (food.lifeStage === 'all')                                { score += 10; reasons.push('All life stages'); }
  if (food.type === 'wet') { score += 15; reasons.push('Wet food supports hydration'); }
  if (food.protein >= 35 && food.type === 'dry')                    { score += 12; reasons.push(`High protein (${food.protein}%)`); }
  if (food.protein >= 10 && food.type === 'wet')                    { score += 8;  reasons.push(`Solid protein for wet food (${food.protein}%)`); }
  if (food.protein < 26 && food.type === 'dry')                     { score -= 12; reasons.push(`Low protein for dry (${food.protein}%)`); }
  if (typeof food.phosphorus === 'number' && food.phosphorus > 1.2) { score -= 15; reasons.push('High phosphorus — urinary risk'); }
  if (typeof food.magnesium  === 'number' && food.magnesium  > 0.12){ score -= 12; reasons.push('High magnesium — struvite risk'); }
  if (typeof food.phosphorus === 'number' && food.phosphorus <= 1.0 && cat.sex === 'male') { score += 8; reasons.push('Phosphorus in safe range for male cats'); }
  const kcalPerPhp = food.type === 'dry'
    ? (food.kcalPer100g * 10) / food.pricePhp
    : food.canSizeG && food.priceUnit === 'per-can'
      ? (food.kcalPer100g * food.canSizeG / 100) / food.pricePhp
      : 0;
  if (kcalPerPhp > 5) { score += 10; reasons.push('Excellent kcal-per-peso value'); }
  else if (kcalPerPhp > 2.5) { score += 5; reasons.push('Good value'); }
  else if (kcalPerPhp > 0 && kcalPerPhp < 1) { score -= 5; reasons.push('Premium pricing'); }
  return { score: Math.max(0, Math.min(100, Math.round(score))), reasons };
}
