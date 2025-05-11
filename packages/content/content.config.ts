import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Reusable author
export const author = z.object({
  name: z.string(),
  avatar: z.object({ src: z.string() }).optional(),
  to: z.string().url().optional(),
})

// Global keys shared by all content pages
export const global = {
  layout: z.string().optional(),
  title: z.string(),
  icon: z.string().optional(),
  description: z.string(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  date: z.string().date(),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  author: author.optional(),
  authors: z.array(author).optional(),
  tags: z.array(z.string()).optional(),
  list: z.boolean()
    .or(z.string())
    .or(z.object({
      collection: z.string().optional(),
      path: z.string(),
      order: z.object({ field: z.string(), direction: z.enum(['ASC', 'DESC']) }).optional()
    })).optional(),
}

export default defineContentConfig({
  collections: {
    // Pages: E.g. /index.md, /about.md
    pages: defineCollection({
      source: [
        {
          include: '**/*',
          exclude: []
        },
      ],
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
  }
})

// To define custom collections, see:
// https://content.nuxt.com/docs/collections/define

// NOTE: It is recommended that any and all content
// files you wish to be searchable are written in
// markdown. It is not yet possible to search .yml
// files or custom content types. We recommend
// creating canonical markdown files which link to
// "attached" content should you need to use custom
// types at all.
