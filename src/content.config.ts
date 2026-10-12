import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
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
    }),
});

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
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({
    group: z.string(),
    order: z.number().default(99),
    items: z.array(
      z.object({
        name: z.string(),
        projects: z.array(z.string()).default([]),
        note: z.string().optional(),
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
});

const experience = defineCollection({ loader: file('src/content/experience.json'), schema: timelineEntry });
const education = defineCollection({ loader: file('src/content/education.json'), schema: timelineEntry });

export const collections = { projects, certifications, skills, experience, education };
