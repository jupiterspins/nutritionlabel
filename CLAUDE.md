# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nutrition Label Finder is a Next.js 15 application that provides nutrition information for foods. It uses a hybrid approach with static JSON data for common foods and optional USDA API integration for extended coverage.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture & Key Patterns

### Data Architecture
The app uses a hybrid data strategy:
1. **Primary**: Static JSON database at `/data/foods.json` (~72 foods)
2. **Fallback**: USDA FoodData Central API via `/app/api/nutrition/search`

Data flow: `User Input → SearchAutocomplete → Fuse.js → foods.json → (if not found) → API Route → USDA API`

### Component Architecture
- **Server Components by default** - Only use 'use client' when needed for interactivity
- **File-based routing** with Next.js App Router
- **Dynamic routes**: `/food/[slug]` for SEO-optimized individual food pages

### State Management
- Component state with React hooks
- Persistence via localStorage (favorites, recently viewed)
- No global state library - keep it simple

### API Integration Pattern
When working with external APIs:
1. Check `/lib/foods.ts` first for local data
2. Use `/lib/nutrition-api.ts` for USDA API calls
3. Transform external data to `FoodItem` interface
4. Handle errors gracefully with fallbacks

## Critical Files & Their Roles

- `/app/EnhancedHomePage.tsx` - Main homepage with all features integrated
- `/lib/foods.ts` - Core data access layer (repository pattern)
- `/lib/nutrition-api.ts` - External API adapter
- `/data/foods.json` - Static food database
- `/types/food.ts` - TypeScript interfaces (FoodItem, FoodCategory)
- `/app/api/nutrition/search/route.ts` - API proxy route

## Environment Variables

Required for external API usage (optional):
```
USDA_API_KEY=your_key_here
```

Note: Edamam API is disabled per user request - use USDA only.

## SEO & Performance Considerations

- All food pages are statically generated at build time
- Use `generateStaticParams` in dynamic routes
- Include structured data (Schema.org) for food items
- Maintain fast PageSpeed scores (target: 95+)
- Sitemap is auto-generated via `/app/sitemap.ts`

## PWA Features

- Service worker at `/public/sw.js` handles offline caching
- Update manifest at `/public/site.webmanifest` for app metadata
- Icons are generated dynamically via `/app/icon.tsx` and variants

## Recent User Preferences

Based on recent work:
- Remove confusing text about USDA database connections
- Handle generic food searches (burger, steak) with smart suggestions
- Prefer modern, clean design with gradients and animations
- Always run lint/typecheck before committing if available

## Deployment

The app auto-deploys to Vercel on push to main branch. Live at: https://nutritionlabel.opuscaviar.com