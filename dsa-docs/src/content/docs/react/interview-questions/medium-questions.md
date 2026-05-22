---
title: "React Medium Interview Questions"
description: "Medium React interview questions for mid-level roles."
---

#  Medium Questions - Mid Level

> Assumes you know the basics.
> These are asked for **1-3 years experience** roles.

---

## Q26. Explain all `useEffect` dependency array cases

The dependency array is the most nuanced part of `useEffect`. It controls *when* the effect re-runs. ESLint's `exhaustive-deps` rule will tell you if you're missing dependencies.

```jsx
// Case 1: No array - runs after EVERY render
// Use: almost never - usually a bug
useEffect(() => {
  console.log('renders every time');
});

// Case 2: Empty array - runs ONCE after mount
// Use: initial data fetch, one-time setup
useEffect(() => {
  fetchInitialData();
  setupEventListeners();
  return () => removeEventListeners();
}, []);

// Case 3: With dependencies - runs on mount AND when deps change
// Use: re-fetch when ID changes, react to prop changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Warning: Object dependency - new object reference every render = infinite loop risk
const options = { page: 1 }; // new object created on every render
useEffect(() => {
  fetchData(options);
}, [options]); //  runs on every render!

//  Fix: use primitive value or useMemo
useEffect(() => {
  fetchData({ page });
}, [page]); // only runs when page actually changes
```

> Warning: **Missing dependencies trap:** If you read a prop or state variable inside `useEffect` but don't add it to the deps array, the effect will run with a **stale closure** - seeing old values. Always follow the `exhaustive-deps` ESLint rule. If adding a dep causes infinite loops, the real fix is usually `useMemo` or `useCallback`.

---

## Q27. What is `useMemo`?

`useMemo` **caches the result of an expensive calculation** between renders. It only recalculates when one of its dependencies changes. Think of it as memoization for computed values.

```jsx
import { useMemo, useState } from 'react';

function ProductList({ products, searchQuery }) {
  // Without useMemo - filters on EVERY render (even unrelated re-renders)
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // With useMemo - only recalculates when products or searchQuery changes
  const filteredProducts = useMemo(() => {
    console.log('Filtering...'); // only logs when deps change
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

**When to use `useMemo`:**
- Expensive array filtering, sorting, or transformations
- Complex derived data calculations
- Objects/arrays passed as props to memoized children or as dependencies to other hooks

**When NOT to use `useMemo`:**
For simple operations (string concatenation, basic math), the memoization overhead costs *more* than just recomputing. Always profile first.

---

## Q28. What is `useCallback`?

`useCallback` returns a **memoized function reference** - the same function object between renders unless its dependencies change. Without it, a new function is created every render, which breaks `React.memo` on child components.

```jsx
import { useCallback, useState, memo } from 'react';

// Child wrapped in memo - only re-renders when props change (by reference)
const TodoItem = memo(function({ todo, onDelete }) {
  console.log('TodoItem rendered', todo.id);
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([...]);
  const [filter, setFilter] = useState('all');

  //  Without useCallback - new function every render
  // -> memo on TodoItem is useless (new prop = always re-renders)
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  //  With useCallback - same function reference between renders
  // -> memo on TodoItem actually works
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // empty array - setTodos is a stable reference

  return todos.map(todo => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}
```

> **useMemo vs useCallback:** They solve the same problem for different things. `useMemo` caches a computed *value*. `useCallback` caches a *function*. In fact, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

---

## Q29. What is `useReducer`?

`useReducer` manages **complex state logic** using a reducer function. It's an alternative to `useState` for scenarios with multiple related state values or state transitions that depend on the previous state.

The pattern: all state transitions are described as "actions" dispatched to a pure reducer function.

```jsx
import { useReducer } from 'react';

// Reducer - pure function: (currentState, action) => newState
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item?.price || 0),
      };
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state; // always return state for unknown actions
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <div>
      <p>Total: ₹{state.total}</p>
      <button onClick={() => dispatch({
        type: 'ADD_ITEM',
        payload: { id: 1, name: 'Shirt', price: 499 }
      })}>
        Add Shirt
      </button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        Clear
      </button>
    </div>
  );
}
```

**`useState` vs `useReducer`:**
- Use `useState` for: simple primitive values, independent state fields
- Use `useReducer` for: multiple related values that change together, complex transitions, next state depends on previous, or you want Redux-like testability (reducers are pure functions - easy to unit test)

---

## Q30. What are Custom Hooks?

A custom hook is a **function whose name starts with `use`** and that calls one or more React hooks. It's the primary mechanism for **extracting and reusing stateful logic** across multiple components without changing their UI or component hierarchy.

```jsx
// Custom hook - reusable fetch logic
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => { if (isMounted) setData(d); })
      .catch(e => { if (isMounted) setError(e.message); })
      .finally(() => { if (isMounted) setLoading(false); });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}

// Usage - clean and reusable in ANY component
function UserProfile({ id }) {
  const { data: user, loading, error } = useFetch(`/api/users/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}

function PostList({ userId }) {
  const { data: posts, loading } = useFetch(`/api/posts?user=${userId}`);

  if (loading) return <p>Loading posts...</p>;
  return posts?.map(post => <PostCard key={post.id} post={post} />);
}
```

> **Good custom hook candidates:** Data fetching, form state + validation, debouncing, localStorage sync, window resize/scroll tracking, WebSocket connections, infinite scroll, media query matching. Anything you find yourself copy-pasting between components is a custom hook waiting to be extracted.

---

## Q31. Rules of Hooks - what are they and why do they exist?

**Two rules:**

1. Only call hooks **at the top level** - not inside `if`/`else`, loops, or nested functions
2. Only call hooks **from React function components or custom hooks** - not regular JS functions

```jsx
//  WRONG - hook inside condition
function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [data, setData] = useState(null); // BREAKS rules
  }
}

//  WRONG - hook inside loop
function Component({ count }) {
  for (let i = 0; i < count; i++) {
    const [val] = useState(i); // BREAKS rules
  }
}

//  CORRECT - hooks always at top level, conditions go INSIDE
function Component({ isLoggedIn }) {
  const [data, setData] = useState(null); // always at top level
  useEffect(() => {
    if (isLoggedIn) fetchData(); // condition is INSIDE the hook
  }, [isLoggedIn]);
}
```

**Why this rule exists:**
React tracks hooks internally by their **call order** in an array. Every render must call hooks in the same order. If a condition skips a hook, the array index shifts and React maps the wrong state to the wrong hook - silently corrupting all subsequent state.

---

## Q32. What is `React.memo`?

`React.memo` is a Higher Order Component that **skips re-rendering if the props haven't changed** (shallow comparison by default). Without it, a child re-renders any time its parent re-renders - even if the child's props are identical.

```jsx
import { memo } from 'react';

// Without memo - re-renders whenever parent renders
function UserCard({ name, email }) {
  console.log('UserCard rendered'); // logs even if name/email unchanged
  return <div>{name} - {email}</div>;
}

// With memo - skips re-render if name and email are same
const UserCard = memo(function({ name, email }) {
  console.log('UserCard rendered'); // only logs when props actually change
  return <div>{name} - {email}</div>;
});

// Custom comparison function (optional) - for complex objects
const UserCard = memo(
  function({ user }) { return <div>{user.name}</div>; },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
  // return true = skip re-render (props are "equal")
  // return false = re-render (props changed)
);
```

> Warning: **memo only works with stable props.** `memo` is useless if the parent passes a new object literal or arrow function every render (e.g. `<Child style={{ color: 'red' }} />`). Always pair with `useMemo` and `useCallback` for object/function props.

---

## Q33. What is the difference between `useEffect` and `useLayoutEffect`?

Both run after React updates the DOM. The timing difference: `useLayoutEffect` runs **synchronously before the browser has a chance to paint**, while `useEffect` runs asynchronously after the paint.

```
State change
    -> React updates DOM
    -> useLayoutEffect runs synchronously <- measure DOM here
    -> Browser paints (user sees update)
    -> useEffect runs asynchronously
```

```jsx
// useEffect - runs AFTER paint (async)
// Use for: data fetching, subscriptions, most side effects
useEffect(() => {
  fetchData();
}, []);

// useLayoutEffect - runs AFTER DOM update but BEFORE paint (sync)
// Use for: DOM measurements that must happen before the user sees anything
useLayoutEffect(() => {
  const height = elementRef.current.offsetHeight;
  setTooltipPosition(height); // no visual flicker - browser hasn't painted yet
}, []);
```

> **Default to `useEffect`.** Use `useLayoutEffect` only when you see a visual flicker or need to synchronously measure DOM layout. Because it runs synchronously, it blocks the browser from painting - overuse hurts performance.

---

## Q34. What is Lifting State Up?

When two or more sibling components need to share state, the solution is to **move the state up to their closest common ancestor** (parent). The parent owns the state and passes it down as props. This creates a "single source of truth."

```jsx
//  Two independent states - they never sync
function Celsius()    { const [temp, setTemp] = useState(0);  ... }
function Fahrenheit() { const [temp, setTemp] = useState(32); ... }

//  Lifted state - parent is the single source of truth
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  const fahrenheit = celsius * 9/5 + 32; // derived - no separate state needed

  return (
    <>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay value={fahrenheit} />
    </>
  );
}
```

---

## Q35. What are Error Boundaries?

Error Boundaries are **class components that catch JavaScript errors in their child component tree** and display a fallback UI instead of crashing the entire app. Without them, a single component error unmounts the whole React tree.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when a child throws - update state to show fallback
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Called with error info - use for error logging services
  componentDidCatch(error, info) {
    console.error('Error:', error);
    logToService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage - wrap around components that might throw
<ErrorBoundary>
  <UserProfile />
  <PostList />
</ErrorBoundary>
```

**What Error Boundaries do NOT catch:**
- Event handler errors (use try/catch inside handlers)
- Async errors (setTimeout, Promise rejections)
- Server-side rendering errors
- Errors thrown inside the boundary itself

---

## Q36. What is `React.lazy` and Code Splitting?

By default, all JavaScript is bundled into one file that loads upfront. Code splitting **breaks the bundle into smaller chunks** that load on demand - reducing initial page load time. `React.lazy` enables lazy loading components, and `Suspense` shows a fallback while the chunk downloads.

```jsx
import { lazy, Suspense } from 'react';

// Instead of static import (all downloaded upfront):
// import Dashboard from './pages/Dashboard';

// Lazy import - Dashboard.js chunk only downloads when user visits /dashboard
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));
const Profile   = lazy(() => import('./pages/Profile'));

function App() {
  return (
    // Suspense shows fallback while the chunk is downloading
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/profile"   element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
// Result: Initial bundle ~50KB instead of ~200KB
// Each page loads only when the user visits it
```

---

## Q37. Context API vs Redux - when to use which?

| Use Context for | Use Redux / Zustand for |
|---|---|
| Theme (light/dark) | Complex state with many transitions |
| Current authenticated user | State updated from many unrelated places |
| Language / locale | Need time-travel debugging (Redux DevTools) |
| Data shared across many levels | Large teams where predictability matters |
| Rarely-changing global data | Caching, optimistic updates, offline support |

> Warning: **Context performance caveat:** Every component that calls `useContext(MyContext)` re-renders when the context value changes. For frequently-changing data consumed by many components, split into multiple contexts by update frequency, or use Zustand (which has built-in selector support to avoid unnecessary re-renders).

---

## Q38. What is `forwardRef`?

By default, refs only work on native DOM elements. When you attach a `ref` to a custom component, React ignores it. `forwardRef` is the opt-in mechanism that lets a component **forward a received ref down to an internal DOM element**.

```jsx
import { forwardRef, useRef } from 'react';

// Without forwardRef, ref would be ignored
const CustomInput = forwardRef(function(props, ref) {
  return (
    <div className="input-wrapper">
      <input ref={ref} {...props} className="fancy-input" />
      {/* ↑ the ref is forwarded to the actual input */}
    </div>
  );
});

// Now the parent can access the actual <input> DOM node
function Form() {
  const inputRef = useRef(null);

  const focusInput = () => inputRef.current.focus();

  return (
    <>
      <CustomInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

---

## Q39. Why does StrictMode call components twice?

In **React 18 StrictMode (development only)**, React intentionally **mounts, unmounts, then remounts** every component. This simulates what would happen with features like Fast Refresh or future React optimizations that reuse component instances.

The goal: **surface bugs from missing cleanup functions in effects**.

```jsx
// If your app breaks on double-mount, you have a cleanup bug:

//  No cleanup - second mount creates a duplicate subscription
useEffect(() => {
  const subscription = subscribe(userId);
  // missing cleanup!
}, []);

//  With cleanup - remount is perfectly safe
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe(); // cleanup runs between mounts
}, []);
```

> This is development-only behavior. In production, components mount exactly once. If your app only works in production but not development StrictMode, you have a real bug that will eventually surface in other ways.

---

## Q40. What is the difference between `<Link>` and `<NavLink>` in React Router?

Both render an anchor tag for client-side navigation (no page reload). The difference: `NavLink` provides an **active state** - it knows whether its `to` path matches the current URL - so you can style active navigation links.

```jsx
import { Link, NavLink } from 'react-router-dom';

// Link - basic navigation, no active state awareness
<Link to="/about">About</Link>

// NavLink - provides isActive for styling the current route
<NavLink
  to="/dashboard"
  className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}
>
  Dashboard
</NavLink>

// NavLink with inline style
<NavLink
  to="/profile"
  style={({ isActive }) => ({
    color: isActive ? '#007bff' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
  })}
>
  Profile
</NavLink>
```

---

## Q41. What is `<Outlet>` in React Router v6?

`Outlet` is a **placeholder component in a parent layout route where its matched child route renders**. This enables "nested routing" - a persistent shell (navbar, sidebar, footer) that stays mounted while only the inner page content swaps out.

```jsx
// Route config - Layout is the persistent shell
<Route path="/" element={<Layout />}>
  <Route path="home"      element={<Home />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="settings"  element={<Settings />} />
</Route>

// Layout.jsx - renders once, child page content appears at <Outlet />
function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main>
        <Outlet />  {/* Home / Dashboard / Settings renders here */}
      </main>
      <footer>© 2025</footer>
    </div>
  );
}
```

---

## Q42. How do you do programmatic navigation in React Router v6?

```jsx
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);

    navigate('/dashboard');                         // go to route
    navigate(-1);                                   // browser back
    navigate(1);                                    // browser forward
    navigate('/login', { replace: true });          // replace history entry (no back button)
    navigate('/profile', {
      state: { from: 'login', message: 'Welcome back!' }
    });                                             // pass state to destination
  };

  // Read state passed via navigate
  const location = useLocation();
  console.log(location.state?.message); // 'Welcome back!'

  // URL params  ->  /users/:id
  const { id } = useParams();

  // Query strings  ->  /search?query=react&tab=hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query'); // 'react'
}
```

---

## Q43. What is Redux? Explain its core concepts.

Redux is a **predictable state container** - a single centralized store for your entire application's state. All state changes happen through a strict unidirectional flow.

**Core concepts:**
1. **Store** - single object holding ALL app state
2. **Action** - plain object describing what happened `{ type, payload }`
3. **Reducer** - pure function: `(state, action) => newState`
4. **Dispatch** - the only way to trigger a state change
5. **Selector** - function to read specific data from the store

Today, always use **Redux Toolkit** - it eliminates the boilerplate of old Redux.

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Slice - state + reducers + actions bundled together
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },          // Immer allows apparent mutation
    decrement: state => { state.value -= 1; },
    incrementBy: (state, action) => {
      state.value += action.payload;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// In component
function Counter() {
  const count    = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.incrementBy(5))}>+5</button>
    </>
  );
}
```

---

## Q44. What is Zustand and how is it different from Redux?

Zustand is a **minimal, unopinionated state manager**. No actions, no reducers, no Provider required - just a store you create and import anywhere. It's dramatically less boilerplate than Redux for most apps.

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  // State
  count: 0,
  user: null,

  // Actions live inside the store
  increment: () => set(state => ({ count: state.count + 1 })),
  setUser:   (user) => set({ user }),
  reset:     () => set({ count: 0, user: null }),
}));

// No Provider needed - just import and use anywhere
function Counter() {
  const count     = useStore(state => state.count);     // selector prevents unnecessary re-renders
  const increment = useStore(state => state.increment);

  return <button onClick={increment}>{count}</button>;
}
```

| | Redux Toolkit | Zustand |
|---|---|---|
| Setup | Store + slices + Provider | One `create()` call |
| Boilerplate | Moderate | Minimal |
| DevTools | Excellent Redux DevTools | Built-in middleware |
| Performance | Selector-based | Selector-based |
| Best for | Large apps, teams, complex flows | Small-medium apps |

---

## Q45. What causes unnecessary re-renders and how do you fix them?

```jsx
// Cause 1: Object/array created fresh each render
//  New object reference every render -> child sees "new" prop -> re-renders
<Child options={{ theme: 'dark' }} />

//  Memoize the object
const options = useMemo(() => ({ theme: 'dark' }), []);
<Child options={options} />

// Cause 2: Inline function in JSX
//  New function reference every render -> breaks memo
<Child onClick={() => handleClick(id)} />

//  useCallback for stable reference
const handleClick = useCallback(() => doThing(id), [id]);
<Child onClick={handleClick} />

// Cause 3: Context value object created inline
//  New object every render -> ALL consumers re-render
<MyContext.Provider value={{ user, setUser }}>

//  Memoize context value
const value = useMemo(() => ({ user, setUser }), [user]);
<MyContext.Provider value={value}>

// Cause 4: Derived state stored in useState
//  Redundant state that's just computed from other state
const [items, setItems] = useState([]);
const [count, setCount] = useState(0); // unnecessary!

//  Derive directly - no extra state, no extra re-render
const count = items.length;
```

---

## Q46. What is Reconciliation in React?

Reconciliation is React's algorithm for **efficiently computing the minimum set of DOM changes** needed when the virtual DOM changes. React follows three key heuristics:

1. **Different types = full rebuild.** If a `<div>` becomes a `<span>`, React destroys the entire subtree and builds a fresh one. All child component state is lost.
2. **Same type = update attributes only.** If the element type stays the same, React patches only what changed (e.g., just `className`).
3. **Lists use keys.** Keys let React match items between old and new renders - enabling moves, insertions, and deletions without unnecessarily re-rendering untouched items.

```jsx
// Rule 1 - type change: destroys entire subtree (state reset!)
// Before: <div><Counter /></div>
// After:  <span><Counter /></span>
// -> Counter is DESTROYED and remounted from scratch

// Rule 2 - same type: only updates changed attributes
// Before: <div className="red" id="box" />
// After:  <div className="blue" id="box" />
// -> React updates ONLY className, id is untouched

// Rule 3 - keys help match list items across renders
// Before: [Apple(id:1), Banana(id:2)]
// After:  [Banana(id:2), Apple(id:1)]  <- order changed
// With key: React moves DOM nodes - no re-render of content 
// Without key: React thinks both items changed -> re-renders both 
```

---

## Q47. What happens when a component's `key` prop changes?

When a `key` changes, React treats the component as a **completely different instance** - it unmounts the old one (clearing all state) and mounts a fresh one. This is a deliberate pattern used to **force reset a component's internal state** without lifting that state up.

```jsx
// Problem: switching users, but UserForm still shows old user's input
<UserForm userId={userId} />  //  form state persists across users

// Solution: key change forces full remount = all state reset
<UserForm key={userId} userId={userId} />  //  clean slate for each user

// More use cases:
// - Reset a form when switching records
// - Force re-fetch and reset when ID changes
// - Clear animation state
```

---
