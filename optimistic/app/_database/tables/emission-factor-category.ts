import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { EmissionFactor } from "./emission-factor";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const EmissionFactorCategory = pgTable("emission_factor_category", {
  id: serial("id").primaryKey(),
  parentEmissionFactorCategoryId: integer("parent_emission_factor_category_id"),
  name: text("name").notNull(),
  createdAt,
});

export const emissionFactorCategoryRelations = relations(EmissionFactorCategory, ({ one, many }) => ({
  parentEmissionFactorCategory: one(EmissionFactorCategory, {
    fields: [EmissionFactorCategory.parentEmissionFactorCategoryId],
    references: [EmissionFactorCategory.id],
  }),
  emissionFactors: many(EmissionFactor),
}));

export type EmissionFactorCategoryInsert = typeof EmissionFactorCategory.$inferInsert;
export type EmissionFactorCategorySelect = typeof EmissionFactorCategory.$inferSelect;

export const EmissionFactorCategoryInsertSchema = createInsertSchema(EmissionFactorCategory);
export const EmissionFactorCategorySelectSchema = createSelectSchema(EmissionFactorCategory);
