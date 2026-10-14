---
title: "Predicción de bajas de clientes en telecomunicaciones"
summary: "Modelo que avisa de qué clientes de una telco van a darse de baja, para retenerlos a tiempo. Detecta el 87,6 % de las bajas y se explica con SHAP. Con app web."
date: 2026-05-01
category: machine-learning
stack: ["Python", "XGBoost", "scikit-learn", "SHAP", "Streamlit", "Docker", "Render"]
repo: "https://github.com/Ivan-0612/Telco-Customer-Churn"
repo2: "https://github.com/Ivan-0612/telecom-churn-app-deployment"
repoLabels: ["Modelo", "Despliegue"]
demo: "https://telecom-churn-app-deployment.onrender.com"
order: 4
---

## En pocas palabras
Un modelo de machine learning que **predice qué clientes de una compañía de telefonía van a darse de baja** (lo que en el sector se llama *churn*), para que la empresa pueda actuar antes de perderlos. Retener a un cliente cuesta mucho menos que conseguir uno nuevo, así que lo importante no es acertar siempre, sino **no dejar escapar a los que realmente se van**. Incluye una aplicación web donde se puede probar (puede tardar unos segundos en arrancar).

## Qué hice
- **Comparé tres modelos** (XGBoost, Random Forest y KNN) y me quedé con XGBoost, el que mejor separaba a los clientes que se van de los que se quedan (AUC de 0,843; con 1 sería perfecto y 0,5 equivale al azar).
- **Ajusté el umbral de decisión** a 0,3915, por debajo del habitual. Es una decisión de negocio: es más caro no detectar una baja que avisar de un cliente que al final no se iba. El resultado es un **recall del 87,63 %**: el modelo detecta casi 9 de cada 10 bajas reales.
- **Hice que el modelo se explique** con valores SHAP, que indican qué factores empujan a un cliente hacia la baja (contrato con fibra óptica, cuotas mensuales altas, pago con cheque electrónico) y cuáles lo retienen (contratos de dos años, más antigüedad).

## Despliegue
El modelo, el preprocesado de los datos y la explicación SHAP están empaquetados en una aplicación web (Streamlit) dentro de un contenedor Docker y alojada en Render. El código de despliegue está en un repositorio aparte, enlazado arriba como «Despliegue».
