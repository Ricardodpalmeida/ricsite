import fs from 'fs';
import path from 'path';

// Cache for the supported languages (so we don't read from disk on every request)
let cachedLanguages = null;

// Dynamically determine available languages from profile JSON files
function getAvailableLanguages() {
  // Return cached languages if already determined
  if (cachedLanguages) {
    console.log('Middleware - Using cached languages:', cachedLanguages);
    return cachedLanguages;
  }

  try {
    const profileDir = path.resolve('./src/content/profile');
    console.log('Middleware - Looking for profile files in:', profileDir);
    
    // Check if directory exists
    if (!fs.existsSync(profileDir)) {
      console.warn('Profile directory not found:', profileDir);
      cachedLanguages = ['en']; // Default fallback
      return cachedLanguages;
    }
    
    // Read directory and filter for JSON files
    const allFiles = fs.readdirSync(profileDir);
    console.log('Middleware - All files in profile directory:', allFiles);
    
    const files = allFiles
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    console.log('Middleware - Filtered language codes:', files);
    
    // Ensure we have at least the default language
    if (!files.includes('en')) {
      files.unshift('en'); // Add at the beginning to prioritize
      console.log('Middleware - Added missing default language (en) at the beginning');
    } else {
      // If 'en' exists but is not first, move it to the front
      const enIndex = files.indexOf('en');
      if (enIndex > 0) {
        files.splice(enIndex, 1); // Remove 'en'
        files.unshift('en'); // Add at beginning
        console.log('Middleware - Moved default language (en) to the beginning of the list');
      }
    }
    
    console.log('Middleware - Detected languages from profile files:', files);
    cachedLanguages = files;
    return files;
  } catch (error) {
    console.error('Error detecting languages in middleware:', error);
    cachedLanguages = ['en']; // Default fallback
    return cachedLanguages;
  }
}

export function onRequest({ request, url, locals }, next) {
  // Normalize URL path (handle double slashes and similar issues)
  const normalizedPath = url.pathname.replace(/\/+/g, '/');
  
  // Debug logging for troubleshooting
  console.log(`Middleware handling request for: ${normalizedPath}`);

  // Dynamically get supported languages
  const supportedLanguages = getAvailableLanguages();
  console.log('Middleware - Supported languages:', supportedLanguages);
  
  // Extract the first segment of the path to check if it's a language code
  const pathSegments = normalizedPath.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const isLanguagePath = supportedLanguages.includes(firstSegment);
  console.log(`First segment: "${firstSegment}", Is language path: ${isLanguagePath}`);
  
  // For language paths, always allow them if the language is supported
  if (isLanguagePath) {
    console.log(`Allowing supported language path: ${normalizedPath}`);
    return next();
  }
  
  // List of allowed routes/paths patterns
  const allowedPaths = [
    '/',
    '/blog',
    '/about',
    '/404',
    '/robots.txt',
    '/.well-known',
    '/sitemap.xml',
    '/rss.xml'
  ];
  
  // Check for static assets (like CSS, JS, fonts, etc.)
  const isStaticAsset = normalizedPath.includes('/_assets/') || 
                       normalizedPath.includes('/fonts/') || 
                       normalizedPath.endsWith('.css') || 
                       normalizedPath.endsWith('.js') || 
                       normalizedPath.endsWith('.ico') || 
                       normalizedPath.endsWith('.png') || 
                       normalizedPath.endsWith('.jpg') || 
                       normalizedPath.endsWith('.svg') ||
                       normalizedPath.endsWith('.webp') ||
                       normalizedPath.endsWith('.json');
  
  // Allow access to static assets
  if (isStaticAsset) {
    return next();
  }
  
  // Generate restricted keywords based on languages
  const restrictedKeywords = [
    '/content/',
    '/src/content/',
    '/profile/',
    'data.json',
  ];
  
  // Add language-specific JSON files to restricted keywords
  supportedLanguages.forEach(lang => {
    restrictedKeywords.push(`${lang}.json`);
  });
  
  // Check if the path contains restricted content keywords
  for (const keyword of restrictedKeywords) {
    if (normalizedPath.includes(keyword)) {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  // Generate blocked patterns for each language
  const blockedPatterns = [
    '/src/content/profile/data.json',
    '/content/profile/data.json',
    '/profile/data.json',
    '/data.json',
  ];
  
  // Add language-specific patterns
  supportedLanguages.forEach(lang => {
    blockedPatterns.push(`/src/content/profile/${lang}.json`);
    blockedPatterns.push(`/content/profile/${lang}.json`);
    blockedPatterns.push(`/profile/${lang}.json`);
    blockedPatterns.push(`/${lang}.json`);
  });

  // Check for exact blocked paths
  for (const pattern of blockedPatterns) {
    if (normalizedPath === pattern || normalizedPath.includes(pattern)) {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  // Allow access to favicon
  if (normalizedPath === '/favicon.ico' || normalizedPath === '/favicon.svg') {
    return next();
  }
  
  // For non-language paths, check if the path is in the allowed list
  const isAllowedPath = allowedPaths.some(path => {
    // Exact match
    if (normalizedPath === path) {
      return true;
    }
    
    // Blog post paths (allow any path under /blog/)
    if (path.includes('/blog') && normalizedPath.includes('/blog/')) {
      return true;
    }
    
    // Check for nested paths under allowed main sections
    if (path !== '/' && normalizedPath.startsWith(path + '/')) {
      return true;
    }
    
    return false;
  });
  
  if (isAllowedPath) {
    return next();
  }
  
  // For disallowed paths, return 404
  return new Response('Not Found', { status: 404 });
} 