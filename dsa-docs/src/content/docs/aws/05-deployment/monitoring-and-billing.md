---
title: "Monitoring & Billing"
description: "CloudWatch for monitoring/logs/alarms, AWS billing, cost management, and free tier tips."
sidebar:
  order: 3
---

## Monitoring & Billing

Once your app is running on AWS, you need to **monitor** it (is it healthy? fast?) and manage **costs** (how much are we spending?).

> **Analogy:** Monitoring is like a car's dashboard — it tells you speed, fuel level, and engine temperature. Billing is like tracking your fuel receipts — you want to know where your money is going.

---

### CloudWatch — Monitoring Service

**Amazon CloudWatch** collects metrics, logs, and events from AWS resources and your applications.

```mermaid
flowchart TB
    subgraph Sources["Data Sources"]
        EC2_CPU[EC2 CPU/Memory]
        ALB_Requests[ALB Request Count]
        Lambda_Errors[Lambda Error Count]
        Custom_Logs[Custom App Logs]
    end

    subgraph CW["CloudWatch"]
        Metrics[Metrics<br/>CPU, latency, errors]
        Logs[Logs<br/>Application logs]
        Alarms[Alarms<br/>Trigger actions]
        Dashboards[Dashboards<br/>Visualize everything]
    end

    subgraph Actions["Actions"]
        SNS[Send notification<br/>(SNS email/SMS)]
        ASG[Auto Scaling<br/>Add/remove instances]
        Lambda[Run Lambda<br/>Auto-remediate]
    end

    Sources --> CW
    CW --> Actions

    style Sources fill:#3b82f6,color:#fff
    style CW fill:#7c3aed,color:#fff
    style Actions fill:#059669,color:#fff
```

**Useful commands:**
```bash
# Get CPU metrics
aws cloudwatch get-metric-statistics \
    --namespace AWS/EC2 \
    --metric-name CPUUtilization \
    --dimensions Name=InstanceId,Values=i-123 \
    --start-time 2024-01-01T00:00:00 \
    --end-time 2024-01-02T00:00:00 \
    --period 300 \
    --statistics Average

# Create an alarm
aws cloudwatch put-metric-alarm \
    --alarm-name high-cpu \
    --alarm-description "Alert when CPU > 80%" \
    --metric-name CPUUtilization \
    --namespace AWS/EC2 \
    --statistic Average \
    --period 300 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 2 \
    --alarm-actions arn:aws:sns:us-east-1:123:my-topic
```

**Key CloudWatch metrics:**

| Service | Key Metrics |
|---------|-------------|
| **EC2** | CPU, Network, Status Checks |
| **ALB** | Request Count, Latency, HTTP 5xx/4xx |
| **Lambda** | Invocations, Errors, Duration, Throttles |
| **RDS** | CPU, Connections, Read/Write IOPS |
| **S3** | Bucket Size, Request Count, 4xx/5xx |

---

### AWS Billing & Cost Management

**Free Tier (12 months):**
| Service | Limit | Value |
|---------|-------|-------|
| EC2 t2.micro | 750 hours/month | ~$0 |
| S3 (Standard) | 5 GB | ~$0 |
| Lambda | 1M requests/month | ~$0 |
| DynamoDB | 25 GB storage | ~$0 |
| CloudWatch | 10 custom metrics | ~$0 |

**Cost-saving tips:**
1. **Right-size EC2** — don't use m5.xlarge when t3.medium will do
2. **Use Spot instances** — up to 90% off for fault-tolerant workloads
3. **Reserved Instances** — 1-3 year commitment, up to 72% off
4. **S3 lifecycle policies** — move old data to Glacier automatically
5. **Delete unused resources** — unattached EBS volumes, old snapshots, idle load balancers
6. **Use AWS Budgets** — set budgets and get alerts when approaching limits

```bash
# Check your current costs
aws ce get-cost-and-usage \
    --time-period Start=2024-01-01,End=2024-01-31 \
    --granularity MONTHLY \
    --metrics "BlendedCost" "UnblendedCost" "UsageQuantity"
```

---

### Common Monitoring Mistakes

| Mistake | Fix |
|---------|-----|
| No alarms set | Create alarms for CPU > 80%, 5xx errors, etc. |
| No log aggregation | Use CloudWatch Logs agent or send logs from code |
| Checking logs only after failure | Set up proactive dashboards |
| No cost budget | Set a monthly budget with alert threshold |
| Forgetting to stop dev instances | Use Instance Scheduler or Lambda to auto-stop at night |

---

### In Simple Words

- **CloudWatch** = monitoring service — metrics, logs, alarms, dashboards
- Set **alarms** for key metrics (CPU > 80%, high error rates)
- **AWS Free Tier** covers basic usage for 12 months — use it to learn
- **Right-size** instances, **delete unused** resources, use **Spot/Reserved** to save money
- Set **AWS Budgets** alerts so you don't get surprise bills
- Always monitor **costs** alongside performance — they're equally important
