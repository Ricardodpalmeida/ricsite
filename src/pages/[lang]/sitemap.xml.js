import { languages, defaultLang, getProfileStrings } from '../../i18n/utils';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  return Object.keys(languages).map(lang => ({ params: { lang } }));
}

export async function GET({ params }) {
  const { lang } = params;
  
  // Validate language or use default
  const validLang = lang && lang in languages ? lang : defaultLang;
  
  try {
    // Initialize profileData - with error handling
    let profileData = {};
    try {
      profileData = await getProfileStrings(validLang) || {};
    } catch (error) {
      console.error(`Error loading profile data for sitemap (${validLang}):`, error);
    }
    
    // Define site URL
    const siteURL = 'https://me.ricbits.cc';
    
    // Get all blog posts for this language
    const blogPosts = await getCollection('blog', post => 
      post.data.language === validLang && !post.data.draft
    );
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${siteURL}/${validLang}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteURL}/${validLang}/about/</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteURL}/${validLang}/hobbies/</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteURL}/${validLang}/blog/</loc>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog posts -->
  ${blogPosts.map(post => {
    const cleanSlug = post.slug.replace(`${validLang}/`, '');
    return `
  <url>
    <loc>${siteURL}/${validLang}/blog/${cleanSlug}/</loc>
    <lastmod>${post.data.updatedDate?.toISOString() || post.data.pubDate?.toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>`;
  }).join('')}
</urlset>`;

    // Return XML with proper content type
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (error) {
    console.error(`Error generating sitemap for ${validLang}:`, error);
    
    // Return a minimal sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://me.ricbits.cc/${validLang}/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'max-age=3600'
      }
    });
  }
} 