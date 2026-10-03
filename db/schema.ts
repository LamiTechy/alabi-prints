import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const quoteStatusEnum = pgEnum("quote_status", [
  "new",
  "contacted",
  "in_progress",
  "completed",
]);

export const quoteRequests = pgTable("quote_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  service: varchar("service", { length: 80 }).notNull(),
  sizeQuantity: varchar("size_quantity", { length: 160 }),
  material: varchar("material", { length: 160 }),
  deadline: varchar("deadline", { length: 80 }),
  description: text("description").notNull(),
  fileLink: text("file_link"),
  status: quoteStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewQuoteRequest = typeof quoteRequests.$inferInsert;

export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Admin = typeof admins.$inferSelect;
