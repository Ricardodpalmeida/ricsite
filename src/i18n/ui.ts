// src/i18n/ui.ts
import { getCollection } from 'astro:content';

// Add a utility function to conditionally log based on environment
const isDev = import.meta.env.DEV;
const debugLog = (message: string, ...args: any[]) => {
  if (isDev) {
    console.log(message, ...args);
  }
};

// Language code to full name mapping for accessibility
export const languageNames: Record<string, string> = {
  'en': 'English',
  'pt': 'Português',
  'es': 'Español',
  'zh': '中文',
  'hi': 'हिन्दी',
  'ar': 'اللغة العربية',
  'bn': 'বাংলা',
  'ru': 'Русский',
  'ja': '日本語',
  'pa': 'ਪੰਜਾਬੀ',
  'jv': 'basa Jawa',
  'de': 'Deutsch',
  'ko': '한국어',
  'fr': 'Français',
  'te': 'తెలుగు',
  'mr': 'मराठी',
  'tr': 'Türkçe',
  'ta': 'தமிழ்',
  'vi': 'Tiếng Việt',
  'ur': 'اردو',
  'ms': 'Bahasa Malaysia',
  'id': 'Bahasa Indonesia',
  'it': 'Italiano',
  'fa': 'فارسی',
  'gu': 'ગુજરાતી',
  'pl': 'Polski',
  'uk': 'Українська',
  'ro': 'Română',
  'nl': 'Nederlands',
  'th': 'ไทย',
  'yo': 'Yorùbá',
  'ha': 'هَوُسَ',
  'ps': 'پښتو',
  'uz': 'Oʻzbekcha',
  'sv': 'Svenska',
  'am': 'አማርኛ',
  'hu': 'magyar',
  'el': 'Ελληνικά',
  'cs': 'čeština',
  'sw': 'Kiswahili',
  'om': 'Afaan Oromoo',
  'he': 'עברית',
  'fi': 'suomi',
  'bg': 'български език',
  'my': 'ဗမာစာ',
  'km': 'ខេមរភាសា',
  'ne': 'नेपाली',
  'si': 'සිංහල',
  'sk': 'slovenčina',
  'af': 'Afrikaans'
};

// Initialize languages with at least English available by default
// This ensures we always have 'en' available even before async initialization
export let languages: Record<string, string> = {
  'en': languageNames['en'] || 'English'
};

// Default language - can be overridden in environment
export const defaultLang = 'en';

// Function to load available languages dynamically from profile JSON files
export async function loadLanguages() {
  try {
    debugLog('UI Module - Starting loadLanguages()');
    const profileCollection = await getCollection('profile');
    debugLog('UI Module - Retrieved profile collection with', profileCollection.length, 'entries');
    
    // Log each profile entry
    profileCollection.forEach((profile, index) => {
      debugLog(`UI Module - Profile [${index}]:`, {
        id: profile.id,
        language: profile.data.language,
        hasUi: !!profile.data.ui
      });
    });
    
    const detectedLanguages = {} as Record<string, string>;
    
    // Ensure English is ALWAYS available as the default
    detectedLanguages[defaultLang] = languageNames[defaultLang] || defaultLang;
    debugLog(`UI Module - Added default language '${defaultLang}' with name '${detectedLanguages[defaultLang]}'`);
    
    // Create language map from profile files
    profileCollection.forEach(profile => {
      const lang = profile.data.language;
      if (lang && lang !== defaultLang) { // Skip default language (already added)
        // Use the full language name if available, otherwise fallback to code
        detectedLanguages[lang] = languageNames[lang] || lang;
        debugLog(`UI Module - Added language '${lang}' with display name '${detectedLanguages[lang]}'`);
      }
    });
    
    // If languages were found, update the global languages object
    if (Object.keys(detectedLanguages).length > 0) {
      // Update the global languages object with detected values
      languages = detectedLanguages;
      debugLog('UI Module - Available languages detected:', Object.keys(languages));
      return detectedLanguages;
    }
    
    // Fallback with default languages if nothing was detected
    debugLog('No languages detected from profile files, using default languages');
    
    // Default fallback languages, ensure at least English is available
    const fallbackLanguages = {} as Record<string, string>;
    
    // Always include English as the primary fallback
    fallbackLanguages[defaultLang] = languageNames[defaultLang] || defaultLang;
    debugLog(`UI Module - Added default language '${defaultLang}' with name '${fallbackLanguages[defaultLang]}'`);
    
    // Add any other common fallbacks if their names are defined
    const fallbackCodes = ['pt', 'es', 'fr', 'de', 'zh'];
    fallbackCodes.forEach(code => {
      if (code !== defaultLang && languageNames[code]) { // Skip default (already added)
        fallbackLanguages[code] = languageNames[code];
        debugLog(`UI Module - Added fallback language '${code}' with display name '${fallbackLanguages[code]}'`);
      }
    });
    
    languages = fallbackLanguages;
    debugLog('UI Module - Default languages used:', Object.keys(languages));
    return languages;
  } catch (error) {
    debugLog('Error loading languages:', error);
    
    // Ensure we at least have English available as the first language
    const errorFallbackLanguages = {} as Record<string, string>;
    errorFallbackLanguages[defaultLang] = languageNames[defaultLang] || defaultLang;
    debugLog(`UI Module - Added error fallback default language '${defaultLang}'`);
    
    // Add a few more common languages if possible
    ['pt', 'es', 'fr', 'de', 'zh'].forEach(code => {
      if (code !== defaultLang && languageNames[code]) { // Skip default (already added)
        errorFallbackLanguages[code] = languageNames[code];
        debugLog(`UI Module - Added error fallback language '${code}' with display name '${errorFallbackLanguages[code]}'`);
      }
    });
    
    languages = errorFallbackLanguages;
    debugLog('UI Module - Fallback languages used after error:', Object.keys(languages));
    return languages;
  }
}


// Default fallback UI strings (English)
export const defaultUIStrings: Record<string, string> = {
  'lang.switchTo': 'Switch to {0}',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'footer.copyright': `© {year} Ricardo Almeida. All rights reserved.`,
  'error.profileData': 'Profile data could not be loaded.',
  'blog.title': 'Blog',
  'blog.updated': 'Updated',
  'blog.noPostsMessage': 'No posts available in this language.',
  'blog.back': '← Back to Blog',
  'blog.postedBy': 'Posted by',
  'blog.readingTime': 'min read',
  'blog.shareText': 'Share this post',
  'blog.shareOnX': 'Share on X',
  'blog.shareOnLinkedIn': 'Share on LinkedIn',
  'blog.shareOnFacebook': 'Share on Facebook',
  'blog.notAvailableInLanguage': '{0} version of this post is not available',
  'blog.redirectedToDefault': 'You have been redirected to the English version',
  'carousel.previous': 'Previous set',
  'carousel.next': 'Next set',
  'carousel.previousPlaylist': 'Previous playlist',
  'carousel.nextPlaylist': 'Next playlist',
  'modal.close': 'Close modal',
  'modal.previousPhoto': 'Previous photo',
  'modal.nextPhoto': 'Next photo',
    'about.title': 'About',
    'profile.experience': 'Experience',
    'profile.education': 'Education',
  'profile.skills': 'Skills',
  'profile.technologies': 'Technologies',
  'profile.and': 'and',
    'profile.certifications': 'Certifications',
    'profile.grade': 'Grade',
    'profile.thesis': 'Thesis',
    'profile.issued': 'Issued',
  'profile.verifyCertificate': 'Verify Certificate'
};

// Initialize ui with default values - will be populated at runtime
export let ui: Record<string, Record<string, string>> = {
  default: { ...defaultUIStrings }
};

// Function to load UI translations from profile files
export async function loadUITranslations(): Promise<Record<string, Record<string, string>>> {
  try {
    debugLog('UI Module - Starting loadUITranslations()');
    const profileCollection = await getCollection('profile');
    debugLog('UI Module - Retrieved profile collection with', profileCollection.length, 'entries for UI translations');
    
    const translations: Record<string, Record<string, string>> = {
      default: { ...defaultUIStrings }
    };
    
    // Load translations from each profile
    for (const profile of profileCollection) {
      const lang = profile.data.language;
      const uiStrings = profile.data.ui || {};
      
      if (lang) {
        debugLog(`UI Module - Processing language '${lang}' for UI translations`);
        debugLog(`UI Module - UI strings found for '${lang}':`, Object.keys(uiStrings).length);
      }
      
      if (lang && Object.keys(uiStrings).length > 0) {
        translations[lang] = { ...uiStrings };
        debugLog(`UI Module - Added translations for language '${lang}'`);
      } else if (lang) {
        debugLog(`UI Module - No UI translations found for language '${lang}'`);
      }
    }
    
    debugLog('UI Module - Loaded translations for languages:', Object.keys(translations));
    return translations;
  } catch (error) {
    debugLog('Error loading UI translations:', error);
    return { default: { ...defaultUIStrings } };
  }
}

// Dynamic initialization of UI translations and languages
// This will run once at server startup time
(async function initialize() {
  debugLog('UI Module - Initializing languages and translations...');
  try {
    // Load languages first - must be done before translations
    const availableLanguages = await loadLanguages();
    
    // Then load UI translations
    ui = await loadUITranslations();
    
    debugLog('UI Module - Successfully loaded languages:', Object.keys(languages));
    debugLog('UI Module - Available languages:', Object.keys(availableLanguages));
  } catch (error) {
    debugLog('Failed to initialize languages and translations:', error);
  }
})();

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
  // Always default to English when running on server or navigator is undefined
  if (typeof navigator === 'undefined') {
    debugLog('Browser language detection: running on server, defaulting to en');
    return 'en';
  }
  
  try {
    // Get browser language
    const browserLang = navigator.language?.split('-')[0];
    debugLog(`Browser language detected: ${browserLang}`);
    
    // Check if browser language is directly supported
    if (browserLang && (browserLang in languages)) {
      debugLog(`Browser language ${browserLang} is supported, using it`);
      return browserLang;
    }
    
    // Always fall back to English if language not supported
    debugLog(`Browser language ${browserLang} not supported, falling back to en`);
    return 'en';
  } catch (error) {
    // Catch any errors in language detection and default to English
    debugLog('Error in browser language detection:', error);
    return 'en';
  }
}

// Load profile data for a specific language to use as UI strings
export async function getProfileStrings(lang: string): Promise<Record<string, string>> {
  try {
    debugLog(`UI Module - Loading profile strings for language: ${lang}`);
    
    // Get profile data for the given language
    const profileCollection = await getCollection('profile', (entry) => entry.data.language === lang);
    debugLog(`UI Module - Found ${profileCollection.length} profile entries for language: ${lang}`);
    
    const profile = profileCollection.length > 0 ? profileCollection[0] : null;
    
    if (!profile) {
      debugLog(`UI Module - No profile data found for language: ${lang}`);
      return {} as Record<string, string>;
    }
    
    // Create a default structure with site property
    const defaultProfile = {
      language: lang,
      personal: {
        name: 'Ricardo Almeida',
        title: '',
      },
      site: {
        siteName: 'Ricbits',
        siteDescription: '',
      },
      hero: [],
      technologies: [],
    };
    
    // Merge with actual profile data
    const profileData = { 
      ...defaultProfile, 
      ...profile.data,
      site: {
        ...defaultProfile.site,
        ...(profile.data.site || {})
      }
    };
    
    // Get translations for generic fields based on language
    const translations = getGenericTranslations(lang);

    // Prepare UI strings from profile data
    const profileStrings: Record<string, string> = {
      'site.title': profileData.site?.siteName ? `${profileData.site.siteName} - ${profileData.site.siteDescription}` : `${profileData.personal?.name || 'Ricardo Almeida'} | ${profileData.personal?.title || ''}`,
      'site.description': profileData.site?.siteDescription || profileData.hero?.join(' ') || '',
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
    debugLog(`Error loading profile strings for ${lang}:`, error);
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