import { defineCollection, z } from 'astro:content';
import { languages } from '../i18n/utils';

// Create a dynamic language type based on available languages
const languageType = z.string().refine(
  (lang) => Object.keys(languages).includes(lang),
  {
    message: 'Language must be one of the supported languages',
  }
);

// Define the blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    language: languageType,
    // UUID used to link translations of the same content
    translationKey: z.string().uuid(),
    // Optional draft flag
    draft: z.boolean().optional().default(false),
  }),
});

// Define the profile collection schema
const profileCollection = defineCollection({
  type: 'data', // Use data collection for JSON
  schema: z.object({
    language: languageType,
    personal: z.object({
      name: z.string().optional(),
      title: z.string().optional(),
      location: z.string().optional(),
      connections: z.string().optional(),
      profileUrl: z.string().optional(),
    }).optional(),
    hero: z.array(z.string()).optional(),
    about: z.array(z.string()).optional(),
    technologies: z.array(z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    sectionDescriptions: z.object({
      experience: z.string().optional(),
      education: z.string().optional(),
      skills: z.string().optional(),
      certifications: z.string().optional(),
      sideProjects: z.string().optional(),
    }).optional(),
    skillDescriptions: z.record(z.string()).optional(),
    experience: z.array(z.object({
      title: z.string().optional(),
      company: z.string().optional(),
      duration: z.string().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    education: z.array(z.object({
      school: z.string().optional(),
      degree: z.string().optional(),
      duration: z.string().optional(),
      grade: z.string().optional(),
      thesis: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    certifications: z.array(z.object({
      title: z.string().optional(),
      issuer: z.string().optional(),
      issueDate: z.string().optional(),
      status: z.string().optional(),
      credentialURL: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    sideProjects: z.object({
      titles: z.object({
        section: z.string().optional(),
        podcast: z.string().optional(),
        dj: z.string().optional(),
        playlists: z.string().optional(),
        photography: z.string().optional(),
      }).optional(),
      descriptions: z.object({
        podcast: z.string().optional(),
        dj: z.string().optional(),
        playlistsIntro: z.string().optional(),
        photography: z.string().optional(),
      }).optional(),
      embeds: z.object({
        podcast: z.object({
          src: z.string().optional(),
          width: z.string().optional(),
          height: z.string().optional(),
        }).optional(),
        dj: z.array(z.object({
          src: z.string(),
          title: z.string().optional(),
        })).optional(),
        playlists: z.array(z.object({
          src: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
        })).optional(),
      }).optional(),
    }).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'profile': profileCollection,
}; 