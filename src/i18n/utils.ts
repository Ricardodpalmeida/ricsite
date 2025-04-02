import { ui, defaultLang, languages, loadLanguages, languageNames } from './ui';
import { getCollection } from 'astro:content';

export { defaultLang, languages, loadLanguages, languageNames }; // Export these variables for use in other modules

// Initialize language data at server-startup time
let initializedLanguageList: Record<string, string> = {};
let isLanguageListInitialized = false;

// Get supported languages - first from dynamic loader, then fallback to whatever's available
export async function getSupportedLanguages(): Promise<Record<string, string>> {
  console.log('Utils - getSupportedLanguages called, initialized:', isLanguageListInitialized);
  
  if (isLanguageListInitialized) {
    console.log('Utils - Returning initialized language list:', Object.keys(initializedLanguageList));
    return initializedLanguageList;
  }
  
  try {
    // Try to dynamically load languages from profile content
    console.log('Utils - Attempting to dynamically load languages');
    const dynamicLanguages = await loadLanguages();
    console.log('Utils - Dynamic languages loaded:', Object.keys(dynamicLanguages));
    
    if (Object.keys(dynamicLanguages).length > 0) {
      // ALWAYS ensure English is available as the default
      if (!dynamicLanguages['en']) {
        console.log('Utils - Adding missing default English language');
        dynamicLanguages['en'] = languageNames['en'] || 'English';
      }
      
      initializedLanguageList = dynamicLanguages;
      isLanguageListInitialized = true;
      console.log('Utils - Using dynamically loaded languages:', Object.keys(initializedLanguageList));
      return dynamicLanguages;
    }
    
    // Fallback to whatever languages we have UI translations for
    console.log('Utils - No dynamic languages found, falling back to UI language keys');
    const uiLanguages: Record<string, string> = {};
    
    // ALWAYS add English first as the default language
    uiLanguages['en'] = languageNames['en'] || 'English';
    console.log('Utils - Added default English language');
    
    for (const lang in ui) {
      if (lang !== 'default' && lang !== 'en') { // Skip default and English (already added)
        uiLanguages[lang] = languageNames[lang] || lang; // Try to use language names
        console.log(`Utils - Added UI-based language: ${lang} => ${uiLanguages[lang]}`);
      }
    }
    
    initializedLanguageList = uiLanguages;
    isLanguageListInitialized = true;
    console.log('Utils - Using UI-based languages:', Object.keys(initializedLanguageList));
    return uiLanguages;
  } catch (error) {
    console.error('Utils - Error loading languages:', error);
    // Always ensure English is first in the fallback
    const fallback: Record<string, string> = { 
      'en': languageNames['en'] || 'English'
    };
    
    // Add other languages
    const otherLangs = ['zh', 'pt', 'es'];
    otherLangs.forEach(code => {
      if (languageNames[code]) {
        fallback[code] = languageNames[code];
      }
    });
    
    initializedLanguageList = fallback;
    isLanguageListInitialized = true;
    console.log('Utils - Using error fallback languages:', Object.keys(initializedLanguageList));
    return fallback;
  }
}

// Get the language from a URL
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  console.log(`Utils - getLangFromUrl called for ${url.pathname}, extracted lang: "${lang}"`);
  
  // Just check if it's a string for now - we'll validate actual languages at runtime
  if (typeof lang === 'string' && lang.length > 0) {
    console.log(`Utils - Returning detected language: ${lang}`);
    return lang;
  }
  
  console.log(`Utils - No language in URL, returning default: ${defaultLang}`);
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
export async function getProfileStrings(lang: string): Promise<any> {
  console.log(`Utils - getProfileStrings called for language: ${lang}`);
  try {
    // Get profile data for the given language
    const profileCollection = await getCollection('profile', (entry) => entry.data.language === lang);
    console.log(`Utils - Found ${profileCollection.length} profile entries for language: ${lang}`);
    
    const profileData = profileCollection.length > 0 ? profileCollection[0].data : null;
    
    if (!profileData) {
      console.warn(`Utils - No profile data found for language: ${lang}`);
      return {} as Record<string, string>;
    }

    console.log(`Utils - Profile data loaded for ${lang}, getting translations`);
    // Get translations for generic fields based on language
    const translations = getGenericTranslations(lang);

    // Extract the full profile data including hero and about arrays
    return {
      ...profileData,
      // Add UI strings as well for backward compatibility
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
  } catch (error) {
    console.error(`Utils - Error loading profile strings for ${lang}:`, error);
    return {};
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