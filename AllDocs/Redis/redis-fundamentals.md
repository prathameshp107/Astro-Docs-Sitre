# Redis Fundamentals

> **Complete guide from absolute beginner to intermediate level.**  
> Covers core concepts, data structures, caching patterns, real-world use cases, and best practices.

---

## Table of Contents

1. [Introduction to Redis](#1-introduction-to-redis)
2. [What is an In-Memory Database](#2-what-is-an-in-memory-database)
3. [Redis Architecture](#3-redis-architecture)
4. [Installing Redis](#4-installing-redis)
5. [Redis Data Types Overview](#5-redis-data-types-overview)
6. [Redis Strings](#6-redis-strings)
7. [Redis Lists](#7-redis-lists)
8. [Redis Sets](#8-redis-sets)
9. [Redis Sorted Sets](#9-redis-sorted-sets)
10. [Redis Hashes](#10-redis-hashes)
11. [Key Expiration & TTL](#11-key-expiration--ttl)
12. [Redis Persistence](#12-redis-persistence)
13. [Redis Pub/Sub](#13-redis-pubsub)
14. [Redis Transactions](#14-redis-transactions)
15. [Redis Caching Patterns](#15-redis-caching-patterns)
16. [Redis with Node.js](#16-redis-with-nodejs)
17. [Redis with Docker](#17-redis-with-docker)
18. [Common Redis Commands Cheat Sheet](#18-common-redis-commands-cheat-sheet)
19. [Common Beginner Mistakes](#19-common-beginner-mistakes)
20. [Redis Best Practices](#20-redis-best-practices)
21. [Redis Interview Questions](#21-redis-interview-questions)
22. [Summary & Learning Roadmap](#22-summary--learning-roadmap)

---

## 1. Introduction to Redis

### What is Redis?

**Redis** stands for **Re**mote **Di**ctionary **S**erver. It is an open-source, in-memory data store used as a database, cache, message broker, and streaming engine.

Think of Redis as an **ultra-fast notepad** that lives in your computer's RAM. When you need to remember something quickly, instead of going to a library (your database on disk), you look at your notepad (Redis in RAM). It is almost instantaneous.

> **Analogy:** Imagine you are a cashier at a supermarket. You have a drawer next to you with the prices of the 50 most common items — you don't need to look them up in a catalog every time. That drawer is Redis. The catalog is your database.

---

### History of Redis

| Year | Milestone |
|------|-----------|
| 2009 | Created by Salvatore Sanfilippo (antirez) to solve performance problems in his startup LLOOGG |
| 2010 | VMware sponsored the project |
| 2013 | Redis Labs (now Redis Inc.) founded |
| 2015 | Redis Cluster (horizontal scaling) released |
| 2018 | Redis Streams introduced |
| 2022 | Redis 7.0 released with major performance improvements |

---

### Why Redis Was Created

Salvatore Sanfilippo was building a real-time analytics tool. His PostgreSQL database could not handle thousands of reads and writes per second fast enough. He needed something that could respond in **microseconds**, not milliseconds.

He realized:
- Disk I/O (reading from a hard drive) is the bottleneck
- RAM is orders of magnitude faster than disk
- Most frequently accessed data is a small subset of the total data

So he built Redis — a data store that lives entirely in RAM.

---

### Problems Redis Solves

| Problem | Without Redis | With Redis |
|---------|--------------|------------|
| Slow repeated database queries | Every request hits the database | Cache results in Redis, serve instantly |
| Session management | Store sessions in DB (slow) | Store sessions in Redis (fast) |
| Rate limiting | Complex DB queries | Simple counters with INCR |
| Real-time leaderboards | Sort millions of rows | Sorted Sets handle it natively |
| Message queues | Third-party services | Redis Lists or Streams |
| Pub/Sub messaging | External broker required | Built into Redis |

---

### Traditional Database Limitations

Traditional relational databases (MySQL, PostgreSQL) store data on **disk**. Every query involves:

1. Parsing the SQL query
2. Planning the query execution
3. Reading data from disk (HDD/SSD)
4. Joining tables if needed
5. Returning the result

This process can take **5–50 milliseconds** or more for complex queries. Under high load (thousands of requests per second), this becomes a serious bottleneck.

---

### Why Caching is Important

Caching stores the result of an expensive operation so you can reuse it without recomputing it. It is the single most impactful optimization in web application performance.

**Example:** You have a news website. The homepage shows the top 10 trending articles. This query joins 3 tables, sorts by views, and takes 200ms. With 10,000 users per minute requesting the homepage:

- **Without cache:** 10,000 × 200ms = database is overwhelmed
- **With Redis cache:** Query runs once, result cached for 60 seconds, 10,000 requests served from RAM in < 1ms each

---

### Why Redis is Fast

1. **In-Memory Storage** — All data lives in RAM, no disk I/O
2. **Single-threaded Event Loop** — No context switching overhead between threads
3. **Efficient Data Structures** — Internally optimized (skip lists, hash tables, zip lists)
4. **Non-blocking I/O** — Uses multiplexing to handle thousands of connections
5. **Simple Protocol (RESP)** — Lightweight binary-safe protocol

> Redis can handle **1,000,000+ operations per second** on a single server.

---

### Architecture Diagram: Application with Cache Layer

```svg
<svg viewBox="0 0 740 420" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">

  <!-- Background -->
  <rect width="740" height="420" rx="12" fill="#f8fafc"/>

  <!-- Title -->
  <text x="370" y="34" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Cache Layer — Request Flow</text>

  <!-- CLIENT -->
  <rect x="30" y="80" width="130" height="60" rx="8" fill="#3b82f6" />
  <text x="95" y="107" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Client / Browser</text>
  <text x="95" y="125" text-anchor="middle" font-size="11" fill="#dbeafe">User Request</text>

  <!-- APPLICATION SERVER -->
  <rect x="290" y="80" width="150" height="60" rx="8" fill="#6366f1"/>
  <text x="365" y="107" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">App Server</text>
  <text x="365" y="125" text-anchor="middle" font-size="11" fill="#e0e7ff">Node.js / Express</text>

  <!-- REDIS -->
  <rect x="570" y="60" width="140" height="60" rx="8" fill="#ef4444"/>
  <text x="640" y="87" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Redis Cache</text>
  <text x="640" y="105" text-anchor="middle" font-size="11" fill="#fee2e2">In-Memory Store</text>

  <!-- DATABASE -->
  <rect x="570" y="200" width="140" height="60" rx="8" fill="#10b981"/>
  <text x="640" y="227" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Database</text>
  <text x="640" y="245" text-anchor="middle" font-size="11" fill="#d1fae5">MySQL / MongoDB</text>

  <!-- Arrows: Client → App -->
  <line x1="160" y1="110" x2="288" y2="110" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="224" y="102" text-anchor="middle" font-size="10" fill="#3b82f6">HTTP Request</text>

  <!-- Arrows: App → Redis -->
  <line x1="440" y1="97" x2="568" y2="87" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="504" y="82" text-anchor="middle" font-size="10" fill="#ef4444">Cache lookup</text>

  <!-- Cache HIT arrow: Redis → App -->
  <line x1="568" y1="100" x2="440" y2="115" stroke="#f97316" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowOrange)"/>
  <text x="504" y="120" text-anchor="middle" font-size="10" fill="#f97316">Cache HIT ✓</text>

  <!-- Arrows: App → Database (cache miss) -->
  <line x1="440" y1="125" x2="568" y2="210" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrowGreen)"/>
  <text x="500" y="185" text-anchor="middle" font-size="10" fill="#10b981">Cache MISS →</text>
  <text x="500" y="197" text-anchor="middle" font-size="10" fill="#10b981">Query DB</text>

  <!-- Database → Redis (store result) -->
  <line x1="640" y1="200" x2="640" y2="122" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowPurple)"/>
  <text x="658" y="165" font-size="10" fill="#6366f1">Store in</text>
  <text x="658" y="177" font-size="10" fill="#6366f1">cache</text>

  <!-- App → Client (response) -->
  <line x1="290" y1="125" x2="162" y2="125" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrow)"/>
  <text x="226" y="140" text-anchor="middle" font-size="10" fill="#3b82f6">Response</text>

  <!-- Legend -->
  <rect x="30" y="310" width="680" height="90" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="50" y="333" font-size="12" font-weight="bold" fill="#334155">Legend</text>

  <line x1="50" y1="352" x2="90" y2="352" stroke="#ef4444" stroke-width="2"/>
  <text x="96" y="356" font-size="11" fill="#334155">Cache Lookup (always first)</text>

  <line x1="50" y1="372" x2="90" y2="372" stroke="#f97316" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="96" y="376" font-size="11" fill="#334155">Cache HIT — data returned from Redis instantly</text>

  <line x1="300" y1="352" x2="340" y2="352" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="346" y="356" font-size="11" fill="#334155">Cache MISS — fallback to database</text>

  <line x1="300" y1="372" x2="340" y2="372" stroke="#6366f1" stroke-width="2"/>
  <text x="346" y="376" font-size="11" fill="#334155">Store result in Redis for future requests</text>

  <!-- Arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#f97316"/>
    </marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#10b981"/>
    </marker>
    <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/>
    </marker>
  </defs>
</svg>
```

---

## 2. What is an In-Memory Database

### What Does "In-Memory" Mean?

Every computer has two types of storage:

| Storage Type | Location | Speed | Volatile? | Size |
|---|---|---|---|---|
| **RAM (Memory)** | Memory chips on motherboard | ~100 nanoseconds | Yes (lost on power off) | 8 GB – 256 GB |
| **Disk (SSD/HDD)** | Physical drive | ~100 microseconds (SSD) | No (persistent) | 256 GB – 16 TB |

> **Analogy:** RAM is your desk — fast access, limited space. Disk is your filing cabinet — slow access, unlimited space.

Redis stores all data in **RAM**. This means:
- No waiting for disk read/write operations
- Data access is in **nanoseconds to microseconds**
- It is 100x to 1000x faster than disk-based databases

---

### Performance Comparison

| Operation | MySQL (disk) | Redis (RAM) |
|---|---|---|
| Simple key lookup | ~1–5 ms | ~0.1 ms |
| Complex query | ~10–500 ms | N/A (not designed for this) |
| Write throughput | ~5,000/sec | ~1,000,000/sec |
| Read throughput | ~10,000/sec | ~1,000,000/sec |

---

### Disk vs Memory Diagram

```svg
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="340" rx="12" fill="#f8fafc"/>
  <text x="350" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Disk Storage vs In-Memory Storage</text>

  <!-- DISK side -->
  <rect x="30" y="55" width="290" height="240" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="2"/>
  <text x="175" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="#dc2626">💾 Disk Storage</text>

  <rect x="55" y="100" width="240" height="36" rx="6" fill="#fee2e2"/>
  <text x="175" y="123" text-anchor="middle" font-size="12" fill="#7f1d1d">1. App sends query</text>

  <line x1="175" y1="136" x2="175" y2="148" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowRed)"/>

  <rect x="55" y="150" width="240" height="36" rx="6" fill="#fee2e2"/>
  <text x="175" y="173" text-anchor="middle" font-size="12" fill="#7f1d1d">2. OS finds data on disk</text>

  <line x1="175" y1="186" x2="175" y2="198" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowRed)"/>

  <rect x="55" y="200" width="240" height="36" rx="6" fill="#fee2e2"/>
  <text x="175" y="223" text-anchor="middle" font-size="12" fill="#7f1d1d">3. Physical disk read (slow)</text>

  <line x1="175" y1="236" x2="175" y2="248" stroke="#dc2626" stroke-width="2" marker-end="url(#arrowRed)"/>

  <rect x="55" y="250" width="240" height="32" rx="6" fill="#fca5a5"/>
  <text x="175" y="271" text-anchor="middle" font-size="12" font-weight="bold" fill="#7f1d1d">⏱ ~1–50ms per query</text>

  <!-- RAM side -->
  <rect x="380" y="55" width="290" height="240" rx="10" fill="#f0fdf4" stroke="#6ee7b7" stroke-width="2"/>
  <text x="525" y="85" text-anchor="middle" font-size="14" font-weight="bold" fill="#16a34a">⚡ In-Memory (Redis)</text>

  <rect x="405" y="100" width="240" height="36" rx="6" fill="#dcfce7"/>
  <text x="525" y="123" text-anchor="middle" font-size="12" fill="#14532d">1. App sends command</text>

  <line x1="525" y1="136" x2="525" y2="148" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowGreen2)"/>

  <rect x="405" y="150" width="240" height="36" rx="6" fill="#dcfce7"/>
  <text x="525" y="173" text-anchor="middle" font-size="12" fill="#14532d">2. Redis finds data in RAM</text>

  <line x1="525" y1="186" x2="525" y2="198" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowGreen2)"/>

  <rect x="405" y="200" width="240" height="36" rx="6" fill="#dcfce7"/>
  <text x="525" y="223" text-anchor="middle" font-size="12" fill="#14532d">3. Returns instantly (RAM)</text>

  <line x1="525" y1="236" x2="525" y2="248" stroke="#16a34a" stroke-width="2" marker-end="url(#arrowGreen2)"/>

  <rect x="405" y="250" width="240" height="32" rx="6" fill="#6ee7b7"/>
  <text x="525" y="271" text-anchor="middle" font-size="12" font-weight="bold" fill="#14532d">⚡ ~0.1ms per operation</text>

  <!-- VS label -->
  <text x="350" y="185" text-anchor="middle" font-size="20" font-weight="bold" fill="#94a3b8">VS</text>

  <defs>
    <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#dc2626"/>
    </marker>
    <marker id="arrowGreen2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#16a34a"/>
    </marker>
  </defs>
</svg>
```

---

### Volatility Concern

Since Redis stores data in RAM, if the server crashes, the data is **lost**. Redis solves this with **persistence mechanisms** (RDB snapshots and AOF logs) discussed in [Section 12](#12-redis-persistence).

> **Tip:** For use cases like session caching or rate limiting, losing data on restart is acceptable. For critical data, enable persistence or use Redis alongside a durable database.

---

## 3. Redis Architecture

### How Redis Works Internally

Redis is designed for simplicity and speed. Here is what happens under the hood:

```
Client Request
      ↓
TCP Connection (port 6379)
      ↓
RESP Protocol Parser
      ↓
Command Dispatcher
      ↓
Single-threaded Event Loop
      ↓
In-Memory Data Store (Hash Table)
      ↓
Response serialized → sent back to client
```

---

### Key Architectural Components

| Component | Role |
|---|---|
| **Redis Server** | Core process, handles all commands |
| **Event Loop** | Single-threaded loop that processes commands one at a time |
| **In-Memory Store** | Giant hash table in RAM holding all key-value data |
| **RESP Protocol** | Redis Serialization Protocol — simple, fast wire format |
| **Persistence Engine** | RDB / AOF for writing data to disk |
| **Replication** | Master-Replica copies for high availability |

---

### Single-Threaded Architecture Explained

> **Common misconception:** People think single-threaded means slow. It does not.

Redis is single-threaded for **command processing**. This means:
- No locks or mutexes needed
- No race conditions
- No thread context switching overhead

The I/O is handled with non-blocking **epoll/kqueue** multiplexing. Redis can serve thousands of clients simultaneously through the event loop.

> **Analogy:** A highly efficient chef who can work on multiple dishes at once (prepping one while another is cooking), rather than having multiple chefs who bump into each other constantly.

---

### Redis Architecture Diagram

```svg
<svg viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="720" height="480" rx="12" fill="#f8fafc"/>
  <text x="360" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Internal Architecture</text>

  <!-- Clients -->
  <rect x="20" y="60" width="100" height="40" rx="6" fill="#3b82f6"/>
  <text x="70" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Client 1</text>
  <rect x="20" y="115" width="100" height="40" rx="6" fill="#3b82f6"/>
  <text x="70" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Client 2</text>
  <rect x="20" y="170" width="100" height="40" rx="6" fill="#3b82f6"/>
  <text x="70" y="195" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Client N</text>

  <!-- TCP Connection box -->
  <rect x="160" y="90" width="120" height="90" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
  <text x="220" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#4338ca">TCP Layer</text>
  <text x="220" y="140" text-anchor="middle" font-size="10" fill="#4338ca">Port 6379</text>
  <text x="220" y="158" text-anchor="middle" font-size="10" fill="#4338ca">RESP Protocol</text>

  <!-- Event Loop -->
  <rect x="330" y="75" width="160" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="410" y="105" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">Event Loop</text>
  <text x="410" y="125" text-anchor="middle" font-size="10" fill="#92400e">Single-threaded</text>
  <text x="410" y="143" text-anchor="middle" font-size="10" fill="#92400e">epoll / kqueue</text>
  <text x="410" y="161" text-anchor="middle" font-size="10" fill="#92400e">Non-blocking I/O</text>
  <text x="410" y="179" text-anchor="middle" font-size="10" fill="#92400e">Command Queue</text>

  <!-- In-Memory Store -->
  <rect x="540" y="60" width="155" height="150" rx="8" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
  <text x="617" y="90" text-anchor="middle" font-size="13" font-weight="bold" fill="#065f46">In-Memory</text>
  <text x="617" y="108" text-anchor="middle" font-size="13" font-weight="bold" fill="#065f46">Data Store</text>
  <text x="617" y="128" text-anchor="middle" font-size="10" fill="#065f46">Hash Table</text>
  <text x="617" y="146" text-anchor="middle" font-size="10" fill="#065f46">Strings / Lists</text>
  <text x="617" y="164" text-anchor="middle" font-size="10" fill="#065f46">Sets / Hashes</text>
  <text x="617" y="182" text-anchor="middle" font-size="10" fill="#065f46">Sorted Sets</text>
  <text x="617" y="200" text-anchor="middle" font-size="10" fill="#065f46">Streams</text>

  <!-- Persistence Engine -->
  <rect x="330" y="240" width="365" height="90" rx="8" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2"/>
  <text x="512" y="270" text-anchor="middle" font-size="13" font-weight="bold" fill="#5b21b6">Persistence Engine</text>
  <rect x="355" y="284" width="140" height="36" rx="6" fill="#8b5cf6"/>
  <text x="425" y="300" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">RDB Snapshots</text>
  <text x="425" y="314" text-anchor="middle" font-size="9" fill="#ede9fe">Point-in-time backup</text>
  <rect x="520" y="284" width="140" height="36" rx="6" fill="#8b5cf6"/>
  <text x="590" y="300" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">AOF Logs</text>
  <text x="590" y="314" text-anchor="middle" font-size="9" fill="#ede9fe">Append every command</text>

  <!-- Replication -->
  <rect x="30" y="355" width="280" height="80" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
  <text x="170" y="382" text-anchor="middle" font-size="13" font-weight="bold" fill="#9d174d">Replication</text>
  <rect x="50" y="394" width="100" height="30" rx="6" fill="#ec4899"/>
  <text x="100" y="413" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">Master Node</text>
  <rect x="190" y="394" width="100" height="30" rx="6" fill="#f9a8d4"/>
  <text x="240" y="413" text-anchor="middle" font-size="10" font-weight="bold" fill="#9d174d">Replica Node</text>

  <!-- Disk -->
  <rect x="330" y="355" width="365" height="55" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <text x="512" y="388" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569">💾 Disk Storage (dump.rdb / appendonly.aof)</text>

  <!-- Arrows -->
  <line x1="120" y1="80" x2="158" y2="125" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arrowB)"/>
  <line x1="120" y1="135" x2="158" y2="135" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arrowB)"/>
  <line x1="120" y1="190" x2="158" y2="155" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#arrowB)"/>
  <line x1="280" y1="135" x2="328" y2="135" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrowY)"/>
  <line x1="490" y1="135" x2="538" y2="135" stroke="#10b981" stroke-width="2" marker-end="url(#arrowG3)"/>
  <line x1="617" y1="210" x2="617" y2="238" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowP)"/>
  <line x1="512" y1="330" x2="512" y2="353" stroke="#8b5cf6" stroke-width="2" marker-end="url(#arrowP)"/>

  <defs>
    <marker id="arrowB" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowY" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrowG3" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#10b981"/>
    </marker>
    <marker id="arrowP" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#8b5cf6"/>
    </marker>
  </defs>
</svg>
```

---

## 4. Installing Redis

### Windows

Redis does not officially support Windows natively. You have two options:

**Option 1: WSL2 (Recommended)**
```bash
# Install WSL2 first, then inside Ubuntu terminal:
sudo apt update
sudo apt install redis-server -y
sudo service redis-server start
```

**Option 2: Use Docker (see Section 17)**

---

### Ubuntu / Debian Linux

```bash
# Update package list
sudo apt update

# Install Redis
sudo apt install redis-server -y

# Start Redis service
sudo systemctl start redis-server

# Enable Redis to start on boot
sudo systemctl enable redis-server

# Check status
sudo systemctl status redis-server
```

---

### macOS

```bash
# Install via Homebrew
brew install redis

# Start Redis as a background service
brew services start redis

# Or start manually in the foreground
redis-server
```

---

### Docker

```bash
# Pull and run Redis
docker run --name my-redis -p 6379:6379 -d redis

# Verify it's running
docker ps

# Connect to Redis CLI inside the container
docker exec -it my-redis redis-cli
```

---

### Verifying Your Installation

```bash
# Start Redis server
redis-server

# Open a new terminal and connect with CLI
redis-cli

# Test connection — Redis should reply PONG
127.0.0.1:6379> PING
PONG

# Set a test key
127.0.0.1:6379> SET hello "Redis is working!"
OK

# Get the value back
127.0.0.1:6379> GET hello
"Redis is working!"
```

> **Tip:** Redis CLI connects to `127.0.0.1:6379` by default. For a remote host, use `redis-cli -h <host> -p <port>`.

---

## 5. Redis Data Types Overview

Redis is not just a simple key-value store. It supports multiple rich data structures, each designed for specific use cases.

| Data Type | Best Used For | Real-World Example |
|---|---|---|
| **String** | Simple values, counters, cached HTML | Page view counter, session token |
| **List** | Ordered collections, queues, timelines | Task queue, activity feed |
| **Set** | Unique collections, memberships | Unique visitors, user tags |
| **Sorted Set** | Ranked collections with scores | Leaderboard, trending topics |
| **Hash** | Object-like storage with fields | User profile, product details |
| **Bitmap** | Bit-level operations | Daily active users tracking |
| **HyperLogLog** | Approximate unique count | Unique website visitors (approximate) |
| **Stream** | Append-only log, event sourcing | IoT sensor data, event logs |

---

### Data Type Hierarchy Diagram

```svg
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="720" height="400" rx="12" fill="#f8fafc"/>
  <text x="360" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Data Types</text>

  <!-- Root -->
  <rect x="290" y="55" width="140" height="44" rx="8" fill="#1e293b"/>
  <text x="360" y="82" text-anchor="middle" font-size="13" font-weight="bold" fill="#f8fafc">Redis Key-Value</text>

  <!-- Lines from root -->
  <line x1="360" y1="99" x2="80" y2="155" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="99" x2="210" y2="155" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="99" x2="360" y2="155" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="99" x2="510" y2="155" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="99" x2="640" y2="155" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- STRING -->
  <rect x="30" y="155" width="100" height="44" rx="8" fill="#3b82f6"/>
  <text x="80" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">String</text>

  <!-- LIST -->
  <rect x="160" y="155" width="100" height="44" rx="8" fill="#f97316"/>
  <text x="210" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">List</text>

  <!-- SET -->
  <rect x="310" y="155" width="100" height="44" rx="8" fill="#10b981"/>
  <text x="360" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Set</text>

  <!-- SORTED SET -->
  <rect x="460" y="155" width="100" height="44" rx="8" fill="#8b5cf6"/>
  <text x="510" y="173" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Sorted</text>
  <text x="510" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">Set</text>

  <!-- HASH -->
  <rect x="590" y="155" width="100" height="44" rx="8" fill="#ef4444"/>
  <text x="640" y="180" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Hash</text>

  <!-- Level 2 lines -->
  <line x1="80" y1="199" x2="80" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="210" y1="199" x2="210" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="199" x2="360" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="510" y1="199" x2="510" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="640" y1="199" x2="640" y2="255" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- String description -->
  <rect x="20" y="255" width="120" height="80" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>
  <text x="80" y="276" text-anchor="middle" font-size="10" fill="#1e40af">Text, numbers</text>
  <text x="80" y="292" text-anchor="middle" font-size="10" fill="#1e40af">Counters</text>
  <text x="80" y="308" text-anchor="middle" font-size="10" fill="#1e40af">Session tokens</text>
  <text x="80" y="324" text-anchor="middle" font-size="10" fill="#1e40af">Cached HTML</text>

  <!-- List description -->
  <rect x="150" y="255" width="120" height="80" rx="6" fill="#fff7ed" stroke="#fed7aa" stroke-width="1"/>
  <text x="210" y="276" text-anchor="middle" font-size="10" fill="#9a3412">Ordered items</text>
  <text x="210" y="292" text-anchor="middle" font-size="10" fill="#9a3412">Task queues</text>
  <text x="210" y="308" text-anchor="middle" font-size="10" fill="#9a3412">Activity feeds</text>
  <text x="210" y="324" text-anchor="middle" font-size="10" fill="#9a3412">Stack / Queue</text>

  <!-- Set description -->
  <rect x="300" y="255" width="120" height="80" rx="6" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>
  <text x="360" y="276" text-anchor="middle" font-size="10" fill="#14532d">Unique items</text>
  <text x="360" y="292" text-anchor="middle" font-size="10" fill="#14532d">Tags</text>
  <text x="360" y="308" text-anchor="middle" font-size="10" fill="#14532d">Unique visitors</text>
  <text x="360" y="324" text-anchor="middle" font-size="10" fill="#14532d">Friends list</text>

  <!-- Sorted Set description -->
  <rect x="450" y="255" width="120" height="80" rx="6" fill="#faf5ff" stroke="#ddd6fe" stroke-width="1"/>
  <text x="510" y="276" text-anchor="middle" font-size="10" fill="#5b21b6">Scored items</text>
  <text x="510" y="292" text-anchor="middle" font-size="10" fill="#5b21b6">Leaderboards</text>
  <text x="510" y="308" text-anchor="middle" font-size="10" fill="#5b21b6">Rankings</text>
  <text x="510" y="324" text-anchor="middle" font-size="10" fill="#5b21b6">Priority queues</text>

  <!-- Hash description -->
  <rect x="580" y="255" width="120" height="80" rx="6" fill="#fff1f2" stroke="#fecdd3" stroke-width="1"/>
  <text x="640" y="276" text-anchor="middle" font-size="10" fill="#9f1239">Field:Value</text>
  <text x="640" y="292" text-anchor="middle" font-size="10" fill="#9f1239">User profiles</text>
  <text x="640" y="308" text-anchor="middle" font-size="10" fill="#9f1239">Product data</text>
  <text x="640" y="324" text-anchor="middle" font-size="10" fill="#9f1239">Config objects</text>

  <!-- Special types row -->
  <text x="360" y="362" text-anchor="middle" font-size="11" fill="#64748b">Advanced types: Bitmap · HyperLogLog · Stream · Geospatial</text>
</svg>
```

---

## 6. Redis Strings

### What is a String?

A String in Redis is the most basic type. Despite the name, it can hold:
- Plain text: `"Hello, World!"`
- Integers: `42`
- Floats: `3.14`
- Binary data: images, serialized objects (up to **512 MB**)

> **Analogy:** A String is like a labeled jar — the label is the key, and whatever you put inside is the value.

---

### Core Commands

```bash
# Set a key
SET username "prathamesh"

# Get a key
GET username
# Output: "prathamesh"

# Set with expiry (in seconds)
SET session:user123 "token_abc" EX 3600

# Set multiple keys at once
MSET name "Alice" age "30" city "Pune"

# Get multiple keys at once
MGET name age city
# Output: 1) "Alice" 2) "30" 3) "Pune"

# Check if a key exists
EXISTS username
# Output: 1 (exists) or 0 (not found)

# Delete a key
DEL username

# Append to existing value
SET greeting "Hello"
APPEND greeting ", World!"
GET greeting
# Output: "Hello, World!"
```

---

### Counters — Increment & Decrement

Redis Strings can store integers and perform atomic increment/decrement operations.

```bash
# Initialize a counter
SET page:views:homepage 0

# Increment by 1 (atomic operation)
INCR page:views:homepage
# Output: (integer) 1

INCR page:views:homepage
# Output: (integer) 2

# Increment by a specific amount
INCRBY page:views:homepage 100
# Output: (integer) 102

# Decrement
DECR page:views:homepage
# Output: (integer) 101

DECRBY page:views:homepage 50
# Output: (integer) 51
```

> **Why is INCR useful?** Because `INCR` is **atomic**. Even if 1,000 concurrent clients call `INCR` at the same time, each increment is applied correctly. No race conditions.

---

### Real-World Examples

**Example 1: Page Visit Counter**
```bash
# Every time a user visits the homepage
INCR visits:homepage

# Get total visit count
GET visits:homepage
```

**Example 2: User Session Storage**
```bash
# Store session token with 30-minute expiry
SET session:user:42 "eyJhbGciOiJIUzI1NiJ9..." EX 1800

# Validate session
GET session:user:42
# Returns token if valid, nil if expired
```

**Example 3: Rate Limiting**
```bash
# Track API calls per minute per user
SET ratelimit:user:42 0 EX 60
INCR ratelimit:user:42

# If value > 100, reject the request
GET ratelimit:user:42
```

---

### Advantages of Redis Strings

- Simple and fast
- Atomic counter operations
- Supports TTL natively
- Binary-safe (can store any data)

### Limitations

- Maximum value size is 512 MB
- Not suitable for structured or relational data

---

## 7. Redis Lists

### What is a Redis List?

A Redis List is an **ordered collection of strings**. You can add elements to the **left** (head) or **right** (tail) of the list. It is essentially a **doubly linked list** internally.

> **Analogy:** A ticket queue at a counter. New people join at the back (right), and the counter serves from the front (left).

---

### Core Commands

```bash
# Push to the RIGHT end (tail) — queue-like
RPUSH tasks "send-email" "process-payment" "generate-report"

# Push to the LEFT end (head)
LPUSH tasks "urgent-task"

# List all items (0 = first, -1 = last/end)
LRANGE tasks 0 -1
# Output:
# 1) "urgent-task"
# 2) "send-email"
# 3) "process-payment"
# 4) "generate-report"

# Get length of list
LLEN tasks
# Output: (integer) 4

# Pop from the LEFT (dequeue)
LPOP tasks
# Output: "urgent-task"

# Pop from the RIGHT (stack pop)
RPOP tasks
# Output: "generate-report"

# Peek at specific index (0-based)
LINDEX tasks 0
# Output: "send-email"
```

---

### Queue vs Stack Implementation

| Pattern | Push | Pop | Use Case |
|---|---|---|---|
| **Queue (FIFO)** | `RPUSH` | `LPOP` | Task queue, job processing |
| **Stack (LIFO)** | `LPUSH` | `LPOP` | Browser history, undo operations |

---

### Real-World Examples

**Example 1: Notification Queue**
```bash
# Producer: add notifications
RPUSH notifications:user:42 "You have a new message"
RPUSH notifications:user:42 "Your order has shipped"

# Consumer: process notifications one by one
LPOP notifications:user:42
# Output: "You have a new message"
```

**Example 2: Recent Activity Feed**
```bash
# Add recent actions (trim to last 10 items)
LPUSH feed:user:42 "Liked post #101"
LTRIM feed:user:42 0 9   # Keep only last 10

# Get activity feed
LRANGE feed:user:42 0 -1
```

**Example 3: Background Job Queue**
```bash
# Worker 1 adds a job
RPUSH job:queue '{"type":"email","to":"user@example.com"}'

# Worker 2 picks up the job (blocks if empty — BLPOP)
BLPOP job:queue 30
# Blocks for up to 30 seconds waiting for a new job
```

---

## 8. Redis Sets

### What is a Redis Set?

A Redis Set is an **unordered collection of unique strings**. Duplicates are automatically ignored.

> **Analogy:** A bag of tickets where each ticket has a unique number. You can add tickets, check if a ticket exists, or remove a ticket. No duplicates allowed.

---

### Core Commands

```bash
# Add members to a set
SADD tags:post:101 "redis" "database" "caching" "backend"

# Try adding a duplicate (ignored silently)
SADD tags:post:101 "redis"
# Output: (integer) 0  (nothing was added)

# Get all members (order not guaranteed)
SMEMBERS tags:post:101
# Output: {"redis", "database", "caching", "backend"}

# Check if a member exists
SISMEMBER tags:post:101 "redis"
# Output: (integer) 1 (yes)

SISMEMBER tags:post:101 "python"
# Output: (integer) 0 (no)

# Count members
SCARD tags:post:101
# Output: (integer) 4

# Remove a member
SREM tags:post:101 "caching"

# Pop a random member (removes it)
SPOP tags:post:101
```

---

### Set Operations

Redis sets support powerful mathematical operations:

```bash
SADD devs:teamA "Alice" "Bob" "Charlie"
SADD devs:teamB "Bob" "Diana" "Eve"

# INTERSECTION — members in BOTH sets
SINTER devs:teamA devs:teamB
# Output: {"Bob"}

# UNION — all members from both sets (no duplicates)
SUNION devs:teamA devs:teamB
# Output: {"Alice", "Bob", "Charlie", "Diana", "Eve"}

# DIFFERENCE — in A but NOT in B
SDIFF devs:teamA devs:teamB
# Output: {"Alice", "Charlie"}
```

---

### Real-World Examples

**Example 1: Unique Visitors Per Day**
```bash
# Track unique visitors by user ID
SADD visitors:2024-01-15 "user:101" "user:202" "user:303"
SADD visitors:2024-01-15 "user:101"   # Duplicate, ignored

# Count unique visitors
SCARD visitors:2024-01-15
# Output: (integer) 3
```

**Example 2: Online Users**
```bash
# User goes online
SADD online:users "user:42"

# User goes offline
SREM online:users "user:42"

# Who is online?
SMEMBERS online:users
```

---

## 9. Redis Sorted Sets

### What is a Sorted Set?

A Sorted Set is like a Set, but every member has an associated **numeric score**. Members are stored in **ascending order by score**, and duplicate members are not allowed (but duplicate scores are fine).

> **Analogy:** A competition scoreboard where each player has a unique name and a score. The board is always sorted from lowest to highest score.

---

### Core Commands

```bash
# ZADD <key> <score> <member>
ZADD leaderboard 1500 "Alice"
ZADD leaderboard 2800 "Bob"
ZADD leaderboard 2100 "Charlie"
ZADD leaderboard 950  "Diana"

# Get members sorted ascending (lowest score first)
ZRANGE leaderboard 0 -1
# Output: 1) "Diana" 2) "Alice" 3) "Charlie" 4) "Bob"

# Get with scores
ZRANGE leaderboard 0 -1 WITHSCORES
# Output: "Diana" 950, "Alice" 1500, "Charlie" 2100, "Bob" 2800

# Get top 3 (highest scores — descending)
ZREVRANGE leaderboard 0 2 WITHSCORES
# Output: "Bob" 2800, "Charlie" 2100, "Alice" 1500

# Get rank of a member (0-indexed, ascending)
ZRANK leaderboard "Alice"
# Output: (integer) 1

# Get rank from highest (descending)
ZREVRANK leaderboard "Bob"
# Output: (integer) 0  (Bob is #1)

# Get the score of a specific member
ZSCORE leaderboard "Charlie"
# Output: "2100"

# Update a score
ZADD leaderboard 3200 "Alice"

# Remove a member
ZREM leaderboard "Diana"

# Count members in a score range
ZCOUNT leaderboard 1000 3000
```

---

### Leaderboard Diagram

```svg
<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="500" height="320" rx="12" fill="#f8fafc"/>
  <text x="250" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Sorted Set — Leaderboard</text>

  <!-- Header -->
  <rect x="40" y="52" width="420" height="36" rx="6" fill="#1e293b"/>
  <text x="100" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">Rank</text>
  <text x="230" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">Player</text>
  <text x="390" y="75" text-anchor="middle" font-size="12" font-weight="bold" fill="#f8fafc">Score</text>

  <!-- Row 1 - Gold -->
  <rect x="40" y="92" width="420" height="44" rx="6" fill="#fef9c3" stroke="#fde68a" stroke-width="1"/>
  <text x="100" y="120" text-anchor="middle" font-size="20">🥇</text>
  <text x="230" y="120" text-anchor="middle" font-size="14" font-weight="bold" fill="#92400e">Bob</text>
  <rect x="340" y="103" width="100" height="22" rx="11" fill="#f59e0b"/>
  <text x="390" y="119" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">2,800</text>

  <!-- Row 2 - Silver -->
  <rect x="40" y="142" width="420" height="44" rx="6" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
  <text x="100" y="170" text-anchor="middle" font-size="20">🥈</text>
  <text x="230" y="170" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">Charlie</text>
  <rect x="340" y="153" width="100" height="22" rx="11" fill="#94a3b8"/>
  <text x="390" y="169" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">2,100</text>

  <!-- Row 3 - Bronze -->
  <rect x="40" y="192" width="420" height="44" rx="6" fill="#fff7ed" stroke="#fed7aa" stroke-width="1"/>
  <text x="100" y="220" text-anchor="middle" font-size="20">🥉</text>
  <text x="230" y="220" text-anchor="middle" font-size="14" font-weight="bold" fill="#374151">Alice</text>
  <rect x="340" y="203" width="100" height="22" rx="11" fill="#f97316"/>
  <text x="390" y="219" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">1,500</text>

  <!-- Row 4 -->
  <rect x="40" y="242" width="420" height="44" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="100" y="270" text-anchor="middle" font-size="14" fill="#64748b">#4</text>
  <text x="230" y="270" text-anchor="middle" font-size="14" fill="#374151">Diana</text>
  <rect x="340" y="253" width="100" height="22" rx="11" fill="#e2e8f0"/>
  <text x="390" y="269" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569">950</text>

  <text x="250" y="305" text-anchor="middle" font-size="11" fill="#94a3b8">Stored as ZADD leaderboard &lt;score&gt; &lt;member&gt;</text>
</svg>
```

---

### Real-World Examples

**Example: Gaming Leaderboard**
```bash
# Players complete a round
ZADD game:scores 4500 "player:alice"
ZADD game:scores 7200 "player:bob"
ZADD game:scores 6100 "player:charlie"

# Show top 10
ZREVRANGE game:scores 0 9 WITHSCORES

# Player's rank
ZREVRANK game:scores "player:alice"
```

**Example: Trending Topics (Time-based scoring)**
```bash
# Use timestamp as score
ZADD trending 1700000000 "redis"
ZADD trending 1700000100 "nodejs"

# Get most recently added (latest trending)
ZREVRANGE trending 0 4
```

---

## 10. Redis Hashes

### What is a Redis Hash?

A Redis Hash stores a mapping of **fields to values** within a single key. It is perfect for storing object-like data.

> **Analogy:** A Hash is like a row in a spreadsheet — the key is the row ID, and the fields are column names with their values.

---

### Core Commands

```bash
# Set multiple fields at once
HSET user:42 name "Prathamesh" age "26" city "Pune" role "engineer"

# Get a single field
HGET user:42 name
# Output: "Prathamesh"

# Get all fields and values
HGETALL user:42
# Output:
# 1) "name"
# 2) "Prathamesh"
# 3) "age"
# 4) "26"
# 5) "city"
# 6) "Pune"
# 7) "role"
# 8) "engineer"

# Get multiple fields at once
HMGET user:42 name city
# Output: 1) "Prathamesh" 2) "Pune"

# Get just field names
HKEYS user:42
# Output: name, age, city, role

# Get just values
HVALS user:42

# Check if a field exists
HEXISTS user:42 email
# Output: (integer) 0

# Delete a field
HDEL user:42 age

# Increment a numeric field
HSET product:10 stock 100
HINCRBY product:10 stock -5
# Output: (integer) 95
```

---

### Real-World Examples

**Example 1: User Profile**
```bash
HSET user:profile:101 \
  username "john_doe" \
  email "john@example.com" \
  plan "pro" \
  login_count 0

# Update login count on each login
HINCRBY user:profile:101 login_count 1
```

**Example 2: Product Catalog**
```bash
HSET product:SKU-9001 \
  name "Mechanical Keyboard" \
  price "4500" \
  stock "50" \
  category "electronics"

# Update stock after sale
HINCRBY product:SKU-9001 stock -1
```

---

### Hash vs Storing JSON as a String

| Approach | Pros | Cons |
|---|---|---|
| **Hash** (`HSET`) | Update individual fields without reading all data | More commands to manage |
| **JSON String** (`SET`) | Single command to store/retrieve | Must deserialize entire object to update one field |

> **Best practice:** Use Hashes when you need to update individual fields frequently. Use JSON strings when you always read/write the entire object.

---

## 11. Key Expiration & TTL

### What is TTL?

**TTL (Time To Live)** defines how long a key exists in Redis before it is automatically deleted. This is one of Redis's most powerful features for cache management.

> **Analogy:** TTL is like a best-before date on food. Once expired, Redis automatically throws it away — you don't have to clean it up manually.

---

### Core Commands

```bash
# Set a key with TTL in SECONDS
SET otp:user:42 "895621" EX 300      # Expires in 5 minutes

# Set a key with TTL in MILLISECONDS
SET temp:token "abc123" PX 10000     # Expires in 10 seconds

# Check remaining TTL (in seconds)
TTL otp:user:42
# Output: (integer) 287  (287 seconds remaining)
# Output: -1  (key exists, no expiry set)
# Output: -2  (key does not exist)

# Check remaining TTL in milliseconds
PTTL otp:user:42

# Add expiry to an existing key
SET api:response:home '{"data": [...]}'
EXPIRE api:response:home 60         # Expire in 60 seconds

# Make a key permanent (remove expiry)
PERSIST api:response:home

# Set with exact Unix timestamp expiry
EXPIREAT notification:123 1800000000
```

---

### Real-World Examples

**Example 1: OTP (One-Time Password)**
```bash
# Store OTP valid for 10 minutes
SET otp:user:42 "293847" EX 600

# Verify OTP
GET otp:user:42
# Returns nil if expired, value if valid

# After verification, delete immediately
DEL otp:user:42
```

**Example 2: API Response Caching**
```bash
# Cache API response for 5 minutes
SET cache:api:products '{"items": [...]}' EX 300

# Check how fresh the cache is
TTL cache:api:products
```

**Example 3: Session Management**
```bash
# Create session with 24-hour expiry
SET session:abc123 '{"userId": 42, "role": "admin"}' EX 86400

# Refresh session on user activity (extend TTL)
EXPIRE session:abc123 86400
```

---

> **Warning:** Always set TTL on cache keys. Keys without TTL will accumulate in memory indefinitely and eventually cause Redis to run out of RAM.

---

## 12. Redis Persistence

### Why Persistence Matters

Redis stores data in RAM, which is volatile — a server restart means all data is gone. Redis provides two persistence mechanisms to save data to disk.

---

### RDB (Redis Database) Snapshots

RDB creates a **point-in-time snapshot** of the entire dataset and saves it to a binary file (`dump.rdb`).

**How it works:**
1. At configured intervals, Redis forks a child process
2. The child writes the entire dataset to a temporary file
3. The temporary file replaces the old `dump.rdb`

**Configure in redis.conf:**
```
save 900 1     # Save if 1 key changed in 900 seconds
save 300 10    # Save if 10 keys changed in 300 seconds
save 60 10000  # Save if 10000 keys changed in 60 seconds
```

**Manual snapshot:**
```bash
# Synchronous — blocks Redis until done (avoid in production)
SAVE

# Asynchronous — Redis continues serving clients
BGSAVE
```

---

### AOF (Append Only File) Logs

AOF logs **every write command** to a file (`appendonly.aof`). On restart, Redis replays all commands to rebuild the dataset.

**Configure in redis.conf:**
```
appendonly yes
appendfilename "appendonly.aof"

# How often to sync to disk:
# always   — every command (safest, slowest)
# everysec — every second (good balance)
# no       — let OS decide (fastest, least safe)
appendfsync everysec
```

---

### RDB vs AOF Comparison

| Feature | RDB | AOF |
|---|---|---|
| **Data safety** | May lose up to minutes of data | Can lose at most 1 second of data |
| **File size** | Compact binary file | Larger (all commands logged) |
| **Performance impact** | Low (periodic fork) | Slightly higher (every write) |
| **Recovery speed** | Fast | Slower (replay all commands) |
| **Use case** | Backups, disaster recovery | High durability requirements |

> **Best practice:** Use **both** RDB and AOF together. RDB for fast recovery, AOF for minimal data loss.

---

### Persistence Flow Diagram

```svg
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="720" height="360" rx="12" fill="#f8fafc"/>
  <text x="360" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Persistence — RDB vs AOF</text>

  <!-- Redis in Memory -->
  <rect x="270" y="60" width="180" height="60" rx="8" fill="#1e293b"/>
  <text x="360" y="87" text-anchor="middle" font-size="13" font-weight="bold" fill="#f8fafc">Redis Server</text>
  <text x="360" y="107" text-anchor="middle" font-size="11" fill="#94a3b8">In-Memory Data</text>

  <!-- RDB Box -->
  <rect x="60" y="180" width="220" height="120" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="170" y="208" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">RDB Snapshot</text>
  <text x="170" y="228" text-anchor="middle" font-size="10" fill="#1e40af">Fork child process</text>
  <text x="170" y="244" text-anchor="middle" font-size="10" fill="#1e40af">Write full dataset to disk</text>
  <text x="170" y="260" text-anchor="middle" font-size="10" fill="#1e40af">Saves: dump.rdb</text>
  <text x="170" y="280" text-anchor="middle" font-size="10" fill="#1e40af">Triggered: time-based or BGSAVE</text>

  <!-- AOF Box -->
  <rect x="440" y="180" width="220" height="120" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="550" y="208" text-anchor="middle" font-size="13" font-weight="bold" fill="#065f46">AOF Log</text>
  <text x="550" y="228" text-anchor="middle" font-size="10" fill="#14532d">Append every write command</text>
  <text x="550" y="244" text-anchor="middle" font-size="10" fill="#14532d">Saves: appendonly.aof</text>
  <text x="550" y="260" text-anchor="middle" font-size="10" fill="#14532d">Sync: always / everysec / no</text>
  <text x="550" y="280" text-anchor="middle" font-size="10" fill="#14532d">Replayed on restart</text>

  <!-- Arrows from Redis to RDB -->
  <line x1="310" y1="110" x2="200" y2="178" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue2)"/>
  <text x="230" y="152" font-size="10" fill="#3b82f6">Periodic fork</text>

  <!-- Arrows from Redis to AOF -->
  <line x1="410" y1="110" x2="520" y2="178" stroke="#10b981" stroke-width="2" marker-end="url(#arrowGreen4)"/>
  <text x="468" y="152" font-size="10" fill="#10b981">Every write</text>

  <!-- Disk icons -->
  <rect x="100" y="318" width="140" height="28" rx="6" fill="#3b82f6"/>
  <text x="170" y="337" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">💾 dump.rdb</text>
  <rect x="480" y="318" width="140" height="28" rx="6" fill="#10b981"/>
  <text x="550" y="337" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">📄 appendonly.aof</text>

  <line x1="170" y1="300" x2="170" y2="316" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue2)"/>
  <line x1="550" y1="300" x2="550" y2="316" stroke="#10b981" stroke-width="2" marker-end="url(#arrowGreen4)"/>

  <defs>
    <marker id="arrowBlue2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6"/>
    </marker>
    <marker id="arrowGreen4" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#10b981"/>
    </marker>
  </defs>
</svg>
```

---

## 13. Redis Pub/Sub

### What is Pub/Sub?

Pub/Sub (Publish/Subscribe) is a **real-time messaging pattern** where:
- **Publishers** send messages to a **channel**
- **Subscribers** listen to channels and receive messages instantly

Publishers and subscribers are completely decoupled — they do not know about each other.

> **Analogy:** Think of a radio station. The station (publisher) broadcasts on FM 98.5 (channel). Anyone tuning into that frequency (subscriber) receives the broadcast in real time.

---

### Core Commands

**Terminal 1 — Subscriber:**
```bash
# Subscribe to a channel
SUBSCRIBE notifications

# Subscribe to multiple channels
SUBSCRIBE notifications alerts updates

# Subscribe using pattern matching
PSUBSCRIBE news:*      # matches: news:tech, news:sports, etc.
```

**Terminal 2 — Publisher:**
```bash
# Publish a message to a channel
PUBLISH notifications "New order received: #1042"

# Publisher sees how many subscribers received it
# Output: (integer) 1
```

**Subscriber Terminal output:**
```
1) "message"
2) "notifications"
3) "New order received: #1042"
```

---

### Pub/Sub Communication Diagram

```svg
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="680" height="340" rx="12" fill="#f8fafc"/>
  <text x="340" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Pub/Sub — Message Flow</text>

  <!-- Publishers -->
  <rect x="20" y="70" width="130" height="50" rx="8" fill="#f97316"/>
  <text x="85" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Publisher</text>
  <text x="85" y="110" text-anchor="middle" font-size="10" fill="#ffedd5">Order Service</text>

  <rect x="20" y="145" width="130" height="50" rx="8" fill="#f97316"/>
  <text x="85" y="167" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Publisher</text>
  <text x="85" y="185" text-anchor="middle" font-size="10" fill="#ffedd5">User Service</text>

  <!-- Redis Channel -->
  <rect x="240" y="80" width="200" height="140" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="340" y="110" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">Redis Channel</text>
  <text x="340" y="132" text-anchor="middle" font-size="11" fill="#92400e">"notifications"</text>
  <text x="340" y="160" text-anchor="middle" font-size="10" fill="#78350f">Message queue</text>
  <text x="340" y="178" text-anchor="middle" font-size="10" fill="#78350f">fan-out delivery</text>
  <text x="340" y="196" text-anchor="middle" font-size="10" fill="#78350f">real-time broadcast</text>

  <!-- Subscribers -->
  <rect x="530" y="60" width="130" height="50" rx="8" fill="#6366f1"/>
  <text x="595" y="82" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Subscriber</text>
  <text x="595" y="100" text-anchor="middle" font-size="10" fill="#e0e7ff">Email Service</text>

  <rect x="530" y="130" width="130" height="50" rx="8" fill="#6366f1"/>
  <text x="595" y="152" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Subscriber</text>
  <text x="595" y="170" text-anchor="middle" font-size="10" fill="#e0e7ff">Push Notification</text>

  <rect x="530" y="200" width="130" height="50" rx="8" fill="#6366f1"/>
  <text x="595" y="222" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">Subscriber</text>
  <text x="595" y="240" text-anchor="middle" font-size="10" fill="#e0e7ff">Analytics Service</text>

  <!-- Arrows: Publishers → Channel -->
  <line x1="150" y1="95" x2="238" y2="130" stroke="#f97316" stroke-width="2" marker-end="url(#arrowO2)"/>
  <text x="184" y="107" font-size="10" fill="#f97316">PUBLISH</text>
  <line x1="150" y1="170" x2="238" y2="165" stroke="#f97316" stroke-width="2" marker-end="url(#arrowO2)"/>
  <text x="184" y="162" font-size="10" fill="#f97316">PUBLISH</text>

  <!-- Arrows: Channel → Subscribers -->
  <line x1="440" y1="130" x2="528" y2="85" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowI)"/>
  <line x1="440" y1="150" x2="528" y2="155" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowI)"/>
  <line x1="440" y1="170" x2="528" y2="215" stroke="#6366f1" stroke-width="2" marker-end="url(#arrowI)"/>
  <text x="488" y="120" font-size="10" fill="#6366f1">fan-out</text>

  <!-- Note -->
  <rect x="20" y="280" width="640" height="44" rx="8" fill="#f1f5f9" stroke="#e2e8f0"/>
  <text x="340" y="304" text-anchor="middle" font-size="12" fill="#475569">⚠️  Pub/Sub is fire-and-forget — if a subscriber is offline, it misses the message. Use Redis Streams for durability.</text>

  <defs>
    <marker id="arrowO2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#f97316"/>
    </marker>
    <marker id="arrowI" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#6366f1"/>
    </marker>
  </defs>
</svg>
```

---

### Real-World Examples

**Chat Application:**
```bash
# User joins room channel
SUBSCRIBE chat:room:general

# User sends a message
PUBLISH chat:room:general '{"user":"Alice","msg":"Hello everyone!"}'
```

**Live Notifications:**
```bash
# Notification service publishes
PUBLISH user:notifications:42 '{"type":"order","message":"Your order shipped!"}'

# Frontend WebSocket server subscribed to this channel pushes to browser
```

---

## 14. Redis Transactions

### What is a Redis Transaction?

A Redis transaction ensures a **group of commands executes atomically** — either all commands run, or none do (in case of a DISCARD). No other client can interrupt the sequence.

---

### MULTI / EXEC / DISCARD

```bash
# Begin transaction
MULTI

# Queue commands (they don't execute yet)
SET balance:alice 500
SET balance:bob 300
DECRBY balance:alice 100
INCRBY balance:bob 100

# Execute all queued commands atomically
EXEC
# Output:
# 1) OK
# 2) OK
# 3) (integer) 400
# 4) (integer) 400

# To cancel a transaction before EXEC
MULTI
SET key "value"
DISCARD   # All queued commands are thrown away
```

---

### WATCH — Optimistic Locking

`WATCH` monitors keys for changes. If a watched key is modified by another client before `EXEC`, the transaction is aborted (returns nil).

```bash
# Watch the balance key
WATCH balance:alice

# Begin transaction
MULTI

# Queue operations
DECRBY balance:alice 200

# EXEC will fail (return nil) if balance:alice was changed by another client
EXEC
# If successful: returns array of results
# If watched key changed: returns nil → retry the transaction
```

---

### Important Notes

> **Note:** Redis transactions are NOT like database transactions. They do not support rollbacks on runtime errors. If one command fails during EXEC (e.g., wrong type), other commands still run.

| Concept | Redis Transactions | SQL Transactions |
|---|---|---|
| Atomicity | Commands execute as a group | Full ACID atomicity |
| Rollback on error | No | Yes |
| Isolation | No other client interrupts | Yes |
| Durability | Depends on persistence config | Yes |

---

## 15. Redis Caching Patterns

### Why Caching Patterns Matter

There are several strategies for keeping the cache and database in sync. Choosing the right one depends on your read/write ratio and consistency requirements.

---

### Pattern 1: Cache-Aside (Lazy Loading)

The most common pattern. The application controls when to load data into cache.

**Flow:**
1. Application checks Redis for the data
2. **Cache HIT** → return data from Redis
3. **Cache MISS** → query database, store result in Redis, return result

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`;
  
  // Step 1: Check cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);  // Cache HIT
  
  // Step 2: Cache MISS — query database
  const product = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
  
  // Step 3: Store in cache for 10 minutes
  await redis.setex(cacheKey, 600, JSON.stringify(product));
  
  return product;
}
```

**Pros:** Only caches data that is actually requested. Cache stays lean.  
**Cons:** First request is always slow (cache miss).

---

### Pattern 2: Write-Through Cache

Every database write also writes to Redis. Cache is always up to date.

```javascript
async function updateProduct(productId, data) {
  // Step 1: Write to database
  await db.query('UPDATE products SET ... WHERE id = ?', [productId]);
  
  // Step 2: Update Redis immediately
  await redis.setex(`product:${productId}`, 600, JSON.stringify(data));
}
```

**Pros:** Cache is always fresh. No stale data.  
**Cons:** Every write is slower (two writes). Cache may hold data that is never read.

---

### Pattern 3: Write-Back (Write-Behind) Cache

Write to Redis first, then asynchronously write to the database later.

```javascript
// Write only to Redis
await redis.set(`product:${productId}`, JSON.stringify(data));

// Background worker periodically flushes Redis → Database
setInterval(async () => {
  const dirtyKeys = await redis.smembers('dirty:products');
  for (const key of dirtyKeys) {
    const data = await redis.get(key);
    await db.query('UPDATE products SET ...');
    await redis.srem('dirty:products', key);
  }
}, 5000);
```

**Pros:** Extremely fast writes.  
**Cons:** Risk of data loss if Redis crashes before flush. Complex to implement.

---

### Cache Patterns Diagram

```svg
<svg viewBox="0 0 700 460" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="700" height="460" rx="12" fill="#f8fafc"/>
  <text x="350" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Cache Patterns Comparison</text>

  <!-- CACHE ASIDE -->
  <rect x="20" y="50" width="200" height="170" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
  <text x="120" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">Cache-Aside</text>
  <text x="120" y="96" text-anchor="middle" font-size="10" fill="#334155">1. App → Redis?</text>
  <text x="120" y="114" text-anchor="middle" font-size="10" fill="#15803d">2. HIT → return</text>
  <text x="120" y="132" text-anchor="middle" font-size="10" fill="#dc2626">3. MISS → DB query</text>
  <text x="120" y="150" text-anchor="middle" font-size="10" fill="#334155">4. Store in Redis</text>
  <text x="120" y="168" text-anchor="middle" font-size="10" fill="#334155">5. Return result</text>
  <rect x="30" y="180" width="180" height="30" rx="5" fill="#dbeafe"/>
  <text x="120" y="199" text-anchor="middle" font-size="10" fill="#1e40af">✓ Lean cache   ✗ First-miss slow</text>

  <!-- WRITE THROUGH -->
  <rect x="250" y="50" width="200" height="170" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
  <text x="350" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#065f46">Write-Through</text>
  <text x="350" y="96" text-anchor="middle" font-size="10" fill="#334155">1. Write → Database</text>
  <text x="350" y="114" text-anchor="middle" font-size="10" fill="#334155">2. Write → Redis</text>
  <text x="350" y="132" text-anchor="middle" font-size="10" fill="#334155">3. Both always in sync</text>
  <text x="350" y="150" text-anchor="middle" font-size="10" fill="#334155">4. Read → Redis (fast)</text>
  <rect x="260" y="180" width="180" height="30" rx="5" fill="#dcfce7"/>
  <text x="350" y="199" text-anchor="middle" font-size="10" fill="#14532d">✓ Fresh data   ✗ Slower writes</text>

  <!-- WRITE BACK -->
  <rect x="480" y="50" width="200" height="170" rx="8" fill="#faf5ff" stroke="#8b5cf6" stroke-width="2"/>
  <text x="580" y="76" text-anchor="middle" font-size="12" font-weight="bold" fill="#5b21b6">Write-Back</text>
  <text x="580" y="96" text-anchor="middle" font-size="10" fill="#334155">1. Write → Redis only</text>
  <text x="580" y="114" text-anchor="middle" font-size="10" fill="#334155">2. Return immediately</text>
  <text x="580" y="132" text-anchor="middle" font-size="10" fill="#334155">3. Background flush</text>
  <text x="580" y="150" text-anchor="middle" font-size="10" fill="#334155">   → Database</text>
  <rect x="490" y="180" width="180" height="30" rx="5" fill="#ede9fe"/>
  <text x="580" y="199" text-anchor="middle" font-size="10" fill="#4c1d95">✓ Fastest writes   ✗ Data loss risk</text>

  <!-- Cache Invalidation section -->
  <rect x="20" y="250" width="660" height="185" rx="8" fill="#fff7ed" stroke="#f97316" stroke-width="2"/>
  <text x="350" y="278" text-anchor="middle" font-size="14" font-weight="bold" fill="#9a3412">Cache Invalidation Strategies</text>

  <!-- TTL-based -->
  <rect x="40" y="292" width="185" height="124" rx="6" fill="#fff" stroke="#fed7aa" stroke-width="1"/>
  <text x="132" y="316" text-anchor="middle" font-size="12" font-weight="bold" fill="#c2410c">TTL-based</text>
  <text x="132" y="336" text-anchor="middle" font-size="10" fill="#374151">Cache expires</text>
  <text x="132" y="352" text-anchor="middle" font-size="10" fill="#374151">automatically</text>
  <text x="132" y="372" text-anchor="middle" font-size="10" fill="#374151">Best for: read-heavy</text>
  <text x="132" y="392" text-anchor="middle" font-size="10" fill="#374151">data, low consistency</text>
  <text x="132" y="406" text-anchor="middle" font-size="10" fill="#374151">requirements</text>

  <!-- Event-based -->
  <rect x="258" y="292" width="185" height="124" rx="6" fill="#fff" stroke="#fed7aa" stroke-width="1"/>
  <text x="350" y="316" text-anchor="middle" font-size="12" font-weight="bold" fill="#c2410c">Event-based</text>
  <text x="350" y="336" text-anchor="middle" font-size="10" fill="#374151">Delete/update cache</text>
  <text x="350" y="352" text-anchor="middle" font-size="10" fill="#374151">when data changes</text>
  <text x="350" y="372" text-anchor="middle" font-size="10" fill="#374151">Best for: write-heavy</text>
  <text x="350" y="392" text-anchor="middle" font-size="10" fill="#374151">data, high consistency</text>
  <text x="350" y="406" text-anchor="middle" font-size="10" fill="#374151">requirements</text>

  <!-- Versioned keys -->
  <rect x="476" y="292" width="185" height="124" rx="6" fill="#fff" stroke="#fed7aa" stroke-width="1"/>
  <text x="568" y="316" text-anchor="middle" font-size="12" font-weight="bold" fill="#c2410c">Versioned Keys</text>
  <text x="568" y="336" text-anchor="middle" font-size="10" fill="#374151">product:42:v3</text>
  <text x="568" y="352" text-anchor="middle" font-size="10" fill="#374155">Old version ignored</text>
  <text x="568" y="372" text-anchor="middle" font-size="10" fill="#374151">Best for: immutable</text>
  <text x="568" y="392" text-anchor="middle" font-size="10" fill="#374151">data, content</text>
  <text x="568" y="406" text-anchor="middle" font-size="10" fill="#374151">delivery networks</text>
</svg>
```

---

## 16. Redis with Node.js

### Installation

```bash
# Initialize a new Node.js project
mkdir redis-demo && cd redis-demo
npm init -y

# Install Redis client (ioredis — most popular)
npm install ioredis

# Install Express for API examples
npm install express
```

---

### Connecting to Redis

```javascript
// redis.js
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  // password: 'your_password',  // if auth is enabled
  // db: 0,                      // database index (0-15)
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

module.exports = redis;
```

---

### Basic CRUD Operations

```javascript
const redis = require('./redis');

async function examples() {
  // SET
  await redis.set('username', 'prathamesh');
  
  // SET with TTL (seconds)
  await redis.setex('session:xyz', 3600, 'user:42');
  
  // GET
  const name = await redis.get('username');
  console.log(name); // "prathamesh"
  
  // DELETE
  await redis.del('username');
  
  // INCR
  await redis.set('visits', 0);
  await redis.incr('visits');
  
  // Hash operations
  await redis.hset('user:42', 'name', 'Prathamesh', 'city', 'Pune');
  const user = await redis.hgetall('user:42');
  console.log(user); // { name: 'Prathamesh', city: 'Pune' }
  
  // List operations
  await redis.rpush('tasks', 'task1', 'task2', 'task3');
  const task = await redis.lpop('tasks');
  console.log(task); // "task1"
  
  // Check TTL
  const ttl = await redis.ttl('session:xyz');
  console.log(ttl); // remaining seconds
}

examples();
```

---

### Caching API Responses with Express

```javascript
// server.js
const express = require('express');
const redis = require('./redis');
const axios = require('axios');

const app = express();
const CACHE_TTL = 300; // 5 minutes

// Middleware: Check cache before hitting the API
async function cacheMiddleware(req, res, next) {
  const cacheKey = `cache:${req.originalUrl}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return res.json({
        source: 'cache',
        data: JSON.parse(cached)
      });
    }
    
    // Store cache key on request for use in route
    req.cacheKey = cacheKey;
    next();
  } catch (err) {
    // If Redis fails, don't break the app — proceed to route
    console.error('Redis error, skipping cache:', err.message);
    next();
  }
}

// Route: Fetch products with caching
app.get('/api/products', cacheMiddleware, async (req, res) => {
  try {
    // Simulate a slow database call
    const products = await fetchProductsFromDB();
    
    // Store in Redis cache
    if (req.cacheKey) {
      await redis.setex(req.cacheKey, CACHE_TTL, JSON.stringify(products));
      console.log(`📦 Cache SET: ${req.cacheKey}`);
    }
    
    res.json({ source: 'database', data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get user profile with Hash
app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const cacheKey = `user:${userId}`;
  
  // Try Redis first
  const cached = await redis.hgetall(cacheKey);
  if (cached && Object.keys(cached).length > 0) {
    return res.json({ source: 'cache', user: cached });
  }
  
  // Fallback to DB
  const user = await fetchUserFromDB(userId);
  await redis.hset(cacheKey, user);
  await redis.expire(cacheKey, 600);
  
  res.json({ source: 'database', user });
});

// Route: Rate limiting
app.get('/api/limited', async (req, res) => {
  const ip = req.ip;
  const key = `ratelimit:${ip}`;
  
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 60); // Reset every minute
  }
  
  if (current > 10) {
    return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
  }
  
  res.json({ message: 'Request successful', count: current });
});

async function fetchProductsFromDB() {
  // Simulate DB delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Mouse' }];
}

async function fetchUserFromDB(id) {
  return { id, name: 'Prathamesh', city: 'Pune', role: 'engineer' };
}

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
```

---

### Session Management with Express

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('./redis');

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,    // true in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24  // 24 hours
  }
}));

app.post('/login', (req, res) => {
  req.session.userId = 42;
  req.session.role = 'admin';
  res.json({ message: 'Logged in' });
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ userId: req.session.userId });
});
```

---

## 17. Redis with Docker

### Running Redis in Docker

```bash
# Pull official Redis image and run
docker run --name my-redis \
  -p 6379:6379 \
  -d redis:latest

# Verify it is running
docker ps

# Access Redis CLI inside the container
docker exec -it my-redis redis-cli

# Test
127.0.0.1:6379> PING
PONG
```

---

### Redis with Persistence Volume

```bash
# Run Redis with a volume for data persistence
docker run --name my-redis \
  -p 6379:6379 \
  -v /my/local/path:/data \
  -d redis redis-server --appendonly yes
```

---

### Docker Compose (Redis + Node.js App)

```yaml
# docker-compose.yml
version: '3.9'

services:
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    container_name: node-app
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      redis:
        condition: service_healthy

volumes:
  redis_data:
```

```bash
# Start the stack
docker compose up -d

# View Redis logs
docker logs redis -f

# Stop everything
docker compose down
```

---

### Redis with Custom Configuration

```bash
# redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
appendonly yes
requirepass your_strong_password
```

```bash
# Run with custom config
docker run --name my-redis \
  -p 6379:6379 \
  -v /path/to/redis.conf:/usr/local/etc/redis/redis.conf \
  -d redis redis-server /usr/local/etc/redis/redis.conf
```

---

## 18. Common Redis Commands Cheat Sheet

### String Commands

| Command | Syntax | Description |
|---|---|---|
| `SET` | `SET key value [EX seconds]` | Set a key |
| `GET` | `GET key` | Get a value |
| `MSET` | `MSET k1 v1 k2 v2` | Set multiple keys |
| `MGET` | `MGET k1 k2` | Get multiple values |
| `DEL` | `DEL key` | Delete a key |
| `EXISTS` | `EXISTS key` | Check if key exists (1/0) |
| `APPEND` | `APPEND key value` | Append to string |
| `INCR` | `INCR key` | Increment by 1 |
| `INCRBY` | `INCRBY key amount` | Increment by N |
| `DECR` | `DECR key` | Decrement by 1 |

---

### List Commands

| Command | Syntax | Description |
|---|---|---|
| `LPUSH` | `LPUSH key val [val ...]` | Push to left |
| `RPUSH` | `RPUSH key val [val ...]` | Push to right |
| `LPOP` | `LPOP key` | Pop from left |
| `RPOP` | `RPOP key` | Pop from right |
| `LRANGE` | `LRANGE key 0 -1` | Get all elements |
| `LLEN` | `LLEN key` | Get list length |
| `LINDEX` | `LINDEX key index` | Get element at index |
| `LTRIM` | `LTRIM key start stop` | Keep only a range |
| `BLPOP` | `BLPOP key timeout` | Blocking pop from left |

---

### Set Commands

| Command | Syntax | Description |
|---|---|---|
| `SADD` | `SADD key member [...]` | Add members |
| `SREM` | `SREM key member` | Remove a member |
| `SMEMBERS` | `SMEMBERS key` | Get all members |
| `SISMEMBER` | `SISMEMBER key member` | Check membership |
| `SCARD` | `SCARD key` | Count members |
| `SINTER` | `SINTER key1 key2` | Intersection |
| `SUNION` | `SUNION key1 key2` | Union |
| `SDIFF` | `SDIFF key1 key2` | Difference |

---

### Sorted Set Commands

| Command | Syntax | Description |
|---|---|---|
| `ZADD` | `ZADD key score member` | Add with score |
| `ZRANGE` | `ZRANGE key 0 -1 WITHSCORES` | Get ascending |
| `ZREVRANGE` | `ZREVRANGE key 0 -1` | Get descending |
| `ZRANK` | `ZRANK key member` | Get rank (ascending) |
| `ZREVRANK` | `ZREVRANK key member` | Get rank (descending) |
| `ZSCORE` | `ZSCORE key member` | Get member's score |
| `ZREM` | `ZREM key member` | Remove a member |
| `ZCOUNT` | `ZCOUNT key min max` | Count in score range |

---

### Hash Commands

| Command | Syntax | Description |
|---|---|---|
| `HSET` | `HSET key field value` | Set field |
| `HGET` | `HGET key field` | Get field |
| `HGETALL` | `HGETALL key` | Get all fields & values |
| `HMGET` | `HMGET key f1 f2` | Get multiple fields |
| `HDEL` | `HDEL key field` | Delete a field |
| `HEXISTS` | `HEXISTS key field` | Check if field exists |
| `HKEYS` | `HKEYS key` | Get all field names |
| `HVALS` | `HVALS key` | Get all values |
| `HINCRBY` | `HINCRBY key field N` | Increment field by N |

---

### Key & TTL Commands

| Command | Syntax | Description |
|---|---|---|
| `EXPIRE` | `EXPIRE key seconds` | Set TTL in seconds |
| `TTL` | `TTL key` | Get remaining TTL |
| `PTTL` | `PTTL key` | Get TTL in milliseconds |
| `PERSIST` | `PERSIST key` | Remove TTL |
| `KEYS` | `KEYS pattern` | Find matching keys (⚠️ avoid in prod) |
| `SCAN` | `SCAN cursor MATCH pattern COUNT N` | Safely iterate keys |
| `TYPE` | `TYPE key` | Get data type of key |
| `RENAME` | `RENAME key newkey` | Rename a key |
| `RANDOMKEY` | `RANDOMKEY` | Get a random key |

---

### Server Commands

| Command | Syntax | Description |
|---|---|---|
| `PING` | `PING` | Test connection |
| `INFO` | `INFO` | Server statistics |
| `DBSIZE` | `DBSIZE` | Number of keys |
| `FLUSHDB` | `FLUSHDB` | Delete all keys in current DB |
| `FLUSHALL` | `FLUSHALL` | Delete all keys in all DBs |
| `SAVE` | `SAVE` | Synchronous snapshot |
| `BGSAVE` | `BGSAVE` | Asynchronous snapshot |
| `CONFIG GET` | `CONFIG GET maxmemory` | Get config value |
| `CONFIG SET` | `CONFIG SET maxmemory 256mb` | Set config value |
| `MONITOR` | `MONITOR` | Real-time command log |

---

## 19. Common Beginner Mistakes

### Mistake 1: No Expiration on Cache Keys

```bash
# ❌ BAD — key lives forever
SET cache:products '{"items": [...]}'

# ✅ GOOD — expires in 5 minutes
SET cache:products '{"items": [...]}' EX 300
```

**Why it matters:** Without TTL, cache entries pile up indefinitely. Redis will eventually hit its memory limit and start evicting random keys or refusing writes.

---

### Mistake 2: Using KEYS * in Production

```bash
# ❌ NEVER do this in production
KEYS *          # Scans ALL keys — blocks Redis!
KEYS user:*

# ✅ Use SCAN instead (non-blocking, cursor-based)
SCAN 0 MATCH user:* COUNT 100
```

**Why it matters:** `KEYS` is O(n) and blocks all other commands while running. On a database with millions of keys, this can freeze Redis for seconds.

---

### Mistake 3: Storing Huge Values

```bash
# ❌ BAD — storing entire catalog as one key
SET catalog:all '{...10MB of data...}'

# ✅ GOOD — store individual items
HSET product:1001 name "Laptop" price "45000"
HSET product:1002 name "Mouse" price "1500"
```

**Why it matters:** Large values slow down serialization, network transfer, and consume more memory per key.

---

### Mistake 4: Bad Key Naming

```bash
# ❌ BAD — unclear, may conflict
SET u42 "Prathamesh"
SET p9001 "Laptop"
SET x "temp"

# ✅ GOOD — structured, readable
SET user:42:name "Prathamesh"
SET product:9001:name "Laptop"
SET cache:homepage:v2 "..."
```

---

### Mistake 5: Not Handling Cache Errors Gracefully

```javascript
// ❌ BAD — crashes the app if Redis is down
const data = JSON.parse(await redis.get('cache:key'));
return res.json(data);

// ✅ GOOD — fallback to database if Redis fails
try {
  const cached = await redis.get('cache:key');
  if (cached) return res.json(JSON.parse(cached));
} catch (err) {
  console.warn('Redis unavailable, using DB fallback:', err.message);
}
const data = await db.query('...');
return res.json(data);
```

---

### Mistake 6: Using Redis as a Primary Database

Redis is not designed to replace your primary relational or document database. It is a complementary tool for:
- Caching
- Session management
- Rate limiting
- Real-time data

Always keep your primary data in a durable database (MySQL, PostgreSQL, MongoDB).

---

### Mistake 7: Not Setting maxmemory

Without a memory limit, Redis will consume all available RAM and potentially crash your server.

```bash
# In redis.conf
maxmemory 512mb
maxmemory-policy allkeys-lru

# Or via CLI
CONFIG SET maxmemory 512mb
CONFIG SET maxmemory-policy allkeys-lru
```

**Eviction policies:**

| Policy | Behavior |
|---|---|
| `noeviction` | Return error when memory full |
| `allkeys-lru` | Evict least recently used keys |
| `volatile-lru` | Evict LRU keys with TTL only |
| `allkeys-random` | Evict random keys |
| `volatile-ttl` | Evict keys with shortest TTL |

---

## 20. Redis Best Practices

### 1. Key Naming Conventions

Use a consistent hierarchy separated by colons (`:`):

```
{app}:{resource}:{id}:{attribute}

Examples:
  myapp:user:42:session
  myapp:product:SKU-9001:cache
  myapp:ratelimit:user:42:2024-01-15
  myapp:leaderboard:game:season3
```

**Rules:**
- Use lowercase
- Use colons as separators
- Be descriptive but concise
- Include version if needed: `cache:products:v2`

---

### 2. Always Set TTL on Cache Keys

```javascript
// Set TTL based on data volatility:
// Frequently changing data (prices, stock) → 60–300 seconds
// Stable data (product descriptions) → 3600–86400 seconds
// Session data → match your session timeout

redis.setex('cache:prices', 60, JSON.stringify(prices));
redis.setex('cache:products', 3600, JSON.stringify(products));
redis.setex('session:user:42', 86400, token);
```

---

### 3. Memory Optimization

```bash
# Use Hash for objects with many fields (more memory-efficient than multiple keys)
# ❌ Inefficient — 4 separate keys
SET user:42:name "Alice"
SET user:42:age "30"
SET user:42:city "Pune"
SET user:42:role "admin"

# ✅ Efficient — 1 Hash with 4 fields
HSET user:42 name "Alice" age "30" city "Pune" role "admin"
```

---

### 4. Use Pipelining for Bulk Operations

```javascript
// ❌ BAD — 1000 round trips to Redis
for (const user of users) {
  await redis.set(`user:${user.id}`, JSON.stringify(user));
}

// ✅ GOOD — 1 round trip with pipeline
const pipeline = redis.pipeline();
for (const user of users) {
  pipeline.set(`user:${user.id}`, JSON.stringify(user), 'EX', 3600);
}
await pipeline.exec();
```

---

### 5. Connection Pooling

```javascript
// ioredis handles connection pooling internally
// For cluster mode:
const Redis = require('ioredis');
const cluster = new Redis.Cluster([
  { host: '127.0.0.1', port: 7000 },
  { host: '127.0.0.1', port: 7001 },
  { host: '127.0.0.1', port: 7002 },
]);
```

---

### 6. Monitor Redis in Production

```bash
# Real-time command monitoring (development only)
redis-cli MONITOR

# Check memory usage
redis-cli INFO memory

# Check connected clients
redis-cli INFO clients

# Check slow queries (commands taking > 10ms)
redis-cli SLOWLOG GET 10

# Memory usage of a specific key
redis-cli MEMORY USAGE user:42
```

---

### 7. Separate Redis Instances by Purpose

```
Redis Instance 1 → Session storage (db: 0)
Redis Instance 2 → API cache (db: 0)
Redis Instance 3 → Rate limiting (db: 0)
```

Or use Redis databases (0–15) for logical separation:

```javascript
const sessionRedis = new Redis({ db: 0 });
const cacheRedis   = new Redis({ db: 1 });
const queueRedis   = new Redis({ db: 2 });
```

---

## 21. Redis Interview Questions

### Beginner Level

**Q1: What is Redis and what makes it different from traditional databases?**

> Redis is an in-memory data store that keeps all data in RAM, making it 100–1000x faster than disk-based databases like MySQL. Unlike traditional databases designed for complex queries and relationships, Redis is optimized for simple, fast key-value operations. It supports rich data structures (Strings, Lists, Sets, Sorted Sets, Hashes) and is primarily used for caching, session management, and real-time features.

---

**Q2: What does "in-memory" mean and what are the trade-offs?**

> In-memory means all data is stored in RAM instead of disk. The advantage is extreme speed (nanosecond access times). The trade-off is that RAM is volatile — data is lost on restart unless persistence (RDB/AOF) is configured. RAM is also more expensive and limited in size compared to disk.

---

**Q3: What is the difference between LPUSH and RPUSH?**

> Both push values into a Redis List, but from different ends:  
> `LPUSH` inserts at the **left (head)** of the list.  
> `RPUSH` inserts at the **right (tail)** of the list.  
> Use `RPUSH` + `LPOP` for FIFO queue behavior. Use `LPUSH` + `LPOP` for LIFO stack behavior.

---

**Q4: What is TTL and why is it important?**

> TTL (Time To Live) is the number of seconds a key will exist before Redis automatically deletes it. It is critical for cache management to prevent stale data from accumulating indefinitely in memory. Use `EXPIRE key seconds` to set TTL and `TTL key` to check the remaining time.

---

**Q5: What is the difference between a Set and a Sorted Set?**

> A **Set** stores unique strings in no particular order.  
> A **Sorted Set** stores unique strings where each member has an associated numeric **score**. Members are automatically sorted by score. Sorted Sets are ideal for leaderboards, rankings, and priority queues.

---

### Intermediate Level

**Q6: What is Cache-Aside pattern and when do you use it?**

> Cache-Aside (lazy loading) is the most common caching pattern. The application checks Redis first. On a cache miss, it queries the database, stores the result in Redis with a TTL, then returns it. It is used when you want to cache only data that is actually requested, keeping the cache lean. The downside is that the first request after a cache miss (or expiry) is slower.

---

**Q7: What is the difference between RDB and AOF persistence?**

> **RDB** creates periodic binary snapshots of the entire dataset. It is compact and fast to restore but may lose data between snapshots.  
> **AOF** logs every write command. It is more durable (loses at most 1 second of data with `everysec` sync) but files are larger and slower to replay on restart.  
> Best practice is to enable both.

---

**Q8: Redis is single-threaded. How does it handle thousands of concurrent connections?**

> Redis uses a **non-blocking, event-driven architecture** with OS-level I/O multiplexing (epoll on Linux, kqueue on macOS). The single thread runs an event loop that handles multiple client connections simultaneously without blocking. Since most Redis operations are in-memory and microsecond-fast, the event loop rarely waits. This means single-threaded Redis outperforms multi-threaded databases that suffer from lock contention and context switching.

---

**Q9: What is the WATCH command used for in Redis?**

> `WATCH` implements optimistic locking for Redis transactions. You watch one or more keys before starting a `MULTI` block. If any watched key is modified by another client before your `EXEC` runs, the entire transaction is aborted (returns nil). Your application should then retry the transaction. It is used to prevent race conditions in concurrent scenarios like "read-modify-write" operations.

---

**Q10: How would you implement rate limiting using Redis?**

> Use a String counter with TTL:
> ```javascript
> const key = `ratelimit:${userId}`;
> const count = await redis.incr(key);
> if (count === 1) await redis.expire(key, 60); // Reset every minute
> if (count > 100) throw new Error('Rate limit exceeded');
> ```
> The `INCR` command is atomic so no race conditions occur. The key expires automatically, resetting the counter each minute.

---

**Q11: What are Redis eviction policies and when does eviction occur?**

> Eviction occurs when Redis reaches its `maxmemory` limit. Common policies:  
> - `allkeys-lru`: Evict the least recently used key (most common for caching)  
> - `volatile-lru`: Evict LRU key only among keys with TTL set  
> - `noeviction`: Return an error — never evict (used when Redis is a primary store)  
> For caching scenarios, `allkeys-lru` is recommended.

---

**Q12: When would you use Redis Pub/Sub vs Redis Streams?**

> **Pub/Sub** is fire-and-forget. If a subscriber is offline, it misses messages. Suitable for real-time notifications where missing a message is acceptable (e.g., live chat, presence updates).  
> **Redis Streams** are persistent, append-only logs. Subscribers can read from any position and resume after a disconnect. Suitable for event sourcing, audit logs, and guaranteed message delivery.

---

## 22. Summary & Learning Roadmap

### What You Have Learned

| Topic | Covered |
|---|---|
| What Redis is and why it exists | ✅ |
| In-memory vs disk storage | ✅ |
| Redis architecture | ✅ |
| Installing Redis | ✅ |
| All major data types | ✅ |
| Key expiration and TTL | ✅ |
| Persistence (RDB & AOF) | ✅ |
| Pub/Sub messaging | ✅ |
| Transactions | ✅ |
| Caching patterns | ✅ |
| Redis with Node.js | ✅ |
| Redis with Docker | ✅ |
| Best practices & mistakes | ✅ |

---

### Learning Roadmap

```svg
<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">
  <rect width="720" height="420" rx="12" fill="#f8fafc"/>
  <text x="360" y="32" text-anchor="middle" font-size="16" font-weight="bold" fill="#1e293b">Redis Learning Roadmap</text>

  <!-- Stage 1 -->
  <rect x="30" y="60" width="140" height="120" rx="8" fill="#3b82f6"/>
  <text x="100" y="86" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Stage 1</text>
  <text x="100" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#dbeafe">Basics</text>
  <text x="100" y="122" text-anchor="middle" font-size="10" fill="#eff6ff">Install Redis</text>
  <text x="100" y="138" text-anchor="middle" font-size="10" fill="#eff6ff">CLI commands</text>
  <text x="100" y="154" text-anchor="middle" font-size="10" fill="#eff6ff">Data types</text>
  <text x="100" y="170" text-anchor="middle" font-size="10" fill="#eff6ff">TTL &amp; Expiry</text>

  <!-- Arrow 1 -->
  <line x1="170" y1="120" x2="194" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowGray)"/>

  <!-- Stage 2 -->
  <rect x="196" y="60" width="140" height="120" rx="8" fill="#10b981"/>
  <text x="266" y="86" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Stage 2</text>
  <text x="266" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#d1fae5">Caching</text>
  <text x="266" y="122" text-anchor="middle" font-size="10" fill="#ecfdf5">Cache-aside</text>
  <text x="266" y="138" text-anchor="middle" font-size="10" fill="#ecfdf5">Write-through</text>
  <text x="266" y="154" text-anchor="middle" font-size="10" fill="#ecfdf5">Node.js + Redis</text>
  <text x="266" y="170" text-anchor="middle" font-size="10" fill="#ecfdf5">API caching</text>

  <!-- Arrow 2 -->
  <line x1="336" y1="120" x2="360" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowGray)"/>

  <!-- Stage 3 -->
  <rect x="362" y="60" width="140" height="120" rx="8" fill="#f97316"/>
  <text x="432" y="86" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Stage 3</text>
  <text x="432" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffedd5">Real-Time</text>
  <text x="432" y="122" text-anchor="middle" font-size="10" fill="#fff7ed">Pub/Sub</text>
  <text x="432" y="138" text-anchor="middle" font-size="10" fill="#fff7ed">Redis Streams</text>
  <text x="432" y="154" text-anchor="middle" font-size="10" fill="#fff7ed">Transactions</text>
  <text x="432" y="170" text-anchor="middle" font-size="10" fill="#fff7ed">Rate limiting</text>

  <!-- Arrow 3 -->
  <line x1="502" y1="120" x2="526" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrowGray)"/>

  <!-- Stage 4 -->
  <rect x="528" y="60" width="160" height="120" rx="8" fill="#8b5cf6"/>
  <text x="608" y="86" text-anchor="middle" font-size="13" font-weight="bold" fill="#fff">Stage 4</text>
  <text x="608" y="104" text-anchor="middle" font-size="11" font-weight="bold" fill="#ede9fe">Production</text>
  <text x="608" y="122" text-anchor="middle" font-size="10" fill="#f5f3ff">Clustering</text>
  <text x="608" y="138" text-anchor="middle" font-size="10" fill="#f5f3ff">Sentinel HA</text>
  <text x="608" y="154" text-anchor="middle" font-size="10" fill="#f5f3ff">Monitoring</text>
  <text x="608" y="170" text-anchor="middle" font-size="10" fill="#f5f3ff">Security</text>

  <!-- Timeline bar -->
  <rect x="30" y="218" width="658" height="8" rx="4" fill="#e2e8f0"/>
  <rect x="30" y="218" width="165" height="8" rx="4" fill="#3b82f6"/>
  <rect x="195" y="218" width="165" height="8" rx="4" fill="#10b981"/>
  <rect x="360" y="218" width="165" height="8" rx="4" fill="#f97316"/>
  <rect x="525" y="218" width="163" height="8" rx="4" fill="#8b5cf6"/>

  <text x="100" y="242" text-anchor="middle" font-size="10" fill="#64748b">Week 1–2</text>
  <text x="266" y="242" text-anchor="middle" font-size="10" fill="#64748b">Week 3–4</text>
  <text x="432" y="242" text-anchor="middle" font-size="10" fill="#64748b">Week 5–6</text>
  <text x="608" y="242" text-anchor="middle" font-size="10" fill="#64748b">Week 7+</text>

  <!-- Resources section -->
  <rect x="30" y="265" width="658" height="130" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
  <text x="360" y="292" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">Recommended Resources</text>

  <text x="50" y="318" font-size="12" font-weight="bold" fill="#3b82f6">📚 Documentation</text>
  <text x="50" y="336" font-size="11" fill="#334155">redis.io/docs — Official Redis documentation</text>
  <text x="50" y="354" font-size="11" fill="#334155">redis.io/commands — Full command reference</text>

  <text x="380" y="318" font-size="12" font-weight="bold" fill="#10b981">🛠 Tools</text>
  <text x="380" y="336" font-size="11" fill="#334155">RedisInsight — GUI for Redis (free)</text>
  <text x="380" y="354" font-size="11" fill="#334155">ioredis — Node.js Redis client</text>
  <text x="380" y="372" font-size="11" fill="#334155">Docker — Run Redis locally</text>

  <defs>
    <marker id="arrowGray" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
</svg>
```

---

### Quick Reference Cards

**When to use each data type:**

| You need to… | Use |
|---|---|
| Store a value with TTL | String |
| Count something atomically | String + INCR |
| Implement a queue | List |
| Store an activity feed | List |
| Track unique items | Set |
| Compute overlaps between groups | Set (SINTER/SUNION) |
| Build a leaderboard | Sorted Set |
| Store object attributes | Hash |
| Real-time broadcasting | Pub/Sub |
| Durable message queue | Stream |

---

### Final Tips

> 🎯 **Start small.** Add Redis caching to one slow API endpoint and measure the improvement.

> 🔑 **Key naming is everything.** Establish a naming convention before you write a single line of code.

> ⏰ **TTL everywhere.** If you are not sure, set a TTL. You can always adjust it later.

> 📊 **Monitor in production.** Use `INFO`, `MONITOR`, and `SLOWLOG` to understand real-world Redis behavior.

> 🔄 **Redis is not a replacement.** Use Redis alongside your primary database, not instead of it.

---

*Documentation version: 1.0 | Last updated: 2024 | Based on Redis 7.x*
