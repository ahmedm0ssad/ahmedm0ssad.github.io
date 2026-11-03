---
title: 'Nature-Inspired Optimization for Sentiment Analysis (DSAI 403 Capstone)'
date: 2025-01-15
date_note: 'Undated'
summary: 'Applied 16 metaheuristic algorithms to tune a dual-input CNN for Twitter sentiment classification.'
links:
  - type: site
    url: https://github.com/ahmedm0ssad/Nature-Inspired-Computation
tags:
  - Nature-Inspired Optimization
---

**Stack:** Python, TensorFlow 2.x, Keras, scikit-learn, NumPy, pandas, LIME, SHAP, matplotlib, seaborn, Jupyter

- Applied 16 metaheuristic algorithms to tune a dual-input CNN for Twitter sentiment classification.
- Used ACO for feature selection: reduced from 10 to 4 features.
- Tabu Search achieved best baseline at 75.73%; Grey Wolf Optimizer (GWO) achieved best CNN performance at 76.07%.
- Novel application: used metaheuristics to optimize XAI tool parameters — Firefly for LIME, WOA for SHAP.
- Cuckoo Search outperformed Firefly by 9.3%; Bat Algorithm achieved 0.9936 SHAP quality score.
- Overall 25.54 percentage-point improvement over unoptimized baseline.
