'use client';

import { FoodCategory } from '@/types/food';

interface CategoryFilterProps {
  selectedCategory: FoodCategory | 'all';
  onCategoryChange: (category: FoodCategory | 'all') => void;
}

const categoryLabels: Record<FoodCategory | 'all', string> = {
  all: 'All Foods',
  fruits: '🍎 Fruits',
  vegetables: '🥦 Vegetables',
  proteins: '🍗 Proteins',
  grains: '🌾 Grains',
  dairy: '🥛 Dairy',
  snacks: '🍪 Snacks',
  beverages: '☕ Beverages',
};

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = Object.keys(categoryLabels) as Array<FoodCategory | 'all'>;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  );
}