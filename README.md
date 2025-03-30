# Ricardo Almeida Personal Website

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

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
