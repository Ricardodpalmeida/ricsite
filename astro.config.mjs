import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.ricbits.cc', // Use your custom domain here
  base: '', // Empty base when using custom domain
  integrations: [react()],
  output: 'static',
});