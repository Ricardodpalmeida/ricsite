import { defineConfig } from 'astro/config';

export function GET(context) {
  return Response.redirect(`${context.site}en/rss.xml`, 302);
} 