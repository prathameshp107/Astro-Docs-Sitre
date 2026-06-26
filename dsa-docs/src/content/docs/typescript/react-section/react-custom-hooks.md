---
title: "Custom Hooks with TypeScript"
description: "Complete guide to building type-safe custom React hooks: generic hooks, typed return values, and enterprise hook patterns."
---

## Custom Hooks with TypeScript

### Generic Data Fetching Hook

```tsx
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json as T);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => { fetchData(); }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// Usage
const { data: users, loading } = useApi<User[]>('/api/users');
```

### Local Storage Hook

```tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}

const [token, setToken] = useLocalStorage<string | null>('auth-token', null);
```

### Interview Questions

**Easy:** How do you type a custom hook's return value?

**Medium:** How do you create a generic custom hook?

**Hard:** How would you type a hook that returns multiple state values?
