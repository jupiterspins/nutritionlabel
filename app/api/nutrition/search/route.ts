import { NextRequest, NextResponse } from 'next/server';
import { searchUSDAFoods, getUSDAFoodDetails } from '@/lib/nutrition-api';
import { getFoodByName } from '@/lib/foods';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const detailed = searchParams.get('detailed') === 'true';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  // First check our local database
  const localFood = getFoodByName(query);
  if (localFood) {
    return NextResponse.json({ 
      source: 'local',
      food: localFood,
      name: query 
    });
  }

  // If not found locally and we have USDA API key, search external API
  const usdaApiKey = process.env.USDA_API_KEY;
  
  if (!usdaApiKey) {
    return NextResponse.json({ 
      error: 'No API key configured. Using local database only.' 
    }, { status: 404 });
  }

  try {
    if (detailed) {
      // Get detailed nutrition info
      const foodDetails = await getUSDAFoodDetails(query, usdaApiKey);
      if (foodDetails) {
        return NextResponse.json({
          source: 'usda',
          food: foodDetails,
          name: query
        });
      }
    } else {
      // Just search for food names
      const results = await searchUSDAFoods(query, usdaApiKey);
      return NextResponse.json({
        source: 'usda',
        results
      });
    }

    return NextResponse.json({ 
      error: 'Food not found' 
    }, { status: 404 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch nutrition data' 
    }, { status: 500 });
  }
}