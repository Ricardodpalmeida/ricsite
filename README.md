# Ricardo's Personal Website

A minimal, responsive personal website built with Astro and React. The site features a clean, dark-themed design with easy-to-update profile data and multilingual support.

## 🚀 Features

- Clean, minimalist design with dark background (#2c2c2c) and white text
- Cosmic Latte (#fff8e7) highlights
- Fully responsive layout for all device sizes
- Easily updateable profile data through language-specific JSON files
- Fast load times using Astro static site generation
- React components for dynamic elements
- Comprehensive internationalization (i18n) support for English, Portuguese, Spanish, and Chinese
- Optimized dynamic routing system with language path prefixes
- Custom 404 error page
- Enhanced static asset management
- SEO optimizations with metadata and sitemaps
- Performance improvements for faster loading
- Dynamic content replacement for elements like the copyright year

## 📋 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   ├── CNAME
│   ├── robots.txt
├── src/
│   ├── components/
│   │   └── Various components (.astro, .jsx, etc.)
│   ├── content/
│   │   ├── config.ts
│   │   └── profile/
│   │       ├── en.json
│   │       ├── es.json
│   │       ├── pt.json
│   │       └── zh.json
│   ├── i18n/
│   │   ├── ui.ts
│   │   └── utils.ts
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── middleware.js
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── blog/
│   │   │   │   ├── index.astro
│   │   │   │   └── [...slug].astro
│   │   │   └── rss.xml.js
│   │   └── 404.astro
│   └── styles/
│       ├── global.css
│       ├── profile.css
│       └── other CSS files
└── package.json
```

## 🧞 Setup and Development

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ricardodpalmeida/ricsite.git
   cd ricsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321` to see the site.

## 🔄 Updating Content

The site content can be easily updated by modifying the language-specific JSON files in `src/content/profile/`. Each language has its own file:

- `en.json` - English content
- `pt.json` - Portuguese content
- `es.json` - Spanish content
- `zh.json` - Chinese content

These files contain all your personal information including:
- Basic personal info
- About text
- Work experience
- Education
- Skills
- Languages
- UI translations

## 🛠️ Git Workflow

The recommended Git workflow for this project is:

1. Sync dev branch with main
2. Create feature branches from dev
3. Merge completed features back to dev
4. Test on staging branch
5. Merge to main when ready for production

## 🚢 Deployment

The site is configured to deploy automatically to GitHub Pages using GitHub Actions workflow.

1. Push your changes to the main branch
2. The GitHub Actions workflow will automatically build and deploy the site
3. Your site will be available at your configured domain (me.ricbits.cc)

## 🛠️ Customization

### Styling

- Global styles are in `src/styles/global.css`
- Component-specific styles are in other CSS files in the styles directory
- Color scheme is defined by CSS variables in the main layout

### Adding New Pages

To add new pages:

1. Create a new file in `src/pages/[lang]/`
2. Use the MainLayout component
3. Add your content and components
4. Use the i18n utilities to handle translations

### Internationalization

The site supports multiple languages through Astro's i18n routing:

- Content is stored in language-specific JSON files in `src/content/profile/`
- Dynamic routes use the `[lang]` parameter to determine the current language
- Translations for UI elements are managed through the i18n system
- Default language (English) is set in `astro.config.mjs`
- Language detection and fallback mechanisms ensure a good user experience

## 📜 License

This project is open-source. Feel free to use and modify as needed.

## ✨ Future Plans

- Expanded blog functionality
- Podcast and DJ sets hosting
- More interactive components
- Additional language support

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Deployment Status

The site is deployed using GitHub Actions and GitHub Pages.
