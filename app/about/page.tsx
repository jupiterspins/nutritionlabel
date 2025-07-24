import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Nutrition Label Finder',
  description: 'Learn about the Nutrition Label Finder tool by Opus Caviar.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Nutrition Label Finder</h1>
        <p className="text-lg text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to search
          </Link>
        </p>
      </header>

      <main className="prose prose-gray max-w-none">
        <p>
          Nutrition Label Finder is a free tool designed to help you quickly find accurate nutrition information 
          for thousands of foods. Whether you're tracking calories, managing your macros, or just curious about 
          what you're eating, we make it easy to get the facts you need.
        </p>

        <h2>Features</h2>
        <ul>
          <li>Instant search with autocomplete</li>
          <li>Dynamic serving size calculator</li>
          <li>Complete nutrition facts including vitamins and minerals</li>
          <li>Mobile-friendly design</li>
          <li>Fast loading times</li>
        </ul>

        <h2>Powered by Opus Caviar</h2>
        <p>
          This tool is proudly created and maintained by{' '}
          <a href="https://opuscaviar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Opus Caviar
          </a>, 
          committed to providing high-quality, user-friendly tools for everyone.
        </p>
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; 2025 Opus Caviar. All rights reserved.</p>
      </footer>
    </div>
  );
}