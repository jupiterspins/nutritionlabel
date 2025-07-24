# Nutrition Label Finder

A fast, SEO-optimized web application for finding nutrition facts and creating nutrition labels. Built with Next.js, TypeScript, and Tailwind CSS.

🔗 **Live Demo**: [nutritionlabel.opuscaviar.com](https://nutritionlabel.opuscaviar.com)

## Features

### Core Features
- 🔍 **Smart Search**: Fuzzy search with autocomplete for 70+ foods
- 🏷️ **Dynamic Labels**: Interactive nutrition labels with serving size calculator
- 📊 **Food Comparison**: Compare up to 4 foods side-by-side
- 🛠️ **Label Maker**: Create custom nutrition labels for recipes
- 📱 **PWA Support**: Works offline with cached data

### V1.1 Features
- 🌐 **API Integration**: USDA FoodData Central API support
- 🔤 **Fuzzy Search**: Find foods even with typos
- 🗂️ **Category Filters**: Browse by food categories
- ⏱️ **Recently Viewed**: Quick access to recent searches
- ⭐ **Favorites**: Save your frequently used foods

### Technical Features
- ⚡ **Performance**: Optimized for 95+ PageSpeed score
- 🔍 **SEO**: Server-side rendering with dynamic meta tags
- 📱 **Responsive**: Mobile-first design
- 🌐 **PWA**: Installable with offline support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Search**: Fuse.js for fuzzy search
- **Deployment**: Vercel
- **APIs**: USDA FoodData Central (optional)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutritionlabel.git
cd nutritionlabel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

To use external nutrition APIs, add these to `.env.local`:

```env
# USDA FoodData Central API
USDA_API_KEY=your_api_key_here

# Edamam API (Alternative)
EDAMAM_APP_ID=your_app_id_here
EDAMAM_APP_KEY=your_app_key_here
```

## Project Structure

```
nutritionlabel/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── food/[slug]/       # Dynamic food pages
│   └── tools/             # Tool pages (compare, label-maker)
├── components/            # React components
├── data/                  # Static food database
├── lib/                   # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nutritionlabel)

## SEO Features

- Individual pages for each food item
- Structured data (Schema.org)
- Dynamic sitemap generation
- Meta tags optimization
- Clean URLs (`/food/apple`)

## Performance Optimizations

- Next.js Image optimization
- Font optimization with next/font
- Lazy loading components
- Static generation for food pages
- Minimal JavaScript bundle

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Built with ❤️ by [Opus Caviar](https://opuscaviar.com)

---

**Note**: This is a demonstration project. For production use, ensure you have proper API keys and replace placeholder icons with actual assets.