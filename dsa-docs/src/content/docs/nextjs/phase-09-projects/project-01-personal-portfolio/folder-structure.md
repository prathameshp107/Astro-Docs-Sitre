# Folder Structure

Understanding the project structure is essential for navigating and maintaining your portfolio efficiently. This overview explains the purpose of each directory and file in your Next.js portfolio application.

## Overview

Following Next.js 13+ App Router conventions, the project organizes code by functionality and feature rather than by file type. This makes it easier to locate related code as your project grows.

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout shared by all pages
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── projects/
│   │   ├── page.tsx            # Projects index page
│   │   └── [id]/               # Dynamic route for individual projects
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   └── blog/                   # Optional blog section
│       ├── page.tsx            # Blog index
│       └── [slug]/             # Dynamic route for blog posts
│           └── page.tsx
├── components/
│   ├── layout/                 # Layout components (header, footer, etc.)
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/                     # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── label.tsx
│   └── sections/               # Page sections and components
│       ├── hero.tsx
│       ├── about.tsx
│       ├── project-card.tsx
│       ├── project-grid.tsx
│       ├── contact-form.tsx
│       ├── blog-post-list.tsx
│       └── blog-post-content.tsx
├── lib/
│   ├── data.ts                 # Static data (skills, experience, etc.)
│   ├── utils.ts                # Utility functions
│   └── blog.ts                 # Blog post handling (if implemented)
├── public/
│   ├── images/                 # Static images
│   │   ├── profile.jpg
│   │   ├── project1-thumb.jpg
│   │   └── ...
│   └── icons/                  # SVG icons
├── styles/
│   └── globals.css             # Global CSS styles
├── README.md                   # Project documentation
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── .eslintrc.json              # ESLint configuration
```

## Detailed Explanation

### App Directory (`/app`)
The heart of your Next.js application using the App Router.

#### Route Segments
Each folder inside `/app` represents a route segment:
- `app/page.tsx` → `/` (home page)
- `app/about/page.tsx` → `/about`
- `app/projects/page.tsx` → `/projects`
- `app/projects/[id]/page.tsx` → `/projects/:id` (dynamic route)
- `app/contact/page.tsx` → `/contact`

#### Special Files
- `layout.tsx`: Defines UI shared by multiple routes. The root layout wraps the entire application.
- `loading.js`/`loading.tsx`: Shows UI while content loads (optional).
- `error.js`/`error.tsx`: Error boundary for handling route errors (optional).
- `not-found.js`/`not-found.tsx`: Custom 404 page (optional).
- `route.ts`: Route handlers for API endpoints (alternative to pages/api).

### Components Directory (`/components`)
Reusable UI elements organized by concern.

#### Layout Components
Components that define the page structure:
- `header.tsx`: Site navigation and branding
- `footer.tsx`: Footer content and links

#### UI Components
Primitive, reusable building blocks following atomic design principles:
- `button.tsx`: Custom button component with variants
- `card.tsx`: Container component for displaying content
- `input.tsx`: Form input with labels and validation states
- `textarea.tsx`: Multi-line text input
- `label.tsx`: Form label component
- `avatar.tsx`: User image display
- `badge.tsx`: Status indicators and tags

#### Section Components
Larger, page-specific sections that combine multiple UI components:
- `hero.tsx`: Main homepage introduction section
- `about.tsx`: About me content section
- `project-card.tsx`: Individual project display in grids
- `project-grid.tsx`: Layout for displaying multiple projects
- `contact-form.tsx`: Form for visitor inquiries
- `blog-post-list.tsx`: Listing of blog posts
- `blog-post-content.tsx`: Individual blog post display

### Lib Directory (`/lib`)
Utilities, helpers, and data files used across the application.

#### Data Files
- `data.ts`: Contains static information like:
  - Personal information (name, bio, contact)
  - Skills and technologies arrays
  - Professional experience timeline
  - Education details
  - Project metadata (titles, descriptions, technologies)
  - Social media links

#### Utility Functions
- `utils.ts`: Helper functions used throughout the app:
  - Date formatters
  - String utilities (truncation, slugification)
  - Array helpers (filtering, sorting, grouping)
  - Type guards and validators
  - SEO helper functions

#### Blog Handling (Optional)
- `blog.ts`: Functions for working with blog content:
  - Reading markdown files
  - Converting markdown to HTML
  - Extracting frontmatter (title, date, tags)
  - Sorting and filtering posts

### Public Directory (`/public`)
Static assets served directly by the web server.

#### Images
Optimized images for your projects and profile:
- Profile picture
- Project screenshots/thumbnails
- Logos of technologies used
- Decorative illustrations

#### Icons
SVG icons for social media, technologies, and UI elements:
- Social media logos (GitHub, LinkedIn, Twitter)
- Technology icons (React, Node.js, etc.)
- UI icons (menu, search, close)

### Styles Directory (`/styles`)
Global CSS and styling configurations.

#### Global Styles
- `globals.css`: CSS that applies to the entire application:
  - Base styles (reset, typography)
  - CSS variables for theme colors
  - Global utility classes
  - Animation definitions
  - Print stylesheet

### Configuration Files
Essential setup files for your development environment and build process.

#### Next.js Configuration
- `next.config.js`: Customizes Next.js behavior:
  - Image domains and formats
  - Experimental features
  - Rewrites and redirects
  - Webpack configuration
  - Environment variables

#### Tailwind CSS Configuration
- `tailwind.config.ts`: Customizes Tailwind:
  - Theme extensions (colors, fonts, spacing)
  - Plugin configuration
  - Content paths for purging
  - Custom utilities

#### TypeScript Configuration
- `tsconfig.json`: TypeScript compiler options:
  - Strict mode settings
  - Path aliases
  - Module resolution
  - JSX configuration

#### Package Management
- `package.json`: Project metadata and dependencies:
  - Name, version, description
  - Scripts (dev, build, start, lint)
  - Dependencies (React, Next.js, etc.)
  - DevDependencies (TypeScript, ESLint, etc.)

#### Linting Configuration
- `.eslintrc.json`: Code quality rules:
  - React and JSX rules
  - TypeScript-specific rules
  - Accessibility guidelines
  - Code formatting preferences

## Navigation Tips

### Finding Files Quickly
1. **By Route**: To find a page file, convert the URL path to folder structure
   - `/projects/web App` → `app/projects/web-app/page.tsx`
   - `/blog/nextjs-tips` → `app/blog/nextjs-tips/page.tsx`

2. **By Component Type**: 
   - UI primitives → `/components/ui/`
   - Layout elements → `/components/layout/`
   - Page sections → `/components/sections/`

3. **By Function**:
   - Data constants → `/lib/data.ts`
   - Helper functions → `/lib/utils.ts`
   - Styles → `/styles/globals.css`

### Common Operations
- **Adding a new page**: Create a folder in `/app` with the page name and add `page.tsx`
- **Adding a reusable component**: Place in appropriate `/components` subfolder
- **Adding shared logic**: Create a function in `/lib/utils.ts`
- **Adding global styles**: Edit `/styles/globals.css`
- **Adding images**: Place in `/public/images/` and reference with `/images/filename.jpg`

## Best Practices for Organization

### Keep Related Code Together
Group files that change together:
- Keep component styles with the component (if using CSS modules)
- Place test files alongside the component they test
- Group API routes with the features they serve

### Use Clear, Consistent Naming
- Use kebab-case for files and folders (`project-card.tsx`)
- Use descriptive names that indicate purpose
- Avoid abbreviations unless they're widely understood
- Name files after their primary export (`Button.tsx` exports a Button component)

### Maintain Shallow Nesting
- Avoid deeply nested folder structures
- Aim for no more than 3-4 levels deep
- Consider flattening if you find yourself navigating too deep

### Document Exceptions
- If you deviate from the standard structure, document why
- Add README files to complex directories explaining their purpose
- Keep the main README updated with project structure changes

## Scaling Your Project

As your portfolio grows, consider these organizational improvements:

### Feature-Based Grouping
Instead of separating by type, group by feature:
```
app/
  projects/
    components/
    lib/
    utils/
  blog/
    components/
    lib/
```

### Module Boundaries
As complexity increases:
- Split large components into smaller ones
- Move complex logic to custom hooks
- Extract reusable utilities to separate packages
- Consider micro-frontend approaches for very large applications

### Maintenance Practices
- Regularly audit dependencies for updates
- Remove unused files and code
- Keep documentation in sync with implementation
- Refactor when you notice duplication or complexity

Remember: The goal of your folder structure is to make it easier for you (and collaborators) to find and modify code. When in doubt, prioritize clarity and consistency over rigid adherence to any particular pattern.