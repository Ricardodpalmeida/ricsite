// Handle Sentry errors gracefully - prevent console errors for blocked requests
window.sentryErrorHandler = function() {
  // Monkey patch fetch to gracefully handle failed Sentry requests
  const originalFetch = window.fetch;
  window.fetch = async function(url, options) {
    try {
      return await originalFetch(url, options);
    } catch (error) {
      // Only log if it's not a Sentry URL being blocked
      if (!String(url).includes('sentry.io') && 
          !String(url).includes('ingest.sentry.io') && 
          !String(url).includes('o22381.ingest.us.sentry.io')) {
        console.error('Fetch error:', error);
      }
      // Return empty response to prevent cascading errors
      return new Response(JSON.stringify({ status: "ok" }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
};
window.sentryErrorHandler(); 