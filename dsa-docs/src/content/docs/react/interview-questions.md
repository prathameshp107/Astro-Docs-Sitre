---
title: "React Interview Questions"
description: "100+ React interview questions from easy to hard with hidden answers."
sidebar:
  order: 99
  label: "Interview Questions (100+)"
---

> **How to use:** Click any question to expand the answer.

---

## Easy (Q1–Q30)

<details class="qa-card qa-easy">
<summary>
Q1. What is React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

React is a **JavaScript library for building user interfaces**, developed and maintained by Meta (Facebook). It lets you compose complex UIs from small, isolated pieces of code called **components**.

Key idea: React describes **what** the UI should look like, and it efficiently updates the DOM when data changes.

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What are the main features of React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- **Declarative** — Describe what you want, React handles DOM updates
- **Component-based** — Build encapsulated components that manage their own state
- **Virtual DOM** — Efficient rendering via a lightweight DOM representation
- **JSX** — JavaScript syntax extension that looks like HTML
- **One-way data flow** — Data flows from parent to child via props
- **Hooks** — Functions that let you use state and lifecycle in functional components

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What are the advantages of using React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Advantage | Why It Matters |
|-----------|---------------|
| **Fast rendering** | Virtual DOM + diffing algorithm minimizes DOM operations |
| **Reusable components** | DRY code, easier maintenance |
| **Strong community** | Large ecosystem, many libraries, extensive support |
| **SEO-friendly** | SSR with Next.js or Remix |
| **Rich developer tools** | React DevTools, profiling, component inspection |
| **Gradual adoption** | Can be added to existing projects incrementally |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is the difference between React and vanilla JavaScript?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | Vanilla JS | React |
|--------|-----------|-------|
| **DOM updates** | Manual — `document.getElementById()` | Declarative — React handles it |
| **State management** | Manual variables + event handlers | `useState`, `useReducer` |
| **Reusability** | Functions + manual DOM creation | Components with JSX |
| **Data binding** | Manual sync | One-way data flow via props |
| **Performance** | Full re-renders common | Virtual DOM + targeted updates |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. How does React differ from Angular?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | React | Angular |
|--------|-------|---------|
| **Type** | Library (UI only) | Full framework |
| **Language** | JavaScript + JSX | TypeScript |
| **Data binding** | One-way | Two-way (with `[(ngModel)]`) |
| **DOM** | Virtual DOM | Incremental DOM (Angular Ivy) |
| **Learning curve** | Moderate | Steep |
| **State management** | External (Redux, Zustand) | Built-in services + RxJS |
| **Bundle size** | Smaller | Larger |
| **Architecture** | Component-based | Module + Component + Service |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. How does React differ from Vue?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | React | Vue |
|--------|-------|-----|
| **Type** | Library | Progressive framework |
| **Syntax** | JSX | Templates + JSX support |
| **Data binding** | One-way | Two-way with `v-model` |
| **State** | `useState`/`useReducer` | `ref()`/`reactive()` (Composition API) |
| **Ecosystem** | Community-driven | Official router + store |

Both are popular; React has a larger ecosystem and job market, while Vue is considered easier to learn.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is an SPA? How does it differ from an MPA?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**SPA (Single Page Application):** One HTML page. JavaScript handles navigation by swapping content. Faster after initial load, but slower first load.

**MPA (Multi Page Application):** Each navigation loads a new HTML page from the server. Better SEO naturally, but slower navigation due to full page reloads.

React is typically used for SPAs, but frameworks like Next.js add MPA-like routing with SSR/SSG.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What is the Virtual DOM?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The **Virtual DOM** is a lightweight JavaScript object representation of the real DOM. When state changes:

1. React creates a new Virtual DOM tree
2. It diffs the new tree against the previous one (reconciliation)
3. It calculates the minimal set of DOM mutations
4. React batches and applies only those changes to the real DOM

This avoids expensive direct DOM manipulations.

```jsx
// React's virtual DOM representation of <div class="app">Hello</div>
{
  type: 'div',
  props: { className: 'app', children: 'Hello' }
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. What is the Real DOM? How does it differ from the Virtual DOM?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Virtual DOM | Real DOM |
|-------------|----------|
| JavaScript object | Browser API |
| Lightweight | Heavy (many built-in properties) |
| Updated quickly in memory | Slow DOM operations |
| Batched updates | Immediate updates |
| React manages it | Browser manages it |

Real DOM operations (like `appendChild`, `setAttribute`) are slow because they trigger layout, painting, and compositing. The Virtual DOM minimizes these operations.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is JSX?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

JSX is a **JavaScript syntax extension** that looks like HTML. It is syntactic sugar for `React.createElement()` calls.

```jsx
// JSX
const element = <h1 className="title">Hello</h1>;

// Compiled to
const element = React.createElement('h1', { className: 'title' }, 'Hello');
```

JSX is not required but is the standard way to write React components.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What is rendering in React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Rendering** is the process of React asking your components to describe what the UI should look like based on the current state and props. It produces a description of the UI (the Virtual DOM), which React then uses to update the real DOM.

Rendering happens when:
- State changes (`useState` setter, `useReducer` dispatch)
- Props change (parent re-renders)
- `forceUpdate()` is called (class components)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. What is a React Element?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **React Element** is the smallest building block in React. It's a plain object describing what you want to see on screen:

```jsx
const element = <h1>Hello, world!</h1>;
// → { type: 'h1', props: { children: 'Hello, world!' } }
```

Elements are **immutable** — once created, you cannot change its children or attributes. To update the UI, create a new element.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is a React Component?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **component** is a reusable, self-contained piece of UI. It accepts inputs called **props** and returns React elements describing what should appear on screen.

```jsx
// Functional component (modern)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

Components let you split the UI into independent, reusable pieces.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is the difference between a Functional Component and a Class Component?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Aspect | Functional | Class |
|--------|-----------|-------|
| **Syntax** | Function returning JSX | Class extending `React.Component` |
| **State** | `useState` hook | `this.state` + `this.setState()` |
| **Lifecycle** | `useEffect` hook | `componentDidMount`, etc. |
| **`this`** | Not needed | Must bind methods |
| **Performance** | Lighter | Slightly heavier |
| **Recommended** | ✅ Modern standard | ❌ Legacy |

Modern React (v16.8+) recommends functional components with hooks.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. What is a Pure Component?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Pure Component** is a component that renders the same output for the same props and state. In class components, extend `React.PureComponent` (shallow comparison). In functional components, wrap with `React.memo()`.

```jsx
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});
```

`React.memo` prevents re-rendering when props haven't changed (shallow comparison).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What are props in React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Props** (short for "properties") are **read-only inputs** passed from a parent component to a child component. They allow data to flow down the component tree.

```jsx
function Child({ message }) {
  return <p>{message}</p>;
}

function Parent() {
  return <Child message="Hello from parent" />;
}
```

Props are immutable — a child component should never modify its props.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What is state in React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**State** is data that changes over time within a component. Unlike props (which are passed in), state is internal and managed by the component itself.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

When state changes, React re-renders the component to reflect the new data.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What is the difference between props and state?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Props | State |
|-------|-------|
| Passed from parent | Internal to component |
| Immutable | Mutable via setter |
| Define interface | Define dynamic data |
| Can have default values | Initial value set by component |
| Available in child | Only in the component |

```jsx
function Example({ initialCount }) {
  const [count, setCount] = useState(initialCount); // props → state
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What is one-way data flow in React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**One-way data flow** means data flows **down** the component tree from parent to child via props, and events flow **up** via callbacks.

```
Parent ──props──→ Child
  ↑                  │
  └─── callback ─────┘
```

This makes the data flow predictable and easier to debug compared to two-way binding.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. What is lifting state up?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Lifting state up** means moving shared state to a common ancestor component so that multiple sibling components can share and synchronize data.

```jsx
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <Input value={value} onChange={setValue} />
      <Display value={value} />
    </>
  );
}
```

This is a core React pattern for sharing state between components.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What is prop drilling?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Prop drilling** is passing props through multiple intermediate components that don't need the data, just to get it to a deeply nested component.

```jsx
<App>
  <Layout>        {/* passes user prop through */}
    <Nav>          {/* passes user prop through */}
      <Avatar user={user} />  {/* finally uses it */}
    </Nav>
  </Layout>
</App>
```

Solutions: Context API, component composition, or state management libraries.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is composition in React?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**Composition** is combining simple components to build complex UIs. React uses composition over inheritance.

```jsx
function FancyBorder({ color, children }) {
  return <div style={{ border: `2px solid ${color}` }}>{children}</div>;
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1>Welcome</h1>
      <p>Thank you for visiting!</p>
    </FancyBorder>
  );
}
```

The `children` prop and render props are composition patterns.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What is `useState`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useState` is a React Hook that lets you add state to functional components.

```jsx
const [state, setState] = useState(initialValue);
```

- Returns an array with two elements: the current state and a setter function
- The setter triggers a re-render when called
- Can pass a function to compute state from previous value: `setCount(prev => prev + 1)`

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. What is `useEffect`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useEffect` lets you perform **side effects** in functional components: data fetching, subscriptions, DOM manipulation, timers.

```jsx
useEffect(() => {
  // Effect runs after render
  fetchData();
  return () => {
    // Cleanup runs on unmount or before re-run
  };
}, [dependency]); // Re-runs when dependency changes
```

- **No dependency array**: runs after every render
- **Empty array `[]`**: runs once on mount
- **With values**: runs when those values change

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. What is `useRef`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useRef` returns a mutable ref object whose `.current` property persists across renders without causing re-renders when changed.

```jsx
function TextInput() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}
```

Common uses:
- Accessing DOM elements directly
- Storing mutable values that shouldn't trigger re-renders
- Keeping previous values

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is `useMemo`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useMemo` **memoizes** the result of a computation, recalculating only when its dependencies change.

```jsx
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

Use for expensive calculations, not trivial operations. It's a performance optimization, not a semantic guarantee.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is `useCallback`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useCallback` returns a **memoized callback** that only changes when its dependencies change.

```jsx
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

It's essentially `useMemo(() => fn, deps)`. Use when passing callbacks to optimized child components that rely on reference equality.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What is `useContext`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useContext` lets you read and subscribe to context in a functional component.

```jsx
const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

Call `useContext` with a context object (returned from `createContext`). It returns the current context value.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What is `useReducer`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`useReducer` is an alternative to `useState` for complex state logic involving multiple sub-values or when the next state depends on the previous one.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}
```

Best for when state logic is complex or when the next state depends on multiple actions.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What is a Custom Hook?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Custom Hook** is a JavaScript function that starts with `use` and calls other Hooks. It lets you extract component logic into reusable functions.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}
```

Custom Hooks let you share stateful logic, not state itself.

</div>
</details>

---

## Medium (Q31–Q70)

<details class="qa-card qa-medium">
<summary>
Q31. What is the difference between Controlled and Uncontrolled Components?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Controlled | Uncontrolled |
|-----------|-------------|
| Form data is managed by React state | Form data is managed by the DOM |
| Uses `value` + `onChange` | Uses `ref` to access DOM |
| More predictable | Less code for simple forms |
| Re-renders on each keystroke | No re-render on input |

```jsx
// Controlled
function Controlled() {
  const [val, setVal] = useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// Uncontrolled
function Uncontrolled() {
  const ref = useRef();
  return <input ref={ref} defaultValue="initial" />;
}
```

**Follow-up:** Controlled components are preferred because React is the single source of truth.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q32. What is a Higher-Order Component (HOC)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

An **HOC** is a function that takes a component and returns a new component with additional props or behavior.

```jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const user = useUser();
    if (!user) return <LoginRedirect />;
    return <WrappedComponent {...props} user={user} />;
  };
}

const AdminPanel = withAuth(AdminPanelBase);
```

HOCs are a pattern from before hooks. Modern alternatives: Custom hooks or render props.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q33. What are Presentational vs Container Components?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Presentational | Container |
|---------------|-----------|
| Describes **how** things look | Describes **how** things work |
| No state (or UI-only state) | Manages state and logic |
| Receives data via props | Provides data to children |
| Examples: Button, Card, List | Examples: UserListContainer, TodoContainer |

Modern React with hooks makes this distinction less rigid, but the separation of concerns is still valuable.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q34. What is the React Component Lifecycle?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Mounting** — Component is created and inserted into DOM:
- `constructor()` → `render()` → `componentDidMount()`

**Updating** — Component re-renders due to props/state changes:
- `render()` → `componentDidUpdate(prevProps, prevState)`

**Unmounting** — Component is removed from DOM:
- `componentWillUnmount()`

In functional components, `useEffect` covers all lifecycle phases:
```jsx
useEffect(() => {
  // Mount: componentDidMount
  return () => {
    // Unmount: componentWillUnmount
  };
}, []);

useEffect(() => {
  // Update: componentDidUpdate when deps change
}, [dependency]);
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q35. How does `useEffect` map to class lifecycle methods?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Class Lifecycle | `useEffect` Equivalent |
|----------------|------------------------|
| `componentDidMount` | `useEffect(() => { ... }, [])` |
| `componentDidUpdate` | `useEffect(() => { ... }, [dep])` |
| `componentWillUnmount` | `useEffect(() => { return () => { ... }; }, [])` |
| `shouldComponentUpdate` | `React.memo` for the component |

```jsx
useEffect(() => {
  console.log('Mounted or updated');
  return () => console.log('Cleanup before next effect or unmount');
});
```

Note: `useEffect` runs **after** the browser paints, unlike lifecycle methods which run synchronously.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q36. What are Synthetic Events in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Synthetic Events** are React's cross-browser wrapper around the browser's native events. They provide a consistent API across browsers.

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();  // SyntheticEvent method
    console.log(e.type); // 'click' — works in all browsers
  };
  return <button onClick={handleClick}>Click</button>;
}
```

Key properties:
- **Event pooling** (pre-React 17): Synthetic events are reused — accessing `e` asynchronously required `e.persist()`
- React 17+ no longer pools events
- Same API as native events (`stopPropagation`, `preventDefault`)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q37. How does event binding work in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

In functional components, you don't need explicit binding:

```jsx
function ClickHandler() {
  const handleClick = () => {
    console.log('Clicked');
  };
  return <button onClick={handleClick}>Click</button>;
}
```

In class components, you must bind event handlers:

```jsx
class ClickHandler extends React.Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);  // ✅
  }
  handleClick() { console.log(this); }
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

Alternatives: arrow function class property `handleClick = () => {}` or inline arrow `onClick={() => this.handleClick()}` (but this creates a new function each render).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q38. What is `preventDefault` in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`preventDefault()` prevents the browser's default behavior for an event.

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents page reload
    // Submit data via fetch/axios
  };
  return <form onSubmit={handleSubmit}>...</form>;
}
```

Common uses: prevent form submission, prevent link navigation, prevent right-click context menu.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q39. What is event bubbling and capturing in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

React events use **bubbling** by default — an event on a child element triggers handlers on parent elements.

```jsx
function Parent() {
  return (
    <div onClick={() => console.log('parent')}>
      <button onClick={() => console.log('child')}>Click</button>
    </div>
  );
}
// Clicking button logs: "child" → "parent"
```

To use **capturing** phase, append `Capture` to the event name:

```jsx
<div onClickCapture={() => console.log('captured')}>
  <button onClick={() => console.log('child')}>Click</button>
</div>
// Logs: "captured" → "child"
```

Stop propagation: `e.stopPropagation()`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q40. How do you handle forms in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Controlled approach** (recommended):

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

For complex forms, consider libraries like **React Hook Form** or **Formik** which reduce boilerplate and improve performance.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q41. How does the Context API work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The Context API provides a way to pass data through the component tree without prop drilling.

```jsx
// 1. Create context
const ThemeContext = createContext('light');

// 2. Provider wraps the tree
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainContent />
    </ThemeContext.Provider>
  );
}

// 3. Consumer uses the context
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button className={theme} onClick={() => setTheme('dark')}>
      Toggle
    </button>
  );
}
```

**Performance note:** All consumers re-render when the context value changes, even if they only use part of it. Split contexts for unrelated data.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q42. What is Redux and how does it work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redux is a **predictable state container** for JavaScript apps. It follows three principles:

1. **Single source of truth** — Global state in one store
2. **State is read-only** — Only changed by dispatching actions
3. **Changes are made by pure functions** — Reducers

```jsx
// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    default: return state;
  }
}

// In component
const count = useSelector(state => state.count);
const dispatch = useDispatch();
dispatch(increment());
```

Modern Redux uses **Redux Toolkit** which reduces boilerplate with `createSlice` and `configureStore`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q43. What is Redux Toolkit? How is it better than vanilla Redux?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redux Toolkit (RTK)** is the official, recommended way to write Redux logic. It eliminates boilerplate:

| Vanilla Redux | Redux Toolkit |
|---------------|--------------|
| Separate action types, creators, reducers | `createSlice` combines them |
| Manual store setup | `configureStore` with sensible defaults |
| Manual immutable updates | Immer built-in (mutate syntax) |
| Custom middleware config | Includes `redux-thunk` by default |

```jsx
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },  // Immer handles immutability
  },
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q44. What is Zustand? How does it compare to Redux?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Zustand** is a lightweight state management library with a minimal API:

```jsx
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

**Comparison:**

| Zustand | Redux Toolkit |
|---------|--------------|
| No boilerplate | More setup |
| No provider needed | Needs `<Provider>` |
| No actions/reducers concept | Action + Reducer pattern |
| Smaller bundle (~1KB) | Larger (~11KB) |
| Same performance | Same performance |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q45. What is React Router? How do you set up routing?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**React Router** is the standard routing library for React applications.

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Key features: dynamic routes (`:id`), nested routes, lazy loading with `React.lazy()`, navigation with `useNavigate()`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q46. How do you implement protected routes in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Create a wrapper component that checks authentication:

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/login" element={<Login />} />
</Routes>
```

Alternatively, use a layout route pattern for cleaner code.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q47. How do you implement lazy loading in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use `React.lazy()` with `Suspense` for code splitting:

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

Benefits: smaller initial bundle, faster first load. Best for route-level splitting.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q48. What is `React.memo` and when should you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`React.memo` is a higher-order component that **prevents re-rendering** when props haven't changed (shallow comparison).

```jsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <li key={item.id}>{item.name}</li>);
});
```

**When to use:**
- Component renders often with same props
- Component is expensive to render (large lists, charts)
- Component is deeply nested and re-renders due to parent

**When NOT to use:**
- Props change frequently (comparison cost outweighs benefit)
- Component is lightweight
- To "fix" unnecessary renders without addressing root cause

**Caveat:** Pass inline functions or objects as props, and memoization is defeated unless you also use `useCallback`/`useMemo`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q49. What is `useLayoutEffect`? How is it different from `useEffect`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useLayoutEffect` fires **synchronously** after DOM mutations but before the browser paints. `useEffect` fires **asynchronously** after paint.

```jsx
useLayoutEffect(() => {
  // Runs before browser paint
  // Good for: measuring DOM, preventing visual flicker
}, [deps]);
```

| `useEffect` | `useLayoutEffect` |
|------------|-------------------|
| Async (after paint) | Sync (before paint) |
| No visual delay | Can block visual updates |
| Default choice | Only when needed |
| Safe for most effects | For DOM measurements, scroll positions |

**Don't** use `useLayoutEffect` for data fetching — it blocks painting.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q50. What is `useImperativeHandle`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useImperativeHandle` customizes the instance value exposed to parent components when using `ref` + `forwardRef`.

```jsx
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    scrollToView: () => inputRef.current.scrollIntoView(),
  }));

  return <input ref={inputRef} />;
});

// Parent
const ref = useRef();
<FancyInput ref={ref} />;
ref.current.focus(); // Exposed method
```

Use sparingly — prefer declarative props over imperative handles.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q51. What is `useId`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useId` generates unique IDs for accessibility attributes, stable across server and client rendering.

```jsx
function EmailForm() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );
}
```

**Why it exists:** Generating IDs with incrementing counters breaks hydration. `useId` produces deterministic, collision-resistant IDs.

Added in React 18.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. What is `useTransition`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useTransition` lets you mark a state update as **non-urgent**, allowing the UI to stay responsive during expensive updates.

```jsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // Urgent: update input value immediately
    setQuery(e.target.value);

    // Non-urgent: filter results can be deferred
    startTransition(() => {
      setFilteredResults(filterData(e.target.value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultsList items={filteredResults} />
    </>
  );
}
```

**Follow-up:** `startTransition` lets you keep the UI responsive by delaying less important updates. The pending flag tells you when to show a loading indicator.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. What is `useDeferredValue`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useDeferredValue` lets you defer re-rendering a non-urgent part of the tree. It's like a debounced value but with automatic priority handling.

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // This component re-renders on every keystroke (urgent)
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      // This component only re-renders when deferredQuery changes
      <SlowSearchResults query={deferredQuery} />
    </>
  );
}
```

**`useTransition` vs `useDeferredValue`:**
- `useTransition`: wraps the state update in `startTransition`
- `useDeferredValue`: defers a derived value without changing the update

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. What is `useSyncExternalStore`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`useSyncExternalStore` lets you subscribe to an **external store** (outside React) while ensuring consistency with concurrent rendering.

```jsx
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,   // Subscribe function
    getSnapshot, // Returns current value
    getServerSnapshot // For SSR hydration
  );
  return isOnline;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}
```

This hook ensures React reads the store value within a single synchronous render cycle, preventing tearing (inconsistent UI).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is the Reconciliation Algorithm?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Reconciliation** is React's algorithm to efficiently update the DOM. When state changes, React:

1. **Renders** — Calls your components with new state/props
2. **Diffs** — Compares the new Virtual DOM tree with the previous one
3. **Updates** — Applies minimal DOM mutations

**Key rules:**
- Elements of **different types** → tear down old tree, build new one
- Elements of **same type** → update existing DOM node, recurse on children
- **Keys** help identify which children changed

```jsx
// Different types → full replacement
<div /> → <span />  // Remount

// Same type → update props
<div className="old" /> → <div className="new" />  // Update attribute

// Keys for lists
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**Time complexity:** O(n) based on heuristics, not O(n³) naive tree diffing.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. Why are keys important in React lists?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Keys** help React identify which items in a list have changed, been added, or been removed.

```jsx
const items = todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
));
```

**Without keys:**
- React uses index by default — causes issues with reordering, insertion, deletion
- Wrong items may be re-rendered, causing UI bugs (e.g., input state in form fields getting mixed up)

**Good keys:** Unique, stable IDs from data (`item.id`)
**Bad keys:** Array index (unless list is static), random values (`Math.random()`)

```jsx
// ❌ Bad — index as key
{todos.map((todo, index) => <TodoItem key={index} {...todo} />)}

// ✅ Good — unique ID
{todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. How do you make API calls in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use `useEffect` for data fetching with proper loading and error states:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();
    return () => { cancelled = true; };  // Cleanup on unmount or ID change
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <div>{user.name}</div>;
}
```

**Modern approach with TanStack Query (React Query):**
```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. How do you handle errors in API calls?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Implement a robust error handling strategy:

1. **Try-catch** in fetch logic (as shown above)
2. **Error boundaries** for rendering errors
3. **Retry logic** for transient failures
4. **Graceful degradation** — show cached data while offline

```jsx
// Simple retry helper
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i))); // exponential backoff
    }
  }
}
```

**Follow-up:** Libraries like TanStack Query handle retries, caching, and stale-while-revalidate out of the box.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. How do caching strategies work for API calls in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Strategy | How It Works | Use Case |
|----------|-------------|----------|
| **In-memory cache** | Store responses in a Map | Simple, single session |
| **React Query / SWR** | Stale-while-revalidate, cache invalidation | Production apps |
| **localStorage** | Persist data across sessions | Offline support |
| **Service Worker** | Network-first, cache-first strategies | PWAs |
| **HTTP caching** | Browser cache headers `Cache-Control` | Static data |

**React Query example:**

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: true,
    },
  },
});
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is the difference between `useMemo` and `useCallback`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `useMemo` | `useCallback` |
|-----------|--------------|
| Memoizes a **value** (result of computation) | Memoizes a **function** |
| `useMemo(() => expensive(a, b), [a, b])` | `useCallback(fn, [a, b])` |
| Returns the cached value | Returns the cached function |
| Good for: expensive calculations | Good for: preventing child re-renders |

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```jsx
// useMemo → memoized value
const sorted = useMemo(() => items.sort(), [items]);

// useCallback → memoized function
const handleClick = useCallback(() => setCount(c => c + 1), []);
```

Only use when you've identified a performance bottleneck. Premature optimization adds complexity.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. How do you optimize React rendering performance?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Technique | Description |
|-----------|-------------|
| **`React.memo`** | Prevent re-render when props haven't changed |
| **`useMemo`/`useCallback`** | Memoize values/functions |
| **Code splitting** | `React.lazy` + `Suspense` for route-level splitting |
| **Virtualization** | `react-window` or `react-virtuoso` for large lists |
| **Avoid unnecessary state** | Derive values from existing state |
| **Context splitting** | Split contexts to avoid unnecessary re-renders |
| **`useTransition`** | Mark non-urgent updates as transitions |
| **Stable keys** | Proper list keys for efficient reconciliation |

**Profile first, optimize second.** Use React DevTools Profiler to identify bottlenecks.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is Suspense in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Suspense** lets you declaratively specify loading states for components that are waiting for something (code, data, images).

```jsx
<Suspense fallback={<LoadingSpinner />}>
  <LazyLoadedComponent />
</Suspense>
```

**Use cases:**
1. **Code splitting** — Wrap `React.lazy()` components
2. **Data fetching** — With frameworks like Next.js or Relay
3. **Streaming SSR** — Server-side rendering with progressive HTML streaming

React 18+ supports Suspense for server rendering and data fetching (with concurrent features).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. What is Concurrent Rendering in React 18?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Concurrent Rendering** is a new behind-the-scenes mechanism that lets React prepare multiple versions of the UI at the same time. Key features:

- **Interruptible rendering** — React can pause and resume work
- **Automatic batching** — State updates inside timeouts, promises, and events are batched
- **Transitions** — Distinguish urgent vs non-urgent updates
- **Streaming SSR** — Server renders incrementally

```jsx
// Before React 18: only event handlers were batched
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18: both updates batched into one re-render
}, 1000);

// Transitions: mark non-urgent updates
startTransition(() => {
  setSearchResults(query);
});
```

Concurrent mode is opt-in. You gradually adopt it by using new APIs like `startTransition`, `useDeferredValue`, and `<Suspense>`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. How does `useCallback` help with referential equality?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

In JavaScript, functions are objects — each re-render creates a **new function reference**:

```jsx
function Parent() {
  const handleClick = () => {};  // New function every render
  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

Without `useCallback`, `Child` re-renders every time because `React.memo` sees a different `onClick` reference. With `useCallback`, the reference stays the same:

```jsx
function Parent() {
  const handleClick = useCallback(() => {}, []);  // Stable reference
  return <Child onClick={handleClick} />;
}
```

**Note:** Only works when combined with `React.memo` on the child. Don't use `useCallback` unnecessarily — the comparison overhead may outweigh benefits.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What is the difference between `useRef` and `createRef`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| `useRef` | `createRef` |
|----------|------------|
| Hook for functional components | Used in class components |
| Returns same ref object across renders | Creates new ref object each render |
| Persists for component lifetime | Must be stored in instance variable |

```jsx
// Functional — useRef
function Input() {
  const ref = useRef(null);  // Same ref every render
  return <input ref={ref} />;
}

// Class — createRef
class Input extends React.Component {
  ref = createRef();  // Stored on instance
  render() { return <input ref={this.ref} />; }
}
```

In functional components, always use `useRef`. Using `createRef` in a functional component would create a new ref on every render.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. How do you implement a debounce search in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Create a custom `useDebounce` hook:

```jsx
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query); // 300ms debounce

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

**Alternative:** `useDeferredValue` (React 18+) which doesn't add artificial delay.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. How do you implement infinite scrolling in React?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use the Intersection Observer API:

```jsx
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setPage(p => p + 1);
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    fetch(`/api/items?page=${page}`)
      .then(r => r.json())
      .then(data => {
        setItems(prev => [...prev, ...data.items]);
        setHasMore(data.hasMore);
      });
  }, [page]);

  return (
    <>
      {items.map(item => <Item key={item.id} {...item} />)}
      <div ref={sentinelRef} /> {/* Sentinel element */}
    </>
  );
}
```

For production, use libraries like `react-infinite-scroll-component` or `react-virtuoso` which handle edge cases (loading states, error handling, scroll position restoration).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. What is the difference between `useEffect` and `useLayoutEffect` in terms of timing?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

```
Component render
    ↓
React updates DOM
    ↓
useLayoutEffect fires (synchronous — blocks paint)
    ↓
Browser paints (visual update)
    ↓
useEffect fires (asynchronous — after paint)
```

**When to use `useLayoutEffect`:**
- Reading DOM layout (`getBoundingClientRect`)
- Synchronous DOM mutations (prevent flicker)
- Scroll position adjustments

**Always start with `useEffect`** — it doesn't block painting and is safer for performance.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What is an Error Boundary?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

An **Error Boundary** is a component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of crashing the whole app.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorScreen />}>
  <UserProfile />
</ErrorBoundary>
```

**Limitations:**
- Error boundaries must be **class components** (no hooks equivalent yet)
- They catch errors in **render, lifecycle, and constructors**
- They do NOT catch errors in event handlers (use try-catch instead), async code, or SSR

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. How do you test React components?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Use **Jest** (test runner) + **React Testing Library** (DOM testing utilities):

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('counter increments when button is clicked', async () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: /count is 0/i });
  await userEvent.click(button);

  expect(button).toHaveTextContent('count is 1');
});
```

**Testing strategies:**

| Type | What to Test |
|------|-------------|
| **Unit** | Individual functions, hooks, utilities |
| **Component** | Render output, user interactions, state changes |
| **Integration** | Multiple components working together |
| **E2E** | Full user flows with Playwright or Cypress |

**Best practices:**
- Test by accessibility roles, not CSS classes
- Use `userEvent` instead of `fireEvent` (more realistic)
- Avoid testing implementation details
- Mock API calls with `msw` (Mock Service Worker)

</div>
</details>

---

## Hard (Q71–Q105)

<details class="qa-card qa-hard">
<summary>
Q71. How does the Fiber Architecture work in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Fiber** is React 16's complete rewrite of the reconciliation engine. It enables incremental rendering and concurrent mode.

**Key concepts:**

- **Fiber Node** — Each component instance corresponds to a fiber node. Fibers form a linked list tree (not a recursive tree).
- **Work loop** — React processes fibers in small chunks, yielding to the browser periodically.
- **Priority levels** — Different updates have different priorities (e.g., animation > data fetch).
- **Two phases:**
  1. **Render/Reconciliation** — Interruptible. React builds a "work-in-progress" fiber tree.
  2. **Commit** — Not interruptible. React applies DOM mutations.

**Fiber node structure:**

```jsx
{
  tag: FunctionComponent,       // Type of component
  key: null,                    // Unique key
  elementType: MyComponent,     // The component itself
  stateNode: fiberInstance,     // Instance reference
  return: parentFiber,          // Parent fiber (linked list)
  child: childFiber,            // First child
  sibling: siblingFiber,        // Next sibling
  memoizedState: state,         // Current state/hooks list
  memoizedProps: props,         // Current props
  pendingProps: nextProps,      // Next props to apply
  effectTag: 'UPDATE',          // Side effect to apply
  alternate: oldFiber,          // Pointer to the other tree
}
```

**Why Fiber matters:**
- Enables concurrent rendering (interruptible)
- Foundations for Suspense and transitions
- Better frame budget management for animations
- Prioritizes user interactions over background updates

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q72. What is the Diffing Algorithm in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The **Diffing Algorithm** (part of reconciliation) determines how to efficiently update the DOM. Based on two assumptions:

1. **Elements of different types produce different trees** — React replaces the entire subtree
2. **Stable keys** indicate stable identity across renders

**Algorithm:**

```
1. Root element comparison
   ├── Different types (div → span)
   │   └── Destroy old tree, build new tree
   ├── Same type (div → div)
   │   ├── Update DOM attributes
   │   └── Recurse on children
   └── Same type, same key
       └── Update props, recurse on children

2. List comparison (with keys)
   ├── Match items by key
   ├── Move items that changed position
   ├── Add new items
   └── Remove deleted items
```

**Without keys, React uses index-based matching:**
```jsx
// Before: [a, b, c]
// After:  [a, c, b]
// Index-based: React changes b→c and c→b (wasteful updates)
// Key-based: React swaps the last two (efficient)
```

This is O(n) complexity, compared to O(n³) for naive tree diffing.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q73. What happens during the Render Phase vs the Commit Phase?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React splits work into two phases:

**Render Phase (interruptible):**
- Calls your component functions
- Produces a "work-in-progress" fiber tree
- Collects side effects (DOM mutations to apply)
- Can be interrupted by higher-priority updates
- Can be paused, resumed, or abandoned

**Commit Phase (synchronous, not interruptible):**
- Applies the collected DOM mutations
- Runs `useLayoutEffect` cleanup and effects
- Runs `useEffect` cleanup and effects (async)
- Updates refs

```
Render Phase              Commit Phase
─────────────             ─────────────
Component() ──→ Virtual   DOM mutations
Component()     DOM tree  useLayoutEffects
Component()     + effects Refs updated
                list      
                         useEffects (async)
```

**Why the distinction matters:**
- Side effects (DOM, subscriptions) should be in commit phase
- Render phase can be called multiple times (paused/resumed) — effects would incorrectly fire
- Pure rendering ensures safe interruption

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q74. What are Portals in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Portals** let you render a component's children into a different DOM node outside the parent component's DOM hierarchy.

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById('portal-root')
  );
}
```

**Common use cases:**
- Modal dialogs
- Tooltips and popovers
- Dropdown menus
- Toast notifications

**Important:** Even though the DOM renders elsewhere, the React tree relationship is preserved (events bubble through the React tree, not the DOM tree).

```jsx
<div onClick={() => console.log('clicked')}>
  <Modal>Will bubble to parent div</Modal>
</div>
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q75. How do Server Components work in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**React Server Components (RSC)** are components that run **only on the server** and send their output to the client. They're distinct from SSR.

**Key characteristics:**
- Zero client-side JavaScript — no hooks, no state, no effects
- Direct access to databases, file systems, and backends
- Automatically reduce bundle size
- Can be mixed with Client Components (`'use client'`)

```jsx
// Server Component (default in Next.js App Router)
// No hooks, no event handlers, no browser APIs
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — ${p.price}</li>
      ))}
    </ul>
  );
}

// Client Component
'use client';
function AddToCart({ productId }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
```

**RSC vs SSR:**

| SSR | RSC |
|-----|-----|
| Renders HTML on server | Sends a serialized component description |
| Hydrates to client component | No hydration needed |
| All components are client components | Mix of server and client |
| Same bundle size | Smaller bundle (server parts excluded) |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q76. What is Hydration? How does it work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Hydration** is the process of attaching event listeners and state to server-rendered HTML, making it interactive.

```jsx
// Server sends HTML:
// <button id="counter">0</button>

// Client hydrates:
hydrateRoot(document.getElementById('root'), <App />);
// React attaches event handlers to existing DOM nodes
// without recreating the DOM
```

**How it works:**
1. Server renders HTML and sends to browser
2. Browser displays HTML immediately (perceived faster load)
3. React loads and runs JavaScript
4. React "hydrates" — matches VDOM tree to existing DOM, attaches events
5. If mismatched, React uses client-side render (single mismatch error in dev)

**Hydration issues:**
- **Mismatch errors** — If server and client produce different output (e.g., random values)
- **Performance** — Hydration is expensive for large pages with many interactive elements
- **Selective hydration** — React 18 hydrates only parts of the page that become interactive

```jsx
// Common hydration mismatch:
function TimeDisplay() {
  // ❌ Server renders one time, client renders another
  return <div>{new Date().toLocaleTimeString()}</div>;

  // ✅ Use useEffect for client-only data
  const [time, setTime] = useState(null);
  useEffect(() => { setTime(new Date().toLocaleTimeString()); }, []);
  return <div>{time ?? 'Loading...'}</div>;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q77. What is SSR (Server-Side Rendering) vs CSR (Client-Side Rendering) vs SSG (Static Site Generation)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Aspect | CSR | SSR | SSG |
|--------|-----|-----|-----|
| **Render location** | Browser | Server | Build time |
| **First load** | HTML shell, then JS renders | Full HTML sent to browser | Pre-built HTML |
| **Subsequent navigation** | Client-side (fast) | Server round-trip | Client-side |
| **SEO** | Poor (crawlers see blank page) | Good | Excellent |
| **TTFB (Time to First Byte)** | Fast | Slower (server renders) | Fastest (static file) |
| **TTI (Time to Interactive)** | Slower (must download JS) | Good (content visible first) | Good |
| **Data freshness** | Real-time | Real-time | Stale until rebuild |

```jsx
// CSR — Single-page React app
ReactDOM.createRoot(root).render(<App />);

// SSR — Next.js Pages Router
export async function getServerSideProps() {
  return { props: { data: await fetchData() } };
}

// SSG — Next.js static export
export async function getStaticProps() {
  return { props: { data: await fetchData() }, revalidate: 3600 };
}
```

**Modern approach (Next.js App Router):** Mix SSR, SSG, and ISR within the same page.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q78. What is ISR (Incremental Static Regeneration)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**ISR** is a Next.js feature that combines SSG (static generation) with dynamic updates. Instead of rebuilding the entire site, you regenerate individual pages in the background.

```jsx
// Next.js App Router
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await fetchData();
  return <Product data={data} />;
}
```

**How it works:**
1. First request: serve pre-built static HTML (if exists) or build on demand
2. Subsequent requests within `revalidate` window: serve cached page
3. After `revalidate` window: serve cached page, trigger background rebuild
4. Next request: serve freshly generated page

**Benefits:**
- Fast static delivery
- Fresh data without full rebuild
- Scales to millions of pages
- No server overhead after build

**ISR with `on-demand` revalidation:**
```jsx
// Trigger revalidation from API/webhook
await revalidatePath('/products/123');
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q79. What is the `use()` Hook in React 19?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`use()` is a new React 19 hook that lets you read resources (promises, context) directly in render. Uniquely, it can be called conditionally and inside loops.

```jsx
// ✅ Can be called in conditionals and loops
function Comment({ commentPromise }) {
  const comment = use(commentPromise);
  return <div>{comment.text}</div>;
}

// Also works with context:
function ThemeButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

**Key differences from other hooks:**

| `use(promise)` | `useEffect` + `fetch` |
|---------------|----------------------|
| Suspends rendering until promise resolves | Renders, fetches, re-renders |
| No loading state needed (handled by Suspense) | Must manage loading state |
| Can be called conditionally | Must be at top level |

**Usage with Suspense:**
```jsx
function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  );
}

function Profile() {
  const user = use(fetchUser());  // Suspends here
  return <div>{user.name}</div>;
}
```

Added in React 19 (canary). It simplifies data fetching by integrating Suspense directly into component render.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q80. What is `useOptimistic` in React 19?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`useOptimistic` lets you optimistically update the UI before a server operation completes, then automatically reverts if it fails.

```jsx
function MessageThread({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('message');

    // Optimistically add the message
    addOptimisticMessage(text);

    // Actually send it — if it fails, optimistic state reverts
    await sendMessage(text);
  }

  return (
    <>
      {optimisticMessages.map((msg, i) => (
        <div key={i}>
          {msg.text}
          {msg.sending && <Spinner />}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
```

**Key features:**
- Instant UI feedback
- Automatic rollback on error
- Works with Server Actions in React 19
- No need for separate pending state

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q81. How does `React.memo` work internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`React.memo` is a higher-order component that performs a **shallow comparison** of props before allowing a re-render.

**Internal mechanism:**

```jsx
// Simplified internal implementation
function memo(Component, areEqual) {
  return class MemoizedComponent extends React.PureComponent {
    // React Fiber checks the "memo" tag and compares props
    // If props are equal (shallow), React skips the render
    render() {
      if (areEqual) {
        return areEqual(prevProps, nextProps) ? null : <Component {...this.props} />;
      }
      return shallowEqual(prevProps, nextProps) ? null : <Component {...this.props} />;
    }
  };
}
```

**Shallow comparison checks:**
```jsx
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;  // Same reference
  if (typeof objA !== 'object' || objA === null) return false;
  if (typeof objB !== 'object' || objB === null) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key =>
    Object.hasOwn(objB, key) && Object.is(objA[key], objB[key])
  );
}
```

**What shallow equality DOES NOT catch:**
```jsx
// These still pass the check but have different content:
<Child items={[{ id: 1 }]} />  // New array with new object

// To fix, memoize the prop:
<Child items={useMemo(() => [{ id: 1 }], [])} />
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q82. How does the Hooks execution order work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React relies on **call order** to associate hooks with their state, not on names or keys. Each hook call is stored in a **linked list** on the fiber node.

```jsx
function Counter() {
  const [count, setCount] = useState(0);     // Hook #1
  const [name, setName] = useState('');       // Hook #2
  useEffect(() => {                           // Hook #3
    document.title = `${count} ${name}`;
  }, [count, name]);
  // ...
}
```

**Internally, hooks are stored as a linked list:**

```jsx
// Simplified hook state
{
  memoizedState: {
    // Hook #1 (useState: count)
    queue: { lastRenderedState: 0 },
    next: {
      // Hook #2 (useState: name)
      queue: { lastRenderedState: '' },
      next: {
        // Hook #3 (useEffect)
        tag: Effect,
        create: () => { document.title = ... },
        deps: [count, name],
        next: null // End of list
      }
    }
  }
}
```

**Rules of Hooks emerge from this implementation:**
1. **Only call Hooks at the top level** — Don't call inside conditions, loops, or nested functions (would break the linked list order)
2. **Only call Hooks from React functions** — Components or custom hooks

```jsx
// ❌ BREAKS hook order
if (condition) {
  const [value, setValue] = useState(0);  // Hook #2 sometimes missing
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q83. How does React handle state updates in concurrent mode?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

In concurrent mode, React can **interrupt, pause, or abandon** a render in progress. This introduces new complexities for state updates.

**Update priority levels:**

```jsx
export const ImmediatePriority = 1;  // User clicks, keypress
export const UserBlockingPriority = 2;  // Hover, scroll
export const NormalPriority = 3;  // Data fetching
export const LowPriority = 4;  // Analytics
export const IdlePriority = 5;  // Prefetching
```

**How React handles multiple pending state updates:**

1. **Batched by default** — Multiple `setState` calls in the same event are batched (even in setTimeout, Promises)
2. **Interruptible** — A high-priority update (click) can interrupt a low-priority render (search results)
3. **Transition updates** — `startTransition` marks updates as lower priority
4. **Evaluation** — React evaluates which version of the UI the user should see

**Example:**
```
Time ──────────────────────────────────→

User types:      A───B───C───D───
Search results:  [A..] [B..] [C..] [D..]
                         ↑
        B update interrupts A's render
        React throws away A's work-in-progress
        Starts rendering B immediately
```

**Key consequence:** The render phase can execute multiple times for a single commit. This is why render functions must be **pure** — no side effects in component bodies.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q84. How do you handle XSS vulnerabilities in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React **escapes content by default** in JSX, preventing most XSS attacks:

```jsx
const userInput = '<script>alert("xss")</script>';
<div>{userInput}</div>  // React escapes: &lt;script&gt;
```

**But there are escape hatches that can introduce vulnerabilities:**

```jsx
// ❌ Dangerous — directly injecting HTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safer — sanitize first (DOMPurify)
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />

// ❌ Dangerous — passing user data to href
<a href={userProvidedLink}>Click</a>  // javascript: URLs

// ✅ Validate URLs
function isSafeUrl(url) {
  return url.startsWith('https://') || url.startsWith('/');
}
```

**Additional security measures:**
- Sanitize all user input server-side
- Use HTTP-only cookies for auth tokens
- Implement CSP (Content Security Policy) headers
- Avoid passing raw HTML to `dangerouslySetInnerHTML`
- Never interpolate user input into `href`, `src`, or `on*` attributes

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q85. What is an Anti-Pattern in React? Give examples.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Common React anti-patterns:

**1. Mutating state directly:**
```jsx
// ❌ Anti-pattern
const [items, setItems] = useState([1, 2]);
items.push(3);  // Won't trigger re-render!
setItems(items);  // React sees same reference, skips render

// ✅ Correct
setItems([...items, 3]);
```

**2. Using state when derived values suffice:**
```jsx
// ❌ Anti-pattern (unnecessary state)
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');  // Derived from firstName + lastName

// ✅ Derive during render
const fullName = `${firstName} ${lastName}`;
```

**3. Putting everything in Redux/Context:**
```jsx
// ❌ Anti-pattern — causes unnecessary re-renders
// Context value changes → all consumers re-render

// ✅ Split contexts by domain
const UserContext = createContext();
const ThemeContext = createContext();
```

**4. Using index as key for dynamic lists:**
```jsx
{items.map((item, index) => <Item key={index} />)}
// Breaks when items are reordered, added, or deleted
```

**5. Fetching data inside `useEffect` without cleanup:**
```jsx
// ❌ Can cause memory leaks and race conditions
useEffect(() => {
  fetchData().then(setData);  // Race condition if userId changes before fetch resolves
}, [userId]);

// ✅ Use cleanup flag or AbortController
useEffect(() => {
  const controller = new AbortController();
  fetchData({ signal: controller.signal }).then(setData);
  return () => controller.abort();
}, [userId]);
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q86. How do you handle race conditions in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Race conditions occur when async operations resolve out of order. Common patterns to handle them:

**1. Cleanup flag (most common):**
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data);
    });

    return () => { cancelled = true; };
  }, [userId]);
}
```

**2. AbortController (HTTP-specific):**
```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort();
}, [userId]);
```

**3. Using TanStack Query (automatic dedup):**
```jsx
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5000,  // Dedups requests within 5s
});
```

**4. Debounce rapid changes:**
```jsx
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  // Only fetch when debouncedQuery stabilizes
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q87. How do you optimize the performance of large lists in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**1. Virtualization** — Only render visible items:
```jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

**2. Memoize list items:**
```jsx
const ListItem = React.memo(({ item, onSelect }) => (
  <li onClick={() => onSelect(item.id)}>{item.name}</li>
));
```

**3. Stable keys — always use unique, stable IDs**
**4. Window-scroll virtualization** — libraries like `react-virtuoso`

| Library | Bundle Size | Features |
|---------|------------|----------|
| react-window | ~5KB | Lightweight, fixed/variable sizes |
| react-virtuoso | ~15KB | Auto-size, scroll-to-index, grouped |
| @tanstack/react-virtual | ~8KB | Headless, framework-agnostic |

**5. Pagination / infinite scroll instead of loading all items at once.**

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q88. How do you implement a theme switcher (dark mode) in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Using Context + CSS variables:**

```jsx
// ThemeContext
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**CSS variables handle theming:**
```css
:root {
  --bg: #ffffff;
  --text: #1a1a2e;
}
[data-theme='dark'] {
  --bg: #1a1a2e;
  --text: #e0e0e0;
}
body {
  background: var(--bg);
  color: var(--text);
}
```

**Follow-up:** To prevent FOUC (Flash of Unstyled Content), apply the theme in a blocking `<script>` in `<head>` before React hydrates.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q89. How do you implement authentication flow in a React app?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A complete auth flow with JWT:

```jsx
// AuthContext
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');

    const { token, user } = await res.json();
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Protected routes:**
```jsx
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  return children;
}
```

**Security best practices:**
- Use HTTP-only cookies for token storage (prevents XSS access)
- Implement CSRF protection
- Short-lived access tokens + refresh tokens
- Validate tokens on every protected API call
- Use `useCallback` for auth functions to prevent unnecessary re-renders

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q90. How do you set up a production-grade folder structure for a React app?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A scalable folder structure for a medium-to-large React app:

```
src/
├── api/              # API client, endpoints, interceptors
│   ├── client.ts     # Axios/fetch instance
│   └── endpoints/    # Grouped by domain
│       ├── auth.ts
│       └── users.ts
├── assets/           # Images, fonts, SVGs
├── components/       # Shared UI components
│   ├── ui/           # Primitive components (Button, Input, Modal)
│   └── layouts/      # Layout components (Sidebar, Header)
├── features/         # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── index.ts
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── hooks/            # Global shared hooks
├── lib/              # Utility functions, helpers
├── routes/           # Route configuration
├── stores/           # Global state (Zustand, Redux slices)
├── styles/           # Global styles, CSS variables
├── types/            # TypeScript type definitions
├── utils/            # Generic utilities
├── App.tsx
└── main.tsx
```

**Key principles:**
- **Feature-based grouping** over file-type grouping
- **Co-location** — Keep related files together (component, test, styles)
- **Barrel exports** — `index.ts` exports the public API of each module
- **Separation of concerns** — UI components vs business logic vs API calls

```jsx
// features/auth/index.ts
export { AuthProvider, useAuth } from './context';
export { LoginForm } from './components/LoginForm';
export type { User, AuthState } from './types';
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q91. How do you manage error handling strategy in a React application?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

A layered error handling strategy:

**1. Error Boundaries (UI errors):**
```jsx
// Catches errors in render, lifecycle, constructors
<ErrorBoundary fallback={<ErrorFallback />}>
  <UserDashboard />
</ErrorBoundary>
```

**2. API error handling:**
```jsx
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiClient<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new ApiError(res.status, error.message || 'Something went wrong');
  }
  return res.json();
}
```

**3. Global error handler:**
```jsx
// In App.tsx
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error tracking service
  logError(event.reason);
});
```

**4. React Query error handling:**
```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
      onError: (error) => {
        if (error instanceof ApiError && error.status === 401) {
          // Redirect to login
          navigate('/login');
        }
      },
    },
  },
});
```

**5. Error logging:**
```jsx
function logError(error: Error, context?: Record<string, unknown>) {
  // Send to Sentry, DataDog, or custom logging endpoint
  fetch('/api/log-error', {
    method: 'POST',
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {}); // Don't let error logging fail
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q92. How does React's event system work under the hood?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React uses **event delegation** — instead of attaching event listeners to each DOM element, React attaches a single listener to the root container.

**React 16 and earlier:**
- All events are attached to `document`
- Events bubble up to the document, React handles them

**React 17+:**
- Events are attached to the **root DOM container** (e.g., `#root`)
- This allows multiple React trees on the same page without interference
- Aligns with shadow DOM and micro-frontends

```jsx
// React 16: events on document
document.addEventListener('click', handleReactEvent);

// React 17+: events on root container
rootElement.addEventListener('click', handleReactEvent);
```

**Event processing pipeline:**
```
1. User clicks <button>
2. Browser creates native MouseEvent
3. Event bubbles to root container
4. React's event handler intercepts it
5. React creates a SyntheticEvent (wrapper)
6. React queues the event for processing
7. React processes the event and calls your handler
8. SyntheticEvent is recycled (React 16) or not (React 17+)
```

**Why this matters:**
- Consistent cross-browser behavior
- Performance (single listener vs per-element listeners)
- Memory efficiency
- Enables event pooling (React ≤16)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q93. Explain the reconciliation algorithm for lists with keys in detail.
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React uses a **keyed comparison** algorithm for lists, processing children by iterating through both the old and new lists simultaneously.

**Algorithm outline:**

```
Input: oldChildren = [A(key=1), B(key=2), C(key=3)]
       newChildren = [B(key=2), C(key=3), D(key=4)]

1. First pass — compare from both ends simultaneously:
   old[0] = A(key=1) vs new[0] = B(key=2) → no match (keys differ)
   old[2] = C(key=3) vs new[2] = D(key=4) → no match

2. Build key map from old children:
   { 1: A, 2: B, 3: C }

3. Iterate new children, match by key:
   B(key=2) → found in old[1] → MOVE (not recreate)
   C(key=3) → found in old[2] → MOVE
   D(key=4) → not found → CREATE

4. Remove old children not in new:
   A(key=1) → DELETE

Result: A removed, B and C reordered, D created.
Total operations: 3 moves + 1 create + 1 delete = 5
```

**Without keys (index-based):**

```
oldChildren = [A(idx=0), B(idx=1), C(idx=2)]
newChildren = [B(idx=0), C(idx=1), D(idx=2)]

1. old[0] → matches new[0] by index → update A to B (wrong!)
2. old[1] → matches new[1] by index → update B to C (wrong!)
3. old[2] → matches new[2] by index → update C to D (wrong!)

Result: All 3 items updated unnecessarily.
More importantly, any state in those components is lost or mixed up.
```

**Why stable keys matter:**
- Preserves component state across re-orders
- Efficient DOM updates (move, not recreate)
- Prevents input field value mix-ups in lists
- Avoids unnecessary re-mounting of expensive components

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q94. What is the difference between `useEffect` cleanup and `componentWillUnmount`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The key difference: **`useEffect` cleanup runs on EVERY re-render with changed deps**, not just on unmount.

**Class component lifecycle:**
```
Mount: constructor → render → componentDidMount
Update: render → componentDidUpdate
Unmount: componentWillUnmount
```

**Functional component with `useEffect`:**
```
Mount: render → useEffect(fn, []) → cleanup → [runs once]

With dependencies [id]:
Mount:         render → effect(id=1)
Update (id=2): render → cleanup(id=1) → effect(id=2)
Unmount:       cleanup(id=2)
```

**The cleanup function is the equivalent of "previous effect's unmount":**

```jsx
useEffect(() => {
  const subscription = subscribe(id);
  return () => {
    // This cleanup corresponds to the PREVIOUS effect
    subscription.unsubscribe();
  };
}, [id]);
```

**Behavior comparison:**

| Scenario | Class `componentWillUnmount` | `useEffect` Cleanup |
|----------|------------------------------|---------------------|
| Component unmounts | ✅ Runs | ✅ Runs |
| Deps change | ❌ Doesn't run | ✅ Runs (before new effect) |
| Component re-renders (same deps) | ❌ Doesn't run | ❌ Doesn't run (unless no deps) |
| No dep array | N/A | ✅ Runs after every render |

```jsx
// Runs cleanup after EVERY render (no deps)
useEffect(() => {
  console.log('Mount/Update');
  return () => console.log('Cleanup');
});
// Output for re-render: Cleanup → Mount/Update
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q95. How do you implement undo/redo functionality in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Use a custom hook that maintains a history stack:

```jsx
function useUndoRedo(initialState) {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialState);
  const [future, setFuture] = useState([]);

  const setState = useCallback((newState) => {
    setPast(prev => [...prev, present]);
    setPresent(newState);
    setFuture([]); // Clear redo on new action
  }, [present]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast(prev => prev.slice(0, -1));
    setFuture(prev => [present, ...prev]);
    setPresent(previous);
  }, [past, present]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture(prev => prev.slice(1));
    setPast(prev => [...prev, present]);
    setPresent(next);
  }, [future, present]);

  return { state: present, setState, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}

// Usage
function DrawingApp() {
  const { state, setState, undo, redo, canUndo, canRedo } = useUndoRedo(initialCanvas);

  return (
    <>
      <Canvas data={state} onChange={setState} />
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </>
  );
}
```

**Performance considerations:**
- Limit history size (e.g., last 50 states)
- Use Immer for immutable updates with mutation syntax
- Consider storing deltas instead of full state snapshots for large state

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q96. How does prop drilling relate to the Context API performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Prop drilling problem:** Props passed through many intermediate components, causing unnecessary re-renders of those intermediates when their props don't change but the data they pass through does.

**Context API problem:** **ALL consumers re-render** when the context value changes, even if they only use part of the value.

```jsx
// ❌ Performance issue: Any state change re-renders ALL consumers
const AppContext = createContext({ user, theme, notifications });

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  // When user changes, ALL context consumers re-render
  // Even those that only use `theme`
  return (
    <AppContext.Provider value={{ user, theme, setUser, setTheme }}>
      <Main />
    </AppContext.Provider>
  );
}
```

**Solutions:**

1. **Split context by domain:**
```jsx
const UserContext = createContext();
const ThemeContext = createContext();
// Theme consumers don't re-render when user changes
```

2. **Memoize context value:**
```jsx
const value = useMemo(() => ({ user, theme }), [user, theme]);
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
```

3. **Use state libraries (Zustand, Jotai) with atomic re-renders:**
```jsx
const useCount = create((set) => ({ count: 0 }));
function Counter() {
  const count = useCount(state => state.count); // Only re-renders when count changes
  return <div>{count}</div>;
}
```

4. **Component composition to avoid passing through intermediates:**
```jsx
function Page({ user }) {
  // Instead of: <Layout><Sidebar user={user} /></Layout>
  // Invert: pass layout as a slot
  return <Layout sidebar={<Sidebar user={user} />} />;
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q97. How do you handle file uploads in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Basic file upload with progress tracking:**

```jsx
function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      await new Promise((resolve, reject) => {
        xhr.onload = () => xhr.status === 200 ? resolve() : reject(new Error('Upload failed'));
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });

      setProgress(100);
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? `Uploading ${progress}%` : 'Upload'}
      </button>
      {error && <div className="error">{error}</div>}
      {progress > 0 && <progress value={progress} max={100} />}
    </div>
  );
}
```

**Drag-and-drop with Image preview:**

```jsx
function Dropzone() {
  const [preview, setPreview] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className="dropzone"
    >
      {preview ? <img src={preview} alt="Preview" /> : 'Drop image here'}
    </div>
  );
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q98. How do you implement pagination in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Client-side pagination:**
```jsx
function PaginatedList({ items, pageSize = 10 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);
  const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      {paginatedItems.map(item => <Item key={item.id} {...item} />)}
      <Pagination current={page} total={totalPages} onChange={setPage} />
    </>
  );
}

function Pagination({ current, total, onChange }) {
  const pages = useMemo(() => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }
    if (range[0] > 1) {
      range.unshift(1);
      if (range[1] > 2) range.splice(1, 0, '...');
    }
    if (range[range.length - 1] < total) {
      if (range[range.length - 1] < total - 1) range.push('...');
      range.push(total);
    }
    return range;
  }, [current, total]);

  return (
    <nav>
      <button disabled={current === 1} onClick={() => onChange(current - 1)}>Prev</button>
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`ellipsis-${i}`}>...</span>
          : <button key={p} onClick={() => onChange(p)} className={p === current ? 'active' : ''}>{p}</button>
      )}
      <button disabled={current === total} onClick={() => onChange(current + 1)}>Next</button>
    </nav>
  );
}
```

**Server-side pagination:**
```jsx
const { data, isLoading } = useQuery({
  queryKey: ['items', page, pageSize],
  queryFn: () => fetch(`/api/items?page=${page}&limit=${pageSize}`).then(r => r.json()),
});
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q99. How does the `key` prop affect reconciliation with component state?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Changing the `key` prop causes React to **unmount the old component and mount a new one**, resetting all internal state.

```jsx
// ❌ Bug: Counter doesn't reset when user changes
function UserProfile({ userId }) {
  return <Counter />;  // Counter persists even when userId changes
}

// ✅ Fix: Counter resets when user changes
function UserProfile({ userId }) {
  return <Counter key={userId} />;  // New key → new component instance
}
```

**This is a powerful pattern:**

```jsx
// Reset entire form when switching between edit modes
function EditForm({ mode }) {
  return <Form key={mode} />;  // Fresh form on mode change
}

// Force re-mount on data change
function ProductDetails({ productId }) {
  const { data } = useQuery(['product', productId]);
  return <Details key={productId} product={data} />;
}
```

**How it works internally:**
- React tracks component identity via key + type
- Key change → React treats it as a completely new element
- Old fiber tree is deleted (triggers cleanup effects)
- New fiber tree is created (runs initialization)

**Use cases for key-based reset:**
- Reset form state when switching items
- Force re-initialization of charts/widgets
- Clear animation states
- Reset scroll positions in lists

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q100. How does React handle `setState` batching across different event types?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React **batches state updates** — multiple `setState` calls in the same event handler trigger a single re-render.

**React 17 and earlier:**
```jsx
// ✅ Batched (single re-render)
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // One re-render
}

// ❌ NOT batched (two re-renders)
setTimeout(() => {
  setCount(c => c + 1);  // Re-render 1
  setFlag(f => !f);      // Re-render 2
}, 100);

fetch('/api/data').then(() => {
  setCount(c => c + 1);  // Re-render 1
  setFlag(f => !f);      // Re-render 2
});
```

**React 18+ (automatic batching):**
```jsx
// ✅ ALL of these are now batched:
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // One re-render
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // One re-render (React 18)
}, 100);

fetch('/api/data').then(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // One re-render (React 18)
});

// ✅ Even native events are batched:
el.addEventListener('click', () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // One re-render (React 18)
});
```

**When batching can be opted out:**
```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);  // Immediate re-render
  });
  flushSync(() => {
    setFlag(f => !f);      // Second immediate re-render
  });
}
```

**Performance implication:** Batching prevents unnecessary intermediate renders. React 18's automatic batching means you rarely need `unstable_batchedUpdates` or other workarounds.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q101. How does `useReducer` work with Context for state management?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Combining `useReducer` with Context creates a lightweight Redux-like pattern:

```jsx
// 1. Create context
const CounterContext = createContext(null);
const CounterDispatchContext = createContext(null);

// 2. Reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
}

// 3. Provider
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  );
}

// 4. Custom hooks for consuming
function useCounter() {
  const context = useContext(CounterContext);
  if (!context) throw new Error('useCounter must be used within CounterProvider');
  return context;
}

function useCounterDispatch() {
  const context = useContext(CounterDispatchContext);
  if (!context) throw new Error('useCounterDispatch must be used within CounterProvider');
  return context;
}

// 5. Usage
function Counter() {
  const { count } = useCounter();
  const dispatch = useCounterDispatch();
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

**Why split state and dispatch contexts?** — Prevents unnecessary re-renders. Components that only dispatch don't re-render when state changes.

**Trade-offs vs Redux:**
| `useReducer` + Context | Redux Toolkit |
|------------------------|--------------|
| No boilerplate | Middleware support |
| Built-in, no deps | DevTools extension |
| No async handling (needs extra work) | RTK Query for data fetching |
| Great for small-to-medium apps | Better for large apps with complex state |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q102. How do you implement routing with nested layouts in React Router v6?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

React Router v6 supports **nested routes with layout routes** using `<Outlet>`:

```jsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Layout component with Outlet
function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Outlet />  {/* Nested route renders here */}
      </main>
    </div>
  );
}

function Analytics() {
  return <h1>Analytics Dashboard</h1>;
}

function Settings() {
  return <h1>Settings</h1>;
}

function Users() {
  return (
    <>
      <h2>Users</h2>
      <Outlet />  {/* Further nesting */}
    </>
  );
}

function UserProfile() {
  const { userId } = useParams();
  return <h3>User: {userId}</h3>;
}

// Route config
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Key features of React Router v6:**
- `<Outlet>` for nested layouts (no more manual component nesting)
- Relative routing — `path="settings"` not `path="/dashboard/settings"`
- `useParams()` for URL parameters
- `useNavigate()` instead of `history.push`
- `createBrowserRouter` for data loading with loaders (v6.4+)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q103. How do you implement drag and drop in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Using the HTML5 Drag and Drop API directly:

```jsx
function DnDList() {
  const [items, setItems] = useState(['Item A', 'Item B', 'Item C', 'Item D']);
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === index) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setDragIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={dragIndex === index ? 'dragging' : ''}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
```

**For production, use libraries like:**
- **react-beautiful-dnd** (maintained by Atlassian) — Kanban boards, lists
- **dnd-kit** (modern, modular, accessible)
- **react-dnd** (flexible, complex scenarios)

```jsx
// Example with dnd-kit
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

function SortableList() {
  const [items, setItems] = useState([1, 2, 3]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems(items => arrayMove(items, items.indexOf(active.id), items.indexOf(over.id)));
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
  );
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q104. How do you handle memory leaks in React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Common sources of memory leaks and their fixes:

**1. Unsubscribed event listeners:**
```jsx
// ❌ Leak on unmount
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // No cleanup!
}, []);

// ✅ Fix
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**2. Uncanceled async operations:**
```jsx
// ❌ Sets state on unmounted component
useEffect(() => {
  fetchUser(userId).then(setUser);  // May fire after unmount
}, [userId]);

// ✅ Fix with AbortController
useEffect(() => {
  const controller = new AbortController();
  fetchUser(userId, { signal: controller.signal })
    .then(setUser)
    .catch(err => err.name !== 'AbortError' && setError(err));
  return () => controller.abort();
}, [userId]);
```

**3. Timers and intervals:**
```jsx
// ❌ Leak
useEffect(() => {
  const id = setInterval(tick, 1000);
  // Never cleared!
}, []);

// ✅ Fix
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

**4. Observer pattern subscriptions:**
```jsx
useEffect(() => {
  const subscription = store.subscribe(handleChange);
  return () => subscription.unsubscribe();  // ✅
}, []);
```

**5. Accidental closures holding large objects:**
```jsx
// ❌ Closure captures large data
function HeavyComponent() {
  const [data, setData] = useState(largeArray);
  useEffect(() => {
    const handler = () => {
      console.log(data.length);  // Closure keeps reference to largeArray
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);  // eslint-disable-line
}

// ✅ Fix with ref or proper deps
const dataRef = useRef(data);
dataRef.current = data;
// Use dataRef.current in handlers
```

**6. Detecting leaks in development:**
```jsx
// React DevTools Profiler shows unmounted component updates
// React StrictMode double-invokes effects to catch missing cleanup
<React.StrictMode>
  <App />
</React.StrictMode>
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q105. How do you implement micro-frontends with React?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Micro-frontends** decompose a frontend app into smaller, independent applications that can be developed and deployed separately.

**Module Federation (Webpack 5):**

```jsx
// host/webpack.config.js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    'products': 'products@http://localhost:3001/remoteEntry.js',
    'cart': 'cart@http://localhost:3002/remoteEntry.js',
  },
});

// micro-frontend/webpack.config.js
new ModuleFederationPlugin({
  name: 'products',
  exposes: {
    './ProductList': './src/ProductList',
    './ProductDetail': './src/ProductDetail',
  },
  shared: ['react', 'react-dom'],
});
```

**Loading in React:**
```jsx
const ProductList = lazy(() => import('products/ProductList'));

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Suspense>
    </>
  );
}
```

**Key challenges:**
- **Shared dependencies** — React, routing, state management
- **CSS isolation** — CSS modules, CSS-in-JS, or shadow DOM
- **Communication** — Custom events, shared event bus
- **Routing** — Parent router delegates to child routers
- **Testing** — Each app tested independently + integration tests
- **Deployment** — Independent CI/CD pipelines

**Alternative approaches:**
- **iframe-based** — Simple but poor UX (no deep linking, scroll issues)
- **Web Components** — Framework-agnostic, built-in browser support
- **Single SPA** — Framework for orchestrating multiple frameworks
- **Module Federation** — Webpack-based, shared dependency management

**When to use micro-frontends:**
- Large engineering teams (100+ engineers)
- Multiple independent product domains
- Different deployment cadences per domain
- Migrating from legacy to modern framework

**When NOT to use:**
- Small team (< 20 engineers)
- Simple application
- Duplication across modules is worse than a monolith
- Context switching cost exceeds coordination cost

</div>
</details>

---

*Covering 105 React interview questions across easy (30), medium (40), and hard (35) difficulty levels, spanning fundamentals, hooks, state management, performance, internals, testing, security, and advanced patterns.*
