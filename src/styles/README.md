# CSS Architecture

## Overview
This project follows a structured CSS architecture:
- `design-system.css` - Core variables and tokens
- `utilities.css` - Reusable utility classes
- `global.css` - Base element styling
- `/components/` - Component-specific styles
- `/pages/` - Page-specific styles

## Import Guidelines
- All CSS files should import `design-system.css`
- Component styles should only be imported by their respective components
- Utility classes should be used instead of duplicating common styles

## Available Utilities
- Container classes: `.container`, `.container--narrow`, etc.
- Error messages: `.error-message`, `.notice-message`, etc.
- Animations: `.fade-in` (defined in utilities.css)
- Spacing utilities: `.mt-*`, `.mb-*`, etc.
- Media utilities: `.img-full`, `.iframe-rounded`, etc.

## Component Documentation
Components should document their CSS dependencies in the component file:

```astro
---
/**
 * Component Name
 * 
 * CSS Dependencies:
 * - styles/components/component-name.css
 */
import '../styles/components/component-name.css';
// Component code...
---
```

## CSS Variable Usage
- Always use CSS variables from `design-system.css` for colors, spacing, and typography
- Never use hardcoded values for colors, use the variables
- Example: `color: var(--color-white);` instead of `color: #ffffff;`

## CSS/JS Interactions
Some components have JavaScript interactions with CSS:
- Tooltips rely on data-tooltip attributes and :hover pseudo-class
- Notifications use JS to toggle the 'visible' class
- Carousels use JS for animation and transition effects
- Mobile menus toggle 'active' class for showing/hiding

## Animations
- Use predefined animations from utilities.css where possible
- Keep transition durations consistent with var(--transition-fast) or var(--transition-slow)
- Add 'will-change' property for performance-critical animations

## CSS File Organization
```
/src/styles/
  ├── design-system.css        # Design tokens and variables
  ├── global.css               # Base element styling
  ├── utilities.css            # Reusable utility classes
  ├── README.md                # This documentation
  ├── components/              # Component-specific styles
  │   ├── page-header.css
  │   ├── skill-pill.css
  │   ├── notification.css
  │   ├── carousel.css
  │   ├── card.css
  │   └── photo-gallery.css
  └── pages/                   # Page-specific styles
      ├── home.css
      ├── blog.css
      ├── profile.css
      ├── side-projects.css
      ├── certifications.css
      └── skills-technologies.css
``` 