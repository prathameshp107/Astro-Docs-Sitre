---
title: "Building APIs"
description: "REST APIs, HTTP methods, status codes, and building a raw HTTP server with Node.js."
---

# Section 5: Building APIs

## 🌐 What is a REST API?

An **API** (Application Programming Interface) is a way for different software systems to communicate. A **REST API** is a specific style that uses HTTP.

> **Real-world analogy**: A restaurant menu is an API. You (client) look at the menu (API docs), place an order (make a request), and the kitchen (server) prepares and returns your food (response).

---

## 📋 HTTP Methods

| Method | Purpose | Example | Body? |
|--------|---------|---------|-------|
| `GET` | Retrieve data | `GET /users` | ❌ No |
| `POST` | Create new data | `POST /users` | ✅ Yes |
| `PUT` | Replace entire resource | `PUT /users/1` | ✅ Yes |
| `PATCH` | Update part of resource | `PATCH /users/1` | ✅ Yes |
| `DELETE` | Delete resource | `DELETE /users/1` | ❌ No |

---

## 📊 HTTP Status Codes

| Range | Category | Common Codes |
|-------|----------|-------------|
| 2xx | ✅ Success | 200 OK, 201 Created, 204 No Content |
| 3xx | ↩️ Redirect | 301 Moved, 304 Not Modified |
| 4xx | ❌ Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | 💥 Server Error | 500 Internal Error, 502 Bad Gateway, 503 Service Unavailable |

---

## 🏗️ Building a Raw HTTP Server

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  
  if (path === '/health' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'OK', uptime: process.uptime() }));
  
  } else if (path === '/users' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));
  
  } else if (path === '/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const user = JSON.parse(body);
      res.writeHead(201);
      res.end(JSON.stringify({ id: 2, ...user }));
    });
  
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
```
