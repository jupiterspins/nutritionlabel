'use client';

import { useState, useEffect } from 'react';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import NutritionLabel from '@/components/NutritionLabel';
import CategoryFilter from '@/components/CategoryFilter';
import SearchSuggestions from '@/components/SearchSuggestions';
import { getFoodByName, getCommonSearches, getFoodsByCategory } from '@/lib/foods';
import { FoodCategory } from '@/types/food';
import Link from 'next/link';

export default function EnhancedHomePage() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Load recently viewed and favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
    
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleFoodSelect = (foodName: string) => {
    setSelectedFood(foodName);
    
    // Update recently viewed
    const newRecentlyViewed = [foodName, ...recentlyViewed.filter(f => f !== foodName)].slice(0, 5);
    setRecentlyViewed(newRecentlyViewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
    
    // Smooth scroll to nutrition label
    setTimeout(() => {
      const element = document.getElementById('nutrition-label-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const toggleFavorite = (foodName: string) => {
    const newFavorites = favorites.includes(foodName)
      ? favorites.filter(f => f !== foodName)
      : [...favorites, foodName];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const getDisplayedFoods = () => {
    if (selectedCategory === 'all') {
      return getCommonSearches();
    }
    return getFoodsByCategory(selectedCategory).slice(0, 8);
  };

  const foodData = selectedFood ? getFoodByName(selectedFood) : null;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
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
        <div id="search-container" className="mb-8">
          <SearchAutocomplete
            initialValue={selectedFood || ''}
            onSelect={handleFoodSelect}
            onQueryChange={setSearchQuery}
            useFuzzySearch={true}
            filterCategory={selectedCategory}
          />
          
          {/* Show suggestions for generic searches */}
          {searchQuery && !selectedFood && (
            <SearchSuggestions
              query={searchQuery}
              onSelect={handleFoodSelect}
            />
          )}
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Recently Viewed</h2>
            <div className="flex flex-wrap gap-2">
              {recentlyViewed.map(foodName => (
                <button
                  key={foodName}
                  onClick={() => handleFoodSelect(foodName)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {foodName}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">⭐ Favorites</h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map(foodName => (
                <button
                  key={foodName}
                  onClick={() => handleFoodSelect(foodName)}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
                >
                  {foodName}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Common Searches Section */}
        <section id="common-searches" className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            {selectedCategory === 'all' ? 'Popular Foods' : `Popular ${selectedCategory}`}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {getDisplayedFoods().map(foodName => (
              <button
                key={foodName}
                onClick={() => handleFoodSelect(foodName)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors text-center"
              >
                {foodName}
              </button>
            ))}
          </div>
        </section>

        {/* Nutrition Label Display Section */}
        <div id="nutrition-label-container">
          {selectedFood && foodData && (
            <div className="relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleFavorite(selectedFood)}
                  className={`p-2 rounded-full transition-colors ${
                    favorites.includes(selectedFood)
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={favorites.includes(selectedFood) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  ⭐
                </button>
              </div>
              <NutritionLabel
                foodName={selectedFood}
                foodData={foodData}
              />
            </div>
          )}
        </div>

        {/* Tools Section */}
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nutrition Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/tools/compare"
              className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-blue-900 mb-2">🔍 Compare Foods</h3>
              <p className="text-blue-700">Compare nutrition facts of multiple foods side-by-side</p>
            </Link>
            <Link 
              href="/tools/label-maker"
              className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="text-xl font-semibold text-green-900 mb-2">🏷️ Label Maker</h3>
              <p className="text-green-700">Create custom nutrition labels for your recipes</p>
            </Link>
          </div>
        </section>
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