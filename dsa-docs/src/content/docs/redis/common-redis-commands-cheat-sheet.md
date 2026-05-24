---
title: "Common Redis Commands Cheat Sheet"
description: "Redis notes for Common Redis Commands Cheat Sheet."
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
