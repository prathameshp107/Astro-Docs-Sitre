---
title: "State Management"
description: "State is any data that can change over time in your application. Think of it as the app's \"memory.\""
---

# Section 14: State Management

## 14.1 What Is State Management?

**State** is any data that can change over time in your application. Think of it as the app's "memory."

```
Examples of State:
─────────────────────────────────────────────
✅ Is the user logged in?        → Auth state
✅ Items in shopping cart        → Cart state
✅ Current theme (dark/light)    → UI state  
✅ List of fetched blog posts     → Server state
✅ Form input values             → Form state
✅ Active tab in navigation      → Navigation state
```

### Local vs Global State

```
Local State:                    Global State:
───────────────────────────────────────────────
Lives in one component          Shared across many components
Managed with useState           Managed with Context/Redux/Zustand
Dies when component unmounts    Persists across navigation
Example: dropdown open/closed   Example: user authentication
```

---

## 14.2 State Flow Diagram

![14.2 State Flow Diagram diagram](/DSA-Notes-Problems/assets/nextjs/data-and-forms-state-management-14-2-state-flow-diagram.svg)

---

## 14.3 useState — The Foundation

```tsx
"use client";

import { useState } from "react";

// Basic counter
export function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Object state
interface User {
  name: string;
  email: string;
  age: number;
}

export function UserForm() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    age: 0,
  });

  // Update a single field without losing others
  const updateField = (field: keyof User, value: string | number) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateField("name", e.target.value)}
      />
      {/* Other fields */}
    </form>
  );
}
```

---

## 14.4 useReducer — Complex State Logic

```tsx
"use client";

import { useReducer } from "react";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

// Actions (discriminated union for type safety)
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Reducer — pure function: (state, action) => newState
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      
      if (existing) {
        // Increase quantity if already in cart
        const items = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        return { items, total: calculateTotal(items) };
      }
      
      const items = [...state.items, { ...action.payload, quantity: 1 }];
      return { items, total: calculateTotal(items) };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload.id);
      return { items, total: calculateTotal(items) };
    }

    case "UPDATE_QUANTITY": {
      const items = state.items.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return { items, total: calculateTotal(items) };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Usage in component
export function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } });

  return (
    <div>
      <p>Items: {cart.items.length} | Total: ${cart.total.toFixed(2)}</p>
      {cart.items.map((item) => (
        <div key={item.id}>
          <span>{item.name} × {item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 14.5 Context API — Sharing State Without Prop Drilling

![14.5 Context API — Sharing State Without Prop Drilling diagram](/DSA-Notes-Problems/assets/nextjs/data-and-forms-state-management-14-5-context-api-sharing-state-without-prop-drilling-2.svg)

### Implementing Context API

```tsx
// context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Create context with default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — much cleaner than useContext(ThemeContext) everywhere
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
```

```tsx
// app/layout.tsx — wrap the app
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// Any deeply nested component
"use client";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();  // Direct access!

  return (
    <button
      onClick={toggleTheme}
      className={isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
```

---

## 14.6 Redux Toolkit

### Redux Architecture

![Redux Architecture diagram](/DSA-Notes-Problems/assets/nextjs/data-and-forms-state-management-redux-architecture-3.svg)

### Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit react-redux
```

```typescript
// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",                    // Action type prefix
  initialState,
  reducers: {
    // Redux Toolkit uses Immer — you can "mutate" state directly!
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;   // Immer handles immutability
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Auto-generated action creators
export const { addItem, removeItem, updateQuantity, clearCart, toggleCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
```

```typescript
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    // Add more slices here
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks (use these instead of plain useSelector/useDispatch)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```tsx
// providers/ReduxProvider.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "@/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

```tsx
// Using Redux in a component
"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { addItem, selectCartCount } from "@/store/slices/cartSlice";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => dispatch(addItem(product))}>
        Add to Cart ({cartCount})
      </button>
    </div>
  );
}
```

---

## 14.7 Zustand — Lightweight Alternative

```bash
npm install zustand
```

```typescript
// store/useCartStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(                        // Redux DevTools support
    persist(                       // Persist to localStorage
      (set, get) => ({
        items: [],

        addItem: (item) => {
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          });
        },

        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          })),

        clearCart: () => set({ items: [] }),

        // Derived state as a function
        total: () =>
          get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }),
      { name: "cart-storage" }     // localStorage key
    )
  )
);

// Usage — no Provider needed!
export function CartIcon() {
  const items = useCartStore((state) => state.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  return <span>🛒 {count}</span>;
}
```

---

## 14.8 TanStack Query (React Query)

For server state — data fetching, caching, synchronization.

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

```tsx
// providers/QueryProvider.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,    // Data fresh for 1 minute
            retry: 2,                 // Retry failed queries twice
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```tsx
// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API functions
const fetchPosts = async (page: number) => {
  const res = await fetch(`/api/posts?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const createPost = async (data: { title: string; content: string }) => {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

// Custom query hook
export function usePosts(page: number) {
  return useQuery({
    queryKey: ["posts", page],         // Cache key — unique per page
    queryFn: () => fetchPosts(page),
    placeholderData: (prev) => prev,   // Keep old data while fetching new
  });
}

// Custom mutation hook
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts after creating
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });
}

// In a component
export function PostsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = usePosts(page);
  const createPost = useCreatePost();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.posts.map((post: any) => (
        <article key={post.id}>{post.title}</article>
      ))}
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}
```

---

## 14.9 Comparison Tables

### Context API vs Redux vs Zustand

| Feature | Context API | Redux Toolkit | Zustand |
|---------|-------------|---------------|---------|
| **Bundle size** | 0 (built-in) | ~11KB | ~1KB |
| **Boilerplate** | Medium | Low (RTK) | Very Low |
| **DevTools** | No | Yes (Redux DevTools) | Yes |
| **Persistence** | Manual | Need middleware | Built-in |
| **Performance** | Re-renders context consumers | Optimized selectors | Selector-based |
| **Learning curve** | Low | Medium | Very Low |
| **Best for** | Small apps, theme/auth | Large teams, complex state | Medium apps, simple API |
| **TypeScript** | Good | Excellent | Good |
| **Async actions** | Manual | createAsyncThunk / RTK Query | Simple with set |

### React Query vs Redux for Server State

| Aspect | TanStack Query | Redux + Thunks |
|--------|---------------|----------------|
| **Caching** | Automatic, time-based | Manual |
| **Refetching** | On focus, interval, mount | Manual |
| **Loading states** | Built-in | Manual |
| **Deduplication** | Automatic | Manual |
| **Optimistic updates** | Built-in helpers | Manual |
| **Code volume** | ~5 lines | ~30+ lines |
| **Background updates** | Yes | Manual |
| **Best for** | API/server data | Client-only state |

---

## 14.10 Performance Optimization

```tsx
// ❌ BAD: Context causes ALL consumers to re-render
const AppContext = createContext({ user, theme, cart, notifications });
// Any change re-renders ALL consumers!

// ✅ GOOD: Split contexts by update frequency
const AuthContext = createContext({ user });           // Changes rarely
const ThemeContext = createContext({ theme });         // Changes sometimes
const CartContext = createContext({ cart });           // Changes often

// ✅ GOOD: Memoize context value
const value = useMemo(() => ({ user, login, logout }), [user]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

// ✅ GOOD: Use selectors to prevent unnecessary re-renders with Redux
// BAD - re-renders whenever ANY state changes
const state = useAppSelector((s) => s);

// GOOD - only re-renders when cart items change
const items = useAppSelector((s) => s.cart.items);
const total = useAppSelector(selectCartTotal);  // Memoized selector

// ✅ GOOD: Memoized selectors with createSelector (Reselect)
import { createSelector } from "@reduxjs/toolkit";
const selectExpensiveItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.filter((i) => i.price > 100)  // Only recomputes when items change
);
```

---

## 14.11 Best Practices

| # | Practice | Why |
|---|----------|-----|
| 1 | Co-locate state with components that use it | Simpler, faster |
| 2 | Use Context for infrequently-changing global state | Avoid unnecessary re-renders |
| 3 | Use TanStack Query for all server/async data | Built-in caching, deduplication |
| 4 | Use Zustand or Redux for complex client state | Better DevTools, time-travel |
| 5 | Create typed custom hooks (useCart, useAuth) | Cleaner API, easier refactoring |
| 6 | Use memoized selectors | Performance |
| 7 | Normalize complex state shapes | Avoid nested updates |
| 8 | Don't put everything in global state | Local state is fine for UI |

---

## 14.12 Common Mistakes

```tsx
// ❌ MISTAKE 1: Putting everything in global state
// Form input state, modal open/close, tooltip visible — these are LOCAL!

// ❌ MISTAKE 2: Not using selectors
const everything = useAppSelector((s) => s);  // Subscribes to everything!

// ❌ MISTAKE 3: Creating Context without a custom hook
const value = useContext(ThemeContext);  // No error if used outside Provider!
// ✅ Create a custom hook that throws a clear error

// ❌ MISTAKE 4: Not memoizing context value
<MyContext.Provider value={{ user, login }}>
// Creates new object on every render — all consumers re-render!
// ✅ value={useMemo(() => ({ user, login }), [user])}

// ❌ MISTAKE 5: Using Redux for server state
// Don't fetch API data and store it in Redux — use TanStack Query!
```

---

## 14.13 Interview Questions — State Management

| Level | Question | Key Points |
|-------|----------|------------|
| 🟢 Beginner | What is the difference between props and state? | Props passed down, state internal |
| 🟢 Beginner | When would you use useReducer over useState? | Complex state with many actions |
| 🟡 Intermediate | What is prop drilling and how do you solve it? | Context, state management libs |
| 🟡 Intermediate | What problem does Redux solve? | Predictable, centralized state |
| 🟡 Intermediate | Context API vs Redux — when to use which? | Size, DevTools, performance needs |
| 🔴 Advanced | How does Redux prevent unnecessary re-renders? | Selectors, shallow equality checks |
| 🔴 Advanced | What is state normalization? | Flat structure, IDs as references |
| 🔴 Advanced | How would you handle optimistic updates? | Update UI first, rollback on error |

---
