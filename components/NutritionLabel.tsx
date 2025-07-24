'use client';

import { useState, useEffect } from 'react';
import { FoodItem } from '@/types/food';

interface NutritionLabelProps {
  foodName: string;
  foodData: FoodItem;
  initialServingSize?: number;
}

export default function NutritionLabel({ foodName, foodData, initialServingSize }: NutritionLabelProps) {
  const originalServingSize = foodData.servingSizeG;
  const [servingSize, setServingSize] = useState(initialServingSize || originalServingSize);
  const multiplier = servingSize / originalServingSize;

  const m = (val: number | undefined) => 
    val !== undefined ? (val * multiplier).toFixed(1).replace(/\.0$/, '') : '-';
  
  const p = (val: number | undefined) => 
    val !== undefined ? Math.round(val * multiplier) : '-';

  return (
    <div className="card-modern p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{foodName}</h2>
      <div className="nutrition-label fade-in">
        <h1>Nutrition Facts</h1>
      <div className="line"></div>
      <div className="serving-info">
        Serving Size{' '}
        <input
          type="number"
          value={servingSize}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && value > 0) {
              setServingSize(value);
            }
          }}
          className="w-20 p-1 border border-gray-400 rounded text-right"
        />{' '}
        g
      </div>
      <div className="thick-line"></div>
      <div className="amount-per-serving">
        <b>Amount per serving</b>
      </div>
      <div className="amount-per-serving calories-info">
        <b>Calories</b>
        <b>{p(foodData.calories)}</b>
      </div>
      <div className="thin-line"></div>
      <div className="amount-per-serving">
        <b>% Daily Value*</b>
      </div>
      <div className="line"></div>
      <div className="nutrient">
        <span><b>Total Fat</b> {m(foodData.fat)}g</span>
        <span className="daily-value">{p(foodData.fat / 65 * 100)}%</span>
      </div>
      <div className="line"></div>
      <div className="nutrient">
        <span><b>Sodium</b> {m(foodData.sodium)}mg</span>
        <span className="daily-value">{p(foodData.sodium / 2400 * 100)}%</span>
      </div>
      <div className="line"></div>
      <div className="nutrient">
        <span><b>Total Carbohydrate</b> {m(foodData.carbs)}g</span>
        <span className="daily-value">{p(foodData.carbs / 300 * 100)}%</span>
      </div>
      {foodData.fiber !== undefined && (
        <div className="nutrient indented">
          <span>Dietary Fiber {m(foodData.fiber)}g</span>
          <span className="daily-value">{p(foodData.fiber / 25 * 100)}%</span>
        </div>
      )}
      <div className="line"></div>
      <div className="nutrient indented">
        <span>Total Sugars {m(foodData.sugar)}g</span>
        <span></span>
      </div>
      <div className="line"></div>
      <div className="nutrient">
        <span><b>Protein</b> {m(foodData.protein)}g</span>
        <span className="daily-value">{p(foodData.protein / 50 * 100)}%</span>
      </div>
      <div className="thick-line"></div>
      
      {foodData.vitD !== undefined && (
        <>
          <div className="nutrient">
            <span>Vitamin D</span>
            <span className="daily-value">{p(foodData.vitD)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.calcium !== undefined && (
        <>
          <div className="nutrient">
            <span>Calcium</span>
            <span className="daily-value">{p(foodData.calcium)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.iron !== undefined && (
        <>
          <div className="nutrient">
            <span>Iron</span>
            <span className="daily-value">{p(foodData.iron)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.potassium !== undefined && (
        <>
          <div className="nutrient">
            <span>Potassium {m(foodData.potassium)}mg</span>
            <span className="daily-value">{p(foodData.potassium / 4700 * 100)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.vitA !== undefined && (
        <>
          <div className="nutrient">
            <span>Vitamin A</span>
            <span className="daily-value">{p(foodData.vitA)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.vitC !== undefined && (
        <>
          <div className="nutrient">
            <span>Vitamin C</span>
            <span className="daily-value">{p(foodData.vitC)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      {foodData.vitB6 !== undefined && (
        <>
          <div className="nutrient">
            <span>Vitamin B6</span>
            <span className="daily-value">{p(foodData.vitB6)}%</span>
          </div>
          <div className="line"></div>
        </>
      )}
      
      <div className="footnote">
        *The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
      </div>
      </div>
    </div>
  );
}