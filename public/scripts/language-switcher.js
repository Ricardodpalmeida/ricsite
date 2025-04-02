// Optimize language switching to prevent flashes
document.addEventListener('DOMContentLoaded', () => {
  const langLinks = document.querySelectorAll('[data-lang-link]');
  
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only handle if it's not the current language and not a # href
      if (!link.classList.contains('active') && link.getAttribute('href') !== '#') {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Create a smooth transition effect
        document.body.style.opacity = '0.8';
        document.body.style.transition = 'opacity 0.2s ease';
        
        // Navigate after a very short delay to allow transition to start
        setTimeout(() => {
          window.location.href = href;
        }, 50);
      }
    });
  });
}); 