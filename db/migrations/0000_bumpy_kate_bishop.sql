CREATE TYPE "public"."quote_status" AS ENUM('new', 'contacted', 'in_progress', 'completed');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(160) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"email" varchar(160),
	"service" varchar(80) NOT NULL,
	"size_quantity" varchar(160),
	"material" varchar(160),
	"deadline" varchar(80),
	"description" text NOT NULL,
	"file_link" text,
	"status" "quote_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
