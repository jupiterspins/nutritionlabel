'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import { getFoodByName } from '@/lib/foods';
import { FoodItem } from '@/types/food';

interface ComparisonItem {
  name: string;
  data: FoodItem;
}

export default function ComparePage() {
  const [items, setItems] = useState<ComparisonItem[]>([]);
  const [searchingFor, setSearchingFor] = useState<number | null>(null);

  const addItem = (foodName: string) => {
    const foodData = getFoodByName(foodName);
    if (foodData && items.length < 4) {
      setItems([...items, { name: foodName, data: foodData }]);
      setSearchingFor(null);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getNutrientValue = (item: ComparisonItem, nutrient: keyof FoodItem): number => {
    const value = item.data[nutrient];
    return typeof value === 'number' ? value : 0;
  };

  const getMaxValue = (nutrient: keyof FoodItem): number => {
    return Math.max(...items.map(item => getNutrientValue(item, nutrient)));
  };

  const nutrients: Array<{ key: keyof FoodItem; label: string; unit: string; isDV?: boolean }> = [
    { key: 'calories', label: 'Calories', unit: '' },
    { key: 'fat', label: 'Total Fat', unit: 'g' },
    { key: 'carbs', label: 'Total Carbs', unit: 'g' },
    { key: 'sugar', label: 'Sugar', unit: 'g' },
    { key: 'protein', label: 'Protein', unit: 'g' },
    { key: 'fiber', label: 'Fiber', unit: 'g' },
    { key: 'sodium', label: 'Sodium', unit: 'mg' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Food Comparison Tool
        </h1>
        <p className="text-lg text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to search
          </Link>
        </p>
      </header>

      <main>
        {/* Add Items Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Foods to Compare (up to 4)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map(index => {
              const item = items[index];
              if (item) {
                return (
                  <div key={index} className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">
                      Serving: {item.data.servingSizeG}g
                    </p>
                  </div>
                );
              } else if (searchingFor === index) {
                return (
                  <div key={index} className="bg-white border-2 border-blue-500 rounded-lg p-4">
                    <SearchAutocomplete
                      onSelect={(foodName) => {
                        addItem(foodName);
                      }}
                      useFuzzySearch={true}
                    />
                    <button
                      onClick={() => setSearchingFor(null)}
                      className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                );
              } else {
                return (
                  <button
                    key={index}
                    onClick={() => setSearchingFor(index)}
                    disabled={items.length >= 4}
                    className="bg-gray-100 rounded-lg p-8 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-4xl text-gray-400 mb-2">+</div>
                    <div className="text-sm text-gray-600">Add Food</div>
                  </button>
                );
              }
            })}
          </div>
        </section>

        {/* Comparison Table */}
        {items.length > 1 && (
          <section className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Nutrition Comparison</h2>
            <table className="w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Nutrient
                  </th>
                  {items.map((item, index) => (
                    <th key={index} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {item.name}
                      <div className="text-xs font-normal text-gray-500">
                        per {item.data.servingSizeG}g
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nutrients.map((nutrient, index) => {
                  const maxValue = getMaxValue(nutrient.key);
                  return (
                    <tr key={nutrient.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        {nutrient.label}
                      </td>
                      {items.map((item, itemIndex) => {
                        const value = getNutrientValue(item, nutrient.key);
                        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const isMax = value === maxValue && maxValue > 0;
                        
                        return (
                          <td key={itemIndex} className="px-4 py-3 text-center">
                            <div className="relative">
                              <div 
                                className={`text-sm font-semibold ${
                                  isMax ? 'text-blue-600' : 'text-gray-700'
                                }`}
                              >
                                {value}{nutrient.unit}
                              </div>
                              <div className="mt-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-full transition-all ${
                                    isMax ? 'bg-blue-500' : 'bg-gray-400'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Add foods above to start comparing their nutrition facts</p>
          </div>
        )}

        {items.length === 1 && (
          <div className="text-center py-12 text-gray-500">
            <p>Add at least one more food to compare</p>
          </div>
        )}
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; 2025 Opus Caviar. All rights reserved.</p>
      </footer>
    </div>
  );
}