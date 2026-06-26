---
title: "Security Best Practices"
description: "Essential MongoDB security practices — network hardening, TLS/SSL, least privilege access, and backup strategies."
sidebar:
  order: 3
---

## Security Best Practices

Security in MongoDB is **defense in depth** — multiple layers of protection.

### 1. Enable Authentication

By default, MongoDB does **not** require authentication. **Always enable it in production.**

```bash
# In mongod.conf
security:
  authorization: enabled

# Or start with:
mongod --auth
```

### 2. Network Security

```mermaid
flowchart TB
    Internet[Internet] -->|❌ Blocked| Firewall
    AppServer[Application Server] -->|✅ Allowed| Firewall
    Admin[Admin Machine] -->|✅ Allowed| Firewall
    
    Firewall -->|Port 27017| MongoDB[(MongoDB)]
    Firewall -->|❌ Direct internet access blocked| Nope
    
    style Firewall fill:#ef4444,color:#fff
    style MongoDB fill:#7c3aed,color:#fff
    style Internet fill:#f59e0b,color:#fff
```

```bash
# Bind to specific IP — don't bind to 0.0.0.0!
# In mongod.conf:
net:
  bindIp: 127.0.0.1,192.168.1.100   # only localhost + internal IP
  port: 27017
```

### 3. Use TLS/SSL

Always encrypt data in transit between your app and MongoDB.

```bash
# In mongod.conf:
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem

# Connection string with TLS:
mongodb://user:pass@host:27017/myapp?tls=true
```

### 4. Principle of Least Privilege

Create users with **exactly the permissions they need** — nothing more.

```js
// ❌ Bad: app user with root access
db.createUser({ user: "myapp", pwd: "...", roles: [{ role: "root", db: "admin" }] })

// ✅ Good: app user only needs readWrite on its own database
db.createUser({ user: "myapp", pwd: "...", roles: [{ role: "readWrite", db: "myapp" }] })
```

### 5. Backup Strategies

```mermaid
flowchart LR
    subgraph Backups[Backup Strategy]
        Dump1[mongodump — Daily<br/>Full backup]
        Dump2[mongodump — Hourly<br/>Incremental oplog]
        Atlas[Atlas — Automated<br/>Continuous backups]
    end
    
    Dump1 --> Store[S3 / Local Storage<br/>Encrypted]
    Dump2 --> Store
    Atlas --> Store
    
    Store --> Restore{mongorestore<br/>When disaster strikes}
    
    style Dump1 fill:#3b82f6,color:#fff
    style Dump2 fill:#059669,color:#fff
    style Atlas fill:#7c3aed,color:#fff
    style Store fill:#f59e0b,color:#fff
```

```bash
# Full backup
mongodump --uri "mongodb://user:pass@host:27017/myapp" --out ./backup/$(date +%Y%m%d)

# Restore
mongorestore --uri "mongodb://user:pass@host:27017/myapp" ./backup/20240101/myapp

# Atlas: Enable "Continuous Cloud Backup" in the Atlas UI
```

### 6. Encryption at Rest

```bash
# In mongod.conf — Enterprise only
security:
  enableEncryption: true
  encryptionKeyFile: /etc/mongodb/encryption-key
  encryptionCipherMode: AES256-CBC
```

For community edition, use **filesystem-level encryption** (LUKS, BitLocker).

### 7. Additional Hardening

```text
✅ Audit logging — track who did what
  auditLog:
    destination: file
    format: JSON
    path: /var/log/mongodb/audit.log

✅ SCRAM-SHA-256 — use strong password hashing
  security.authenticationMechanisms: SCRAM-SHA-256

✅ Disable server-side JavaScript (if not needed)
  security.javascriptEnabled: false

✅ Set resource limits
  # Linux: ulimit -n 64000 (file descriptors)
  # Set maxIncomingConnections in mongod.conf

✅ Keep MongoDB updated
  # Always use the latest patch version of your major release

✅ Monitor security alerts
  # Subscribe to MongoDB security advisories
```

### Security Checklist

```text
[ ] Authentication enabled (security.authorization: enabled)
[ ] TLS/SSL configured (net.tls.mode: requireTLS)
[ ] Not binding to 0.0.0.0 (net.bindIp restricted)
[ ] Least privilege users (no root for apps)
[ ] Firewall restricts port 27017
[ ] Automated backups configured and tested
[ ] Encryption at rest (Enterprise or filesystem-level)
[ ] Audit logging enabled
[ ] Strong password hashing (SCRAM-SHA-256)
[ ] Regular security updates applied
```

---

### In Simple Words

- **Enable authentication** — MongoDB has no auth by default!
- **Restrict network access** — don't expose MongoDB to the internet
- **Use TLS** — encrypt data between your app and database
- **Least privilege** — each user gets only the permissions they need
- **Automate backups** — and test restores regularly
- Security is **multiple layers** — no single measure is enough

---

*Next: [Data Modeling →](/DSA-Notes-Problems/mongodb/core/data-modeling)*
