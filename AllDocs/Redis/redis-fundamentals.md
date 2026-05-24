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

![Architecture Diagram: Application with Cache Layer diagram](/DSA-Notes-Problems/assets/redis/introduction-to-redis-architecture-diagram-application-with-cache-layer.svg)

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

![Disk vs Memory Diagram diagram](/DSA-Notes-Problems/assets/redis/what-is-an-in-memory-database-disk-vs-memory-diagram.svg)

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

![Redis Architecture Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-architecture-redis-architecture-diagram.svg)

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

![Data Type Hierarchy Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-data-types-overview-data-type-hierarchy-diagram.svg)

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

![Leaderboard Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-sorted-sets-leaderboard-diagram.svg)

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

![Persistence Flow Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-persistence-persistence-flow-diagram.svg)

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

![Pub/Sub Communication Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-pub-sub-pub-sub-communication-diagram.svg)

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

![Cache Patterns Diagram diagram](/DSA-Notes-Problems/assets/redis/redis-caching-patterns-cache-patterns-diagram.svg)

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

![Learning Roadmap diagram](/DSA-Notes-Problems/assets/redis/summary-and-learning-roadmap-learning-roadmap.svg)

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
