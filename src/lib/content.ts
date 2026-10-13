import { getCollection } from 'astro:content';
import type { Lang } from './i18n';

/** Proyectos ordenados. En inglés se usa la traducción si existe; si no, el proyecto en español. */
export async function getProjects(lang: Lang) {
  const es = await getCollection('projects');
  const en = lang === 'en' ? new Map((await getCollection('projectsEn')).map((p) => [p.id, p])) : null;
  return es
    .map((p) => en?.get(p.id) ?? p)
    .sort((a, b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime());
}
