export type Sex = 'male' | 'female';
export type Activity = 'indoor-low' | 'indoor-active' | 'outdoor';
export type LifeStage = 'kitten' | 'young-adult' | 'adult' | 'senior';
export type FoodType = 'dry' | 'wet';
export type LifeStageTarget = 'kitten' | 'adult' | 'all';
export type PriceUnit = 'per-kg' | 'per-can';

export interface Cat {
  id: string;
  name: string;
  photo?: string;
  dob: string;
  sex: Sex;
  neutered: boolean;
  breed: string;
  weightKg: number;
  bcs: number;
  activity: Activity;
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
}
