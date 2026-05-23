---
title: "1. Components Deep Dive"
description: "Think of a component like a LEGO brick. Each brick has: - Its own shape (template / HTML) - Its own color (styles / CSS) - Its own behavior (TypeScript cla"
sidebar:
  order: 1
---

## 1. Components Deep Dive

### What is a Component?

Think of a component like a **LEGO brick**. Each brick has:
- Its own shape (template / HTML)
- Its own color (styles / CSS)
- Its own behavior (TypeScript class)

You snap bricks together to build a full application.

```
┌──────────────────────────────────────────────────────┐
│                   Angular Component                  │
│  ┌──────────────┐  ┌────────────┐  ┌─────────────┐  │
│  │   Template   │  │   Class    │  │   Styles    │  │
│  │  (HTML view) │  │(TypeScript)│  │  (CSS/SCSS) │  │
│  └──────────────┘  └────────────┘  └─────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

### 1.1 Component Lifecycle

#### What is a Lifecycle?

Every component is **born**, **lives**, and **dies**. Angular gives you special methods called **lifecycle hooks** so you can run code at each stage.

Think of it like a human life:
- **Born** → Constructor
- **Grows up** → ngOnInit
- **Reacts to changes** → ngOnChanges, ngDoCheck
- **Has children** → ngAfterContentInit, ngAfterViewInit
- **Dies** → ngOnDestroy

---

#### Lifecycle Flow Diagram

![Angular Component Lifecycle Flow](/DSA-Notes-Problems/assets/angular/phase-2-1-angular-component-lifecycle-flow.svg)

---

#### Each Hook Explained with Code

##### `constructor()` — The Birth

```typescript
@Component({
  selector: 'app-user',
  template: `<p>{{ username }}</p>`
})
export class UserComponent {
  username: string;

  constructor(private userService: UserService) {
    // ✅ Good: Inject services
    // ✅ Good: Initialize simple variables
    // ❌ Bad: Don't call this.userService.getData() here!
    // ❌ Bad: Don't access @Input() values here — they aren't set yet!
    this.username = 'Loading...';
  }
}
```

**Why not fetch data in constructor?**
- The component's template is NOT rendered yet
- `@Input()` values from parent have NOT arrived yet
- If the constructor throws an error, Angular can't display helpful messages

---

##### `ngOnChanges()` — React to Parent's Changes

This hook fires **every time** a parent passes a new value via `@Input()`.

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-price-display',
  template: `<h2>Price: {{ formattedPrice }}</h2>`
})
export class PriceDisplayComponent implements OnChanges {
  
  @Input() price: number = 0;          // Parent sends this
  @Input() currency: string = 'USD';   // Parent sends this too
  
  formattedPrice: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // 'changes' is an object that tells you WHAT changed and HOW

    // Check if 'price' specifically changed
    if (changes['price']) {
      const oldValue = changes['price'].previousValue;  // What it was
      const newValue = changes['price'].currentValue;   // What it is now
      const isFirst  = changes['price'].firstChange;    // True on first load

      console.log(`Price changed from ${oldValue} to ${newValue}`);
    }

    // Recalculate whenever either input changes
    this.formattedPrice = `${this.currency} ${this.price.toFixed(2)}`;
  }
}
```

**Real-world use:** A product price card that updates whenever the parent selects a different item.

---

##### `ngOnInit()` — The Worker

The most commonly used hook. Runs ONCE after the component is created and inputs are received.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngFor="let item of data">{{ item.name }}</div>
  `
})
export class DashboardComponent implements OnInit {
  
  data: any[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}
  //           ^ Inject the service (but DON'T call it yet)

  ngOnInit(): void {
    // ✅ NOW it's safe to call services
    // ✅ @Input() values are ready
    // ✅ This is THE right place to fetch data
    this.apiService.getDashboardData().subscribe(result => {
      this.data = result;
      this.loading = false;
    });
  }
}
```

---

##### `ngOnDestroy()` — The Cleanup Crew

Runs just before Angular destroys your component. If you don't clean up, you get **memory leaks**.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-live-clock',
  template: `<p>{{ currentTime }}</p>`
})
export class LiveClockComponent implements OnInit, OnDestroy {
  
  currentTime: string = '';
  private clockSubscription!: Subscription;  // Store reference!

  ngOnInit(): void {
    // Start a timer that ticks every second
    this.clockSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleTimeString();
    });
  }

  ngOnDestroy(): void {
    // ✅ ALWAYS unsubscribe to prevent memory leaks
    // If you skip this, the timer keeps running even after component is gone!
    this.clockSubscription.unsubscribe();
    
    console.log('Clock component destroyed, timer stopped!');
  }
}
```

**What happens if you forget `ngOnDestroy`?**
- The timer/subscription keeps running
- It tries to update a component that no longer exists
- Over time: memory leak, sluggish app, crashes

---

### 1.2 Component Communication

Components need to talk to each other. Angular has 4 main ways:

```
Parent ──(@Input)──▶ Child    (data flows down)
Child  ──(@Output)─▶ Parent   (events flow up)
Any    ──(Service)─▶ Any      (shared state)
Parent ──(ViewChild)▶ Child   (direct access)
```

---

#### `@Input()` Decorator — Parent to Child

**Scenario:** You have a `ProductCardComponent`. The parent `ProductListComponent` passes product details to it.

```typescript
// product-card.component.ts
import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <img [src]="product.imageUrl" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      
      <!-- Use the optional alias: parent uses [displayMode] -->
      <span class="badge">{{ mode }}</span>
    </div>
  `
})
export class ProductCardComponent {

  // Basic @Input — parent passes the product object
  @Input() product!: Product;

  // @Input with alias — outside world uses 'displayMode', inside we use 'mode'
  @Input('displayMode') mode: string = 'grid';

  // @Input with transform (Angular 16+) — auto-convert string "true" to boolean true
  @Input({ transform: booleanAttribute }) showDiscount: boolean = false;
}
```

**Parent template using the child:**

```html
<!-- product-list.component.html -->
<div class="product-grid">
  
  <!-- Loop through products and pass each one to the card -->
  <app-product-card
    *ngFor="let p of products"
    [product]="p"
    [displayMode]="'list'"
    [showDiscount]="true">
  </app-product-card>
  
</div>
```

**Key rules for @Input:**
- `[squareBrackets]` = property binding (passes a value)
- `"quotedString"` = passes a hardcoded string
- Always define an interface for complex objects (not `any`)

---

#### `@Output()` + `EventEmitter` — Child to Parent

**Scenario:** User clicks "Add to Cart" inside the product card. The parent needs to know.

```typescript
// product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price | currency }}</p>
      
      <!-- When button is clicked, call our method -->
      <button (click)="onAddToCart()">Add to Cart</button>
      <button (click)="onWishlist()">♡ Save</button>
    </div>
  `
})
export class ProductCardComponent {

  @Input() product!: Product;

  // Declare an output event — parent will listen to this
  @Output() addToCart = new EventEmitter<Product>();

  // You can emit any type — here we emit an object with product + quantity
  @Output() addToWishlist = new EventEmitter<{ product: Product; date: Date }>();

  onAddToCart(): void {
    // Emit the event — the parent will receive 'product' as the event data
    this.addToCart.emit(this.product);
  }

  onWishlist(): void {
    this.addToWishlist.emit({
      product: this.product,
      date: new Date()
    });
  }
}
```

**Parent listens to child events:**

```typescript
// product-list.component.ts
@Component({
  template: `
    <div class="cart-count">Cart: {{ cartCount }}</div>
    
    <app-product-card
      *ngFor="let p of products"
      [product]="p"
      (addToCart)="handleAddToCart($event)"
      (addToWishlist)="handleWishlist($event)">
    </app-product-card>
  `
})
export class ProductListComponent {
  
  products: Product[] = [...];
  cartCount = 0;

  // $event is what the child emitted — in this case, a Product object
  handleAddToCart(product: Product): void {
    this.cartCount++;
    this.cartService.add(product);
    this.showSuccessToast(`${product.name} added to cart!`);
  }

  handleWishlist(data: { product: Product; date: Date }): void {
    console.log('Saved at:', data.date);
    this.wishlistService.save(data.product);
  }
}
```

---

#### `@ViewChild` — Parent Accesses Child Directly

Sometimes you need to call a method on a child component or access an HTML element directly.

```typescript
// expandable-panel.component.ts
@Component({
  selector: 'app-panel',
  template: `
    <div [class.expanded]="isOpen">
      <ng-content></ng-content>
    </div>
  `
})
export class PanelComponent {
  isOpen = false;
  
  open()  { this.isOpen = true;  }
  close() { this.isOpen = false; }
  toggle(){ this.isOpen = !this.isOpen; }
}
```

```typescript
// parent.component.ts
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  template: `
    <button (click)="openPanel()">Open Settings</button>
    <button (click)="focusSearch()">Focus Search</button>
    
    <!-- Reference the component with #myPanel -->
    <app-panel #myPanel>
      <h3>Settings</h3>
    </app-panel>
    
    <!-- Reference a plain HTML element with #searchBox -->
    <input #searchBox type="text" placeholder="Search...">
  `
})
export class ParentComponent implements AfterViewInit {

  // @ViewChild grabs the component instance
  @ViewChild('myPanel') panel!: PanelComponent;

  // @ViewChild grabs the native HTML element
  @ViewChild('searchBox') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    // ⚠️ ViewChild is only available AFTER ngAfterViewInit
    // Don't use it in ngOnInit — it's null there!
    console.log('Panel component:', this.panel);
    console.log('Input element:', this.searchInput.nativeElement);
  }

  openPanel(): void {
    this.panel.open();  // Call child method directly!
  }

  focusSearch(): void {
    this.searchInput.nativeElement.focus();  // Focus the HTML element
  }
}
```

---

#### `@ContentChild` — Access Projected Content

`@ContentChild` is like `@ViewChild` but for content passed via `<ng-content>`.

```typescript
// card-container.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-title]"></ng-content>  <!-- Named slot -->
      </div>
      <div class="card-body">
        <ng-content></ng-content>  <!-- Default slot -->
      </div>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  
  // Access the projected content that has the directive/selector
  @ContentChild('cardTitle') titleRef!: ElementRef;
  @ContentChild(HeaderComponent) header!: HeaderComponent;

  ngAfterContentInit(): void {
    // Content is now projected and ready
    console.log('Title text:', this.titleRef?.nativeElement.textContent);
  }
}

// Usage in parent:
// <app-card>
//   <h2 card-title #cardTitle>My Title</h2>
//   <p>Card body content goes here</p>
// </app-card>
```

---

#### Dynamic Components

You can create components programmatically at runtime — useful for modals, tooltips, alerts.

```typescript
// modal.service.ts
import { Injectable, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  openModal(component: Type<any>, data?: any): ComponentRef<any> {
    // 1. Create the component dynamically
    const componentRef = createComponent(component, {
      environmentInjector: this.injector
    });

    // 2. Pass data to the component
    if (data) {
      Object.assign(componentRef.instance, data);
    }

    // 3. Attach to Angular's change detection
    this.appRef.attachView(componentRef.hostView);

    // 4. Add to the DOM
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
    document.body.appendChild(domElement);

    return componentRef;
  }

  closeModal(componentRef: ComponentRef<any>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}

// Usage:
// this.modalService.openModal(ConfirmDialogComponent, { message: 'Are you sure?' });
```

---
