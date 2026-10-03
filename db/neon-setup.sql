-- =========================================================================
--  Adio Prints International - Neon setup (paste into Neon SQL Editor)
--  Safe to run more than once (idempotent).
-- =========================================================================

-- 1) Status enum for quote requests
DO $$ BEGIN
  CREATE TYPE "public"."quote_status" AS ENUM('new', 'contacted', 'in_progress', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2) Admin users
CREATE TABLE IF NOT EXISTS "admins" (
  "id"            uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email"         varchar(160) NOT NULL,
  "password_hash" text NOT NULL,
  "created_at"    timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "admins_email_unique" UNIQUE ("email")
);

-- 3) Quote requests
CREATE TABLE IF NOT EXISTS "quote_requests" (
  "id"           uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name"         varchar(120) NOT NULL,
  "phone"        varchar(40) NOT NULL,
  "email"        varchar(160),
  "service"      varchar(80) NOT NULL,
  "size_quantity" varchar(160),
  "material"     varchar(160),
  "deadline"     varchar(80),
  "description"  text NOT NULL,
  "file_link"    text,
  "status"       "quote_status" DEFAULT 'new' NOT NULL,
  "created_at"   timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "quote_requests_created_at_idx"
  ON "quote_requests" ("created_at" DESC);

-- 4) Admin login
--    email:    admin@adioprints.com
--    password: change-me-strong-password
--    (bcrypt hash, 10 rounds - change it with the UPDATE in step 5)
INSERT INTO "admins" ("email", "password_hash")
VALUES ('admin@adioprints.com', '$2b$10$/olJUg/OWE7W91nYQI7sUew69H0m4Y3z/bdSh9jqZSgUfZeavXSF2')
ON CONFLICT ("email") DO UPDATE SET "password_hash" = EXCLUDED."password_hash";

-- =========================================================================
--  5) OPTIONAL - change the admin password later:
--      a) run:  node -e "require('bcryptjs').hash('YOUR_NEW_PASSWORD',10).then(h=>console.log(h))"
--      b) replace the value below with that output and run this UPDATE
--
--  UPDATE "admins"
--    SET "password_hash" = '$2b$10$REPLACE_WITH_YOUR_NEW_HASH'
--    WHERE "email" = 'admin@adioprints.com';
--
--  OPTIONAL - change the admin email:
--  UPDATE "admins" SET "email" = 'you@example.com'
--    WHERE "email" = 'admin@adioprints.com';
-- =========================================================================

-- Verify
SELECT 'admins' AS tbl, count(*) FROM "admins"
UNION ALL
SELECT 'quote_requests', count(*) FROM "quote_requests";
