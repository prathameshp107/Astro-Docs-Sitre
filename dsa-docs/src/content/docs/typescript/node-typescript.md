---
title: "Node.js + TypeScript Guide"
description: "Complete guide to using TypeScript with Node.js: Express APIs, DTOs, middleware types, repository pattern, validation, and error handling."
---

## Node.js + TypeScript Guide

### Express Request/Response Types

```typescript
import express, { Request, Response, NextFunction } from "express";

// Typed request body
interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

// Typed request params
interface UserParams {
  id: string;
}

// Typed request with DTO
type CreateUserRequest = Request<{}, {}, CreateUserDto>;
type GetUserRequest = Request<UserParams>;

app.post("/users", (req: CreateUserRequest, res: Response) => {
  const { name, email } = req.body;  // Typed
});

app.get("/users/:id", (req: GetUserRequest, res: Response) => {
  const { id } = req.params;  // Typed
});
```

### Typed Middleware

```typescript
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  req.user = { id: "123", role: "admin" };
  next();
}
```

### DTO Pattern

```typescript
// Data Transfer Objects
interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

// Service layer
class UserService {
  async createUser(dto: CreateUserDto): Promise<User> {
    // Validate, hash password, save to DB
    return userRepository.create(dto);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    return userRepository.update(id, dto);
  }
}
```

### Repository Pattern

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    return db.query("SELECT * FROM users WHERE id = $1", [id]);
  }
  // ... other methods
}
```

### Interview Questions

**Easy:** How do you type Express request params and body?

**Medium:** What is the DTO pattern and how do you type it?

**Hard:** Design a generic repository pattern for Node.js with TypeScript.
