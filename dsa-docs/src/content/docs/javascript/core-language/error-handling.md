---
title: "Error Handling"
description: "try/catch/finally, throw, Error types, custom error classes, and error handling in async code."
sidebar:
  order: 10
---

## Error Handling

Errors happen. JavaScript gives you tools to catch, handle, and recover from them gracefully.

### `try/catch/finally`

```javascript
try {
  const result = JSON.parse("invalid json");
  console.log("This won't run");
} catch (error) {
  console.error("Parse failed:", error.message);
  // "Parse failed: Unexpected token i in JSON at position 0"
} finally {
  console.log("This always runs — cleanup here");
}
// Logs always: "This always runs — cleanup here"
```

### `throw`

You can throw your own errors.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.message); // "Division by zero"
  console.log(e.name);    // "Error"
  console.log(e.stack);   // stack trace (where the error occurred)
}
```

### Built-in Error Types

```javascript
try {
  // ReferenceError
  console.log(undefinedVar);
} catch (e) {
  console.log(e instanceof ReferenceError); // true
}

try {
  // TypeError
  null.method();
} catch (e) {
  console.log(e instanceof TypeError); // true
}

try {
  // SyntaxError (from JSON.parse, eval)
  JSON.parse("not json");
} catch (e) {
  console.log(e instanceof SyntaxError); // true
}

try {
  // RangeError
  new Array(-1);
} catch (e) {
  console.log(e instanceof RangeError); // true
}
```

### Custom Error Classes

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

// Usage
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
  if (user.age < 0) {
    throw new ValidationError("Age must be positive", "age");
  }
}

try {
  validateUser({ name: "", age: -5 });
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`${e.field}: ${e.message}`);
  } else {
    throw e; // re-throw unhandled errors
  }
}
```

### Error Handling in Async Code

```javascript
// async/await with try/catch
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new NetworkError("User not found", response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error("API error:", error.statusCode);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // re-throw if caller needs to know
  }
}
```

> For a deep dive into Promises and async/await patterns, see the [Namaste JavaScript async/await notes](/DSA-Notes-Problems/namaste-js/season-2/async-await) and [promises notes](/DSA-Notes-Problems/namaste-js/season-2/promises).

### `finally` for Cleanup

The `finally` block runs regardless of success or failure — perfect for cleanup.

```javascript
async function loadData() {
  showSpinner(true);
  try {
    const data = await fetchData();
    return process(data);
  } catch (e) {
    showError(e);
  } finally {
    showSpinner(false); // always hides the spinner
  }
}
```

### Key Takeaways

- `try/catch/finally` catches exceptions; `finally` always runs for cleanup
- `throw new Error("message")` creates and throws an error
- Use custom error classes (`extends Error`) for different error types
- Always use `try/catch` with `await` — unhandled promise rejections crash the process
- Check error types with `instanceof` for targeted handling
- Re-throw errors you can't handle — don't swallow them silently
