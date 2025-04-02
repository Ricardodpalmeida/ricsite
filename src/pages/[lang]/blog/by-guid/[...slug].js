import { languages, defaultLang } from '../../../../i18n/utils';

export const prerender = false;

export async function GET({ params, redirect }) {
  const { lang, slug } = params;
  
  // Validate the language
  if (!lang || !(lang in languages)) {
    return redirect(`/${defaultLang}/blog`);
  }
  
  // Redirect to the index endpoint which will handle the GUID lookup
  return redirect(`/${lang}/blog/by-guid?id=${slug}`);
} 