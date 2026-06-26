---
title: "9. Services & Observables Intro"
description: "What a service is, gentle intro to Observables + async pipe (before the deep RxJS page in Phase 3)."
sidebar:
  order: 10
---

## 9. Services & Observables Intro

### Simple Words First 🟡
Think of a **Service** like a **utility company** — it provides electricity (data) to all the houses (components) in a city. Instead of each house generating its own power, they all tap into the same grid.

An **Observable** is like a **water pipe** — water flows through it, and you can tap into the pipe to get water whenever it flows. Unlike a regular value (like a bucket of water you get once), an Observable keeps giving you new values over time.

---

### What is a Service?

A service is a class that holds **shared logic or data** that multiple components need.

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Available everywhere (singleton — one instance for the whole app)
})
export class UserService {
  private currentUser: string = 'Alice';

  // Regular method — returns data once
  getUserName(): string {
    return this.currentUser;
  }

  // Method that updates data
  setUserName(name: string): void {
    this.currentUser = name;
  }

  // Method that does an API call (simulated)
  getUsers(): { id: number; name: string }[] {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Carol' },
    ];
  }
}
```

```typescript
// any-component.ts — Using the service
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <h2>{{ userName }}</h2>
    <ul>
      <li *ngFor="let user of allUsers">{{ user.name }}</li>
    </ul>
  `
})
export class UserProfileComponent {
  userName: string;
  allUsers: { id: number; name: string }[];

  // Angular INJECTS the service instance automatically
  constructor(private userService: UserService) {
    this.userName = this.userService.getUserName();
    this.allUsers = this.userService.getUsers();
  }
}
```

**Why use services?**
- Avoid repeating code (DRY — Don't Repeat Yourself)
- Share data between components without complex inputs/outputs
- Makes testing easier (mock the service)
- Separates business logic from UI

---

### Gentle Intro to Observables

An **Observable** is like a pipeline that emits values over time. You **subscribe** to it to receive those values.

```typescript
import { Observable } from 'rxjs';

// Creating a simple Observable
const myObservable$ = new Observable<number>((subscriber) => {
  subscriber.next(1);        // Push value 1
  subscriber.next(2);        // Push value 2
  subscriber.next(3);        // Push value 3
  subscriber.complete();     // Signal done (no more values)
});

// Subscribing (tapping into the pipe)
myObservable$.subscribe({
  next: (value) => console.log('Got:', value),  // Handles each value
  error: (err) => console.error('Error:', err), // Handles errors
  complete: () => console.log('Done!'),          // Handles completion
});

// Output:
// Got: 1
// Got: 2
// Got: 3
// Done!
```

**Real-world Observables in Angular:**
- HTTP requests return Observables
- Form value changes are Observables
- Route parameter changes are Observables
- Event listeners can be Observables

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  // Returns an Observable — the actual HTTP call happens when you subscribe
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://api.example.com/products');
  }
}

// In component:
@Component({ ... })
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // NOTHING happens until .subscribe() is called
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products', err),
    });
  }
}
```

### The `async` Pipe — No Need to Subscribe/Unsubscribe

The `async` pipe is magical. It:
1. Automatically subscribes to the Observable
2. Unwraps the value
3. Auto-unsubscribes when the component is destroyed

```typescript
// component.ts
@Component({
  selector: 'app-clock',
  template: `
    <p>Current time: {{ currentTime$ | async | date:'medium' }}</p>
    <!-- 👆 async pipe subscribes and unwraps -->
  `
})
export class ClockComponent {
  currentTime$ = new Observable<string>((subscriber) => {
    setInterval(() => {
      subscriber.next(new Date().toISOString());
    }, 1000);
  });
}
```

**Without async pipe (manual, error-prone):**
```typescript
@Component({ ... })
export class ManualComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  ngOnDestroy(): void {
    // MUST unsubscribe or memory leak!
    this.subscription.unsubscribe();
  }
}
```

**With async pipe (clean, safe):**
```typescript
@Component({
  template: `
    <div *ngFor="let product of products$ | async">
      {{ product.name }}
    </div>
  `
})
export class CleanComponent {
  products$ = this.productService.getProducts();
  // No ngOnInit, no ngOnDestroy needed!
  // async pipe handles subscription and cleanup automatically
}
```

---

### In Simple Words 🧠

- **Services** are shared utility classes that hold data and logic — components use them via Dependency Injection
- **Observables** are like pipes that emit values over time — you subscribe to receive them
- Angular's **HttpClient** returns Observables — data starts flowing only when you subscribe
- The **`async` pipe** (`| async`) is your best friend — auto-subscribes and auto-unsubscribes
- Always **unsubscribe** manually if you're not using `async` pipe, or use the `takeUntilDestroyed` operator
