---
title: "Deployment"
description: "Deployment options, VPS deployment with Nginx, and CI/CD best practices for Node.js."
sidebar:
  order: 7
---

# Deployment

## 🚀 Deployment Options

| Option | Best For | Complexity | Cost |
|--------|----------|------------|------|
| **Heroku** | Quick prototypes | ⭐ Easy | $$ |
| **Railway** | Startups | ⭐ Easy | $ |
| **AWS EC2** | Full control | ⭐⭐⭐ Hard | $$ |
| **AWS ECS/EKS** | Containers at scale | ⭐⭐⭐⭐ Expert | $$$ |
| **Vercel / Netlify** | Serverless/Edge | ⭐ Easy | $ |
| **VPS (DigitalOcean)** | Small-medium apps | ⭐⭐ Medium | $ |

### VPS Deployment with Nginx

```nginx
# /etc/nginx/sites-available/myapp
server {
  listen 80;
  server_name myapp.com www.myapp.com;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name myapp.com www.myapp.com;
  
  ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
  
  location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_cache_bypass $http_upgrade;
  }
  
  location / {
    root /var/www/myapp/public;
    try_files $uri $uri/ /index.html;
  }
}
```
