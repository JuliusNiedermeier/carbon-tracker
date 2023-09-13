import { Unit } from "@/common/database/schema";
import { filterPrimitiveDuplicates } from "../utils/filter-primitive-duplicates";
import { insert } from "../utils/insert";

/** Inserts unique units into the unit table and returns the created rows. */
export const insertUnits = async (units: { unit: string }[]) => {
  const uniqueUnits = filterPrimitiveDuplicates(units.map((unit) => unit.unit));
  const unitInserts = uniqueUnits.map((unit): typeof Unit.$inferInsert => ({ abbreviation: unit }));
  return insert(Unit, unitInserts);
};
