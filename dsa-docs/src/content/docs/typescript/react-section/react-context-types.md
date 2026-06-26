---
title: "React Context Types in TypeScript"
description: "Complete guide to typing React Context: createContext, useContext, custom providers, and enterprise context patterns."
---

## React Context Types

### Basic Context

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

### Complex Context with Reducer

```tsx
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### Interview Questions

**Easy:** How do you type createContext?

**Medium:** Why is Context typically initialized with undefined?

**Hard:** How would you type a context that uses useReducer?
