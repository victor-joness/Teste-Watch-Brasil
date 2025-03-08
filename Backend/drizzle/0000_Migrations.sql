CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"task_id" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"task_id" integer[],
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(50) NOT NULL,
	"priority" varchar(50) NOT NULL,
	"category_id" integer NOT NULL,
	"assigned_to" integer NOT NULL,
	"due_date" timestamp NOT NULL,
	"progress" integer NOT NULL,
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"deletion_date" varchar(255),
	"modified_date" varchar(255),
	"creation_date" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
