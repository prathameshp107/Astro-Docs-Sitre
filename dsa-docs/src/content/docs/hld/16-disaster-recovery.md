---
title: "16 — Disaster Recovery"
description: "Disaster recovery strategies — RPO/RTO, backup strategies, DR plans (pilot light, warm standby, multi-region), and recovery testing."
sidebar:
  order: 16
---

## 16 — Disaster Recovery

**Disaster Recovery (DR)** is the process of restoring IT infrastructure and systems after a catastrophic failure — natural disaster, cyber attack, data center outage, or region-wide failure.

> **Analogy:** DR is like having an emergency plan for your home. If there's a fire, you've practiced the escape route, have backups of important documents in a safe deposit box, and know where to regroup. You hope you never need it, but you're ready if you do.

---

### Problem Statement

Without a DR plan:
- **Data loss** — no backups = lost forever
- **Extended downtime** — days or weeks to recover
- **Panic decisions** — no plan means chaotic response
- **Regulatory fines** — HIPAA, GDPR, PCI-DSS require DR plans
- **Reputation damage** — long outages destroy customer trust

---

### DR Strategies

```mermaid
flowchart TB
    DR["Disaster Recovery<br/>Strategies"] --> Backup["Backup & Restore<br/>Cheapest, slowest recovery"]
    DR --> Pilot["Pilot Light<br/>Core data replicated,<br/>servers off until needed"]
    DR --> Warm["Warm Standby<br/>Scaled-down version<br/>always running"]
    DR --> Multi["Multi-Region<br/>Active-Active<br/>Full production in 2+ regions"]

    Backup --> B_Details["RTO: Hours to Days<br/>RPO: 24 hours<br/>Cost: $"]
    Pilot --> P_Details["RTO: 10-60 min<br/>RPO: Minutes<br/>Cost: $$"]
    Warm --> W_Details["RTO: Minutes<br/>RPO: Seconds<br/>Cost: $$$"]
    Multi --> M_Details["RTO: Seconds<br/>RPO: Near-zero<br/>Cost: $$$$"]

    style DR fill:#7c3aed,color:#fff
    style Backup fill:#3b82f6,color:#fff
    style Pilot fill:#059669,color:#fff
    style Warm fill:#f59e0b,color:#fff
    style Multi fill:#ef4444,color:#fff
```

---

### DR Strategies Comparison

| Strategy | RTO | RPO | Cost | Complexity |
|----------|-----|-----|------|------------|
| **Backup & Restore** | Hours to days | 24 hours | $ | Low |
| **Pilot Light** | 10-60 min | Minutes | $$ | Medium |
| **Warm Standby** | Minutes | Seconds | $$$ | Medium |
| **Multi-Region Active-Active** | Seconds | Near-zero | $$$$ | High |
| **Data replication only** | Depends on app | Seconds | $$ | Medium |

---

### Pilot Light Pattern

The **pilot light** strategy keeps core data (database, S3) replicated to a DR region. Compute resources (EC2, Lambda) are provisioned only when needed for failover.

```mermaid
flowchart TB
    subgraph Primary["Primary Region (us-east-1)"]
        APP_PRIMARY["App Servers (running)"]
        DB_PRIMARY["Database Primary"]
    end

    subgraph DR["DR Region (us-west-2)"]
        APP_DR["App Servers (stopped)"]
        DB_REPLICA["DB Replica (syncing)"]
    end

    DB_PRIMARY -->|"Continuous Replication"| DB_REPLICA
    APP_PRIMARY -.->|"Failover: Start servers,<br/>promote replica"| APP_DR
    DB_REPLICA -.->|"Promote to primary"| APP_DR

    Users["Users"] --> Route53["Route53<br/>Active-Passive"]
    Route53 --> APP_PRIMARY
    Route53 -.->|"Health check fails<br/>→ Route to DR"| APP_DR

    style Primary fill:#3b82f6,color:#fff
    style DR fill:#7c3aed,color:#fff
    style DB_PRIMARY fill:#059669,color:#fff
    style DB_REPLICA fill:#f59e0b,color:#fff
```

---

### DR Runbook (What to Do During a Disaster)

```mermaid
sequenceDiagram
    participant Ops as Operations Team
    participant Monitor as Monitoring
    participant DR as DR Scripts
    participant Cloud as Cloud Provider

    Monitor->>Ops: 🚨 Alert: Primary region down!
    Ops->>Ops: 📋 Step 1: Verify disaster (5 min)
    Ops->>Ops: 📋 Step 2: Declare disaster (1 min)
    
    Ops->>DR: 📋 Step 3: Execute DR plan
    DR->>Cloud: Promote DB replica in DR region
    DR->>Cloud: Start app servers in DR region
    DR->>Cloud: Update DNS to point to DR region
    Cloud-->>Ops: DR environment ready ✅
    
    Ops->>Monitor: 📋 Step 4: Verify DR system (15 min)
    Ops->>Ops: 📋 Step 5: Update status page
    
    Note over Ops,Cloud: Recovery complete. RTO: 30 min. RPO: 5 min.
```

---

### Backup Strategies

| Data Type | Backup Method | Frequency | Retention |
|-----------|--------------|-----------|-----------|
| **Database** | Automated snapshots | Daily + transaction logs (continuous) | 30-90 days |
| **Application config** | Version control (Git) | Per deployment | Forever |
| **User uploads** | Replication / versioning | Continuous | Regional replication |
| **Logs** | Export to S3/Glacier | Real-time | 1-7 years (compliance) |
| **Infrastructure** | IaC templates (CloudFormation, Terraform) | Per change | Version history |

---

### 3-2-1 Backup Rule

```mermaid
flowchart TB
    Rule["3-2-1 Backup Rule"] --> Copies["3 copies<br/>of your data"]
    Copies --> Media["2 different media<br/>types (SSD + Tape / Cloud)"]
    Media --> Offsite["1 copy offsite<br/>(different region)"]

    Copies --> Copy1["Primary (hot)"]
    Copies --> Copy2["Local backup (warm)"]
    Copies --> Copy3["Offsite backup (cold)"]

    style Rule fill:#7c3aed,color:#fff
    style Copies fill:#3b82f6,color:#fff
    style Media fill:#059669,color:#fff
    style Offsite fill:#ef4444,color:#fff
```

---

### Disaster Recovery Testing

| Test Type | Description | Frequency |
|-----------|-------------|-----------|
| **Tabletop exercise** | Walk through DR plan verbally | Quarterly |
| **Backup restore test** | Actually restore from backups | Monthly |
| **Partial failover** | Fail over non-critical components | Quarterly |
| **Full DR drill** | Complete failover to DR region | Annually |
| **Chaos engineering** | Deliberately inject failures | Ongoing |

---

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **Backup & Restore** | Cheap, simple | Slow recovery, potential data loss |
| **Pilot Light** | Good balance of cost and speed | Manual steps during failover |
| **Warm Standby** | Fast recovery | Run cost even when not needed |
| **Multi-Region** | Instant availability | Highest cost, complex data sync |

---

### Scaling Strategies

| Strategy | Description |
|----------|-------------|
| **Automated DR runbook** | Script everything — no manual steps during disaster |
| **Infrastructure as Code** | Reproduce entire environment from templates |
| **Data replication** | Continuous replication for databases (async or sync) |
| **DNS-based failover** | Route53 health checks + automatic DNS switching |
| **Immutable infrastructure** | No manual server configs — rebuild not repair |

---

### Interview Questions

1. **What's the difference between pilot light and warm standby?**
2. **Explain RTO and RPO — what's the difference?**
3. **What is the 3-2-1 backup rule?**
4. **How would you design a disaster recovery plan for a multi-region web app?**
5. **How often should you test your disaster recovery plan?**

---

### Real-World Examples

| System | DR Strategy |
|--------|-------------|
| **AWS** | 3 copies of all S3 objects, Geo-redundant across regions |
| **Netflix** | Multi-region active-active (Simian Army tests DR) |
| **GitHub** | MySQL replication + S3 backups, DR drills every quarter |
| **Google** | Redundant data centers globally, minutes to failover |

---

### In Simple Words

- **Disaster Recovery** = plan to restore service after a catastrophic failure
- **RTO** (Recovery Time Objective) = how fast you recover; **RPO** = how much data you lose
- **Four strategies** from cheapest/slowest to expensive/fastest: Backup → Pilot Light → Warm Standby → Multi-Region
- **Pilot Light** = keep DB running in DR region, start app servers on failover — good balance
- **3-2-1 Rule**: 3 copies, 2 media types, 1 offsite
- **Test your DR plan!** An untested plan is just a wish
- **Automate everything** in the DR runbook — panic leads to mistakes
