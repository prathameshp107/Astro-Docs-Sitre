---
title: Using Promises
description: Wrapping IndexedDB with async/await
sidebar:
  order: 3
---

# Using Promises

## Introduction

IndexedDB's callback API can be wrapped in Promises for cleaner async/await usage.

## Promise Wrapper

```javascript
function dbPromise() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('MyAppDB', 1);
    req.onupgradeneeded = (e) => { /* setup */ };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function getUser(id) {
  const db = await dbPromise();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');

  return new Promise((resolve, reject) => {
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
```

## Async/Await Usage

```javascript
async function loadUser(id) {
  try {
    const user = await getUser(id);
    console.log('User:', user);
    return user;
  } catch (error) {
    console.error('Failed to load user:', error);
  }
}
```

## Summary

- Wrap IndexedDB requests in Promises for cleaner code
- Each request (get, add, put, delete) returns a Promise
- Combine with async/await for readable async code
- Handle errors with try/catch

## Further Reading

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
