---
title: "Mongoose — Node.js Integration"
description: "Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js. It adds: - Schemas (structure for documents) - Validation (enforce rules before s"
---

## 6. Mongoose — Node.js Integration

### 6.1 What is Mongoose?

Mongoose is an **ODM (Object Data Modeling) library** for MongoDB in Node.js. It adds:
- Schemas (structure for documents)
- Validation (enforce rules before saving)
- Middleware (run code before/after operations)
- Helper methods and plugins

```
MongoDB Driver (raw)         Mongoose (ODM)
─────────────────────        ─────────────────
No schema                    Schema-based
Manual validation            Built-in validation
Raw JS objects               Model instances with methods
No middleware                Pre/post hooks
```

---

### 6.2 Setup

```bash
npm install mongoose
```

```js
// db.js — database connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Options for Mongoose 6+:
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

```js
// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

connectDB();
const app = express();
app.use(express.json());
```

---

### 6.3 Defining a Schema

A Schema defines the **structure, types, and rules** for documents.

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // Basic field
  name: String,

  // Field with options
  email: {
    type: String,
    required: [true, 'Email is required'],  // validation
    unique: true,
    lowercase: true,                         // auto-transform
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],
    select: false    // never return password in queries by default
  },

  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age seems too high']
  },

  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Nested object
  address: {
    street: String,
    city: String,
    pincode: String
  },

  // Array of strings
  tags: [String],

  // Array of objects
  socialLinks: [{
    platform: String,
    url: String
  }],

  // Reference to another collection
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'          // collection name to reference
  },

  // Custom validation
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{9,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
}, {
  timestamps: true   // auto-adds createdAt and updatedAt fields
});
```

---

### 6.4 Creating a Model

```js
// A Model is a class that lets you interact with a collection
const User = mongoose.model('User', userSchema);
// 'User' → collection name will be 'users' (lowercased + pluralized)

module.exports = User;
```

---

### 6.5 Mongoose Validation

```js
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [2, 'Name too short'],
    maxlength: [100, 'Name too long'],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Other']
  },
  sku: {
    type: String,
    unique: true,
    uppercase: true
  },
  stock: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be a whole number'
    }
  }
});
```

---

### 6.6 Middleware (Pre/Post Hooks)

Middleware runs **automatically** before or after certain operations.

```js
const bcrypt = require('bcrypt');

// Pre-save hook: hash password before saving
userSchema.pre('save', async function(next) {
  // 'this' refers to the document being saved

  // Only hash if password was modified (not on other updates)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Pre-save hook: auto-generate slug from name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

// Post-save hook: log after save
userSchema.post('save', function(doc, next) {
  console.log(`User saved: ${doc.email}`);
  next();
});

// Pre-remove hook: clean up related data
userSchema.pre('deleteOne', { document: true }, async function(next) {
  await Order.deleteMany({ userId: this._id });
  await Task.updateMany({ assignedTo: this._id }, { $unset: { assignedTo: "" } });
  next();
});

// Pre-find hook: always exclude inactive users
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});
```

---

### 6.7 Instance & Static Methods

```js
// Instance method — called on a document instance
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

// Static method — called on the Model itself
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActiveAdmins = function() {
  return this.find({ role: 'admin', isActive: true });
};

// Usage:
const user = await User.findByEmail('alice@example.com');
const isMatch = await user.comparePassword('mypassword');
```

---

### 6.8 CRUD with Mongoose + Express

```js
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role:  { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

```js
// controllers/userController.js
const User = require('../models/User');

// ─── CREATE ──────────────────────────────────────────────
// POST /users
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // User.create() = new User(data) + user.save()

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    if (err.code === 11000) {  // duplicate key
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

// ─── READ ALL ─────────────────────────────────────────────
// GET /users?role=admin&page=1&limit=10
const getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, sort = 'createdAt' } = req.query;

    const filter = {};
    if (role) filter.role = role;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter)
          .select('-password')           // exclude password
          .sort({ [sort]: -1 })
          .skip(skip)
          .limit(Number(limit)),
      User.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── READ ONE ─────────────────────────────────────────────
// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────
// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,         // return updated document
        runValidators: true // run schema validators on update
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────
// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
```

```js
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  createUser, getUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
```

---

### 6.9 Populate — Resolving References

```js
const postSchema = new Schema({
  title:   String,
  content: String,
  author:  { type: Schema.Types.ObjectId, ref: 'User' },
  tags:    [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

// Populate author info
const post = await Post.findById(id).populate('author', 'name email');
// Result: { title: "...", author: { name: "Alice", email: "alice@..." } }

// Populate multiple fields
const post = await Post.findById(id)
  .populate('author', 'name email')
  .populate('tags', 'name color');

// Deep/nested populate
const order = await Order.findById(id)
  .populate({
    path: 'userId',
    select: 'name email',
    populate: {
      path: 'department',   // nested populate
      select: 'name'
    }
  });
```

---