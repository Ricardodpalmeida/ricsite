export function onRequest({ request, url, locals }, next) {
  // Normalize URL path (handle double slashes and similar issues)
  const normalizedPath = url.pathname.replace(/\/+/g, '/');

  // List of allowed routes/paths
  const allowedPaths = [
    '/',
    '/about',
    '/blog',
    '/en',
    '/pt',
    '/en/about',
    '/pt/about',
    '/en/blog',
    '/pt/blog',
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
                       normalizedPath.endsWith('.svg');
  
  // Allow access to static assets
  if (isStaticAsset) {
    return next();
  }
  
  // Specific patterns to block (exact matches for critical files)
  const blockedPatterns = [
    '/src/content/profile/data.json',
    '/content/profile/data.json',
    '/profile/data.json',
    '/data.json'
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
    'data.json'
  ];
  
  for (const keyword of restrictedKeywords) {
    if (normalizedPath.includes(keyword)) {
      return new Response('Not Found', { status: 404 });
    }
  }
  
  // Check if the current path is allowed
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
  
  // If the path is allowed, continue with normal processing
  if (isAllowedPath) {
    return next();
  }
  
  // For disallowed paths, return 404
  return new Response('Not Found', { status: 404 });
} 