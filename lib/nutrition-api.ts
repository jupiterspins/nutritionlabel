import { FoodItem } from '@/types/food';

// USDA FoodData Central API
const USDA_API_BASE = 'https://api.nal.usda.gov/fdc/v1';

interface USDAFood {
  fdcId: number;
  description: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
  }>;
  servingSize?: number;
  servingSizeUnit?: string;
  brandName?: string;
}

// Nutrient ID mapping for USDA API
const USDA_NUTRIENT_IDS = {
  calories: 1008,
  fat: 1004,
  carbs: 1005,
  sugar: 2000,
  protein: 1003,
  fiber: 1079,
  sodium: 1093,
  potassium: 1092,
  calcium: 1087,
  iron: 1089,
  vitaminA: 1106,
  vitaminC: 1162,
  vitaminD: 1114,
  vitaminE: 1109,
  vitaminK: 1185,
  vitaminB6: 1175,
  vitaminB12: 1178,
  zinc: 1095,
  folate: 1177,
  magnesium: 1090,
  manganese: 1101,
  selenium: 1103,
  niacin: 1167,
};

export async function searchUSDAFoods(query: string, apiKey: string): Promise<string[]> {
  try {
    const response = await fetch(
      `${USDA_API_BASE}/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${apiKey}`
    );
    
    if (!response.ok) throw new Error('USDA API request failed');
    
    const data = await response.json();
    return data.foods.map((food: any) => food.description);
  } catch (error) {
    console.error('USDA API search error:', error);
    return [];
  }
}

export async function getUSDAFoodDetails(foodName: string, apiKey: string): Promise<FoodItem | null> {
  try {
    // First search for the food
    const searchResponse = await fetch(
      `${USDA_API_BASE}/foods/search?query=${encodeURIComponent(foodName)}&pageSize=1&api_key=${apiKey}`
    );
    
    if (!searchResponse.ok) throw new Error('USDA API search failed');
    
    const searchData = await searchResponse.json();
    if (!searchData.foods || searchData.foods.length === 0) return null;
    
    const fdcId = searchData.foods[0].fdcId;
    
    // Get detailed nutrition data
    const detailResponse = await fetch(
      `${USDA_API_BASE}/food/${fdcId}?api_key=${apiKey}`
    );
    
    if (!detailResponse.ok) throw new Error('USDA API detail request failed');
    
    const foodData: USDAFood = await detailResponse.json();
    
    // Convert USDA data to our FoodItem format
    const getNutrientValue = (nutrientId: number): number => {
      const nutrient = foodData.foodNutrients.find(n => n.nutrientId === nutrientId);
      return nutrient ? nutrient.value : 0;
    };
    
    // Default serving size is 100g
    const servingSize = foodData.servingSize || 100;
    
    const foodItem: FoodItem = {
      servingSizeG: servingSize,
      calories: Math.round(getNutrientValue(USDA_NUTRIENT_IDS.calories)),
      fat: parseFloat(getNutrientValue(USDA_NUTRIENT_IDS.fat).toFixed(1)),
      carbs: parseFloat(getNutrientValue(USDA_NUTRIENT_IDS.carbs).toFixed(1)),
      sugar: parseFloat(getNutrientValue(USDA_NUTRIENT_IDS.sugar).toFixed(1)),
      protein: parseFloat(getNutrientValue(USDA_NUTRIENT_IDS.protein).toFixed(1)),
      fiber: parseFloat(getNutrientValue(USDA_NUTRIENT_IDS.fiber).toFixed(1)),
      sodium: Math.round(getNutrientValue(USDA_NUTRIENT_IDS.sodium)),
      potassium: Math.round(getNutrientValue(USDA_NUTRIENT_IDS.potassium)),
      calcium: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.calcium) / 1000) * 100), // Convert to % DV
      iron: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.iron) / 18) * 100), // Convert to % DV
      vitA: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.vitaminA) / 900) * 100), // Convert to % DV
      vitC: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.vitaminC) / 90) * 100), // Convert to % DV
      vitD: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.vitaminD) / 20) * 100), // Convert to % DV
      vitE: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.vitaminE) / 15) * 100), // Convert to % DV
      vitK: Math.round((getNutrientValue(USDA_NUTRIENT_IDS.vitaminK) / 120) * 100), // Convert to % DV
    };
    
    // Remove zero values
    Object.keys(foodItem).forEach(key => {
      if (key !== 'servingSizeG' && foodItem[key as keyof FoodItem] === 0) {
        delete foodItem[key as keyof FoodItem];
      }
    });
    
    return foodItem;
  } catch (error) {
    console.error('USDA API error:', error);
    return null;
  }
}

// Edamam API integration disabled - using USDA API only