const fs = require('fs');
const path = require('path');

// Read existing food data
const existingData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/foods.json'), 'utf8')
);

// Read expanded food data
const expandedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/expanded-foods.json'), 'utf8')
);

// Merge the data
const mergedData = {
  ...existingData,
  ...expandedData.foods
};

// Add categories to existing items
Object.keys(existingData).forEach(foodName => {
  if (!mergedData[foodName].category) {
    // Determine category for existing items
    if (['Apple', 'Banana', 'Avocado', 'Potato'].includes(foodName)) {
      mergedData[foodName].category = 'fruits';
    } else if (['Chicken Breast (cooked)', 'Egg', 'Fage 0% Greek Yogurt', 'Fairlife Protein Shake (Chocolate)', 'Premier Protein Shake (Vanilla)'].includes(foodName)) {
      mergedData[foodName].category = 'proteins';
    } else if (['Oreo Cookies (3 cookies)', 'Honey Nut Cheerios', 'Clif Bar (Chocolate Chip)', 'AG1'].includes(foodName)) {
      mergedData[foodName].category = 'snacks';
    } else if (['Twisted Tea', 'Michelob Ultra'].includes(foodName)) {
      mergedData[foodName].category = 'beverages';
    }
  }
});

// Fix Avocado and Potato categories
if (mergedData['Avocado']) mergedData['Avocado'].category = 'fruits';
if (mergedData['Potato']) mergedData['Potato'].category = 'vegetables';

// Write the merged data
fs.writeFileSync(
  path.join(__dirname, '../data/foods.json'),
  JSON.stringify(mergedData, null, 2)
);

// Also create a categories mapping file
const categories = expandedData.categories;
fs.writeFileSync(
  path.join(__dirname, '../data/categories.json'),
  JSON.stringify(categories, null, 2)
);

console.log('✓ Merged food database successfully');
console.log(`✓ Total foods: ${Object.keys(mergedData).length}`);
console.log('✓ Created categories.json');