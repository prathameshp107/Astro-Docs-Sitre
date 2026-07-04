---
title: "Shopping Cart"
description: "Implement a shopping cart with state management and persistence."
---

# Shopping Cart

## Introduction

The shopping cart is the most interactive part of an e-commerce store. It needs to update instantly when items change and persist across page refreshes. Zustand provides a lightweight state management solution perfect for this.

## Install Zustand

```bash
npm install zustand
```

## Cart Store

```ts
// lib/cart-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existing = items.find(i => i.id === item.id)

        if (existing) {
          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    { name: 'shopping-cart' }
  )
)
```

**Key points:**
- `persist` middleware saves cart to localStorage automatically
- Adding an existing item increments quantity instead of duplicating
- Methods like `getTotal` and `getItemCount` are derived from state

## Add to Cart Button

```tsx
// components/add-to-cart-button.tsx
'use client'

import { useCartStore } from '@/lib/cart-store'

export default function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; price: number; image: string }
}) {
  const addItem = useCartStore(state => state.addItem)

  return (
    <button
      onClick={() => addItem(product)}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg
                 hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  )
}
```

## Cart Page

```tsx
// app/cart/page.tsx
import CartContent from '@/components/cart-content'

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <CartContent />
    </div>
  )
}
```

```tsx
// components/cart-content.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export default function CartContent() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link
          href="/products"
          className="text-blue-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      {items.map(item => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b py-4"
        >
          <div className="relative w-20 h-20 bg-gray-100 rounded">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="border rounded p-1"
            >
              −
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="border rounded p-1"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">
          Total: ${getTotal().toFixed(2)}
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-green-600 text-white
                     px-6 py-3 rounded-lg mt-4 hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
```

## Cart Badge (Header)

```tsx
// components/cart-badge.tsx
'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export default function CartBadge() {
  const count = useCartStore(state => state.getItemCount())

  return (
    <Link href="/cart" className="relative">
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500
                         text-white text-xs w-5 h-5 rounded-full
                         flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  )
}
```

## Best Practices

- Use Zustand for cart state — it's simpler than Redux for this use case
- Persist cart to localStorage so it survives page refreshes
- Derive computed values (total, count) from the items array
- Show the cart badge in the header for easy access

## Common Mistakes

- **Not persisting cart data** — Cart should survive page refreshes via localStorage
- **Using Server Components for cart display** — Cart needs Client Components for interactivity
- **Forgetting empty state** — Always show a friendly message when the cart is empty

## Summary

Zustand with `persist` middleware provides a clean, persistent shopping cart. Use Client Components for the cart UI, derive totals from the items array, and show a badge in the header for the item count.
