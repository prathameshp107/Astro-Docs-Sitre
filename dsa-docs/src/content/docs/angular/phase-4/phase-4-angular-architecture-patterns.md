---
title: "1. Angular Architecture Patterns"
description: "When a junior engineer builds an app, they make it work. When a senior engineer builds it, they make it maintainable by a team of 20 engineers over 5 years"
sidebar:
  order: 1
---

## 1. Angular Architecture Patterns

### Why Architecture Matters in Enterprise Apps

When a junior engineer builds an app, they make it work. When a senior engineer builds it, they make it *maintainable by a team of 20 engineers over 5 years*. That's the difference architecture makes.

Without deliberate architecture:
- Features become interdependent — changing one breaks another
- Teams step on each other's code
- Onboarding new engineers takes months, not days
- Testing becomes impossible because everything is coupled

The patterns below are battle-tested in Fortune 500 codebases. They're used because they **scale** — with team size, codebase size, and time.

---

### Feature-Based Architecture

#### What It Is

Organize code by **business domain feature**, not by technical layer. Each feature is a self-contained vertical slice of the application.

```
src/
└── app/
    ├── features/
    │   ├── auth/              ← owns everything about authentication
    │   │   ├── components/
    │   │   ├── services/
    │   │   ├── store/
    │   │   ├── guards/
    │   │   └── auth.module.ts
    │   ├── products/          ← owns everything about products
    │   │   ├── components/
    │   │   ├── services/
    │   │   ├── store/
    │   │   └── products.module.ts
    │   ├── cart/
    │   ├── orders/
    │   └── admin/
    ├── core/
    ├── shared/
    └── app.module.ts
```

#### Why Companies Use It

- **Team ownership:** Team A owns `products/`, Team B owns `orders/`. No conflicts.
- **Lazy loading naturally maps to features:** Each feature is a separate chunk.
- **Discoverability:** A new engineer looking for cart logic knows exactly where to look.
- **Deletion is safe:** Remove a feature directory → zero side effects.

#### Bad Alternative: Technical Layering

```
src/app/
├── components/    ← 200 files, unrelated to each other
├── services/      ← 150 files, which service belongs to which feature?
├── models/
└── pipes/
```

This doesn't scale. When you need to delete the "Promotions" feature, you have to hunt across every folder.

---

### Layer Architecture (Within a Feature)

Inside each feature, a clean layer separation prevents business logic from leaking into the UI and vice versa.

```
feature/
├── presentation/       (components, pipes, directives — only UI logic)
│   ├── smart/          (container components — connect to store/services)
│   └── dumb/           (presentational components — @Input/@Output only)
├── domain/             (interfaces, models, enums — pure TypeScript, no Angular)
├── application/        (services, store, use-cases — orchestrates domain)
└── infrastructure/     (HTTP clients, local storage adapters, API mappers)
```

#### Why This Matters

```typescript
// BAD: Component talks directly to HTTP — presentation + infrastructure mixed
@Component({ ... })
export class ProductListComponent {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Component knows about URLs, HTTP verbs, response shapes
    this.http.get<Product[]>('https://api.example.com/v2/products')
      .subscribe(p => this.products = p);
  }
}

// GOOD: Component talks to a service — layers are clean
@Component({ ... })
export class ProductListComponent {
  products$ = this.productService.getAll();

  constructor(private productService: ProductService) {}
  // Component doesn't know or care how products are fetched
}
```

---

### Core Module

The `CoreModule` contains **singleton services and one-time-import infrastructure** that should exist for the entire application lifetime.

```typescript
// core/core.module.ts
@NgModule({
  providers: [
    AuthService,
    TokenService,
    LoggingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  imports: [
    HttpClientModule,
  ]
})
export class CoreModule {
  // Guard against re-importing (CRITICAL in enterprise apps)
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule already loaded. Import only in AppModule.'
      );
    }
  }
}
```

**What belongs in Core:**
- `AuthService`, `TokenService`
- HTTP Interceptors
- Global Error Handler
- Logger service
- App-level guards (`AuthGuard`, `RoleGuard`)
- App-level resolvers

**What does NOT belong in Core:**
- Feature services (those belong in their feature module)
- UI components (those belong in Shared)

---

### Shared Module

The `SharedModule` contains **reusable UI components, directives, and pipes** that are imported by multiple feature modules.

```typescript
// shared/shared.module.ts
@NgModule({
  declarations: [
    ButtonComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ModalComponent,
    TruncatePipe,
    DateFormatPipe,
    CurrencyFormatPipe,
    ClickOutsideDirective,
    InfiniteScrollDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    TruncatePipe,
    DateFormatPipe,
  ]
})
export class SharedModule {}
```

**Rules for SharedModule:**
- Contains NO services (services in SharedModule can cause unintended multiple instances)
- Only `declarations` and re-exported Angular modules
- Must be imported in every feature module that needs it

---

### Domain Module Pattern

For very large enterprise applications, add a **Domain module** layer between Core and Features. This encapsulates cross-cutting domain logic used by multiple features.

```
app/
├── domain/
│   ├── user/
│   │   ├── user.model.ts        (interface User)
│   │   ├── user.repository.ts   (abstract class — defines the contract)
│   │   └── user-domain.module.ts
│   ├── product/
│   └── order/
├── features/
│   ├── products/
│   │   └── (uses ProductRepository — doesn't care about implementation)
│   └── admin/
│       └── (also uses ProductRepository — same contract)
├── infrastructure/
│   └── api/
│       └── product-api.repository.ts  (implements ProductRepository)
```

This is the **Dependency Inversion Principle** applied to Angular. Features depend on abstractions, not concrete implementations.

```typescript
// domain/product/product.repository.ts
export abstract class ProductRepository {
  abstract getAll(filters: ProductFilters): Observable<Product[]>;
  abstract getById(id: string): Observable<Product>;
  abstract create(data: CreateProductDto): Observable<Product>;
}

// infrastructure/api/product-api.repository.ts
@Injectable()
export class ProductApiRepository extends ProductRepository {
  constructor(private http: HttpClient) { super(); }

  getAll(filters: ProductFilters): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products', { params: { ...filters } });
  }
}

// feature module registration
@NgModule({
  providers: [
    { provide: ProductRepository, useClass: ProductApiRepository }
    // In tests: { provide: ProductRepository, useClass: MockProductRepository }
  ]
})
```

---

### Enterprise Architecture Diagram

![Enterprise Angular Architecture](/DSA-Notes-Problems/assets/angular/phase-4-1-enterprise-angular-architecture.svg)

---
