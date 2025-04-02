import { ui, defaultLang, languages, loadLanguages, languageNames } from './ui';
import { getCollection } from 'astro:content';

export { defaultLang, languages, loadLanguages, languageNames }; // Export these variables for use in other modules

// Initialize language data at server-startup time
let initializedLanguageList: Record<string, string> = {};
let isLanguageListInitialized = false;

// Get supported languages - first from dynamic loader, then fallback to whatever's available
export async function getSupportedLanguages(): Promise<Record<string, string>> {
  if (isLanguageListInitialized) {
    return initializedLanguageList;
  }
  
  try {
    // Try to dynamically load languages from profile content
    const dynamicLanguages = await loadLanguages();
    
    if (Object.keys(dynamicLanguages).length > 0) {
      initializedLanguageList = dynamicLanguages;
      isLanguageListInitialized = true;
      return dynamicLanguages;
    }
    
    // Fallback to whatever languages we have UI translations for
    const uiLanguages: Record<string, string> = {};
    for (const lang in ui) {
      if (lang !== 'default') {
        uiLanguages[lang] = lang; // Use the language code as display name
      }
    }
    
    if (Object.keys(uiLanguages).length > 0) {
      initializedLanguageList = uiLanguages;
      isLanguageListInitialized = true;
      return uiLanguages;
    }
    
    // Last resort fallback - use English
    const fallback = { en: 'en' };
    initializedLanguageList = fallback;
    isLanguageListInitialized = true;
    return fallback;
    
  } catch (error) {
    console.error('Error loading languages:', error);
    const fallback = { en: 'en' };
    initializedLanguageList = fallback;
    isLanguageListInitialized = true;
    return fallback;
  }
}

// Get the language from a URL
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  
  // Just check if it's a string for now - we'll validate actual languages at runtime
  if (typeof lang === 'string' && lang.length > 0) {
    return lang;
  }
  
  return defaultLang;
}

// Get the pathname without the language prefix
export function getPathnameWithoutLang(url: URL) {
  const [, lang, ...rest] = url.pathname.split('/');
  
  // Just check if it's a string for now - we'll validate actual languages at runtime
  if (typeof lang === 'string' && lang.length > 0) {
    return '/' + rest.join('/');
  }
  
  return url.pathname;
}

// Create a function to get the relative URL for a given locale
export function getLocalizedUrl(url: URL, locale: string) {
  // Get the path without the language prefix
  const pathWithoutLocale = getPathnameWithoutLang(url);
  
  // For the default language (English): 
  // - If we are switching to the default language, always include the language prefix
  //   This ensures the language switcher works correctly for all languages
  return `/${locale}${pathWithoutLocale}`;
}

// Get translations in the current language
export function useTranslations(lang: string) {
  return function t(key: string) {
    // First check if we have translations for this language
    if (ui[lang] && ui[lang][key]) {
      return ui[lang][key];
    }
    
    // Fall back to default language
    return ui.default[key] || key;
  };
}

// Function to detect the browser language and return the closest supported language
export function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return defaultLang;
  
  // Get browser language
  const browserLang = navigator.language?.split('-')[0];
  
  // Check if browser language is directly supported in our default languages
  if (browserLang && browserLang in languages) {
    return browserLang;
  }
  
  // Return default language
  return defaultLang;
}

// Load profile data for a specific language to use as UI strings
export async function getProfileStrings(lang: string) {
  try {
    // Get profile data for the given language
    const profileCollection = await getCollection('profile', (entry) => entry.data.language === lang);
    const profileData = profileCollection.length > 0 ? profileCollection[0].data : null;
    
    if (!profileData) {
      console.warn(`No profile data found for language: ${lang}`);
      return {} as Record<string, string>;
    }

    // Get translations for generic fields based on language
    const translations = getGenericTranslations(lang);

    // Prepare UI strings from profile data
    const profileStrings: Record<string, string> = {
      'site.title': `${profileData.personal?.name || 'Ricardo Almeida'} | ${profileData.personal?.title || ''}`,
      'site.description': profileData.hero?.join(' ') || '',
      'site.author': profileData.personal?.name || 'Ricardo Almeida',
      'site.keywords': profileData.technologies?.map(tech => tech.name).join(', ') || '',
      
      // JSON-LD Data
      'jsonld.jobTitle': profileData.personal?.title || '',
      'jsonld.organization': 'PwC Portugal',
      'jsonld.description': profileData.hero?.join(' ') || '',
      'jsonld.skills': profileData.technologies?.map(tech => tech.name).join(', ') || '',
      
      // Add dynamically translated strings
      ...translations
    };
    
    return profileStrings;
  } catch (error) {
    console.error(`Error loading profile strings for ${lang}:`, error);
    return {} as Record<string, string>;
  }
}

// Generate translations for common phrases based on the language
function getGenericTranslations(lang: string): Record<string, string> {
  // If we have UI translations for this language, use them
  if (ui[lang]) {
    return { ...ui[lang] };
  }
  
  // Otherwise use default translations
  return { ...ui.default };
}

// Combine base UI translations with profile data
export async function getUIStrings(lang: string): Promise<Record<string, string>> {
  const profileStrings = await getProfileStrings(lang);
  
  // Create a merged object with base UI translations and profile-based strings
  const combinedStrings: Record<string, string> = { 
    ...ui.default,      // Include default language fallbacks
    ...(ui[lang] || {}), // Include language-specific strings if available
    ...profileStrings    // Override with profile data strings
  };
  
  return combinedStrings;
} 