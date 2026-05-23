---
title: "Monitoring Containers"
description: "---"
sidebar:
  order: 112
---

## 12. Monitoring Containers

### 📊 Built-in Monitoring Commands

```bash
# Live stats for all containers
docker stats

# One-time snapshot (scriptable)
docker stats --no-stream --format \
  "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"

# View logs with timestamps
docker logs -f --timestamps api

# Top processes inside a container
docker top api

# Container events stream
docker events --filter type=container
```

---

### 🏥 Health Checks

```dockerfile
# ── In Dockerfile ────────────────────────────────────────────
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=15s \
            --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

```yaml
# ── In docker-compose.yml ────────────────────────────────────
services:
  api:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
```

```bash
# Check health status
docker ps                    # Shows (healthy) or (unhealthy)
docker inspect api | grep -A 10 '"Health"'
```

---

### 📈 Prometheus + Grafana Stack

```yaml
# docker-compose.monitoring.yml
services:

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - "8080:8080"

volumes:
  prometheus-data:
  grafana-data:
```

**`prometheus.yml`:**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'api'
    static_configs:
      - targets: ['api:3000']    # Your app's /metrics endpoint
```

---
