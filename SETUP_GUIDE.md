# Ricardo Almeida Website - Setup Guide

This document provides comprehensive instructions for setting up Ricardo Almeida's personal website from scratch. The website is built using Astro, React, and vanilla CSS, featuring a responsive design with multilingual support.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Project Structure](#project-structure)
4. [Content Management](#content-management)
5. [Multilingual Support](#multilingual-support)
6. [Components & Styling](#components--styling)
7. [Responsive Design](#responsive-design)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Maintenance](#maintenance)
11. [Performance Optimization](#performance-optimization)
12. [Blog Content Management](#blog-content-management)
13. [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following installed:

- Node.js (v16.x or higher)
- npm (v8.x or higher) or yarn
- Git

## Project Setup

1. **Create a new Astro project**:

```bash
# Using npm
npm create astro@latest ricsite

# Using yarn
yarn create astro ricsite
```

2. **Choose the "Empty" template** when prompted.

3. **Navigate to the project directory**:

```bash
cd ricsite
```

4. **Add React integration to Astro**:

```bash
npx astro add react
```

5. **Install additional dependencies**:

```bash
npm install marked # For Markdown processing
```

6. **Initialize Git repository**:

```bash
git init
git add .
git commit -m "Initial commit"
```

7. **Create branch structure for development workflow**:

```bash
git checkout -b main
git checkout -b dev
git checkout -b staging
```

## Project Structure

Set up the project with the following structure:

```
/
├── .github/
│   └── workflows/        # GitHub Actions for deployment
│       └── deploy.yml    # Deployment configuration
├── public/               # Static assets
│   ├── fonts/            # Custom fonts
│   ├── images/           # Images and photos
│   │   ├── blog/         # Blog post images
│   │   ├── HomePhotoGallery/ # Photo gallery images
│   │   └── profile.png   # Profile image
│   └── favicon.svg       # Site favicon
├── src/
│   ├── assets/           # Assets imported in code
│   ├── components/       # Reusable UI components
│   │   ├── Profile.jsx   # Profile React component
│   │   ├── SideProjects.astro # Side projects component
│   │   └── TouchTooltips.js # Touch-friendly tooltips
│   ├── content/          # Content collections
│   │   ├── config.ts     # Content collection config
│   │   ├── blog/         # Blog posts (markdown)
│   │   │   ├── en/       # English blog posts
│   │   │   └── pt/       # Portuguese blog posts
│   │   └── profile/      # Profile data
│   │       └── data.json # Profile information
│   ├── i18n/             # Internationalization
│   │   ├── ui.ts         # UI string translations
│   │   └── utils.ts      # i18n utility functions
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.astro # Main site layout
│   ├── pages/            # Page routes
│   │   ├── en/           # English pages
│   │   │   ├── index.astro # Home page (EN)
│   │   │   ├── about.astro # About page (EN)
│   │   │   └── blog/     # Blog pages (EN)
│   │   ├── pt/           # Portuguese pages
│   │   │   ├── index.astro # Home page (PT)
│   │   │   ├── about.astro # About page (PT)
│   │   │   └── blog/     # Blog pages (PT)
│   │   └── index.astro   # Root redirect
│   ├── styles/           # CSS styles
│   │   └── profile.css   # Profile component styles
│   └── middleware.js     # Middleware for handling redirects
├── .env                  # Environment variables
├── .gitignore            # Files to ignore in Git
├── astro.config.mjs      # Astro configuration
├── manual.txt            # Maintenance manual
├── package.json          # Dependencies
├── README.md             # Project documentation
├── SETUP_GUIDE.md        # This setup guide
└── tsconfig.json         # TypeScript configuration
```

## Content Management

### Setting Up Content Collections

1. **Create content collections configuration**:

Create a `src/content/config.ts` file:

```typescript
import { defineCollection, z } from 'astro:content';

const profileCollection = defineCollection({
  schema: z.object({
    personal: z.object({
      en: z.object({
        name: z.string(),
        title: z.string(),
        location: z.string(),
        connections: z.string().optional()
      }),
      pt: z.object({
        name: z.string(),
        title: z.string(),
        location: z.string(),
        connections: z.string().optional()
      }),
      profileUrl: z.string()
    }),
    about: z.object({
      en: z.array(z.string()),
      pt: z.array(z.string())
    }),
    experience: z.array(z.object({
      en: z.object({
        title: z.string(),
        company: z.string(),
        duration: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        location: z.string().optional(),
        description: z.string()
      }),
      pt: z.object({
        title: z.string(),
        company: z.string(),
        duration: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        location: z.string().optional(),
        description: z.string()
      })
    })),
    skills: z.array(z.object({
      en: z.object({
        name: z.string(),
        category: z.string(),
        level: z.string(),
        highlight: z.boolean().optional()
      }),
      pt: z.object({
        name: z.string(),
        category: z.string(),
        level: z.string(),
        highlight: z.boolean().optional()
      })
    }))
    // Additional schema elements for education, certifications, etc.
  })
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = {
  'profile': profileCollection,
  'blog': blogCollection
};
```

2. **Create profile data**:

Create `src/content/profile/data.json` with a structure that includes:

- Personal information
- About section text (supporting markdown)
- Experience entries (with startDate/endDate for automatic duration calculation)
- Education history
- Certifications
- Skills (ordered by priority)
- Languages
- UI text for both English and Portuguese
- Side projects (playlists, podcast, DJ sets)

The file should follow the multilingual pattern with English (en) and Portuguese (pt) versions of each content section.

## Multilingual Support

1. **Create i18n utilities** in `src/i18n/utils.ts`:

```typescript
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang === 'pt') return 'pt';
  return 'en'; // Default to English
}

export function useTranslations(lang: string) {
  return function t(key: string, fallback: string = '') {
    const translations = ui[lang] || ui.en;
    return translations[key] || fallback;
  }
}

export function getLocalizedUrl(url: URL, newLang: string) {
  const currentLang = getLangFromUrl(url);
  
  // If already on the requested language, return current path
  if (currentLang === newLang) return url.pathname;
  
  // Replace language segment in the path
  return url.pathname.replace(`/${currentLang}/`, `/${newLang}/`);
}
```

2. **Create language switcher** in the MainLayout component.

3. **Set up localized routes** with folders structure:
   - `src/pages/en/` - English pages
   - `src/pages/pt/` - Portuguese pages

4. **Implement a language redirect** for the root path in `src/pages/index.astro`:

```astro
---
// Redirect to preferred language or default to English
// This checks browser preferences and redirects accordingly
import { defaultLang } from '../i18n/ui';

const preferredLang = Astro.request.headers.get('accept-language')?.split(',')[0].split('-')[0];

// Check if preferred language is Portuguese (pt), otherwise default to English
let redirectPath = '/en/'; // Default
if (preferredLang === 'pt') {
  redirectPath = '/pt/';
}

// Redirect to appropriate language
return Astro.redirect(redirectPath);
---
```

5. **Add middleware** for handling language redirects and browser preferences in `src/middleware.js`.

## Components & Styling

1. **Create base layout** in `src/layouts/MainLayout.astro`:

This should include:
- HTML structure with proper meta tags for SEO
- CSS variables in a global stylesheet
- Navigation menu with language switcher
- Footer with dynamic year copyright
- Theme color (cosmic latte)
- Support for structured data (JSON-LD)
- reCAPTCHA integration

2. **Develop key components**:

- **Profile.jsx**: React component for displaying profile data with automatic timeframe calculation
- **SideProjects.astro**: Display side projects with carousel functionality for playlists/sets
- **TouchTooltips.js**: Enhanced tooltip system with touch device support

3. **Define CSS variables** in `src/styles/profile.css`:

Set up variables for:
- Colors (cosmic latte theme, gray scales)
- Typography (font families, sizes, weights)
- Spacing (paddings, margins)
- Animation timings

```css
:root {
  /* Color palette */
  --color-dark-gray: #2c2c2c;
  --color-white: #ffffff;
  --color-cosmic-latte: #fff8e7;
  --color-cosmic-latte-10: rgba(255, 248, 231, 0.1);
  --color-cosmic-latte-20: rgba(255, 248, 231, 0.2);
  --color-gray-100: rgba(255, 255, 255, 0.1);
  --color-gray-200: rgba(255, 255, 255, 0.2);
  --color-gray-300: rgba(255, 255, 255, 0.3);
  --color-gray-600: rgba(255, 255, 255, 0.6);
  
  /* Typography */
  --font-family-base: 'Roboto', sans-serif;
  --font-family-title: 'Roboto Slab', serif;
  --font-family-alt: 'Roboto Slab', serif;
  
  /* Font weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  /* Font sizes - Using clamp for responsive sizing */
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  --font-size-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
  --font-size-xl: clamp(1.5rem, 1.25rem + 1.25vw, 1.75rem);
  --font-size-2xl: clamp(2rem, 1.75rem + 1.25vw, 2.25rem);
  --font-size-3xl: clamp(2.5rem, 2rem + 2.5vw, 3rem);
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

## Responsive Design

1. **Implement a mobile-first approach** with appropriate margins for mobile devices:

```css
/* Base styles are mobile-first */

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .profile-container {
    padding: 2rem 1.5rem; /* 20px side margins */
  }
  
  .home-container {
    padding: 4rem 1.5rem;
  }
  
  /* Other mobile-specific adjustments */
}

/* Small mobile devices */
@media (max-width: 480px) {
  .profile-container {
    padding: 1.5rem 1.25rem;
  }
  
  .home-container {
    padding: 4rem 1.25rem;
  }
  
  /* Additional small screen adjustments */
}
```

2. **Create touch-friendly interactions** for mobile devices:

- Enhance tooltips with special handling for touch (using `TouchTooltips.js`)
- Ensure proper swipe behavior for carousels
- Adjust interactive element sizes for touch targets

3. **Implement carousel components** that adapt for mobile:

```javascript
// For mobile devices, transform carousel navigation
@media (max-width: 768px) {
  .carousel-container,
  .playlists-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .carousel-track,
  .playlists-track {
    min-width: 100%;
    transition: none;
  }

  .carousel-arrow,
  .carousel-arrow.playlist-prev,
  .carousel-arrow.playlist-next {
    display: none;
  }
}
```

## Deployment

1. **Set up GitHub Actions** for automated deployment:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # Only deploy changes from main branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          PUBLIC_RECAPTCHA_SITE_KEY: ${{ secrets.RECAPTCHA_SITE_KEY }}
          PUBLIC_CONTACT_EMAIL: ${{ secrets.CONTACT_EMAIL }}

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

2. **Configure environment variables**:

Create a `.env` file:

```
PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
PUBLIC_CONTACT_EMAIL=your_email@example.com
```

3. **Configure Astro for proper base paths**:

Update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.ricbits.cc',
  integrations: [react()],
  output: 'static'
});
```

## Git Workflow

1. **Branch Structure**:
   - `main` - Production branch
   - `dev` - Development branch
   - `staging` - Pre-production testing branch
   - `feature/*` - Feature branches

2. **Development Workflow**:

```bash
# Sync dev with main first (IMPORTANT)
git checkout main
git pull
git checkout dev
git pull
git merge main

# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit regularly
git add .
git commit -m "Meaningful commit message"

# When ready, merge to dev
git checkout dev
git pull
git merge feature/new-feature
git push origin dev

# Deploy to staging for testing
git checkout staging
git pull
git merge dev
git push origin staging

# After testing, deploy to production
git checkout main
git pull
git merge staging
git push origin main
```

3. **PowerShell Notes**:
   - In PowerShell, use semicolons (`;`) NOT ampersands (`&&`) to chain commands
   - With Git commands, use `--no-pager` flag to avoid issues

## Testing

1. **Responsive Testing**:
   - Test on multiple device sizes (mobile, tablet, desktop)
   - Check in different browsers (Chrome, Firefox, Safari, Edge)
   - Verify touch interactions on mobile devices

2. **Functionality Testing**:
   - Verify language switching works correctly
   - Test tooltip functionality on both desktop and touch devices
   - Check all carousel interactions
   - Verify embedded content (Spotify, Mixcloud) loads properly

3. **Performance Testing**:
   - Use Lighthouse for performance metrics
   - Optimize images for web performance
   - Verify load times on slower connections

## Maintenance

1. **Content Updates**:
   - Profile data in `src/content/profile/data.json`
   - Blog posts in `src/content/blog/` directory
   - Update both language versions simultaneously

2. **Technical Maintenance**:
   - Regular dependency updates (quarterly)
   - Security audits (annually)
   - Browser compatibility checks (quarterly)

3. **Documentation**:
   - Keep `manual.txt` updated with maintenance procedures
   - Document any significant architectural changes

For detailed maintenance instructions, refer to `manual.txt`.

## Additional Resources

- [Astro Documentation](https://docs.astro.build/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Performance Optimization

1. **Optimize embedded content loading**:
   - Add `fetchpriority="low"` attribute to non-critical iframes
   - Use Intersection Observer API to delay loading iframes until they're near the viewport:

```javascript
// Example implementation
if ('IntersectionObserver' in window) {
  const iframeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const iframe = container.querySelector('iframe');
        
        // If the iframe has a data-src, set it as the real src
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
        }
        
        observer.unobserve(container);
      }
    });
  }, { rootMargin: '200px' });
  
  // Start observing iframe containers
  document.querySelectorAll('.iframe-container').forEach(container => {
    iframeObserver.observe(container);
  });
}
```

2. **Image optimization**:
   - Use modern image formats (WebP) for better compression
   - Add proper width and height attributes to prevent layout shifts:
   ```html
   <img src="/path/to/image.webp" width="300" height="400" alt="Description" />
   ```
   - Prioritize above-fold images with `loading="eager"` and set others to `loading="lazy"`
   - Consider a responsive image strategy with multiple sizes:
   ```html
   <img srcset="/images/small.jpg 480w, /images/medium.jpg 800w, /images/large.jpg 1200w"
        sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
        src="/images/large.jpg" alt="Description" />
   ```

3. **CSS organization**:
   - Split CSS into smaller, component-specific files:
     - `photo-gallery.css` - Styles for the photo gallery
     - `carousel.css` - Styles for carousel components
     - `modal.css` - Styles for modal components
   - Consolidate media queries for better maintainability
   - Use consistent variable naming and organization

4. **Component organization**:
   - Extract reusable components into their own files (e.g., `PhotoModal.astro`)
   - Import component-specific CSS in the component itself
   - Use props and slots for better component configurability

## Blog Content Management

The blog section currently uses a "coming soon" approach while in development:

1. **Current status**:
   - Placeholder posts are set up in both languages (English and Portuguese)
   - Blog index page displays these placeholder posts
   - Full blog functionality is ready for content addition

2. **Adding new blog posts**:
   - Create markdown files in `src/content/blog/` directory
   - Use naming convention with language identifier: `post-name-en.md` or `post-name-pt.md`
   - Include required frontmatter:
   ```md
   ---
   title: "Post Title"
   pubDate: "YYYY-MM-DD"
   description: "Brief description"
   author: "Author Name"
   lang: "en" or "pt"
   image:
     url: "/images/blog/image.jpg"
     alt: "Image description"
   tags: ["tag1", "tag2"]
   ---
   
   Post content in markdown format
   ```

## Troubleshooting

For detailed troubleshooting information, refer to the `manual.txt` file which includes:
- Common issues and solutions
- Performance optimization techniques
- PowerShell special considerations for Windows users 