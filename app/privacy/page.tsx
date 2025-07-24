import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nutrition Label Finder',
  description: 'Privacy policy for the Nutrition Label Finder tool by Opus Caviar.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to search
          </Link>
        </p>
      </header>

      <main className="prose prose-gray max-w-none">
        <p>Last updated: July 24, 2025</p>

        <h2>Information We Collect</h2>
        <p>
          Nutrition Label Finder is designed with your privacy in mind. We do not collect any personal 
          information from users of our tool. The tool operates entirely in your browser, and no search 
          queries or food selections are transmitted to our servers.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics tools to understand general usage patterns and improve 
          the tool. These analytics do not track individual users or collect personal information.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this privacy policy, please visit{' '}
          <a href="https://opuscaviar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            opuscaviar.com
          </a>.
        </p>
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>&copy; 2025 Opus Caviar. All rights reserved.</p>
      </footer>
    </div>
  );
}