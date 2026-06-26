---
title: "15. AI Cheat Sheet"
description: "Quick reference for all Phase 1 AI concepts — the essential facts, hierarchy, and terms in one page."
sidebar:
  order: 15
---

## The AI Hierarchy

```
┌─────────────────────────────────────────────┐
│                    AI                        │
│  (any machine simulating human intelligence) │
│  ┌───────────────────────────────────────┐  │
│  │          Machine Learning             │  │
│  │  (AI that learns from data)           │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │        Deep Learning            │  │  │
│  │  │  (ML with neural networks)      │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │      Transformers         │  │  │  │
│  │  │  │  (attention-based DL)     │  │  │  │
│  │  │  │  ┌─────────────────────┐  │  │  │  │
│  │  │  │  │       LLMs          │  │  │  │  │
│  │  │  │  └─────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## Types of AI — Quick Reference

| Classification | Types | Exists? |
|----------------|-------|---------|
| By Capability | Narrow AI | ✓ Yes |
| By Capability | AGI | ✗ No |
| By Capability | Super AI | ✗ No |
| By Functionality | Reactive Machines | ✓ Yes (Deep Blue) |
| By Functionality | Limited Memory | ✓ Yes (ChatGPT, Tesla) |
| By Functionality | Theory of Mind | ✗ No |
| By Functionality | Self-Aware | ✗ No |

---

## How AI Works — One-Liner

```
Data → Train (minimize loss via backprop) → Model (frozen weights) → Inference
```

---

## AI Lifecycle — 7 Stages

```
1. Problem Definition  → Is this an ML problem? What's the metric?
2. Data Collection     → Labeled/unlabeled, quality > quantity
3. Data Preparation    → Clean, label, engineer features, split (60-80% of time)
4. Model Development   → Choose arch, train, tune hyperparameters
5. Evaluation          → Test set, fairness, latency, cost
6. Deployment          → API, A/B test, rollback plan
7. Monitor & Maintain  → Watch for data drift, retrain as needed
```

---

## Essential Terminology

| Term | One-Line Definition |
|------|-------------------|
| Model | Learned function: input → output |
| Parameters/Weights | Numbers adjusted during training |
| Training | Iterative weight updates to reduce loss |
| Inference | Using frozen model to predict |
| Loss | How wrong the prediction is |
| Gradient Descent | Optimizer that walks weights toward lower loss |
| Backpropagation | Computes gradient through the network |
| Epoch | One full pass through training data |
| Overfitting | Memorizes training, fails on new data |
| Underfitting | Too simple, fails on everything |
| Hallucination | LLM generates confident but false output |
| Token | Unit of text LLM processes |
| Context Window | Max tokens LLM can consider at once |
| RAG | Ground LLM answers in retrieved documents |
| Fine-tuning | Further train pretrained model on new data |
| Embedding | Dense vector representing a piece of content |
| Data Drift | Input distribution changes in production |
| RLHF | Align model via human preference feedback |

---

## AI Capabilities vs Limitations

| Can Do | Cannot Do (reliably) |
|--------|---------------------|
| Generate fluent text | Verify facts |
| Classify images | Reason about physics |
| Translate languages | Maintain long-term memory |
| Detect patterns in data | Understand cause vs correlation |
| Code completion | Know its own knowledge cutoff |
| Summarize documents | Give consistent answers to edge cases |

---

## Key Milestones

| Year | Event |
|------|-------|
| 1950 | Turing Test proposed |
| 1956 | "AI" coined at Dartmouth |
| 1997 | Deep Blue beats Kasparov |
| 2012 | AlexNet — deep learning for vision |
| 2017 | Transformer architecture published |
| 2018 | BERT, GPT-1 |
| 2020 | GPT-3 (175B params) |
| 2022 | ChatGPT — mainstream AI |
| 2024 | Reasoning models, AI agents, MCP |

---

## Ethics Quick Reference

| Principle | What to Ask |
|-----------|------------|
| Fairness | Equal performance across groups? |
| Transparency | Can decisions be explained? |
| Privacy | Minimum data needed? Consent obtained? |
| Accountability | Who owns failures? |
| Safety | Does it fail safely? Human override? |
| Beneficence | Who benefits? Who's harmed? |

---

## Phase 1 → Phase 2 Bridge

You now understand:
- What AI is and where it fits
- The AI → ML → DL → Transformers → LLMs hierarchy
- How learning happens (data, loss, backprop, inference)
- The full AI lifecycle
- Real-world applications and limitations
- Ethical considerations

**Phase 2: Machine Learning** dives into the algorithms themselves — how models actually learn from data, what supervised vs unsupervised vs reinforcement learning looks like in code, and the math behind the patterns.
