---
title: "Predicción del riesgo futuro de diabetes"
summary: "Modelo que estima el riesgo de desarrollar diabetes sin usar análisis clínicos, solo hábitos e historial. Detecta al 82 % de los casos y se explica con SHAP. Con app web."
date: 2026-03-09
category: machine-learning
stack: ["Python", "scikit-learn", "XGBoost", "SHAP", "Streamlit", "Render"]
repo: "https://github.com/Ivan-0612/Diabetes-prediction-model"
repo2: "https://github.com/Ivan-0612/Diabetes-prediction-deployment"
repoLabels: ["Modelo", "Despliegue"]
demo: "https://diabetes-prediction-rlji.onrender.com/"
order: 5
---

## En pocas palabras
Un modelo de machine learning que **estima la probabilidad de que una persona desarrolle diabetes en el futuro, antes de que haya signos clínicos claros**. A diferencia de otros modelos, no usa la glucosa ni la insulina actuales, sino datos demográficos, historial médico y estilo de vida. Está pensado como herramienta de cribado: si el riesgo sale alto, se recomienda hacer pruebas clínicas. Incluye una aplicación web donde se puede probar (puede tardar unos segundos en arrancar).

## Qué hice
- **Datos:** unos 100.000 registros del dataset público *Diabetes Health Indicators*. Eliminé los indicadores directos de la enfermedad (como la glucosa en ayunas) para que el modelo no «haga trampa» con datos de quien ya la tiene.
- **Cuatro modelos comparados** (regresión logística, Random Forest, XGBoost y una red neuronal), con ajuste de parámetros y validación cruzada. Elegí la **regresión logística** por ser sencilla y fácil de explicar.
- **Explicabilidad:** con valores SHAP vi qué variables pesan más: el historial familiar de diabetes, la edad, la actividad física semanal y el IMC.

## Resultados
Detecta al **82 %** de las personas que acaban desarrollando diabetes (*sensibilidad*), con una exactitud del 63,4 % y un AUC de 0,66 (1 sería perfecto; 0,5 equivale al azar).

Es un modelo modesto, y es lo esperable: predecir el riesgo futuro sin datos clínicos es un problema difícil. Se priorizó la sensibilidad porque, en un cribado, es peor no avisar a alguien que lo necesita que avisar de más. El valor del proyecto está en el planteamiento y en que el modelo se puede explicar, no en una precisión alta.

## Despliegue
La aplicación (Streamlit) está alojada en Render: se introducen los datos de una persona y calcula su riesgo al instante, con gráficas que explican qué variables lo han subido o bajado. El código de despliegue está en un repositorio aparte, enlazado arriba.
