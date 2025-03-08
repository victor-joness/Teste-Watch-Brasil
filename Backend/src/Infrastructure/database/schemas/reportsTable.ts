import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";

export const reportsTable = pgTable("reports", {
  Id: serial("id").primaryKey(),
  Title: varchar("title", { length: 255 }).notNull(),
  Content: text("content").notNull(),
  AuthorId: integer("author_id").notNull(),
  TaskIds: integer("task_id").array(),
  DeletionDate: varchar("deletion_date",{ length: 255 }),
  ModifiedDate: varchar("modified_date", { length: 255 }),
  CreationDate: varchar("creation_date", { length: 255 })
});
