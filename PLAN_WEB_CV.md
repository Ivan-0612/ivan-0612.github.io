# Web CV — Plan de desarrollo, especificaciones e instrucciones

> Proyecto: web personal que funciona como CV interactivo de **Iván Benito Sánchez**, Data Analyst.
> Carpeta: `C:\Users\ivanb\Desktop\Proyectos\web propia`
> Versión del documento: 1.0 — 12/10/2026

---

## Índice

1. [Objetivo y público](#1-objetivo-y-público)
2. [Decisión de diseño clave: vídeo con fondo blanco + web oscura](#2-decisión-de-diseño-clave-vídeo-con-fondo-blanco--web-oscura)
3. [Stack tecnológico](#3-stack-tecnológico)
4. [Arquitectura y estructura de carpetas](#4-arquitectura-y-estructura-de-carpetas)
5. [Modelo de contenido (cómo añadir cosas fácilmente)](#5-modelo-de-contenido-cómo-añadir-cosas-fácilmente)
6. [Especificación de secciones](#6-especificación-de-secciones)
7. [Especificación del avatar en vídeo](#7-especificación-del-avatar-en-vídeo)
8. [Catálogo de animaciones](#8-catálogo-de-animaciones)
9. [Sistema de diseño](#9-sistema-de-diseño)
10. [Requisitos no funcionales](#10-requisitos-no-funcionales)
11. [Plan de desarrollo por fases con tiempos](#11-plan-de-desarrollo-por-fases-con-tiempos)
12. [Instrucciones paso a paso](#12-instrucciones-paso-a-paso)
13. [Guía de mantenimiento: añadir contenido](#13-guía-de-mantenimiento-añadir-contenido)
14. [Contenido que tienes que preparar tú](#14-contenido-que-tienes-que-preparar-tú)
15. [Prompt de arranque para Claude Code](#15-prompt-de-arranque-para-claude-code)
16. [Checklist final antes de publicar](#16-checklist-final-antes-de-publicar)
17. [Apéndice A — Contenido de los proyectos (listo para copiar)](#apéndice-a--contenido-de-los-proyectos-listo-para-copiar)
18. [Apéndice B — Incoherencias a corregir en tus README](#apéndice-b--incoherencias-a-corregir-en-tus-readme)

---

## 1. Objetivo y público

**Objetivo:** que un reclutador o responsable técnico entienda en menos de 30 segundos quién eres, qué sabes hacer y dónde verlo demostrado, y que le apetezca seguir bajando.

**Público principal:**

| Perfil | Qué busca | Cómo lo atendemos |
|---|---|---|
| Reclutador/a de RR. HH. | Rol, ubicación, disponibilidad, CV en PDF | Hero con titular claro + botón "Descargar CV" siempre visible |
| Responsable técnico | Proyectos reales, stack, código | Tarjetas de proyecto con enlace a GitHub y página de caso de estudio |
| Contacto de LinkedIn | Te conoce y quiere saber más | Sobre mí, experiencia y contacto en un clic |

**Principios:**

- **El contenido manda; las animaciones lo acompañan.** Ninguna animación puede retrasar la lectura del titular más de ~1 s.
- **Honestidad por encima de inflar el perfil.** Nada de barras de habilidad con porcentajes ("Python 90 %") porque no significan nada. Cada habilidad se demuestra enlazando el proyecto donde se usó.
- **Añadir contenido = editar un archivo de datos.** No hay que tocar HTML ni componentes.

---

## 2. Decisión de diseño clave: vídeo con fondo blanco + web oscura

Hay un conflicto en los requisitos: el vídeo tiene **fondo blanco puro** y necesita estar sobre blanco, pero quieres que la web sea **oscura**. Además, el vídeo es **vertical (9:16) y de cuerpo entero**, así que dentro de un **círculo** te quedarías muy pequeño o recortado.

**Solución elegida: "Del estudio a la oscuridad"**

1. **El hero es blanco** (#FFFFFF), como un estudio fotográfico. El vídeo se funde con el fondo y parece que estás de pie en la página, sin marco.
2. **Al hacer scroll, el fondo pasa de blanco a casi negro** (#0B0B0C), controlado por el propio scroll (ScrollTrigger con `scrub`). El resto de la web es dark mode.
3. En lugar de un círculo, el vídeo va en un **contenedor tipo arco** (rectángulo vertical con la parte superior redondeada) que respeta el formato de cuerpo entero.

Así el vídeo siempre está sobre blanco y además la transición de blanco a oscuro es el gesto visual que distingue la web.

**Alternativas que descarté:**

| Alternativa | Por qué no |
|---|---|
| Quitar el fondo blanco (vídeo con transparencia) | Con el croma sobre blanco se pierde la camisa blanca. Además, WebM con alfa no funciona en Safari, que necesitaría HEVC con alfa (.mov) aparte. Es frágil. |
| Tarjeta blanca dentro de la web oscura desde el principio | Funciona, pero queda como una foto pegada. Es la opción B si la transición no te convence. |
| Contenedor circular | El vídeo es vertical y de cuerpo entero: o sales diminuto o te corta. |

---

## 3. Stack tecnológico

| Pieza | Elección | Motivo |
|---|---|---|
| Framework | **Astro** (última versión estable) | Genera HTML estático muy rápido y no carga JS innecesario. Sus *content collections* validan el contenido con un esquema, así que añadir un proyecto es crear un `.md` y si falta un campo te avisa al compilar. |
| Estilos | **Tailwind CSS v4** (plugin `@tailwindcss/vite`) | Maquetación rápida, tokens de diseño en CSS, `group-hover:grayscale-0`, etc. |
| Animaciones | **GSAP 3** + **ScrollTrigger** + **SplitText** | Estándar del sector. Desde 2025 GSAP y todos sus plugins son gratuitos, también para uso comercial. |
| Scroll suave | **Lenis** | Scroll fluido que se sincroniza con ScrollTrigger. Se desactiva con `prefers-reduced-motion`. |
| Tipografías | **@fontsource** (autoalojadas) | Sin peticiones a Google Fonts, más rápido y sin problemas de RGPD. |
| Iconos | **astro-icon** + Iconify (simple-icons, lucide) | Logos de tecnologías (Power BI, Python, Fabric, AWS…) sin descargar SVG a mano. |
| Despliegue | **GitHub Pages** (GitHub Actions oficial de Astro) o **Vercel** | Gratis, HTTPS y despliegue automático con cada `git push`. |
| Analítica (opcional) | **Umami** o **Plausible** | Para saber si los reclutadores entran, sin banner de cookies. |

**Descartado: ScrollReveal.** Hace menos que GSAP, que ya cubre el scroll, la entrada, el texto y el vídeo, y tener dos librerías de animación solo añade peso.

---

## 4. Arquitectura y estructura de carpetas

```
web propia/
├─ public/
│  ├─ media/
│  │  ├─ avatar.webm            ← vídeo optimizado (VP9)
│  │  ├─ avatar.mp4             ← fallback H.264 (Safari)
│  │  └─ avatar-poster.webp     ← primer fotograma (se ve mientras carga)
│  ├─ cv/
│  │  ├─ Ivan_Benito_CV_ES.pdf
│  │  └─ Ivan_Benito_CV_EN.pdf
│  ├─ og-image.png              ← imagen al compartir en LinkedIn (1200×630)
│  └─ favicon.svg
├─ src/
│  ├─ content.config.ts         ← esquemas de todo el contenido
│  ├─ content/
│  │  ├─ profile.json           ← nombre, titular, bio, enlaces
│  │  ├─ skills.json            ← habilidades agrupadas
│  │  ├─ certifications.json
│  │  ├─ education.json
│  │  ├─ experience.json
│  │  └─ projects/              ← un .md por proyecto (caso de estudio)
│  │     ├─ fabric-financial-dwh.md
│  │     ├─ olist-ecommerce-fabric.md
│  │     └─ ...
│  ├─ assets/projects/          ← capturas de proyectos (Astro las optimiza)
│  ├─ components/
│  │  ├─ Nav.astro
│  │  ├─ Hero.astro
│  │  ├─ AvatarVideo.astro
│  │  ├─ About.astro
│  │  ├─ Stats.astro
│  │  ├─ Skills.astro
│  │  ├─ Projects.astro
│  │  ├─ ProjectCard.astro
│  │  ├─ Timeline.astro         ← reutilizado por Experiencia y Estudios
│  │  ├─ Certifications.astro
│  │  ├─ Contact.astro
│  │  └─ Footer.astro
│  ├─ layouts/
│  │  └─ BaseLayout.astro       ← <head>, SEO, fuentes, scripts globales
│  ├─ pages/
│  │  ├─ index.astro            ← home en español
│  │  ├─ proyectos/[slug].astro ← página de detalle generada desde cada .md
│  │  └─ en/…                   ← (fase opcional) versión en inglés
│  ├─ scripts/
│  │  ├─ smooth-scroll.ts       ← Lenis + sincronía con ScrollTrigger
│  │  ├─ animations.ts          ← reveals, timeline, contadores, tema
│  │  └─ avatar.ts              ← efectos del vídeo
│  ├─ i18n/
│  │  ├─ es.json
│  │  └─ en.json
│  └─ styles/
│     └─ global.css             ← Tailwind + tokens de diseño
├─ astro.config.mjs
├─ package.json
└─ PLAN_WEB_CV.md               ← este documento
```

**Flujo de datos:** archivos en `src/content/` → validados por `content.config.ts` → leídos por los componentes con `getCollection()` → HTML estático en `dist/` → publicado.

> **Nota:** la carpeta se llama `web propia` (con espacio). Funciona, pero en `package.json` el campo `name` debe ser `web-cv` porque npm no admite espacios.

---

## 5. Modelo de contenido (cómo añadir cosas fácilmente)

### 5.1 Esquemas (`src/content.config.ts`)

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string().max(180),            // 1–2 frases para la tarjeta
    date: z.coerce.date(),
    category: z.enum(['fabric', 'power-bi', 'machine-learning', 'mlops', 'automation', 'app']),
    stack: z.array(z.string()),              // ["Microsoft Fabric", "T-SQL", "Power BI"]
    cover: image().optional(),
    repo: z.string().url().optional(),
    repo2: z.string().url().optional(),       // segundo repo (p. ej. despliegue)
    repoLabels: z.tuple([z.string(), z.string()]).optional(), // ["Modelo", "Despliegue"]
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),    // tarjeta grande arriba
    order: z.number().default(99),           // orden manual (menor = antes)
    status: z.enum(['completado', 'en-curso']).default('completado'),
  }),
});

const certifications = defineCollection({
  loader: file('src/content/certifications.json'),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),                      // "Microsoft", "AWS"
    date: z.coerce.date(),
    expires: z.coerce.date().optional(),
    credentialUrl: z.string().url().optional(),
    logo: z.string(),                        // id de icono, p. ej. "simple-icons:microsoft"
    type: z.enum(['certificacion', 'curso']).default('certificacion'),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({
    group: z.string(),                       // "Datos & BI"
    items: z.array(z.object({
      name: z.string(),
      icon: z.string().optional(),
      projects: z.array(z.string()).default([]), // ids de proyectos donde se usa
    })),
  }),
});

const timelineEntry = z.object({
  title: z.string(),                         // puesto o titulación
  org: z.string(),                           // empresa o universidad
  location: z.string().optional(),
  start: z.coerce.date(),
  end: z.coerce.date().optional(),           // vacío = "Actualidad"
  bullets: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
});

const experience = defineCollection({ loader: file('src/content/experience.json'), schema: timelineEntry });
const education  = defineCollection({ loader: file('src/content/education.json'),  schema: timelineEntry });

export const collections = { projects, certifications, skills, experience, education };
```

> Si tu versión de Astro avisa de que `z` se importa desde otro sitio (en versiones recientes es `import { z } from 'astro/zod'`), cambia solo esa línea.

### 5.2 Datos iniciales (rellenar los `TODO`)

**`certifications.json`**

```json
[
  {
    "id": "fabric-analytics-engineer",
    "name": "Microsoft Certified: Fabric Analytics Engineer Associate",
    "issuer": "Microsoft",
    "date": "TODO-AAAA-MM-DD",
    "credentialUrl": "TODO-enlace-Microsoft-Learn",
    "logo": "simple-icons:microsoft",
    "type": "certificacion"
  },
  {
    "id": "aws-cloud-practitioner",
    "name": "AWS Certified Cloud Practitioner",
    "issuer": "Amazon Web Services",
    "date": "TODO-AAAA-MM-DD",
    "credentialUrl": "TODO-enlace-Credly",
    "logo": "simple-icons:amazonwebservices",
    "type": "certificacion"
  },
  {
    "id": "ibm-data-science",
    "name": "IBM Data Science Professional Certificate",
    "issuer": "IBM",
    "date": "TODO-AAAA-MM-DD",
    "credentialUrl": "TODO-enlace-Coursera-o-Credly",
    "logo": "simple-icons:ibm",
    "type": "certificacion"
  },
  {
    "id": "n8n-udemy",
    "name": "Automatización con n8n",
    "issuer": "Udemy",
    "date": "TODO-AAAA-MM-DD",
    "logo": "simple-icons:n8n",
    "type": "curso"
  }
]
```

> Las fechas de estudios (2025–2026 y 2021–2025) y prácticas (nov. 2025 – jun. 2026) vienen del CV; en estudios solo consta el año, y la web debe mostrar solo el año. Los idiomas (inglés B2, First Certificate in English; español nativo) van en una línea dentro de «Sobre mí».

> La certificación de Fabric se muestra con su nombre completo, sin el código del examen y sin negrita, igual que en tu CV. Los cursos (`"type": "curso"`) se muestran aparte, como "Formación complementaria", para no mezclarlos con certificaciones oficiales.

**`education.json`**

```json
[
  {
    "id": "master-ufv",
    "title": "Máster en Business Analytics, IA y Machine Learning",
    "org": "Universidad Francisco de Vitoria",
    "location": "Madrid",
    "start": "2025", "end": "2026"
  },
  {
    "id": "ade-usal",
    "title": "Grado en Administración y Dirección de Empresas",
    "org": "Universidad de Salamanca",
    "location": "Salamanca",
    "start": "2021", "end": "2025"
  }
]
```

**`experience.json`**

```json
[
  {
    "id": "ufv-data-analyst",
    "title": "Analista de Datos (prácticas)",
    "org": "Universidad Francisco de Vitoria",
    "location": "Madrid",
    "start": "2025-11", "end": "2026-06",
    "bullets": [
      "Ciclo completo del dato: limpieza y EDA con pandas, modelado y presentación de resultados.",
      "Análisis del perfil de alumnos delegados con contrastes de hipótesis (Mann-Whitney, Kruskal-Wallis, chi-cuadrado) y dashboard interactivo en Power BI con textos dinámicos.",
      "Modelos predictivos y explicativos (regresión logística, XGBoost, odds ratios) y clustering con PCA + KMeans.",
      "Automatización de la recogida de datos de formularios con Power Automate y uso de modelos locales (LM Studio) para medir creatividad."
    ],
    "stack": ["Python", "pandas", "Power BI", "DAX", "scikit-learn", "XGBoost", "Power Automate", "Excel"]
  }
]
```

**Proyectos iniciales** (un `.md` cada uno en `src/content/projects/`). Selección acordada: 3 destacados del CV y 2 secundarios. Quedan fuera los ejercicios de curso, los forks, `practicum-tracker`, `miravo-privacy` y `Basic-embeddings-comparison`. Los repos de modelo y de despliegue (Telco, Diabetes) comparten tarjeta, con dos enlaces cada una (`repo` y `repo2`).

| Archivo | Categoría | Destacado | Repos |
|---|---|---|---|
| `fabric-financial-dwh.md` | fabric | ✅ | `fabric-financial-data-warehouse` |
| `olist-ecommerce-fabric.md` | fabric | ✅ | `Olist-e-commerce-BI-proyect` |
| `salary-seniority-prediction.md` | machine-learning | ✅ | `TFM_job_description_prediction` | El README dice 10 rangos salariales y lista 8 (en tu presentación son 8). Menciona LinkedIn/Apify como fuente, pero la presentación solo habla de Glassdoor y Adzuna. No incluye métricas ni explica la app generadora. | Corregir a 8 rangos, aclarar las fuentes y copiar al README los resultados de la presentación (AUC-ROC 0,865 y kappa 0,84 en salario; 0,87 y 0,55 en seniority) y una descripción de la app. |
| `telco-customer-churn.md` | machine-learning | — | `Telco-Customer-Churn` + `telecom-churn-app-deployment` |
| `diabetes-prediction.md` | machine-learning | — | `Diabetes-prediction-model` + `Diabetes-prediction-deployment` (+ demo en Render) |

Los contenidos de estos 5 archivos están **ya redactados en el Apéndice A**, a partir de los README de tus repos. Cópialos tal cual a `src/content/projects/`.

Plantilla de un proyecto:

```md
---
title: "Data Warehouse financiero en Microsoft Fabric"
summary: "DWH de transacciones con tarjeta: carga incremental idempotente, seguridad a nivel de fila y enmascaramiento dinámico."
date: 2026-10-01
category: fabric
stack: ["Microsoft Fabric", "T-SQL", "Data Factory", "Power BI"]
repo: "https://github.com/Ivan-0612/fabric-financial-data-warehouse"
featured: true
order: 1
cover: ../../assets/projects/fabric-dwh.png
---

## El problema
…

## La solución
… (diagrama de arquitectura)

## Decisiones técnicas
- Stored procedure idempotente con control transaccional (ROLLBACK)…

## Resultado
…
```

El cuerpo del `.md` se convierte en la página `/proyectos/fabric-financial-dwh` y la tarjeta de la home usa solo el *frontmatter*.

---

## 6. Especificación de secciones

Orden de la página principal:

| # | Sección | Fondo | Contenido | Interacción / animación |
|---|---|---|---|---|
| 0 | **Nav** fija | Translúcido (blur) | Logo "IB", enlaces de ancla, selector ES/EN, botón "CV" | Se oculta al bajar y aparece al subir. Barra fina de progreso de lectura arriba. Cambia de color con el tema (claro → oscuro). |
| 1 | **Hero** | Blanco | Nombre (display grande), titular (el de tu CV): *Data & BI Analyst | Microsoft Fabric*, 1 frase de valor, botones "Ver proyectos" y "Descargar CV", ubicación "Madrid". A la derecha, el avatar en vídeo. | Entrada del vídeo (escala + desenfoque), nombre revelado letra a letra con SplitText, indicador "scroll" animado. |
| 2 | **Transición** | Blanco → negro | — | El fondo y el texto cambian de color con el scroll. El vídeo hace un ligero parallax hacia arriba y se desvanece. |
| 3 | **Sobre mí** | Oscuro | 3–4 líneas: quién eres, qué te interesa (ciclo completo del dato) y qué buscas. | Párrafo que se ilumina palabra a palabra al hacer scroll (gris → blanco). |
| 4 | **Cifras** | Oscuro | Nº de proyectos, certificaciones y tecnologías. **Se calculan solas a partir del contenido.** | Contadores que suben de 0 al valor al entrar en pantalla. |
| 5 | **Habilidades** | Oscuro | Grupos: *Datos & BI* (Power BI, DAX, SQL/T-SQL, Excel), *Ingeniería de datos* (Microsoft Fabric, PySpark, Data Factory, Medallion), *Estadística & ML* (Python, pandas, scikit-learn, XGBoost, statsmodels), *Cloud* (Microsoft Fabric, AWS), *Automatización* (Power Automate, n8n), *Desarrollo* (Flutter, Firebase, Git). | Cinta de logos en bucle (marquee) arriba. Al pasar el ratón por una habilidad se resaltan los proyectos donde la usaste. |
| 6 | **Proyectos** | Oscuro | Destacados en tarjetas grandes y el resto en cuadrícula. Filtros por categoría. | Tarjetas que aparecen escalonadas, inclinación 3D sutil siguiendo el cursor, imagen en gris que pasa a color al pasar el ratón (coherente con el avatar), filtro animado. |
| 7 | **Experiencia** | Oscuro | Línea temporal | La línea vertical se dibuja con el scroll y cada hito aparece al llegar. |
| 8 | **Estudios** | Oscuro | Misma línea temporal (componente reutilizado) | Igual |
| 9 | **Certificaciones** | Oscuro | Tarjetas con logo, emisor, fecha y botón "Verificar". Debajo, "Formación complementaria". | Borde con brillo que sigue el cursor (spotlight). |
| 10 | **Contacto** | Oscuro | Frase grande final, email (botón copiar), LinkedIn, GitHub, descargar CV. | Botones magnéticos (se acercan levemente al cursor). Aviso "Email copiado". |
| 11 | **Footer** | Oscuro | © año (automático), "Hecho con Astro + GSAP", enlace al repo | — |

**Página de detalle `/proyectos/[slug]`:** cabecera con título, stack y enlaces; cuerpo del caso de estudio; botón "Siguiente proyecto". Transición entre páginas con View Transitions de Astro (`<ClientRouter />`).

---

## 7. Especificación del avatar en vídeo

### 7.1 Datos del archivo original

| Propiedad | Valor |
|---|---|
| Resolución | 1080 × 1920 (vertical 9:16) |
| Duración | 8 s, 30 fps, bucle perfecto |
| Códec | H.264, sin audio |
| Peso | **7,2 MB → demasiado** para una web |
| Fondo | Blanco puro (#FFFFFF) verificado en esquinas y bordes |

### 7.2 Optimización (objetivo: ≤ 1,5 MB por formato)

```bash
# WebM VP9 (Chrome, Firefox, Edge) — 720 px de ancho, sin audio
ffmpeg -i avatar.mp4 -vf "scale=720:-2" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -an -pix_fmt yuv420p public/media/avatar.webm

# MP4 H.264 (Safari / iOS) — faststart para que empiece a reproducirse antes de descargarse entero
ffmpeg -i avatar.mp4 -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/media/avatar.mp4

# Póster (primer fotograma) para que no haya hueco mientras carga
ffmpeg -i avatar.mp4 -frames:v 1 -vf "scale=720:-2" public/media/avatar-poster.webp
```

Si algún archivo pasa de 1,5 MB, sube el `crf` de 2 en 2. Más alto = menos peso y menos calidad.

> **Ojo con el blanco:** la compresión y la gestión de color de algunos navegadores pueden convertir el #FFFFFF en #FEFEFE, y se notaría un "rectángulo". Para que no se vea nunca, el contenedor lleva una máscara con degradado suave en los bordes (`mask-image`). Compruébalo en Chrome **y** en Safari/iPhone.

### 7.3 Efectos (tus ideas, ajustadas)

| # | Efecto | Escritorio | Móvil (sin hover) | Estado |
|---|---|---|---|---|
| 1 | **Revelación de color:** gris con contraste elegante → color al pasar el ratón (~0,7 s) | `group-hover:grayscale-0` | Cambia a color cuando el avatar está centrado en pantalla, o al tocarlo | ✅ Incluido |
| 2 | **Cámara lenta al pasar el ratón:** `playbackRate` 1 → 0,75 | Con transición suave por GSAP, sin salto brusco | No aplica | ✅ Incluido |
| 3 | **Entrada:** escala 0,8 → 1 + desenfoque 20 px → 0 + opacidad | Al cargar | Igual | ✅ Incluido |
| 4 | **Inclinación 3D con el cursor** (máx. ±6°) | Sigue al ratón dentro del hero | Desactivado | ➕ Nuevo |
| 5 | **Parallax de salida:** el vídeo sube más lento que el texto y se desvanece al pasar a oscuro | Con el scroll | Igual | ➕ Nuevo |
| 6 | **Pausa fuera de pantalla:** el vídeo se pausa cuando no se ve | Ahorra batería y CPU | Igual | ➕ Nuevo |
| 7 | **Botón pausa/play** discreto en la esquina del vídeo | Obligatorio por accesibilidad (WCAG 2.2.2: contenido en movimiento > 5 s) | Igual | ➕ Nuevo |

**Sobre el modo gris en el hero blanco:** el blanco sigue siendo blanco en escala de grises, así que el efecto funciona igual de bien con la solución del apartado 2.

### 7.4 Componente de referencia (`AvatarVideo.astro`)

```astro
---
const { class: className = '' } = Astro.props;
---
<figure
  id="avatar"
  class={`group relative aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-t-full ${className}`}
  style="mask-image: radial-gradient(ellipse 75% 85% at 50% 45%, #000 70%, transparent 100%);"
>
  <video
    id="avatar-video"
    class="h-full w-full object-cover grayscale contrast-[1.1] transition-[filter] duration-700 ease-out
           group-hover:grayscale-0 group-hover:contrast-100 group-[.is-color]:grayscale-0"
    autoplay muted loop playsinline preload="auto"
    poster="/media/avatar-poster.webp"
    aria-label="Vídeo de Iván Benito con traje"
  >
    <source src="/media/avatar.webm" type="video/webm" />
    <source src="/media/avatar.mp4" type="video/mp4" />
  </video>

  <button id="avatar-toggle" type="button"
          class="absolute bottom-4 right-4 rounded-full bg-black/60 p-2 text-white opacity-0 transition
                 group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="Pausar vídeo">❚❚</button>
</figure>
```

### 7.5 Script de referencia (`src/scripts/avatar.ts`)

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initAvatar() {
  const fig = document.querySelector<HTMLElement>('#avatar');
  const video = document.querySelector<HTMLVideoElement>('#avatar-video');
  const toggle = document.querySelector<HTMLButtonElement>('#avatar-toggle');
  if (!fig || !video) return;

  const mm = gsap.matchMedia();

  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    hover: '(hover: hover) and (pointer: fine)',
  }, (ctx) => {
    const { motion, hover } = ctx.conditions!;

    // 3) Entrada
    if (motion) {
      gsap.from(fig, { scale: 0.8, opacity: 0, filter: 'blur(20px)', duration: 1.4, ease: 'expo.out', delay: 0.2 });
    }

    if (hover) {
      // 2) Cámara lenta suave
      const state = { rate: 1 };
      const setRate = (to: number) =>
        gsap.to(state, { rate: to, duration: 0.6, ease: 'power2.out', overwrite: true,
          onUpdate: () => { video.playbackRate = state.rate; } });
      fig.addEventListener('pointerenter', () => setRate(0.75));
      fig.addEventListener('pointerleave', () => setRate(1));

      // 4) Inclinación 3D
      if (motion) {
        const rx = gsap.quickTo(fig, 'rotationX', { duration: 0.6, ease: 'power3' });
        const ry = gsap.quickTo(fig, 'rotationY', { duration: 0.6, ease: 'power3' });
        gsap.set(fig, { transformPerspective: 900 });
        fig.addEventListener('pointermove', (e) => {
          const r = fig.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 12);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
        });
        fig.addEventListener('pointerleave', () => { rx(0); ry(0); });
      }
    } else {
      // 1) Móvil: color cuando el avatar está centrado
      ScrollTrigger.create({
        trigger: fig, start: 'top 60%', end: 'bottom 40%',
        toggleClass: { targets: fig, className: 'is-color' },
      });
      fig.addEventListener('click', () => fig.classList.toggle('is-color'));
    }
  });

  // 6) Pausar fuera de pantalla
  new IntersectionObserver(([entry]) => {
    if (fig.dataset.userPaused === 'true') return;
    entry.isIntersecting ? video.play().catch(() => {}) : video.pause();
  }, { threshold: 0.1 }).observe(fig);

  // 7) Botón pausa/play
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const paused = !video.paused;
    paused ? video.pause() : video.play();
    fig.dataset.userPaused = String(paused);
    toggle.setAttribute('aria-label', paused ? 'Reproducir vídeo' : 'Pausar vídeo');
    toggle.textContent = paused ? '▶' : '❚❚';
  });

  // Respeta reduced-motion: muestra el póster sin reproducir
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause();
    fig.dataset.userPaused = 'true';
  }
}
```

---

## 8. Catálogo de animaciones

Todas en `src/scripts/animations.ts`, dentro de `gsap.matchMedia()` para que **se desactiven con `prefers-reduced-motion`**, y con el contenido visible por defecto en el HTML (si el JS falla, la web se lee igual).

| ID | Animación | Dónde | Técnica | Duración / easing |
|---|---|---|---|---|
| A1 | Revelado del nombre letra a letra | Hero | `SplitText` (chars) + `stagger: 0.03`, `yPercent: 100 → 0` con máscara | 0,9 s, `expo.out` |
| A2 | Entrada del avatar | Hero | ver 7.5 | 1,4 s, `expo.out` |
| A3 | Indicador de scroll | Hero | Línea que baja en bucle | 1,6 s, `sine.inOut`, repeat −1 |
| A4 | **Tema blanco → oscuro** | Fin del hero | `gsap.to(document.documentElement, { '--bg': '#0B0B0C', '--fg': '#EDEDED' })` con `scrollTrigger: { scrub: true }` | Ligado al scroll |
| A5 | Parallax de salida del avatar | Hero | `yPercent: -15, opacity: 0`, `scrub` | Ligado al scroll |
| A6 | Texto que se ilumina palabra a palabra | Sobre mí | `SplitText` (words), `opacity: 0.15 → 1`, `scrub` | Ligado al scroll |
| A7 | Contadores | Cifras | Tween de `{ val: 0 }` → número, `onUpdate` escribe el texto | 1,5 s, `power2.out`, una vez |
| A8 | Marquee de logos | Habilidades | `xPercent: -50` en bucle sobre una lista duplicada; se ralentiza al pasar el ratón (`timeScale`) | 30 s lineal |
| A9 | Reveal escalonado de tarjetas | Proyectos, Certificaciones | `ScrollTrigger.batch('.reveal', { onEnter: … y: 40 → 0, opacity: 0 → 1, stagger: 0.08 })` | 0,8 s, `power3.out` |
| A10 | Inclinación 3D + gris → color | Tarjetas de proyecto | `quickTo` como en el avatar, máx. ±4° | 0,5 s |
| A11 | Filtro animado | Proyectos | Plugin `Flip` de GSAP: guardar estado → filtrar → `Flip.from()` | 0,6 s, `power2.inOut` |
| A12 | Línea temporal que se dibuja | Experiencia / Estudios | `scaleY: 0 → 1` (origen arriba) con `scrub`; hitos con `toggleActions` | Ligado al scroll |
| A13 | Brillo que sigue al cursor | Certificaciones | Variables CSS `--x/--y` con `pointermove` + `radial-gradient` en el borde | Instantáneo |
| A14 | Botones magnéticos | Contacto, hero | `quickTo` x/y hacia el cursor (máx. 8 px) | 0,4 s, `elastic.out(1, 0.4)` |
| A15 | Nav que se oculta/aparece | Global | `ScrollTrigger.create({ onUpdate: self => self.direction })` | 0,3 s |
| A16 | Barra de progreso | Global | `scaleX` ligado al scroll total | Ligado al scroll |
| A17 | Transición entre páginas | Home ↔ proyecto | View Transitions de Astro | ~0,4 s |

**Regla de oro:** máximo **una animación "protagonista" por pantalla**. Si todo se mueve, nada destaca.

**Lenis + ScrollTrigger** (`smooth-scroll.ts`):

```ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

---

## 9. Sistema de diseño

Dirección: **editorial y sobria, a juego con el traje y el vídeo en blanco y negro.** Monocromo con un solo color de acento. Nada de degradados morados de plantilla.

### 9.1 Colores (tokens en `global.css`)

| Token | Claro (hero) | Oscuro (resto) | Uso |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#0B0B0C` | Fondo de la página (se anima A4) |
| `--fg` | `#0B0B0C` | `#EDEDED` | Texto principal |
| `--muted` | `#6B6B70` | `#A1A1AA` | Texto secundario |
| `--surface` | `#F4F4F5` | `#141416` | Tarjetas |
| `--border` | `rgb(0 0 0 / 0.08)` | `rgb(255 255 255 / 0.08)` | Bordes finos |
| `--accent` | `#B08D57` | `#C8A96A` | Acento champán: enlaces, estado activo, brillo de tarjetas. Si prefieres algo más "tech", la alternativa es `#5EEAD4` (verde agua). |

```css
@import "tailwindcss";

@theme {
  --font-display: "Instrument Serif", serif;
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

:root {
  --bg: #FFFFFF; --fg: #0B0B0C; --muted: #6B6B70;
  --surface: #F4F4F5; --border: rgb(0 0 0 / .08); --accent: #B08D57;
}
body { background: var(--bg); color: var(--fg); }
```

### 9.2 Tipografía

| Rol | Fuente | Tamaño (escritorio / móvil) |
|---|---|---|
| Nombre (hero) | Instrument Serif | `clamp(3.5rem, 9vw, 8rem)` |
| Títulos de sección | Instrument Serif | `clamp(2.25rem, 5vw, 4rem)` |
| Texto | Geist | 18 px / 16 px, interlineado 1,6 |
| Etiquetas técnicas (stack, fechas) | JetBrains Mono | 13 px, mayúsculas, `tracking-wider` |

### 9.3 Espaciado y forma

- Ancho máximo del contenido: `max-w-6xl` (1152 px), márgenes laterales de 24 px en móvil.
- Separación entre secciones: `py-32` en escritorio y `py-20` en móvil.
- Radios: tarjetas `rounded-2xl`, botones `rounded-full`, avatar `rounded-t-full` (arco).
- Bordes de 1 px con `--border`, sin sombras pesadas (en oscuro no se ven).

---

## 10. Requisitos no funcionales

| Área | Requisito | Cómo se mide |
|---|---|---|
| Rendimiento | Lighthouse ≥ 90 en las 4 categorías (móvil) | Chrome DevTools → Lighthouse |
| | LCP < 2,5 s; CLS < 0,1 | PageSpeed Insights |
| | JS total < 100 KB gzip; vídeo ≤ 1,5 MB | Pestaña Network |
| Accesibilidad | Contraste AA, navegable con teclado, foco visible, `alt` en imágenes | Lighthouse + probar con Tab |
| | Los efectos de hover también se activan con `:focus-visible` | Manual |
| | Con `prefers-reduced-motion` no hay animaciones de movimiento | DevTools → Rendering → Emulate |
| Responsive | Correcto a 360, 768, 1024, 1440 y 1920 px | DevTools → modo dispositivo |
| Navegadores | Chrome, Edge, Firefox, Safari (macOS + iOS) | Manual (Safari: pide a alguien con iPhone si no tienes) |
| SEO | `title`, `description`, Open Graph (imagen al compartir en LinkedIn), `sitemap.xml`, datos estructurados `Person` (JSON-LD) | [opengraph.xyz](https://www.opengraph.xyz) |
| Privacidad | Sin cookies de terceros, fuentes autoalojadas y email protegido contra bots (se monta con JS) | — |
| Idiomas | ES por defecto; EN en `/en/` (fase opcional) | — |

---

## 11. Plan de desarrollo por fases con tiempos

Estimación para alguien que conoce Python y Power BI y es nuevo en Astro/GSAP, trabajando con ayuda de Claude Code. **Total: ~42 h (39 h sin la versión en inglés)**, que son unas **2,5–3 semanas a 3 h/día** o **1 semana intensiva**.

### Fase 0 — Preparación del entorno · 1 h 30 min

| Tarea | Tiempo |
|---|---|
| Instalar Node.js LTS y Git (si no los tienes); comprobar con `node -v` | 15 min |
| Crear el proyecto Astro en la carpeta (`npm create astro@latest`) | 15 min |
| Añadir Tailwind v4, GSAP, Lenis, @fontsource, astro-icon, sitemap | 20 min |
| Crear repo en GitHub, primer commit y `.gitignore` | 20 min |
| Instalar extensiones de VS Code: Astro, Tailwind CSS IntelliSense | 10 min |
| Verificar `npm run dev` en `localhost:4321` | 10 min |

### Fase 1 — Vídeo y recursos · 1 h 30 min

| Tarea | Tiempo |
|---|---|
| Generar WebM, MP4 y póster con ffmpeg (7.2) | 20 min |
| Revisar peso y calidad; ajustar `crf` | 20 min |
| Probar el bucle y el blanco sobre `#FFFFFF` en Chrome | 15 min |
| Preparar favicon e imagen Open Graph (1200×630) | 35 min |

### Fase 2 — Sistema de diseño y layout base · 3 h

| Tarea | Tiempo |
|---|---|
| Tokens de color y tipografía en `global.css` | 45 min |
| `BaseLayout.astro`: `<head>`, metadatos, fuentes, scripts globales | 45 min |
| `Nav.astro` y `Footer.astro` (sin animación) | 1 h |
| Página de prueba con todos los estilos de texto y botones | 30 min |

### Fase 3 — Modelo de contenido · 3 h 30 min

| Tarea | Tiempo |
|---|---|
| `content.config.ts` con los 5 esquemas | 45 min |
| Rellenar `profile`, `skills`, `certifications`, `education` y `experience` | 1 h |
| Copiar los 5 `.md` de proyecto del Apéndice A y revisarlos | 45 min |
| Comprobar que un campo mal puesto da error al compilar | 30 min |

### Fase 4 — Secciones estáticas (sin animación) · 9 h

| Tarea | Tiempo |
|---|---|
| Hero + `AvatarVideo` (solo HTML/CSS, hover de gris a color) | 1 h 30 min |
| Sobre mí + Cifras (contadores calculados desde las colecciones) | 1 h |
| Habilidades (grupos + marquee estático) | 1 h 15 min |
| Proyectos: tarjeta, cuadrícula, destacados y filtros (lógica) | 2 h |
| `Timeline` reutilizable → Experiencia y Estudios | 1 h 15 min |
| Certificaciones + Formación complementaria | 45 min |
| Contacto (copiar email, enlaces, CV) | 45 min |
| Página de detalle `/proyectos/[slug]` | 30 min |

### Fase 5 — Avatar interactivo · 3 h

| Tarea | Tiempo |
|---|---|
| Entrada con escala y desenfoque (A2) | 30 min |
| Cámara lenta suave al pasar el ratón | 30 min |
| Inclinación 3D con cursor | 30 min |
| Versión móvil: color al centrarse o al tocar | 30 min |
| Pausa fuera de pantalla + botón pausa/play | 30 min |
| Ajuste fino y pruebas en móvil real | 30 min |

### Fase 6 — Animaciones de scroll · 7 h

| Tarea | Tiempo |
|---|---|
| Lenis + ScrollTrigger y `matchMedia` de reduced-motion | 45 min |
| Transición de tema blanco → oscuro (A4) + parallax del avatar (A5) | 1 h 30 min |
| Revelado del nombre con SplitText (A1) + indicador scroll (A3) | 45 min |
| Texto que se ilumina (A6) + contadores (A7) | 45 min |
| Reveal escalonado de tarjetas (A9) + inclinación (A10) | 1 h |
| Filtro con Flip (A11) | 45 min |
| Línea temporal (A12) | 45 min |
| Brillo de certificaciones (A13), botones magnéticos (A14), nav y progreso (A15, A16) | 45 min |

### Fase 7 — Contenido real de proyectos · 3 h

| Tarea | Tiempo |
|---|---|
| Capturas limpias de dashboards y diagramas de arquitectura (sin datos sensibles) | 1 h 15 min |
| Ampliar los casos de estudio de los 3 destacados con tus capturas y decisiones propias | 1 h 45 min |

### Fase 8 — Responsive, accesibilidad y rendimiento · 4 h

| Tarea | Tiempo |
|---|---|
| Revisión a 360/768/1024/1440 px y ajustes | 1 h 30 min |
| Accesibilidad: teclado, foco, contraste, `aria-label`, reduced-motion | 1 h |
| Lighthouse: corregir lo que baje de 90 | 1 h |
| Prueba en Safari/iPhone (blanco del vídeo, autoplay, `playsinline`) | 30 min |

### Fase 9 — SEO y despliegue · 2 h

| Tarea | Tiempo |
|---|---|
| Metadatos, Open Graph, `sitemap`, JSON-LD `Person` | 45 min |
| GitHub Actions → GitHub Pages (o conectar con Vercel) | 45 min |
| (Opcional) dominio propio y DNS | 30 min |

### Fase 10 — Versión en inglés (opcional) · 3 h

| Tarea | Tiempo |
|---|---|
| Configurar i18n de Astro y `es.json`/`en.json` para textos fijos | 1 h |
| Campos traducibles en el contenido (`title_en`, `summary_en`…) | 1 h |
| Selector de idioma + `hreflang` | 1 h |

### Fase 11 — QA final y lanzamiento · 1 h 30 min

| Tarea | Tiempo |
|---|---|
| Pasar la checklist del apartado 16 | 45 min |
| Que 2 personas la prueben (una en móvil) y recoger comentarios | 30 min |
| Añadir el enlace a LinkedIn, al CV en PDF y a la firma de email | 15 min |

### Resumen

| Fase | Horas |
|---|---|
| 0 Preparación | 1,5 |
| 1 Vídeo y recursos | 1,5 |
| 2 Diseño base | 3 |
| 3 Contenido | 3,5 |
| 4 Secciones | 9 |
| 5 Avatar | 3 |
| 6 Animaciones | 7 |
| 7 Casos de estudio | 3 |
| 8 Calidad | 4 |
| 9 SEO + despliegue | 2 |
| 10 Inglés (opcional) | 3 |
| 11 QA | 1,5 |
| **Total** | **~42 h (39 h sin inglés)** |

**Hitos:**

- **MVP publicable** (fases 0–4 + 9): web estática con todo el contenido, ~20 h. **Publícala ya en este punto** para tener un enlace que poner en las candidaturas.
- **Versión completa** (+ fases 5–8, 11).
- **Bilingüe** (+ fase 10).

---

## 12. Instrucciones paso a paso

### 12.1 Crear el proyecto (PowerShell, en la carpeta del proyecto)

```powershell
cd "C:\Users\ivanb\Desktop\Proyectos\web propia"

# Crea Astro en la carpeta actual (plantilla mínima, TypeScript estricto)
npm create astro@latest . -- --template minimal --typescript strict --install --git

# Tailwind v4
npx astro add tailwind

# Animaciones, scroll suave, iconos, fuentes, sitemap
npm i gsap lenis astro-icon @iconify-json/simple-icons @iconify-json/lucide
npm i @fontsource/instrument-serif @fontsource/jetbrains-mono @fontsource-variable/geist
npx astro add sitemap

npm run dev
```

Si el asistente avisa de que la carpeta no está vacía (por `avatar.mp4` y este `.md`), acepta continuar. Después **mueve `avatar.mp4` fuera de `public/`** o a una carpeta `raw/` incluida en `.gitignore`: el original de 7 MB no debe publicarse.

### 12.2 `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://ivan-0612.github.io',   // cámbialo por tu dominio final
  integrations: [sitemap(), icon()],
  vite: { plugins: [tailwindcss()] },
  i18n: { defaultLocale: 'es', locales: ['es', 'en'] }, // fase 10
});
```

### 12.3 Cargar los scripts (en `BaseLayout.astro`)

```astro
<script>
  import { initSmoothScroll } from '../scripts/smooth-scroll';
  import { initAnimations } from '../scripts/animations';
  import { initAvatar } from '../scripts/avatar';
  initSmoothScroll();
  initAvatar();
  initAnimations();
</script>
```

Si activas View Transitions, envuelve las llamadas en `document.addEventListener('astro:page-load', …)` para que se ejecuten también al navegar entre páginas.

### 12.4 Desplegar en GitHub Pages

1. Crea el repo `Ivan-0612/web-cv` (o `Ivan-0612/ivan-0612.github.io` para que la URL sea la raíz).
2. Crea `.github/workflows/deploy.yml` con la acción oficial `withastro/action` (plantilla en la documentación de Astro → *Deploy → GitHub Pages*).
3. En GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Si el repo **no** es `ivan-0612.github.io`, añade `base: '/web-cv'` en `astro.config.mjs`.
5. `git push` y en ~1 min estará en línea.

**Alternativa más simple:** entra en vercel.com con GitHub, importa el repo y Vercel detecta Astro solo, sin configurar nada.

### 12.4 bis Compatibilidad con GitHub Pages

Todo lo del plan es compatible: Astro genera HTML, CSS y JS estáticos, y GSAP, Lenis, el vídeo y las animaciones se ejecutan en el navegador. Lo único que hay que vigilar:

- **Ruta base:** si el repo no se llama `ivan-0612.github.io`, hay que poner `base: '/nombre-repo'` y usar `import.meta.env.BASE_URL` en las rutas de `/media/…` y `/cv/…`. Con el repo `ivan-0612.github.io` o con dominio propio no hace falta.
- **Sin servidor:** no hay formulario de contacto con backend. Por eso el contacto es email + LinkedIn + GitHub.
- **Límites razonables:** sitio < 1 GB y ~100 GB de tráfico al mes. Con ~1,5 MB de vídeo estás muy por debajo.

### 12.5 Flujo de trabajo diario

```powershell
npm run dev        # desarrollo con recarga automática
npm run build      # compila; si falla aquí, suele ser un campo de contenido mal puesto
npm run preview    # ver la versión compilada
git add . ; git commit -m "feat: …" ; git push   # publica
```

---

## 13. Guía de mantenimiento: añadir contenido

| Quiero añadir… | Qué hago | Archivo |
|---|---|---|
| **Un proyecto** | Copio un `.md` de `src/content/projects/`, cambio el frontmatter y el texto, y dejo la captura en `src/assets/projects/` | `src/content/projects/nuevo.md` |
| **Una certificación** | Añado un objeto al array con `id` único | `src/content/certifications.json` |
| **Un curso** | Igual, con `"type": "curso"` | `src/content/certifications.json` |
| **Una habilidad** | La añado al grupo que toque; en `projects` pongo los ids de los proyectos donde la usé | `src/content/skills.json` |
| **Un grupo de habilidades** | Nuevo objeto `{ "id", "group", "items": [] }` | `src/content/skills.json` |
| **Un trabajo** | Nuevo objeto; sin `end` aparece como "Actualidad" | `src/content/experience.json` |
| **Un estudio** | Nuevo objeto | `src/content/education.json` |
| **Nueva versión del CV en PDF** | Sustituyo el archivo manteniendo el nombre | `public/cv/` |

Después: `npm run build` para validar → `git push` para publicar. **Las cifras (nº de proyectos, certificaciones, tecnologías) se actualizan solas.**

---

## 14. Contenido que tienes que preparar tú

- [ ] Fechas exactas de: máster, grado, prácticas y cada certificación
- [ ] Enlaces de verificación: Microsoft Learn (credencial Fabric) y Credly (AWS)
- [ ] URL de LinkedIn y email de contacto que quieras publicar
- [ ] CV en PDF en español e inglés (versiones actuales)
- [ ] Capturas de los 3 proyectos destacados: dashboards, diagramas de arquitectura y fragmentos de código. **Sin datos reales de personas.**
- [ ] Descripción de una línea en cada uno de los 7 repos seleccionados (los README ya existen)
- [ ] Arreglar las incoherencias de los README (ver Apéndice B)
- [ ] Si la web menciona el trabajo de las prácticas, mantener solo lo que ya dice tu CV (sin datos de alumnos ni capturas)
- [ ] Enlace de verificación de la certificación de IBM
- [ ] Bio de 3–4 líneas y frase de valor del hero (Claude puede redactar un borrador a partir de tu CV)
- [ ] Decidir: ¿dominio propio (`ivanbenito.dev`, `ivanbenito.es`…) o URL gratuita de GitHub/Vercel?

---

## 15. Prompt de arranque para Claude Code

Copia esto en Claude Code, abierto en la carpeta del proyecto:

```text
Lee PLAN_WEB_CV.md completo. Es la especificación de mi web CV.
Vamos a construirla por fases, en el orden del apartado 11.
Empieza por las fases 0 a 3: crea el proyecto Astro en esta carpeta,
instala las dependencias del apartado 12.1, configura astro.config.mjs,
los tokens de diseño (apartado 9), el content.config.ts (apartado 5.1)
y los JSON/MD de contenido con los datos del apartado 5.2 (deja los TODO).
Genera los vídeos optimizados con ffmpeg (apartado 7.2) y mueve el
original a raw/ (en .gitignore).
Al terminar cada fase: ejecuta npm run build, dime qué has hecho y qué
falta, y espera mi visto bueno antes de seguir.
Reglas: el contenido debe ser visible sin JS; todas las animaciones
dentro de gsap.matchMedia con prefers-reduced-motion; nada de barras
de porcentaje en habilidades; no muestres el código "DP-600" en la web.
```

---

## 16. Checklist final antes de publicar

**Contenido**
- [ ] Sin `TODO` en ningún archivo (`git grep TODO`)
- [ ] Todos los enlaces funcionan (GitHub, LinkedIn, verificación de certificaciones, PDF)
- [ ] Sin faltas de ortografía (pasa los textos por un corrector)
- [ ] Ninguna captura muestra datos personales reales

**Vídeo**
- [ ] ≤ 1,5 MB por formato; el bucle no salta
- [ ] No se ve el rectángulo del vídeo sobre el blanco (Chrome **y** Safari)
- [ ] Se reproduce solo en iPhone (necesita `muted` + `playsinline`)
- [ ] El botón de pausa funciona y es accesible con teclado

**Animaciones**
- [ ] Con reduced-motion activado la web se lee perfectamente
- [ ] Sin tirones en un portátil normal (DevTools → Performance, sin tramos rojos largos)
- [ ] El titular se lee en < 1 s aunque la animación siga

**Técnico**
- [ ] Lighthouse móvil ≥ 90 en las 4 categorías
- [ ] La vista previa al pegar el enlace en LinkedIn muestra imagen y título correctos
- [ ] `npm run build` sin avisos
- [ ] Probado a 360, 768, 1024, 1440 px

**Lanzamiento**
- [ ] Enlace en el perfil de LinkedIn (sección "Destacado" + información de contacto)
- [ ] Enlace en la cabecera del CV en PDF
- [ ] Enlace en el README de tu perfil de GitHub

---

## Apéndice A — Contenido de los proyectos

Estos son los 5 proyectos tal y como están ya en la web (`src/content/projects/`). Se redactaron para que **cualquier persona, sin conocimientos técnicos, entienda de qué va cada uno**: todos empiezan por «En pocas palabras» y explican la jerga (churn, RLS, Medallion, AUC, etc.) donde aparece. El TFM se ha redactado además con los datos y resultados de tu presentación final. **No se ha añadido ninguna cifra que no esté en tus README o en esa presentación.**

Para editarlos, cambia directamente los `.md` de `src/content/projects/`; este apéndice es solo una referencia.

| Archivo | Título en la web | Destacado |
|---|---|---|
| `fabric-financial-dwh.md` | Data Warehouse financiero en Microsoft Fabric | ✅ |
| `olist-ecommerce-fabric.md` | Olist: dashboard de e-commerce con Fabric y Power BI | ✅ |
| `salary-seniority-prediction.md` | TFM: predicción de salario y seniority en ofertas de trabajo | ✅ |
| `telco-customer-churn.md` | Predicción de bajas de clientes en telecomunicaciones | — |
| `diabetes-prediction.md` | Predicción del riesgo futuro de diabetes | — |

### A.1 `fabric-financial-dwh.md`

````md
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
````

### A.2 `olist-ecommerce-fabric.md`

````md
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
````

### A.3 `salary-seniority-prediction.md`

````md
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
````

### A.4 `telco-customer-churn.md`

````md
---
title: "Predicción de bajas de clientes en telecomunicaciones"
summary: "Modelo que avisa de qué clientes de una telco van a darse de baja, para retenerlos a tiempo. Detecta el 87,6 % de las bajas y se explica con SHAP. Con app web."
date: 2026-05-01
category: machine-learning
stack: ["Python", "XGBoost", "scikit-learn", "SHAP", "Streamlit", "Docker", "Render"]
repo: "https://github.com/Ivan-0612/Telco-Customer-Churn"
repo2: "https://github.com/Ivan-0612/telecom-churn-app-deployment"
repoLabels: ["Modelo", "Despliegue"]
order: 4
---

## En pocas palabras
Un modelo de machine learning que **predice qué clientes de una compañía de telefonía van a darse de baja** (lo que en el sector se llama *churn*), para que la empresa pueda actuar antes de perderlos. Retener a un cliente cuesta mucho menos que conseguir uno nuevo, así que lo importante no es acertar siempre, sino **no dejar escapar a los que realmente se van**. Incluye una aplicación web donde se puede probar.

## Qué hice
- **Comparé tres modelos** (XGBoost, Random Forest y KNN) y me quedé con XGBoost, el que mejor separaba a los clientes que se van de los que se quedan (AUC de 0,843; con 1 sería perfecto y 0,5 equivale al azar).
- **Ajusté el umbral de decisión** a 0,3915, por debajo del habitual. Es una decisión de negocio: es más caro no detectar una baja que avisar de un cliente que al final no se iba. El resultado es un **recall del 87,63 %**: el modelo detecta casi 9 de cada 10 bajas reales.
- **Hice que el modelo se explique** con valores SHAP, que indican qué factores empujan a un cliente hacia la baja (contrato con fibra óptica, cuotas mensuales altas, pago con cheque electrónico) y cuáles lo retienen (contratos de dos años, más antigüedad).

## Despliegue
El modelo, el preprocesado de los datos y la explicación SHAP están empaquetados en una aplicación web (Streamlit) dentro de un contenedor Docker y alojada en Render. El código de despliegue está en un repositorio aparte, enlazado arriba como «Despliegue».
````

### A.5 `diabetes-prediction.md`

````md
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
````

---

## Apéndice B — Incoherencias a corregir en tus README

Detectadas al leerlos. Son detalles pequeños, pero un reclutador técnico los nota.

| Repo | Incoherencia | Arreglo |
|---|---|---|
| `fabric-financial-data-warehouse` | El árbol del README pone las capturas en `docs/assets/`, pero están en `assets/`. | Corregir la ruta en el README. |
| `Olist-e-commerce-BI-proyect` | El README dice `notebooks/` y la carpeta es `notebook/`. Los nombres de capturas del árbol (`page1_executive.png`…) no coinciden con los de los enlaces de imagen (`page1_general.png`…). | Unificar nombres. Comprueba que las imágenes se ven en GitHub. |
| `TFM_job_description_prediction` | Dice 10 rangos salariales pero lista 8. No incluye métricas ni explica el RAG. | Corregir el número y añadir métricas y arquitectura del RAG. |
| `Diabetes-prediction-deployment` | README mínimo: no explica cómo se entrenó ni cómo desplegar. | Añadir 3 líneas y enlazar al repo del modelo. |
| Todos | Ninguno tiene descripción de una línea en GitHub. | Añadirla en *About* (⚙️ junto a la descripción del repo). |
