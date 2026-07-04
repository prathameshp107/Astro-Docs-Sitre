---
title: "Product Listing"
description: "Build product catalog with search, filters, and detail pages."
---

# Product Listing

## Introduction

The product catalog is the heart of any e-commerce store. It needs to be fast, searchable, and filterable. Next.js makes this straightforward with Server Components and dynamic routes.

## Database Schema

```prisma
// prisma/schema.prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  image       String
  category    String
  stock       Int      @default(0)
  createdAt   DateTime @default(now())
}
```

## Product Listing Page

```tsx
// app/products/page.tsx
import { db } from '@/lib/db'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'
import SearchInput from '@/components/search-input'

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { q, category, minPrice, maxPrice } = await searchParams

  const products = await db.product.findMany({
    where: {
      ...(q && { name: { contains: q, mode: 'insensitive' } }),
      ...(category && { category }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    },
    orderBy: { createdAt: 'desc' },
  })

  const categories = await db.product.findMany({
    select: { category: true },
    distinct: ['category'],
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-4 mb-8">
        <SearchInput />
        <ProductFilters categories={categories.map(c => c.category)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No products found.
        </p>
      )}
    </div>
  )
}
```

**Key points:**
- `searchParams` is a Promise in Next.js 14+ — use `await`
- Filters are applied via Prisma's `where` clause
- The page re-fetches data on every request, ensuring fresh results
- Categories are loaded from the database for dynamic filter options

## Product Card Component

```tsx
// components/product-card.tsx
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition group">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3 className="font-semibold mt-1">{product.name}</h3>
          <p className="text-lg font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
```

## Product Detail Page

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import Image from 'next/image'
import AddToCartButton from '@/components/add-to-cart-button'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })

  if (!product) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 bg-gray-100 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <p className="text-gray-500">{product.category}</p>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          <p className="text-2xl font-bold mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="mt-6">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Best Practices

- Use searchParams for URL-based filtering (shareable, bookmarkable)
- Show meaningful empty states when no products match
- Optimize product images with `next/image`
- Add hover effects on product cards for interactivity

## Common Mistakes

- **Filtering on the client** — Server-side filtering is faster and works without JavaScript
- **Not handling missing products** — Always call `notFound()` for invalid product IDs
- **Large images without optimization** — Use `next/image` with proper sizing

## Summary

Product listing with server-side filtering keeps your store fast and SEO-friendly. Use Prisma for database queries, searchParams for URL-based filters, and `next/image` for optimized product images.
