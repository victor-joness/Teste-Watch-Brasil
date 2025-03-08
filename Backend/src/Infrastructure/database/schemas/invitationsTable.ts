import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";

export const invitationsTable = pgTable("invitations", {
  Id: serial("id").primaryKey(),
  SenderId: integer("sender_id").notNull(),
  ReceiverId: integer("receiver_id").notNull(),
  TaskId: integer("task_id").notNull(),
  Status: varchar("status", { length: 50 }).notNull(),
  DeletionDate: varchar("deletion_date", { length: 255 }),
  ModifiedDate: varchar("modified_date", { length: 255 }),
  CreationDate: varchar("creation_date", { length: 255 })
});
