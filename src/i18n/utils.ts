import { ui, defaultLang, languages, loadLanguages, languageNames, defaultUIStrings } from './ui';
import { getCollection } from 'astro:content';

export { defaultLang, languages, loadLanguages, languageNames }; // Export these variables for use in other modules

// Initialize language data at server-startup time
let initializedLanguageList: Record<string, string> = {};
let isLanguageListInitialized = false;

// Add a utility function to conditionally log based on environment
const isDev = import.meta.env.DEV;
const debugLog = (message: string, ...args: any[]) => {
  if (isDev) {
    console.log(message, ...args);
  }
};

// Get supported languages - first from dynamic loader, then fallback to whatever's available
export async function getSupportedLanguages(): Promise<Record<string, string>> {
  debugLog('Utils - getSupportedLanguages called, initialized:', isLanguageListInitialized);
  
  if (isLanguageListInitialized) {
    debugLog('Utils - Returning initialized language list:', Object.keys(initializedLanguageList));
    return initializedLanguageList;
  }
  
  try {
    // Try to dynamically load languages from profile content
    debugLog('Utils - Attempting to dynamically load languages');
    const dynamicLanguages = await loadLanguages();
    debugLog('Utils - Dynamic languages loaded:', Object.keys(dynamicLanguages));
    
    if (Object.keys(dynamicLanguages).length > 0) {
      // ALWAYS ensure English is available as the default
      if (!dynamicLanguages['en']) {
        debugLog('Utils - Adding missing default English language');
        dynamicLanguages['en'] = languageNames['en'] || 'English';
      }
      
      initializedLanguageList = dynamicLanguages;
      isLanguageListInitialized = true;
      debugLog('Utils - Using dynamically loaded languages:', Object.keys(initializedLanguageList));
      return dynamicLanguages;
    }
    
    // Fallback to whatever languages we have UI translations for
    debugLog('Utils - No dynamic languages found, falling back to UI language keys');
    const uiLanguages: Record<string, string> = {};
    
    // ALWAYS add English first as the default language
    uiLanguages['en'] = languageNames['en'] || 'English';
    debugLog('Utils - Added default English language');
    
    for (const lang in ui) {
      if (lang !== 'default' && lang !== 'en') { // Skip default and English (already added)
        uiLanguages[lang] = languageNames[lang] || lang; // Try to use language names
        debugLog(`Utils - Added UI-based language: ${lang} => ${uiLanguages[lang]}`);
      }
    }
    
    initializedLanguageList = uiLanguages;
    isLanguageListInitialized = true;
    debugLog('Utils - Using UI-based languages:', Object.keys(initializedLanguageList));
    return uiLanguages;
  } catch (error) {
    debugLog('Utils - Error loading languages:', error);
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
    debugLog('Utils - Using error fallback languages:', Object.keys(initializedLanguageList));
    return fallback;
  }
}

// Get the language from a URL
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  debugLog(`Utils - getLangFromUrl called for ${url.pathname}, extracted lang: "${lang}"`);
  
  // Just check if it's a string for now - we'll validate actual languages at runtime
  if (typeof lang === 'string' && lang.length > 0) {
    debugLog(`Utils - Returning detected language: ${lang}`);
    return lang;
  }
  
  debugLog(`Utils - No language in URL, returning default: ${defaultLang}`);
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
    let text;
    
    // First check if we have translations for this language
    if (ui[lang] && ui[lang][key]) {
      text = ui[lang][key];
    } else {
      // Fall back to default language
      text = ui.default[key] || key;
    }
    
    // Handle special replacements like the current year
    if (key === 'footer.copyright') {
      const currentYear = new Date().getFullYear();
      text = text.replace('{year}', currentYear.toString());
    }
    
    return text;
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
  try {
    debugLog(`Utils - Loading profile strings for ${lang}`);
    // Get the profile file based on language
    const profiles = await getCollection('profile');
    const profile = profiles.find(p => p.data.language === lang);
    
    // Use English as fallback if language profile doesn't exist
    const fallbackProfile = profiles.find(p => p.data.language === defaultLang);
    
    // Default empty structure for type safety
    const emptyProfile = {
      language: defaultLang,
      personal: { 
        name: 'Ricardo Almeida',
        title: '',
        location: '',
        connections: '',
        profileUrl: ''
      },
      site: {
        siteName: 'Ricbits',
        siteDescription: ''
      },
      hero: [],
      about: [],
      skills: [],
      technologies: [],
      sectionDescriptions: {},
      experience: [],
      education: [],
      certifications: [],
      sideProjects: [],
      ui: {}
    };
    
    // Use the profile data if it exists, otherwise fallback to English or empty
    const profileData = profile?.data || fallbackProfile?.data || emptyProfile;
    
    debugLog(`Utils - Profile data loaded for ${lang}, getting translations`);
    // Get translations for generic fields based on language
    const translations = getGenericTranslations(lang);

    // Extract the full profile data including hero and about arrays
    return {
      ...profileData,
      // Add UI strings as well for backward compatibility
      'site.title': profileData.site?.siteName ? `${profileData.site.siteName} - ${profileData.site.siteDescription}` : `${profileData.personal?.name || 'Ricardo Almeida'} | ${profileData.personal?.title || ''}`,
      'site.description': profileData.site?.siteDescription || profileData.hero?.join(' ') || '',
      'site.author': profileData.personal?.name || 'Ricardo Almeida',
      'site.keywords': profileData.technologies?.map((tech: { name: string }) => tech.name).join(', ') || '',
      
      // JSON-LD Data
      'jsonld.jobTitle': profileData.personal?.title || '',
      'jsonld.organization': 'PwC Portugal',
      'jsonld.description': profileData.hero?.join(' ') || '',
      'jsonld.skills': profileData.technologies?.map((tech: { name: string }) => tech.name).join(', ') || '',
      
      // Add dynamically translated strings
      ...translations
    };
  } catch (error) {
    debugLog(`Utils - Error loading profile strings for ${lang}:`, error);
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

// Function to load UI translations from profile files
export async function loadUITranslations(): Promise<Record<string, Record<string, string>>> {
  try {
    debugLog('UI Module - Starting loadUITranslations()');
    const profileCollection = await getCollection('profile');
    debugLog('UI Module - Retrieved profile collection with', profileCollection.length, 'entries for UI translations');
    
    // Use ui.default from the imported ui object instead of defaultUIStrings
    const translations: Record<string, Record<string, string>> = {
      default: { ...ui.default }
    };
    
    // Current year for dynamic replacement
    const currentYear = new Date().getFullYear();
    
    // Load translations from each profile
    for (const profile of profileCollection) {
      const lang = profile.data.language;
      const uiStrings = profile.data.ui || {};
      
      if (lang) {
        debugLog(`UI Module - Processing language '${lang}' for UI translations`);
        debugLog(`UI Module - UI strings found for '${lang}':`, Object.keys(uiStrings).length);
      }
      
      if (lang && Object.keys(uiStrings).length > 0) {
        // Create language translations if they don't exist
        if (!translations[lang]) {
          translations[lang] = {};
        }
        
        // Add all UI strings directly to the language translations
        Object.keys(uiStrings).forEach(key => {
          let value = uiStrings[key];
          
          // Replace year in footer.copyright with current year
          if (key === 'footer.copyright' && typeof value === 'string') {
            // Replace {year} placeholder with current year
            value = value.replace('{year}', currentYear.toString());
          }
          
          translations[lang][key] = value;
        });
        
        debugLog(`UI Module - Added translations for language '${lang}'`);
      } else if (lang) {
        debugLog(`UI Module - No UI translations found for language '${lang}'`);
      }
    }
    
    // Also update the default translations
    if (translations.default && translations.default['footer.copyright']) {
      const currentYear = new Date().getFullYear();
      translations.default['footer.copyright'] = translations.default['footer.copyright']
        .replace('{year}', currentYear.toString());
    }
    
    debugLog('UI Module - Loaded translations for languages:', Object.keys(translations));
    return translations;
  } catch (error) {
    debugLog('Error loading UI translations:', error);
    // Use ui.default here as well
    return { default: { ...ui.default } };
  }
} 