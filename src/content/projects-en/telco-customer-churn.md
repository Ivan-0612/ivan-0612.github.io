---
title: "Predicting customer churn in telecommunications"
summary: "Model that flags which telecom customers are about to leave, so they can be retained in time. It catches 87.6% of churners and is explained with SHAP. With web app."
date: 2026-05-01
category: machine-learning
stack: ["Python", "XGBoost", "scikit-learn", "SHAP", "Streamlit", "Docker", "Render"]
repo: "https://github.com/Ivan-0612/Telco-Customer-Churn"
repo2: "https://github.com/Ivan-0612/telecom-churn-app-deployment"
repoLabels: ["Model", "Deployment"]
demo: "https://telecom-churn-app-deployment.onrender.com"
order: 4
---

## In a nutshell
A machine learning model that **predicts which customers of a telephone company are going to leave** (what the industry calls *churn*), so the company can act before losing them. Keeping a customer costs far less than winning a new one, so what matters is not always being right, but **not letting go of the customers who are really leaving**. It includes a web application where you can try it out (it may take a few seconds to start).

## What I did
- **I compared three models** (XGBoost, Random Forest and KNN) and kept XGBoost, the one that best separated the customers who leave from those who stay (AUC of 0.843; 1 would be perfect and 0.5 is the same as chance).
- **I adjusted the decision threshold** to 0.3915, below the usual one. This is a business decision: missing a customer who leaves is more expensive than flagging one who in the end was not leaving. The result is a **recall of 87.63%**: the model detects almost 9 out of 10 real cancellations.
- **I made the model explain itself** with SHAP values, which show which factors push a customer towards leaving (a fiber optic contract, high monthly charges, paying by electronic check) and which keep them (two-year contracts, longer tenure).

## Deployment
The model, the data preprocessing and the SHAP explanation are packaged in a web application (Streamlit) inside a Docker container and hosted on Render. The deployment code lives in a separate repository, linked above as "Deployment".
