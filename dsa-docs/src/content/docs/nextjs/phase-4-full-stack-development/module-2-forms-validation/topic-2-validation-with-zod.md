---
title: "Validation with Zod"
description: "Zod is a TypeScript-first schema validation library. It lets you define the shape of your data once, then infer types, validate inputs, and generate error"
---

# Validation with Zod

## Introduction

Zod is a TypeScript-first schema validation library. It lets you define the shape of your data once, then infer types, validate inputs, and generate error messages — all with full type safety.

## Why Zod for Next.js?

- Type inference from schemas — no duplicate type definitions
- Server-side and client-side validation with the same schema
- Composable schemas for complex forms
- Great error message formatting
- Works naturally with Server Actions

## Basic Schema

```ts
// lib/schemas/user.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  age: z.coerce.number().min(18, 'Must be 18 or older').max(120),
  role: z.enum(['user', 'admin', 'moderator']).default('user'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
```

## Using Zod in Server Actions

```ts
// app/actions/users.ts
"use server"

import { createUserSchema } from '@/lib/schemas/user'

export async function createUser(prevState: unknown, formData: FormData) {
  const parsed = createUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    age: formData.get('age'),
    role: formData.get('role'),
  })
  
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    
    return {
      errors: fieldErrors,
      message: 'Validation failed'
    }
  }
  
  // parsed.data is fully typed as CreateUserInput
  await db.user.create({ data: parsed.data })
  revalidatePath('/users')
  
  return { message: 'User created successfully' }
}
```

## Composing Schemas

```ts
// lib/schemas/post.ts
import { z } from 'zod'

const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
})

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title too short').max(100, 'Title too long'),
  content: z.string().min(10, 'Content too short').max(10000),
  published: z.coerce.boolean(),
  tags: z.array(tagSchema).max(5).optional(),
  metadata: z.object({
    excerpt: z.string().max(200).optional(),
    coverImage: z.string().url().optional(),
  }).optional(),
})

export const updatePostSchema = createPostSchema.partial()
```

## Custom Validators

```ts
import { z } from 'zod'

// Password with custom validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100)
  .refine(
    (val) => /[A-Z]/.test(val),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (val) => /[0-9]/.test(val),
    'Password must contain at least one number'
  )

// Refine with multiple fields
export const registerSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
```

## Async Validation

```ts
export const userSchema = z.object({
  email: z.string().email().refine(
    async (email) => {
      const existing = await db.user.findUnique({ where: { email } })
      return !existing
    },
    { message: 'Email already registered' }
  ),
  username: z.string().min(3).refine(
    async (username) => {
      const existing = await db.user.findUnique({ where: { username } })
      return !existing
    },
    { message: 'Username taken' }
  ),
})
```

## Shared Schemas (Client + Server)

```ts
// lib/schemas/product.ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.coerce.number().positive('Price must be positive'),
  description: z.string().max(2000).optional(),
  category: z.enum(['electronics', 'clothing', 'food', 'other']),
  inStock: z.coerce.boolean(),
})

export type ProductFormData = z.infer<typeof productSchema>
```

```tsx
// app/products/create/page.tsx
"use client"

import { productSchema, type ProductFormData } from '@/lib/schemas/product'
import { createProduct } from './actions'

export default function CreateProductForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  async function handleSubmit(formData: FormData) {
    const parsed = productSchema.safeParse({
      name: formData.get('name'),
      price: formData.get('price'),
      description: formData.get('description'),
      category: formData.get('category'),
      inStock: formData.get('inStock'),
    })
    
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }
    
    setErrors({})
    await createProduct(parsed.data)
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="Product name" />
      {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
      
      <input name="price" type="number" step="0.01" placeholder="Price" />
      {errors.price && <p className="text-red-500">{errors.price[0]}</p>}
      
      <button type="submit">Create Product</button>
    </form>
  )
}
```

## Common Mistakes

- **Forgetting `z.coerce` for form inputs** — FormData values are strings. Use `z.coerce.number()` to parse numeric inputs.
- **No custom error messages** — Default Zod messages are generic. Always provide meaningful error messages.
- **Only validating on client** — Always validate on the server too. Client validation is for UX, server validation is for security.
- **Not refining with `path`** — When using `.refine()` on multiple fields, specify the `path` for correct error placement.

## Best Practices

- Define schemas in a shared `lib/schemas/` directory
- Use `z.coerce` for values coming from FormData
- Use `safeParse` over `parse` to handle errors gracefully
- Compose schemas with `.partial()`, `.pick()`, `.omit()` for update operations
- Add descriptive error messages for better UX

## Summary

Zod provides type-safe validation with automatic TypeScript type inference. Define schemas once, share them between client and server, and use `safeParse` in Server Actions for structured error handling. Always validate server-side — client validation is a UX bonus, not a security measure.

## Related Topics

- [Advanced Form Patterns](./topic-1-advanced-form-patterns.md)
- [React Hook Form Integration](./topic-3-react-hook-form-integration.md)
- [Server Actions (Phase 3)](../../phase-3-rendering-data-fetching/module-5-server-actions/topic-4-error-handling-and-best-practices.md)
