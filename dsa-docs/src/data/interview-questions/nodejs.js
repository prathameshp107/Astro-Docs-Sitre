// ─── Node.js Interview Questions (200) ──────────────────────────────────
export const NODEJS_QUESTIONS = [
  // ── Easy ─────────────────────────────────────────────────────────────────
  [
    "What is Node.js and how does it differ from browser JavaScript?",
    "easy",
    "Node.js is a JS runtime built on V8 engine for server-side development. Differences: no DOM/BOM APIs, has server modules (fs, http, path), supports file system, process management, CommonJS/ESM modules, global objects (process, global, Buffer, __dirname). Browser JS has DOM APIs, window, fetch built-in, HTML APIs. Node adds server capabilities; browser adds UI capabilities."
  ],
  [
    "What is the V8 engine?",
    "easy",
    "V8 is Google's open-source JS engine written in C++. Compiles JS to native machine code (JIT compilation via TurboFan). Powers Chrome, Node.js, Deno, and Electron. Handles memory management (garbage collection), optimization (inline caching, hidden classes), and ES6+ feature support. V8 is what makes Node.js fast."
  ],
  [
    "What does non-blocking I/O mean in Node.js?",
    "easy",
    "Non-blocking I/O means operations (file reads, network requests, DB queries) don't block the main thread. Instead of waiting for completion, Node registers a callback and continues executing other code. When the I/O completes, the callback runs. This enables Node to handle thousands of concurrent connections with a single thread."
  ],
  [
    "What is the Event Loop in Node.js?",
    "easy",
    "The Event Loop is Node.js's mechanism for handling asynchronous operations. It continuously checks for pending tasks, executes callbacks, and processes I/O events. Phases: timers → pending callbacks → idle/prepare → poll → check → close callbacks. It's what makes Node.js non-blocking despite being single-threaded."
  ],
  [
    "What is the difference between synchronous and asynchronous code in Node.js?",
    "easy",
    "Synchronous code blocks execution until the operation completes: `fs.readFileSync('file.txt')` halts everything. Asynchronous code doesn't block: `fs.readFile('file.txt', callback)` returns immediately, the callback runs when the file is read. Async is the Node.js way — it's what enables high concurrency."
  ],
  [
    "What is a callback function in Node.js?",
    "easy",
    "A callback is a function passed as an argument to an async operation, to be called when the operation completes. Example: `fs.readFile('file.txt', 'utf8', (err, data) => { if (err) throw err; console.log(data); })`. Callbacks follow the error-first convention in Node.js."
  ],
  [
    "What is the error-first callback convention?",
    "easy",
    "The standard Node.js callback pattern: `callback(err, result)`. First argument is an error (null if no error), second is the result. If error occurs, result is undefined. If successful, error is null. This pattern ensures consistent error handling across all Node.js APIs. Example: `fs.readFile(path, (err, data) => { if (err) return handleError(err); // use data })`."
  ],
  [
    "What is require() and what does it return?",
    "easy",
    "`require('module')` loads a module and returns its exports object. For core modules: `require('fs')`. For local files: `require('./myModule')`. For node_modules: `require('lodash')`. Returns the value of `module.exports`. Modules are cached after first load — subsequent `require()` calls return the cached instance."
  ],
  [
    "What is module.exports and exports?",
    "easy",
    "`module.exports` is the object that `require()` returns. `exports` is a shorthand reference to `module.exports`. You can set properties: `exports.foo = 'bar'`. But reassigning `exports = {...}` breaks the reference — use `module.exports = {...}` for that. Always prefer `module.exports` for clarity."
  ],
  [
    "What is the difference between dependencies and devDependencies in package.json?",
    "easy",
    "`dependencies`: packages required at runtime (express, mongoose, axios). Installed in production and development. `devDependencies`: packages needed only for development (jest, eslint, typescript). Omitted when `NODE_ENV=production`. Separating them reduces production install size and prevents dev tools from running in production."
  ],
  [
    "What does npm install do?",
    "easy",
    "`npm install` reads `package.json`, downloads all listed dependencies and their transitive deps into `node_modules`. Creates/updates `package-lock.json`. `npm install <package>` adds a new dependency. `npm ci` installs from lockfile only (faster, used in CI). Installed packages are cached globally for speed."
  ],
  [
    "What is package-lock.json and why should you commit it?",
    "easy",
    "`package-lock.json` locks dependency versions (including transitive deps) to exact versions. Ensures reproducible builds across environments. Contains integrity hashes for security verification. Always commit it — without it, different machines may install different minor/patch versions, causing \"works on my machine\" issues."
  ],
  [
    "What is the difference between npm and npx?",
    "easy",
    "`npm` manages packages (install, update, remove). `npx` executes packages without installing them globally — runs from the local `node_modules/.bin` or downloads temporarily. Example: `npx create-react-app my-app` runs the CLI without global install. Useful for one-off commands."
  ],
  [
    "What are the core Node.js modules? Name five.",
    "easy",
    "Core modules: `fs` (file system), `path` (path manipulation), `http`/`https` (HTTP servers/clients), `os` (operating system info), `events` (EventEmitter), `stream` (streaming data), `crypto` (cryptography), `child_process` (spawning processes), `util` (utility functions), `buffer` (binary data). These come bundled with Node.js — no installation needed."
  ],
  [
    "How do you read a file in Node.js?",
    "easy",
    "Async: `fs.readFile('path', 'utf8', (err, data) => { ... })`. With promises: `const data = await fs.promises.readFile('path', 'utf8')`. Sync (not recommended for prod): `const data = fs.readFileSync('path', 'utf8')`. Always prefer async/promise versions to avoid blocking the event loop."
  ],
  [
    "What is the difference between fs.readFile and fs.readFileSync?",
    "easy",
    "`fs.readFile` is asynchronous — takes a callback, doesn't block. `fs.readFileSync` is synchronous — blocks the event loop until the file is read. For server startup scripts, sync is acceptable. For runtime file reads, always use async. `fs.promises.readFile` is the promise-based async version."
  ],
  [
    "What is process.env and how do you use environment variables?",
    "easy",
    "`process.env` is an object containing environment variables. Set via shell: `PORT=3000 node app.js`. Read: `const port = process.env.PORT || 3000`. Best practice: load from `.env` files using `dotenv` package, validate with Zod or joi, access via a config module that provides typed defaults."
  ],
  [
    "What is the http module in Node.js?",
    "easy",
    "`http.createServer((req, res) => { res.writeHead(200); res.end('OK'); })` creates an HTTP server. The `req` is an IncomingMessage (readable stream), `res` is a ServerResponse (writable stream). In production, use Express or Fastify instead of raw http, but raw http is useful for understanding the fundamentals."
  ],
  [
    "What is Express.js?",
    "easy",
    "Express is a minimal web framework for Node.js. Provides: routing (`app.get('/api/users', handler)`), middleware (functions that process requests), static file serving, template engines, error handling. De facto standard for Node.js HTTP servers. Lightweight, flexible, large ecosystem of middleware packages."
  ],
  [
    "How do you define a GET route in Express?",
    "easy",
    "`app.get('/path', (req, res) => { res.json({ message: 'Hello' }); })`. Route params: `app.get('/users/:id', (req, res) => { const id = req.params.id; })`. Query params: `req.query.page`. Chainable: `app.route('/users').get(handler).post(handler)`."
  ],
  [
    "What is middleware in Express?",
    "easy",
    "Middleware are functions that have access to `req`, `res`, and `next`. They execute in order, can modify req/res, end the response, or call `next()` to pass control. Types: application-level (`app.use`), router-level, error-handling (4 args: `(err, req, res, next)`), built-in (`express.json()`), third-party (cors, morgan)."
  ],
  [
    "What does next() do in Express middleware?",
    "easy",
    "`next()` passes control to the NEXT middleware function in the stack. If called without arguments, passes to the next matching middleware. `next('route')` skips to the next route handler. `next(err)` skips all regular middleware and goes to error-handling middleware. Forgetting to call `next()` or send a response hangs the request."
  ],
  [
    "How do you parse JSON request bodies in Express?",
    "easy",
    "`app.use(express.json())` — parses `Content-Type: application/json` requests and puts the parsed body on `req.body`. `express.urlencoded({ extended: true })` — parses URL-encoded bodies (forms). These use the body-parser library (bundled with Express 4.16+)."
  ],
  [
    "What is req.params vs req.query vs req.body?",
    "easy",
    "`req.params`: route parameters (`/users/:id` → `req.params.id`). `req.query`: query string parameters (`/users?page=1` → `req.query.page`). `req.body`: parsed request body (requires body-parser middleware). All are objects. `params` and `query` are always present; `body` requires parsing middleware."
  ],
  [
    "What is the difference between app.use() and app.get()?",
    "easy",
    "`app.use(path, middleware)` matches ANY HTTP method (GET, POST, etc.) for the given path. `app.get(path, handler)` only matches GET requests. Use `app.use` for middleware (logging, auth, parsing). Use `app.get/post/put/delete` for route-specific handlers. `app.use` without path matches ALL requests."
  ],
  [
    "What is a REST API?",
    "easy",
    "REST (Representational State Transfer) is an architectural style for APIs. Uses HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Resources are identified by URLs (`/users/123`). Stateless — each request contains all necessary info. Responses use status codes (200, 201, 400, 404, 500)."
  ],
  [
    "What does the 201 status code mean?",
    "easy",
    "201 Created — indicates a resource was successfully created (usually after POST). The response should include a Location header pointing to the new resource. Contrast with 200 OK (generic success) and 204 No Content (success, no body)."
  ],
  [
    "What does the 404 status code mean?",
    "easy",
    "404 Not Found — the server cannot find the requested resource. Can mean: invalid URL, deleted resource, or unlisted resource. Not an error on the server side — it's the client asking for something that doesn't exist. Don't confuse with 410 Gone (resource was intentionally removed)."
  ],
  [
    "What is CORS?",
    "easy",
    "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls cross-origin requests. Server must include headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`. In Express: `npm install cors`, then `app.use(cors())`. For specific origins: `cors({ origin: 'https://myapp.com' })`."
  ],
  [
    "What is dotenv and why is it used?",
    "easy",
    "`dotenv` loads environment variables from a `.env` file into `process.env`. Usage: `require('dotenv').config()` at app startup. `.env` file: `PORT=3000\nDB_URL=mongodb://...`. Never commit `.env` to version control — add to `.gitignore`. Use `.env.example` as a template. Alternatives: Node 20+ `--env-file .env` flag."
  ],

  // ── Medium ────────────────────────────────────────────────────────────────
  [
    "What are Promises in Node.js and how do they work?",
    "med",
    "Promises represent future values. States: pending → fulfilled/rejected. `fs.promises` provides promise-based file operations. `util.promisify()` converts callback APIs to promises. Chaining: `.then(val => ...).catch(err => ...)`. Avoid nesting — chain properly. Parallel: `Promise.all([p1, p2])`. Sequential: `await` in a loop."
  ],
  [
    "What is async/await and how does it relate to Promises?",
    "med",
    "`async` functions always return a Promise. `await` pauses execution until a Promise settles (without blocking). Syntax sugar over Promise chains — makes async code read like sync. Error handling: `try/catch`. `await Promise.all()` for concurrency. Cannot use `await` at top level without top-level await (ESM modules)."
  ],
  [
    "What is Promise.all vs Promise.allSettled?",
    "med",
    "`Promise.all([...])` rejects IMMEDIATELY if ANY promise rejects — loses results from successful ones. `Promise.allSettled([...])` waits for ALL promises to settle (resolve or reject) — returns `[{status, value/reason}]`. Use `all` when all must succeed. Use `allSettled` when partial results are acceptable."
  ],
  [
    "What is Promise.race and Promise.any?",
    "med",
    "`Promise.race([...])` settles when the FIRST promise settles (resolve or reject). `Promise.any([...])` resolves when the FIRST promise resolves — rejects only if ALL reject (AggregateError). Use `race` for timeouts (with a delayed reject). Use `any` for multiple redundant data sources (fastest response wins)."
  ],
  [
    "What is the difference between CommonJS and ES Modules in Node.js?",
    "med",
    "CommonJS: `require()`/`module.exports`. Synchronous, dynamic (can `require` conditionally), cached after first load. Default in `.js` files (unless `\"type\": \"module\"` in package.json). ES Modules: `import`/`export`. Static (static analysis enables tree shaking), top-level await, `import.meta` (not `__dirname`). Use `.mjs` or `\"type\": \"module\"`. ESM is the future."
  ],
  [
    "What is the difference between module.exports and exports? When do they diverge?",
    "med",
    "`exports` is a reference to `module.exports`. `exports.foo = 'bar'` sets `module.exports.foo`. But `exports = { foo: 'bar' }` REASSIGNS the `exports` variable — the reference is broken, `module.exports` remains unchanged. Always use `module.exports = {...}` when assigning a new object or function. Use `exports` only for adding properties."
  ],
  [
    "What is the Node.js module cache and how does it work?",
    "med",
    "`require()` caches modules after first load — subsequent `require()` for the same module returns the cached exports. Cache is stored in `require.cache`. Forcing reload: `delete require.cache[require.resolve('./module')]`. This is essential for module singleton behavior. In tests, clearing the cache between tests prevents state leakage."
  ],
  [
    "What are the phases of the Node.js Event Loop?",
    "med",
    "Six phases in order: 1) Timers (`setTimeout`, `setInterval`). 2) Pending callbacks (I/O callbacks deferred to next iteration). 3) Idle/Prepare (internal). 4) Poll (retrieve new I/O events, execute I/O callbacks). 5) Check (`setImmediate` callbacks). 6) Close callbacks (closed connections, `socket.on('close')`). Between phases, microtasks (process.nextTick, Promise callbacks) are drained."
  ],
  [
    "What is the difference between process.nextTick and setImmediate?",
    "med",
    "`process.nextTick()` runs callbacks BEFORE the next event loop phase — effectively at the end of the current phase (highest priority). `setImmediate()` runs callbacks in the CHECK phase (after the poll phase). `nextTick` can starve I/O if used recursively. `setImmediate` is safer for deferring work. Prefer `setImmediate` or `queueMicrotask` over `nextTick`."
  ],
  [
    "What is libuv and what role does it play in Node.js?",
    "med",
    "libuv is a C library that provides the event loop, asynchronous I/O (file, DNS, network), thread pool, and cross-platform abstractions. It's what makes Node.js non-blocking. Handles: file operations via the thread pool, networking via epoll/kqueue/IOCP, DNS resolution, signal handling, timers. Without libuv, Node.js would block on I/O operations."
  ],
  [
    "What are streams in Node.js? Name the four types.",
    "med",
    "Streams process data piece by piece (no need to fit entire data in memory). Four types: Readable (source of data — `fs.createReadStream`), Writable (destination — `fs.createWriteStream`), Duplex (both readable and writable — `net.Socket`), Transform (duplex that modifies data — `zlib.createGzip`). Streams emit events: `data`, `end`, `error`, `close`, `drain`."
  ],
  [
    "What is backpressure in Node.js streams?",
    "med",
    "Backpressure occurs when a readable stream produces data faster than the writable stream can consume. Pipe handles it automatically: if `writable.write()` returns false, readable is paused until writable's 'drain' event fires. Manual handling: check return of `.write()` and implement backpressure-aware logic. Unhandled backpressure causes memory overflow."
  ],
  [
    "What is a Buffer in Node.js?",
    "med",
    "Buffer represents binary data (raw memory allocation). Created: `Buffer.alloc(size)`, `Buffer.from('hello', 'utf8')`. Useful for: binary protocols, file I/O, cryptography, stream chunks. Buffers are Uint8Array under the hood. Slicing a Buffer creates a new view into the same memory (not a copy). Convert to string: `buf.toString('utf8')`."
  ],
  [
    "What is the EventEmitter class and how do you use it?",
    "med",
    "EventEmitter is a core Node.js class for pub/sub pattern. `const emitter = new EventEmitter(); emitter.on('event', handler); emitter.emit('event', data)`. Many Node.js objects inherit from EventEmitter (http server, streams). Methods: `on`, `once`, `emitter.off`, `emit`, `listeners`, `removeAllListeners`. Max listeners default 10 — change with `emitter.setMaxListeners(n)`."
  ],
  [
    "What is the difference between on() and once() in EventEmitter?",
    "med",
    "`emitter.on('event', fn)` — listener fires EVERY time the event is emitted. `emitter.once('event', fn)` — listener fires ONLY ONCE, then auto-removed. Use `once` for one-time initialization events, connection readiness, or setup-on-first-call patterns. `once` is memory-safe when you know the event only needs one handler."
  ],
  [
    "What is the difference between __dirname and process.cwd()?",
    "med",
    "`__dirname` is the directory of the CURRENT module file (always the same regardless of where the app is run from). `process.cwd()` is the CURRENT WORKING DIRECTORY (where `node` was invoked). Absolute imports should use `__dirname`. `process.cwd()` is useful for CLI tools that reference files relative to the user's project."
  ],
  [
    "What is the path module and why use it instead of string concatenation?",
    "med",
    "`path` provides cross-platform path handling. `path.join('dir', 'sub', 'file.txt')` joins segments with the OS-specific separator (`\\` on Windows, `/` on Linux). `path.resolve('dir', 'file.txt')` resolves to absolute path. `path.basename`, `path.dirname`, `path.extname`, `path.parse`. Use instead of string concatenation to avoid separator bugs and ensure cross-platform compatibility."
  ],
  [
    "What is fs.promises and how does it differ from callback-based fs?",
    "med",
    "`fs.promises` provides promise-based versions of all `fs` APIs: `await fs.promises.readFile(path, 'utf8')`. No callbacks — use with async/await. Simpler error handling (try/catch). Available since Node 10. Prefer over callback-based fs for cleaner code. The callback-based version is still available for compatibility."
  ],
  [
    "What is an HTTP interceptor pattern in Node.js?",
    "med",
    "Interceptors wrap HTTP requests to add cross-cutting behavior (auth, logging, retry, caching). With axios: `axios.interceptors.request.use(config => { config.headers.Authorization = `Bearer ${token}`; return config; })`. For fetch: wrap in a custom function that adds headers, handles errors, and retries. Interceptors keep API call code clean."
  ],
  [
    "How does Express error-handling middleware differ from regular middleware?",
    "med",
    "Error-handling middleware has FOUR parameters: `(err, req, res, next)`. Defined LAST after all routes. Express skips all regular middleware and routes when `next(err)` is called. Must send a response (or call next(err) for global error handler). Example: `app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: err.message }); })`."
  ],
  [
    "What is Express Router and how do you use it?",
    "med",
    "`express.Router()` creates modular route handlers. Example: `const router = express.Router(); router.get('/', handler); router.post('/', handler); module.exports = router;`. Mount: `app.use('/api/users', userRouter)`. Routers can have their own middleware, params, and error handlers. Essential for organizing large Express applications."
  ],
  [
    "What is the difference between PUT and PATCH HTTP methods?",
    "med",
    "PUT replaces the ENTIRE resource — send all fields (including unchanged ones). Idempotent: same request multiple times = same result. PATCH applies PARTIAL modifications — send only the fields to update. Not necessarily idempotent (increment operation). Example: PUT `/users/1` with full body, PATCH `/users/1` with `{ \"name\": \"New\" }` only."
  ],
  [
    "What does idempotent mean for HTTP methods?",
    "med",
    "Idempotent: making the same request multiple times produces the same server state (same side effect). GET, PUT, DELETE are idempotent. POST is NOT (creates new resource each time). PATCH can be idempotent depending on implementation. Idempotency is crucial for retry-safety in unreliable networks."
  ],
  [
    "What is JWT and how is it used for authentication?",
    "med",
    "JWT (JSON Web Token) is a compact, self-contained token format. Three parts: header (algorithm), payload (claims like userId, role), signature (signed with a secret). Flow: user logs in → server generates JWT → client stores it → sends in Authorization header → server verifies signature → extracts user info. No server-side session storage needed (stateless)."
  ],
  [
    "What is the difference between authentication and authorization?",
    "med",
    "Authentication verifies WHO you are (login, password, JWT). Authorization determines WHAT you can access (roles, permissions). Authentication comes first, then authorization. Example: user logs in (auth), then checks if user has \"admin\" role to access admin panel (authorization). Configured separately in most frameworks."
  ],
  [
    "How do you hash passwords securely in Node.js?",
    "med",
    "Use `bcrypt` (or `argon2`): `const hash = await bcrypt.hash(password, 12)` (salt rounds). Compare: `await bcrypt.compare(plainPassword, hash)`. Never store plain text passwords. Never use MD5 or SHA-256 for passwords (fast to compute = easy to brute force). bcrypt/argon2 are intentionally slow. Salt rounds of 10-12 are standard."
  ],
  [
    "What is bcrypt and why should you use it over SHA-256 for passwords?",
    "med",
    "bcrypt is an adaptive, computationally expensive hash function designed for passwords. It's SLOW by design (configurable cost factor) — making brute force attacks impractical. SHA-256 is FAST — designed for data integrity, not password storage. A GPU can compute billions of SHA-256 hashes per second but only thousands of bcrypt hashes. bcrypt also handles salting automatically."
  ],
  [
    "What is connection pooling for databases?",
    "med",
    "Connection pooling maintains a cache of database connections (e.g., 10-20) that are reused instead of creating a new connection per request. Reduces overhead of establishing connections (handshake, auth). Libraries: `pg-pool` (PostgreSQL), `mysql2` (built-in pool), `mongoose` (default connection pool). Pool size = expected concurrent requests + buffer. Too many connections exhaust DB resources."
  ],
  [
    "What is an ORM? Name popular Node.js ORMs.",
    "med",
    "ORM (Object-Relational Mapping) maps database tables to objects/classes. Popular Node.js ORMs: Prisma (modern, type-safe, auto-generated client), TypeORM (class-based, supports Active Record/Data Mapper), Sequelize (mature, promise-based), Knex (query builder, not full ORM). ORMs abstract SQL, provide migrations, and enable type safety."
  ],
  [
    "What is the N+1 query problem?",
    "med",
    "N+1 occurs when fetching a list of N items, then for each item, executing an additional query. Example: fetch 100 users, then for each user, query their posts = 101 queries. Fix: eager loading (JOIN or include), batch loading (DataLoader pattern). ORMs provide `include`/`populate` to fetch related data in one query."
  ],
  [
    "What is rate limiting and how do you implement it in Express?",
    "med",
    "Rate limiting restricts requests per time window. Express: `npm install express-rate-limit`. `const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 }); app.use(limiter)`. For distributed systems: use Redis-based rate limiting (via `rate-limit-redis`). Configurable per route, apply globally or per-IP. Returns 429 Too Many Requests when exceeded."
  ],
  [
    "What is SQL injection and how do you prevent it?",
    "med",
    "SQL injection: attacker injects SQL through input fields. `' OR 1=1; --` becomes part of the query. Prevention: 1) Use parameterized queries / prepared statements (NEVER string interpolation). 2) ORMs abstract this. 3) Input validation/sanitization. 4) Least privilege DB user (no DROP TABLE). Example: `SELECT * FROM users WHERE id = $1` with `$1` as parameter."
  ],
  [
    "What is the difference between session-based and token-based authentication?",
    "med",
    "Session-based: server stores session data (in memory or Redis), client stores session ID cookie. Stateful — server knows who's logged in. Token-based (JWT): server issues a signed token, client stores it (localStorage, cookie). Stateless — server only verifies the signature. Token-based scales better (no shared session store), but tokens can't be revoked server-side (until expiry)."
  ],
  [
    "What is HTTPS and how do you set it up in Node.js?",
    "med",
    "HTTPS encrypts HTTP traffic with TLS/SSL. Node: `https.createServer({ key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') }, app).listen(443)`. In production: use a reverse proxy (Nginx, Caddy) or managed services (Heroku, Vercel) that handle TLS termination. Tools: Let's Encrypt (free certs via `certbot`), `greenlock-express`."
  ],
  [
    "What is the child_process module used for?",
    "med",
    "`child_process` spawns new processes: `exec` (shell command, buffers output), `spawn` (streams output), `fork` (new Node process with IPC channel). Use for: running shell/OS commands, CPU-intensive tasks (offloading to separate process), system administration. Example: `const { stdout } = await exec('ls -la')`. Be careful: `exec` can buffer large outputs in memory."
  ],

  // ── Hard ──────────────────────────────────────────────────────────────────
  [
    "How does the Node.js cluster module work?",
    "hard",
    "`cluster` creates child processes (workers) that share the same server port. Master process forks workers. Workers handle requests independently. Enables multi-core utilization (Node is single-threaded per process). Load balancing: round-robin (default on non-Windows). `cluster.schedulingPolicy` controls balancing. Use PM2 for production clustering."
  ],
  [
    "What is the difference between cluster and Worker Threads?",
    "med",
    "Cluster: multiple Node.js processes sharing a port — each has its own memory, event loop, and V8 instance. Worker Threads: multiple threads within the SAME process — share memory (SharedArrayBuffer), same event loop, lighter weight. Use cluster for HTTP scaling (multi-core). Use Worker Threads for CPU-intensive tasks within one app."
  ],
  [
    "What is the thread pool in libuv and what operations use it?",
    "hard",
    "libuv's thread pool (default 4 threads, configurable via `UV_THREADPOOL_SIZE`) handles operations that can't be async in the OS. Operations: `fs` (all file operations), `crypto` (pbkdf2, randomBytes, scrypt), `dns.lookup`, `zlib` (compression), `child_process` on some platforms. Network I/O (HTTP, TCP, UDP) does NOT use the thread pool — uses OS async I/O (epoll, kqueue)."
  ],
  [
    "How do you handle uncaught exceptions and unhandled promise rejections?",
    "hard",
    "`process.on('uncaughtException', err => { console.error(err); process.exit(1); })` — catches sync errors not caught elsewhere (process is in an unstable state, should restart). `process.on('unhandledRejection', reason => { console.error(reason); process.exit(1); })` — catches Promise rejections without a `.catch()`. In Node 15+, unhandled rejections crash the process by default."
  ],
  [
    "What is graceful shutdown in Node.js?",
    "hard",
    "Graceful shutdown: 1) Listen for SIGTERM/SIGINT. 2) Stop accepting new requests (server.close()). 3) Wait for in-flight requests to complete (with timeout). 4) Close database connections, release resources. 5) Exit process. Pattern: `process.on('SIGTERM', async () => { console.log('Shutting down...'); await server.close(); await db.close(); process.exit(0); })`."
  ],
  [
    "What is the SIGTERM signal and how do you handle it?",
    "hard",
    "SIGTERM is a termination signal sent to gracefully stop a process (default signal from process managers like PM2, Kubernetes). Node handles it by exiting immediately with default handler. Override: `process.on('SIGTERM', handler)` to implement graceful shutdown. Contrast with SIGKILL (cannot be caught, kills immediately). Always handle SIGTERM for production readiness."
  ],
  [
    "What is memory management in Node.js? What causes memory leaks?",
    "hard",
    "Node.js (V8) uses garbage collection (mark-and-sweep, generational). Common leaks: global variables (accidental globals), forgotten timers/intervals, closures retaining large objects, event listeners not removed (exceeding max listeners), cached data growing unbounded, detached DOM elements (jsdom), large buffers. Use Chrome DevTools (--inspect), `heapdump`, or clinic.js for diagnosis."
  ],
  [
    "How do you profile and debug memory leaks in Node.js?",
    "hard",
    "Tools: 1) `node --inspect` + Chrome DevTools Memory tab (heap snapshots, allocation timeline). 2) `heapdump` package (take heap snapshots on demand). 3) `clinic.js` (Heap, Bubbleprof, Doctor profilers). 4) `process.memoryUsage()` for monitoring. 5) `--trace-gc` for GC events. Take baseline snapshot → run suspect operation → compare snapshots — find retained objects."
  ],
  [
    "What is the --inspect flag and how do you use Chrome DevTools with Node.js?",
    "hard",
    "`node --inspect app.js` starts Node with debugging enabled (port 9229). Open `chrome://inspect` in Chrome → click Open dedicated DevTools for Node. Features: JS profiling, heap snapshots, async call stacks, CPU profiling, step-through debugging. `--inspect-brk` pauses on first line. For production: use Node's inspector carefully — has security implications."
  ],
  [
    "What is PM2 and what does it offer over running node directly?",
    "hard",
    "PM2 is a production process manager for Node.js. Features: automatic restart on crash, cluster mode (multi-core), zero-downtime reload, log management, monitoring dashboard, startup scripts, environment management. Config file: `ecosystem.config.js`. Alternatives: `forever` (simpler), Docker (container orchestration), systemd (Linux service manager)."
  ],
  [
    "What is the difference between horizontal and vertical scaling in Node.js?",
    "hard",
    "Vertical scaling: bigger single machine (more CPU, RAM). Simpler but has hardware limits. Horizontal scaling: add more machines (instances) behind a load balancer. Node excels at horizontal — lightweight process per instance. Use horizontal for: traffic spikes, availability, fault tolerance. Use vertical for: data-heavy apps where sharding is complex."
  ],
  [
    "What is the Reactor pattern in Node.js?",
    "hard",
    "The Reactor pattern is Node.js's I/O model: a single-threaded event loop registers interest in I/O events, then DEMULTIPLEXES (reacts to) events as they occur. libuv handles the event demultiplexing (via epoll/kqueue/IOCP). When an operation completes, the callback is queued and executed by the main thread. This enables single-threaded concurrency."
  ],
  [
    "What is a Transform stream and how do you build one?",
    "hard",
    "Transform streams are Duplex streams that modify data between read and write. Build: `class UpperCase extends Transform { _transform(chunk, encoding, callback) { this.push(chunk.toString().toUpperCase()); callback(); } }`. Use: `readable.pipe(new UpperCase()).pipe(writable)`. `_transform` should call `callback()` or `this.push(data); callback()`. `_flush` runs before the transform ends."
  ],
  [
    "What is the difference between stream piping and manual data handling?",
    "med",
    "`.pipe()` is recommended for most cases: handles backpressure automatically, buffers correctly, cleans up on errors. Manual handling (`readable.on('data', chunk => writable.write(chunk))`) requires managing: backpressure (checking write return), errors, and end-of-stream events. `stream.pipeline()` (from `stream` module) is better than `.pipe()` — propagates errors and cleans up properly."
  ],
  [
    "What is NDJSON (Newline Delimited JSON) and how do you stream it?",
    "hard",
    "NDJSON is JSON objects separated by newlines (one JSON object per line). Stream processing: read line by line, parse each line independently. Good for: log files, data exports, real-time data feeds. In Node: `readline` or `split2` to split stream by newlines, then `JSON.parse` each line. Memory efficient — no need to load entire file."
  ],
  [
    "What are the limitations of the single-threaded model for CPU-intensive tasks?",
    "hard",
    "CPU-intensive tasks BLOCK the event loop — no other requests can be processed. Examples: image processing, JSON serialization of large objects, cryptography, data transformation. Solutions: 1) Worker Threads (same Node process, parallel execution). 2) child_process.fork (separate process). 3) Offload to microservice. 4) Use native addons (C++ via node-addon-api)."
  ],
  [
    "How do you run CPU-intensive tasks without blocking the event loop?",
    "hard",
    "1) Worker Threads: `new Worker('./heavy-task.js')` — runs in separate thread. 2) child_process.fork: spawns new Node process (heavier). 3) Use stream/async iteration to yield to event loop: `for await (const chunk of stream) { await new Promise(r => setImmediate(r)); }`. 4) Split work into chunks with `setImmediate()` between each chunk."
  ],
  [
    "What is the SharedArrayBuffer and Atomics API in Node.js?",
    "hard",
    "`SharedArrayBuffer` allows Worker Threads to share memory (no serialization overhead). `Atomics` provides thread-safe operations: `Atomics.add()`, `Atomics.load()`, `Atomics.store()`, `Atomics.compareExchange()`, `Atomics.wait()`/`Atomics.notify()`. Use for: shared counters, ring buffers, high-performance data sharing. Requires `--enable-sharedarraybuffer` or compatible Node version."
  ],
  [
    "What is the vm module in Node.js?",
    "hard",
    "`vm` module runs JavaScript code in a V8 virtual machine (sandboxed context). `vm.runInNewContext('code', { sandbox })` — code runs in isolated sandbox. Use cases: evaluating user-submitted code, plugin systems, template evaluation. Security limitations: the sandbox can be escaped — vm is NOT a secure sandbox. For untrusted code, use real sandboxes (isolated processes, Docker containers)."
  ],
  [
    "What is the net module used for?",
    "hard",
    "`net` module creates TCP servers and clients. Lower-level than HTTP. Use for: custom protocols, TCP socket servers, IPC (inter-process communication via Unix sockets), real-time data streams. Example: `net.createServer(socket => { socket.on('data', chunk => ...); socket.write('response'); })`."
  ],
  [
    "What is WebSocket and how do you implement it in Node.js?",
    "hard",
    "WebSocket provides full-duplex persistent connection over HTTP (upgraded to ws://). Library: `ws` package. Server: `new WebSocket.Server({ port: 8080 })`. Client: `new WebSocket('ws://...')`. Events: `connection`, `message`, `close`, `error`. Use for: real-time apps (chat, live updates, gaming, trading). More efficient than HTTP polling."
  ],
  [
    "What is the difference between long-polling and Server-Sent Events?",
    "hard",
    "Long-polling: client requests, server holds request open until new data available, then responds. Client re-requests immediately. Latency of ~RTT. SSE (Server-Sent Events): single persistent HTTP connection, server pushes events to client (one-way). Lower latency, auto-reconnect. Native browser support via `EventSource`. WebSocket: bidirectional, lowest latency, fully real-time."
  ],
  [
    "What is GraphQL and how does it differ from REST?",
    "hard",
    "GraphQL is a query language/API layer where clients specify EXACTLY the fields they need. Single endpoint (POST /graphql). Strong typing (schema). Over-fetching and under-fetching eliminated. Powerful introspection. REST: multiple endpoints, fixed response shapes, HTTP methods semantics, caching inherent. GraphQL: flexible queries, more complex caching, needs additional tools (Apollo, Relay)."
  ],
  [
    "What is the n+1 problem in GraphQL and how do you solve it with DataLoader?",
    "hard",
    "GraphQL resolvers can cause N+1: resolving a list of N items triggers N individual DB queries for each item's related data. DataLoader batches individual keys into one query: `const loader = new DataLoader(keys => db.findByIds(keys))`. `loader.load(userId)` caches and batches — multiple loads in the same tick become one query. Eliminates N+1 without manual batching."
  ],
  [
    "What is microservices architecture and how does Node.js fit into it?",
    "hard",
    "Microservices: breaking an app into small, independent services communicating via network (HTTP, message queue, gRPC). Node.js is ideal: lightweight, fast startup, good for I/O-intensive services, large npm ecosystem. Challenges: service discovery, distributed tracing, data consistency, inter-service communication. Tools: Express, Fastify, NATS, Kafka, Docker, Kubernetes."
  ],
  [
    "What is message queuing? How does RabbitMQ or Kafka integrate with Node.js?",
    "hard",
    "Message queues decouple services: producer sends messages to queue, consumer processes them asynchronously. RabbitMQ: AMQP protocol, push-based, good for task distribution, `amqplib` package. Kafka: distributed event streaming, pull-based, persistent log, good for event sourcing, `kafkajs` package. Both provide: at-least-once delivery, partitioning, fault tolerance."
  ],
  [
    "What is the circuit breaker pattern?",
    "hard",
    "Circuit breaker protects a service from repeatedly calling a failing service. States: CLOSED (normal) → OPEN (failures threshold reached — calls fail immediately) → HALF_OPEN (try again after timeout) → CLOSED or OPEN. Libraries: `opossum` (Node.js). Prevents cascading failures, gives failing services time to recover. Used with retries and fallbacks."
  ],
  [
    "What is caching in Node.js? How do you use Redis for caching?",
    "hard",
    "Caching stores frequently accessed data in fast storage (in-memory or Redis). In-memory: simple Map/object (process-local, lost on restart). Redis: shared, persistent, TTL support. Pattern (cache-aside): check cache → if miss, query DB → store in cache with TTL → return. Important: cache invalidation (set/delete on mutation), stampede protection (staleness tolerance)."
  ],
  [
    "What is the helmet middleware and what security headers does it set?",
    "hard",
    "Helmet sets HTTP security headers: `Content-Security-Policy` (prevents XSS), `X-Frame-Options` (clickjacking), `X-Content-Type-Options` (MIME sniffing), `Strict-Transport-Security` (HSTS), `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`. Usage: `app.use(helmet())`. Customize: `helmet({ contentSecurityPolicy: { directives: { ... } } })`. Important baseline for Express security."
  ],
  [
    "How do you write a unit test for an Express route using Jest and supertest?",
    "hard",
    "`const request = require('supertest'); const app = require('./app'); test('GET /users returns list', async () => { const res = await request(app).get('/api/users').expect(200); expect(Array.isArray(res.body)).toBe(true); });`. Supertest creates an in-memory server (no port needed). Mock database with jest mocks. Test edge cases: auth, validation, error responses."
  ],
  [
    "What is the difference between unit, integration, and E2E tests in Node.js?",
    "hard",
    "Unit: test a SINGLE function/module (isolated, mocked deps). Fast, targeted. Integration: test MODULES working TOGETHER (route + middleware + DB). Real deps or test containers. E2E: test the FULL system (like a user clicking through a UI). Slowest, most confidence. Pyramid: many unit → some integration → few E2E."
  ],
  [
    "What is test-driven development (TDD) and how does it apply to Node.js?",
    "hard",
    "TDD: write tests FIRST, then code to make them pass. Red (failing test) → Green (passing test) → Refactor. Node.js TDD: write Jest test for an Express endpoint before implementing it. Benefits: better API design (tests drive design), higher coverage, confidence in refactoring. Not always practical for UI-heavy apps."
  ],
  [
    "What is observability in Node.js? (logs, metrics, traces)",
    "hard",
    "Observability = understanding system state from external outputs. Three pillars: 1) Logging (structured — JSON, levels — pino/winston). 2) Metrics (prom-client for Prometheus: request rates, error rates, latency histograms). 3) Tracing (OpenTelemetry: distributed request tracing across services). Each answers different questions: why, what, where."
  ],
  [
    "What is OpenTelemetry and how is it used in Node.js?",
    "hard",
    "OpenTelemetry (OTel) is a standard for observability data collection. Node.js SDK: `@opentelemetry/api`, `@opentelemetry/sdk-node`, auto-instrumentations. Auto-instruments: HTTP, gRPC, DB calls, Express, etc. Produces traces (request flows), metrics (counters/histograms), and logs. Export to: Jaeger, Datadog, Grafana Tempo, SigNoz. Vendor-neutral observability."
  ],
  [
    "What is the difference between structured and unstructured logging?",
    "hard",
    "Unstructured: `console.log('User ' + id + ' logged in')`. Hard to parse/search. Structured: `logger.info({ userId: id, event: 'login' }, 'User logged in')`. JSON format — machine-parseable, queryable (log analyzers), searchable by field. Libraries: `pino` (fastest), `winston` (most features), `bunyan`. Always use structured logging in production."
  ],

  // ── Conceptual / Industry (current) ────────────────────────────────────────
  [
    "What are the distinct phases of the libuv event loop (timers, pending, poll, check, close)?",
    "hard",
    "1) Timers: executes `setTimeout`/`setInterval` callbacks. 2) Pending: executes I/O callbacks deferred from last cycle. 3) Idle/Prepare: internal libuv use. 4) Poll: retrieves new I/O events, blocks (waiting for events), executes I/O callbacks. 5) Check: executes `setImmediate` callbacks. 6) Close: executes close event callbacks (`socket.on('close')`). Microtasks (nextTick, Promises) are drained between phases."
  ],
  [
    "In which event loop phase do setImmediate callbacks run versus setTimeout(fn, 0)?",
    "hard",
    "`setImmediate` runs in the CHECK phase (after poll). `setTimeout(fn, 0)` runs in the TIMERS phase (before poll). In a plain script (not in I/O cycle): timer phase runs first (if timer expired during event loop start), then poll, then check. So setTimeout may run before setImmediate. Inside an I/O callback: poll → check (setImmediate) → timers (setTimeout) — setImmediate always runs first."
  ],
  [
    "Why can the order of setTimeout(fn,0) and setImmediate be non-deterministic at the top level?",
    "hard",
    "At the top level (not inside I/O callback), the order depends on when the timer fires. If setTimeout's delay expires before the timers phase is entered, setTimeout runs first. If it hasn't expired yet, setImmediate runs first. This timing is non-deterministic (~0-1ms variance). Inside an I/O callback, setImmediate ALWAYS runs before setTimeout."
  ],
  [
    "How do microtasks (Promises, queueMicrotask) interleave with macrotask phases?",
    "hard",
    "Microtasks are executed BETWEEN each macrotask/macrotask phase. After each phase (or between individual callbacks), the microtask queue is completely drained before moving to the next phase. If microtasks keep adding more microtasks, they can starve macrotasks (nextTick recursion). This is why `process.nextTick` can block the event loop."
  ],
  [
    "What is the difference between queueMicrotask and process.nextTick?",
    "med",
    "Both add to the microtask queue, but `nextTick` has higher priority — it runs BEFORE Promise microtasks. `queueMicrotask` runs at the same priority as Promise callbacks. `nextTick` is a Node.js-specific API; `queueMicrotask` is the standard web API. Prefer `queueMicrotask` for portability. `nextTick` can starve I/O if used recursively."
  ],
  [
    "What is the AbortController and AbortSignal API used for in modern Node.js?",
    "med",
    "AbortController provides a standard way to abort async operations. `const ac = new AbortController(); fetch(url, { signal: ac.signal }); ac.abort()`. Also works with: streams, event listeners (`{ signal }` auto-removes), timers, `fs` operations. Replaces ad-hoc cancellation patterns. Available since Node 15."
  ],
  [
    "How do you cancel an in-flight fetch or stream using AbortSignal?",
    "med",
    "`const ac = new AbortController(); const p = fetch(url, { signal: ac.signal }); setTimeout(() => ac.abort(), 5000); // timeout`. For streams: `readable.pipe(writable, { signal: ac.signal })` — abort stops the pipe. `ac.abort()` rejects with `AbortError`. Use for request timeouts, user cancellation, or cleanup on disconnection."
  ],
  [
    "What is the native fetch API in Node.js 18+ and what powers it (undici)?",
    "med",
    "Node 18+ has built-in `fetch` (globally available). Powered by `undici` (a fast, modern HTTP client). Differences from browser fetch: no `window` context, no CORS checks, has `agent` option for connection pooling. Uses WHATWG standard API. Replacing `node-fetch` package. Example: `const res = await fetch('https://api.example.com'); const data = await res.json()`."
  ],
  [
    "What is undici and why is it faster than the legacy http client?",
    "hard",
    "undici is a modern HTTP/1.1 client written in C++ (Node.js addon). Faster due to: pipelining (multiple requests on one TCP connection without waiting for responses), connection pooling, no HTTP parsing overhead (uses llhttp), async I/O. Up to 2-3x faster than Node's built-in `http` module. Powers Node 18+'s `fetch` and `import('undici')`."
  ],
  [
    "What is the node: protocol import prefix and why use it (e.g. import fs from 'node:fs')?",
    "med",
    "`import fs from 'node:fs'` explicitly imports a Node.js core module. The `node:` prefix: 1) Avoids conflicts with user-installed packages named `fs`. 2) Makes it clear the import is a core module. 3) Required for some internal modules (`node:test`, `node:sqlite`). Best practice to use it for ALL core module imports."
  ],
  [
    "What are the trade-offs between ESM and CommonJS for interop in Node.js?",
    "med",
    "ESM can `import` CJS modules (default import works, named imports may be limited). CJS cannot `require()` ESM modules — must use dynamic `import()`. ESM has `import.meta.url` (not `__dirname`), no `require`, no `__filename`. ESM is static (tree-shakable, faster). CJS is dynamic (conditional requires, runtime module construction). Mixed projects need careful config."
  ],
  [
    "Why is __dirname unavailable in ESM and how do you reconstruct it?",
    "med",
    "ESM doesn't have `__dirname`, `__filename`, `require`, or `module`. Recreate: `import { fileURLToPath } from 'url'; import { dirname } from 'path'; const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename)`. Or use: `const __dirname = new URL('.', import.meta.url).pathname`."
  ],
  [
    "What is top-level await and which module system supports it?",
    "med",
    "Top-level await allows using `await` at the top level of a module (not inside an async function). Only supported in ESM modules (not CommonJS). Useful for: module initialization (loading config, connecting to DB), dynamic imports, awaiting async setup before the module is used. Blocks the module's execution but not other modules."
  ],
  [
    "What is the difference between dynamic import() and require()?",
    "med",
    "`import()` is an async function (returns Promise), works in both ESM and CJS, can load both ESM and CJS modules, enables code splitting. `require()` is sync, only works in CJS, cannot load ESM modules. Use `import()` for: lazy loading, conditional imports, loading JSON with `assert { type: 'json' }`."
  ],
  [
    "What are Worker Threads and when should you use them over child_process?",
    "hard",
    "Worker Threads share the same process — lighter weight, faster communication (SharedArrayBuffer, message passing with transferable objects). `child_process` has separate memory, can run any executable (not just Node), more isolation. Use Worker Threads for CPU-intensive Node.js tasks (parallel computation, image processing). Use child_process for running non-Node scripts or heavy isolation."
  ],
  [
    "How do you transfer data between Worker Threads (postMessage, transferList, SharedArrayBuffer)?",
    "hard",
    "`worker.postMessage(data, [transferList])`. TransferList transfers ownership of ArrayBuffer/MessagePort (zero-copy — the sending side loses access). Without transfer, data is cloned (structured clone algorithm — slower for large data). `SharedArrayBuffer` shares memory directly (no copy, no transfer — both sides access the same buffer). Use `Atomics` for synchronization."
  ],
  [
    "What is the MessageChannel and MessagePort API in Node.js?",
    "hard",
    "MessageChannel creates two connected MessagePorts for bidirectional communication. `const { port1, port2 } = new MessageChannel()`. Each port has `postMessage` and `on('message')`. Useful for: communication between workers, between worker and parent, broadcast patterns. Also used internally for structured clone algorithm."
  ],
  [
    "What is the difference between cpu-bound and io-bound work in scaling Node.js?",
    "med",
    "I/O-bound: waiting for external resources (DB, files, network). Node's async model handles thousands of concurrent I/O operations efficiently. CPU-bound: computation (image processing, crypto, data parsing). Blocks the event loop — needs Worker Threads or clustering. I/O-bound scales naturally with Node. CPU-bound requires explicit parallelization."
  ],
  [
    "What is the diagnostics_channel module used for?",
    "hard",
    "`diagnostics_channel` provides pub/sub for diagnostic events in Node.js internals and user code. `dc.channel('my-channel').subscribe(msg => ...)`. Used by OpenTelemetry, debuggers, profilers. Provides instrumentation points for: HTTP requests, database calls, promises, worker threads. Lower-overhead alternative to custom EventEmitter for observability."
  ],
  [
    "What is the perf_hooks module and how do you measure performance with it?",
    "hard",
    "`perf_hooks` provides Performance Measurement APIs (similar to Performance API in browsers). `const { performance, PerformanceObserver } = require('perf_hooks')`. `performance.mark('start'); ... ; performance.measure('duration', 'start'); performance.getEntriesByType('measure')`. Use for: measuring function execution time, profiling async operations, custom metrics."
  ],
  [
    "What is the async_hooks module and what is AsyncLocalStorage used for?",
    "hard",
    "`async_hooks` provides callbacks for tracking async resource lifetimes (creation, before, after, destroy). `AsyncLocalStorage` (built on async_hooks) provides async-context-scoped storage: `const als = new AsyncLocalStorage(); als.run({ requestId: 123 }, () => { processRequest(req, res); })`. Inside any async callback, `als.getStore()` returns the request context. Used for: request IDs, tracing, DI containers."
  ],
  [
    "How does AsyncLocalStorage enable per-request context propagation without globals?",
    "hard",
    "AsyncLocalStorage maintains a context for each async chain (from HTTP request handling). No need to pass `req` through every function call. Example: middleware calls `als.run(new Map(), () => next())`. Any function in the call stack (even after `await`, setTimeout, Promise.all) can get context via `als.getStore()`. Eliminates `req` parameter threading through every function."
  ],
  [
    "What is the node --watch flag and what does it replace?",
    "easy",
    "`node --watch app.js` automatically restarts the app when file changes are detected (built-in since Node 18). Replaces third-party watchers like `nodemon` or `node-dev` for development. Monitors imported files for changes. Uses `fs.watch` internally. Triggered by any file change in the project. Simple alternative to dedicated dev tools."
  ],
  [
    "What is the built-in node:test runner and how does it compare to Jest?",
    "med",
    "`node:test` (since Node 18) provides built-in test runner: `import { test, describe, it, mock } from 'node:test'`. No external deps. Simpler than Jest, supports: subtests, mocking, code coverage (`--experimental-test-coverage`), test isolation, suite-level setup/teardown. Lacks: snapshot testing, built-in assertion library (use `node:assert`), code transformation. Jest is more feature-rich."
  ],
  [
    "How do you load environment variables natively with node --env-file?",
    "easy",
    "`node --env-file=.env app.js` loads `.env` file into `process.env` (since Node 20.6). Replaces `dotenv` package for most use cases. Supports: multiple `--env-file` flags (later overrides earlier), variable expansion, comments, quotes. Simpler than dotenv for basic projects."
  ],
  [
    "What are permission model flags (--permission, --allow-fs-read) in modern Node.js?",
    "hard",
    "Node 20+ has an experimental permission model: `--experimental-permission`. `--allow-fs-read='*'`, `--allow-fs-write='/tmp'`, `--allow-child-process`, `--allow-worker-threads`. Hardens Node.js security by restricting what the process can access. Fail operations not in the allow list throw ERR_ACCESS_DENIED. Useful for running untrusted code or security-sensitive deployments."
  ],
  [
    "What is a single executable application (SEA) in Node.js?",
    "hard",
    "SEA bundles a Node.js app + its dependencies + Node.js runtime into a single executable file. Created with `node --experimental-sea-config`. Output is a platform-specific binary. No Node.js installation needed to run. Useful for: distributing CLI tools, desktop apps, deployment simplicity. Supports: code compression, blob injection, V8 snapshots."
  ],
  [
    "What is the difference between streams in object mode and binary mode?",
    "med",
    "Binary (default): streams emit Buffer/String chunks. Object mode: streams emit JavaScript objects. Enable: `new Readable({ objectMode: true, read() {} })`. Object mode streams don't have encoding, don't concatenate chunks, can't `.pipe()` to binary streams directly. Pass `.setEncoding('utf8')` for text streams. Use object mode for: database row streams, JSON object streams."
  ],
  [
    "What is the stream.pipeline function and why is it preferred over .pipe()?",
    "med",
    "`stream.pipeline(readable, transform, writable, callback)` properly handles: errors (propagates to all streams), cleanup (destroys all on error), and end-of-stream. Unlike `.pipe()` which doesn't forward errors and can leak resources. `pipeline` is the recommended approach: `const { pipeline } = require('stream/promises'); await pipeline(readable, writable)`."
  ],
  [
    "What is Readable.from and how do you turn an async generator into a stream?",
    "hard",
    "`Readable.from(iterable, options)` creates a readable stream from an iterable or async iterable. Example: `async function* generate() { for await (const page of paginatedAPI()) yield page; } const stream = Readable.from(generate())`. Converts async generators to streams seamlessly. Efficient for: paginated API responses, file processing, data transformation pipelines."
  ],
  [
    "What is HTTP keep-alive and how does an agent reuse sockets?",
    "med",
    "HTTP keep-alive reuses the same TCP connection for multiple HTTP requests (avoiding TCP handshake overhead). Node's `http.Agent` manages connection pooling: `new http.Agent({ keepAlive: true, maxSockets: 25 })`. Connections are kept alive for `keepAliveMsecs` (default 1000ms). Significantly reduces latency for repeated calls to the same server. Explicitly set for high-throughput clients."
  ],
  [
    "What is HTTP/2 server push and multiplexing support in Node.js?",
    "hard",
    "Node.js supports HTTP/2 via the `http2` module. Multiplexing: multiple requests share one TCP connection (eliminates head-of-line blocking). Server push: server can proactively push resources (styles, scripts) before the client requests them. `http2.createSecureServer().on('stream', stream => { stream.pushAllowed && stream.pushStream({ ':path': '/style.css' }) })`. Limited browser adoption for server push."
  ],
  [
    "What security risks does prototype pollution introduce in Node.js apps?",
    "hard",
    "Prototype pollution: attacker modifies `Object.prototype` via user-controlled input (e.g., `{ \"__proto__\": { \"admin\": true } }`). Affects ALL objects — can bypass auth checks, modify application behavior, or introduce XSS. Prevention: 1) Use `Object.create(null)` for maps. 2) Validate/sanitize JSON paths. 3) Freeze prototypes. 4) Use libraries with built-in protection. 5) Avoid deep merge with user-controlled schemas."
  ],
  [
    "What is the principle of least privilege applied to a Node.js service?",
    "med",
    "Each component should have only the permissions it needs. Applied: 1) Don't run as root — create app-specific user. 2) DB user has limited access (no DROP TABLE). 3) File system scoped to app directory. 4) Network access only to needed services. 5) Environment variables for secrets (not config files). 6) Containerized with read-only filesystem. Breaches are contained to the service's scope."
  ],
  [
    "What is the difference between a memory leak and high but stable memory usage?",
    "hard",
    "Memory leak: memory usage GROWS over time (unreachable objects not collected). Monitor via `process.memoryUsage()` over time — heapUsed should NOT monotonically increase. High but stable: memory reaches a plateau and stays there (caching, connection pools, worker pools). Stable memory at 200MB is fine. Growth from 200MB to 2GB over hours is a leak."
  ],

  // ── Code / Implementation ──────────────────────────────────────────────────
  [
    "Implement a promisify function that converts an error-first callback API into a Promise.",
    "med",
    "`function promisify(fn) { return function(...args) { return new Promise((resolve, reject) => { fn(...args, (err, ...results) => { if (err) reject(err); else resolve(results.length === 1 ? results[0] : results); }); }); }; }` Usage: `const readFile = promisify(require('fs').readFile)`."
  ],
  [
    "Write a function that retries an async operation N times with exponential backoff.",
    "med",
    "`async function retry(fn, { retries = 3, delay = 1000, factor = 2 } = {}) { let lastErr; for (let i = 0; i <= retries; i++) { try { return await fn(); } catch (err) { lastErr = err; if (i === retries) throw err; await new Promise(r => setTimeout(r, delay * Math.pow(factor, i) + Math.random() * 100)); } } }`"
  ],
  [
    "Implement a debounce function in JavaScript.",
    "med",
    "`function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }` Usage: `const debouncedSearch = debounce(query => api.search(query), 300)`."
  ],
  [
    "Implement a throttle function in JavaScript.",
    "med",
    "`function throttle(fn, limit) { let inThrottle; return function(...args) { if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }` Usage: `const throttledScroll = throttle(() => console.log('scrolled'), 100)`."
  ],
  [
    "Write a function that limits Promise concurrency to N at a time (async pool).",
    "hard",
    "`async function asyncPool(tasks, limit = 3) { const results = []; const executing = new Set(); for (const [i, task] of tasks.entries()) { const p = Promise.resolve().then(() => task(i)); results.push(p); executing.add(p.then(() => executing.delete(p))); if (executing.size >= limit) await Promise.race(executing); } return Promise.allSettled(results); }`"
  ],
  [
    "Implement a custom EventEmitter class with on, emit, and off methods.",
    "med",
    "`class EventEmitter { constructor() { this._events = new Map(); } on(event, fn) { if (!this._events.has(event)) this._events.set(event, []); this._events.get(event).push(fn); return () => this.off(event, fn); } emit(event, ...args) { this._events.get(event)?.forEach(fn => fn(...args)); } off(event, fn) { const listeners = this._events.get(event); if (listeners) this._events.set(event, listeners.filter(l => l !== fn)); } once(event, fn) { const wrapper = (...args) => { fn(...args); this.off(event, wrapper); }; this.on(event, wrapper); } }`"
  ],
  [
    "Write a Transform stream that uppercases every chunk passing through it.",
    "hard",
    "`const { Transform } = require('stream'); const upperCase = new Transform({ transform(chunk, encoding, callback) { this.push(chunk.toString().toUpperCase()); callback(); } }); readStream.pipe(upperCase).pipe(writeStream)`."
  ],
  [
    "Implement an LRU cache class with get and put in O(1).",
    "hard",
    "`class LRUCache { constructor(capacity) { this.capacity = capacity; this.cache = new Map(); } get(key) { if (!this.cache.has(key)) return -1; const val = this.cache.get(key); this.cache.delete(key); this.cache.set(key, val); return val; } put(key, value) { if (this.cache.has(key)) this.cache.delete(key); else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value); this.cache.set(key, value); } }`"
  ],
  [
    "Write a function that reads a large file line by line without loading it into memory.",
    "med",
    "`const readline = require('readline'); const fs = require('fs'); async function readLines(path) { const rl = readline.createInterface({ input: fs.createReadStream(path), crlfDelay: Infinity }); for await (const line of rl) { processLine(line); } }`"
  ],
  [
    "Implement a simple in-memory rate limiter (token bucket) function.",
    "hard",
    "`function createRateLimiter({ tokensPerInterval = 10, interval = 1000 }) { let tokens = tokensPerInterval; let lastRefill = Date.now(); return { tryConsume(count = 1) { const now = Date.now(); const elapsed = now - lastRefill; tokens = Math.min(tokensPerInterval, tokens + elapsed * (tokensPerInterval / interval)); lastRefill = now; if (tokens >= count) { tokens -= count; return true; } return false; } }; }`"
  ],
  [
    "Write an Express middleware that logs request method, URL, and response time.",
    "med",
    "`app.use((req, res, next) => { const start = Date.now(); res.on('finish', () => { const duration = Date.now() - start; console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`); }); next(); });`"
  ],
  [
    "Implement a deep clone function for plain objects and arrays without JSON.",
    "med",
    "`function deepClone(obj, seen = new WeakMap()) { if (obj === null || typeof obj !== 'object') return obj; if (seen.has(obj)) return seen.get(obj); const clone = Array.isArray(obj) ? [...obj] : { ...obj }; seen.set(obj, clone); for (const key of Object.keys(clone)) clone[key] = deepClone(clone[key], seen); return clone; }`"
  ],
  [
    "Write a function that flattens an arbitrarily nested array.",
    "easy",
    "`function flatten(arr) { return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []); }` Usage: `flatten([1, [2, [3, 4], 5]])` → `[1, 2, 3, 4, 5]`."
  ],
  [
    "Implement memoize for an async function keyed by its arguments.",
    "med",
    "`function memoizeAsync(fn) { const cache = new Map(); return async (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = await fn(...args); cache.set(key, result); return result; }; }`"
  ],
  [
    "Write a function that runs an array of promise-returning tasks sequentially.",
    "med",
    "`async function series(tasks) { const results = []; for (const task of tasks) results.push(await task()); return results; }`"
  ],
  [
    "Implement a once wrapper that ensures a function runs at most one time.",
    "easy",
    "`function once(fn) { let called = false, result; return function(...args) { if (called) return result; called = true; result = fn.apply(this, args); return result; }; }`"
  ],
  [
    "Write a function that times out a promise after a given number of milliseconds.",
    "med",
    "`function timeout(promise, ms) { let timer; const timeoutPromise = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Timed out')), ms); }); return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer)); }`"
  ],
  [
    "Implement a simple pub/sub event bus with subscribe and publish.",
    "med",
    "`class EventBus { constructor() { this.events = new Map(); } subscribe(event, cb) { if (!this.events.has(event)) this.events.set(event, new Set()); this.events.get(event).add(cb); return () => this.events.get(event).delete(cb); } publish(event, data) { this.events.get(event)?.forEach(cb => cb(data)); } }`"
  ],
  [
    "Write a function that walks a directory recursively and returns all file paths.",
    "med",
    "`const { promises: fs } = require('fs'); const path = require('path'); async function walkDir(dir) { const files = await fs.readdir(dir); const paths = await Promise.all(files.map(async file => { const fp = path.join(dir, file); const stat = await fs.stat(fp); return stat.isDirectory() ? walkDir(fp) : fp; })); return paths.flat(); }`"
  ],
  [
    "Implement a chunk function that splits an array into groups of size n.",
    "easy",
    "`function chunk(arr, size) { const result = []; for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size)); return result; }`"
  ],
  [
    "Write an async generator that paginates through an API until no next page.",
    "hard",
    "`async function* paginate(url) { let nextUrl = url; while (nextUrl) { const res = await fetch(nextUrl); const data = await res.json(); yield data.results; nextUrl = data.next; } }` Usage: `for await (const page of paginate('/api/users')) { ... }`."
  ],
  [
    "Implement a function that merges two sorted streams of numbers.",
    "hard",
    "`async function* mergeSorted(stream1, stream2) { const iter1 = stream1[Symbol.asyncIterator](); const iter2 = stream2[Symbol.asyncIterator](); let { value: v1, done: d1 } = await iter1.next(); let { value: v2, done: d2 } = await iter2.next(); while (!d1 || !d2) { if (d1 || (!d2 && v2 < v1)) { yield v2; ({ value: v2, done: d2 } = await iter2.next()); } else { yield v1; ({ value: v1, done: d1 } = await iter1.next()); } } }`"
  ],
  [
    "Write a curry function that supports partial application.",
    "med",
    "`function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn(...args); return (...more) => curried(...args, ...more); }; }`"
  ],
  [
    "Implement a simple middleware compose (chain of (req,res,next)) function.",
    "hard",
    "`function compose(middlewares) { return (req, res, next) => { let idx = 0; function run(i) { if (i >= middlewares.length) return next?.(); middlewares[i](req, res, () => run(i + 1)); } run(0); }; }`"
  ],
  [
    "Write a function that converts a callback-based readFile into an async/await flow.",
    "easy",
    "`const fs = require('fs').promises; async function readConfig(path) { try { const data = await fs.readFile(path, 'utf8'); return JSON.parse(data); } catch (err) { console.error('Failed to read config:', err.message); return null; } }`"
  ],
  [
    "Implement a Semaphore class to limit concurrent access to a resource.",
    "hard",
    "`class Semaphore { constructor(max = 1) { this.max = max; this.count = 0; this.queue = []; } async acquire() { if (this.count < this.max) { this.count++; return; } await new Promise(resolve => this.queue.push(resolve)); } release() { if (this.queue.length > 0) this.queue.shift()(); else this.count--; } async run(fn) { await this.acquire(); try { return await fn(); } finally { this.release(); } } }`"
  ],
  [
    "Write a function that groups an array of objects by a given key.",
    "easy",
    "`function groupBy(arr, key) { return arr.reduce((acc, obj) => { const k = obj[key]; if (!acc[k]) acc[k] = []; acc[k].push(obj); return acc; }, {}); }`"
  ],
  [
    "Implement a polling function that resolves when a condition becomes true.",
    "med",
    "`async function poll(condition, { interval = 1000, timeout = 30000 } = {}) { const start = Date.now(); while (Date.now() - start < timeout) { if (await condition()) return true; await new Promise(r => setTimeout(r, interval)); } return false; }`"
  ],
  [
    "Write a function that safely parses JSON and returns a default on error.",
    "easy",
    "`function safeJSON(str, fallback = null) { try { return JSON.parse(str); } catch { return fallback; } }`"
  ],
  [
    "Implement a simple circuit breaker wrapper around an async function.",
    "hard",
    "`class CircuitBreaker { constructor(fn, { threshold = 5, timeout = 30000 } = {}) { this.fn = fn; this.threshold = threshold; this.timeout = timeout; this.failures = 0; this.state = 'CLOSED'; this.lastFailure = 0; } async call(...args) { if (this.state === 'OPEN') { if (Date.now() - this.lastFailure > this.timeout) this.state = 'HALF_OPEN'; else throw new Error('Circuit breaker OPEN'); } try { const result = await this.fn(...args); this.failures = 0; this.state = 'CLOSED'; return result; } catch (err) { this.failures++; this.lastFailure = Date.now(); if (this.failures >= this.threshold) this.state = 'OPEN'; throw err; } } }`"
  ],
  [
    "Write a function that streams a file download to an HTTP response.",
    "med",
    "`app.get('/download/:file', (req, res) => { const filePath = path.join(__dirname, 'files', req.params.file); const stream = fs.createReadStream(filePath); stream.pipe(res); stream.on('error', () => res.status(404).end()); });`"
  ],
  [
    "Implement a queue that processes jobs one at a time with a worker loop.",
    "med",
    "`class JobQueue { constructor(worker) { this.worker = worker; this.queue = []; this.running = false; } add(job) { this.queue.push(job); this.run(); } async run() { if (this.running) return; this.running = true; while (this.queue.length) { const job = this.queue.shift(); try { await this.worker(job); } catch (err) { console.error('Job failed:', err); } } this.running = false; } }`"
  ],
  [
    "Write a function that deep-merges two configuration objects.",
    "med",
    "`function deepMerge(target, source) { const output = { ...target }; for (const key of Object.keys(source)) { if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) { output[key] = deepMerge(target[key] || {}, source[key]); } else { output[key] = source[key]; } } return output; }`"
  ],
  [
    "Implement a custom Promise.all using only callbacks and a counter.",
    "hard",
    "`function promiseAll(promises) { return new Promise((resolve, reject) => { const results = new Array(promises.length); let settled = 0; promises.forEach((p, i) => { Promise.resolve(p).then(val => { results[i] = val; settled++; if (settled === promises.length) resolve(results); }).catch(reject); }); }); }`"
  ],
  [
    "Write an Express error-handling middleware that returns JSON for any thrown error.",
    "med",
    "`app.use((err, req, res, next) => { const status = err.status || 500; res.status(status).json({ error: { message: err.message || 'Internal Server Error', status, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) } }); });`"
  ],

  // ── Tricky / Output-based ──────────────────────────────────────────────────
  [
    "What is the output of: console.log(typeof null);",
    "easy",
    "Output: `\"object\"`. This is a well-known JS bug from the first version of JS that can never be fixed for backward compatibility."
  ],
  [
    "What is the output of: console.log([1,2,3] + [4,5,6]);",
    "med",
    "Output: `\"1,2,34,5,6\"`. Arrays are converted to strings and concatenated: `\"1,2,3\" + \"4,5,6\"`."
  ],
  [
    "What is the output of: console.log(0.1 + 0.2 === 0.3);",
    "med",
    "Output: `false`. Floating-point precision: 0.1 + 0.2 = 0.30000000000000004 ≠ 0.3."
  ],
  [
    "What is the output order of: console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);",
    "hard",
    "Output: 1, 4, 3, 2. Sync code runs first (1,4). Microtask (Promise.then — 3) runs before macrotask (setTimeout — 2)."
  ],
  [
    "What is the output order of: setTimeout(()=>console.log('t'),0); setImmediate(()=>console.log('i'));",
    "hard",
    "Non-deterministic at top level: either `t, i` or `i, t`. Inside I/O callback: `i, t` (setImmediate always runs first)."
  ],
  [
    "What logs first: process.nextTick(()=>console.log('n')); Promise.resolve().then(()=>console.log('p'));",
    "hard",
    "Output: `n`, then `p`. process.nextTick has HIGHER priority than Promise microtasks. Both run before any macrotask."
  ],
  [
    "What is the output of: for(var i=0;i<3;i++){setTimeout(()=>console.log(i),0);}",
    "hard",
    "Output: 3, 3, 3. `var i` is function-scoped — all three callbacks share the same `i`, which is 3 after the loop finishes."
  ],
  [
    "What is the output of: for(let i=0;i<3;i++){setTimeout(()=>console.log(i),0);}",
    "med",
    "Output: 0, 1, 2. `let i` is block-scoped per iteration — each callback captures a different `i`."
  ],
  [
    "What is the output of: console.log([]==![]);",
    "hard",
    "Output: `true`. `![]` is `false`. `[] == false` → `'' == false` → `0 == 0` → `true`."
  ],
  [
    "What is the output of: console.log(typeof NaN); console.log(NaN===NaN);",
    "med",
    "Output: `\"number\"`, `false`. NaN is typeof number but not equal to anything including itself."
  ],
  [
    "What is the output of: const a={}; const b={}; console.log(a==b);",
    "easy",
    "Output: `false`. Objects are compared by reference, not by value. Two separate objects are never `==` or `===`."
  ],
  [
    "What is the output of: console.log(1<2<3); console.log(3>2>1);",
    "hard",
    "Output: `true`, `false`. `1<2` is `true` → `true < 3` → `1 < 3` → `true`. `3>2` is `true` → `true > 1` → `1 > 1` → `false`."
  ],
  [
    "What is the output of: console.log('5'-3); console.log('5'+3);",
    "easy",
    "Output: `2`, `\"53\"`. `-` coerces to number, `+` with string prefers string concatenation."
  ],
  [
    "What is the output of: console.log([1,2,3].map(parseInt));",
    "hard",
    "Output: `[1, NaN, NaN]`. `parseInt('1', 0, arr)` → 1, `parseInt('2', 1)` → NaN (invalid radix), `parseInt('3', 2)` → NaN (binary has no 3)."
  ],
  [
    "What is the output of: let x=10; (function(){console.log(x); var x=20;})();",
    "hard",
    "Output: `undefined`. `var x` is hoisted to function scope (but not initialized), shadowing the outer `x`. TDZ-like: hoisted as undefined."
  ],
  [
    "What is the output of: console.log(typeof function(){});",
    "easy",
    "Output: `\"function\"`. Functions have their own `typeof` result, unlike arrays (`\"object\"`)."
  ],
  [
    "What is the output of: async function f(){return 1;} console.log(f());",
    "med",
    "Output: `Promise { 1 }`. Async functions always return a Promise, even with a simple return value."
  ],
  [
    "What logs: console.log('a'); await Promise.resolve(); console.log('b'); inside an async function called before console.log('c')?",
    "hard",
    "Output: `a`, then `c`, then `b`. The async function yields at `await`, allowing `console.log('c')` to run before `b`."
  ],
  [
    "What is the output of: console.log(0.1+0.2);",
    "easy",
    "Output: `0.30000000000000004`. IEEE 754 floating-point imprecision."
  ],
  [
    "What is the output of: console.log([10,1,2,20].sort());",
    "med",
    "Output: `[1, 10, 2, 20]`. `.sort()` converts to strings first — lexicographic sort. Use `.sort((a,b) => a-b)` for numeric."
  ],
  [
    "What is the output of: const o={a:1}; const {a,b='x'}=o; console.log(a,b);",
    "med",
    "Output: `1, \"x\"`. Destructuring with default value. `a=1` from object, `b` gets its default 'x'."
  ],
  [
    "What is the output of: console.log(+'' , +' ' , +'12px');",
    "med",
    "Output: `0, 0, NaN`. Unary `+` coerces to number: empty string → 0, spaces → 0, non-numeric string → NaN."
  ],
  [
    "What is the output of: console.log(!!'false'); console.log(!!'');",
    "easy",
    "Output: `true`, `false`. Non-empty strings (including 'false') are truthy. Empty string is falsy."
  ],
  [
    "What is the output of: function f(a=b,b=1){return [a,b];} f(); throws or returns?",
    "hard",
    "Throws `ReferenceError: Cannot access 'b' before initialization`. The default value `a=b` tries to access `b` in the TDZ before it's declared."
  ],
  [
    "What is the output of: const arr=[1,2,3]; arr.length=0; console.log(arr[0]);",
    "med",
    "Output: `undefined`. Setting `length = 0` clears all elements."
  ],
  [
    "What is the output of: console.log(JSON.stringify({a:undefined,b:null,c:()=>1}));",
    "med",
    "Output: `{\"b\":null}`. `undefined` and functions are omitted in JSON.stringify. `null` is kept."
  ],
  [
    "What is the output of: console.log(2**3**2);",
    "med",
    "Output: 512. `**` is right-associative: `2 ** (3 ** 2)` = `2 ** 9` = 512."
  ],
  [
    "What is the output of: let p=Promise.reject('e'); is this an unhandled rejection? Why?",
    "hard",
    "Yes, unhandled rejection. The rejected promise has no `.catch()` attached. Node throws `UnhandledPromiseRejection`. Even if p is later `.catch()`-ed, it may still trigger at the time of creation."
  ],
  [
    "What is the output of: console.log(typeof undeclaredVariable);",
    "med",
    "Output: `\"undefined\"`. Accessing `typeof` for an undeclared variable doesn't throw — it returns `\"undefined\"` safely."
  ],
  [
    "What is the output of: const s=Symbol('x'); console.log(s===Symbol('x'));",
    "med",
    "Output: `false`. Symbols are always unique — even with the same description. Each `Symbol('x')` creates a new unique symbol."
  ],
];
