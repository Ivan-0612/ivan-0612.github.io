---
title: "Olist: e-commerce dashboard with Fabric and Power BI"
summary: "Sales, logistics and seller dashboard for a marketplace with ~100,000 orders: from raw data to an interactive report, with Fabric and Power BI."
date: 2026-09-11
category: fabric
stack: ["Microsoft Fabric", "PySpark", "Direct Lake", "Power BI", "DAX", "OneLake"]
repo: "https://github.com/Ivan-0612/Olist-e-commerce-BI-proyect"
featured: true
order: 2
---

## In a nutshell
A **Power BI dashboard** for an online marketplace, built with public data from Olist: around 100,000 real orders from Brazil. It covers the whole journey of the data: cleaning it, organizing it into a model and presenting it in an interactive report for three kinds of decisions: **management** (how the business is doing), **logistics** (how fast and how well orders are delivered) and **sellers** (which categories and sellers contribute the most).

## How it works
The data moves through layers in a Microsoft Fabric *Lakehouse* (the so-called *Medallion* architecture: from raw data to clean data that is ready to analyze):

1. **Intermediate layer (silver):** data is normalized, given the right types and cleaned.
2. **Final layer (gold):** data is organized into a **star schema**, that is, a central sales table surrounded by customer, product, seller and date tables. It is the most convenient and fastest way to analyze data in Power BI.
3. **Model and report:** on top of that layer, a Power BI model and a 3-page interactive report are built.

## Decisions I made
- **Direct Lake.** Power BI reads the data directly from the data lake tables, without copying or duplicating it, so the report responds almost instantly.
- **Outliers.** Some sales amounts were so high that they distorted the charts; I capped them using the interquartile range (IQR) in PySpark before the data reached Power BI.
- **2016 pilot-period data.** It produced unrealistic growth spikes in year-over-year comparisons, so I excluded those months to keep the comparison fair.
- **Organized measures.** The business calculations (DAX measures) are organized into 5 folders: base metrics, logistics, products, sellers and time intelligence.

## What the report shows
1. **Overview:** revenue, orders, average order value and satisfaction; monthly revenue with its change versus the previous year; payment methods and top 10 categories.
2. **Logistics:** average delivery time, shipping cost, a demand map by state and the relationship between delivery time and customer ratings.
3. **Sales:** active sellers, catalog variety, basket size and a matrix of categories by units sold versus revenue.
