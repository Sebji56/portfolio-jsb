import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const i18n = z.object({ fr: z.string(), en: z.string() });
const i18nList = z.object({ fr: z.array(z.string()), en: z.array(z.string()) });
const monthYear = z.string().regex(/^\d{2}\/\d{4}$/);
const pillar = z.enum(['service', 'sales', 'tech']);

const experiences = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experiences' }),
  schema: z.object({
    order: z.number(),
    kind: z.enum(['main', 'project', 'compact']),
    company: z.string(),
    url: z.url().optional(),
    location: i18n,
    mode: i18n.optional(),
    roles: z.array(z.object({ title: i18n, start: monthYear, end: monthYear })).min(1),
    context: i18n,
    highlights: i18nList,
    details: i18nList.optional(),
    skills: z.array(z.object({ label: i18n, pillar })),
    photo: z.string().optional(),
  }),
});

const salons = defineCollection({
  loader: file('./src/content/salons.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    fullName: z.string().optional(),
    city: i18n,
    date: i18n.optional(),
    description: i18n,
    url: z.url().optional(),
    group: z.enum(['proteus', 'ardoisiere']),
    photo: z.string().optional(),
    stage: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({ order: z.number(), title: i18n, summary: i18n, url: z.url().optional() }),
});

export const collections = { experiences, salons, projects };
