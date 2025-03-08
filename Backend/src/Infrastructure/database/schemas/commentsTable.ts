import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";

export const commentsTable = pgTable("comments", {
  Id: serial("id").primaryKey(),
  Content: text("content").notNull(),
  AuthorId: integer("author_id").notNull(),
  TaskId: integer("task_id").notNull(),
  DeletionDate: varchar("deletion_date", {length: 255}),
  ModifiedDate: varchar("modified_date", {length: 255}),
  CreationDate: varchar("creation_date", {length: 255}),
});
