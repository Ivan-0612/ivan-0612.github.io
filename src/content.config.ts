import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const projectSchema = ({ image }: { image: any }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(180),
      date: z.coerce.date(),
      category: z.enum(['fabric', 'power-bi', 'machine-learning', 'mlops', 'automation', 'app']),
      stack: z.array(z.string()),
      cover: image().optional(),
      repo: z.string().url().optional(),
      repo2: z.string().url().optional(),
      repoLabels: z.tuple([z.string(), z.string()]).optional(),
      demo: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      status: z.enum(['completado', 'en-curso']).default('completado'),
    });

const projects = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects' }), schema: projectSchema });
/** Traducciones al inglés: mismo nombre de archivo que el proyecto en español */
const projectsEn = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/projects-en' }), schema: projectSchema });

const certifications = defineCollection({
  loader: file('src/content/certifications.json'),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.coerce.date().optional(),
    credentialUrl: z.string().url().optional(),
    logo: z.string(),
    type: z.enum(['certificacion', 'curso']).default('certificacion'),
    order: z.number().default(99),
    en: z.object({ name: z.string().optional(), issuer: z.string().optional() }).optional(),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({
    group: z.string(),
    order: z.number().default(99),
    en: z.object({ group: z.string() }).optional(),
    items: z.array(
      z.object({
        name: z.string(),
        projects: z.array(z.string()).default([]),
        note: z.string().optional(),
        en: z.object({ name: z.string().optional(), note: z.string().optional() }).optional(),
      }),
    ),
  }),
});

const timelineEntry = z.object({
  title: z.string(),
  org: z.string(),
  location: z.string().optional(),
  start: z.coerce.date(),
  end: z.coerce.date().optional(),
  precision: z.enum(['year', 'month']).default('month'),
  bullets: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  en: z
    .object({ title: z.string().optional(), org: z.string().optional(), location: z.string().optional(), bullets: z.array(z.string()).optional() })
    .optional(),
});

const experience = defineCollection({ loader: file('src/content/experience.json'), schema: timelineEntry });
const education = defineCollection({ loader: file('src/content/education.json'), schema: timelineEntry });

export const collections = { projects, projectsEn, certifications, skills, experience, education };
