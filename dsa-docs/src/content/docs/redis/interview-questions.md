---
title: "Redis Interview Questions"
description: "150+ Redis interview questions from beginner to advanced with hidden answers."
sidebar:
  order: 999
  label: "Interview Questions (150+)"
---

> **How to use:** Click any question to expand the answer.

---

## 🟢 Easy (Q1–Q50)

<details class="qa-card qa-easy">
<summary>
Q1. What is Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis (Remote Dictionary Server) is an **open-source, in-memory data structure store** used as a database, cache, message broker, and streaming engine. It was created by **Salvatore Sanfilippo** in 2009.

Key characteristics:
- All data is stored in **RAM** for extreme speed (sub-millisecond latency)
- Supports rich data types: Strings, Lists, Sets, Sorted Sets, Hashes, Streams, Bitmaps, HyperLogLog, Geospatial
- Single-threaded event loop for atomic operations
- Built-in replication, persistence, clustering, and high availability

```bash
redis-cli SET hello "world"
# OK
redis-cli GET hello
# "world"
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q2. What makes Redis different from traditional databases like MySQL or PostgreSQL?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | Redis | Traditional RDBMS (MySQL/PostgreSQL) |
|---------|-------|--------------------------------------|
| **Storage** | Primarily in-memory (RAM) | Primarily disk-based |
| **Speed** | Microsecond latency | Millisecond latency |
| **Data Model** | Key-value with rich data structures | Tables, rows, columns, relationships |
| **Queries** | By key, or simple patterns | Complex SQL (JOINs, subqueries, aggregations) |
| **Persistence** | Optional (RDB/AOF) | Default (every write goes to disk) |
| **Use Case** | Caching, real-time, session store | Primary data store, complex queries |

In short: Redis is **100-1000x faster** than traditional databases but with less query flexibility and optional durability.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q3. What data types does Redis support?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis supports the following core data types:

| Data Type | Description | Example Command |
|-----------|-------------|-----------------|
| **String** | Text, numbers, binary (up to 512MB) | `SET`, `GET`, `INCR` |
| **List** | Ordered collection of strings (linked list) | `LPUSH`, `RPUSH`, `LRANGE` |
| **Set** | Unordered unique strings | `SADD`, `SMEMBERS`, `SINTER` |
| **Sorted Set** | Unique strings with numeric scores (ordered by score) | `ZADD`, `ZRANGE`, `ZRANK` |
| **Hash** | Map of field-value pairs | `HSET`, `HGET`, `HGETALL` |
| **Stream** | Append-only log of entries | `XADD`, `XREAD`, `XRANGE` |
| **Bitmap** | Bit-level operations on strings | `SETBIT`, `GETBIT`, `BITCOUNT` |
| **HyperLogLog** | Probabilistic cardinality estimator | `PFADD`, `PFCOUNT` |
| **Geospatial** | Latitude/longitude data | `GEOADD`, `GEODIST`, `GEORADIUS` |

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q4. What is the maximum size of a Redis String value?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A Redis String value can be up to **512 MB**. This applies to String values, but also to the string elements within Lists, Sets, and other data structures. Keys can also be up to 512 MB, although practical keys are much shorter.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q5. How does Redis achieve high performance despite being single-threaded?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis uses a **non-blocking, event-driven architecture** with I/O multiplexing:

- The main thread runs an **event loop** that processes client connections one at a time
- I/O multiplexing (epoll on Linux, kqueue on macOS) allows a single thread to handle thousands of concurrent connections efficiently
- Since Redis operations are **in-memory** and execute in **microseconds**, there's minimal blocking
- No lock contention or context switching overhead (unlike multi-threaded databases)

> **Note:** As of Redis 6, some I/O operations (socket reads/writes, eviction) are handled by background threads, but command execution remains single-threaded.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q6. What is the difference between `SET` and `SETNX`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- `SET key value` — sets the key regardless of whether it already exists (overwrites)
- `SETNX key value` — **Set if Not Exists**. Only sets the key if it does NOT already exist

```bash
redis> SETNX mykey "hello"
(integer) 1    # Key was set successfully

redis> SETNX mykey "world"
(integer) 0    # Key already exists, not set

redis> GET mykey
"hello"
```

`SETNX` is commonly used for implementing **distributed locks**.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q7. What is TTL in Redis and how do you set it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

**TTL (Time To Live)** is the number of seconds a key will remain in Redis before being automatically deleted.

```bash
# Set a key with TTL of 60 seconds
SET session:123 "user_data"
EXPIRE session:123 60

# Or set TTL in one command
SETEX session:123 60 "user_data"

# Check remaining TTL
TTL session:123   # Returns seconds remaining, -1 means no TTL, -2 means key doesn't exist

# Set TTL in milliseconds
PEXPIRE session:123 60000
```

TTL is critical for cache management — it prevents stale data from accumulating in memory.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q8. What is the difference between Redis Lists and Redis Sets?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

| Feature | List | Set |
|---------|------|-----|
| **Order** | Preserves insertion order | No order (unordered) |
| **Duplicates** | Allows duplicates | Unique elements only |
| **Operations** | LPUSH/RPUSH, LPOP/RPOP, LRANGE | SADD, SREM, SMEMBERS, SINTER, SUNION |
| **Underlying** | Linked list | Hash table |
| **Use Case** | Queue, stack, message buffer | Tags, unique visitors, set operations |

```bash
# List - ordered, allows duplicates
LPUSH mylist "a" "b" "c"   # ["c", "b", "a"]

# Set - unordered, unique
SADD myset "a" "b" "c"     # All three added
SADD myset "a"              # Not added (already exists)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q9. How do you increment a value atomically in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `INCR` command to atomically increment a numeric string value by 1:

```bash
redis> SET counter 10
OK
redis> INCR counter
(integer) 11
redis> INCR counter
(integer) 12

# Increment by a specific amount
INCRBY counter 5   # Returns 17

# Decrement
DECR counter        # Returns 16
DECRBY counter 3    # Returns 13
```

`INCR` is **atomic** — even with thousands of concurrent clients, each increment happens without race conditions.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q10. What is the `LRANGE` command used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`LRANGE key start stop` returns a **range of elements from a List**. Both start and stop are zero-based indexes.

```bash
redis> RPUSH mylist "a" "b" "c" "d" "e"
redis> LRANGE mylist 0 -1    # All elements → ["a", "b", "c", "d", "e"]
redis> LRANGE mylist 0 2     # First 3 elements → ["a", "b", "c"]
redis> LRANGE mylist -3 -1   # Last 3 elements → ["c", "d", "e"]
```

Negative indexes count from the end of the list (-1 is the last element).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q11. What is `HSET` and `HGET` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis Hashes are **field-value pairs** stored under a key — similar to a JavaScript object or a Python dictionary.

```bash
# Set multiple fields
HSET user:1001 name "Alice" age 30 city "NYC"

# Get a single field
HGET user:1001 name     # "Alice"

# Get all fields and values
HGETALL user:1001        # 1) "name" 2) "Alice" 3) "age" 4) "30" 5) "city" 6) "NYC"

# Get multiple fields
HMGET user:1001 name age  # 1) "Alice" 2) "30"

# Increment a numeric field
HINCRBY user:1001 age 1   # Returns 31
```

Hashes are ideal for storing **objects** — they're memory-efficient for grouped data.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q12. How do you check if a key exists in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `EXISTS` command:

```bash
redis> SET mykey "hello"
OK
redis> EXISTS mykey
(integer) 1    # Key exists
redis> EXISTS nonexistent
(integer) 0    # Key doesn't exist
```

`EXISTS` can check multiple keys at once, returning the count of existing keys.

You can also check the type of a key with `TYPE`:

```bash
redis> TYPE mykey
"string"
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q13. What is `SINTER` used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`SINTER` returns the **set intersection** — elements common to all specified Sets:

```bash
redis> SADD set1 "a" "b" "c" "d"
redis> SADD set2 "c" "d" "e" "f"

redis> SINTER set1 set2
1) "c"
2) "d"
```

Related commands:
- `SUNION` — union of sets (all unique elements from any set)
- `SDIFF` — difference (elements in first set not in others)
- `SINTERSTORE` — store the intersection into a new set

Set operations like these are useful for **tags**, **permissions**, and **recommendation** systems.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q14. What is a Sorted Set and how is it different from a regular Set?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

A **Sorted Set** (ZSET) is like a Set where each member has a numeric **score**. Members are automatically sorted by score.

| Feature | Set | Sorted Set |
|---------|-----|------------|
| Order | None | By score (ascending) |
| Uniqueness | Yes | Yes |
| Score | No | Each member has a float score |
| Operations | SADD, SMEMBERS, SINTER | ZADD, ZRANGE, ZRANK, ZSCORE |

```bash
# Adding members with scores
ZADD leaderboard 100 "Alice" 85 "Bob" 200 "Charlie" 95 "Diana"

# Get top 3 (highest scores)
ZREVRANGE leaderboard 0 2 WITHSCORES
1) "Charlie" 2) "200" 3) "Alice" 4) "100" 5) "Diana" 6) "95"

# Get Alice's rank (0-based)
ZREVRANK leaderboard "Alice"   # Returns 1 (2nd place)
```

Sorted Sets are used for **leaderboards**, **priority queues**, and **rate limiters**.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q15. How do you delete keys in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `DEL` command:

```bash
# Delete a single key
DEL mykey
(integer) 1    # 1 key was deleted

# Delete multiple keys
DEL key1 key2 key3
(integer) 3

# Delete keys matching a pattern (not built-in, but via SCAN + DEL)
# Use with caution on large datasets
```

To delete all keys in the database:
```bash
# Delete all keys in current database
FLUSHDB

# Delete all keys in all databases
FLUSHALL
```

> **Warning:** `FLUSHALL` and `FLUSHDB` are destructive and synchronous by default. Use `FLUSHALL ASYNC` in Redis 6+.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q16. What is Redis used for? List common use cases.
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Common Redis use cases:

1. **Caching** — Cache database query results, API responses, rendered pages
2. **Session Storage** — Store user sessions (most popular use case)
3. **Real-time Leaderboards** — Sorted Sets for gaming or engagement scores
4. **Rate Limiting** — INCR + EXPIRE to limit API requests
5. **Message Queue** — Lists with LPUSH/RPOP or Streams
6. **Pub/Sub Messaging** — Real-time notifications, chat
7. **Distributed Locks** — SETNX or Redlock algorithm
8. **Counters** — INCR for page views, likes, shares
9. **Geolocation** — GEOADD / GEORADIUS for location-based features
10. **Session/Token Blacklisting** — Quick O(1) lookups with TTL auto-cleanup

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q17. What are Redis keys? Any rules or conventions?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis keys are **binary-safe strings** (up to 512MB). Best practices:

- **Use meaningful namespaces** — `object:id:field` (e.g., `user:1001:name`)
- **Use colons** as separators — this creates a hierarchical structure
- **Keep keys short but readable** — `u:1001:n` is too cryptic
- **Consistent naming** — singular `user:1001` not mixing `users:1001`
- **Max length** — aim for under 100 bytes (longer keys use more memory)

Good key examples:
```
user:1001:profile
article:42:comments
session:abc123xyz
order:2024:03:15:7890
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q18. What is `RENAME` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`RENAME key newkey` renames an existing key to a new key name:

```bash
redis> SET mykey "hello"
OK
redis> RENAME mykey mynewkey
OK
redis> GET mykey
(nil)
redis> GET mynewkey
"hello"
```

If `newkey` already exists, it's **overwritten** automatically. Use `RENAMENX` to only rename if the new key doesn't exist.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q19. What is `EXPIRE` and `PERSIST`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- `EXPIRE key seconds` — Set a TTL (timeout) on an existing key
- `PERSIST key` — Remove the TTL, making the key persistent

```bash
redis> SET temp "data"
OK
redis> EXPIRE temp 3600    # Expires in 1 hour
(integer) 1

redis> TTL temp            # Check remaining time
(integer) 3598

redis> PERSIST temp        # Remove TTL
(integer) 1

redis> TTL temp
(integer) -1               # No TTL (persistent)
```

You can also set TTL at key creation using `SETEX key seconds value`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q20. How do you find all keys matching a pattern?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use the `KEYS` pattern command or the preferred `SCAN` command:

```bash
# KEYS — synchronous, dangerous in production with many keys
KEYS user:*          # All keys starting with "user:"
KEYS *               # ALL keys (DON'T DO THIS IN PRODUCTION)

# SCAN — cursor-based, safe for production (non-blocking)
SCAN 0 MATCH user:* COUNT 100
# Returns: cursor + array of matching keys
```

> **Never use `KEYS` in production** — it blocks Redis for all other operations until complete. Always use `SCAN` instead.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q21. What is `RPUSH` vs `LPUSH`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Both push elements into a Redis List:

- `RPUSH key value [value ...]` — Pushes to the **right (tail)** of the list
- `LPUSH key value [value ...]` — Pushes to the **left (head)** of the list

```bash
RPUSH mylist "a" "b"    # ["a", "b"]
LPUSH mylist "z"        # ["z", "a", "b"]
```

Use patterns:
- `RPUSH` + `LPOP` = **FIFO Queue** (first in, first out)
- `LPUSH` + `LPOP` = **LIFO Stack** (last in, first out)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q22. What is `ZRANK` and `ZREVRANK`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Both get the position (rank) of a member in a Sorted Set:

- `ZRANK key member` — Returns the **0-based rank** of the member (lowest score = rank 0)
- `ZREVRANK key member` — Returns rank in **reverse order** (highest score = rank 0)

```bash
ZADD scores 50 "Alice" 80 "Bob" 30 "Charlie"

ZRANK scores "Alice"       # 1 (second lowest score)
ZRANK scores "Charlie"     # 0 (lowest score)
ZREVRANK scores "Bob"      # 0 (highest score)
ZREVRANK scores "Charlie"  # 2 (lowest score)
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q23. What is the `INFO` command in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`INFO` returns detailed information and statistics about the Redis server:

```bash
redis> INFO

# Sections include:
# Server — version, OS, uptime, process_id
# Clients — connected_clients, blocked_clients
# Memory — used_memory, peak_memory, fragmentation_ratio
# Persistence — rdb_last_save_time, aof_enabled
# Stats — total_connections_received, commands_processed
# Replication — role (master/slave), connected_slaves
# Keyspace — db0:keys=1500,expires=200
```

Get specific sections: `INFO memory`, `INFO stats`, `INFO keyspace`, etc.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q24. What is the default port for Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

The default port for Redis is **6379**. TLS connections typically use port **6380**.

6380 is also the default port for Redis Sentinel to communicate. Redis Cluster uses port 6379 + 10000 (16379) for cluster bus communication.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q25. How do you connect to a Redis server?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Using the **redis-cli** command-line tool:

```bash
# Connect to localhost:6379 (default)
redis-cli

# Connect to a specific host and port
redis-cli -h myredis.example.com -p 6379

# Connect with authentication
redis-cli -h myredis.example.com -a mypassword

# Connect to a specific database (0-15)
redis-cli -n 5

# Test the connection
redis-cli ping
# PONG
```

Most Redis clients (Node.js, Python, Java, etc.) follow similar connection patterns with host, port, password, and database parameters.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q26. What is `SELECT` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`SELECT index` switches the current database connection to a different database index.

```bash
# Redis has 16 databases by default (index 0-15)
SELECT 0    # Switch to database 0 (default)
SELECT 5    # Switch to database 5
```

Each database has its own keyspace — keys in DB 0 are isolated from DB 1.

> **Best Practice:** Modern Redis usage often avoids multiple databases. Using **key namespacing** (e.g., `cache:user:1001`) is more scalable and works transparently with Redis Cluster.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q27. What is `DBSIZE` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`DBSIZE` returns the **number of keys** in the currently selected database:

```bash
redis> SELECT 0
OK
redis> DBSIZE
(integer) 1500    # 1500 keys in database 0
```

Note that `DBSIZE` only counts keys, not the size of individual values. Use `MEMORY USAGE key` to check how much memory a specific key uses.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q28. What is the purpose of Redis Pub/Sub?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis Pub/Sub is a **publish-subscribe messaging pattern** where:

- **Publishers** send messages to channels (don't know who receives)
- **Subscribers** listen to channels (don't know who sends)
- Messages are **fire-and-forget** — no persistence, no replay

```bash
# Terminal 1 — Subscribe
SUBSCRIBE notifications

# Terminal 2 — Publish
PUBLISH notifications "Hello subscribers!"

# Terminal 1 receives:
# 1) "message"
# 2) "notifications"
# 3) "Hello subscribers!"
```

Use cases: real-time notifications, live chat, presence updates, broadcast events.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q29. What does `FLUSHALL` do?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`FLUSHALL` **deletes all keys in all databases** on the Redis server.

```bash
# Synchronous (blocks until complete)
FLUSHALL

# Asynchronous (non-blocking, Redis 6+)
FLUSHALL ASYNC
```

`FLUSHDB` deletes all keys in the **current database** only.

> **Warning:** These are destructive operations. Use with extreme caution in production. Always prefer `FLUSHALL ASYNC` to avoid blocking.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q30. What is the `TYPE` command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`TYPE key` returns the **data type** of the value stored at a given key:

```bash
SET mystring "hello"          → TYPE mystring → "string"
LPUSH mylist "a"              → TYPE mylist   → "list"
SADD myset "a"                → TYPE myset    → "set"
ZADD myzset 1 "a"             → TYPE myzset   → "zset"
HSET myhash field "value"     → TYPE myhash   → "hash"
XADD mystream * field "value" → TYPE mystream → "stream"
```

Returns `"none"` if the key doesn't exist.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q31. What is the difference between `GET` and `MGET`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- `GET key` — returns the value of a **single** key
- `MGET key [key ...]` — returns values of **multiple** keys in one round trip

```bash
SET user:1 "Alice"
SET user:2 "Bob"
SET user:3 "Charlie"

GET user:1                    # "Alice" (1 round trip)
MGET user:1 user:2 user:3     # ["Alice", "Bob", "Charlie"] (1 round trip)
```

Always prefer `MGET` over multiple `GET` calls when retrieving several keys — it reduces network round trips significantly.

Similarly, `MSET` sets multiple keys atomically.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q32. What is `LPOP` and `RPOP`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Both remove and return elements from a List:

- `LPOP key [count]` — Removes and returns the **left (head)** element
- `RPOP key [count]` — Removes and returns the **right (tail)** element

```bash
RPUSH queue "task1" "task2" "task3"    # ["task1", "task2", "task3"]
LPOP queue                              # "task1" (queue → ["task2", "task3"])
LPOP queue                              # "task2"
LPOP queue                              # "task3"
```

Common patterns:
- `RPUSH` + `LPOP` = FIFO Queue
- `LPUSH` + `LPOP` = LIFO Stack
- `BRPOP` / `BLPOP` = Blocking versions (wait for elements if list is empty)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q33. How do you set multiple key-value pairs at once?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `MSET` (Multi Set):

```bash
MSET key1 "value1" key2 "value2" key3 "value3"
```

This is **atomic** — all keys are set or none are. It uses a single round trip for better performance.

Similarly, `MGET` retrieves multiple values:
```bash
MGET key1 key2 key3    # Returns ["value1", "value2", "value3"]
```

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q34. What are blocking list operations in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Blocking list operations **wait** for an element to be available instead of returning nil:

- `BLPOP key [key ...] timeout` — Blocking LPOP (waits up to `timeout` seconds)
- `BRPOP key [key ...] timeout` — Blocking RPOP
- `BRPOPLPUSH source destination timeout` — Blocking RPOPLPUSH

```bash
# Terminal 1 (worker) — blocks until an element is available
BRPOP taskqueue 0    # 0 = wait indefinitely

# Terminal 2 (producer) — publishes a task
RPUSH taskqueue "process_order_123"

# Terminal 1 immediately returns: ["taskqueue", "process_order_123"]
```

Blocking operations are useful for implementing **reliable work queues** — workers wait for tasks without busy polling.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q35. What is `LLEN`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`LLEN` returns the **length (number of elements)** of a List:

```bash
RPUSH mylist "a" "b" "c" "d" "e"
LLEN mylist    # (integer) 5
```

Other similar commands:
- `SCARD` — cardinality of a Set
- `ZCARD` — cardinality of a Sorted Set
- `HLEN` — number of fields in a Hash
- `STRLEN` — length (bytes) of a String value

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q36. How do you get all members of a Set?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `SMEMBERS key` to return all members of a Set:

```bash
SADD tags:article:42 "redis" "database" "caching"
SMEMBERS tags:article:42
1) "redis"
2) "database"
3) "caching"
```

For Sorted Sets, use `ZRANGE key 0 -1` to get all members. For large sets, prefer `SSCAN` / `ZSCAN` instead of `SMEMBERS` / `ZRANGE` to avoid blocking.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q37. What is `SCARD` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`SCARD key` returns the **cardinality** (number of members) of a Set:

```bash
SADD myset "a" "b" "c" "a"    # "a" already exists, only 3 unique added
SCARD myset                    # (integer) 3
```

`ZCARD` for Sorted Sets and `HLEN` for Hashes work similarly.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q38. What is the difference between `SET` with EX and `SETEX`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Both set a key with a TTL, but:

```bash
# SET with EX option (Redis 2.6.12+)
SET mykey "hello" EX 60

# SETEX (dedicated command)
SETEX mykey 60 "hello"
```

The difference:
- `SET ... EX` supports additional options like `NX` (only set if not exists) and `GET` (return old value)
- `SET ... EX` is preferred for **distributed locks** and **atomic operations**
- `SETEX` is simpler but less flexible

Both are **atomic** and preferred over `SET` + `EXPIRE` (two separate commands that could fail between).

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q39. What is `ZCOUNT` used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`ZCOUNT key min max` returns the **number of members** in a Sorted Set with scores within the given range:

```bash
ZADD prices 10 "apple" 20 "banana" 30 "cherry" 40 "date" 50 "elderberry"

ZCOUNT prices 20 40    # Returns 3 (banana, cherry, date)
ZCOUNT prices -inf 30  # Returns 3 (apple, banana, cherry)
```

This is useful for analytics — e.g., counting orders within a price range.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q40. What is the `RANDOMKEY` command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`RANDOMKEY` returns a **random key** from the current database:

```bash
redis> RANDOMKEY
"user:42"
redis> RANDOMKEY
"session:abc123"
```

It returns `nil` if the database is empty. Useful for **sampling data** or debugging.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q41. What are the namespace/database limits in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

- **Max databases:** 16 by default (configurable via `databases` setting)
- **Max keys per database:** ~2³² (4.2 billion), theoretically limited by available RAM
- **Max key size:** 512 MB
- **Max value size:** 512 MB (for Strings; Lists can hold up to ~4.2 billion elements)
- **Max number of clients:** ~10,000 (depends on OS limits and file descriptors)

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q42. What is `BITCOUNT` and `GETBIT`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Redis **Bitmaps** are operations on String values at the bit level:

- `SETBIT key offset value` — Set a bit at the given offset (0 or 1)
- `GETBIT key offset` — Get the bit value at the given offset
- `BITCOUNT key [start end]` — Count number of bits set to 1
- `BITOP operation destkey key [key ...]` — Perform bitwise AND/OR/XOR/NOT

```bash
# Track daily user sign-ins (one bit per day)
SETBIT user:1001:signin 0 1    # Day 0: signed in
SETBIT user:1001:signin 1 1    # Day 1: signed in
SETBIT user:1001:signin 3 1    # Day 3: signed in (missed day 2)

BITCOUNT user:1001:signin      # Returns 3 (signed in 3 days)
GETBIT user:1001:signin 2      # 0 (didn't sign in day 2)
```

Bitmaps are extremely memory efficient — 1 million bits only uses ~125KB.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q43. What is the `TTL` command and what do its return values mean?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`TTL key` returns the remaining time-to-live (in seconds) of a key:

| Return Value | Meaning |
|-------------|---------|
| `N > 0` | Key exists and will expire in N seconds |
| `-1` | Key exists but has **no TTL** (persistent) |
| `-2` | Key does **not exist** (or has already expired) |

```bash
SETEX mykey 60 "hello"
TTL mykey    # ~58 (seconds remaining)
PERSIST mykey
TTL mykey    # -1 (persistent, no TTL)
DEL mykey
TTL mykey    # -2 (key doesn't exist)
```

`PTTL` returns the remaining time in **milliseconds**.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q44. What is the `SISMEMBER` command?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`SISMEMBER key member` checks whether a value is a **member of a Set**:

```bash
SADD admins "alice" "bob"
SISMEMBER admins "alice"   # (integer) 1 — is a member
SISMEMBER admins "eve"     # (integer) 0 — not a member
```

Returns 1 (member) or 0 (not a member). O(1) time complexity.

For Sorted Sets, use `ZSCORE key member` — returns the score if the member exists, or nil if not.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q45. What is `HGETALL` and when should you avoid it?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`HGETALL key` returns **all fields and values** of a Hash:

```bash
HSET user:42 name "Alice" email "alice@example.com" age 30
HGETALL user:42
1) "name"      2) "Alice"
3) "email"     4) "alice@example.com"
5) "age"       6) "30"
```

**When to avoid `HGETALL`:**
- For **large hashes** (hundreds of fields) — it blocks Redis and uses significant memory
- Instead, use `HSCAN` for iterating large hashes, or use `HMGET` to get specific fields

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q46. What is `STRLEN`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`STRLEN key` returns the **length (in bytes)** of a String value:

```bash
SET mykey "hello"
STRLEN mykey    # (integer) 5

SET unicode "héllo"
STRLEN unicode  # (integer) 6 (é is 2 bytes in UTF-8)
```

For Hashes, use `HSTRLEN key field`. For Lists, use `LLEN`. For Sets, use `SCARD`.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q47. What is `APPEND` in Redis?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`APPEND key value` **appends** a value to the end of an existing string. If the key doesn't exist, it creates a new key (like SET):

```bash
SET mykey "Hello"
APPEND mykey " World!"
GET mykey     # "Hello World!"

# APPEND returns the new length of the string
APPEND mykey " Again"   # Returns 19
```

Useful for building strings incrementally, like accumulating log entries.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q48. What is `GETSET`?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`GETSET key value` **atomically** sets a key to a new value and returns the **old value**:

```bash
SET counter "10"
GETSET counter "20"    # Returns "10" (the old value)
GET counter            # Returns "20" (the new value)
```

This is useful for **atomic counter resets** — you can read the old value and reset in one operation, without race conditions.

If the key doesn't exist, it returns nil and creates the key.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q49. How do you check the memory usage of a key?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

Use `MEMORY USAGE key [SAMPLES count]`:

```bash
SET mykey "Hello, World!"
MEMORY USAGE mykey    # Returns bytes used (e.g., 64)

HSET user:1001 name "Alice" bio "..." city "NYC"
MEMORY USAGE user:1001   # Returns bytes including overhead
```

This tells you the actual memory consumed by the key, including Redis data structure overhead (not just the raw value size). The `SAMPLES` option is useful for large containers (Lists, Sets, Hashes) to estimate memory usage.

</div>
</details>

<details class="qa-card qa-easy">
<summary>
Q50. What is the `PING` command used for?
<span class="qa-difficulty-badge easy">Easy</span>
</summary>

<div class="qa-answer">

`PING` tests whether the Redis server is **alive and responsive**:

```bash
redis> PING
PONG

# With a custom message
redis> PING "hello"
"hello"
```

Common uses:
- **Health checks** — monitoring tools ping Redis to check availability
- **Connection testing** — verify the client can reach the server
- **Latency measurement** — measure round-trip time

A successful `PONG` does NOT guarantee the server is functioning correctly — it just means the event loop is running. Use `INFO` for deeper health checks.

</div>
</details>

---

## 🟡 Medium (Q51–Q110)

<details class="qa-card qa-medium">
<summary>
Q51. What is Redis Persistence and what options are available?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis offers two persistence mechanisms:

**RDB (Redis Database File)**
- Creates point-in-time **binary snapshots** of the dataset
- Compact, fast to restore
- Can lose data between snapshots (configurable interval)
- File: `dump.rdb`

**AOF (Append-Only File)**
- Logs every write operation to an append-only file
- More durable (configurable fsync: every second, always, or never)
- Larger file size, slower to replay on restart
- File: `appendonly.aof`

**Best Practice:** Enable **both** RDB and AOF for data safety and fast restarts.

**Redis 4.0+:** AOF rewrite + RDB hybrid — uses RDB as base with incremental AOF on top.

```bash
# Configuration
save 900 1        # RDB: save if at least 1 key changed in 900 seconds
save 300 10       # RDB: save if at least 10 keys changed in 300 seconds
appendonly yes    # Enable AOF
appendfsync everysec  # AOF fsync: compromise between safety and speed
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q52. How do Redis Transactions work (MULTI/EXEC)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis Transactions use `MULTI`, `EXEC`, `DISCARD`, and `WATCH`:

1. **`MULTI`** — Marks the start of a transaction block
2. **Commands** — Queued, not executed immediately
3. **`EXEC`** — Executes all queued commands **atomically** (no other commands interleaved)
4. **`DISCARD`** — Flushes all queued commands

```bash
MULTI
SET account:1001:balance 100
INCRBY account:1002:balance 50
EXEC
```

**Key characteristics:**
- Redis transactions are **all-or-nothing** (if EXEC fails, nothing runs)
- But they are **NOT rollback** — if a command fails during execution, others still run
- Transactions are **atomic** — no other client can execute commands between MULTI and EXEC

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q53. What is the WATCH command and how does it implement optimistic locking?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`WATCH` implements **optimistic locking** for Redis transactions. You watch one or more keys before `MULTI`:

```bash
WATCH account:1001:balance
balance = GET account:1001:balance   # Client-side read (pseudo-code)
new_balance = balance - 50

MULTI
SET account:1001:balance new_balance
EXEC
# If another client modified account:1001:balance between WATCH and EXEC,
# EXEC returns nil (transaction aborted) — retry from WATCH
```

**How it works:**
1. `WATCH key` marks the key for monitoring
2. If any watched key is modified **by another client** before `EXEC`, the transaction is aborted
3. `EXEC` returns `nil` on abort, and the application should **retry**

This pattern is essential for **read-modify-write** operations without using a lock.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q54. What is Redis Pipeline and how does it improve performance?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Pipelining** allows sending multiple commands to Redis **without waiting for individual replies**. Commands are buffered and sent together, then all replies are read at once.

```bash
# Without pipeline — N round trips
SET key1 "a"    #  1 RTT
GET key1        #  1 RTT (total: 2 round trips)

# With pipeline — 1 round trip
pipeline do
  SET key1 "a"
  GET key1
end             # 1 RTT total
```

**Performance gain:**
- Without pipeline: RTT × N (e.g., 10ms × 1000 = 10 seconds for 1000 commands)
- With pipeline: RTT + server processing time (≈ 1 round trip total)
- Up to **100x improvement** in throughput

**Important caveats:**
- Commands are **not executed atomically** (unlike MULTI/EXEC transactions)
- Clients must buffer replies in memory
- Too-large pipelines can consume excessive memory

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q55. What is the difference between Redis Pipeline and Transaction (MULTI/EXEC)?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Pipeline | Transaction (MULTI/EXEC) |
|---------|----------|--------------------------|
| **Atomicity** | No — commands may interleave with others | Yes — no other commands run between MULTI/EXEC |
| **Batching** | Yes — sends commands in batch | Yes — queues commands, then executes |
| **Round trips** | 1 for entire batch | 1 for entire batch |
| **On error** | Individual command errors don't affect others | All-or-nothing (but no rollback inside) |
| **Server-side queue** | No — sent as fast as possible | Yes — queued until EXEC |
| **Use case** | Bulk loading, maximizing throughput | Atomic operations, read-modify-write |

You can combine both — use pipeline + MULTI/EXEC for atomic batch operations.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q56. What are Redis Eviction Policies?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

When Redis reaches `maxmemory`, it evicts keys based on the configured policy:

| Policy | Description |
|--------|-------------|
| `noeviction` | Return error on writes (default) |
| `allkeys-lru` | Evict **least recently used** keys (most common for caching) |
| `allkeys-lfu` | Evict **least frequently used** keys |
| `volatile-lru` | Evict LRU only among keys **with TTL set** |
| `volatile-lfu` | Evict LFU only among keys with TTL |
| `allkeys-random` | Evict random keys |
| `volatile-random` | Evict random keys from TTL-set keys only |
| `volatile-ttl` | Evict keys with **shortest TTL** first |

**Recommendation:**
- **Caching use case:** `allkeys-lru` (or `allkeys-lfu` if access frequency matters)
- **Redis as primary DB:** `noeviction` (prevent data loss)
- **Mixed usage:** `volatile-lru` (only evict cache keys with TTL)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q57. What is the LRU vs LFU eviction policy?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**LRU (Least Recently Used):** Evicts keys that haven't been accessed for the longest time.

```bash
# config
maxmemory-policy allkeys-lru
```

**LFU (Least Frequently Used):** Evicts keys that are accessed the least often over time.

```bash
# config
maxmemory-policy allkeys-lfu
```

| Aspect | LRU | LFU |
|--------|-----|-----|
| **Considers** | Time since last access | Overall access frequency |
| **Good for** | Recently accessed = likely needed again | Frequently accessed = likely needed again |
| **Weakness** | Downloaded once → stays forever | Favorite content → stays forever (stale) |
| **Redis support** | Since v1.0 | Since v4.0 (with logarithmic frequency counter + decay) |

Redis uses **approximate LRU/LFU** (not exact) — it samples a few keys and evicts the best candidate. This is much more memory-efficient than tracking full LRU/LFU info for every key.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q58. What caching patterns are commonly used with Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Cache-Aside (Lazy Loading)**
The application checks Redis first. On miss, reads DB, stores in Redis, returns.

```
GET from Redis → miss → GET from DB → SET in Redis → return
```

**2. Read-Through**
Cache sits between app and DB. The cache loads data from DB on miss.

**3. Write-Through**
Data is written to cache AND DB simultaneously (synchronous).

**4. Write-Behind (Write-Back)**
Data is written to cache first, then asynchronously persisted to DB.

**5. Refresh-Ahead**
Cache proactively refreshes data before it expires (predictive).

| Pattern | Write Speed | Read Speed | Data Loss Risk | Complexity |
|---------|------------|------------|----------------|------------|
| Cache-Aside | Fast | Miss → slower | None | Low |
| Read-Through | Fast | Miss → slower | None | Medium |
| Write-Through | Slower | Fast | None | Medium |
| Write-Behind | Fastest | Fast | Some (if cache crashes) | High |

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q59. What is the Cache-Aside pattern in detail?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Cache-Aside (Lazy Loading)** is the most common caching pattern:

```
1. App requests data from cache (Redis)
2. If cache HIT → return data immediately
3. If cache MISS (key doesn't exist or expired):
   a. Query the database directly
   b. Store result in Redis with TTL
   c. Return data to client
```

```javascript
async function getUser(id) {
  // Try cache first
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  // Cache miss — query database
  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  if (user) {
    // Store in cache with TTL
    await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  }
  return user;
}
```

**Pros:**
- Only caches data that's actually requested (cache stays lean)
- Simple to implement
- No stale data penalty beyond TTL

**Cons:**
- Cache miss penalty (3 network calls instead of 1)
- Initial request after deployment is always slow (cold cache)
- Stale data until TTL expires (if DB is updated directly)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q60. What is Cache Stampede (Thundering Herd) and how do you prevent it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Cache Stampede** occurs when a popular cache key expires and **many concurrent requests** all try to regenerate it simultaneously, overwhelming the database.

**Prevention strategies:**

**1. Mutex Lock — only one request regenerates**
```javascript
async function getData(key) {
  let data = await redis.get(key);
  if (data) return data;

  // Try to acquire lock
  const lock = await redis.setnx(`lock:${key}`, '1');
  if (lock) {
    await redis.expire(`lock:${key}`, 5);
    data = await expensiveQuery();
    await redis.setex(key, 3600, data);
    await redis.del(`lock:${key}`);
    return data;
  }

  // Wait and retry
  await sleep(10);
  return getData(key);
}
```

**2. Early expiration — refresh before expiry**
Set TTL to e.g. 3600, but treat the key as stale after 3000 seconds. Refresh proactively.

**3. Probabilistic early recomputation**
Randomly regenerate the cache before expiry based on probability `(TTL - elapsed) / TTL`.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q61. What is Redis Replication and how does it work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis Replication allows a **replica** to be an exact copy of a **primary** (master) instance.

**How it works:**
1. Replica connects to primary and issues `REPLICAOF master_host master_port`
2. Primary starts a background save (RDB) or uses diskless replication
3. Primary sends the RDB file to the replica
4. Replica loads the RDB and applies buffered commands
5. After sync, replica receives all write commands as a **continuous stream**

```bash
# On replica
REPLICAOF 192.168.1.100 6379

# To break replication and make it a master
REPLICAOF NO ONE
```

**Key characteristics:**
- **Asynchronous** by default (primary doesn't wait for replica ACK)
- One primary can have **multiple replicas**
- Replicas can have **their own replicas** (cascading)
- Replicas are **read-only** by default (configurable)
- Supports **partial resynchronization** (psync2) — after brief disconnections, replicas can pick up where they left off instead of full resync

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q62. What is Redis Sentinel?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redis Sentinel** provides **high availability** for Redis without manual intervention:

**What Sentinel does:**
1. **Monitoring** — Constantly checks if primary and replicas are working
2. **Notification** — Alerts system admins when something goes wrong
3. **Automatic failover** — If primary fails, promotes a replica to primary
4. **Configuration provider** — Clients ask Sentinel for the current primary address

**How failover works:**
1. Sentinel detects primary is down (quorum of sentinels agrees)
2. Sentinel elects a **leader** to perform failover
3. Leader promotes one replica to primary
4. Leader reconfigures remaining replicas to follow the new primary
5. Leader updates the configuration

**Minimum setup:** 3 Sentinel instances (for quorum) + 1 primary + 2 replicas

```bash
# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2   # 2 = quorum
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q63. What is Redis Cluster?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redis Cluster** is a distributed implementation that **shards data across multiple nodes** automatically.

**Key features:**
- **Automatic sharding** — Keys are distributed across 16384 hash slots
- **High availability** — Each shard can have replicas (Node B can be replica of Node A)
- **Decentralized** — No central coordinator; nodes communicate via gossip protocol
- **Partial failure tolerance** — If a primary fails, its replica is promoted
- **Minimal setup** — At least 3 primary nodes recommended

**Hash slot calculation:**
```
HASH_SLOT = CRC16(key) mod 16384
```

**Limitations:**
- Multi-key operations only work if keys are in the **same hash slot** (use hash tags: `{user:1001}.name`)
- Only **one database** (no `SELECT` with multiple databases)
- No cross-slot transactions
- Client must support cluster protocol (MOVED redirections)

```bash
# Create a cluster
redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  --cluster-replicas 1
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q64. How does Redis shard data in Cluster mode?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis Cluster uses **hash slot partitioning**:

1. **16384 hash slots** total
2. A key's hash slot = `CRC16(key) mod 16384`
3. Each node owns a **range of hash slots**

```
Node A: slots 0-5460
Node B: slots 5461-10922
Node C: slots 10923-16383
```

**Hash tags** ensure multiple keys land in the same slot:
```bash
# Without hash tag — different slots
user:1001:name → slot 125
user:1001:email → slot 211

# With hash tag { } — same slot
{user:1001}:name → slot 152
{user:1001}:email → slot 152  (same!)
```

When a client connects to the wrong node, it receives a **MOVED** redirect telling it which node to query next.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q65. What is the difference between Redis Sentinel and Redis Cluster?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | Sentinel | Cluster |
|---------|----------|---------|
| **Primary purpose** | High availability (failover) | Sharding + high availability |
| **Data distribution** | All nodes have all data (primary-replica) | Data is sharded across nodes |
| **Write capacity** | Single primary handles all writes | Multiple primaries (one per shard) |
| **Multi-key ops** | Yes (all keys on same node) | Only within same hash slot |
| **Complexity** | Lower | Higher |
| **Min nodes** | 2 (1 primary + 1 replica) | 6 (3 primaries + 3 replicas) for HA |
| **Client support** | Standard | Cluster-aware (MOVED handling) |
| **Automatic failover** | Yes (via Sentinel) | Yes (automatic) |
| **Use case** | < 10GB dataset, HA is main concern | > 10GB dataset, need horizontal scaling |

**Rule of thumb:** Use Sentinel for datasets under 10-20GB, Cluster for larger datasets.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q66. What is RDB persistence and what are its pros/cons?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**RDB (Redis Database File)** performs point-in-time snapshots of the dataset.

```bash
# Configuration
save 900 1       # 1 change in 15 min → save
save 300 10      # 10 changes in 5 min → save
save 60 10000    # 10000 changes in 1 min → save

# Manual save
SAVE      # Synchronous (blocks)
BGSAVE    # Asynchronous (fork + child process)
```

**Pros:**
- Compact single file (`dump.rdb`) — easy to backup and transfer
- Fastest restart from persistence (loads RDB in memory)
- Minimal performance impact (uses fork()+COW, child does the work)
- Ideal for disaster recovery (send RDB to remote storage)

**Cons:**
- Can lose data between snapshots (up to N minutes of writes)
- `BGSAVE` uses fork() — can be slow with large datasets (>10GB)
- Not ideal if you need minimal data loss (use AOF instead)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q67. What is AOF persistence and what are its pros/cons?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**AOF (Append-Only File)** logs every write operation to a file. On restart, Redis replays the log to reconstruct data.

```bash
# Configuration
appendonly yes
appendfilename "appendonly.aof"

# fsync policies (how often to flush to disk):
appendfsync always      # Every write — most durable, slowest
appendfsync everysec    # Every second — good compromise (recommended)
appendfsync no          # OS decides — fastest, least durable
```

**Pros:**
- Most durable — with `everysec`, loses at most 1 second of data
- Append-only, no corruption issues (Redis can fix truncated files)
- Human-readable (can tail the file to see commands)
- Rewrite mechanism to compact file size

**Cons:**
- Larger file size than RDB
- Slower restart than RDB (must replay all commands)
- Can be slower than RDB under heavy write loads (with `always` fsync)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q68. How does AOF rewrite work in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Over time, the AOF file grows as commands accumulate. **AOF rewrite** creates a compacted version:

**How it works:**
1. Redis forks a child process
2. Child reconstructs the current dataset in memory and writes a minimal AOF
3. Meanwhile, parent accumulates new commands in a buffer
4. When child finishes, parent appends the buffer to the new AOF
5. Parent atomically swaps the old AOF with the new one

**What rewrite does:**
- Instead of `SET key 1`, `INCR key`, `INCR key` → just `SET key 3`
- Removes expired keys
- Drops keys that have been deleted

```bash
# Manual trigger
BGREWRITEAOF

# Auto-trigger (config)
auto-aof-rewrite-percentage 100     # Rewrite if AOF grows by 100%
auto-aof-rewrite-min-size 64mb      # Minimum size to rewrite
```

In Redis 7+, AOF rewrite can happen in the **background without fork** using multi-threaded I/O.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q69. What is Redis's memory optimization strategy for small data?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis uses **memory optimization** techniques for small aggregate data types:

**ziplist encoding:** Small Lists, Hashes, and Sorted Sets are stored as **ziplists** (compact, contiguous memory) instead of linked lists or hash tables:

```bash
# Configurable thresholds
hash-max-ziplist-entries 512    # Hash → ziplist if ≤ 512 entries
hash-max-ziplist-value 64       # and each entry ≤ 64 bytes
list-max-ziplist-size -2        # List → quicklist (memory efficient)
zset-max-ziplist-entries 128    # Sorted Set → ziplist if ≤ 128 entries
zset-max-ziplist-value 64       # and each entry ≤ 64 bytes
```

**Other optimizations:**
- **Intset** — Small Sets of integers stored as sorted integer array
- **Quicklist** — Linked list of ziplists for Lists (memory + performance trade-off)
- **Shared objects** — Small integers (0-9999) are shared, not duplicated
- **Memory alignment** — Redis aligns data structures for efficient memory access

Use `MEMORY DOCTOR` to get memory optimization recommendations.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q70. What is HyperLogLog in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**HyperLogLog** is a probabilistic data structure for **cardinality estimation** (counting unique elements) using very little memory.

```bash
PFADD visitors "user:1001" "user:1002" "user:1001" "user:1003"
PFCOUNT visitors    # Returns ~3 (approximate unique count)

PFADD today "ip:1.2.3.4" "ip:5.6.7.8"
PFADD yesterday "ip:1.2.3.4" "ip:9.10.11.12"
PFMERGE all_visitors today yesterday   # Merge HLLs
PFCOUNT all_visitors                   # ~3 unique IPs across both days
```

**Key characteristics:**
- **~12KB memory** per key regardless of cardinality
- **0.81% standard error** (approximate, not exact)
- Can count up to **2⁶⁴ unique elements**
- Merging two HLLs gives your union estimate with no extra error
- Cannot retrieve elements (only count approximation)

**Use cases:** Unique visitor counting, distinct IP addresses, search term cardinality.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q71. What is Redis Pub/Sub and what are its limitations?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redis Pub/Sub** implements a publish/subscribe messaging pattern:

```bash
# Subscribe to channels (client 1)
SUBSCRIBE news:tech news:sports

# Publish messages (client 2)
PUBLISH news:tech "New AI breakthrough!"
PUBLISH news:sports "World Cup finals today"
```

**Key features:**
- **Fire-and-forget** — Publisher sends, doesn't wait for subscribers
- **Fan-out** — All subscribers of a channel get the message
- **Pattern subscriptions** — `PSUBSCRIBE news:*` to subscribe to all news channels

**Limitations:**
- **No message persistence** — If subscriber is offline, messages are lost
- **No message acknowledgment** — No guarantee of delivery
- **No backpressure** — Slow subscribers can cause buffer overflow
- **Not suitable for reliable messaging** — Use Redis Streams instead
- **Scaling** — Every subscriber gets every message (no consumer groups)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q72. What are Redis Streams and how are they different from Pub/Sub?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redis Streams** are an append-only log data structure introduced in Redis 5.0:

```bash
# Add entry to stream (auto-generated ID)
XADD mystream * sensor "temp" value 25.5

# Read from stream
XRANGE mystream - +                  # All entries
XREAD COUNT 10 STREAMS mystream 0    # First 10 entries

# Create consumer group
XGROUP CREATE mystream mygroup $
XREADGROUP GROUP mygroup consumer1 COUNT 1 STREAMS mystream >
```

**Key differences from Pub/Sub:**

| Feature | Pub/Sub | Streams |
|---------|---------|---------|
| **Persistence** | None | Persistent (in-memory, optionally AOF/RDB) |
| **Delivery guarantee** | At-most-once | At-least-once (with consumer ack) |
| **Consumer groups** | No | Yes (load balancing across consumers) |
| **Backlog** | No | Yes (configurable max length) |
| **Replay** | No | Yes (read from any point) |
| **Blocking reads** | Yes (SUBSCRIBE blocks) | Yes (XREAD BLOCK) |

**Use Streams when you need:** Reliable messaging, event sourcing, activity feeds, job queues with acknowledgments.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q73. How do Consumer Groups work in Redis Streams?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Consumer Groups** enable **load-balanced message processing** across multiple consumers:

```
Stream: order-events
Consumer Group: email-group
  ├── Consumer: worker-1 (processing order:1001, order:1002)
  ├── Consumer: worker-2 (processing order:1003)
  └── Consumer: worker-3 (idle)
```

```bash
# Create group
XGROUP CREATE order-events email-group $

# Worker reads (new messages assigned round-robin)
XREADGROUP GROUP email-group worker-1 COUNT 1 BLOCK 5000 STREAMS order-events >

# Acknowledge after processing
XACK order-events email-group 1700000000000-0
```

**Features:**
- Messages are distributed **round-robin** among consumers
- Each message is delivered to **only one consumer**
- Unacknowledged messages remain in the **Pending Entries List (PEL)**
- `XPENDING` shows pending messages; `XCLAIM` reassigns them if a consumer fails
- Consumers can **reconnect** and continue from where they left off

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q74. What is the difference between `BRPOP` and `XREAD` for implementing queues?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | List-based Queue (BRPOP) | Stream-based Queue (XREAD) |
|---------|-------------------------|---------------------------|
| **Blocking read** | Yes (BRPOP) | Yes (XREAD BLOCK) |
| **Multiple consumers** | Each gets different items (but no ack) | With consumer groups, each gets different items + ack |
| **Delivery guarantee** | At-most-once | At-least-once (with XACK) |
| **Replay** | No (popped items are gone) | Yes (read from any ID) |
| **Message backlog** | Single list | Configurable maxlen |
| **Multiple subscriber groups** | No | Yes (fan-out to different groups) |
| **Complexity** | Simple | More features, more complex |

```bash
# Simple queue with List
RPUSH taskqueue "job1" "job2"
BRPOP taskqueue 0          # Blocks and returns "job1"

# Reliable queue with Streams
XADD taskqueue * type "email" to "user@example.com"
XGROUP CREATE taskqueue workers $
XREADGROUP GROUP workers worker1 COUNT 1 BLOCK 0 STREAMS taskqueue >
# Process and acknowledge
XACK taskqueue workers 1700000000000-0
```

**Rule of thumb:** Use Lists for simple FIFO where losing a message is acceptable. Use Streams for reliable message processing.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q75. How do you implement a distributed lock with Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

A basic distributed lock uses `SET NX` + `EX`:

```javascript
// Acquire lock (atomically — both NX and EX in one command)
const lock = await redis.set(`lock:resource`, 'my-instance-id', {
  NX: true,        // Only set if key doesn't exist
  EX: 10           // Auto-release after 10 seconds (safety)
});

if (lock) {
  try {
    // Critical section
    await doWork();
  } finally {
    // Release lock (only if it's still our lock)
    const script = `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      end
      return 0
    `;
    await redis.eval(script, 1, 'lock:resource', 'my-instance-id');
  }
}
```

**Why Lua script for release?** To ensure we only delete OUR lock — checking the value and deleting must be atomic.

**Important considerations:**
- Set a **lock timeout** (TTL) so locks don't persist if the holder crashes
- Use a **unique ID** (UUID) so only the lock holder can release it
- Add a **safety margin** — work should complete before TTL expires
- For mission-critical locks, consider **Redlock** algorithm

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q76. What is the Redlock algorithm?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Redlock** is a distributed lock algorithm proposed by Redis creator Antirez for scenarios where locks must be safe across multiple Redis nodes.

**How it works:**
1. Get the current time (T1)
2. Acquire lock on **N/2 + 1 independent Redis nodes** sequentially (e.g., 3 of 5 nodes)
3. If acquired majority within lock validity time → lock is held
4. If not → release all locks and retry

```javascript
// Simplified Redlock with 3 Redis instances
const instances = [redis1, redis2, redis3];
const lockKey = 'resource:lock';
const lockValue = uuid();
const ttl = 10000; // 10 seconds

async function acquireLock() {
  const startTime = Date.now();
  let acquired = 0;

  for (const instance of instances) {
    const result = await instance.set(lockKey, lockValue, 'NX', 'PX', ttl);
    if (result === 'OK') acquired++;
  }

  const elapsed = Date.now() - startTime;
  if (acquired >= 2 && elapsed < ttl) {
    return lockValue; // Lock acquired!
  }

  // Release all locks
  await releaseLock(lockValue);
  return null;
}
```

**Controversy:** Redlock has been debated by distributed systems experts (Martin Kleppmann). For most applications, single-node Redis with WATCH or a basic lock is sufficient.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q77. What is Lua scripting in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis allows running **Lua scripts** on the server using `EVAL`:

```bash
# Simple Lua script
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey "hello"

# Atomic compare-and-delete
EVAL "
  if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
  end
  return 0
" 1 mykey "expected-value"
```

**Why Lua scripts are powerful:**
- **Atomicity** — The entire script runs atomically (no other commands interleaved)
- **Reduced network** — Send logic to data instead of data to logic
- **Complex operations** — Implement multi-key logic atomically
- **Reusable** — Load with `SCRIPT LOAD` and run with `EVALSHA`

```bash
# Load script and run by hash
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# Returns: "4e6d..." (SHA1 hash)
EVALSHA "4e6d..." 1 mykey
```

> **Note:** Lua scripts are **replicated** in replication/Cluster — they run on the primary and replicas (unless `redis.replicate_commands()` is used).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q78. What are the best practices for Redis key naming?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**1. Use colons for namespacing**
```
user:1001:profile
user:1001:sessions
```

**2. Use consistent singular forms**
```
// Avoid mixing
user:1001:name
users:1001:name ❌
```

**3. Keep keys short but readable**
```
u:1001:n         ❌ Too cryptic
user:1001:name   ✅ Good
```

**4. Include the ID of the entity**
```
article:42:comments
```

**5. For Redis Cluster, use hash tags for related keys**
```
{user:1001}:profile
{user:1001}:sessions  # Same hash slot!
```

**6. Avoid overly long keys** (>100 bytes wastes memory)

**7. Use a consistent prefix per application** (especially when sharing a Redis instance)
```
app1:user:1001
app2:user:1001
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q79. How do you monitor Redis performance?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Key tools and commands:**

**1. `INFO` command** — Overall server health
```
INFO stats    → total_commands_processed, instantaneous_ops_per_sec
INFO memory   → used_memory, fragmentation_ratio
INFO clients  → connected_clients, blocked_clients
```

**2. `SLOWLOG`** — Find slow queries
```bash
SLOWLOG GET 10          # Last 10 slow queries
SLOWLOG LEN             # Number of slow queries
SLOWLOG RESET           # Clear slow log
# Config: slowlog-log-slower-than 10000 (microseconds)
```

**3. `MONITOR`** — Real-time command stream (debugging only, not for production)
```bash
MONITOR    # Shows every command as it executes
```

**4. `LATENCY`** — Measure latency
```bash
LATENCY LATEST           # Latest latency events
LATENCY HISTORY command  # Latency history for a command
LATENCY DOCTOR           # Suggestions for latency issues
```

**5. `MEMORY DOCTOR`** — Memory optimization recommendations
```bash
MEMORY DOCTOR
```

**6. Grafana + Prometheus** — For production monitoring dashboards

**Key metrics to watch:**
- `hit_ratio` (keyspace_hits / (keyspace_hits + keyspace_misses))
- `evicted_keys` — sustained evictions indicate maxmemory is too low
- `rejected_connections` — too many clients
- `fragmentation_ratio` — > 1.5 may indicate memory issues

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q80. What is the `SLOWLOG` in Redis and how do you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`SLOWLOG` records commands that exceed a configured execution time threshold:

```bash
# Configure threshold (microseconds)
CONFIG SET slowlog-log-slower-than 10000   # Log commands slower than 10ms

# View recent slow commands
SLOWLOG GET 5
# 1) 1) (integer) 14           # Unique ID
#    2) (integer) 1700000000   # Unix timestamp
#    3) (integer) 15000        # Execution time (microseconds)
#    4) 1) "KEYS"              # Command
#       2) "*"                 # Arguments
#    5) "127.0.0.1:6379"       # Client

# Number of slow queries
SLOWLOG LEN

# Clear slow log
SLOWLOG RESET
```

**Common sources of slow queries:**
- `KEYS *` (use SCAN instead)
- `SMEMBERS` on large Sets (use SSCAN)
- `SORT` with large datasets
- `HGETALL` on large Hashes
- `ZRANGE` on large Sorted Sets with very wide ranges

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q81. What is the `MONITOR` command and why should you avoid it in production?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`MONITOR` streams **every command** processed by Redis in real-time:

```bash
redis> MONITOR
1700000000.000000 [0 127.0.0.1:6379] "SET" "mykey" "hello"
1700000000.000001 [0 127.0.0.1:6379] "GET" "mykey"
```

**Why avoid in production:**
- `MONITOR` can reduce Redis throughput by **up to 50%** or more
- Every command is output, creating high overhead
- The output buffer for the MONITOR client can grow and cause memory issues
- It's a debugging tool, not a production monitoring tool

**Alternatives:**
- Use `SLOWLOG` to find problematic queries
- Use Redis's built-in `INFO stats` for command counts
- Enable Redis's **command statistics** with `CONFIG SET commandstats yes`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q82. How does memory fragmentation occur in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Memory fragmentation** occurs when allocated memory can't be fully utilized due to gaps between allocated blocks.

**In Redis, fragmentation happens because:**
1. Redis allocates and deallocates memory frequently
2. Different key sizes create non-contiguous usage patterns
3. The allocator (jemalloc by default) can't perfectly fit every allocation

```bash
# Check fragmentation ratio
INFO memory
# used_memory_rss / used_memory = fragmentation ratio

# Example:
used_memory: 1.5GB         # Actual data size
used_memory_rss: 2.5GB     # RSS (what the OS has allocated)
# Fragmentation ratio: 1.67 (2.5/1.5) — elevated!
```

**Interpreting fragmentation ratio:**
- **≈ 1.0** — Ideal (RSS ≈ actual memory)
- **> 1.5** — Significant fragmentation (consider restart or `MEMORY PURGE`)
- **< 1.0** — Memory overcommit (some memory is shared/swapped)

**Solutions:**
1. Restart Redis (frees all memory)
2. `MEMORY PURGE` (ask allocator to reclaim memory
3. Use `jemalloc` (Redis default, good fragmentation characteristics)
4. Align key sizes where possible

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q83. What is Redis `CONFIG SET` and `CONFIG GET`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

- `CONFIG GET pattern` — Returns configuration parameters matching a glob pattern
- `CONFIG SET parameter value` — Changes configuration at runtime (without restart)

```bash
# Get configuration
CONFIG GET maxmemory          # * "100mb"
CONFIG GET *lru*             # All LRU-related configs
CONFIG GET *                  # ALL configuration (be careful — huge output!)

# Set configuration at runtime
CONFIG SET maxmemory 2gb
CONFIG SET maxmemory-policy allkeys-lru
CONFIG SET slowlog-log-slower-than 5000
```

**Important:**
- Runtime changes with `CONFIG SET` are **temporary** — lost on restart
- To make permanent, update `redis.conf`
- Use `CONFIG REWRITE` to save current runtime config to `redis.conf`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q84. What is the difference between Redis `EXPIRE` and `PEXPIRE`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Both set key expiration, just with different time units:

- `EXPIRE key seconds` — Time-to-live in **seconds** (integer)
- `PEXPIRE key milliseconds` — Time-to-live in **milliseconds** (integer)

```bash
EXPIRE mykey 60       # Expires in 60 seconds
PEXPIRE mykey 60000   # Same: 60000 milliseconds = 60 seconds
```

Similarly:
- `TTL key` — Returns remaining time in **seconds**
- `PTTL key` — Returns remaining time in **milliseconds**
- `SETEX key seconds value` — Set with TTL in seconds
- `PSETEX key milliseconds value` — Set with TTL in milliseconds

`PEXPIRE` and `PTTL` are useful when you need finer granularity.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q85. How does Redis handle key expiration? When are expired keys removed?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis uses **two strategies** for expiring keys:

**1. Passive Expiration (Lazy)**
- When a key is accessed (GET, EXISTS, etc.), Redis checks if it's expired
- If expired, it's deleted and nil is returned
- This means expired keys that are never accessed consume memory

**2. Active Expiration (Periodic)**
- Every 100ms, Redis runs a background cycle:
  1. Samples 20 random keys with TTL
  2. Deletes all expired keys found
  3. If >25% of sampled keys were expired, repeat from step 1
  4. Repeats for maximum 25% of the time slice (so it doesn't block)
- This bounds the memory used by expired-but-unaccessed keys

**Key point:** The `EXPIRE` command doesn't immediately delete the key — it marks it for eventual deletion. Redis guarantees that expired keys won't be returned, but they may still exist in memory briefly.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q86. What is the `OBJECT` command in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `OBJECT` command inspects Redis keys internally:

```bash
# Internal encoding (how the value is stored)
OBJECT ENCODING mykey
# "embstr" — small string
# "raw" — large string
# "ziplist" — small hash/list/zset
# "hashtable" — large hash/set
# "intset" — integer set

# Reference count (how many keys share this value)
OBJECT REFCOUNT mykey
# Numbers > 1 indicate shared objects (small integers)

# Idle time in seconds
OBJECT IDLETIME mykey
# How many seconds since the key was last accessed (used by LRU)

# Memory usage (approximate)
OBJECT FREQ mykey    # LFU frequency counter (logistic)
```

Use `OBJECT ENCODING` to verify internal optimizations are working (e.g., confirming small Hashes use ziplist).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q87. What is a Redis "watchdog" and how do you use it?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Redis latency watchdog** records the **stack trace** of Redis's main thread when it detects a command taking too long:

```bash
# Enable (time in milliseconds)
CONFIG SET watchdog-period 100   # Log stack trace if command takes > 100ms

# View logs (in server log, not Redis CLI)
# "Slow operation detected, watchdog fired."
# Shows the code path causing the latency

# Disable
CONFIG SET watchdog-period 0
```

**Use case:** Identifying exactly **which code path** is causing latency spikes. Unlike `SLOWLOG` (which shows the command + arguments), the watchdog shows the **internal function call stack**.

> **Note:** The watchdog is a debugging tool and should be used carefully in production as it can affect performance.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q88. What is the difference between synchronous and asynchronous replication in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Asynchronous Replication (Default):**
- Primary executes write commands and **immediately** returns to client
- Replication to replicas happens in the background
- If primary crashes before replica receives the data, that data is **lost**
- Much better performance — primary doesn't wait for replicas

```bash
# Default behavior
SET key value    # Returns immediately, replication is async
```

**Synchronous Replication (WAIT command):**
- `WAIT` blocks the client until a specified number of replicas acknowledge the write
- Provides stronger durability guarantee
- Higher latency — primary waits for replica ACK

```bash
MULTI
SET critical_key "important_value"
EXEC
WAIT 1 1000      # Wait for at least 1 replica to ACK, timeout 1000ms
```

**Trade-off:** Asynchronous = faster but potential data loss. `WAIT` = stronger durability but higher latency. Even with `WAIT`, Redis doesn't guarantee full synchronous replication like some traditional databases (it's "best effort").

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q89. What is Redis `CLIENT` command used for?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `CLIENT` command manages client connections:

```bash
# List all connected clients
CLIENT LIST
# id=3 addr=127.0.0.1:6379 ... cmd=GET

# Kill a client connection
CLIENT KILL addr 127.0.0.1:56789

# Get/set the current connection name
CLIENT SETNAME my-app-worker
CLIENT GETNAME        # "my-app-worker"

# Pause all clients for a duration (testing failovers)
CLIENT PAUSE 10000    # Pause all clients for 10 seconds

# Set a max number of client connections
CONFIG SET maxclients 10000

# Kill idle connections
CLIENT KILL TYPE idle
```

Use `CLIENT LIST` to see blocked clients, idle connections, and the commands currently being executed.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q90. What is a "keyspace notification" in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Keyspace notifications** allow clients to subscribe to events that affect keys (expiry, eviction, modification):

```bash
# Enable notifications (in redis.conf or CONFIG SET)
CONFIG SET notify-keyspace-events KEA
# K = keyspace events, E = keyevent events, A = all

# Subscribe to all expired key events
PSUBSCRIBE __keyevent@0__:expired

# Subscribe to key modifications in a specific namespace
PSUBSCRIBE __keyspace@0__:user:*
```

**Event types:**
- `__keyspace@0__:mykey` — Pattern: `__keyspace@<db>__:<key>`
- `__keyevent@0__:del` — Pattern: `__keyevent@<db>__:<operation>`

**Notification types:**
| Type | Events |
|------|--------|
| `set` | Key created/updated |
| `expired` | Key TTL expired |
| `evicted` | Key evicted by maxmemory |
| `del` | Key deleted |
| `rename_from/to` | Key renamed |

**Use case:** Cache invalidation, session cleanup, triggering background jobs when data expires.

> **Note:** Notifications are **fire-and-forget** (no persistence. If no subscriber is listening, events are lost).

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q91. What is the difference between a Redis transaction and a Lua script?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | MULTI/EXEC Transaction | Lua Script (EVAL) |
|---------|----------------------|-------------------|
| **Atomicity** | Yes — commands run sequentially, no interleaving | Yes — entire script runs atomically |
| **Conditional logic** | No — all commands execute (no IF/ELSE) | Yes — full control flow (if, while, for) |
| **Data returned** | Only last command result | Full script return value |
| **Replication** | Commands replicate individually | Script replicates as one unit (or with `redis.replicate_commands()`) |
| **Complexity** | Simple read-modify-write | Complex multi-step operations |
| **Input from earlier commands** | No — can't use result of GET in a later SET | Yes — variables hold intermediate results |

**When to use each:**
- **MULTI/EXEC:** Simple atomic batches where you just need to run several commands together
- **Lua scripts:** Complex operations with conditions, loops, or where one command's result determines the next command

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q92. How does Redis handle failover in a Cluster?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis Cluster handles failover **automatically**:

**Failure detection:**
1. Each node sends **PING/PONG** to other nodes (gossip protocol)
2. A node is marked **PFAIL** (possibly failed) if another node can't reach it
3. If **majority of primaries** agree it's PFAIL, it becomes **FAIL**

**Failover process:**
1. A replica of the failed primary initiates the failover
2. The replica votes among all primaries to become the new primary
3. If it gets majority votes, it becomes the new primary
4. The new primary starts accepting writes
5. When the old primary comes back, it becomes a replica of the new primary

**Automatic failover conditions:**
- The replica's primary is marked as FAIL
- The replica's data is reasonably up-to-date (within a configurable threshold)
- The replica has a higher "rank" (more complete replication)

**Manual failover (maintenance):**
```bash
CLUSTER FAILOVER       # Graceful — replica becomes primary
CLUSTER FAILOVER FORCE # Force without grace period
CLUSTER FAILOVER TAKEOVER # Emergency, no consent needed
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q93. What is the role of the Redis Cluster bus?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The **Cluster bus** is a separate communication channel between Redis Cluster nodes:

- **Port:** Base port + 10000 (e.g., 6379 → 16379)
- **Protocol:** TCP-based binary protocol (not Redis protocol)
- **Purpose:** Internal cluster management

**What travels on the cluster bus:**
1. **Gossip messages** — Nodes share information about other nodes (PING/PONG)
2. **Configuration propagation** — Hash slot ownership changes
3. **Failure detection** — PFAIL/FAIL status propagation
4. **Voting** — During failover elections
5. **Replica synchronization** — Partial sync coordination

The cluster bus is **critical** for cluster operation — if the bus port is blocked by a firewall, nodes can't communicate and the cluster will fail.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q94. How do you handle failover in a Redis Sentinel setup?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Sentinel failover process:**

**1. Subjective Down (SDOWN):**
- A single Sentinel marks the primary as SDOWN if it's unreachable for `down-after-milliseconds`

**2. Objective Down (ODOWN):**
- Other Sentinels are queried
- If `quorum` number of Sentinels agree the primary is down → ODOWN

**3. Leader Election:**
- Sentinels vote to elect a **leader** to perform the failover
- The first Sentinel to reach `quorum` votes becomes leader

**4. Failover Execution:**
- Leader selects the **best replica** to promote (based on priority, replication offset, run ID)
- Leader sends `SLAVEOF NO ONE` to the chosen replica
- Leader reconfigures other replicas to follow the new primary
- Leader updates the **epoch** (version number for configuration)

**5. Client reconnection:**
- Clients should use Sentinel to discover the new primary
- `SENTINEL get-master-addr-by-name mymaster`

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q95. What is the difference between Redis `MULTI` and `Pipeline`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Aspect | MULTI/EXEC (Transaction) | Pipeline |
|--------|------------------------|----------|
| **Atomicity** | ✅ Yes — commands execute as a unit | ❌ No — commands may interleave with other clients |
| **Execution** | Server queues until EXEC, then runs all | Server processes immediately as received |
| **Errors** | Syntax errors reject entire batch; run-time errors don't stop others | Each command may fail independently |
| **Memory** | Server queues commands | Client queues commands (server processes immediately) |
| **Round trips** | 2 (MULTI + EXEC) plus N commands | 1 (all commands sent in batch) |
| **WATCH support** | ✅ Yes | ❌ No |

**Conclusion:**
- Use **Pipeline** when you need **performance** (independent commands, no atomicity needed)
- Use **MULTI/EXEC** when you need **atomicity** (critical operations, read-modify-write)
- Use **Pipeline + MULTI/EXEC** for the best of both worlds (atomic batch with a single round trip)

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q96. What is `RPOPLPUSH` and how is it used?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`RPOPLPUSH source destination` atomically removes the last element from `source` and pushes it to the start (left) of `destination`:

```bash
RPUSH queue "task1" "task2" "task3"
RPOPLPUSH queue processing_queue
# Returns "task3" (popped from queue)
# queue: ["task1", "task2"]
# processing_queue: ["task3"]
```

**Use case — Reliable Queue:**
1. Worker pops from the main queue and pushes to a processing queue (`RPOPLPUSH`)
2. After successful processing, the worker removes from the processing queue (`LREM`)
3. If the worker crashes, the task remains in the processing queue (can be retried)

`BRPOPLPUSH` is the **blocking version** — waits for an element if the queue is empty.

In Redis 7+, `BRPOPLPUSH` is deprecated in favor of `BLMOVE`:

```bash
BLMOVE queue processing_queue RIGHT LEFT 0
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q97. What is the `SORT` command in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

The `SORT` command sorts the elements of a List, Set, or Sorted Set:

```bash
RPUSH scores 50 30 80 10 60
SORT scores    # Returns [10, 30, 50, 60, 80]

# Descending
SORT scores DESC    # [80, 60, 50, 30, 10]

# Limit results
SORT scores LIMIT 0 3    # [10, 30, 50] (first 3)

# Sort by external keys (sorting by a related hash field)
SORT user:ids BY user:*->age GET user:*->name
```

**Advanced SORT (BY/GET):**
```bash
# Given user IDs: [1, 2, 3]
# And hashes: user:1 (name: "Alice", age: 30), user:2 (...)
SORT user:ids BY user:*->age GET user:*->name
# Returns user names sorted by age
```

> **Warning:** `SORT` can be slow on large datasets. Consider using Sorted Sets instead. `SORT` is being deprecated in Redis 7+ in favor of `SORT_RO` (read-only) and explicit data structure commands.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q98. What is the `GEOADD` command and how do you use Redis for geospatial queries?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Redis has built-in **geospatial** commands using Sorted Sets:

```bash
# Add locations
GEOADD cafes 13.361389 38.115556 "Palermo"    # longitude latitude name
GEOADD cafes 15.087269 37.502669 "Catania"

# Distance between two locations (km, m, mi, ft)
GEODIST cafes "Palermo" "Catania" km    # "166.27"

# Find locations within radius
GEORADIUS cafes 15 37 100 km
# Returns ["Catania", "Palermo"]

# Get coordinates
GEOPOS cafes "Palermo"    # ["13.361389", "38.115556"]

# Get geohash string
GEOHASH cafes "Palermo"   # "sqc8b49rny0"

# GEORADIUSBYMEMBER — radius from existing member
GEORADIUSBYMEMBER cafes "Palermo" 200 km
```

**Under the hood:** Geospatial indexes are stored as **Sorted Sets** with geohash-encoded scores. This means you can also use ZSET commands on geospatial data.

**Use cases:** Find nearby restaurants, ride-hailing dispatch, location-based recommendations.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q99. What is `MIGRATE` command in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`MIGRATE` **atomically moves a key** from one Redis instance to another:

```bash
# Move key 'mykey' to another Redis instance
MIGRATE 192.168.1.50 6379 mykey 0 5000 COPY REPLACE
```

**Arguments:**
- `host port` — Target Redis instance
- `key|""` — Key to migrate (or `""` with KEYS)
- `destination-db` — Database index on target
- `timeout` — Timeout in ms
- `COPY` — Keep the key on the source (don't delete)
- `REPLACE` — Replace key on target if it exists
- `KEYS key [key ...]` — Migrate multiple keys (Redis 3.0.6+)

**How it works:**
1. Source serializes the key (RDB format)
2. Sends data to target
3. Target acknowledges
4. Source deletes the key (unless COPY is specified)

**Use case:** Moving data between Redis instances, resharding in Cluster, zero-downtime data migration.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q100. What is the `DUMP` and `RESTORE` commands?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

- `DUMP key` — Serializes the key's value in Redis internal format (returns a binary string)
- `RESTORE key ttl serialized-value` — Creates a key from the serialized value

```bash
# On source server
DUMP user:42
# Returns: "\x00\x15user_data_here\x06\x00\x8f..."

# On target server (can be different Redis instance)
RESTORE user:42 0 "\x00\x15user_data_here\x06\x00\x8f..."
# TTL = 0 means no expiration (persistent key)
```

**Use cases:**
- **Key-level migration** — Move a single key without `MIGRATE`
- **Backup specific keys** — Dump important keys for safekeeping
- **Copy between environments** — Restore production data to staging

**Limitations:**
- `RESTORE` **replaces** existing keys (use `REPLACE` option)
- Format may differ between Redis versions (backward compatible within the same major version)
- Only works for a single key at a time

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q101. How does Redis handle `maxmemory` and what happens when it's reached?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

When Redis reaches the `maxmemory` limit:

1. **Writes** trigger eviction logic (reads still work fine)
2. Redis tries to evict keys based on the configured `maxmemory-policy`
3. If no keys can be evicted (noeviction policy) → write commands return an **error**

```bash
CONFIG SET maxmemory 1gb
CONFIG SET maxmemory-policy allkeys-lru
```

**Commands that can fail when memory is full:**
- All write commands (SET, LPUSH, SADD, HSET, etc.)
- `EXPIRE` (modifies TTL metadata)
- `RENAME`
- `GETSET` (modifies value)

**Commands that still work:**
- Read commands (GET, LRANGE, SMEMBERS, etc.)
- `DEL` (frees memory)
- `UNLINK` (non-blocking delete)
- `FLUSHDB`, `FLUSHALL` (clear all data)

**Monitoring:**
```bash
INFO stats
# evicted_keys: 1500    ← keys evicted since startup
```

A high or rapidly increasing `evicted_keys` count indicates the cache is too small or the eviction policy needs adjustment.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q102. What is `UNLINK` and how is it different from `DEL`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

- **`DEL key`** — Synchronously deletes the key (blocks until memory is freed)
- **`UNLINK key`** — Asynchronously deletes (unlinks) the key (returns immediately)

```bash
DEL bigkey       # Blocks Redis for potentially seconds
UNLINK bigkey    # Returns immediately, freed in background
```

**Why `UNLINK` exists:**
- Deleting a key with a large value (e.g., a List with millions of elements) can **block Redis** for seconds
- `UNLINK` performs the O(1) **unlinking** part (removing from keyspace) immediately
- The **actual memory reclamation** (O(N)) happens in a background thread

**When to use each:**
- `DEL` — Small keys, or when you want deterministic behavior
- `UNLINK` — Large keys (> 10,000 elements), or when you must avoid blocking

In Redis 6+, `FLUSHALL ASYNC` and `FLUSHDB ASYNC` use the same background thread approach.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q103. What is the purpose of `SCAN` and how does it work?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`SCAN` iterates over keys in the database **incrementally** without blocking Redis:

```bash
SCAN 0 MATCH user:* COUNT 100
# 1) "123"                      ← cursor for next call
# 2) 1) "user:42"               ← matching keys (up to 100)
#    2) "user:1001"
#    ...

SCAN 123 MATCH user:* COUNT 100  # Continue from cursor 123
# ... continues until cursor returns "0" (iteration complete)
```

**Key points:**
- **Non-blocking** — Only processes a small number of keys per call (unlike `KEYS`)
- **Cursor-based** — Returns a cursor to continue in the next call (cursor "0" = done)
- **Not guaranteed** to return all keys (keys added during iteration may be missed or duplicated)
- **Each call** guarantees about `COUNT` keys are checked (returned may be less)

**Type-specific variants:**
- `SSCAN key cursor [MATCH] [COUNT]` — Iterate Set members
- `HSCAN key cursor [MATCH] [COUNT]` — Iterate Hash fields
- `ZSCAN key cursor [MATCH] [COUNT]` — Iterate Sorted Set members

> **Always use `SCAN` instead of `KEYS` in production!**

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q104. What is the Redis `EVAL` command and how do you pass keys/args?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`EVAL script numkeys key [key ...] arg [arg ...]` executes a Lua script:

```bash
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey "hello"
```

**Key/arg convention:**
- `KEYS[1..N]` — Redis keys (required for Cluster compatibility)
- `ARGV[1..N]` — Additional arguments (non-key values)

```bash
EVAL "
  local current = redis.call('GET', KEYS[1])
  if not current then
    redis.call('SET', KEYS[1], ARGV[1])
    return ARGV[1]
  end
  return current
" 1 mykey "default_value"
```

**Why separate KEYS and ARGV?**
1. In Redis Cluster, the hash slot is computed from keys — Redis needs to know which keys are used
2. Documentation clarity — easier to understand which are keys vs values
3. Redis can optimize command routing in Cluster

**Available libraries in Redis Lua:**
- `redis.call()` — Returns error on failure
- `redis.pcall()` — Returns error object on failure (catchable)
- `redis.log()` — Write to Redis log
- `redis.sha1hex()` — SHA1 hash
- `redis.status_reply()`, `redis.error_reply()` — Create responses

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q105. What is the `SCRIPT LOAD` and `EVALSHA` commands?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

Instead of sending the full script source every time, you can **load** a script once and run it by its SHA1 hash:

```bash
# Load the script and get its SHA1 hash
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# Returns: "4e6d2e36c84283d7c9f8eef1e6f0e27c9f8eef12"

# Run by hash (much less bandwidth!)
EVALSHA 4e6d2e36c84283d7c9f8eef1e6f0e27c9f8eef12 1 mykey
```

**How scripts are cached:**
- Scripts are cached **forever** on the server (until SCRIPT FLUSH)
- Cached across all databases
- Script cache is **not persisted** (lost on restart) — clients must handle `NOSCRIPT` errors by falling back to `EVAL`
- Use `SCRIPT EXISTS [sha1 ...]` to check if scripts are cached

```javascript
// Pattern: Try EVALSHA first, fallback to EVAL
try {
  return await redis.evalsha(scriptHash, keys, args);
} catch (e) {
  if (e.code === 'NOSCRIPT') {
    return await redis.eval(scriptSource, keys, args);
  }
  throw e;
}
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q106. How do you handle Redis connection management from an application?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

**Best practices for Redis connection management:**

**1. Connection Pooling**
Use a connection pool to avoid creating/destroying connections frequently:

```javascript
// Node.js (ioredis)
const Redis = require('ioredis');
const redis = new Redis.Cluster([
  { host: '127.0.0.1', port: 7000 }
], {
  redisOptions: {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    retryStrategy(times) {
      return Math.min(times * 50, 2000); // Exponential backoff
    }
  }
});
```

**2. Handle Disconnections Gracefully**
Always implement reconnect logic:
- Use the client's built-in reconnect (most clients have it)
- Implement exponential backoff
- Log reconnection attempts
- Have a circuit breaker pattern for when Redis is down

**3. Use Separate Connections for Different Purposes**
```javascript
const cacheClient = new Redis({ port: 6379 });   // For cache operations
const pubClient = new Redis({ port: 6379 });     // For Pub/Sub
const subClient = pubClient.duplicate();          // For subscribing
```

**4. Set Reasonable Timeouts**
```javascript
const client = new Redis({
  connectTimeout: 10000,   // 10 seconds to connect
  commandTimeout: 5000,    // 5 seconds for commands
  keepAlive: 10000         // TCP keepalive every 10 seconds
});
```

**5. Monitor Connection Health**
```javascript
redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Connected to Redis'));
redis.on('ready', () => console.log('Redis ready'));
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q107. What is Redis `SUBSCRIBE` and `PSUBSCRIBE`?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

- **`SUBSCRIBE channel [channel ...]`** — Subscribe to one or more specific channels
- **`PSUBSCRIBE pattern [pattern ...]`** — Subscribe to channels matching a glob pattern

```bash
# Subscribe to specific channels
SUBSCRIBE news:tech news:sports

# Subscribe to patterns
PSUBSCRIBE news:*          # All news channels
PSUBSCRIBE user:*:profile  # All user profile channels
```

**Pattern matching rules:**
- `*` — Matches any number of characters
- `?` — Matches a single character
- `[abc]` — Matches any character in the set

**Unsubscribing:**
```bash
UNSUBSCRIBE news:tech      # Unsubscribe from one channel
UNSUBSCRIBE *              # Unsubscribe from all
PUNSUBSCRIBE news:*        # Unsubscribe from pattern
```

**Message format (SUBSCRIBE mode):**
```
1) "message"           or  "pmessage"
2) "news:tech"             "news:*"     (pattern matched)
3) "Hello!"               "news:tech"   (actual channel)
4)                          "Hello!"     (message)
```

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q108. What is the difference between `SUBSCRIBE` and `PSUBSCRIBE` in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

| Feature | SUBSCRIBE | PSUBSCRIBE |
|---------|-----------|------------|
| **Match type** | Exact channel name | Glob pattern |
| **Example** | `SUBSCRIBE news:tech` | `PSUBSCRIBE news:*` |
| **Performance** | Slightly faster | Slightly slower (pattern matching overhead) |
| **Memory** | One entry per subscribed channel | One entry per pattern (matches many channels) |
| **Flexibility** | Must list every channel | One pattern catch all matching channels |

```bash
# SUBSCRIBE: receive messages from these specific channels
SUBSCRIBE orders:create orders:update orders:delete

# PSUBSCRIBE: receive from any orders:* channel
PSUBSCRIBE orders:*
```

**When to use each:**
- `SUBSCRIBE` — Known, specific channels (orders:create, orders:update)
- `PSUBSCRIBE` — Dynamic channel names or wildcard subscriptions (user:123:activity)

> **Note:** A message that matches both a `SUBSCRIBE` and a `PSUBSCRIBE` will be received **twice** — once for each subscription type.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q109. What is the `PUBSUB` command used for?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`PUBSUB` is an introspection command for the Pub/Sub system:

```bash
# List active channels (channels with at least one subscriber)
PUBSUB CHANNELS
PUBSUB CHANNELS news:*       # Filter by pattern

# Count subscribers for specific channels
PUBSUB NUMSUB news:tech news:sports
# 1) "news:tech"   2) (integer) 3    # 3 subscribers
# 3) "news:sports" 4) (integer) 1    # 1 subscriber

# Count pattern subscriptions
PUBSUB NUMPAT
# (integer) 5    # 5 active PSUBSCRIBE patterns
```

**Use cases:**
- Monitoring Pub/Sub activity
- Debugging subscription leaks (unexpected growth)
- Capacity planning (determining fan-out)

> **Note:** `PUBSUB CHANNELS` without a pattern returns ALL active channels, which can be expensive with many channels.

</div>
</details>

<details class="qa-card qa-medium">
<summary>
Q110. What is the `WAIT` command in Redis?
<span class="qa-difficulty-badge medium">Medium</span>
</summary>

<div class="qa-answer">

`WAIT numreplicas timeout` blocks the current client until **at least** `numreplicas` replicas have acknowledged the preceding write commands:

```bash
SET critical_data "important"
WAIT 1 1000    # Wait for at least 1 replica to confirm, timeout 1000ms
```

**Return value:** The number of replicas that acknowledged within the timeout period.

```bash
WAIT 2 5000    # Returns: 2 (both replicas acked) or 1 (only one acked before timeout)
```

**Key points:**
- Only waits for writes that were executed **before** the `WAIT` command
- `WAIT` does **NOT** guarantee fully synchronous replication (it's "best effort")
- The `timeout` is per-write-group, not total time
- `WAIT 0 0` returns immediately with the current number of connected replicas
- Higher durability at the cost of higher latency

**Use case:** Ensuring critical data (payment transactions, audit logs) is replicated before proceeding.

</div>
</details>

---

## 🔴 Hard (Q111–Q155)

<details class="qa-card qa-hard">
<summary>
Q111. How does Redis's single-threaded event loop handle concurrency internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis uses the **ae event loop** (based on epoll/kqueue) with a **single thread** for command execution:

```
Client 1 → epoll → [SET key1 val1]
                     ↓
Client 2 → epoll → [GET key2]
                     ↓
Client 3 → epoll → [INCR counter]
```

**Architecture:**
1. **I/O multiplexing thread** (Redis 6+) — Handles socket reads/writes in background threads
2. **Main thread** — Executes commands sequentially from the queue
3. **Background threads** (Redis 4+) — Handle lazy freeing (UNLINK), AOF fsync, and close operations

**Why single-threaded is fast:**
- No context switching overhead
- No lock contention
- All data in CPU cache-friendly access patterns
- 99.9% of operations are pure memory operations
- Network I/O is offloaded to background threads (Redis 6+)

**Redis 6+ I/O threads:**
```
io-threads 4           # Number of I/O threads (default: 1 = no I/O threading)
io-threads-do-reads yes  # Also use threads for reads
```

I/O threads handle serialization/deserialization, but **command execution is always single-threaded**.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q112. What is the internal memory layout of a Redis String?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Strings use two possible internal encodings:

**1. `embstr` (Embedded String):**
- For strings up to **44 bytes** (Redis 7+) / **39 bytes** (earlier versions)
- String data is stored **contiguous** with the Redis object header
- Single memory allocation
- Cache-friendly (data and header in same cache line)
- **Read-only** — modifying requires conversion to raw

**2. `raw` (Raw String):**
- For strings > 44 bytes
- Two memory allocations (header + data buffer)
- Supports modifications (APPEND, SETRANGE, GETRANGE)
- Uses SDS (Simple Dynamic String) — prepends length + free space

```
embstr:  [robj | sdshdr | string data...]
raw:     [robj] → [sdshdr | string data...]
```

**SDS (Simple Dynamic String):**
```c
struct sdshdr {
    int len;      // String length
    int free;     // Available free space
    char buf[];   // Character array
};
```

SDS is **binary-safe** (can contain null bytes), tracks its own length (O(1) STRLEN), and pre-allocates space for growth.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q113. How does Redis handle memory defragmentation?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Automatic memory defragmentation** (Redis 4+, experimental):

```bash
# Configuration
activedefrag yes                          # Enable auto defragmentation
active-defrag-ignore-bytes 100mb          # Start if RSS > allocated by 100MB
active-defrag-threshold-lower 10          # Start if fragmentation > 10%
active-defrag-threshold-upper 100         # Stop if fragmentation > 100%
active-defrag-cycle-min 5%                # Minimum CPU time spent
active-defrag-cycle-max 75%               # Maximum CPU time spent
```

**How it works:**
1. `jemalloc` (the default allocator) supports **jemalloc arenas**
2. Redis's defragmentation thread moves allocations to compact them
3. It runs in the **background** (not in the main event loop)
4. The defrag thread does the work, main thread is not blocked

**Manual defragmentation:**
```bash
MEMORY PURGE    # Ask allocator to reclaim memory (may not always help)
```

**Preventing fragmentation:**
- Use consistent key sizes where possible
- Avoid frequent creation/deletion of varying-size keys
- Pre-allocate strings with `APPEND` or `SETRANGE` during initialization
- Monitor fragmentation ratio and restart if > 1.5

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q114. What are the internals of Redis Sorted Sets (Skip Lists)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Sorted Sets use two data structures internally:

**1. Skip List (primary structure):**
- A **probabilistic** data structure — O(log N) average for insert/delete/search
- Multiple layers of linked lists, each layer skipping more elements
- The bottom layer contains all elements in sorted order
- Higher layers act as "express lanes"

```
Skip List (conceptual):
Level 3:  1 -------------------------→ 9
Level 2:  1 -----------→ 5 ---------→ 9
Level 1:  1 ---→ 3 ---→ 5 ---→ 7 ---→ 9
Level 0:  1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
```

**2. Hash Table (complementary structure):**
- Maps member → score for O(1) score lookups
- Used by `ZSCORE` command
- Kept in sync with the skip list

**Why skip list instead of balanced tree?**
- Simpler to implement
- No rebalancing required
- Good performance with concurrent modifications (not that Redis needs it — single-threaded!)
- Average O(log N) performance for all operations
- Range queries (ZRANGE, ZREVRANGE) are efficient

**Small Sorted Sets** (≤ 128 entries, entries ≤ 64 bytes) use **ziplist encoding** instead — no skip list overhead. Use `OBJECT ENCODING key` to check.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q115. How does Redis handle cross-slot operations in Cluster mode?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Limitation:** Redis Cluster does NOT allow operations involving keys in different hash slots (unless they share a hash tag).

```bash
# These work (same slot with hash tag)
MSET {user:1001}:name "Alice" {user:1001}:email "alice@example.com"
MGET {user:1001}:name {user:1001}:email

# These fail with CROSSSLOT error (different slots)
MSET user:1001:name "Alice" user:1002:name "Bob"
# (error) CROSSSLOT keys in request don't hash to the same slot
```

**Workarounds for cross-slot operations:**

**1. Hash tags** — Force keys to the same slot:
```bash
{user:1001}:name    # All these share slot based on "user:1001"
{user:1001}:email
```

**2. Multi-key operations via Lua scripts** — Can access keys in different slots IF they use hash tags:
```lua
-- Still limited: KEYS must share the same hash slot in Cluster
EVAL "..." 2 {user:1001}:name {user:1001}:email
```

**3. Client-side multi-get** — Send individual commands to the right nodes:
```javascript
// Client calculates which node has which key
const node1Keys = ['user:1001:name', 'user:1001:email'];  // Node A
const node2Keys = ['user:2002:name'];                      // Node B

// Parallel requests to each node
const [result1, result2] = await Promise.all([
  node1.mget(node1Keys),
  node2.get(node2Keys)
]);
```

**4. Redis Cluster proxy** — Some proxies (like `redis-cluster-proxy` or Envoy) can handle cross-slot operations transparently.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q116. What is the consistency model of Redis?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis provides **eventual consistency** with **weak consistency** guarantees:

**Single instance:**
- **Strong consistency** within a single Redis instance (single-threaded, sequential execution)
- All clients see operations in the same order (total order)

**With replication (default async):**
- **Eventual consistency** — replicas converge to the same state over time
- Primary acknowledges writes before replicas receive them
- If primary crashes, recently acknowledged writes may be lost

**With WAIT command:**
- **Per-write synchronization** — `WAIT` blocks until replicas confirm
- Still not fully synchronous (can timeout, partial acknowledgment)

**With Sentinel/Cluster failover:**
- **No strong consistency** during failover:
  - Split-brain possible (two primaries briefly)
  - Writes to the old primary after a partition may be lost
  - Asynchronous replication means the promoted replica may miss the latest writes

**Redis trade-off:**
```
Consistency ← weak      Redis (AP system in CAP)
Availability ← strong   Redis (always available for reads/writes)
Partition tolerance  ← strong (Cluster handles partitions)
```

**Best practices:**
- Use `WAIT` for critical writes
- Understand that Redis is not a strongly consistent database
- Design applications assuming potential data loss during failures

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q117. How does Redis handle split-brain scenarios?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Split-brain** occurs when a network partition causes two nodes to believe they are the primary.

**In Redis Sentinel:**
- Sentinel uses **quorum** and **majority** to prevent split-brain
- A primary is only failed over if `quorum` Sentinels agree it's down
- If the original primary can't communicate with the majority of Sentinels, it won't accept writes (if `min-replicas-to-write` is configured)
- After failover, the old primary becomes a replica (but partition may prevent this)

**Prevention with `min-replicas-to-write`:**
```bash
# In redis.conf
min-replicas-to-write 1   # Stop accepting writes if < 1 replica connected
min-replicas-max-lag 10   # Replica must be within 10 seconds of primary
```

This ensures that during a partition, a primary isolated from its replicas stops accepting writes, reducing the chance of split-brain.

**In Redis Cluster:**
- Cluster uses **gossip protocol** with **node timeout** for failure detection
- A partition causes some nodes to be unreachable
- Nodes from the majority partition continue operating
- Nodes in the minority partition stop accepting writes
- Automatic failover only occurs if the replica is from the **majority partition**

**Post-split-brain recovery:**
- Redis has **no automatic conflict resolution**
- Manual intervention may be needed to pick the "winning" dataset
- Using `REPLICAOF NO ONE` and `REPLICAOF` commands

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q118. How do you benchmark Redis performance?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis includes the **`redis-benchmark`** tool:

```bash
# Basic benchmark (100k requests, 50 parallel connections)
redis-benchmark -h 127.0.0.1 -p 6379 -n 100000 -c 50

# Test specific commands
redis-benchmark -t SET,GET -n 100000

# Test with pipelining
redis-benchmark -t SET,GET -P 16     # Pipeline 16 commands

# Test with 1KB payloads
redis-benchmark -t SET -d 1000

# Test with range of loads
redis-benchmark -n 10000 -c 10 -c 50 -c 100 -c 500

# Single-threaded benchmark (no parallelism)
redis-benchmark -t SET -c 1
```

**Sample output:**
```
====== SET ======
  100000 requests completed in 1.24 seconds
  50 parallel clients
  3 bytes payload
  keep alive: 1

99.68% <= 1 milliseconds
80645.16 requests per second
```

**Key metrics:**
- **Requests per second** — throughput (higher is better)
- **Latency percentiles** — P50, P99, P999 (lower is better)
- **Pipeline factor** — how much pipelining improves throughput

**Real-world benchmarking tips:**
- Test with **production-like data sizes** and patterns
- Test from a **separate machine** (not localhost)
- Test with your **actual client library** (differences matter)
- Test **network latency** impact with `redis-cli --latency`
- Monitor server resources during benchmark (`redis-cli INFO stats`)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q119. What is Redis pipelining and how do you calculate the optimal pipeline size?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Pipeline performance depends on network latency and command count:**

**Calculation:**
```
Without pipeline: Total = N × RTT
With pipeline: Total = RTT + (N / throughput)

Where:
- RTT = network round-trip time (e.g., 1ms for localhost, 50ms for cloud)
- N = number of commands
- throughput = Redis's max ops/sec (~100k for localhost)
```

**Example (1000 commands, localhost RTT = 1ms, throughput = 100k/s):**
- Without pipeline: 1000 × 1ms = **1000ms**
- With pipeline: 1ms + (1000 / 100000) = **11ms** (90x faster!)

**Optimal pipeline size:**
- Too small (< 10): Doesn't maximize throughput
- Too large (> 1000): Consumes client memory waiting for all responses
- **Recommended: 50-100 commands per pipeline batch**

```javascript
async function bulkInsert(data) {
  const pipeline = redis.pipeline();
  for (const item of data) {
    pipeline.set(`key:${item.id}`, JSON.stringify(item));
  }
  const results = await pipeline.exec(); // Sends all at once
  return results;
}

// For very large datasets, batch in chunks of 100
async function bulkInsertBatched(data) {
  for (let i = 0; i < data.length; i += 100) {
    const batch = data.slice(i, i + 100);
    const pipeline = redis.pipeline();
    batch.forEach(item => pipeline.set(`key:${item.id}`, JSON.stringify(item)));
    await pipeline.exec();
  }
}
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q120. How does Redis Cluster handle resharding?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Cluster supports **online resharding** (moving hash slots between nodes) without downtime:

```bash
# Start resharding
redis-cli --cluster reshard host:port

# Reshard options
redis-cli --cluster reshard 127.0.0.1:7000 \
  --cluster-from <node-id> \
  --cluster-to <node-id> \
  --cluster-slots 1000 \
  --cluster-yes
```

**How resharding works internally:**

1. **Slot planning** — Administrator decides how many slots to move and where
2. **Source node** — Marks the slot as **MIGRATING** (still accepts reads/writes)
3. **Target node** — Marks the slot as **IMPORTING** (not yet serving)
4. **Key migration** — For each key in the slot:
   - `MIGRATE` command moves the key atomically
   - Source keeps the key (but marks it as "moved")
5. **Client redirects** — After migration:
   - Source returns `ASK` redirect to clients querying the slot
   - Clients use `ASKING` command before accessing the target
6. **Slot assignment** — Once all keys are moved, the slot is reassigned to the target
7. **Gossip propagation** — Slot map updates propagate via gossip protocol

**Zero-downtime resharding:**
- Reads/writes continue during the process
- `ASK` redirects are transparent to cluster-aware clients
- Multi-key operations may temporarily fail if keys from a slot being migrated are involved

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q121. How does Redis Cluster handle network partitions (split-brain)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Cluster handles network partitions using the **Node Timeout** mechanism:

**Scenario: 6-node cluster (3 primaries, 3 replicas), partition splits into two groups:**

**Majority Partition (e.g., 4 nodes):**
- Cluster continues operating normally
- Detects minority nodes as failed
- Promotes replicas if primaries are in minority partition

**Minority Partition (e.g., 2 nodes):**
- Nodes can't reach the majority
- After `node-timeout`, the cluster is marked as **FAIL**
- Primaries in the minority partition **stop accepting writes**
- This prevents split-brain writes

**Configuration:**
```bash
cluster-node-timeout 15000   # 15 seconds node timeout
cluster-slave-validity-factor 10  # Replica validity factor
```

**What happens:**
1. Partition occurs at T=0
2. At T=15s (node-timeout), minority nodes mark majority as FAIL
3. Minority primaries **reject writes** with `CLUSTERDOWN` error
4. Majority partition continues, promoting replicas as needed
5. When partition heals, minority nodes reconnect and synchronize
6. Minority nodes that accepted writes are rolled back (they didn't accept any, because writes were rejected)

> **Key safety:** Cluster sacrifices availability during partitions to prevent data inconsistency. This makes Redis Cluster a **CP system** during partitions (consistent but unavailable in the minority partition).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q122. How does Redis implement transactions? Why no rollback?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Redis transaction implementation:**
```
MULTI → commands queued → EXEC
```

**Why no rollback:**

Redis transactions differ from SQL transactions. The rationale:

1. **Redis commands rarely fail at runtime** — Syntax errors are caught at queue time (MULTI + command + EXEC fails the whole batch). Runtime errors are rare (e.g., type mismatch).

2. **Rollback would require undo logic** — Tracking every modification to revert it adds complexity and overhead that goes against Redis's simplicity philosophy.

3. **Lua scripts are the preferred alternative** — For complex operations, use Lua. If you need rollback, implement it in the script.

**What errors CAN happen at runtime (no rollback):**
```bash
MULTI
SET key "hello"
LPUSH key "world"   # Runtime error! Cannot LPUSH a string
SET other "data"
EXEC
# Result: SET succeeded, LPUSH failed, SET succeeded
```

**Behavior:**
- If EXEC itself fails (e.g., OOM or replication issues): **nothing executes**
- If a queued command fails (e.g., type mismatch): **only that command fails, others succeed**
- There is NO transaction rollback

**Best practices:**
- Validate data types before transactions
- Use Lua scripts for complex multi-step operations
- Use WATCH + retry pattern for read-modify-write scenarios

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q123. How does Redis handle large binary data (e.g., images, files)?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Strings can hold up to **512 MB** — theoretically you can store binary data, but:

**Best practices for large values:**

**1. Don't store files > 100KB in Redis directly**
- Large values consume significant memory bandwidth
- Slow to serialize/deserialize
- Slow to replicate across replicas
- Can block the event loop (one large GET takes microseconds longer)

**2. Store metadata in Redis, content in blob storage**
```bash
# Redis: store reference to S3/file path
HSET file:abc123 \
  name "photo.jpg" \
  bucket "my-bucket" \
  key "uploads/photo.jpg" \
  size 5242880 \
  content_type "image/jpeg"

# Content stored in S3, GCS, or local filesystem
```

**3. Chunk large data across multiple keys**
```bash
# Split a large value into 1MB chunks
SET file:abc123:chunk:0 <1MB of data>
SET file:abc123:chunk:1 <1MB of data>
# ... retrieve with MGET and reassemble client-side
```

**4. Use `SETRANGE` and `GETRANGE` for stream processing**
```bash
# Append chunks without loading the entire value
SETRANGE file:abc123 0 <first chunk>
SETRANGE file:abc123 1048576 <second chunk>
```

**Why not to store large values:**
- Doubles memory temporarily during replication (parent and child during BGSAVE)
- Slows down RDB snapshots (fork + copy-on-write for large pages)
- Slows down AOF rewrites
- Cluster rebalancing is slower
- Network bandwidth becomes bottleneck

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q124. What is Redis ACL (Access Control List) and how does it work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**ACL (Access Control List)** was introduced in Redis 6 for granular user permissions:

```bash
# Create a user with password
ACL SETUSER alice on >alice_password

# Grant specific command access
ACL SETUSER alice +GET +SET +MGET

# Grant command category access
ACL SETUSER alice +@read +@write

# Restrict key access to a pattern
ACL SETUSER alice ~users:* ~cache:*

# Deny specific dangerous commands
ACL SETUSER alice -FLUSHALL -FLUSHDB -KEYS -CONFIG

# Create a read-only user
ACL SETUSER readonly on >readonly_pass +@read ~*

# Create a user with all permissions except admin
ACL SETUSER developer on >dev_pass +@all -@dangerous ~*

# List users
ACL LIST

# Get user info
ACL GETUSER alice

# Test authentication
AUTH alice alice_password
```

**Default user:**
- The default user (`default`) has all permissions
- In Redis 6, `protected-mode` and requiring password for the default user is recommended

**ACL Categories:**
| Category | Commands |
|----------|----------|
| `@read` | GET, LRANGE, SMEMBERS, etc. |
| `@write` | SET, LPUSH, SADD, etc. |
| `@admin` | CONFIG, FLUSHALL, SHUTDOWN, etc. |
| `@dangerous` | FLUSHALL, DEBUG, SHUTDOWN |
| `@fast` | O(1) commands |
| `@slow` | O(N) or heavier commands |
| `@connection` | AUTH, PING, SELECT, QUIT |

**ACL persistence:**
ACL rules are persisted in `acl.conf` (separate from `redis.conf`). Use `ACL SAVE` to persist manually.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q125. How does Redis Cluster's gossip protocol work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Cluster nodes communicate using a **gossip protocol** on the cluster bus port (base port + 10000):

**Gossip message content:**
Each node periodically sends:
- Its own information (node ID, IP, port, role, slot range, etc.)
- A **sample** of other nodes it knows about (2-3 nodes per message)
- PFAIL/FAIL flags for suspected/failed nodes

**Gossip interval:**
- **PING** — Every `cluster-node-timeout / 10` to a random node (`~1.5s` with default 15s timeout)
- **PONG** — Response to PING (also sent when a node's state changes)

**Failure detection flow:**
```
Node A can't reach Node B
    ↓
After timeout: Node A marks B as PFAIL (possibly failed)
    ↓
Node A gossips B's PFAIL status to other nodes
    ↓
If majority of primaries report B as PFAIL:
    → B is marked FAIL (globally)
    ↓
Replicas of B initiate failover
```

**Gossip advantages:**
- **Decentralized** — No single point of failure
- **Scalable** — Each node only communicates with a subset
- **Self-healing** — Nodes discover each other automatically
- **Convergent** — All nodes eventually learn about all changes

**Gossip limitations:**
- **Eventual consistency** — It takes time for all nodes to learn about changes
- **Bandwidth overhead** — Each message contains extra node information
- Messages can be large in clusters with many nodes (fixed by sampling)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q126. What is Redis `CLUSTER` command set and what can you do with it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The `CLUSTER` command group manages Redis Cluster:

```bash
# Cluster information
CLUSTER INFO              # Cluster state, size, slots assigned
CLUSTER NODES             # All nodes (ID, IP, role, slots, flags)
CLUSTER SLOTS             # Slot-to-node mapping (for client initialization)

# Node management
CLUSTER MEET host port    # Add a node to the cluster
CLUSTER FORGET node-id    # Remove a node
CLUSTER REPLICATE node-id # Make current node a replica of node-id
CLUSTER REPLICAS node-id  # List replicas of a node
CLUSTER COUNT-FAILURE-REPORTS node-id  # Failure reports count

# Slot management
CLUSTER ADDSLOTS slot [slot ...]          # Assign slots to current node
CLUSTER DELSLOTS slot [slot ...]          # Remove slots from current node
CLUSTER SETSLOT slot NODE node-id          # Assign a slot to a node
CLUSTER SETSLOT slot MIGRATING node-id    # Mark slot as migrating
CLUSTER SETSLOT slot IMPORTING node-id    # Mark slot as importing
CLUSTER SETSLOT slot STABLE              # Cancel migration/import
CLUSTER KEYSLOT key                       # Get hash slot for a key
CLUSTER COUNTKEYSINSLOT slot              # Count keys in a slot
CLUSTER GETKEYSINSLOT slot count          # Get keys in a slot

# Failover
CLUSTER FAILOVER [FORCE|TAKEOVER]        # Trigger manual failover
CLUSTER SET-CONFIG-EPOCH epoch           # Set config epoch (bootstrap)

# Node reset
CLUSTER RESET [HARD|SOFT]               # Reset node (for re-clustering)
```

**Example: Query which slot a key belongs to:**
```bash
CLUSTER KEYSLOT user:1001
# (integer) 14523
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q127. What are the limitations of Redis Cluster?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**1. Multi-key operations limited to same hash slot**
- `MGET`, `MSET`, transactions, Lua scripts with multiple keys only work if keys share a slot
- Solution: Use hash tags `{key}`, or perform client-side multi-node commands

**2. Single database**
- Only database 0 is available (SELECT is not supported)
- No namespace isolation within a single cluster

**3. No cross-slot transactions**
- `MULTI/EXEC` with keys in different slots fails
- Lua scripts with `KEYS` in different slots fail

**4. Client must be cluster-aware**
- Clients must handle `MOVED` and `ASK` redirections
- Client must maintain slot-to-node mapping (or use a proxy)
- Not all Redis clients support Redis Cluster

**5. Larger minimum node count for HA**
- Minimum 3 nodes for basic cluster, 6 for high availability (3 primaries + 3 replicas)

**6. Increased latency**
- Multi-hop queries (client → wrong node → redirected → correct node)
- Gossip protocol bandwidth overhead

**7. No guarantee of strong consistency during failover**
- Asynchronous replication means promoted replica may miss writes
- Writes to the old primary after partition may be lost

**8. Limited publisher/subscriber**
- `PUBLISH` is forwarded to all nodes, but subscribers on any node can receive messages
- Works but not as efficient as single-instance

**9. No automatic rebalancing**
- Resharding is manual (redis-cli --cluster reshard)
- Hash tags can create hot spots if not designed carefully

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q128. How do you troubleshoot Redis latency spikes?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Step-by-step troubleshooting approach:**

**1. Check if it's the network**
```bash
# From application server
redis-cli --latency -h <redis-host> -p <redis-port>
# min: 0, max: 5, avg: 0.87 (milliseconds)
redis-cli --latency-history -h <redis-host> -p <redis-port> -i 5
```

**2. Check for slow commands**
```bash
SLOWLOG GET 20
```

**3. Check for fork() delays**
```bash
# Check last fork time
INFO persistence
# latest_fork_usec: 15234   # 15ms fork — if > 100ms, may cause latency
```

**4. Check if AOF fsync is causing delays**
```bash
INFO persistence
# aof_delayed_fsync: 0   # If > 0, fsync is struggling
```

**5. Check for swap usage**
```bash
INFO memory
# used_memory_swap: 0   # If > 0, Redis is swapping — BAD
```

**6. Check for eviction**
```bash
INFO stats
# evicted_keys: 1500   # High eviction causes latency
```

**7. Check fork child progress**
```bash
INFO persistence
# bgsave_in_progress: 1   # BGSAVE running — may cause latency
```

**8. Use LATENCY DOCTOR**
```bash
LATENCY DOCTOR
# Provides automated diagnosis
```

**9. Common causes:**
- **Fork:** `BGSAVE` or `BGREWRITEAOF` can cause 10-100ms pauses (fork copies page tables)
- **Transparent Huge Pages (THP):** Disable THP on Linux (`echo never > /sys/kernel/mm/transparent_hugepage/enabled`)
- **AOF fsync with `always`:** Slow on spinning disks
- **Swap:** If Redis touches memory in swap, it pauses
- **Network:** Congestion, packet loss, bandwidth saturation
- **Slow commands:** `KEYS *`, `SMEMBERS` on large sets, `SORT` on large lists

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q129. What is Redis Stack?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Redis Stack** is a suite of Redis modules providing additional data structures and capabilities:

```bash
# Install Redis Stack (includes all modules)
# Or add modules to existing Redis
```

**Modules included:**

**1. RediSearch** — Full-text search and secondary indexing
```bash
FT.CREATE idx ON HASH PREFIX 1 doc: SCHEMA title TEXT WEIGHT 5.0 body TEXT
FT.SEARCH idx "hello world" LIMIT 0 10
FT.AGGREGATE idx "*" GROUPBY 1 @category REDUCE COUNT 0 AS num
```

**2. RedisJSON** — Native JSON document storage
```bash
JSON.SET doc:1 $ '{"name":"Alice","age":30,"address":{"city":"NYC"}}'
JSON.GET doc:1 $.address.city        # "NYC"
JSON.ARRAPPEND doc:1 $.tags "redis"
```

**3. RedisTimeSeries** — Time-series data (IoT, finance, metrics)
```bash
TS.CREATE sensor:temp RETENTION 86400000
TS.ADD sensor:temp 1700000000 25.5
TS.RANGE sensor:temp 1700000000 1700001000 AGGREGATION avg 60000
```

**4. RedisBloom** — Probabilistic data structures (Bloom filters, Cuckoo filters, Count-Min Sketch, Top-K)
```bash
BF.ADD bloomfilter user:1001
BF.EXISTS bloomfilter user:1002   # Might return false positive
CMS.INCRBY counters user:1001 1
TOPK.ADD trending "topic1" "topic2"
```

**Use cases:**
- Full-text search without Elasticsearch
- JSON document store (like MongoDB basics)
- Time-series data (IoT sensor data, financial data)
- Probabilistic data structures (deduplication, trending topics)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q130. How does RediSearch work under the hood?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**RediSearch** provides secondary indexing and full-text search on top of Redis Hashes:

**Indexing:**
1. You define a schema — which fields to index and how (TEXT, TAG, NUMERIC, GEO)
2. RediSearch maintains **inverted indexes** for TEXT fields
3. TAG fields get simple indexes (exact match, no stemming)
4. NUMERIC and GEO fields get range-indexed structures

**Search process:**
```bash
# Define index
FT.CREATE products_idx ON HASH PREFIX 1 product: \
  SCHEMA name TEXT WEIGHT 5.0 \
         description TEXT \
         price NUMERIC \
         category TAG \
         location GEO

# Search
FT.SEARCH products_idx "wireless mouse" \
  FILTER price 10 100 \
  SORTBY price DESC \
  LIMIT 0 10
```

**Internal architecture:**
- **Inverted index** — Maps terms to document IDs (like Lucene)
- **Trie** (prefix tree) — For fast prefix searches with `*` wildcard
- **Numeric ranges** — Tree-based structure for numeric filters
- **Auto-complete** — Sorted suggestions with scores

**Performance:**
- Indexing speed: ~2M documents/sec (on modern hardware)
- Search latency: single-digit milliseconds for typical queries
- Memory overhead: ~1.5x-2x the data size for the index

**Use cases:**
- Product catalog search
- Log analysis
- Auto-complete / suggest
- Geo-search within certain bounds

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q131. What is the difference between `SAVE` and `BGSAVE`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Both create RDB snapshots, but differently:

| Feature | SAVE | BGSAVE |
|---------|------|--------|
| **Blocking** | ✅ Blocks Redis until complete | ❌ Background fork, non-blocking |
| **Method** | Direct synchronous save | Fork + child process save |
| **Memory** | No extra memory | copy-on-write (may use extra memory) |
| **Speed** | Fast (no fork overhead) | Fork takes time (usually 10-100ms) |
| **Use case** | Emergency shutdown, low-RAM scenarios | Normal scheduled backups |

```bash
SAVE     # Redis is completely blocked until done
BGSAVE   # Returns "Background saving started"

INFO persistence
# rdb_bgsave_in_progress: 1
# rdb_last_bgsave_status: ok
```

**When SAVE is used automatically:**
- When Redis is shut down (`SHUTDOWN` command performs a `SAVE` if AOF is not enabled)
- When `save ""` is not configured (default config has save points)

**When BGSAVE is triggered:**
- Automatic save points (e.g., `save 900 1`)
- Manual `BGSAVE` command
- Before `REPLICAOF` sync (diskless or disk-based)

**Fork overhead:**
- Fork copies the **page table** (not the data itself)
- Time is proportional to **memory size** (not data size)
- Example: A 10GB Redis instance may take ~50-200ms to fork
- This is a common source of latency spikes (mitigated by: disable THP, use enough CPU, schedule BGSAVE during low traffic)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q132. How does copy-on-write (COW) work during Redis BGSAVE?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

When `BGSAVE` (or `BGREWRITEAOF`) is triggered, Redis calls `fork()`:

**Copy-on-Write (COW) mechanism:**

1. **Before fork:**
   - Parent process has all data in memory pages
   
2. **During fork:**
   - OS creates a child process
   - Child shares the **same memory pages** with parent (no copy yet)
   - The **page table** is copied (sized to virtual memory usage, not data size)
   
3. **After fork:**
   - Child starts writing data to disk (RDB file or AOF temp file)
   - Parent continues serving requests
   
4. **When parent modifies data:**
   - OS detects a write to a shared page
   - OS **copies** the page (original stays for child, parent gets a new copy)
   - This is "copy-on-write" — pages are only duplicated when modified

```
Before fork:
Parent: [page1][page2][page3][page4]  → physical memory

After fork:
Parent → [page1][page2][page3][page4]  → physical memory (same pages)
Child  → [page1][page2][page3][page4]  → physical memory (same pages)

After parent modifies page2:
Parent → [page1][page2'][page3][page4] → physical memory (page2 copied)
Child  → [page1][page2][page3][page4]  → physical memory (original page2)
```

**COW memory overhead:**
- How much memory increases during BGSAVE depends on **write rate**
- High write rate → more pages modified → more memory copied
- Can cause **memory usage to double** during heavy writes + BGSAVE
- Monitor `INFO memory: used_memory_overhead`

**Best practice:**
- Schedule BGSAVE during low-write periods
- Set `maxmemory` lower if BGSAVE memory spikes are an issue
- Consider diskless replication for replicas (no RDB on disk)
- Use enough memory headroom (20-50% free memory recommended)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q133. How does Redis handle large List operations internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis Lists are stored as **quicklists** — a linked list of **ziplists**:

**Quicklist structure:**
```
quicklist → [ziplist: 10 elements] ↔ [ziplist: 10 elements] ↔ [ziplist: 10 elements]
```

**Why quicklist?**
- **Linked list** alone: O(1) push/pop but memory-heavy (each node has forward/back pointers)
- **Ziplist** alone: Memory-efficient but O(N) for insert/delete in middle
- **Quicklist** combines both: Memory-efficient + fast push/pop

**Configuration:**
```bash
list-max-ziplist-size -2   # Each ziplist's max size (negative = power of 2 KB)
                            # -2 = 8KB per ziplist (default)
list-compress-depth 0       # 0 = no compression
                            # 1 = compress all but first/last ziplist
```

**Operations:**
- **LPUSH/RPUSH:** O(1) — push to head/tail ziplist
- **LPOP/RPOP:** O(1) — pop from head/tail ziplist
- **LINDEX:** O(N) — traverse through ziplists to find the element
- **LREM:** O(N) — remove elements matching value
- **LTRIM:** O(N) — remove elements outside range (may delete entire ziplists)

**Memory optimization:**
- `list-compress-depth`: Compresses middle ziplists (not recently accessed) using **LZF compression**
- For queues where only ends are accessed, compression can save significant memory

```bash
OBJECT ENCODING mylist   # "quicklist"
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q134. What is the difference between Redis `ZRANGE`, `ZREVRANGE`, and `ZRANGEBYSCORE`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

| Command | Returns | Order | By |
|---------|---------|-------|----|
| `ZRANGE key start stop` | Members at rank positions | Ascending score | Rank (0-based index) |
| `ZREVRANGE key start stop` | Members at rank positions | Descending score | Rank (0-based index) |
| `ZRANGEBYSCORE key min max` | Members with scores in range | Ascending score | Score range |
| `ZREVRANGEBYSCORE key max min` | Members with scores in range | Descending score | Score range |

```bash
ZADD scores 10 "Alice" 20 "Bob" 30 "Charlie" 40 "Diana" 50 "Eve"

# By rank (position)
ZRANGE scores 0 2           # Alice, Bob, Charlie (1st to 3rd)
ZREVRANGE scores 0 2         # Eve, Diana, Charlie (top 3)

# By score
ZRANGEBYSCORE scores 20 40  # Bob, Charlie, Diana
ZREVRANGEBYSCORE scores 40 20  # Diana, Charlie, Bob

# With scores
ZRANGE scores 0 -1 WITHSCORES   # All members with scores
```

**In Redis 6.2+** these are unified:
```bash
ZRANGE scores 0 -1 BYSCORE     # Same as ZRANGEBYSCORE (unified syntax)
ZRANGE scores +inf -inf BYSCORE REV   # Descending by score
```

**Use cases:**
- `ZRANGE` — Paginating leaderboards (page 1, page 2)
- `ZRANGEBYSCORE` — People with scores between X and Y
- `ZREVRANGE` — Top 10 leaderboard

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q135. How does Redis handle `BITOP` operations on Bitmaps?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`BITOP` performs bitwise operations on Bitmap strings:

```bash
BITOP AND result bitmap1 bitmap2   # Bitwise AND
BITOP OR result bitmap1 bitmap2    # Bitwise OR
BITOP XOR result bitmap1 bitmap2   # Bitwise XOR
BITOP NOT result bitmap1           # Bitwise NOT (single key only)
```

**Internal behavior:**
- Operates on **String values** (treats strings as bit arrays)
- Shorter strings are treated as having zero bits beyond their length
- Result is stored in a new key (destination)
- Returns the size of the longest input string

**Example — Daily active users:**
```bash
# Day 1: users 1, 3, 5 active
SETBIT active:2024-01-01 1 1
SETBIT active:2024-01-01 3 1
SETBIT active:2024-01-01 5 1

# Day 2: users 2, 3, 4 active
SETBIT active:2024-01-02 2 1
SETBIT active:2024-01-02 3 1
SETBIT active:2024-01-02 4 1

# Users active both days (AND)
BITOP AND both_days active:2024-01-01 active:2024-01-02
BITCOUNT both_days        # Returns 1 (only user 3)

# Users active on either day (OR)
BITOP OR either_day active:2024-01-01 active:2024-01-02
BITCOUNT either_day       # Returns 5 (users 1,2,3,4,5)
```

**Performance:**
- `BITOP` is O(N) — it processes EVERY bit in the strings
- For large bitmaps (millions of bits), `BITOP` can be slow
- Consider using a Lua script for complex bit operations
- For millions of users, Bitmaps use very little memory (1M users = 125KB)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q136. How does Redis handle time-series data?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Native approaches (without RedisTimeSeries module):**

**1. Sorted Sets by timestamp:**
```bash
# Store sensor readings with timestamp as score
ZADD sensor:temp 1700000000 "25.5"
ZADD sensor:temp 1700000060 "25.8"
ZADD sensor:temp 1700000120 "26.1"

# Query by time range
ZRANGEBYSCORE sensor:temp 1700000000 1700001000 WITHSCORES

# Get count of readings
ZCARD sensor:temp
```

**2. Streams (Redis 5+):**
```bash
XADD sensor:temp * sensor_id "s1" value 25.5
XADD sensor:temp * sensor_id "s1" value 25.8

# Range query
XRANGE sensor:temp 1700000000000-0 1700001000000-0

# Trim to keep only last 10000 entries
XADD sensor:temp MAXLEN ~ 10000 * sensor_id "s1" value 26.1
```

**3. RedisTimeSeries module (Redis Stack):**
```bash
TS.CREATE sensor:temp RETENTION 86400000  # Keep 24 hours
TS.CREATE sensor:humidity RETENTION 86400000

TS.ADD sensor:temp * 25.5
TS.ADD sensor:temp * 25.8

# Aggregated query (average per minute)
TS.RANGE sensor:temp 1700000000 1700001000 \
  AGGREGATION avg 60000

# Downsampling rules
TS.CREATERULE sensor:temp sensor:temp:1h \
  AGGREGATION avg 3600000
```

**Comparison:**
| Approach | Pros | Cons |
|----------|------|------|
| Sorted Sets | Simple, native | No downsampling, memory-intensive |
| Streams | Append-optimized, trim support | No time-based aggregation |
| RedisTimeSeries | Downsampling, retention, aggregation, labels | Requires module |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q137. What are Bloom Filters and how does RedisBloom implement them?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Bloom Filter** is a **probabilistic** data structure that checks if an element is **definitely NOT in a set** or **probably in a set**:

```
Initialize: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  (10-bit array)

Add "cat": hash1("cat")=2, hash2("cat")=5, hash3("cat")=9
           [0, 0, 1, 0, 0, 1, 0, 0, 0, 1]

Add "dog": hash1("dog")=1, hash2("dog")=5, hash3("dog")=8
           [0, 1, 1, 0, 0, 1, 0, 0, 1, 1]

Check "cat": hash1=2✅, hash2=5✅, hash3=9✅ → Probably present
Check "fish": hash1=0❌ → Definitely NOT present
Check "bird": hash1=2✅, hash2=4❌ → Definitely NOT present
```

**False positive** possible (all bits set by other elements). **False negatives** impossible.

**RedisBloom:**
```bash
BF.RESERVE myfilter 0.01 100000  # 1% error rate, 100k expected items
BF.ADD myfilter "user:1001"
BF.ADD myfilter "user:1002"
BF.EXISTS myfilter "user:1001"   # 1 (probably)
BF.EXISTS myfilter "user:9999"   # 0 (definitely not)

# Multiple adds at once
BF.MADD myfilter "user:1003" "user:1004"
BF.MEXISTS myfilter "user:1003" "user:9999"

# Get info
BF.INFO myfilter
```

**Use cases:**
- **Cache deduplication** — Check if we've cached an item before
- **Web crawler** — Avoid crawling the same URL twice
- **Spam detection** — Check if email is known spam (fast rejection)
- **Analytics** — Avoid counting the same user multiple times

**Trade-off:** Bloom filters use a fraction of the memory of a Set (e.g., 1MB for 10M items with 1% error rate vs 100+ MB for a Set). The cost is false positives.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q138. How do you migrate data from one Redis instance to another?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Several approaches depending on downtime tolerance:**

**1. Redis replication (minimal downtime):**
```bash
# On new instance (target)
SLAVEOF old-host 6379    # Start replication from old primary

# Wait for sync to complete (check INFO replication)
# Then promote new instance
SLAVEOF NO ONE

# On old instance (point app to new)
# App now uses new instance
```

**2. redis-cli --cluster import (for Cluster):**
```bash
# Import from standalone Redis into Cluster
redis-cli --cluster import <cluster-host>:<cluster-port> \
  --cluster-from <source-host>:<source-port> \
  --cluster-copy
```

**3. RDB file transfer (downtime required):**
```bash
# On source
BGSAVE
# Wait for completion, then copy dump.rdb to target

# On target
# Stop Redis, replace dump.rdb, restart Redis
```

**4. Dual-write strategy (zero downtime):**
```
1. Write to both old and new Redis instances simultaneously
2. Backfill old data from old to new
3. After backfill completes, read from new instance (verify consistency)
4. Switch reads to new instance exclusively
5. Remove dual-write code
```

**5. Migrate + DUMP/RESTORE (for selective keys):**
```python
import redis

source = redis.Redis(host='old-host')
target = redis.Redis(host='new-host')

for key in source.scan_iter("user:*"):
    value = source.dump(key)
    ttl = source.ttl(key)
    if ttl == -1:
        target.restore(key, 0, value)     # No TTL
    else:
        target.restore(key, ttl * 1000, value)  # With TTL
```

**6. File-based migration:**
```bash
# Source
redis-cli --rdb dump.rdb

# Transfer file
scp dump.rdb user@new-host:/var/lib/redis/

# On new host
systemctl stop redis
cp /var/lib/redis/dump.rdb /var/lib/redis/  # Replace
systemctl start redis
```

**Recommendation:** For production, use replication (method 1) — minimal downtime, automatic, and reliable.

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q139. How does Redis handle concurrent transactions with optimistic locking?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis uses **WATCH/MULTI/EXEC** for optimistic concurrency control — **no locks are held**:

**Scenario: Two clients transferring money from Account A to Account B**

```javascript
// Client 1
async function transfer(from, to, amount) {
  while (true) {
    // Watch both accounts
    await redis.watch(`account:${from}`, `account:${to}`);

    // Read current balances
    const fromBal = parseInt(await redis.get(`account:${from}`)) || 0;
    const toBal = parseInt(await redis.get(`account:${to}`)) || 0;

    if (fromBal < amount) {
      await redis.unwatch();
      throw new Error('Insufficient funds');
    }

    // Begin transaction
    const result = await redis
      .multi()
      .set(`account:${from}`, fromBal - amount)
      .set(`account:${to}`, toBal + amount)
      .exec();

    if (result !== null) {
      // Transaction succeeded (no one modified watched keys)
      return;
    }
    // Transaction failed — retry from the beginning
  }
}
```

**How it works under the hood:**
1. Client calls `WATCH key1 key2`
2. Redis stores a list of watched keys in the client connection state
3. Before executing `EXEC`, Redis checks if ANY watched key was modified (by any client) since the `WATCH`
4. If modified → `EXEC` returns `nil` → application retries
5. If not modified → `EXEC` runs all commands atomically

**Key points:**
- **No locks held** — other clients can still read/write
- **Optimistic** — assumes conflicts are rare
- **Retry loop** — application must handle failure and retry
- **UNWATCH** — Cancel watch without executing (e.g., when you decide not to proceed)
- **Best for low-contention scenarios** — if many clients fight for the same keys, retries increase

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q140. What is Redis `CLIENT CACHING` and how does server-assisted client caching work?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Server-assisted client caching** (Redis 6+, RESP3 protocol) allows Redis to **invalidate** cached data on the client side:

**How it works:**
1. Client registers interest in specific keys
2. Redis tracks which keys each client is interested in
3. When a key is modified, Redis sends an **invalidation message** to the client
4. Client clears its local cache entry for that key

```bash
# Enable client tracking (RESP3 required)
CLIENT TRACKING ON

# Client caches locally: user:1001 = {...}
# When another client modifies user:1001:
# Redis sends: → "invalidate" "user:1001"
# Client deletes its local cached copy
```

**Connection modes:**
- **Default (broadcast mode)** — Redis sends invalidation to ALL clients tracking the key
- **Redirect mode (with CLIENT ID)** — Invalidation messages sent to a separate connection

```
┌─────────┐     SET user:1001 "new"     ┌─────────┐
│ Client A │ ────────────────────────────→│  Redis  │
│ (writer) │                              └────┬────┘
└──────────┘                                   │
                                          "invalidate user:1001"
                                               │
                                          ┌────▼────┐
                                          │ Client B │ ← Deletes local cache
                                          │ (reader) │
                                          └─────────┘
```

**Benefits:**
- Client-side caching reduces latency (no network call)
- Cache invalidation is immediate (no stale TTL)
- Reduces Redis server load

**Configuration:**
```bash
CLIENT TRACKING ON OPTIN    # Client must opt-in per key
CLIENT CACHING YES          # Mark the next command's key for tracking
GET user:1001               # Key is now tracked
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q141. How do you design a high-availability Redis architecture?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Factors for HA Redis architecture:**

**1. Single instance + Sentinel (small to medium data, < 20GB)**

```
                    ┌──────────┐
                    │ Sentinel │
                    │  nodes   │ (3 minimum)
                    └────┬─────┘
                         │
    App ──→  Primary ────┤
                │        │
          ┌─────┴─────┐  │
       Replica 1  Replica 2
```

- Sentinel handles automatic failover
- Reads from replicas; writes to primary
- Application uses Sentinel to discover the current primary

**2. Redis Cluster (large data, > 20GB)**

```
    App ──→ Cluster-aware client
                │
     ┌──────────┼──────────┐
  Primary A  Primary B  Primary C
     │           │           │
  Replica A'  Replica B'  Replica C'
```

- Automatic sharding + failover
- Minimum: 3 primaries + 3 replicas
- No single point of failure

**3. Multi-region (disaster recovery)**

```
Region 1 (Primary)          Region 2 (DR)
┌─────────────────┐        ┌─────────────────┐
│ Primary ← App    │   ╔═══╗ │ Replica (RO)   │
│ Replica (RO)    │   ║WAN║ │ (async replication)
│ Sentinel       │   ╚═══╝ │ Sentinel        │
└─────────────────┘        └─────────────────┘
```

- Async replication across regions (using `REPLICAOF`)
- DR region is read-only until failover
- Can use Sentinel in each region

**4. Proxy layer (for advanced routing)**

```
    App → Proxy (twemproxy/HAProxy/Envoy)
              │
        ┌─────┴─────┐
    Primary 1    Primary 2
       │            │
    Replica 1    Replica 2
```

- Proxies handle connection management, read/write splitting
- Simplified client configuration (proxy handles failover)
- Envoy can handle advanced routing with Redis Cluster

**Key decisions:**
| Requirement | Choose |
|-------------|--------|
| < 20GB, need HA | Sentinel |
| > 20GB, need scale | Cluster |
| Multi-region DR | Sentinel + WAN replication |
| Simple client setup | Proxy (twemproxy/Envoy) |
| Auto-discovery | Sentinel + client library |

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q142. How does Redis handle encryption in transit?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis supports **TLS (Transport Layer Security)** for encryption in transit:

**Configuration (redis.conf):**
```bash
# Enable TLS
tls-port 6380                # TLS port (separate from plain 6379)
port 0                       # Disable plain port (TLS only)

# Certificate configuration
tls-cert-file /etc/redis/redis.crt
tls-key-file /etc/redis/redis.key
tls-ca-cert-file /etc/redis/ca.crt

# Client certificate verification
tls-auth-clients yes         # Require client certs
tls-auth-clients optional    # Client certs optional

# Replication TLS
tls-replication yes          # Encrypt replication traffic
tls-cluster yes              # Encrypt cluster bus traffic

# Protocol version
tls-protocols "TLSv1.2 TLSv1.3"
```

**Client connection with TLS:**
```bash
redis-cli --tls \
  --cert /path/to/client.crt \
  --key /path/to/client.key \
  --cacert /path/to/ca.crt \
  -h myredis.example.com -p 6380
```

**Node.js (ioredis):**
```javascript
new Redis({
  host: 'myredis.example.com',
  port: 6380,
  tls: {
    key: fs.readFileSync('./client.key'),
    cert: fs.readFileSync('./client.crt'),
    ca: [fs.readFileSync('./ca.crt')]
  }
});
```

**Performance impact:**
- TLS adds ~10-20% CPU overhead (more CPU-intensive)
- TLS 1.3 is faster than TLS 1.2 (fewer round trips)
- Hardware acceleration (AES-NI, etc.) helps significantly

**Alternatives:**
- **Stunnel** — Wrapper for Redis without built-in TLS
- **VPN** — Encrypt traffic between Redis nodes
- **Kubernetes** — Service mesh (Istio/Linkerd) for mTLS

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q143. What is Redis `CLUSTER FAILOVER TAKEOVER` and when would you use it?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`CLUSTER FAILOVER TAKEOVER` forces a replica to become primary **without consent** from other nodes:

```bash
# On a replica node
CLUSTER FAILOVER TAKEOVER
```

**How it's different from regular failover:**

| Feature | Normal Failover | FORCE | TAKEOVER |
|---------|----------------|-------|----------|
| **Majority consent** | Required (cluster majority) | Required | Not required |
| **Primary availability** | Not needed (assumed down) | Not needed | Not needed |
| **Data freshness check** | Yes (replication offset) | Skipped (manual override) | Skipped |
| **Cluster rejoin** | Replica syncs new data | May lose writes | May lose writes |

**When to use TAKEOVER:**
- **Emergency recovery** — When cluster majority is lost and data availability is critical
- **Manual cluster repair** — When a primary fails and no automatic failover triggers
- **Testing** — Simulating cluster failure scenarios

**Risks:**
- **Data loss** — The replica may not have the latest data
- **Split-brain** — Can create multiple primaries for the same slot
- **Cluster instability** — Other nodes may be confused by the forced promotion

**Safer alternative:** `CLUSTER FAILOVER FORCE` — This doesn't require primary consent but still requires cluster majority.

**Best practice:**
- Use `TAKEOVER` only as a last resort in disaster recovery
- Document and plan for the data loss implications
- Monitor cluster health after forced failover

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q144. How do you handle Redis security in production?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Multi-layered security approach:**

**1. Network security**
```bash
# Bind to specific interfaces (not 0.0.0.0)
bind 127.0.0.1 192.168.1.100

# Disable dangerous commands or rename them
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG "MYPRIVATE_CONFIG"
rename-command DEBUG ""
rename-command KEYS "SEARCH_KEYS"

# Protected mode (enabled by default)
protected-mode yes
# Only accepts connections from localhost if no password set
```

**2. Authentication**
```bash
# Redis 6+ ACL (recommended)
aclfile /etc/redis/users.acl

# Redis < 6 (legacy)
requirepass YourStrongPassword123!
```

**3. TLS encryption (encryption in transit)**
```bash
tls-port 6380
port 0  # Disable plain TCP
tls-cert-file /etc/redis/redis.crt
tls-key-file /etc/redis/redis.key
tls-ca-cert-file /etc/redis/ca.crt
tls-auth-clients yes
```

**4. Operating system security**
```bash
# Run as non-root user
useradd -r redis
chown -R redis:redis /var/lib/redis
chmod 750 /var/lib/redis

# Linux kernel hardening
echo 'never' > /sys/kernel/mm/transparent_hugepage/enabled
# THP can cause latency spikes

# vm.overcommit_memory = 1
# Required for BGSAVE fork to succeed
```

**5. Firewall rules**
```bash
# Only allow application servers
iptables -A INPUT -p tcp --dport 6379 -s 10.0.0.0/8 -j ACCEPT
iptables -A INPUT -p tcp --dport 6379 -j DROP
```

**6. Monitoring and auditing**
- Monitor for unauthorized access attempts
- Redis `INFO` commands count failed auths
- Log all commands with `AUDIT-LOG` module (or application-level logging)

**7. Docker security**
```bash
# Don't expose Redis ports to the internet unnecessarily
# Use Docker internal network for Redis
docker run --network app_network redis:7-alpine
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q145. How does Redis handle AOF file corruption and recovery?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**AOF file corruption can happen due to:**
- Disk failure or bad sectors
- System crash during AOF write
- Insufficient disk space during append

**Redis recovery tools:**

**1. `redis-check-aof` (built-in)**
```bash
# Fix AOF file (removes corrupted tail)
redis-check-aof --fix appendonly.aof

# Output:
# AOF analyzed: size=1234567, ok_up_to=1234000
# Truncating AOF to offset 1234000
# AOF loaded back to memory... done!
```

**What it does:**
- Scans the AOF file for valid commands
- Truncates at the last valid command before corruption
- Drops trailing corrupted data
- Redis can then restart with the repaired AOF

**2. Redis configuration for partial corruption:**
```bash
# In redis.conf
aof-load-truncated yes    # Load truncated AOF (warn, then proceed)
```

When `aof-load-truncated` is `yes`:
- Redis logs a warning about truncation
- Loads the AOF up to the last valid command
- Continues normal operation
- You should run `redis-check-aof --fix` to permanently repair

When `aof-load-truncated` is `no`:
- Redis refuses to start if AOF is truncated
- You must manually fix the AOF first

**3. AOF + RDB hybrid (Redis 4+):**
In hybrid persistence:
- AOF starts with an RDB base (less replay)
- AOF corruption recovery is faster (RDB part is already a snapshot)

**4. Prevention:**
- Use `appendfsync everysec` (good balance)
- Monitor disk space and I/O
- Use reliable storage (SSD, cloud block storage)
- Regular backups of AOF files

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q146. How does Redis handle the `SORT` command internally?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

The `SORT` command sorts elements of a List, Set, or Sorted Set by value or by external keys:

```bash
SORT mylist [BY pattern] [LIMIT offset count] [GET patterns] [ASC|DESC] [ALPHA] [STORE dest]
```

**Internal implementation:**

1. **Load all elements** into an array
2. If `BY pattern` is specified:
   - For each element, construct a key using the pattern
   - `GET` the value of that key
   - Use that value as the sort key
3. **Sort the array** using **quicksort** (average O(N log N))
4. Apply `LIMIT` to trim results
5. Process `GET` patterns (fetch additional related keys)
6. If `STORE` is specified, store sorted results in a List

**Memory implications:**
- `SORT` creates a temporary array with all elements and their sort keys
- For large datasets, this can use significant memory
- The temporary array is allocated on the heap

**Performance:**
- O(N + M log M) where N = number of elements, M = number to sort
- For a List with 100K elements, `SORT` can take 10-100ms
- For a List with 1M elements, it can take hundreds of milliseconds

**Considerations for large datasets:**
```bash
# Slow — sorts ALL 1M elements
SORT biglist BY user:*->name

# Faster — limit to top 100
SORT biglist BY user:*->name LIMIT 0 100
```

**Better alternatives:**
- **Sorted Sets** — If you sort by score, use ZRANGE
- **Client-side sorting** — For small datasets, sort in the application
- **Pre-sorted data** — Store data in the order you need

> **Note:** `SORT` is being deprecated in Redis 7+ in favor of `SORT_RO` (read-only variant that doesn't block writes).

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q147. How does Redis 7's `ACL V2` differ from Redis 6 ACLs?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis 7 introduced significant ACL improvements over Redis 6:

**Redis 6 ACL:**
- Basic user/command/key permissions
- Categories (e.g., +@read, +@write)
- Selector-based permissions (per-command)

**Redis 7 ACL V2 additions:**

**1. Selectors — Multiple permission sets per user**
```bash
ACL SETUSER developer
  ~app:* +GET +SET           # Default permissions
  selectors +~admin:* +FLUSHALL  # Additional permission set (OR logic)
```

A user matches a command if it's allowed by ANY selector (OR across selectors).

**2. Key patterns with `%` for write-specific access**
```bash
# Can read all keys, but only write to session:*
ACL SETUSER worker ~* %R~* %W~session:* +@all
```

**3. Permission logging and resolution**
```bash
ACL LOG                 # See ACL denial events
ACL DRYRUN user command [args]  # Test if a user can run a command
```

**4. Pub/Sub channel restrictions**
```bash
ACL SETUSER subscriber &chat:* -@all +SUBSCRIBE +PSUBSCRIBE
# & restricts which Pub/Sub channels the user can access
```

**5. Selector-based key permissions with `RESET` and `SEL`**
```bash
ACL SETUSER worker
  ~cache:* +GET +SET          # Read/write cache:*
  SEL                         # New selector
  ~temp:* +SET -GET           # Write-only temp:*
```

**Upgrade notes:**
- Redis 6 ACLs work in Redis 7 without changes
- New features (selectors, channel restrictions) are Redis 7+
- Use `ACL GETUSER` to see the complete user definition including selectors

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q148. How does Redis handle diskless replication?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Diskless replication** (Redis 2.8.18+) sends the RDB directly to replicas over the network **without writing to disk** first:

```bash
# In redis.conf
repl-diskless-sync yes              # Enable diskless replication
repl-diskless-sync-delay 5          # Wait 5 seconds for more replicas to connect
repl-diskless-load onelines         # Load RDB from socket on replica side
```

**How it works:**
```
Traditional (disk-based) replication:
1. Primary forks BGSAVE → writes RDB to disk
2. RDB syncs to disk (fsync)
3. Replica connects → reads RDB from disk → sends over network
Problem: Double I/O (write + read) + disk space for RDB

Diskless replication:
1. Primary forks BGSAVE → child writes RDB DIRECTLY to replica socket
2. Replica receives RDB stream and loads directly into memory
Benefit: No disk I/O for RDB file on primary!
```

**Advantages:**
- No disk overhead for RDB file (reduced I/O)
- Faster sync for replicas (no write-then-read delay)
- No disk space needed for RDB on primary
- Ideal for high-write environments where disk I/O is bottleneck

**Disadvantages:**
- Higher network bandwidth usage during sync
- If replication fails, must restart from scratch (no cached RDB on disk)
- Fork required (same as disk-based)
- Not available for all storage configurations

**When to use:**
- High write volumes where disk I/O is saturated
- SSDs with limited write endurance
- Large datasets where RDB file is very large (> 10GB)
- Replicas in the same data center (low latency, high bandwidth)

**When NOT to use:**
- Cross-region replication (higher chance of network failure, needs retry)
- Slow or congested network links
- Need RDB file as backup anyway

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q149. What is the difference between Redis `ZUNIONSTORE` and `ZINTERSTORE`?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Both aggregate multiple Sorted Sets into a destination:

| Command | Operation | Result |
|---------|-----------|--------|
| `ZUNIONSTORE dest n key [key ...]` | Union | All members from any set (unique, with aggregated scores) |
| `ZINTERSTORE dest n key [key ...]` | Intersection | Members in ALL sets (with aggregated scores) |

**Syntax:**
```bash
ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS w1 w2 ...] [AGGREGATE SUM|MIN|MAX]
ZINTERSTORE destination numkeys key [key ...] [WEIGHTS w1 w2 ...] [AGGREGATE SUM|MIN|MAX]
```

**Example:**
```bash
ZADD site1 100 "page:/home" 50 "page:/about" 30 "page:/contact"
ZADD site2 80 "page:/home" 60 "page:/blog" 20 "page:/about"

# Total visits (union, sum scores)
ZUNIONSTORE combined 2 site1 site2 AGGREGATE SUM
ZRANGE combined 0 -1 WITHSCORES
# "page:/contact" 30
# "page:/about" 70   (50 + 20)
# "page:/blog" 60
# "page:/home" 180   (100 + 80)

# Pages visited on BOTH sites (intersection)
ZINTERSTORE both 2 site1 site2 AGGREGATE SUM
ZRANGE both 0 -1 WITHSCORES
# "page:/home" 180
# "page:/about" 70

# Weighted union (give site2 more importance)
ZUNIONSTORE weighted 2 site1 site2 WEIGHTS 1 2 AGGREGATE SUM
# site1: weights → page:/about = 50×1 = 50
# site2: weights → page:/about = 20×2 = 40
# result: page:/about = 90
```

**Performance:**
- O(N) + O(M log M) where N = total elements across all input sets
- Memory: creates temporary sorted arrays
- For large datasets, can be CPU and memory intensive

**Limitations:**
- Number of keys (`numkeys`) must be ≤ 2048 (config limit on most systems)
- `ZINTERSTORE` requires at least one key to have the member (no member in empty set = no intersection)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q150. What is Redis `CLUSTER SETSLOT` and how do you manage slot migration?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`CLUSTER SETSLOT` manages hash slot assignment during resharding:

**States:**
1. **NODE** — Slot is assigned to a node (normal operation)
2. **MIGRATING** — Slot is being moved FROM this node
3. **IMPORTING** — Slot is being moved TO this node
4. **STABLE** — Reset migration/import state

```bash
# Step 1: On source node, mark slot as migrating
CLUSTER SETSLOT 1000 MIGRATING <target-node-id>

# Step 2: On target node, mark slot as importing
CLUSTER SETSLOT 1000 IMPORTING <source-node-id>

# Step 3: Migrate keys (from source to target)
redis-cli --cluster slot-operation <source-host>:<port> \
  --cluster-from <source-id> \
  --cluster-to <target-id> \
  --cluster-slots 1000

# Step 4: On any node, assign slot to target
CLUSTER SETSLOT 1000 NODE <target-node-id>
```

**During migration:**
- Source node handles requests for the migrating slot
- If source has the key → return it
- If source doesn't have the key → return `ASK` redirect to target
- Client must send `ASKING` command before accessing the key on target

**Atomic slot migration:**
```
Step 1: Mark slot MIGRATING on source
         → Source tracks which keys have moved
Step 2: For each key:
         MIGRATE key target-host target-port key 0 5000
         → Key moves atomically from source to target
Step 3: Mark slot NODE on target
         → All nodes learn about the change via gossip
```

**Complete resharding example:**
```bash
# Automated resharding
redis-cli --cluster reshard 127.0.0.1:7000 \
  --cluster-from <all> \
  --cluster-to <node-id> \
  --cluster-slots 1000 \
  --cluster-yes

# Check slot distribution
redis-cli --cluster info 127.0.0.1:7000
redis-cli --cluster check 127.0.0.1:7000
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q151. How do you optimize Redis memory usage for large datasets?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**1. Use smaller data types where possible:**
```bash
# Instead of storing many Strings → use Hash
SET user:1001:name "Alice"        # Each key has ~50-100 bytes overhead
SET user:1001:email "alice@..."   # Each key: more overhead
HSET user:1001 name "Alice" email "alice@..."  # One key, less overhead
```

**2. Use ziplist encoding for small collections:**
```bash
# In redis.conf (defaults are good, but verify)
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
```

**3. Enable key compression (if using modules):**
- Redis doesn't compress keys natively
- Use shorter key names (but keep them readable)

**4. Use `MEMORY DOCTOR` for recommendations:**
```bash
MEMORY DOCTOR
```

**5. Calculate key overhead:**
```bash
# Check memory without keys
INFO memory
# used_memory_dataset: actual data size
# used_memory_overhead: key metadata
# Peak is good to know too
```

**6. Use integer encoding for Sets:**
```bash
# All-integer Sets use intset (much more compact)
SADD myset 1 2 3 4 5
OBJECT ENCODING myset    # "intset" (compact)
SADD myset "string"
OBJECT ENCODING myset    # "hashtable" (18x+ more memory!)
```

**7. Tune for your access pattern:**
- **Many small keys → Hash** (up to 5x memory reduction)
- **Large values → Consider compression** (client-side gzip before SET)
- **Frequently accessed → Keep hot keys small**

**8. Set `maxmemory` and monitor eviction:**
```bash
CONFIG SET maxmemory 8gb
CONFIG SET maxmemory-policy allkeys-lru
INFO stats | grep evicted_keys
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q152. How does Redis handle replication when the network between primary and replica is slow?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

**Slow network scenarios:**

**1. Partial resynchronization (psync2):**
- Redis 4+ supports **partial resync** — if a replica disconnects briefly, it doesn't need a full RDB sync
- The primary keeps a **replication backlog** (buffer of recent commands)
- On reconnection, the replica sends its replication ID and offset
- If the offset is still in the primary's backlog, only the missing commands are sent
- Config: `repl-backlog-size 1mb` (increase for longer disconnections)

```bash
# Check backlog
INFO replication
# repl_backlog_active:1
# repl_backlog_size:1048576
# repl_backlog_histlen:987654     # Current data in backlog
```

**2. Diskless replication:**
```bash
repl-diskless-sync yes       # Stream RDB directly over network (no disk I/O)
repl-diskless-sync-delay 5   # Wait for more replicas
```

**3. Replication tuning:**
```bash
# Reduce replication bandwidth
repl-disable-tcp-nodelay yes    # Nagle's algorithm (saves bandwidth, higher latency)
repl-backlog-size 10mb          # Larger backlog = less full resync
repl-timeout 120                # Higher timeout for slow links
repl-backlog-ttl 3600           # How long to keep backlog when no replicas

# For cross-region replication
client-output-buffer-limit replica 256mb 64mb 60
# Hard limit: 256MB
# Soft limit: 64MB for 60 seconds
```

**4. Monitoring slow replication:**
```bash
INFO replication
# master_repl_offset: 1234567
# slave_repl_offset: 1234000    → 567 behind

# Check for disconnections
# repl_backlog_first_byte_offset: measures how far back data is stored
```

**5. Throttling writes during replication:**

```bash
# On replica
replica-serve-stale-data yes    # Serve old data during resync (better UX)
replica-read-only yes           # Default: safe
```

**Proactive measures:**
- Increase `repl-backlog-size` for networks with brief outages (5-10MB recommended)
- Use `repl-backlog-ttl` to keep backlog for disconnected replicas
- Monitor `INFO replication: master_repl_offset - slave_repl_offset` for lag
- Add monitoring alerts when replica lag exceeds threshold (e.g., 30 seconds)

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q153. How does Redis handle `CLIENT KILL` and what different kill types exist?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

`CLIENT KILL` terminates client connections. Redis 6+ supports filtering by type:

```bash
# Kill by address
CLIENT KILL 127.0.0.1:56789

# Kill by type
CLIENT KILL TYPE normal     # Kill regular clients
CLIENT KILL TYPE master     # Kill primary connections
CLIENT KILL TYPE replica    # Kill replica connections
CLIENT KILL TYPE pubsub     # Kill Pub/Sub subscribers

# Kill by user (Redis 6+) — requires ACL
CLIENT KILL USER alice

# Kill by ID (Redis 6+)
CLIENT KILL ID 42

# Kill by skip-me
CLIENT KILL SKIPME yes/no   # Whether to skip killing this connection itself
```

**Kill filters in Redis 6+:**
```bash
# Complex filters
CLIENT KILL ADDR 127.0.0.1:6379
CLIENT KILL LADDR 127.0.0.1:6379   # Local address
CLIENT KILL TYPE normal PUBSUB     # Not combined — use TYPE only
```

**Use cases:**
- **Maintenance** — Disconnect idle connections before restart
- **Debugging** — Kill a problematic client
- **Security** — Kill connections from an unauthorized IP
- **Resource management** — Kill connections consuming too much output buffer

**Monitor blocked clients:**
```bash
CLIENT LIST
# id=3 addr=127.0.0.1:6379 fd=8 name= age=10 idle=0 flags=N ...
# Flags: N=normal, M=master, S=replica, b=blocked, O=client in MONITOR mode

# Count clients
INFO clients
# connected_clients: 42
# blocked_clients: 2
# client_biggest_input_buf: 1024
# client_biggest_output_buf: 8192
```

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q154. How does Redis handle output buffer management for different connection types?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

Redis uses **output buffers** to hold response data before sending to clients. Different connection types have different buffer limits:

```bash
# In redis.conf

# Normal clients (regular GET/SET clients)
client-output-buffer-limit normal 0 0 0
# 0 = no limit (basically unlimited)

# Replica clients (replication connections)
client-output-buffer-limit replica 256mb 64mb 60
# Hard limit: 256MB → immediate disconnect
# Soft limit: 64MB for 60 seconds → disconnect after persistent soft limit

# Pub/Sub clients (subscribers)
client-output-buffer-limit pubsub 32mb 8mb 60
# Hard limit: 32MB
# Soft limit: 8MB for 60 seconds
```

**Why limits matter:**

**Normal clients:** Unlimited by default because responses are read immediately. If a client reads slowly, the buffer grows.

**Replica clients:** Large buffers needed for RDB sync. If a replica is slow to process, the buffer grows and can consume significant memory.

**Pub/Sub clients:** Publishers can produce faster than subscribers can consume. Slow subscribers cause buffer growth → memory drain.

**Symptoms of buffer issues:**
```bash
# Check in CLIENT LIST
CLIENT LIST
# ... omem=12345678 ...  ← output buffer memory (too large!)
```

**CONFIG SET for runtime changes:**
```bash
CONFIG SET client-output-buffer-limit "normal 0 0 0"
CONFIG SET client-output-buffer-limit "replica 512mb 128mb 60"
CONFIG SET client-output-buffer-limit "pubsub 64mb 16mb 60"
```

**Detecting problematic clients:**
- Use `CLIENT LIST` and sort by `omem` (output buffer memory)
- Identify clients with large buffers
- Kill problematic clients with `CLIENT KILL`

**Best practices:**
- Set realistic Pub/Sub limits (subscribers that can't keep up should be disconnected)
- Monitor `client_biggest_output_buf` in `INFO clients`
- Monitor for slow consumers when using Pub/Sub

</div>
</details>

<details class="qa-card qa-hard">
<summary>
Q155. How do you troubleshoot "OOM command not allowed when used memory > 'maxmemory'" errors?
<span class="qa-difficulty-badge hard">Hard</span>
</summary>

<div class="qa-answer">

This error means Redis has reached `maxmemory` AND the eviction policy is `noeviction`:

**Immediate steps:**

**1. Check current memory usage:**
```bash
INFO memory
# used_memory_human: 1.5G
# maxmemory_human: 1.5G
# maxmemory_policy: noeviction
```

**2. Change eviction policy temporarily:**
```bash
CONFIG SET maxmemory-policy allkeys-lru
# Redis will immediately start evicting keys
```

**3. OR increase maxmemory:**
```bash
CONFIG SET maxmemory 2gb
```

**4. Free memory by deleting non-essential keys:**
```bash
# Scan and delete (use with caution)
SCAN 0 COUNT 1000
# Or flush specific databases
FLUSHDB      # Current database
FLUSHALL     # All databases (CAREFUL!)
```

**5. Find large keys:**
```bash
# Use redis-cli to find big keys
redis-cli --bigkeys
# Lists biggest String, List, Set, etc.
```

**6. Check for memory leaks or unexpected growth:**
```bash
INFO stats | grep keyspace
# Look for unexpected key count growth
```

**Prevention:**
```bash
# 1. Set an appropriate eviction policy
CONFIG SET maxmemory-policy allkeys-lru

# 2. Monitor memory usage
# Set up alerts at 70%, 80%, 90% maxmemory

# 3. Plan capacity
# maxmemory should be:
#   50-70% of total RAM (for BGSAVE overhead)
#   Below system memory (prevent OOM kills)

# 4. Set up cache TTLs
# All cache keys should have EXPIRE set

# 5. Use MEMORY STATS for detailed analysis
MEMORY STATS

# 6. Monitor eviction rate
INFO stats | grep evicted_keys
```

**Don't do:**
- ❌ `CONFIG SET maxmemory 0` (unlimited — can OOM the server)
- ❌ Ignore the error — it will persist until fixed
- ❌ Restart Redis without fixing — the underlying cause remains

</div>
</details>

---

> **🎯 Quick Summary:** These 155 questions cover Redis fundamentals, data types, persistence, replication, clustering, security, performance tuning, and advanced internals. Master these for Redis interview success.
