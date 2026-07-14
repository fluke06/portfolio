export type Sex = 'male' | 'female';
export type Activity = 'indoor-low' | 'indoor-active' | 'outdoor';
export type LifeStage = 'kitten' | 'young-adult' | 'adult' | 'senior';
export type FoodType = 'dry' | 'wet' | 'treat';
export type LifeStageTarget = 'kitten' | 'adult' | 'all';
export type PriceUnit = 'per-kg' | 'per-can';

export interface WeightEntry {
  date: string;
  weightKg: number;
}

export interface Cat {
  id: string;
  name: string;
  photo?: string;
  dob: string;
  sex: Sex;
  neutered: boolean;
  breed: string;
  weightKg: number;
  weightHistory?: WeightEntry[];
  idealWeightKg?: number;
  bcs: number;
  activity: Activity;
  defaultSupplements?: Supplement[];
  notes?: string;
}

export interface Food {
  id: string;
  brand: string;
  name: string;
  type: FoodType;
  kcalPer100g: number;
  canSizeG?: number;
  protein: number;
  fat: number;
  moisture: number;
  ash?: number;
  phosphorus?: number;
  magnesium?: number;
  taurine?: boolean;
  pricePhp: number;
  priceUnit: PriceUnit;
  lifeStage: LifeStageTarget;
  notes?: string;
  seeded?: boolean;
}

export interface MealPlan {
  catId: string;
  dryFoodId: string | null;
  wetFoodId: string | null;
  wetRatioKcal: number;
  meals: number;
  addedWaterMlPerMeal: number;
  mealTimes?: string[];
}

export interface Supplement {
  name: string;
  dose: string;
  info?: string;
  sourceUrl?: string;
}

export interface MealEntry {
  id: string;
  time?: string;
  label?: string;
  dryG: number;
  wetG: number;
  addedWaterMl: number;
  treatFoodId?: string | null;
  treatG?: number;
  supplements?: Supplement[];
  notes?: string;
}

export interface IntakeLog {
  date: string;
  meals: MealEntry[];
}
