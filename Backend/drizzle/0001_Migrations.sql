ALTER TABLE "tasks" ALTER COLUMN "due_date" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "assigned_to" integer NOT NULL;