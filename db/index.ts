import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { admins, quoteRequests } from "./schema";

export type Database = NeonHttpDatabase<{ admins: typeof admins; quoteRequests: typeof quoteRequests }>;

/**
 * Lazily create the Neon client so `next build` never fails when DATABASE_URL
 * is not present (e.g. local preview without env vars).
 */
function createDb(): Database {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env (see .env.example) — Neon connection string.",
    );
  }
  const client = neon(url);
  return drizzle({ client, schema: { admins, quoteRequests } });
}

const globalForDb = globalThis as unknown as { __adioDb?: Database };

export function getDb(): Database {
  if (!globalForDb.__adioDb) globalForDb.__adioDb = createDb();
  return globalForDb.__adioDb;
}

export { admins, quoteRequests };
