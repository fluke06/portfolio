import type { Cat, Food, LifeStage, MealPlan } from './types';

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

export interface MealBreakdown {
  daily: { kcal: number; rer: number; der: number; factor: number; label: string };
  dry: { food: Food | null; kcal: number; grams: number; perMealG: number; costPhp: number };
  wet: { food: Food | null; kcal: number; grams: number; cans: number; perMealG: number; costPhp: number };
  totals: {
    proteinG: number;
    fatG: number;
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
  const moistureMl = (dryG * (dryFood?.moisture ?? 0) + wetG * (wetFood?.moisture ?? 0)) / 100;
  const totalG = dryG + wetG;
  const moisturePctOfDiet = totalG > 0 ? moistureMl / totalG : 0;

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

  return {
    daily: { kcal: daily.der, rer: daily.rer, der: daily.der, factor: daily.factor, label: daily.label },
    dry: { food: dryFood, kcal: dryKcal, grams: dryG, perMealG: dryG / plan.meals, costPhp: dryCost },
    wet: { food: wetFood, kcal: wetKcal, grams: wetG, cans: wetCans, perMealG: wetG / plan.meals, costPhp: wetCost },
    totals: {
      proteinG, fatG, moistureMl,
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
