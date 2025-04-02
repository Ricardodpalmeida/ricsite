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
    guid: z.string().uuid().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});

// Define the profile collection for profile-data
const profile = defineCollection({
  type: 'data', // Use data collection for JSON
  schema: z.object({
    // Personal info
    personal: z.object({
      name: z.string(),
      title: z.string(),
      location: z.string(),
      connections: z.string(),
      profileUrl: z.string(),
    }),
    // Hero section
    hero: z.array(z.string()),
    // About section
    about: z.array(z.string()),
    // Technologies/skills
    technologies: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })),
    // Work experience
    experience: z.array(z.object({
      title: z.string(),
      company: z.string(),
      duration: z.string(),
      location: z.string().optional(),
      description: z.string(),
    })),
    // Education
    education: z.array(z.object({
      school: z.string(),
      degree: z.string(),
      duration: z.string().optional(),
      grade: z.string().optional(),
      thesis: z.string().optional(),
      description: z.string().optional(),
    })),
    // Certifications
    certifications: z.array(z.object({
      title: z.string(),
      issuer: z.string(),
      issueDate: z.string(),
      status: z.string().optional(),
      credentialURL: z.string().optional(),
      description: z.string().optional(),
    })),
    // Add language field to indicate which language this profile data is for
    language: z.enum(['en', 'pt']),
  }),
});

export const collections = {
  'blog': blog,
  'profile': profile,
}; 