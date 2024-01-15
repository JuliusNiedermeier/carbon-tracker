import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { Activity } from "./activity";
import { createdAt } from "../utils";
import { EmissionFactor } from "./emission-factor";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";

export const Unit = pgTable("unit", {
  id: serial("id").primaryKey(),
  abbreviation: text("abbreviation").notNull(),
  name: text("name"),
  createdAt,
});

export const unitRelations = relations(Unit, ({ many }) => ({
  activities: many(Activity),
  factors: many(EmissionFactor),
}));

export type UnitInsert = typeof Unit.$inferInsert;
export type UnitSelect = typeof Unit.$inferSelect;

export const UnitInsertSchema = createInsertSchema(Unit);
export const UnitSelectSchema = createSelectSchema(Unit);
