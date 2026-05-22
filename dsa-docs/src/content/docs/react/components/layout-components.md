---
title: "Layout Components"
description: "React components used to structure pages and shared screen regions."
---

# Layout Components

Layout components define structure around page content.

```jsx
function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
    </div>
  );
}
```

## Common Examples

- App shell
- Header and footer layout
- Dashboard layout
- Sidebar layout
- Page wrappers

Layout components keep repeated page structure in one place.

