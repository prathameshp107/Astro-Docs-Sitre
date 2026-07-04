---
title: "HttpClient"
description: "Setting up and using HttpClient."
sidebar:
  order: 1
---

## Introduction
HttpClient provides a simplified API for HTTP operations with typed responses, interceptors, and error handling.

## Setup

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
```

## Usage

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }
}
```

## Summary
HttpClient is essential for API communication in Angular applications."
