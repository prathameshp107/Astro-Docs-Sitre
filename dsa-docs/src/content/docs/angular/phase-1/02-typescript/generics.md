---
title: "Generics in TypeScript"
description: "Generics create reusable components that work with any type while preserving type safety."
sidebar:
  order: 9
---

### 3.9 Generics

#### Simple Words First 🟡
A generic is like a **box that adapts to whatever you put inside it**. You define "a box" once, and when you use it, you tell TypeScript what type of thing will go inside. One definition, infinite type-safe uses.

```typescript
// Without Generics — we need separate functions for each type
function getFirstString(arr: string[]): string { return arr[0]; }
function getFirstNumber(arr: number[]): number { return arr[0]; }

// With Generics — one function works for ALL types!
// T is a "placeholder" for whatever type you use it with
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstString = getFirst<string>(["a", "b", "c"]);  // returns "a"
const firstNumber = getFirst<number>([10, 20, 30]);       // returns 10

// ──── Generic Interface (very common in Angular HTTP calls) ────
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface User { id: number; name: string; }
interface Product { id: number; name: string; price: number; }

// TypeScript knows exactly what 'data' contains
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success",
  timestamp: new Date()
};

const productResponse: ApiResponse<Product> = {
  data: { id: 1, name: "Laptop", price: 75000 },
  status: 200,
  message: "Success",
  timestamp: new Date()
};

// ──── Generic Class ────
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const stringStore = new DataStore<string>();
stringStore.add("hello");
// stringStore.add(123);  // ❌ Error! Only strings allowed

const numberStore = new DataStore<number>();
numberStore.add(42);
```