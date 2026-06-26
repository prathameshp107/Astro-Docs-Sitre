---
title: "07. AI Lifecycle"
description: "The end-to-end process of building and maintaining an AI system — from problem definition to production."
sidebar:
  order: 7
---

## What Is the AI Lifecycle?

> The AI lifecycle is the **end-to-end process** of taking an AI system from idea to production — and keeping it working over time.

Unlike traditional software, AI systems degrade if not maintained. Data drifts, the world changes, and models go stale. The lifecycle is continuous, not linear.

---

## The 7 Stages

```mermaid
flowchart TD
    P1["1. Problem Definition\nWhat to predict? What metric = success?"]
    P2["2. Data Collection\nDBs, APIs, scraping, sensors"]
    P3["3. Data Preparation\nClean, label, engineer, split\n60-80% of project time"]
    P4["4. Model Development\nChoose architecture, train, tune"]
    P5["5. Evaluation\nTest set: accuracy, F1, AUC-ROC"]
    P6["6. Deployment\nAPI, A/B test, rollback plan"]
    P7["7. Monitoring & Maintenance\nData drift, concept drift, retrain"]

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
    P7 -->|"Model degrades\nRetrain needed"| P2

    style P1 fill:#1e1b4b,stroke:#7c3aed,color:#e2e8f0
    style P2 fill:#172554,stroke:#3b82f6,color:#e2e8f0
    style P3 fill:#172554,stroke:#3b82f6,color:#e2e8f0
    style P4 fill:#14532d,stroke:#059669,color:#e2e8f0
    style P5 fill:#14532d,stroke:#059669,color:#e2e8f0
    style P6 fill:#451a03,stroke:#f59e0b,color:#e2e8f0
    style P7 fill:#450a0a,stroke:#ef4444,color:#e2e8f0
```

---

## Stage 1: Problem Definition

**What to decide:**
- Is this actually an ML problem? (or can rules solve it?)
- What are inputs and outputs?
- What does "success" look like? (metric)
- What data is available?

**Example:** "Reduce customer churn" → predict which users will cancel in next 30 days → binary classification problem.

---

## Stage 2: Data Collection

Gather raw data from relevant sources:
- Databases, logs, APIs
- Web scraping
- Surveys, sensors
- Third-party datasets

**Quality matters more than quantity.** Biased or incomplete data produces a biased model.

---

## Stage 3: Data Preparation

Raw data is almost never model-ready:

| Task | Description |
|------|-------------|
| **Cleaning** | Remove duplicates, fix errors, handle nulls |
| **Labeling** | Add ground truth (often manual) |
| **Feature Engineering** | Transform raw columns into useful signals |
| **Splitting** | Train / Validation / Test sets |
| **Normalization** | Scale numeric values to comparable ranges |

This stage typically takes **60–80% of total project time**.

---

## Stage 4: Model Development

Select and train a model:
1. Choose architecture (linear model, tree, neural network, LLM)
2. Train on training set
3. Tune hyperparameters on validation set
4. Iterate

**Start simple.** A logistic regression baseline before a neural network tells you what uplift complexity actually buys.

---

## Stage 5: Evaluation

Measure model quality on the **held-out test set** (data never seen during training):

| Metric | Use When |
|--------|----------|
| Accuracy | Balanced classes |
| Precision / Recall | Imbalanced classes (fraud, cancer) |
| F1 Score | Balance precision and recall |
| AUC-ROC | Ranking quality |
| BLEU / ROUGE | Text generation |
| Perplexity | Language model quality |

Also check: fairness across subgroups, latency, cost at scale.

---

## Stage 6: Deployment

Move model to production:
- Wrap in an API (FastAPI, Flask, or managed service)
- A/B test against current system
- Monitor for latency and errors
- Set up rollback plan

**Deployment is not the finish line.** It's where maintenance begins.

---

## Stage 7: Monitoring & Maintenance

Models degrade over time due to **data drift** (the real world changes):

| Issue | Example |
|-------|---------|
| **Data drift** | User language patterns shift |
| **Concept drift** | "Spam" evolves as spammers adapt |
| **Performance decay** | Accuracy drops as distribution changes |

Monitor: prediction distribution, accuracy on labeled samples, latency, error rates. Retrain periodically.

---

## Interview Questions

**Q: What is data drift and why does it matter?**

**A:** Data drift occurs when the statistical properties of model inputs change over time, causing the model's predictions to become less accurate. For example, a fraud detection model trained on 2022 data may miss new fraud patterns in 2024. This is why AI systems need continuous monitoring and periodic retraining — deployment is not a one-time event.

---

**Q: Why does data preparation take so much time?**

**A:** Real-world data is messy — missing values, duplicates, inconsistent formats, labeling errors, and imbalances. The model can only learn what the data teaches it, so cleaning and structuring it correctly is critical. Poor data preparation causes poor model performance regardless of how sophisticated the algorithm is.
