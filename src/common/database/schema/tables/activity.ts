import { relations } from "drizzle-orm";
import { bigint, integer, jsonb, pgTable, real, serial, text, boolean } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { CompanyLocation } from "./company-location";
import { Scope } from "./scope";
import { Unit } from "./unit";
import { EmissionFactor } from "./emission-factor";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const Activity = pgTable("activity", {
  id: serial("id").primaryKey(),
  locationId: integer("location_id").notNull(),
  scopeId: integer("scope_id"),
  unitId: integer("unit_id"),
  emissionFactorId: integer("emission_factor_id"),
  description: text("description").notNull(),
  amount: real("amount"),
  amountFormula: text("amount_formula"),
  year: bigint("year", { mode: "bigint" }),
  miscellaneous: jsonb("miscellaneous"),
  co2e: real("co2e"),
  double_counting: boolean('biogenic_share'),
  biogenic_share: boolean('biogenic_share'),
  createdAt,
});

export const activityRelations = relations(Activity, ({ one }) => ({
  location: one(CompanyLocation, { fields: [Activity.locationId], references: [CompanyLocation.id] }),
  scope: one(Scope, { fields: [Activity.scopeId], references: [Scope.id] }),
  unit: one(Unit, { fields: [Activity.unitId], references: [Unit.id] }),
  factor: one(EmissionFactor, { fields: [Activity.emissionFactorId], references: [EmissionFactor.id] }),
}));

export type ActivityInsert = typeof Activity.$inferInsert;
export type ActivitySelect = typeof Activity.$inferSelect;

export const ActivityInsertSchema = createInsertSchema(Activity);
export const ActivitySelectSchema = createSelectSchema(Activity);
