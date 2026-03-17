CREATE TYPE "public"."post_status" AS ENUM('Lendo', 'Lido', 'Quero ler');--> statement-breakpoint
CREATE TABLE "books" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"author" varchar NOT NULL,
	"image_url" varchar,
	"comment" text,
	"stars" integer DEFAULT 0,
	"status" "post_status"
);
