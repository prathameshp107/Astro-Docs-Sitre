---
title: "DTO Patterns in TypeScript"
description: "Complete guide to Data Transfer Object patterns in Node.js/TypeScript: creation DTOs, update DTOs, response DTOs, and validation."
---

## DTO Patterns in TypeScript

### What are DTOs?

DTOs (Data Transfer Objects) define the shape of data entering or leaving your API. They enforce contracts between layers.

### Standard DTOs

```typescript
// Creation DTO — required fields for creating
interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

// Update DTO — all fields optional
interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

// Response DTO — what we send back (no password)
interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}
```

### Service Layer with DTOs

```typescript
class UserService {
  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await hash(dto.password, 10);
    const user = await db.user.create({ data: { ...dto, password: hashedPassword } });
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
  }
}
```

### Interview Questions

**Easy:** What is a DTO?

**Medium:** Why separate Create DTO from Update DTO?

**Hard:** How would you handle DTO validation with TypeScript?
