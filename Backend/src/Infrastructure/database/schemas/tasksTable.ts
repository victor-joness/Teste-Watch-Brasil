import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
  Id: serial("id").primaryKey(),
  Title: varchar("title", { length: 255 }).notNull(),
  Description: text("description").notNull(),
  Status: varchar("status", { length: 50 }).notNull(),
  Priority: varchar("priority", { length: 50 }).notNull(),
  CategoryId: integer("category_id").notNull(),
  AssignedTo: integer("assigned_to").notNull(),
  DueDate: varchar("due_date", { length: 255 }).notNull(),
  Progress: integer("progress").notNull(),
  TaskOrigin: integer("task_origin"),
  DeletionDate: varchar("deletion_date", { length: 255 }),
  ModifiedDate: varchar("modified_date", { length: 255 }),
  CreationDate: varchar("creation_date", { length: 255 }),
});
