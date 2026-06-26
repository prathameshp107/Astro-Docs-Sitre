---
title: "08. Common AI Terminology"
description: "The essential AI vocabulary you need to understand papers, docs, and conversations."
sidebar:
  order: 8
---

## Why Terminology Matters

AI has a dense vocabulary. The same concept sometimes has multiple names. This glossary gives you the precise definition for each term and how they relate.

---

## Core Terms

| Term | Definition |
|------|-----------|
| **Model** | A mathematical function mapping inputs to outputs, learned from data |
| **Parameters / Weights** | Numerical values inside a model adjusted during training |
| **Training** | The process of adjusting weights to minimize prediction error |
| **Inference** | Using a trained model to make predictions on new data |
| **Dataset** | Collection of examples used to train, validate, or test a model |
| **Feature** | An input variable used by the model (e.g., age, price, word) |
| **Label / Target** | The correct output the model should predict |
| **Loss / Cost** | A number measuring how wrong the model's prediction is |
| **Gradient Descent** | Optimization algorithm that updates weights to reduce loss |
| **Backpropagation** | Algorithm to compute how each weight contributes to the loss |
| **Epoch** | One complete pass through the training dataset |
| **Batch Size** | Number of examples processed in one training step |
| **Learning Rate** | How large each weight update step is |

---

## Model Quality Terms

| Term | Definition |
|------|-----------|
| **Overfitting** | Model memorizes training data, poor on new data |
| **Underfitting** | Model too simple, poor on both training and new data |
| **Generalization** | Model performs well on unseen data |
| **Bias (statistical)** | Systematic error — model consistently wrong in one direction |
| **Variance** | Model too sensitive to training data — inconsistent across samples |
| **Regularization** | Techniques to prevent overfitting (L1, L2, dropout) |
| **Cross-validation** | Evaluating model on multiple train/test splits to reduce variance |
| **Baseline** | Simple model to beat — sets minimum acceptable performance |

---

## Neural Network Terms

| Term | Definition |
|------|-----------|
| **Neural Network** | Layers of interconnected nodes loosely inspired by the brain |
| **Neuron / Node** | Single unit that computes a weighted sum + activation |
| **Layer** | Group of neurons (input, hidden, output layers) |
| **Activation Function** | Non-linear function applied per neuron (ReLU, sigmoid, tanh) |
| **Deep Learning** | Neural networks with many hidden layers |
| **CNN** | Convolutional Neural Network — specialized for images |
| **RNN** | Recurrent Neural Network — specialized for sequences |
| **Transformer** | Architecture using self-attention for parallel sequence processing |
| **Attention** | Mechanism that weighs the importance of different input parts |
| **Embedding** | Dense vector representation of discrete items (words, images) |

---

## LLM-Specific Terms

| Term | Definition |
|------|-----------|
| **Token** | Unit of text the model processes (word, sub-word, or character) |
| **Context Window** | Maximum tokens a model can process at once |
| **Prompt** | Input text given to an LLM |
| **Completion / Response** | Model's output |
| **Temperature** | Controls randomness of output (0 = deterministic, 1+ = creative) |
| **Top-p / Top-k** | Sampling strategies controlling output diversity |
| **Hallucination** | Model confidently generates false information |
| **Fine-tuning** | Further training a pretrained model on domain-specific data |
| **RLHF** | Reinforcement Learning from Human Feedback — used to align LLMs |
| **RAG** | Retrieval-Augmented Generation — grounding LLM with external docs |

---

## Data Terms

| Term | Definition |
|------|-----------|
| **Supervised Learning** | Training with labeled examples (input → correct output) |
| **Unsupervised Learning** | Finding patterns without labels |
| **Reinforcement Learning** | Learning via reward/penalty signals |
| **Train Set** | Data used to fit the model |
| **Validation Set** | Data used to tune hyperparameters |
| **Test Set** | Data held out for final evaluation only |
| **Data Drift** | Distribution of input data changes over time |
| **Class Imbalance** | One output class much rarer than others (e.g., fraud) |

---

## Interview Questions

**Q: What is the difference between a parameter and a hyperparameter?**

**A:** Parameters (weights) are learned from training data — they are what the model optimizes. Hyperparameters are settings you choose before training — like learning rate, batch size, number of layers, or dropout rate. Parameters are internal to the model; hyperparameters are external knobs you tune.

---

**Q: What is the difference between overfitting and underfitting?**

**A:** Overfitting happens when a model learns training data too well — including noise — and fails to generalize. It has low training error but high test error. Underfitting happens when a model is too simple to capture the real patterns — high error on both training and test data. The goal is the sweet spot between them (good generalization).
