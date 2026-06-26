---
title: "Angular Service Types in TypeScript"
description: "Complete guide to typing Angular services: typed HTTP services, generic CRUD, typed observables, and service patterns."
---

## Angular Service Types

### Typed HTTP Service

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  createUser(data: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    return this.http.post<User>('/api/users', data);
  }

  updateUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, changes);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }
}
```

### Generic CRUD Service

```typescript
export class CrudService<T extends { id: number }> {
  constructor(protected http: HttpClient, protected baseUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: number, changes: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ProductService extends CrudService<Product> {
  constructor(http: HttpClient) {
    super(http, '/api/products');
  }
}
```

### Interview Questions

**Easy:** How do you type an Angular HTTP GET request?

**Medium:** How do you create a generic CRUD service?

**Hard:** How would you type an interceptor with generics?
