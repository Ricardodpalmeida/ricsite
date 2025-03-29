import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    language: z.enum(['en', 'pt']).default('en'),
  }),
});

// Define the profile collection for profile-data
const profile = defineCollection({
  type: 'data', // Use data collection for JSON
});

export const collections = {
  'blog': blog,
  'profile': profile,
}; 