import { ui, defaultLang, languages } from './ui';

// Get the language from a URL
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as keyof typeof languages;
  }
  return defaultLang;
}

// Get the pathname without the language prefix
export function getPathnameWithoutLang(url: URL) {
  const [, lang, ...rest] = url.pathname.split('/');
  
  if (lang in languages) {
    return '/' + rest.join('/');
  }
  
  return url.pathname;
}

// Create a function to get the relative URL for a given locale
export function getLocalizedUrl(url: URL, locale: keyof typeof languages) {
  // Get the path without the language prefix
  const pathWithoutLocale = getPathnameWithoutLang(url);
  
  // If the path already starts with the locale, don't duplicate it
  if (pathWithoutLocale === '/' && locale === defaultLang) {
    return '/';
  }
  
  // Add the locale to the path
  return `/${locale}${pathWithoutLocale}`;
}

// Get translations in the current language
export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

// Function to detect the browser language and return the closest supported language
export function detectBrowserLanguage(): keyof typeof languages {
  if (typeof navigator === 'undefined') return defaultLang;
  
  const browserLang = navigator.language?.split('-')[0];
  return browserLang && browserLang in languages 
    ? browserLang as keyof typeof languages 
    : defaultLang;
} 