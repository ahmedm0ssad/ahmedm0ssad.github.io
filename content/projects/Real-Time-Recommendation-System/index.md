---
title: 'Real-Time Movie Recommendation System (Big Data Capstone)'
date: 2025-01-15
date_note: 'Undated'
summary: 'Production-grade end-to-end recommendation system using ALS collaborative filtering on MovieLens 1M dataset (RMSE: 0.8705).'
links:
  - type: site
    url: https://github.com/ahmedm0ssad/Real-Time-Recommendation-System
tags:
  - Big Data & Distributed Systems
featured: true
---

**Language(s):** Python
**Stack:** Apache Kafka 3.5.0, Spark Structured Streaming 3.5.0, PySpark MLlib (ALS), Streamlit, Plotly, Pandas, NumPy, PyArrow, Parquet, WSL Ubuntu

- Production-grade end-to-end recommendation system using ALS collaborative filtering on MovieLens 1M dataset (RMSE: 0.8705).
- Kafka producer at ~2 events/second with 5% fault injection.
- Sliding-window aggregations (30s window, 10s slide).
- 3-type alert system.
- 5-panel Streamlit dashboard auto-refreshing every 5s.
- p95 end-to-end latency < 3 seconds.
