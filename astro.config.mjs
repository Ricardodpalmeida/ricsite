import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.ricbits.cc',
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
  }
});