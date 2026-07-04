---
title: "Routing"
description: "React Router setup, navigation, route types, and routing interview summary."
---

## Routing


#  What is React Routing?

In **React**:

> 👉 Routing = showing different UI based on the URL **without reloading the page**

---

##  Simple Example

```txt
/           -> Home Page
/about      -> About Page
/contact    -> Contact Page
```

👉 React changes components, not the whole page

---

#  Library Used

👉 Most common library:

**React Router**

---

#  Basic Setup

---

## Step 1: Install

```bash
npm install react-router-dom
```

---

## Step 2: Basic Routing Example

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

##  Flow

```txt
URL changes -> Router matches path -> renders component
```

---

#  Navigation (VERY IMPORTANT)

---

## Using Link

```jsx
import { Link } from "react-router-dom";

<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

👉 Prevents page reload (SPA behavior)

---

##  Avoid

```html
<a href="/about">About</a>
```

👉 Causes full page reload

---

#  Types of Routing (Important)

---

#  1. Static Routing

👉 Fixed routes

```jsx
<Route path="/about" element={<About />} />
```

---

#  2. Dynamic Routing (VERY IMPORTANT )

👉 URL with variable

```jsx
<Route path="/user/:id" element={<User />} />
```

---

## Access param

```jsx
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h1>User {id}</h1>;
}
```

---

#  3. Nested Routing

👉 Routes inside routes

---

## Example

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## Layout

```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
```

---

#  4. Protected Routes (Auth)

👉 Restrict access

```jsx
function ProtectedRoute({ children }) {
  const isAuth = true;

  return isAuth ? children : <h1>Login First</h1>;
}
```

---

## Usage

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

#  5. Programmatic Navigation

👉 Navigate using code

```jsx
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/about")}>
      Go to About
    </button>
  );
}
```

---

#  6. Query Parameters

👉 URL like:

```txt
/products?category=electronics
```

---

## Access it

```jsx
import { useSearchParams } from "react-router-dom";

function Products() {
  const [params] = useSearchParams();
  const category = params.get("category");

  return <h1>{category}</h1>;
}
```

---

#  7. Lazy Loading (Performance)

👉 Load pages only when needed

```jsx
const About = React.lazy(() => import("./About"));

<Suspense fallback={<p>Loading...</p>}>
  <About />
</Suspense>
```

---

#  Important Concepts

---

## 1. SPA (Single Page Application)

👉 React doesn't reload page
👉 Only updates component

---

## 2. Route Matching

👉 React checks URL -> finds matching route

---

## 3. Layout Pattern (VERY IMPORTANT)

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
</Route>
```

---

#  Real-World Example

```jsx
function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

#  Common Mistakes

* Using `<a>` instead of `<Link>`
* Forgetting `<Outlet />` in nested routes
* Not handling 404 page

---

#  Final Mental Model

```txt
URL -> Route match -> Component render -> UI update
```

---

#  Interview Summary

> "React Router enables navigation in a SPA by mapping URLs to components. It supports static, dynamic, nested, and protected routes, along with programmatic navigation and query handling."

---
