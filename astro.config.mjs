import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  base: '',
  integrations: [react()],
  output: 'static',
  build: {
    assets: '_assets',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  redirects: {
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
    '/profile-data.json': '/404',
    '//profile-data.json': '/404',
    
    // Block content directories
    '/content/*': '/404',
    '//content/*': '/404',
    '/src/content/*': '/404',
    '//src//content/*': '/404',
    '/profile/*': '/404',
    '//profile/*': '/404'
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
        allow: ['./public', './src/pages', './src/layouts', './src/components', './src/styles'],
        deny: ['./src/content']
      }
    }
  }
});