'use client';

import { getSearchSuggestions } from '@/lib/search-helpers';

interface SearchSuggestionsProps {
  query: string;
  onSelect: (suggestion: string) => void;
}

export default function SearchSuggestions({ query, onSelect }: SearchSuggestionsProps) {
  const suggestions = getSearchSuggestions(query);
  
  if (suggestions.length === 0) return null;
  
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
      <p className="text-sm text-blue-900 font-semibold mb-2">
        Looking for "{query}"? Try these specific options:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="text-left px-3 py-2 text-sm bg-white rounded hover:bg-blue-100 transition-colors border border-blue-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <p className="text-xs text-blue-700 mt-3">
        💡 Tip: For accurate nutrition info, search for specific brands or preparation methods
      </p>
    </div>
  );
}