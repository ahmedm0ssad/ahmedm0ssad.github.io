---
title: 'Representation Learning with Autoencoders (DSAI 490 — Assignment 1)'
date: 2025-01-15
date_note: 'Undated'
summary: 'Implemented three autoencoder architectures: BasicAE (val MSE: 0.00838), DenoisingAE (val MSE: 0.00183, best), CVAE (posterior collapse diagnosed after epoch…'
links:
  - type: site
    url: https://github.com/ahmedm0ssad/AutoEncoder-VariationalAutoEncoder
tags:
  - Deep Learning / Computer Vision
---

**Stack:** Python 3.10, TensorFlow 2.15, Keras, tf.data, NumPy, scikit-learn, Matplotlib, Pillow, pandas, tqdm, tensorflow-probability, pytest, Conda, Kaggle GPU

- Implemented three autoencoder architectures: BasicAE (val MSE: 0.00838), DenoisingAE (val MSE: 0.00183, best), CVAE (posterior collapse diagnosed after epoch 2).
- t-SNE and PCA analysis of latent space representations.
- CLI interface and pytest test suite.
