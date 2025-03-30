import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../../consts'; // Import SITE_URL
import sanitizeHtml from 'sanitize-html'; // Import if using rendered content
import MarkdownIt from 'markdown-it'; // Import if rendering markdown
const parser = new MarkdownIt(); // Initialize markdown parser

export async function GET() {
  // Fetch posts from the 'blog' content collection
  const blogPosts = await getCollection('blog');

  // Filter for Portuguese posts, exclude drafts, sort, and map
  const items = blogPosts
    .filter(post => post.data.language === 'pt' && !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()) // Sort by date descending
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Construct the link for Portuguese posts
      link: `/pt/blog/${post.slug}/`,
      // Optional: Include full rendered content (requires sanitizeHtml and a Markdown parser)
      // content: sanitizeHtml(parser.render(post.body)),
      customData: `<language>pt-pt</language>` // Specify language
    }));

  return rss({
    title: 'Ricardo\'s Site Blog (Português)', // Language-specific title
    description: 'Pensamentos e atualizações de Ricardo.', // Customize
    site: SITE_URL, // Use the imported SITE_URL
    items: items,
    customData: `<language>pt-pt</language>`, // Add language tag to feed
    // Optional: Add stylesheet
    // stylesheet: '/rss/styles.xsl',
  });
} 