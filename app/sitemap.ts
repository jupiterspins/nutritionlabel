import { MetadataRoute } from 'next';
import { getAllFoodNames, getFoodSlug } from '@/lib/foods';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nutritionlabel.opuscaviar.com';
  const foodNames = getAllFoodNames();
  
  const foodUrls = foodNames.map((foodName) => ({
    url: `${baseUrl}/food/${getFoodSlug(foodName)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...foodUrls,
  ];
}