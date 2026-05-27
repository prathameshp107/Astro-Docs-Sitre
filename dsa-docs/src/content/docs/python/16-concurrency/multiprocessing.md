---
title: Multiprocessing in Python
description: Learn about multiprocessing for CPU-bound tasks, Process pools, shared memory, and inter-process communication.
sidebar:
  order: 2
---

# Multiprocessing

## Introduction

**Multiprocessing** bypasses the GIL by using separate processes, each with its own Python interpreter and memory space. Ideal for CPU-bound tasks.

## Creating Processes

```python
import multiprocessing
import os

def worker(name):
    print(f"Worker {name} (PID: {os.getpid()})")

if __name__ == "__main__":
    processes = []
    for i in range(4):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()
```

## Process Pool

```python
from multiprocessing import Pool
import time

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

if __name__ == "__main__":
    numbers = range(100000, 101000)
    
    with Pool(processes=4) as pool:
        results = pool.map(is_prime, numbers)
    
    primes = [n for n, prime in zip(numbers, results) if prime]
    print(f"Found {len(primes)} primes")
```

## Sharing Data

```python
from multiprocessing import Process, Value, Array

def increment_counter(counter):
    for _ in range(1000):
        with counter.get_lock():  # Synchronize access
            counter.value += 1

if __name__ == "__main__":
    counter = Value('i', 0)  # Shared integer
    
    processes = [Process(target=increment_counter, args=(counter,))
                 for _ in range(4)]
    
    for p in processes:
        p.start()
    for p in processes:
        p.join()
    
    print(f"Counter: {counter.value}")
```

## Queue for IPC

```python
from multiprocessing import Process, Queue

def producer(queue):
    for i in range(10):
        queue.put(i)
    queue.put(None)  # Sentinel

def consumer(queue):
    while True:
        item = queue.get()
        if item is None:
            break
        print(f"Got: {item}")

if __name__ == "__main__":
    queue = Queue()
    p1 = Process(target=producer, args=(queue,))
    p2 = Process(target=consumer, args=(queue,))
    
    p1.start()
    p2.start()
    p1.join()
    p2.join()
```

## Best Practices

1. **Always guard process creation** with `if __name__ == "__main__":`
2. **Use `Pool.map()`** for parallel data processing
3. **Use `Queue` or `Pipe`** for communication between processes
4. **Use `Value`/`Array`** for shared data with locks
5. **Process startup has overhead** — only use for significant work

## Practice Exercises

**Exercise 1:** Compute multiple large Fibonacci numbers in parallel using a process pool.

**Exercise 2:** Implement a parallel file processor that counts words in multiple files simultaneously.
