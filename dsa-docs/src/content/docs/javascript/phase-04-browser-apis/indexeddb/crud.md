---
title: CRUD Operations
description: Create, read, update, and delete data in IndexedDB
sidebar:
  order: 2
---

# CRUD Operations

## Introduction

IndexedDB provides add, get, put, and delete methods for full CRUD functionality.

## Basic CRUD

```javascript
const dbRequest = indexedDB.open('MyAppDB', 1);

dbRequest.onsuccess = (event) => {
  const db = event.target.result;

  // CREATE
  const addTx = db.transaction('users', 'readwrite');
  addTx.objectStore('users').add({ name: 'Alice', email: 'alice@email.com' });

  // READ
  const getTx = db.transaction('users', 'readonly');
  const getRequest = getTx.objectStore('users').get(1);
  getRequest.onsuccess = () => console.log(getRequest.result);

  // UPDATE
  const putTx = db.transaction('users', 'readwrite');
  putTx.objectStore('users').put({ id: 1, name: 'Bob', email: 'bob@email.com' });

  // DELETE
  const delTx = db.transaction('users', 'readwrite');
  delTx.objectStore('users').delete(1);
};
```

## Transactions

```javascript
// Transactions are auto-committed when all requests complete
// Use readwrite for modifications, readonly for reads

const tx = db.transaction('users', 'readwrite');
const store = tx.objectStore('users');

store.add({ name: 'Alice' });
store.add({ name: 'Bob' });

tx.oncomplete = () => console.log('Transaction complete');
tx.onerror = (e) => console.error('Transaction failed:', e.target.error);
```

## Summary

- `add()` — create (fails if key exists)
- `put()` — create/update (replaces if key exists)
- `get()` — read by key
- `delete()` — remove by key
- Transactions auto-commit when all operations complete

## Further Reading

- [MDN: Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
