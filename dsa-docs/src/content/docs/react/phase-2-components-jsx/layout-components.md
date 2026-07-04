---
title: "Layout Components"
description: "Layout components structure pages using the children prop, creating reusable shells for headers, sidebars, and content areas."
---

# Layout Components

## Introduction

Layout components are components concerned with **structure** rather than content. They use the `children` prop to render whatever content is passed inside them, wrapping it with shared UI like headers, footers, and sidebars. This keeps repeated page structure in one place.

---

## The Children Prop

The `children` prop is a special prop React provides automatically. It contains whatever JSX is nested between the component's opening and closing tags.

```jsx
function Box({ children }) {
  return <div style={{ border: '1px solid #ccc', padding: '16px' }}>{children}</div>;
}

// Usage
<Box>
  <p>This content is inside the box.</p>
</Box>
```

**Explanation:** The `<p>` element becomes `children` inside `Box`. The layout component doesn't need to know what it's wrapping — it just places `children` in the right spot.

---

## Common Layout Components

### Page Shell

```jsx
function PageLayout({ header, sidebar, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1f2937', color: 'white', padding: '16px' }}>
        {header}
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '250px', background: '#f3f4f6', padding: '16px' }}>
          {sidebar}
        </aside>
        <main style={{ flex: 1, padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Usage
<PageLayout header={<h1>My App</h1>} sidebar={<nav>Links...</nav>}>
  <p>Main content goes here.</p>
</PageLayout>
```

### Centered Content

```jsx
function CenteredLayout({ children, maxWidth = '600px' }) {
  return (
    <div style={{
      maxWidth,
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh'
    }}>
      {children}
    </div>
  );
}
```

### Split Panel

```jsx
function SplitPanel({ left, right, ratio = '1:1' }) {
  const [leftRatio, rightRatio] = ratio.split(':').map(Number);
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ flex: leftRatio }}>{left}</div>
      <div style={{ flex: rightRatio }}>{right}</div>
    </div>
  );
}
```

---

## Multiple Children

You can also pass multiple named children instead of using the single `children` prop:

```jsx
function DashboardLayout({ topNav, sidebar, main, footer }) {
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '100vh' }}>
      <nav>{topNav}</nav>
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '200px' }}>{sidebar}</aside>
        <main style={{ flex: 1 }}>{main}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}
```

---

## Best Practices

💡 Layout components are the foundation of design systems. They keep visual consistency across pages.

🚀 **Best Practices**
- Keep layout components **pure** — no data fetching, no business logic.
- Use CSS Grid or Flexbox for layout. Avoid absolute positioning.
- Accept `className` and `style` props for customization.
- Consider using `React.Children.toArray` if you need to manipulate children.

---

## Summary

Layout components use `children` (or named props) to wrap content in structured shells. They separate page structure from page content, making layouts reusable and consistent.

## Related Topics

- [Compound Components](compound-components)
- [Children Prop](children-prop)
- [Container Components](container-components)

## Further Reading

- [React Docs: Children Prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
