import type { Cat, Food, MealPlan } from './types';

export const KUBO_CAT: Cat = {
  id: 'kubo',
  name: 'Kubo',
  photo: '/assets/kubo/kubo.jpg',
  dob: '2026-03-28',
  sex: 'male',
  neutered: false,
  breed: 'Scottish Straight × Highland mix',
  weightKg: 1.18,
  bcs: 5,
  activity: 'indoor-active',
  notes: 'On Immunopet + Emerflex vitamins until 2026-07-20. Last deworming done, first 4-in-1 vaccine done.',
};

/**
 * Seed food catalog — values are typical for PH-market SKUs based on the
 * brands' published guaranteed analyses. Actual bag/can values may differ;
 * users should update these with the specific product they're feeding.
 */
export const SEED_FOODS: Food[] = [
  {
    id: 'aozi-kitten-salmon',
    brand: 'Aozi', name: 'Kitten Salmon', type: 'dry',
    kcalPer100g: 380, protein: 32, fat: 14, moisture: 10,
    ash: 8, phosphorus: 1.1, magnesium: 0.09, taurine: true,
    pricePhp: 550, priceUnit: 'per-kg', lifeStage: 'kitten',
    notes: 'Kubo\'s current dry kibble.',
    seeded: true,
  },
  {
    id: 'brit-kitten-cod',
    brand: 'Brit Care', name: 'Kitten Cod', type: 'wet',
    kcalPer100g: 78, canSizeG: 80, protein: 11, fat: 5, moisture: 78,
    ash: 2.5, phosphorus: 0.28, magnesium: 0.02, taurine: true,
    pricePhp: 105, priceUnit: 'per-can', lifeStage: 'kitten',
    notes: 'Kubo\'s current wet food.',
    seeded: true,
  },
  {
    id: 'rc-kitten-dry',
    brand: 'Royal Canin', name: 'Kitten (Dry)', type: 'dry',
    kcalPer100g: 396, protein: 34, fat: 20, moisture: 5.5,
    ash: 7.4, phosphorus: 1.0, magnesium: 0.07, taurine: true,
    pricePhp: 950, priceUnit: 'per-kg', lifeStage: 'kitten',
    seeded: true,
  },
  {
    id: 'rc-kitten-wet',
    brand: 'Royal Canin', name: 'Kitten Instinctive (Wet Pouch)', type: 'wet',
    kcalPer100g: 88, canSizeG: 85, protein: 10.5, fat: 4.5, moisture: 82,
    ash: 2.1, phosphorus: 0.22, magnesium: 0.02, taurine: true,
    pricePhp: 95, priceUnit: 'per-can', lifeStage: 'kitten',
    seeded: true,
  },
  {
    id: 'whiskas-kitten-dry',
    brand: 'Whiskas', name: 'Junior Kitten', type: 'dry',
    kcalPer100g: 375, protein: 32, fat: 12, moisture: 10,
    ash: 8, phosphorus: 1.3, magnesium: 0.11, taurine: true,
    pricePhp: 280, priceUnit: 'per-kg', lifeStage: 'kitten',
    notes: 'Budget option — check phosphorus/magnesium levels for a male cat.',
    seeded: true,
  },
  {
    id: 'monge-kitten-dry',
    brand: 'Monge', name: 'Natural Superpremium Kitten', type: 'dry',
    kcalPer100g: 420, protein: 34, fat: 22, moisture: 8,
    ash: 6.5, phosphorus: 0.9, magnesium: 0.08, taurine: true,
    pricePhp: 1200, priceUnit: 'per-kg', lifeStage: 'kitten',
    seeded: true,
  },
  {
    id: 'instinct-kitten-dry',
    brand: 'Instinct', name: 'Original Kitten Grain-Free', type: 'dry',
    kcalPer100g: 500, protein: 42, fat: 22, moisture: 9,
    ash: 8, phosphorus: 1.0, magnesium: 0.09, taurine: true,
    pricePhp: 1800, priceUnit: 'per-kg', lifeStage: 'kitten',
    seeded: true,
  },
  {
    id: 'applaws-kitten-wet',
    brand: 'Applaws', name: 'Kitten Chicken Breast (Wet Can)', type: 'wet',
    kcalPer100g: 76, canSizeG: 70, protein: 15, fat: 0.5, moisture: 82,
    ash: 2, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 110, priceUnit: 'per-can', lifeStage: 'kitten',
    seeded: true,
  },
  {
    id: 'fussie-cat-wet',
    brand: 'Fussie Cat', name: 'Premium Tuna (Wet Can)', type: 'wet',
    kcalPer100g: 78, canSizeG: 80, protein: 14, fat: 0.5, moisture: 82,
    ash: 2, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 95, priceUnit: 'per-can', lifeStage: 'all',
    seeded: true,
  },
  {
    id: 'aixia-kin-can-wet',
    brand: 'Aixia', name: 'Kin-Can Tuna (Wet Can)', type: 'wet',
    kcalPer100g: 74, canSizeG: 70, protein: 11, fat: 1.4, moisture: 80,
    ash: 2.5, phosphorus: 0.30, magnesium: 0.03, taurine: true,
    pricePhp: 55, priceUnit: 'per-can', lifeStage: 'all',
    seeded: true,
  },
];

export const KUBO_PLAN: MealPlan = {
  catId: 'kubo',
  dryFoodId: 'aozi-kitten-salmon',
  wetFoodId: 'brit-kitten-cod',
  wetRatioKcal: 0.5,
  meals: 3,
  addedWaterMlPerMeal: 0,
};
