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
    difficulty: 'medium',
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
  {
    id: 'react-81',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'easy',
    question: 'What does JSX compile to under the hood in modern React (React 17+)?',
    options: [
      'React.createElement() calls',
      '_jsx() calls from the react/jsx-runtime transform',
      'document.createElement() calls',
      'Directly to HTML strings',
    ],
    correctAnswer: [1],
    type: 'single',
    explanation: 'With the new JSX transform introduced in React 17, JSX compiles to `_jsx()` calls imported automatically from `react/jsx-runtime`, so you no longer need `import React from "react"` at the top of every file. Before React 17, JSX compiled to `React.createElement()`, which is why the manual import was necessary. The new transform is more efficient and produces smaller bundle sizes.',
    keyConcept: 'New JSX transform (React 17+): JSX → _jsx() from react/jsx-runtime. No manual React import needed.',
    xpReward: 5,
    tags: ['jsx', 'compilation', 'react17', 'jsx-transform'],
  },
  {
    id: 'react-82',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'easy',
    question: 'What is the purpose of React Fragments (`<>...</>` or `<React.Fragment>`)?',
    options: [
      'To group multiple children without adding an extra DOM node',
      'To lazy-load components',
      'To create portals for rendering outside the root',
      'To memoize component subtrees',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Fragments allow you to return multiple sibling elements from a component without wrapping them in an extra `<div>` or other DOM element. This is important because React components must return a single root element, but adding unnecessary wrapper nodes can break CSS layouts (like flexbox or grid children). The shorthand `<>...</>` is identical to `<React.Fragment>` except you cannot pass a `key` prop to the shorthand.',
    keyConcept: 'Fragment: group multiple siblings without extra DOM node. Use <React.Fragment key={...}> when key is needed.',
    xpReward: 5,
    tags: ['jsx', 'fragments', 'rendering', 'dom'],
  },
  {
    id: 'react-83',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'medium',
    question: 'What is a React Portal and when would you use one?',
    options: [
      'A way to render children into a DOM node that exists outside the parent component\'s DOM hierarchy',
      'A performance optimization that skips re-rendering child components',
      'A method to share state across multiple React trees',
      'A way to lazy-load route components',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `// Portal example
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}`,
    explanation: 'React Portals (`createPortal`) render children into a different DOM node than the component\'s parent, while still keeping the component within the React tree. This means context, events, and state still work as expected even though the DOM is "somewhere else". Common use cases include modals, tooltips, dropdowns, and notifications that need to visually break out of an overflow-hidden or z-index-stacked parent.',
    keyConcept: 'Portal: render into different DOM node but stay in React tree. Events still bubble up through React tree.',
    xpReward: 10,
    tags: ['portals', 'dom', 'modal', 'createPortal'],
  },
  {
    id: 'react-84',
    technology: 'react',
    topic: 'Lists & Keys',
    difficulty: 'easy',
    question: 'Why must list items rendered with `.map()` in React have a unique `key` prop?',
    options: [
      'Keys help React identify which items changed, were added, or were removed during reconciliation',
      'Keys are required by JavaScript\'s array `.map()` method',
      'Keys are used to style list items differently',
      'Keys prevent re-rendering of all list items on every update',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React uses keys during reconciliation to match elements across renders. Without stable keys, React cannot determine which item changed — it may re-render every item in the list even if only one changed, or worse, mix up component state between items. Keys should be stable and unique among siblings (not necessarily globally). Avoid using array index as a key when the list can be reordered or items can be inserted/deleted, as this causes subtle bugs with component state.',
    keyConcept: 'Keys: reconciliation hint. Stable unique IDs preferred. Avoid index keys in reorderable lists.',
    xpReward: 5,
    tags: ['keys', 'lists', 'reconciliation', 'rendering'],
  },
  {
    id: 'react-85',
    technology: 'react',
    topic: 'Components',
    difficulty: 'easy',
    question: 'What is the difference between a controlled and an uncontrolled component in React?',
    options: [
      'Controlled: form value managed by React state. Uncontrolled: form value managed by the DOM via refs.',
      'Controlled: component with lifecycle methods. Uncontrolled: functional component.',
      'Controlled: component controlled by a parent. Uncontrolled: component with internal state.',
      'Controlled: component that uses Redux. Uncontrolled: component using local state.',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In a controlled component, the form element\'s value is driven by React state — every change calls `onChange`, updates state, and React re-renders with the new value. This gives React full control over the form data. In an uncontrolled component, the DOM itself maintains the form value, and you use a `ref` to read the value when needed (e.g., on submit). Controlled components are preferred for validation and dynamic form behavior, while uncontrolled components can be simpler for basic file inputs.',
    keyConcept: 'Controlled: value from state + onChange handler. Uncontrolled: DOM owns value, read via ref.',
    xpReward: 5,
    tags: ['controlled', 'uncontrolled', 'forms', 'refs'],
  },
  {
    id: 'react-86',
    technology: 'react',
    topic: 'Components',
    difficulty: 'medium',
    question: 'What is a Higher-Order Component (HOC) in React?',
    options: [
      'A function that takes a component and returns a new component with additional props or behavior',
      'A component that renders above other components in the tree',
      'A component that uses the Context API internally',
      'A component with higher priority in React\'s reconciliation',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `// HOC pattern
function withLogger(WrappedComponent) {
  return function LoggedComponent(props) {
    console.log('Rendering:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}

const LoggedButton = withLogger(Button);`,
    explanation: 'A Higher-Order Component is a pattern (not a React API) where a function accepts a component and returns an enhanced component. HOCs are used for cross-cutting concerns like logging, authentication, data fetching, and memoization. They follow the composition model over inheritance. Modern React tends to prefer custom hooks for logic reuse, but HOCs are still common in older codebases and libraries like `connect()` from Redux.',
    keyConcept: 'HOC: function(Component) → EnhancedComponent. Used for cross-cutting concerns. Modern alternative: custom hooks.',
    xpReward: 10,
    tags: ['HOC', 'composition', 'patterns', 'components'],
  },
  {
    id: 'react-87',
    technology: 'react',
    topic: 'Props & State',
    difficulty: 'easy',
    question: 'What is "prop drilling" in React and why is it considered a problem?',
    options: [
      'Passing props through many intermediate components that don\'t need them, just to reach a deeply nested child',
      'Passing too many props to a single component',
      'Drilling down into a prop object to access nested values',
      'Passing props from child to parent components',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Prop drilling occurs when you pass data through multiple levels of components, even though only the deepest component actually needs it. This makes intermediate components unnecessarily coupled to the data shape and harder to refactor. Solutions include Context API (for truly global data like themes, auth), state management libraries (Redux, Zustand), or component composition (moving state closer to where it\'s used). Not all prop passing is "drilling" — passing props 1-2 levels is often perfectly fine.',
    keyConcept: 'Prop drilling: props passed through intermediaries. Solutions: Context, state management, composition.',
    xpReward: 5,
    tags: ['props', 'prop-drilling', 'context', 'state-management'],
  },
  {
    id: 'react-88',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'medium',
    question: 'What does the lazy initializer pattern do in useState?',
    codeSnippet: `// Which version is preferred for expensive initialization?
// Version A
const [state, setState] = useState(expensiveComputation());

// Version B
const [state, setState] = useState(() => expensiveComputation());`,
    options: [
      'Version B — the function is called only once on mount, not on every re-render',
      'Version A — calling the function directly is more performant',
      'Both are identical in behavior and performance',
      'Version B causes an error because useState doesn\'t accept functions',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When you pass a function to `useState`, React calls it only once during the initial render to compute the initial state. In Version A, `expensiveComputation()` is called on every render even though its result is ignored after the first render — this wastes CPU time. Version B (the lazy initializer) solves this: React only invokes the function during initialization. This pattern is critical for operations like parsing large JSON, reading from localStorage, or other expensive synchronous computations.',
    keyConcept: 'Lazy initializer: useState(() => value) — function called only on mount. Avoids repeated expensive computation.',
    xpReward: 10,
    tags: ['useState', 'lazy-initializer', 'performance', 'hooks'],
  },
  {
    id: 'react-89',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'medium',
    question: 'What is state batching in React 18 and how does it differ from React 17?',
    options: [
      'React 18 batches all state updates (including in timeouts, promises, and native event handlers). React 17 only batched updates inside React event handlers.',
      'React 18 batches state updates only inside useEffect. React 17 batches all state updates.',
      'React 18 no longer batches state updates for performance reasons.',
      'Both React 17 and 18 batch state updates in all scenarios identically.',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React 18 introduced "Automatic Batching," which means all state updates — even those inside `setTimeout`, `Promise.then`, or native event handlers — are batched into a single re-render. In React 17 and earlier, batching only happened inside React\'s own event handlers (like onClick). Multiple `setState` calls inside a `setTimeout` in React 17 would cause multiple re-renders. React 18 automatically consolidates them. You can opt out using `ReactDOM.flushSync()` if you need immediate rendering after each update.',
    keyConcept: 'React 18 automatic batching: all setState calls batched everywhere. Use flushSync() to opt out.',
    xpReward: 10,
    tags: ['useState', 'batching', 'react18', 'performance'],
  },
  {
    id: 'react-90',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'medium',
    question: 'What is the output of this code when the button is clicked?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`,
    options: [
      'Count becomes 1 (not 3), because all three setCount calls use the same stale closure value',
      'Count becomes 3, because each setCount call increments independently',
      'Count becomes 2, because two of the three calls merge',
      'The component throws an error due to multiple setState calls',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'All three `setCount(count + 1)` calls capture the same `count` value (0) from the closure. Due to React\'s batching, they all compute `0 + 1 = 1`, so only one state update of `1` is applied — the component re-renders once with count = 1. To properly accumulate updates, use the functional update form: `setCount(prev => prev + 1)`. With the functional form, each updater receives the latest pending state, so three calls would correctly produce count = 3.',
    keyConcept: 'Stale closure in setState: use functional updates setCount(prev => prev + 1) to always get latest value.',
    xpReward: 10,
    tags: ['useState', 'stale-closure', 'functional-update', 'batching'],
  },
  {
    id: 'react-91',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'easy',
    question: 'When does a useEffect with an empty dependency array `[]` run?',
    options: [
      'Once after the initial render (mount), and the cleanup runs once when the component unmounts',
      'On every render of the component',
      'Only when the component\'s parent re-renders',
      'Every time the component\'s state changes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useEffect(() => { ... }, [])` with an empty dependency array runs exactly once after the first render — equivalent to `componentDidMount` in class components. The cleanup function (the returned function) runs once when the component unmounts — equivalent to `componentWillUnmount`. This pattern is used for subscriptions, data fetching on mount, and setting up third-party libraries that only need initialization.',
    keyConcept: 'useEffect(fn, []): runs once on mount. Cleanup runs on unmount. Equivalent to componentDidMount/WillUnmount.',
    xpReward: 5,
    tags: ['useEffect', 'lifecycle', 'mount', 'cleanup'],
  },
  {
    id: 'react-92',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'hard',
    question: 'How do you correctly avoid race conditions in a useEffect that fetches data?',
    codeSnippet: `// Which implementation correctly avoids race conditions?
// Option A
useEffect(() => {
  fetch('/api/data?id=' + id)
    .then(r => r.json())
    .then(data => setData(data));
}, [id]);

// Option B
useEffect(() => {
  let cancelled = false;
  fetch('/api/data?id=' + id)
    .then(r => r.json())
    .then(data => {
      if (!cancelled) setData(data);
    });
  return () => { cancelled = true; };
}, [id]);`,
    options: [
      'Option B — it uses a cancellation flag to ignore stale responses when id changes rapidly',
      'Option A — React automatically cancels pending fetches',
      'Both are equivalent — fetch requests are inherently ordered',
      'Neither works; you must use useCallback to prevent race conditions',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Race conditions happen when the user changes `id` quickly and older fetch responses arrive after newer ones, overwriting fresh data with stale data. Option B introduces a boolean `cancelled` flag. When the effect re-runs (id changed), the cleanup sets `cancelled = true`, so any pending `.then()` from the previous fetch silently discards its result. Option A has no such guard. Modern alternatives include AbortController (to actually cancel the request) or libraries like React Query / SWR that handle this automatically.',
    keyConcept: 'Race condition fix: cancellation flag or AbortController in useEffect cleanup. React Query handles this automatically.',
    xpReward: 15,
    tags: ['useEffect', 'race-condition', 'fetch', 'cleanup'],
  },
  {
    id: 'react-93',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'medium',
    question: 'What happens if you omit a dependency from useEffect\'s dependency array?',
    options: [
      'The effect captures a stale closure, using the value from when the effect last ran instead of the current value',
      'React throws a warning and re-runs the effect on every render',
      'The effect never re-runs after the initial mount',
      'The missing dependency is automatically inferred by React at runtime',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Omitting a dependency creates a stale closure: the effect function closes over the value as it was when the effect was registered, not its current value. This leads to subtle bugs where you\'re reading outdated state or props inside the effect. The ESLint rule `exhaustive-deps` from `eslint-plugin-react-hooks` catches these mistakes. If you genuinely need to access a value without it being a dependency, consider using a ref (e.g., `const latestValue = useRef(value)`) to hold the mutable current value.',
    keyConcept: 'Missing dep = stale closure. Use exhaustive-deps ESLint rule. Refs can hold mutable values without being deps.',
    xpReward: 10,
    tags: ['useEffect', 'dependencies', 'stale-closure', 'eslint'],
  },
  {
    id: 'react-94',
    technology: 'react',
    topic: 'useRef & DOM',
    difficulty: 'easy',
    question: 'What is the key difference between useRef and useState?',
    options: [
      'Updating a ref does NOT trigger a re-render; updating state DOES trigger a re-render',
      'useRef is for strings only; useState works with any value',
      'useRef causes a re-render; useState does not',
      'They are identical in behavior but useRef has a .current property',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useRef` returns a mutable object `{ current: value }` that persists across renders. Mutating `ref.current` does NOT schedule a re-render — React is unaware of the change. This makes refs ideal for: storing mutable values that shouldn\'t trigger re-renders (like timers, previous values, or DOM elements), directly accessing DOM nodes, and holding values that are needed synchronously without the async nature of state updates. Use state when the UI needs to reflect a value change.',
    keyConcept: 'useRef: mutable .current, no re-render on change. useState: triggers re-render. Refs for DOM access and mutable side-data.',
    xpReward: 5,
    tags: ['useRef', 'useState', 're-render', 'dom'],
  },
  {
    id: 'react-95',
    technology: 'react',
    topic: 'useRef & DOM',
    difficulty: 'medium',
    question: 'What does `forwardRef` do and why is it needed?',
    codeSnippet: `const FancyInput = React.forwardRef((props, ref) => (
  <input ref={ref} className="fancy" {...props} />
));

// Parent usage:
const inputRef = useRef();
<FancyInput ref={inputRef} />`,
    options: [
      'It lets a parent component attach a ref to a DOM node inside a child component',
      'It forwards props to a child\'s child component automatically',
      'It makes a component\'s ref available globally across the app',
      'It prevents the child component from re-rendering when the ref changes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'By default, you cannot pass a `ref` prop to a function component — React will warn and `ref.current` will be null. `React.forwardRef` wraps a component and receives the ref as a second argument, allowing the component author to decide which DOM element (or child component) the ref should point to. This is essential for component library authors who want users to be able to imperatively focus, scroll, or measure elements inside the library component.',
    keyConcept: 'forwardRef: exposes inner DOM node via ref prop. Required because function components don\'t accept ref by default.',
    xpReward: 10,
    tags: ['forwardRef', 'refs', 'dom', 'components'],
  },
  {
    id: 'react-96',
    technology: 'react',
    topic: 'useMemo & useCallback',
    difficulty: 'medium',
    question: 'What is the correct use case for `useMemo`?',
    options: [
      'Memoizing an expensive calculation so it only re-runs when its dependencies change',
      'Memoizing a callback function to pass as a stable reference to a child component',
      'Preventing a component from re-rendering entirely',
      'Caching API responses between component renders',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `const sortedItems = useMemo(() => {
  return items.slice().sort((a, b) => a.value - b.value);
}, [items]);`,
    explanation: '`useMemo` caches the result of a computation between renders. It only recomputes when one of its dependencies changes. Use it when: a computation is genuinely expensive (sorting/filtering large arrays, complex calculations), and the component re-renders frequently for unrelated reasons. Do NOT use it prematurely — memoization itself has a cost (memory + comparison). For memoizing callbacks (functions), use `useCallback` instead. `useMemo(() => fn, deps)` and `useCallback(fn, deps)` are equivalent.',
    keyConcept: 'useMemo: cache computed value. Only recomputes when deps change. For expensive calculations, not all values.',
    xpReward: 10,
    tags: ['useMemo', 'performance', 'memoization', 'hooks'],
  },
  {
    id: 'react-97',
    technology: 'react',
    topic: 'useMemo & useCallback',
    difficulty: 'medium',
    question: 'When should you use `useCallback` instead of `useMemo`?',
    options: [
      'When memoizing a function reference to pass to a child component or include in a dependency array',
      'When memoizing the return value of an expensive synchronous computation',
      'When you want to debounce a function call',
      'When you need to run code after the component renders',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useCallback(fn, deps)` is syntactic sugar for `useMemo(() => fn, deps)`. It returns a stable function reference that only changes when dependencies change. The main use cases are: passing callbacks to `React.memo`-wrapped children (so they don\'t re-render due to new function references), and including callbacks as dependencies in other hooks like `useEffect`. Without `useCallback`, a new function object is created on every render, causing memoized children to re-render unnecessarily.',
    keyConcept: 'useCallback: stable function reference. Prevents unnecessary re-renders of memo children. useCallback(fn,deps) = useMemo(()=>fn,deps).',
    xpReward: 10,
    tags: ['useCallback', 'useMemo', 'performance', 'memoization'],
  },
  {
    id: 'react-98',
    technology: 'react',
    topic: 'useContext',
    difficulty: 'easy',
    question: 'When a context value changes, which components re-render?',
    options: [
      'All components that consume that context via useContext, regardless of where they are in the tree',
      'Only the component that wraps the context Provider',
      'Only the direct children of the context Provider',
      'Only components that call useContext in their render function body',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When context value changes, every component subscribed to that context via `useContext` will re-render — even if the specific part of the context value they care about didn\'t change. This is a key performance consideration. To optimize, split large contexts into smaller ones, use memoization inside the provider, or consider libraries like `use-context-selector` that allow subscribing to specific context slices. This is also why many developers prefer Zustand or Jotai for frequent state changes.',
    keyConcept: 'Context change: ALL consumers re-render. Split contexts or use selector libraries for optimization.',
    xpReward: 5,
    tags: ['useContext', 'context', 're-render', 'performance'],
  },
  {
    id: 'react-99',
    technology: 'react',
    topic: 'useReducer',
    difficulty: 'medium',
    question: 'What is the main advantage of `useReducer` over `useState` for complex state?',
    codeSnippet: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'RESET': return initialState;
    default: return state;
  }
}`,
    options: [
      'State transitions are explicit and centralized in a pure reducer function, making complex logic easier to test and reason about',
      'useReducer is always faster than useState because it avoids re-renders',
      'useReducer automatically persists state to localStorage',
      'useReducer allows state to be shared between components without Context',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useReducer` shines when state logic is complex: multiple sub-values that depend on each other, state transitions that involve multiple fields, or when the next state depends on the previous state in complex ways. The reducer is a pure function that\'s easy to unit test in isolation. Dispatch actions have clear intent (named action types), making state changes more readable. When combined with Context, `useReducer` provides a lightweight alternative to Redux. Use `useState` for simple, independent pieces of state.',
    keyConcept: 'useReducer: centralized state logic in pure reducer. Better for complex state. Easy to test. Pairs well with Context.',
    xpReward: 10,
    tags: ['useReducer', 'state-management', 'reducer', 'patterns'],
  },
  {
    id: 'react-100',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'medium',
    question: 'What are the rules for naming custom hooks in React?',
    options: [
      'Custom hooks must start with "use" (e.g., useFetch, useLocalStorage) — this is required for React\'s linting rules to work',
      'Custom hooks can be named anything as long as they return an array',
      'Custom hooks must end with "Hook" (e.g., fetchHook)',
      'Custom hooks must be defined inside a component to access React\'s internals',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React requires custom hooks to start with `use` as a naming convention. This is not just a convention — the `eslint-plugin-react-hooks` linter enforces hook rules (like not calling hooks conditionally) only on functions that start with `use`. If you name a function `fetchData` but use hooks inside it, the linter won\'t catch violations. Custom hooks must call at least one React hook internally to be considered a hook. They can return anything: arrays, objects, primitives, or nothing.',
    keyConcept: 'Custom hooks: must start with "use". Enables eslint-react-hooks rules. Can call other hooks inside.',
    xpReward: 10,
    tags: ['custom-hooks', 'hooks', 'naming', 'eslint'],
  },
  {
    id: 'react-101',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'medium',
    question: 'What does this custom hook do?',
    codeSnippet: `function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}`,
    options: [
      'Returns the value from the previous render — the ref update in useEffect happens after render, so the returned value is always one render behind',
      'Returns the initial value passed on mount and never updates',
      'Stores the current value and triggers a re-render when it changes',
      'Returns the value from two renders ago because of double useEffect execution',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'This hook works because of render timing: `ref.current` is read and returned during render (current render), but the `useEffect` (which assigns the new value to `ref.current`) runs AFTER the render is committed to the DOM. So during render N, the hook returns the value stored from render N-1\'s effect. This creates a one-render delay — exactly what "previous value" means. The hook has no dependency array in useEffect, so it runs after every render, always updating the ref to the latest value after each paint.',
    keyConcept: 'usePrevious: reads ref before useEffect runs (previous value). Effect updates ref after render commit.',
    xpReward: 10,
    tags: ['custom-hooks', 'useRef', 'useEffect', 'patterns'],
  },
  {
    id: 'react-102',
    technology: 'react',
    topic: 'Event Handling',
    difficulty: 'easy',
    question: 'What is event delegation in the context of React\'s event system?',
    options: [
      'React attaches a single event listener to the root DOM node instead of individual elements, and uses event bubbling to route events to the correct handler',
      'React delegates event handling to the browser\'s native event system entirely',
      'React creates one event listener per component for efficiency',
      'Event delegation means passing event handlers as props (delegating to children)',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React implements event delegation by attaching a single listener at the document root (in React 17+, at the React root container). When any DOM event fires, it bubbles up to this root listener, which React uses to dispatch the appropriate synthetic event to the correct component handler. This is more efficient than attaching individual listeners to each DOM node and makes event cleanup automatic when components unmount. React 17 changed from attaching to `document` to attaching to the root container, improving multi-root app compatibility.',
    keyConcept: 'React event delegation: one root listener, events bubble up. React 17+ attaches to root container not document.',
    xpReward: 5,
    tags: ['events', 'event-delegation', 'synthetic-events', 'dom'],
  },
  {
    id: 'react-103',
    technology: 'react',
    topic: 'Conditional Rendering',
    difficulty: 'easy',
    question: 'What is a potential bug with this conditional rendering pattern?',
    codeSnippet: `function App({ items }) {
  return (
    <div>
      {items.length && <ItemList items={items} />}
    </div>
  );
}`,
    options: [
      'When items is an empty array, React renders the number 0 to the DOM instead of nothing',
      'The short-circuit operator doesn\'t work with JSX expressions',
      'This will throw an error when items is undefined',
      'ItemList will always render regardless of items.length',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`items.length && <ItemList />` evaluates to `0 && <ItemList />` when `items` is empty. Since `0` is falsy, JavaScript short-circuits and returns `0` — which React renders as the text "0" in the DOM. The fix is to use an explicit boolean: `items.length > 0 && <ItemList />` or `!!items.length && <ItemList />` or a ternary: `items.length ? <ItemList /> : null`. This is one of the most common JSX bugs for React beginners.',
    keyConcept: 'Short-circuit with 0: renders "0" to DOM. Fix: items.length > 0 && ... or use ternary with null.',
    xpReward: 5,
    tags: ['conditional-rendering', 'jsx', 'bugs', 'short-circuit'],
  },
  {
    id: 'react-104',
    technology: 'react',
    topic: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the purpose of the `key` prop when used on a form component, and how can it be used to reset form state?',
    options: [
      'Changing the key prop forces React to unmount and remount the component, resetting all internal state including uncontrolled form fields',
      'The key prop on forms enables browser autofill for that specific form',
      'The key prop specifies the form submission endpoint',
      'The key prop groups related form fields for validation purposes',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `// Reset entire form by changing key
function EditForm({ userId }) {
  return <UserForm key={userId} userId={userId} />;
}`,
    explanation: 'React uses `key` to identify component instances. When `key` changes, React treats it as a completely new component — it unmounts the old one and mounts a fresh instance. This is a clean technique to reset form state: instead of manually resetting every controlled input, just change the form\'s key (e.g., to a new user ID). This also resets uncontrolled inputs and clears any internal library state. It\'s an elegant escape hatch when explicit reset logic would be complex.',
    keyConcept: 'Changing key = remount. Use to reset form state without manual clearing of each field.',
    xpReward: 10,
    tags: ['forms', 'keys', 'state', 'reset'],
  },
  {
    id: 'react-105',
    technology: 'react',
    topic: 'Routing (React Router v6)',
    difficulty: 'easy',
    question: 'How do you programmatically navigate to a different route in React Router v6?',
    options: [
      'Use the `useNavigate` hook: `const navigate = useNavigate(); navigate(\'/path\')`',
      'Use `this.props.history.push(\'/path\')`',
      'Use `useHistory` hook from react-router-dom',
      'Use `window.location.href = \'/path\'`',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In React Router v6, programmatic navigation uses the `useNavigate` hook, which replaced the v5 `useHistory` hook. `navigate(\'/path\')` pushes to history, `navigate(-1)` goes back, and `navigate(\'/path\', { replace: true })` replaces the current entry (no back button). `useHistory` was removed in v6. Using `window.location.href` causes a full page reload, losing React state. The `<Link>` component is preferred for user-driven navigation in JSX.',
    keyConcept: 'React Router v6: useNavigate() hook. navigate(path), navigate(-1), navigate(path, {replace:true}).',
    xpReward: 5,
    tags: ['routing', 'react-router', 'useNavigate', 'navigation'],
  },
  {
    id: 'react-106',
    technology: 'react',
    topic: 'Routing (React Router v6)',
    difficulty: 'medium',
    question: 'How do you implement protected routes in React Router v6?',
    codeSnippet: `function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Usage:
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />`,
    options: [
      'Wrap the element in a guard component that redirects unauthenticated users using the Navigate component',
      'Use the `protected` prop on the Route component',
      'Wrap routes in a `<Authenticated>` component from react-router-dom',
      'Add middleware to the router configuration object',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Router v6 removed the `<Redirect>` component and replaced it with `<Navigate>`. A ProtectedRoute component checks authentication and either renders children or navigates to the login page. The `replace` prop prevents users from pressing the back button to re-enter the protected page. You can also read `useLocation()` in the guard and pass `state={{ from: location }}` to redirect back after login. This pattern is composable and works with any auth strategy.',
    keyConcept: 'Protected routes v6: guard component + <Navigate replace>. Pass location state to redirect back after login.',
    xpReward: 10,
    tags: ['routing', 'react-router', 'protected-routes', 'authentication'],
  },
  {
    id: 'react-107',
    technology: 'react',
    topic: 'Routing (React Router v6)',
    difficulty: 'medium',
    question: 'What is the purpose of nested routes in React Router v6 and how do you render them?',
    options: [
      'Nested routes allow parent layouts to persist while swapping child content via the <Outlet /> component',
      'Nested routes create separate browser history entries for each nested level',
      'Nested routes are for grouping routes without rendering any layout',
      'Nested routes automatically code-split each child route',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Overview />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// DashboardLayout.jsx
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Child route renders here */}
    </div>
  );
}`,
    explanation: '`<Outlet />` is the v6 equivalent of rendering `{children}` for routes. When a nested route matches, React Router renders the matched child component inside the parent\'s `<Outlet>`. This lets you build persistent layouts (nav, sidebar, header) that wrap different page content. The `index` route renders when the parent path matches exactly. This replaces the v5 pattern of manually wrapping routes in layout components.',
    keyConcept: 'Nested routes: parent layout + <Outlet> for child content. Index route for exact parent path match.',
    xpReward: 10,
    tags: ['routing', 'react-router', 'nested-routes', 'outlet'],
  },
  {
    id: 'react-108',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is Redux Toolkit (RTK) and how does it differ from traditional Redux?',
    options: [
      'RTK eliminates Redux boilerplate with createSlice (auto-generates action creators and reducers), includes Immer for immutable updates, and ships with RTK Query for data fetching',
      'RTK is a separate state management library unrelated to Redux',
      'RTK replaces Redux with a signal-based reactive system',
      'RTK only adds TypeScript types to existing Redux without other changes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Redux Toolkit is the official, opinionated way to write Redux. It addresses Redux\'s verbosity: `createSlice` generates action types, action creators, and reducer from a single object — no more separate action constants files. It bundles Immer, which lets you write "mutating" code in reducers that\'s actually immutable under the hood. RTK Query handles data fetching, caching, and synchronization with auto-generated hooks. The Redux team recommends RTK for all new Redux projects.',
    keyConcept: 'RTK: createSlice, Immer for immutable updates, RTK Query for data fetching. Official Redux way.',
    xpReward: 10,
    tags: ['redux', 'redux-toolkit', 'state-management', 'RTK'],
  },
  {
    id: 'react-109',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is Zustand and what makes it a popular alternative to Redux?',
    options: [
      'Zustand is a minimal state management library with a simple API — no Provider wrapper needed, no boilerplate, and components subscribe to specific state slices to avoid unnecessary re-renders',
      'Zustand is a React-specific implementation of the Flux architecture',
      'Zustand is a server-side state management solution for Next.js',
      'Zustand wraps Redux with a simpler API but still requires Provider and reducers',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}`,
    explanation: 'Zustand uses a hook-based API with no boilerplate. The store is created outside of React, so no Provider is needed. Components subscribe by passing a selector to the hook — only the specific slice they select will trigger re-renders when it changes. This is more efficient than Context (which re-renders all consumers). Zustand supports middleware (persist, devtools, immer) and works well for both small and large apps. Its simplicity makes it a popular choice over Redux for projects that don\'t need RTK Query or the Redux DevTools ecosystem.',
    keyConcept: 'Zustand: no Provider, no boilerplate. Selector-based subscription = granular re-renders. create() outside React.',
    xpReward: 10,
    tags: ['zustand', 'state-management', 'performance', 'hooks'],
  },
  {
    id: 'react-110',
    technology: 'react',
    topic: 'Performance Optimization',
    difficulty: 'medium',
    question: 'What does `React.memo` do and when should you use it?',
    options: [
      'React.memo wraps a component so it only re-renders when its props change (shallow comparison), skipping re-renders caused by parent re-renders with identical props',
      'React.memo caches the component\'s entire render output in memory permanently',
      'React.memo is used to memoize expensive calculations inside a component',
      'React.memo prevents a component from re-rendering due to state changes',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `const ExpensiveList = React.memo(function ExpensiveList({ items, onSelect }) {
  // Only re-renders when items or onSelect reference changes
  return items.map(item => (
    <Item key={item.id} item={item} onSelect={onSelect} />
  ));
});`,
    explanation: '`React.memo` is a Higher-Order Component that performs a shallow prop comparison before re-rendering. If all props are shallowly equal to the previous render, the component is skipped. Use it when: a component renders often, has the same props most of the time, and the rendering is computationally expensive. Pitfall: if a parent passes new object/array/function references on every render (common), memo won\'t help — you need `useMemo`/`useCallback` for those props too. Don\'t over-memoize: the comparison itself has a cost.',
    keyConcept: 'React.memo: skip re-render if props shallowly equal. Pair with useCallback for function props.',
    xpReward: 10,
    tags: ['React.memo', 'performance', 'memoization', 're-render'],
  },
  {
    id: 'react-111',
    technology: 'react',
    topic: 'Performance Optimization',
    difficulty: 'medium',
    question: 'How does React.lazy and Suspense enable code splitting?',
    codeSnippet: `const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}`,
    options: [
      'React.lazy dynamically imports a component only when it\'s first rendered; Suspense shows a fallback UI while the chunk loads',
      'React.lazy pre-loads all components at build time to reduce runtime lag',
      'Suspense is required to use any dynamic import in React',
      'React.lazy splits the component\'s CSS into a separate file',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`React.lazy(() => import(...))` tells your bundler (webpack/Vite) to create a separate chunk for that component. When the component first needs to render, React triggers the dynamic import, and the browser fetches only that chunk. While loading, Suspense shows the fallback. This reduces the initial bundle size — users download only the code they need. Common patterns: lazy-load route components, heavy chart libraries, rich text editors, or any feature not needed on first paint.',
    keyConcept: 'Code splitting: React.lazy + dynamic import + Suspense fallback. Reduces initial bundle. Per-route splitting is common.',
    xpReward: 10,
    tags: ['lazy', 'Suspense', 'code-splitting', 'performance'],
  },
  {
    id: 'react-112',
    technology: 'react',
    topic: 'Testing (RTL)',
    difficulty: 'medium',
    question: 'What is the primary philosophy of React Testing Library (RTL)?',
    options: [
      'Test behavior from the user\'s perspective — query elements by how users perceive them (role, label, text), not by implementation details like class names or component state',
      'Test React component internals — verify state changes and lifecycle method calls directly',
      'Mock all child components and test each component in complete isolation',
      'Write snapshot tests to catch unintended rendering changes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'RTL\'s guiding principle is: "The more your tests resemble the way your software is used, the more confidence they can give you." This means preferring queries like `getByRole`, `getByLabelText`, and `getByText` over `getByTestId` or accessing component internals. Tests that query by ARIA roles and visible text are resilient to refactoring — they break only when user-facing behavior changes. Avoid testing implementation details (state, refs, internal methods) which leads to brittle tests.',
    keyConcept: 'RTL: test user behavior, not implementation. Prefer getByRole > getByLabelText > getByText > getByTestId.',
    xpReward: 10,
    tags: ['testing', 'RTL', 'accessibility', 'best-practices'],
  },
  {
    id: 'react-113',
    technology: 'react',
    topic: 'Testing (RTL)',
    difficulty: 'medium',
    question: 'What is the difference between `getBy`, `queryBy`, and `findBy` queries in RTL?',
    options: [
      'getBy throws if not found (synchronous), queryBy returns null if not found (synchronous), findBy returns a Promise and waits for the element (asynchronous)',
      'getBy is for DOM elements, queryBy is for React components, findBy is for async components',
      'They are identical but findBy is deprecated in favor of getBy with async/await',
      'getBy is case-sensitive, queryBy is case-insensitive, findBy matches partial text',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The three query families have distinct uses: `getBy*` throws immediately if zero or multiple matches found — good for asserting elements that should exist. `queryBy*` returns null if not found instead of throwing — use it to assert something is NOT in the DOM (`expect(queryBy...).not.toBeInTheDocument()`). `findBy*` returns a Promise that resolves when the element appears — essential for async operations (API calls, lazy loaded content). Each also has `getAllBy`, `queryAllBy`, and `findAllBy` variants for multiple matches.',
    keyConcept: 'getBy: throws if missing. queryBy: null if missing (use for absence). findBy: Promise, waits for element.',
    xpReward: 10,
    tags: ['testing', 'RTL', 'queries', 'async'],
  },
  {
    id: 'react-114',
    technology: 'react',
    topic: 'Testing (RTL)',
    difficulty: 'hard',
    question: 'How do you test a component that makes an API call using RTL and Jest?',
    codeSnippet: `// Component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(r => r.json())
      .then(setUser);
  }, [userId]);
  if (!user) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}

// Test
test('displays user name after fetch', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ name: 'Alice' })
  });
  render(<UserProfile userId="1" />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});`,
    options: [
      'Mock the fetch globally with jest.fn(), render the component, assert loading state, then await findBy to wait for the resolved data to appear',
      'Use real fetch calls in tests; RTL intercepts them automatically during test runs',
      'Wrap the component in act() to flush all state updates synchronously',
      'Use queryBy for async elements because it waits automatically',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Testing async components requires mocking the data source and using async assertions. Mock `fetch` (or use MSW — Mock Service Worker for more realistic mocking), render the component, and check intermediate states. `findBy*` queries internally use `waitFor` with polling — they retry until the element appears or a timeout is hit. MSW is preferred in larger projects because it intercepts at the network level, making tests more realistic and reusable across unit/integration/E2E.',
    keyConcept: 'Async testing: mock fetch, use findBy/waitFor. MSW preferred for network-level mocking in larger projects.',
    xpReward: 15,
    tags: ['testing', 'RTL', 'async', 'mocking'],
  },
  {
    id: 'react-115',
    technology: 'react',
    topic: 'Server Components (React 18/19)',
    difficulty: 'hard',
    question: 'What is the key difference between React Server Components (RSC) and Client Components?',
    options: [
      'Server Components run only on the server, have no client-side JS bundle, can access server resources directly, but cannot use hooks or browser APIs. Client Components run in the browser and support interactivity.',
      'Server Components are the same as SSR — they generate HTML on the server and hydrate on the client like regular components',
      'Server Components run on both server and client, while Client Components run only in the browser',
      'Server Components are components inside the /api folder that serve as API routes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Server Components (RSC) are a fundamentally new component type. They execute ONLY on the server (or at build time) and their code is NEVER sent to the browser — zero client-side bundle impact. They can directly access databases, file systems, and secrets. They cannot use `useState`, `useEffect`, event handlers, or browser APIs. Client Components (marked with `"use client"`) run in the browser and support all interactive React features. RSC is not the same as SSR: SSR still sends hydration code; RSC does not.',
    keyConcept: 'RSC: server-only, no bundle, DB access, no hooks. Client ("use client"): interactive, hooks OK. RSC ≠ SSR.',
    xpReward: 15,
    tags: ['RSC', 'server-components', 'react18', 'next.js'],
  },
  {
    id: 'react-116',
    technology: 'react',
    topic: 'Suspense & Transitions',
    difficulty: 'hard',
    question: 'What does `useTransition` do and when should you use it?',
    codeSnippet: `const [isPending, startTransition] = useTransition();

function handleSearch(query) {
  startTransition(() => {
    setSearchQuery(query); // Non-urgent update
  });
}

return (
  <>
    {isPending && <Spinner />}
    <SearchResults query={searchQuery} />
  </>
);`,
    options: [
      'Marks a state update as non-urgent so React can interrupt it to handle more urgent updates (like user input), keeping the UI responsive',
      'Creates a CSS transition animation when state changes',
      'Defers a state update to the next browser frame to avoid blocking the main thread',
      'Wraps a state update in a try/catch to handle rendering errors gracefully',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useTransition` is a concurrent React feature. Updates wrapped in `startTransition` are marked as non-urgent — React can interrupt them to handle urgent updates (user typing, clicking). This keeps the UI responsive during expensive state transitions. `isPending` is true while the transition is in-flight, letting you show a loading indicator without blocking input. Common use case: search results filtering where you don\'t want the input to stutter while results update. `startTransition` (without the hook) is the non-hook version if you don\'t need `isPending`.',
    keyConcept: 'useTransition: non-urgent state updates, interruptible. UI stays responsive. isPending shows loading state.',
    xpReward: 15,
    tags: ['useTransition', 'concurrent', 'performance', 'react18'],
  },
  {
    id: 'react-117',
    technology: 'react',
    topic: 'Suspense & Transitions',
    difficulty: 'medium',
    question: 'What does a Suspense boundary do when a child component is "suspended"?',
    options: [
      'It shows the fallback UI until the suspended component is ready to render (e.g., data loaded, code chunk downloaded)',
      'It permanently removes the component from the tree if it throws a promise',
      'It catches all errors thrown by children, similar to an Error Boundary',
      'It delays rendering of the entire page until all children are ready',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When a component inside a Suspense boundary "suspends" (throws a Promise — a signal that it\'s waiting for something), React pauses rendering that subtree and shows the `fallback` prop instead. When the promise resolves, React retries rendering the component. Suspense works with `React.lazy` (code splitting), data fetching libraries (React Query, SWR, Relay with Suspense mode), and React 18\'s `use()` hook. Suspense is NOT an error boundary — errors thrown during render still propagate to the nearest Error Boundary.',
    keyConcept: 'Suspense: shows fallback while child is suspended (promise thrown). Works with lazy, data fetching. Not for errors.',
    xpReward: 10,
    tags: ['Suspense', 'concurrent', 'lazy', 'data-fetching'],
  },
  {
    id: 'react-118',
    technology: 'react',
    topic: 'Components',
    difficulty: 'hard',
    question: 'What is the render props pattern and when would you choose it over a custom hook?',
    codeSnippet: `// Render Props Pattern
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />`,
    options: [
      'Render props pass a function as a prop that the component calls to let the consumer control what is rendered — useful when the shared logic also controls which DOM events/nodes to attach to',
      'Render props are identical to custom hooks but with worse performance',
      'Render props are deprecated in React 18 and replaced by custom hooks universally',
      'Render props allow a component to render multiple root elements without fragments',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Render props share stateful logic by passing a render function as a prop. The key advantage over custom hooks: the component with the logic also controls the DOM structure (event binding, refs, etc.). When you need the sharing component to actually render something and attach event listeners, render props keep it encapsulated. Custom hooks are generally preferred when the logic is purely behavioral and doesn\'t need to render. Libraries like Downshift use render props to share complex UI behavior while giving full render control to the consumer.',
    keyConcept: 'Render props: function-as-prop. Provider controls DOM/events + consumer controls render. Custom hooks for pure logic.',
    xpReward: 15,
    tags: ['render-props', 'patterns', 'components', 'HOC'],
  },
  {
    id: 'react-119',
    technology: 'react',
    topic: 'Props & State',
    difficulty: 'medium',
    question: 'What is "lifting state up" in React and why is it the recommended approach for shared state?',
    options: [
      'Moving state to the nearest common ancestor of components that need it, so siblings can share and synchronize that state through props',
      'Migrating local component state to a global Redux store',
      'Moving state from a parent to a child component for better encapsulation',
      'Using useRef instead of useState to lift state outside React\'s render cycle',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'When two or more sibling components need to share the same piece of state, lift the state to their lowest common ancestor. The ancestor owns the state and passes data and change handlers down as props. This maintains a single source of truth — both siblings always see the same value. React\'s one-way data flow makes this predictable: state flows down, events flow up. If lifting state too many levels becomes cumbersome (prop drilling), consider Context or a state management library.',
    keyConcept: 'Lift state: move to nearest common ancestor. Single source of truth. Data down, events up.',
    xpReward: 10,
    tags: ['state', 'props', 'lifting-state', 'data-flow'],
  },
  {
    id: 'react-120',
    technology: 'react',
    topic: 'useRef & DOM',
    difficulty: 'hard',
    question: 'What does `useImperativeHandle` do and in what scenario would you use it?',
    codeSnippet: `const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));
  return <input ref={inputRef} {...props} />;
});

// Parent:
const ref = useRef();
ref.current.focus(); // Calls our custom focus
ref.current.clear(); // Calls our custom clear`,
    options: [
      'Customizes the ref handle exposed to parent components, allowing you to expose a limited, controlled API instead of the raw DOM node',
      'Makes a ref imperative (mutable) instead of declarative, bypassing React\'s update system',
      'Forces the component to immediately re-render when the ref changes',
      'Allows multiple parent components to share the same ref instance',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useImperativeHandle` lets you decide exactly what a parent sees when they hold a `ref` to your component. Instead of exposing the raw DOM node (which gives the parent full DOM access), you expose only specific methods you choose. This is useful for component library authors: expose `focus()` and `clear()` without exposing the underlying input DOM element. It\'s used with `forwardRef`. The second argument is a factory function returning the exposed object; the third argument is a dependency array for memoizing the factory.',
    keyConcept: 'useImperativeHandle: limit ref exposure. Expose custom API not full DOM. Used with forwardRef.',
    xpReward: 15,
    tags: ['useImperativeHandle', 'forwardRef', 'refs', 'components'],
  },
  {
    id: 'react-121',
    technology: 'react',
    topic: 'useContext',
    difficulty: 'medium',
    question: 'How do you create and consume a context with a custom hook for better ergonomics?',
    codeSnippet: `const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}`,
    options: [
      'Wrap the context in a custom hook that validates usage, giving a helpful error if the hook is called outside the Provider',
      'Export ThemeContext directly and call useContext in every consuming component',
      'Use React.memo on the Provider component to prevent re-renders',
      'Initialize context with a default value to avoid the null check',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The pattern of wrapping `useContext` in a custom hook provides two benefits: it gives consumers a clean API (`useTheme()` instead of `useContext(ThemeContext)`), and it validates that the hook is used within the correct Provider — throwing a helpful error rather than silently returning null. Initialize the context with `null` (not a default value) so the validation check works correctly. If you provide a real default, the error check never triggers even when the Provider is accidentally missing.',
    keyConcept: 'Custom context hook: wrap useContext, validate Provider present, throw descriptive error if missing.',
    xpReward: 10,
    tags: ['useContext', 'context', 'custom-hooks', 'patterns'],
  },
  {
    id: 'react-122',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'medium',
    question: 'How would you implement a `useDebounce` custom hook?',
    codeSnippet: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage: debounce search input
const debouncedQuery = useDebounce(query, 500);`,
    options: [
      'Set a timeout in useEffect that updates debounced state after the delay, clearing the timeout in cleanup so rapid changes only fire once after the last change',
      'Use useMemo to memoize the value and only recompute after the delay expires',
      'Use useRef to store a debounced version without triggering re-renders',
      'Call lodash.debounce inside the effect and store the result in state',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The debounce hook uses `useEffect` with cleanup: when `value` or `delay` changes, a new timeout starts. If `value` changes again before the timeout fires, the cleanup cancels the previous timer and a new one starts. Only after `delay` ms of stability does `setDebouncedValue` run, triggering a re-render with the debounced value. This pattern prevents calling expensive operations (API searches, complex filtering) on every keystroke. The consumer uses `debouncedValue` instead of `value` as the trigger for expensive operations.',
    keyConcept: 'useDebounce: setTimeout in useEffect, cleanup clears timeout. Fires only after value stabilizes for delay ms.',
    xpReward: 10,
    tags: ['custom-hooks', 'debounce', 'useEffect', 'performance'],
  },
  {
    id: 'react-123',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'hard',
    question: 'How do you implement a `useFetch` hook that handles loading, error, and data states?',
    codeSnippet: `function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle', data: null, error: null
  });

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    dispatch({ type: 'LOADING' });
    fetch(url)
      .then(r => r.json())
      .then(data => { if (!cancelled) dispatch({ type: 'SUCCESS', data }) })
      .catch(error => { if (!cancelled) dispatch({ type: 'ERROR', error }) });
    return () => { cancelled = true; };
  }, [url]);

  return state;
}`,
    options: [
      'Combine useReducer for multi-state management with a cancellation flag in useEffect cleanup to prevent stale state updates after unmount or URL change',
      'Use three separate useState hooks for loading, error, and data, updating them sequentially',
      'Use a try/catch outside the useEffect to handle errors and a global loading state',
      'Store fetch results in a useRef to avoid triggering re-renders on data updates',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Using `useReducer` instead of three separate `useState` hooks prevents impossible states (e.g., `loading: true` and `error: "..."` simultaneously). The `cancelled` flag prevents state updates after the component unmounts or the URL changes — avoiding the "Can\'t update state on unmounted component" warning and race conditions. The `useReducer` state machine has three states: idle → loading → success/error. This is a simplified version of what libraries like React Query and SWR handle automatically.',
    keyConcept: 'useFetch: useReducer for state machine (idle/loading/success/error) + cancellation flag for cleanup.',
    xpReward: 15,
    tags: ['custom-hooks', 'fetch', 'useReducer', 'race-condition'],
  },
  {
    id: 'react-124',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is React Query (TanStack Query) and what problem does it solve?',
    options: [
      'A server-state management library that handles fetching, caching, synchronization, and background refetching of async data, eliminating manual loading/error/data state management',
      'A GraphQL client for React that compiles queries at build time',
      'A replacement for Redux that manages both server and client state in a single store',
      'A library for querying the React component tree similar to CSS selectors',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Query treats server data as a separate concern from UI state. It handles: automatic caching (data is cached by query key), background refetching (data stays fresh), deduplication (multiple components using the same query share one request), optimistic updates, infinite scrolling, and pagination. Without React Query, developers manually manage `loading`, `error`, and `data` state with `useEffect` — which is error-prone (race conditions, stale data, no caching). React Query eliminates this boilerplate and provides a superior user experience with features like stale-while-revalidate.',
    keyConcept: 'React Query: server-state management. Auto caching, background refresh, deduplication. Not for client/UI state.',
    xpReward: 10,
    tags: ['react-query', 'data-fetching', 'caching', 'state-management'],
  },
  {
    id: 'react-125',
    technology: 'react',
    topic: 'Components',
    difficulty: 'hard',
    question: 'What is the Compound Component pattern and what problem does it solve?',
    codeSnippet: `// Compound Component pattern
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
Tabs.Tab = function Tab({ name, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === name ? <div>{children}</div> : null;
};
Tabs.List = function TabList({ children }) { return <nav>{children}</nav>; };

// Usage - consumer controls composition
<Tabs defaultTab="home">
  <Tabs.List>
    <button onClick={() => setActiveTab('home')}>Home</button>
  </Tabs.List>
  <Tabs.Tab name="home"><HomePage /></Tabs.Tab>
</Tabs>`,
    options: [
      'Compound components share implicit state through context, giving consumers flexible control over composition and rendering while the parent manages shared logic',
      'Compound components must be nested within each other in a specific order to function correctly',
      'Compound components are components that use both class and function component APIs simultaneously',
      'Compound components split a single component into server and client parts for RSC compatibility',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The Compound Component pattern lets component consumers control the composition while the parent manages shared state via Context. The API is declarative and flexible — consumers can reorder, omit, or add custom elements between the sub-components. This avoids the "prop explosion" problem where a single component needs many props to configure its layout. Libraries like Radix UI, Headless UI, and React Select use this pattern extensively. The tradeoff is more complex implementation compared to a simple configurable component.',
    keyConcept: 'Compound components: shared state via context, consumer controls composition. Avoids prop explosion.',
    xpReward: 15,
    tags: ['compound-components', 'patterns', 'context', 'components'],
  },
  {
    id: 'react-126',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'medium',
    question: 'What is React\'s reconciliation algorithm and what is the "diffing" process?',
    options: [
      'React compares the previous virtual DOM tree with the new one using heuristics (same type = update, different type = replace) to compute the minimum set of DOM changes needed',
      'React re-renders the entire real DOM on every state change for simplicity',
      'React uses the browser\'s built-in DOM diff algorithm to detect changes',
      'React compiles JSX differences at build time so no runtime diffing is needed',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React\'s reconciliation compares virtual DOM trees using two key heuristics: (1) If two elements have different types (e.g., `<div>` → `<span>`), destroy the old tree and build a new one. (2) If they have the same type, update the existing DOM node with changed props. Keys help React match list items across renders. The algorithm is O(n) (linear) rather than the theoretically optimal O(n³) because of these heuristics. This is what makes React performant — real DOM operations are batched and minimized.',
    keyConcept: 'Reconciliation: virtual DOM diff. Same type = update. Different type = destroy + rebuild. Keys optimize lists.',
    xpReward: 10,
    tags: ['reconciliation', 'virtual-dom', 'diffing', 'performance'],
  },
  {
    id: 'react-127',
    technology: 'react',
    topic: 'Conditional Rendering',
    difficulty: 'easy',
    question: 'Which pattern correctly renders a component only when a condition is true?',
    codeSnippet: `// A
condition && <Component />

// B
condition ? <Component /> : null

// C
if (condition) return <Component />; (inside render/JSX)

// D — inside JSX
{condition ? <Component /> : null}`,
    options: [
      'A, B, and D are all valid conditional rendering patterns inside JSX; C works in early returns before the main JSX',
      'Only D is valid because JSX requires explicit ternary operators',
      'Only A is valid because React JSX supports only the && operator for conditionals',
      'None of these patterns work — conditionals must be in separate helper functions',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React supports multiple conditional rendering patterns: `&&` short-circuit (A) is concise but watch for falsy values like `0`. Ternary with `null` (B and D) is explicit and safe. Early return `if (condition) return ...` (C) works outside JSX, before the return statement, for complex conditions. All are valid and idiomatic React. Choose based on readability: early returns for complex conditions, ternaries for simple if/else, `&&` for "render only if true" with boolean values.',
    keyConcept: 'Conditional rendering: &&, ternary with null, early return. All valid. Use ternary with null to avoid rendering 0.',
    xpReward: 5,
    tags: ['conditional-rendering', 'jsx', 'patterns', 'rendering'],
  },
  {
    id: 'react-128',
    technology: 'react',
    topic: 'Performance Optimization',
    difficulty: 'hard',
    question: 'How does the React Profiler help identify performance bottlenecks?',
    options: [
      'The Profiler records render timing for each component in a commit, showing which components are slow, how often they render, and why they rendered (state, props, or context change)',
      'The React Profiler only works in production builds and reports to an external analytics service',
      'The React Profiler replaces browser DevTools and shows network request timings for React components',
      'The React Profiler automatically applies memoization to slow components',
    ],
    correctAnswer: [0],
    type: 'single',
    codeSnippet: `import { Profiler } from 'react';

<Profiler id="Navigation" onRender={
  (id, phase, actualDuration, baseDuration) => {
    console.log({ id, phase, actualDuration, baseDuration });
  }
}>
  <Navigation />
</Profiler>`,
    explanation: 'The `<Profiler>` component measures rendering performance. `onRender` receives: `id` (profiler name), `phase` ("mount" or "update"), `actualDuration` (time to render committed update), `baseDuration` (estimated time without memoization), and more. In React DevTools, the Profiler tab records sessions graphically — you can see which components rendered, duration, and the reason for render. Look for components with high `actualDuration` or components that render too frequently. This data guides where to apply `memo`, `useMemo`, or `useCallback`.',
    keyConcept: 'Profiler: measures render time. actualDuration vs baseDuration. DevTools Profiler tab shows flame graph.',
    xpReward: 15,
    tags: ['profiler', 'performance', 'devtools', 'optimization'],
  },
  {
    id: 'react-129',
    technology: 'react',
    topic: 'Server Components (React 18/19)',
    difficulty: 'hard',
    question: 'In a Next.js App Router app, which component can you NOT use inside a React Server Component?',
    codeSnippet: `// Which pattern would fail in a Server Component?
// A
async function ServerPage() {
  const data = await fetch('/api/data').then(r => r.json());
  return <div>{data.title}</div>;
}

// B
'use client';
function ClientButton() {
  const [clicked, setClicked] = useState(false);
  return <button onClick={() => setClicked(true)}>Click</button>;
}

// C (Server Component using useState)
function ServerCounter() {
  const [count, setCount] = useState(0); // ← Error!
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}`,
    options: [
      'C fails — Server Components cannot use useState, useEffect, event handlers, or any browser-only API; they are purely for data fetching and rendering static content',
      'A fails — Server Components cannot use async/await or fetch directly',
      'B fails — "use client" directive is not allowed in Next.js App Router',
      'All three patterns are valid in Server Components',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Server Components are async-first and can directly `await` data, but they cannot use any client-side React features. `useState`, `useEffect`, `useRef`, event handlers (`onClick`), and browser APIs (`window`, `document`) are all forbidden. Adding `"use client"` to a file marks it as a Client Component boundary (B is correct usage). The key mental model: Server Components = async data fetching + static rendering + zero client JS. Client Components = interactivity + hooks + browser APIs.',
    keyConcept: 'RSC: no hooks, no event handlers, no browser APIs. Mark as "use client" for interactivity.',
    xpReward: 15,
    tags: ['RSC', 'server-components', 'next.js', 'use-client'],
  },
  {
    id: 'react-130',
    technology: 'react',
    topic: 'Forms & Validation',
    difficulty: 'medium',
    question: 'What is the benefit of using React Hook Form over manually controlled form state?',
    options: [
      'React Hook Form uses uncontrolled inputs with refs internally, reducing re-renders to only the changed field, making it much more performant than fully controlled forms',
      'React Hook Form automatically sends form data to the server without writing submit handlers',
      'React Hook Form replaces all HTML input elements with custom React components',
      'React Hook Form only works with TypeScript and provides automatic type inference',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React Hook Form\'s performance advantage comes from its architecture: it registers fields as uncontrolled inputs (using `ref`), so typing in a field doesn\'t trigger React re-renders for the whole form. Validation errors are isolated — only the field with an error re-renders. Contrast with fully controlled forms where every keystroke re-renders the entire form. For large forms (20+ fields), this difference is noticeable. React Hook Form also provides built-in validation, error messages, dirty/touched tracking, and integrates with schema validators like Zod and Yup.',
    keyConcept: 'RHF: uncontrolled + refs internally. No re-render on every keystroke. Validate with Zod/Yup integration.',
    xpReward: 10,
    tags: ['forms', 'react-hook-form', 'performance', 'validation'],
  },
  {
    id: 'react-131',
    technology: 'react',
    topic: 'useReducer',
    difficulty: 'hard',
    question: 'How do you combine useReducer with useContext to build a lightweight Redux-like system?',
    codeSnippet: `const StoreContext = createContext(null);
const DispatchContext = createContext(null);

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}

// Consumers:
const state = useContext(StoreContext);
const dispatch = useContext(DispatchContext);`,
    options: [
      'Separate state and dispatch into two contexts so components that only dispatch don\'t re-render when state changes',
      'Put state and dispatch in the same context to keep the Provider code simple',
      'Use a single context and wrap all consumers in React.memo to avoid re-renders',
      'Use localStorage to share state between the two contexts without re-rendering',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Separating `state` and `dispatch` into two contexts is a key optimization. `dispatch` is stable (never changes across renders), so components that only need to dispatch actions will never re-render due to state changes. If you put both in one context, dispatching components re-render whenever any state changes. This is the pattern Kent C. Dodds advocates for "Application State Management with React." For truly complex apps, Zustand or Redux offer better performance and DevTools, but this pattern works well for medium complexity.',
    keyConcept: 'useReducer + Context: split state/dispatch contexts. Dispatch-only consumers skip state re-renders.',
    xpReward: 15,
    tags: ['useReducer', 'context', 'state-management', 'patterns'],
  },
  {
    id: 'react-132',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'easy',
    question: 'What happens when you return `null` from a React component?',
    options: [
      'The component renders nothing — no DOM output is produced, but lifecycle hooks and effects still run',
      'The component unmounts itself and removes its state',
      'React throws an error because components must return valid JSX',
      'The component renders an empty `<div>` as a placeholder',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Returning `null` from a component (or from a render method) tells React to render nothing for that component — no DOM nodes are created. However, the component instance still exists in the React tree, so `useEffect` and other hooks still run, and state is preserved. This is useful for conditional rendering where you want to completely hide a component\'s output. It\'s different from unmounting — the component is still mounted, just rendering nothing.',
    keyConcept: 'Return null: no DOM output but component still mounted. Hooks still run. Different from unmounting.',
    xpReward: 5,
    tags: ['rendering', 'jsx', 'null', 'conditional-rendering'],
  },
  {
    id: 'react-133',
    technology: 'react',
    topic: 'Event Handling',
    difficulty: 'medium',
    question: 'How do you correctly pass arguments to an event handler in React?',
    codeSnippet: `// Which approach correctly passes 'id' to handleDelete?
// A - Correct
<button onClick={() => handleDelete(id)}>Delete</button>

// B - Wrong
<button onClick={handleDelete(id)}>Delete</button>

// C - Correct
<button onClick={handleDelete.bind(null, id)}>Delete</button>`,
    options: [
      'A and C are correct — A uses an arrow function wrapper and C uses bind(); B calls handleDelete immediately on render instead of on click',
      'B is correct — passing arguments directly is the React way',
      'All three approaches are equivalent in React',
      'Only A is correct — bind() is not supported in React event handlers',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In JSX, `onClick={handleDelete(id)}` calls the function immediately during render and assigns its return value as the handler — this is almost never what you want. To pass arguments, wrap in an arrow function: `onClick={() => handleDelete(id)}`. The `bind` approach (`onClick={handleDelete.bind(null, id)}`) also works but creates a new function reference on every render (same as arrow functions). If you need to avoid recreating the function on every render, define the handler outside JSX with `useCallback`.',
    keyConcept: 'Pass args to handlers: wrap in arrow function or use bind. Never call directly: onClick={fn()} runs on render.',
    xpReward: 10,
    tags: ['events', 'event-handling', 'jsx', 'callbacks'],
  },
  {
    id: 'react-134',
    technology: 'react',
    topic: 'Lists & Keys',
    difficulty: 'medium',
    question: 'Why is using array index as a key problematic for lists that can be reordered?',
    codeSnippet: `// Problematic with index keys when items are reordered/deleted
{items.map((item, index) => (
  <TodoItem key={index} item={item} />
))}

// Better: stable unique IDs
{items.map((item) => (
  <TodoItem key={item.id} item={item} />
))}`,
    options: [
      'When items are reordered or deleted, index keys cause React to reuse existing component state for the wrong items, leading to mismatched state and input values',
      'Index keys are forbidden by React and cause a console error',
      'Index keys prevent React\'s reconciliation from working at all',
      'Index keys are fine for reordering — they only cause problems when items are added',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Consider a list [A, B, C] with index keys 0, 1, 2. If you delete A, the list becomes [B, C] with keys 0, 1. React matches the new key 0 to the old key 0 — but old key 0 was A\'s component, which had A\'s state (e.g., a checked checkbox). React will update B\'s props but reuse A\'s component instance with its state. If B had its own checkbox state, it now incorrectly inherits A\'s. This causes visual bugs with inputs, checkboxes, and any component with internal state. Use stable, unique IDs always.',
    keyConcept: 'Index keys: component state follows the index, not the item. Delete/reorder causes state mismatch. Use stable IDs.',
    xpReward: 10,
    tags: ['keys', 'lists', 'reconciliation', 'bugs'],
  },
  {
    id: 'react-135',
    technology: 'react',
    topic: 'useState Hook',
    difficulty: 'hard',
    question: 'How do you correctly update a nested object in React state without mutation?',
    codeSnippet: `const [user, setUser] = useState({
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' }
});

// To update city:
// Wrong - mutates state
user.address.city = 'LA';
setUser(user);

// Correct - spread to create new objects
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: 'LA' }
}));`,
    options: [
      'Spread at every level of nesting to create new object references all the way up to the root state object',
      'Mutate the nested property directly before calling setState — React detects deep changes',
      'Use Object.assign() on the root object — it creates a new reference automatically',
      'Store address as a separate useState to avoid the nesting issue entirely',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React uses reference equality to detect state changes. Mutating a nested property doesn\'t change the root object reference, so React may not re-render (or if it does, you\'ve broken the React model). You must create new object references at every level of the path you\'re updating. Spread syntax makes this manageable for 1-2 levels, but deep nesting becomes verbose. Alternatives: use Immer (which lets you write mutating code that produces immutable results), normalize state structure (avoid deep nesting), or split into separate `useState` hooks.',
    keyConcept: 'Immutable updates: spread at every level. Immer simplifies deep updates. Mutation breaks React\'s change detection.',
    xpReward: 15,
    tags: ['useState', 'immutability', 'state', 'objects'],
  },
  {
    id: 'react-136',
    technology: 'react',
    topic: 'Performance Optimization',
    difficulty: 'easy',
    question: 'What is the purpose of the `key` prop when wrapping a Suspense boundary around lazy-loaded routes?',
    options: [
      'Changing the key when the route changes causes Suspense to show the fallback again instead of keeping stale content while the new route loads',
      'The key prop on Suspense prevents the fallback from flashing briefly',
      'The key prop is required for Suspense to work with React Router',
      'The key prop memoizes the Suspense boundary to avoid re-mounting',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'If you use one Suspense boundary for all routes, navigating between lazy routes won\'t show the fallback for subsequent navigations (because Suspense only shows the fallback when the current content is suspended, and if content from a previous route is still rendered, it shows that instead). Adding `key={location.pathname}` to the Suspense boundary forces it to remount when the route changes, making the fallback show correctly for each navigation. This is a subtle Suspense behavior related to React\'s "showing stale content during transition" optimization.',
    keyConcept: 'key on Suspense: forces remount on route change, shows fallback again. Prevents stale content during navigation.',
    xpReward: 5,
    tags: ['Suspense', 'lazy', 'routing', 'performance'],
  },
  {
    id: 'react-137',
    technology: 'react',
    topic: 'useEffect Hook',
    difficulty: 'medium',
    question: 'What is the difference between useEffect and useLayoutEffect?',
    options: [
      'useEffect fires asynchronously after the browser paints; useLayoutEffect fires synchronously before the browser paints, allowing DOM measurements and mutations without visible flicker',
      'useLayoutEffect only runs on the initial mount; useEffect runs on every render',
      'useLayoutEffect is for layout-related CSS changes; useEffect is for all other side effects',
      'useEffect runs on the server during SSR; useLayoutEffect only runs on the client',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useLayoutEffect` fires after React has committed DOM changes but before the browser has painted them to the screen. This makes it ideal for: reading DOM measurements (`getBoundingClientRect`), synchronously re-positioning elements, and any DOM mutation that would cause visible flicker if done after paint. `useEffect` fires after paint — good for subscriptions, logging, or anything that doesn\'t need to block the visual update. Prefer `useEffect` by default; reach for `useLayoutEffect` only when you see visual flicker. Note: `useLayoutEffect` doesn\'t run on the server during SSR.',
    keyConcept: 'useLayoutEffect: before paint, synchronous. useEffect: after paint, async. Use useLayoutEffect for DOM measurements.',
    xpReward: 10,
    tags: ['useEffect', 'useLayoutEffect', 'dom', 'performance'],
  },
  {
    id: 'react-138',
    technology: 'react',
    topic: 'Components',
    difficulty: 'easy',
    question: 'What is the difference between class components and function components in modern React?',
    options: [
      'Function components with hooks can do everything class components can, are simpler, shorter, and are the recommended approach; class components are legacy but still supported',
      'Class components are faster because they avoid function call overhead on each render',
      'Function components cannot handle errors — you must use class components for Error Boundaries',
      'Class components support TypeScript; function components do not',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React hooks (introduced in 16.8) gave function components the ability to handle state, effects, context, and lifecycle — everything class components did. Function components are simpler (no `this` binding issues, no constructor), shorter, easier to test, and compose better through custom hooks. The React team recommends function components for all new code. The one remaining exception: Error Boundaries (`componentDidCatch`, `getDerivedStateFromError`) still require class components — there\'s no hook equivalent as of React 18.',
    keyConcept: 'Function components: modern standard with hooks. Class components: legacy. Error Boundaries still require class components.',
    xpReward: 5,
    tags: ['class-components', 'function-components', 'hooks', 'lifecycle'],
  },
  {
    id: 'react-139',
    technology: 'react',
    topic: 'Testing (RTL)',
    difficulty: 'medium',
    question: 'What does `userEvent` do in React Testing Library, and how does it differ from `fireEvent`?',
    codeSnippet: `import userEvent from '@testing-library/user-event';

test('typing in input', async () => {
  const user = userEvent.setup();
  render(<SearchInput />);
  const input = screen.getByRole('textbox');
  await user.type(input, 'hello');
  expect(input).toHaveValue('hello');
});`,
    options: [
      'userEvent simulates realistic browser interactions (focus, keydown, keypress, keyup, input events in sequence); fireEvent dispatches a single DOM event, which is less realistic for testing user interactions',
      'userEvent is for testing custom events; fireEvent is for testing native DOM events',
      'userEvent is async and always requires await; fireEvent is synchronous and doesn\'t',
      'userEvent is part of React itself; fireEvent is from the testing-library package',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`userEvent` (from `@testing-library/user-event`) simulates how users actually interact with the browser: typing fires a sequence of events (focus, keydown, keypress, keyup, input, change), clicking handles hover states, tab key moves focus correctly, etc. `fireEvent` dispatches a single synthetic event, which can miss validation or handlers that listen to the sequence of events. For most interaction tests, `userEvent` gives higher confidence that your component works as users expect. RTL v14 requires `userEvent.setup()` for proper pointer/keyboard state management.',
    keyConcept: 'userEvent: realistic interaction sequences. fireEvent: single event, less realistic. Prefer userEvent for confidence.',
    xpReward: 10,
    tags: ['testing', 'RTL', 'userEvent', 'fireEvent'],
  },
  {
    id: 'react-140',
    technology: 'react',
    topic: 'Props & State',
    difficulty: 'medium',
    question: 'What is "derived state" and why should you avoid storing it in state?',
    codeSnippet: `// Anti-pattern: derived state in useState
function ItemList({ items }) {
  const [filteredItems, setFilteredItems] = useState(
    items.filter(i => i.active)
  );
  // Problem: filteredItems won't update when items prop changes

  // Better: derive during render
  const filteredItems = items.filter(i => i.active);
  // Or with useMemo for expensive computations:
  const filteredItems = useMemo(
    () => items.filter(i => i.active), [items]
  );
}`,
    options: [
      'Derived state is computed from existing state/props; storing it in useState creates sync bugs because it only initializes once and won\'t update when source data changes',
      'Derived state is data fetched from an API, which should always be stored in state',
      'Derived state refers to state in child components derived from parent props — a valid pattern',
      'Derived state is any state computed inside useReducer and is always safe',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Derived state is any value that can be calculated from existing state or props. Storing it in `useState` creates two sources of truth — and keeping them in sync is error-prone. The `useState` initializer only runs on mount, so if `items` prop changes, `filteredItems` state becomes stale. The fix: compute derived values during render (if cheap) or with `useMemo` (if expensive). This is "don\'t sync state that can be derived" — a key React principle. React\'s `getDerivedStateFromProps` was notorious for this anti-pattern in class components.',
    keyConcept: 'Avoid derived state in useState — single source of truth. Compute during render or useMemo.',
    xpReward: 10,
    tags: ['derived-state', 'useState', 'props', 'anti-patterns'],
  },
  {
    id: 'react-141',
    technology: 'react',
    topic: 'Routing (React Router v6)',
    difficulty: 'medium',
    question: 'How do you access URL parameters in React Router v6?',
    codeSnippet: `// Route definition
<Route path="/users/:userId/posts/:postId" element={<Post />} />

// Inside the Post component:
import { useParams } from 'react-router-dom';
function Post() {
  const { userId, postId } = useParams();
  return <div>User {userId}, Post {postId}</div>;
}`,
    options: [
      'Use the `useParams` hook which returns an object with route parameter names as keys matching the `:param` segments in the path',
      'Access params via `this.props.match.params` like in React Router v5 class components',
      'Read params from `window.location.pathname` and parse them manually',
      'Use `useLocation` and destructure the `params` property from the returned object',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`useParams()` in React Router v6 returns a key-value object where keys match the named parameters (`:paramName`) in your route path. For nested routes, `useParams` is available anywhere inside the matched route subtree. This replaced the v5 pattern of `props.match.params` (class) or `useParams` (hooks — same in v5 and v6). `useLocation` gives you the full location object (pathname, search, hash, state) but not parsed params. `useSearchParams` handles query strings.',
    keyConcept: 'useParams: access :paramName from route path. useLocation: full location object. useSearchParams: query strings.',
    xpReward: 10,
    tags: ['routing', 'react-router', 'useParams', 'url-params'],
  },
  {
    id: 'react-142',
    technology: 'react',
    topic: 'Server Components (React 18/19)',
    difficulty: 'medium',
    question: 'What is streaming SSR in React 18 and how does Suspense enable it?',
    options: [
      'Streaming SSR sends HTML to the browser in chunks — ready parts stream immediately while Suspense boundaries act as flush points, sending their HTML when the async data resolves',
      'Streaming SSR compresses the HTML payload to reduce bandwidth usage during server rendering',
      'Streaming SSR means the server sends JavaScript in small streams instead of one large bundle',
      'Streaming SSR enables real-time data updates by keeping the HTTP connection open permanently',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'React 18\'s streaming SSR (via `renderToPipeableStream` or `renderToReadableStream`) enables progressive HTML delivery. The server starts sending HTML immediately for the parts that are ready, and Suspense boundaries wrap async-data-dependent parts. When a boundary\'s data resolves, React streams the completed HTML for that section. The browser can start parsing and displaying content before the full page is ready. This dramatically improves Time to First Byte (TTFB) and First Contentful Paint (FCP) for data-heavy pages.',
    keyConcept: 'Streaming SSR: progressive HTML delivery. Suspense = async flush point. Improves TTFB and FCP.',
    xpReward: 10,
    tags: ['streaming-SSR', 'Suspense', 'react18', 'performance'],
  },
  {
    id: 'react-143',
    technology: 'react',
    topic: 'useMemo & useCallback',
    difficulty: 'hard',
    question: 'What is "over-optimization" with useMemo and useCallback, and when does it hurt performance?',
    options: [
      'Adding useMemo/useCallback everywhere adds memory overhead and comparison cost on every render — only beneficial when the saved computation or re-render cost exceeds this overhead',
      'Over-optimization means applying useMemo to already-fast computations, which is harmless but wasteful code',
      'useCallback always improves performance regardless of the component size',
      'useMemo hurts performance only when used inside loops',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Every `useMemo` and `useCallback` adds overhead: React must store the cached value in memory, and on every render it compares the dependency array (shallowly). For cheap computations or components that rarely receive new props, this overhead can exceed the savings. Signs you\'re over-optimizing: wrapping primitive calculations, memoizing components that aren\'t receiving stable prop references anyway, or applying `memo` to components that almost always re-render. Profile first with React DevTools, then optimize. Kent C. Dodds\'s "AHA Programming" advises avoiding premature abstraction.',
    keyConcept: 'Over-optimization: memo/useMemo/useCallback have costs. Profile first. Only optimize measured bottlenecks.',
    xpReward: 15,
    tags: ['useMemo', 'useCallback', 'performance', 'optimization'],
  },
  {
    id: 'react-144',
    technology: 'react',
    topic: 'Components',
    difficulty: 'medium',
    question: 'What is the difference between `React.StrictMode` in development and production?',
    options: [
      'StrictMode is development-only; it double-invokes render functions, effects, and reducers to help detect side effects. In production, it has zero overhead.',
      'StrictMode adds runtime type checking in production to catch prop type errors',
      'StrictMode enables server-side rendering for all components wrapped within it',
      'StrictMode replaces the Error Boundary in both development and production',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`React.StrictMode` is a development tool only — it adds zero overhead to production builds. In development (React 18+), it deliberately double-invokes: component render functions, `useState` initializers, `useMemo` callbacks, and `useEffect` setup+cleanup+setup. This intentional double-invocation helps surface impure renders and effects that aren\'t properly cleaned up. If your component breaks in StrictMode, it\'s revealing a real bug that would cause problems in production with concurrent features enabled. Always develop with StrictMode enabled.',
    keyConcept: 'StrictMode: dev-only. Double-invokes renders and effects to find bugs. Zero production cost.',
    xpReward: 10,
    tags: ['StrictMode', 'development', 'debugging', 'components'],
  },
  {
    id: 'react-145',
    technology: 'react',
    topic: 'Suspense & Transitions',
    difficulty: 'hard',
    question: 'What is the `use()` hook in React 19 and how does it differ from async/await?',
    codeSnippet: `// React 19 use() hook
function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends if promise is pending
  return <h1>{user.name}</h1>;
}

// Parent (Server Component or RSC):
const userPromise = fetchUser(userId); // Start fetch, don't await
return (
  <Suspense fallback={<Skeleton />}>
    <UserProfile userPromise={userPromise} />
  </Suspense>
);`,
    options: [
      'use() unwraps a Promise or Context inside a component — it suspends the component if the Promise is pending, without needing async/await. Unlike hooks, it can be called conditionally.',
      'use() is identical to async/await but with React-specific error handling built in',
      'use() is a replacement for useEffect that supports async functions directly',
      'use() is only for reading Context values and is an alias for useContext()',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`use()` is a new React 19 primitive that reads the value from a Promise or Context. For Promises: if the Promise is pending, the component suspends (shows Suspense fallback); if resolved, returns the value; if rejected, throws to the nearest Error Boundary. Unlike other hooks, `use()` CAN be called conditionally (inside if statements, loops). For Context: `use(MyContext)` is equivalent to `useContext(MyContext)` but allows conditional usage. The pattern of passing promises from Server Components to Client Components enables efficient streaming data fetching.',
    keyConcept: 'use(): unwraps Promise (suspends if pending) or Context. Unique: can be called conditionally unlike other hooks.',
    xpReward: 15,
    tags: ['use', 'react19', 'Suspense', 'promises'],
  },
  {
    id: 'react-146',
    technology: 'react',
    topic: 'State Management',
    difficulty: 'medium',
    question: 'What is the difference between Jotai and Recoil for atomic state management?',
    options: [
      'Both use atoms as minimal state units, but Jotai is simpler (no atom keys required, smaller bundle), while Recoil needs string keys for atoms and has more built-in features like selectors with caching',
      'Recoil is for global state; Jotai is for local component state only',
      'Jotai requires a Provider; Recoil works without any Provider component',
      'They are identical libraries with different naming conventions',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Both Jotai and Recoil follow the "atomic" state model — state is split into small atoms that components subscribe to individually, enabling precise re-renders. Recoil (by Facebook/Meta) requires string keys for atoms (used for serialization/DevTools) and has more features like atom effects and selectors. Jotai is more minimal: atoms are JavaScript objects (no keys needed), has a smaller bundle, and its API is closer to `useState`. Jotai\'s `atomWithStorage`, `atomWithQuery`, and other utilities offer similar capabilities to Recoil. Jotai is generally favored for its simplicity.',
    keyConcept: 'Atomic state: atoms = minimal state units, granular re-renders. Jotai: simpler, no keys. Recoil: string keys, more features.',
    xpReward: 10,
    tags: ['jotai', 'recoil', 'state-management', 'atomic'],
  },
  {
    id: 'react-147',
    technology: 'react',
    topic: 'Custom Hooks',
    difficulty: 'medium',
    question: 'How do you implement a `useLocalStorage` custom hook that syncs state with localStorage?',
    codeSnippet: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
    options: [
      'Use lazy useState initializer to read from localStorage on mount, and a custom setter that updates both state and localStorage in sync',
      'Use useEffect to sync state to localStorage after every render',
      'Read from localStorage in every render function call without useState',
      'Use useRef to store the value and manually trigger re-renders when it changes',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'The lazy initializer in `useState(() => ...)` ensures localStorage is only read once on mount. The custom `setValue` function updates both React state (triggering re-render) and localStorage simultaneously. The `try/catch` handles SSR environments (no `window`) and `JSON.parse`/`stringify` errors. For SSR compatibility, check `typeof window !== "undefined"`. A more complete implementation would also listen to the `storage` event to sync across browser tabs. Libraries like `usehooks-ts` provide production-ready versions.',
    keyConcept: 'useLocalStorage: lazy init reads localStorage once. Custom setter syncs both state and localStorage.',
    xpReward: 10,
    tags: ['custom-hooks', 'localStorage', 'useState', 'persistence'],
  },
  {
    id: 'react-148',
    technology: 'react',
    topic: 'JSX & Rendering',
    difficulty: 'easy',
    question: 'What is the difference between `{expression}` and `{{expression}}` in JSX?',
    options: [
      'Single braces inject a JS expression into JSX; double braces are a JS object literal inside JSX expression braces — used for inline styles: style={{ color: \'red\' }}',
      'Double braces create a two-way data binding in JSX',
      'Double braces are for template literals; single braces are for variables',
      'They are identical — React treats them the same',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'In JSX, `{...}` opens a JavaScript expression context. `{{...}}` is simply a JavaScript object literal inside that expression: the outer `{}` is JSX\'s JS context, and the inner `{}` is the object literal. This is why `style={{ color: "red" }}` has double braces: the `style` prop takes a JS object, and JSX needs `{}` to embed JS. It\'s not special syntax — it\'s just an object literal inside JSX\'s expression brackets. This confuses beginners who think it\'s special React syntax.',
    keyConcept: 'Double braces: outer {} = JSX expression, inner {} = JS object literal. style={{...}} is just an object in JSX.',
    xpReward: 5,
    tags: ['jsx', 'syntax', 'styles', 'rendering'],
  },
  {
    id: 'react-149',
    technology: 'react',
    topic: 'Performance Optimization',
    difficulty: 'medium',
    question: 'What is "windowing" (virtualization) and when should you use it in React?',
    options: [
      'Windowing renders only the items visible in the viewport instead of the entire list, dramatically reducing DOM nodes and improving performance for large lists (1000+ items)',
      'Windowing splits a React app into separate browser windows for parallel rendering',
      'Windowing is a React technique to preload components before they become visible',
      'Windowing refers to the time window used by React\'s scheduler for batching updates',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: 'Virtualizing a list means rendering only the DOM nodes currently visible plus a small buffer, recycling nodes as the user scrolls. Instead of 10,000 DOM nodes for a 10,000-item list, you might have only 20-50 in the DOM at any time. Libraries: `react-window` (smaller, performant), `react-virtual` (headless), `TanStack Virtual`. Windowing is essential for: data tables, infinite scroll feeds, large dropdown options, and any list where the total items exceed a few hundred. It pairs with infinite query (React Query) for server-paginated data.',
    keyConcept: 'Windowing/virtualization: render only visible items. react-window, TanStack Virtual. For 100+ items lists.',
    xpReward: 10,
    tags: ['virtualization', 'performance', 'lists', 'react-window'],
  },
  {
    id: 'react-150',
    technology: 'react',
    topic: 'Suspense & Transitions',
    difficulty: 'hard',
    question: 'What is the difference between `startTransition` and `setTimeout` for deferring state updates?',
    codeSnippet: `// Option A: startTransition
startTransition(() => {
  setFilter(newFilter); // Interruptible, React aware
});

// Option B: setTimeout
setTimeout(() => {
  setFilter(newFilter); // Non-interruptible, React unaware
}, 0);`,
    options: [
      'startTransition is React-aware: React can interrupt and abandon the transition if higher-priority updates arrive. setTimeout just delays the update but the resulting render is still non-interruptible.',
      'They are equivalent — both defer state updates to avoid blocking user input',
      'setTimeout always performs better because it uses the browser\'s native scheduler',
      'startTransition blocks the main thread while setTimeout does not',
    ],
    correctAnswer: [0],
    type: 'single',
    explanation: '`startTransition` integrates with React\'s concurrent scheduler. When you type quickly, React can abandon the in-progress expensive render triggered by `startTransition` and immediately handle the new keypress. With `setTimeout`, the delayed update still produces a non-interruptible synchronous render — the browser still freezes while React renders. `startTransition` also sets `isPending` (via `useTransition`), letting you show a spinner. Additionally, `startTransition` updates are batched together and can be deprioritized below urgent work like input handling, scroll, and animations.',
    keyConcept: 'startTransition: concurrent, interruptible by urgent updates. setTimeout: just delayed, still blocking render.',
    xpReward: 15,
    tags: ['startTransition', 'useTransition', 'concurrent', 'performance'],
  },
];
