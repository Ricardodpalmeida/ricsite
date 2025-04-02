import { languages, defaultLang } from '../../../i18n/utils';
import { getCollection } from 'astro:content';

// Required for static generation
export async function getStaticPaths() {
  const paths = [];
  
  // Create a path for each language
  for (const lang of Object.keys(languages)) {
    paths.push({
      params: { lang }
    });
  }
  
  return paths;
}

// Handle the actual request
export async function GET({ params, request, redirect }) {
  const { lang } = params;
  
  // Validate the language
  if (!lang || !(lang in languages)) {
    return redirect(`/${defaultLang}/blog`);
  }
  
  try {
    // Get the GUID from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return redirect(`/${lang}/blog`);
    }
    
    // Sanitize the ID to remove invalid characters
    const safeId = id.replace(/[*?<>:|"]/g, '_');
    
    // Get all blog posts
    const allPosts = await getCollection('blog');
    
    // Find the post with the matching translation key (GUID)
    const post = allPosts.find(post => {
      const postKey = post.data.translationKey?.toString();
      return postKey === safeId && post.data.lang === lang;
    });
    
    // If found, redirect to the post
    if (post) {
      return redirect(`/${lang}/blog/${post.slug}`);
    }
    
    // If not found in the current language, look for it in any language
    const anyPost = allPosts.find(post => {
      const postKey = post.data.translationKey?.toString();
      return postKey === safeId;
    });
    
    // If found in another language, redirect to that post
    if (anyPost) {
      return redirect(`/${anyPost.data.lang}/blog/${anyPost.slug}`);
    }
  } catch (error) {
    console.error("Error processing blog redirect:", error);
  }
  
  // If not found at all or there was an error, redirect to the blog index
  return redirect(`/${lang}/blog`);
} 