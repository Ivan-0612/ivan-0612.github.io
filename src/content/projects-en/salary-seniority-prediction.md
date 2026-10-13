---
title: "Master's thesis: predicting salary and seniority in job postings"
summary: "My master's thesis: AI that reads a job posting and estimates how much it pays and what experience it asks for. Includes an app that writes job postings."
date: 2026-06-02
category: machine-learning
stack: ["Python", "Web scraping", "LLM (Qwen 2.5)", "Embeddings", "PCA", "XGBoost", "RAG", "Hugging Face Spaces"]
repo: "https://github.com/Ivan-0612/TFM_job_description_prediction"
demo: "https://huggingface.co/spaces/ivan1212a/tfm-generador-ofertas"
featured: true
order: 3
---

## In a nutshell
This is my **Master's Thesis** (Master's in Business Analytics, AI and Machine Learning, UFV). I gathered more than 75,000 real job postings from Spain and trained two artificial intelligence models that, by reading the text of a posting, estimate **how much it pays** (which salary range) and **what level of experience it asks for** (intern, junior or senior). With them I built a web application: you choose education, sector, contract type and city, and the AI writes a job posting and assigns it its estimated salary and level.

## Why I did it
- **The salary almost never appears.** Most postings omit it, and that opacity wastes the time of candidates and companies alike.
- **Companies don't know what to ask for.** When they need a new profile, they often don't know how much the market pays for it or what level of experience to require.

## What I did
1. **Getting the data.** About 27,000 postings from Glassdoor (downloaded automatically with *web scraping*, by city and sector, up to February 2026) and 50,000 from Adzuna (through its API, postings from 2025). From these I built two sets of 20,000 postings: one with those that publish a salary and another with those that state the experience required.
2. **Tidying the text with an AI.** A language model (Qwen 2.5 with 14 billion parameters) read the title and description of each posting and extracted clean fields: sector, city, education, job type, experience and skills.
3. **Turning text into numbers.** An *embedding* (here, `multilingual-e5-large`) turns a text into a list of numbers that captures its meaning; it was reduced with PCA to keep what matters. The remaining fields (sector, city…) were encoded as categories.
4. **Training two classification models** (XGBoost): one predicts salary in **8 ranges** (from under €15,000 to over €100,000) and the other the **experience level** in 3 levels.
5. **Putting it in an app.** A job posting generator, published on Hugging Face Spaces, that uses RAG (a technique where the model consults a document base before writing) and shows the salary and seniority prediction. It may take a few seconds to start.

## Results
| | Salary model (8 ranges) | Seniority model (3 levels) |
|---|---|---|
| AUC-ROC | **0.865** | **0.87** |
| Cohen's kappa | **0.84** | **0.55** |

- **AUC-ROC** measures how well the model tells classes apart (1 is perfect; 0.5 is the same as flipping a coin).
- **Cohen's kappa** measures hits after discounting those that would happen by chance; it shows that the model is learning and not just predicting the most frequent class.
- **The salary model is the strongest result**, and its errors almost always fall in neighboring ranges (when it is wrong, it stays close).
- **The seniority model performs moderately**, which is to be expected: experience level is less standardized in the job market than salary.

Conclusion of the thesis: it is possible to predict the salary range and seniority level of the Spanish job market using NLP and machine learning techniques.
