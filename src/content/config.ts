import { defineCollection, z } from 'astro:content';

// Define the schema for blog posts
export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      author: z.string().default('Ricardo Almeida'),
    }),
  }),
}; 