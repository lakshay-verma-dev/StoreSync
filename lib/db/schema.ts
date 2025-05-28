import { pgTable, text, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),

  //basic file/folder info
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(), // folder

  //storage infotmation
  fileUrl: text("file_url").notNull(), // file/folder metadata
  thumbnailUrl: text("thumbnail_url").notNull(), // file/folder metadata

  //Ownership
  userId: text("user_id").notNull(), // user id
  parentId: uuid("parent_id").notNull(), // parent folder id

  // file/folder flags
  isFolder: boolean("is_folder").notNull().default(false), // file/folder
  isStarred: boolean("is_starred").notNull().default(false), // file/folder
  isTrash: boolean("is_trash").notNull().default(false), // file/folder

  //Times Stamps
  createdAt: timestamp("created_at").notNull().defaultNow(), // file/folder metadata
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // file/folder metadata
});

export const fileRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  //relationship to child files/folder
  children: many(files),
}));

export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
