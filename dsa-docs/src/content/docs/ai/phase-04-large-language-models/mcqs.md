---
title: "Phase 4: Multiple Choice Questions"
description: "25+ MCQs covering all Phase 4 topics — LLM foundations, architecture, training, and inference."
sidebar:
  order: 120
---

# Phase 4: Multiple Choice Questions

> Test your knowledge with 25+ MCQs across easy, medium, and hard difficulty levels.

---

## Easy (10 Questions)

**1. What does LLM stand for?**
- A. Large Logic Machine
- B. Large Language Model
- C. Linear Learning Module
- D. Latent Language Mechanism
<details>
<summary>Show Answer</summary>
**B. Large Language Model**
</details>

**2. Which company created GPT-4?**
- A. Google
- B. Anthropic
- C. OpenAI
- D. Meta
<details>
<summary>Show Answer</summary>
**C. OpenAI**
</details>

**3. What is the primary input format for an LLM?**
- A. Images
- B. Audio
- C. Text
- D. Video
<details>
<summary>Show Answer</summary>
**C. Text** (though many modern LLMs are multimodal)
</details>

**4. What happens when an LLM receives a prompt longer than its context window?**
- A. The model crashes
- B. The prompt is truncated
- C. The context window expands automatically
- D. The output is doubled
<details>
<summary>Show Answer</summary>
**B. The prompt is truncated** (oldest tokens are dropped)
</details>

**5. Which decoding strategy is completely deterministic?**
- A. Top-k sampling
- B. Top-p sampling
- C. Greedy decoding
- D. Beam search
<details>
<summary>Show Answer</summary>
**C. Greedy decoding**
</details>

**6. What is a token in the context of LLMs?**
- A. A security credential
- B. A unit of text (word or subword)
- C. A type of neural network layer
- D. A training hyperparameter
<details>
<summary>Show Answer</summary>
**B. A unit of text (word or subword)**
</details>

**7. Which model family does Claude belong to?**
- A. OpenAI
- B. Anthropic
- C. Google DeepMind
- D. Meta
<details>
<summary>Show Answer</summary>
**B. Anthropic**
</details>

**8. What is the main purpose of tokenization?**
- A. To encrypt the input
- B. To convert text to numerical IDs
- C. To compress the data
- D. To translate languages
<details>
<summary>Show Answer</summary>
**B. To convert text to numerical IDs**
</details>

**9. Which neural network architecture do modern LLMs use?**
- A. RNN
- B. CNN
- C. Transformer
- D. GAN
<details>
<summary>Show Answer</summary>
**C. Transformer**
</details>

**10. What does SFT stand for?**
- A. Special Fine-Tuning
- B. Supervised Fine-Tuning
- C. Sequential Feedback Training
- D. Simplified Forward Transform
<details>
<summary>Show Answer</summary>
**B. Supervised Fine-Tuning**
</details>

---

## Medium (10 Questions)

**11. What problem did the Transformer solve that RNNs couldn't?**
- A. Handling variable-length input
- B. Parallelization during training
- C. Processing text data
- D. Using neural networks
<details>
<summary>Show Answer</summary>
**B. Parallelization during training** — RNNs process sequentially, Transformers process all tokens in parallel
</details>

**12. In self-attention, what does the Query vector represent?**
- A. The information the token carries
- B. What the token is looking for
- C. The token's position in the sequence
- D. The final output of the attention layer
<details>
<summary>Show Answer</summary>
**B. What the token is looking for**
</details>

**13. Why do Transformers need positional encoding?**
- A. To make the model faster
- B. Self-attention is permutation-invariant (order-agnostic)
- C. To reduce memory usage
- D. To enable parallel computation
<details>
<summary>Show Answer</summary>
**B. Self-attention treats inputs as sets, not sequences — it doesn't know order without positional encoding**
</details>

**14. What happens when temperature is set to 0?**
- A. Output becomes random
- B. Output becomes deterministic
- C. Output doubles in length
- D. Model crashes
<details>
<summary>Show Answer</summary>
**B. Output becomes deterministic** — the softmax approximates argmax, always picking the most likely token
</details>

**15. How does DPO differ from RLHF?**
- A. DPO is slower but more accurate
- B. DPO doesn't need a separate reward model
- C. DPO requires more human data
- D. DPO uses supervised learning only
<details>
<summary>Show Answer</summary>
**B. DPO directly optimizes preferences without training a separate reward model**
</details>

**16. What is the "alignment tax"?**
- A. The cost of hiring human annotators
- B. A slight performance decrease after alignment
- C. GPU compute cost for RLHF
- D. Legal compliance costs
<details>
<summary>Show Answer</summary>
**B. Alignment can slightly reduce output diversity and creativity**
</details>

**17. How does streaming improve user experience?**
- A. Reduces total generation time
- B. Reduces perceived latency
- C. Improves output quality
- D. Reduces cost
<details>
<summary>Show Answer</summary>
**B. Streaming sends tokens as they're generated, so users see output sooner**
</details>

**18. Which of the following is NOT a known LLM family?**
- A. Gemini
- B. Llama
- C. Cortex
- D. Mistral
<details>
<summary>Show Answer</summary>
**C. Cortex** — this is not a major LLM family
</details>

**19. What is the typical dimension of each attention head (d_k) in modern transformers?**
- A. 32
- B. 64-128
- C. 512
- D. 1024
<details>
<summary>Show Answer</summary>
**B. 64-128** — d_k = d_model / num_heads, typically 64-128
</details>

**20. Why does RLHF use a separate reward model?**
- A. To speed up training
- B. To provide a signal for optimizing the LLM
- C. To reduce memory usage
- D. To generate training data
<details>
<summary>Show Answer</summary>
**B. The reward model approximates human preferences and provides a gradient signal for PPO optimization**
</details>

---

## Hard (5 Questions)

**21. A transformer has d_model=4096, num_heads=32. What is the dimension of each attention head?**
- A. 64
- B. 128
- C. 256
- D. 512
<details>
<summary>Show Answer</summary>
**B. 128** — d_k = 4096 / 32 = 128
</details>

**22. What is the relationship between the feed-forward network's inner dimension and d_model in GPT?**
- A. Same as d_model
- B. 2x d_model
- C. 4x d_model
- D. 8x d_model
<details>
<summary>Show Answer</summary>
**C. 4x d_model** — The FFN typically expands to 4x the hidden dimension then projects back
</details>

**23. Which technique constrains LLM generation to produce valid JSON?**
- A. Temperature scaling
- B. Constrained decoding / grammar-based generation
- C. Beam search
- D. Top-k sampling
<details>
<summary>Show Answer</summary>
**B. Constrained decoding uses a grammar to ensure output follows a valid JSON schema**
</details>

**24. What is the Chinchilla optimal token-to-parameter ratio?**
- A. 10 tokens per parameter
- B. 20 tokens per parameter
- C. 50 tokens per parameter
- D. 100 tokens per parameter
<details>
<summary>Show Answer</summary>
**B. 20 tokens per parameter** — DeepMind's Chinchilla paper showed this is compute-optimal
</details>

**25. In the original Transformer paper, how many encoder and decoder layers were used?**
- A. 6 encoder, 6 decoder
- B. 12 encoder, 6 decoder
- C. 6 encoder, 12 decoder
- D. 8 encoder, 8 decoder
<details>
<summary>Show Answer</summary>
**A. 6 encoder and 6 decoder layers** in the base Transformer model
</details>

---

## Score Interpretation

| Score | Level | Next Steps |
|-------|-------|------------|
| 0-10 | 🟢 Beginner | Review Module 1-2 basics |
| 11-18 | 🟡 Intermediate | Focus on Modules 3-4 |
| 19-22 | 🟠 Advanced | Ready for Phase 5 |
| 23-25 | 🔴 Expert | Interview ready! |
