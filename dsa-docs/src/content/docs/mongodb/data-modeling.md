---
title: "Data Modeling"
description: "Data modeling is the most critical skill in MongoDB. Good schema design = fast, scalable app. Bad schema = performance nightmares."
sort: 3
---

## 3. Data Modeling

Data modeling is the most **critical skill** in MongoDB. Good schema design = fast, scalable app. Bad schema = performance nightmares.

### 3.1 The Core Question: Embed or Reference?

```
Embedding (Denormalization)        Referencing (Normalization)
──────────────────────────────     ────────────────────────────
Store related data INSIDE          Store related data in a
the same document                  SEPARATE collection and
                                   link with an ID

user document:                     users collection:
{                                  { _id: ObjectId("u1"), name: "Alice" }
  name: "Alice",
  address: {                       addresses collection:
    city: "Mumbai",                { userId: ObjectId("u1"),
    pin: "400001"                    city: "Mumbai" }
  }
}
```

---

### 3.2 Embedding — Pros & Cons

**Use embedding when:**
- Data is always accessed together
- Nested data belongs to one parent (ownership)
- Nested data doesn't grow unboundedly
- You need fast reads (one query = complete data)

```js
// ✅ Good embed: User with address (always loaded together, never changes independently)
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  address: {
    street: "123 Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en"
  }
}
```

| ✅ Pros | ❌ Cons |
|---------|--------|
| Single query to load everything | Document can become very large |
| Better read performance | Updating nested data is verbose |
| Atomic updates | Data duplication if shared across documents |
| Works well for 1-to-1 relationships | Hard to query deeply nested data |

---

### 3.3 Referencing — Pros & Cons

**Use referencing when:**
- Data is accessed independently
- Data is shared across many documents
- Nested data grows unboundedly (e.g., comments on a post)
- You want to update one place and reflect everywhere

```js
// users collection
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com"
}

// orders collection (references user)
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),    // reference to user
  totalAmount: 2500,
  status: "delivered",
  createdAt: ISODate("2024-01-10")
}
```

| ✅ Pros | ❌ Cons |
|---------|--------|
| No data duplication | Requires multiple queries (or $lookup) |
| Update once, reflect everywhere | Slightly slower reads |
| Cleaner, smaller documents | No built-in referential integrity (like SQL) |
| Works well for growing data | More complex application code |

---

### 3.4 One-to-One Relationship

**Example: User and their Profile**

One user has exactly one profile.

**✅ Recommended: Embed** (they're always loaded together)

```js
// Single document
{
  _id: ObjectId("u1"),
  email: "alice@example.com",
  password: "$2b$10$hashedpassword",
  profile: {
    firstName: "Alice",
    lastName: "Johnson",
    bio: "Full-stack developer",
    avatar: "https://cdn.example.com/alice.jpg",
    dob: ISODate("1995-06-15"),
    phone: "+91-9876543210"
  },
  createdAt: ISODate("2024-01-01")
}
```

---

### 3.5 One-to-Many Relationship

**Example: User and their Orders**

One user can have many orders.

**Option A — Embed orders IN user** (❌ Bad for growing data)

```js
// DON'T do this — orders array grows forever, document gets huge
{
  _id: ObjectId("u1"),
  name: "Alice",
  orders: [ ...potentially thousands of orders... ]
  // MongoDB document limit = 16MB!
}
```

**Option B — Reference: Store userId in each order** (✅ Recommended)

```js
// users collection
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  totalOrders: 14  // optional: denormalized count for fast access
}

// orders collection
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),        // reference back to user
  items: [
    { productId: ObjectId("p1"), name: "Laptop Pro", qty: 1, price: 75000 },
    { productId: ObjectId("p2"), name: "Mouse",       qty: 2, price: 1200 }
  ],
  totalAmount: 77400,
  status: "delivered",
  shippingAddress: {
    street: "123 Marine Drive",
    city: "Mumbai"
  },
  createdAt: ISODate("2024-01-10")
}
```

**Query: Get all orders for Alice**

```js
db.orders.find({ userId: ObjectId("u1") }).sort({ createdAt: -1 })
```

---

### 3.6 Many-to-Many Relationship

**Example: Students and Courses**

One student can enroll in many courses. One course can have many students.

**Option A — Reference IDs on both sides:**

```js
// students collection
{
  _id: ObjectId("s1"),
  name: "Ravi Patel",
  email: "ravi@example.com",
  enrolledCourses: [
    ObjectId("c1"),   // references to courses
    ObjectId("c2"),
    ObjectId("c3")
  ]
}

// courses collection
{
  _id: ObjectId("c1"),
  title: "Full Stack Web Dev",
  instructor: "Prof. Sharma",
  price: 4999,
  enrolledStudents: [
    ObjectId("s1"),   // references to students
    ObjectId("s2")
  ]
}
```

**Option B — Junction/Enrollment collection** (✅ Better when relationship has extra data)

```js
// students collection
{ _id: ObjectId("s1"), name: "Ravi Patel" }

// courses collection
{ _id: ObjectId("c1"), title: "Full Stack Web Dev" }

// enrollments collection (the "junction table")
{
  _id: ObjectId("e1"),
  studentId: ObjectId("s1"),
  courseId: ObjectId("c1"),
  enrolledAt: ISODate("2024-01-05"),
  progress: 65,        // % completion — belongs to the relationship!
  grade: null,
  completedAt: null
}
```

> Use a junction collection when the relationship itself has **extra data** (progress, date enrolled, grade, etc.)

---

### 3.7 Practical Schema Examples

#### E-Commerce: Users + Orders + Products

```js
// users
{
  _id: ObjectId("u1"),
  name: "Alice Johnson",
  email: "alice@example.com",
  role: "customer",
  savedAddresses: [          // embedded — small, user-owned
    {
      label: "Home",
      street: "123 MG Road",
      city: "Bangalore",
      pincode: "560001"
    }
  ],
  createdAt: ISODate("2023-06-01")
}

// products
{
  _id: ObjectId("p1"),
  name: "MacBook Pro 14",
  description: "Apple M3 chip...",
  price: 199000,
  category: "Laptops",
  brand: "Apple",
  stock: 25,
  images: ["img1.jpg", "img2.jpg"],
  tags: ["apple", "laptop", "m3"],
  ratings: { average: 4.7, count: 128 }
}

// orders
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),        // reference
  items: [                       // embedded snapshot of product data at time of purchase
    {
      productId: ObjectId("p1"),
      name: "MacBook Pro 14",    // snapshot — price might change later!
      price: 199000,
      quantity: 1
    }
  ],
  totalAmount: 199000,
  status: "processing",          // pending → processing → shipped → delivered
  shippingAddress: {             // snapshot — user might move later!
    street: "123 MG Road",
    city: "Bangalore",
    pincode: "560001"
  },
  paymentMethod: "credit_card",
  createdAt: ISODate("2024-01-15")
}
```

> 💡 **Snapshot Pattern**: In orders, embed a copy of the product name/price and shipping address. If the product price changes or the user moves, the order history stays accurate.

---

#### Task Management App Schema

```js
// users
{
  _id: ObjectId("u1"),
  name: "Alice",
  email: "alice@example.com"
}

// projects
{
  _id: ObjectId("proj1"),
  name: "Website Redesign",
  ownerId: ObjectId("u1"),      // reference
  members: [ObjectId("u1"), ObjectId("u2"), ObjectId("u3")],
  createdAt: ISODate("2024-01-01")
}

// tasks
{
  _id: ObjectId("t1"),
  title: "Design homepage",
  description: "Create wireframes and final design",
  projectId: ObjectId("proj1"),     // reference
  assignedTo: ObjectId("u2"),       // reference
  createdBy: ObjectId("u1"),        // reference
  status: "in-progress",            // todo → in-progress → review → done
  priority: "high",
  tags: ["design", "homepage"],
  dueDate: ISODate("2024-02-01"),
  comments: [                        // embedded — always accessed with task
    {
      userId: ObjectId("u1"),
      text: "Please use the brand colors",
      createdAt: ISODate("2024-01-15")
    }
  ],
  createdAt: ISODate("2024-01-10")
}
```

---

### 3.8 Decision Guide: Embed vs Reference

```
Ask yourself these questions:

1. Is the data always accessed together?
   YES → Consider embedding
   NO  → Consider referencing

2. Can the nested data grow without bound?
   YES (many items over time) → Reference
   NO  (1 address, 1 profile) → Embed

3. Is the data shared across multiple documents?
   YES → Reference (update once)
   NO  → Embed is fine

4. Do you need to query the nested data independently?
   YES → Consider a separate collection
   NO  → Embedding works

5. Is write performance critical?
   YES → Fewer documents (embed) = less I/O
   NO  → Referencing is fine

Rule of thumb:
─────────────────────────────────────────
Small, bounded, owned data  → EMBED
Large, growing, shared data → REFERENCE
```

---