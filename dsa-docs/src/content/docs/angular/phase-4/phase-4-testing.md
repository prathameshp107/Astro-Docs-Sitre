---
title: "4. Testing"
description: "In a team of 20 engineers, no one can hold the entire system in their head. Tests are the executable specification of your system's behavior. Without them:"
sidebar:
  order: 4
---

## 4. Testing

### Why Testing Is Non-Negotiable in Enterprise

In a team of 20 engineers, no one can hold the entire system in their head. Tests are the **executable specification** of your system's behavior. Without them: refactoring is dangerous, onboarding is slow, deployments are terrifying, code quality decays.

---

### Unit Testing — Services

```typescript
describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService]
    });

    service = TestBed.inject(ProductApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should fetch products', () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Laptop', price: 999 }
    ];

    service.getAll({ page: 1 }).subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Laptop');
    });

    const req = httpController.expectOne('/api/products?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle 404 error', () => {
    service.getById('nonexistent').subscribe({
      error: (err) => expect(err.status).toBe(404)
    });

    const req = httpController.expectOne('/api/products/nonexistent');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
```

---

### Unit Testing — Components

```typescript
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [SharedModule],
      providers: [{ provide: ProductService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should display products after load', () => {
    const mockProducts = [{ id: '1', name: 'Laptop', price: 999 }];
    productServiceSpy.getAll.and.returnValue(of(mockProducts));

    fixture.detectChanges(); // triggers ngOnInit

    const cards = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(cards.length).toBe(1);
  });

  it('should show loading spinner while loading', () => {
    productServiceSpy.getAll.and.returnValue(new Subject<Product[]>());
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('app-loading-spinner'));
    expect(spinner).toBeTruthy();
  });
});
```

---

### Testing NgRx Effects

```typescript
describe('ProductsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductsEffects;
  let productService: jasmine.SpyObj<ProductApiService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('ProductApiService', ['getAll']);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductApiService, useValue: serviceSpy }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
    productService = TestBed.inject(ProductApiService) as jasmine.SpyObj<ProductApiService>;
  });

  it('dispatches loadProductsSuccess on success', () => {
    const mockProducts = [{ id: '1', name: 'Laptop' }];
    productService.getAll.and.returnValue(of(mockProducts));
    actions$ = of(loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(loadProductsSuccess({ products: mockProducts }));
    });
  });
});
```

---

### E2E Testing with Cypress

```typescript
describe('Product List Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products*', { fixture: 'products.json' }).as('getProducts');

    cy.request('POST', '/api/auth/login', {
      email: 'test@example.com', password: 'password123'
    }).then(({ body }) => sessionStorage.setItem('token_exp', body.tokenExp));

    cy.visit('/products');
    cy.wait('@getProducts');
  });

  it('displays product cards', () => {
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('adds product to cart', () => {
    cy.intercept('POST', '/api/cart/items', { statusCode: 201 }).as('addToCart');
    cy.get('[data-cy="product-card"]').first().find('[data-cy="add-to-cart-btn"]').click();
    cy.wait('@addToCart');
    cy.get('[data-cy="cart-count"]').should('contain', '1');
  });
});
```

---

### Testing Pyramid Diagram

```svg
<svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Arial, sans-serif">
  <rect width="700" height="440" fill="#080c14" rx="12"/>
  <text x="350" y="34" text-anchor="middle" fill="#f1f5f9" font-size="16" font-weight="700">Angular Testing Pyramid</text>

  <!-- E2E base -->
  <polygon points="50,390 650,390 500,294 200,294" fill="#1a1008" stroke="#f97316" stroke-width="2"/>
  <text x="350" y="348" text-anchor="middle" fill="#fdba74" font-size="13" font-weight="600">E2E Tests (Cypress / Playwright)</text>
  <text x="350" y="366" text-anchor="middle" fill="#4b5563" font-size="10">Full user flows · Slowest · Highest confidence · ~10% of tests</text>
  <text x="350" y="381" text-anchor="middle" fill="#4b5563" font-size="10">Real browser · Intercepted API · data-cy selectors</text>

  <!-- Integration middle -->
  <polygon points="200,294 500,294 420,190 280,190" fill="#0f1e1a" stroke="#22c55e" stroke-width="2"/>
  <text x="350" y="238" text-anchor="middle" fill="#86efac" font-size="13" font-weight="600">Integration Tests (TestBed)</text>
  <text x="350" y="256" text-anchor="middle" fill="#4b5563" font-size="10">Component + template + child components · ~20%</text>
  <text x="350" y="272" text-anchor="middle" fill="#4b5563" font-size="10">NgRx Effects · Guard + Router integration</text>

  <!-- Unit top -->
  <polygon points="280,190 420,190 390,110 310,110" fill="#1a1e35" stroke="#6366f1" stroke-width="2"/>
  <text x="350" y="148" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="600">Unit Tests (Jasmine)</text>
  <text x="350" y="163" text-anchor="middle" fill="#4b5563" font-size="9">Pure functions · Services · Reducers · ~70%</text>
  <text x="350" y="176" text-anchor="middle" fill="#4b5563" font-size="9">Fastest · Isolated · Most numerous</text>

  <!-- Apex -->
  <polygon points="310,110 390,110 350,60" fill="#2d1e3a" stroke="#a855f7" stroke-width="1.5"/>
  <text x="350" y="93" text-anchor="middle" fill="#d8b4fe" font-size="10" font-weight="600">Smoke</text>

  <!-- Tools legend -->
  <rect x="30" y="50" width="170" height="115" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="115" y="68" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Tools</text>
  <text x="42" y="84" fill="#a5b4fc" font-size="9">Unit: Jasmine + Karma</text>
  <text x="42" y="100" fill="#86efac" font-size="9">Integration: TestBed</text>
  <text x="42" y="116" fill="#fdba74" font-size="9">E2E: Cypress / Playwright</text>
  <text x="42" y="132" fill="#d8b4fe" font-size="9">Mocking: createSpyObj()</text>
  <text x="42" y="148" fill="#67e8f9" font-size="9">HTTP: HttpTestingController</text>
  <text x="42" y="163" fill="#fde047" font-size="9">NgRx: provideMockActions</text>

  <!-- Ratio guide -->
  <rect x="500" y="50" width="170" height="100" rx="6" fill="#0f1219" stroke="#1e293b" stroke-width="1"/>
  <text x="585" y="68" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Ideal Ratios</text>
  <text x="515" y="84" fill="#a5b4fc" font-size="9">Unit: ~70% of all tests</text>
  <text x="515" y="100" fill="#86efac" font-size="9">Integration: ~20%</text>
  <text x="515" y="116" fill="#fdba74" font-size="9">E2E: ~10%</text>
  <text x="515" y="132" fill="#4b5563" font-size="9">E2E catches what units miss</text>
  <text x="515" y="148" fill="#4b5563" font-size="9">Don't obsess over 100% coverage</text>
</svg>
```

---
