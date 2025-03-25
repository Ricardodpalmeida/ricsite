import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ricardodpalmeida.github.io',
  base: '/ricsite',
  integrations: [react()],
});