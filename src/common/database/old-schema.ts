import { sql } from "drizzle-orm";
import { pgTable, text, uuid, pgView, json, pgEnum, real, smallint, timestamp, customType } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-valibot";

const companyParentReference = uuid("parent_id").references(() => company.id);

export const company = pgTable("company", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  parentId: companyParentReference,
});

export interface HierarchyItem {
  id: string;
  parent_id: string;
  name: string;
}

export const rootCompany = pgView("root_company", {
  rootId: uuid("root_id"),
  hierarchy: json("hierarchy").$type<HierarchyItem[]>(),
}).as(sql`
CREATE VIEW root_company AS
WITH RECURSIVE CompanyHierarchy AS (
  SELECT id AS root_id, id, parent_id, name, ARRAY[id] AS hierarchy
  FROM company
  WHERE parent_id IS NULL
  
  UNION ALL
  
  SELECT ch.root_id, c.id, c.parent_id, c.name, ch.hierarchy || c.id
  FROM company c
  JOIN CompanyHierarchy ch ON c.parent_id = ch.id
)
SELECT root_id, json_agg(json_build_object('id', id, 'parent_id', parent_id, 'name', name)) AS hierarchy
FROM CompanyHierarchy
GROUP BY root_id
ORDER BY root_id;
`);

export const location = pgTable("location", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  companyId: uuid("company_id")
    .references(() => company.id)
    .notNull(),
});

export const activity = pgTable("activity", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  locationId: uuid("location_id")
    .references(() => location.id)
    .notNull(),
  description: text("description"),
  scopeId: uuid("scope_id").references(() => scope.id),
  amount: real("amount"),
  unitId: uuid("unit_id").references(() => unit.id),
  factorId: uuid("factor_id").references(() => factor.id),
  co2e: real("co2e"),
});

export const scopeStreamEnum = pgEnum("scope_stream", ["upstream", "downstream"]);

export const scope = pgTable("scope", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: text("number").notNull(),
  description: text("description").notNull(),
  streamType: scopeStreamEnum("stream_type"),
});

export const unit = pgTable("emission_factor_unit", {
  id: uuid("id").primaryKey().defaultRandom(),
  short: text("short").notNull(),
  long: text("long"),
});

export const source = pgTable("emission_factor_source", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

const emissionFactorCategoryParentReference = uuid("parent_id").references(() => emissionFactorCategory.id);

export const emissionFactorCategory = pgTable("emission_factor_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentId: emissionFactorCategoryParentReference,
  name: text("name").notNull(),
});

export const pgVector = customType<{ data: number[]; config: { dimensions: number } }>({
  dataType: (config) => {
    if (!config?.dimensions) throw new TypeError("The vector type must have a dimension");
    return `VECTOR(${config.dimensions})`;
  },
});

export const vector = customType<{ data: number[]; driverData: string }>({
  dataType: () => "vector",
  toDriver: (vector) => `[${vector.join(",")}]`,
});

export const factor = pgTable("emission_factor", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceId: text("emission_factor_source_id").notNull(),
  unitId: uuid("emission_factor_unit_id")
    .references(() => unit.id)
    .notNull(),
  categoryId: text("emission_factor_category_id").notNull(),
  // embedding: pgVector("embedding", { dimensions: 1536 }), // Magic numbers should be moved to a constant/config
  embedding: vector("embedding"),
  year: smallint("year").notNull(),
  notes: text("notes"),
  uncertainty: real("uncertainty"),
  co2e: real("co2e").notNull(),
  co2: real("co2"),
  ch4: real("ch4"),
  hfc: real("hfc"),
  n2o: real("n2o"),
  pfc: real("pfc"),
  nf3: real("nf3"),
  sf6: real("sf6"),
  voc: real("voc"),
});

export type ScopeSelect = typeof scope.$inferSelect;
export type ScopeInsert = typeof scope.$inferInsert;
export const ScopeInsertSchema = createInsertSchema(scope);

export type ActivitySelect = typeof activity.$inferSelect;
export type ActivityInsert = typeof activity.$inferInsert;
export const ActivityInsertSchema = createInsertSchema(activity);

export type UnitSelect = typeof unit.$inferSelect;
export type UnitInsert = typeof unit.$inferInsert;
export const UnitInsertSchema = createInsertSchema(unit);
