---
title: "Function Annotations in TypeScript"
description: "Deep dive into TypeScript function annotations: parameter types, return types, rest parameters, arrow functions, and call signatures."
---

## Function Annotations in TypeScript

### Basic Annotations

```typescript
// Parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;

// Anonymous functions
const divide = function(a: number, b: number): number {
  return a / b;
};

// Contextual typing (inferred)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // n inferred as number
```

### Optional and Default Parameters

```typescript
// Optional parameter
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameter
function createUser(name: string, role: string = "user", isActive: boolean = true) {
  return { name, role, isActive };
}

// Parameter destructuring
function printUser({ name, age }: { name: string; age?: number }): void {
  console.log(name, age);
}
```

### Rest Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

function buildMessage(prefix: string, ...suffixes: string[]): string {
  return prefix + suffixes.join(" ");
}

function logWithTimestamp(timestamp: number, ...messages: string[]): void {
  console.log(`[${timestamp}]`, ...messages);
}
```

### Call Signatures

```typescript
// Type alias for function shape
type GreetFn = (name: string) => string;

// Interface call signature
interface MathOp {
  (a: number, b: number): number;
}

// With properties (callable + properties)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  const fn = ((start: number) => `Count: ${start}`) as Counter;
  fn.interval = 1000;
  fn.reset = () => { };
  return fn;
}
```

### Construct Signatures

```typescript
// Describes a constructor
type AnimalConstructor = new (name: string) => Animal;

interface DogConstructor {
  new (name: string): Dog;
}

function createAnimal(Ctor: AnimalConstructor, name: string): Animal {
  return new Ctor(name);
}
```

### Interview Questions

**Easy:** How do you type annotate function parameters?

**Medium:** What is the difference between optional and default parameters?

**Hard:** How would you create a callable object with additional properties?
