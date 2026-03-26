import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

// 카테고리 테이블
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  color: varchar('color', { length: 7 }).notNull().default('#6B7280'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// 기사 테이블
export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  guid: varchar('guid', { length: 500 }).notNull().unique(),
  originalTitle: varchar('original_title', { length: 500 }),
  originalSummary: text('original_summary'),
  translatedTitle: varchar('translated_title', { length: 500 }),
  translatedSummary: text('translated_summary'),
  sourceUrl: varchar('source_url', { length: 1000 }),
  sourceName: varchar('source_name', { length: 100 }),
  imageUrl: varchar('image_url', { length: 1000 }),
  categoryId: integer('category_id').references(() => categories.id),
  publishedAt: timestamp('published_at'),
  fetchedAt: timestamp('fetched_at').defaultNow(),
  notionPageId: varchar('notion_page_id', { length: 200 }),
  createdAt: timestamp('created_at').defaultNow(),
})
