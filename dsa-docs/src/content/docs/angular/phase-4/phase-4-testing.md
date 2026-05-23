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

![Angular Testing Pyramid](/DSA-Notes-Problems/assets/angular/phase-4-3-angular-testing-pyramid.svg)

---
