'use client';

import { useState } from 'react';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import NutritionLabel from '@/components/NutritionLabel';
import { getFoodByName, getCommonSearches } from '@/lib/foods';
import Link from 'next/link';

export default function HomePage() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const commonSearches = getCommonSearches();

  const handleFoodSelect = (foodName: string) => {
    setSelectedFood(foodName);
    // Smooth scroll to nutrition label
    setTimeout(() => {
      const element = document.getElementById('nutrition-label-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCommonSearchClick = (foodName: string) => {
    setSelectedFood(foodName);
    // Smooth scroll to nutrition label
    setTimeout(() => {
      const element = document.getElementById('nutrition-label-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const foodData = selectedFood ? getFoodByName(selectedFood) : null;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Nutrition Label Finder</h1>
        <p className="text-lg text-gray-600 mt-2">
          Powered by{' '}
          <a
            href="https://opuscaviar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Opus Caviar
          </a>
        </p>
      </header>

      {/* Search Section */}
      <main>
        <div id="search-container">
          <SearchAutocomplete
            initialValue={selectedFood || ''}
            onSelect={handleFoodSelect}
          />
        </div>

        {/* Common Searches Section */}
        <section id="common-searches" className="mt-8">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Common Searches</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {commonSearches.map(foodName => (
              <button
                key={foodName}
                onClick={() => handleCommonSearchClick(foodName)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
              >
                {foodName}
              </button>
            ))}
          </div>
        </section>

        {/* Nutrition Label Display Section */}
        <div id="nutrition-label-container" className="mt-8">
          {selectedFood && foodData && (
            <NutritionLabel
              foodName={selectedFood}
              foodData={foodData}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; 2025 Opus Caviar. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/about" className="hover:underline mx-2">
            About this Tool
          </Link>
          <a
            href="https://opuscaviar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline mx-2"
          >
            Visit Opus Caviar
          </a>
          <Link href="/privacy" className="hover:underline mx-2">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}