---
title: "Angular + TypeScript Guide"
description: "Complete guide to using TypeScript with Angular: interfaces for models, typed services, Observables, dependency injection, and enterprise Angular patterns."
---

## Angular + TypeScript Guide

### Typing Angular Models

```typescript
// User model with strict typing
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
```

### Typed Services

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

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<User> {
    return this.http.post<User>('/api/users', user);
  }

  updateUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, changes);
  }
}
```

### Typed Components

```typescript
@Component({
  selector: 'app-user-list',
  template: `...`,
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = this.userService.getUsers();
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }
}
```

### Interview Questions

**Easy:** How do you define models in Angular with TypeScript?

**Medium:** How do you type HTTP requests in Angular services?

**Hard:** How would you create a generic Angular service for CRUD operations?
