---
title: "Module 1 Summary: LLM Foundations"
description: "Review and practice everything from Module 1 — LLM basics, language models, tokenization, context windows."
sidebar:
  order: 10
---

# Module 1 Summary: LLM Foundations

## Quick Recap

| Concept | Key Point |
|---------|-----------|
| **LLM** | Neural network trained on internet-scale text to predict the next token |
| **Language Model** | Assigns probabilities to sequences of words |
| **Tokenization** | Converts text into numbers (tokens) the model can process |
| **Context Window** | Maximum number of tokens an LLM can process at once |

## Key Equations

- **Parameters vs Data ratio:** Modern LLMs have ~2 tokens of training data per parameter
- **Context window growth:** 512 (GPT-1) → 2048 (GPT-3) → 128K (GPT-4) → 1M (Gemini 1.5)
- **Token ratio:** ~0.75 words per token (English)

## Practice Questions

1. Explain why an LLM is considered a "prediction engine" rather than a "thinking machine."
2. What happens to the probability of the entire sequence as you multiply conditional probabilities?
3. Why can't you use raw word IDs as tokens? What's the vocabulary size problem?
4. If a model has a context window of 128K tokens, and each token is ~4 characters, how many pages of text can it process? (Assume 3000 characters per page)

## MCQs

1. **What does LLM stand for?**
   - a) Large Logic Machine
   - b) Large Language Model
   - c) Linear Language Module
   - d) Latent Learning Model
   - **Answer: b**

2. **Which of the following is NOT an emergent ability of large language models?**
   - a) Chain-of-thought reasoning
   - b) In-context learning
   - c) Database querying
   - d) Code generation
   - **Answer: c**

3. **What is the primary purpose of tokenization?**
   - a) To encrypt the input text
   - b) To convert text into numerical IDs
   - c) To compress the input
   - d) To translate between languages
   - **Answer: b**

4. **What happens when you send a prompt longer than the context window?**
   - a) The model expands its context window
   - b) The prompt is truncated (oldest tokens dropped)
   - c) The model crashes
   - d) The output doubles in length
   - **Answer: b**

## Interview Questions

1. **Q:** What is the difference between a foundation model and a fine-tuned model?
2. **Q:** Why do larger models show emergent abilities that smaller models don't?
3. **Q:** Explain autoregressive generation in one sentence.
