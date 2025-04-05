import { defaultLang } from '../i18n/utils';

export async function GET(context) {
  // Redirect to the default language sitemap
  return context.redirect(`/${defaultLang}/sitemap.xml`);
} 