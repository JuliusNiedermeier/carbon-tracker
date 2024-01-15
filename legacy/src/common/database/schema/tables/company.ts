import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { CompanyLocation } from "./company-location";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const Company = pgTable("company", {
  id: serial("id").primaryKey(),
  parentCompanyId: integer("parent_company_id"),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  createdAt,
});

export const companyRelations = relations(Company, ({ one, many }) => ({
  parentCompany: one(Company, { fields: [Company.parentCompanyId], references: [Company.id] }),
  locations: many(CompanyLocation),
}));

export type CompanyInsert = typeof Company.$inferInsert;
export type CompanySelect = typeof Company.$inferSelect;

export const CompanyInsertSchema = createInsertSchema(Company);
export const CompanySelectSchema = createSelectSchema(Company);
