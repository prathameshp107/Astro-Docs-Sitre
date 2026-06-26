---
title: "React Event Types in TypeScript"
description: "Complete reference for typing React events: form events, mouse events, keyboard events, clipboard events, and custom event handlers."
---

## React Event Types

### Form Events

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Process form
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
};
```

### Mouse Events

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX, e.clientY);
};

const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {};
const handleContextMenu = (e: React.MouseEvent) => { e.preventDefault(); };
```

### Keyboard Events

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') submit();
  if (e.key === 'Escape') close();
};
```

### Interview Questions

**Easy:** What type is the event parameter in an onSubmit handler?

**Medium:** How do you type an onChange handler for a custom input?

**Hard:** What's the difference between MouseEvent and React.MouseEvent?
