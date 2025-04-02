import { languages, defaultLang } from '../../../../i18n/utils';
import { getCollection } from 'astro:content';

// Required for static generation
export async function getStaticPaths() {
  // Get all blog posts
  const allPosts = await getCollection('blog');
  const paths = [];
  
  // Create a path for each language and potential post GUID
  for (const lang of Object.keys(languages)) {
    // Create a fallback path for each language to handle invalid slugs
    paths.push({
      params: { 
        lang,
        slug: 'fallback'
      }
    });
    
    // Add paths for specific post GUIDs
    for (const post of allPosts) {
      if (post.data.translationKey && typeof post.data.translationKey === 'string') {
        // Ensure the translationKey doesn't contain invalid characters
        const safeKey = post.data.translationKey.replace(/[*?<>:|"]/g, '_');
        
        if (safeKey) {
          paths.push({
            params: { 
              lang,
              slug: safeKey
            },
            props: { post }
          });
        }
      }
    }
  }
  
  return paths;
}

// Handle the actual request
export async function GET({ params, redirect, props }) {
  const { lang, slug } = params;
  const { post } = props || {};
  
  // Validate the language
  if (!lang || !(lang in languages)) {
    return redirect(`/${defaultLang}/blog`);
  }
  
  // If we have a matching post from props, redirect directly to it
  if (post && post.data.lang === lang) {
    return redirect(`/${lang}/blog/${post.slug}`);
  }
  
  // If we don't have a direct match for this language, try to find a post with the matching ID in any language
  const allPosts = await getCollection('blog');
  const anyPost = allPosts.find(p => p.data.translationKey?.toString() === slug);
  
  // If found in another language, redirect to that post
  if (anyPost) {
    return redirect(`/${anyPost.data.lang}/blog/${anyPost.slug}`);
  }
  
  // If not found at all, redirect to the blog index
  return redirect(`/${lang}/blog`);
} 