import { defaultLang } from '../i18n/utils';

export async function GET(context) {
  // Redirect to the default language RSS feed
  return context.redirect(`/${defaultLang}/rss.xml`);
} 