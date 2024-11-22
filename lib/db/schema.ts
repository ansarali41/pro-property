// Previous imports remain...

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  authorId: text('author_id').references(() => users.id).notNull(),
  propertyId: text('property_id').references(() => properties.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  postId: text('post_id').references(() => posts.id).notNull(),
  authorId: text('author_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const likes = pgTable('likes', {
  id: text('id').primaryKey(),
  postId: text('post_id').references(() => posts.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Previous tables remain...