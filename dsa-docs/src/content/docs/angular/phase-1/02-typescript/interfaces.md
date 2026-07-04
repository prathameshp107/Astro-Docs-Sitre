---
title: "Interfaces in TypeScript"
description: "Interfaces define the shape of objects — a contract for how data should look."
sidebar:
  order: 6
---

### 3.6 Interfaces

#### Simple Words First 🟡
An interface is like a **contract** or a **blueprint**. It says: "If you want to be a User, you MUST have these specific properties." It doesn't create an actual object — it just describes the shape of one.

```typescript
// Define the "shape" of a User object
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;           // Optional property (notice the ?)
  readonly createdAt: Date;  // Cannot be changed after creation
}

// Any object assigned to User type MUST match this shape
const newUser: User = {
  id: 1,
  name: "Arjun",
  email: "arjun@email.com",
  createdAt: new Date()
};

// ──── Interface with Methods ────
interface Product {
  name: string;
  price: number;
  getDiscountedPrice(percent: number): number;  // Method signature
}

// ──── Extending Interfaces (inheritance) ────
interface Animal {
  name: string;
  sound(): void;
}

interface Dog extends Animal {
  breed: string;   // Dog has everything Animal has + breed
}

const myDog: Dog = {
  name: "Tommy",
  breed: "Labrador",
  sound() { console.log("Woof!"); }
};

// ──── Why Interfaces Matter in Angular ────
// In Angular, you ALWAYS define interfaces for data from APIs
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserProfile {
  id: number;
  username: string;
  avatar: string;
  joinDate: string;
}

// When you get user from API, TypeScript knows exactly what's in it
function loadUser(response: ApiResponse<UserProfile>): void {
  console.log(response.data.username);  // TypeScript autocompletes this!
}
```