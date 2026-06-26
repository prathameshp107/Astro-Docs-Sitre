---
title: "WebSockets & Real-Time"
description: "WebSocket protocol, ws library, Socket.io, rooms, broadcasting, and real-time use cases."
sidebar:
  order: 6
---

## WebSockets & Real-Time

**WebSockets** provide a persistent, bidirectional communication channel between client and server. Unlike HTTP (request-response), WebSockets allow the server to push data to clients in real time.

### WebSocket vs HTTP

| Feature | HTTP | WebSocket |
|---|---|---|
| Direction | Client → Server (request/response) | Bidirectional |
| Connection | Opens and closes per request | Persistent |
| Latency | Higher (handshake per request) | Low (single connection) |
| Real-time push | ❌ Polling required | ✅ Server pushes freely |
| Use cases | REST APIs, CRUD | Chat, live updates, gaming |

### Raw WebSocket with `ws`

```javascript
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('WebSocket server running');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  
  // Send a welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));
  
  // Handle incoming messages
  ws.on('message', (data) => {
    const message = data.toString();
    console.log('Received:', message);
    
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  
  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  // Handle errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err.message);
  });
});

server.listen(3000, () => console.log('WS server on :3000'));
```

```javascript
// Client side (browser)
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => console.log('Got:', JSON.parse(event.data));
ws.onerror = (err) => console.error(err);
ws.onclose = () => console.log('Disconnected');

ws.send(JSON.stringify({ type: 'chat', text: 'Hello!' }));
```

### Socket.io — The Standard for Production

Socket.io adds **automatic reconnection**, **rooms**, **namespaces**, and **fallback transports** (long-polling when WebSockets aren't available).

```javascript
// Server
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://myapp.com',
    methods: ['GET', 'POST'],
  },
  // Socket.io settings
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.user.name} connected (${socket.id})`);
  
  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      user: socket.user.name,
      id: socket.user.id,
    });
  });
  
  // Chat message
  socket.on('send-message', ({ roomId, text }) => {
    io.to(roomId).emit('new-message', {
      from: socket.user.name,
      userId: socket.user.id,
      text,
      timestamp: Date.now(),
    });
  });
  
  // Typing indicator
  socket.on('typing', ({ roomId, isTyping }) => {
    socket.to(roomId).emit('user-typing', {
      userId: socket.user.id,
      name: socket.user.name,
      isTyping,
    });
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log(`${socket.user.name} disconnected`);
  });
});
```

```javascript
// Client (browser)
import { io } from 'socket.io-client';

const socket = io('https://api.myapp.com', {
  auth: { token: 'jwt-token-here' },
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => console.log('Connected:', socket.id));
socket.on('disconnect', (reason) => console.log('Disconnected:', reason));
socket.on('connect_error', (err) => console.error('Connection error:', err.message));

// Join room
socket.emit('join-room', 'room-123');

// Send message
socket.emit('send-message', { roomId: 'room-123', text: 'Hello!' });

// Listen for messages
socket.on('new-message', (msg) => {
  console.log(`${msg.from}: ${msg.text}`);
});
```

### Rooms & Broadcasting

```javascript
io.on('connection', (socket) => {
  // Join multiple rooms
  socket.join(['general', `user:${socket.user.id}`]);
  
  // Broadcast to all EXCEPT sender
  socket.broadcast.emit('user-online', socket.user.id);
  
  // Broadcast to a specific room (including sender)
  io.to('general').emit('announcement', 'Welcome!');
  
  // Broadcast to a room (excluding sender)
  socket.to('general').emit('update', { /* ... */ });
  
  // Broadcast to all connected clients
  io.emit('global-event', { /* ... */ });
  
  // Leave a room
  socket.leave('general');
});
```

### Namespaces

Namespaces allow you to create separate communication channels on the same server.

```javascript
// Server
const chat = io.of('/chat');
const admin = io.of('/admin');

chat.on('connection', (socket) => {
  socket.on('message', (msg) => chat.emit('message', msg));
});

admin.on('connection', (socket) => {
  // Only authenticated admins
});
```

```javascript
// Client
const chatSocket = io('https://api.myapp.com/chat');
const adminSocket = io('https://api.myapp.com/admin');
```

### Use Cases

| Use Case | Why WebSockets |
|---|---|
| **Chat** | Instant message delivery |
| **Live dashboards** | Real-time metrics, server pushes updates |
| **Collaboration** | Google Docs-style concurrent editing |
| **Notifications** | Push alerts without polling |
| **Live sports/trading** | Low-latency data streams |
| **Multiplayer games** | Sub-100ms state sync |

### 🚨 Common Gotchas

```javascript
// ❌ Not handling disconnections gracefully
io.on('connection', (socket) => {
  socket.on('data', handler);
  // If connection drops, handler keeps running!

  // ✅ Clean up on disconnect
  socket.on('disconnect', () => {
    socket.removeAllListeners('data');
  });
});

// ❌ Broadcasting to yourself unintentionally
socket.emit('message', data);   // Only sender receives
io.emit('message', data);        // Everyone receives (including sender)
socket.broadcast.emit('message', data); // Everyone except sender

// ❌ Not rate-limiting WebSocket messages
// A client could flood the server with events
// Use rate limiting middleware or message throttling
```

### Key Takeaways

- **WebSockets** provide persistent, bidirectional communication — ideal for real-time apps
- **Socket.io** adds auto-reconnection, rooms, namespaces, and fallback transports
- Use **rooms** to group clients (e.g., by chat room, by user ID)
- Authenticate connections in `io.use()` middleware
- Always clean up listeners on `disconnect` to prevent memory leaks
- Rate-limit WebSocket messages to prevent abuse
- Use namespaces to separate concerns (chat vs admin vs analytics)
