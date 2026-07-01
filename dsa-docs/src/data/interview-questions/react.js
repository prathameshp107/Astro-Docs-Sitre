// ─── React Interview Questions (200) ───────────────────────────────────
export const REACT_QUESTIONS = [
  [
    "What is React and how does the Virtual DOM work?",
    "easy",
    "React is a JS library for building UIs with reusable components. The Virtual DOM is an in-memory representation of the real DOM. On state change, React creates a new Virtual DOM tree, diffs it against the previous one (reconciliation), computes minimal updates, and batches them to the real DOM. This avoids expensive direct DOM manipulation and enables declarative UI programming."
  ],
  [
    "What are the differences between functional and class components?",
    "med",
    "Functional components: simpler, use hooks for state/effects (`useState`, `useEffect`), no `this`, less boilerplate, better performance (no instance). Class components: use `this.state`/`this.setState()`, lifecycle methods, `constructor` for init, more verbose. Modern React prefers functional components with hooks. Class components are legacy but still supported."
  ],
  [
    "What is JSX and how does it compile?",
    "easy",
    "JSX is a syntax extension for JavaScript that looks like HTML. It compiles to `React.createElement()` calls via Babel. Example: `<div className=\"container\"><h1>{title}</h1></div>` compiles to `React.createElement('div', { className: 'container' }, React.createElement('h1', null, title))`. JSX is not required but is the standard way to write React components."
  ],
  [
    "Explain useState hook with examples.",
    "easy",
    "`useState(initialValue)` returns a tuple `[state, setState]`. `state` is the current value, `setState` updates it and triggers re-render. Example: `const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>`. Functional updates: `setCount(prev => prev + 1)`. State can hold any type (primitive, object, array)."
  ],
  [
    "Explain useEffect hook and its dependency array.",
    "med",
    "`useEffect(fn, deps)` runs side effects after render. With `[]` — runs once on mount (like `componentDidMount`). With `[dep1, dep2]` — runs when deps change. Without array — runs after every render. Cleanup via returned function: `useEffect(() => { sub.subscribe(); return () => sub.unsubscribe(); }, [])`. ESList rule `exhaustive-deps` warns about missing deps."
  ],
  [
    "What is useRef and when would you use it?",
    "med",
    "`useRef(initialValue)` returns a mutable object `{ current: value }` that persists across renders without causing re-renders when changed. Use cases: accessing DOM elements (`ref.current.focus()`), storing previous values, holding mutable values (intervals, timers), storing instance variables that shouldn't trigger re-render. Changing `ref.current` does NOT cause re-render."
  ],
  [
    "What is useContext and how does it solve prop drilling?",
    "med",
    "`useContext(MyContext)` consumes a context value created by `React.createContext()`. Avoids prop drilling (passing props through many intermediate components). Wrap tree: `<MyContext.Provider value={data}><App /></MyContext.Provider>`. Consume: `const data = useContext(MyContext)`. Triggers re-render when context value changes. Not ideal for frequently changing data (causes broad re-renders)."
  ],
  [
    "What is useReducer and when to prefer it over useState?",
    "med",
    "`useReducer(reducer, initialState)` returns `[state, dispatch]`. The reducer is `(state, action) => newState`. Prefer when: state logic is complex (multiple sub-values, interdependent), next state depends on previous state heavily, or you want to centralize state transitions. Example: `const [state, dispatch] = useReducer(counterReducer, { count: 0 })`; `dispatch({ type: 'INCREMENT' })`."
  ],
  [
    "What is useMemo and when should you use it?",
    "hard",
    "`useMemo(() => expensiveComputation(a, b), [a, b])` memoizes the result of a computation, only recomputing when dependencies change. Use for expensive calculations (filtering large arrays, complex transformations). Not for simple operations (overhead > benefit). Use as optimization only — not for side effects. `useMemo` guarantees referential equality of objects/arrays between renders."
  ],
  [
    "What is useCallback and how does it prevent re-renders?",
    "hard",
    "`useCallback(fn, deps)` returns a memoized (stable) function reference between renders. Prevents child re-renders when passed as prop to `React.memo()` wrapped components. Without it, inline arrow functions create a NEW reference every render. Example: `const handleClick = useCallback(() => doSomething(id), [id])`. Pairs with `React.memo` for child components that rely on referential equality."
  ],
  [
    "What is useLayoutEffect vs useEffect?",
    "hard",
    "`useLayoutEffect` runs synchronously AFTER DOM mutations but BEFORE the browser paints (blocking). `useEffect` runs asynchronously AFTER paint (non-blocking). Use `useLayoutEffect` for reading layout (measuring DOM), synchronously re-rendering, or scroll position adjustments. Use `useEffect` for most side effects (API calls, subscriptions, logging). `useLayoutEffect` can hurt performance — it delays paint."
  ],
  [
    "What are custom hooks? Create a useDebounce hook.",
    "hard",
    "Custom hooks extract reusable stateful logic into functions that can use other hooks. Naming convention: `useXxx`. Example: `function useDebounce(value, delay = 500) { const [debounced, setDebounced] = useState(value); useEffect(() => { const timer = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(timer); }, [value, delay]); return debounced; }`. Usage: `const debouncedSearch = useDebounce(searchTerm, 300)`."
  ],
  [
    "What is React.memo and how does it work?",
    "med",
    "`React.memo(Component)` is a higher-order component that memoizes the rendered output. It does a shallow comparison of props — if props haven't changed (referentially), it skips re-rendering and reuses the last rendered result. Use for pure components that render often with same props. Combined with `useCallback`/`useMemo` for stable prop references. Not a guarantee — use with profiling."
  ],
  [
    "What are keys in React and why are they important?",
    "med",
    "Keys help React identify which items changed/added/removed in a list. They enable efficient DOM reconciliation. Use stable, unique identifiers (like IDs from data). Avoid: index as key (if list order can change — causes bugs with state, focus, performance), random values (unnecessary re-creations). Example: `items.map(item => <li key={item.id}>{item.name}</li>)`."
  ],
  [
    "What is reconciliation in React?",
    "hard",
    "Reconciliation is the algorithm React uses to diff two Virtual DOM trees and determine what to update in the real DOM. It uses heuristics: 1) Different element types = rebuild entire subtree. 2) Same element type = update props, recurse on children. 3) Keys optimize list diffs. 4) `React.memo` skips subtree diff if props haven't changed. Fiber architecture (React 16+) enables incremental reconciliation (splits work into chunks)."
  ],
  [
    "Explain the React component lifecycle.",
    "med",
    "Three phases: Mounting: constructor → getDerivedStateFromProps → render → componentDidMount. Updating: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate. Unmounting: componentWillUnmount. Error boundary: getDerivedStateFromError, componentDidCatch. Hooks equivalent: `useState` (state), `useEffect` (didMount/didUpdate/willUnmount), `useLayoutEffect` (sync after DOM), `useMemo` (shouldComponentUpdate)."
  ],
  [
    "What are Error Boundaries in React?",
    "hard",
    "Error boundaries are class components that catch JS errors in their child tree, log them, and display a fallback UI. Use `getDerivedStateFromError()` and `componentDidCatch()`. They catch: render errors, lifecycle errors, constructor errors. They don't catch: event handler errors (use try/catch), async errors, SSR errors. React 17+ has no hooks equivalent — still uses class components."
  ],
  [
    "What is code splitting and React.lazy?",
    "med",
    "Code splitting breaks the bundle into smaller chunks loaded on demand. `React.lazy(() => import('./MyComponent'))` enables lazy loading a component. Must be wrapped in `<Suspense fallback={<Loading />}>`. The component's code is loaded when first rendered. Combine with route-level splitting: each route loads its own chunk. Reduces initial bundle size."
  ],
  [
    "What is Suspense in React?",
    "med",
    "Suspense lets components \"wait\" for something (code, data) before rendering. `<Suspense fallback={<Spinner />}> <SlowComponent /> </Suspense>`. Shows fallback while waiting. Originally for `React.lazy()`, now also for data fetching (React 18+ with streaming SSR). Suspense boundaries can be nested. Enables coordinated loading states."
  ],
  [
    "What is the Context API and its limitations?",
    "med",
    "Context provides a way to pass data through the component tree without props drilling. Created via `React.createContext()`. Provider wraps the tree; consumers access via `useContext`. Limitations: causes re-renders in ALL consumers when ANY part of the context value changes (no fine-grained subscriptions). Not optimized for high-frequency updates. For frequently changing state, split contexts or use Zustand/Redux."
  ],
  [
    "What is Redux and when should you use it?",
    "med",
    "Redux is a predictable state container using a single store, actions, and reducers (pure functions). Flow: Component dispatches action → Reducer creates new state → Store notifies subscribers → Components re-render. Use when: complex state shared across many components, frequent state changes, need dev tools (time-travel debugging). Redux Toolkit is the modern way to write Redux (less boilerplate, Immer for immutability)."
  ],
  [
    "What is the difference between controlled and uncontrolled components?",
    "med",
    "Controlled: React state drives the input value. `value={state}` + `onChange`. Single source of truth, easier to validate/manipulate. Uncontrolled: DOM handles its own state. Use `ref` to read values when needed. Simpler for basic forms but less powerful. Prefer controlled for most cases (validation, dynamic inputs). Uncontrolled for simple, uncontrolled file inputs."
  ],
  [
    "How do you handle forms in React?",
    "med",
    "Controlled components: each input has `value` bound to state + `onChange` handler. Uncontrolled: use `ref` to access values on submit. Libraries: React Hook Form (performant, less re-renders), Formik (comprehensive validation). For simple forms: `useState` for each field. For complex forms: `useReducer` or a form library. Validation: manual or schema-based (Yup, Zod)."
  ],
  [
    "What is React.forwardRef?",
    "hard",
    "`forwardRef(render)` lets parent components pass a `ref` through to a child's DOM element. The child receives `(props, ref)` as arguments. Example: `const FancyInput = forwardRef((props, ref) => <input ref={ref} {...props} />)`. Parent: `const ref = useRef(); <FancyInput ref={ref} />`. Essential for reusable component libraries and accessing child DOM nodes."
  ],
  [
    "What is useImperativeHandle?",
    "hard",
    "`useImperativeHandle(ref, createHandle, deps)` customizes the instance value exposed to parent refs. Used with `forwardRef`. Example: `forwardRef((props, ref) => { useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus(), validate: () => ... })); return <input ref={inputRef} />; })`. Parent calls `ref.current.focus()`. Use sparingly — prefer declarative props."
  ],
  [
    "Explain prop types and TypeScript in React.",
    "med",
    "PropTypes: runtime type checking for props. `MyComponent.propTypes = { name: PropTypes.string.isRequired }`. Warns in development (stripped in production). TypeScript: compile-time type checking. `interface Props { name: string; } const MyComponent: React.FC<Props> = ({ name }) => ...` or `function MyComponent({ name }: Props)`. TypeScript is preferred for larger codebases — catches errors at build time."
  ],
  [
    "What are Higher Order Components (HOC)?",
    "hard",
    "HOC is a function that takes a component and returns an enhanced component. Pattern: `const withAuth = (Component) => (props) => { if (!isAuth) return <Login />; return <Component {...props} />; }`. Used for cross-cutting concerns (auth, logging, data fetching). Before hooks, HOCs were the main composition pattern. Now hooks handle most cases. Caveats: prop name collisions, wrapping complexity."
  ],
  [
    "What is the render props pattern?",
    "hard",
    "A component that takes a function prop called `render` (or `children` as a function) and calls it to determine what to render. Example: `<MouseTracker render={(pos) => <p>Mouse: {pos.x}, {pos.y}</p>} />`. More flexible than HOCs but can be verbose. `useMousePosition` hook is the modern replacement. Render props enable sharing stateful logic without HOCs."
  ],
  [
    "What is the Compound Component pattern?",
    "hard",
    "Multiple components that work together implicitly via shared state. Example: `<Select> <Select.Option value=\"a\">A</Select.Option> <Select.Option value=\"b\">B</Select.Option> </Select>`. Parent shares state via Context. Children access context to know if they're selected/active. Used by UI libraries (Chakra UI, Reach UI). Flexible API with implicit state sharing."
  ],
  [
    "What is the difference between state and props?",
    "easy",
    "Props (properties): passed from parent to child, immutable (read-only), available as function arguments. State: internal to component, mutable via `setState`, initialized in component, triggers re-render when changed. Props flow DOWN (parent→child). State changes propagate up via callbacks. A prop can be an initial state value, but state should not be derived solely from props without sync."
  ],
  [
    "What causes unnecessary re-renders in React?",
    "hard",
    "Causes: 1) Parent re-render cascading to all children (use `React.memo` to prevent). 2) Inline objects/functions as props (new reference every render — `useCallback`/`useMemo` fix). 3) Context value changes re-rendering all consumers (split contexts). 4) State updates that don't change value (React 18+ batches but still renders once). 5) Lifting state too high (keeps unnecessary tree parts in re-render path)."
  ],
  [
    "How does batching work in React 18?",
    "hard",
    "React 18 automatically batches ALL state updates, including those in promises, timeouts, and native event handlers (React 17 only batched inside React event handlers). Multiple `setState` calls in one scope cause only ONE re-render. Example: `fetch(url).then(() => { setCount(c => c + 1); setFlag(true); })` — one render. Use `flushSync()` to force synchronous render."
  ],
  [
    "What is React 18's concurrent mode?",
    "hard",
    "Concurrent mode allows React to work on multiple state updates concurrently — interrupt rendering, prioritize urgent updates, and commit results as needed. Enables: transitions (`useTransition`), automatic batching, streaming SSR with Suspense. The key idea: rendering can be interrupted by higher-priority updates. Improves perceived performance by keeping UI responsive."
  ],
  [
    "What are transitions in React 18 (useTransition)?",
    "hard",
    "`useTransition()` returns `[isPending, startTransition]`. `startTransition(() => { setSearchQuery(val) })` marks a state update as non-urgent (can be interrupted by more urgent updates like typing). React keeps showing current UI while transition renders in background. Prevents UI from freezing during slow renders. `isPending` lets you show a loading indicator."
  ],
  [
    "What is useDeferredValue?",
    "hard",
    "`useDeferredValue(value)` returns a \"laggy\" version of the value that updates after urgent updates (like typing). Similar to debouncing but React chooses when to defer based on CPU time. Example: `const deferredQuery = useDeferredValue(query); <ExpensiveList query={deferredQuery} />`. The original `query` updates immediately; UI stays responsive while the list updates asynchronously."
  ],
  [
    "What is React Fiber architecture?",
    "hard",
    "Fiber is React 16's rewrite of the reconciliation engine. Key features: incremental rendering (splits work into chunks, yields to main thread), ability to pause/resume work, priority-based scheduling, and better error handling (Error Boundaries). Each component instance is a \"fiber\" node in a linked list tree. Enables concurrent mode, Suspense, and better async rendering."
  ],
  [
    "What is server-side rendering (SSR) in React?",
    "hard",
    "SSR renders React components to HTML on the server (not just the browser). The server sends HTML + JS bundle. The browser displays HTML immediately (faster FCP/SEO), then \"hydrates\" by attaching event listeners. Libraries: Next.js (most popular), Remix. Trade-offs: server cost, TTFB increase, hydration complexity. Streaming SSR (React 18) sends HTML in chunks."
  ],
  [
    "What is hydration in React?",
    "hard",
    "Hydration is the process of making server-rendered HTML interactive on the client. React attaches event listeners, runs effects, and initializes state on the existing DOM nodes (without re-creating them). Uses `hydrateRoot()` (React 18) instead of `createRoot()`. Mismatch errors occur when server HTML and client first render differ."
  ],
  [
    "How do you optimize React performance?",
    "hard",
    "Techniques: 1) `React.memo` for pure components. 2) `useMemo`/`useCallback` for expensive computations and stable references. 3) Code splitting with `React.lazy` + `Suspense`. 4) Virtualization for long lists (`react-window`). 5) Avoid inline objects/functions in props. 6) Use `useTransition` for non-urgent state updates. 7) Profile with React DevTools. 8) Lazy load images. 9) Avoid context for high-frequency updates."
  ],
  [
    "What is React.StrictMode and what does it do?",
    "med",
    "`<StrictMode>` is a dev-only wrapper that activates additional checks/ warnings: identifies unsafe lifecycle methods, warns about legacy ref API, detects unexpected side effects (double-invokes reducer, state initializer, effects), and checks for deprecated APIs. Runs in development only — no impact on production bundle. Good practice to use in all projects."
  ],
  [
    "What is the difference between React.Component and PureComponent?",
    "med",
    "`React.Component` re-renders whenever `setState` is called or parent re-renders — no prop/state comparison. `React.PureComponent` implements a shallow `shouldComponentUpdate` — only re-renders if props/state have changed (shallow compare). PureComponent is simpler than manual `shouldComponentUpdate` but doesn't handle nested mutations. Functional equivalent: `React.memo`."
  ],
  [
    "What is componentDidMount equivalent in hooks?",
    "med",
    "`useEffect(() => { /* code */ }, [])` — the empty dependency array makes it run once after initial render. Mirrors `componentDidMount`. For synchronous DOM measuring, use `useLayoutEffect(() => {}, [])` instead."
  ],
  [
    "What is componentWillUnmount equivalent in hooks?",
    "med",
    "Return a cleanup function from `useEffect`: `useEffect(() => { const sub = data$.subscribe(); return () => sub.unsubscribe(); }, [])`. The cleanup function runs on unmount (and before re-running the effect). Mirrors `componentWillUnmount` behavior."
  ],
  [
    "How do you fetch data in React hooks?",
    "med",
    "Using `useEffect`: `useEffect(() => { let cancelled = false; fetch(url).then(res => res.json()).then(data => { if (!cancelled) setData(data); }); return () => { cancelled = true; }; }, [url])`. Better: use custom hooks (`useFetch`) or a library (TanStack Query, SWR) that handles caching, revalidation, loading states, and error handling."
  ],
  [
    "What is the stale closure problem in hooks?",
    "hard",
    "Stale closure occurs when a closure captures an outdated value (usually from a previous render). Common in `useEffect` with missing deps, `setTimeout` inside effects, and callbacks in hooks. Fix: include all used variables in dependency arrays, use functional state update (`setCount(c => c + 1)`), or use refs for values that should never be stale."
  ],
  [
    "What is the exhaustive-deps ESLint rule?",
    "med",
    "`react-hooks/exhaustive-deps` warns when `useEffect`/`useMemo`/`useCallback` dependencies don't include all values used inside. Helps prevent stale closures and ensures hooks re-run when deps change. Fix by adding missing deps, not by disabling the rule. If a dep intentionally shouldn't trigger re-runs, use a ref: `const valueRef = useRef(value)`."
  ],
  [
    "What is React DevTools and how do you use it?",
    "easy",
    "React DevTools is a browser extension for inspecting React component trees. Features: component tree with props/state, profiler (records render times, identifies slow components), component search, source code navigation. Use profiler to find unnecessary re-renders and measure render costs. Available for Chrome, Firefox, Edge."
  ],
  [
    "How do you implement lazy loading of images in React?",
    "med",
    "Using `loading=\"lazy\"` attribute (native): `<img src={url} loading=\"lazy\" />`. For custom: `IntersectionObserver` in a custom hook or component. Libraries: `react-lazyload`. IntersectionObserver approach: `useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, [])`."
  ],
  [
    "What is the React testing library? How do you test hooks?",
    "med",
    "React Testing Library (RTL) tests components from user perspective — renders components, queries DOM, simulates events. Hooks tested via `renderHook` from `@testing-library/react-hooks`: `const { result } = renderHook(() => useCounter(0))`. Tests: `expect(result.current.count).toBe(0); act(() => result.current.increment()); expect(result.current.count).toBe(1)`."
  ],
  [
    "What is Enzyme vs React Testing Library?",
    "med",
    "Enzyme (Airbnb): tests component internals — shallow rendering, state access, prop manipulation. RTL (recommended): tests component behavior (DOM output), no state/prop access, encourages testing what users see/interact with. RTL philosophy: test behavior, not implementation. RTL is the official React recommendation and works with React 18+. Enzyme has less React 18 support."
  ],
  [
    "How do you handle side effects with Redux?",
    "med",
    "Redux Thunk (standard): action creators return functions instead of action objects — `const fetchUsers = () => async dispatch => { dispatch(loading()); const users = await api.getUsers(); dispatch(loaded(users)); }`. Redux Saga: uses generator functions for complex async flows. Redux Toolkit + RTK Query: integrated data fetching and caching. Choose based on complexity."
  ],
  [
    "What is Redux Toolkit and how is it different from Redux?",
    "med",
    "Redux Toolkit (RTK) is the official modern Redux. Reduces boilerplate: `createSlice` (actions + reducers auto-generated), `configureStore` (combines reducers, middleware), `createAsyncThunk` (async actions). Built-in Immer for immutable updates (write mutable-looking code). RTK Query for data fetching/caching. Less code than classic Redux."
  ],
  [
    "What is Zustand and how does it compare to Redux?",
    "med",
    "Zustand is a small, fast state management library. Simpler API: `const useStore = create(set => ({ count: 0, increment: () => set(state => ({ count: state.count + 1 })) }))`. No providers, no reducers, no action types. Direct store access with selectors: `const count = useStore(state => state.count)`. Less boilerplate than Redux, good for mid-size apps."
  ],
  [
    "What is React Query (TanStack Query)?",
    "med",
    "React Query handles server state (data fetching, caching, synchronization). Provides: automatic caching, background refetching, pagination, optimistic updates, retry, stale-while-revalidate. Example: `const { data, isLoading } = useQuery(['users'], () => fetchUsers())`. Reduces boilerplate for API state management. Not a replacement for global state (auth, theme) — for async server data."
  ],
  [
    "What is SWR and how does it work?",
    "med",
    "SWR (stale-while-revalidate) is a data fetching strategy and React hook. Returns cached data first, then revalidates with the server. `const { data, error } = useSWR('/api/users', fetcher)`. Benefits: fast initial render (from cache), auto-revalidation, deduplication, pagination. Lighter than TanStack Query, less feature-rich. Both are excellent choices."
  ],
  [
    "What is the difference between optimistic and pessimistic UI updates?",
    "hard",
    "Optimistic: update UI immediately before server confirms (assumes success). Rollback on error. Better UX (instant feedback). Needs rollback logic. Pessimistic: wait for server response before updating UI. Simpler, no rollback needed, but slower UX. Use optimistic for high-confidence operations (likes, toggles). Use pessimistic for critical operations (payments, data deletion)."
  ],
  [
    "What is React Portal and when would you use it?",
    "hard",
    "`createPortal(children, domNode)` renders children into a different DOM node (outside the parent component tree). Typically used for: modals, tooltips, dropdowns, toasts — where overflowing parent containers or z-index stacking contexts are problematic. Portal preserves React context tree (events bubble through React tree, not DOM tree)."
  ],
  [
    "How do you implement infinite scroll in React?",
    "hard",
    "Using IntersectionObserver: `const sentinelRef = useRef(null); useEffect(() => { const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting && hasMore) loadMore(); }); observer.observe(sentinelRef.current); return () => observer.disconnect(); }, [hasMore]);`. Libraries: `react-infinite-scroll-component`, or TanStack Query with `getNextPageParam`."
  ],
  [
    "How do you implement a virtualized list in React?",
    "hard",
    "Use `react-window`: `<FixedSizeList height={400} itemCount={items.length} itemSize={50} width={300}> {({ index, style }) => <div style={style}>{items[index].name}</div>} </FixedSizeList>`. For variable sizes: `VariableSizeList`. For grid: `FixedSizeGrid`. Virtualization renders only visible items + buffer — essential for performance with large lists (1000+ items)."
  ],
  [
    "What is react-window vs react-virtualized?",
    "hard",
    "Both are virtualization libraries. `react-window` (preferred): smaller (30KB vs 150KB+), simpler API, faster, maintained by the same author (brianvaughn). `react-virtualized`: more features (Table, Collection, Masonry, auto-height), larger bundle, older. Start with `react-window`; upgrade to `react-virtualized` only if you need advanced features."
  ],
  [
    "What is the difference between useState and useRef for storing values?",
    "hard",
    "`useState`: causes re-render when updated, should be used for UI state. `useRef`: doesn't cause re-render, mutable `.current` property, for values that change without needing UI update (intervals, subscriptions, previous values). Use `useState` when the UI needs to reflect the value. Use `useRef` for imperative handles and values that shouldn't trigger renders."
  ],
  [
    "How do you prevent memory leaks in React?",
    "hard",
    "Leaks happen when subscriptions/async operations continue after unmount. Prevention: 1) Cleanup in `useEffect` return. 2) AbortController for fetch: `new AbortController()`, pass signal, call `abort()` in cleanup. 3) `useRef` flags for mounted state. 4) `takeUntil`/`unsubscribe` for RxJS. 5) Event listener cleanup: `removeEventListener`. 6) Clear intervals/timeouts in cleanup."
  ],
  [
    "What is the dependency injection pattern in React?",
    "hard",
    "React doesn't have built-in DI like Angular. Alternatives: 1) Context API (most common) — provide services via context, consume with `useContext`. 2) Component composition — pass components as props. 3) Custom hooks — `useService()` pattern that wraps context consumption. 4) Inversion of control — render props / slot pattern."
  ],
  [
    "What are render phases in React (render vs commit)?",
    "hard",
    "Render phase: React calls the component function, creates React elements, runs reconciliation. Can be paused/restarted (Fiber). Commit phase: applies DOM mutations, runs layout effects, runs passive effects. Cannot be interrupted. `useLayoutEffect` runs synchronously in commit phase. `useEffect` runs after paint. render can be pure (no side effects). commit can have side effects."
  ],
  [
    "What is a fragment in React and why use it?",
    "easy",
    "`<Fragment>` / `<>...</>` groups elements without adding extra DOM nodes. Used when: returning multiple elements from a component, grouping children without extra divs. Prevents invalid HTML (e.g., table rows in a div). `<>` is shorthand but doesn't support `key` — use `<Fragment key={id}>` for lists."
  ],
  [
    "What is React.Children API?",
    "hard",
    "`React.Children` provides utilities for manipulating `props.children`. Methods: `map`, `forEach`, `count`, `only`, `toArray`. Example: `React.Children.map(children, child => ...)` properly iterates even when children are single (not array). `React.Children.only(children)` ensures exactly one child. `toArray` flattens nested fragments. Useful for library authors."
  ],
  [
    "What is the defaultProps and how to type defaults in TS?",
    "med",
    "`MyComponent.defaultProps = { name: 'Guest' }` sets default prop values (works with both function and class components). In TypeScript, use default values in destructuring: `const MyComponent = ({ name = 'Guest' }: Props) => ...`. TypeScript rejects `defaultProps` for function components since React 18. Prefer default destructuring."
  ],
  [
    "What is the displayName property in React?",
    "med",
    "`displayName` is a string used in debugging messages and DevTools. React automatically sets it from the function name, but HOCs and `React.memo` may lose it. Set manually: `MyComponent.displayName = 'MyComponent'` or on HOC: `withHOC.displayName = `withHOC(${Component.displayName})``. Important for meaningful DevTools output."
  ],
  [
    "How do you share state between sibling components?",
    "med",
    "Options: 1) Lift state up to common parent — pass down via props. 2) Context API — provider at common ancestor, both siblings consume. 3) External store (Zustand, Redux, Jotai). 4) Custom event bus (for simpler cases). 5) URL/query params (for shareable state). Lift state up is the simplest for closely related siblings. Context/store for deeply nested or distant siblings."
  ],
  [
    "What is lifting state up in React?",
    "med",
    "Lifting state up means moving shared state to the closest common ancestor. The ancestor provides the state and callbacks to both child components. Data flows down, events flow up. Pattern: `const [value, setValue] = useState(''); <ChildA value={value} /> <ChildB onChange={setValue} />`. Avoids duplicating state or complex sync logic."
  ],
  [
    "How do you implement global state without Redux?",
    "med",
    "Options: 1) React Context + `useReducer` — create a global store-like pattern. 2) Zustand — minimal API, no providers. 3) Jotai — atomic state (like Recoil). 4) useGlobalState custom hook with pub/sub. Example: `const useGlobalState = (key, initial) => { const [state, setState] = useState(initial); const setGlobal = useCallback((val) => { setState(val); store[key] = val; subscribers[key].forEach(s => s(val)); }, []); return [state, setGlobal]; }`."
  ],
  [
    "What is the Provider pattern?",
    "med",
    "The Provider pattern uses Context to make data available to any descendant. Example: `<ThemeProvider value={{ theme, toggleTheme }}><App /></ThemeProvider>`. Inside ThemeProvider, a Context Provider wraps children. Any descendant uses `useContext(ThemeContext)` to access the value. Commonly used for: themes, auth, localization, global state."
  ],
  [
    "How do you implement undo/redo in React?",
    "hard",
    "Maintain a history stack: `const [history, setHistory] = useState({ past: [], present: initialState, future: [] })`. Undo: pop from past, push current to future. Redo: pop from future, push current to past. Use `useReducer` with actions: `UNDO`, `REDO`, `SET`. For simpler cases: custom `useUndo` hook. Libraries: `use-undo`, `zundo`."
  ],
  [
    "What is event pooling in older React versions?",
    "hard",
    "In React 16 and earlier, React used event pooling: SyntheticEvent objects were reused (pooled) for performance. After the event handler returned, all properties were nullified. Reading async was broken: `const value = e.target.value; setTimeout(() => console.log(value), 0)` needed `e.persist()`. React 17+ removed event pooling — events behave normally."
  ],
  [
    "How do you animate elements in React?",
    "med",
    "CSS transitions/animations (simple). `react-spring` (physics-based animations, performant). `framer-motion` (declarative animation library with layout animations, gestures). `react-transition-group` (mount/unmount animations). `auto-animate` (automatic layout animation). For most cases, `framer-motion` provides the best DX with `<motion.div animate={{ x: 100 }} transition={{ type: 'spring' }}>`."
  ],
  [
    "What is Framer Motion?",
    "med",
    "Framer Motion is a popular React animation library. Features: declarative animations (`<motion.div animate={{ opacity: 1 }}>`), layout animations, gesture support (drag, hover, tap), AnimatePresence for mount/unmount, scroll-linked animations, shared layout animations (`layoutId`). Integrates with React Router for page transitions. Performs animations on the compositor thread (60fps)."
  ],
  [
    "How do you implement drag and drop in React?",
    "hard",
    "`react-beautiful-dnd` (by Atlassian): `<DragDropContext> → <Droppable> → <Draggable>`. Handles keyboard/screen reader support. `react-dnd`: more flexible but steeper learning curve. `react-dnd-html5-backend` for mouse/touch. `framer-motion` has built-in drag: `<motion.div drag dragConstraints={{ left: 0, right: 300 }} />`. For sortable lists: `dnd-kit` (modern, well-maintained)."
  ],
  [
    "What is the difference between SSR, CSR, and SSG?",
    "hard",
    "CSR (Client-Side Rendering): HTML is minimal, JS renders everything — poor SEO, slow initial load. SSR (Server-Side Rendering): HTML rendered per-request on server — good SEO, faster FCP, higher server load. SSG (Static Site Generation): HTML pre-built at build time — fastest, best for caching, static content. Next.js supports all three, allowing per-page choice."
  ],
  [
    "What is React Server Components (RSC)?",
    "hard",
    "RSC render ONCE on the server, have zero bundle size impact, can directly access databases/file systems. No state, effects, or event handlers (those need Client Components). Mix with Client Components via composition. RSC enables: reduced bundle size, direct backend access, automatic code splitting. Used by Next.js App Router. `.server.js` extension or 'use server' directive."
  ],
  [
    "What are the rules of hooks?",
    "med",
    "1) Only call hooks at the TOP LEVEL (not inside loops, conditions, nested functions). 2) Only call hooks from React FUNCTION components or custom hooks (not regular JS functions). 3) Custom hooks must start with `use`. These rules ensure consistent hook call order between renders — required for React to correctly associate state with the right component."
  ],
  [
    "What is the use() hook in React 19?",
    "hard",
    "`use(promise)` and `use(context)` reads a promise or context inline, suspending the component if the promise hasn't resolved. Unlike `useContext`, `use()` can be called conditionally and in loops. Unlike `useEffect` + state, `use()` integrates with Suspense directly. Example: `const data = use(fetchUsers())`. Resolves the promise and lets Suspense handle the loading state."
  ],
  [
    "What is the React compiler (React Forget)?",
    "hard",
    "React Forget is an optimizing compiler that automatically memoizes values and components — eliminating the need for manual `useMemo`, `useCallback`, and `React.memo`. It analyzes reactive dependencies in your code and inserts memoization automatically. Currently in development. Expected to significantly simplify React development by removing manual optimization."
  ],
  [
    "How do you handle authentication in React?",
    "med",
    "Pattern: Auth context provider wraps the app. Login: send credentials → receive token → store in memory/HttpOnly cookie → update context. Protected routes: check auth state, redirect to login if not authenticated. Interceptors: axios/fetch wrapper adds token to headers. Logout: clear token/context, redirect. Libraries: Auth0, NextAuth.js, Firebase Auth, Clerk."
  ],
  [
    "What is protected routes pattern in React Router?",
    "med",
    "Create a wrapper component: `<PrivateRoute><Dashboard /></PrivateRoute>`. Inside: `const { user } = useAuth(); if (!user) return <Navigate to=\"/login\" />; return children;`. Or use `loader` functions (React Router v6.4+): `loader: async () => { const user = await auth(); if (!user) throw redirect('/login'); return user; }`. Prevents unauthorized component rendering."
  ],
  [
    "What is React Router v6 and its changes?",
    "med",
    "Major changes from v5: Routes replaces Switch, element prop instead of component/ render, nested routes with `<Outlet>`, relative routing, `useNavigate` replaces `useHistory`, `useParams` unchanged, `<NavLink>` className can be function. Data APIs: `loader`, `action`, `useFetcher`. Declarative routing with `createBrowserRouter`."
  ],
  [
    "How do you implement breadcrumbs in React?",
    "med",
    "With React Router v6: use `useLocation()` to get pathname, split into segments, generate links. For nested routes: use route `handle` with breadcrumb metadata. Example: `{ path: 'products', handle: { crumb: () => 'Products' }, children: [{ path: ':id', handle: { crumb: (data) => data.product.name } }] }`. Render: `useMatches().filter(m => m.handle?.crumb).map(m => ({ crumb: m.handle.crumb(m.data) }))`."
  ],
  [
    "What is the difference between push and replace in routing?",
    "med",
    "`push('/path')` adds a new entry to browser history — user can go BACK. `replace('/path')` replaces the current history entry — no back. Use `replace` for: redirect after login (avoid back-to-login), tab switches, step transitions where back should skip intermediate steps. In React Router v6: `navigate('/path', { replace: true })`."
  ],
  [
    "How do you handle 404 pages in React?",
    "easy",
    "React Router v6: add a catch-all route at the end: `{ path: '*', element: <NotFound /> }`. For nested routes: add path `*` as a child. Display a user-friendly message and optionally a link to home. For data loading errors: use `errorElement` in route config: `{ path: 'users/:id', element: <User />, errorElement: <ErrorPage /> }`."
  ],
  [
    "What is Accessibility (a11y) in React?",
    "med",
    "A11y ensures apps are usable by people with disabilities. React patterns: semantic HTML (`<button>` not `<div onClick>`), ARIA attributes for custom components (`aria-label`, `role`), keyboard navigation (tabIndex, onKeyDown), focus management (auto-focus modals, trap focus, restore focus), form labels, color contrast, `useAnnounce` for screen reader announcements. Use tools: axe-core, react-a11y, eslint-plugin-jsx-a11y."
  ],
  [
    "What is ARIA in React?",
    "med",
    "ARIA (Accessible Rich Internet Applications) attributes supplement HTML for assistive technologies. In React, pass ARIA as props: `aria-label=\"Close\"`, `aria-expanded={isOpen}`, `role=\"tabpanel\"`. All aria-* attributes are supported in JSX. Use with native HTML elements first (which have built-in semantics), fall back to ARIA only when native semantics don't exist."
  ],
  [
    "What are synthetic events in React?",
    "med",
    "SyntheticEvent is React's cross-browser wrapper around native DOM events. Provides a consistent API across browsers. React 17+ doesn't pool events (older versions did). `onClick`, `onSubmit`, `onChange` etc. are synthetic. Access native event via `e.nativeEvent`. Synthetic events bubble through React tree (not DOM tree)."
  ],
  [
    "What is memoization in React and when to avoid it?",
    "hard",
    "Memoization caches results to avoid recomputation. Tools: `React.memo`, `useMemo`, `useCallback`. Avoid when: 1) The computation is cheap (overhead > benefit). 2) Props always change (memo check still runs). 3) Component re-renders with different data each time. 4) Premature optimization — measure first with Profiler. Not all re-renders are expensive — low leaf components are cheap to re-render."
  ],
  [
    "How do you implement a design system in React?",
    "hard",
    "Core decisions: styling approach (CSS Modules, Tailwind, CSS-in-JS), component architecture (compound components, polymorphic `as` prop), theming (design tokens, ThemeProvider), accessibility (headless UI libraries), documentation (Storybook). Structure: foundations (colors, typography, spacing) → primitives (Button, Input) → patterns (Form, DataTable). Libraries: Radix UI (headless), Chakra UI, MUI, or custom with Tailwind."
  ],
  [
    "What is Storybook and why use it?",
    "med",
    "Storybook is a tool for developing UI components in isolation. Benefits: visual testing, component documentation, collaborative review, accessibility checks, interaction testing. Write stories: `export const Primary = { args: { variant: 'primary', children: 'Click me' } }`. Integrates with design tools (Figma). Runs alongside your app — no dependency on the full app environment."
  ],
  [
    "How do you write a custom renderer in React?",
    "hard",
    "React Reconciler package lets you create a custom renderer (like React DOM, React Native). Implement host config: `createInstance`, `appendChild`, `removeChild`, `commitUpdate`, etc. Used for: React Native, React Three Fiber (Three.js), React PDF, React Terminal. Rarely needed — only for custom rendering targets."
  ],
  [
    "What is react-dom vs react?",
    "med",
    "`react` package: core library — Component, createElement, hooks, Context, Suspense. `react-dom`: DOM-specific methods — `createRoot`, `hydrateRoot`, `render`, `findDOMNode`, `createPortal`, `flushSync`. Also `react-dom/server` for SSR: `renderToString`, `renderToPipeableStream`. React Native uses `react-native` instead of `react-dom`."
  ],
  [
    "What is ReactDOM.createRoot() in React 18?",
    "med",
    "`createRoot(domNode)` creates a React root for concurrent features. Replaces `ReactDOM.render()`. Enables: automatic batching, Suspense, transitions, streaming SSR. Usage: `const root = createRoot(document.getElementById('root')); root.render(<App />);`. Deprecates `ReactDOM.render()` which uses legacy mode. New apps should always use `createRoot`."
  ],
  [
    "How do you debug performance issues in React?",
    "hard",
    "React DevTools Profiler: record interactions, see render times per component (color-coded: green=fast, yellow=slow, red=slowest). Identify: unnecessary re-renders (components that re-render without prop changes), slow renders (long bars), repeated renders. Chrome DevTools Performance: flame chart of JS execution. `why-did-you-render` library for tracing re-render causes. Lighthouse audits for overall scores."
  ],
  [
    "What is the Profiler API in React?",
    "hard",
    "`<Profiler id=\"menu\" onRender={callback}>` measures render performance of a component tree. `onRender` receives: id, phase (mount/update), actualDuration, baseDuration, startTime, commitTime, interactions. Collect and log: `onRender: (id, phase, actual) => console.log(`${id} ${phase}: ${actual}ms`)`. Use in development to identify slow components. Aggregate data for performance regression detection."
  ],
  // ── Conceptual / Modern (current industry questions) ──────────────────────
  [
    "How do Server Components reduce client bundle size compared to SSR?",
    "hard",
    "SSR runs components on server but still sends ALL component JS to the client for hydration. RSC sends ZERO JS to the client for Server Components — only the rendered HTML payload. Client interactivity is handled by Client Components, which are explicitly marked with `'use client'`. Large libraries (markdown parsers, date formatters) can be used in Server Components without increasing bundle size."
  ],
  [
    "What is the difference between Server Components and Client Components?",
    "hard",
    "Server Components: render on server, can access databases/files, no useState/useEffect, no event handlers, no browser APIs, zero bundle size, can be async. Client Components: render on client (also SSR'd), full hooks support, event handlers, browser APIs, included in JS bundle, cannot be async. Convention: `.server.js` (or default in App Router) vs `'use client'` directive."
  ],
  [
    "When does a Server Component re-render and how is its output sent to the client?",
    "hard",
    "Server Components re-render on: initial request, page navigation, revalidation (on-demand or time-based), or server action. The output is serialized as RSC Payload (a special JSON format) and streamed to the client. The client merges the RSC Payload into the React tree without losing client-side state. Only the diff is sent, not the entire tree."
  ],
  [
    "What problem does useTransition solve for slow state updates?",
    "hard",
    "Without transitions, ALL state updates are urgent — a slow render blocks the UI (freezing input, animations). `useTransition` marks updates as non-urgent — React can INTERRUPT them if a more urgent update comes in (like typing). Keeps the UI responsive during heavy computations. The old state is preserved until the transition completes."
  ],
  [
    "How does useDeferredValue differ from debouncing user input?",
    "hard",
    "Debouncing has a fixed delay (e.g., 300ms) — the UI waits even if CPU is idle. `useDeferredValue` is adaptive — it defers only when React is busy rendering. During idle CPU, it updates immediately. No magic delay number to tune. React decides when to defer based on frame budget. More responsive than fixed-debounce, especially on fast devices."
  ],
  [
    "Why does React 18 automatic batching also batch updates inside promises and timeouts?",
    "hard",
    "React 17 only batched inside React event handlers (synthetic events). React 18 extends batching to ALL updates (promises, setTimeout, native events, async functions) thanks to a new internal mechanism. Multiple setState calls in any async context produce ONE re-render. Reduces wasted renders and improves performance. Use `flushSync()` for cases needing immediate DOM reads."
  ],
  [
    "What is tearing in concurrent rendering and how does useSyncExternalStore prevent it?",
    "hard",
    "Tearing: different parts of the UI show different values for the same state because concurrent rendering splits work across multiple renders. `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` ensures consistent reads from external stores (Redux, Zustand). It forces React to read a consistent snapshot and prevents tearing during concurrent rendering."
  ],
  [
    "When should you reach for useSyncExternalStore over useState?",
    "med",
    "Use `useSyncExternalStore` when subscribing to an EXTERNAL store (Redux store, Zustand, browser API like `navigator.onLine`, `document.title`). For React-internal state, `useState`/`useReducer` suffice. The hook ensures the component always renders with a consistent value from the external source — critical for concurrent mode safety."
  ],
  [
    "What is the difference between useId and a hardcoded id for SSR hydration?",
    "med",
    "`useId()` generates unique, stable IDs that are consistent between server and client renders — preventing hydration mismatches. Hardcoded IDs can clash when a component appears multiple times. `useId()` produces strings like `:r1:` that are unique across the component tree. Use for: `htmlFor`/`id` pairs, ARIA attributes, accessibility labels."
  ],
  [
    "Why can hydration mismatches occur and how do you debug them?",
    "hard",
    "Causes: browser-only APIs (window, localStorage), random values (Math.random), timezone-sensitive output, data differences (server session vs client), extension-injected HTML. Debug: React logs warnings with the specific mismatch. Use `suppressHydrationWarning` on intentional differences (dates, timestamps). Browser extensions can cause false positives."
  ],
  [
    "What does the use() hook allow you to do with promises and context in React 19?",
    "hard",
    "`use(promise)` lets components read from a promise directly, suspending until resolved — works inside Suspense boundaries (no useEffect needed). `use(context)` is an alternative to `useContext` that can be called CONDITIONALLY (unlike useContext which follows rules of hooks). Example: `const data = condition ? use(promise) : fallback`. Enables more flexible data access patterns."
  ],
  [
    "How do React 19 Actions simplify form submission and pending states?",
    "hard",
    "React 19 Actions are async functions passed to `action` prop on `<form>`. React tracks pending state automatically: `const [formData, action, isPending] = useFormState(updateAction)`. No need for manual loading state. Actions can be Server Actions (runs on server) or client async functions. Pending state is available via `useFormStatus()`."
  ],
  [
    "What does useActionState (formerly useFormState) return and when does it update?",
    "hard",
    "`useActionState(action, initialState)` returns `[state, formAction, isPending]`. The state updates when the action completes (with the action's return value). `formAction` is passed to `<form action={formAction}>`. `isPending` indicates the action is in progress. The action receives `(prevState, formData)` as arguments and returns the new state. Useful for form validation feedback."
  ],
  [
    "What is useOptimistic used for in React 19?",
    "hard",
    "`useOptimistic(state, updateFn)` shows optimistic state immediately — before the action completes. `updateFn` receives current state and the optimistic value, returns the optimistic state. On action success: state updates to actual value. On failure: reverts to original state. Perfect for likes, message sending, toggles — where success is highly likely."
  ],
  [
    "How does useFormStatus know the status of a parent form?",
    "hard",
    "`useFormStatus()` returns `{ pending, data, method, action }` from the NEAREST parent `<form>`. It's called inside a form child component (like a Submit button). Uses React context internally. No prop drilling needed. Example: `<button>{ useFormStatus().pending ? 'Saving...' : 'Save' }</button>`. Works with both client Actions and Server Actions."
  ],
  [
    "What does the React Compiler automatically memoize and why is manual useMemo less needed?",
    "hard",
    "The React Compiler (React Forget) automatically memoizes: component renders, hook return values, callback functions, computed values. It analyzes JavaScript and inserts `useMemo`/`useCallback`/`React.memo` calls during build time. Developers write plain code without memoization — the compiler handles optimization. Reduces cognitive load and eliminates most manual memoization mistakes."
  ],
  [
    "When is React.memo actually worth adding to a component?",
    "med",
    "`React.memo` is worth it when: 1) The component renders OFTEN with the SAME props. 2) The component has a non-trivial render tree (many children). 3) Props are stable (useCallback/useMemo passed from parent). 4) Profiler shows the component re-renders without prop changes. NOT worth: components that always receive different props, leaf components (cheap to render), or premature optimization."
  ],
  [
    "Why can passing inline objects or functions as props defeat React.memo?",
    "hard",
    "`React.memo` does a shallow prop comparison. `{} === {}` is `false` for inline objects — every render creates a new reference. Same for inline arrow functions `() => ...`. Even though the values are identical, the references differ, so `React.memo` sees changed props and re-renders. Fix: use `useMemo` for objects, `useCallback` for functions, move outside component."
  ],
  [
    "What is the difference between mount, update, and commit phases?",
    "hard",
    "Mount: first render of a component into the tree. Update: subsequent renders when state/props change. Commit: applying the render output to the DOM. React render phase (mount + update) can be interrupted (concurrent). Commit phase is synchronous — once started, it completes. Effects run AFTER commit. Layout effects run synchronously during commit (before paint)."
  ],
  [
    "How does Suspense coordinate fallbacks for nested suspending components?",
    "hard",
    "Each `<Suspense>` boundary shows its own fallback independently. Nested Suspense: parent suspends → shows parent fallback (hiding children). When parent resolves, children may still suspend → show their own fallbacks. The closest Suspense boundary handles the fallback. For coordinated loading: use a single Suspense boundary at the level where you want a single fallback."
  ],
  [
    "What is a Suspense boundary waterfall and how do you avoid it?",
    "hard",
    "Suspense waterfall: nested Suspense boundaries resolve sequentially (parent waits, then child waits). Avoid by: 1) Fetch data in PARALLEL (use Promise.all at the top level). 2) Use a single Suspense boundary at a higher level. 3) Stream SSR (React 18+ sends chunks progressively). 4) Server Components fetch data on server — no waterfall on client."
  ],
  [
    "How does streaming SSR with Suspense improve Time to First Byte?",
    "hard",
    "Streaming SSR sends HTML in chunks as they're rendered — the browser receives and renders the shell (header, nav) while waiting for slower data (sidebar content). Without streaming, TTFB waits for ALL data to be fetched server-side. With streaming, the shell HTML arrives almost immediately. React 18 `renderToPipeableStream()` enables this. Improves perceived performance."
  ],
  [
    "What is selective hydration and why does it improve interactivity?",
    "hard",
    "Selective hydration hydrates components in order of user priority — not left-to-right. React starts hydrating the component the user just clicked or interacted with FIRST, even if it's further down the page. Components with no user interaction wait. Uses `Suspense` boundaries as hydration units. The app becomes interactive sooner because React prioritizes interactive elements."
  ],
  [
    "Why does React run effects twice in StrictMode during development?",
    "hard",
    "StrictMode intentionally unmounts and remounts components in development to verify: 1) Cleanup functions work correctly. 2) Effects are not missing cleanup. 3) State survives remount. Lifecycles that survive double-invocation are resilient to production behaviors (remounts, reconnects, timeouts). Only happens in development — production runs effects once."
  ],
  [
    "What is the difference between a controlled and uncontrolled input for performance?",
    "med",
    "Controlled: every keystroke triggers `setState` → re-render. For large forms, this can be expensive. Uncontrolled: DOM manages its own state, read via ref on submit — no re-renders on keystroke. Libraries like React Hook Form use uncontrolled + refs for better performance while still enabling validation."
  ],
  [
    "When does React bail out of a re-render even if setState is called?",
    "hard",
    "React bails out (skips re-render) if: 1) New state is the same as current state (same reference for objects, same primitive value). 2) `shouldComponentUpdate` returns false (class components). 3) `React.memo` shallow comparison says props haven't changed. 4) Parent re-renders but child has `React.memo` and stable props. Note: React still calls the component but returns cached result."
  ],
  [
    "Why does setting state to the same value sometimes still trigger a render once?",
    "hard",
    "Before React 18, setting state to the same value ALWAYS caused a re-render. In React 18+, if the state is the same (using `Object.is` comparison), React bails out of re-rendering the component AND its children. HOWEVER, the first bail-out may still trigger one re-render if it's the first setState or if the component is in a specific code path."
  ],
  [
    "What are the tradeoffs of context for frequently changing values?",
    "hard",
    "When context value changes, ALL consumers re-render — even if they only read a part of the value that didn't change. This is the main performance issue. Solutions: 1) Split into multiple contexts (theme, auth, data). 2) Use `useMemo` for the context value to prevent unnecessary re-renders. 3) Use state management libraries with selectors (Zustand, Redux). 4) Use Jotai (atomic updates, no uncontrolled re-renders)."
  ],
  [
    "How do you split context to avoid re-rendering all consumers?",
    "hard",
    "Split large context into smaller, focused contexts. Example: instead of one `AppContext` with user + theme + settings, create `UserContext`, `ThemeContext`, `SettingsContext`. Components only subscribe to the context they need. This way, theme changes only re-render components reading ThemeContext, not user/settings consumers."
  ],
  [
    "What is the purpose of the key prop when resetting component state?",
    "hard",
    "Changing the `key` prop unmounts and remounts the component — resetting ALL internal state. Useful for: resetting a form to initial state, restarting an animation, clearing internal state on data change. Example: `<Chat key={roomId} />` — switching rooms remounts the Chat component, clearing all local state (messages, input, scroll position)."
  ],
  [
    "Why is index as a key problematic for lists that reorder?",
    "med",
    "Index keys cause bugs: React matches components by key = index, so when items reorder, component state is associated with the wrong item. Example: list `[A, B, C]` rendered with keys 0,1,2. Reverse to `[C, B, A]` — still keys 0,1,2 → React doesn't move DOM, it just updates the content of each slot. Input values, focus, animations apply to wrong items. Use stable IDs."
  ],
  [
    "How does React decide whether to reuse or remount a component during reconciliation?",
    "hard",
    "React diffs the element tree: same element type + same key = REUSE (update props only). Different type or different key = REMOUNT (destroy old, create new). This applies recursively. For components: reuse keeps state, remount resets state. Moving a component within the tree without changing key/type may remount (unless using `key` to stabilize identity)."
  ],
  [
    "What is the difference between event delegation in React 17 and earlier versions?",
    "hard",
    "React 16 and earlier attached event listeners to the DOCUMENT (document.addEventListener). React 17+ attaches to the ROOT DOM CONTAINER (`rootNode.addEventListener`). This: 1) Allows nested React apps in the same page. 2) Prevents issues with stopPropagation from non-React code. 3) Makes event delegation compatible with iframes and portals."
  ],
  [
    "Why are derived values often better computed during render than stored in state?",
    "med",
    "Derived values computed during render (or via `useMemo`) don't require sync logic — they always reflect the current source data. Storing derived values in state requires `useEffect` to keep them in sync (prone to bugs, causes extra re-renders). Example: `const fullName = `${firstName} ${lastName}`` (computed) vs storing `fullName` in state and updating via effect (bad)."
  ],
  [
    "What are the signs that a piece of data should be ref instead of state?",
    "med",
    "Signs data should be `useRef`: 1) Changing it shouldn't cause re-render. 2) It's used in callbacks/effects and the latest value is needed (stale closure). 3) It's a DOM element reference. 4) It stores timer IDs, subscription objects, or other imperative handles. Values that influence UI output should be state. Values that only influence behavior/side effects should be refs."
  ],

  // ── Code / Implementation ─────────────────────────────────────────────────
  [
    "Write a custom useDebounce(value, delay) hook that returns a debounced value.",
    "hard",
    "`function useDebounce(value, delay = 500) { const [debounced, setDebounced] = useState(value); useEffect(() => { const timer = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(timer); }, [value, delay]); return debounced; }` Usage: `const debouncedSearch = useDebounce(searchTerm, 300)`. The debounced value updates only after the user stops typing for `delay` ms."
  ],
  [
    "Write a custom useThrottle hook for a scroll handler.",
    "hard",
    "`function useThrottle(value, limit = 100) { const [throttled, setThrottled] = useState(value); const lastRun = useRef(Date.now()); useEffect(() => { const timer = setInterval(() => { if (Date.now() - lastRun.current >= limit) { setThrottled(value); lastRun.current = Date.now(); } }, limit - (Date.now() - lastRun.current)); return () => clearInterval(timer); }, [value, limit]); return throttled; }` Better: return a throttled callback: `function useThrottledCallback(fn, limit) { const inThrottle = useRef(false); return useCallback((...args) => { if (!inThrottle.current) { fn(...args); inThrottle.current = true; setTimeout(() => (inThrottle.current = false), limit); } }, [fn, limit]); }`."
  ],
  [
    "Write a usePrevious(value) hook that returns the value from the last render.",
    "med",
    "`function usePrevious(value) { const ref = useRef(); useEffect(() => { ref.current = value; }, [value]); return ref.current; }` Usage: `const prevCount = usePrevious(count)` — returns `undefined` on first render, then the previous render's value. The ref is updated after render (via effect), so it always holds the previous value."
  ],
  [
    "Implement a useLocalStorage(key, initial) hook that syncs state to localStorage.",
    "hard",
    "`function useLocalStorage(key, initial) { const [stored, setStored] = useState(() => { try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : initial; } catch { return initial; } }); const setValue = useCallback(value => { const valueToStore = value instanceof Function ? value(stored) : value; setStored(valueToStore); localStorage.setItem(key, JSON.stringify(valueToStore)); }, [key, stored]); return [stored, setValue]; }` Syncs across tabs via `storage` event listener."
  ],
  [
    "Implement a useFetch(url) hook with loading, error, and data states.",
    "hard",
    "`function useFetch(url) { const [state, setState] = useState({ data: null, loading: true, error: null }); useEffect(() => { let cancelled = false; setState(s => ({ ...s, loading: true })); fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then(data => { if (!cancelled) setState({ data, loading: false, error: null }); }).catch(err => { if (!cancelled) setState({ data: null, loading: false, error: err }); }); return () => { cancelled = true; }; }, [url]); return state; }`"
  ],
  [
    "Write a useToggle hook returning [state, toggle] for boolean state.",
    "easy",
    "`function useToggle(initial = false) { const [state, setState] = useState(initial); const toggle = useCallback(() => setState(prev => !prev), []); return [state, toggle]; }` Usage: `const [isOpen, toggleOpen] = useToggle(); <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>`."
  ],
  [
    "Implement useIsMounted to safely guard setState after unmount.",
    "med",
    "`function useIsMounted() { const ref = useRef(false); useEffect(() => { ref.current = true; return () => { ref.current = false; }; }, []); return useCallback(() => ref.current, []); }` Usage: `const isMounted = useIsMounted(); fetch(url).then(data => { if (isMounted()) setData(data); })`. Prevents \"Can't perform a React state update on an unmounted component\" warning."
  ],
  [
    "Write a useEventListener(event, handler) hook that cleans up on unmount.",
    "med",
    "`function useEventListener(event, handler, element = window) { const savedHandler = useRef(handler); useEffect(() => { savedHandler.current = handler; }, [handler]); useEffect(() => { const listener = e => savedHandler.current(e); element.addEventListener(event, listener); return () => element.removeEventListener(event, listener); }, [event, element]); }` Usage: `useEventListener('mousemove', pos => console.log(pos.x, pos.y))`."
  ],
  [
    "Implement a useOnClickOutside(ref, handler) hook for closing a dropdown.",
    "hard",
    "`function useOnClickOutside(ref, handler) { useEffect(() => { const listener = event => { if (!ref.current || ref.current.contains(event.target)) return; handler(event); }; document.addEventListener('mousedown', listener); document.addEventListener('touchstart', listener); return () => { document.removeEventListener('mousedown', listener); document.removeEventListener('touchstart', listener); }; }, [ref, handler]); }` Usage: `const ref = useRef(); useOnClickOutside(ref, () => setOpen(false)); <div ref={ref}>...</div>`."
  ],
  [
    "Write a useInterval hook that supports a changing delay without stale closures.",
    "hard",
    "`function useInterval(callback, delay) { const savedCallback = useRef(callback); useEffect(() => { savedCallback.current = callback; }, [callback]); useEffect(() => { if (delay !== null) { const id = setInterval(() => savedCallback.current(), delay); return () => clearInterval(id); } }, [delay]); }` Usage: `useInterval(() => setCount(c => c + 1), running ? 1000 : null)`. The callback can close over fresh state."
  ],
  [
    "Implement useMediaQuery(query) returning whether the query matches.",
    "med",
    "`function useMediaQuery(query) { const [matches, setMatches] = useState(() => window.matchMedia(query).matches); useEffect(() => { const mq = window.matchMedia(query); const handler = e => setMatches(e.matches); mq.addEventListener('change', handler); return () => mq.removeEventListener('change', handler); }, [query]); return matches; }` Usage: `const isMobile = useMediaQuery('(max-width: 768px)')`."
  ],
  [
    "Write a useWindowSize hook that updates on resize.",
    "med",
    "`function useWindowSize() { const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight }); useEffect(() => { const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight }); window.addEventListener('resize', handler); return () => window.removeEventListener('resize', handler); }, []); return size; }` Consider debouncing for performance."
  ],
  [
    "Implement a useCounter hook with increment, decrement, and reset.",
    "easy",
    "`function useCounter(initial = 0, { min, max } = {}) { const [count, setCount] = useState(initial); const inc = useCallback(() => setCount(c => max !== undefined ? Math.min(c + 1, max) : c + 1), [max]); const dec = useCallback(() => setCount(c => min !== undefined ? Math.max(c - 1, min) : c - 1), [min]); const reset = useCallback(() => setCount(initial), [initial]); return { count, inc, dec, reset }; }`"
  ],
  [
    "Write a custom useReducer-based useForm hook managing field values and errors.",
    "hard",
    "`function useForm(initialValues) { const reducer = (state, action) => { switch (action.type) { case 'SET_FIELD': return { ...state, values: { ...state.values, [action.field]: action.value }, errors: { ...state.errors, [action.field]: action.validate?.(action.value) } }; case 'SET_ERRORS': return { ...state, errors: { ...state.errors, ...action.errors } }; case 'RESET': return { values: initialValues, errors: {} }; default: return state; } }; const [state, dispatch] = useReducer(reducer, { values: initialValues, errors: {} }); return { values: state.values, errors: state.errors, setField: (field, value, validate) => dispatch({ type: 'SET_FIELD', field, value, validate }), setErrors: errors => dispatch({ type: 'SET_ERRORS', errors }), reset: () => dispatch({ type: 'RESET' }) }; }`"
  ],
  [
    "Implement a useCopyToClipboard hook returning a copy function and copied flag.",
    "med",
    "`function useCopyToClipboard() { const [copied, setCopied] = useState(false); const copy = useCallback(async (text) => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); } }, []); return [copied, copy]; }` Usage: `const [copied, copy] = useCopyToClipboard(); <button onClick={() => copy('text')}>{copied ? 'Copied!' : 'Copy'}</button>`."
  ],
  [
    "Write a useAsync hook that runs an async function and tracks its status.",
    "hard",
    "`function useAsync(asyncFn, deps = []) { const [state, setState] = useState({ value: null, loading: true, error: null }); useEffect(() => { let cancelled = false; setState(s => ({ ...s, loading: true })); asyncFn().then(val => { if (!cancelled) setState({ value: val, loading: false, error: null }); }).catch(err => { if (!cancelled) setState({ value: null, loading: false, error: err }); }); return () => { cancelled = true; }; }, deps); return state; }`"
  ],
  [
    "Implement an ErrorBoundary class component that shows a fallback UI.",
    "hard",
    "`class ErrorBoundary extends React.Component { constructor(props) { super(props); this.state = { hasError: false, error: null }; } static getDerivedStateFromError(error) { return { hasError: true, error }; } componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info); } render() { if (this.state.hasError) { return this.props.fallback || <h2>Something went wrong</h2>; } return this.props.children; } }` Usage: `<ErrorBoundary><MyComponent /></ErrorBoundary>`."
  ],
  [
    "Build a controlled Tabs component using Context for the active tab.",
    "hard",
    "`const TabsContext = createContext(); function Tabs({ defaultTab, children }) { const [active, setActive] = useState(defaultTab); return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>; } function Tab({ value, children }) { const { active, setActive } = useContext(TabsContext); return <button onClick={() => setActive(value)} className={active === value ? 'active' : ''}>{children}</button>; } function TabPanel({ value, children }) { const { active } = useContext(TabsContext); return active === value ? <div>{children}</div> : null; } Tabs.Tab = Tab; Tabs.TabPanel = TabPanel;`"
  ],
  [
    "Implement a Modal that renders into document.body via createPortal.",
    "hard",
    "`function Modal({ isOpen, onClose, children }) { if (!isOpen) return null; return createPortal(<div className=\"overlay\" onClick={onClose}> <div className=\"modal\" onClick={e => e.stopPropagation()}> <button onClick={onClose}>Close</button> {children} </div> </div>, document.body); }` CSS: `.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); } .modal { background: white; margin: 5rem auto; max-width: 500px; padding: 2rem; }`."
  ],
  [
    "Write a debounced search input that fetches suggestions as you type.",
    "hard",
    "`function SearchBox() { const [query, setQuery] = useState(''); const debouncedQuery = useDebounce(query, 300); const { data: results } = useQuery(['search', debouncedQuery], () => fetchSuggestions(debouncedQuery), { enabled: !!debouncedQuery }); return <div> <input value={query} onChange={e => setQuery(e.target.value)} placeholder=\"Search...\" /> <ul>{results?.map(r => <li key={r.id}>{r.name}</li>)}</ul> </div>; }` Debounce prevents API call on every keystroke."
  ],
  [
    "Implement an infinite scroll list using IntersectionObserver.",
    "hard",
    "`function InfiniteList() { const sentinelRef = useRef(); const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(['items'], ({ pageParam = 1 }) => fetchItems(pageParam), { getNextPageParam: (lastPage) => lastPage.nextPage }); useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && hasNextPage) fetchNextPage(); }); if (sentinelRef.current) observer.observe(sentinelRef.current); return () => observer.disconnect(); }, [hasNextPage, fetchNextPage]); return <div> {data?.pages.map(page => page.items.map(item => <Item key={item.id} {...item} />))} <div ref={sentinelRef}>{isFetchingNextPage && 'Loading...'}</div> </div>; }`"
  ],
  [
    "Build a virtualized list rendering only visible rows.",
    "hard",
    "`import { FixedSizeList } from 'react-window'; function VirtualList({ items }) { const Row = ({ index, style }) => <div style={style}>{items[index].name}</div>; return <FixedSizeList height={400} itemCount={items.length} itemSize={50} width=\"100%\"> {Row} </FixedSizeList>; }` The list renders only ~10 DOM nodes regardless of total item count. Memory and performance efficient for 100,000+ items."
  ],
  [
    "Implement a useDeferredValue-based filtered list to keep typing responsive.",
    "hard",
    "`function FilteredList({ items }) { const [query, setQuery] = useState(''); const deferredQuery = useDeferredValue(query); const isStale = query !== deferredQuery; const filtered = useMemo(() => items.filter(i => i.name.includes(deferredQuery)), [deferredQuery, items]); return <div> <input value={query} onChange={e => setQuery(e.target.value)} /> <List style={{ opacity: isStale ? 0.5 : 1 }} items={filtered} /> </div>; }` Typing stays smooth — the list filter is deferred while React is busy."
  ],
  [
    "Write a higher order component withLoading that shows a spinner while loading.",
    "med",
    "`function withLoading(Component) { return function WithLoading({ loading, ...props }) { if (loading) return <Spinner />; return <Component {...props} />; }; }` Usage: `const UserWithLoading = withLoading(UserProfile); <UserWithLoading loading={isLoading} userId={id} />`. Modern alternative: use a custom hook instead of HOC."
  ],
  [
    "Implement a render-prop MouseTracker that reports cursor position.",
    "hard",
    "`function MouseTracker({ render, children }) { const [pos, setPos] = useState({ x: 0, y: 0 }); const handleMouse = useCallback(e => setPos({ x: e.clientX, y: e.clientY }), []); return <div onMouseMove={handleMouse} style={{ height: '100%' }}> {render ? render(pos) : children(pos)} </div>; }` Usage: `<MouseTracker>{({ x, y }) => <p>{x}, {y}</p>}</MouseTracker>`."
  ],
  [
    "Build a Countdown timer component using useEffect and setInterval correctly.",
    "med",
    "`function Countdown({ seconds }) { const [timeLeft, setTimeLeft] = useState(seconds); useEffect(() => { if (timeLeft <= 0) return; const id = setInterval(() => setTimeLeft(t => t - 1), 1000); return () => clearInterval(id); }, [timeLeft]); return <div>{timeLeft > 0 ? `${timeLeft}s` : 'Done!'}</div>; }` Using functional update with `setTimeLeft(t => t - 1)` ensures the interval always has the latest value."
  ],
  [
    "Implement a Stopwatch with start, stop, and reset using refs for the interval.",
    "med",
    "`function Stopwatch() { const [time, setTime] = useState(0); const intervalRef = useRef(null); const start = () => { if (intervalRef.current) return; intervalRef.current = setInterval(() => setTime(t => t + 10), 10); }; const stop = () => { clearInterval(intervalRef.current); intervalRef.current = null; }; const reset = () => { stop(); setTime(0); }; useEffect(() => () => clearInterval(intervalRef.current), []); return <div>{(time / 100).toFixed(2)}s <button onClick={start}>Start</button><button onClick={stop}>Stop</button><button onClick={reset}>Reset</button></div>; }`"
  ],
  [
    "Write a useReducer todo list supporting add, toggle, and delete.",
    "med",
    "`function todoReducer(state, action) { switch (action.type) { case 'ADD': return [...state, { id: Date.now(), text: action.text, done: false }]; case 'TOGGLE': return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t); case 'DELETE': return state.filter(t => t.id !== action.id); default: return state; } } function TodoList() { const [todos, dispatch] = useReducer(todoReducer, []); return <div>{todos.map(t => <div key={t.id}><input type=\"checkbox\" checked={t.done} onChange={() => dispatch({ type: 'TOGGLE', id: t.id })} />{t.text}</div>)}</div>; }`"
  ],
  [
    "Implement optimistic UI for a like button using useOptimistic.",
    "hard",
    "`function LikeButton({ postId, initialLikes }) { const [optimisticLikes, addOptimisticLike] = useOptimistic(initialLikes, (state, _) => state + 1); const likeAction = async () => { addOptimisticLike(null); await likePost(postId); }; return <button onClick={likeAction}>❤️ {optimisticLikes}</button>; }` The count increments immediately. If `likePost` fails, the UI reverts to `initialLikes` automatically."
  ],
  [
    "Build a forwardRef Input component exposing a focus() method via useImperativeHandle.",
    "hard",
    "`const FancyInput = forwardRef((props, ref) => { const inputRef = useRef(null); useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus(), select: () => inputRef.current.select(), blur: () => inputRef.current.blur() }), []); return <input ref={inputRef} className=\"fancy\" {...props} />; });` Parent: `const ref = useRef(); <FancyInput ref={ref} />; ref.current.focus()`."
  ],
  [
    "Implement a useMemoCompare hook with a custom equality function.",
    "hard",
    "`function useMemoCompare(next, compare) { const prevRef = useRef(); const prev = prevRef.current; const isEqual = compare ? compare(prev, next) : prev === next; if (!isEqual) prevRef.current = next; return isEqual ? prev : next; }` Usage: `const data = useMemoCompare(props.data, (prev, next) => deepEqual(prev, next))` — avoids re-computation when deeply-equal data is passed."
  ],
  [
    "Write a custom hook that subscribes to an external store with useSyncExternalStore.",
    "hard",
    "`function useOnlineStatus() { return useSyncExternalStore( subscribe: callback => { window.addEventListener('online', callback); window.addEventListener('offline', callback); return () => { window.removeEventListener('online', callback); window.removeEventListener('offline', callback); }; }, getSnapshot: () => navigator.onLine, getServerSnapshot: () => true ); }` Usage: `const isOnline = useOnlineStatus()` — re-renders when online status changes."
  ],
  [
    "Implement a theme provider with Context and a useTheme hook.",
    "med",
    "`const ThemeContext = createContext(); function ThemeProvider({ children }) { const [theme, setTheme] = useState('light'); const toggle = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []); return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>; } function useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error('useTheme must be inside ThemeProvider'); return ctx; }`"
  ],
  [
    "Build a paginated table component with page state and next/prev controls.",
    "med",
    "`function PaginatedTable({ data, pageSize = 10 }) { const [page, setPage] = useState(1); const totalPages = Math.ceil(data.length / pageSize); const pageData = data.slice((page - 1) * pageSize, page * pageSize); return <div><table>{pageData.map(row => <tr key={row.id}>...</tr>)}</table><button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button><span>{page} / {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button></div>; }`"
  ],
  [
    "Implement lazy loading of a route component with React.lazy and Suspense.",
    "med",
    "`const Dashboard = lazy(() => import('./Dashboard')); const Settings = lazy(() => import('./Settings')); function App() { return <Routes> <Route path=\"/dashboard\" element={<Suspense fallback={<PageSkeleton />}><Dashboard /></Suspense>} /> <Route path=\"/settings\" element={<Suspense fallback={<PageSkeleton />}><Settings /></Suspense>} /> </Routes>; }` Each route's code is loaded on demand — reduces initial bundle size."
  ],

  // ── Tricky output / behavior ──────────────────────────────────────────────
  [
    "What logs: const [c,setC]=useState(0); function f(){setC(c+1);setC(c+1)} after one click?",
    "hard",
    "`c` is 1, not 2. Both `setC(c+1)` use the same stale `c` value (0) because closures capture the value from the current render. `setC(0+1)` twice still just sets to 1. Fix: use functional update `setC(prev => prev + 1)` called twice actually increments by 2."
  ],
  [
    "What renders after click: setCount(count+1) called three times in one handler with count=0?",
    "hard",
    "Count renders as 1, not 3. All three `setCount(0 + 1)` closures capture the same `count = 0`. React 18 batches them into one update with final value 1. Use functional update `setCount(c => c + 1)` three times to get 3."
  ],
  [
    "What does setCount(c=>c+1) called three times produce vs setCount(count+1) three times?",
    "hard",
    "`setCount(c => c + 1)` three times → count becomes 3 (each call takes the latest pending state). `setCount(count + 1)` three times → count becomes 1 (all three use the same stale `count`). Functional updates always use the latest pending state value."
  ],
  [
    "In useEffect with empty deps logging count, what value is logged after multiple clicks?",
    "hard",
    "The effect captures `count` from the initial render (0). After multiple clicks, the effect never re-runs (empty deps), so it always logs 0. This is the stale closure problem. Fix: add `count` to deps or use a ref to always read the latest value."
  ],
  [
    "Does a setState call inside an event handler update state synchronously for the next line?",
    "hard",
    "No. React 18 batches all setState calls, including in event handlers. The next line reads the SAME state value, not the updated one. State is only updated after re-render (which happens after the handler completes). Use functional updates if you need the latest value within the same handler."
  ],
  [
    "What is the order: parent effect vs child effect vs parent layout effect on mount?",
    "hard",
    "Order: 1) Parent render. 2) Child render. 3) Child layout effects (useLayoutEffect). 4) Parent layout effects. 5) Child effects (useEffect). 6) Parent effects. Children always complete effects before parents because parents depend on children being mounted."
  ],
  [
    "What runs first on mount: useEffect cleanup, the effect, or the render?",
    "med",
    "On mount: render → layout effects → effects. No cleanup runs on mount (only on unmount or before re-running the effect). On re-render: render → cleanup previous effect → new effect. On unmount: cleanup runs."
  ],
  [
    "Why does an interval set in useEffect with [] always log the initial count?",
    "hard",
    "The interval callback captures `count` from the initial render closure (the effect runs once with empty deps). The callback closes over the original `count` (0), so it always logs 0. Fix: use functional update `setCount(c => c + 1)` or a ref to access the latest value."
  ],
  [
    "What happens if you call setState during render of a component?",
    "hard",
    "React throws an error or warns: \"Cannot update a component while rendering a different component\". During the render phase, React should remain pure. Calling setState triggers another render synchronously, leading to infinite loops. This is different from the allowed pattern of calling setState inside an event handler or effect."
  ],
  [
    "What renders if a component returns null vs returns false vs returns undefined?",
    "med",
    "`null`: renders nothing (valid, no error). `false`: renders nothing (valid, no error). `undefined`: throws error in development (`'Nothing was returned from render'`). In production, renders nothing. Always return `null` (not `undefined`) when you want to render nothing."
  ],
  [
    "What is shown when key changes on the same component between renders?",
    "hard",
    "The component UNMOUNTS and REMOUNTS — all state, effects, and DOM are re-created. This is the proper way to reset a component's internal state. Example: `<Chat key={roomId} />` — switching rooms unmounts the old Chat and mounts a new one with fresh state."
  ],
  [
    "Why does typing in an input lose focus if the component is defined inside render?",
    "hard",
    "A component defined inside another component creates a NEW component type on every render. React sees a different type → unmounts the input and remounts it → focus is lost. Never define components inside other components. Define them at the top level or in useMemo."
  ],
  [
    "What value does a closure capture: count read inside a setTimeout set in render?",
    "hard",
    "The setTimeout callback captures `count` from the CURRENT render's closure — not the future value. If `count` is 5 at render time, the setTimeout will read 5 even after count changes. This is the stale closure problem. Use a ref or functional state update to get the latest value."
  ],
  [
    "In StrictMode dev, how many times does the console.log in the component body run on mount?",
    "med",
    "Twice. StrictMode double-invokes the component function (and reducers, state initializers) to help detect side effects in render phase. The second invocation is to check for accidental side effects. This only happens in development mode — production runs once."
  ],
  [
    "What renders when {0 && <Child/>} is used vs {count > 0 && <Child/>}?",
    "med",
    "`{0 && <Child/>}` renders the number 0 (a falsy value that IS rendered because React renders the literal value). `{count > 0 && <Child/>}` renders nothing when false (boolean `false` is not rendered). Fix: `{count > 0 ? <Child/> : null}` or `{!!count && <Child/>}`."
  ],
  [
    "What happens if two siblings have the same key in a list?",
    "med",
    "React warns about duplicate keys (they must be unique among siblings). With duplicate keys, React may reuse DOM incorrectly, leading to visual bugs, incorrect state, or focus issues. Always use unique, stable keys within the list scope."
  ],
  [
    "Does changing a ref via ref.current = x cause a re-render?",
    "easy",
    "No. Refs don't trigger re-renders when changed. If you need the UI to reflect a value, use state. Use refs for values that change but shouldn't trigger re-render (intervals, subscriptions, previous values)."
  ],
  [
    "What is the output order of console.logs in render, useLayoutEffect, and useEffect?",
    "hard",
    "1) render log (during render phase). 2) useLayoutEffect log (after DOM mutations, before paint — synchronous). 3) useEffect log (after paint — async). If useLayoutEffect updates state, it adds another render-layoutEffect cycle BEFORE the original useEffect runs."
  ],
  [
    "Why might a child re-render even though its props look unchanged from the parent?",
    "hard",
    "Causes: 1) Parent renders → child renders by default (even if props look same). 2) Inline props (objects, functions) create new references each render — shallow comparison fails. 3) Context value changed (child reads context). 4) Child is not wrapped in React.memo. Fix: React.memo + useCallback/useMemo for stable prop references."
  ],
  [
    "What happens when you update state in a useEffect that has that state in its deps?",
    "hard",
    "Infinite loop: effect runs → state updates → effect deps changed → effect runs again → state updates → ... The effect runs and immediately queues another run. Make sure the state update is conditional: `if (condition) setState(newVal)`. Use functional update to avoid dep altogether if possible."
  ],
  [
    "What does useMemo return if its dependency array is omitted entirely?",
    "med",
    "If no dependency array: `useMemo(computeFn)` — returns a new value EVERY render (no memoization). If empty array: `useMemo(computeFn, [])` — computes once on mount and returns cached value forever. If omitted entirely, there's no caching — just use a regular variable."
  ],
  [
    "Why does an event handler sometimes see stale state from a previous render?",
    "hard",
    "Event handlers are closures over the render scope. If you capture state directly (not via functional update), the handler sees the state from WHEN IT WAS CREATED. If the user clicks after several state updates, the handler still has the old state. Fix: use `useRef` for latest value, or `useCallback` with fresh deps."
  ],
  [
    "What is logged if you setState then immediately read the state variable in the same scope?",
    "med",
    "The OLD value is logged. `setState` is async — the state variable doesn't change until the next render. Reading it immediately after `setState` returns the current render's value. Example: `console.log(count); setCount(count + 1); console.log(count);` — both logs show the same value."
  ],
  [
    "What happens to effects when a conditionally rendered component unmounts?",
    "med",
    "Cleanup functions run (in reverse order of creation). Effects are cleaned up on unmount. If the component is shown again, effects re-run with fresh closures (mount behavior). This is why keys are important for resetting state/effects."
  ],
  [
    "Why does {items.map(i => <Item/>)} without keys produce a console warning?",
    "easy",
    "React uses keys to identify list items during reconciliation. Without keys, React warns that it must use index (which causes performance issues and state bugs on reorder). Always assign unique keys to list items."
  ],
  [
    "What renders if you spread a changing object as props into a React.memo child?",
    "hard",
    "`<Child {...obj} />` passes every property of `obj` as individual props. If `obj` is a new reference each render (even with same values), the React.memo child still re-renders because each prop is a new value reference. Fix: memoize `obj` with `useMemo`."
  ],
  [
    "Does useCallback prevent the function body from running, or just preserve identity?",
    "med",
    "`useCallback` only preserves the function identity (reference) across renders. The function body ALWAYS runs when the function is CALLED, not when `useCallback` is evaluated. Without `useCallback`, a NEW function is created each render (different reference). With `useCallback`, the SAME function reference is returned as long as deps haven't changed."
  ],
  [
    "What happens if you call a hook inside a condition or loop?",
    "med",
    "React throws an error: \"Hooks can only be called inside the body of a function component\". Hooks must be called unconditionally at the top level of the component — React relies on consistent call order between renders to associate state with hooks. Calling inside conditions/loops breaks this order."
  ],
  [
    "Why does a fetch in useEffect without cleanup cause a state update warning on unmount?",
    "hard",
    "If the component unmounts before the fetch completes, the `.then()` handler runs and calls `setState` on an unmounted component. React warns: \"Can't perform a React state update on an unmounted component\". Fix: use `AbortController` to cancel the fetch, or track mounted state with a flag."
  ],
  [
    "What is the final count if setCount is batched across an onClick and a queued microtask?",
    "hard",
    "React 18 batches both updates into ONE render. If count starts at 0, `onClick` calls `setCount(c => c + 1)` and a microtask (Promise) also calls it, React coalesces into a single update. The final count depends on the order — typically 1 (not 2) if the same functional update runs multiple times within batch. Each functional update sees the pending state."
  ],
  [
    "How do you use the new use() hook to read a promise or context conditionally in React 19?",
    "hard",
    "`const data = use(fetchData());` — suspends until promise resolves. Unlike `useContext`, `use()` can be called conditionally: `const theme = isDark ? use(DarkContext) : use(LightContext)`. Also in loops: `items.map(item => use(item.promise))`. Must be wrapped in Suspense for promise resolution. Replaces some `useContext` usage with more flexible API."
  ],
];
