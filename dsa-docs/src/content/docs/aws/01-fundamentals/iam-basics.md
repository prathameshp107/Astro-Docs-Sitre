---
title: "IAM Basics"
description: "AWS Identity and Access Management — users, groups, roles, policies, and the principle of least privilege."
sidebar:
  order: 3
---

## IAM Basics

**AWS Identity and Access Management (IAM)** is a service that lets you control who can access your AWS resources and what they can do with them. It's the **security foundation** of any AWS account.

> **Analogy:** IAM is like a building's security system. Users are people with ID badges, groups are departments with common access needs, roles are temporary visitor passes, and policies are the rules that say "this badge opens these doors."

---

### IAM Core Components

```mermaid
flowchart TB
    subgraph IAM["IAM"]
        Users[Users<br/>Individual people]
        Groups[Groups<br/>Collection of users]
        Roles[Roles<br/>Temporary permissions<br/>for services/apps]
        Policies[Policies<br/>JSON rules defining<br/>allowed/denied actions]
    end

    Users --> Groups
    Groups -->|Attached to| Policies
    Roles -->|Attached to| Policies
    Users -->|Can also have| Policies

    PolicyExample["Example Policy:
        { 'Effect': 'Allow',
          'Action': 's3:ListBucket',
          'Resource': '*' }"]

    Policies --> PolicyExample

    style IAM fill:#7c3aed,color:#fff
    style Users fill:#3b82f6,color:#fff
    style Groups fill:#059669,color:#fff
    style Roles fill:#f59e0b,color:#fff
    style Policies fill:#ef4444,color:#fff
```

### IAM — User/Policy → Actions Flow

```mermaid
sequenceDiagram
    participant User as IAM User/App
    participant IAM as IAM Service
    participant S3 as S3 Bucket
    participant EC2 as EC2 Instance

    User->>IAM: Request: List objects in bucket
    IAM->>IAM: Check attached policies
    IAM->>IAM: Evaluate: Allow or Deny?
    
    alt Policy Allows
        IAM->>S3: s3:ListBucket allowed ✅
        S3-->>User: List of objects
    else Policy Denies
        IAM-->>User: AccessDenied ❌
    end

    User->>IAM: Request: Start EC2 instance
    IAM->>IAM: Check policies
    IAM->>IAM: No ec2:StartInstances permission
    IAM-->>User: AccessDenied ❌
```

---

### IAM Policy Example

Policies are JSON documents that define permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ]
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::my-app-bucket/*"
    }
  ]
}
```

| Policy Element | What It Does |
|----------------|-------------|
| `Effect` | `Allow` or `Deny` |
| `Action` | Which API actions (e.g., `s3:ListBucket`) |
| `Resource` | Which resources (e.g., specific S3 bucket) |
| `Condition` | When the policy applies (optional) |

---

### Principle of Least Privilege

> **Give only the permissions needed to do the job — nothing more.**

```mermaid
flowchart TB
    Start["New team member joins"] --> Decide{"What do they<br/>need to access?"}
    Decide --> Minimal["Grant minimal permissions<br/>Only specific services & actions"]
    Minimal --> Review["Regularly review & audit<br/>Remove unused permissions"]
    Review --> Monitor["Monitor for unusual activity<br/>CloudTrail logs"]

    style Start fill:#f59e0b,color:#fff
    style Decide fill:#7c3aed,color:#fff
    style Minimal fill:#059669,color:#fff
    style Review fill:#3b82f6,color:#fff
    style Monitor fill:#ef4444,color:#fff
```

---

### IAM Best Practices

| Best Practice | Why |
|--------------|-----|
| **Delete root user access keys** | Root has full access — use IAM users instead |
| **Use IAM roles for EC2** | Don't store keys on EC2; assign a role |
| **Enable MFA** | Multi-factor authentication for all users |
| **Use groups, not individual policies** | Easier to manage permissions at scale |
| **Apply least privilege** | Start with minimal access and add as needed |
| **Use IAM Access Analyzer** | Find resources shared outside your account |
| **Rotate keys regularly** | Change access keys every 90 days |

---

### In Simple Words

- **IAM** controls who can access your AWS account and what they can do
- **Users** = people, **Groups** = collections, **Roles** = permissions for services
- **Policies** = JSON rules that allow or deny specific actions
- **Least privilege** = give only the minimum permissions needed
- Never use the **root account** — create IAM users with MFA enabled
