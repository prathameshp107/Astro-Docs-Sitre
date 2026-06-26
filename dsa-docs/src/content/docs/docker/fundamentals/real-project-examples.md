---
title: "Real Project Examples"
description: "---"
sidebar:
  order: 19
---

## 15. Real Project Examples

### 🌐 Project 1: Running Nginx Web Server

```bash
# Step 1: Pull and run Nginx
docker run -d \
  --name my-website \
  -p 8080:80 \
  nginx

# Step 2: Open http://localhost:8080 in browser
# You'll see the Nginx welcome page!

# Step 3: Serve your own HTML
docker run -d \
  --name my-website \
  -p 8080:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  nginx

# Create html/index.html:
echo "<h1>Hello from Docker!</h1>" > html/index.html

# Step 4: View logs
docker logs -f my-website

# Step 5: Clean up
docker stop my-website && docker rm my-website
```

---

### 🗄️ Project 2: Running MongoDB

```bash
# Step 1: Run MongoDB with authentication
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v mongo-data:/data/db \
  mongo:6

# Step 2: Connect via MongoDB shell
docker exec -it my-mongo mongosh \
  -u admin \
  -p password123 \
  --authenticationDatabase admin

# Step 3: Create a database and collection
use myapp
db.users.insertOne({ name: "Alice", email: "alice@example.com" })
db.users.find()

# Step 4: Connect from your app (Node.js)
# Connection string: mongodb://admin:password123@localhost:27017/myapp?authSource=admin

# Clean up (data persists in mongo-data volume)
docker stop my-mongo && docker rm my-mongo
```

---

### ⚡ Project 3: Running Redis

```bash
# Step 1: Run Redis
docker run -d \
  --name my-redis \
  -p 6379:6379 \
  redis:7 \
  redis-server --requirepass mypassword

# Step 2: Access Redis CLI
docker exec -it my-redis redis-cli -a mypassword

# Step 3: Basic Redis commands
AUTH mypassword
SET name "Alice"
GET name
SETEX session:123 3600 "user_data"
TTL session:123

# Step 4: Test from Node.js
# const redis = require('redis');
# const client = redis.createClient({ url: 'redis://:mypassword@localhost:6379' });

# Clean up
docker stop my-redis && docker rm my-redis
```

---

### 🟢 Project 4: Running a Node.js App

```bash
# Step 1: Create a simple Node.js app
mkdir my-node-app && cd my-node-app

# app.js
cat > app.js << 'EOF'
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`<h1>Hello from Docker! Running on port ${port}</h1>`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Step 2: Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
EOF

# Step 3: Build the image
docker build -t my-node-app .

# Step 4: Run the container
docker run -d \
  --name node-server \
  -p 3000:3000 \
  -e PORT=3000 \
  my-node-app

# Step 5: Test it
curl http://localhost:3000

# Step 6: View logs
docker logs node-server

# Clean up
docker stop node-server && docker rm node-server
docker rmi my-node-app
```

---
