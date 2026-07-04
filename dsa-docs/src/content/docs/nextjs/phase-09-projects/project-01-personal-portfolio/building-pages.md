---
title: "Building Pages"
description: "Step-by-step guide to building each page of your portfolio."
---

# Building Pages

## Introduction

With your project set up and folder structure in place, it's time to build the actual pages. This guide walks through each page from the Home page to the contact form, explaining key Next.js patterns along the way.

## Home Page (`/`)

The home page is your first impression. Keep it clean and focused.

```tsx
// app/page.tsx
import Hero from '@/components/sections/hero'
import FeaturedProjects from '@/components/sections/featured-projects'
import SkillsShowcase from '@/components/sections/skills-showcase'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
    </>
  )
}
```

**Key points:**
- The home page is a Server Component by default — zero JavaScript sent to the browser for static content
- Each section is a separate component, making the page easy to maintain
- Sections like `Hero` and `FeaturedProjects` are composed together here

### Hero Section

```tsx
// components/sections/hero.tsx
import Link from 'next/link'
import { personalInfo } from '@/lib/data'

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Hi, I'm {personalInfo.name}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        {personalInfo.tagline}
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View My Work
        </Link>
        <Link
          href="/contact"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-400 transition"
        >
          Get In Touch
        </Link>
      </div>
    </section>
  )
}
```

## About Page (`/about`)

Share your background, skills, and experience.

```tsx
// app/about/page.tsx
import Image from 'next/image'
import SkillBadge from '@/components/ui/skill-badge'
import { skills, experience } from '@/lib/data'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Image
            src="/images/profile.jpg"
            alt="Profile photo"
            width={200}
            height={200}
            className="rounded-full"
          />
          <p className="text-lg text-gray-600 leading-relaxed">
            {/* Bio content from data file */}
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-6 border-l-2 border-blue-500 pl-4">
            <h3 className="font-semibold">{exp.role}</h3>
            <p className="text-gray-500">{exp.company} · {exp.period}</p>
            <p className="mt-2">{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
```

## Projects Page (`/projects`)

Display your work with a filterable grid.

### Static Data

```ts
// lib/data.ts
export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'A full-stack task management app with drag-and-drop.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    image: '/images/task-manager.jpg',
    liveUrl: 'https://task-manager.example.com',
    repoUrl: 'https://github.com/username/task-manager',
  },
  // Add more projects...
]
```

### Dynamic Route Page

```tsx
// app/projects/[id]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/data'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/projects" className="text-blue-600 hover:underline mb-4 block">
        ← Back to Projects
      </Link>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <Image
        src={project.image}
        alt={project.title}
        width={800}
        height={450}
        className="rounded-lg mb-8"
      />
      <p className="text-lg mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map(tech => (
          <span key={tech} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} className="border px-4 py-2 rounded hover:bg-gray-50">
            Source Code
          </a>
        )}
      </div>
    </article>
  )
}
```

## Contact Page (`/contact`)

Build a functional contact form with Server Actions.

### Server Action

```ts
// lib/actions.ts
'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function submitContact(prevState: unknown, formData: FormData) {
  const validated = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  // In production: send email via Resend, SendGrid, etc.
  console.log('Contact:', validated.data)

  return { success: true, message: 'Thanks! I\'ll get back to you soon.' }
}
```

### Contact Form Component

```tsx
// components/sections/contact-form.tsx
'use client'

import { useActionState } from 'react'
import { submitContact } from '@/lib/actions'

const initialState = { errors: {}, message: '' }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)

  return (
    <form action={formAction} className="max-w-lg mx-auto">
      {state.success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">{state.message}</p>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
        <input id="name" name="name" className="w-full border rounded p-2" />
        {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input id="email" name="email" type="email" className="w-full border rounded p-2" />
        {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1 font-medium">Message</label>
        <textarea id="message" name="message" rows={5} className="w-full border rounded p-2" />
        {state.errors?.message && <p className="text-red-500 text-sm">{state.errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

## Best Practices

- Use Server Components for static content — zero JavaScript overhead
- Extract data to separate files (`lib/data.ts`) for easy editing
- Use `next/image` for all images with explicit dimensions
- Create reusable UI components (buttons, cards, badges)
- Keep form handling and client interactivity in Client Components only

## Common Mistakes

- **Putting all projects in one file** — Use a data file (`lib/data.ts`) instead
- **Not handling the loading state** — Always show loading feedback for async operations
- **Missing error boundaries** — Add `error.tsx` and `not-found.tsx` for production readiness
- **Using `<img>` instead of `<Image>`** — `next/image` provides automatic optimization

## Summary

Each page of your portfolio demonstrates a different Next.js pattern: static content (Home), data display (About, Projects), dynamic routing (project details), and form handling with Server Actions (Contact). Together, they form a complete, real-world application.

## Related Topics

- [Project Overview](./project-overview)
- [Folder Structure](./folder-structure)
- [Deployment](./deployment)
- [Improvements](./improvements)
