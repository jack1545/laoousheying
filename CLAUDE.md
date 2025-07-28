# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 photography portfolio website for photographer Ou Weijian (欧伟建), a member of the China Photographers Association. The site showcases his 30+ years of photography work with galleries, tutorials, and blog posts. It's built with internationalization support for Chinese (default) and English.

## Architecture

### Framework & Technologies
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **next-intl** for internationalization (Chinese/English)
- **React 18** with client/server components

### Project Structure
- `src/app/` - App Router pages and layouts
  - `[locale]/` - Internationalized routes (zh/en)
  - Root layout handles basic HTML structure and metadata
  - Locale layout provides i18n context and site navigation
- `src/components/` - Reusable React components (Navbar, Footer, ImageModal)
- `src/data/` - JSON configuration files for content
- `src/i18n/` - Internationalization configuration
- `messages/` - Translation files (zh.json, en.json)
- `public/images/` - Static image assets organized by category

### Internationalization
- Default locale: Chinese (`zh`)
- Supported locales: Chinese (`zh`), English (`en`)
- Routes automatically prefixed with locale (e.g., `/en/galleries`)
- Middleware handles locale routing and redirects
- Content is statically stored in JSON files, not translated

### Content Management
Photography content is managed through JSON files:
- `galleries.json` - Photo galleries with metadata (title, description, photos)
- `photographer.json` - Photographer bio, awards, exhibitions
- `blog.json` - Blog posts and photography notes
- `tutorials.json` - Photography tutorials and courses

Each gallery contains structured photo data with titles, descriptions, dates, and locations.

## Common Development Commands

```bash
# Development
npm run dev              # Start development server on http://localhost:3000

# Building
npm run build           # Production build with linting
npm run build:dev       # Production build without linting

# Production
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
```

## Blog Management Admin Panel

The project includes a comprehensive blog and tutorial management backend at `/admin` with the following features:

### Admin Routes
- `/admin` - Unified blog post and tutorial list with category filtering
- `/admin/new` - Create new blog post or tutorial
- `/admin/edit/[slug]` - Edit existing blog post or tutorial

### Features
- **Unified Content Management**: Manages both blog posts (`blog.json`) and tutorials (`tutorials.json`)
- **Rich Text Editor**: Integrated ReactQuill editor for content creation
- **Category Support**: Automatic handling of blog posts vs tutorials
- **Tutorial-Specific Fields**: 
  - Course order (`order`) for sequential tutorial arrangement
  - Related images array for tutorial illustrations
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Auto Slug Generation**: Automatic URL slug generation from post titles
- **Category Filtering**: Filter content by "摄影手记" (blog) or "摄影教程" (tutorial)
- **Responsive Design**: Mobile-friendly admin interface
- **Form Validation**: Client-side validation for required fields

### Data Structure
The system manages two separate JSON files:
- `src/data/blog.json` - Regular blog posts (摄影手记)
- `src/data/tutorials.json` - Photography tutorials (摄影教程)

### Tutorial Management
- **Course Ordering**: Tutorials can be assigned an `order` number for sequential display
- **Visual Indicators**: Tutorial entries show course numbers in the admin list
- **Image Management**: Support for multiple related images per tutorial
- **Automatic Sorting**: Tutorials are automatically sorted by order in the tutorial JSON file

### Admin API Endpoints
- `GET /api/admin/posts` - Fetch all blog posts and tutorials combined
- `POST /api/admin/posts` - Create new blog post or tutorial (auto-detected by category)
- `GET /api/admin/posts/[slug]` - Fetch single post/tutorial from either file
- `PUT /api/admin/posts/[slug]` - Update post/tutorial in appropriate file
- `DELETE /api/admin/posts/[slug]` - Delete post/tutorial from appropriate file

### Admin Components
- `BlogForm` - Enhanced form component supporting both blog and tutorial fields
- `RichTextEditor` - ReactQuill-based rich text editor
- Admin layout with sidebar navigation and category filtering

## Key Implementation Details

### Routing Structure
- `/` - Chinese homepage
- `/en` - English homepage  
- `/[locale]/galleries` - Photo galleries listing
- `/[locale]/galleries/[slug]` - Individual gallery pages
- `/[locale]/blog` - Photography blog
- `/[locale]/about` - About photographer
- `/[locale]/contact` - Contact information

### Image Organization
Images are organized in `public/images/` by category:
- `gallery/[category]/` - Gallery photos by category (coastal-scenery, sunset-twilight, etc.)
- `blog/` - Blog post featured images
- Root level contains photographer avatar and site assets

### Component Architecture
- **Navbar**: Responsive navigation with language switching
- **Footer**: Site footer with contact information  
- **ImageModal**: Modal component for gallery image viewing
- Layouts handle metadata, SEO, and page structure

### Data Flow
- Static JSON files serve as content database
- Components import and filter data based on routes
- No external CMS or database dependencies
- Images referenced by relative paths in JSON

## Development Notes

### Adding New Galleries
1. Add images to `public/images/gallery/[category]/`
2. Update `galleries.json` with new gallery data structure
3. Ensure photos array includes all required metadata fields

### Internationalization Updates
- Add new translation keys to `messages/zh.json` and `messages/en.json`
- Use `useTranslations()` hook in components
- Locale-specific routes handled automatically by middleware

### SEO Configuration
- Metadata configured in layout files with full OpenGraph and Twitter Card support
- Sitemap generated automatically from routes
- Image optimization handled by Next.js Image component