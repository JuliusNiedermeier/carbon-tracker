import { arrayStartsWith } from "./categories";
import { insert } from "../utils/insert";
import { EmissionFactor } from "@/common/database/schema";
import { ParsedCSV } from "..";

/**
 * Inserts emission factors into the database.
 *
 * @param parsedFactors - Parsed CSV data containing emission factors.
 * @param insertedSources - Already inserted emission factor sources.
 * @param insertedUnits - Already inserted units.
 */

export const insertFactors = async (
  parsedFactors: ParsedCSV,
  insertedSources: { id: number; name: string }[],
  insertedUnits: { id: number; abbreviation: string }[],
  insertedCategoryPaths: { id: number; name: string }[][],
  embeddings: number[][],
  categoryDelimiter: string
) => {
  const factors = parsedFactors.map((factor, index): typeof EmissionFactor.$inferInsert => {
    // Find the matching emission factor source for the current factor
    const source = insertedSources.find((source) => source.name === factor.source);
    if (!source) throw new Error(`No matching source with name ${factor.source} for factor on line ${index + 1}`);

    // Find the matching unit for the current factor
    const unit = insertedUnits.find((unit) => unit.abbreviation === factor.unit);
    if (!unit) throw new Error(`No matching unit with name ${factor.unit} for factor on line ${index + 1}`);

    const factorCategoryPath = factor.categories.split(categoryDelimiter);

    // Find the matching category for the current factor
    const categoryIndex = insertedCategoryPaths.findIndex((category) =>
      arrayStartsWith(
        category.map(({ name }) => name),
        factorCategoryPath
      )
    );

    const category = insertedCategoryPaths[categoryIndex];

    if (!category) {
      throw new Error(`No matching category with path ${factor.categories} for factor on line ${index + 1}`);
    }

    const embedding = embeddings[categoryIndex];

    if (!embedding) {
      console.log(`No matching embedding for category with path ${factor.categories} for factor on line ${index + 1}`);
      throw new Error(`No matching embedding for category with path ${factor.categories} for factor on line ${index + 1}`);
    }

    return {
      emissionFactorCategoryId: category[factorCategoryPath.length - 1].id,
      emissionFactorSourceId: source.id,
      unitId: unit.id,

      year: parseInt(factor.year),
      uncertainty: parseFloat(factor.uncertainty),
      notes: factor.notes,

      embedding,

      co2e: parseFloat(factor.co2e),
      co2: parseFloat(factor.co2),
      ch4: parseFloat(factor.ch4),
      hfc: parseFloat(factor.hfc),
      n2o: parseFloat(factor.n2o),
      pfc: parseFloat(factor.pfc),
      nf3: parseFloat(factor.nf3),
      sf6: parseFloat(factor.sf6),
      voc: parseFloat(factor.voc),
    };
  });

  return insert(EmissionFactor, factors, { chunkSize: 1 });
};
