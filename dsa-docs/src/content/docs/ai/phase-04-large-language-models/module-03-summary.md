---
title: "Module 3 Summary: Training"
description: "Review and practice everything from Module 3 — pretraining, SFT, RLHF, and DPO."
sidebar:
  order: 30
---

# Module 3 Summary: Training

## Quick Recap

| Concept | Key Point |
|---------|-----------|
| **Pretraining** | Self-supervised learning on raw text — ~99% of training compute |
| **Next Token Prediction** | Predict the next token given all previous tokens |
| **Scaling Laws** | Model performance improves predictably with compute, data, and parameters |
| **SFT** | Instruction fine-tuning on human-written examples (100K-1M pairs) |
| **Reward Model** | Separate model trained to score outputs by human preference |
| **RLHF** | PPO optimization against the reward model |
| **DPO** | Direct optimization on preference pairs — no reward model needed |
| **Alignment Tax** | Small performance decrease on some tasks after alignment |

## Key Numbers

- **Pretraining data:** 1-15 trillion tokens (depending on model size)
- **SFT data:** 100K - 1M instruction-response pairs
- **RLHF reward model:** ~1-10B parameters
- **Training cost (GPT-3):** ~$5M for one training run
- **Training cost (GPT-4):** Estimated $100-200M

## Practice Questions

1. Why is pretraining called "self-supervised"? Where does the supervision signal come from?
2. List three differences between a base model and an instruction-tuned model.
3. Explain the "reward hacking" problem in RLHF.
4. Why might DPO produce more diverse outputs than RLHF?

## MCQs

1. **What is the primary training objective during pretraining?**
   - a) Classification accuracy
   - b) Next token prediction
   - c) Sentiment analysis
   - d) Translation quality
   - **Answer: b**

2. **Why can't pretraining alone produce a helpful assistant?**
   - a) The model is too small
   - b) The model continues text rather than following instructions
   - c) The training data is too old
   - d) The model hasn't seen enough languages
   - **Answer: b**

3. **What distinguishes DPO from RLHF?**
   - a) DPO is 10x faster to train
   - b) DPO doesn't need a separate reward model
   - c) DPO uses supervised learning only
   - d) DPO requires more human data
   - **Answer: b**

4. **What is the "alignment tax"?**
   - a) Cost of hiring human annotators
   - b) Slight performance decrease after alignment
   - c) GPU compute cost for RLHF
   - d) Legal compliance costs
   - **Answer: b**

## Interview Questions

1. **Q:** Why can't we use more SFT data instead of RLHF?
2. **Q:** What would happen if you trained an LLM only on code?
3. **Q:** Explain the three stages of LLM training in order.
