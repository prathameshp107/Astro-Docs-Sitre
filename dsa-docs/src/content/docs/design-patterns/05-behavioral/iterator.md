---
title: "Iterator"
description: "Provide a way to access elements of a collection sequentially without exposing its underlying representation."
sidebar:
  order: 4
---

## Iterator

> **Traverse a collection without exposing its internal structure.**

### Real-World Analogy

> A **TV remote's channel button** — you press "next channel" to go through channels one by one. You don't need to know how the TV stores channels internally.

---

## The Pattern

```mermaid
sequencediagram
    participant Client
    participant Iterator
    participant Collection

    Client->>Iterator: hasNext?
    Iterator-->>Client: yes
    Client->>Iterator: next item
    Iterator->>Collection: getItem(index)
    Collection-->>Iterator: item
    Iterator-->>Client: 🎵 Song A

    Client->>Iterator: hasNext?
    Iterator-->>Client: yes
    Client->>Iterator: next item
    Iterator->>Collection: getItem(index)
    Collection-->>Iterator: item
    Iterator-->>Client: 🎵 Song B

    Client->>Iterator: hasNext?
    Iterator-->>Client: no
    Note over Client: Done traversing
```

---

## ✅ Example

```js
class Playlist {
  constructor() {
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  createIterator() {
    return new PlaylistIterator(this);
  }
}

class PlaylistIterator {
  constructor(playlist) {
    this.songs = playlist.songs;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.songs.length;
  }

  next() {
    return this.hasNext() ? this.songs[this.index++] : null;
  }

  reset() {
    this.index = 0;
  }
}

// Usage
const playlist = new Playlist();
playlist.addSong('Bohemian Rhapsody');
playlist.addSong('Stairway to Heaven');
playlist.addSong('Hotel California');

const iterator = playlist.createIterator();

while (iterator.hasNext()) {
  console.log(`🎵 Now playing: ${iterator.next()}`);
}
// 🎵 Now playing: Bohemian Rhapsody
// 🎵 Now playing: Stairway to Heaven
// 🎵 Now playing: Hotel California
```

### JavaScript's Built-in Iterator

JavaScript collections implement the iterator pattern natively:

```js
const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Same with for...of (uses iterator internally)
for (const num of numbers) {
  console.log(num); // 1, 2, 3
}
```

---

## When to Use

- You have a **complex collection** (tree, graph, custom data structure)
- You want multiple ways to **traverse** the same collection
- You want to **hide** the collection's internal structure
- You need **multiple simultaneous traversals**

## When NOT to Use

- Simple arrays — just use `for...of` or array methods
- The collection is only used in one place with one traversal method

---

## In Simple Words

- A **standard way** to loop through a collection
- The client doesn't know if it's an array, tree, or linked list — just calls `.next()`
- JavaScript arrays and `for...of` already use the iterator pattern
- You can create **custom iterators** for your own data structures
