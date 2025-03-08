import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  Id: serial("id").primaryKey(),
  Name: varchar("name", { length: 255 }).notNull(),
  AssignedTo: integer("assigned_to").notNull(),
  DeletionDate: varchar("deletion_date", { length: 255 }),
  ModifiedDate: varchar("modified_date", { length: 255 }),
  CreationDate: varchar("creation_date", { length: 255 }),
});
