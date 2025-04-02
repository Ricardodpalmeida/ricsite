import { getCollection } from 'astro:content';
import { languages, defaultLang } from '../../../../i18n/utils';

export const prerender = false;

export async function GET({ params, request, redirect }) {
  // Extract the GUID from the URL
  const url = new URL(request.url);
  const guid = url.searchParams.get('id');
  const lang = params.lang;
  
  // Validate the language
  if (!lang || !(lang in languages)) {
    return redirect(`/${defaultLang}/blog`);
  }
  
  // If no GUID provided, redirect to blog index
  if (!guid) {
    return redirect(`/${lang}/blog`);
  }
  
  // Find the blog post with this GUID
  const allPosts = await getCollection('blog');
  const matchingPost = allPosts.find(post => post.data.guid === guid && post.data.language === lang);
  
  // If post not found, redirect to blog index
  if (!matchingPost) {
    return redirect(`/${lang}/blog`);
  }
  
  // Redirect to the proper slug URL
  return redirect(`/${lang}/blog/${matchingPost.slug}/`);
} 