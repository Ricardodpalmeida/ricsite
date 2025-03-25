import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://me.ricbits.cc', 
  base: '',
  integrations: [react()],
  output: 'static',
});