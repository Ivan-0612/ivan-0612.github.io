# Web CV · Iván Benito Sánchez

Astro + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText, Flip) + Lenis.
Plan completo y especificaciones: `PLAN_WEB_CV.md`.

## Arrancar (PowerShell, en esta carpeta)

```powershell
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/ (si falla, suele ser un campo de contenido mal puesto)
npm run preview    # ver la versión compilada
```

## Añadir contenido (no hace falta tocar componentes)

| Quiero añadir… | Archivo |
|---|---|
| Un proyecto | copia un `.md` de `src/content/projects/` y cambia el frontmatter y el texto |
| Una certificación o curso | `src/content/certifications.json` (`"type": "curso"` para cursos) |
| Una habilidad | `src/content/skills.json` (en `projects`, los ids de los proyectos donde la usaste) |
| Un trabajo / estudio | `src/content/experience.json` / `education.json` (sin `end` = «Actualidad») |
| Datos personales, bio, enlaces | `src/content/profile.json` |
| Capturas de un proyecto | déjalas en `src/assets/projects/` y añade `cover: ../../assets/projects/x.png` al frontmatter |

Las cifras de la home (proyectos, certificaciones, tecnologías) se calculan solas.

## Pendiente

- Fechas y enlaces de verificación de las certificaciones (`certifications.json`).
- Imagen Open Graph (`public/og-image.png`, 1200×630) para la vista previa en LinkedIn.
- Capturas de los proyectos destacados.
- Desplegar en GitHub Pages (apartado 12.4 del plan).
- Versión en inglés (fase 10 del plan).

## Vídeo

`public/media/avatar.webm` y `avatar.mp4` (720 px, sin audio, < 0,7 MB) y `avatar-poster.webp`.
Guarda el original en `raw/` (está en `.gitignore`).
