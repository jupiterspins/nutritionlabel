'use client';

import { useState } from 'react';

export default function TestAPIPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/nutrition/search?q=${encodeURIComponent(query)}&detailed=true`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({ error: 'Failed to fetch' });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">USDA API Test</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a food (e.g., pizza, burger, salad)"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={testSearch}
          disabled={!query || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {results && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Results:</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Try searching for:</p>
        <ul className="list-disc list-inside">
          <li>McDonald's Big Mac</li>
          <li>Starbucks Latte</li>
          <li>Pizza Hut Pepperoni Pizza</li>
          <li>Subway Italian BMT</li>
        </ul>
      </div>
    </div>
  );
}