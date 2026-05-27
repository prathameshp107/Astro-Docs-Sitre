---
title: NoSQL with Python
description: Learn how to work with NoSQL databases like MongoDB and Redis using Python.
sidebar:
  order: 3
---

# NoSQL with Python

## Introduction

**NoSQL databases** offer flexible schemas and horizontal scaling. Python integrates well with popular NoSQL databases like MongoDB and Redis.

## MongoDB with PyMongo

```python
from pymongo import MongoClient

# Connect
client = MongoClient("mongodb://localhost:27017")
db = client["mydatabase"]
collection = db["users"]

# Create
user = {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 30,
    "skills": ["Python", "MongoDB"],
    "address": {"city": "NYC", "zip": "10001"}
}
result = collection.insert_one(user)
print(result.inserted_id)

# Read
user = collection.find_one({"email": "alice@example.com"})
users = collection.find({"age": {"$gte": 25}})
for user in users:
    print(user["name"])

# Update
collection.update_one(
    {"email": "alice@example.com"},
    {"$set": {"age": 31}, "$push": {"skills": "Docker"}}
)

# Delete
collection.delete_one({"email": "alice@example.com"})

# Aggregation pipeline
pipeline = [
    {"$match": {"age": {"$gte": 25}}},
    {"$group": {"_id": "$city", "avg_age": {"$avg": "$age"}}},
    {"$sort": {"avg_age": -1}}
]
results = collection.aggregate(pipeline)
```

## Redis with redis-py

```python
import redis

# Connect
r = redis.Redis(host="localhost", port=6379, db=0)

# Strings
r.set("key", "value")
print(r.get("key"))  # b'value'

# With expiration
r.setex("temp", 60, "expires in 60s")

# Lists
r.lpush("queue", "job1", "job2", "job3")
print(r.lrange("queue", 0, -1))  # All items

# Sets
r.sadd("tags", "python", "redis", "database")
print(r.smembers("tags"))

# Hashes
r.hset("user:1", mapping={"name": "Alice", "age": 30})
print(r.hgetall("user:1"))
```

## Choosing SQL vs NoSQL

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Fixed, predefined | Flexible, dynamic |
| Relationships | Joins, foreign keys | Embedded documents, references |
| Scaling | Vertical (mostly) | Horizontal (built-in) |
| ACID | Full support | Varies (eventual consistency) |
| Query | Structured (SQL) | API-based, aggregation |
| Best for | Complex relationships | Large scale, flexible data |

## Best Practices

1. **Use indexes** in MongoDB for frequently queried fields
2. **Use connection pooling** for production database access
3. **Validate data** before inserting into NoSQL databases
4. **Use appropriate data types** — MongoDB BSON, Redis hashes
5. **Handle disconnections** gracefully with retry logic

## Practice Exercises

**Exercise 1:** Design a product catalog using MongoDB with embedded categories and reviews.

**Exercise 2:** Implement a simple cache layer using Redis with TTL-based expiration.
