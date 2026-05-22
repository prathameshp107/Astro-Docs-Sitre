---
title: "React Hard Interview Questions"
description: "Hard React interview questions for senior and expert roles."
---

#  Hard Questions - Senior / Expert

> These are asked for **3+ years experience** or senior roles.
> Covers React internals, concurrent features, and architecture.

---

## Q48. What is the React Fiber architecture?

Fiber is React's **complete rewrite of its internal reconciliation engine**, shipped in React 16. Before Fiber, React's reconciliation was recursive and synchronous - once started, it couldn't be interrupted. A massive component tree update would block the main thread for hundreds of milliseconds, making UIs janky.

Fiber reimplements the algorithm as a **linked list of "units of work"** (one Fiber node per component). This data structure allows React to pause after processing each unit, yield control back to the browser, and resume later.

```
Fiber = a linked list of units of work (one node per component instance)

React can now:
   Pause reconciliation -> browser handles urgent input
   Resume from where it stopped
   Abort work that became stale (user typed a new query)
   Assign priority levels to different updates
     - User input    -> HIGH priority (process immediately)
     - Data fetch    -> LOW priority (can defer)

This is the foundation for:
  -> useTransition
  -> Suspense
  -> Concurrent rendering
  -> Server Components
```

**Two phases of Fiber work:**
- **Render phase** (interruptible) - builds a "work-in-progress" fiber tree, diffs old vs. new, no DOM mutations
- **Commit phase** (non-interruptible) - applies minimal DOM mutations, runs effects

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
// - Show consistent UI snapshots - no "tearing" where different components show different state versions
```

> **Opt-out:** Only `createRoot` enables concurrent features. The legacy `ReactDOM.render()` uses synchronous rendering. All React 18 ecosystem updates (libraries, etc.) involve ensuring compatibility with the concurrent model.

---

## Q50. What is `useTransition` and `useDeferredValue`? When to use each?

Both hooks mark updates as **non-urgent** so React can defer them while keeping the UI responsive. The difference is about ownership:
- Use `useTransition` when you **own** the state setter
- Use `useDeferredValue` when you **receive a value as a prop** and don't control its setter

```jsx
// useTransition - you control the state setter
function SearchPage() {
  const [input, setInput]   = useState('');
  const [query, setQuery]   = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value);  // urgent - update input immediately
    startTransition(() => {
      setQuery(e.target.value); // non-urgent - can be interrupted if user types again
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList query={query} />}
    </>
  );
}

// useDeferredValue - you receive the value, can't wrap the setter
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

Server Components are React components that **run exclusively on the server** - they render to HTML (or a special RSC payload), and **zero JavaScript is shipped to the browser** for them. They can directly access databases, file systems, and environment variables without any API layer.

```jsx
// Server Component - default in Next.js App Router
// Can be async! Accesses DB directly. Zero JS sent to browser.
async function ProductList() {
  const products = await db.select().from(productsTable); // direct DB access!
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} - ₹{p.price}
          <AddToCartButton id={p.id} />  {/* Client Component for interactivity */}
        </li>
      ))}
    </ul>
  );
}

// Client Component - add 'use client' at the top
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
| JS sent to browser |  None |  Yes |
| Can use hooks |  |  |
| Can access DB directly |  |  (via API) |
| Can be `async` |  |  at component level |
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

    // Show immediately - before server confirms
    addOptimisticMessage({ id: Date.now(), text, sender: 'me' });

    // Actually save - if this fails, optimistic message disappears automatically
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

// Action - receives previous state and form data
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

Batching means React groups multiple state updates together into a **single re-render**. In React 17, batching only happened inside React event handlers. In React 18 with `createRoot`, **all state updates are batched automatically** - including inside `setTimeout`, Promises, and native event handlers.

```jsx
// React 17 - NOT batched in async contexts (causes 2 separate renders)
setTimeout(() => {
  setCount(c => c + 1); // render 1
  setFlag(f => !f);     // render 2
}, 1000);

// React 18 - batched everywhere (only 1 render) 
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);     // 1 render total!
}, 1000);

// Also batched in Promises:
fetch('/api').then(() => {
  setData(d);
  setLoading(false);    // 1 render total 
});

// Opt OUT when you need an immediate re-render between updates
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1)); // forces immediate render
flushSync(() => setFlag(f => !f));     // forces another immediate render
```

---

## Q55. What is the React Compiler (React Forget)?

The React Compiler is a **build-time Babel plugin that automatically inserts memoization** - eliminating the need to manually write `useMemo`, `useCallback`, and `React.memo`. It statically analyzes your component's data flow and inserts the right optimizations at compile time.

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
> The compiler requires your components to follow React's rules (pure renders, no mutations). It won't optimize - and will warn about - code that breaks the rules.

---

## Q56. What is the `use()` hook? (React 19)

`use()` is a new primitive hook (React 19) that can read either a **Promise** (integrating with Suspense) or a **Context**. Unlike all other hooks, it can be called **conditionally** - inside `if/else` blocks - which is unique and breaks the normal Rules of Hooks.

```jsx
import { use, Suspense } from 'react';

// Reading a Promise - suspends component until promise resolves
function UserProfile({ userPromise }) {
  const user = use(userPromise); // <- suspends here; Suspense shows fallback
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

// Reading Context conditionally - unique capability of use()
function Button({ isAdmin }) {
  if (isAdmin) {
    const { theme } = use(ThemeContext); //  conditional - unique to use()!
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

2. RENDER PHASE (pure - no side effects - can be interrupted)
   ├─ React calls your component function
   ├─ Returns new virtual DOM tree
   ├─ Diffs against previous virtual DOM (reconciliation)
   └─ Can be interrupted for higher-priority updates (concurrent mode)

3. COMMIT PHASE (non-interruptible - updates real DOM)
   ├─ Before Mutation: useLayoutEffect cleanups from previous render run
   ├─ Mutation:        React applies minimal DOM changes
   └─ After Mutation:  useLayoutEffect callbacks run (synchronously)

4. BROWSER PAINT
   └─ User sees the updated UI

5. PASSIVE EFFECTS (asynchronous - after paint)
   ├─ useEffect cleanups from previous render run
   └─ useEffect callbacks run
```

> **Why effects run after paint:** By design. Effects can trigger more state updates, which would cause more renders. Running them after paint means the user already sees a consistent UI before any cascading updates happen - avoiding intermediate "flash" states.

---

## Q58. What is Hydration in React?

Hydration is the process of **attaching React's event handlers and interactivity to server-rendered HTML**. The server generates plain HTML (fast initial load, no JS needed), then when the JS bundle arrives, React "hydrates" - reconciles its virtual DOM with the existing HTML and wires up all event listeners.

```
Server:
  1. Renders React components -> HTML string
  2. Sends HTML to browser
  3. User sees content immediately (even before JS loads)

Browser:
  1. HTML displays (fast - no JS needed)
  2. React JS bundle downloads
  3. React "hydrates" - attaches event handlers to existing HTML
  4. App becomes fully interactive
```

```jsx
//  Hydration mismatch - Math.random() differs between server and client
function Component() {
  return <div>{Math.random()}</div>; // server renders 0.4, client expects 0.7 -> error!
}

//  Fix - use useEffect for values that only exist on the client
function Component() {
  const [random, setRandom] = useState(null);
  useEffect(() => setRandom(Math.random()), []); // runs only on client
  return <div>{random ?? 'loading...'}</div>;     // stable during SSR
}
```

---

## Q59. What are common React performance anti-patterns?

```jsx
//  Anti-pattern 1: Anonymous functions as props
// New function object every render -> memo is useless
<button onClick={() => handleClick(id)}>Click</button>
//  Fix:
const handleClick = useCallback(() => doThing(id), [id]);

//  Anti-pattern 2: Object literals as props
// New object every render -> child always re-renders
<Component style={{ color: 'red' }} />
//  Fix:
const style = { color: 'red' }; // outside component, or useMemo
<Component style={style} />

//  Anti-pattern 3: Index as key in dynamic lists
// Wrong matches when list changes order or items are removed
{items.map((item, i) => <Item key={i} {...item} />)}
//  Fix:
{items.map(item => <Item key={item.id} {...item} />)}

//  Anti-pattern 4: useEffect without cleanup
// Memory leak - event listener accumulates on every render
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // missing cleanup!
//  Fix:
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

//  Anti-pattern 5: Derived state in useState
const [items, setItems] = useState([]);
const [count, setCount] = useState(0); // redundant!
//  Fix:
const count = items.length; // derive it, don't store it

//  Anti-pattern 6: useEffect for data transformation
useEffect(() => {
  setFiltered(items.filter(i => i.active)); // causes extra render!
}, [items]);
//  Fix:
const filtered = useMemo(() => items.filter(i => i.active), [items]);
```

---

## Q60. What is the difference between `useEffect` and server-side code?

`useEffect` **never runs on the server** - it's a client-only hook. This is by design: servers don't have browser APIs (`localStorage`, `window`, `document`). Effects are skipped entirely during SSR.

```jsx
//  Safe - browser APIs inside useEffect (client-only execution)
useEffect(() => {
  localStorage.setItem('key', value);
  window.scrollTo(0, 0);
  document.title = 'Updated';
}, [value]);

//  Server crash - localStorage is undefined on Node.js server!
function Component() {
  const theme = localStorage.getItem('theme'); // ReferenceError: localStorage is not defined
  return <div className={theme}>...</div>;
}

//  SSR-safe pattern - read browser APIs in useEffect
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
