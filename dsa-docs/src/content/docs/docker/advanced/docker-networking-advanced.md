---
title: "Docker Networking Advanced"
description: "Docker's embedded DNS server resolves container names to IP addresses automatically within custom networks."
sidebar:
  order: 107
---

## 6. Docker Networking Advanced

### 🔍 Internal DNS Resolution

Docker's embedded DNS server resolves container names to IP addresses automatically within custom networks.

```
Container: api
Network: app-network
IP: 172.18.0.3

Other containers on app-network can reach it as:
→ http://api:3000
→ ping api
→ mongodb://mongodb:27017
```

```xml
<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect width="700" height="340" fill="#f0f4f8" rx="10"/>
  <text x="350" y="26" text-anchor="middle" font-size="14" font-weight="bold" fill="#222">Docker Internal DNS Resolution</text>

  <!-- Network boundary -->
  <rect x="30" y="45" width="640" height="260" rx="12" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="350" y="66" text-anchor="middle" font-size="11" font-weight="bold" fill="#388e3c">app-network (172.18.0.0/16)</text>

  <!-- Docker DNS Server -->
  <rect x="270" y="78" width="160" height="50" rx="8" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>
  <text x="350" y="100" text-anchor="middle" font-size="11" font-weight="bold" fill="#f57f17">🔍 Docker DNS</text>
  <text x="350" y="117" text-anchor="middle" font-size="9" fill="#777">127.0.0.11</text>

  <!-- Container: api -->
  <rect x="50"  y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="120" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">api</text>
  <text x="120" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.2</text>
  <text x="120" y="230" text-anchor="middle" font-size="9" fill="#555">port: 3000</text>

  <!-- Container: mongodb -->
  <rect x="280" y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="350" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">mongodb</text>
  <text x="350" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.3</text>
  <text x="350" y="230" text-anchor="middle" font-size="9" fill="#555">port: 27017</text>

  <!-- Container: redis -->
  <rect x="510" y="175" width="140" height="70" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="580" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#1b5e20">redis</text>
  <text x="580" y="216" text-anchor="middle" font-size="9" fill="#555">172.18.0.4</text>
  <text x="580" y="230" text-anchor="middle" font-size="9" fill="#555">port: 6379</text>

  <!-- DNS query arrows -->
  <defs><marker id="da" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f57f17"/></marker></defs>
  <line x1="120" y1="175" x2="295" y2="130" stroke="#f57f17" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#da)"/>
  <text x="180" y="148" font-size="9" fill="#f57f17">resolve "mongodb"</text>

  <line x1="305" y1="130" x2="160" y2="175" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#da)"/>
  <text x="165" y="158" font-size="9" fill="#1565c0">→ 172.18.0.3</text>

  <!-- Direct connection arrow -->
  <defs><marker id="dc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#2e7d32"/></marker></defs>
  <line x1="192" y1="210" x2="278" y2="210" stroke="#2e7d32" stroke-width="2" marker-end="url(#dc)"/>
  <text x="235" y="203" text-anchor="middle" font-size="9" fill="#2e7d32">mongodb://mongodb:27017</text>

  <line x1="422" y1="210" x2="508" y2="210" stroke="#2e7d32" stroke-width="2" marker-end="url(#dc)"/>
  <text x="465" y="203" text-anchor="middle" font-size="9" fill="#2e7d32">redis://redis:6379</text>

  <text x="350" y="305" text-anchor="middle" font-size="11" fill="#555">Containers on the same network reach each other by service name — no IPs needed</text>
</svg>
```

---

### 🔒 Network Isolation Pattern

```yaml
# Production best practice: separate frontend and backend networks
networks:
  public:      # Nginx talks here
  private:     # API + DB only — completely isolated from internet
    internal: true
```

```bash
# Verify network isolation
docker network inspect app-network

# Test connectivity between containers
docker exec api ping mongodb          # ✅ works (same network)
docker exec nginx ping postgres       # ❌ blocked (different network)
```

---
