---
title: "Docker Volumes Advanced"
description: "---"
sidebar:
  order: 107
---

## 7. Docker Volumes Advanced

### 🗄️ Persistent Database with Backups

```bash
# Run PostgreSQL with named volume
docker run -d \
  --name postgres \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:15

# Inspect volume location on host
docker volume inspect postgres-data
# Output: Mountpoint: /var/lib/docker/volumes/postgres-data/_data
```

---

### 💾 Backup Strategies

```bash
# ─── Method 1: Volume Backup to tar.gz ───────────────────────
docker run --rm \
  -v postgres-data:/data \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/postgres-backup-$(date +%Y%m%d).tar.gz -C /data .

# ─── Method 2: PostgreSQL pg_dump via exec ────────────────────
docker exec -t postgres \
  pg_dumpall -c -U postgres \
  > backup-$(date +%Y%m%d).sql

# ─── Method 3: MongoDB mongodump ──────────────────────────────
docker exec mongodb \
  mongodump --username admin --password password \
  --authenticationDatabase admin \
  --out /dump

docker cp mongodb:/dump ./mongo-backup-$(date +%Y%m%d)

# ─── Restore PostgreSQL ───────────────────────────────────────
cat backup.sql | docker exec -i postgres psql -U postgres

# ─── Restore MongoDB ──────────────────────────────────────────
docker cp ./mongo-backup mongodb:/dump
docker exec mongodb \
  mongorestore --username admin --password password \
  --authenticationDatabase admin /dump
```

---

### 🔄 Shared Volume Between Containers

```yaml
# Multiple containers sharing one volume (e.g., log aggregator)
services:
  api:
    volumes:
      - app-logs:/app/logs

  log-aggregator:
    image: fluentd
    volumes:
      - app-logs:/fluentd/log   # Same volume!

volumes:
  app-logs:
```

---
