---
title: "GraphQL"
description: "GraphQL vs REST, schema definition, resolvers, Apollo Server basics, and when to use GraphQL."
sidebar:
  order: 7
---

## GraphQL

**GraphQL** is a query language for APIs developed by Facebook. Unlike REST, where the server defines the response structure, GraphQL lets the client specify exactly what data it needs.

### GraphQL vs REST

| Feature | REST | GraphQL |
|---|---|---|
| Data fetching | Multiple endpoints, may over/under-fetch | Single endpoint, client specifies fields |
| Versioning | `/v1/users`, `/v2/users` | No versioning — evolve schema |
| Documentation | Swagger/OpenAPI | Introspection (self-documenting) |
| Caching | HTTP caching (GET requests) | Requires custom caching layer |
| File uploads | Built-in (multipart) | Requires additional setup |
| Learning curve | Low | Medium |

### Apollo Server Setup

```javascript
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');

const app = express();
app.use(express.json());

// 1. Define the schema (Type Definitions)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
  }

  # Queries — read operations
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  # Mutations — write operations
  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
`;

// 2. Define resolvers — functions that return data for each field
const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    posts: async () => {
      return await Post.find({}).populate('author');
    },
  },
  
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      const user = new User({ name, email, age });
      return await user.save();
    },
    createPost: async (_, { title, content, authorId }) => {
      const post = new Post({ title, content, author: authorId });
      await post.save();
      return await post.populate('author');
    },
  },
  
  // Custom resolvers for relationships
  User: {
    posts: async (parent) => {
      return await Post.find({ author: parent.id });
    },
  },
  
  Post: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
  },
};

// 3. Create and start the server
const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  await server.start();
  app.use('/graphql', expressMiddleware(server));
  app.listen(4000, () => console.log('GraphQL at http://localhost:4000/graphql'));
}

start();
```

### Example Queries

```graphql
# Client can request exactly what it needs
query GetUserWithPosts {
  user(id: "123") {
    name
    email
    posts {
      title
      content
    }
  }
}

# Mutation
mutation CreateNewUser {
  createUser(name: "Alice", email: "alice@example.com", age: 30) {
    id
    name
    email
  }
}
```

```javascript
// Fetch from the client (using fetch)
const query = `
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts { title }
    }
  }
`;

const response = await fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query,
    variables: { id: '123' },
  }),
});

const { data } = await response.json();
console.log(data.user);
```

### N+1 Problem in GraphQL

```javascript
// ❌ N+1 Problem: For each user, we make a separate DB query
const resolvers = {
  User: {
    posts: async (parent) => {
      // This runs ONCE for each user fetched!
      return await Post.find({ author: parent.id });
    },
  },
};

// ✅ Fix: Use DataLoader to batch and cache
const DataLoader = require('dataloader');

const postLoader = new DataLoader(async (authorIds) => {
  const posts = await Post.find({ author: { $in: authorIds } });
  // Group posts by authorId
  return authorIds.map(id =>
    posts.filter(post => post.author.toString() === id)
  );
});

const resolvers = {
  User: {
    posts: async (parent) => {
      return postLoader.load(parent.id); // Batched!
    },
  },
};
```

### Authentication

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Add context to every request
const start = async () => {
  await server.start();
  app.use('/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Get the token from headers
        const token = req.headers.authorization?.split(' ')[1];
        
        if (token) {
          try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return { user };
          } catch {
            return { user: null };
          }
        }
        
        return { user: null };
      },
    })
  );
};
```

### When to Use GraphQL

| Use GraphQL when... | Use REST when... |
|---|---|
| Client needs flexible data shapes | Simple CRUD with fixed responses |
| Multiple client types (web, mobile, IoT) | Single client |
| Rapid iteration (avoid versioning) | Stable, well-known API |
| Complex data relationships | Simple data models |

### 🚨 Common Gotchas

```javascript
// ❌ Not handling errors in resolvers
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findById(id);
      // If findById throws, GraphQL returns a 500 with no details
    },
  },
};

// ✅ Wrap with try/catch
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
      } catch (err) {
        throw new ApolloError(err.message, 'USER_NOT_FOUND');
      }
    },
  },
};
```

### Key Takeaways

- GraphQL lets the **client specify** exactly what data it needs — no over-fetching
- **Type definitions** define the schema; **resolvers** provide the data
- Apollo Server is the most popular GraphQL server for Node.js
- Use **DataLoader** to solve the N+1 problem (batch + cache database queries)
- GraphQL is great for complex data relationships and multiple client types
- REST is simpler and better for straightforward CRUD and caching
- GraphQL APIs are self-documenting via introspection
