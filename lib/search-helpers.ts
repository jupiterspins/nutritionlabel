// Common variations and modifiers for generic food searches
export const foodVariations: Record<string, string[]> = {
  burger: [
    'McDonald\'s Big Mac',
    'Burger King Whopper', 
    'In-N-Out Burger',
    'Five Guys Hamburger',
    'Wendy\'s Dave\'s Single',
    'Homemade Beef Burger',
    'Turkey Burger',
    'Veggie Burger',
    'Cheeseburger'
  ],
  steak: [
    'Ribeye Steak',
    'Sirloin Steak',
    'Filet Mignon',
    'T-Bone Steak',
    'New York Strip Steak',
    'Grilled Steak',
    'Pan-Seared Steak'
  ],
  pizza: [
    'Pepperoni Pizza',
    'Cheese Pizza',
    'Margherita Pizza',
    'Pizza Hut Pepperoni Pizza',
    'Domino\'s Pizza',
    'DiGiorno Pizza',
    'Homemade Pizza'
  ],
  pasta: [
    'Spaghetti with Marinara',
    'Fettuccine Alfredo',
    'Lasagna',
    'Penne Arrabbiata',
    'Mac and Cheese',
    'Ravioli',
    'Carbonara'
  ],
  ravioli: [
    'Cheese Ravioli',
    'Beef Ravioli',
    'Spinach Ravioli',
    'Chef Boyardee Ravioli',
    'Homemade Ravioli'
  ],
  chicken: [
    'Grilled Chicken Breast',
    'Fried Chicken',
    'Chicken Nuggets',
    'Rotisserie Chicken',
    'Chicken Sandwich',
    'Chicken Wings',
    'Chicken Tenders'
  ],
  sandwich: [
    'Turkey Sandwich',
    'Ham Sandwich',
    'BLT Sandwich',
    'Grilled Cheese',
    'Club Sandwich',
    'Subway Italian BMT',
    'Peanut Butter & Jelly'
  ],
  salad: [
    'Caesar Salad',
    'Greek Salad',
    'Garden Salad',
    'Cobb Salad',
    'Chicken Salad',
    'Tuna Salad',
    'Potato Salad'
  ]
};

export function getSearchSuggestions(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  
  // Check if query matches any key in variations
  for (const [key, variations] of Object.entries(foodVariations)) {
    if (lowerQuery.includes(key)) {
      return variations;
    }
  }
  
  return [];
}