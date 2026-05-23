---
title: "6. Enterprise Best Practices"
description: "// DUMB: pure UI, @Input/@Output only, zero dependencies @Component({ selector: 'app-product-list', changeDetection: ChangeDetectionStrategy.OnPush }) expo"
sidebar:
  order: 6
---

## 6. Enterprise Best Practices

### Canonical Folder Structure

```
src/app/
├── core/
│   ├── guards/          auth.guard.ts, role.guard.ts
│   ├── interceptors/    auth.interceptor.ts, error.interceptor.ts
│   ├── services/        auth.service.ts, token.service.ts, logging.service.ts
│   └── core.module.ts
│
├── shared/
│   ├── components/      button/, modal/, empty-state/, loading-spinner/
│   ├── pipes/           currency-format.pipe.ts, truncate.pipe.ts
│   ├── directives/      click-outside.directive.ts
│   └── shared.module.ts
│
├── features/
│   ├── auth/
│   │   ├── components/  login/, register/
│   │   ├── store/       auth.actions.ts, auth.effects.ts, auth.reducer.ts, auth.selectors.ts
│   │   └── auth.module.ts
│   │
│   ├── products/
│   │   ├── components/  product-list/ (smart), product-card/ (dumb), product-detail/
│   │   ├── models/      product.model.ts, product-filter.model.ts
│   │   ├── services/    product-api.service.ts
│   │   ├── store/       products.actions|effects|reducer|selectors.ts
│   │   └── products.module.ts
│   │
│   └── ... (cart, orders, admin)
│
├── app-routing.module.ts
└── app.module.ts
```

### Naming Conventions

```
Files:          feature-name.component.ts, feature-name.service.ts
Classes:        ProductListComponent, ProductApiService  (PascalCase + suffix)
Interfaces:     interface Product (NO "I" prefix — modern Angular convention)
Observables:    products$, currentUser$, loading$  ($ suffix)
Constants:      API_TIMEOUT_MS = 30_000  (SCREAMING_SNAKE_CASE)
Actions:        [Source] Event  →  '[Users Page] Load Users'
```

### Smart vs Dumb Components

```typescript
// SMART: knows about store, orchestrates
@Component({
  template: `
    <app-product-list
      [products]="products$ | async"
      [loading]="loading$ | async"
      (addToCart)="onAddToCart($event)"
    ></app-product-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {
  products$ = this.store.select(selectAllProducts);
  loading$  = this.store.select(selectProductsLoading);
  constructor(private store: Store) { this.store.dispatch(loadProducts()); }
  onAddToCart(product: Product) { this.store.dispatch(addToCart({ product })); }
}

// DUMB: pure UI, @Input/@Output only, zero dependencies
@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products: Product[] | null = [];
  @Input() loading: boolean | null = false;
  @Output() addToCart = new EventEmitter<Product>();
  trackById = (_: number, p: Product) => p.id;
  // Fully testable with mock @Input values — no service mocking needed
}
```

### Security Checklist

```typescript
// 1. Angular auto-sanitizes [innerHTML] — never bypass DomSanitizer with user input
// 2. HttpParams auto-encodes query params — prevents injection
// 3. Never store refresh tokens in localStorage — use httpOnly cookies
// 4. Route guards on EVERY protected route
// 5. Server-side authorization is the REAL security — Angular guards are UX only
// 6. Content Security Policy header in nginx
// 7. Audit dependencies: npm audit --audit-level=high
```

---
