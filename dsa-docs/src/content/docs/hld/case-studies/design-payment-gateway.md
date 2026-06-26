---
title: "Case Study 9 — Design Payment Gateway"
description: "HLD case study: Design a payment gateway like Stripe — transaction flow, idempotency, reconciliation, and security."
sidebar:
  order: 9
---

## Case Study 9 — Design Payment Gateway

**Problem:** Design a payment processing system like Stripe or PayPal that handles millions of transactions daily with high reliability, security, and fraud detection.

---

### Requirements

| Type | Requirement |
|------|-------------|
| **Functional** | Process payments (credit card, wallet, bank), refunds, recurring billing, payout to merchants, webhook notifications, fraud detection |
| **Non-Functional** | < 2s payment processing (P99), 99.999% accuracy (no double charges), PCI-DSS compliance, support 10M+ transactions/day |

---

### Architecture Overview

```mermaid
flowchart TB
    subgraph Client["Clients"]
        Web["🛒 Merchant Website"]
        Mobile["📱 Merchant App"]
        API["3rd Party API"]
    end

    subgraph Gateway["Payment Gateway"]
        API_GW["API Gateway"]
        Token["Tokenization (PCI)"]
        Fraud["Fraud Detection"]
        Routing["Intelligent Routing"]
    end

    subgraph Services["Core Services"]
        Auth["Authorization"]
        Capture["Capture/Settlement"]
        Refund["Refund Service"]
        Billing["Recurring Billing"]
        Ledger["Ledger/Accounting"]
    end

    subgraph External["External"]
        Visa["Visa / MC Network"]
        Banks["Bank Partners"]
        Wallets["Digital Wallets"]
    end

    Client --> API_GW
    API_GW --> Token --> Fraud --> Routing
    Routing --> Auth & Capture & Refund & Billing & Ledger
    Auth --> Visa & Banks & Wallets

    style Client fill:#3b82f6,color:#fff
    style Gateway fill:#7c3aed,color:#fff
    style Services fill:#059669,color:#fff
    style External fill:#f59e0b,color:#fff
```

---

### Payment Flow

```mermaid
sequenceDiagram
    participant Merchant as Merchant Site
    participant API as Gateway API
    participant Fraud as Fraud Detection
    participant Bank as Bank Network
    participant Webhook as Webhook Svc

    Merchant->>API: POST /charges (token, amount, idempotency_key)
    Note over Merchant,API: Idempotency key prevents double charges
    
    API->>API: Validate request
    API->>Fraud: Score transaction
    
    alt Fraud Score High
        Fraud-->>API: Block ❌
        API-->>Merchant: 402 Payment Required (declined)
    else Fraud Score OK
        Fraud-->>API: Approved
        
        API->>Bank: Authorize charge
        Bank-->>API: Auth code (e.g., 123456)
        
        API->>API: Hold charge (authorization)
        par Capture
            API->>Ledger: Record pending transaction
        and Notify
            API->>Webhook: Send webhook to merchant
            Webhook-->>Merchant: payment_intent.succeeded
        end
        
        API-->>Merchant: 200 Created (charge_id: ch_xxx)
        
        Note over API,Bank: Later (same day): Capture/settle
        API->>Bank: Capture (submit for settlement)
        Bank-->>API: Settlement confirmation
        API->>Ledger: Update to completed
    end
```

---

### Key Design Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **Idempotency** | Idempotency key on all write requests | Retry safely — no double charges |
| **Tokenization** | Replace PAN with tokens | PCI scope reduction (don't store raw card numbers) |
| **Authorization vs Capture** | Auth (hold), Capture (settle later) | Verify funds before shipping, settle on fulfillment |
| **Ledger** | Double-entry accounting | Every debit has matching credit — audit trail |
| **Reconciliation** | Batch settlement files from banks | Match bank records to internal transactions |

---

### In Simple Words

- **Idempotency** is the most critical feature — safe retries without double charging
- **Tokenization** replaces sensitive card data with tokens — reduces PCI compliance scope
- **Authorization** = hold funds; **Capture** = complete the transaction (can be separate)
- **Fraud detection** scores each transaction in real-time before processing
- **Ledger** uses double-entry accounting — every transaction is recorded with matching credits/debits
- **Reconciliation** matches bank settlement files with internal records nightly
- **Webhooks** notify merchants of payment status changes asynchronously
- **PCI-DSS compliance** drives all security decisions — encryption, access control, audit logging
