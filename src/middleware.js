export function onRequest({ request, url, locals }, next) {
  // Normalize URL path (handle double slashes and similar issues)
  const normalizedPath = url.pathname.replace(/\/+/g, '/');

  // List of supported languages
  const supportedLanguages = ['en', 'pt'];
  
  // Extract the first segment of the path to check if it's a language code
  const pathSegments = normalizedPath.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const isLanguagePath = supportedLanguages.includes(firstSegment);
  
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
  
  // Specific patterns to block (exact matches for critical files)
  const blockedPatterns = [
    '/src/content/profile/data.json',
    '/content/profile/data.json',
    '/profile/data.json',
    '/data.json',
    '/src/content/profile/en.json',
    '/content/profile/en.json',
    '/profile/en.json',
    '/en.json',
    '/src/content/profile/pt.json',
    '/content/profile/pt.json',
    '/profile/pt.json',
    '/pt.json'
  ];

  // Check for exact blocked paths
  for (const pattern of blockedPatterns) {
    if (normalizedPath === pattern || normalizedPath.includes(pattern)) {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  // Check if the path contains restricted content keywords
  const restrictedKeywords = [
    '/content/',
    '/src/content/',
    '/profile/',
    'data.json',
    'en.json',
    'pt.json'
  ];
  
  for (const keyword of restrictedKeywords) {
    if (normalizedPath.includes(keyword)) {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  // Allow access to favicon
  if (normalizedPath === '/favicon.ico' || normalizedPath === '/favicon.svg') {
    return next();
  }
  
  // For language paths, check if the path after the language code is allowed
  if (isLanguagePath) {
    const pathWithoutLang = '/' + pathSegments.slice(1).join('/');
    
    // If it's just a language prefix with nothing after it, allow it (e.g., /en, /pt)
    if (pathWithoutLang === '/') {
      return next();
    }
    
    // Check if the path without language is in the allowed paths
    const isAllowedPath = allowedPaths.some(path => {
      // Exact match
      if (pathWithoutLang === path) {
        return true;
      }
      
      // Blog post paths (allow any path under /blog/)
      if (path.includes('/blog') && pathWithoutLang.includes('/blog/')) {
        return true;
      }
      
      // Check for nested paths under allowed main sections
      if (path !== '/' && pathWithoutLang.startsWith(path + '/')) {
        return true;
      }
      
      return false;
    });
    
    if (isAllowedPath) {
      return next();
    }
  } else {
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
  }
  
  // For disallowed paths, return 404
  return new Response('Not Found', { status: 404 });
} 