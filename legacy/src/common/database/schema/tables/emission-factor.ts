import { integer, pgTable, real, serial, smallint, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { vector } from "../custom-types";
import { createdAt } from "../utils";
import { Unit } from "./unit";
import { Activity } from "./activity";
import { EmissionFactorCategory } from "./emission-factor-category";
import { EmissionFactorSource } from "./emission-factor-source";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const EmissionFactor = pgTable("emission_factor", {
  id: serial("id").primaryKey(),
  emissionFactorCategoryId: integer("emission_factor_category_id").notNull(),
  emissionFactorSourceId: integer("emission_factor_source_id").notNull(),
  unitId: integer("unit_id").notNull(),
  year: smallint("year").notNull(),
  uncertainty: real("uncertainty"),
  notes: text("notes"),
  co2e: real("co2e"),
  co2: real("co2"),
  ch4: real("ch4"),
  hfc: real("hfc"),
  n2o: real("n2o"),
  pfc: real("pfc"),
  nf3: real("nf3"),
  sf6: real("sf6"),
  voc: real("voc"),
  embedding: vector("embedding"),
  createdAt,
});

export const emissionFactorRelations = relations(EmissionFactor, ({ one, many }) => ({
  emissionFactorCategory: one(EmissionFactorCategory, { fields: [EmissionFactor.emissionFactorCategoryId], references: [EmissionFactorCategory.id] }),
  emissionFactorSource: one(EmissionFactorSource, { fields: [EmissionFactor.emissionFactorSourceId], references: [EmissionFactorSource.id] }),
  unit: one(Unit, { fields: [EmissionFactor.unitId], references: [Unit.id] }),
  activities: many(Activity),
}));

export type EmissionFactorInsert = typeof EmissionFactor.$inferInsert;
export type EmissionFactorSelect = typeof EmissionFactor.$inferSelect;

export const EmissionFactorInsertSchema = createInsertSchema(EmissionFactor);
export const EmissionFactorSelectSchema = createSelectSchema(EmissionFactor);
