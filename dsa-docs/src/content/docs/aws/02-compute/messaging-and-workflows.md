---
title: "Messaging, APIs & Workflows"
description: "AWS messaging services (SQS, SNS), API Gateway, and Step Functions for building distributed applications."
sidebar:
  order: 4
---

## Messaging, APIs & Workflows

Modern cloud apps are **distributed** — different services need to communicate. AWS provides **SQS** (message queues), **SNS** (notifications), **API Gateway** (HTTP APIs), and **Step Functions** (workflow orchestration).

> **Analogy:** SQS is like a mailbox — you leave messages, and someone picks them up when ready. SNS is like a megaphone — one shout, many listeners. API Gateway is like a receptionist who routes calls. Step Functions is like a project manager who coordinates the whole workflow.

---

### Messaging Services Overview

```mermaid
flowchart TB
    subgraph Producers["Producers / Event Sources"]
        App["Your App"]
        S3["S3 Upload"]
        Lambda["Lambda"]
    end

    subgraph Messaging["AWS Messaging"]
        SQS["SQS Queue<br/>Decouple apps<br/>Pull-based"]
        SNS["SNS Topic<br/>Pub/Sub<br/>Push-based"]
        EB["EventBridge<br/>Event bus<br/>Serverless events"]
    end

    subgraph Consumers["Consumers / Targets"]
        Worker["Worker EC2/Lambda"]
        Email["Email / SMS"]
        HTTP["HTTP Endpoint"]
        DLQ["Dead Letter Queue"]
    end

    Producers --> Messaging
    Messaging --> Consumers

    style Producers fill:#3b82f6,color:#fff
    style Messaging fill:#7c3aed,color:#fff
    style Consumers fill:#059669,color:#fff
```

---

### SQS — Simple Queue Service

**SQS** is a fully managed message queue. Producers send messages to a queue, and consumers poll (pull) messages when they're ready.

```mermaid
sequenceDiagram
    participant P as Producer (App)
    participant Q as SQS Queue
    participant C as Consumer (Worker)
    participant DLQ as Dead Letter Queue

    P->>Q: SendMessage({ order: 123 })
    Note over Q: Message stored durably<br/>across multiple AZs

    C->>Q: ReceiveMessage (poll)
    Q-->>C: { order: 123 }
    C->>C: Process order...

    alt Success ✅
        C->>Q: DeleteMessage (remove from queue)
    else Failure (max retries) ❌
        Q->>DLQ: Move to DLQ for inspection
    end
```

```bash
# Create a queue
aws sqs create-queue --queue-name my-app-queue

# Send a message
aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue \
    --message-body '{"orderId": 123, "userId": 456}'

# Receive messages
aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/123/my-app-queue
```

| SQS Feature | What It Does |
|-------------|-------------|
| **Standard Queue** | At-least-once delivery, best-effort ordering |
| **FIFO Queue** | Exactly-once, strict ordering (300 msg/s) |
| **DLQ (Dead Letter Queue)** | Messages that failed after max retries |
| **Visibility Timeout** | Hide message from other consumers while processing |
| **Long Polling** | Wait up to 20s for messages (reduces empty responses) |

---

### SNS — Simple Notification Service

**SNS** is a pub/sub messaging service — one message published to a topic is pushed to all subscribers.

```mermaid
flowchart TB
    Publisher["Publisher<br/>S3 event / Lambda / App"] --> Topic["SNS Topic"]
    Topic --> Sub1["Email Subscription"]
    Topic --> Sub2["SMS Subscription"]
    Topic --> Sub3["SQS Queue"]
    Topic --> Sub4["Lambda Function"]
    Topic --> Sub5["HTTP/S Endpoint"]

    style Publisher fill:#f59e0b,color:#fff
    style Topic fill:#7c3aed,color:#fff
```

```bash
# Create a topic
aws sns create-topic --name order-alerts

# Subscribe email
aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123:order-alerts \
    --protocol email --notification-endpoint admin@example.com

# Publish
aws sns publish --topic-arn arn:aws:sns:us-east-1:123:order-alerts \
    --message "New order received: #12345"
```

---

### API Gateway

**API Gateway** lets you create RESTful and WebSocket APIs that front your Lambda functions or other AWS services.

```mermaid
sequenceDiagram
    participant C as Client App
    participant AG as API Gateway
    participant L as Lambda
    participant D as DynamoDB

    C->>AG: HTTP GET /users/123
    AG->>AG: Validate API key/auth
    AG->>AG: Rate limit check
    AG->>L: Invoke Lambda
    L->>D: Get user from DB
    D-->>L: User data
    L-->>AG: JSON response
    AG-->>C: 200 OK + JSON
```

```bash
# Create REST API
aws apigateway create-rest-api --name my-api --region us-east-1

# Deploy
aws apigateway create-deployment --rest-api-id abc123 --stage-name prod
```

**API Gateway features:**
- **REST APIs** — traditional RESTful endpoints
- **HTTP APIs** — cheaper, simpler, faster (for Lambda proxies)
- **WebSocket APIs** — real-time two-way communication
- **API keys** — usage plans, throttling
- **Request/response transformation** — map JSON shapes

---

### Step Functions — Workflow Orchestration

**Step Functions** coordinates multiple AWS services into a visual workflow.

```mermaid
flowchart TB
    Start["Order Received"] --> Validate["Step 1: Validate Order<br/>Lambda"]
    Validate -->|"Valid ✅"| Process["Step 2: Process Payment<br/>SQS → Worker"]
    Validate -->|"Invalid ❌"| Reject["Reject Order<br/>SNS → Email"]
    Process --> Check{"Payment<br/>Success?"}
    Check -->|"Yes"| Ship["Step 3: Ship Order<br/>Lambda → DB Update"]
    Check -->|"No"| Retry["Retry (max 3)"]
    Retry -->|"Failed"| DLQ["DLQ + SNS Alert"]
    Ship --> Complete["Order Complete 🎉"]

    style Start fill:#059669,color:#fff
    style Complete fill:#059669,color:#fff
    style Reject fill:#ef4444,color:#fff
    style DLQ fill:#ef4444,color:#fff
```

```json
// Step Functions state machine definition (simplified)
{
  "Comment": "Order processing workflow",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:validate-order",
      "Next": "ProcessPayment"
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:states:express-task",
      "Next": "CheckPayment",
      "Retry": [ { "ErrorEquals": ["States.ALL"], "MaxAttempts": 3 } ]
    }
  }
}
```

---

### When to Use Which

| Use Case | Service |
|----------|---------|
| Decouple two services (async processing) | **SQS** |
| Broadcast to multiple subscribers | **SNS** |
| Create HTTP/REST API for Lambda | **API Gateway** |
| Coordinate multi-step workflow | **Step Functions** |
| Event-driven between AWS services | **EventBridge** |
| Schedule/cron jobs | **EventBridge + Lambda** |

---

### In Simple Words

- **SQS** = message queue — decouple apps, buffer work, handle traffic spikes
- **SNS** = pub/sub — one message pushed to many subscribers (email, SMS, Lambda)
- **API Gateway** = managed HTTP API frontend — auth, throttling, request routing
- **Step Functions** = visual workflow orchestration across Lambda, SQS, DynamoDB
- Use **SQS** for async processing, **SNS** for broadcasts, **Step Functions** for multi-step workflows
