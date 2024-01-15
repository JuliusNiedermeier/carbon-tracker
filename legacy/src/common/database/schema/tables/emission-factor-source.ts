import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { EmissionFactor } from "./emission-factor";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const EmissionFactorSource = pgTable("emission_factor_source", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt,
});

export const emissionFactorSourceRelations = relations(EmissionFactorSource, ({ many }) => ({
  emissionFactors: many(EmissionFactor),
}));

export type EmissionFactorSourceInsert = typeof EmissionFactorSource.$inferInsert;
export type EmissionFactorSourceSelect = typeof EmissionFactorSource.$inferSelect;

export const EmissionFactorSourceInsertSchema = createInsertSchema(EmissionFactorSource);
export const EmissionFactorSourceSelectSchema = createSelectSchema(EmissionFactorSource);
