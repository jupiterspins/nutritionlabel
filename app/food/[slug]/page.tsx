import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NutritionLabel from '@/components/NutritionLabel';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import Link from 'next/link';
import { getFoodNameFromSlug, getFoodByName, getAllFoodNames, getFoodSlug } from '@/lib/foods';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const foodNames = getAllFoodNames();
  return foodNames.map((foodName) => ({
    slug: getFoodSlug(foodName),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const foodName = getFoodNameFromSlug(slug);
  
  if (!foodName) {
    return {
      title: 'Food Not Found | Nutrition Label Finder',
    };
  }

  const foodData = getFoodByName(foodName);
  
  return {
    title: `${foodName} Nutrition Facts & Calories | Nutrition Label Finder`,
    description: `View nutrition facts for ${foodName}: ${foodData?.calories} calories, ${foodData?.protein}g protein, ${foodData?.carbs}g carbs, ${foodData?.fat}g fat per serving.`,
    keywords: `${foodName} nutrition, ${foodName} calories, ${foodName} nutrition facts, ${foodName} nutrition label`,
    openGraph: {
      title: `${foodName} Nutrition Facts & Calories`,
      description: `View complete nutrition information for ${foodName}`,
      type: 'website',
      url: `https://nutritionlabel.opuscaviar.com/food/${slug}`,
    },
  };
}

export default async function FoodPage({ params }: PageProps) {
  const { slug } = await params;
  const foodName = getFoodNameFromSlug(slug);
  
  if (!foodName) {
    notFound();
  }

  const foodData = getFoodByName(foodName);
  
  if (!foodData) {
    notFound();
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'NutritionInformation',
    'name': foodName,
    'servingSize': `${foodData.servingSizeG}g`,
    'calories': foodData.calories,
    'fatContent': `${foodData.fat}g`,
    'saturatedFatContent': '0g',
    'carbohydrateContent': `${foodData.carbs}g`,
    'sugarContent': `${foodData.sugar}g`,
    'fiberContent': foodData.fiber ? `${foodData.fiber}g` : undefined,
    'proteinContent': `${foodData.protein}g`,
    'sodiumContent': `${foodData.sodium}mg`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {foodName} Nutrition Facts
          </h1>
          <p className="text-lg text-gray-600">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to search
            </Link>
          </p>
        </header>

        {/* Search Section */}
        <div className="mb-8">
          <SearchAutocomplete initialValue={foodName} />
        </div>

        {/* Nutrition Label */}
        <NutritionLabel foodName={foodName} foodData={foodData} />

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p className="mb-2">
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
    </>
  );
}