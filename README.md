# Ricardo's Personal Website

A minimal, responsive personal website built with Astro and React. The site features a clean, dark-themed design with easy-to-update profile data.

## 🚀 Features

- Clean, minimalist design with dark background (#2c2c2c) and white text
- Cosmic Latte (#fff8e7) highlights
- Fully responsive layout for all device sizes
- Easily updateable profile data through a central JSON file
- Fast load times using Astro static site generation
- React components for dynamic elements
- Internationalization (i18n) support for English and Portuguese
- Optimized routing system
- Custom 404 error page
- Enhanced static asset management
- SEO optimizations with metadata and sitemaps
- Performance improvements for faster loading

## 📋 Project Structure

```
/
├── public/
│   ├── favicon.svg
│   ├── CNAME
│   ├── robots.txt
├── src/
│   ├── components/
│   │   └── Profile.jsx
│   ├── content/
│   │   └── profile/
│   │       └── data.json
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── middleware.js
│   ├── pages/
│   │   ├── en/
│   │   ├── pt/
│   │   ├── blog/
│   │   ├── 404.astro
│   │   └── index.astro
│   └── styles/
│       └── profile.css
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

The site content can be easily updated by modifying the `src/content/profile/data.json` file. This file contains all your personal information including:

- Basic personal info
- About text
- Work experience
- Education
- Skills
- Languages

## 🔒 reCAPTCHA Setup

The site uses Google reCAPTCHA v3 to protect the contact email from bots:

1. Register your site at [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Choose reCAPTCHA v3
3. Add your domain(s) to the list of allowed domains
4. Get the Site Key
5. Add the Site Key to the `.env` file:
   ```
   PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```
6. The site will automatically handle the reCAPTCHA integration when a key is provided

> **Note:** If no reCAPTCHA key is provided, the site will still function, but the contact email will be shown directly without verification.

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

- Global styles are in `src/layouts/MainLayout.astro`
- Component-specific styles are in `src/styles/profile.css`
- Color scheme is defined by CSS variables in the main layout

### Adding New Pages

To add new pages (like a blog):

1. Create a new file in `src/pages/`
2. Use the MainLayout component
3. Add your content and components

### Internationalization

The site supports multiple languages through Astro's i18n routing:

- English content is in `src/pages/en/`
- Portuguese content is in `src/pages/pt/`
- Default language is set in `astro.config.mjs`

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
