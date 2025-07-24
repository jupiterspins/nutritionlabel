export interface FoodItem {
  servingSizeG: number;
  calories: number;
  fat: number;
  carbs: number;
  sugar: number;
  protein: number;
  fiber?: number;
  sodium: number;
  potassium?: number;
  calcium?: number;
  iron?: number;
  vitA?: number;
  vitC?: number;
  vitD?: number;
  vitE?: number;
  vitK?: number;
  vitB6?: number;
  vitB12?: number;
  zinc?: number;
  folate?: number;
  magnesium?: number;
  manganese?: number;
  selenium?: number;
  niacin?: number;
  omega3?: number;
  caffeine?: number;
  alcohol?: number;
  category?: string;
}

export type FoodDatabase = Record<string, FoodItem>;

export type FoodCategory = 
  | 'fruits'
  | 'vegetables'
  | 'proteins'
  | 'grains'
  | 'dairy'
  | 'snacks'
  | 'beverages';

export interface CategoryMap {
  fruits: string[];
  vegetables: string[];
  proteins: string[];
  grains: string[];
  dairy: string[];
  snacks: string[];
  beverages: string[];
}