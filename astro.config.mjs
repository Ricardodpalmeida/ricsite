import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import fs from 'fs';
import path from 'path';

// Dynamically determine available languages from profile JSON files
function getAvailableLanguages() {
  try {
    const profileDir = path.resolve('./src/content/profile');
    
    // Check if directory exists
    if (!fs.existsSync(profileDir)) {
      console.warn('Profile directory not found:', profileDir);
      return ['en']; // Default fallback
    }
    
    // Read directory and filter for JSON files
    const files = fs.readdirSync(profileDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    // Ensure we have at least the default language
    if (!files.includes('en')) {
      files.push('en');
    }
    
    console.log('Detected languages from profile files:', files);
    return files;
  } catch (error) {
    console.error('Error detecting languages:', error);
    return ['en']; // Default fallback
  }
}

// Get available languages
const locales = getAvailableLanguages();

export default defineConfig({
  base: '',
  integrations: [react()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  i18n: {
    defaultLocale: 'en',
    // Dynamically generated from profile JSON files
    locales,
    routing: {
      prefixDefaultLocale: true  // Always prefix the default language for consistent URLs
    }
  },
  redirects: {
    // Redirect root to default language
    '/': '/en/',
    
    // Block specific paths including variations with double slashes
    '/src/content/profile/data.json': '/404',
    '//src/content/profile/data.json': '/404',
    '//src//content//profile//data.json': '/404',
    '/content/profile/data.json': '/404',
    '//content//profile//data.json': '/404',
    '/profile/data.json': '/404',
    '//profile//data.json': '/404',
    '/data.json': '/404',
    '//data.json': '/404',
    
    // Instead of using wildcards, define specific paths to block
    '/content': '/404',
    '//content': '/404',
    '/src/content': '/404',
    '//src//content': '/404',
    '/profile': '/404',
    '//profile': '/404'
  },
  server: {
    // Add security headers for development server
    headers: {
      // Prevent content from being loaded in frames (click-jacking protection)
      'X-Frame-Options': 'DENY',
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Enable XSS protection in browsers
      'X-XSS-Protection': '1; mode=block'
    }
  },
  vite: {
    define: {
      'import.meta.env.SITE': JSON.stringify('https://me.ricbits.cc')
    },
    server: {
      // Protect sensitive files from direct access in development
      fs: {
        allow: [
          './public', 
          './src/pages', 
          './src/layouts', 
          './src/components', 
          './src/styles',
          './src/content'  // Allow content directory for imports
        ],
        deny: []
      }
    }
  }
});