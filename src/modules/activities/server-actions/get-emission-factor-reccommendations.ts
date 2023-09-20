"use server";

import { db } from "@/common/database/client";
import { EmissionFactor, EmissionFactorCategory } from "@/common/database/schema";
import { ai } from "@/common/openai/client";
import { and, eq, inArray, sql } from "drizzle-orm";
import { getEmissionFactorCategoryPath } from "../utils/get-emission-factor-category-path";

interface FilterOptions {
  unitIds?: number[];
  years?: number[];
  emissionFactorSourceIds?: number[];
}

interface EmissionFactorCategoryPathSQLSelect extends Record<string, unknown> {
  leaf_id: number;
  nodes: { id: number; name: string }[];
}

const createEmissionFactorCategoryPathSQL = (leafEmissionFactorCategoryIds: number[]) =>
  sql`
WITH RECURSIVE category_path AS (
  SELECT ${EmissionFactorCategory.id}, ${EmissionFactorCategory.id} as leaf_id, ${EmissionFactorCategory.parentEmissionFactorCategoryId},  ${
    EmissionFactorCategory.name
  }, ARRAY[${EmissionFactorCategory.id}] AS path_ids
  FROM ${EmissionFactorCategory}
  WHERE ${inArray(EmissionFactorCategory.id, leafEmissionFactorCategoryIds)}

  UNION ALL

  SELECT  ${EmissionFactorCategory.id}, category_path.leaf_id, ${EmissionFactorCategory.parentEmissionFactorCategoryId}, ${
    EmissionFactorCategory.name
  }, category_path.path_ids || ${EmissionFactorCategory.id}
  FROM ${EmissionFactorCategory}
  JOIN category_path ON ${EmissionFactorCategory.id} = category_path.parent_emission_factor_category_id
)

SELECT category_path.leaf_id, json_agg(json_build_object('id', category_path.id, 'name', category_path.name)) AS nodes
FROM category_path
GROUP BY category_path.leaf_id
ORDER BY category_path.leaf_id;
`.mapWith((value) => {
    return value as { leaf_id: number; nodes: { id: number; name: string }[] };
  });

export const getEmissionFactorReccommendations = async (query: string, filters?: FilterOptions) => {
  if (!query?.length) return [];

  // Embed the query string
  const embeddingResponse = await ai.embeddings.create({ model: "text-embedding-ada-002", input: query });
  const embedding = embeddingResponse.data[0].embedding;
  const formattedEmbedding = `[${embedding.join(",")}]`;

  // Get nearest neighbours
  const filterStatements = [];

  if (filters?.unitIds?.length) filterStatements.push(inArray(EmissionFactor.unitId, filters.unitIds));
  if (filters?.years?.length) filterStatements.push(inArray(EmissionFactor.year, filters.years));
  if (filters?.emissionFactorSourceIds?.length) filterStatements.push(inArray(EmissionFactor.emissionFactorSourceId, filters.emissionFactorSourceIds));

  const factors = await db.query.EmissionFactor.findMany({
    columns: { co2e: true, notes: true, id: true, year: true },
    with: {
      emissionFactorCategory: { columns: { id: true, name: true } },
      unit: { columns: { abbreviation: true, name: true } },
      emissionFactorSource: { columns: { name: true } },
    },
    where: and(...filterStatements, sql`${EmissionFactor.embedding} <-> ${formattedEmbedding} < 0.7`),
    orderBy: sql`${EmissionFactor.embedding} <-> ${formattedEmbedding}`,
    limit: 50,
  });

  const emissionFactorCategoryPaths = await getEmissionFactorCategoryPath(factors.map((factor) => factor.emissionFactorCategory.id));

  return factors.map((factor) => ({
    ...factor,
    categoryPath: emissionFactorCategoryPaths ? emissionFactorCategoryPaths.find((row) => row.leaf_id === factor.emissionFactorCategory.id) : {},
  }));
};
