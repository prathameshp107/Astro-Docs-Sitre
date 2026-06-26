---
title: "Index Signatures in TypeScript"
description: "Deep dive into TypeScript index signatures: dynamic object keys, string/number indexers, mixed signatures, and real-world patterns."
---

## Index Signatures in TypeScript

### Basic Index Signature

```typescript
// String index signature
interface StringDict {
  [key: string]: string;
}

const translations: StringDict = {
  hello: "Hola",
  goodbye: "Adiós",
};
```

### Number Index Signature

```typescript
interface NumberDict {
  [index: number]: string;
}

const arr: NumberDict = ["a", "b", "c"];
console.log(arr[0]); // "a"
```

### Mixed Signatures

```typescript
interface MixedDict {
  [index: string]: number | string;
  length: number;     // OK: number is in the union
  name: string;       // OK: string is in the union
}
```

### Readonly Index Signature

```typescript
interface ReadonlyDict {
  readonly [key: string]: number;
}

const scores: ReadonlyDict = { alice: 95, bob: 87 };
// scores.alice = 100; // ❌ Error: Index signature is readonly
```

### Real Project Example

```typescript
// Form errors dictionary
interface FormErrors {
  [field: string]: string | undefined;
}

// API headers
interface Headers {
  [header: string]: string | string[] | undefined;
  "Content-Type": string;
  Authorization?: string;
}
```

### Interview Questions

**Easy:** What does `[key: string]: string` mean?

**Medium:** What are the restrictions on index signature parameter types?

**Hard:** How would you type a dictionary that maps string keys to specific value types?
