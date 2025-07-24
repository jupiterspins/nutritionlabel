require('dotenv').config({ path: '.env.local' });

async function testUSDAAPI() {
  const apiKey = process.env.USDA_API_KEY;
  console.log('Testing USDA API...');
  
  try {
    // Test search
    const searchResponse = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=pizza&pageSize=3&api_key=${apiKey}`
    );
    
    if (!searchResponse.ok) {
      throw new Error(`USDA API Error: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    console.log('✓ USDA Search works!');
    console.log(`  Found ${searchData.totalHits} results for "pizza"`);
    console.log('  First 3 results:');
    searchData.foods.slice(0, 3).forEach(food => {
      console.log(`  - ${food.description}`);
    });
    
    // Test getting details
    if (searchData.foods.length > 0) {
      const fdcId = searchData.foods[0].fdcId;
      const detailResponse = await fetch(
        `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`
      );
      
      if (detailResponse.ok) {
        console.log('✓ USDA Detail fetch works!');
      }
    }
  } catch (error) {
    console.error('✗ USDA API Error:', error.message);
  }
}

async function testEdamamAPI() {
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  console.log('\nTesting Edamam API...');
  
  try {
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?q=chicken&app_id=${appId}&app_key=${appKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Edamam API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✓ Edamam API works!');
    console.log(`  Found ${data.hints.length} results for "chicken"`);
    console.log('  First 3 results:');
    data.hints.slice(0, 3).forEach(hint => {
      console.log(`  - ${hint.food.label}`);
    });
  } catch (error) {
    console.error('✗ Edamam API Error:', error.message);
  }
}

async function testAPIRoute() {
  console.log('\nTesting local API route...');
  
  // First, let's test if the dev server is running
  try {
    const response = await fetch('http://localhost:3000/api/nutrition/search?q=pizza&detailed=true');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✓ Local API route works!');
      console.log('  Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('✗ Local API route error:', data.error);
    }
  } catch (error) {
    console.log('✗ Could not connect to local server. Make sure to run "npm run dev" first.');
  }
}

async function runTests() {
  console.log('🧪 Testing Nutrition APIs...\n');
  
  await testUSDAAPI();
  await testEdamamAPI();
  await testAPIRoute();
  
  console.log('\n✅ API tests complete!');
}

runTests();