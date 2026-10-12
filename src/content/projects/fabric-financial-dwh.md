---
title: "Data Warehouse financiero en Microsoft Fabric"
summary: "Un almacén de datos para transacciones de tarjetas de crédito que se carga solo, sin duplicados y con los datos sensibles protegidos. Hecho en Microsoft Fabric."
date: 2026-09-16
category: fabric
stack: ["Microsoft Fabric", "T-SQL", "Data Factory", "Lakehouse", "RLS", "Dynamic Data Masking"]
repo: "https://github.com/Ivan-0612/fabric-financial-data-warehouse"
featured: true
order: 1
---

## En pocas palabras
Un **data warehouse** (almacén de datos) para transacciones de tarjetas de crédito, construido en Microsoft Fabric. Está pensado para tres cosas: que los datos **se carguen solos**, que **nunca se dupliquen** aunque la carga se repita, y que la **información sensible esté protegida**. Es un proyecto de ingeniería del dato: no hay gráficos ni dashboards, el valor está en cómo se cargan, se organizan y se protegen los datos.

## Cómo funciona
Los ficheros con las transacciones (CSV) se guardan primero en un *Lakehouse* (el «almacén en bruto» de Fabric, porque el warehouse no admite subir ficheros directamente). Un **pipeline de Data Factory** orquesta después la carga hasta el warehouse en dos pasos encadenados:

1. Una actividad *Script* prepara una tabla intermedia (*staging*) con los datos recién llegados.
2. Solo si ese paso sale bien, una actividad *Stored Procedure* pasa los datos a la tabla final de transacciones.

## Qué decisiones tomé
- **Carga que se puede repetir sin riesgo.** El procedimiento comprueba qué transacciones ya existen antes de insertar, y todo ocurre dentro de una transacción que se deshace por completo (*rollback*) si algo falla. Así, ejecutarlo dos veces no duplica registros y un error no deja datos a medias. Esto se llama carga *idempotente*.
- **Métricas listas para informes.** Una vista calcula, con funciones ventana de SQL: el gasto acumulado por categoría, el ranking de gasto dentro de cada categoría y la media móvil de las últimas 3 compras de cada tarjeta.
- **Cada usuario ve solo lo que le corresponde (RLS).** La *Row-Level Security* filtra las filas según quién consulta: por ejemplo, un analista de operaciones ve solo un estado, mientras que un administrador lo ve todo.
- **Datos sensibles enmascarados (DDM).** Con *Dynamic Data Masking*, el número de tarjeta solo muestra sus 4 últimos dígitos y el nombre y la fecha de nacimiento se ocultan por completo.

## Tecnologías
Microsoft Fabric (Warehouse y Lakehouse), Fabric Data Factory, T-SQL (procedimientos almacenados, vistas, funciones ventana), Row-Level Security y Dynamic Data Masking.
