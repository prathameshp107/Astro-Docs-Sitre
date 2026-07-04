# React Hook Form Integration

## Introduction

React Hook Form (RHF) provides performant form state management with minimal re-renders. Combined with Zod and Server Actions, it gives you a complete form solution: client-side validation with instant feedback, typed form data, and server-side submission.

## Setup

```bash
npm install react-hook-form @hookform/resolvers
```

## Basic Integration

```tsx
"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createUser } from './actions'

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  age: z.coerce.number().min(18, 'Must be 18+'),
})

type FormData = z.infer<typeof schema>

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  
  async function onSubmit(data: FormData) {
    const result = await createUser(data)
    
    if (result.serverError) {
      setError('email', { message: result.serverError })
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register('age')} className="border p-2 w-full" />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

```ts
// app/actions.ts
"use server"

export async function createUser(data: { name: string; email: string; age: number }) {
  const existing = await db.user.findUnique({ where: { email: data.email } })
  
  if (existing) {
    return { serverError: 'This email is already registered' }
  }
  
  await db.user.create({ data })
  revalidatePath('/users')
  
  return { success: true }
}
```

## RHF with Server Actions (form action)

RHF also works with the `form action` prop and `useActionState`:

```tsx
"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useActionState } from 'react'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  
  const [state, formAction, isPending] = useActionState(createPost, null)
  
  return (
    {/* formAction handles the actual submission via Server Action */}
    <form action={formAction} onSubmit={handleSubmit(() => {})} className="space-y-4">
      <input {...register('title')} placeholder="Title" />
      {errors.title && <span>{errors.title.message}</span>}
      
      <textarea {...register('content')} placeholder="Content" />
      {errors.content && <span>{errors.content.message}</span>}
      
      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  )
}
```

## Complex Forms with RHF

### Arrays (useFieldArray)

```tsx
"use client"

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const invoiceSchema = z.object({
  customer: z.string().min(1),
  items: z.array(z.object({
    name: z.string().min(1),
    quantity: z.coerce.number().positive(),
    price: z.coerce.number().positive(),
  })).min(1),
})

export default function InvoiceForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { items: [{ name: '', quantity: 1, price: 0 }] }
  })
  
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('customer')} placeholder="Customer name" />
      
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input {...register(`items.${index}.name`)} placeholder="Item" />
          <input {...register(`items.${index}.quantity`)} type="number" className="w-20" />
          <input {...register(`items.${index}.price`)} type="number" className="w-24" />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      
      <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
        Add Item
      </button>
      
      <button type="submit">Create Invoice</button>
    </form>
  )
}
```

## Common RHF Patterns

| Pattern | Implementation |
|---------|---------------|
| **Conditional fields** | Use `watch()` to react to field values |
| **Async validation** | `register('email', { validate: checkEmailExists })` |
| **Form dirty state** | `formState.isDirty` — track unsaved changes |
| **Field-level errors** | `formState.errors.fieldName.message` |
| **Reset after submit** | `formState.isSubmitSuccessful` + `reset()` |

```tsx
// Conditional field example
function OrderForm() {
  const { register, watch } = useForm()
  const country = watch('country')
  
  return (
    <>
      <select {...register('country')}>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </select>
      
      {country === 'us' && (
        <input {...register('state')} placeholder="State" />
      )}
      
      {country === 'ca' && (
        <input {...register('province')} placeholder="Province" />
      )}
    </>
  )
}
```

## Common Mistakes

- **Not using `zodResolver`** — Manual validation in `onSubmit` defeats RHF's purpose. Use the resolver for automatic validation.
- **Forgetting `name` with `register()`** — The `name` prop is required for form state tracking.
- **Mixing uncontrolled and controlled inputs** — RHF works best with uncontrolled inputs. Use `Controller` for custom controlled components.
- **Not handling server errors** — Use `setError` to surface server validation errors in the form.

## Best Practices

- Always use `zodResolver` for type-safe validation
- Use `useFieldArray` for dynamic field lists
- Use `watch()` for conditional rendering based on form values
- Handle server errors with `setError` to keep error UI consistent
- Disable submit button during `isSubmitting` or `isPending`

## Summary

React Hook Form provides performant form management with minimal re-renders. Use `zodResolver` for validation, `useFieldArray` for dynamic fields, and combine it with Server Actions for a complete form solution. Always handle both client-side validation (for UX) and server-side validation (for security).

## Related Topics

- [Advanced Form Patterns](./topic-1-advanced-form-patterns.md)
- [Validation with Zod](./topic-2-validation-with-zod.md)
- [Server Actions (Phase 3)](../../phase-3-rendering-data-fetching/module-5-server-actions/)
