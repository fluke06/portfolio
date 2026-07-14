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
  weightHistory: [
    { date: '2026-06-10', weightKg: 0.60 },
    { date: '2026-07-13', weightKg: 1.18 },
  ],
  bcs: 5,
  activity: 'indoor-active',
  defaultSupplements: [
    {
      name: 'Immunopet Probiotic Vita-Paste',
      dose: '4.4 g',
      info: 'Probiotic + vitamin oral paste for cats and dogs (PH veterinary market). Typical formulation: live probiotics (Bacillus / Lactobacillus strains), vitamins A, D3, E, B-complex · amino acids · malt-based palatable paste. Supports gut flora and immunity — often given post-deworming and during the vaccination window. 4.4g = one full syringe dose typical for a kitten. Verify exact composition from the package label.',
      sourceUrl: 'https://www.google.com/search?q=Immunopet+Probiotic+Vita-Paste+cat+composition',
    },
    {
      name: 'Emerflex',
      dose: '0.5 ml',
      info: 'Oral vitamin-mineral liquid for cats and dogs (PH veterinary market). Typical formulation: vitamins A, D, E, K, B-complex, C · amino acids lysine, methionine, taurine · iron, calcium. Given as a general nutritional-support supplement, often during recovery or growth. Verify exact composition and dosage from the bottle label.',
      sourceUrl: 'https://www.google.com/search?q=Emerflex+cat+supplement+composition',
    },
  ],
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
  // ── Licky / creamy treats (actual products used for Kubo) ───────────────
  // Petibox Vitastrip — 15g per strip, 12 strips/pack, guaranteed analysis (dry matter basis):
  // protein ≥22%, fat ≥3%, fiber ≤3%, ash ≤12%, moisture ≤88%. Additives include taurine,
  // B1/B2/B6/D3/E, niacin, calcium pantothenate, D-biotin, folic acid.
  {
    id: 'petibox-vitastrip-tuna',
    brand: 'Petibox', name: 'Vitastrip Tuna (For Hydration)', type: 'treat',
    kcalPer100g: 65, canSizeG: 15, protein: 2.6, fat: 0.4, moisture: 88,
    ash: 1.4, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 12, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Kitten (1–2kg): 1 strip/day. Adult (1–4kg): 2–3 strips/day. Adult (4–8kg): 3–4 strips/day. Boosts hydration.',
    seeded: true,
  },
  {
    id: 'petibox-vitastrip-cod',
    brand: 'Petibox', name: 'Vitastrip Cod (Weight Control)', type: 'treat',
    kcalPer100g: 55, canSizeG: 15, protein: 2.6, fat: 0.4, moisture: 88,
    ash: 1.4, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 12, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Lower-calorie variant. Same feeding guide as the range.',
    seeded: true,
  },
  {
    id: 'petibox-vitastrip-salmon',
    brand: 'Petibox', name: 'Vitastrip Salmon (Healthy Coat)', type: 'treat',
    kcalPer100g: 68, canSizeG: 15, protein: 2.6, fat: 0.4, moisture: 88,
    ash: 1.4, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 12, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Salmon variant with omega-3. Supports coat health.',
    seeded: true,
  },
  {
    id: 'petibox-vitastrip-chicken-shrimp',
    brand: 'Petibox', name: 'Vitastrip Chicken & Shrimp (Picky Eaters)', type: 'treat',
    kcalPer100g: 65, canSizeG: 15, protein: 2.6, fat: 0.4, moisture: 88,
    ash: 1.4, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 12, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Palatable option for picky eaters.',
    seeded: true,
  },
  // Petsup Premium Licky — 15g per strip, 8 strips/pack.
  {
    id: 'petsup-licky-multivitamins',
    brand: 'Petsup', name: 'Premium Licky Multivitamins (Immunity Boost)', type: 'treat',
    kcalPer100g: 70, canSizeG: 15, protein: 3.0, fat: 0.5, moisture: 87,
    ash: 1.5, phosphorus: 0.30, magnesium: 0.02, taurine: true,
    pricePhp: 18, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Chicken base with a full multivitamin blend (B1/B2/D3/E, niacin, calcium pantothenate, choline, iodine, manganese, iron, zinc, selenium, taurine). Kitten 3–6mo: 1 strip/day. Kitten 6mo+ (1–4kg): 2 strips/day.',
    seeded: true,
  },
  {
    id: 'petsup-licky-urinary',
    brand: 'Petsup', name: 'Premium Licky Dandelion (Urinary Care)', type: 'treat',
    kcalPer100g: 55, canSizeG: 15, protein: 1.8, fat: 0.4, moisture: 88,
    ash: 1.2, phosphorus: 0.25, magnesium: 0.02, taurine: true,
    pricePhp: 18, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Chicken + dandelion. Targeted at urinary tract support — great pick for male cats.',
    seeded: true,
  },
  // Premium reference option: Inaba Churu (kept as global comparison SKU).
  {
    id: 'churu-licky-treat',
    brand: 'Inaba', name: 'Churu Tuna Recipe', type: 'treat',
    kcalPer100g: 63, canSizeG: 14, protein: 9, fat: 0.3, moisture: 85,
    ash: 1.6, phosphorus: 0.25, magnesium: 0.02, taurine: true,
    pricePhp: 85, priceUnit: 'per-can', lifeStage: 'all',
    notes: 'Premium reference brand. 14g/tube. Very palatable — good for hiding medication.',
    seeded: true,
  },
];

export const KUBO_PLAN: MealPlan = {
  catId: 'kubo',
  dryFoodId: 'aozi-kitten-salmon',
  wetFoodId: 'brit-kitten-cod',
  wetRatioKcal: 0.35,
  meals: 3,
  addedWaterMlPerMeal: 0,
  mealTimes: ['07:00', '12:30', '18:00'],
};
