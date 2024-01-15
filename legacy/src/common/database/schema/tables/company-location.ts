import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { Company } from "./company";
import { Activity } from "./activity";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const CompanyLocation = pgTable("company_location", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  createdAt,
});

export const companyLocationRelations = relations(CompanyLocation, ({ one, many }) => ({
  company: one(Company, { fields: [CompanyLocation.companyId], references: [Company.id] }),
  activities: many(Activity),
}));

export type CompanyLocationInsert = typeof CompanyLocation.$inferInsert;
export type CompanyLocationSelect = typeof CompanyLocation.$inferSelect;

export const CompanyLocationyInsertSchema = createInsertSchema(Activity);
export const CompanyLocationSelectSchema = createSelectSchema(Activity);
