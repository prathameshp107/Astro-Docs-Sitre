---
title: "React Easy Interview Questions"
description: "Easy React interview questions for fresher and junior roles."
---

#  Easy Questions - Fresher / Junior

> If you're just starting out, master these first.
> These are asked in **every** React interview regardless of level.

---

## Q1. What is React? Why do we use it?

React is an **open-source JavaScript library** made by Meta (Facebook) for building **user interfaces**.

It is **NOT a full framework** - it only handles the **View layer** (what you see on screen). You compose it with other tools for routing, HTTP, state management, etc.

**Why React?**

| Problem Without React | How React Solves It |
|---|---|
| Manually updating DOM is slow and error-prone | Virtual DOM handles updates efficiently |
| Code gets messy in large apps | Component-based - break UI into small reusable pieces |
| Hard to share UI logic | Props + custom hooks allow reuse |
| Hard to manage app state | useState, useReducer, Context built-in |

```jsx
// Without React - imperative (tell browser HOW to update)
document.getElementById('count').innerText = count;
document.getElementById('btn').addEventListener('click', () => { ... });

// With React - declarative (describe WHAT you want, React figures out HOW)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

> **Interview tip:** React is a **library**, not a framework. The key distinction: with a library, *you* call it. With a framework like Angular, it calls *your* code. Next.js is a framework built *on top* of React.

---

## Q2. What is the difference between a Library and a Framework?

The core difference is **Inversion of Control** - who is in charge.

| | Library (React) | Framework (Angular) |
|---|---|---|
| Control | **You** call the library when needed | Framework calls **your** code at designated points |
| Flexibility | Pick any tools alongside it | Follows framework conventions and structure |
| Size/Scope | Small - just the view layer | Full package: routing, HTTP, forms, etc. |
| Learning curve | Easier to start, compose yourself | Steeper but more structured and opinionated |

> **Analogy:** A library is like a toolbox - you pick what you need. A framework is like a pre-built construction system - everything is decided for you, you just follow the workflow.

---

## Q3. What is JSX?

JSX = **JavaScript XML** - a syntax extension that lets you write HTML-like code inside JavaScript. Babel (a transpiler) converts it into regular `React.createElement()` calls before it runs in the browser.

JSX is not mandatory, but it makes code far more readable and is used in virtually every React codebase.

```jsx
// JSX (what you write)
const element = <h1 className="title">Hello World</h1>;

// What Babel compiles it to (under the hood)
const element = React.createElement('h1', { className: 'title' }, 'Hello World');
```

**JSX Rules:**

```jsx
// 1. Must return ONE root element - use Fragment if needed
return (
  <>                      {/* Fragment - renders nothing in DOM */}
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// 2. Use className, not class (class is a reserved JS keyword)
<div className="container">

// 3. All tags must be closed - even self-closing ones
<img src="pic.jpg" />    // 
<br />                   // 

// 4. JavaScript expressions go in { }
<h1>{user.name}</h1>
<p>{2 + 2}</p>

// 5. Attributes use camelCase
<input onChange={fn} maxLength={10} />
```

> **Common gotcha:** JSX is not HTML. `class` -> `className`, `for` -> `htmlFor`, event names are camelCase (`onclick` -> `onClick`). These trip up many beginners.

---

## Q4. What is a Component in React?

A component is an **independent, reusable piece of UI**. Think of it like a LEGO brick - you build complex interfaces by combining small, focused components. Each component manages its own structure, style, and behavior.

React has two types:
- **Functional components** (modern - always use these)
- **Class components** (legacy - avoid in new code)

Since React 16.8 introduced Hooks, functional components can do everything class components can.

```jsx
// Functional Component - modern standard
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Use it like an HTML element
<Welcome name="Prathamesh" />
// Renders: Hello, Prathamesh!

// Class Component (old - avoid)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

> **Naming rule:** Component names **must start with a capital letter**. `<button>` is a native HTML element; `<Button>` is your custom React component. This is how React tells them apart.

---

## Q5. What are Props?

Props (short for **Properties**) are the mechanism for passing data **from a parent component to a child component**. They flow in one direction only: top-down (parent -> child).

**Props are read-only** - a child should never try to modify its own props. This one-way data flow makes React apps predictable and easy to debug.

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
  const [count, setCount] = useState(0); // [value, setter] - initial value = 0

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

> Warning: **Never mutate state directly:**
> `count = count + 1`  - changes the variable but doesn't trigger a re-render.
> `setCount(count + 1)`  - tells React state changed, triggering a re-render.

---

## Q7. What is the difference between Props and State?

| Aspect | Props | State |
|---|---|---|
| Who owns it | Parent component | The component itself |
| Can it change |  Read-only from child's view |  Yes, via the setter function |
| Who changes it | Only the parent (source) | Only the component that owns it |
| How to access | Function parameter / destructure | `useState` hook |
| Triggers re-render | Yes, when parent re-renders with new value | Yes, when setter is called |

```jsx
function Parent() {
  const [theme, setTheme] = useState('dark'); // STATE - Parent owns this
  return <Child theme={theme} />;             // PROP - Child receives it
}

function Child({ theme }) {
  // theme is a PROP here - Child cannot change it
  // If Child needs to change it, Parent must pass a callback
  return <div className={theme}>Hello</div>;
}
```

> **Mental model:** Props are like function arguments - passed in from outside. State is like local variables - defined and managed inside.

---

## Q8. What is the Virtual DOM?

The Virtual DOM is a **lightweight JavaScript object representation** of the real DOM kept in memory by React. Instead of updating the real DOM every time something changes, React first updates its virtual copy, compares old vs. new (called **diffing**), and then makes the minimum necessary changes to the real DOM.

```
User action (click, type)
        ↓
State changes -> React re-renders component (creates new Virtual DOM)
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

> **Misconception:** The Virtual DOM isn't universally faster - for very simple updates, it adds overhead. Its real benefit is providing a **declarative programming model** while being fast enough for complex UIs.

---

## Q9. What is the difference between `React.createElement` and JSX?

They produce **exactly the same result**. JSX is just syntactic sugar - Babel transforms every JSX element into a `React.createElement()` call at build time.

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

// Simple list - index as key OK for static, never-changing lists
function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

// Better - use stable unique ID from data
const users = [
  { id: 1, name: 'Prathamesh' },
  { id: 2, name: 'Rahul' },
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>   //  stable ID
      ))}
    </ul>
  );
}
```

---

## Q11. What is the `key` prop and why is it needed?

The `key` prop helps React identify **which specific list items changed, were added, or were removed** between renders. Without keys, React has to re-render every item in the list any time one item changes.

```jsx
//  No key - React can't efficiently track changes
{todos.map(todo => <TodoItem todo={todo} />)}

//  Index as key - causes bugs when list order changes
{todos.map((todo, i) => <TodoItem key={i} todo={todo} />)}

//  Stable unique ID - always correct
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```

**Why index-as-key is harmful:**
```
Before delete:  [Apple(0), Banana(1), Mango(2)]
Delete Apple:   [Banana(0), Mango(1)]

React sees: key=0 changed content (Apple->Banana) -> UPDATES item
            key=1 changed content (Banana->Mango) -> UPDATES item
            key=2 removed

So React UPDATES 2 items instead of removing 1.
With stable ID as key, React correctly removes only Apple's node.
```

> Warning: **Key rules:** Keys must be **unique among siblings** (not globally). Using `Math.random()` as a key is even worse than index - it generates a new key every render, causing every component to unmount and remount.

---

## Q12. What is Conditional Rendering?

Conditional rendering means showing or hiding UI elements **based on a condition**. React uses standard JavaScript conditionals since JSX compiles to JS.

```jsx
function UserGreeting({ isLoggedIn, name }) {
  // Method 1: if/else - good for large blocks
  if (!isLoggedIn) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      {/* Method 2: Ternary operator - great for either/or */}
      <h1>{isLoggedIn ? `Welcome, ${name}!` : 'Stranger'}</h1>

      {/* Method 3: && (short-circuit) - show only when true */}
      {isLoggedIn && <button>Logout</button>}

      {/* Method 4: Nullish fallback */}
      <p>{name || 'Anonymous'}</p>
    </div>
  );
}
```

> Warning: **Classic gotcha - the 0 bug:**
> `{count && <Badge />}` renders **"0"** when count is 0 because 0 is falsy but JSX renders it as text.
> Fix: `{count > 0 && <Badge />}` - use an explicit boolean comparison.

---

## Q13. How do you handle events in React?

React uses **synthetic events** - wrappers around native browser events that normalize behavior across browsers. Event names are camelCase (`onClick`, not `onclick`), and you pass a function reference.

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
//  Wrong - calls handleDelete(id) immediately on render
<button onClick={handleDelete(id)}>Delete</button>

//  Correct - wrap in arrow function so it only calls on click
<button onClick={() => handleDelete(id)}>Delete</button>
```

---

## Q14. What is a Fragment in React?

A Fragment lets you return multiple sibling elements **without adding an extra wrapper node to the DOM**. This matters because extra wrapper `<div>`s can break CSS layouts (flexbox/grid), create invalid HTML (e.g., inside `<table>`), or add unnecessary DOM nesting.

```jsx
//  Extra div pollutes DOM and can break flex/grid layouts
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

//  Short Fragment syntax - renders nothing in DOM
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

//  Explicit syntax - use when you need a key prop (in lists)
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

The setter can accept either a new value directly, or a **function** that receives the previous state - use the functional form when the new state depends on the old one (especially in async contexts or when batching multiple updates).

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

  // Functional update - safe when new value depends on old
  setLoading(prev => !prev);

  // Updating object state - ALWAYS spread the old state!
  setErrors(prev => ({ ...prev, email: 'Required' }));

  // Lazy initialization - pass a function for expensive initial value
  // parseData() only runs ONCE, not on every render
  const [data, setData] = useState(() => parseData());
}
```

> Warning: **State updates are asynchronous.** Calling `setCount(count + 1)` three times in a row won't give you +3 - all three calls see the same stale `count`. Use the functional form `setCount(c => c + 1)` to chain correctly.

---

## Q16. What is `useEffect`?

`useEffect` handles **side effects** - anything that reaches outside React's render cycle: API calls, timers, DOM manipulation, event listener setup, localStorage reads, etc.

It accepts two arguments: a callback function (the effect) and an optional **dependency array** that controls when the effect re-runs. The callback can return a **cleanup function** that runs before the next effect or on unmount.

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Runs after EVERY render (no array) - rarely needed, usually a bug
  useEffect(() => {
    document.title = 'Profile Page';
  });

  // Runs ONCE after mount (empty array) - like componentDidMount
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
  const intervalRef = useRef(null); // stores timer ID - no re-render needed

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

`useContext` lets any component in a tree **read from a Context without prop drilling**. Context provides a way to share data globally across a component tree - like the current theme, authenticated user, or locale.

Three steps: create -> provide -> consume.

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

// Step 3: Read it ANYWHERE in the tree - no prop threading needed
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

Prop drilling is when you pass data through **multiple intermediate component layers** that don't actually use the data - just to get it to a deeply nested child. It makes code harder to maintain: if the data shape changes, you must update every component in the chain.

```jsx
//  Prop Drilling - Layout and Sidebar don't use 'user'
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

//  Context API - UserAvatar reads directly
function UserAvatar() {
  const { user } = useContext(UserContext); // reads directly, no drilling
  return <img alt={user.name} />;
}
```

> **When prop drilling is OK:** 1-2 levels of prop passing is completely fine - don't over-engineer with Context for shallow trees. Context adds indirection and makes components harder to test and reuse in isolation.

---

## Q20. What is the difference between `null`, `undefined`, and `false` in JSX?

`null`, `undefined`, `false`, and `true` are all **valid JSX children that render nothing**. This is intentional - it enables conditional rendering patterns like `{isLoggedIn && <Menu />}`.

```jsx
function Component() {
  return (
    <div>
      {null}       {/* renders nothing */}
      {undefined}  {/* renders nothing */}
      {false}      {/* renders nothing */}
      {true}       {/* renders nothing */}
      {0}          {/* Warning: renders "0" - common bug! */}
      {''}         {/* renders empty string (invisible) */}
    </div>
  );
}

// Classic 0 bug
const count = 0;
{count && <Badge />}       //  renders "0" on screen!
{count > 0 && <Badge />}   //  renders nothing
{!!count && <Badge />}     //  also works (double negation to boolean)
```

---

## Q21. How do you pass data from Child to Parent?

React's data flow is **unidirectional** - parent to child only. To send data upward, the parent passes a **callback function as a prop**. The child calls that function with the data it wants to send up. This preserves React's one-way data flow.

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

A **controlled component** is an input whose value is driven by React state - React is the "single source of truth." An **uncontrolled component** lets the DOM manage its own state; you read it when needed via a ref.

```jsx
// Controlled - React state drives the input value
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}                           // React controls this
      onChange={e => setValue(e.target.value)}
    />
  );
}

// Uncontrolled - DOM manages its own state, read on demand
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

> If your app breaks with StrictMode, you have a **cleanup bug** in one of your effects. This is a feature, not a bug - fix the cleanup.

---

## Q24. What is the difference between `export default` and named export?

```jsx
// Named export - must import with exact name
export function Button() { ... }
export const API_URL = 'https://api.example.com';

// Import named export - name must match
import { Button, API_URL } from './components';

// Default export - import with ANY name you choose
export default function App() { ... }

// Import default export - any name works
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

`children` is a special built-in prop that contains **whatever is placed between a component's opening and closing tags**. It's the foundation of React's composition model - building "container" components that wrap arbitrary content.

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

// Usage - everything between the tags becomes children
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
