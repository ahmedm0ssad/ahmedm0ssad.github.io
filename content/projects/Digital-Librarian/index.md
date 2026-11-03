---
title: 'The Digital Librarian (DSAI 427 — Big Data)'
date: 2025-01-15
date_note: '2024–2025 · **Languages:** Java + Python'
summary: 'Distributed inverted-index system on Hadoop. Four MapReduce classes: Mapper, Combiner, Reducer, Driver.'
links:
  - type: site
    url: https://github.com/ahmedm0ssad/Digital-Librarian
tags:
  - Big Data & Distributed Systems
---

**Completed:** 2024–2025 · **Languages:** Java + Python
**Language(s):** Java + Python
**Stack:** Apache Hadoop 3.3.6, HDFS, YARN, MapReduce, Maven, Docker, Docker Compose, Python, pandas, matplotlib, NumPy, Bash
**Role:** Full Java MapReduce, Distributed Cache, Bash scripts, Docker multi-node, Python benchmarking (pair project with Habiba Arafa)

- Distributed inverted-index system on Hadoop. Four MapReduce classes: Mapper, Combiner, Reducer, Driver.
- Dataset: 10 Project Gutenberg books (~6MB, ~117K lines).
- Used Distributed Cache for stopword distribution across nodes.
- Wrote Bash automation scripts for cluster setup and job submission.
- Built Python benchmarking suite with Amdahl's Law analysis.
- Results: 39s → 34s → 30s for 1–3 reducers; 40–60% network traffic reduction from Combiner.
