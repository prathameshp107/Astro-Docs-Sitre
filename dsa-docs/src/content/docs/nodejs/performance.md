---
title: "Performance Optimization"
description: "Compression, database query optimization, pagination, and memory leak prevention in Node.js."
---

# Section 12: Performance Optimization

## ⚡ Key Optimizations

### 1. Compression

```javascript
const compression = require('compression');

app.use(compression({ threshold: 1024 }));
// Reduces response size by 60-80%!
```

### 2. Database Query Optimization

```javascript
// ❌ N+1 Query Problem
const users = await User.find({});
for (const user of users) {
  user.orders = await Order.find({ userId: user._id }); // N calls!
}

// ✅ Use populate() or aggregate
const users = await User.find({}).populate('orders');

// ✅ Add database indexes
userSchema.index({ email: 1 });
userSchema.index({ name: 1, createdAt: -1 });
```

### 3. Pagination (Never Return Everything!)

```javascript
// ❌ TERRIBLE — returns millions of records
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// ✅ Always paginate
app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    Product.find({}).skip(skip).limit(limit),
    Product.countDocuments({})
  ]);
  
  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit)
    }
  });
});
```

### 4. Memory Leak Prevention

```javascript
// ❌ Memory leak — event listeners never removed!
class MyService {
  startListening() {
    eventEmitter.on('data', this.handleData);
  }
}

// ✅ Remove listeners when done
class MyService {
  startListening() {
    this.handleData = this.processData.bind(this);
    eventEmitter.on('data', this.handleData);
  }
  stopListening() {
    eventEmitter.off('data', this.handleData);
  }
}

// ❌ Global variables accumulating data
const cache = {};
function addToCache(key, value) {
  cache[key] = value; // Never cleaned up!
}

// ✅ Use an LRU cache with max size
const LRU = require('lru-cache');
const cache = new LRU({ max: 500, ttl: 1000 * 60 * 5 });
```
