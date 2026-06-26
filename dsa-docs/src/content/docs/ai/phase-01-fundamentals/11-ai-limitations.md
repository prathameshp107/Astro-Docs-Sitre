---
title: "11. AI Limitations"
description: "What AI cannot do well — the real constraints that every AI engineer needs to understand."
sidebar:
  order: 11
---

## Why Limitations Matter

> Understanding what AI **cannot** do is as important as knowing what it can. Over-trusting AI leads to bad products. Under-trusting it means missed opportunities.

---

## 1. Hallucination

**What it is:** AI generates confident-sounding but factually incorrect output.

**Example:** Ask an LLM for citations → it may produce plausible-looking but non-existent papers with real-sounding authors.

**Why it happens:** LLMs are trained to produce likely-sounding text, not to verify facts. They predict the next token — not retrieve ground truth.

**Mitigation:** RAG (retrieval-augmented generation), grounding, citations from a verified source, human review.

---

## 2. Bias

**What it is:** AI inherits biases from training data, amplifying existing societal inequalities.

**Examples:**
- Facial recognition systems with higher error rates on darker skin tones (trained on mostly light-skinned faces)
- Resume screening tools that down-ranked women (trained on historical hiring data skewed male)
- Loan approval models that discriminate by zip code (a proxy for race)

**Why it happens:** The model reflects its data. If data is biased, the model is biased.

**Mitigation:** Diverse training data, fairness-aware evaluation, bias audits, human oversight in high-stakes decisions.

---

## 3. Data Dependency

- AI needs **large amounts of high-quality labeled data** to work well
- Rare events (rare diseases, uncommon fraud types) are hard to model
- Data labeling is expensive and time-consuming
- Private/sensitive domains (medical, legal) have limited accessible data

---

## 4. Lack of True Understanding

AI models don't "understand" — they find statistical patterns.

```
GPT can write a poem about grief
It has never felt grief
It has no model of what grief is
It predicts tokens that look like grief poems
```

This matters when reasoning requires common sense, causal understanding, or grounding in physical reality.

**Symptom:** Models fail on simple logic puzzles that are phrased unusually — because the phrasing breaks the statistical pattern.

---

## 5. Interpretability ("Black Box")

- Deep neural networks have billions of parameters
- It is not clear **why** they make a specific prediction
- Hard to debug, audit, or defend legally in regulated industries
- **Explainable AI (XAI)** is an active research area

**When this matters:** Healthcare (why did the model flag this cancer?), finance (why was the loan rejected?), legal systems.

---

## 6. Cost and Compute

| Cost | Detail |
|------|--------|
| **Training** | GPT-4 cost ~$100M+ to train |
| **Inference** | Serving large models at scale is expensive |
| **Fine-tuning** | Still requires significant GPU hours |
| **Energy** | Large models consume significant electricity |

Not every company can train frontier models. Most should use APIs or fine-tune smaller open models.

---

## 7. Out-of-Distribution Failure

Models fail on inputs that differ significantly from training data:

- A self-driving model trained on sunny California roads fails in heavy snow
- A medical model trained on one hospital's scans fails on another's (different equipment)

AI doesn't know what it doesn't know. It makes predictions even when the input is completely outside its training distribution.

---

## 8. No Real-World Grounding

LLMs don't interact with the world. They have no:
- Current information (knowledge cutoff)
- Ability to take actions (without tools)
- Sensory experience
- Memory across sessions (without external storage)

---

## Interview Questions

**Q: What is hallucination in LLMs and how do you mitigate it?**

**A:** Hallucination is when an LLM generates plausible but factually incorrect content — including fabricated citations, wrong dates, or invented facts. It happens because LLMs predict likely tokens, not verified facts. Mitigations include: Retrieval-Augmented Generation (RAG) to ground answers in real documents, asking the model to cite sources, using smaller more constrained prompts, and human review for high-stakes outputs.

---

**Q: Why is AI bias a problem and who is responsible for it?**

**A:** AI bias occurs when a model's training data reflects historical human biases, causing the model to perpetuate or amplify discrimination — for example, in hiring, lending, or policing. Responsibility is shared: data collectors who don't ensure diversity, engineers who don't audit for bias, and organizations that deploy without testing for fairness across demographic groups.
