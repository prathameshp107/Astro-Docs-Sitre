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

```svg
<svg viewBox="0 0 760 640" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="760" height="640" fill="#080c14" rx="14"/>
  <text x="380" y="38" text-anchor="middle" fill="#f1f5f9" font-size="18" font-weight="700">Enterprise Angular Architecture</text>

  <!-- AppModule -->
  <rect x="290" y="56" width="180" height="44" rx="8" fill="#1e2535" stroke="#6366f1" stroke-width="2"/>
  <text x="380" y="74" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="700">AppModule</text>
  <text x="380" y="90" text-anchor="middle" fill="#4b5563" font-size="10">Bootstrap · Router</text>

  <line x1="380" y1="100" x2="380" y2="118" stroke="#6366f1" stroke-width="1.5" marker-end="url(#ea1)"/>

  <!-- Core + Shared -->
  <rect x="80" y="118" width="220" height="64" rx="8" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="190" y="140" text-anchor="middle" fill="#86efac" font-size="13" font-weight="700">CoreModule</text>
  <text x="190" y="157" text-anchor="middle" fill="#4b5563" font-size="10">AuthService · Interceptors</text>
  <text x="190" y="171" text-anchor="middle" fill="#4b5563" font-size="10">Guards · Error Handler · Logger</text>

  <rect x="460" y="118" width="220" height="64" rx="8" fill="#1e1a0f" stroke="#f59e0b" stroke-width="2"/>
  <text x="570" y="140" text-anchor="middle" fill="#fde047" font-size="13" font-weight="700">SharedModule</text>
  <text x="570" y="157" text-anchor="middle" fill="#4b5563" font-size="10">ButtonComponent · Pipes</text>
  <text x="570" y="171" text-anchor="middle" fill="#4b5563" font-size="10">Directives · Modal · Spinner</text>

  <line x1="340" y1="100" x2="240" y2="118" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="420" y1="100" x2="520" y2="118" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Domain layer -->
  <rect x="200" y="220" width="360" height="50" rx="8" fill="#1a0e20" stroke="#a855f7" stroke-width="1.5"/>
  <text x="380" y="241" text-anchor="middle" fill="#d8b4fe" font-size="12" font-weight="700">Domain Layer</text>
  <text x="380" y="258" text-anchor="middle" fill="#4b5563" font-size="10">Models · Interfaces · Abstract Repositories · Business Rules</text>

  <line x1="380" y1="182" x2="380" y2="220" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Features row label -->
  <text x="380" y="300" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">Feature Modules (Lazy Loaded)</text>

  <!-- Auth Feature -->
  <rect x="30" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#ec4899" stroke-width="1.5"/>
  <text x="95" y="336" text-anchor="middle" fill="#f9a8d4" font-size="11" font-weight="600">auth/</text>
  <text x="95" y="354" text-anchor="middle" fill="#4b5563" font-size="9">LoginComponent</text>
  <text x="95" y="368" text-anchor="middle" fill="#4b5563" font-size="9">RegisterComponent</text>
  <text x="95" y="382" text-anchor="middle" fill="#4b5563" font-size="9">AuthGuard</text>
  <text x="95" y="396" text-anchor="middle" fill="#4b5563" font-size="9">AuthStore</text>

  <!-- Products Feature -->
  <rect x="175" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="240" y="336" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600">products/</text>
  <text x="240" y="354" text-anchor="middle" fill="#4b5563" font-size="9">ProductListComponent</text>
  <text x="240" y="368" text-anchor="middle" fill="#4b5563" font-size="9">ProductDetailComponent</text>
  <text x="240" y="382" text-anchor="middle" fill="#4b5563" font-size="9">ProductService</text>
  <text x="240" y="396" text-anchor="middle" fill="#4b5563" font-size="9">ProductsStore</text>

  <!-- Cart Feature -->
  <rect x="320" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#f97316" stroke-width="1.5"/>
  <text x="385" y="336" text-anchor="middle" fill="#fdba74" font-size="11" font-weight="600">cart/</text>
  <text x="385" y="354" text-anchor="middle" fill="#4b5563" font-size="9">CartComponent</text>
  <text x="385" y="368" text-anchor="middle" fill="#4b5563" font-size="9">CartItemComponent</text>
  <text x="385" y="382" text-anchor="middle" fill="#4b5563" font-size="9">CartService</text>
  <text x="385" y="396" text-anchor="middle" fill="#4b5563" font-size="9">CartStore</text>

  <!-- Orders Feature -->
  <rect x="465" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#22c55e" stroke-width="1.5"/>
  <text x="530" y="336" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">orders/</text>
  <text x="530" y="354" text-anchor="middle" fill="#4b5563" font-size="9">OrderListComponent</text>
  <text x="530" y="368" text-anchor="middle" fill="#4b5563" font-size="9">OrderDetailComponent</text>
  <text x="530" y="382" text-anchor="middle" fill="#4b5563" font-size="9">OrderService</text>
  <text x="530" y="396" text-anchor="middle" fill="#4b5563" font-size="9">OrdersStore</text>

  <!-- Admin Feature -->
  <rect x="610" y="314" width="130" height="90" rx="8" fill="#0f1219" stroke="#eab308" stroke-width="1.5"/>
  <text x="675" y="336" text-anchor="middle" fill="#fde047" font-size="11" font-weight="600">admin/</text>
  <text x="675" y="354" text-anchor="middle" fill="#4b5563" font-size="9">DashboardComponent</text>
  <text x="675" y="368" text-anchor="middle" fill="#4b5563" font-size="9">UserManagement</text>
  <text x="675" y="382" text-anchor="middle" fill="#4b5563" font-size="9">AdminGuard</text>
  <text x="675" y="396" text-anchor="middle" fill="#4b5563" font-size="9">AdminStore</text>

  <!-- Connect domain to features -->
  <line x1="200" y1="270" x2="95" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="260" y1="270" x2="240" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="380" y1="270" x2="385" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="490" y1="270" x2="530" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>
  <line x1="560" y1="270" x2="675" y2="314" stroke="#a855f7" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Infrastructure layer -->
  <rect x="100" y="440" width="560" height="60" rx="8" fill="#0a0e1a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="380" y="462" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Infrastructure Layer</text>
  <text x="190" y="482" text-anchor="middle" fill="#4b5563" font-size="10">ProductApiRepository</text>
  <text x="380" y="482" text-anchor="middle" fill="#4b5563" font-size="10">OrderApiRepository</text>
  <text x="570" y="482" text-anchor="middle" fill="#4b5563" font-size="10">LocalStorageService</text>

  <line x1="380" y1="404" x2="380" y2="440" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- Backend API -->
  <rect x="270" y="540" width="220" height="44" rx="8" fill="#14110a" stroke="#f97316" stroke-width="1.5"/>
  <text x="380" y="558" text-anchor="middle" fill="#fdba74" font-size="12" font-weight="600">Backend REST API</text>
  <text x="380" y="574" text-anchor="middle" fill="#4b5563" font-size="10">Node.js / .NET / Java / Python</text>

  <line x1="380" y1="500" x2="380" y2="540" stroke="#f97316" stroke-width="1.5" marker-end="url(#ea2)"/>

  <!-- Legend -->
  <rect x="30" y="540" width="200" height="82" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="130" y="558" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Legend</text>
  <rect x="42" y="566" width="10" height="10" rx="2" fill="#22c55e"/>
  <text x="58" y="575" fill="#94a3b8" font-size="9">Singleton / App-wide</text>
  <rect x="42" y="582" width="10" height="10" rx="2" fill="#6366f1"/>
  <text x="58" y="591" fill="#94a3b8" font-size="9">Module boundary</text>
  <rect x="42" y="598" width="10" height="10" rx="2" fill="#a855f7"/>
  <text x="58" y="607" fill="#94a3b8" font-size="9">Domain abstraction</text>
  <text x="58" y="617" fill="#4b5563" font-size="9" font-style="italic">--- = dependency (not import)</text>

  <defs>
    <marker id="ea1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#6366f1"/></marker>
    <marker id="ea2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f97316"/></marker>
  </defs>
</svg>
```

---
