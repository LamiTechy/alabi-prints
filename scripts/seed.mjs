/**
 * Seed script:
 *  1. Creates the tables if they don't exist (idempotent).
 *  2. Creates/updates the admin user from ADMIN_EMAIL + ADMIN_PASSWORD.
 *
 * Usage:  npm run db:seed
 * (reads .env automatically via --env-file-if-exists)
 */
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✖ DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";

if (!email || !password) {
  console.error("✖ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding.");
  process.exit(1);
}

const sql = neon(url);

const statements = [
  // ENUM first — CREATE TYPE has no IF NOT EXISTS in Postgres, so guard it.
  `DO $$ BEGIN
     CREATE TYPE quote_status AS ENUM ('new','contacted','in_progress','completed');
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;`,
  `CREATE TABLE IF NOT EXISTS quote_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(120) NOT NULL,
    phone varchar(40) NOT NULL,
    email varchar(160),
    service varchar(80) NOT NULL,
    size_quantity varchar(160),
    material varchar(160),
    deadline varchar(80),
    description text NOT NULL,
    file_link text,
    status quote_status NOT NULL DEFAULT 'new',
    created_at timestamptz NOT NULL DEFAULT now()
  );`,
  `CREATE TABLE IF NOT EXISTS admins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(160) NOT NULL UNIQUE,
    password_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  );`,
];

try {
  for (const statement of statements) {
    await sql.query(statement);
  }

  const hash = await bcrypt.hash(password, 10);
  await sql.query(
    `INSERT INTO admins (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;`,
    [email, hash],
  );

  console.log("✔ Tables ready.");
  console.log(`✔ Admin seeded: ${email}`);
  console.log("  Sign in at /admin/login");
} catch (error) {
  console.error("✖ Seed failed:");
  console.error(error);
  process.exit(1);
}
