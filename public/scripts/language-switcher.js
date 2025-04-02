// Optimize language switching to prevent flashes
document.addEventListener('DOMContentLoaded', () => {
  console.log('Language switcher script loaded');
  const langLinks = document.querySelectorAll('[data-lang-link]');
  
  // Get current language from HTML tag
  const currentLang = document.documentElement.lang;
  console.log(`Current language detected from HTML: ${currentLang}`);
  
  console.log(`Found ${langLinks.length} language links:`, 
    Array.from(langLinks).map(link => `${link.dataset.langLink}: ${link.getAttribute('href')}`));
  
  // Verify all language links are working correctly
  const langWarnings = [];
  
  langLinks.forEach(link => {
    const linkLang = link.dataset.langLink;
    const href = link.getAttribute('href');
    
    // Check for potential issues
    if (!href || href === '') {
      langWarnings.push(`Warning: Empty href for language ${linkLang}`);
    } else if (href === '#' && !link.classList.contains('active')) {
      langWarnings.push(`Warning: Non-active link with # href for language ${linkLang}`);
    } else if (href.includes('undefined')) {
      langWarnings.push(`Warning: Undefined in URL for language ${linkLang}: ${href}`);
    }
    
    // Special checks for languages that might need special handling (like Chinese)
    if (linkLang === 'zh' && href !== '#') {
      console.log(`Chinese language link detected: ${href}`);
    }
  });
  
  // Log any warnings
  if (langWarnings.length > 0) {
    console.warn('Language switcher warnings:', langWarnings);
  }
  
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkLang = link.dataset.langLink;
      const href = link.getAttribute('href');
      console.log(`Language link clicked: ${linkLang}, href: ${href}`);
      
      // Only handle if it's not the current language and not a # href
      if (!link.classList.contains('active') && href !== '#') {
        e.preventDefault();
        
        // Create a smooth transition effect
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.2s ease';
        
        // Add special handling for Chinese if needed
        const isChineseLang = linkLang === 'zh';
        if (isChineseLang) {
          console.log('Switching to Chinese language');
          // Force UTF-8 encoding in the URL
          const encodedHref = href.replace('/zh/', encodeURIComponent('/zh/').replace(/%2F/g, '/'));
          console.log(`Original href: ${href}, encoded: ${encodedHref}`);
        }
        
        // Navigate after a very short delay to allow transition to start
        console.log(`Navigating to: ${href}`);
        setTimeout(() => {
          window.location.href = href;
        }, 50);
      } else {
        console.log('Link is active or href is #, not handling click');
      }
    });
  });
}); 