---
title: "TFM: predicción de salario y seniority en ofertas de trabajo"
summary: "Mi trabajo de fin de máster: IA que lee una oferta de empleo y estima cuánto se paga y qué experiencia pide. Incluye una app que redacta ofertas."
date: 2026-06-02
category: machine-learning
stack: ["Python", "Web scraping", "LLM (Qwen 2.5)", "Embeddings", "PCA", "XGBoost", "RAG", "Hugging Face Spaces"]
repo: "https://github.com/Ivan-0612/TFM_job_description_prediction"
demo: "https://huggingface.co/spaces/ivan1212a/tfm-generador-ofertas"
featured: true
order: 3
---

## En pocas palabras
Es mi **Trabajo de Fin de Máster** (Máster en Business Analytics, IA y Machine Learning, UFV). Reuní más de 75.000 ofertas de empleo reales de España y entrené dos modelos de inteligencia artificial que, leyendo el texto de una oferta, estiman **cuánto se paga** (en qué tramo salarial) y **qué nivel de experiencia pide** (becario, junior o senior). Con ellos construí una aplicación web: eliges formación, sector, tipo de contrato y ciudad, y la IA redacta una oferta de trabajo y le asigna su salario y nivel estimados.

## Por qué lo hice
- **El salario casi nunca aparece.** La mayoría de los anuncios lo omiten, y esa opacidad hace perder tiempo a candidatos y a empresas.
- **Las empresas no saben qué pedir.** Cuando necesitan un perfil nuevo, muchas veces desconocen cuánto paga el mercado por él o qué nivel de experiencia exigir.

## Qué hice
1. **Conseguir los datos.** Unas 27.000 ofertas de Glassdoor (descargadas automáticamente con *web scraping*, por ciudad y sector, hasta febrero de 2026) y 50.000 de Adzuna (a través de su API, ofertas de 2025). De ahí salieron dos conjuntos de 20.000 ofertas: uno con las que publican salario y otro con las que indican la experiencia.
2. **Ordenar el texto con una IA.** Un modelo de lenguaje (Qwen 2.5 de 14.000 millones de parámetros) leyó el título y la descripción de cada oferta y extrajo campos limpios: sector, ciudad, formación, tipo de empleo, experiencia y habilidades.
3. **Convertir el texto en números.** Un *embedding* (aquí, `multilingual-e5-large`) transforma un texto en una lista de números que recoge su significado; se redujo con PCA para quedarse con lo importante. El resto de campos (sector, ciudad…) se codificaron como categorías.
4. **Entrenar dos modelos de clasificación** (XGBoost): uno predice el salario en **8 tramos** (desde menos de 15.000 € hasta más de 100.000 €) y otro el **nivel de experiencia** en 3 niveles.
5. **Ponerlo en una app.** Un generador de ofertas, publicado en Hugging Face Spaces, que usa RAG (técnica en la que el modelo consulta una base de documentos antes de redactar) y muestra la predicción de salario y seniority. Puede tardar unos segundos en arrancar.

## Resultados
| | Modelo de salario (8 tramos) | Modelo de seniority (3 niveles) |
|---|---|---|
| AUC-ROC | **0,865** | **0,87** |
| Kappa de Cohen | **0,84** | **0,55** |

- **AUC-ROC** mide cuánto distingue el modelo unas clases de otras (1 es perfecto; 0,5 equivale a lanzar una moneda).
- **Kappa de Cohen** mide los aciertos descontando los que se darían por azar; demuestra que el modelo aprende y no se limita a predecir la clase más frecuente.
- **El modelo de salario es el resultado más sólido**, y sus errores caen casi siempre en tramos contiguos (si se equivoca, se queda cerca).
- **El de seniority rinde de forma moderada**, algo esperable: el nivel de experiencia está menos estandarizado en el mercado laboral que el salario.

Conclusión del trabajo: es posible predecir el rango salarial y el nivel de seniority del mercado laboral español con técnicas de NLP y machine learning.
