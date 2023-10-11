import { relations } from "drizzle-orm";
import { pgEnum, pgTable, serial, smallint, text } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { Activity } from "./activity";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const scopeStreamEnum = pgEnum("ScopeStream", ["upstream", "downstream"]);

export const Scope = pgTable("scope", {
  id: serial("id").primaryKey(),
  scope: smallint("scope").notNull(),
  subScope: smallint("sub_scope").notNull(),
  literal: text("literal"),
  name: text("name"),
  stream: scopeStreamEnum("stream"),
  createdAt,
});

export const scopeRelations = relations(Scope, ({ many }) => ({
  activities: many(Activity),
}));

export type ScopeInsert = typeof Scope.$inferInsert;
export type ScopeSelect = typeof Scope.$inferSelect;

export const ScopeInsertSchema = createInsertSchema(Scope);
export const ScopeSelectSchema = createSelectSchema(Scope);
