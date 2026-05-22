---
title: "Async Programming in Node.js"
description: "Callbacks, Promises, and Async/Await — the evolution of asynchronous programming in Node.js."
---

# Section 4: Async Programming

Async programming is how Node.js handles operations that take time (file reading, database queries, API calls) **without blocking** the rest of the program.

## 1️⃣ Callbacks

A **callback** is a function passed as an argument to another function, to be called when the operation completes.

```javascript
// Simple callback example
function getUserFromDB(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: 'John', email: 'john@example.com' };
    callback(null, user);
  }, 100);
}

getUserFromDB(1, (err, user) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('User:', user);
});
```

### 😱 Callback Hell (Pyramid of Doom)

```javascript
loginUser(credentials, (err, user) => {
  if (err) return handleError(err);
  getUserProfile(user.id, (err, profile) => {
    if (err) return handleError(err);
    getUserOrders(user.id, (err, orders) => {
      if (err) return handleError(err);
      sendWelcomeEmail(user.email, (err, result) => {
        if (err) return handleError(err);
        updateLoginTime(user.id, (err) => {
          if (err) return handleError(err);
          res.json({ user, profile, orders });
        });
      });
    });
  });
});
```

---

## 2️⃣ Promises

A **Promise** is an object representing the eventual completion (or failure) of an async operation.

```javascript
// Creating a Promise
function getUserFromDB(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject(new Error('User ID is required'));
        return;
      }
      const user = { id: userId, name: 'John' };
      resolve(user);
    }, 100);
  });
}

// Using a Promise
getUserFromDB(1)
  .then(user => {
    console.log('Got user:', user);
    return getUserOrders(user.id);
  })
  .then(orders => console.log('Got orders:', orders))
  .catch(err => console.error('Error:', err.message))
  .finally(() => console.log('Done (runs always)'));

// Promise combinators
const p1 = fetchUser(1);
const p2 = fetchOrders(1);
const p3 = fetchProfile(1);

Promise.all([p1, p2, p3]).then(([user, orders, profile]) => {
  console.log({ user, orders, profile });
});

Promise.race([p1, p2, p3]).then(first => {
  console.log('Fastest:', first);
});

Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => {
    if (r.status === 'fulfilled') console.log('✅', r.value);
    else console.log('❌', r.reason);
  });
});
```

---

## 3️⃣ Async/Await (Modern — Use This!)

`async/await` is syntactic sugar over Promises — it makes async code look like synchronous code.

```javascript
async function loginFlow(credentials) {
  try {
    const user = await loginUser(credentials);
    const profile = await getUserProfile(user.id);
    const orders = await getUserOrders(user.id);
    await sendWelcomeEmail(user.email);
    await updateLoginTime(user.id);
    return { user, profile, orders };
  } catch (err) {
    console.error('Login flow error:', err.message);
    throw err;
  }
}

// Run multiple things in PARALLEL
async function getDashboardData(userId) {
  const [user, orders, notifications] = await Promise.all([
    getUser(userId),
    getOrders(userId),
    getNotifications(userId)
  ]);
  return { user, orders, notifications };
}
```

### Best Practices

```javascript
// ✅ Always use try/catch in async functions
async function fetchData() {
  try {
    const data = await someAsyncOperation();
    return data;
  } catch (err) {
    logger.error('fetchData failed:', err);
    throw err;
  }
}

// ✅ Don't forget await!
async function badExample() {
  const data = fetchData(); // ❌ Missing await! data is a Promise!
  const data2 = await fetchData(); // ✅ Correct
}

// ✅ Handle errors at the right level
async function routeHandler(req, res) {
  try {
    const result = await processRequest(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
```
