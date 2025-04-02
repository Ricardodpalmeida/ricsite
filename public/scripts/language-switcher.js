// Optimize language switching to prevent flashes
document.addEventListener('DOMContentLoaded', () => {
  console.log('Language switcher script loaded');
  const langLinks = document.querySelectorAll('[data-lang-link]');
  
  console.log(`Found ${langLinks.length} language links:`, 
    Array.from(langLinks).map(link => `${link.dataset.langLink}: ${link.getAttribute('href')}`));
  
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      console.log(`Language link clicked: ${link.dataset.langLink}, href: ${href}`);
      
      // Only handle if it's not the current language and not a # href
      if (!link.classList.contains('active') && href !== '#') {
        e.preventDefault();
        
        // Create a smooth transition effect
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.2s ease';
        
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