---
title: "Design a Payment System"
description: "Designing a payment system — idempotency, ledger, reconciliation, and handling failures."
sidebar:
  order: 12
---

# Case Study: Design a Payment System

> A payment system processes financial transactions — the most critical system where correctness is everything.

---

## Requirements

**Functional:**
- Process a payment from buyer to seller
- Handle multiple payment methods (credit card, wallet, bank transfer)
- Generate receipts
- Support refunds and chargebacks

**Non-functional:**
- **Exactly-once processing** — no double charges!
- Idempotent retries
- Audit trail of all transactions
- 99.999% uptime during business hours

---

## High-Level Design

```mermaid
flowchart LR
    Client["📱 Client"] --> API["Payment API"]
    API --> Auth["Auth & Fraud Check"]
    Auth --> Ledger["Ledger Service"]
    Ledger --> Wallet["Wallet Service"]
    Ledger --> PSP["Payment Processor<br/>(Stripe, PayPal)"]

    API --> Queue["Message Queue"]
    Queue --> Reconciliation["Reconciliation Service"]
    Queue --> Notification["Notification"]

    Ledger --> DB[("Ledger DB<br/>PostgreSQL")]

    style Client fill:#7c3aed,color:#fff
    style API fill:#4f46e5,color:#fff
    style Auth fill:#6366f1,color:#fff
    style Ledger fill:#8b5cf6,color:#fff
    style PSP fill:#059669,color:#fff
    style DB fill:#059669,color:#fff
```

---

## Deep Dive: Payment Flow with Idempotency

```mermaid
sequenceDiagram
    participant Client as 📱 Client
    participant API as 🖥️ Payment API
    participant PSP as 🏦 Payment Processor
    participant Ledger as 📒 Ledger

    Client->>API: POST /charge<br/>{ idempotency_key: "abc", amount: 1000 }
    API->>API: Check idempotency — key "abc" seen before?
    Note over API: First time → process
    API->>PSP: Process payment (idem_key: "abc")
    PSP-->>API: ✅ Success (transaction_id: "txn_456")
    API->>Ledger: Record debit user_A, credit user_B
    Ledger-->>API: ✅ Recorded
    API-->>Client: ✅ 200 { status: "success", txn_id: "txn_456" }

    Client->>API: POST /charge<br/>{ idempotency_key: "abc", amount: 1000 } (RETRY)
    API->>API: Check idempotency — key "abc" found!
    API-->>Client: ✅ 200 { status: "success", txn_id: "txn_456" }
    Note over API: Same response — no double charge!
```

---

## Deep Dive: Double-Entry Ledger

Every transaction is recorded as two entries (debit + credit):

```
Transaction: User A pays $10 to User B

Entry 1: User_A | DEBIT  | $10 | Wallet
Entry 2: User_B | CREDIT | $10 | Wallet

Sum of all entries = 0  (always!)
```

**Why double-entry?** You can detect errors: if `sum(debits) ≠ sum(credits)`, something is wrong.

---

## Deep Dive: Reconciliation

```javascript
// Daily reconciliation job
async function reconcile() {
  // 1. Get all payments from ledger for today
  const payments = await ledger.getPayments(Date.range('today'));

  // 2. Get all settlements from payment processor
  const settlements = await psp.getSettlements(Date.range('today'));

  // 3. Match them
  for (const payment of payments) {
    const match = settlements.find(s => s.id === payment.psp_transaction_id);

    if (!match) {
      // Payment processor didn't settle this!
      await alertTeam(`Unreconciled payment: ${payment.id}`);
    }

    if (match.amount !== payment.amount) {
      // Amount mismatch!
      await alertTeam(`Amount mismatch: ${payment.id}`);
    }
  }
}
```

**Reconciliation catches:**
- Payments that succeeded in the ledger but failed at the processor
- Processor settled a payment that the ledger doesn't know about
- Amount mismatches (currency conversion, fees)

---

## Data Model

```sql
-- Immutable audit log
CREATE TABLE transactions (
  id BIGINT PRIMARY KEY,
  idempotency_key VARCHAR(64) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  amount_cents BIGINT NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20),       -- pending, succeeded, failed, refunded
  psp_transaction_id VARCHAR(64),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Double-entry ledger
CREATE TABLE ledger_entries (
  id BIGINT PRIMARY KEY,
  transaction_id BIGINT NOT NULL,
  account_id BIGINT NOT NULL,
  entry_type VARCHAR(10),   -- DEBIT, CREDIT
  amount_cents BIGINT NOT NULL,
  currency VARCHAR(3),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
```

---

## Bottlenecks & Trade-offs

| Bottleneck | Solution |
|-----------|----------|
| **Exactly-once processing** | Idempotency keys + idempotent PSP handling |
| **PSP failures** | Retry with exponential backoff, circuit breaker |
| **Fraud** | Fraud detection service before processing |
| **Reconciliation** | Daily automated reconciliation with alerts |
| **Concurrent writes to balance** | Optimistic locking (version column) or row-level locks |

---

## In Simple Words

- Payment system = the most correctness-critical system. No double charges allowed!
- Idempotency keys prevent double charges from retries.
- Double-entry ledger ensures every debit has a matching credit.
- Daily reconciliation catches mismatches between your records and the payment processor.
