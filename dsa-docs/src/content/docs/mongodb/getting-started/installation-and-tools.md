---
title: "Installation and Tools"
description: "How to install MongoDB, use mongosh, Compass GUI, and get started with MongoDB Atlas in the cloud."
sidebar:
  order: 2
---

## Installation and Tools

You can run MongoDB **locally** or use **MongoDB Atlas** (cloud). Let's look at both options.

### Option 1: MongoDB Atlas (Cloud — Recommended for Beginners)

Atlas is MongoDB's cloud database. Free tier gives you a 512MB cluster forever.

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up and create a **free cluster**
3. Add your IP to the network access whitelist
4. Create a database user (username + password)
5. Click "Connect" → get your connection string:

```text
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

### Option 2: Install MongoDB Locally

**Windows:**

```bash
# Download from mongodb.com/try/download/community
# Run installer (choose "Complete" setup)
# MongoDB runs as a Windows service automatically
```

**macOS (Homebrew):**

```bash
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Linux (Ubuntu/Debian):**

```bash
# Import the public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
```

### Tools You'll Use

```mermaid
flowchart LR
    Dev[Developer] --> mongosh[MongoDB Shell<br/>mongosh]
    Dev --> Compass[MongoDB Compass<br/>GUI Tool]
    Dev --> App[Your App Code<br/>Node.js / Python]
    
    mongosh --> DB[(MongoDB<br/>Database)]
    Compass --> DB
    App --> Driver[Database Driver<br/>mongoose / pymongo]
    Driver --> DB
    
    style mongosh fill:#7c3aed,color:#fff
    style Compass fill:#7c3aed,color:#fff
    style DB fill:#3b82f6,color:#fff
    style Driver fill:#059669,color:#fff
```

#### 1. mongosh (MongoDB Shell)

The interactive JavaScript shell for MongoDB. This is your primary tool for querying and managing data.

```bash
# Connect to local MongoDB
mongosh

# Connect to a remote server
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/myapp" --username myuser

# Common commands once connected
show dbs               # list databases
use myapp              # switch to database
show collections       # list collections
db.help()              # get help
```

#### 2. MongoDB Compass (GUI)

A graphical tool to view, query, and manage your data visually. Great for exploring data without writing queries.

- Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Connect using the same connection string
- Visual query builder, schema analyzer, index management

#### 3. Database Drivers

For connecting from your application code:

```bash
# Node.js / JavaScript
npm install mongoose

# Python
pip install pymongo

# Java
# Add mongo-java-driver to your pom.xml

# Go
go get go.mongodb.org/mongo-driver/mongo
```

### Quick Start: Your First Connection

```js
// Node.js with mongoose
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

connectDB();
```

### Connection String Format

```text
mongodb://username:password@host:port/database?options

Examples:
mongodb://localhost:27017/myapp                    # local, no auth
mongodb+srv://user:pass@cluster.mongodb.net/myapp  # Atlas
mongodb://localhost:27017,localhost:27018/myapp     # replica set
```

---

### In Simple Words

- **Atlas** is the easiest way to start — free tier, no installation needed
- **mongosh** is your command-line tool for running queries
- **Compass** is a GUI for visually exploring your data
- **Drivers** (like Mongoose) let your app code talk to MongoDB

---

*Next: [Documents and Collections →](/DSA-Notes-Problems/mongodb/getting-started/documents-and-collections)*
