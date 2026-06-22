---
title: "Type Branding in TypeScript"
description: "Deep dive into type branding for nominal typing: brand patterns, opaque types, and real-world enterprise usage."
---

## Type Branding in TypeScript

### What is Type Branding?

TypeScript uses **structural typing** — two types are compatible if they have the same shape. Branding adds a unique marker to make types **nominally distinct**.

### Basic Brand Pattern

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;
type Email = Brand<string, "Email">;

function getUser(id: UserId): User { /* ... */ }
function getPost(id: PostId): Post { /* ... */ }

getUser("abc" as UserId);  // OK
getUser("xyz" as PostId); // ❌ Error!
```

### Opaque Type (Safer Brand)

```typescript
declare const OpaqueBrand: unique symbol;

type Opaque<T, B> = T & { readonly [OpaqueBrand]: B };

type Email = Opaque<string, "Email">;

function createEmail(value: string): Email {
  if (!value.includes("@")) throw new Error("Invalid email");
  return value as Email;
}

function sendEmail(to: Email, body: string): void {
  console.log(`Sending to ${to}`);
}

const email = createEmail("alice@test.com");
sendEmail(email, "Hello!");  // OK
sendEmail("not-valid", "Hi"); // ❌ Error!
```

### Real Project Example

```typescript
// Domain-driven design with branded types
type CustomerId = Brand<string, "CustomerId">;
type OrderId = Brand<string, "OrderId">;
type ProductSku = Brand<string, "SKU">;
type Money = Brand<number, "USD">;

interface Customer {
  id: CustomerId;
  name: string;
}

interface Order {
  id: OrderId;
  customerId: CustomerId;
  total: Money;
}
```

### Interview Questions

**Easy:** Why can't TypeScript distinguish between `string` types for IDs?

**Medium:** How does the brand pattern simulate nominal typing?

**Hard:** What's the difference between a simple brand and an opaque type brand?
