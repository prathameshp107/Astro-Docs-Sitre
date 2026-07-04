---
title: "Module 4: Styling in Next.js"
description: "---"
---

# Module 4: Styling in Next.js

## Introduction
Styling is a crucial aspect of any web application. Next.js provides multiple styling approaches out of the box, giving developers the flexibility to choose the method that best fits their project. From CSS Modules for component-scoped styles to Tailwind CSS for utility-first design, from global CSS for site-wide styles to CSS-in-JS for dynamic styling — Next.js supports them all with zero configuration.

## Why this topic exists
A well-styled application not only looks professional but also provides a better user experience. Understanding the various styling approaches in Next.js helps you choose the right tool for the right job and avoid common pitfalls that lead to CSS conflicts, performance issues, and maintenance nightmares.

## Learning objectives
By the end of this module, you will be able to:
- Use CSS Modules for component-scoped styling
- Apply global CSS for site-wide styles
- Integrate and configure Tailwind CSS in a Next.js project
- Use styled-jsx for scoped CSS-in-JS
- Configure Sass/SCSS for advanced styling workflows
- Choose the right styling approach for different scenarios
- Avoid common CSS conflicts in Next.js applications

## Prerequisites
- Basic knowledge of CSS (selectors, properties, media queries)
- Completed Phase 1 Modules 1-3
- Understanding of React components and JSX
- Familiarity with npm packages

## Learning roadmap
This module covers the following topics:
1. CSS Modules in Next.js
2. Global Styles and Custom CSS
3. Tailwind CSS Integration
4. CSS-in-JS with styled-jsx
5. Sass and CSS Preprocessors

## Topics covered
- CSS Modules and how they prevent style conflicts
- The `*.module.css` naming convention
- Global stylesheets and the `_app.js` entry point
- Tailwind CSS setup and configuration with `tailwind.config.js`
- styled-jsx for scoped CSS-in-JS
- Sass/SCSS support and variables
- Component-scoped vs global styles
- Styling best practices for production applications
- CSS class naming conventions and organization

## Estimated learning time
8-10 hours to complete all topics and exercises.

## Real-world applications
- Component libraries with scoped styles
- Marketing sites using Tailwind CSS for rapid development
- Design systems using CSS Modules for encapsulation
- Multi-brand applications using CSS custom properties
- Enterprise apps with Sass architecture (7-1 pattern)

## Practice exercises
- Style a navigation component using CSS Modules
- Build a responsive grid using Tailwind CSS
- Create a theme switcher using CSS custom properties
- Implement a styled button component with styled-jsx
- Organize Sass partials for a multi-page application

## Mini Projects
- **Component Library**: Build 5 reusable components (Button, Card, Input, Badge, Modal) using CSS Modules
- **Landing Page Clone**: Recreate a landing page using Tailwind CSS
- **Themed Dashboard**: Build a dashboard with dark/light theme support using CSS custom properties

## Related Topics
- React Component Design
- Responsive Design Principles
- CSS Architecture (BEM, SMACSS, 7-1 Pattern)
- Design Systems
- Animation with CSS and Framer Motion

---

## Topic 1: CSS Modules in Next.js

Next.js has built-in support for CSS Modules. Any CSS file ending with `.module.css` is treated as a CSS Module, providing automatic scoping of styles to the component that imports them.

## Topic 2: Global Styles and Custom CSS

Global stylesheets apply to the entire application. In Next.js, you import global CSS in the `_app.js` file (Pages Router) or in the root `layout.tsx` (App Router).

## Topic 3: Tailwind CSS Integration

Tailwind CSS is a utility-first CSS framework that integrates seamlessly with Next.js. It provides low-level utility classes for rapid UI development.

## Topic 4: CSS-in-JS with styled-jsx

styled-jsx is a CSS-in-JS library built into Next.js that provides scoped styles with zero configuration.

## Topic 5: Sass and CSS Preprocessors

Next.js supports Sass out of the box. Install the `sass` package and use `.scss` or `.sass` files for advanced styling workflows.
