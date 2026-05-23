---
title: "3. TypeScript Fundamentals for Angular"
description: "TypeScript is JavaScript with type safety — it catches errors at development time, before the app even runs."
sidebar:
  order: 3
---

## 3. TypeScript Fundamentals for Angular

### Why TypeScript?

#### Simple Words First 🟡
Imagine building a house. With regular JavaScript, it's like working without labels — you pick up a box but don't know if it contains nails or screws until you open it. TypeScript puts **labels on every box** — you always know what type of thing you're working with before you even open the box.

TypeScript is JavaScript with **type safety** — it catches errors at development time, before the app even runs.

---

### 3.1 Variables

#### `var`, `let`, and `const`

```typescript
// ❌ NEVER use 'var' in Angular (old way, has scoping bugs)
var oldWay = "don't use me";

// ✅ Use 'let' for values that WILL change
let userAge: number = 25;
userAge = 26;  // This is fine, value changed

// ✅ Use 'const' for values that will NOT change
const appName: string = "My Angular App";
// appName = "Other App";  // ❌ ERROR! const cannot be reassigned

// TypeScript Type Annotations (the colon : syntax)
let userName: string = "Alice";    // Must be a string
let isLoggedIn: boolean = false;   // Must be true/false
let score: number = 100;           // Must be a number

// TypeScript can INFER types (you don't always need to write the type)
let city = "Mumbai";               // TypeScript knows this is a string
let count = 42;                    // TypeScript knows this is a number
```

> **Best Practice:** In Angular, always use `const` by default. Use `let` only when you know the value will change. Never use `var`.

---

### 3.2 Data Types

```typescript
// ──── Primitive Types ────

// String: Text data
let firstName: string = "Rahul";
let greeting: string = `Hello, ${firstName}!`;   // Template literals

// Number: All numbers (integer and decimal)
let age: number = 28;
let price: number = 99.99;
let hex: number = 0xff;

// Boolean: True or false
let isActive: boolean = true;
let hasPermission: boolean = false;

// ──── Special Types ────

// null: Intentionally no value
let selectedUser: string | null = null;   // Can be string OR null

// undefined: Variable declared but not assigned
let pendingData: string | undefined;      // Will be set later

// any: Disables type checking (AVOID in Angular!)
let dangerous: any = "string";
dangerous = 42;      // TypeScript won't catch this type change
dangerous = true;    // Anything goes — dangerous!

// unknown: Safer version of 'any'
let safeAny: unknown = "hello";
if (typeof safeAny === "string") {
  console.log(safeAny.toUpperCase()); // Must check type first
}

// void: Function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
  // no return value
}

// never: Function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

// ──── Union Types ────
// A variable can hold multiple types
let id: string | number;
id = "abc123";   // Valid
id = 12345;      // Also valid

// ──── Type Alias ────
// Create your own type name
type UserId = string | number;
let myId: UserId = "user_001";
```

---

### 3.3 Functions

```typescript
// ──── Basic Function ────
function add(a: number, b: number): number {
  return a + b;
}
const result = add(5, 3);  // result is 8

// ──── Arrow Function (used EVERYWHERE in Angular) ────
const multiply = (a: number, b: number): number => a * b;
const greet = (name: string): string => `Hello, ${name}!`;

// ──── Optional Parameters (use ?) ────
function createUser(name: string, age?: number): string {
  if (age) {
    return `${name} is ${age} years old`;
  }
  return `Name: ${name}`;
}
createUser("Sara");          // Valid — age is optional
createUser("Sara", 25);      // Also valid

// ──── Default Parameters ────
function discount(price: number, percent: number = 10): number {
  return price - (price * percent / 100);
}
discount(100);      // Uses default 10% → returns 90
discount(100, 20);  // Uses 20% → returns 80

// ──── Rest Parameters (variable number of arguments) ────
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sumAll(1, 2, 3, 4, 5);  // returns 15

// ──── Function Overloads ────
// Same function name, different parameter types
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return `Formatted: ${value}`;
}
```

---

### 3.4 Arrays

```typescript
// ──── Typed Arrays ────
let fruits: string[] = ["apple", "mango", "banana"];
let scores: number[] = [85, 92, 78, 95];

// Alternative syntax
let users: Array<string> = ["Alice", "Bob", "Charlie"];

// ──── Common Array Methods (used constantly in Angular) ────

// map: Transform each item → returns new array
const doubled = scores.map(score => score * 2);
// [170, 184, 156, 190]

// filter: Keep only items that pass a test → returns new array
const highScores = scores.filter(score => score > 80);
// [85, 92, 95]

// find: Get the first item that matches
const firstHigh = scores.find(score => score > 90);
// 92

// forEach: Loop through items (no return value)
fruits.forEach(fruit => console.log(fruit));

// some: Returns true if ANY item passes the test
const hasHighScore = scores.some(score => score > 90);
// true

// every: Returns true if ALL items pass the test
const allPassed = scores.every(score => score > 50);
// true

// reduce: Combine all items into one value
const total = scores.reduce((sum, score) => sum + score, 0);
// 350

// includes: Check if array contains a value
const hasMango = fruits.includes("mango");
// true

// Spread operator (common in Angular state management)
const newFruits = [...fruits, "grape"];
// Creates new array: ["apple", "mango", "banana", "grape"]
```

---

### 3.5 Objects

```typescript
// ──── Basic Object ────
const user = {
  name: "Priya",
  age: 30,
  email: "priya@email.com"
};

// Access properties
console.log(user.name);         // Dot notation
console.log(user["age"]);       // Bracket notation

// ──── Typed Object ────
const product: { name: string; price: number; inStock: boolean } = {
  name: "Laptop",
  price: 75000,
  inStock: true
};

// ──── Destructuring (very common in Angular) ────
const { name, age } = user;       // Extract properties to variables
console.log(name);                 // "Priya"
console.log(age);                  // 30

// Rename during destructuring
const { name: userName, age: userAge } = user;

// ──── Spread Operator with Objects ────
const updatedUser = { ...user, age: 31 };
// Creates new object: { name: "Priya", age: 31, email: "priya@email.com" }

// ──── Optional Chaining ?. (very useful in Angular) ────
const address = user?.address?.city;
// If user.address doesn't exist, returns undefined instead of throwing error

// ──── Nullish Coalescing ?? ────
const city = user?.address?.city ?? "Unknown City";
// If result is null/undefined, use "Unknown City"
```

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

---

### 3.7 Classes

#### Simple Words First 🟡
A class is a **cookie cutter**. You define it once — the shape, size, decorations. Then you use it to make as many cookies (objects) as you want, each identical in structure but with different actual values.

```typescript
// Define the class (the cookie cutter)
class Animal {
  // Properties
  name: string;
  sound: string;

  // Constructor: runs when you create a new object
  constructor(name: string, sound: string) {
    this.name = name;
    this.sound = sound;
  }

  // Method: a function belonging to the class
  speak(): string {
    return `${this.name} says ${this.sound}`;
  }
}

// Create instances (the actual cookies)
const cat = new Animal("Cat", "Meow");
const dog = new Animal("Dog", "Woof");

console.log(cat.speak());  // "Cat says Meow"
console.log(dog.speak());  // "Dog says Woof"

// ──── Inheritance ────
class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name, "Woof");   // Call parent class constructor
    this.breed = breed;
  }

  fetch(): string {
    return `${this.name} the ${this.breed} is fetching!`;
  }
}

const labrador = new Dog("Buddy", "Labrador");
console.log(labrador.speak());   // "Buddy says Woof" (inherited)
console.log(labrador.fetch());   // "Buddy the Labrador is fetching!"
```

---

### 3.8 Access Modifiers

#### Simple Words First 🟡
Access modifiers are like the **security level of a room**:
- **public** = Anyone can enter (default)
- **private** = Only people inside this room can access it
- **protected** = This room and children rooms (subclasses) can access it

```typescript
class BankAccount {
  public accountHolder: string;    // Anyone can read/write
  private balance: number;         // Only this class can access
  protected bankName: string;      // This class and subclasses

  constructor(holder: string, initialBalance: number) {
    this.accountHolder = holder;
    this.balance = initialBalance;
    this.bankName = "State Bank";
  }

  // Public method to safely access private balance
  public getBalance(): number {
    return this.balance;
  }

  // Public method to modify private balance with validation
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ₹${amount}. New balance: ₹${this.balance}`);
    }
  }
}

const account = new BankAccount("Rohit", 10000);
account.accountHolder = "Rohit Kumar";  // ✅ Public — can change
// account.balance = 99999;             // ❌ Error! Private — cannot access directly
account.deposit(5000);                  // ✅ Using the public method
console.log(account.getBalance());      // ✅ Using the public getter

// ──── Shorthand Constructor (Angular uses this!) ────
class UserService {
  constructor(
    private apiUrl: string,         // Creates AND assigns private property
    public readonly version: string // Creates AND assigns public readonly property
  ) {}
}
```

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

---

### 3.10 Decorators

#### Simple Words First 🟡
Decorators are like **name tags or badges** you put on a class or function to give it **extra powers**. When Angular sees `@Component`, it says "Oh! This class is a Component. Let me give it all the Component powers."

```typescript
// Decorators start with @
// They are applied immediately ABOVE what they're decorating

// ──── @Component ────
// Tells Angular: "This class controls a piece of the UI"
@Component({
  selector: 'app-user',        // HTML tag: <app-user></app-user>
  templateUrl: './user.html',  // The HTML file
  styleUrls: ['./user.css']    // The CSS file
})
class UserComponent {
  // Component logic here
}

// ──── @Injectable ────
// Tells Angular: "This class is a service that can be injected"
@Injectable({
  providedIn: 'root'  // Available everywhere in the app
})
class UserService {
  // Service logic here
}

// ──── @Input ────
// Marks a property as "receivable from a parent component"
class ChildComponent {
  @Input() username: string = '';  // Parent passes this in
}

// ──── @Output ────
// Marks a property as an "event emitter to the parent"
class ChildComponent {
  @Output() userClicked = new EventEmitter<string>();
}

// ──── Property Decorator Example ────
// Custom decorator that logs property changes
function Log(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
    get: () => value,
    set: (newVal) => {
      console.log(`${key} changed from ${value} to ${newVal}`);
      value = newVal;
    }
  });
}

class Example {
  @Log
  title: string = 'Initial';
}
```

---

### 3.11 Promises & Async/Await

#### Simple Words First 🟡
When you order food at a restaurant, the waiter doesn't make you stand at the kitchen window waiting. They give you a **receipt (a Promise)** and say "I'll bring it when it's ready." You can do other things. When it's ready, they bring it to you.

**Promise** = "I promise to give you a result eventually — it will either succeed (resolve) or fail (reject)."

**async/await** = Sugar-coating that makes Promises look like regular code.

```typescript
// ──── Promise Basics ────
const fetchData = new Promise<string>((resolve, reject) => {
  // Simulate an async operation (like an HTTP call)
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data loaded successfully!");  // Success
    } else {
      reject("Failed to load data");         // Failure
    }
  }, 2000);
});

// Using .then() and .catch()
fetchData
  .then(data => console.log(data))      // Runs on success
  .catch(error => console.error(error)) // Runs on failure
  .finally(() => console.log("Done"));  // Always runs

// ──── async/await (the modern way, used in Angular services) ────

// Mark function as 'async' to use 'await' inside it
async function loadUserData(userId: number): Promise<User> {
  try {
    // 'await' pauses HERE until the Promise resolves
    // Code reads like synchronous, but IS asynchronous
    const response = await fetch(`/api/users/${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    // If anything goes wrong, catch it here
    console.error("Failed to load user:", error);
    throw error;  // Re-throw so caller knows about the error
  }
}

// ──── In Angular Service (real-world usage) ────
@Injectable({ providedIn: 'root' })
class UserService {
  constructor(private http: HttpClient) {}

  // Returns an Observable (Angular's preferred async method)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  // Or with async/await using firstValueFrom
  async getUserById(id: number): Promise<User> {
    return await firstValueFrom(
      this.http.get<User>(`/api/users/${id}`)
    );
  }
}
```

> **Angular Tip:** Angular actually prefers **Observables** (from RxJS) over Promises for HTTP calls. But Promises and async/await are still used in many places. We'll cover Observables in Phase 2.

---
