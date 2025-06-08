import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// TODO: Simplify global schema for greater ease of using Nuxt Studio.
//       Some values can be "advanced", accessible only via meta?

// Reusable author
export const author = z.object({
  name: z.string(),
  title: z.string().optional(),
  avatar: z.object({ src: z.string() }).optional(),
  to: z.string().url().optional(),
})

export const og = z.object({
  component: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  logo: z.string().optional(),
  headline: z.string().optional(),
  color: z.string().optional(),
  website: z.string().optional(),
  image: z.string().optional(),
  bg: z.string().optional(),
  emoji: z.string().optional(),
})

// Global keys shared by all content pages
export const global = {
  title: z.string(),
  description: z.string(),
  og: og.optional(),
  date: z.string().date(),
  layout: z.string().optional(), // .meta candidate
  icon: z.string().optional(), // .meta candidate
  headline: z.string(), // .meta candidate
  image: z.string().optional(), // scrap?
  images: z.array(z.string()).optional(),
  category: z.string().optional(), // scrap?
  categories: z.array(z.string()).optional(),
  author: author.optional(), // scrap?
  authors: z.array(author).optional(),
  tags: z.array(z.string()).optional(),
  list: z.boolean() // .meta candidate
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
      source: {
        include: '**/*',
        exclude: [
          '.*',
          '.*/**/*',
          '*blog/**/*',
          '*docs/**/*',
          '*testimonials/**/*',
        ]
      },
      type: 'page',
      schema: z.object({
        ...global,
      })
    }),
    // Blog: Blog posts
    blog: defineCollection({
      source: [
        {
          include: '*blog/**/*',
          exclude: [
            '*blog/**/.*',
            '*blog/**/.*/**/*',
          ]
        },
        { include: '*blog/**/.navigation.y?(a)ml', },
      ],
      type: 'page',
      schema: z.object({
        ...global,
        layout: z.string().default('article'),
        category: z.string().optional(),
      })
    }),
    // Docs: Documentation
    docs: defineCollection({
      source: [
        {
          include: '*docs/**/*',
          exclude: [
            '*docs/**/.*',
            '*docs/**/.*/**/*',
          ]
        },
        { include: '*docs/**/.navigation.y?(a)ml', },
      ],
      type: 'page',
      schema: z.object({
        ...global,
        layout: z.string().default('doc'),
        category: z.string().optional(),
      })
    }),
    testimonials: defineCollection({
      source: [
        {
          include: '*testimonials/**/*',
          exclude: [
            '*testimonials/**/.*',
            '*testimonials/**/.*/**/*',
          ]
        },
        { include: '*testimonials/**/.navigation.y?(a)ml', },
      ],
      type: 'page',
      schema: z.object({
        ...global,
        highlight: z.string(),
        ogComponent: z.string().default('TntTestimonial'),
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
