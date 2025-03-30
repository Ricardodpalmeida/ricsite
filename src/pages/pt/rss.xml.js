import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft && data.language === 'pt';
  });
  
  return rss({
    title: `${SITE_TITLE} (PT)`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/pt/blog/${post.slug}/`,
    })),
    customData: `<language>pt-br</language>`,
  });
} 