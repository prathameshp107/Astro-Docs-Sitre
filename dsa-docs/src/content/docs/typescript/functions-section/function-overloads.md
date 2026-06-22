---
title: "Function Overloads in TypeScript"
description: "Deep dive into TypeScript function overloads: multiple signatures, implementation signatures, overload resolution, and real-world patterns."
---

## Function Overloads in TypeScript

### Basic Overloads

```typescript
// Multiple call signatures
function process(input: string): string;
function process(input: number): number;
function process(input: boolean): boolean;

// Implementation signature (must handle all overloads)
function process(input: string | number | boolean): string | number | boolean {
  if (typeof input === "string") return input.toUpperCase();
  if (typeof input === "number") return input * 2;
  return !input;
}
```

### Overloads with Different Parameter Counts

```typescript
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input", options: { type: string }): HTMLInputElement;
function createElement(tag: string, options?: Record<string, unknown>): Element {
  const el = document.createElement(tag);
  if (options) Object.assign(el, options);
  return el;
}
```

### Overload Best Practices

```typescript
// Prefer union types when possible
function pad(value: string, padding: number | string): string {
  if (typeof padding === "number") return " ".repeat(padding) + value;
  return padding + value;
}

// Use overloads when return types differ based on input shape
function getData(url: string): Promise<Response>;
function getData<T>(url: string, parser: (data: unknown) => T): Promise<T>;
function getData<T>(url: string, parser?: (data: unknown) => T) {
  return fetch(url).then(res => res.json()).then(data => parser ? parser(data) : data);
}
```

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Implementation incompatible with overloads | Implementation must handle ALL overload signatures |
| Overloads with too many variations | Use union types or generics instead |
| Missing overload for common case | Always include the most general case |

### Interview Questions

**Easy:** What are function overloads?

**Medium:** How many overloads can a function have?

**Hard:** When should you use overloads vs union types?
