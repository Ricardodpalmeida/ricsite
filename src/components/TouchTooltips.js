/**
 * TouchTooltips.js
 * 
 * A script that handles touch interactions for tooltips on touch devices.
 * This enhances the CSS-based tooltips to work with touch events (tap to show/hide).
 */

/**
 * Initialize touch-based tooltip functionality for skill items
 */
export function initTouchTooltips() {
  // Only run on touch devices
  if (!('ontouchstart' in window)) return;
  
  // Get all skill items with tooltips
  const skillItems = document.querySelectorAll('.skill-item[data-description]');
  
  if (!skillItems.length) return;
  
  // Track the currently open tooltip
  let activeTooltip = null;
  
  // Close any open tooltip 
  const closeActiveTooltip = () => {
    if (activeTooltip) {
      activeTooltip.classList.remove('tooltip-active');
      activeTooltip = null;
    }
  };
  
  // Add the tooltip-active class to show the tooltip
  // The CSS will handle the actual visibility
  const handleTouch = (e) => {
    e.preventDefault();
    
    const target = e.currentTarget;
    
    // If this tooltip is already active, close it
    if (activeTooltip === target) {
      closeActiveTooltip();
      return;
    }
    
    // Close any active tooltip
    closeActiveTooltip();
    
    // Open this tooltip
    target.classList.add('tooltip-active');
    activeTooltip = target;
  };
  
  // Add touch event handlers to each skill item
  skillItems.forEach(item => {
    item.addEventListener('touchstart', handleTouch);
    
    // Add tabindex to make items focusable for assistive technologies
    if (!item.hasAttribute('tabindex')) {
      item.setAttribute('tabindex', '0');
    }
  });
  
  // Close tooltip when tapping elsewhere on the page
  document.addEventListener('touchstart', (e) => {
    // If the tap is not on a skill item, close any open tooltip
    if (!e.target.closest('.skill-item')) {
      closeActiveTooltip();
    }
  });
  
  // Add CSS for tooltip-active class
  const style = document.createElement('style');
  style.textContent = `
    .skill-item.tooltip-active::after,
    .skill-item.tooltip-active::before {
      opacity: 1 !important;
      visibility: visible !important;
      transform: translateX(-50%) scale(1) !important;
    }
    
    .skill-item.tooltip-active::before {
      bottom: 114% !important;
    }
    
    /* Mobile-specific positioning for tooltip-active */
    @media (max-width: 768px) {
      .skill-item.tooltip-active::after {
        transform: translateX(0) scale(1) !important;
      }
      
      .skill-item.tooltip-active:nth-child(3n+2)::after,
      .skill-item.tooltip-active:nth-child(3n)::after {
        transform: translateX(0) scale(1) !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Log initialization
  console.log('Touch tooltips initialized for', skillItems.length, 'elements');
}

// Auto-initialize when the DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initTouchTooltips);
}

export default initTouchTooltips; 