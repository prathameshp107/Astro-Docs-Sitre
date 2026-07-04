---
title: "File Uploads"
description: "File uploads are a common requirement — user avatars, product images, document attachments. This topic covers upload patterns using Server Actions, blob st"
---

# File Uploads

## Introduction

File uploads are a common requirement — user avatars, product images, document attachments. This topic covers upload patterns using Server Actions, blob storage, and Next.js image optimization.

## Direct Upload with Server Actions

```tsx
"use client"

import { useState } from 'react'
import { uploadFile } from './actions'

export default function FileUpload() {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  
  async function handleSubmit(formData: FormData) {
    setUploading(true)
    try {
      const result = await uploadFile(formData)
      if (result.url) setPreview(result.url)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <form action={handleSubmit} className="space-y-4">
      <label className="block">
        <span>Upload file</span>
        <input
          name="file"
          type="file"
          accept="image/*,application/pdf"
          className="block mt-1"
        />
      </label>
      
      {preview && (
        <img src={preview} alt="Uploaded" className="w-48 h-48 object-cover rounded" />
      )}
      
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}
```

```ts
// app/upload/actions.ts
"use server"

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  
  if (!file || file.size === 0) {
    return { error: 'No file selected' }
  }
  
  // Validate
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { error: 'File too large. Max 5MB' }
  }
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type' }
  }
  
  // Save locally
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
  const path = join('public/uploads', filename)
  await writeFile(path, buffer)
  
  return { url: `/uploads/${filename}` }
}
```

## Blob Storage (Uploadthing)

For production, use a blob storage service:

```ts
// app/api/upload/route.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { auth } from '@/lib/auth'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth()
      if (!session?.user) throw new Error('Unauthorized')
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: { id: metadata.userId },
        data: { avatarUrl: file.url }
      })
    }),
  
  productImages: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .middleware(async () => ({ userId: (await auth())?.user.id }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
```

```tsx
// app/products/new/page.tsx
"use client"

import { UploadButton } from '@uploadthing/react'
import { OurFileRouter } from '@/app/api/upload/core'

export default function ProductForm() {
  return (
    <form>
      <UploadButton<OurFileRouter>
        endpoint="productImages"
        onClientUploadComplete={(res) => {
          console.log('Uploaded:', res)
        }}
        onUploadError={(error) => {
          alert(error.message)
        }}
      />
      {/* Other form fields */}
    </form>
  )
}
```

## Image Optimization with next/image

```tsx
import Image from 'next/image'

export default function Avatar({ url, alt }: { url: string; alt: string }) {
  return (
    <Image
      src={url}
      alt={alt}
      width={128}
      height={128}
      className="rounded-full"
      priority={false}
      sizes="(max-width: 768px) 64px, 128px"
    />
  )
}
```

For external images, configure allowed domains:

```ts
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
}
```

## Multiple File Uploads

```tsx
"use client"

import { uploadMultiple } from './actions'

export default function GalleryUpload() {
  async function handleSubmit(formData: FormData) {
    const files = formData.getAll('photos') as File[]
    
    if (files.length > 10) {
      alert('Maximum 10 files')
      return
    }
    
    const result = await uploadMultiple(formData)
  }
  
  return (
    <form action={handleSubmit}>
      <input
        type="file"
        name="photos"
        multiple
        accept="image/*"
      />
      <button type="submit">Upload All</button>
    </form>
  )
}
```

## Common Mistakes

- **Storing files on the server filesystem in production** — Serverless platforms are ephemeral. Use blob storage (S3, Uploadthing, Cloudinary).
- **No file type validation** — Always validate MIME type on the server.
- **No file size limits** — Set max file size limits on both client and server.
- **Direct uploads to S3 without signed URLs** — Use presigned URLs for secure client-side uploads to S3.

## Best Practices

- Validate file type and size on both client and server
- Use blob storage (Uploadthing, S3, Cloudinary) for production
- Generate unique filenames to prevent collisions
- Optimize images with `next/image` for faster loading
- Limit upload concurrency on the client
- Show upload progress for large files

## Summary

File uploads in Next.js work through Server Actions for simple cases and blob storage services for production. Always validate file types and sizes on the server, use `next/image` for image optimization, and prefer managed storage services over local filesystem storage.

## Related Topics

- [Email & Notifications](./topic-2-email-and-notifications.md)
- [Background Jobs & Queues](./topic-3-background-jobs-and-queues.md)
- [Server Actions (Phase 3)](../../phase-3-rendering-data-fetching/module-5-server-actions/)
