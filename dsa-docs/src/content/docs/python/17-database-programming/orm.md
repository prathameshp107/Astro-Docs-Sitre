---
title: ORMs in Python
description: Learn about Object-Relational Mapping in Python with SQLAlchemy and other popular ORMs.
sidebar:
  order: 2
---

# ORMs in Python

## Introduction

An **Object-Relational Mapper (ORM)** lets you interact with databases using Python objects instead of SQL queries. SQLAlchemy is the most popular Python ORM.

## SQLAlchemy Models

```python
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    posts = relationship("Post", back_populates="author")

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    author = relationship("User", back_populates="posts")
```

## Database Operations

```python
# Setup
engine = create_engine("sqlite:///mydb.db")
Base.metadata.create_all(engine)

# Session
Session = sessionmaker(bind=engine)
session = Session()

# Create
user = User(name="Alice", email="alice@example.com")
session.add(user)
session.commit()

# Read
users = session.query(User).filter(User.age > 25).all()
user = session.query(User).get(1)  # By primary key

# Update
user = session.query(User).get(1)
user.name = "Bob"
session.commit()

# Delete
session.delete(user)
session.commit()
```

## Relationships

```python
# One-to-Many
user = session.query(User).get(1)
post = Post(title="Hello", content="World", author=user)
session.add(post)
session.commit()

for post in user.posts:
    print(post.title)

# Many-to-Many
from sqlalchemy import Table, Column, Integer, ForeignKey

student_course = Table(
    "student_course", Base.metadata,
    Column("student_id", Integer, ForeignKey("students.id")),
    Column("course_id", Integer, ForeignKey("courses.id"))
)
```

## Best Practices

1. **Use sessions as context managers** — `with Session() as session:`
2. **Create indexes** on frequently queried columns
3. **Use eager loading** (`joinedload()`) to avoid N+1 queries
4. **Use migrations** (Alembic) for schema changes
5. **Prefer ORM queries** over raw SQL for complex filtering

## Practice Exercises

**Exercise 1:** Design a blog database with User, Post, and Comment models with proper relationships.

**Exercise 2:** Implement a product catalog with Category and Product models using many-to-many relationship.
