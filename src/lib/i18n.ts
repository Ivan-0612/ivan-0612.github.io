import { url } from './url';

export type Lang = 'es' | 'en';

/** Prefijo de ruta por idioma: el español está en la raíz, el inglés en /en/ */
export const langPrefix = (l: Lang) => (l === 'en' ? '/en' : '');

/** URL de una ruta del idioma indicado (path: '/#proyectos', '/', …) */
export const lurl = (l: Lang, path: string) => url(langPrefix(l) + (path.startsWith('/') ? path : '/' + path));

export const projectUrl = (l: Lang, id: string) => url(projectPath(l, id));
export const projectPath = (l: Lang, id: string) => (l === 'en' ? `/en/projects/${id}/` : `/proyectos/${id}/`);

/**
 * Devuelve los datos en el idioma pedido. Cada elemento puede llevar un objeto `en`
 * con solo los campos traducidos; lo que no esté traducido se queda en español.
 */
export function tr<T extends Record<string, any>>(data: T, lang: Lang): T {
  return lang === 'en' && data.en ? ({ ...data, ...data.en } as T) : data;
}

export const ui = {
  es: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    skip: 'Saltar al contenido',
    navAria: 'Principal',
    homeAria: 'Inicio',
    nav: [
      ['Sobre mí', '#sobre-mi'],
      ['Habilidades', '#habilidades'],
      ['Proyectos', '#proyectos'],
      ['Experiencia', '#experiencia'],
      ['Certificaciones', '#certificaciones'],
      ['Contacto', '#contacto'],
    ] as [string, string][],
    cv: 'CV',
    switchTo: 'English',
    switchShort: 'EN',
    switchAria: 'View this page in English',
    footerBuilt: 'Hecho con Astro, Tailwind y GSAP',
    heroProjects: 'Ver proyectos',
    heroCv: 'Descargar CV',
    heroScroll: 'scroll',
    aboutEyebrow: '01 — Sobre mí',
    aboutTitle: 'Quién soy',
    stats: ['Proyectos publicados', 'Certificaciones', 'Tecnologías y herramientas'],
    statsAria: 'Cifras',
    skillsEyebrow: '02 — Habilidades',
    skillsTitle: 'Con qué trabajo',
    skillsIntro: 'Pasa el ratón (o toca) una habilidad de las de abajo para ver en qué proyectos la he usado.',
    popOne: 'La uso en este proyecto',
    popMany: 'La uso en {n} proyectos',
    projectsEyebrow: '03 — Proyectos',
    projectsTitle: 'Lo que he construido',
    filterAria: 'Filtrar proyectos',
    all: 'Todos',
    featured: 'Destacado',
    code: ['Código', 'Código 2'],
    demo: 'Demo',
    viewDemo: 'Ver demo',
    demoNote: 'La demo está alojada en {host} (plan gratuito), así que puede tardar hasta un minuto en cargar la primera vez.',
    projectsBack: 'Proyectos',
    nextProject: 'Siguiente proyecto',
    expEyebrow: '04 — Experiencia',
    expTitle: 'Dónde he trabajado',
    eduEyebrow: '05 — Estudios',
    eduTitle: 'Cómo me he formado',
    present: 'Actualidad',
    certEyebrow: '06 — Certificaciones',
    certTitle: 'Lo que he acreditado',
    verify: 'Verificar',
    extraTraining: 'Formación complementaria',
    contactEyebrow: '07 — Contacto',
    contactTitle: '¿Hablamos de datos?',
    contactText: 'Busco un puesto de Data Analyst o BI Analyst. Escríbeme y te respondo en cuanto pueda.',
    cvPdf: 'CV (PDF)',
    copied: 'Email copiado ✓',
    copiedStatus: 'Email copiado al portapapeles',
    avatarAria: 'Vídeo de Iván Benito en traje',
    pause: 'Pausar vídeo',
    play: 'Reproducir vídeo',
    categories: {
      fabric: 'Microsoft Fabric',
      'power-bi': 'Power BI',
      'machine-learning': 'Machine Learning',
      mlops: 'MLOps',
      automation: 'Automatización',
      app: 'Aplicaciones',
    } as Record<string, string>,
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    skip: 'Skip to content',
    navAria: 'Main',
    homeAria: 'Home',
    nav: [
      ['About', '#sobre-mi'],
      ['Skills', '#habilidades'],
      ['Projects', '#proyectos'],
      ['Experience', '#experiencia'],
      ['Certifications', '#certificaciones'],
      ['Contact', '#contacto'],
    ] as [string, string][],
    cv: 'CV',
    switchTo: 'Español',
    switchShort: 'ES',
    switchAria: 'Ver esta página en español',
    footerBuilt: 'Built with Astro, Tailwind and GSAP',
    heroProjects: 'View projects',
    heroCv: 'Download CV',
    heroScroll: 'scroll',
    aboutEyebrow: '01 — About me',
    aboutTitle: 'Who I am',
    stats: ['Published projects', 'Certifications', 'Technologies and tools'],
    statsAria: 'Numbers',
    skillsEyebrow: '02 — Skills',
    skillsTitle: 'What I work with',
    skillsIntro: 'Hover over (or tap) a skill below to see which projects I have used it in.',
    popOne: 'I use it in this project',
    popMany: 'I use it in {n} projects',
    projectsEyebrow: '03 — Projects',
    projectsTitle: "What I've built",
    filterAria: 'Filter projects',
    all: 'All',
    featured: 'Featured',
    code: ['Code', 'Code 2'],
    demo: 'Demo',
    viewDemo: 'View demo',
    demoNote: 'The demo is hosted on {host} (free tier), so it may take up to a minute to load the first time.',
    projectsBack: 'Projects',
    nextProject: 'Next project',
    expEyebrow: '04 — Experience',
    expTitle: "Where I've worked",
    eduEyebrow: '05 — Education',
    eduTitle: "How I've trained",
    present: 'Present',
    certEyebrow: '06 — Certifications',
    certTitle: "What I've certified",
    verify: 'Verify',
    extraTraining: 'Additional training',
    contactEyebrow: '07 — Contact',
    contactTitle: "Let's talk data?",
    contactText: "I'm looking for a Data Analyst or BI Analyst role. Drop me a line and I'll get back to you as soon as I can.",
    cvPdf: 'CV (PDF)',
    copied: 'Email copied ✓',
    copiedStatus: 'Email copied to clipboard',
    avatarAria: 'Video of Iván Benito in a suit',
    pause: 'Pause video',
    play: 'Play video',
    categories: {
      fabric: 'Microsoft Fabric',
      'power-bi': 'Power BI',
      'machine-learning': 'Machine Learning',
      mlops: 'MLOps',
      automation: 'Automation',
      app: 'Applications',
    } as Record<string, string>,
  },
} as const;

export const demoHost = (u: string) => (u.includes('huggingface.co') ? 'Hugging Face Spaces' : u.includes('onrender.com') ? 'Render' : new URL(u).hostname);

export type UI = (typeof ui)['es'];
