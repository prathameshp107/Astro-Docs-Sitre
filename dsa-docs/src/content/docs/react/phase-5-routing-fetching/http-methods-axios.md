---
title: "HTTP Methods & Axios"
description: "HTTP methods, fetch, async/await, Axios, interceptors, and json-server."
---

## HTTP Methods & Axios

### HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data from DB | Search |
| `POST` | Send data to server, create a resource | Sign up |
| `PUT` | Create or replace a resource | Update profile |
| `PATCH` | Partial update of a resource | Update password |
| `DELETE` | Remove a resource | Delete account |

### HTTP Status Codes

- `1xx` Informational: 100-Continue, 101-Switching Protocols
- `2xx` Success: 200-OK, 201-Created, 204-No Content
- `3xx` Redirection: 301-Moved Permanently, 304-Not Modified
- `4xx` Client Error: 400-Bad Request, 401-Unauthorized, 403-Forbidden, 404-Not Found
- `5xx` Server Error: 500-Internal Server Error, 502-Bad Gateway, 503-Service Unavailable

### Ways to Fetch Data in React

1. `fetch()` with `.then()`
2. `async/await` syntax
3. Axios library
4. Custom hooks

### HTTP with fetch()

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Async/Await

```js
const fetchProducts = async function () {
  const products = await fetch("https://fakestoreapi.com/products");
  const productsJSON = await products.json();
  setProducts(productsJSON);
};
```

### HTTP with Axios

```bash
npm i axios
```

```js
import axios from 'axios';

const fetchUsers = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await axios.get(url);
  setUsers(response.data);
};
```

### Axios vs fetch()

| Axios | fetch() |
|-------|---------|
| Built-in XSRF protection |  |
| Uses `data` property | Uses `body` property (must be stringified) |
| Automatic JSON transforms | Two-step process |
| Request timeout & cancellation |  |
| HTTP interceptors built-in |  |
| Download progress support | No upload progress |

### Create Axios Instance

```js
// api.js
import axios from 'axios';
const client = axios.create({ baseURL: 'http://jsonplaceholder.typicode.com/' });
export default client;

// Usage
import client from 'api.js';
client.get('/users');
```

### Multiple Requests with Axios

```js
const [response1, response2] = await axios.all([
  axios.get('https://api.github.com/users/defunkt'),
  axios.get('https://api.github.com/users/evanphx')
]);
```

### HTTP Interceptors

```
HTTP Request -> Interceptor -> Modified Request -> Server
Server -> HTTP Response -> Interceptor -> Modified Response -> Component
```

**Request Interceptor:**
```js
axios.interceptors.request.use((req) => {
  req.headers.authorization = "my secret token";
  return req;
});
```

**Response Interceptor:**
```js
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);
```

**Remove an Interceptor:**
```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

### Fake REST APIs for Testing

1. https://jsonplaceholder.typicode.com/
2. https://reqres.in/
3. https://fakestoreapi.com/products
4. https://api.github.com/users/google
5. https://dummyjson.com/products

### Create REST API with json-server

```bash
npm install -g json-server
json-server --watch db.json --port=4000
```

Available routes: `GET /employees`, `POST /employees`, `PUT /employees/:id`, `DELETE /employees/:id`

---
