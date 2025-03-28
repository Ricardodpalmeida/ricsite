import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.ricbits.cc',
  base: '', // Empty base for custom domain at root path
  integrations: [react()],
  output: 'static',
  build: {
    // Ensure assets are properly referenced
    assets: '_assets',
  },
  vite: {
    build: {
      rollupOptions: {
        input: {
          'profile-data': 'src/assets/profile-data.json'
        }
      }
    }
  }
});