---
title: "React Hooks Types in TypeScript"
description: "Complete guide to typing all React hooks: useState, useRef, useReducer, useEffect, useMemo, useCallback, and custom hooks."
---

## React Hooks Types

### useState

```tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// Type inference works for simple cases
const [name, setName] = useState(""); // inferred as string
```

### useRef

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const intervalRef = useRef<number | undefined>(undefined);

// Mutable ref
const countRef = useRef(0);
countRef.current += 1;
```

### useReducer

```tsx
type Action = 
  | { type: 'increment'; payload?: number }
  | { type: 'decrement' }
  | { type: 'reset' };

interface State { count: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + (action.payload ?? 1) };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
  }
}
```

### Interview Questions

**Easy:** How do you type useState with a complex object?

**Medium:** How do you type useReducer with discriminated unions?

**Hard:** How does useRef differ for DOM refs vs mutable values?
