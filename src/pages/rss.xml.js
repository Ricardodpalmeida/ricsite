import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html'; // Import if using rendered content
import MarkdownIt from 'markdown-it'; // Import if rendering markdown
const parser = new MarkdownIt(); // Initialize markdown parser

// Function to get site URL from environment variables or fallback
// Adapting this from the standard guide - ensure VITE_SITE_URL is set in your .env
// Or replace import.meta.env.VITE_SITE_URL with your actual site URL string
// const site = import.meta.env.VITE_SITE_URL || 'https://me.ricbits.cc'; // Fallback to config value - Not needed as context.site is used

export async function GET(context) {
  // Fetch posts from the 'blog' content collection
  const blogPosts = await getCollection('blog');

  // Filter out drafts and map to RSS item structure
  const items = blogPosts
    .filter(post => !post.data.draft) // Assuming 'draft' is in your collection schema's 'data'
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()) // Sort by date descending
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Construct the link: Adjust '/blog/' if your actual blog path is different
      link: `/blog/${post.slug}/`,
      // Optional: Include full rendered content (requires sanitizeHtml and a Markdown parser)
      // content: sanitizeHtml(parser.render(post.body)),
      // Add custom data if needed
      // customData: `<language>${post.data.lang || 'en'}</language>` // Example: using lang from frontmatter
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