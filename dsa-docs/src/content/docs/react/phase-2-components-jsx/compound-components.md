---
title: "Compound Components"
description: "Compound components: a pattern where related components share implicit state through context."
---

# Compound Components

## Introduction

Compound components are multiple components that work together under one parent, sharing implicit state via Context. Examples: `<select>` + `<option>`, `<Tabs>` + `<Tab>`, `<Menu>` + `<MenuItem>`.

## Example

```jsx
const TabsContext = createContext();

function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

function Tab({ index, children }) {
  const { active, setActive } = useContext(TabsContext);
  return (
    <button
      onClick={() => setActive(index)}
      style={{ fontWeight: active === index ? 'bold' : 'normal' }}
    >
      {children}
    </button>
  );
}

function TabPanel({ index, children }) {
  const { active } = useContext(TabsContext);
  return active === index ? <div>{children}</div> : null;
}

// Usage
<Tabs>
  <Tab index={0}>Profile</Tab>
  <Tab index={1}>Settings</Tab>
  <TabPanel index={0}>Profile content</TabPanel>
  <TabPanel index={1}>Settings content</TabPanel>
</Tabs>
```

## Benefits

- Implicit state sharing via context
- Clean, declarative API
- Flexible composition without prop drilling

## MCQ

1. **How do compound components share state?** A) Props  B) Context  C) Refs  D) Global vars → *B*
2. **What pattern do compound components use?** A) Singleton  B) Provider pattern  C) Observer  D) Factory → *B*

## Summary

📖 Related components sharing state via Context. Clean API for complex UI patterns like tabs, menus, and accordions.

## Related Topics

[Context API](../phase-3-state-management/context-api) | [Layout Components](layout-components)
