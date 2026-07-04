---
title: "Advanced Form Patterns"
description: "Beyond basic form submissions, real applications need multi-step forms, dynamic field arrays, file uploads, and optimistic updates. This topic covers these"
---

# Advanced Form Patterns

## Introduction

Beyond basic form submissions, real applications need multi-step forms, dynamic field arrays, file uploads, and optimistic updates. This topic covers these patterns with Server Actions.

## Multi-Step Forms

```tsx
"use client"

import { useState } from 'react'
import { useActionState } from 'react'
import { submitApplication } from './actions'

const steps = ['Personal Info', 'Experience', 'Review']

export default function JobApplicationForm() {
  const [step, setStep] = useState(0)
  const [state, formAction, isPending] = useActionState(submitApplication, null)
  
  return (
    <form action={formAction} className="max-w-lg mx-auto">
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className={`px-3 py-1 rounded text-sm ${
            i === step ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}>
            {s}
          </div>
        ))}
      </div>
      
      {step === 0 && (
        <fieldset>
          <input name="name" placeholder="Full Name" required />
          <input name="email" type="email" placeholder="Email" required />
        </fieldset>
      )}
      
      {step === 1 && (
        <fieldset>
          <textarea name="experience" placeholder="Describe your experience" />
          <input name="resume" type="file" accept=".pdf" />
        </fieldset>
      )}
      
      {step === 2 && (
        <fieldset>
          <p className="text-gray-600">Review your information before submitting.</p>
          {/* Display summary of entered data */}
        </fieldset>
      )}
      
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button type="button" onClick={() => setStep(s => s - 1)}>
            Previous
          </button>
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => setStep(s => s + 1)}>
            Next
          </button>
        ) : (
          <button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </form>
  )
}
```

The form collects all data across steps but submits once. Each step progressively adds to the FormData sent to the Server Action.

## Dynamic Field Arrays

```tsx
"use client"

import { useState } from 'react'

export default function InvoiceForm() {
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }])
  
  function addItem() {
    setItems(prev => [...prev, { name: '', quantity: 1, price: 0 }])
  }
  
  function removeItem(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }
  
  return (
    <form action={submitInvoice} className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-end">
          <input
            name={`item-name-${index}`}
            placeholder="Item name"
            defaultValue={item.name}
          />
          <input
            name={`item-quantity-${index}`}
            type="number"
            defaultValue={item.quantity}
            className="w-20"
          />
          <input
            name={`item-price-${index}`}
            type="number"
            step="0.01"
            defaultValue={item.price}
            className="w-24"
          />
          <button type="button" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
      
      <button type="button" onClick={addItem}>
        + Add Item
      </button>
      
      <button type="submit">Create Invoice</button>
    </form>
  )
}
```

```ts
// app/actions/invoice.ts
"use server"

export async function submitInvoice(formData: FormData) {
  const items = []
  
  for (let i = 0; ; i++) {
    const name = formData.get(`item-name-${i}`)
    if (!name) break
    
    items.push({
      name: name as string,
      quantity: Number(formData.get(`item-quantity-${i}`)),
      price: Number(formData.get(`item-price-${i}`)),
    })
  }
  
  await db.invoice.create({
    data: { items: { create: items } }
  })
  
  revalidatePath('/invoices')
}
```

## Optimistic UI Updates

Optimistic updates show the result immediately without waiting for the server:

```tsx
"use client"

import { useOptimistic, useRef } from 'react'
import { addComment } from './actions'

export default function Comments({ postId, initialComments }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    initialComments,
    (state, newComment: string) => [
      ...state,
      { id: 'temp', content: newComment, isPending: true }
    ]
  )
  
  async function handleSubmit(formData: FormData) {
    const comment = formData.get('comment') as string
    setOptimisticComments(comment)
    formRef.current?.reset()
    
    await addComment(formData)
    // The real data replaces the optimistic version on revalidation
  }
  
  return (
    <div>
      {optimisticComments.map(comment => (
        <div key={comment.id} className={comment.isPending ? 'opacity-50' : ''}>
          {comment.content}
        </div>
      ))}
      
      <form ref={formRef} action={handleSubmit}>
        <input name="comment" placeholder="Add a comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}
```

## File Uploads with Server Actions

```tsx
"use client"

import { useState } from 'react'
import { uploadAvatar } from './actions'

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null)
  
  async function handleSubmit(formData: FormData) {
    const result = await uploadAvatar(formData)
    if (result.url) setPreview(result.url)
  }
  
  return (
    <form action={handleSubmit}>
      <label className="cursor-pointer">
        <input
          name="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 rounded" />}
      </label>
      <button type="submit">Upload</button>
    </form>
  )
}
```

## Common Mistakes

- **Form data lost on validation errors** — Re-populate form fields from returned state values
- **Not resetting form after successful submission** — Use `formRef.current?.reset()`
- **Missing name attributes** — FormData.get() requires name attributes on inputs
- **Over-complicating with client state** — Use `useActionState` instead of manual `useState` for form state

## Best Practices

- Use `useOptimistic` for instant UI feedback on mutations
- Reset forms after successful submission
- Keep form state in Server Actions, not in client state
- Use `formRef` for imperative form resets
- Validate file types and sizes before uploading

## Summary

Advanced form patterns include multi-step workflows, dynamic field arrays, optimistic updates, and file uploads. Keep form state in Server Actions where possible, use `useOptimistic` for instant feedback, and validate on both client and server.

## Related Topics

- [Validation with Zod](./topic-2-validation-with-zod.md)
- [React Hook Form Integration](./topic-3-react-hook-form-integration.md)
- [Server Actions (Phase 3)](../../phase-3-rendering-data-fetching/module-5-server-actions/)
