---
title: "Predicting future diabetes risk"
summary: "Model that estimates the risk of developing diabetes without clinical tests, using only habits and history. Detects 82% of cases and is explained with SHAP. With web app."
date: 2026-03-09
category: machine-learning
stack: ["Python", "scikit-learn", "XGBoost", "SHAP", "Streamlit", "Render"]
repo: "https://github.com/Ivan-0612/Diabetes-prediction-model"
repo2: "https://github.com/Ivan-0612/Diabetes-prediction-deployment"
repoLabels: ["Model", "Deployment"]
demo: "https://diabetes-prediction-rlji.onrender.com/"
order: 5
---

## In a nutshell
A machine learning model that **estimates the probability that a person will develop diabetes in the future, before there are clear clinical signs**. Unlike other models, it does not use current glucose or insulin, but demographic data, medical history and lifestyle. It is intended as a screening tool: if the risk comes out high, clinical tests are recommended. It includes a web application where you can try it out (it may take a few seconds to start).

## What I did
- **Data:** about 100,000 records from the public *Diabetes Health Indicators* dataset. I removed the direct indicators of the disease (such as fasting glucose) so the model does not "cheat" with data from people who already have it.
- **Four models compared** (logistic regression, Random Forest, XGBoost and a neural network), with parameter tuning and cross-validation. I chose **logistic regression** because it is simple and easy to explain.
- **Explainability:** with SHAP values I saw which variables weigh the most: family history of diabetes, age, weekly physical activity and BMI.

## Results
It detects **82%** of the people who end up developing diabetes (*sensitivity*), with an accuracy of 63.4% and an AUC of 0.66 (1 would be perfect; 0.5 is the same as chance).

It is a modest model, and that is to be expected: predicting future risk without clinical data is a hard problem. Sensitivity was prioritized because, in a screening, failing to warn someone who needs it is worse than warning too many people. The value of the project lies in the approach and in the fact that the model can be explained, not in high accuracy.

## Deployment
The application (Streamlit) is hosted on Render: you enter a person's data and it calculates their risk instantly, with charts that explain which variables raised or lowered it. The deployment code lives in a separate repository, linked above.
