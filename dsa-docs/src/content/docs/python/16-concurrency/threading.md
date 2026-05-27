---
title: Threading in Python
description: Learn about threads, thread pools, synchronization, and the Global Interpreter Lock (GIL).
sidebar:
  order: 1
---

# Threading

## Introduction

**Threads** are lightweight processes that share the same memory space. Python threads are great for I/O-bound tasks but limited for CPU-bound tasks by the GIL.

## Creating Threads

```python
import threading
import time

def worker(name, delay):
    time.sleep(delay)
    print(f"Worker {name} finished")

# Create threads
t1 = threading.Thread(target=worker, args=("A", 2))
t2 = threading.Thread(target=worker, args=("B", 1))

# Start threads
t1.start()
t2.start()

# Wait for completion
t1.join()
t2.join()
print("All done")
```

## Thread Pools

```python
from concurrent.futures import ThreadPoolExecutor
import time

def fetch_url(url):
    time.sleep(1)
    return f"Data from {url}"

urls = ["http://example.com"] * 5

# Using ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch_url, urls))
    print(results)
```

## Thread Safety with Locks

```python
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # Acquire and release automatically
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"Counter: {counter}")  # Always 500000
```

## RLock (Reentrant Lock)

```python
lock = threading.RLock()  # Same thread can acquire multiple times

def recursive_lock(n):
    with lock:
        if n > 0:
            recursive_lock(n - 1)
```

## Semaphore and Event

```python
# Semaphore — limits concurrent access
semaphore = threading.Semaphore(3)  # Max 3 threads at once

def limited_worker():
    with semaphore:
        print("Working...")
        time.sleep(1)

# Event — signaling between threads
event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()
    print("Event received!")

def setter():
    time.sleep(2)
    event.set()

threading.Thread(target=waiter).start()
threading.Thread(target=setter).start()
```

## When to Use Threading

| Task Type | Use Threads? | Alternative |
|-----------|-------------|-------------|
| I/O-bound (web requests, file I/O) | ✅ Yes | asyncio |
| CPU-bound (calculations) | ❌ No (GIL) | multiprocessing |
| Many concurrent connections | ⚠️ Limited | asyncio |

:::tip[When to Use Threading]
Threads are best for I/O-bound operations like web scraping, file processing, and database queries where the GIL is released during I/O wait.
:::

:::caution[GIL Limitation]
For CPU-bound work like number crunching or image processing, threads won't speed things up due to the GIL. Use `multiprocessing` instead.
:::

## Practice Exercises

**Exercise 1:** Download multiple URLs concurrently using a thread pool.

**Exercise 2:** Implement a thread-safe producer-consumer queue using threading primitives.
