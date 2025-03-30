import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Function to get site URL from environment variables or fallback
// Adapting this from the standard guide - ensure VITE_SITE_URL is set in your .env
// Or replace import.meta.env.VITE_SITE_URL with your actual site URL string
const site = import.meta.env.VITE_SITE_URL || 'https://me.ricbits.cc'; // Fallback to config value

export async function GET(context) {
  // NOTE: Using Astro.glob assuming posts are Markdown files in src/pages/posts/
  // Adjust the path '/posts/**/*.md' if your content is elsewhere or uses different extensions.
  const posts = await Astro.glob('/posts/**/*.md');

  // Filter out draft posts if applicable (assuming a 'draft: true' frontmatter property)
  const items = posts
    .filter(post => !post.frontmatter.draft)
    .map((post) => ({
      title: post.frontmatter.title,
      pubDate: post.frontmatter.pubDate,
      description: post.frontmatter.description,
      link: post.url, // Astro.glob provides the final URL
      // content: sanitizeHtml(post.compiledContent()), // Optional: Include full content
      // customData: `<language>en-us</language>` // Optional: Add custom data
  }));

  return rss({
    // `<title>` field in output xml
    title: 'Ricardo\'s Site Blog', // Customize your site's title
    // `<description>` field in output xml
    description: 'Thoughts and updates from Ricardo.', // Customize your site's description
    // Base URLProv for links
    // Use the context.site value which comes from astro.config.mjs
    site: context.site,
    // List of `<item>`s in output xml
    items: items,
    // Optional: Customize RSS output
    // customData: `<language>en-us</language>`,
    // Optional: Add stylesheet
    // stylesheet: '/rss/styles.xsl', // Example path
  });
} 