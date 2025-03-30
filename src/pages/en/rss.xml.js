import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html'; // Import if using rendered content
import MarkdownIt from 'markdown-it'; // Import if rendering markdown
const parser = new MarkdownIt(); // Initialize markdown parser

export async function GET(context) {
  // Fetch posts from the 'blog' content collection
  const blogPosts = await getCollection('blog');

  // Filter for English posts, exclude drafts, sort, and map
  const items = blogPosts
    .filter(post => post.data.language === 'en' && !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()) // Sort by date descending
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Construct the link for English posts
      link: `/en/blog/${post.slug}/`,
      // Optional: Include full rendered content (requires sanitizeHtml and a Markdown parser)
      // content: sanitizeHtml(parser.render(post.body)),
      customData: `<language>en-us</language>` // Specify language
    }));

  return rss({
    title: 'Ricardo\'s Site Blog (English)', // Language-specific title
    description: 'Thoughts and updates from Ricardo.', // Customize
    site: context.site, // Uses site URL from astro.config.mjs
    items: items,
    customData: `<language>en-us</language>`, // Add language tag to feed
    // Optional: Add stylesheet
    // stylesheet: '/rss/styles.xsl',
  });
} 