import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  Id: serial("id").primaryKey(),
  Name: varchar("name", { length: 255 }).notNull(),
  Email: varchar("email", { length: 255 }).notNull().unique(),
  Password: varchar("password", { length: 255 }).notNull(),
  Role: varchar("role", { length: 50 }).notNull(),
  DeletionDate: varchar("deletion_date", { length: 255 }),
  ModifiedDate: varchar("modified_date", { length: 255 }),
  CreationDate: varchar("creation_date", { length: 255 })
});