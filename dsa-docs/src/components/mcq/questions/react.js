// Auto-extracted from MCQData.js

export default [
  {
    id: 'react-1',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'easy',
    question: 'What is the correct way to update state in React?',
    codeSnippet: `function Counter() {\n  const [count, setCount] = useState(0);\n  \n  // Which is correct?\n  return (\n    <button onClick={() => ???}>\n      {count}\n    </button>\n  );\n}`,
    options: ['count = count + 1', 'setCount(count + 1)', 'this.setState({ count: count + 1 })', 'count++'],
    correctAnswer: [1],
    type: 'single',
    explanation: 'In React, you must use the setter function from useState to update state. `setCount(count + 1)` correctly schedules a state update. Direct mutation like `count = count + 1` won\'t trigger a re-render.',
    keyConcept: 'State in React is immutable. Always use the setter function to update state and trigger re-renders.',
    xpReward: 10,
    tags: ['state', 'usestate', 'hooks'],
  },
  {
    id: 'react-2',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'medium',
    question: 'When does this useEffect run?',
    codeSnippet: `useEffect(() => {\n  console.log("Effect ran");\n}, []);`,
    options: [
      'After every render',
      'Only on mount (first render)',
      'When the component unmounts',
      'Never — empty dependency array is invalid',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'An empty dependency array `[]` means the effect runs only once after the initial mount (and the cleanup runs on unmount). This is commonly used for data fetching, subscriptions, or analytics.',
    keyConcept: 'The dependency array controls when an effect runs. `[]` = run once on mount. No array = run after every render. `[dep]` = run when dep changes.',
    xpReward: 10,
    tags: ['useeffect', 'hooks', 'lifecycle'],
  },
  {
    id: 'react-3',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'intermediate',
    question: 'What must a custom hook start with?',
    codeSnippet: `// Which is a valid custom hook name?`,
    options: ['useFetch', 'fetchData', 'use_fetch', 'UseData'],
    correctAnswer: [0],
    type: 'single',
    explanation: 'By convention, all React hooks must start with "use" followed by a capital letter (camelCase). This is not just a convention — the React team\'s Rules of Hooks lint plugin enforces this pattern.',
    keyConcept: 'Custom hooks must be named starting with "use" (e.g., useFetch, useLocalStorage). This lets React lint rules verify hooks are used correctly.',
    xpReward: 5,
    tags: ['custom-hooks', 'convention'],
  },
  {
    id: 'react-4',
    technology: 'react',
    topic: 'Lists & Keys',
    difficulty: 'easy',
    question: 'Why does React need keys in lists?',
    codeSnippet: `{items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))}`,
    options: [
      'To style each item differently',
      'To identify which items changed, are added, or removed',
      'To order the items alphabetically',
      'Keys are optional and only for performance',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Keys help React identify which items in a list have changed, been added, or been removed. This enables efficient reconciliation — React can reuse DOM nodes instead of recreating them.',
    keyConcept: 'Keys provide a stable identity for list items. Use unique, stable IDs — never use array indices if the list can change.',
    xpReward: 10,
    tags: ['keys', 'lists', 'reconciliation'],
  },
  {
    id: 'react-5',
    technology: 'react',
    topic: 'Props & State',
    difficulty: 'medium',
    question: 'What is the difference between props and state?',
    codeSnippet: `// Props vs State — which statement is TRUE?`,
    options: [
      'Props are mutable, state is immutable',
      'State is passed from parent to child, props are internal',
      'Props are read-only and passed from parent; state is internal and managed by the component',
      'Props and state are the same thing',
    ],
    correctAnswer: [2],
    type: 'single',
    explanation: 'Props (short for "properties") are read-only data passed from a parent component to a child. State is internal data managed by the component itself that can change over time via setState or useState.',
    keyConcept: 'Props flow downward (parent → child). State is local to a component. Never mutate props — they are read-only.',
    xpReward: 10,
    tags: ['props', 'state', 'data-flow'],
  },

  // ─── JSX ─────────────────────────────────────────────────────────────────
  {
    id: 'react-6',
    technology: 'react',
    topic: 'JSX',
    difficulty: 'easy',
    question: 'What does JSX compile to?',
    codeSnippet: `const element = <h1>Hello</h1>;`,
    options: [
      'A string of HTML',
      'React.createElement("h1", null, "Hello")',
      'document.createElement("h1")',
      'An HTML template literal',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'JSX is syntactic sugar. Babel compiles `<h1>Hello</h1>` to `React.createElement("h1", null, "Hello")`, which returns a plain JavaScript object (React element) describing the UI.',
    keyConcept: 'JSX compiles to React.createElement() calls. It is not HTML — it is JavaScript with XML-like syntax.',
    xpReward: 5,
    tags: ['jsx', 'createElement', 'babel'],
  },
  {
    id: 'react-7',
    technology: 'react',
    topic: 'JSX',
    difficulty: 'easy',
    question: 'Why must JSX expressions return a single root element?',
    codeSnippet: `// This is invalid:\nreturn (\n  <h1>Title</h1>\n  <p>Body</p>\n);`,
    options: [
      'HTML requires it',
      'Because JSX compiles to a single function call that can only return one value',
      'CSS requires one root for styling',
      'Browser requirement',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'JSX compiles to `React.createElement()` calls. A function can only return one value. Use `<React.Fragment>` or the shorthand `<>...</>` to wrap multiple elements without adding a real DOM node.',
    keyConcept: 'Wrap multiple sibling elements in `<>...</>` (Fragment) to satisfy the single-root requirement.',
    xpReward: 5,
    tags: ['jsx', 'fragment', 'root-element'],
  },
  {
    id: 'react-8',
    technology: 'react',
    topic: 'JSX',
    difficulty: 'medium',
    question: 'What is wrong with this JSX?',
    codeSnippet: `function App() {\n  return (\n    <div class="container">\n      <label for="name">Name</label>\n      <input type="text" />\n    </div>\n  );\n}`,
    options: [
      'Input must not be self-closing',
      '`class` should be `className` and `for` should be `htmlFor`',
      'div cannot contain label and input together',
      'Nothing is wrong',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'JSX uses camelCase for HTML attributes. `class` → `className` (class is a JS reserved word), `for` → `htmlFor` (for is a JS reserved word). Self-closing input `/>` is correct in JSX.',
    keyConcept: 'JSX attribute differences from HTML: class→className, for→htmlFor, onclick→onClick, style takes an object.',
    xpReward: 10,
    tags: ['jsx', 'className', 'htmlFor', 'attributes'],
  },

  // ─── Components ──────────────────────────────────────────────────────────
  {
    id: 'react-9',
    technology: 'react',
    topic: 'Components',
    difficulty: 'easy',
    question: 'What is a React functional component?',
    codeSnippet: `function Welcome({ name }) {\n  return <h1>Hello, {name}</h1>;\n}`,
    options: [
      'A class that extends React.Component',
      'A plain JavaScript function that accepts props and returns JSX',
      'A function that returns a string',
      'A component without state',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'A functional component is a plain JS function that accepts props and returns JSX. Since React Hooks were introduced, functional components can do everything class components can — including state and lifecycle effects.',
    keyConcept: 'Prefer functional components + hooks over class components for modern React development.',
    xpReward: 5,
    tags: ['functional-component', 'components', 'basics'],
  },
  {
    id: 'react-10',
    technology: 'react',
    topic: 'Components',
    difficulty: 'medium',
    question: 'What triggers a component re-render in React?',
    options: [
      'Any variable change inside the component',
      'State change, prop change, or parent re-render',
      'Only explicit calls to forceUpdate()',
      'Only state changes',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'A component re-renders when: (1) its own state changes, (2) its props change, (3) its parent re-renders (even if props did not change). Context changes also cause re-renders for consuming components.',
    keyConcept: 'Re-render triggers: state change, prop change, parent re-render, context change. Use React.memo or useMemo/useCallback to prevent unnecessary re-renders.',
    xpReward: 10,
    tags: ['re-render', 'state', 'props', 'performance'],
  },
  {
    id: 'react-11',
    technology: 'react',
    topic: 'Components',
    difficulty: 'hard',
    question: 'What does React.memo do?',
    codeSnippet: `const Child = React.memo(({ value }) => {\n  console.log("Rendered");\n  return <div>{value}</div>;\n});`,
    options: [
      'Caches the result of expensive calculations inside the component',
      'Prevents re-render if props have not changed (shallow comparison)',
      'Makes the component asynchronous',
      'Memoizes function references inside the component',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`React.memo` is a HOC that wraps a functional component and skips re-rendering if props have not changed (shallow equality check). Useful when a parent re-renders frequently but the child\'s props stay the same.',
    keyConcept: 'React.memo = PureComponent for functional components. Only re-renders when props change. Pass custom comparator as second arg for deep equality.',
    xpReward: 15,
    tags: ['React.memo', 'memoization', 'performance', 're-render'],
  },

  // ─── useState Hook (more) ─────────────────────────────────────────────────
  {
    id: 'react-12',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'medium',
    question: 'Why should you use the functional update form of setState?',
    codeSnippet: `// Risky (stale closure):\nsetCount(count + 1);\n// Safe:\nsetCount(prev => prev + 1);`,
    options: [
      'Functional form is faster',
      'Functional form guarantees access to the latest state, avoiding stale closure issues',
      'Functional form is the only way to update objects',
      'There is no difference',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'State updates may be batched. If you call `setCount(count + 1)` multiple times rapidly, all calls may see the same stale `count`. The functional form `setCount(prev => prev + 1)` always receives the latest state.',
    keyConcept: 'Use functional updates `setState(prev => newVal)` when the new state depends on the previous state.',
    xpReward: 15,
    tags: ['useState', 'functional-update', 'stale-closure'],
  },
  {
    id: 'react-13',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'hard',
    question: 'What is the issue with this state update and how to fix it?',
    codeSnippet: `const [user, setUser] = useState({ name: "Alice", age: 25 });\n// Updating age:\nsetUser({ age: 26 }); // What happens to name?`,
    options: [
      'name becomes undefined — useState does NOT merge objects like setState in class components',
      'name stays "Alice" — useState merges objects automatically',
      'TypeError is thrown',
      'name becomes null',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Unlike `this.setState()` in class components, `useState`\'s setter REPLACES the entire state, not merges it. `setUser({ age: 26 })` removes the `name` field. Fix: `setUser(prev => ({ ...prev, age: 26 }))`.',
    keyConcept: 'useState setter replaces state entirely. Spread the previous state when updating partial object state.',
    xpReward: 20,
    tags: ['useState', 'object-state', 'spread', 'merge'],
  },

  // ─── useEffect Hook (more) ───────────────────────────────────────────────
  {
    id: 'react-14',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'easy',
    question: 'What does the cleanup function in useEffect do?',
    codeSnippet: `useEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n  return () => clearInterval(timer); // cleanup\n}, []);`,
    options: [
      'Runs before the first render',
      'Runs when the component unmounts or before the effect re-runs',
      'Clears all state in the component',
      'Runs after every render',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'The function returned from useEffect is the cleanup function. It runs (1) when the component unmounts, or (2) before the effect re-runs due to dependency changes. Prevents memory leaks from timers, subscriptions, and event listeners.',
    keyConcept: 'Always clean up side effects (timers, subscriptions, event listeners) by returning a cleanup function from useEffect.',
    xpReward: 10,
    tags: ['useEffect', 'cleanup', 'unmount', 'memory-leak'],
  },
  {
    id: 'react-15',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'medium',
    question: 'What is a dependency array issue in this code?',
    codeSnippet: `function Component({ userId }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(\`/api/user/\${userId}\`).then(r => r.json()).then(setData);\n  }, []); // userId not in deps\n}`,
    options: [
      'The effect runs too often',
      'If userId changes, the effect does not re-run — stale data is shown',
      'fetch is not allowed in useEffect',
      'No issue — empty array is always correct',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`userId` is used inside the effect but not listed in the dependency array. If the parent passes a new `userId`, the effect will NOT re-run, showing stale data for the old user. Fix: add `userId` to the dependency array.',
    keyConcept: 'All values from the component scope (props, state, functions) used inside an effect must be in the dependency array.',
    xpReward: 15,
    tags: ['useEffect', 'dependencies', 'stale-data', 'exhaustive-deps'],
  },
  {
    id: 'react-16',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'hard',
    question: 'How do you safely fetch data in useEffect without race conditions?',
    codeSnippet: `useEffect(() => {\n  let cancelled = false;\n  fetch(\`/api/data/\${id}\`)\n    .then(r => r.json())\n    .then(data => {\n      if (!cancelled) setData(data);\n    });\n  return () => { cancelled = true; };\n}, [id]);`,
    options: [
      'This is incorrect — fetch must be awaited with async/await',
      'The cancelled flag prevents setting state after the effect has been cleaned up, avoiding race conditions',
      'The cleanup should cancel the fetch, not set a flag',
      'This pattern causes memory leaks',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'When `id` changes rapidly, multiple fetch requests may be in flight. The first one to return may be for the old `id`. The `cancelled` flag ensures that if the effect is cleaned up (because `id` changed), stale responses are ignored.',
    keyConcept: 'Race condition fix: use a cancelled flag or AbortController to ignore stale responses in async effects.',
    xpReward: 25,
    tags: ['useEffect', 'race-condition', 'cleanup', 'async'],
  },

  // ─── useRef Hook ─────────────────────────────────────────────────────────
  {
    id: 'react-17',
    technology: 'react',
    topic: 'useRef Hook',
    difficulty: 'easy',
    question: 'What is a key difference between useRef and useState?',
    options: [
      'useRef can only store DOM nodes; useState can store any value',
      'Mutating a ref does NOT trigger a re-render; changing state does',
      'useState is synchronous; useRef is asynchronous',
      'useRef is only for function components; useState works everywhere',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useRef` returns a mutable ref object whose `.current` property persists for the lifetime of the component. Mutating `.current` does NOT cause a re-render. Use refs for values that need to persist without triggering re-renders (e.g., timer IDs, previous values, DOM nodes).',
    keyConcept: 'useRef: persists across renders, mutation does not re-render. useState: triggers re-render on update.',
    xpReward: 10,
    tags: ['useRef', 'useState', 're-render', 'refs'],
  },
  {
    id: 'react-18',
    technology: 'react',
    topic: 'useRef Hook',
    difficulty: 'medium',
    question: 'How do you focus an input on mount using useRef?',
    codeSnippet: `function SearchInput() {\n  const inputRef = useRef(null);\n  useEffect(() => {\n    inputRef.current.focus();\n  }, []);\n  return <input ref={inputRef} />;\n}`,
    options: [
      'This will throw — refs cannot access DOM methods',
      'Correct — ref.current points to the DOM node after mount, and focus() is called once',
      'inputRef.current is always null inside useEffect',
      'useRef must be initialized with the DOM node, not null',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'React sets `ref.current` to the DOM node after the component mounts. Inside `useEffect` with `[]`, the DOM is already available, so `inputRef.current.focus()` works correctly.',
    keyConcept: 'Refs are attached to DOM nodes after mount. Access them inside useEffect or event handlers, not during render.',
    xpReward: 10,
    tags: ['useRef', 'dom', 'focus', 'useEffect'],
  },

  // ─── useContext & Context API ─────────────────────────────────────────────
  {
    id: 'react-19',
    technology: 'react',
    topic: 'Context API',
    difficulty: 'easy',
    question: 'What problem does the Context API solve?',
    options: [
      'It speeds up rendering',
      'It solves prop drilling — passing data to deeply nested components without passing through every level',
      'It replaces useState for all state management',
      'It enables server-side rendering',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Prop drilling occurs when you need to pass data through many intermediate components that don\'t use the data themselves. Context provides a way to share values between components without passing props at every level.',
    keyConcept: 'Context solves prop drilling. Use it for global data: theme, locale, auth user. Not for frequently changing state.',
    xpReward: 5,
    tags: ['context', 'prop-drilling', 'useContext'],
  },
  {
    id: 'react-20',
    technology: 'react',
    topic: 'Context API',
    difficulty: 'medium',
    question: 'What is the correct way to consume context with hooks?',
    codeSnippet: `const ThemeContext = createContext("light");\n// In a child component:\nconst theme = useContext(ThemeContext);`,
    options: [
      'useContext(ThemeContext.Provider)',
      'useContext(ThemeContext)',
      'ThemeContext.consume()',
      'React.consumeContext(ThemeContext)',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useContext(Context)` takes the context object itself (not `.Provider`). It returns the current context value, which is determined by the nearest Provider above it in the component tree.',
    keyConcept: 'Pass the Context object to useContext(), not the Provider. The component re-renders whenever the context value changes.',
    xpReward: 10,
    tags: ['useContext', 'context', 'provider'],
  },
  {
    id: 'react-21',
    technology: 'react',
    topic: 'Context API',
    difficulty: 'hard',
    question: 'What is a performance concern with Context and how do you address it?',
    options: [
      'Context is slow because it uses the DOM',
      'All consumers re-render when the context value changes — even if they only use part of the value. Split contexts or memoize.',
      'Context cannot hold complex objects',
      'Context only works with class components',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'When context value changes, ALL components consuming that context re-render. If you store both user and theme in one context, a theme change re-renders components that only need user. Solution: split into multiple contexts, or use `useMemo` to stabilize the value.',
    keyConcept: 'Context re-renders all consumers on any value change. Split large contexts, memoize provider values to minimize re-renders.',
    xpReward: 20,
    tags: ['context', 'performance', 're-render', 'memoization'],
  },

  // ─── useMemo & useCallback ────────────────────────────────────────────────
  {
    id: 'react-22',
    technology: 'react',
    topic: 'useMemo & useCallback',
    difficulty: 'medium',
    question: 'What is the difference between useMemo and useCallback?',
    codeSnippet: `const value = useMemo(() => computeExpensive(a, b), [a, b]);\nconst fn = useCallback(() => doSomething(a), [a]);`,
    options: [
      'They are identical',
      'useMemo memoizes a computed value; useCallback memoizes a function reference',
      'useCallback memoizes a value; useMemo memoizes a function',
      'useMemo is for objects; useCallback is for arrays',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useMemo(() => fn(), deps)` caches the RETURN VALUE of the function. `useCallback(fn, deps)` caches the FUNCTION ITSELF. `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.',
    keyConcept: 'useMemo: cache values. useCallback: cache functions. Both re-compute when deps change.',
    xpReward: 15,
    tags: ['useMemo', 'useCallback', 'memoization', 'performance'],
  },
  {
    id: 'react-23',
    technology: 'react',
    topic: 'useMemo & useCallback',
    difficulty: 'hard',
    question: 'When should you NOT use useMemo?',
    options: [
      'When the computation is cheap — memoization itself has overhead and can make things slower',
      'When the component has state',
      'When used with Context',
      'useMemo should always be used for any computed value',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'useMemo has overhead: memory storage, dependency comparison on every render. For simple calculations (`a + b`, string formatting), this overhead may exceed the benefit. Only memoize genuinely expensive computations or to preserve referential equality for downstream React.memo components.',
    keyConcept: 'Premature memoization is harmful. Profile first. Only memoize expensive computations or to stabilize references.',
    xpReward: 20,
    tags: ['useMemo', 'performance', 'optimization', 'overhead'],
  },

  // ─── useReducer Hook ─────────────────────────────────────────────────────
  {
    id: 'react-24',
    technology: 'react',
    topic: 'useReducer Hook',
    difficulty: 'medium',
    question: 'When should you prefer useReducer over useState?',
    options: [
      'When state is a primitive (number, string)',
      'When state logic is complex, involves multiple sub-values, or next state depends on previous',
      'useReducer is always better than useState',
      'When you need async state updates',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useReducer` shines when state has complex transitions, multiple related sub-values, or when the next state depends on the previous in non-trivial ways. It also makes state logic easier to test in isolation.',
    keyConcept: 'useReducer: complex state logic. useState: simple, independent values. useReducer is like a local Redux.',
    xpReward: 15,
    tags: ['useReducer', 'useState', 'state-management'],
  },
  {
    id: 'react-25',
    technology: 'react',
    topic: 'useReducer Hook',
    difficulty: 'hard',
    question: 'What is the output of this useReducer dispatch?',
    codeSnippet: `const reducer = (state, action) => {\n  switch(action.type) {\n    case 'INC': return { count: state.count + 1 };\n    case 'DEC': return { count: state.count - 1 };\n    default: return state;\n  }\n};\nconst [state, dispatch] = useReducer(reducer, { count: 0 });\ndispatch({ type: 'INC' });\ndispatch({ type: 'INC' });\ndispatch({ type: 'DEC' });`,
    options: [
      '{ count: 0 }',
      '{ count: 1 }',
      '{ count: 2 }',
      '{ count: -1 }',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Three dispatches: INC (0→1), INC (1→2), DEC (2→1). After all dispatches resolve, count is 1. Each dispatch creates a new state object — reducers must be pure and return new objects.',
    keyConcept: 'Reducers must be pure functions. Return a new state object, never mutate the existing state.',
    xpReward: 15,
    tags: ['useReducer', 'dispatch', 'pure-reducer'],
  },

  // ─── Virtual DOM & Reconciliation ─────────────────────────────────────────
  {
    id: 'react-26',
    technology: 'react',
    topic: 'Virtual DOM',
    difficulty: 'easy',
    question: 'What is the Virtual DOM?',
    options: [
      'A faster version of the real DOM built into the browser',
      'A JavaScript object representation of the real DOM that React uses to batch and minimise DOM updates',
      'A shadow DOM element created for each component',
      'A database of all DOM nodes on the page',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'React keeps a lightweight copy of the DOM in memory (Virtual DOM). When state changes, React computes the difference (diffing) between the old and new Virtual DOM and applies only the minimum changes to the real DOM.',
    keyConcept: 'Virtual DOM enables efficient batched updates. React diffs the virtual tree, then patches only changed real DOM nodes.',
    xpReward: 5,
    tags: ['virtual-dom', 'reconciliation', 'diffing'],
  },
  {
    id: 'react-27',
    technology: 'react',
    topic: 'Virtual DOM',
    difficulty: 'medium',
    question: 'Why is using array index as a key problematic?',
    codeSnippet: `{items.map((item, index) => (\n  <li key={index}>{item.name}</li>\n))}`,
    options: [
      'Index keys are not allowed in React',
      'If items are added/removed/reordered, index keys cause incorrect reconciliation — React reuses wrong DOM nodes',
      'Index keys only work for static lists',
      'Performance is worse with index keys',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'If you delete the first item, all subsequent items shift indices. React sees the same keys but different content — it incorrectly reuses existing DOM nodes, causing bugs with inputs, animations, and component state.',
    keyConcept: 'Use stable unique IDs as keys. Index is only safe for static, never-reordered lists with no state.',
    xpReward: 15,
    tags: ['keys', 'reconciliation', 'lists', 'index-key'],
  },

  // ─── Conditional Rendering ────────────────────────────────────────────────
  {
    id: 'react-28',
    technology: 'react',
    topic: 'Conditional Rendering',
    difficulty: 'easy',
    question: 'Which pattern renders a component only when a condition is true?',
    codeSnippet: `{isLoggedIn && <Dashboard />}`,
    options: [
      'This is invalid JSX',
      'Short-circuit evaluation — renders <Dashboard /> only when isLoggedIn is true',
      'Always renders <Dashboard />',
      'Renders null when isLoggedIn is false and <Dashboard /> when true, but also renders "false" in the DOM',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'JavaScript\'s `&&` short-circuits: if the left side is truthy, it evaluates and returns the right side. React renders the result. When false, `&&` returns `false` which React does not render.',
    keyConcept: 'Use `{condition && <Component />}` for show/hide. Watch out: `{0 && <Comp />}` renders "0" because 0 is falsy but truthy for the string representation.',
    xpReward: 5,
    tags: ['conditional-rendering', 'short-circuit', 'jsx'],
  },
  {
    id: 'react-29',
    technology: 'react',
    topic: 'Conditional Rendering',
    difficulty: 'medium',
    question: 'What does this render when count is 0?',
    codeSnippet: `{count && <span>{count}</span>}`,
    options: ['Nothing', '<span>0</span>', 'The string "0" in the DOM (not wrapped in span)', 'null'],
    correctAnswer: [2],
    type: 'single',
    explanation: '`0 && anything` evaluates to `0` (falsy but not false). React renders `0` as a text node in the DOM. This is a common bug. Fix: use `{count > 0 && <span>{count}</span>}` or `{!!count && ...}` or a ternary.',
    keyConcept: 'Avoid `{number && <Comp />}` — 0 renders as text. Use ternary or `{count > 0 && ...}` instead.',
    xpReward: 15,
    tags: ['conditional-rendering', 'zero-bug', 'jsx', 'gotcha'],
  },

  // ─── Forms & Controlled Components ───────────────────────────────────────
  {
    id: 'react-30',
    technology: 'react',
    topic: 'Forms',
    difficulty: 'easy',
    question: 'What is a controlled component?',
    codeSnippet: `<input\n  value={name}\n  onChange={e => setName(e.target.value)}\n/>`,
    options: [
      'A component controlled by a parent component via props',
      'A form element whose value is controlled by React state',
      'A component with no local state',
      'A component that uses refs to read form values',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'A controlled component has its form data managed by React state. The input\'s value is always synchronized with state, and every change updates state via `onChange`. This makes React the "single source of truth".',
    keyConcept: 'Controlled: value from state, onChange updates state. Uncontrolled: value from DOM via ref. Controlled = React owns the data.',
    xpReward: 5,
    tags: ['forms', 'controlled-component', 'onChange'],
  },
  {
    id: 'react-31',
    technology: 'react',
    topic: 'Forms',
    difficulty: 'hard',
    question: 'What is the difference between controlled and uncontrolled components?',
    options: [
      'Controlled use state for values; uncontrolled use refs to read from DOM — uncontrolled is preferred',
      'Controlled use state, making React the source of truth — better for validation and dynamic forms. Uncontrolled use refs for simpler integrations.',
      'Uncontrolled components are always faster',
      'There is no practical difference',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Controlled components store form values in React state — giving you immediate access for validation, transformation, and conditional UI. Uncontrolled components let the DOM store values, accessed via refs — simpler for file inputs or integrating non-React libraries.',
    keyConcept: 'Controlled: React drives the value (state). Uncontrolled: DOM drives the value (ref). React recommends controlled for most cases.',
    xpReward: 15,
    tags: ['forms', 'controlled', 'uncontrolled', 'refs'],
  },

  // ─── Error Boundaries ─────────────────────────────────────────────────────
  {
    id: 'react-32',
    technology: 'react',
    topic: 'Error Boundaries',
    difficulty: 'medium',
    question: 'What is an Error Boundary?',
    options: [
      'A try/catch block inside a component',
      'A class component that catches JS errors in its child tree and renders a fallback UI',
      'A hook that catches async errors',
      'A way to suppress console errors',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Error Boundaries are class components that implement `componentDidCatch` and/or `getDerivedStateFromError`. They catch errors during rendering in the child component tree and display a fallback UI instead of crashing the whole app.',
    keyConcept: 'Error Boundaries must be class components. They do NOT catch errors in event handlers or async code — use try/catch for those.',
    xpReward: 15,
    tags: ['error-boundary', 'class-component', 'error-handling'],
  },

  // ─── Lazy Loading & Suspense ──────────────────────────────────────────────
  {
    id: 'react-33',
    technology: 'react',
    topic: 'Lazy Loading & Suspense',
    difficulty: 'medium',
    question: 'What does React.lazy() do?',
    codeSnippet: `const Dashboard = React.lazy(() => import('./Dashboard'));\n// Used with:\n<Suspense fallback={<Spinner />}>\n  <Dashboard />\n</Suspense>`,
    options: [
      'Renders a component only on user interaction',
      'Code-splits the component into a separate bundle, loaded only when rendered',
      'Makes the component render slower intentionally',
      'Suspends the entire app until the component loads',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`React.lazy()` enables code splitting. The component\'s code is loaded in a separate chunk only when it\'s first rendered. `<Suspense>` provides the fallback UI while loading. This reduces the initial bundle size.',
    keyConcept: 'React.lazy() + Suspense = automatic code splitting. Only load component code when needed.',
    xpReward: 15,
    tags: ['lazy-loading', 'suspense', 'code-splitting', 'performance'],
  },

  // ─── Higher-Order Components & Render Props ───────────────────────────────
  {
    id: 'react-34',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'hard',
    question: 'What is a Higher-Order Component (HOC)?',
    codeSnippet: `function withLogger(WrappedComponent) {\n  return function(props) {\n    console.log("Rendering:", WrappedComponent.name);\n    return <WrappedComponent {...props} />;\n  };\n}`,
    options: [
      'A component with more than one level of nesting',
      'A function that takes a component and returns an enhanced component',
      'A component that renders other components via children prop',
      'A component that uses all available hooks',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'A HOC is a function that takes a component and returns a new component with added behavior. It\'s a composition pattern for reusing component logic. Examples: React.memo, connect (Redux), withRouter.',
    keyConcept: 'HOC pattern: `const EnhancedComponent = hoc(WrappedComponent)`. Adds cross-cutting concerns (logging, auth, data fetching) without modifying original.',
    xpReward: 20,
    tags: ['hoc', 'higher-order-component', 'patterns', 'composition'],
  },

  // ─── React Router ─────────────────────────────────────────────────────────
  {
    id: 'react-35',
    technology: 'react',
    topic: 'React Router',
    difficulty: 'easy',
    question: 'What is the difference between <Link> and <a> in React Router?',
    options: [
      'They are identical',
      '<Link> uses client-side navigation (no full page reload); <a> causes a full page reload',
      '<a> uses client-side navigation; <Link> reloads the page',
      '<Link> can only link to external URLs',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`<Link>` in React Router uses the History API to navigate without reloading the page, preserving SPA behavior. A regular `<a>` tag triggers a full HTTP request and page reload.',
    keyConcept: 'Always use <Link> for internal navigation in React Router. Use <a> only for external links.',
    xpReward: 5,
    tags: ['react-router', 'Link', 'navigation', 'spa'],
  },
  {
    id: 'react-36',
    technology: 'react',
    topic: 'React Router',
    difficulty: 'medium',
    question: 'How do you access route parameters in React Router v6?',
    codeSnippet: `// Route: <Route path="/user/:id" element={<UserPage />} />\n// In UserPage:`,
    options: [
      'props.params.id',
      'const { id } = useParams()',
      'this.props.match.params.id',
      'router.params.id',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'React Router v6 uses the `useParams()` hook to access URL parameters. It returns an object of key/value pairs matching the dynamic segments in the route path.',
    keyConcept: 'React Router v6 hooks: useParams() for URL params, useNavigate() for programmatic navigation, useLocation() for current URL.',
    xpReward: 10,
    tags: ['react-router', 'useParams', 'routing', 'v6'],
  },

  // ─── Performance ──────────────────────────────────────────────────────────
  {
    id: 'react-37',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is the purpose of the key prop beyond list rendering?',
    codeSnippet: `// Force component remount on userId change:\n<UserProfile key={userId} userId={userId} />`,
    options: [
      'Keys only serve to optimise list rendering',
      'Changing the key forces React to unmount and remount the component, resetting all its state',
      'Keys improve performance for all components',
      'Keys prevent prop changes from triggering re-renders',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'When a component\'s key changes, React treats it as a completely different component — it unmounts the old one and mounts a new one. This is a useful technique to reset component state when switching between different entities (e.g., different user profiles).',
    keyConcept: 'Changing a component\'s key forces a full remount and state reset. Useful for resetting forms or clearing stale state.',
    xpReward: 20,
    tags: ['key-prop', 'remount', 'state-reset', 'performance'],
  },
  {
    id: 'react-38',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is the Fiber architecture in React?',
    options: [
      'A CSS framework for styling React components',
      'React\'s reconciliation algorithm reimplemented to support incremental rendering, prioritization, and pausing/resuming work',
      'A way to use Web Workers in React',
      'A state management library',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'React Fiber (introduced in React 16) is a rewrite of the reconciliation algorithm. It enables work to be split into chunks, paused, aborted, or reused. This powers Concurrent Mode, Suspense, time-slicing, and priority-based rendering.',
    keyConcept: 'Fiber enables incremental rendering. React can pause rendering to handle higher-priority updates (user input) before finishing lower-priority work.',
    xpReward: 25,
    tags: ['fiber', 'reconciliation', 'concurrent-mode', 'architecture'],
  },

  // ─── Hooks Rules ──────────────────────────────────────────────────────────
  {
    id: 'react-39',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'medium',
    question: 'Which of these violates the Rules of Hooks?',
    codeSnippet: `function Component({ isAdmin }) {\n  if (isAdmin) {\n    const [data, setData] = useState(null); // inside condition\n  }\n  return <div />;\n}`,
    options: [
      'Nothing is wrong',
      'Hooks must not be called conditionally — this breaks React\'s hook call order guarantee',
      'useState cannot be used with objects',
      'Hooks cannot be called in functional components',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'React relies on hooks being called in the same order on every render to map hook calls to internal state. Calling a hook inside a conditional or loop changes the call order, corrupting the internal state. Always call hooks at the top level of your component.',
    keyConcept: 'Rules of Hooks: (1) Only call at the top level. (2) Only call from React functions. These rules ensure stable hook ordering.',
    xpReward: 15,
    tags: ['hooks', 'rules-of-hooks', 'conditional', 'useState'],
  },

  // ─── State Management ─────────────────────────────────────────────────────
  {
    id: 'react-40',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'When should you reach for a global state library like Redux or Zustand?',
    options: [
      'Always — local state should never be used',
      'When state must be shared across many unrelated components, or when state transitions are complex enough to benefit from centralised management',
      'Only for authentication state',
      'Never — Context API is always sufficient',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Local state + Context handle most use cases. Reach for Redux/Zustand/Jotai when: state is shared across many distant components, you need complex state transitions, time-travel debugging, or middleware (e.g., logging, async actions with Redux Toolkit).',
    keyConcept: 'Prefer local state by default. Lift state up as needed. Global store only when prop drilling or Context falls short.',
    xpReward: 15,
    tags: ['redux', 'zustand', 'state-management', 'context'],
  },

  // ─── Portals ──────────────────────────────────────────────────────────────
  {
    id: 'react-41',
    technology: 'react',
    topic: 'Portals',
    difficulty: 'hard',
    question: 'What is a React Portal?',
    codeSnippet: `ReactDOM.createPortal(\n  <Modal />,\n  document.getElementById("modal-root")\n);`,
    options: [
      'A way to render components on the server',
      'A method to render a child into a different DOM node outside the parent component\'s DOM hierarchy',
      'A navigation utility in React Router',
      'A way to communicate between React apps',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'Portals allow rendering a component\'s output to a different DOM node (e.g., `document.body`) while keeping it logically inside the React component tree. Event bubbling still works through the React tree. Useful for modals, tooltips, and dropdowns that need to escape overflow:hidden parents.',
    keyConcept: 'Portals escape DOM parent constraints (overflow, z-index) while preserving React tree behavior (context, event bubbling).',
    xpReward: 20,
    tags: ['portals', 'modal', 'dom', 'advanced'],
  },

  // ─── Lifecycle (Class Components) ────────────────────────────────────────
  {
    id: 'react-42',
    technology: 'react',
    topic: 'Lifecycle',
    difficulty: 'medium',
    question: 'What is the useEffect equivalent of componentDidMount + componentWillUnmount?',
    codeSnippet: `useEffect(() => {\n  // setup code (componentDidMount)\n  return () => {\n    // cleanup code (componentWillUnmount)\n  };\n}, []);`,
    options: [
      'useEffect(() => {}, [deps])',
      'useEffect(() => { return cleanup; }, []) — empty deps = mount only, return fn = unmount cleanup',
      'useEffect(() => {})',
      'useLayoutEffect(() => {}, [])',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useEffect` with `[]` runs the setup after mount (like `componentDidMount`). The returned cleanup function runs on unmount (like `componentWillUnmount`).',
    keyConcept: 'Hook equivalents: componentDidMount → useEffect(fn, []). componentWillUnmount → return cleanup from useEffect. componentDidUpdate → useEffect(fn, [deps]).',
    xpReward: 10,
    tags: ['lifecycle', 'useEffect', 'componentDidMount', 'componentWillUnmount'],
  },
  {
    id: 'react-43',
    technology: 'react',
    topic: 'Lifecycle',
    difficulty: 'hard',
    question: 'What is useLayoutEffect and when should you use it over useEffect?',
    options: [
      'useLayoutEffect is deprecated; always use useEffect',
      'useLayoutEffect fires synchronously after DOM mutations but before browser paint — use when you need to read layout or prevent visual flicker',
      'useLayoutEffect runs before the component mounts',
      'useLayoutEffect is for server-side rendering only',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: '`useEffect` runs after the browser has painted. `useLayoutEffect` runs after DOM updates but BEFORE the browser paints. Use it when you need to read DOM layout (element dimensions) or apply DOM mutations that would cause flicker if delayed.',
    keyConcept: 'useLayoutEffect: synchronous, pre-paint. useEffect: asynchronous, post-paint. Prefer useEffect; use useLayoutEffect only for layout reads.',
    xpReward: 20,
    tags: ['useLayoutEffect', 'useEffect', 'paint', 'dom'],
  },

  // ─── Strict Mode ──────────────────────────────────────────────────────────
  {
    id: 'react-44',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'medium',
    question: 'Why does React StrictMode render components twice in development?',
    options: [
      'A bug in React',
      'To help detect side effects in render — double-invoking render + state initializers highlights impure code',
      'To improve performance by pre-rendering',
      'To verify that keys are unique',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'In StrictMode (development only), React intentionally double-invokes render functions and effects. This surfaces bugs in code that assumes renders happen once, helping you catch accidental side effects in render.',
    keyConcept: 'StrictMode double-render is development-only and intentional. If your component breaks on double render, it has impure side effects.',
    xpReward: 15,
    tags: ['strict-mode', 'development', 'side-effects', 'pure-render'],
  },
  {
    id: 'react-45',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'hard',
    question: 'What is the render prop pattern?',
    codeSnippet: `<Mouse render={(position) => (\n  <DisplayMouse position={position} />\n)} />`,
    options: [
      'A pattern where a component receives a function as a prop to control what is rendered',
      'A prop that determines which CSS class to render',
      'A prop that forces the component to re-render',
      'A prop that renders HTML directly without JSX',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The render prop pattern involves a component receiving a function (typically named "render" or "children") that returns JSX. The component calls this function with its state/data, allowing the parent to control rendering. This was a popular pattern before hooks for sharing stateful logic.',
    keyConcept: 'Render props share logic between components. Hooks are the modern replacement, but render props are still important for legacy code.',
    xpReward: 15,
    tags: ['render-props', 'patterns', 'composition'],
  },
  {
    id: 'react-46',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is the Profiler API and how do you use it?',
    codeSnippet: `<Profiler id="Navigation" onRender={callback}>\n  <Navigation />\n</Profiler>`,
    options: [
      'A development tool that measures how often components render and the cost of each render',
      'A production-only performance optimizer that caches components',
      'A CSS profiler for styling performance',
      'A code profiler for measuring bundle size',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Profiler is a React component that measures rendering performance of its subtree. The onRender callback receives: id, phase (mount/update), actualDuration, baseDuration, startTime, commitTime, and interactions. Use it in development to find expensive renders, but remove in production.',
    keyConcept: 'Profiler measures render times. Use to identify expensive re-renders. Disable in production as it adds overhead.',
    xpReward: 15,
    tags: ['profiler', 'performance', 'dev-tools'],
  },
  {
    id: 'react-47',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useDeferredValue hook?',
    options: [
      'Lets you defer re-rendering a non-urgent part of the UI, keeping the UI responsive during heavy updates',
      'Defers the execution of a function by a specified delay',
      'Delays the initial render of a component',
      'Defers fetching data until after the initial render',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'useDeferredValue (React 18+) lets you mark a state update as low priority. The UI shows the old value until the new value finishes rendering. Used with heavy computations or large lists where you want the UI to stay responsive. Similar to debouncing but integrated with React\'s scheduling.',
    keyConcept: 'useDeferredValue: low priority re-render. useTransition: marking state updates as transitions. Both prevent UI blocking.',
    xpReward: 15,
    tags: ['useDeferredValue', 'hooks', 'concurrent', 'performance'],
  },
  {
    id: 'react-48',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What does the useTransition hook do?',
    options: [
      'Marks a state update as a transition so React can interrupt it for more urgent updates (like user input)',
      'Animates state changes with a transition effect',
      'Transitions between different components smoothly',
      'Migrates state between different contexts',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'useTransition returns [isPending, startTransition]. Wrapping state updates in startTransition tells React they can be interrupted by more urgent updates (like typing). React may show the old UI until the transition completes. This keeps the UI responsive during expensive re-renders.',
    keyConcept: 'useTransition: mark non-urgent updates. isPending: show loading state during transition. Key for responsive UIs with heavy work.',
    xpReward: 15,
    tags: ['useTransition', 'hooks', 'concurrent', 'isPending'],
  },
  {
    id: 'react-49',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is the difference between Redux and Zustand?',
    options: [
      'Redux enforces strict patterns (actions, reducers, store); Zustand is a simpler, hook-based store with less boilerplate',
      'Redux is hook-based; Zustand uses class components',
      'Redux is for React only; Zustand works with any framework',
      'They are identical in API and patterns',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Redux requires actions, reducers, dispatch, and a central store with middleware (thunk, saga). Zustand provides a minimal hook-based API where you create a store with a simple function — no providers, no reducers, no boilerplate. Both are valid; Zustand is preferred for simpler apps, Redux for complex state with middleware needs.',
    keyConcept: 'Redux: structured, middleware, DevTools. Zustand: minimal, hook-based, no boilerplate. Both solve similar problems differently.',
    xpReward: 10,
    tags: ['redux', 'zustand', 'state-management', 'comparison'],
  },
  {
    id: 'react-50',
    technology: 'react',
    topic: 'Forms',
    difficulty: 'hard',
    question: 'What is the purpose of React Hook Form and why use it over plain React forms?',
    options: [
      'Reduces re-renders by using uncontrolled inputs with ref-based registration, improving form performance',
      'Replaces useState entirely with a new state management pattern',
      'Provides pre-built form components with built-in styling',
      'Transforms controlled components into uncontrolled ones automatically',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Hook Form minimizes re-renders by using uncontrolled inputs (register returns ref-based inputs). Validation errors are isolated to individual fields, so typing in one field does not re-render others. It integrates with Zod/Yup schemas for validation and reduces the boilerplate of managing form state manually.',
    keyConcept: 'React Hook Form: uncontrolled by default, minimal re-renders, schema validation integration. Use for complex forms with many fields.',
    xpReward: 15,
    tags: ['forms', 'react-hook-form', 'performance', 'validation'],
  },

  // ─── Additional Questions (react-51 to react-80) ───
  {
    id: 'react-51',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useId hook used for?',
    options: [
      'Generates a unique ID string for accessibility attributes, avoiding hydration mismatches',
      'Generates a new unique ID on every render',
      'Creates a global ID for the application',
      'Generates sequential IDs for list items',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useId()` (React 18+) generates a unique, stable ID that is consistent across server and client rendering, preventing hydration mismatches. Use for: `htmlFor`/`id` pairing in forms, `aria-labelledby`, `aria-describedby`. Do not use for list keys — use data IDs instead.',
    keyConcept: 'useId: unique IDs for a11y. Stable across SSR. Not for keys. Replaces ad-hoc ID generation (Math.random).',
    xpReward: 10,
    tags: ['hooks', 'useId', 'accessibility', 'ssr'],
  },
  {
    id: 'react-52',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useSyncExternalStore hook?',
    codeSnippet: `import { useSyncExternalStore } from "react"

function useOnlineStatus() {
  return useSyncExternalStore(
    callback => {
      window.addEventListener("online", callback)
      window.addEventListener("offline", callback)
      return () => {
        window.removeEventListener("online", callback)
        window.removeEventListener("offline", callback)
      }
    },
    () => navigator.onLine,  // client snapshot
    () => true  // server snapshot (always online on server)
  )
}`,
    options: [
      'Subscribes to an external store and returns its value — ensures tear-free reads for concurrent rendering',
      'Syncs state with an external API',
      'Creates a synchronous state update',
      'Syncs component state with localStorage',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useSyncExternalStore` (React 18+) lets you read from external stores (Redux, Zustand, browser APIs) safely during concurrent rendering. It prevents "tearing" where different parts of the UI see different values. Use for: subscribing to browser APIs, third-party state managers, or any mutable external source.',
    keyConcept: 'useSyncExternalStore: safe external store reads. Prevents tearing. Use for browser APIs (online, innerWidth) and state libraries.',
    xpReward: 15,
    tags: ['hooks', 'useSyncExternalStore', 'concurrent', 'tearing'],
  },
  {
    id: 'react-53',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useInsertionEffect hook?',
    options: [
      'Fires synchronously before DOM mutations — specifically for injecting CSS-in-JS styles',
      'Same as useEffect but runs after DOM paint',
      'Inserts elements into the DOM',
      'Inserts code into the component for debugging',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useInsertionEffect` (React 18+) runs synchronously before any DOM mutations. It is designed for CSS-in-JS libraries to inject styles before the browser paints. Unlike `useLayoutEffect`, it does not have access to refs or the DOM. Do NOT use it for data fetching or event handlers.',
    keyConcept: 'useInsertionEffect: for CSS-in-JS libraries only. Runs before DOM mutations. No ref/DOM access. Pre-paint.',
    xpReward: 15,
    tags: ['hooks', 'useInsertionEffect', 'css-in-js', 'performance'],
  },
  {
    id: 'react-54',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'hard',
    question: 'What is Concurrent Mode in React 18?',
    options: [
      'A set of features that allows React to interrupt rendering to handle higher-priority updates, keeping the UI responsive',
      'A mode where multiple React instances run concurrently',
      'A mode that renders components in parallel threads',
      'A mode that runs state updates simultaneously',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Concurrent Mode (React 18) is not a mode you opt into — it is a new behind-the-scenes mechanism enabling interruptible rendering. When an urgent update (user input) comes in, React can pause non-urgent work (rendering a large list), process the urgent update, then resume. Enabled by `createRoot()` and features like `useTransition`, `useDeferredValue`, and Suspense.',
    keyConcept: 'Concurrent features: interruptible rendering, priority-based updates, Suspense. Enabled by createRoot. Keeps UI responsive.',
    xpReward: 20,
    tags: ['concurrent', 'react18', 'suspense', 'transition'],
  },
  {
    id: 'react-55',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'medium',
    question: 'What is the difference between createRoot and ReactDOM.render?',
    options: [
      'createRoot (React 18+) enables all concurrent features. ReactDOM.render (React 17) uses legacy mode without concurrent features.',
      'ReactDOM.render is the new API; createRoot is legacy',
      'They are identical — just different function names',
      'createRoot is for server-side rendering only',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`createRoot(rootElement).render(<App />)` enables React 18 concurrent features (automatic batching, transitions, Suspense improvements). `ReactDOM.render(<App />, rootElement)` is the legacy API (React 17) — it still works but does not enable concurrent features. React 18 deprecates `ReactDOM.render` with a warning.',
    keyConcept: 'createRoot: React 18 concurrent features. ReactDOM.render: legacy, no concurrent. Migrate to createRoot.',
    xpReward: 10,
    tags: ['react18', 'createroot', 'reactdom', 'concurrent'],
  },
  {
    id: 'react-56',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'medium',
    question: 'What is automatic batching in React 18?',
    options: [
      'Multiple state updates are automatically batched into a single re-render, even in timeouts, promises, and event handlers',
      'State updates are never batched in React 18',
      'Only event handlers batch state updates in React 18',
      'Batching must be manually configured with flushSync',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React 18 automatically batches all state updates — in event handlers, timeouts, Promises, and native events. Previously (React 17), only event handlers were batched. Use `flushSync` to opt out of batching when you need immediate DOM reads after an update. Automatic batching reduces unnecessary re-renders.',
    keyConcept: 'Auto-batching: all state updates grouped into one re-render. flushSync: opt out of batching (rarely needed).',
    xpReward: 10,
    tags: ['react18', 'batching', 'performance', 'flushSync'],
  },
  {
    id: 'react-57',
    technology: 'react',
    topic: 'Forms',
    difficulty: 'medium',
    question: 'What is the purpose of the key prop on an input element?',
    codeSnippet: `// Force input reset when userId changes:
<form key={userId}>
  <input name="email" defaultValue={user.email} />
</form>`,
    options: [
      'Changing the key forces React to unmount/remount the element, resetting its state — useful for form resets',
      'Key uniquely identifies the input for form submission',
      'Key controls the tab order of form elements',
      'Key is ignored on form elements',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When the key of a component changes, React destroys the old instance and creates a new one — resetting all state. This is useful for: resetting form fields when switching between different entities, resetting uncontrolled inputs, and forcing re-initialization of child component state.',
    keyConcept: 'Key change = remount = state reset. Useful for forms, uncontrolled inputs, and re-initialization.',
    xpReward: 10,
    tags: ['forms', 'key', 'remount', 'state-reset'],
  },
  {
    id: 'react-58',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is virtual scrolling and when should you use it?',
    codeSnippet: `// Using react-window for virtual scrolling:
import { FixedSizeList } from "react-window"

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}>
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  )
}`,
    options: [
      'Rendering only the visible items in a scrollable list — essential for lists with thousands of items',
      'Scrolling through a virtual DOM representation',
      'A CSS technique for smooth scrolling',
      'Rendering items one by one with a delay',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Virtual scrolling (windowing) renders only the items currently visible in the viewport, plus a small buffer. It uses absolute positioning to maintain correct scroll dimensions. Without it, rendering 10,000 items would create 10,000 DOM nodes. Libraries: react-window, react-virtualized, TanStack Virtual. Use when list size exceeds ~500 items.',
    keyConcept: 'Virtual scroll: render only visible items. Libraries: react-window, TanStack Virtual. Critical for large lists.',
    xpReward: 15,
    tags: ['performance', 'virtual-scroll', 'windowing', 'large-lists'],
  },
  {
    id: 'react-59',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'hard',
    question: 'What is the compound components pattern?',
    codeSnippet: `function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.Tab = function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  return (
    <button onClick={() => setActiveIndex(index)}>
      {children}
    </button>
  )
}

Tabs.Panel = function Panel({ index, children }) {
  const { activeIndex } = useContext(TabsContext)
  return activeIndex === index ? <div>{children}</div> : null
}

// Usage:
<Tabs>
  <Tabs.Tab index={0}>Profile</Tabs.Tab>
  <Tabs.Tab index={1}>Settings</Tabs.Tab>
  <Tabs.Panel index={0}>Profile content</Tabs.Panel>
  <Tabs.Panel index={1}>Settings content</Tabs.Panel>
</Tabs>`,
    options: [
      'A pattern where multiple components share implicit state via context, enabling expressive and declarative APIs',
      'A pattern that compounds multiple components into one',
      'A pattern for combining reducers',
      'A pattern for optimizing render performance',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Compound components share implicit state through Context. Parent creates the state and provides it to children via context. Children access shared state without prop drilling. Examples: `<Tabs>` + `<Tab>` + `<Panel>`, `<Select>` + `<Option>`, `<Menu>` + `<MenuItem>`. Benefits: declarative API, implicit state management, flexible composition.',
    keyConcept: 'Compound components: shared context, expressive API. Used in: select menus, tabs, accordions. Combine with Context.',
    xpReward: 15,
    tags: ['patterns', 'compound-components', 'context'],
  },
  {
    id: 'react-60',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'hard',
    question: 'What is the state reducer pattern?',
    codeSnippet: `function useToggle({ reducer = (state, action) => action } = {}) {
  const [state, dispatch] = useReducer(
    (state, action) => reducer(state, action),
    { on: false }
  )
  const toggle = () => dispatch(state => ({ on: !state.on }))
  return { on: state.on, toggle }
}

// Consumer can override behavior:
function App() {
  const { on, toggle } = useToggle({
    reducer: (state, action) => {
      if (action.on === true) {
        return { on: false }  // prevent turning on
      }
      return action
    }
  })
}`,
    options: [
      'A pattern that exposes the internal reducer so consumers can override state transitions — giving them control',
      'A pattern that creates a state management store',
      'A pattern for reducing component size',
      'A pattern for reducing bundle size',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The state reducer pattern (popularized by Kent C. Dodds) inverts control by allowing consumers to override state transitions. The hook accepts a reducer function that wraps the internal reducer. This enables consumers to: intercept state changes, add validation, prevent certain transitions — all without modifying the hook.',
    keyConcept: 'State reducer: invert control of state transitions. Consumers can override/add logic. Flexible and extensible pattern.',
    xpReward: 20,
    tags: ['patterns', 'state-reducer', 'inversion', 'useReducer'],
  },
  {
    id: 'react-61',
    technology: 'react',
    topic: 'React Router',
    difficulty: 'medium',
    question: 'How does React Router v6 handle nested routes?',
    codeSnippet: `// Parent route defines layout with <Outlet>
<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
  <Route path="users" element={<Users />} />
</Route>

function DashboardLayout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />  {/* Child route renders here */}
    </div>
  )
}`,
    options: [
      'Use `<Outlet>` in parent layout — child route components render at the Outlet position',
      'Nested routes are not supported in v6',
      'Use {props.children} for nested route rendering',
      'Nested routes render side by side',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Router v6 uses `<Outlet>` for nested routes. The parent layout component renders `<Outlet />` where child routes appear. The `<Route index>` matches the parent URL exactly. Benefits: layouts are composable, less prop drilling (shared layout owns the state). Use `<Outlet context={...}>` to pass data to children.',
    keyConcept: '<Outlet>: nested route rendering. index: default child. Relative links work with nested routes. Context passing via Outlet.',
    xpReward: 10,
    tags: ['react-router', 'nested-routes', 'outlet', 'v6'],
  },
  {
    id: 'react-62',
    technology: 'react',
    topic: 'React Router',
    difficulty: 'medium',
    question: 'What is the useNavigate hook?',
    options: [
      'Returns a function to programmatically navigate to different routes — replaces history.push() from v5',
      'Returns the current URL location',
      'Returns the navigation state object',
      'Automatically navigates after component mount',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useNavigate()` returns a navigate function: `navigate("/users")` (push), `navigate("/users", { replace: true })` (replace), `navigate(-1)` (go back). It replaces `history.push()`/`history.replace()` from v5. Use for: programmatic navigation after form submission, redirects, and link clicks.',
    keyConcept: 'useNavigate: programmatic navigation. navigate(path): push. navigate(path, {replace}): replace. navigate(-1): go back.',
    xpReward: 10,
    tags: ['react-router', 'useNavigate', 'navigation'],
  },
  {
    id: 'react-63',
    technology: 'react',
    topic: 'React Router',
    difficulty: 'medium',
    question: 'What is the useLocation hook?',
    options: [
      'Returns the current location object with pathname, search, hash, state, and key properties',
      'Updates the current URL location',
      'Listens for location changes',
      'Returns a history of visited locations',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useLocation()` returns the current location: `{ pathname, search, hash, state, key }`. Use for: reading URL search params (`new URLSearchParams(location.search)`), conditionally rendering based on current route, tracking page views for analytics. Component re-renders when the location changes.',
    keyConcept: 'useLocation: current URL. pathname, search, hash. Use for analytics, conditional rendering, reading query params.',
    xpReward: 10,
    tags: ['react-router', 'useLocation', 'url'],
  },
  {
    id: 'react-64',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'hard',
    question: 'What is Jotai and how does it differ from Zustand?',
    options: [
      'Jotai uses atomic state (individual atoms) with a Recoil-like API; Zustand uses a single store with a hook-based API',
      'Jotai is a CSS-in-JS library; Zustand is a state manager',
      'Jotai is for class components; Zustand is for function components',
      'They are identical — just different package names',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Jotai: atomic state model — each piece of state is an independent atom. Atoms can derive from other atoms. No Provider needed (by default). Zustand: single store with setState/getState. Both are simpler alternatives to Redux. Jotai is better for fine-grained subscriptions, Zustand for centralized state with actions.',
    keyConcept: 'Jotai: atomic state, no Provider. Zustand: single store. Choose Jotai for independent state pieces, Zustand for centralized state.',
    xpReward: 10,
    tags: ['jotai', 'zustand', 'state-management', 'comparison'],
  },
  {
    id: 'react-65',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is TanStack Query (React Query) used for?',
    codeSnippet: `import { useQuery } from "@tanstack/react-query"

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  })

  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <div>{data.name}</div>
}`,
    options: [
      'Server state management library — handles caching, background refetching, pagination, and optimistic updates',
      'A SQL query builder for React',
      'A database management tool for React',
      'A GraphQL client for React',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'TanStack Query (React Query) manages server state (data from APIs). Features: automatic caching, background refetching, stale-while-revalidate, pagination (infinite queries), optimistic updates, request deduplication, retry logic, and DevTools. Eliminates manual useEffect + useState for data fetching. Replaces Redux for server state.',
    keyConcept: 'React Query: server state management. Cache, background refetch, pagination. Reduces boilerplate vs useEffect + useState.',
    xpReward: 15,
    tags: ['state-management', 'react-query', 'tanstack-query', 'caching'],
  },
  {
    id: 'react-66',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is the difference between client state and server state?',
    options: [
      'Client state: UI-specific (modals, form inputs, theme). Server state: persisted on server (API data, DB records) — needs caching and syncing.',
      'Client state is stored in a database; server state is in the browser',
      'Client state is for backend; server state is for frontend',
      'They are the same concept with different locations',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: 'Client state: local UI concerns — modal open/close, dropdown selection, theme, form state. Server state: data from APIs — user profiles, product listings, messages. Server state requires: loading/error states, caching, stale data handling, background updates, optimistic mutations. Use React Query or Zustand for server state, useState/Context for client state.',
    keyConcept: 'Client state: UI (useState/Context). Server state: API data (React Query, Zustand). Different tools for different state types.',
    xpReward: 10,
    tags: ['state-management', 'client-state', 'server-state'],
  },
  {
    id: 'react-67',
    technology: 'react',
    topic: 'Testing',
    difficulty: 'medium',
    question: 'How do you test React components with React Testing Library?',
    codeSnippet: `import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "./Counter"

test("increments counter", async () => {
  render(<Counter />)
  const button = screen.getByRole("button", { name: /increment/i })
  await userEvent.click(button)
  expect(screen.getByText("1")).toBeInTheDocument()
})`,
    options: [
      'Render components, query by accessible roles/text, fire events, assert on rendered output — test behavior, not implementation',
      'Test component implementation details like state and props',
      'Render components in a real browser',
      'Test by matching component class names',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Testing Library encourages testing by user behavior (accessible roles, text) rather than implementation (state, props, class names). Key principles: (1) query by accessibility (getByRole, getByText, getByLabelText), (2) fire events with userEvent (more realistic than fireEvent), (3) assert with jest-dom matchers (toBeInTheDocument, toHaveTextContent).',
    keyConcept: 'RTL: test behavior, not implementation. Query by role/text. userEvent: realistic interactions. jest-dom: accessible matchers.',
    xpReward: 15,
    tags: ['testing', 'react-testing-library', 'jest', 'userEvent'],
  },
  {
    id: 'react-68',
    technology: 'react',
    topic: 'Testing',
    difficulty: 'hard',
    question: 'What is the act() function in React testing?',
    options: [
      'A test utility that ensures all state updates and effects are flushed before assertions — React Testing Library wraps it automatically',
      'A function that acts like a real user interaction',
      'A helper that simulates browser actions',
      'A function that activates component lifecycle',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`act()` wraps code that causes React state updates in tests, ensuring all updates are applied and flushed to the DOM before assertions. React Testing Library renders, fireEvent, and userEvent are all wrapped in act() automatically. You only need direct act() when using ReactDOM.render or manipulating refs directly in tests.',
    keyConcept: 'act(): flush state updates in tests. RTL wraps automatically. Direct act() only for advanced use cases.',
    xpReward: 10,
    tags: ['testing', 'act', 'react-testing-library', 'state-updates'],
  },
  {
    id: 'react-69',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is code splitting and how does React support it?',
    codeSnippet: `import { lazy, Suspense } from "react"

const Dashboard = lazy(() => import("./Dashboard"))
const Settings = lazy(() => import("./Settings"))

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}`,
    options: [
      'Splitting the bundle into smaller chunks loaded on demand — React.lazy + Suspense enables per-route code splitting',
      'Splitting code into multiple files for better organization',
      'Splitting a component into smaller sub-components',
      'A Webpack optimization that minifies code automatically',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Code splitting: dynamic import() creates a separate bundle chunk. `React.lazy()` wraps the dynamic import, and `<Suspense>` provides the fallback UI during loading. Best practice: split by route (each page loads only its code). Webpack/Rollup auto-generate chunk names. Measure with Lighthouse bundle analysis.',
    keyConcept: 'React.lazy + Suspense: route-based code splitting. Reduces initial bundle size. Fallback UI during chunk load.',
    xpReward: 10,
    tags: ['performance', 'code-splitting', 'lazy', 'suspense'],
  },
  {
    id: 'react-70',
    technology: 'react',
    topic: 'Performance',
    difficulty: 'hard',
    question: 'What is the Children pattern for avoiding re-renders?',
    codeSnippet: `function SlowComponent() {
  console.log("Slow component rendered")
  return <div>I am slow to render</div>
}

function Parent({ children }) {
  const [count, setCount] = useState(0)
  // Parent re-renders, but children prop is stable
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {children}  {/* SlowComponent does NOT re-render */}
    </div>
  )
}

function App() {
  return (
    <Parent>
      <SlowComponent />
    </Parent>
  )
}`,
    options: [
      'Passing components as children prevents them from re-rendering when the parent re-renders — the JSX is created once',
      'Children always re-render when parent re-renders',
      'Children pattern is only for layout components',
      'Children pattern is deprecated in React 18',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'A powerful optimisation: when JSX is passed as `children` (or any prop), it is created by the parent component (`App`). When `Parent` re-renders, the children prop reference stays the same — `SlowComponent` does not re-render. This avoids React.memo for specific scenarios. Works because the child JSX is created in the parent, not inside the re-rendering component.',
    keyConcept: 'Children as props optimisation: create JSX in parent, pass to child. The child re-renders, but the JSX prop stays stable.',
    xpReward: 20,
    tags: ['performance', 'children', 're-render', 'optimization'],
  },
  {
    id: 'react-71',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useDebugValue hook?',
    options: [
      'Displays a label for custom hooks in React DevTools — helps debug hook state without extra console.logs',
      'Logs debug information to the console',
      'Enables debugging in production builds',
      'Shows the component tree in DevTools',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useDebugValue(value, formatterFn)` adds a label to custom hooks in React DevTools. It only shows when DevTools is open and the hook is selected. The optional formatter delays expensive formatting. Use for libraries and shared custom hooks — not needed for one-off hooks in your own app.',
    keyConcept: 'useDebugValue: DevTools label for custom hooks. formatter: lazy formatting. Use for shared/reusable hooks.',
    xpReward: 5,
    tags: ['hooks', 'debugging', 'devtools'],
  },
  {
    id: 'react-72',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'easy',
    question: 'Why can\'t hooks be called inside conditions or loops?',
    options: [
      'React relies on the order of hook calls across renders — conditional hooks break the order, corrupting internal state',
      'JavaScript does not allow functions inside conditions',
      'Hooks must be called synchronously',
      'Conditions and loops cannot contain any React code',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React tracks hooks by their call order (a linked list). On each render, hooks must be called in exactly the same order. Calling a hook inside a condition would change the order on subsequent renders, causing React to misidentify which hook corresponds to which state. This is the Rule of Hooks: only call hooks at the top level of your component.',
    keyConcept: 'Rules of Hooks: top level only, no conditions/loops. Call order must be consistent across renders.',
    xpReward: 10,
    tags: ['hooks', 'rules-of-hooks', 'top-level'],
  },
  {
    id: 'react-73',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'hard',
    question: 'What is the controlled vs uncontrolled pattern for a custom component?',
    codeSnippet: `// Uncontrolled (internal state):
function UncontrolledInput() {
  const [value, setValue] = useState("")
  return <input value={value} onChange={e => setValue(e.target.value)} />
}

// Controlled (state lifted to parent):
function ControlledInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />
}`,
    options: [
      'Uncontrolled: component manages its own state (defaultValue). Controlled: parent manages state via value + onChange.',
      'Controlled: component manages its own state. Uncontrolled: parent manages state.',
      'Uncontrolled components do not use state',
      'Controlled components are always better',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: 'An uncontrolled component manages its own state internally (simpler API). A controlled component exposes `value` and `onChange` so the parent controls state — enabling validation, transformation, and sync with other components. Many libraries support both patterns (e.g., React Hook Form uses uncontrolled by default for performance).',
    keyConcept: 'Uncontrolled: internal state, simpler. Controlled: parent state, more flexible. Support both via value/onChange pattern.',
    xpReward: 15,
    tags: ['patterns', 'controlled', 'uncontrolled', 'component-design'],
  },
  {
    id: 'react-74',
    technology: 'react',
    topic: 'Patterns',
    difficulty: 'medium',
    question: 'What is the proxy component pattern?',
    codeSnippet: `// Redesign by proxy — enhance an existing component
function EnhancedButton({ variant, ...props }) {
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
  }
  return (
    <button
      className={variant ? variants[variant] : ""}
      {...props}
    />
  )
}`,
    options: [
      'A component that wraps an existing component and adds/modifies its behaviour — design by proxy',
      'A component that acts as a proxy for API requests',
      'A component that proxies data between parent and child',
      'A component that creates a network proxy server',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Proxy components wrap existing native elements or library components to add application-specific defaults, styles, or behavior. Benefits: (1) single source of truth for component styles/behavior, (2) easy to change globally, (3) encapsulate library specifics. Common in component libraries built on top of UI kits.',
    keyConcept: 'Proxy component: wrap + customize. Single source of truth for design system components. Encapsulate third-party library details.',
    xpReward: 10,
    tags: ['patterns', 'proxy-component', 'encapsulation'],
  },
  {
    id: 'react-75',
    technology: 'react',
    topic: 'Components',
    difficulty: 'medium',
    question: 'What is the difference between a pure component and a regular component?',
    options: [
      'Pure component implements shouldComponentUpdate with shallow prop/state comparison — skips re-renders when props are the same',
      'Pure component is faster because it uses a different rendering mechanism',
      'Pure component cannot have state or use hooks',
      'Regular component is a pure function; pure component is a class',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In class components, `React.PureComponent` does shallow comparison of props and state in shouldComponentUpdate. If props have not changed (shallow), the component skips re-rendering. In functional components, use `React.memo` for the same effect. Shallow comparison means: primitive === check, reference check for objects. Mutation inside objects will NOT be detected.',
    keyConcept: 'PureComponent/React.memo: shallow comparison → skip re-render. Mutation inside objects breaks shallow comparison.',
    xpReward: 10,
    tags: ['components', 'pure-component', 'react.memo', 'performance'],
  },
  {
    id: 'react-76',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'hard',
    question: 'What is the difference between Server Components and Client Components in React 19?',
    options: [
      'Server Components render on the server, have no state/effects, reduce bundle size. Client Components are interactive with state and effects.',
      'Client Components render on the server; Server Components render in the browser',
      'Server Components are for API calls; Client Components are for UI',
      'They are the same — just different naming conventions',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: 'React Server Components (RSC) run exclusively on the server — they can access databases, file systems directly, and send only HTML/JSON to the client. They cannot use state, effects, or event handlers. Client Components are the traditional React components with full interactivity. Use Server Components by default for data fetching, Client Components only when interactivity is needed. The "use client" directive marks a component as a Client Component.',
    keyConcept: 'Server Components: server-only, zero JS bundle, direct data access. Client Components: interactive, state, effects. Use server by default.',
    xpReward: 20,
    tags: ['react19', 'server-components', 'rsc', 'client-components'],
  },
  {
    id: 'react-77',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'hard',
    question: 'What is the `use` hook in React 19?',
    codeSnippet: `import { use } from "react"

function Comments({ commentsPromise }) {
  // use() can be called inside conditions and loops!
  const comments = use(commentsPromise)
  return <div>{comments.map(c => <p key={c.id}>{c.text}</p>)}</div>
}

// Also works with Context:
function ThemeButton() {
  const theme = use(ThemeContext)  // Like useContext but callable anywhere
  return <button className={theme}>Click</button>
}`,
    options: [
      'A new hook that unwraps Promises and Context — can be called conditionally, unlike other hooks',
      'A hook that imports components dynamically',
      'A hook that creates reusable utility functions',
      'A hook that accesses browser APIs',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The `use` hook (React 19) unwraps Promises (similar to `await`) and reads Context (similar to `useContext`). Unlike other hooks, `use` can be called inside conditions and loops — it is not subject to the Rules of Hooks. Use with `<Suspense>` for Promise resolution. Use for: reading context conditionally, integrating with streaming data.',
    keyConcept: 'use: unwrap Promise/Context. Callable anywhere (conditions, loops). Not subject to Rules of Hooks. Works with Suspense.',
    xpReward: 15,
    tags: ['react19', 'use', 'promises', 'context'],
  },
  {
    id: 'react-78',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'hard',
    question: 'What is the useOptimistic hook in React 19?',
    codeSnippet: `import { useOptimistic } from "react"

function MessageForm({ sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }]
  )

  async function handleSubmit(formData) {
    const message = formData.get("message")
    addOptimisticMessage(message)  // Show immediately
    await sendMessage(message)  // Actual API call
  }
}`,
    options: [
      'Shows the expected result immediately while the async operation is in progress — automatically reverts on failure',
      'Optimizes state updates for better performance',
      'Creates optimistic state loading for data fetching',
      'Optimizes bundle size by removing unused state',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: '`useOptimistic` (React 19) enables optimistic UI updates — show the expected result immediately while the async mutation is in flight. If the mutation succeeds, the optimistic state is kept. If it fails, it automatically reverts to the original state. Uses `startTransition` under the hood. Perfect for: likes, comments, messages, form submissions.',
    keyConcept: 'useOptimistic: instant UI update, auto-revert on failure. Use with server actions/async mutations. Improves perceived performance.',
    xpReward: 15,
    tags: ['react19', 'useOptimistic', 'optimistic-ui', 'mutations'],
  },
  {
    id: 'react-79',
    technology: 'react',
    topic: 'React Internals',
    difficulty: 'medium',
    question: 'What is the useActionState hook?',
    options: [
      'Manages form state and actions — returns the latest form data and pending state from a form action',
      'An action dispatcher for component state',
      'A hook for managing browser action history',
      'A hook for creating action animations',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: '`useActionState` (React 19) manages form state elegantly. It works with `<form action={...}>` and returns: `[state, formAction, isPending]`. The action receives the previous state and form data, returning the new state. Handles form validation, error messages, and pending states without manual state management.',
    keyConcept: 'useActionState: form state management. [state, action, isPending]. Works with form action attribute. Built-in pending state.',
    xpReward: 15,
    tags: ['react19', 'useActionState', 'forms', 'actions'],
  },
  {
    id: 'react-80',
    technology: 'react',
    topic: 'Hooks',
    difficulty: 'hard',
    question: 'What is the useEvent hook (experimental)?',
    options: [
      'Creates a stable function reference that always calls the latest callback — avoids stale closures without adding dependencies',
      'An event listener hook for DOM events',
      'A hook that creates custom DOM events',
      'A hook for handling synthetic events in React',
    ],
    correctAnswer: [0],
    type: 'single',
    example: true,
    explanation: '`useEvent(callback)` (experimental React 19) returns a stable function reference that always calls the latest callback. Unlike `useCallback` (which needs dependencies), `useEvent` does not need deps — the function identity stays stable across renders, but it always calls the most recent callback. Solves the stale closure problem in callbacks passed to memoized children or useEffect.',
    keyConcept: 'useEvent: stable identity + latest callback. Eliminates stale closures without dependency array churn. Not yet stable.',
    xpReward: 15,
    tags: ['hooks', 'useEvent', 'stale-closure', 'experimental'],
  },
];
