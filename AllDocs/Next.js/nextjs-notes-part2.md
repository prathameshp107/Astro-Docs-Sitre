# Next.js Complete Notes — Part 2

> **Sections Covered:** Components · Styling · Data Fetching · Rendering Methods · API Routes & Backend

---

## Table of Contents

- [Section 6: Components in Next.js](#section-6-components-in-nextjs)
- [Section 7: Styling in Next.js](#section-7-styling-in-nextjs)
- [Section 8: Data Fetching](#section-8-data-fetching)
- [Section 9: Rendering Methods](#section-9-rendering-methods)
- [Section 10: API Routes and Backend](#section-10-api-routes-and-backend)
- [Summary](#summary)
- [Key Takeaways](#key-takeaways)
- [Practice Exercises](#practice-exercises)
- [Mini Project Ideas](#mini-project-ideas)
- [Interview Preparation](#interview-preparation)

---

# Section 6: Components in Next.js

## 6.1 What Are Components?

Think of building a house. Instead of constructing everything at once, you build individual rooms — bedroom, kitchen, bathroom — and assemble them together. **Components** are the "rooms" of your web application.

A component is a **self-contained, reusable piece of UI**. It accepts inputs (called **props**) and returns JSX (HTML-like markup). Components can be as small as a button or as large as an entire page.

```tsx
// The simplest component possible
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

### Why Components Matter

| Without Components | With Components |
|--------------------|-----------------|
| Duplicated HTML everywhere | Write once, reuse anywhere |
| Hard to maintain | Easy to update one place |
| Inconsistent UI | Consistent look and feel |
| Giant messy files | Organized, modular codebase |
| Hard to test | Test each piece independently |

---

## 6.2 Types of Components in Next.js

Next.js 13+ (App Router) introduces a powerful distinction between **Server** and **Client** components. This is one of the most important concepts to understand.

### 6.2.1 Server Components (Default)

Server Components **run only on the server**. They never ship JavaScript to the browser.

**Analogy:** Imagine a chef who prepares your meal in the kitchen and sends you the finished plate. You don't see the cooking process — just the result.

```tsx
// app/products/page.tsx
// No "use client" needed — Server Component by default

async function ProductsPage() {
  // This fetch runs ON THE SERVER — never exposed to browser
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product: { id: number; name: string }) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default ProductsPage;
```

**What Server Components CAN do:**
- Fetch data directly (database, APIs)
- Access environment variables securely
- Render faster (no client JS bundle)
- Use async/await at the component level

**What Server Components CANNOT do:**
- Use `useState` or `useEffect`
- Add event listeners (`onClick`, `onChange`)
- Access browser APIs (`window`, `document`)
- Use React Context

---

### 6.2.2 Client Components

Client Components run in the **browser**. They handle interactivity, state, and browser APIs. You must add `"use client"` at the top.

**Analogy:** The waiter at your table — they interact with you, take your order, respond to your requests.

```tsx
// components/Counter.tsx
"use client"; // 👈 This directive marks it as a Client Component

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

---

### 6.2.3 Server vs Client Components — Comparison Table

| Feature | Server Component | Client Component |
|---------|-----------------|-----------------|
| Default in App Router | ✅ Yes | ❌ No (needs `"use client"`) |
| Runs on | Server only | Browser (+ initial SSR) |
| Async/Await | ✅ Supported | ❌ Not directly |
| useState / useEffect | ❌ Not allowed | ✅ Supported |
| Event handlers | ❌ Not allowed | ✅ Supported |
| Access to DB/APIs | ✅ Direct access | ❌ Via API routes only |
| Bundle size impact | ✅ Zero JS sent | ❌ Adds to bundle |
| SEO | ✅ Excellent | ⚠️ Needs hydration |
| Performance | ✅ Faster | ⚠️ Slower (hydration needed) |

---

### 6.2.4 Rendering Flow Diagram

```svg
<svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="13">
  <!-- Background -->
  <rect width="820" height="420" fill="#0f1117" rx="12"/>

  <!-- Title -->
  <text x="410" y="35" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold">Server vs Client Component Rendering Flow</text>

  <!-- SERVER SIDE box -->
  <rect x="30" y="60" width="340" height="320" fill="#1e293b" rx="10" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="200" y="88" text-anchor="middle" fill="#3b82f6" font-size="14" font-weight="bold">🖥️ SERVER SIDE</text>

  <!-- Steps on server -->
  <rect x="55" y="100" width="290" height="44" fill="#1d4ed8" rx="7"/>
  <text x="200" y="118" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">1. Request arrives from browser</text>
  <text x="200" y="134" text-anchor="middle" fill="#bfdbfe" font-size="11">User visits /products</text>

  <rect x="55" y="158" width="290" height="44" fill="#1d4ed8" rx="7"/>
  <text x="200" y="176" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">2. Server Component renders</text>
  <text x="200" y="192" text-anchor="middle" fill="#bfdbfe" font-size="11">Fetches data, builds HTML</text>

  <rect x="55" y="216" width="290" height="44" fill="#1d4ed8" rx="7"/>
  <text x="200" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">3. HTML + JSON payload</text>
  <text x="200" y="250" text-anchor="middle" fill="#bfdbfe" font-size="11">Sent to browser</text>

  <!-- Arrow down -->
  <line x1="200" y1="270" x2="200" y2="310" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="194,308 200,320 206,308" fill="#3b82f6"/>

  <rect x="55" y="318" width="290" height="44" fill="#0f4e00" rx="7" stroke="#22c55e" stroke-width="1"/>
  <text x="200" y="336" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">✅ Zero JS in bundle</text>
  <text x="200" y="352" text-anchor="middle" fill="#86efac" font-size="11">Server component code stays on server</text>

  <!-- Arrow between sections -->
  <line x1="370" y1="220" x2="450" y2="220" stroke="#94a3b8" stroke-width="2"/>
  <polygon points="448,214 460,220 448,226" fill="#94a3b8"/>
  <text x="410" y="212" text-anchor="middle" fill="#94a3b8" font-size="11">HTTP</text>

  <!-- CLIENT SIDE box -->
  <rect x="460" y="60" width="330" height="320" fill="#1e293b" rx="10" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="625" y="88" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="bold">🌐 CLIENT SIDE</text>

  <rect x="485" y="100" width="280" height="44" fill="#92400e" rx="7"/>
  <text x="625" y="118" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">1. Browser receives HTML</text>
  <text x="625" y="134" text-anchor="middle" fill="#fde68a" font-size="11">Instantly visible (good FCP)</text>

  <rect x="485" y="158" width="280" height="44" fill="#92400e" rx="7"/>
  <text x="625" y="176" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">2. JS bundle downloads</text>
  <text x="625" y="192" text-anchor="middle" fill="#fde68a" font-size="11">Client component code loads</text>

  <rect x="485" y="216" width="280" height="44" fill="#92400e" rx="7"/>
  <text x="625" y="234" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">3. Hydration occurs</text>
  <text x="625" y="250" text-anchor="middle" fill="#fde68a" font-size="11">React attaches event listeners</text>

  <rect x="485" y="318" width="280" height="44" fill="#1a0005" rx="7" stroke="#f87171" stroke-width="1"/>
  <text x="625" y="336" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="bold">⚡ Now interactive</text>
  <text x="625" y="352" text-anchor="middle" fill="#fca5a5" font-size="11">useState, onClick etc. work</text>

  <!-- Down arrow -->
  <line x1="625" y1="270" x2="625" y2="310" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="619,308 625,320 631,308" fill="#f59e0b"/>
</svg>
```

---

### 6.2.5 Async Components

In Next.js App Router, **Server Components can be async**. This is a superpower — you can `await` data directly inside a component.

```tsx
// app/user/[id]/page.tsx

interface User {
  id: number;
  name: string;
  email: string;
}

// This component is async — it awaits data before rendering
async function UserPage({ params }: { params: { id: string } }) {
  // Direct DB or API call — runs only on server
  const user: User = await fetchUserById(params.id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Simulated fetch function
async function fetchUserById(id: string): Promise<User> {
  const res = await fetch(`https://api.example.com/users/${id}`, {
    cache: "no-store", // Always fresh data
  });
  return res.json();
}

export default UserPage;
```

---

### 6.2.6 Dynamic Components with `dynamic()`

Sometimes you want to **lazy-load** a component — only load it when needed. This is great for performance.

```tsx
// app/dashboard/page.tsx
"use client";

import dynamic from "next/dynamic";

// Heavy chart component — loaded only when needed
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p>Loading chart...</p>, // Shown while loading
  ssr: false, // Don't render on server (useful for browser-only libs)
});

// Modal loaded on demand
const Modal = dynamic(() => import("@/components/Modal"), {
  loading: () => <div className="skeleton" />,
});

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
      <Modal />
    </div>
  );
}
```

> **When to use `dynamic()`?**
> - Components using heavy libraries (charts, editors, maps)
> - Browser-only components (use `ssr: false`)
> - Components not needed on initial page load

---

## 6.3 Hydration Explained

**Hydration** is the process where React takes the static HTML sent by the server and **"wakes it up"** by attaching JavaScript event listeners.

**Analogy:** Think of a mannequin (static HTML) being turned into a real person who can interact (hydrated React app).

```svg
<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="760" height="280" fill="#0f1117" rx="12"/>
  <text x="380" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Hydration Workflow</text>

  <!-- Step 1 -->
  <rect x="20" y="55" width="160" height="80" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="80" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">1. Server</text>
  <text x="100" y="98" text-anchor="middle" fill="#bfdbfe" font-size="11">Renders HTML</text>
  <text x="100" y="114" text-anchor="middle" fill="#bfdbfe" font-size="11">Sends to browser</text>
  <text x="100" y="128" text-anchor="middle" fill="#64748b" font-size="10">Static, no events</text>

  <!-- Arrow -->
  <line x1="180" y1="95" x2="220" y2="95" stroke="#475569" stroke-width="2"/>
  <polygon points="218,89 230,95 218,101" fill="#475569"/>

  <!-- Step 2 -->
  <rect x="230" y="55" width="160" height="80" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="310" y="80" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">2. Browser</text>
  <text x="310" y="98" text-anchor="middle" fill="#fde68a" font-size="11">Displays HTML</text>
  <text x="310" y="114" text-anchor="middle" fill="#fde68a" font-size="11">Instantly visible</text>
  <text x="310" y="128" text-anchor="middle" fill="#64748b" font-size="10">Not yet interactive</text>

  <!-- Arrow -->
  <line x1="390" y1="95" x2="430" y2="95" stroke="#475569" stroke-width="2"/>
  <polygon points="428,89 440,95 428,101" fill="#475569"/>

  <!-- Step 3 -->
  <rect x="440" y="55" width="160" height="80" fill="#1a3300" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="520" y="80" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">3. React</text>
  <text x="520" y="98" text-anchor="middle" fill="#bbf7d0" font-size="11">JS bundle loads</text>
  <text x="520" y="114" text-anchor="middle" fill="#bbf7d0" font-size="11">Attaches events</text>
  <text x="520" y="128" text-anchor="middle" fill="#64748b" font-size="10">Hydration complete</text>

  <!-- Arrow -->
  <line x1="600" y1="95" x2="640" y2="95" stroke="#475569" stroke-width="2"/>
  <polygon points="638,89 650,95 638,101" fill="#475569"/>

  <!-- Step 4 -->
  <rect x="650" y="55" width="90" height="80" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="695" y="82" text-anchor="middle" fill="#d8b4fe" font-size="12" font-weight="bold">4. ✅</text>
  <text x="695" y="100" text-anchor="middle" fill="#e9d5ff" font-size="11">Interactive</text>
  <text x="695" y="118" text-anchor="middle" fill="#e9d5ff" font-size="11">App is</text>
  <text x="695" y="133" text-anchor="middle" fill="#e9d5ff" font-size="11">fully alive</text>

  <!-- Key info -->
  <rect x="20" y="165" width="720" height="90" fill="#1e293b" rx="8"/>
  <text x="370" y="188" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">⚠️ Hydration Key Facts</text>
  <text x="40" y="210" fill="#64748b" font-size="11">• Server HTML and client render must match — mismatch causes "hydration error"</text>
  <text x="40" y="228" fill="#64748b" font-size="11">• Only Client Components (with "use client") go through hydration</text>
  <text x="40" y="246" fill="#64748b" font-size="11">• Server Components never hydrate — their code stays on the server permanently</text>
</svg>
```

---

## 6.4 Props, Children, and Composition

### Props

Props are **inputs** passed to a component — like function arguments.

```tsx
// components/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string; // Optional prop
  role: "admin" | "user" | "moderator";
}

function UserCard({ name, email, avatarUrl, role }: UserCardProps) {
  return (
    <div className="card">
      {avatarUrl && <img src={avatarUrl} alt={name} />}
      <h2>{name}</h2>
      <p>{email}</p>
      <span className={`badge badge-${role}`}>{role}</span>
    </div>
  );
}

// Usage
<UserCard name="Priya" email="priya@example.com" role="admin" />
```

### Children

Children let you **nest content** inside a component — like a container.

```tsx
// components/Card.tsx
interface CardProps {
  title: string;
  children: React.ReactNode; // Accepts any JSX
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage — pass any content inside
<Card title="My Profile">
  <p>Name: Rahul</p>
  <p>Age: 25</p>
  <button>Edit</button>
</Card>
```

### Composition Pattern

The **Composition Pattern** builds complex UIs from small, focused components.

```tsx
// components/Dashboard.tsx — Full composition example

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <p className="label">{label}</p>
      <h3 className="value">{value}</h3>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="stats-row">
      <StatCard label="Total Users" value="12,400" />
      <StatCard label="Revenue" value="₹4,20,000" />
      <StatCard label="Orders" value="890" />
    </div>
  );
}

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>
      <StatsRow />
      {/* More composed sections */}
    </main>
  );
}
```

---

## 6.5 Reusable Component Examples

### Reusable Button Component

```tsx
// components/ui/Button.tsx
"use client";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  onClick,
  children,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        rounded-lg font-medium transition-colors
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="spinner" /> Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
```

### Card Component

```tsx
// components/ui/Card.tsx
interface CardProps {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Card({ title, subtitle, footer, className = "", children }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t">{footer}</div>
      )}
    </div>
  );
}
```

### Modal Component

```tsx
// components/ui/Modal.tsx
"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal box — stop click propagation */}
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

---

## 6.6 Component Hierarchy Diagram

```svg
<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="700" height="360" fill="#0f1117" rx="12"/>
  <text x="350" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Component Hierarchy</text>

  <!-- RootLayout -->
  <rect x="260" y="50" width="180" height="40" fill="#1d4ed8" rx="8"/>
  <text x="350" y="75" text-anchor="middle" fill="#fff" font-weight="bold">RootLayout</text>

  <!-- Lines from Root -->
  <line x1="350" y1="90" x2="160" y2="130" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="90" x2="350" y2="130" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="90" x2="540" y2="130" stroke="#475569" stroke-width="1.5"/>

  <!-- Navbar -->
  <rect x="70" y="130" width="160" height="40" fill="#0f766e" rx="8"/>
  <text x="150" y="155" text-anchor="middle" fill="#fff" font-weight="bold">Navbar</text>

  <!-- Page -->
  <rect x="270" y="130" width="160" height="40" fill="#7c3aed" rx="8"/>
  <text x="350" y="155" text-anchor="middle" fill="#fff" font-weight="bold">Page</text>

  <!-- Footer -->
  <rect x="450" y="130" width="160" height="40" fill="#0f766e" rx="8"/>
  <text x="530" y="155" text-anchor="middle" fill="#fff" font-weight="bold">Footer</text>

  <!-- Lines from Page -->
  <line x1="350" y1="170" x2="200" y2="210" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="170" x2="350" y2="210" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="170" x2="500" y2="210" stroke="#475569" stroke-width="1.5"/>

  <!-- HeroSection -->
  <rect x="110" y="210" width="150" height="40" fill="#b45309" rx="8"/>
  <text x="185" y="235" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">HeroSection</text>

  <!-- ProductList -->
  <rect x="275" y="210" width="150" height="40" fill="#b45309" rx="8"/>
  <text x="350" y="235" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">ProductList</text>

  <!-- Sidebar -->
  <rect x="430" y="210" width="130" height="40" fill="#b45309" rx="8"/>
  <text x="495" y="235" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">Sidebar</text>

  <!-- Lines from ProductList -->
  <line x1="350" y1="250" x2="260" y2="290" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="250" x2="350" y2="290" stroke="#475569" stroke-width="1.5"/>
  <line x1="350" y1="250" x2="440" y2="290" stroke="#475569" stroke-width="1.5"/>

  <!-- ProductCard -->
  <rect x="170" y="290" width="115" height="36" fill="#166534" rx="7"/>
  <text x="228" y="313" text-anchor="middle" fill="#86efac" font-size="11">ProductCard</text>

  <!-- Button -->
  <rect x="298" y="290" width="100" height="36" fill="#166534" rx="7"/>
  <text x="348" y="313" text-anchor="middle" fill="#86efac" font-size="11">Button</text>

  <!-- Badge -->
  <rect x="412" y="290" width="100" height="36" fill="#166534" rx="7"/>
  <text x="462" y="313" text-anchor="middle" fill="#86efac" font-size="11">Badge</text>

  <!-- Legend -->
  <rect x="20" y="310" width="14" height="14" fill="#1d4ed8" rx="3"/>
  <text x="38" y="322" fill="#94a3b8" font-size="11">Layout</text>
  <rect x="100" y="310" width="14" height="14" fill="#7c3aed" rx="3"/>
  <text x="118" y="322" fill="#94a3b8" font-size="11">Page</text>
  <rect x="170" y="310" width="14" height="14" fill="#b45309" rx="3"/>
  <text x="188" y="322" fill="#94a3b8" font-size="11">Section</text>
  <rect x="250" y="310" width="14" height="14" fill="#166534" rx="3"/>
  <text x="268" y="322" fill="#94a3b8" font-size="11">Reusable UI</text>
</svg>
```

---

## 6.7 Folder Organization Best Practices

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── ui/                   # Generic reusable components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   ├── layout/               # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── features/             # Feature-specific components
│       ├── auth/
│       │   └── LoginForm.tsx
│       └── dashboard/
│           └── StatsWidget.tsx
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── types/                    # TypeScript interfaces
```

---

## 6.8 Common Mistakes

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Using `useState` in a Server Component | Add `"use client"` directive |
| Forgetting `"use client"` for event handlers | Always add for onClick, onChange etc. |
| Making everything a Client Component | Use Server Components by default |
| Prop drilling through many levels | Use React Context or Zustand |
| Not typing props in TypeScript | Always define interface for props |
| Huge components with 500+ lines | Break into smaller focused components |
| `useEffect` for data fetching | Fetch in Server Components instead |

---

## 6.9 Interview Questions — Components

1. **What is the difference between Server and Client Components in Next.js?**
2. **Why can't you use `useState` in a Server Component?**
3. **What does the `"use client"` directive do exactly?**
4. **What is hydration? What causes a hydration error?**
5. **When would you use `dynamic()` instead of a normal import?**
6. **What is the Composition Pattern? Give an example.**
7. **How do you pass data between sibling components?**
8. **What is the difference between `props` and `state`?**
9. **Can a Server Component render a Client Component? Vice versa?**
10. **What is `React.ReactNode` vs `React.ReactElement`?**

---

# Section 7: Styling in Next.js

## 7.1 How Styling Works in Next.js

Next.js supports multiple styling approaches. Understanding each helps you pick the right tool.

```svg
<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="720" height="220" fill="#0f1117" rx="12"/>
  <text x="360" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Styling Options in Next.js</text>

  <!-- Option boxes -->
  <rect x="20" y="50" width="105" height="60" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1"/>
  <text x="72" y="76" text-anchor="middle" fill="#93c5fd" font-weight="bold" font-size="11">Global CSS</text>
  <text x="72" y="93" text-anchor="middle" fill="#64748b" font-size="10">globals.css</text>

  <rect x="140" y="50" width="105" height="60" fill="#1e3a5f" rx="8" stroke="#06b6d4" stroke-width="1"/>
  <text x="193" y="73" text-anchor="middle" fill="#67e8f9" font-weight="bold" font-size="11">CSS</text>
  <text x="193" y="89" text-anchor="middle" fill="#67e8f9" font-weight="bold" font-size="11">Modules</text>
  <text x="193" y="103" text-anchor="middle" fill="#64748b" font-size="10">*.module.css</text>

  <rect x="260" y="50" width="105" height="60" fill="#0f2d1f" rx="8" stroke="#10b981" stroke-width="1"/>
  <text x="313" y="76" text-anchor="middle" fill="#6ee7b7" font-weight="bold" font-size="11">Tailwind CSS</text>
  <text x="313" y="93" text-anchor="middle" fill="#64748b" font-size="10">Utility-first</text>

  <rect x="380" y="50" width="105" height="60" fill="#2d1a00" rx="8" stroke="#f59e0b" stroke-width="1"/>
  <text x="433" y="73" text-anchor="middle" fill="#fcd34d" font-weight="bold" font-size="11">Styled</text>
  <text x="433" y="89" text-anchor="middle" fill="#fcd34d" font-weight="bold" font-size="11">Components</text>
  <text x="433" y="103" text-anchor="middle" fill="#64748b" font-size="10">CSS-in-JS</text>

  <rect x="500" y="50" width="105" height="60" fill="#2d0020" rx="8" stroke="#ec4899" stroke-width="1"/>
  <text x="553" y="76" text-anchor="middle" fill="#f9a8d4" font-weight="bold" font-size="11">Sass/SCSS</text>
  <text x="553" y="93" text-anchor="middle" fill="#64748b" font-size="10">*.module.scss</text>

  <rect x="620" y="50" width="85" height="60" fill="#1e1a00" rx="8" stroke="#eab308" stroke-width="1"/>
  <text x="663" y="73" text-anchor="middle" fill="#fde047" font-weight="bold" font-size="11">Emotion</text>
  <text x="663" y="89" text-anchor="middle" fill="#fde047" font-weight="bold" font-size="11">/ vanilla-</text>
  <text x="663" y="105" text-anchor="middle" fill="#64748b" font-size="10">extract</text>

  <!-- Recommendation row -->
  <rect x="20" y="135" width="680" height="65" fill="#1e293b" rx="8"/>
  <text x="370" y="158" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">🏆 Recommendations by Use Case</text>
  <text x="30" y="178" fill="#64748b" font-size="11">New project: Tailwind CSS   |   Enterprise: CSS Modules + Sass   |   Component library: Styled Components</text>
  <text x="30" y="195" fill="#64748b" font-size="11">Small project: Global CSS   |   Design system: Vanilla Extract   |   Legacy migration: CSS Modules</text>
</svg>
```

---

## 7.2 Global CSS

Global styles apply **everywhere** in your app. Import once in `layout.tsx`.

```css
/* app/globals.css */

/* CSS Variables for theming */
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --font-body: "Inter", sans-serif;
  --radius: 8px;
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #e2e8f0;
}

/* Reset & base styles */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

```tsx
// app/layout.tsx — Import globals here
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## 7.3 CSS Modules

CSS Modules provide **scoped CSS** — class names are automatically unique, preventing style conflicts.

```css
/* components/Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.primary:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #e5e7eb;
  color: #374151;
}
```

```tsx
// components/Button.tsx
import styles from "./Button.module.css";

// Combining multiple class names
function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

> ✅ **CSS Modules automatically scope** class names. `.button` becomes `.Button_button__xyz123` in production — no clashes!

---

## 7.4 Tailwind CSS

Tailwind is a **utility-first CSS framework** — instead of writing custom CSS, you apply small utility classes.

### Setup Tailwind in Next.js

```bash
# 1. Install
npm install -D tailwindcss postcss autoprefixer

# 2. Initialize
npx tailwindcss init -p
```

```js
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

```css
/* globals.css — add Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind Example

```tsx
// Responsive product card with dark mode
function ProductCard({ name, price, image }: Product) {
  return (
    <div className="
      bg-white dark:bg-gray-800
      rounded-xl shadow-md overflow-hidden
      hover:shadow-xl transition-shadow duration-300
      flex flex-col
    ">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">₹{price}</span>
          <button className="
            bg-blue-600 hover:bg-blue-700
            text-white font-medium
            px-4 py-2 rounded-lg
            transition-colors
          ">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 7.5 Sass/SCSS

Sass adds **superpowers to CSS** — variables, nesting, mixins, loops.

### Setup Sass

```bash
npm install --save-dev sass
```

```scss
// styles/components/_button.scss

// Variables
$primary: #3b82f6;
$danger: #ef4444;
$radius: 8px;

// Mixin for reusable styles
@mixin button-variant($bg, $hover) {
  background-color: $bg;
  &:hover {
    background-color: $hover;
  }
}

.button {
  padding: 0.5rem 1.25rem;
  border-radius: $radius;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, transform 0.1s;

  // Nested selector
  &:active {
    transform: scale(0.97);
  }

  // Variants using mixin
  &--primary {
    @include button-variant($primary, darken($primary, 10%));
    color: white;
  }

  &--danger {
    @include button-variant($danger, darken($danger, 10%));
    color: white;
  }
}
```

```tsx
// Use as CSS Module
import styles from "./button.module.scss";

<button className={`${styles.button} ${styles["button--primary"]}`}>
  Click Me
</button>
```

---

## 7.6 Dark Mode Implementation

```tsx
// components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check saved preference
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (systemPrefers ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

---

## 7.7 Responsive Design

### Mobile-First Approach

In Tailwind, **write for mobile first**, then add breakpoint prefixes for larger screens:

```tsx
<div className="
  grid grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2        // ≥640px: 2 columns
  md:grid-cols-3        // ≥768px: 3 columns
  lg:grid-cols-4        // ≥1024px: 4 columns
  gap-4
">
  {products.map(p => <ProductCard key={p.id} {...p} />)}
</div>
```

### Tailwind Breakpoints

| Prefix | Min Width | Use Case |
|--------|-----------|----------|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Wide screens |

---

## 7.8 Styling Comparison Tables

### Tailwind CSS vs CSS Modules

| Feature | Tailwind CSS | CSS Modules |
|---------|-------------|-------------|
| Write CSS? | ❌ No — utility classes only | ✅ Yes — write real CSS |
| Bundle size | Small (purged at build) | Grows with your CSS |
| Learning curve | Medium | Low |
| Customization | High (config file) | Full control |
| Readable HTML | ❌ Long classNames | ✅ Semantic names |
| Design system | ✅ Built-in | Manual |
| Best for | Fast prototyping | Enterprise / isolation |

### CSS-in-JS vs Traditional CSS

| | CSS-in-JS (Styled Components) | Traditional CSS/Modules |
|--|-------------------------------|------------------------|
| Dynamic styles | ✅ Via props | ❌ Need inline or JS |
| TypeScript support | ✅ Full | Partial |
| SSR complexity | ⚠️ Needs extra setup | ✅ Simple |
| Performance | ⚠️ Runtime overhead | ✅ No overhead |
| Bundle size | Larger | Smaller |
| Developer experience | ✅ Co-located | Separate files |

---

## 7.9 Common Mistakes in Styling

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Importing CSS modules in Server Components without issue — using dynamic classnames | Use `cn()` utility or static conditions |
| Not purging Tailwind — huge CSS bundle | Set `content` in tailwind.config properly |
| Global styles bleeding into components | Use CSS Modules for component styles |
| Inline styles for everything | Use Tailwind utilities or CSS Modules |
| No CSS variables for theming | Define `--var` in `:root` |

---

## 7.10 Interview Questions — Styling

1. **What is the difference between global CSS and CSS Modules?**
2. **How does Tailwind CSS reduce bundle size in production?**
3. **What is the purpose of `@tailwind base`, `@tailwind components`, `@tailwind utilities`?**
4. **How do you implement dark mode in Next.js with Tailwind?**
5. **What is CSS-in-JS? Name two libraries.**
6. **Why might CSS Modules be preferred in a large team?**
7. **What does `mobile-first` mean in responsive design?**
8. **How do you combine multiple class names in CSS Modules?**

---

# Section 8: Data Fetching

## 8.1 What is Data Fetching?

Data fetching is how your application **gets data** — from your own server, a database, or a third-party API. Next.js offers multiple strategies depending on your needs.

**Analogy:** Think of a restaurant. Some items are pre-made (static), some are cooked fresh (dynamic), and some are prepared ahead and refreshed regularly (incremental).

---

## 8.2 Client-Side vs Server-Side Fetching

```svg
<svg viewBox="0 0 740 300" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="740" height="300" fill="#0f1117" rx="12"/>
  <text x="370" y="30" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Data Fetching Lifecycle</text>

  <!-- Client fetch flow -->
  <rect x="20" y="50" width="680" height="100" fill="#1e293b" rx="8" stroke="#f59e0b" stroke-width="1"/>
  <text x="36" y="72" fill="#fcd34d" font-weight="bold" font-size="12">CLIENT-SIDE FETCHING (useEffect / SWR / React Query)</text>

  <rect x="36" y="82" width="110" height="50" fill="#92400e" rx="6"/>
  <text x="91" y="103" text-anchor="middle" fill="#fff" font-size="11">1. Page loads</text>
  <text x="91" y="119" text-anchor="middle" fill="#fde68a" font-size="10">Empty UI shown</text>

  <line x1="146" y1="107" x2="166" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="164,103 174,107 164,111" fill="#f59e0b"/>

  <rect x="174" y="82" width="120" height="50" fill="#92400e" rx="6"/>
  <text x="234" y="103" text-anchor="middle" fill="#fff" font-size="11">2. useEffect</text>
  <text x="234" y="119" text-anchor="middle" fill="#fde68a" font-size="10">fires after render</text>

  <line x1="294" y1="107" x2="314" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="312,103 322,107 312,111" fill="#f59e0b"/>

  <rect x="322" y="82" width="120" height="50" fill="#92400e" rx="6"/>
  <text x="382" y="103" text-anchor="middle" fill="#fff" font-size="11">3. API call</text>
  <text x="382" y="119" text-anchor="middle" fill="#fde68a" font-size="10">Loading spinner</text>

  <line x1="442" y1="107" x2="462" y2="107" stroke="#f59e0b" stroke-width="1.5"/>
  <polygon points="460,103 470,107 460,111" fill="#f59e0b"/>

  <rect x="470" y="82" width="110" height="50" fill="#92400e" rx="6"/>
  <text x="525" y="103" text-anchor="middle" fill="#fff" font-size="11">4. Data arrives</text>
  <text x="525" y="119" text-anchor="middle" fill="#fde68a" font-size="10">UI re-renders</text>

  <!-- Server fetch flow -->
  <rect x="20" y="170" width="680" height="100" fill="#1e293b" rx="8" stroke="#22c55e" stroke-width="1"/>
  <text x="36" y="192" fill="#86efac" font-weight="bold" font-size="12">SERVER-SIDE FETCHING (async Server Component)</text>

  <rect x="36" y="202" width="110" height="50" fill="#14532d" rx="6"/>
  <text x="91" y="223" text-anchor="middle" fill="#fff" font-size="11">1. Request</text>
  <text x="91" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">Server receives</text>

  <line x1="146" y1="227" x2="166" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="164,223 174,227 164,231" fill="#22c55e"/>

  <rect x="174" y="202" width="120" height="50" fill="#14532d" rx="6"/>
  <text x="234" y="223" text-anchor="middle" fill="#fff" font-size="11">2. Fetch data</text>
  <text x="234" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">DB/API on server</text>

  <line x1="294" y1="227" x2="314" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="312,223 322,227 312,231" fill="#22c55e"/>

  <rect x="322" y="202" width="120" height="50" fill="#14532d" rx="6"/>
  <text x="382" y="223" text-anchor="middle" fill="#fff" font-size="11">3. Render HTML</text>
  <text x="382" y="239" text-anchor="middle" fill="#bbf7d0" font-size="10">With data included</text>

  <line x1="442" y1="227" x2="462" y2="227" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="460,223 470,227 460,231" fill="#22c55e"/>

  <rect x="470" y="202" width="110" height="50" fill="#14532d" rx="6"/>
  <text x="525" y="220" text-anchor="middle" fill="#fff" font-size="11">4. Browser gets</text>
  <text x="525" y="236" text-anchor="middle" fill="#bbf7d0" font-size="10">complete HTML</text>
  <text x="525" y="249" text-anchor="middle" fill="#86efac" font-size="10">✅ No loading state</text>
</svg>
```

---

## 8.3 The `fetch` API in Next.js

Next.js **extends** the native `fetch` with caching options.

### Static Fetch (Cached Forever)

```tsx
// Cached at build time — only fetches once
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    cache: "force-cache", // Default behavior
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
```

### Dynamic Fetch (No Cache)

```tsx
// Fresh data on every request
async function getLiveStockPrice(symbol: string) {
  const res = await fetch(`https://api.example.com/stock/${symbol}`, {
    cache: "no-store", // Never cache — always fresh
  });
  return res.json();
}
```

### Revalidated Fetch (ISR-style)

```tsx
// Refresh every 60 seconds
async function getNews() {
  const res = await fetch("https://api.example.com/news", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return res.json();
}
```

---

## 8.4 Async Server Components

```tsx
// app/blog/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// This entire component runs on the server
async function BlogPage() {
  // Parallel fetching — much faster than sequential
  const [posts, categories] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
  ]);

  return (
    <div>
      <h1>Blog Posts ({posts.length})</h1>
      <ul>
        {posts.slice(0, 5).map((post: Post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogPage;
```

---

## 8.5 Suspense and Streaming

**Suspense** lets you show a **loading placeholder** while a component is fetching data. **Streaming** sends parts of the page as they're ready — users see content faster.

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

// Each section loads independently
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Shows skeleton while StatsSection loads */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Shows skeleton while RecentOrders loads */}
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  );
}

// Loading skeleton
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl" />
      ))}
    </div>
  );
}

// These are async Server Components
async function StatsSection() {
  const stats = await fetchStats(); // Slow DB query
  return <StatsGrid data={stats} />;
}

async function RecentOrders() {
  const orders = await fetchRecentOrders();
  return <OrdersTable data={orders} />;
}
```

---

## 8.6 Caching and Revalidation

```svg
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="700" height="280" fill="#0f1117" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold">Next.js Cache Workflow</text>

  <rect x="20" y="50" width="120" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">Request</text>
  <text x="80" y="88" text-anchor="middle" fill="#bfdbfe" font-size="11">User visits page</text>

  <line x1="140" y1="75" x2="180" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="178,71 188,75 178,79" fill="#475569"/>

  <rect x="188" y="50" width="130" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="253" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Cache Check</text>
  <text x="253" y="86" text-anchor="middle" fill="#fde68a" font-size="11">Is data cached?</text>

  <!-- Yes path -->
  <line x1="318" y1="65" x2="380" y2="65" stroke="#22c55e" stroke-width="1.5"/>
  <polygon points="378,61 388,65 378,69" fill="#22c55e"/>
  <text x="348" y="58" fill="#86efac" font-size="11">✅ HIT</text>

  <rect x="388" y="45" width="130" height="40" fill="#14532d" rx="8"/>
  <text x="453" y="62" text-anchor="middle" fill="#86efac" font-weight="bold">Serve from Cache</text>
  <text x="453" y="76" text-anchor="middle" fill="#bbf7d0" font-size="10">Instant response</text>

  <!-- No path -->
  <line x1="253" y1="100" x2="253" y2="135" stroke="#ef4444" stroke-width="1.5"/>
  <polygon points="249,133 253,143 257,133" fill="#ef4444"/>
  <text x="264" y="122" fill="#fca5a5" font-size="11">❌ MISS</text>

  <rect x="150" y="143" width="200" height="50" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="250" y="165" text-anchor="middle" fill="#fca5a5" font-weight="bold">Fetch Fresh Data</text>
  <text x="250" y="181" text-anchor="middle" fill="#fca5a5" font-size="11">Call API/DB</text>

  <!-- Store in cache -->
  <line x1="350" y1="168" x2="390" y2="168" stroke="#a78bfa" stroke-width="1.5"/>
  <polygon points="388,164 398,168 388,172" fill="#a78bfa"/>

  <rect x="398" y="148" width="150" height="40" fill="#2d1b69" rx="8" stroke="#a78bfa" stroke-width="1"/>
  <text x="473" y="165" text-anchor="middle" fill="#c4b5fd" font-weight="bold">Store in Cache</text>
  <text x="473" y="179" text-anchor="middle" fill="#a78bfa" font-size="10">With TTL / revalidate</text>

  <!-- Revalidation -->
  <rect x="20" y="220" width="660" height="45" fill="#1e293b" rx="8"/>
  <text x="350" y="240" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Revalidation Strategies</text>
  <text x="30" y="256" fill="#64748b" font-size="11">Time-based: next: { revalidate: 60 }   |   On-demand: revalidatePath('/blog')   |   Tag-based: revalidateTag('posts')</text>
</svg>
```

### On-Demand Revalidation

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json();

  // Validate secret to prevent abuse
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (path) {
    revalidatePath(path); // Revalidate a specific page
  }

  if (tag) {
    revalidateTag(tag); // Revalidate all fetches with this tag
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
```

---

## 8.7 Error Handling in Data Fetching

```tsx
// app/products/page.tsx

async function ProductsPage() {
  let products = [];
  let error = null;

  try {
    const res = await fetch("https://api.example.com/products");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    products = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

Or use Next.js `error.tsx` for automatic error boundaries:

```tsx
// app/products/error.tsx
"use client"; // Error components must be Client Components

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center py-20">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
```

---

## 8.8 Client-Side Fetching with React Query

For complex client-side scenarios, **React Query** (TanStack Query) is the industry standard:

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

```tsx
// components/UserProfile.tsx
"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <div className="skeleton h-20" />;
  if (error) return <p className="text-red-500">Error loading user</p>;

  return <div>{user.name}</div>;
}
```

---

## 8.9 Data Fetching Comparison Tables

### Client vs Server Fetching

| Aspect | Client-Side Fetching | Server-Side Fetching |
|--------|---------------------|---------------------|
| When data loads | After component mounts | Before page sends to browser |
| Loading state needed | ✅ Yes | ❌ No (data is ready) |
| SEO | ❌ Content not in HTML | ✅ Content in HTML |
| API keys exposure | ⚠️ Risky in browser | ✅ Safe on server |
| Real-time updates | ✅ Easy with polling/WS | ❌ Requires revalidation |
| User-specific data | ✅ Ideal | ✅ Also possible |
| Bundle size | Adds fetch code | No impact |

### Cache Strategies

| Strategy | Config | When to Use |
|----------|--------|-------------|
| Static (cached forever) | `cache: "force-cache"` | Marketing pages, docs |
| Time-based revalidation | `next: { revalidate: 60 }` | News, prices, feeds |
| No cache (always fresh) | `cache: "no-store"` | User data, auth pages |
| Tag-based revalidation | `next: { tags: ["posts"] }` | CMS-driven content |

---

## 8.10 Interview Questions — Data Fetching

1. **What is the difference between `cache: "force-cache"` and `cache: "no-store"`?**
2. **How does `next: { revalidate: 60 }` work?**
3. **What is `Suspense` and how does it improve UX?**
4. **What is streaming in Next.js? How does it differ from traditional rendering?**
5. **When would you use client-side fetching over server-side fetching?**
6. **What is `revalidatePath`? When is it useful?**
7. **How do you handle errors in server component data fetching?**
8. **What is the waterfall problem in data fetching? How do you fix it?**
9. **What is `Promise.all` and why is it important for performance?**
10. **What is React Query and when should you prefer it over `fetch`?**

---

# Section 9: Rendering Methods

## 9.1 The Four Rendering Strategies

Next.js offers four main rendering strategies. Choosing the right one impacts **performance**, **SEO**, and **user experience** significantly.

| Strategy | Acronym | When HTML is Generated |
|----------|---------|----------------------|
| Static Site Generation | SSG | At **build time** |
| Server-Side Rendering | SSR | At **request time** |
| Incremental Static Regeneration | ISR | Build time + **periodic refresh** |
| Client-Side Rendering | CSR | In the **browser** |

---

## 9.2 Static Site Generation (SSG)

**SSG** pre-renders pages at build time. All pages become static HTML files — blazing fast.

```tsx
// app/blog/[slug]/page.tsx

// Tell Next.js all possible blog post slugs at build time
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/posts").then((r) =>
    r.json()
  );

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// This page is statically generated for each slug
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`, {
    cache: "force-cache", // Cache this forever (SSG behavior)
  }).then((r) => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default BlogPost;
```

```svg
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="680" height="240" fill="#0f1117" rx="12"/>
  <text x="340" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">SSG Build Flow</text>

  <rect x="20" y="50" width="110" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">npm run</text>
  <text x="75" y="88" text-anchor="middle" fill="#93c5fd" font-weight="bold">build</text>

  <line x1="130" y1="75" x2="160" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="158,71 168,75 158,79" fill="#475569"/>

  <rect x="168" y="50" width="120" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="228" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Fetch all data</text>
  <text x="228" y="86" text-anchor="middle" fill="#fde68a" font-size="11">API calls run once</text>

  <line x1="288" y1="75" x2="318" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="316,71 326,75 316,79" fill="#475569"/>

  <rect x="326" y="50" width="130" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="391" y="70" text-anchor="middle" fill="#86efac" font-weight="bold">Generate HTML</text>
  <text x="391" y="86" text-anchor="middle" fill="#bbf7d0" font-size="11">One file per page</text>

  <line x1="456" y1="75" x2="486" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="484,71 494,75 484,79" fill="#475569"/>

  <rect x="494" y="50" width="120" height="50" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="554" y="70" text-anchor="middle" fill="#d8b4fe" font-weight="bold">Deploy to CDN</text>
  <text x="554" y="86" text-anchor="middle" fill="#e9d5ff" font-size="11">Global distribution</text>

  <rect x="20" y="130" width="640" height="90" fill="#1e293b" rx="8"/>
  <text x="340" y="150" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">SSG Characteristics</text>
  <text x="36" y="170" fill="#64748b" font-size="11">✅ Fastest possible load time (HTML served from CDN edge)</text>
  <text x="36" y="188" fill="#64748b" font-size="11">✅ Best for: blogs, docs, marketing pages, portfolios</text>
  <text x="36" y="206" fill="#64748b" font-size="11">❌ Not for: real-time data, user-specific content, dashboards requiring fresh data</text>
</svg>
```

---

## 9.3 Server-Side Rendering (SSR)

**SSR** generates HTML **on every request**. Always fresh, always current.

```tsx
// app/dashboard/page.tsx

// Force dynamic rendering (SSR behavior)
export const dynamic = "force-dynamic";

async function DashboardPage() {
  // This runs on EVERY request — always fresh data
  const userData = await fetch("https://api.example.com/user/me", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }).then((r) => r.json());

  return (
    <div>
      <h1>Welcome back, {userData.name}</h1>
      <p>Last login: {userData.lastLogin}</p>
    </div>
  );
}

export default DashboardPage;
```

```svg
<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="680" height="240" fill="#0f1117" rx="12"/>
  <text x="340" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">SSR Request Flow</text>

  <rect x="20" y="50" width="110" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="72" text-anchor="middle" fill="#93c5fd" font-weight="bold">User</text>
  <text x="75" y="88" text-anchor="middle" fill="#93c5fd" font-weight="bold">Request</text>

  <line x1="130" y1="75" x2="160" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="158,71 168,75 158,79" fill="#475569"/>

  <rect x="168" y="50" width="110" height="50" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1.5"/>
  <text x="223" y="70" text-anchor="middle" fill="#fca5a5" font-weight="bold">Next.js</text>
  <text x="223" y="86" text-anchor="middle" fill="#fca5a5" font-weight="bold">Server</text>

  <line x1="278" y1="75" x2="308" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="306,71 316,75 306,79" fill="#475569"/>

  <rect x="316" y="50" width="110" height="50" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="371" y="70" text-anchor="middle" fill="#fcd34d" font-weight="bold">Fetch Data</text>
  <text x="371" y="86" text-anchor="middle" fill="#fde68a" font-size="11">DB / API call</text>

  <line x1="426" y1="75" x2="456" y2="75" stroke="#475569" stroke-width="2"/>
  <polygon points="454,71 464,75 454,79" fill="#475569"/>

  <rect x="464" y="50" width="110" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="519" y="70" text-anchor="middle" fill="#86efac" font-weight="bold">Render &</text>
  <text x="519" y="86" text-anchor="middle" fill="#bbf7d0" font-size="11">Send HTML</text>

  <!-- Notes -->
  <rect x="20" y="130" width="640" height="90" fill="#1e293b" rx="8"/>
  <text x="340" y="150" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">SSR Characteristics</text>
  <text x="36" y="170" fill="#64748b" font-size="11">✅ Always fresh — data fetched on every single request</text>
  <text x="36" y="188" fill="#64748b" font-size="11">✅ Best for: user dashboards, e-commerce product pages, real-time data</text>
  <text x="36" y="206" fill="#64748b" font-size="11">⚠️ Slower than SSG — server must render before responding; no CDN caching of HTML</text>
</svg>
```

---

## 9.4 Incremental Static Regeneration (ISR)

**ISR** is the best of both worlds — pages are static but **automatically refreshed** on a schedule.

```tsx
// app/shop/[id]/page.tsx

// ISR: regenerate this page every 10 minutes
export const revalidate = 600; // seconds

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`)
    .then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
      {/* Last updated shown to user */}
      <small>Updated: {new Date().toLocaleString()}</small>
    </div>
  );
}

export default ProductPage;
```

```svg
<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="700" height="290" fill="#0f1117" rx="12"/>
  <text x="350" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">ISR Regeneration Flow</text>

  <!-- Build -->
  <rect x="20" y="55" width="100" height="50" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1"/>
  <text x="70" y="76" text-anchor="middle" fill="#93c5fd" font-weight="bold">Build</text>
  <text x="70" y="92" text-anchor="middle" fill="#bfdbfe" font-size="10">Static HTML</text>

  <line x1="120" y1="80" x2="155" y2="80" stroke="#475569" stroke-width="1.5"/>
  <polygon points="153,76 163,80 153,84" fill="#475569"/>

  <!-- CDN -->
  <rect x="163" y="55" width="100" height="50" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1"/>
  <text x="213" y="76" text-anchor="middle" fill="#86efac" font-weight="bold">CDN Serves</text>
  <text x="213" y="92" text-anchor="middle" fill="#bbf7d0" font-size="10">Fast responses</text>

  <!-- User arrow -->
  <line x1="263" y1="80" x2="298" y2="80" stroke="#475569" stroke-width="1.5"/>
  <polygon points="296,76 306,80 296,84" fill="#475569"/>

  <rect x="306" y="55" width="100" height="50" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1"/>
  <text x="356" y="76" text-anchor="middle" fill="#d8b4fe" font-weight="bold">User gets</text>
  <text x="356" y="92" text-anchor="middle" fill="#e9d5ff" font-size="10">cached page</text>

  <!-- Timer -->
  <line x1="356" y1="105" x2="356" y2="140" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
  <rect x="290" y="140" width="130" height="40" fill="#3b1f00" rx="6" stroke="#f59e0b" stroke-width="1"/>
  <text x="355" y="158" text-anchor="middle" fill="#fcd34d" font-weight="bold">⏰ Revalidate time</text>
  <text x="355" y="172" text-anchor="middle" fill="#fde68a" font-size="10">e.g. 60 seconds passed</text>

  <!-- Background regen -->
  <line x1="355" y1="180" x2="355" y2="210" stroke="#475569" stroke-width="1.5"/>
  <polygon points="351,208 355,218 359,208" fill="#475569"/>

  <rect x="260" y="218" width="190" height="40" fill="#450a0a" rx="8" stroke="#ef4444" stroke-width="1"/>
  <text x="355" y="235" text-anchor="middle" fill="#fca5a5" font-weight="bold">Background regen</text>
  <text x="355" y="251" text-anchor="middle" fill="#fca5a5" font-size="10">New HTML built silently</text>

  <!-- Note -->
  <rect x="480" y="140" width="195" height="80" fill="#1e293b" rx="8"/>
  <text x="578" y="160" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="11">Key Behavior:</text>
  <text x="490" y="178" fill="#64748b" font-size="10">Old page served until</text>
  <text x="490" y="193" fill="#64748b" font-size="10">new one is ready.</text>
  <text x="490" y="208" fill="#86efac" font-size="10">✅ Zero downtime updates</text>
</svg>
```

---

## 9.5 Client-Side Rendering (CSR)

**CSR** renders entirely in the browser. The server sends minimal HTML; React builds the UI.

```tsx
// components/LiveChart.tsx
"use client";

import { useEffect, useState } from "react";

interface DataPoint {
  time: string;
  value: number;
}

// Pure CSR — browser fetches and renders all data
export function LiveChart({ dataUrl }: { dataUrl: string }) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(dataUrl);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };

    fetchData();

    // Poll every 5 seconds for live updates
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [dataUrl]);

  if (loading) return <div className="animate-pulse h-40 bg-gray-200 rounded" />;

  return (
    <div>
      {/* Render chart with data */}
      {data.map((point, i) => (
        <div key={i}>{point.time}: {point.value}</div>
      ))}
    </div>
  );
}
```

---

## 9.6 Rendering Methods Comparison

### SSR vs SSG vs ISR vs CSR

| Feature | SSR | SSG | ISR | CSR |
|---------|-----|-----|-----|-----|
| HTML generated | Per request | At build | Build + refresh | In browser |
| Performance | Medium | 🏆 Fastest | Fast | Slow initial |
| SEO | ✅ Excellent | ✅ Excellent | ✅ Excellent | ❌ Poor |
| Data freshness | 🏆 Always fresh | Stale | Periodic | Controlled |
| Server load | High | None (CDN) | Low | None |
| Personalized | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| Build time | Fast | Slow (all pages) | Fast | Fast |
| Use cases | Dashboards, auth | Blogs, docs | E-commerce | Real-time apps |

### SEO Comparison

| Method | SEO Score | Reason |
|--------|-----------|--------|
| SSG | ⭐⭐⭐⭐⭐ | Static HTML on CDN, fastest crawl |
| ISR | ⭐⭐⭐⭐⭐ | Same as SSG + auto-refresh |
| SSR | ⭐⭐⭐⭐ | HTML rendered per request, great for bots |
| CSR | ⭐⭐ | Bots may not run JavaScript |

---

## 9.7 Hydration Deep Dive

**Partial Hydration** — Next.js only hydrates Client Components, not Server Components. This makes apps faster.

**Streaming Rendering** — With Suspense, parts of the page stream to the browser as they're ready. No need to wait for all data.

```tsx
// This page streams content progressively
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      {/* Immediately sent — no waiting */}
      <Header />

      {/* Streams when ready */}
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>

      {/* Also streams independently */}
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </>
  );
}
```

---

## 9.8 Edge Rendering

Next.js can run pages at **CDN edge locations** for ultra-low latency worldwide.

```tsx
// app/api/geo/route.ts
export const runtime = "edge"; // Run at CDN edge

export async function GET(request: Request) {
  // Runs at the nearest edge location to the user
  return new Response("Hello from the edge!", {
    headers: { "Content-Type": "text/plain" },
  });
}
```

---

## 9.9 Choosing the Right Rendering Method

```
Is content the same for all users?
  ├── YES → Does it change frequently?
  │         ├── NO → SSG (blogs, docs, marketing)
  │         └── YES → ISR (news, product pages, pricing)
  └── NO → Is SEO important?
            ├── YES → SSR (user-specific but SEO-critical)
            └── NO → CSR (dashboards, real-time, auth-only)
```

---

## 9.10 Interview Questions — Rendering Methods

1. **What is the difference between SSG and SSR?**
2. **When would you choose ISR over SSG?**
3. **What does `export const dynamic = "force-dynamic"` do?**
4. **What is `generateStaticParams` and when is it used?**
5. **What is partial hydration? How does it help performance?**
6. **What is streaming rendering in Next.js?**
7. **Can you mix SSG and SSR on the same site?**
8. **What happens when a user requests a page that hasn't been statically generated yet (ISR)?**
9. **What is edge rendering? What are its benefits?**
10. **How does CSR affect SEO? How do you mitigate this?**

---

# Section 10: API Routes and Backend

## 10.1 What Are API Routes?

Next.js lets you build a **full backend API** inside your Next.js project. No separate Node.js server needed.

**Analogy:** Your Next.js app is a restaurant. The frontend (pages) is the dining room, and the API routes are the kitchen — handling orders (requests) and sending back food (responses).

API routes live in `app/api/` and are defined as `route.ts` files.

---

## 10.2 Route Handlers Basics

```tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from "next/server";

// Handle GET requests to /api/hello
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Hello from Next.js API!",
    timestamp: new Date().toISOString(),
  });
}

// Handle POST requests to /api/hello
export async function POST(request: NextRequest) {
  const body = await request.json(); // Parse JSON body

  return NextResponse.json({
    received: body,
    success: true,
  }, { status: 201 }); // 201 Created
}
```

---

## 10.3 All HTTP Methods

```tsx
// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// GET /api/products/123 — Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await db.product.findById(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/123 — Replace entire product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updated = await db.product.replace(params.id, body);
  return NextResponse.json(updated);
}

// PATCH /api/products/123 — Update part of product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const updated = await db.product.update(params.id, body); // Partial update
  return NextResponse.json(updated);
}

// DELETE /api/products/123 — Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.product.delete(params.id);
  return NextResponse.json({ deleted: true }, { status: 200 });
}
```

---

## 10.4 API Request/Response Lifecycle

```svg
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" font-family="monospace" font-size="12">
  <rect width="720" height="320" fill="#0f1117" rx="12"/>
  <text x="360" y="28" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">API Route Request Lifecycle</text>

  <!-- Client -->
  <rect x="20" y="55" width="100" height="60" fill="#1e3a5f" rx="8" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="70" y="80" text-anchor="middle" fill="#93c5fd" font-weight="bold">Client</text>
  <text x="70" y="96" text-anchor="middle" fill="#bfdbfe" font-size="10">Browser /</text>
  <text x="70" y="110" text-anchor="middle" fill="#bfdbfe" font-size="10">Mobile App</text>

  <!-- Arrow -->
  <line x1="120" y1="85" x2="155" y2="85" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="153,81 163,85 153,89" fill="#3b82f6"/>
  <text x="138" y="77" fill="#3b82f6" font-size="10">HTTP</text>

  <!-- Middleware -->
  <rect x="163" y="55" width="100" height="60" fill="#3b1f00" rx="8" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="213" y="80" text-anchor="middle" fill="#fcd34d" font-weight="bold">Middleware</text>
  <text x="213" y="96" text-anchor="middle" fill="#fde68a" font-size="10">Auth check</text>
  <text x="213" y="110" text-anchor="middle" fill="#fde68a" font-size="10">Rate limit</text>

  <line x1="263" y1="85" x2="298" y2="85" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="296,81 306,85 296,89" fill="#f59e0b"/>

  <!-- Route Handler -->
  <rect x="306" y="55" width="110" height="60" fill="#14532d" rx="8" stroke="#22c55e" stroke-width="1.5"/>
  <text x="361" y="77" text-anchor="middle" fill="#86efac" font-weight="bold">Route</text>
  <text x="361" y="93" text-anchor="middle" fill="#86efac" font-weight="bold">Handler</text>
  <text x="361" y="109" text-anchor="middle" fill="#bbf7d0" font-size="10">route.ts</text>

  <line x1="416" y1="85" x2="451" y2="85" stroke="#22c55e" stroke-width="2"/>
  <polygon points="449,81 459,85 449,89" fill="#22c55e"/>

  <!-- DB / API -->
  <rect x="459" y="55" width="100" height="60" fill="#2d1057" rx="8" stroke="#a855f7" stroke-width="1.5"/>
  <text x="509" y="80" text-anchor="middle" fill="#d8b4fe" font-weight="bold">Database</text>
  <text x="509" y="96" text-anchor="middle" fill="#e9d5ff" font-size="10">MongoDB</text>
  <text x="509" y="110" text-anchor="middle" fill="#e9d5ff" font-size="10">MySQL etc.</text>

  <line x1="559" y1="85" x2="594" y2="85" stroke="#a855f7" stroke-width="2"/>
  <polygon points="592,81 602,85 592,89" fill="#a855f7"/>

  <!-- Response -->
  <rect x="602" y="55" width="95" height="60" fill="#1e293b" rx="8" stroke="#64748b" stroke-width="1.5"/>
  <text x="650" y="80" text-anchor="middle" fill="#94a3b8" font-weight="bold">Response</text>
  <text x="650" y="96" text-anchor="middle" fill="#64748b" font-size="10">JSON data</text>
  <text x="650" y="110" text-anchor="middle" fill="#64748b" font-size="10">Status code</text>

  <!-- Return arrow -->
  <line x1="650" y1="115" x2="650" y2="160" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="650" y1="160" x2="70" y2="160" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <line x1="70" y1="160" x2="70" y2="115" stroke="#475569" stroke-width="1.5" stroke-dasharray="4"/>
  <polygon points="66,117 70,107 74,117" fill="#475569"/>
  <text x="360" y="155" text-anchor="middle" fill="#475569" font-size="11">← Response travels back to client</text>

  <!-- Status codes reference -->
  <rect x="20" y="185" width="680" height="115" fill="#1e293b" rx="8"/>
  <text x="360" y="205" text-anchor="middle" fill="#94a3b8" font-weight="bold" font-size="12">Common HTTP Status Codes</text>
  <text x="36" y="225" fill="#86efac" font-size="11">200 OK — Request succeeded    201 Created — Resource created    204 No Content — Success, nothing to return</text>
  <text x="36" y="243" fill="#fcd34d" font-size="11">400 Bad Request — Invalid input    401 Unauthorized — Not logged in    403 Forbidden — No permission</text>
  <text x="36" y="261" fill="#fca5a5" font-size="11">404 Not Found — Resource missing    409 Conflict — Duplicate resource</text>
  <text x="36" y="279" fill="#f87171" font-size="11">500 Internal Server Error — Server crashed    503 Service Unavailable — Server busy</text>
</svg>
```

---

## 10.5 Complete CRUD API Example — Products

```tsx
// app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";

// Simulated database (replace with real DB)
let products = [
  { id: 1, name: "Laptop", price: 75000, stock: 10 },
  { id: 2, name: "Phone", price: 25000, stock: 50 },
];

// GET /api/products — List all products
export async function GET(request: NextRequest) {
  // Support query params: /api/products?search=laptop
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const filtered = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return NextResponse.json({ products: filtered, total: filtered.length });
}

// POST /api/products — Create new product
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validation
  if (!body.name || !body.price) {
    return NextResponse.json(
      { error: "name and price are required" },
      { status: 400 }
    );
  }

  const newProduct = {
    id: Date.now(),
    name: body.name,
    price: body.price,
    stock: body.stock ?? 0,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}
```

```tsx
// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

// GET /api/products/1
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// DELETE /api/products/1
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  products.splice(index, 1);
  return NextResponse.json({ message: "Deleted successfully" });
}
```

---

## 10.6 Authentication API

```tsx
// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose"; // JWT library

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // 1. Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  // 2. Find user (in real app: query database)
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // 3. Create JWT token
  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  // 4. Set HTTP-only cookie (more secure than localStorage)
  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email },
    message: "Login successful",
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,   // JS cannot access — prevents XSS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

// Placeholder functions — implement with bcrypt and your DB
async function findUserByEmail(email: string) {
  return null; // Replace with actual DB query
}

async function verifyPassword(password: string, hash: string) {
  return false; // Replace with bcrypt.compare()
}
```

---

## 10.7 MongoDB API Integration

```tsx
// lib/mongodb.ts — Connection helper
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse connection in development (hot reload creates new connections)
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Fresh connection in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

```tsx
// app/api/users/route.ts — MongoDB CRUD
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("myapp");

  const users = await db.collection("users").find({}).toArray();

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("myapp");

  const result = await db.collection("users").insertOne({
    ...body,
    createdAt: new Date(),
  });

  return NextResponse.json(
    { insertedId: result.insertedId },
    { status: 201 }
  );
}
```

---

## 10.8 MySQL API Integration

```tsx
// lib/mysql.ts — MySQL connection pool
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

```tsx
// app/api/orders/route.ts — MySQL example
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2";

interface Order extends RowDataPacket {
  id: number;
  product_name: string;
  quantity: number;
  total_price: number;
}

export async function GET() {
  const [rows] = await pool.execute<Order[]>(
    "SELECT * FROM orders ORDER BY created_at DESC LIMIT 50"
  );
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const { productId, quantity, userId } = await request.json();

  const [result] = await pool.execute(
    "INSERT INTO orders (product_id, quantity, user_id, created_at) VALUES (?, ?, ?, NOW())",
    [productId, quantity, userId]
  );

  return NextResponse.json({ success: true, result }, { status: 201 });
}
```

---

## 10.9 File Uploads

```tsx
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to /public/uploads
  const filename = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    filename,
  });
}
```

---

## 10.10 Middleware Integration

```tsx
// middleware.ts — runs before every request
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Protected routes pattern
const protectedRoutes = ["/dashboard", "/profile", "/api/user"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this route needs protection
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next(); // Allow through
  }

  // Get token from cookie
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    // Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify JWT
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next(); // Allow through
  } catch {
    // Invalid token
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware to these paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/user/:path*"],
};
```

---

## 10.11 Environment Variables

```bash
# .env.local — Never commit this file!

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/myapp
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=myapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# API Keys
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...

# Public vars (exposed to browser — safe to expose)
NEXT_PUBLIC_APP_URL=https://myapp.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

```tsx
// Using env vars in API routes
const dbUri = process.env.MONGODB_URI; // Server-only
const appUrl = process.env.NEXT_PUBLIC_APP_URL; // Available everywhere

// ❌ Never do this in client code
const secret = process.env.JWT_SECRET; // Undefined in browser — stays server-only
```

> **Rule:** Only vars prefixed with `NEXT_PUBLIC_` are available in the browser. All others are server-only.

---

## 10.12 API Validation with Zod

```tsx
// app/api/users/route.ts — with Zod validation
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

// Define schema
const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().min(18, "Must be 18 or older").optional(),
  role: z.enum(["admin", "user", "moderator"]).default("user"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate with Zod
  const result = CreateUserSchema.safeParse(body);

  if (!result.success) {
    // Return detailed validation errors
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // result.data is fully typed and validated
  const { name, email, role } = result.data;

  // Create user in DB...
  return NextResponse.json({ name, email, role }, { status: 201 });
}
```

---

## 10.13 Security Best Practices

| Practice | Implementation |
|----------|---------------|
| Input validation | Use Zod or Joi for all inputs |
| SQL injection prevention | Parameterized queries (never string concat) |
| XSS prevention | `httpOnly` cookies, sanitize HTML output |
| CORS headers | Set `Access-Control-Allow-Origin` explicitly |
| Rate limiting | Use `upstash/ratelimit` or middleware |
| Secrets management | `.env.local`, never commit secrets |
| HTTPS only | `secure: true` on cookies in production |
| Authentication | Verify JWT on every protected route |

---

## 10.14 API Rate Limiting

```tsx
// middleware.ts — Basic rate limiting with Upstash Redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 } // 429 Too Many Requests
    );
  }

  return NextResponse.next();
}
```

---

## 10.15 Common Mistakes in API Routes

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| No input validation | Always validate with Zod or manual checks |
| Returning passwords in response | Never include sensitive fields |
| Hardcoding secrets | Use `.env.local` |
| No error handling | Wrap in try/catch, return proper status codes |
| No authentication on protected routes | Use middleware |
| Using GET for state-changing operations | GET = read, POST/PUT/DELETE = write |
| Returning 200 for errors | Use correct status codes (400, 401, 404, 500) |

---

## 10.16 Interview Questions — API Routes

1. **What is a Route Handler in Next.js? How is it different from a page?**
2. **What is `NextRequest` and how is it different from the native `Request`?**
3. **How do you read query parameters in a Route Handler?**
4. **What is the difference between PUT and PATCH?**
5. **How do you protect an API route with authentication?**
6. **What is CORS and how do you handle it in Next.js?**
7. **How do you handle file uploads in a Next.js API route?**
8. **What is middleware in Next.js? Where does it run?**
9. **What is the difference between `NEXT_PUBLIC_` env vars and regular ones?**
10. **How would you implement rate limiting in a Next.js API?**

---

# Summary

## Important Concepts Covered

### Section 6 — Components
- **Server Components** run on the server, never hydrated — zero JS bundle impact
- **Client Components** (`"use client"`) handle interactivity and browser APIs
- **Hydration** is React attaching to server-rendered HTML
- **`dynamic()`** enables lazy loading for performance optimization
- **Composition pattern** builds complex UIs from simple, focused components

### Section 7 — Styling
- **CSS Modules** provide scoped, conflict-free styles
- **Tailwind CSS** enables rapid development with utility classes
- **Dark mode** is implemented via `class` toggle and CSS variables
- **Mobile-first** responsive design uses Tailwind's breakpoint prefixes

### Section 8 — Data Fetching
- **Server-side fetching** in async Server Components is the Next.js default
- **`cache: "no-store"`** forces fresh data; **`next: { revalidate: N }`** enables ISR-style caching
- **Suspense + Streaming** progressively loads page sections
- **React Query** handles complex client-side data management

### Section 9 — Rendering Methods
- **SSG** — fastest, built at compile time, best for static content
- **SSR** — always fresh, runs per request, best for personalized content
- **ISR** — static with automatic refresh, best for frequently updating content
- **CSR** — browser-rendered, best for real-time/interactive apps

### Section 10 — API Routes
- Route Handlers (`route.ts`) support all HTTP methods
- **Middleware** runs before every request — ideal for auth
- **Environment variables** keep secrets server-side
- **Zod** validates and types API inputs automatically

---

## Architecture Recap

```
Next.js App
├── Frontend (React Components)
│   ├── Server Components → Run on server, zero JS, async data
│   └── Client Components → Run in browser, interactive
├── Styling
│   ├── CSS Modules → Scoped, no conflicts
│   └── Tailwind CSS → Utility-first, rapid development
├── Data Layer
│   ├── Server fetch → Direct DB/API access in components
│   └── API Routes → /api/* for client fetching
├── Rendering
│   ├── SSG → Build-time HTML (CDN)
│   ├── SSR → Per-request HTML
│   ├── ISR → Periodic revalidation
│   └── CSR → Browser rendering
└── Backend (Route Handlers)
    ├── REST API → CRUD operations
    ├── Middleware → Auth, rate limiting
    └── DB integrations → MongoDB, MySQL
```

---

# Key Takeaways

## Performance Tips
1. **Default to Server Components** — reduce client JavaScript bundle
2. **Use `dynamic()` with `ssr: false`** for browser-only heavy libraries
3. **Prefer SSG/ISR over SSR** unless data must be per-request
4. **Use `Promise.all()`** for parallel data fetching (avoid waterfall)
5. **Purge Tailwind** correctly to keep CSS bundle minimal
6. **Use Suspense** to progressively stream UI instead of loading states

## Rendering Strategy Tips
1. **Blog/docs/marketing** → SSG (fastest + best SEO)
2. **Product listing** → ISR (fresh enough + fast)
3. **User dashboard** → SSR or CSR (personalized)
4. **Real-time features** → CSR with polling or WebSockets
5. **Auth-protected pages** → SSR with middleware

## Component Best Practices
1. **Keep components small and focused** — one purpose each
2. **Lift state up** when siblings need shared state
3. **Type all props** with TypeScript interfaces
4. **Use composition** instead of deeply nested props
5. **Name components clearly** — `ProductCard`, not `Card2`

---

# Practice Exercises

## Beginner

1. Create a `Greeting` Server Component that accepts a `name` prop and displays a personalized message.
2. Build a `Counter` Client Component using `useState`.
3. Write a CSS Module for a `Badge` component with 3 variants (success, warning, error).
4. Create a Tailwind-styled `Navbar` that is responsive on mobile.
5. Write an API route at `/api/ping` that returns `{ status: "ok", timestamp: "..." }`.

## Intermediate

6. Build a `BlogList` page that fetches posts from `jsonplaceholder.typicode.com` using a Server Component.
7. Implement dark mode toggle using Tailwind's `dark:` prefix and `localStorage`.
8. Create a full CRUD API for a `Todo` resource with in-memory storage.
9. Use `Suspense` to show a skeleton while a slow data component loads.
10. Implement a `Modal` component with Escape key close and click-outside close.

## Advanced

11. Build an ISR product page that revalidates every 5 minutes and supports on-demand revalidation.
12. Implement JWT-based authentication with login/logout API routes and middleware protection.
13. Create a streaming page where 3 sections load independently with different data sources.
14. Build a file upload API with type and size validation, saving to disk.
15. Implement a search API with MongoDB text search, pagination, and sorting.
16. Create a theme system with CSS variables supporting light/dark/custom themes.
17. Build a rate-limited API endpoint that allows 5 requests per minute per IP.

---

# Mini Project Ideas

## 1. Personal Blog Application
- **Stack:** Next.js + MDX + Tailwind + Vercel
- **Features:** SSG for articles, ISR for homepage, Dark mode, RSS feed
- **API Routes:** Newsletter signup, comment submission

## 2. Weather Application
- **Stack:** Next.js + OpenWeather API + Tailwind
- **Features:** CSR with location detection, 5-day forecast, SSR for initial load
- **Concepts:** Client fetching, Suspense, skeleton loaders, Geolocation API

## 3. Admin Dashboard
- **Stack:** Next.js + MongoDB + Tailwind + JWT auth
- **Features:** Protected routes via middleware, Stats with charts, User management
- **Concepts:** SSR, API Routes, Middleware, CRUD operations, Data visualization

## 4. Authentication System
- **Stack:** Next.js + NextAuth.js / custom JWT + MongoDB
- **Features:** Login/register, Google OAuth, Password reset, Profile management
- **Concepts:** JWT, HTTP-only cookies, Protected routes, Middleware, Email APIs

## 5. Product Management System (E-Commerce)
- **Stack:** Next.js + MySQL + Stripe + Tailwind
- **Features:** ISR product pages, Cart with Zustand, Stripe payments, Admin panel
- **Concepts:** ISR, API routes, File uploads, Webhooks, Form validation

---

# Interview Preparation

## Beginner Questions

1. What is Next.js and why use it over plain React?
2. What is the App Router? How is it different from Pages Router?
3. What is a Server Component?
4. What does `"use client"` do?
5. What is the difference between CSS Modules and global CSS?
6. What is Tailwind CSS?
7. What is data fetching?
8. What is SSG?
9. What is an API Route in Next.js?
10. What is hydration?

## Intermediate Questions

11. Explain the difference between SSG, SSR, and ISR.
12. When would you choose SSR over SSG?
13. What is `next: { revalidate }` and how does it work?
14. How do you protect routes in Next.js?
15. What is `NextResponse` and how do you use it?
16. What is the Composition Pattern in React?
17. How does Tailwind's `dark:` prefix work?
18. What is the difference between `cache: "no-store"` and `cache: "force-cache"`?
19. What is `dynamic()` in Next.js?
20. How do you handle errors in Server Components?

## Advanced Scenario-Based Questions

21. **"Your blog is slow — how would you optimize it?"**
   → Use SSG for articles, ISR for homepage, dynamic import for heavy editor, image optimization, prefetch.

22. **"Your e-commerce site shows stale prices. What strategy would you use?"**
   → ISR with `revalidate: 60` (1 min) + on-demand revalidation triggered by inventory webhook.

23. **"You need to build a dashboard with user-specific data — what rendering method?"**
   → SSR or CSR. SSR if SEO matters or initial render speed is critical. CSR if data is highly dynamic.

24. **"How would you prevent an API key from being exposed in the browser?"**
   → Keep in `.env.local` without `NEXT_PUBLIC_` prefix. Use API routes as proxy to call external APIs.

25. **"Your Server Component needs to render interactive content — how do you structure it?"**
   → Server Component fetches data, passes it as props to a Client Component for interaction. Never make everything a Client Component.

26. **"How would you implement authentication that persists across page refreshes?"**
   → JWT stored in `httpOnly` cookie, verified in middleware on every request. Never store JWT in localStorage.

27. **"You have 10 API calls on a page — how do you make them fast?"**
   → Use `Promise.all()` for parallel fetching. Use Suspense so each section streams independently.

28. **"What is a hydration error and how do you fix it?"**
   → Server HTML doesn't match client render. Fix: don't use `Date.now()` or `Math.random()` in Server Components without caution; use `suppressHydrationWarning` sparingly.

---

> **End of Next.js Notes — Part 2**
>
> Sections 1–5 are covered in Part 1 (Foundations, File System, Routing, Layouts, Navigation).

---

*Generated for PrepTechLab — Production-Ready Next.js Learning Resource*
