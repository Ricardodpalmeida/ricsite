import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { languages, defaultLang } from '../../i18n/utils';

export async function getStaticPaths() {
  return Object.keys(languages).map(lang => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;

  // Use the actual language code if valid, otherwise default
  const languageCode = lang in languages ? lang : defaultLang;
  const languageName = languages[languageCode];
  
  // Get blog posts filtered by language
  const posts = await getCollection('blog', ({ data }) => {
    return data.language === languageCode && !data.draft;
  });
  
  // Sort by publication date (newest first)
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  // Generate site URL with language prefix
  const siteURL = import.meta.env.SITE || 'https://ricardo.almeida.pt';
  const languageURL = `${siteURL}/${languageCode}`;
  
  return rss({
    title: `Ricardo Almeida - Blog (${languageName})`,
    description: languageCode === 'en' 
      ? 'Articles about cloud computing, artificial intelligence, and technology.'
      : 'Artigos sobre computação na nuvem, inteligência artificial e tecnologia.',
    site: languageURL,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${languageCode}/blog/${post.slug}/`,
      ...(post.data.guid && { guid: post.data.guid })
    })),
    customData: `<language>${languageCode}</language>`,
    stylesheet: '/rss/styles.xsl'
  });
} 