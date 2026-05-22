---
title: "Lists and Keys"
description: "Rendering lists, keys, and reading data from files in React."
---

## Lists and Keys

- A `key` is a special attribute required when creating list items.
- Console warning appears if key prop is missing.
- Keys give elements a **stable unique identity**.
- Helps React identify which items changed, were added, or removed.

```jsx
{EmployeeArr.map((emp, ind) => (
  <option key={ind} value={emp} />
))}
```

> **Tip:** Avoid using index as key if the list is filtered or sorted - it causes React to consider items as different elements and repaint the whole list.

> **Note:** `map()` is used instead of `forEach()` because JSX needs an array of items - `forEach()` returns `undefined`, `map()` returns an array.

### Read Data from JSON / JS File

```js
// 1. Create employees.json
// 2. Import it
import EmployeeArr from './employees.json';
// 3. Use in JSX
{EmployeeArr.map((emp, ind) => (
  <option key={ind} value={emp} />
))}
```

---
