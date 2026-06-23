---
title: "Schema Validation"
description: "Enforce document structure in MongoDB using $jsonSchema validation rules — keeping your data consistent at the database level."
sidebar:
  order: 2
---

## Schema Validation

MongoDB is **schema-flexible by default**, but you can add **validation rules** to enforce structure.

### Real-World Analogy

Think of a **hotel check-in form**:

- **Without validation:** Guests can write anything — "Name: 42", "Age: purple", leave important fields blank
- **With validation:** The form requires: Name (text, required), Age (number, 0–120), Email (must have @). Bad data is rejected at the front desk.

### Adding Validation to a Collection

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "Must be a valid email address"
        },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120,
          description: "Age must be an integer between 0 and 120"
        },
        role: {
          enum: ["admin", "user", "moderator"],
          description: "Must be a valid role"
        },
        phone: {
          bsonType: "string",
          pattern: "^\\+?[1-9]\\d{9,14}$"
        }
      }
    }
  },
  validationLevel: "strict",    // validate all inserts and updates
  validationAction: "error"     // reject invalid documents
})
```

### Adding Validation to an Existing Collection

```js
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  },
  validationLevel: "moderate"  // only validate new/updated docs
})
```

### Validation Levels

| Level | Behavior |
|-------|----------|
| `strict` (default) | Validates **all** inserts and updates |
| `moderate` | Validates inserts and updates to **documents that already pass validation** (existing invalid docs are left alone) |

### Validation Actions

| Action | Behavior |
|--------|----------|
| `error` (default) | Rejects invalid documents with an error |
| `warn` | Allows invalid documents but **logs a warning** (useful during migration) |

### Example: E-Commerce Validation

```js
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100
        },
        price: {
          bsonType: "number",
          minimum: 0,
          description: "Price must be a positive number"
        },
        category: {
          enum: ["Electronics", "Clothing", "Food", "Books", "Other"]
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          default: 0
        },
        ratings: {
          bsonType: "object",
          properties: {
            average: {
              bsonType: "number",
              minimum: 1,
              maximum: 5
            },
            count: {
              bsonType: "int",
              minimum: 0
            }
          }
        }
      }
    }
  }
})
```

### Mongoose vs MongoDB Validation

```text
Mongoose (Application-level):
  ✅ Better error messages
  ✅ More flexible (custom validators)
  ✅ Runs in your app — no DB config needed
  ❌ Only protects YOUR app, not others or direct DB access

MongoDB Validation (Database-level):
  ✅ Protects data from ALL access paths (any app, direct queries)
  ✅ Extra safety net
  ❌ Less detailed error messages
  ❌ Harder to maintain (needs DB admin access to change)

Best practice: Use BOTH — Mongoose for great developer experience,
MongoDB validation as a safety net.
```

---

### In Simple Words

- **Schema validation** lets you enforce document structure at the database level
- Use **`$jsonSchema`** to define required fields, data types, and value constraints
- **`strict`** level validates everything; **`moderate`** skips existing invalid docs
- **`error`** rejects bad data; **`warn`** logs it but allows it (good for migration)
- Use Mongoose validation for your app AND MongoDB validation as an extra safety net

---

*Next: [Security Best Practices →](/DSA-Notes-Problems/mongodb/security/security-best-practices)*
