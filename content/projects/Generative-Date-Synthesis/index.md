---
title: 'Conditional Date Synthesis with Deep Generative Models (DSAI 490 — Assignment 2)'
date: 2025-01-15
date_note: 'Undated'
summary: 'Four generative architectures for calendar date synthesis conditioned on day-of-week, month, leap-year, and decade.'
links:
  - type: site
    url: https://github.com/ahmedm0ssad/Generative-Date-Synthesis
tags:
  - Deep Learning / Computer Vision
---

**Stack:** Python 3.10, PyTorch 2.5.1, CUDA 11.8, Kaggle GPU

- Four generative architectures for calendar date synthesis conditioned on day-of-week, month, leap-year, and decade.
- WGAN-GP: best overall (47.58% Condition Pass Rate, 100% month accuracy, 75.63% leap-year accuracy).
- CVAE: 31.48% CPR; Discrete Diffusion: 34.04% CPR; Transformer Seq2Seq: 24.52% CPR (mode collapse observed).
