'use client';

export default function OfflinePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📵</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">You're Offline</h1>
        <p className="text-lg text-gray-600 mb-8">
          It looks like you've lost your internet connection. Some features may not be available.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6 text-left max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">What you can still do:</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>View previously cached nutrition labels</li>
            <li>Use the serving size calculator</li>
            <li>Access your favorites (if previously loaded)</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}