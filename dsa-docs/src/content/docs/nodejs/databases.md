---
title: "Databases in Node.js"
description: "MongoDB with Mongoose, SQL with PostgreSQL/MySQL, and comparisons between SQL and NoSQL databases."
---

# Section 8: Databases

## 🍃 MongoDB (NoSQL)

MongoDB stores data as **documents** (like JSON objects) in **collections** (like tables).

### Mongoose — MongoDB ODM for Node.js

```javascript
const mongoose = require('mongoose');

// ─── CONNECT ─────────────────────────────────────────
await mongoose.connect(process.env.MONGO_URI);

// ─── DEFINE SCHEMA ───────────────────────────────────
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

// ─── METHODS & HOOKS ─────────────────────────────────
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// ─── CRUD OPERATIONS ─────────────────────────────────
const user = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'secret123' });
const allUsers = await User.find({});
const user1 = await User.findById('user-id-here');
const adminUsers = await User.find({ role: 'admin' }).sort({ createdAt: -1 }).limit(10);
await User.findByIdAndUpdate(id, { name: 'New Name' }, { new: true, runValidators: true });
await User.findByIdAndDelete(id);

// Advanced query
const result = await User
  .find({ role: 'user', createdAt: { $gte: new Date('2024-01-01') } })
  .select('name email createdAt')
  .populate('orders')
  .sort({ name: 1 })
  .skip(20)
  .limit(10);
```

---

## 🐘 SQL Databases (PostgreSQL / MySQL)

```javascript
// Using pg (PostgreSQL)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
});

const getUser = async (userId) => {
  const query = 'SELECT id, name, email FROM users WHERE id = $1';
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
};

const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password_hash, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, created_at
  `;
  const { rows } = await pool.query(query, [name, email, passwordHash]);
  return rows[0];
};

// ─── TRANSACTIONS ────────────────────────────────────
const transferFunds = async (fromId, toId, amount) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
```

### SQL vs MongoDB

| Feature | SQL (PostgreSQL) | MongoDB |
|---------|-----------------|---------|
| Schema | Fixed, strict | Flexible, dynamic |
| Relationships | JOINs | Embedded docs or references |
| Transactions | Full ACID | Multi-document ACID (v4.0+) |
| Scaling | Vertical | Horizontal (sharding) |
| Best for | Financial data, complex relations | Content, catalogs, real-time |
| Query language | SQL | MongoDB Query Language |
