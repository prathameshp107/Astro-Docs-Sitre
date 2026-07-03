---
title: Async Generators
description: Async generator functions for streaming data and paginated APIs
sidebar:
  order: 3
---

# Async Generators

## Introduction

**Async generators** combine generators and Promises. They use `async function*` and `yield` with `await`. They're consumed with `for await...of`.

## Basic Async Generator

```javascript
async function* numberStream() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

// Consume with for await...of
(async () => {
  for await (const num of numberStream()) {
    console.log(num); // 1, 2, 3
  }
})();
```

## Paginated API Example

```javascript
async function* fetchUsers() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`/api/users?page=${page}`);
    const data = await response.json();
    
    yield data.users;
    
    hasMore = data.hasMore;
    page++;
  }
}

// Usage
async function processAllUsers() {
  for await (const users of fetchUsers()) {
    for (const user of users) {
      console.log(user.name);
    }
  }
}
```

## Async Iterator Protocol

Async generators follow the **async iteration protocol**:

```javascript
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let count = 0;
    return {
      async next() {
        if (count < 3) {
          const value = await Promise.resolve(++count);
          return { value, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

(async () => {
  for await (const num of asyncIterable) {
    console.log(num); // 1, 2, 3
  }
})();
```

## Practical: Streaming Data

```javascript
async function* streamFile(url, chunkSize = 1024) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

// Usage
async function processFile() {
  for await (const chunk of streamFile('/large-file.txt')) {
    console.log(`Received chunk: ${chunk.length} bytes`);
  }
}
```

## Summary

- `async function*` creates async generators
- Use `await` inside async generators
- Consume with `for await...of`
- Perfect for paginated APIs, streams, and real-time data
- Follow async iteration protocol with `Symbol.asyncIterator`

## Further Reading

- [MDN: for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
- [Previous: yield](./yield)
