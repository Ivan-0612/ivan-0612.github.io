---
title: "Olist: dashboard de e-commerce con Fabric y Power BI"
summary: "Cuadro de mando de ventas, logística y vendedores de un marketplace con ~100.000 pedidos: del dato en bruto al informe interactivo, con Fabric y Power BI."
date: 2026-09-11
category: fabric
stack: ["Microsoft Fabric", "PySpark", "Direct Lake", "Power BI", "DAX", "OneLake"]
repo: "https://github.com/Ivan-0612/Olist-e-commerce-BI-proyect"
featured: true
order: 2
---

## En pocas palabras
Un **cuadro de mando (dashboard) de Power BI** para un marketplace online, construido con datos públicos de Olist: unos 100.000 pedidos reales de Brasil. Cubre todo el recorrido del dato: limpiarlo, organizarlo en un modelo y presentarlo en un informe interactivo para tres tipos de decisión: **dirección** (cómo va el negocio), **logística** (cómo de rápido y bien se entrega) y **vendedores** (qué categorías y vendedores aportan más).

## Cómo funciona
Los datos pasan por capas en un *Lakehouse* de Microsoft Fabric (es la llamada arquitectura *Medallion*: de datos en bruto a datos limpios y listos para analizar):

1. **Capa intermedia (silver):** se normalizan, se les da el tipo correcto y se limpian.
2. **Capa final (gold):** se organizan en un **esquema en estrella**, es decir, una tabla central de ventas rodeada de tablas de clientes, productos, vendedores y fechas. Es la forma más cómoda y rápida de analizar datos en Power BI.
3. **Modelo y informe:** sobre esa capa se monta un modelo en Power BI y un informe interactivo de 3 páginas.

## Qué decisiones tomé
- **Direct Lake.** Power BI lee los datos directamente de las tablas del lago de datos, sin copiarlos ni duplicarlos, lo que hace que el informe responda casi al instante.
- **Valores atípicos.** Algunos importes de venta eran tan altos que deformaban los gráficos; los acoté con el rango intercuartílico (IQR) en PySpark antes de llegar a Power BI.
- **Datos del piloto de 2016.** Generaban picos de crecimiento irreales al comparar año contra año, así que excluí esos meses para que la comparación fuera justa.
- **Medidas ordenadas.** Los cálculos de negocio (medidas DAX) están organizados en 5 carpetas: métricas base, logística, productos, vendedores e inteligencia de tiempo.

## Qué muestra el informe
1. **Visión general:** ingresos, pedidos, ticket medio y satisfacción; ingresos mensuales con su variación respecto al año anterior; métodos de pago y top 10 de categorías.
2. **Logística:** tiempo medio de entrega, coste de envío, mapa de demanda por estado y relación entre el tiempo de entrega y la valoración de los clientes.
3. **Ventas:** vendedores activos, variedad de catálogo, tamaño de la cesta y una matriz de categorías por unidades vendidas frente a ingresos.
