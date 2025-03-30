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
  vite: {
    define: {
      'import.meta.env.SITE': JSON.stringify('https://me.ricbits.cc')
    }
  }
});