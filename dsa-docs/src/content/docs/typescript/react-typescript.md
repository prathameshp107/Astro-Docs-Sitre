---
title: "React + TypeScript Guide"
description: "Complete guide to using TypeScript with React: typing props, state, events, refs, context, custom hooks, and enterprise patterns for React applications."
---

## React + TypeScript Guide

### Typing Component Props

```tsx
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick} disabled={disabled}>
      {label}
      {children}
    </button>
  );
};
```

### Typing Hooks

```tsx
// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const intervalRef = useRef<number | undefined>(undefined);

// useReducer
interface State { count: number; step: number }
type Action = { type: "increment" } | { type: "decrement" } | { type: "setStep"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment": return { ...state, count: state.count + state.step };
    case "decrement": return { ...state, count: state.count - state.step };
    case "setStep": return { ...state, step: action.payload };
  }
}
```

### Event Types

```tsx
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value); };

// Mouse events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {};
```

### Typing Context

```tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
```

### Custom Hooks with Types

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  return [storedValue, setStoredValue];
}

// Usage
const [token, setToken] = useLocalStorage<string | null>("auth-token", null);
```

### Enterprise Patterns

```tsx
// Generic API hook
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => { setData(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data: users, loading } = useApi<User[]>("/api/users");
```

### Interview Questions

**Easy:** How do you type React props with TypeScript?

**Medium:** How do you type useReducer actions with discriminated unions?

**Hard:** Create a generic custom hook for API calls with proper TypeScript types.
