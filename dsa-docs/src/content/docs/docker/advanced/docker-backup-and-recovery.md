---
title: "Docker Backup and Recovery"
description: "---"
sidebar:
  order: 113
---

## 13. Docker Backup and Recovery

### 💾 Complete Backup Strategy

```bash
# ─── 1. Backup all named volumes ──────────────────────────────
for volume in $(docker volume ls -q); do
  docker run --rm \
    -v $volume:/data \
    -v $(pwd)/backups:/backup \
    alpine \
    tar czf /backup/${volume}-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .
  echo "✅ Backed up volume: $volume"
done

# ─── 2. Backup PostgreSQL database ────────────────────────────
docker exec postgres \
  pg_dump -U postgres myapp \
  > backups/myapp-$(date +%Y%m%d-%H%M%S).sql

# ─── 3. Backup MongoDB ────────────────────────────────────────
docker exec mongodb \
  mongodump --username admin --password pass \
  --authenticationDatabase admin \
  --archive --gzip \
  > backups/mongo-$(date +%Y%m%d-%H%M%S).archive

# ─── 4. Save Docker images to files ──────────────────────────
docker save my-app:1.0.0 | gzip > backups/my-app-1.0.0.tar.gz
docker load < backups/my-app-1.0.0.tar.gz

# ─── 5. Export container filesystem snapshot ──────────────────
docker export my-container | gzip > container-snapshot.tar.gz
docker import container-snapshot.tar.gz my-app:snapshot
```

---

### 🔄 Automated Backup with Cron

```bash
# /etc/cron.d/docker-backup
# Run at 2 AM every day
0 2 * * * root /usr/local/bin/backup-docker.sh >> /var/log/docker-backup.log 2>&1

# /usr/local/bin/backup-docker.sh
#!/bin/bash
BACKUP_DIR="/backups/$(date +%Y-%m-%d)"
mkdir -p $BACKUP_DIR

# Backup all containers' volumes
docker run --rm \
  -v postgres-data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/postgres-data.tar.gz -C /data .

# Rotate: keep last 7 days
find /backups -maxdepth 1 -type d -mtime +7 -exec rm -rf {} +
```

---

### 🆘 Disaster Recovery

```bash
# ─── Restore Volume from backup ───────────────────────────────
docker volume create postgres-data

docker run --rm \
  -v postgres-data:/data \
  -v $(pwd)/backups:/backup \
  alpine \
  sh -c "cd /data && tar xzf /backup/postgres-data-20240101.tar.gz"

# ─── Restore PostgreSQL from SQL dump ─────────────────────────
cat backups/myapp-20240101.sql | \
  docker exec -i postgres psql -U postgres -d myapp

# ─── Restore MongoDB archive ──────────────────────────────────
docker exec -i mongodb \
  mongorestore --username admin --password pass \
  --authenticationDatabase admin \
  --archive --gzip \
  < backups/mongo-20240101.archive
```

---
