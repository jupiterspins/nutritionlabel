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
    {
      url: `${baseUrl}/tools/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/label-maker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...foodUrls,
  ];
}