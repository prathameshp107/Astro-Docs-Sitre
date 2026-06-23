---
title: "3. HTTP Client"
description: "constructor(protected http: HttpClient) {}"
sidebar:
  order: 2
---

## 3. HTTP Client

### Enterprise Base API Service

```typescript
@Injectable()
export abstract class ApiService {
  protected readonly baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected get<T>(path: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      params: this.buildParams(params)
    });
  }

  protected post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  protected put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  protected patch<T>(path: string, body: Partial<any>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let p = new HttpParams();
    if (!params) return p;
    Object.entries(params)
      .filter(([, v]) => v !== null && v !== undefined)
      .forEach(([k, v]) => p = p.set(k, v));
    return p;
  }
}

// Feature service extending the base
@Injectable({ providedIn: 'root' })
export class ProductApiService extends ApiService {
  constructor(http: HttpClient) { super(http); }

  getAll(filters: ProductFilters): Observable<PaginatedResponse<Product>> {
    return this.get<PaginatedResponse<Product>>('/products', filters);
  }

  getById(id: string): Observable<Product> {
    return this.get<Product>(`/products/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.post<Product>('/products', dto);
  }

  update(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.put<Product>(`/products/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.delete<void>(`/products/${id}`);
  }
}
```

---

### Global Error Interceptor

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifications: NotificationService,
    private logger: LoggingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.logger.error('HTTP Error', { url: req.url, status: error.status });

        switch (error.status) {
          case 400: this.notifications.error(error.error?.message ?? 'Bad request'); break;
          case 403: this.notifications.error('You do not have permission.'); break;
          case 404: this.notifications.error('Resource not found.'); break;
          case 422: this.notifications.error(error.error?.message ?? 'Validation failed.'); break;
          case 500:
          case 503: this.notifications.error('Server error. Please try again.'); break;
          default: this.notifications.error('An unexpected error occurred.'); break;
        }

        return throwError(() => error);
      })
    );
  }
}
```

---

### Retry + Loading State Pattern

```typescript
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function withLoadingState<T>(source$: Observable<T>): Observable<AsyncState<T>> {
  return merge(
    of({ data: null, loading: true, error: null }),
    source$.pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(err => of({ data: null, loading: false, error: err.message }))
    )
  );
}

// In component — zero boilerplate loading state
@Component({
  template: `
    <ng-container *ngIf="state$ | async as state">
      <app-spinner *ngIf="state.loading"></app-spinner>
      <app-error *ngIf="state.error" [message]="state.error"></app-error>
      <app-product-list *ngIf="state.data" [products]="state.data"></app-product-list>
    </ng-container>
  `
})
export class ProductPageComponent {
  state$ = withLoadingState(
    this.productService.getAll({ page: 1 }).pipe(
      retry({ count: 3, delay: (_, n) => timer(Math.pow(2, n) * 1000) })
    )
  );
}
```

---
