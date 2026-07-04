---
title: "Personal Portfolio"
description: "Welcome to your first real-world Next.js project! In this project, you'll build a professional portfolio website to showcase your skills, projects, and exp"
---

# Personal Portfolio

## Introduction

Welcome to your first real-world Next.js project! In this project, you'll build a professional portfolio website to showcase your skills, projects, and experience. This is often the first application developers create when entering the job market, making it both practical and essential for your career.

## Project Goal

Create a responsive, modern portfolio website that demonstrates your abilities as a developer while learning essential Next.js concepts.

## Real-World Use Case

Professional developers use portfolio websites to:
- Showcase their best work to potential employers
- Demonstrate technical skills through live examples
- Share their background and experience
- Provide contact information for opportunities
- Establish their personal brand online

## Project Overview

Your portfolio will include:
- A home page with introduction and featured projects
- An about section detailing your background and skills
- A projects section showcasing your work
- A contact form for visitors to reach you
- Responsive design that works on mobile and desktop
- Optional: Blog section to share your thoughts and learning journey

## Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── ui/
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   └── input.tsx
│   └── sections/
│       ├── hero.tsx
│       ├── about.tsx
│       ├── project-card.tsx
│       └── contact-form.tsx
├── lib/
│   ├── utils.ts
│   └── data.ts
├── public/
│   └── images/
└── styles/
    └── globals.css
```

## Implementation

### 1. Project Setup

Start by creating a new Next.js project with TypeScript and Tailwind CSS:

```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint
cd portfolio
```

### 2. Creating the Layout

Create a root layout that includes your navigation and footer:

```tsx
// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Name - Developer Portfolio',
  description: 'A portfolio showcasing my projects and skills as a developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 3. Building the Home Page

Create an engaging home page that introduces visitors to you and your work:

```tsx
// app/page.tsx
import Hero from '@/sections/hero';
import RecentProjects from '@/sections/recent-projects';
import CallToAction from '@/sections/call-to-action';

export default function Home() {
  return (
    <main>
      <Hero />
      <RecentProjects />
      <CallToAction />
    </main>
  );
}
```

### 4. Creating Reusable Components

Build reusable UI components that maintain consistency across your site:

```tsx
// components/ui/card.tsx
import { CN } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ 
  className = '', 
  children 
}: CardProps) {
  return (
    <div className={CN(
      'bg-white rounded-lg shadow-md p-6',
      className
    )}>
      {children}
    </div>
  );
}
```

### 5. Implementing the Projects Section

Create a dynamic route to showcase individual projects:

```tsx
// app/projects/page.tsx
import ProjectGrid from '@/sections/project-grid';
import { projects } from '@/lib/data';

export default function ProjectsPage() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Projects
        </h2>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
```

```tsx
// app/projects/[id]/page.tsx
import { notFound } from 'next/navigation';
import ProjectDetails from '@/sections/project-details';
import { projects } from '@/lib/data';

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetails project={project} />;
}
```

### 6. Adding a Contact Form

Create a contact form using Server Actions for form handling:

```tsx
// app/contact/page.tsx
import ContactForm from '@/sections/contact-form';

export default function ContactPage() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Get In Touch
        </h2>
        <ContactForm />
      </div>
    </section>
  );
}
```

```tsx
// app/actions.ts
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(
  prevState: unknown,
  formData: FormData
) {
  const result = contactFormSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'Please fix the errors above.',
    };
  }
 ̀// Here you would typically send the data to an email service or database
  // For demo purposes, we'll just log it
  console.log('Contact form submission:', result.data);
  
  return {
    success: true,
    message: 'Thank you for your message! I\'ll get back to you soon.',
  };
}
```

### 7. Adding a Blog Section (Optional)

Create a Markdown-powered blog using the `app/router` for dynamic routes:

```tsx
// app/blog/page.tsx
import BlogPostList from '@/sections/blog-post-list';
import { getAllBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Blog
        </h2>
        <BlogPostList posts={posts} />
      </div>
    </section>
  );
}
```

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BlogPostContent from '@/sections/blog-post-content';
import { getBlogPostBySlug } from '@/lib/blog';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogPostContent post={post} />;
}
```

## Best Practices

### Code Organization
- Keep components small and focused on a single responsibility
- Use meaningful names for components and functions
- Group related files together in folders
- Separate concerns: components, logic, and data

### Performance Optimization
- Use Next.js Image component for optimized images
- Implement lazy loading for images and components
- Leverage static generation where possible
- Minimize client-side JavaScript when server-side rendering suffices

### Accessibility
- Use semantic HTML elements
- Ensure proper color contrast
- Include alt text for images
- Make sure all interactive elements are keyboard accessible
- Use ARIA labels when necessary

### SEO Best Practices
- Use descriptive page titles and meta descriptions
- Implement proper heading hierarchy (H1, H2, H3)
- Add structured data where appropriate
- Create a sitemap.xml and robots.txt
- Use descriptive URLs and file names

## Common Mistakes to Avoid

### Over-engineering
- Don't add complexity you don't need
- Start simple and add features as needed
- Use built-in Next.js features before reaching for external libraries

### Ignoring Mobile Users
- Always test on mobile devices
- Use responsive design principles
- Consider touch interactions in addition to mouse clicks

### Neglecting Performance
- Optimize images before uploading
- Use the Next.js Image component
- Bundle analyze your code to identify large dependencies
- Implement proper caching strategies

### Poor Code Organization
- Don't put everything in one file
- Follow a consistent naming convention
- Separate concerns clearly
- Document complex logic

## Summary

Congratulations on building your first portfolio website with Next.js! You've learned how to:

- Set up a Next.js project with TypeScript and Tailwind CSS
- Create layouts and reusable components
- Implement dynamic routing for projects and blog posts
- Handle form submissions with Server Actions
- Optimize for performance and accessibility
- Follow best practices for code organization

This portfolio serves as both a learning project and a professional tool you can actually use to showcase your work. As you continue your journey, consider adding features like:
- Dark mode toggle
- Animated transitions between pages
- Integration with your GitHub to show recent activity
- Multi-language support
- Analytics to track visitors

## Related Topics

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod for Form Validation](https://zod.dev/)
- [Accessibility in React](https://react.dev/learn/accessibility)