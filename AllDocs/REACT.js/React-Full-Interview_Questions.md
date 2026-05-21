# ⚛️ React Complete Interview Guide — Easy → Medium → Hard

> Covers **all levels**: Fresher → Junior → Mid → Senior
> React 16.8+ (Hooks era) → React 18 → React 19
> Total: **60 Questions** with expanded explanations and code examples

---

## 📋 Table of Contents

| Level | Topics | Questions |
|---|---|---|
| 🟢 [Easy](#-easy-questions--fresher--junior) | Basics, JSX, Components, Props, State, Core Hooks | Q1–Q25 |
| 🟡 [Medium](#-medium-questions--mid-level) | Hooks Deep Dive, Patterns, Router, State Management, Performance | Q26–Q47 |
| 🔴 [Hard](#-hard-questions--senior--expert) | React 18/19, Fiber, Concurrent, Server Components, Internals | Q48–Q60 |

### Quick Jump

🟢 Easy (Q1–Q25)

- [Q1 — What is React? Why do we use it?](#q1-what-is-react-why-do-we-use-it)
- [Q2 — Library vs Framework difference](#q2-what-is-the-difference-between-a-library-and-a-framework)
- [Q3 — What is JSX?](#q3-what-is-jsx)
- [Q4 — What is a Component?](#q4-what-is-a-component-in-react)
- [Q5 — What are Props?](#q5-what-are-props)
- [Q6 — What is State?](#q6-what-is-state)
- [Q7 — Props vs State](#q7-what-is-the-difference-between-props-and-state)
- [Q8 — What is the Virtual DOM?](#q8-what-is-the-virtual-dom)
- [Q9 — React.createElement vs JSX](#q9-what-is-the-difference-between-reactcreateelement-and-jsx)
- [Q10 — How to render a list?](#q10-how-do-you-render-a-list-in-react)
- [Q11 — What is the key prop?](#q11-what-is-the-key-prop-and-why-is-it-needed)
- [Q12 — Conditional Rendering](#q12-what-is-conditional-rendering)
- [Q13 — Handling events](#q13-how-do-you-handle-events-in-react)
- [Q14 — What is a Fragment?](#q14-what-is-a-fragment-in-react)
- [Q15 — What is useState?](#q15-what-is-usestate)
- [Q16 — What is useEffect?](#q16-what-is-useeffect)
- [Q17 — What is useRef?](#q17-what-is-useref)
- [Q18 — What is useContext?](#q18-what-is-usecontext)
- [Q19 — What is Prop Drilling?](#q19-what-is-prop-drilling-and-why-is-it-a-problem)
- [Q20 — null vs undefined vs false in JSX](#q20-what-is-the-difference-between-null-undefined-and-false-in-jsx)
- [Q21 — Child to Parent data passing](#q21-how-do-you-pass-data-from-child-to-parent)
- [Q22 — Controlled vs Uncontrolled Components](#q22-what-are-controlled-and-uncontrolled-components)
- [Q23 — What is React.StrictMode?](#q23-what-is-reactstrictmode)
- [Q24 — export default vs named export](#q24-what-is-the-difference-between-export-default-and-named-export)
- [Q25 — What is the children prop?](#q25-what-is-the-children-prop)

🟡 Medium (Q26–Q47)

- [Q26 — useEffect dependency array cases](#q26-explain-all-useeffect-dependency-array-cases)
- [Q27 — What is useMemo?](#q27-what-is-usememo)
- [Q28 — What is useCallback?](#q28-what-is-usecallback)
- [Q29 — What is useReducer?](#q29-what-is-usereducer)
- [Q30 — Custom Hooks](#q30-what-are-custom-hooks)
- [Q31 — Rules of Hooks](#q31-rules-of-hooks--what-are-they-and-why-do-they-exist)
- [Q32 — What is React.memo?](#q32-what-is-reactmemo)
- [Q33 — useEffect vs useLayoutEffect](#q33-what-is-the-difference-between-useeffect-and-uselayouteffect)
- [Q34 — Lifting State Up](#q34-what-is-lifting-state-up)
- [Q35 — Error Boundaries](#q35-what-are-error-boundaries)
- [Q36 — React.lazy and Code Splitting](#q36-what-is-reactlazy-and-code-splitting)
- [Q37 — Context API vs Redux](#q37-context-api-vs-redux--when-to-use-which)
- [Q38 — What is forwardRef?](#q38-what-is-forwardref)
- [Q39 — Why StrictMode calls components twice](#q39-why-does-strictmode-call-components-twice)
- [Q40 — Link vs NavLink](#q40-what-is-the-difference-between-link-and-navlink-in-react-router)
- [Q41 — What is Outlet?](#q41-what-is-outlet-in-react-router-v6)
- [Q42 — Programmatic navigation](#q42-how-do-you-do-programmatic-navigation-in-react-router-v6)
- [Q43 — What is Redux?](#q43-what-is-redux-explain-its-core-concepts)
- [Q44 — What is Zustand vs Redux?](#q44-what-is-zustand-and-how-is-it-different-from-redux)
- [Q45 — Unnecessary re-renders](#q45-what-causes-unnecessary-re-renders-and-how-do-you-fix-them)
- [Q46 — What is Reconciliation?](#q46-what-is-reconciliation-in-react)
- [Q47 — What happens when key prop changes?](#q47-what-happens-when-a-components-key-prop-changes)


🔴 Hard (Q48–Q60)

- [Q48 — React Fiber architecture](#q48-what-is-the-react-fiber-architecture)
- [Q49 — Concurrent Rendering](#q49-what-is-concurrent-mode--concurrent-rendering)
- [Q50 — useTransition vs useDeferredValue](#q50-what-is-usetransition-and-usedeferredvalue-when-to-use-each)
- [Q51 — React Server Components](#q51-what-are-react-server-components-rsc)
- [Q52 — useOptimistic (React 19)](#q52-what-is-useoptimistic-react-19)
- [Q53 — useActionState (React 19)](#q53-what-is-useactionstate-react-19)
- [Q54 — Automatic Batching](#q54-what-is-automatic-batching-in-react-18)
- [Q55 — React Compiler](#q55-what-is-the-react-compiler-react-forget)
- [Q56 — use() hook (React 19)](#q56-what-is-the-use-hook-react-19)
- [Q57 — Complete rendering lifecycle](#q57-explain-the-complete-rendering-lifecycle-in-react-18)
- [Q58 — What is Hydration?](#q58-what-is-hydration-in-react)
- [Q59 — Performance anti-patterns](#q59-what-are-common-react-performance-anti-patterns)
- [Q60 — useEffect vs server-side code](#q60-what-is-the-difference-between-useeffect-and-server-side-code)

---

# 🟢 Easy Questions — Fresher / Junior

> If you're just starting out, master these first.
> These are asked in **every** React interview regardless of level.

---

## Q1. What is React? Why do we use it?

React is an **open-source JavaScript library** made by Meta (Facebook) for building **user interfaces**.

It is **NOT a full framework** — it only handles the **View layer** (what you see on screen). You compose it with other tools for routing, HTTP, state management, etc.

**Why React?**

| Problem Without React | How React Solves It |
|---|---|
| Manually updating DOM is slow and error-prone | Virtual DOM handles updates efficiently |
| Code gets messy in large apps | Component-based — break UI into small reusable pieces |
| Hard to share UI logic | Props + custom hooks allow reuse |
| Hard to manage app state | useState, useReducer, Context built-in |

```jsx
// Without React — imperative (tell browser HOW to update)
document.getElementById('count').innerText = count;
document.getElementById('btn').addEventListener('click', () => { ... });

// With React — declarative (describe WHAT you want, React figures out HOW)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

> **Interview tip:** React is a **library**, not a framework. The key distinction: with a library, *you* call it. With a framework like Angular, it calls *your* code. Next.js is a framework built *on top* of React.

---

## Q2. What is the difference between a Library and a Framework?

The core difference is **Inversion of Control** — who is in charge.

| | Library (React) | Framework (Angular) |
|---|---|---|
| Control | **You** call the library when needed | Framework calls **your** code at designated points |
| Flexibility | Pick any tools alongside it | Follows framework conventions and structure |
| Size/Scope | Small — just the view layer | Full package: routing, HTTP, forms, etc. |
| Learning curve | Easier to start, compose yourself | Steeper but more structured and opinionated |

> **Analogy:** A library is like a toolbox — you pick what you need. A framework is like a pre-built construction system — everything is decided for you, you just follow the workflow.

---

## Q3. What is JSX?

JSX = **JavaScript XML** — a syntax extension that lets you write HTML-like code inside JavaScript. Babel (a transpiler) converts it into regular `React.createElement()` calls before it runs in the browser.

JSX is not mandatory, but it makes code far more readable and is used in virtually every React codebase.

```jsx
// JSX (what you write)
const element = <h1 className="title">Hello World</h1>;

// What Babel compiles it to (under the hood)
const element = React.createElement('h1', { className: 'title' }, 'Hello World');
```

**JSX Rules:**

```jsx
// 1. Must return ONE root element — use Fragment if needed
return (
  <>                      {/* Fragment — renders nothing in DOM */}
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// 2. Use className, not class (class is a reserved JS keyword)
<div className="container">

// 3. All tags must be closed — even self-closing ones
<img src="pic.jpg" />    // ✅
<br />                   // ✅

// 4. JavaScript expressions go in { }
<h1>{user.name}</h1>
<p>{2 + 2}</p>

// 5. Attributes use camelCase
<input onChange={fn} maxLength={10} />
```

> **Common gotcha:** JSX is not HTML. `class` → `className`, `for` → `htmlFor`, event names are camelCase (`onclick` → `onClick`). These trip up many beginners.

---

## Q4. What is a Component in React?

A component is an **independent, reusable piece of UI**. Think of it like a LEGO brick — you build complex interfaces by combining small, focused components. Each component manages its own structure, style, and behavior.

React has two types:
- **Functional components** (modern — always use these)
- **Class components** (legacy — avoid in new code)

Since React 16.8 introduced Hooks, functional components can do everything class components can.

```jsx
// Functional Component — modern standard
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Use it like an HTML element
<Welcome name="Prathamesh" />
// Renders: Hello, Prathamesh!

// Class Component (old — avoid)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

> **Naming rule:** Component names **must start with a capital letter**. `<button>` is a native HTML element; `<Button>` is your custom React component. This is how React tells them apart.

---

## Q5. What are Props?

Props (short for **Properties**) are the mechanism for passing data **from a parent component to a child component**. They flow in one direction only: top-down (parent → child).

**Props are read-only** — a child should never try to modify its own props. This one-way data flow makes React apps predictable and easy to debug.

```jsx
// Parent passes data as props
function App() {
  return (
    <UserCard
      name="Prathamesh"
      age={22}
      isAdmin={true}
      onClick={() => alert('clicked')}
    />
  );
}

// Child receives props via function parameters
function UserCard({ name, age, isAdmin, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}
```

**Default Props:**
```jsx
// Set defaults directly in the function signature
function Button({ label = 'Click me', color = 'blue' }) {
  return <button style={{ color }}>{label}</button>;
}
```

> **Key insight:** The same piece of data can be *state* in one component and a *prop* in another. A parent stores it as state (can change it), then passes it as a prop to children (who read it but can't change it).

---

## Q6. What is State?

State is a component's **own internal data that can change over time**. Unlike props (which come from the parent), state is created and owned by the component itself.

When state changes, React **automatically re-renders** the component to reflect the new data in the UI. In functional components, state is managed using the `useState` hook.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // [value, setter] — initial value = 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

> ⚠️ **Never mutate state directly:**
> `count = count + 1` ❌ — changes the variable but doesn't trigger a re-render.
> `setCount(count + 1)` ✅ — tells React state changed, triggering a re-render.

---

## Q7. What is the difference between Props and State?

| Aspect | Props | State |
|---|---|---|
| Who owns it | Parent component | The component itself |
| Can it change | ❌ Read-only from child's view | ✅ Yes, via the setter function |
| Who changes it | Only the parent (source) | Only the component that owns it |
| How to access | Function parameter / destructure | `useState` hook |
| Triggers re-render | Yes, when parent re-renders with new value | Yes, when setter is called |

```jsx
function Parent() {
  const [theme, setTheme] = useState('dark'); // STATE — Parent owns this
  return <Child theme={theme} />;             // PROP — Child receives it
}

function Child({ theme }) {
  // theme is a PROP here — Child cannot change it
  // If Child needs to change it, Parent must pass a callback
  return <div className={theme}>Hello</div>;
}
```

> **Mental model:** Props are like function arguments — passed in from outside. State is like local variables — defined and managed inside.

---

## Q8. What is the Virtual DOM?

The Virtual DOM is a **lightweight JavaScript object representation** of the real DOM kept in memory by React. Instead of updating the real DOM every time something changes, React first updates its virtual copy, compares old vs. new (called **diffing**), and then makes the minimum necessary changes to the real DOM.

```
User action (click, type)
        ↓
State changes → React re-renders component (creates new Virtual DOM)
        ↓
React DIFFS: new Virtual DOM vs old Virtual DOM (reconciliation)
        ↓
React calculates the minimal set of real DOM changes needed
        ↓
Only the CHANGED parts update in the real DOM
        ↓
Browser paints the minimal change
```

**Why is this fast?**
- Real DOM operations (add/remove/modify elements) trigger expensive browser **reflows and repaints**
- Comparing plain JavaScript objects is extremely fast
- React **batches multiple updates** into a single DOM pass

> **Misconception:** The Virtual DOM isn't universally faster — for very simple updates, it adds overhead. Its real benefit is providing a **declarative programming model** while being fast enough for complex UIs.

---

## Q9. What is the difference between `React.createElement` and JSX?

They produce **exactly the same result**. JSX is just syntactic sugar — Babel transforms every JSX element into a `React.createElement()` call at build time.

In React 17+, the JSX transform was updated so you no longer need `import React from 'react'` just to use JSX.

```jsx
// JSX (what you write)
const element = (
  <div className="card">
    <h1>Hello</h1>
  </div>
);

// What Babel compiles it to (React 16 and below)
const element = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h1', null, 'Hello')
);

// Both produce the same React element object:
// { type: 'div', props: { className: 'card', children: [...] } }
```

---

## Q10. How do you render a list in React?

Use JavaScript's `.map()` method to transform an array of data into an array of JSX elements. React renders arrays of elements natively. Always provide a unique `key` prop for each item.

```jsx
const fruits = ['Apple', 'Banana', 'Mango'];

// Simple list — index as key OK for static, never-changing lists
function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

// Better — use stable unique ID from data
const users = [
  { id: 1, name: 'Prathamesh' },
  { id: 2, name: 'Rahul' },
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>   // ✅ stable ID
      ))}
    </ul>
  );
}
```

---

## Q11. What is the `key` prop and why is it needed?

The `key` prop helps React identify **which specific list items changed, were added, or were removed** between renders. Without keys, React has to re-render every item in the list any time one item changes.

```jsx
// ❌ No key — React can't efficiently track changes
{todos.map(todo => <TodoItem todo={todo} />)}

// ❌ Index as key — causes bugs when list order changes
{todos.map((todo, i) => <TodoItem key={i} todo={todo} />)}

// ✅ Stable unique ID — always correct
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```

**Why index-as-key is harmful:**
```
Before delete:  [Apple(0), Banana(1), Mango(2)]
Delete Apple:   [Banana(0), Mango(1)]

React sees: key=0 changed content (Apple→Banana) → UPDATES item
            key=1 changed content (Banana→Mango) → UPDATES item
            key=2 removed

So React UPDATES 2 items instead of removing 1.
With stable ID as key, React correctly removes only Apple's node.
```

> ⚠️ **Key rules:** Keys must be **unique among siblings** (not globally). Using `Math.random()` as a key is even worse than index — it generates a new key every render, causing every component to unmount and remount.

---

## Q12. What is Conditional Rendering?

Conditional rendering means showing or hiding UI elements **based on a condition**. React uses standard JavaScript conditionals since JSX compiles to JS.

```jsx
function UserGreeting({ isLoggedIn, name }) {
  // Method 1: if/else — good for large blocks
  if (!isLoggedIn) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      {/* Method 2: Ternary operator — great for either/or */}
      <h1>{isLoggedIn ? `Welcome, ${name}!` : 'Stranger'}</h1>

      {/* Method 3: && (short-circuit) — show only when true */}
      {isLoggedIn && <button>Logout</button>}

      {/* Method 4: Nullish fallback */}
      <p>{name || 'Anonymous'}</p>
    </div>
  );
}
```

> ⚠️ **Classic gotcha — the 0 bug:**
> `{count && <Badge />}` renders **"0"** when count is 0 because 0 is falsy but JSX renders it as text.
> Fix: `{count > 0 && <Badge />}` — use an explicit boolean comparison.

---

## Q13. How do you handle events in React?

React uses **synthetic events** — wrappers around native browser events that normalize behavior across browsers. Event names are camelCase (`onClick`, not `onclick`), and you pass a function reference.

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();      // prevent page reload on form submit
    e.stopPropagation();     // stop event bubbling up the tree
    console.log('submitted');
  };

  const handleChange = (e) => {
    console.log(e.target.value); // get input value
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

// Passing arguments to event handlers
// ❌ Wrong — calls handleDelete(id) immediately on render
<button onClick={handleDelete(id)}>Delete</button>

// ✅ Correct — wrap in arrow function so it only calls on click
<button onClick={() => handleDelete(id)}>Delete</button>
```

---

## Q14. What is a Fragment in React?

A Fragment lets you return multiple sibling elements **without adding an extra wrapper node to the DOM**. This matters because extra wrapper `<div>`s can break CSS layouts (flexbox/grid), create invalid HTML (e.g., inside `<table>`), or add unnecessary DOM nesting.

```jsx
// ❌ Extra div pollutes DOM and can break flex/grid layouts
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ✅ Short Fragment syntax — renders nothing in DOM
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// ✅ Explicit syntax — use when you need a key prop (in lists)
return (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
);
```

---

## Q15. What is `useState`?

`useState` is the foundational React hook for adding local state to functional components. It returns a tuple: **`[currentValue, setterFunction]`**.

The setter can accept either a new value directly, or a **function** that receives the previous state — use the functional form when the new state depends on the old one (especially in async contexts or when batching multiple updates).

```jsx
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail]       = useState('');      // string
  const [password, setPassword] = useState('');      // string
  const [loading, setLoading]   = useState(false);   // boolean
  const [errors, setErrors]     = useState({});      // object
  const [items, setItems]       = useState([]);      // array

  // Direct update
  setEmail('test@example.com');

  // Functional update — safe when new value depends on old
  setLoading(prev => !prev);

  // Updating object state — ALWAYS spread the old state!
  setErrors(prev => ({ ...prev, email: 'Required' }));

  // Lazy initialization — pass a function for expensive initial value
  // parseData() only runs ONCE, not on every render
  const [data, setData] = useState(() => parseData());
}
```

> ⚠️ **State updates are asynchronous.** Calling `setCount(count + 1)` three times in a row won't give you +3 — all three calls see the same stale `count`. Use the functional form `setCount(c => c + 1)` to chain correctly.

---

## Q16. What is `useEffect`?

`useEffect` handles **side effects** — anything that reaches outside React's render cycle: API calls, timers, DOM manipulation, event listener setup, localStorage reads, etc.

It accepts two arguments: a callback function (the effect) and an optional **dependency array** that controls when the effect re-runs. The callback can return a **cleanup function** that runs before the next effect or on unmount.

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Runs after EVERY render (no array) — rarely needed, usually a bug
  useEffect(() => {
    document.title = 'Profile Page';
  });

  // Runs ONCE after mount (empty array) — like componentDidMount
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  // Runs on mount AND whenever userId changes
  useEffect(() => {
    let isMounted = true;

    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        if (isMounted) setUser(data); // guard against unmounted component
      });

    return () => { isMounted = false; }; // cleanup on unmount
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

> **The `isMounted` pattern:** Always guard state updates in async effects to prevent "can't perform state update on unmounted component" errors. Alternatively, use `AbortController` for fetch calls.

---

## Q17. What is `useRef`?

`useRef` returns a mutable object `{ current: value }` that persists across renders. **Changing `.current` does NOT trigger a re-render.** This makes it perfect for two use cases:

1. **Accessing DOM elements directly**
2. **Storing values that should persist but don't affect the UI**

```jsx
import { useRef } from 'react';

// Use case 1: Access DOM element directly
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // direct DOM access
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// Use case 2: Store a value without triggering re-render
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // stores timer ID — no re-render needed

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

> **Ref vs State:** Use **state** when the value should be displayed in the UI (needs re-render). Use **ref** when you need to track something internally but the UI doesn't depend on it directly (e.g., tracking mount status, timer IDs, previous values).

---

## Q18. What is `useContext`?

`useContext` lets any component in a tree **read from a Context without prop drilling**. Context provides a way to share data globally across a component tree — like the current theme, authenticated user, or locale.

Three steps: create → provide → consume.

```jsx
import { createContext, useContext, useState } from 'react';

// Step 1: Create context (with a default value)
const ThemeContext = createContext('light');

// Step 2: Wrap your component tree in the Provider
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// Step 3: Read it ANYWHERE in the tree — no prop threading needed
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header className={theme}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}
```

---

## Q19. What is Prop Drilling and why is it a problem?

Prop drilling is when you pass data through **multiple intermediate component layers** that don't actually use the data — just to get it to a deeply nested child. It makes code harder to maintain: if the data shape changes, you must update every component in the chain.

```jsx
// ❌ Prop Drilling — Layout and Sidebar don't use 'user'
function App() {
  const user = { name: 'Prathamesh' };
  return <Layout user={user} />;
}
function Layout({ user }) {       // doesn't need user, just passes it
  return <Sidebar user={user} />;
}
function Sidebar({ user }) {      // doesn't need user, just passes it
  return <UserAvatar user={user} />;
}
function UserAvatar({ user }) {   // finally uses it here
  return <img alt={user.name} />;
}

// ✅ Context API — UserAvatar reads directly
function UserAvatar() {
  const { user } = useContext(UserContext); // reads directly, no drilling
  return <img alt={user.name} />;
}
```

> **When prop drilling is OK:** 1–2 levels of prop passing is completely fine — don't over-engineer with Context for shallow trees. Context adds indirection and makes components harder to test and reuse in isolation.

---

## Q20. What is the difference between `null`, `undefined`, and `false` in JSX?

`null`, `undefined`, `false`, and `true` are all **valid JSX children that render nothing**. This is intentional — it enables conditional rendering patterns like `{isLoggedIn && <Menu />}`.

```jsx
function Component() {
  return (
    <div>
      {null}       {/* renders nothing */}
      {undefined}  {/* renders nothing */}
      {false}      {/* renders nothing */}
      {true}       {/* renders nothing */}
      {0}          {/* ⚠️ renders "0" — common bug! */}
      {''}         {/* renders empty string (invisible) */}
    </div>
  );
}

// Classic 0 bug
const count = 0;
{count && <Badge />}       // ❌ renders "0" on screen!
{count > 0 && <Badge />}   // ✅ renders nothing
{!!count && <Badge />}     // ✅ also works (double negation to boolean)
```

---

## Q21. How do you pass data from Child to Parent?

React's data flow is **unidirectional** — parent to child only. To send data upward, the parent passes a **callback function as a prop**. The child calls that function with the data it wants to send up. This preserves React's one-way data flow.

```jsx
function Parent() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <p>Message from child: {message}</p>
      <Child onSend={setMessage} />  {/* pass setter as callback */}
    </div>
  );
}

function Child({ onSend }) {
  const [input, setInput] = useState('');

  const handleClick = () => {
    onSend(input);  // call parent's function with data
  };

  return (
    <>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleClick}>Send to Parent</button>
    </>
  );
}
```

---

## Q22. What are Controlled and Uncontrolled Components?

A **controlled component** is an input whose value is driven by React state — React is the "single source of truth." An **uncontrolled component** lets the DOM manage its own state; you read it when needed via a ref.

```jsx
// Controlled — React state drives the input value
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}                           // React controls this
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled — DOM manages its own state, read on demand
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert(inputRef.current.value); // read only when needed
  };

  return (
    <>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

| | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM itself |
| Access value | `value` prop + `onChange` | `ref.current.value` |
| Best for | Validation, formatting, dependent fields | File inputs, simple forms |

---

## Q23. What is `React.StrictMode`?

`React.StrictMode` is a **development-only wrapper** that activates extra checks and warnings to help you write better React code. It has **no effect in production**.

```jsx
// In main.jsx / index.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**What it does in development:**
- **Double-invokes** component functions, reducers, and state initializers to detect side effects
- In React 18, intentionally **mounts, unmounts, and remounts** every component to surface bugs from missing cleanup in effects
- Warns about deprecated lifecycle methods, legacy Context API usage, and string refs

> If your app breaks with StrictMode, you have a **cleanup bug** in one of your effects. This is a feature, not a bug — fix the cleanup.

---

## Q24. What is the difference between `export default` and named export?

```jsx
// Named export — must import with exact name
export function Button() { ... }
export const API_URL = 'https://api.example.com';

// Import named export — name must match
import { Button, API_URL } from './components';

// Default export — import with ANY name you choose
export default function App() { ... }

// Import default export — any name works
import App from './App';
import MyApp from './App';         // same component, different local name
import WhateverName from './App';  // still works

// A file can have ONE default + MANY named exports
export default function Page() { ... }
export const meta = { title: 'Home' };  // named alongside default
```

> **Convention:** Most React projects use default exports for page/component files, and named exports for utility functions and constants. Consistency within a codebase matters more than which you pick.

---

## Q25. What is the `children` prop?

`children` is a special built-in prop that contains **whatever is placed between a component's opening and closing tags**. It's the foundation of React's composition model — building "container" components that wrap arbitrary content.

```jsx
// Card component that wraps any content
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}  {/* renders whatever is inside <Card>...</Card> */}
      </div>
    </div>
  );
}

// Usage — everything between the tags becomes children
function App() {
  return (
    <Card title="User Profile">
      <img src="avatar.jpg" />
      <p>Name: Prathamesh</p>
      <button>Edit</button>
    </Card>
  );
}
```

---

# 🟡 Medium Questions — Mid Level

> Assumes you know the basics.
> These are asked for **1–3 years experience** roles.

---

## Q26. Explain all `useEffect` dependency array cases

The dependency array is the most nuanced part of `useEffect`. It controls *when* the effect re-runs. ESLint's `exhaustive-deps` rule will tell you if you're missing dependencies.

```jsx
// Case 1: No array — runs after EVERY render
// Use: almost never — usually a bug
useEffect(() => {
  console.log('renders every time');
});

// Case 2: Empty array — runs ONCE after mount
// Use: initial data fetch, one-time setup
useEffect(() => {
  fetchInitialData();
  setupEventListeners();
  return () => removeEventListeners();
}, []);

// Case 3: With dependencies — runs on mount AND when deps change
// Use: re-fetch when ID changes, react to prop changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// ⚠️ Object dependency — new object reference every render = infinite loop risk
const options = { page: 1 }; // new object created on every render
useEffect(() => {
  fetchData(options);
}, [options]); // ❌ runs on every render!

// ✅ Fix: use primitive value or useMemo
useEffect(() => {
  fetchData({ page });
}, [page]); // only runs when page actually changes
```

> ⚠️ **Missing dependencies trap:** If you read a prop or state variable inside `useEffect` but don't add it to the deps array, the effect will run with a **stale closure** — seeing old values. Always follow the `exhaustive-deps` ESLint rule. If adding a dep causes infinite loops, the real fix is usually `useMemo` or `useCallback`.

---

## Q27. What is `useMemo`?

`useMemo` **caches the result of an expensive calculation** between renders. It only recalculates when one of its dependencies changes. Think of it as memoization for computed values.

```jsx
import { useMemo, useState } from 'react';

function ProductList({ products, searchQuery }) {
  // Without useMemo — filters on EVERY render (even unrelated re-renders)
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // With useMemo — only recalculates when products or searchQuery changes
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

`useCallback` returns a **memoized function reference** — the same function object between renders unless its dependencies change. Without it, a new function is created every render, which breaks `React.memo` on child components.

```jsx
import { useCallback, useState, memo } from 'react';

// Child wrapped in memo — only re-renders when props change (by reference)
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

  // ❌ Without useCallback — new function every render
  // → memo on TodoItem is useless (new prop = always re-renders)
  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // ✅ With useCallback — same function reference between renders
  // → memo on TodoItem actually works
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // empty array — setTodos is a stable reference

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

// Reducer — pure function: (currentState, action) => newState
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
- Use `useReducer` for: multiple related values that change together, complex transitions, next state depends on previous, or you want Redux-like testability (reducers are pure functions — easy to unit test)

---

## Q30. What are Custom Hooks?

A custom hook is a **function whose name starts with `use`** and that calls one or more React hooks. It's the primary mechanism for **extracting and reusing stateful logic** across multiple components without changing their UI or component hierarchy.

```jsx
// Custom hook — reusable fetch logic
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

// Usage — clean and reusable in ANY component
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

## Q31. Rules of Hooks — what are they and why do they exist?

**Two rules:**

1. Only call hooks **at the top level** — not inside `if`/`else`, loops, or nested functions
2. Only call hooks **from React function components or custom hooks** — not regular JS functions

```jsx
// ❌ WRONG — hook inside condition
function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [data, setData] = useState(null); // BREAKS rules
  }
}

// ❌ WRONG — hook inside loop
function Component({ count }) {
  for (let i = 0; i < count; i++) {
    const [val] = useState(i); // BREAKS rules
  }
}

// ✅ CORRECT — hooks always at top level, conditions go INSIDE
function Component({ isLoggedIn }) {
  const [data, setData] = useState(null); // always at top level
  useEffect(() => {
    if (isLoggedIn) fetchData(); // condition is INSIDE the hook
  }, [isLoggedIn]);
}
```

**Why this rule exists:**
React tracks hooks internally by their **call order** in an array. Every render must call hooks in the same order. If a condition skips a hook, the array index shifts and React maps the wrong state to the wrong hook — silently corrupting all subsequent state.

---

## Q32. What is `React.memo`?

`React.memo` is a Higher Order Component that **skips re-rendering if the props haven't changed** (shallow comparison by default). Without it, a child re-renders any time its parent re-renders — even if the child's props are identical.

```jsx
import { memo } from 'react';

// Without memo — re-renders whenever parent renders
function UserCard({ name, email }) {
  console.log('UserCard rendered'); // logs even if name/email unchanged
  return <div>{name} — {email}</div>;
}

// With memo — skips re-render if name and email are same
const UserCard = memo(function({ name, email }) {
  console.log('UserCard rendered'); // only logs when props actually change
  return <div>{name} — {email}</div>;
});

// Custom comparison function (optional) — for complex objects
const UserCard = memo(
  function({ user }) { return <div>{user.name}</div>; },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
  // return true = skip re-render (props are "equal")
  // return false = re-render (props changed)
);
```

> ⚠️ **memo only works with stable props.** `memo` is useless if the parent passes a new object literal or arrow function every render (e.g. `<Child style={{ color: 'red' }} />`). Always pair with `useMemo` and `useCallback` for object/function props.

---

## Q33. What is the difference between `useEffect` and `useLayoutEffect`?

Both run after React updates the DOM. The timing difference: `useLayoutEffect` runs **synchronously before the browser has a chance to paint**, while `useEffect` runs asynchronously after the paint.

```
State change
    → React updates DOM
    → useLayoutEffect runs synchronously ← measure DOM here
    → Browser paints (user sees update)
    → useEffect runs asynchronously
```

```jsx
// useEffect — runs AFTER paint (async)
// Use for: data fetching, subscriptions, most side effects
useEffect(() => {
  fetchData();
}, []);

// useLayoutEffect — runs AFTER DOM update but BEFORE paint (sync)
// Use for: DOM measurements that must happen before the user sees anything
useLayoutEffect(() => {
  const height = elementRef.current.offsetHeight;
  setTooltipPosition(height); // no visual flicker — browser hasn't painted yet
}, []);
```

> **Default to `useEffect`.** Use `useLayoutEffect` only when you see a visual flicker or need to synchronously measure DOM layout. Because it runs synchronously, it blocks the browser from painting — overuse hurts performance.

---

## Q34. What is Lifting State Up?

When two or more sibling components need to share state, the solution is to **move the state up to their closest common ancestor** (parent). The parent owns the state and passes it down as props. This creates a "single source of truth."

```jsx
// ❌ Two independent states — they never sync
function Celsius()    { const [temp, setTemp] = useState(0);  ... }
function Fahrenheit() { const [temp, setTemp] = useState(32); ... }

// ✅ Lifted state — parent is the single source of truth
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  const fahrenheit = celsius * 9/5 + 32; // derived — no separate state needed

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

  // Called when a child throws — update state to show fallback
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Called with error info — use for error logging services
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

// Usage — wrap around components that might throw
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

By default, all JavaScript is bundled into one file that loads upfront. Code splitting **breaks the bundle into smaller chunks** that load on demand — reducing initial page load time. `React.lazy` enables lazy loading components, and `Suspense` shows a fallback while the chunk downloads.

```jsx
import { lazy, Suspense } from 'react';

// Instead of static import (all downloaded upfront):
// import Dashboard from './pages/Dashboard';

// Lazy import — Dashboard.js chunk only downloads when user visits /dashboard
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

## Q37. Context API vs Redux — when to use which?

| Use Context for | Use Redux / Zustand for |
|---|---|
| Theme (light/dark) | Complex state with many transitions |
| Current authenticated user | State updated from many unrelated places |
| Language / locale | Need time-travel debugging (Redux DevTools) |
| Data shared across many levels | Large teams where predictability matters |
| Rarely-changing global data | Caching, optimistic updates, offline support |

> ⚠️ **Context performance caveat:** Every component that calls `useContext(MyContext)` re-renders when the context value changes. For frequently-changing data consumed by many components, split into multiple contexts by update frequency, or use Zustand (which has built-in selector support to avoid unnecessary re-renders).

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

// ❌ No cleanup — second mount creates a duplicate subscription
useEffect(() => {
  const subscription = subscribe(userId);
  // missing cleanup!
}, []);

// ✅ With cleanup — remount is perfectly safe
useEffect(() => {
  const subscription = subscribe(userId);
  return () => subscription.unsubscribe(); // cleanup runs between mounts
}, []);
```

> This is development-only behavior. In production, components mount exactly once. If your app only works in production but not development StrictMode, you have a real bug that will eventually surface in other ways.

---

## Q40. What is the difference between `<Link>` and `<NavLink>` in React Router?

Both render an anchor tag for client-side navigation (no page reload). The difference: `NavLink` provides an **active state** — it knows whether its `to` path matches the current URL — so you can style active navigation links.

```jsx
import { Link, NavLink } from 'react-router-dom';

// Link — basic navigation, no active state awareness
<Link to="/about">About</Link>

// NavLink — provides isActive for styling the current route
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

`Outlet` is a **placeholder component in a parent layout route where its matched child route renders**. This enables "nested routing" — a persistent shell (navbar, sidebar, footer) that stays mounted while only the inner page content swaps out.

```jsx
// Route config — Layout is the persistent shell
<Route path="/" element={<Layout />}>
  <Route path="home"      element={<Home />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="settings"  element={<Settings />} />
</Route>

// Layout.jsx — renders once, child page content appears at <Outlet />
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

  // URL params  →  /users/:id
  const { id } = useParams();

  // Query strings  →  /search?query=react&tab=hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query'); // 'react'
}
```

---

## Q43. What is Redux? Explain its core concepts.

Redux is a **predictable state container** — a single centralized store for your entire application's state. All state changes happen through a strict unidirectional flow.

**Core concepts:**
1. **Store** — single object holding ALL app state
2. **Action** — plain object describing what happened `{ type, payload }`
3. **Reducer** — pure function: `(state, action) => newState`
4. **Dispatch** — the only way to trigger a state change
5. **Selector** — function to read specific data from the store

Today, always use **Redux Toolkit** — it eliminates the boilerplate of old Redux.

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Slice — state + reducers + actions bundled together
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

Zustand is a **minimal, unopinionated state manager**. No actions, no reducers, no Provider required — just a store you create and import anywhere. It's dramatically less boilerplate than Redux for most apps.

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

// No Provider needed — just import and use anywhere
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
| Best for | Large apps, teams, complex flows | Small–medium apps |

---

## Q45. What causes unnecessary re-renders and how do you fix them?

```jsx
// Cause 1: Object/array created fresh each render
// ❌ New object reference every render → child sees "new" prop → re-renders
<Child options={{ theme: 'dark' }} />

// ✅ Memoize the object
const options = useMemo(() => ({ theme: 'dark' }), []);
<Child options={options} />

// Cause 2: Inline function in JSX
// ❌ New function reference every render → breaks memo
<Child onClick={() => handleClick(id)} />

// ✅ useCallback for stable reference
const handleClick = useCallback(() => doThing(id), [id]);
<Child onClick={handleClick} />

// Cause 3: Context value object created inline
// ❌ New object every render → ALL consumers re-render
<MyContext.Provider value={{ user, setUser }}>

// ✅ Memoize context value
const value = useMemo(() => ({ user, setUser }), [user]);
<MyContext.Provider value={value}>

// Cause 4: Derived state stored in useState
// ❌ Redundant state that's just computed from other state
const [items, setItems] = useState([]);
const [count, setCount] = useState(0); // unnecessary!

// ✅ Derive directly — no extra state, no extra re-render
const count = items.length;
```

---

## Q46. What is Reconciliation in React?

Reconciliation is React's algorithm for **efficiently computing the minimum set of DOM changes** needed when the virtual DOM changes. React follows three key heuristics:

1. **Different types = full rebuild.** If a `<div>` becomes a `<span>`, React destroys the entire subtree and builds a fresh one. All child component state is lost.
2. **Same type = update attributes only.** If the element type stays the same, React patches only what changed (e.g., just `className`).
3. **Lists use keys.** Keys let React match items between old and new renders — enabling moves, insertions, and deletions without unnecessarily re-rendering untouched items.

```jsx
// Rule 1 — type change: destroys entire subtree (state reset!)
// Before: <div><Counter /></div>
// After:  <span><Counter /></span>
// → Counter is DESTROYED and remounted from scratch

// Rule 2 — same type: only updates changed attributes
// Before: <div className="red" id="box" />
// After:  <div className="blue" id="box" />
// → React updates ONLY className, id is untouched

// Rule 3 — keys help match list items across renders
// Before: [Apple(id:1), Banana(id:2)]
// After:  [Banana(id:2), Apple(id:1)]  ← order changed
// With key: React moves DOM nodes — no re-render of content ✅
// Without key: React thinks both items changed → re-renders both ❌
```

---

## Q47. What happens when a component's `key` prop changes?

When a `key` changes, React treats the component as a **completely different instance** — it unmounts the old one (clearing all state) and mounts a fresh one. This is a deliberate pattern used to **force reset a component's internal state** without lifting that state up.

```jsx
// Problem: switching users, but UserForm still shows old user's input
<UserForm userId={userId} />  // ❌ form state persists across users

// Solution: key change forces full remount = all state reset
<UserForm key={userId} userId={userId} />  // ✅ clean slate for each user

// More use cases:
// - Reset a form when switching records
// - Force re-fetch and reset when ID changes
// - Clear animation state
```

---

# 🔴 Hard Questions — Senior / Expert

> These are asked for **3+ years experience** or senior roles.
> Covers React internals, concurrent features, and architecture.

---

## Q48. What is the React Fiber architecture?

Fiber is React's **complete rewrite of its internal reconciliation engine**, shipped in React 16. Before Fiber, React's reconciliation was recursive and synchronous — once started, it couldn't be interrupted. A massive component tree update would block the main thread for hundreds of milliseconds, making UIs janky.

Fiber reimplements the algorithm as a **linked list of "units of work"** (one Fiber node per component). This data structure allows React to pause after processing each unit, yield control back to the browser, and resume later.

```
Fiber = a linked list of units of work (one node per component instance)

React can now:
  ✅ Pause reconciliation → browser handles urgent input
  ✅ Resume from where it stopped
  ✅ Abort work that became stale (user typed a new query)
  ✅ Assign priority levels to different updates
     - User input    → HIGH priority (process immediately)
     - Data fetch    → LOW priority (can defer)

This is the foundation for:
  → useTransition
  → Suspense
  → Concurrent rendering
  → Server Components
```

**Two phases of Fiber work:**
- **Render phase** (interruptible) — builds a "work-in-progress" fiber tree, diffs old vs. new, no DOM mutations
- **Commit phase** (non-interruptible) — applies minimal DOM mutations, runs effects

---

## Q49. What is Concurrent Mode / Concurrent Rendering?

React 18 introduced the ability to **prepare multiple versions of the UI simultaneously in the background** without blocking the browser's main thread. React can start rendering an update, pause if a more urgent update arrives, handle the urgent one first, then return to the background work.

```jsx
// Opt in with createRoot (React 18)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// React can now:
// - Interrupt a low-priority render (search results) for a high-priority one (keypress)
// - Reuse previous rendered work if state didn't change
// - Discard renders that became stale (user typed a new query)
// - Show consistent UI snapshots — no "tearing" where different components show different state versions
```

> **Opt-out:** Only `createRoot` enables concurrent features. The legacy `ReactDOM.render()` uses synchronous rendering. All React 18 ecosystem updates (libraries, etc.) involve ensuring compatibility with the concurrent model.

---

## Q50. What is `useTransition` and `useDeferredValue`? When to use each?

Both hooks mark updates as **non-urgent** so React can defer them while keeping the UI responsive. The difference is about ownership:
- Use `useTransition` when you **own** the state setter
- Use `useDeferredValue` when you **receive a value as a prop** and don't control its setter

```jsx
// useTransition — you control the state setter
function SearchPage() {
  const [input, setInput]   = useState('');
  const [query, setQuery]   = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value);  // urgent — update input immediately
    startTransition(() => {
      setQuery(e.target.value); // non-urgent — can be interrupted if user types again
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList query={query} />}
    </>
  );
}

// useDeferredValue — you receive the value, can't wrap the setter
function ResultsList({ query }) {
  const deferredQuery = useDeferredValue(query);
  // deferredQuery "lags behind" query
  // While computing new results, shows old results slightly faded

  const results = useMemo(
    () => filterExpensively(allItems, deferredQuery),
    [deferredQuery]
  );

  const isStale = query !== deferredQuery;
  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      {results}
    </div>
  );
}
```

---

## Q51. What are React Server Components (RSC)?

Server Components are React components that **run exclusively on the server** — they render to HTML (or a special RSC payload), and **zero JavaScript is shipped to the browser** for them. They can directly access databases, file systems, and environment variables without any API layer.

```jsx
// Server Component — default in Next.js App Router
// Can be async! Accesses DB directly. Zero JS sent to browser.
async function ProductList() {
  const products = await db.select().from(productsTable); // direct DB access!
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} — ₹{p.price}
          <AddToCartButton id={p.id} />  {/* Client Component for interactivity */}
        </li>
      ))}
    </ul>
  );
}

// Client Component — add 'use client' at the top
'use client';
function AddToCartButton({ id }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => { addToCart(id); setAdded(true); }}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
```

| | Server Component | Client Component |
|---|---|---|
| Runs on | Server only | Server (SSR) + client |
| JS sent to browser | ❌ None | ✅ Yes |
| Can use hooks | ❌ | ✅ |
| Can access DB directly | ✅ | ❌ (via API) |
| Can be `async` | ✅ | ❌ at component level |
| Directive | None (default in App Router) | `'use client'` at top |

---

## Q52. What is `useOptimistic`? (React 19)

`useOptimistic` lets you **show the expected UI state immediately**, before an async operation completes, and automatically reverts to the real state if the operation fails. It dramatically improves perceived performance for write operations.

```jsx
'use client';

function MessageList({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,                   // real/actual state
    (state, newMessage) => [...state, { ...newMessage, pending: true }]
    // ↑ how to merge optimistic update into current state
  );

  async function handleSend(formData) {
    const text = formData.get('text');

    // Show immediately — before server confirms
    addOptimisticMessage({ id: Date.now(), text, sender: 'me' });

    // Actually save — if this fails, optimistic message disappears automatically
    await sendMessage(text);
  }

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div key={msg.id} style={{ opacity: msg.pending ? 0.6 : 1 }}>
          {msg.text} {msg.pending && '(Sending...)'}
        </div>
      ))}
      <form action={handleSend}>
        <input name="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

---

## Q53. What is `useActionState`? (React 19)

`useActionState` replaces the common pattern of manually managing `loading`, `error`, and `result` state for form submissions. It wires an async action directly to a form's `action` prop and returns the pending state and latest result.

```jsx
'use client';
import { useActionState } from 'react';

// Action — receives previous state and form data
async function submitForm(prevState, formData) {
  const name  = formData.get('name');
  const email = formData.get('email');

  if (!email.includes('@')) {
    return { error: 'Invalid email', success: false };
  }

  await saveToDatabase({ name, email });
  return { error: null, success: true, message: `Welcome, ${name}!` };
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { error: null, success: false, message: '' } // initial state
  );

  return (
    <form action={formAction}>
      <input name="name"  placeholder="Name"  required />
      <input name="email" placeholder="Email" required />

      {state.error   && <p style={{ color: 'red'   }}>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>{state.message}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## Q54. What is Automatic Batching in React 18?

Batching means React groups multiple state updates together into a **single re-render**. In React 17, batching only happened inside React event handlers. In React 18 with `createRoot`, **all state updates are batched automatically** — including inside `setTimeout`, Promises, and native event handlers.

```jsx
// React 17 — NOT batched in async contexts (causes 2 separate renders)
setTimeout(() => {
  setCount(c => c + 1); // render 1
  setFlag(f => !f);     // render 2
}, 1000);

// React 18 — batched everywhere (only 1 render) ✅
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);     // 1 render total!
}, 1000);

// Also batched in Promises:
fetch('/api').then(() => {
  setData(d);
  setLoading(false);    // 1 render total ✅
});

// Opt OUT when you need an immediate re-render between updates
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1)); // forces immediate render
flushSync(() => setFlag(f => !f));     // forces another immediate render
```

---

## Q55. What is the React Compiler (React Forget)?

The React Compiler is a **build-time Babel plugin that automatically inserts memoization** — eliminating the need to manually write `useMemo`, `useCallback`, and `React.memo`. It statically analyzes your component's data flow and inserts the right optimizations at compile time.

```jsx
// What you write (no manual memoization):
function Component({ items, filter }) {
  const sorted = items.filter(i => i.type === filter).sort();
  return <List data={sorted} />;
}

// What the compiler produces (conceptually):
function Component({ items, filter }) {
  const sorted = useMemo(
    () => items.filter(i => i.type === filter).sort(),
    [items, filter]
  );
  return <MemoizedList data={sorted} />;
}
```

> **Status (2025):** Available as opt-in, in production at Meta, and shipping with React 19.
> Install: `npm install babel-plugin-react-compiler`
>
> The compiler requires your components to follow React's rules (pure renders, no mutations). It won't optimize — and will warn about — code that breaks the rules.

---

## Q56. What is the `use()` hook? (React 19)

`use()` is a new primitive hook (React 19) that can read either a **Promise** (integrating with Suspense) or a **Context**. Unlike all other hooks, it can be called **conditionally** — inside `if/else` blocks — which is unique and breaks the normal Rules of Hooks.

```jsx
import { use, Suspense } from 'react';

// Reading a Promise — suspends component until promise resolves
function UserProfile({ userPromise }) {
  const user = use(userPromise); // ← suspends here; Suspense shows fallback
  return <h1>{user.name}</h1>;
}

// IMPORTANT: Start fetching BEFORE the component renders (in the parent)
function App() {
  const userPromise = fetchUser(1); // begins fetching immediately
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Reading Context conditionally — unique capability of use()
function Button({ isAdmin }) {
  if (isAdmin) {
    const { theme } = use(ThemeContext); // ✅ conditional — unique to use()!
    return <button className={theme}>Admin Action</button>;
  }
  return <button>Regular Action</button>;
}
```

---

## Q57. Explain the complete rendering lifecycle in React 18

```
1. TRIGGER
   ├─ setState() / dispatch()
   ├─ Parent re-renders (new or changed props flow down)
   └─ Context value changed

2. RENDER PHASE (pure — no side effects — can be interrupted)
   ├─ React calls your component function
   ├─ Returns new virtual DOM tree
   ├─ Diffs against previous virtual DOM (reconciliation)
   └─ Can be interrupted for higher-priority updates (concurrent mode)

3. COMMIT PHASE (non-interruptible — updates real DOM)
   ├─ Before Mutation: useLayoutEffect cleanups from previous render run
   ├─ Mutation:        React applies minimal DOM changes
   └─ After Mutation:  useLayoutEffect callbacks run (synchronously)

4. BROWSER PAINT
   └─ User sees the updated UI

5. PASSIVE EFFECTS (asynchronous — after paint)
   ├─ useEffect cleanups from previous render run
   └─ useEffect callbacks run
```

> **Why effects run after paint:** By design. Effects can trigger more state updates, which would cause more renders. Running them after paint means the user already sees a consistent UI before any cascading updates happen — avoiding intermediate "flash" states.

---

## Q58. What is Hydration in React?

Hydration is the process of **attaching React's event handlers and interactivity to server-rendered HTML**. The server generates plain HTML (fast initial load, no JS needed), then when the JS bundle arrives, React "hydrates" — reconciles its virtual DOM with the existing HTML and wires up all event listeners.

```
Server:
  1. Renders React components → HTML string
  2. Sends HTML to browser
  3. User sees content immediately (even before JS loads)

Browser:
  1. HTML displays (fast — no JS needed)
  2. React JS bundle downloads
  3. React "hydrates" — attaches event handlers to existing HTML
  4. App becomes fully interactive
```

```jsx
// ❌ Hydration mismatch — Math.random() differs between server and client
function Component() {
  return <div>{Math.random()}</div>; // server renders 0.4, client expects 0.7 → error!
}

// ✅ Fix — use useEffect for values that only exist on the client
function Component() {
  const [random, setRandom] = useState(null);
  useEffect(() => setRandom(Math.random()), []); // runs only on client
  return <div>{random ?? 'loading...'}</div>;     // stable during SSR
}
```

---

## Q59. What are common React performance anti-patterns?

```jsx
// ❌ Anti-pattern 1: Anonymous functions as props
// New function object every render → memo is useless
<button onClick={() => handleClick(id)}>Click</button>
// ✅ Fix:
const handleClick = useCallback(() => doThing(id), [id]);

// ❌ Anti-pattern 2: Object literals as props
// New object every render → child always re-renders
<Component style={{ color: 'red' }} />
// ✅ Fix:
const style = { color: 'red' }; // outside component, or useMemo
<Component style={style} />

// ❌ Anti-pattern 3: Index as key in dynamic lists
// Wrong matches when list changes order or items are removed
{items.map((item, i) => <Item key={i} {...item} />)}
// ✅ Fix:
{items.map(item => <Item key={item.id} {...item} />)}

// ❌ Anti-pattern 4: useEffect without cleanup
// Memory leak — event listener accumulates on every render
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // missing cleanup!
// ✅ Fix:
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// ❌ Anti-pattern 5: Derived state in useState
const [items, setItems] = useState([]);
const [count, setCount] = useState(0); // redundant!
// ✅ Fix:
const count = items.length; // derive it, don't store it

// ❌ Anti-pattern 6: useEffect for data transformation
useEffect(() => {
  setFiltered(items.filter(i => i.active)); // causes extra render!
}, [items]);
// ✅ Fix:
const filtered = useMemo(() => items.filter(i => i.active), [items]);
```

---

## Q60. What is the difference between `useEffect` and server-side code?

`useEffect` **never runs on the server** — it's a client-only hook. This is by design: servers don't have browser APIs (`localStorage`, `window`, `document`). Effects are skipped entirely during SSR.

```jsx
// ✅ Safe — browser APIs inside useEffect (client-only execution)
useEffect(() => {
  localStorage.setItem('key', value);
  window.scrollTo(0, 0);
  document.title = 'Updated';
}, [value]);

// ❌ Server crash — localStorage is undefined on Node.js server!
function Component() {
  const theme = localStorage.getItem('theme'); // ReferenceError: localStorage is not defined
  return <div className={theme}>...</div>;
}

// ✅ SSR-safe pattern — read browser APIs in useEffect
function Component() {
  const [theme, setTheme] = useState('light'); // safe default for SSR

  useEffect(() => {
    const saved = localStorage.getItem('theme'); // only runs in browser
    if (saved) setTheme(saved);
  }, []);

  return <div className={theme}>...</div>;
}
```

---

## 📊 Quick Cheatsheet

### All Hooks Summary

| Hook | Purpose | Key Rule |
|---|---|---|
| `useState` | Local state | Triggers re-render on change |
| `useEffect` | Side effects | Runs after render, never on server |
| `useRef` | DOM access / persist value | Does NOT trigger re-render |
| `useContext` | Read context | Re-renders on context value change |
| `useMemo` | Cache computed value | Only for expensive calculations |
| `useCallback` | Cache function reference | Pair with React.memo children |
| `useReducer` | Complex state logic | Like a local Redux store |
| `useLayoutEffect` | DOM measurements | Runs synchronously before paint |
| `useTransition` | Mark state update as non-urgent | React 18+ — you own the setter |
| `useDeferredValue` | Defer a value | React 18+ — you receive the value |
| `useOptimistic` | Instant UI before server confirms | React 19+ |
| `useActionState` | Async form state (pending/result/error) | React 19+ |
| `use()` | Read Promise or Context | React 19+ — can be conditional |

---

### Common Interview Comparison Table

| Question | A | B |
|---|---|---|
| Props vs State | From parent, read-only | Own data, settable via hook |
| `useMemo` vs `useCallback` | Caches a value | Caches a function |
| `useEffect` vs `useLayoutEffect` | After paint (async) | Before paint (sync) |
| Controlled vs Uncontrolled | React drives input value | DOM drives input value |
| `useState` vs `useReducer` | Simple primitive values | Complex logic / transitions |
| Context vs Redux | Simple global sharing | Complex state machine |
| `Link` vs `NavLink` | Basic navigation | Nav with active state styling |
| Server vs Client Component | Zero JS, async, DB access | Interactive, uses hooks |
| `useTransition` vs `useDeferredValue` | You own the setter | You receive the value |

---

### When To Use What

```
Simple local value           → useState
Complex related values       → useReducer
Share across few components  → Lift state up + props
Share across many components → Context API
Complex app state            → Redux Toolkit or Zustand
DOM access                   → useRef
Cached computation           → useMemo
Stable function reference    → useCallback
Data fetch on mount          → useEffect(fn, [])
Data fetch when value changes → useEffect(fn, [value])
Non-urgent state update      → useTransition
Deferred value               → useDeferredValue
Instant UI before server     → useOptimistic (React 19)
Async form state             → useActionState (React 19)
```

---

### Interview Answer Framework

Structure every answer using this format for maximum clarity:

```
1. WHAT   — define it simply in 1 sentence
2. WHY    — what problem does it solve
3. HOW    — quick code example
4. WHEN   — when to use / when NOT to use
5. GOTCHA — common mistake or edge case
```

---

*React 16.8 (Hooks) → React 18 (Concurrent) → React 19 (Actions & Compiler)*
*Updated: 2025–26 | 60 Questions — Easy → Medium → Hard*
