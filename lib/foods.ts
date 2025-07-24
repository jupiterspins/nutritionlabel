import foodsData from '@/data/foods.json';
import categoriesData from '@/data/categories.json';
import { FoodDatabase, FoodItem, CategoryMap } from '@/types/food';
import Fuse from 'fuse.js';

export const foods: FoodDatabase = foodsData;
export const categories: CategoryMap = categoriesData as CategoryMap;

// Initialize Fuse.js for fuzzy search
const fuseOptions = {
  keys: ['name'],
  threshold: 0.3,
  includeScore: true,
};

const foodsList = Object.keys(foods).map(name => ({ name }));
const fuse = new Fuse(foodsList, fuseOptions);

export function getFoodByName(name: string): FoodItem | null {
  return foods[name] || null;
}

export function getAllFoodNames(): string[] {
  return Object.keys(foods);
}

export function searchFoods(query: string, useFuzzy: boolean = false): string[] {
  if (!query) return [];
  
  if (useFuzzy) {
    // Use fuzzy search
    const results = fuse.search(query);
    return results.map(result => result.item.name);
  } else {
    // Use regular search
    const lowerQuery = query.toLowerCase();
    return Object.keys(foods).filter(foodName => 
      foodName.toLowerCase().includes(lowerQuery)
    );
  }
}

export function getCommonSearches(): string[] {
  return [
    "Apple",
    "Chicken Breast (cooked)",
    "Oreo Cookies (3 cookies)",
    "Avocado",
    "Fairlife Protein Shake (Chocolate)",
    "Banana",
    "Egg",
    "Potato"
  ];
}

export function getFoodSlug(foodName: string): string {
  return foodName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getFoodNameFromSlug(slug: string): string | null {
  const foodName = Object.keys(foods).find(
    name => getFoodSlug(name) === slug
  );
  return foodName || null;
}

export function getFoodsByCategory(category: string): string[] {
  return Object.entries(foods)
    .filter(([_, food]) => food.category === category)
    .map(([name, _]) => name);
}

export function getAllCategories(): string[] {
  return Object.keys(categories);
}