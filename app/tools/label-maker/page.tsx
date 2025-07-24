'use client';

import { useState } from 'react';
import Link from 'next/link';
import NutritionLabel from '@/components/NutritionLabel';
import { FoodItem } from '@/types/food';

export default function LabelMakerPage() {
  const [customFood, setCustomFood] = useState<FoodItem>({
    servingSizeG: 100,
    calories: 0,
    fat: 0,
    carbs: 0,
    sugar: 0,
    protein: 0,
    fiber: 0,
    sodium: 0,
  });
  const [foodName, setFoodName] = useState('Custom Food');
  const [showLabel, setShowLabel] = useState(false);

  const handleInputChange = (field: keyof FoodItem, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCustomFood({ ...customFood, [field]: numValue });
  };

  const nutrients = [
    { key: 'servingSizeG', label: 'Serving Size', unit: 'g', required: true },
    { key: 'calories', label: 'Calories', unit: '', required: true },
    { key: 'fat', label: 'Total Fat', unit: 'g', required: true },
    { key: 'carbs', label: 'Total Carbohydrate', unit: 'g', required: true },
    { key: 'sugar', label: 'Total Sugars', unit: 'g', required: true },
    { key: 'protein', label: 'Protein', unit: 'g', required: true },
    { key: 'fiber', label: 'Dietary Fiber', unit: 'g', required: false },
    { key: 'sodium', label: 'Sodium', unit: 'mg', required: true },
    { key: 'potassium', label: 'Potassium', unit: 'mg', required: false },
    { key: 'calcium', label: 'Calcium', unit: '% DV', required: false },
    { key: 'iron', label: 'Iron', unit: '% DV', required: false },
    { key: 'vitA', label: 'Vitamin A', unit: '% DV', required: false },
    { key: 'vitC', label: 'Vitamin C', unit: '% DV', required: false },
    { key: 'vitD', label: 'Vitamin D', unit: '% DV', required: false },
  ];

  const generateLabel = () => {
    if (customFood.servingSizeG > 0 && customFood.calories >= 0) {
      setShowLabel(true);
      // Smooth scroll to label
      setTimeout(() => {
        const element = document.getElementById('generated-label');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const exportLabel = () => {
    const labelElement = document.getElementById('nutrition-label-export');
    if (labelElement) {
      // Create a temporary canvas to export as image
      import('html2canvas').then(({ default: html2canvas }) => {
        html2canvas(labelElement).then(canvas => {
          const link = document.createElement('a');
          link.download = `${foodName.replace(/\s+/g, '-').toLowerCase()}-nutrition-label.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Nutrition Label Maker
        </h1>
        <p className="text-lg text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to search
          </Link>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Create custom nutrition labels for your recipes and products
        </p>
      </header>

      <main>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Enter Nutrition Information</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Homemade Granola"
              />
            </div>

            <div className="space-y-3">
              {nutrients.map(({ key, label, unit, required }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {unit && `(${unit})`} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customFood[key as keyof FoodItem] || ''}
                    onChange={(e) => handleInputChange(key as keyof FoodItem, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={generateLabel}
              className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Generate Nutrition Label
            </button>
          </section>

          {/* Preview Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            
            {!showLabel ? (
              <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                <div className="text-6xl mb-4">📋</div>
                <p>Fill in the nutrition information and click "Generate" to see your label</p>
              </div>
            ) : (
              <div id="generated-label">
                <div id="nutrition-label-export" className="bg-white p-4 rounded-lg">
                  <NutritionLabel
                    foodName={foodName}
                    foodData={customFood}
                  />
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={exportLabel}
                    className="flex-1 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    📥 Export as Image
                  </button>
                  <button
                    onClick={() => {
                      const data = JSON.stringify({ name: foodName, ...customFood }, null, 2);
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.download = `${foodName.replace(/\s+/g, '-').toLowerCase()}-nutrition.json`;
                      link.href = url;
                      link.click();
                    }}
                    className="flex-1 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    💾 Save as JSON
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Instructions */}
        <section className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Enter your product or recipe name</li>
            <li>Fill in the nutrition information per serving</li>
            <li>Click "Generate Nutrition Label" to preview</li>
            <li>Export as an image for printing or save as JSON for later</li>
          </ol>
          <p className="mt-3 text-sm text-blue-700">
            <strong>Tip:</strong> For accurate labels, use a food scale and nutrition data from ingredient packages.
          </p>
        </section>
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; 2025 Opus Caviar. All rights reserved.</p>
      </footer>
    </div>
  );
}