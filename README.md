# Iván Benito Sánchez · Web CV

Mi web personal, donde reúno quién soy, mis proyectos, habilidades, certificaciones, estudios y experiencia.
Está pensada para que cualquiera, sea del sector o no, entienda lo que hago.

🔗 **https://ivan-0612.github.io**

## Tecnologías

- [Astro](https://astro.build) para generar la web estática
- [Tailwind CSS](https://tailwindcss.com) para los estilos
- [GSAP](https://gsap.com) (ScrollTrigger, SplitText, Flip) para las animaciones
- [Lenis](https://lenis.darkroom.engineering) para el scroll suave
- GitHub Actions + GitHub Pages para el despliegue

## Cómo funciona

El contenido está separado del diseño: todo lo que se muestra sale de archivos en `src/content/`, y los componentes solo lo pintan. Así puedo actualizar la web sin tocar el código.

| Contenido | Archivo |
|---|---|
| Proyectos | `src/content/projects/*.md` |
| Certificaciones y cursos | `src/content/certifications.json` |
| Habilidades | `src/content/skills.json` |
| Experiencia | `src/content/experience.json` |
| Estudios | `src/content/education.json` |
| Datos personales y enlaces | `src/content/profile.json` |

## Ejecutar en local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera la carpeta dist/
npm run preview   # previsualiza la versión compilada
```

## Despliegue

Cada push a `main` lanza el workflow de `.github/workflows/deploy.yml`, que compila la web y la publica en GitHub Pages.

## Contacto

- LinkedIn: https://www.linkedin.com/in/ivanbenitosanchez/
- GitHub: https://github.com/Ivan-0612
- Email: ivanbenitosanchez@gmail.com
