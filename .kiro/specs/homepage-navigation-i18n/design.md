# Design Document

## Overview

This design addresses multiple critical issues with the photography portfolio website by implementing a comprehensive solution that integrates the existing Navbar and Footer components with the homepage, extends the translation system to cover all homepage content, fixes incorrect link paths throughout the site, and adds proper image integration for blog content and tutorials. The solution leverages the existing next-intl infrastructure while ensuring consistent user experience across all pages.

## Architecture

### Component Integration
- **Homepage Layout**: Integrate the existing Navbar and Footer components into the homepage layout
- **Translation Provider**: Ensure the homepage has access to the next-intl translation context
- **Responsive Design**: Maintain existing responsive behavior for both navigation and content
- **Footer Integration**: Add Footer component to complete the page layout

### Translation System Extension
- **Message Files**: Extend existing en.json and zh.json with homepage-specific translations
- **Translation Keys**: Implement hierarchical translation keys for organized content management
- **Fallback Strategy**: Implement graceful fallbacks for missing translations
- **Footer Translations**: Add footer-specific translation keys for both languages

### Link Path Correction
- **Locale-Aware URLs**: Update all hardcoded links to use proper locale prefixes
- **Navigation Consistency**: Ensure all navigation maintains locale context
- **Footer Links**: Update footer links to use correct locale-aware paths

### Image Integration
- **Blog Placeholder Images**: Integrate images from public/images for blog section
- **Tutorial Content Images**: Add image integration for tutorial articles
- **Image Optimization**: Ensure proper image loading and optimization

## Components and Interfaces

### Modified Components

#### 1. Homepage Component (`src/app/page.tsx`)
```typescript
// Key modifications:
- Import and integrate Navbar and Footer components
- Wrap content with translation provider context
- Replace hardcoded Chinese text with translation keys
- Update all hardcoded links to use locale-aware paths
- Integrate placeholder images for blog section
- Maintain existing styling and functionality
```

#### 2. Footer Component (`src/components/Footer.tsx`)
```typescript
// Key modifications:
- Add translation support using useTranslations hook
- Update all hardcoded links to use locale-aware paths
- Replace hardcoded Chinese text with translation keys
- Maintain existing styling and responsive behavior
```

#### 3. Translation Files (`messages/en.json`, `messages/zh.json`)
```json
// Extended translation structure:
{
  "Homepage": {
    "hero": {
      "title": "...",
      "subtitle": "...",
      "galleryButton": "...",
      "aboutButton": "..."
    },
    "featuredPhotos": {
      "title": "...",
      "subtitle": "...",
      "viewMore": "..."
    },
    "blog": {
      "title": "...",
      "subtitle": "...",
      "blogPost": "...",
      "readMore": "...",
      "viewAllPosts": "..."
    }
    // ... additional sections
  },
  "Footer": {
    "brandName": "...",
    "brandTagline": "...",
    "quickLinks": "...",
    "galleries": "...",
    "about": "...",
    "blog": "...",
    "contact": "...",
    "copyright": "...",
    "rightsReserved": "...",
    "builtBy": "..."
  }
}
```

#### 4. Tutorial Data (`src/data/tutorials.json`)
```typescript
// Enhanced tutorial structure:
- Add image references for each tutorial
- Include featured images from corresponding folders
- Maintain existing content structure
- Add image paths for tutorial content integration
```

### Layout Structure

#### Navigation Integration
- Position Navbar at the top of the homepage
- Ensure proper z-index layering with hero section
- Maintain existing navigation functionality and styling

#### Content Sections
1. **Hero Section**: Translate title, subtitle, and call-to-action buttons
2. **Featured Photos Section**: Translate section headers and descriptions
3. **Featured Galleries Section**: Translate section content
4. **About Preview Section**: Translate photographer bio and descriptions
5. **Blog Section**: Translate section headers and placeholder content
6. **CTA Section**: Translate call-to-action content

## Data Models

### Translation Key Structure
```typescript
interface HomepageTranslations {
  hero: {
    title: string;
    subtitle: string;
    galleryButton: string;
    aboutButton: string;
  };
  featuredPhotos: {
    title: string;
    subtitle: string;
    clickToEnlarge: string;
    viewMore: string;
  };
  featuredGalleries: {
    title: string;
    subtitle: string;
    photosCount: string;
    viewAll: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    learnMore: string;
    photographerWorkPhoto: string;
  };
  blog: {
    title: string;
    subtitle: string;
    blogPost: string;
    readMore: string;
    viewAllPosts: string;
  };
  cta: {
    title: string;
    subtitle: string;
    contactButton: string;
  };
}
```

### Component Props
```typescript
interface HomepageProps {
  // No additional props needed - translations handled via next-intl hooks
}
```

## Error Handling

### Translation Fallbacks
- **Missing Translation Keys**: Display translation key as fallback
- **Translation Context Unavailable**: Use default Chinese text
- **Malformed Translation Files**: Log errors and use fallback text

### Navigation Integration
- **Component Import Errors**: Graceful degradation without navigation
- **Routing Issues**: Ensure proper locale-aware routing
- **Mobile Responsiveness**: Maintain existing mobile navigation behavior

## Testing Strategy

### Unit Tests
1. **Translation Integration**: Test that all translation keys resolve correctly
2. **Component Rendering**: Verify Navbar renders properly on homepage
3. **Language Switching**: Test language switching functionality from homepage
4. **Responsive Behavior**: Test mobile navigation integration

### Integration Tests
1. **Navigation Flow**: Test navigation from homepage to other pages
2. **Locale Persistence**: Verify locale persists across page navigation
3. **Translation Loading**: Test translation loading and fallback behavior

### Visual Regression Tests
1. **Layout Consistency**: Ensure navigation doesn't break existing layout
2. **Mobile Responsiveness**: Verify mobile layout remains intact
3. **Cross-browser Compatibility**: Test navigation display across browsers

### Accessibility Tests
1. **Keyboard Navigation**: Ensure navigation is keyboard accessible
2. **Screen Reader Compatibility**: Test with screen readers
3. **Focus Management**: Verify proper focus handling in navigation

## Implementation Considerations

### Performance
- **Translation Loading**: Leverage existing next-intl static loading
- **Component Rendering**: Minimal impact on existing homepage performance
- **Image Loading**: Maintain existing image optimization

### SEO
- **Meta Tags**: Ensure proper meta tags for both languages
- **URL Structure**: Maintain existing locale-based URL structure
- **Content Indexing**: Ensure translated content is properly indexed

### Maintenance
- **Translation Management**: Clear process for adding new translations
- **Component Updates**: Ensure navigation updates don't break homepage
- **Content Updates**: Easy process for updating homepage content in both languages