import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
