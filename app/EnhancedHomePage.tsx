'use client';

import { useState, useEffect, useRef } from 'react';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import NutritionLabel from '@/components/NutritionLabel';
import CategoryFilter from '@/components/CategoryFilter';
import SearchSuggestions from '@/components/SearchSuggestions';
import { getFoodByName, getCommonSearches, getFoodsByCategory } from '@/lib/foods';
import { FoodCategory } from '@/types/food';
import Link from 'next/link';
import StarIcon from '@/components/icons/StarIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import CompareIcon from '@/components/icons/CompareIcon';
import LabelIcon from '@/components/icons/LabelIcon';

export default function EnhancedHomePage() {
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for floating search
  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        setIsScrolled(rect.top < -100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      {/* Floating Search Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm floating-search transition-all duration-300 ${
        isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="container mx-auto p-4 max-w-4xl">
          <SearchAutocomplete
            initialValue={selectedFood || ''}
            onSelect={handleFoodSelect}
            onQueryChange={setSearchQuery}
            useFuzzySearch={true}
            filterCategory={selectedCategory}
          />
        </div>
      </div>
      
      {/* Header */}
      <header className="text-center mb-12 slide-in-left">
        <h1 className="text-5xl md:text-6xl font-display gradient-text mb-4 text-balance">Nutrition Label Finder</h1>
        <p className="text-lg text-muted mt-2 font-body">
          Powered by{' '}
          <a
            href="https://opuscaviar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-blue-700 transition-colors font-semibold"
          >
            Opus Caviar
          </a>
        </p>
      </header>

      {/* Search Section */}
      <main>
        <div ref={searchRef} id="search-container" className="mb-10 card-modern p-6 shadow-xl scale-in">
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
          <section className="mb-8 glass rounded-xl p-6 slide-in-left">
            <h2 className="text-xl font-headline text-gray-800 mb-4 flex items-center gap-2">
              <ClockIcon className="w-6 h-6 text-gray-600" />
              Recently Viewed
            </h2>
            <div className="flex flex-wrap gap-3">
              {recentlyViewed.map(foodName => (
                <button
                  key={foodName}
                  onClick={() => handleFoodSelect(foodName)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {foodName}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-8 glass rounded-xl p-6 slide-in-right">
            <h2 className="text-xl font-headline text-gray-800 mb-4 flex items-center gap-2">
              <StarIcon filled className="w-6 h-6 text-yellow-500" />
              Favorites
            </h2>
            <div className="flex flex-wrap gap-3">
              {favorites.map(foodName => (
                <button
                  key={foodName}
                  onClick={() => handleFoodSelect(foodName)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {foodName}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Common Searches Section */}
        <section id="common-searches" className="mb-10 card-modern p-6 fade-in">
          <h2 className="text-xl font-headline text-gray-800 mb-4">
            {selectedCategory === 'all' ? 'Popular Foods' : `Popular ${selectedCategory}`}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 stagger-in">
            {getDisplayedFoods().map(foodName => (
              <button
                key={foodName}
                onClick={() => handleFoodSelect(foodName)}
                className="px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm hover:border-blue-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                {foodName}
              </button>
            ))}
          </div>
        </section>

        {/* Nutrition Label Display Section */}
        <div id="nutrition-label-container">
          {selectedFood && foodData && (
            <div className="relative slide-in-right">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleFavorite(selectedFood)}
                  className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                    favorites.includes(selectedFood)
                      ? 'bg-yellow-400 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={favorites.includes(selectedFood) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <StarIcon filled={favorites.includes(selectedFood)} className="w-5 h-5" />
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
        <section className="mt-16 fade-in">
          <h2 className="text-3xl font-display gradient-text mb-8 text-center text-balance">Nutrition Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/tools/compare"
              className="p-8 card-modern bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-3">
                <CompareIcon className="w-8 h-8 text-blue-600 float-animation" />
                Compare Foods
              </h3>
              <p className="text-blue-700">Compare nutrition facts of multiple foods side-by-side</p>
            </Link>
            <Link 
              href="/tools/label-maker"
              className="p-8 card-modern bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-green-900 mb-3 flex items-center gap-3">
                <LabelIcon className="w-8 h-8 text-green-600 float-animation" style={{animationDelay: '0.5s'}} />
                Label Maker
              </h3>
              <p className="text-green-700">Create custom nutrition labels for your recipes</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 pt-8 border-t border-gray-200">
        <p className="text-sm text-muted font-body">&copy; 2025 Opus Caviar. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/about" className="text-muted hover:text-accent transition-colors font-medium">
            About
          </Link>
          <a
            href="https://opuscaviar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors font-medium"
          >
            Opus Caviar
          </a>
          <Link href="/privacy" className="text-muted hover:text-accent transition-colors font-medium">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}