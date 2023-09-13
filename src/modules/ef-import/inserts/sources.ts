import { filterPrimitiveDuplicates } from "../utils/filter-primitive-duplicates";
import { insert } from "../utils/insert";
import { EmissionFactorSource } from "@/common/database/schema";

/** Inserts unique sources into the emission_factor_source table and returns the created rows. */
export const insertSources = async (sources: { source: string }[]) => {
  const uniqueSources = filterPrimitiveDuplicates(sources.map((source) => source.source));
  const sourceInserts = uniqueSources.map((source): typeof EmissionFactorSource.$inferInsert => ({ name: source }));
  return insert(EmissionFactorSource, sourceInserts);
};
