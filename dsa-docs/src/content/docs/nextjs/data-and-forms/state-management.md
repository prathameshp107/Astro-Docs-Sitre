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

```txt
<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="400" fill="#0f172a" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">State Management Options in React/Next.js</text>

  <!-- Local State -->
  <rect x="20" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="72" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Local State</text>
  <text x="95" y="90" text-anchor="middle" fill="#64748b" font-size="9">Component-scoped</text>
  <rect x="35" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="113" text-anchor="middle" fill="#4ade80" font-size="10">useState()</text>
  <rect x="35" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="140" text-anchor="middle" fill="#4ade80" font-size="10">useReducer()</text>
  <rect x="35" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="95" y="167" text-anchor="middle" fill="#4ade80" font-size="10">useRef()</text>

  <!-- Global State -->
  <rect x="190" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
  <text x="265" y="72" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Global State</text>
  <text x="265" y="90" text-anchor="middle" fill="#64748b" font-size="9">Cross-component</text>
  <rect x="205" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="113" text-anchor="middle" fill="#c084fc" font-size="10">Context API</text>
  <rect x="205" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="140" text-anchor="middle" fill="#c084fc" font-size="10">Redux Toolkit</text>
  <rect x="205" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="265" y="167" text-anchor="middle" fill="#c084fc" font-size="10">Zustand</text>

  <!-- Server State -->
  <rect x="360" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="435" y="72" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Server State</text>
  <text x="435" y="90" text-anchor="middle" fill="#64748b" font-size="9">Remote/async data</text>
  <rect x="375" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="113" text-anchor="middle" fill="#fbbf24" font-size="10">TanStack Query</text>
  <rect x="375" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="140" text-anchor="middle" fill="#fbbf24" font-size="10">SWR</text>
  <rect x="375" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="435" y="167" text-anchor="middle" fill="#fbbf24" font-size="10">Apollo (GraphQL)</text>

  <!-- URL State -->
  <rect x="530" y="50" width="150" height="140" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="605" y="72" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">URL State</text>
  <text x="605" y="90" text-anchor="middle" fill="#64748b" font-size="9">In URL params</text>
  <rect x="545" y="98" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="113" text-anchor="middle" fill="#4ade80" font-size="10">useSearchParams()</text>
  <rect x="545" y="125" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="140" text-anchor="middle" fill="#4ade80" font-size="10">useRouter()</text>
  <rect x="545" y="152" width="120" height="22" rx="4" fill="#0f172a"/>
  <text x="605" y="167" text-anchor="middle" fill="#4ade80" font-size="10">usePathname()</text>

  <!-- Decision guide -->
  <rect x="20" y="215" width="660" height="160" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="237" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">When to Use What?</text>

  <text x="40" y="260" fill="#3b82f6" font-size="11" font-weight="bold">useState</text>
  <text x="130" y="260" fill="#64748b" font-size="10">→ Toggle, counter, single component form input</text>

  <text x="40" y="282" fill="#a855f7" font-size="11" font-weight="bold">useReducer</text>
  <text x="130" y="282" fill="#64748b" font-size="10">→ Complex state with multiple actions (like cart)</text>

  <text x="40" y="304" fill="#6366f1" font-size="11" font-weight="bold">Context API</text>
  <text x="130" y="304" fill="#64748b" font-size="10">→ Theme, auth, small-medium global state</text>

  <text x="40" y="326" fill="#f59e0b" font-size="11" font-weight="bold">Redux / Zustand</text>
  <text x="130" y="326" fill="#64748b" font-size="10">→ Large-scale app, many slices of state, team project</text>

  <text x="40" y="348" fill="#10b981" font-size="11" font-weight="bold">TanStack Query</text>
  <text x="130" y="348" fill="#64748b" font-size="10">→ API data fetching, caching, refetching, mutations</text>
  <text x="40" y="366" fill="#64748b" font-size="10">→ Any server-side data that needs to stay in sync</text>
</svg>
```

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

```txt
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="340" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Prop Drilling vs Context API</text>

  <!-- Without Context (Prop Drilling) -->
  <text x="175" y="52" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">❌ Prop Drilling</text>
  
  <rect x="125" y="60" width="100" height="30" rx="5" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
  <text x="175" y="79" text-anchor="middle" fill="#93c5fd" font-size="10">App (has theme)</text>

  <line x1="175" y1="90" x2="175" y2="110" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="104" fill="#ef4444" font-size="9">theme↓</text>
  
  <rect x="100" y="110" width="150" height="30" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="175" y="129" text-anchor="middle" fill="#94a3b8" font-size="10">Layout (passes theme)</text>

  <line x1="175" y1="140" x2="175" y2="160" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="154" fill="#ef4444" font-size="9">theme↓</text>

  <rect x="100" y="160" width="150" height="30" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="175" y="179" text-anchor="middle" fill="#94a3b8" font-size="10">Page (passes theme)</text>

  <line x1="175" y1="190" x2="175" y2="210" stroke="#ef4444" stroke-width="1.5"/>
  <text x="190" y="204" fill="#ef4444" font-size="9">theme↓</text>

  <rect x="100" y="210" width="150" height="30" rx="5" fill="#3a1a1a" stroke="#dc2626" stroke-width="1"/>
  <text x="175" y="229" text-anchor="middle" fill="#fca5a5" font-size="10">Button (uses theme)</text>

  <text x="175" y="265" text-anchor="middle" fill="#ef4444" font-size="9">Passes through every level</text>
  <text x="175" y="280" text-anchor="middle" fill="#ef4444" font-size="9">even if not used!</text>

  <!-- With Context -->
  <text x="525" y="52" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">✅ Context API</text>

  <!-- Context provider wrapper -->
  <rect x="400" y="60" width="250" height="240" rx="8" fill="#0f2a1f" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="525" y="78" text-anchor="middle" fill="#4ade80" font-size="10">ThemeContext.Provider</text>

  <rect x="425" y="88" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="106" text-anchor="middle" fill="#94a3b8" font-size="10">App</text>

  <rect x="425" y="128" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="146" text-anchor="middle" fill="#94a3b8" font-size="10">Layout (no theme prop)</text>

  <rect x="425" y="168" width="200" height="28" rx="5" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="525" y="186" text-anchor="middle" fill="#94a3b8" font-size="10">Page (no theme prop)</text>

  <!-- Context direct line -->
  <line x1="650" y1="90" x2="650" y2="207" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="650" y1="207" x2="625" y2="207" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ag)"/>

  <rect x="425" y="196" width="200" height="28" rx="5" fill="#1a3a1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="525" y="214" text-anchor="middle" fill="#86efac" font-size="10">Button (useContext!)</text>

  <text x="660" y="148" fill="#22c55e" font-size="9" writing-mode="vertical-lr">useContext</text>

  <text x="525" y="260" text-anchor="middle" fill="#4ade80" font-size="9">Accesses theme directly</text>
  <text x="525" y="275" text-anchor="middle" fill="#4ade80" font-size="9">without passing through!</text>
  <text x="525" y="292" text-anchor="middle" fill="#64748b" font-size="9">No prop drilling needed</text>

  <defs>
    <marker id="ag" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/>
    </marker>
  </defs>
</svg>
```

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

```txt
<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace, sans-serif">
  <rect width="700" height="320" fill="#0f172a" rx="12"/>
  <text x="350" y="26" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="bold">Redux Data Flow (Unidirectional)</text>

  <!-- Component -->
  <rect x="30" y="120" width="130" height="70" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="148" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">React Component</text>
  <text x="95" y="165" text-anchor="middle" fill="#64748b" font-size="9">dispatch(action)</text>
  <text x="95" y="180" text-anchor="middle" fill="#64748b" font-size="9">useSelector(state)</text>

  <!-- Arrow: Component → Dispatch -->
  <line x1="160" y1="155" x2="205" y2="155" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ar1)"/>
  <text x="182" y="146" text-anchor="middle" fill="#3b82f6" font-size="9">dispatch</text>

  <!-- Action -->
  <rect x="205" y="125" width="120" height="60" rx="8" fill="#1a2e1a" stroke="#22c55e" stroke-width="1.5"/>
  <text x="265" y="148" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Action</text>
  <text x="265" y="162" text-anchor="middle" fill="#4ade80" font-size="9">{ type: 'cart/add'</text>
  <text x="265" y="175" text-anchor="middle" fill="#4ade80" font-size="9">  payload: item }</text>

  <!-- Arrow: Action → Reducer -->
  <line x1="325" y1="155" x2="370" y2="155" stroke="#22c55e" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Reducer -->
  <rect x="370" y="125" width="120" height="60" rx="8" fill="#2d1f4e" stroke="#a855f7" stroke-width="1.5"/>
  <text x="430" y="148" text-anchor="middle" fill="#d8b4fe" font-size="11" font-weight="bold">Reducer</text>
  <text x="430" y="162" text-anchor="middle" fill="#c084fc" font-size="9">pure function</text>
  <text x="430" y="175" text-anchor="middle" fill="#c084fc" font-size="9">(state, action) ⇒ newState</text>

  <!-- Arrow: Reducer → Store -->
  <line x1="490" y1="155" x2="540" y2="155" stroke="#a855f7" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Store -->
  <rect x="540" y="115" width="130" height="80" rx="8" fill="#2d1f0e" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="605" y="140" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Redux Store</text>
  <text x="605" y="158" text-anchor="middle" fill="#fbbf24" font-size="9">Single source of truth</text>
  <text x="605" y="172" text-anchor="middle" fill="#fbbf24" font-size="9">{ cart, auth, theme }</text>
  <text x="605" y="185" text-anchor="middle" fill="#fbbf24" font-size="9">immutable updates</text>

  <!-- Arrow: Store back to Component (curved bottom) -->
  <path d="M605,195 Q605,265 350,265 Q95,265 95,190" fill="none" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#ar2)" stroke-dasharray="5,3"/>
  <text x="350" y="285" text-anchor="middle" fill="#f59e0b" font-size="10">State update triggers re-render (useSelector)</text>

  <!-- Middleware label -->
  <rect x="250" y="55" width="200" height="30" rx="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="350" y="74" text-anchor="middle" fill="#64748b" font-size="10">Middleware (Redux Thunk / RTK Query)</text>
  <line x1="350" y1="85" x2="350" y2="125" stroke="#334155" stroke-width="1" stroke-dasharray="3,2"/>

  <defs>
    <marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
```

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
