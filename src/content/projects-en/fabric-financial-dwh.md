---
title: "Financial data warehouse in Microsoft Fabric"
summary: "A data warehouse for credit card transactions that loads itself, never duplicates records and keeps sensitive data protected. Built in Microsoft Fabric."
date: 2026-09-16
category: fabric
stack: ["Microsoft Fabric", "T-SQL", "Data Factory", "Lakehouse", "RLS", "Dynamic Data Masking"]
repo: "https://github.com/Ivan-0612/fabric-financial-data-warehouse"
featured: true
order: 1
---

## In a nutshell
A **data warehouse** for credit card transactions, built in Microsoft Fabric. It is designed around three goals: data that **loads by itself**, data that is **never duplicated** even if the load is run again, and **sensitive information that stays protected**. This is a data engineering project: there are no charts or dashboards, the value lies in how the data is loaded, organized and protected.

## How it works
The transaction files (CSV) are first stored in a *Lakehouse* (Fabric's "raw storage", because the warehouse does not accept direct file uploads). A **Data Factory pipeline** then orchestrates the load into the warehouse in two chained steps:

1. A *Script* activity prepares a staging table with the newly arrived data.
2. Only if that step succeeds, a *Stored Procedure* activity moves the data into the final transactions table.

## Decisions I made
- **A load that is safe to repeat.** The procedure checks which transactions already exist before inserting, and everything happens inside a transaction that is fully undone (*rollback*) if anything fails. So running it twice does not duplicate records, and an error never leaves half-loaded data. This is called an *idempotent* load.
- **Report-ready metrics.** A view uses SQL window functions to calculate the running spend per category, the spending rank within each category and the moving average of each card's last 3 purchases.
- **Each user sees only what is theirs (RLS).** *Row-Level Security* filters rows depending on who is querying: for example, an operations analyst sees only one state, while an administrator sees everything.
- **Sensitive data masked (DDM).** With *Dynamic Data Masking*, the card number only shows its last 4 digits, and the name and date of birth are fully hidden.

## Technologies
Microsoft Fabric (Warehouse and Lakehouse), Fabric Data Factory, T-SQL (stored procedures, views, window functions), Row-Level Security and Dynamic Data Masking.
